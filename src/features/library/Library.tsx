import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, uid } from '../../data/db';
import { createDraft } from '../../data/drafts';
import { MASTERS, masterById, type Master } from '../../masters/masters';
import { Editor } from '../editor/Editor';
import { ImitationResult } from './ImitationResult';
import { judgeImitation } from '../../ai/tutor';
import { hasKey, toAiError } from '../../ai/client';
import { useApiKey } from '../../lib/settings';
import { navigate } from '../../lib/router';
import { Field } from '../../lib/Field';

export function Library({ sub }: { sub?: string }) {
  const tab = sub === 'reading' ? 'reading' : sub === 'gym' || sub?.startsWith('gym') ? 'gym' : 'masters';
  const master = sub && masterById.get(sub);
  const gymId = sub?.startsWith('gym-') ? sub.slice(4) : undefined;
  return (
    <div>
      <h1>Library</h1>
      <div className="tabs" role="tablist">
        <button role="tab" aria-selected={tab === 'masters'} onClick={() => navigate('/library')}>Masters</button>
        <button role="tab" aria-selected={tab === 'reading'} onClick={() => navigate('/library/reading')}>Reading Log</button>
        <button role="tab" aria-selected={tab === 'gym'} onClick={() => navigate('/library/gym')}>Imitation Gym</button>
      </div>
      {master ? <MasterDetail master={master} /> : tab === 'reading' ? <ReadingLog /> : tab === 'gym' ? <Gym draftId={gymId} /> : <MasterIndex />}
    </div>
  );
}

function MasterIndex() {
  return (
    <div className="cards">
      {MASTERS.map((m) => (
        <a key={m.id} href={`#/library/${m.id}`} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <strong style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem' }}>{m.name}</strong>
          <div className="small muted">{m.dates}</div>
          <div className="small" style={{ marginTop: 6 }}>{m.techniques[0]}</div>
        </a>
      ))}
    </div>
  );
}

function MasterDetail({ master: m }: { master: Master }) {
  return (
    <article>
      <h2 style={{ marginTop: 0 }}>{m.name} <span className="small muted">{m.dates}</span></h2>
      <p className="prose">{m.method}</p>
      <h3>Signature techniques</h3>
      <ol>{m.techniques.map((t) => <li key={t}>{t}</li>)}</ol>
      <div className="cards">
        <div className="card"><strong>What to steal</strong><p className="small">{m.steal}</p></div>
        <div className="card"><strong>What to avoid</strong><p className="small">{m.avoid}</p></div>
      </div>
      <h3>Exercises</h3>
      <ul className="list">
        {m.exercises.map((e) => (
          <li key={e} className="spread">
            <span>{e}</span>
            <button onClick={() => startImitation(m, m.techniques[0], e)}>Write this</button>
          </li>
        ))}
      </ul>
      <h3>Suggested reading order</h3>
      <ol>{m.readingOrder.map((r) => <li key={r}>{r}</li>)}</ol>
      <p className="small"><a href="#/library">← All masters</a></p>
    </article>
  );
}

async function startImitation(m: Master, technique: string, exercise: string) {
  const d = await createDraft('imitation', `After ${m.name}: ${exercise.slice(0, 60)}`, { imitation: { masterId: m.id, technique } });
  navigate(`/library/gym-${d.id}`);
}

function ReadingLog() {
  const entries = useLiveQuery(() => db.readingLog.toArray(), []);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  if (!entries) return null;
  const read = entries.filter((e) => e.read).length;
  return (
    <div>
      <p className="muted">{read} of {entries.length} read. Write what you noticed, not what the book is about.</p>
      <ul className="list">
        {entries.map((e) => (
          <li key={e.id}>
            <details>
              <summary className="spread" style={{ cursor: 'pointer' }}>
                <span><span style={{ fontFamily: 'var(--serif)' }}>{e.title}</span> <span className="small muted">— {e.author}</span></span>
                <span className="small muted">{e.read ? `read${e.finishedAt ? ` ${new Date(e.finishedAt).toLocaleDateString()}` : ''}` : 'unread'}</span>
              </summary>
              <div className="stack" style={{ padding: '10px 0' }}>
                <label className="check"><input type="checkbox" checked={e.read} onChange={(ev) => db.readingLog.update(e.id, { read: ev.target.checked, finishedAt: ev.target.checked ? Date.now() : undefined })} /> Read</label>
                <Field id={`n-${e.id}`} label="Notes" rows={3} value={e.notes} onSave={(notes) => db.readingLog.update(e.id, { notes })} />
                <Field id={`w-${e.id}`} label="What I noticed (technique, not plot)" rows={3} value={e.noticed} onSave={(noticed) => db.readingLog.update(e.id, { noticed })} />
              </div>
            </details>
          </li>
        ))}
      </ul>
      <form className="row" style={{ marginTop: 16 }} onSubmit={(ev) => {
        ev.preventDefault();
        db.readingLog.add({ id: uid(), title: title.trim(), author: author.trim(), read: false, notes: '', noticed: '' });
        setTitle('');
        setAuthor('');
      }}>
        <label htmlFor="rt" className="sr-only">Title</label>
        <input id="rt" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ flex: 2, minWidth: 160 }} />
        <label htmlFor="ra" className="sr-only">Author</label>
        <input id="ra" type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} style={{ flex: 1, minWidth: 120 }} />
        <button type="submit" disabled={!title.trim()}>Add book</button>
      </form>
    </div>
  );
}

