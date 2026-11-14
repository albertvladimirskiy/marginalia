import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import ReactMarkdown from 'react-markdown';
import { db } from '../../data/db';
import { restoreVersion, saveDraftText } from '../../data/drafts';
import { countWords } from '../../lib/words';
import { useSettings } from '../../lib/settings';

const NUDGES = [
  'Write the worst sentence you can think of. Then the next one.',
  'What is in the room? Name one object.',
  'What does someone want right now?',
  'Skip ahead to the part you are avoiding.',
  'Write one sentence that is only true, not good.',
  'What happened next? Just the next thing.',
  'Describe a sound.',
  'Say it badly first.',
];

const IDLE_MS = 60_000;
const AUTOSAVE_MS = 1200;

interface Props {
  draftId: string;
  timerMinutes?: number;
  minWords?: number;
  maxWords?: number;
  placeholder?: string;
  preview?: boolean;
  label?: string;
  onWords?: (words: number) => void;
}

/** Copies the textarea's text metrics into a hidden mirror to find the caret's y offset. */
function caretTop(ta: HTMLTextAreaElement): number {
  const cs = getComputedStyle(ta);
  const div = document.createElement('div');
  for (const p of ['font-family', 'font-size', 'line-height', 'padding-top', 'padding-left', 'padding-right', 'width', 'letter-spacing', 'word-spacing', 'box-sizing']) {
    div.style.setProperty(p, cs.getPropertyValue(p));
  }
  Object.assign(div.style, { position: 'absolute', visibility: 'hidden', whiteSpace: 'pre-wrap', overflowWrap: 'break-word', top: '0', left: '-9999px' });
  div.textContent = ta.value.slice(0, ta.selectionEnd);
  const span = document.createElement('span');
  span.textContent = '​';
  div.appendChild(span);
  document.body.appendChild(div);
  const top = span.offsetTop;
  div.remove();
  return top;
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export function Editor({ draftId, timerMinutes, minWords, maxWords, placeholder, preview, label = 'Your draft', onWords }: Props) {
  const settings = useSettings();
  const [text, setText] = useState<string | null>(null);
  const [focus, setFocus] = useState(false);
  const [showVersions, setShowVersions] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [nudge, setNudge] = useState<string | null>(null);
  const [remaining, setRemaining] = useState((timerMinutes ?? settings.timerMinutes) * 60);
  const [running, setRunning] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const latest = useRef<string | null>(null);
  const dirty = useRef(false);
  const lastInput = useRef(Date.now());

  const versions = useLiveQuery(() => db.versions.where('draftId').equals(draftId).reverse().sortBy('savedAt'), [draftId]);

  // Load once per draft.
  useEffect(() => {
    let alive = true;
    db.drafts.get(draftId).then((d) => {
      if (!alive) return;
      setText(d?.text ?? '');
      latest.current = d?.text ?? '';
    });
    return () => {
      alive = false;
    };
  }, [draftId]);

  const flush = useCallback(
    (force = false) => {
      if (latest.current === null || (!dirty.current && !force)) return;
      dirty.current = false;
      saveDraftText(draftId, latest.current, { forceSnapshot: force }).catch(() => undefined);
    },
    [draftId],
  );

  // Debounced autosave.
  useEffect(() => {
    if (text === null) return;
    const t = setTimeout(() => flush(), AUTOSAVE_MS);
    return () => clearTimeout(t);
  }, [text, flush]);

  // Save on leave: unmount, tab hidden, page closing.
  useEffect(() => {
    const onHide = () => flush(true);
    const onVis = () => document.visibilityState === 'hidden' && flush(true);
    window.addEventListener('pagehide', onHide);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      window.removeEventListener('pagehide', onHide);
      document.removeEventListener('visibilitychange', onVis);
      flush(true);
    };
  }, [flush]);

  // Auto-grow the page so the window scrolls, not the textarea.
  useLayoutEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${ta.scrollHeight}px`;
  }, [text, focus, showPreview]);

  // Focus mode hides chrome; Escape leaves it.
  useEffect(() => {
    document.body.classList.toggle('focus-mode', focus);
    if (!focus) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setFocus(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('focus-mode');
      window.removeEventListener('keydown', onKey);
    };
  }, [focus]);

  // Timer.
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(t);
  }, [running]);
  useEffect(() => {
    if (remaining === 0) setRunning(false);
  }, [remaining]);

  // "Keep the pen moving": a gentle prompt after ~60s idle. Never deletes anything.
  useEffect(() => {
    if (!settings.nudge) return;
    const t = setInterval(() => {
      const idle = Date.now() - lastInput.current > IDLE_MS;
      const engaged = running || (latest.current?.length ?? 0) > 0;
      if (idle && engaged) setNudge((n) => n ?? NUDGES[Math.floor(Math.random() * NUDGES.length)]!);
    }, 5000);
    return () => clearInterval(t);
  }, [settings.nudge, running]);

  const words = text ? countWords(text) : 0;
  useEffect(() => onWords?.(words), [words, onWords]);

  function onChange(value: string) {
    setText(value);
    latest.current = value;
    dirty.current = true;
    lastInput.current = Date.now();
    if (nudge) setNudge(null);
    if (focus && taRef.current) {
      const ta = taRef.current;
      requestAnimationFrame(() => {
        const y = ta.getBoundingClientRect().top + window.scrollY + caretTop(ta);
        window.scrollTo({ top: y - window.innerHeight * 0.45 });
      });
    }
  }

  async function restore(versionId: number) {
    flush(true);
    const restored = await restoreVersion(draftId, versionId);
    if (restored !== undefined) {
      setText(restored);
      latest.current = restored;
      dirty.current = false;
    }
  }

  if (text === null) return <p className="muted">Opening the page…</p>;

  const target = minWords !== undefined ? ` · target ${minWords}${maxWords ? `–${maxWords}` : '+'}` : '';
  const under = minWords !== undefined && words < minWords;
  const over = maxWords !== undefined && words > maxWords;

  return (
    <div className="editor">
      <div className="editor-bar" role="toolbar" aria-label="Editor tools">
        <span className="count" aria-live="polite">
          {words} {words === 1 ? 'word' : 'words'}
          {target}
        </span>
        {under && <span className="small">({minWords! - words} to go)</span>}
        {over && <span className="small">(over the range — cut)</span>}
        <span style={{ flex: 1 }} />
        <span aria-label="Timer" className="count">{fmt(remaining)}</span>
        <button onClick={() => setRunning((r) => !r)} aria-pressed={running}>{running ? 'Pause' : 'Start timer'}</button>
        <button onClick={() => { setRunning(false); setRemaining((timerMinutes ?? settings.timerMinutes) * 60); }}>Reset</button>
        {preview && <button onClick={() => setShowPreview((p) => !p)} aria-pressed={showPreview}>{showPreview ? 'Edit' : 'Preview'}</button>}
        <button onClick={() => setShowVersions((v) => !v)} aria-pressed={showVersions} aria-expanded={showVersions}>History</button>
        <button onClick={() => setFocus((f) => !f)} aria-pressed={focus}>{focus ? 'Exit focus (Esc)' : 'Focus'}</button>
      </div>

      {remaining === 0 && <p className="nudge">Time. Finish your sentence; nothing is lost.</p>}

      {showVersions && (
        <div className="card small" style={{ margin: '12px 0' }}>
          <strong>Version history</strong> <span className="muted">(last 20, saved every couple of minutes and when you leave)</span>
          {versions?.length ? (
            <ul className="list">
              {versions.map((v) => (
                <li key={v.id} className="spread">
                  <span>{new Date(v.savedAt).toLocaleString()} · {v.words} words</span>
                  <button onClick={() => restore(v.id!)}>Restore</button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">No versions yet. Keep writing.</p>
          )}
        </div>
      )}

      {showPreview ? (
        <div className="prose" style={{ margin: '16px auto' }}>
          <ReactMarkdown>{text || '*Nothing written yet.*'}</ReactMarkdown>
        </div>
      ) : (
        <textarea
          ref={taRef}
          className="page"
          aria-label={label}
          value={text}
          placeholder={placeholder ?? 'Begin.'}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => flush(true)}
          spellCheck
          autoFocus
        />
      )}
      {nudge && <p className="nudge" role="status">{nudge}</p>}
    </div>
  );
}
