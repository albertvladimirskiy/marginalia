import type { z } from 'zod';

export type Structured<T> = { ok: true; data: T } | { ok: false; raw: string };

/** Parse model text as JSON and validate. Tolerates code fences and leading prose. */
export function parseStructured<T>(schema: z.ZodType<T>, text: string): { ok: true; data: T } | { ok: false; error: string } {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start < 0 || end <= start) return { ok: false, error: 'No JSON object found.' };
  let json: unknown;
  try {
    json = JSON.parse(text.slice(start, end + 1));
  } catch (e) {
    return { ok: false, error: `Invalid JSON: ${e instanceof Error ? e.message : String(e)}` };
  }
  const result = schema.safeParse(json);
  if (result.success) return { ok: true, data: result.data };
  const issues = result.error.issues.slice(0, 8).map((i) => `${i.path.join('.') || '(root)'}: ${i.message}`);
  return { ok: false, error: issues.join('\n') };
}

/**
 * Ask once; if the output fails validation, ask the model to repair it once;
 * if that fails too, return the raw text so the student still sees the feedback.
 * Errors from the first call propagate (the caller shows them); repair errors fall back to raw.
 */
export async function getStructured<T>(args: {
  schema: z.ZodType<T>;
  call: () => Promise<string>;
  repair: (raw: string, error: string) => Promise<string>;
}): Promise<Structured<T>> {
  const raw = await args.call();
  const first = parseStructured(args.schema, raw);
  if (first.ok) return first;
  try {
    const fixed = await args.repair(raw, first.error);
    const second = parseStructured(args.schema, fixed);
    if (second.ok) return second;
  } catch {
    // fall through to raw
  }
  return { ok: false, raw };
}