function Gym({ draftId }: { draftId?: string }) {
  const imitations = useLiveQuery(() => db.drafts.where('kind').equals('imitation').reverse().sortBy('createdAt'), []);
  const [masterId, setMasterId] = useState(MASTERS[0]!.id);
  const master = masterById.get(masterId)!;
  const [technique, setTechnique] = useState(master.techniques[0]);

  if (draftId) return <GymSession draftId={draftId} />;

  return (
    <div>
      <p className="muted">Imitate a master's technique on your own material. The mentor judges whether you captured the method, and whether you slid into copying the surface.</p>
      <div className="field">
        <label htmlFor="gm">Master</label>
        <select id="gm" value={masterId} onChange={(e) => { setMasterId(e.target.value); setTechnique(masterById.get(e.target.value)!.techniques[0]); }}>
          {MASTERS.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="gt">Technique</label>
        <select id="gt" value={technique} onChange={(e) => setTechnique(e.target.value)}>
          {master.techniques.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <p className="small"><strong>Steal:</strong> {master.steal} <strong>Avoid:</strong> {master.avoid}</p>
      <h3>Pick an exercise</h3>
      <ul className="list">
        {master.exercises.map((e) => (
          <li key={e} className="spread"><span>{e}</span><button className="primary" onClick={() => startImitation(master, technique, e)}>Begin</button></li>
        ))}
      </ul>
      {imitations && imitations.length > 0 && (
        <>
          <h3>Past attempts</h3>
          <ul className="list">
            {imitations.map((d) => (
              <li key={d.id} className="spread">
                <a href={`#/library/gym-${d.id}`}>{d.title}</a>
                <span className="small muted">{d.words} words{d.imitation?.judgment ? ` · ${d.imitation.judgment.score}/5` : ''}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function GymSession({ draftId }: { draftId: string }) {
  useApiKey();
  const draft = useLiveQuery(() => db.drafts.get(draftId), [draftId]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [raw, setRaw] = useState<string | null>(null);
  if (draft === undefined) return null;
  if (!draft?.imitation) return <p>Attempt not found. <a href="#/library/gym">Imitation Gym</a></p>;
  const master = masterById.get(draft.imitation.masterId);
  if (!master) return null;

  async function judge() {
    setBusy(true);
    setError(null);
    setRaw(null);
    try {
      const fresh = await db.drafts.get(draftId);
      const r = await judgeImitation(master!, draft!.imitation!.technique, fresh?.text ?? '');
      if (r.ok) await db.drafts.update(draftId, { imitation: { ...draft!.imitation!, judgment: r.data } });
      else setRaw(r.raw);
    } catch (e) {
      setError(toAiError(e).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="hide-in-focus">
        <p className="small"><a href="#/library/gym">← Imitation Gym</a></p>
        <h2 style={{ marginTop: 0 }}>{draft.title}</h2>
        <p><span className="muted">Technique:</span> {draft.imitation.technique}</p>
        <p className="small muted">Your material, their method. {master.avoid}</p>
      </div>
      <Editor draftId={draftId} label="Imitation" minWords={150} />
      <div className="row hide-in-focus" style={{ marginTop: 16 }}>
        {hasKey() ? (
          <button className="primary" onClick={judge} disabled={busy || draft.words < 50}>{busy ? 'Judging…' : 'Judge my imitation'}</button>
        ) : (
          <span className="small"><a href="#/settings">Add your API key</a> to have the mentor judge it. Your attempt is saved.</span>
        )}
      </div>
      {error && <p className="note error" role="alert">{error}</p>}
      {raw && <div className="card prose" style={{ whiteSpace: 'pre-wrap', marginTop: 16 }}>{raw}</div>}
      {draft.imitation.judgment && <ImitationResult judgment={draft.imitation.judgment} />}
    </div>
  );
}
