/**
 * The single gateway to the Anthropic API. Everything AI goes through callModel(),
 * so a proxy can replace this file later without touching features.
 *
 * Browser access: the SDK's `dangerouslyAllowBrowser` sends the
 * `anthropic-dangerous-direct-browser-access: true` header. The key comes from
 * localStorage and is sent only to api.anthropic.com.
 */
import type Anthropic from '@anthropic-ai/sdk';
import type { Usage } from '../data/types';
import { getApiKey, getSettings, updateSettings } from '../lib/settings';

export const MODELS = [
  { id: 'claude-haiku-5-5', label: 'Claude Haiku 5.5 — fastest, cheapest', inPerM: 0.1, outPerM: 0.5 },
  { id: 'claude-sonnet-5-5', label: 'Claude Sonnet 5.5 — balanced (default)', inPerM: 2, outPerM: 10 },
  { id: 'claude-opus-5-5', label: 'Claude Opus 5.5 — most capable', inPerM: 4, outPerM: 20 },
] as const;

/** Models that accept the server-side refusal fallback (Haiku has none). */
const FALLBACK_MODELS = new Set(['claude-sonnet-5-5', 'claude-opus-5-5']);

export type AiErrorKind = 'no-key' | 'offline' | 'auth' | 'permission' | 'rate' | 'overloaded' | 'network' | 'bad-request' | 'refusal' | 'truncated' | 'aborted' | 'unknown';

export class AiError extends Error {
  constructor(
    public kind: AiErrorKind,
    message: string,
  ) {
    super(message);
    this.name = 'AiError';
  }
}

export interface CallOptions {
  model: string;
  system: string;
  messages: Anthropic.Beta.BetaMessageParam[];
  maxTokens?: number;
  effort?: 'low' | 'medium' | 'high';
  /** JSON schema for structured output (output_config.format). */
  format?: Anthropic.Beta.BetaJSONOutputFormat;
  onText?: (delta: string) => void;
  signal?: AbortSignal;
}

export interface CallResult {
  text: string;
  usage: Usage;
}

type UsageListener = (u: Usage) => void;
const usageListeners = new Set<UsageListener>();
/** Subscribe to the cost of every call (for per-session counters). Returns an unsubscribe. */
export function onUsage(fn: UsageListener): () => void {
  usageListeners.add(fn);
  return () => usageListeners.delete(fn);
}

export function priceOf(model: string, inputTokens: number, outputTokens: number): number {
  const m = MODELS.find((x) => model.startsWith(x.id)) ?? MODELS[1];
  return (inputTokens * m.inPerM + outputTokens * m.outPerM) / 1_000_000;
}

export function addUsage(a: Usage, b: Usage): Usage {
  return { inputTokens: a.inputTokens + b.inputTokens, outputTokens: a.outputTokens + b.outputTokens, costUsd: a.costUsd + b.costUsd };
}

export function hasKey(): boolean {
  return getApiKey().length > 0;
}

export async function callModel(opts: CallOptions): Promise<CallResult> {
  const apiKey = getApiKey();
  if (!apiKey) throw new AiError('no-key', 'Add your Anthropic API key in Settings to get mentor feedback.');
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    throw new AiError('offline', 'You are offline. Your writing is saved; the mentor needs a connection.');
  }

  let SDK: typeof Anthropic;
  try {
    // Loaded on first use so the writing app stays small; the PWA precaches this chunk for offline starts.
    SDK = (await import('@anthropic-ai/sdk')).default;
  } catch {
    throw new AiError('network', 'Could not load the mentor. Check your connection and try again.');
  }
  const client = new SDK({ apiKey, dangerouslyAllowBrowser: true, maxRetries: 2 });
  const fallback = FALLBACK_MODELS.has(opts.model);

  try {
    const stream = client.beta.messages.stream(
      {
        model: opts.model,
        max_tokens: opts.maxTokens ?? 16000,
        system: opts.system,
        messages: opts.messages,
        output_config: { effort: opts.effort ?? 'medium', ...(opts.format ? { format: opts.format } : {}) },
        ...(fallback ? { betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' as const } : {}),
      },
      { signal: opts.signal },
    );
    if (opts.onText) stream.on('text', opts.onText);
    const msg = await stream.finalMessage();

    const inputTokens = msg.usage.input_tokens + (msg.usage.cache_creation_input_tokens ?? 0) + (msg.usage.cache_read_input_tokens ?? 0);
    const usage: Usage = { inputTokens, outputTokens: msg.usage.output_tokens, costUsd: priceOf(msg.model, inputTokens, msg.usage.output_tokens) };
    recordUsage(usage);

    if (msg.stop_reason === 'refusal') {
      throw new AiError('refusal', 'The mentor declined to respond to this request. Try rephrasing, or continue without feedback.');
    }
    const text = msg.content.flatMap((b) => (b.type === 'text' ? [b.text] : [])).join('');
    if (msg.stop_reason === 'max_tokens') {
      throw new AiError('truncated', 'The response was cut off before it finished. Try again.');
    }
    return { text, usage };
  } catch (e) {
    throw e instanceof AiError ? e : fromSdkError(SDK, e);
  }
}

function recordUsage(u: Usage): void {
  updateSettings({ usageTotal: addUsage(getSettings().usageTotal, u) });
  usageListeners.forEach((l) => l(u));
}

/** Normalize anything thrown by a mentor call into an AiError with a readable message. */
export function toAiError(e: unknown): AiError {
  if (e instanceof AiError) return e;
  if (e instanceof DOMException && e.name === 'AbortError') return new AiError('aborted', 'Stopped.');
  return new AiError('unknown', e instanceof Error ? e.message : 'Something went wrong talking to the mentor.');
}

function fromSdkError(Anthropic: typeof import('@anthropic-ai/sdk').default, e: unknown): AiError {
  if (e instanceof Anthropic.APIUserAbortError) return new AiError('aborted', 'Stopped.');
  if (e instanceof Anthropic.AuthenticationError) return new AiError('auth', 'Your API key was rejected (401). Check it in Settings.');
  if (e instanceof Anthropic.PermissionDeniedError) return new AiError('permission', 'This key is not allowed to use that model (403). Check the key’s workspace or pick another model in Settings.');
  if (e instanceof Anthropic.NotFoundError) return new AiError('bad-request', 'The selected model was not found (404). Pick another model in Settings.');
  if (e instanceof Anthropic.RateLimitError) {
    const after = Number(e.headers?.get('retry-after'));
    const wait = Number.isFinite(after) && after > 0 ? ` Try again in about ${Math.ceil(after)} seconds.` : ' Wait a minute and try again.';
    return new AiError('rate', `Rate limit reached (429).${wait} A spending limit on the key can also cause this.`);
  }
  if (e instanceof Anthropic.APIConnectionError) return new AiError('network', 'Could not reach Anthropic. Check your connection and try again. Your writing is saved.');
  if (e instanceof Anthropic.BadRequestError) return new AiError('bad-request', `The request was rejected (400): ${e.message}`);
  if (e instanceof Anthropic.APIError && (e.status === 529 || (e.status ?? 0) >= 500)) {
    return new AiError('overloaded', 'Anthropic’s servers are busy right now. Try again in a minute.');
  }
  if (e instanceof Anthropic.APIError) return new AiError('unknown', `API error ${e.status ?? ''}: ${e.message}`);
  return toAiError(e);
}
