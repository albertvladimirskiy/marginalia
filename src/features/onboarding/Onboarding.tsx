import { useState } from 'react';
import { createDraft } from '../../data/drafts';
import { Editor } from '../editor/Editor';
import { setApiKey, updateSettings, useSettings, type Intensity } from '../../lib/settings';
import { navigate } from '../../lib/router';

const DAY0_PROMPT = 'In 100 words: what do you most want to write, and what has stopped you?';

/** A skippable 60-second setup, then Day 0: a five-minute freewrite saved as the first Archive entry. */
export function Onboarding() {
  const s = useSettings();
  const [name, setName] = useState(s.name);
  const [time, setTime] = useState(s.writingTime);
  const [intensity, setIntensity] = useState<Intensity>(s.intensity);
  const [key, setKey] = useState('');
  const [day0, setDay0] = useState<string | null>(null);
  const [words, setWords] = useState(0);

  async function begin() {
    updateSettings({ name: name.trim(), writingTime: time, intensity });
    if (key.trim()) setApiKey(key);
    const d = await createDraft('freewrite', 'Day 0');
    setDay0(d.id);
  }

  function finish() {
    updateSettings({ onboarded: true });
    navigate('/');
  }

  if (day0) {
    return (
      <main className="shell" style={{ maxWidth: 820, margin: '0 auto', padding: '32px 16px' }}>
        <p className="small muted hide-in-focus">Day 0</p>
        <h1 className="hide-in-focus">{DAY0_PROMPT}</h1>
        <p className="muted hide-in-focus">Five minutes. Don't stop, don't fix. This is the first page in your Archive.</p>
        <Editor draftId={day0} timerMinutes={5} minWords={100} onWords={setWords} label="Day 0 freewrite" />
        <div className="row hide-in-focus" style={{ marginTop: 16 }}>
          <button className="primary" onClick={finish}>{words >= 100 ? 'Save it and go to Today' : 'Save what I have and go to Today'}</button>
        </div>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 560, margin: '0 auto', padding: '8vh 16px 32px' }}>
      <h1>Marginalia</h1>
      <p className="lede">A writing tutor that makes you write. Every day, words on the page first; lessons are short, feedback is sharp, and the mentor never writes your work for you.</p>
      <form onSubmit={(e) => { e.preventDefault(); begin(); }}>
        <div className="field">
          <label htmlFor="o-name">What should I call you?</label>
          <input id="o-name" type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" />
        </div>
        <div className="field">
          <label htmlFor="o-time">When will you write each day?</label>
          <input id="o-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{ maxWidth: 160 }} />
        </div>
        <fieldset className="field" style={{ border: 'none', padding: 0 }}>
          <legend className="small muted">How should the mentor speak to you? (Tone only; it is honest either way.)</legend>
          <div className="row">
            {(['gentle', 'standard', 'blunt'] as const).map((i) => (
              <label key={i} className="check"><input type="radio" name="o-int" checked={intensity === i} onChange={() => setIntensity(i)} /> {i[0]!.toUpperCase() + i.slice(1)}</label>
            ))}
          </div>
        </fieldset>
        <div className="field">
          <label htmlFor="o-key">Anthropic API key (optional — add it later in Settings)</label>
          <input id="o-key" type="password" autoComplete="off" spellCheck={false} placeholder="sk-ant-…" value={key} onChange={(e) => setKey(e.target.value)} />
          <p className="small muted">Lessons, writing and the Archive work without it. The key is needed only for mentor feedback. Use a dedicated key with a spending limit; it stays in this browser.</p>
        </div>
        <div className="row">
          <button type="submit" className="primary big">Begin Day 0</button>
          <button type="button" className="link" onClick={finish}>Skip</button>
        </div>
      </form>
      <p className="small muted" style={{ marginTop: 24 }}>Your writing is stored only in this browser. Export backups from the Archive.</p>
    </main>
  );
}
