import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../data/db';
import { setApiKey, updateSettings, useApiKey, useSettings, type Settings as S } from '../../lib/settings';
import { MODELS } from '../../ai/client';
import { DEFAULT_ROTATION, type Slot } from '../../lib/scheduler';
import { TRACKS } from '../../curriculum';
import { reminderIcs } from '../../lib/ics';
import { downloadBlob } from '../../data/backup';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const SLOTS: { id: Slot; label: string }[] = [
  ...TRACKS.map((t) => ({ id: t.id as Slot, label: t.name })),
  { id: 'project', label: 'Long Project' },
  { id: 'longform', label: 'Long-form day (800–1,500 words)' },
  { id: 'review', label: 'Review: revise an older piece' },
];

const usd = (n: number) => `$${n.toFixed(n < 1 ? 4 : 2)}`;

export function Settings() {
  const s = useSettings();
  const key = useApiKey();
  const [draftKey, setDraftKey] = useState('');
  const [show, setShow] = useState(false);
  const lastSession = useLiveQuery(() => db.sessions.orderBy('date').reverse().filter((x) => x.usage.costUsd > 0).first(), []);
  const set = <K extends keyof S>(k: K, v: S[K]) => updateSettings({ [k]: v } as Partial<S>);

  return (
    <div style={{ maxWidth: 640 }}>
      <h1>Settings</h1>

      <h2>You</h2>
      <div className="field">
        <label htmlFor="name">Display name</label>
        <input id="name" type="text" value={s.name} onChange={(e) => set('name', e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="time">Preferred writing time</label>
        <div className="row">
          <input id="time" type="time" value={s.writingTime} onChange={(e) => set('writingTime', e.target.value)} style={{ maxWidth: 160 }} />
          <button onClick={() => downloadBlob(new Blob([reminderIcs(s.writingTime)], { type: 'text/calendar' }), 'marginalia-daily.ics')}>Download daily reminder (.ics)</button>
        </div>
        <p className="small muted">Open the file to add a repeating daily event to your calendar. No notifications server is involved.</p>
      </div>

      <h2>The mentor</h2>
      <fieldset className="field" style={{ border: 'none', padding: 0 }}>
        <legend className="small muted">Intensity: changes tone, never honesty</legend>
        <div className="row">
          {(['gentle', 'standard', 'blunt'] as const).map((i) => (
            <label key={i} className="check"><input type="radio" name="intensity" checked={s.intensity === i} onChange={() => set('intensity', i)} /> {i[0]!.toUpperCase() + i.slice(1)}</label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="key">Anthropic API key</label>
        <p className="note small">
          Use a <strong>dedicated key with a spending limit</strong>. The key lives only in this browser (localStorage) and is sent only to Anthropic's API, directly from your browser. It is never included in backups or exports. Anyone with access to this browser profile can read it.
        </p>
        {key ? (
          <div className="row">
            <span className="small">Key saved: <code>{key.slice(0, 7)}…{key.slice(-4)}</code></span>
            <button onClick={() => setApiKey('')}>Remove key</button>
          </div>
        ) : (
          <form className="row" onSubmit={(e) => { e.preventDefault(); setApiKey(draftKey); setDraftKey(''); }}>
            <input id="key" type={show ? 'text' : 'password'} autoComplete="off" spellCheck={false} placeholder="sk-ant-…" value={draftKey} onChange={(e) => setDraftKey(e.target.value)} style={{ flex: 1, minWidth: 200 }} />
            <button type="button" onClick={() => setShow((v) => !v)} aria-pressed={show}>{show ? 'Hide' : 'Show'}</button>
            <button type="submit" className="primary" disabled={!draftKey.trim()}>Save key</button>
          </form>
        )}
      </div>
      <div className="field">
        <label htmlFor="model">Model for feedback and chat</label>
        <select id="model" value={s.model} onChange={(e) => set('model', e.target.value)}>
          {MODELS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="lmodel">Model for generating lessons</label>
        <select id="lmodel" value={s.lessonModel} onChange={(e) => set('lessonModel', e.target.value)}>
          {MODELS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
        </select>
      </div>
      <div className="card small">
        <strong>Approximate API cost</strong>
        <p style={{ margin: '4px 0' }}>
          {lastSession ? `Last session with AI (${lastSession.date}): ${usd(lastSession.usage.costUsd)} · ${(lastSession.usage.inputTokens + lastSession.usage.outputTokens).toLocaleString()} tokens. ` : 'No AI sessions yet. '}
          All time: {usd(s.usageTotal.costUsd)} · {(s.usageTotal.inputTokens + s.usageTotal.outputTokens).toLocaleString()} tokens.
        </p>
        <p className="muted" style={{ margin: 0 }}>Estimated from list prices; your Anthropic console is the source of truth.</p>
      </div>

      <h2>The page</h2>
      <div className="field">
        <label htmlFor="theme">Theme</label>
        <select id="theme" value={s.theme} onChange={(e) => set('theme', e.target.value as S['theme'])}>
          <option value="system">Follow the system</option>
          <option value="light">Warm paper (light)</option>
          <option value="dark">Deep ink (dark)</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="size">Editor font size: {s.fontSize}px</label>
        <input id="size" type="range" min={16} max={28} value={s.fontSize} onChange={(e) => set('fontSize', Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent)' }} />
      </div>
      <div className="field">
        <label htmlFor="timer">Default draft timer (minutes)</label>
        <input id="timer" type="number" min={1} max={120} value={s.timerMinutes} onChange={(e) => set('timerMinutes', Math.max(1, Number(e.target.value) || 25))} style={{ maxWidth: 120 }} />
      </div>
      <label className="check field"><input type="checkbox" checked={s.warmup} onChange={(e) => set('warmup', e.target.checked)} /> Five-minute warm-up freewrite before each lesson</label>
      <label className="check field"><input type="checkbox" checked={s.nudge} onChange={(e) => set('nudge', e.target.checked)} /> "Keep the pen moving" prompt after a minute idle</label>

      <h2>Weekly rotation</h2>
      <p className="small muted">The first fourteen sessions are always the Foundations fortnight. After that, each weekday follows this plan.</p>
      {DAYS.map((d, i) => (
        <div className="field row" key={d}>
          <label htmlFor={`day${i}`} style={{ width: 110, margin: 0 }}>{d}</label>
          <select id={`day${i}`} value={s.rotation[i] ?? DEFAULT_ROTATION[i]} style={{ flex: 1 }}
            onChange={(e) => set('rotation', s.rotation.map((x, j) => (j === i ? (e.target.value as Slot) : x)))}>
            {SLOTS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
        </div>
      ))}
      <button onClick={() => set('rotation', DEFAULT_ROTATION)}>Restore the default rotation</button>
    </div>
  );
}
