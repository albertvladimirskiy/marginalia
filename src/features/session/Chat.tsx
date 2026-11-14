import { useRef, useState } from 'react';
import type { ChatMsg } from '../../data/types';
import { chat } from '../../ai/tutor';
import { hasKey, toAiError } from '../../ai/client';
import { useApiKey } from '../../lib/settings';

interface Props {
  kind: 'mentor' | 'premise';
  history: ChatMsg[];
  onHistory: (h: ChatMsg[]) => void;
  /** Built at send time so it includes the latest draft. */
  context: () => Promise<string>;
  placeholder?: string;
  startLabel?: string;
}

/** A streaming chat with the mentor persona. Used by Ask the Mentor and the Premise Workshop. */
export function Chat({ kind, history, onHistory, context, placeholder, startLabel }: Props) {
  useApiKey(); // re-render when the key changes
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abort = useRef<AbortController | null>(null);

  async function send(content: string) {
    if (!content.trim() || busy) return;
    const next: ChatMsg[] = [...history, { role: 'user', content: content.trim() }];
    onHistory(next);
    setInput('');
    setBusy(true);
    setError(null);
    setStreaming('');
    abort.current = new AbortController();
    try {
      const reply = await chat(kind, await context(), next, (d) => setStreaming((s) => s + d), abort.current.signal);
      onHistory([...next, { role: 'assistant', content: reply }]);
    } catch (e) {
      const err = toAiError(e);
      if (err.kind !== 'aborted') setError(err.message);
      onHistory(next);
    } finally {
      setBusy(false);
      setStreaming('');
    }
  }

  if (!hasKey()) {
    return <p className="note small">The mentor needs your API key. <a href="#/settings">Add it in Settings.</a> Everything else works without it.</p>;
  }

  return (
    <div className="stack">
      <div className="chat" aria-live="polite">
        {history.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            {m.role === 'user' ? <span className="sr-only">You: </span> : <span className="sr-only">Mentor: </span>}
            {m.content}
          </div>
        ))}
        {streaming && <div className="msg assistant">{streaming}</div>}
        {busy && !streaming && <div className="muted small">Thinking…</div>}
      </div>
      {error && <p className="note error small" role="alert">{error}</p>}
      {history.length === 0 && startLabel ? (
        <button className="primary" onClick={() => send('Begin.')} disabled={busy}>{startLabel}</button>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="stack">
          <label htmlFor={`chat-${kind}`} className="sr-only">Message</label>
          <textarea id={`chat-${kind}`} rows={3} value={input} onChange={(e) => setInput(e.target.value)} placeholder={placeholder}
            onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) send(input); }} />
          <div className="row">
            <button type="submit" className="primary" disabled={busy || !input.trim()}>Send</button>
            {busy && <button type="button" onClick={() => abort.current?.abort()}>Stop</button>}
            <span className="small muted">Ctrl+Enter to send</span>
          </div>
        </form>
      )}
    </div>
  );
}
