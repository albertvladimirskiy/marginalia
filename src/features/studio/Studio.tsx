import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, uid } from '../../data/db';
import { createDraft } from '../../data/drafts';
import type { Character, Project, SceneCard } from '../../data/types';
import { EMPTY_PREMISE_CARD, type EditorNotes, type PremiseCard } from '../../ai/schemas';
import { draftPremiseCard, editorNotes } from '../../ai/tutor';
import { hasKey, toAiError } from '../../ai/client';
import { Editor } from '../editor/Editor';
import { Chat } from '../session/Chat';
import { Field } from '../../lib/Field';
import { localDate } from '../../lib/dates';
import { useApiKey } from '../../lib/settings';
import { navigate } from '../../lib/router';

export function Studio({ id }: { id?: string }) {
  return id ? <ProjectPage id={id} /> : <ProjectList />;
}

function ProjectList() {
  const data = useLiveQuery(async () => ({ projects: await db.projects.orderBy('createdAt').toArray(), log: await db.wordLog.toArray() }), []);
  const [title, setTitle] = useState('');
  const [kind, setKind] = useState<Project['kind']>('novel');
  if (!data) return null;
  const words = (pid: string) => data.log.filter((r) => r.projectId === pid).reduce((n, r) => n + r.words, 0);

  async function create() {
    const p: Project = { id: uid(), title: title.trim(), kind, premise: '', premiseCard: { ...EMPTY_PREMISE_CARD }, references: [], characters: [], scenes: [], dailyGoal: 500, workshop: [], createdAt: Date.now() };
    await db.projects.add(p);
    navigate(`/studio/${p.id}`);
  }

  return (
    <div>
      <h1>Studio</h1>
      <p className="muted">Long projects. The mentor asks questions and gives observations; it never writes your book.</p>
      <div className="cards">
        {data.projects.map((p) => (
          <a key={p.id} href={`#/studio/${p.id}`} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <strong style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem' }}>{p.title}</strong>
            <div className="small muted">{p.kind} · {words(p.id).toLocaleString()} words</div>
            {p.premise && <p className="small">{p.premise.slice(0, 140)}{p.premise.length > 140 ? '…' : ''}</p>}
          </a>
        ))}
      </div>
      <h2>New project</h2>
      <form className="row" onSubmit={(e) => { e.preventDefault(); create(); }}>
        <label htmlFor="pt" className="sr-only">Title</label>
        <input id="pt" type="text" placeholder="Working title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ flex: 2, minWidth: 180 }} />
        <label htmlFor="pk" className="sr-only">Kind</label>
        <select id="pk" value={kind} onChange={(e) => setKind(e.target.value as Project['kind'])} style={{ flex: 1, minWidth: 140 }}>
          <option value="novel">Novel</option>
          <option value="screenplay">Screenplay</option>
          <option value="collection">Essay collection</option>
          <option value="other">Other</option>
        </select>
        <button type="submit" disabled={!title.trim()}>Create</button>
      </form>
    </div>
  );
}

const TABS = [['write', 'Write'], ['premise', 'Premise'], ['characters', 'Characters'], ['outline', 'Outline'], ['editor', 'Editor mode'], ['shelf', 'Shelf']] as const;
type Tab = (typeof TABS)[number][0];

function ProjectPage({ id }: { id: string }) {
  const project = useLiveQuery(() => db.projects.get(id), [id]);
  const [tab, setTab] = useState<Tab>('write');
  if (project === undefined) return null;
  if (!project) return <p>Project not found. <a href="#/studio">Studio</a></p>;
  const upd = (patch: Partial<Project>) => db.projects.update(id, patch);

  return (
    <div>
      <div className="hide-in-focus">
        <p className="small"><a href="#/studio">← Studio</a></p>
        <Field id="ptitle" label="Project title" value={project.title} onSave={(title) => upd({ title })} hideLabel />
        <div className="tabs" role="tablist">
          {TABS.map(([t, label]) => <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}>{label}</button>)}
        </div>
      </div>
      {tab === 'write' && <WriteTab project={project} upd={upd} />}
      {tab === 'premise' && <PremiseTab project={project} upd={upd} />}
      {tab === 'characters' && <CharactersTab project={project} upd={upd} />}
      {tab === 'outline' && <OutlineTab project={project} upd={upd} />}
      {tab === 'editor' && <EditorTab project={project} />}
      {tab === 'shelf' && <ShelfTab project={project} upd={upd} />}
    </div>
  );
}

type TabProps = { project: Project; upd: (p: Partial<Project>) => void };

function move<T>(arr: T[], i: number, d: -1 | 1): T[] {
  const j = i + d;
  if (j < 0 || j >= arr.length) return arr;
  const out = [...arr];
  [out[i], out[j]] = [out[j]!, out[i]!];
  return out;
}

function WriteTab({ project, upd }: TabProps) {
  const chapters = useLiveQuery(() => db.drafts.where('projectId').equals(project.id).sortBy('order'), [project.id]);
  const today = useLiveQuery(() => db.wordLog.get(`${localDate()}|${project.id}`), [project.id]);
  const [open, setOpen] = useState<string | null>(null);
  if (!chapters) return null;
  const written = today?.words ?? 0;
  const current = open ?? chapters[chapters.length - 1]?.id ?? null;

  async function addChapter() {
    const d = await createDraft('chapter', `Chapter ${chapters!.length + 1}`, { projectId: project.id, order: chapters!.length });
    setOpen(d.id);
  }
  async function reorder(i: number, dir: -1 | 1) {
    const next = move(chapters!, i, dir);
    await db.transaction('rw', db.drafts, () => Promise.all(next.map((c, order) => db.drafts.update(c.id, { order }))));
  }

  return (
    <div>
      <section className="card hide-in-focus">
        <div className="spread">
          <strong>Daily {project.dailyGoal}</strong>
          <span className="small">{written} / {project.dailyGoal} words today</span>
        </div>
        <progress max={project.dailyGoal} value={Math.min(written, project.dailyGoal)} aria-label="Today's words toward your daily goal" />
        <div className="row small" style={{ marginTop: 8 }}>
          <label htmlFor="goal" style={{ margin: 0 }}>Daily goal</label>
          <input id="goal" type="number" min={50} step={50} value={project.dailyGoal} onChange={(e) => upd({ dailyGoal: Math.max(50, Number(e.target.value) || 500) })} style={{ width: 100 }} />
        </div>
      </section>

      <section className="hide-in-focus">
        <h2>Chapters</h2>
        {chapters.length === 0 && <p className="muted">No chapters yet. The book begins with one.</p>}
        <ul className="list">
          {chapters.map((c, i) => (
            <li key={c.id} className="spread">
              <button className="link" onClick={() => setOpen(c.id)} aria-current={c.id === current ? 'true' : undefined} style={{ fontWeight: c.id === current ? 600 : 400 }}>{c.title}</button>
              <span className="row small">
                <span className="muted">{c.words} words</span>
                <button onClick={() => reorder(i, -1)} disabled={i === 0} aria-label={`Move ${c.title} up`}>↑</button>
                <button onClick={() => reorder(i, 1)} disabled={i === chapters.length - 1} aria-label={`Move ${c.title} down`}>↓</button>
                <a href={`#/archive/${c.id}`}>Rename</a>
              </span>
            </li>
          ))}
        </ul>
        <button onClick={addChapter} style={{ marginTop: 8 }}>Add chapter</button>
      </section>

      {current && (
        <section style={{ marginTop: 20 }}>
          <Editor key={current} draftId={current} preview label="Chapter draft (Markdown)" placeholder="Write the chapter. Markdown works: *italics*, **bold**, # headings." />
        </section>
      )}
    </div>
  );
}

const CARD_FIELDS: [keyof PremiseCard, string][] = [
  ['logline', 'Logline (one sentence)'],
  ['want', 'What he wants'],
  ['need', 'What he needs'],
  ['lie', 'The lie he believes'],
  ['irony', 'Where the irony lives'],
  ['stance', 'Narrative stance (confessional monologue, close third…)'],
  ['tone', 'Tone'],
  ['endingQuestion', 'What the ending asks'],
];

function PremiseTab({ project, upd }: TabProps) {
  useApiKey();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const studentTurns = project.workshop.filter((m) => m.role === 'user' && m.content !== 'Begin.').length;

  const context = async () =>
    `<premise_in_student_words>${project.premise || '(none yet)'}</premise_in_student_words>
<premise_card_so_far>${JSON.stringify(project.premiseCard)}</premise_card_so_far>
<reference_shelf>${project.references.join('; ')}</reference_shelf>`;

  async function draftCard() {
    const filled = Object.values(project.premiseCard).some((v) => v.trim());
    if (filled && !window.confirm('Replace the current Premise Card with a summary of the workshop?')) return;
    setBusy(true);
    setError(null);
    try {
      const r = await draftPremiseCard(project.premise, project.workshop);
      if (r.ok) upd({ premiseCard: r.data });
      else setError('The card came back unreadable. Try again.');
    } catch (e) {
      setError(toAiError(e).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="split with-panel">
      <div>
        <Field id="premise" label="Premise, in your words" rows={4} value={project.premise} onSave={(premise) => upd({ premise })} />
        <h2>Premise Card</h2>
        <p className="small muted">Yours to edit. If the mentor drafts it, it summarizes only what you said.</p>
        {CARD_FIELDS.map(([k, label]) => (
          <Field key={k} id={`card-${k}`} label={label} rows={2} value={project.premiseCard[k]} onSave={(v) => upd({ premiseCard: { ...project.premiseCard, [k]: v } })} />
        ))}
      </div>
      <aside className="panel" aria-label="Premise Workshop">
        <h2 style={{ marginTop: 0 }}>Premise Workshop</h2>
        <p className="small muted">A Socratic dialogue: the mentor asks, one question at a time. It never supplies plot, characters or scenes.</p>
        <Chat kind="premise" history={project.workshop} onHistory={(workshop) => upd({ workshop })} context={context} startLabel="Begin the workshop" placeholder="Answer in your own words." />
        {hasKey() && studentTurns >= 8 && (
          <div className="stack" style={{ marginTop: 12 }}>
            <button className="primary" onClick={draftCard} disabled={busy}>{busy ? 'Drafting…' : 'Draft my Premise Card from this conversation'}</button>
          </div>
        )}
        {hasKey() && studentTurns > 0 && studentTurns < 8 && <p className="small muted">After about eight answers you can turn the conversation into a Premise Card ({studentTurns}/8).</p>}
        {error && <p className="note error small" role="alert">{error}</p>}
        {project.workshop.length > 0 && (
          <button className="link small" onClick={() => window.confirm('Clear the workshop conversation? The Premise Card stays.') && upd({ workshop: [] })}>Start the workshop over</button>
        )}
      </aside>
    </div>
  );
}

const CHAR_FIELDS: [keyof Omit<Character, 'id' | 'name'>, string][] = [['want', 'Wants'], ['fear', 'Fears'], ['contradiction', 'Contradiction'], ['voice', 'Voice (how they talk)'], ['notes', 'Notes and history']];

function CharactersTab({ project, upd }: TabProps) {
  const setChar = (i: number, patch: Partial<Character>) => upd({ characters: project.characters.map((c, j) => (j === i ? { ...c, ...patch } : c)) });
  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Character bible</h2>
      {project.characters.length === 0 && <p className="muted">No one yet.</p>}
      {project.characters.map((c, i) => (
        <details key={c.id} className="card" style={{ marginBottom: 12 }} open={!c.name}>
          <summary style={{ cursor: 'pointer', fontFamily: 'var(--serif)', fontSize: '1.1rem' }}>{c.name || 'Unnamed'}</summary>
          <div style={{ marginTop: 12 }}>
            <Field id={`cn-${c.id}`} label="Name" value={c.name} onSave={(name) => setChar(i, { name })} />
            {CHAR_FIELDS.map(([k, label]) => <Field key={k} id={`c-${k}-${c.id}`} label={label} rows={2} value={c[k]} onSave={(v) => setChar(i, { [k]: v })} />)}
            <button onClick={() => window.confirm(`Remove ${c.name || 'this character'}?`) && upd({ characters: project.characters.filter((x) => x.id !== c.id) })}>Remove</button>
          </div>
        </details>
      ))}
      <button onClick={() => upd({ characters: [...project.characters, { id: uid(), name: '', want: '', fear: '', contradiction: '', voice: '', notes: '' }] })}>Add character</button>
    </div>
  );
}

function OutlineTab({ project, upd }: TabProps) {
  const setScene = (i: number, patch: Partial<SceneCard>) => upd({ scenes: project.scenes.map((s, j) => (j === i ? { ...s, ...patch } : s)) });
  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Outline</h2>
      <p className="small muted">Scene cards in order. Every scene: a goal, a conflict, a turn.</p>
      <ol className="list">
        {project.scenes.map((s, i) => (
          <li key={s.id} className="card" style={{ marginBottom: 12 }}>
            <div className="spread">
              <strong className="small muted">Scene {i + 1}</strong>
              <span className="row">
                <button onClick={() => upd({ scenes: move(project.scenes, i, -1) })} disabled={i === 0} aria-label={`Move scene ${i + 1} up`}>↑</button>
                <button onClick={() => upd({ scenes: move(project.scenes, i, 1) })} disabled={i === project.scenes.length - 1} aria-label={`Move scene ${i + 1} down`}>↓</button>
                <button onClick={() => window.confirm('Remove this scene card?') && upd({ scenes: project.scenes.filter((x) => x.id !== s.id) })}>Remove</button>
              </span>
            </div>
            <Field id={`st-${s.id}`} label="Title" value={s.title} onSave={(title) => setScene(i, { title })} />
            <Field id={`sg-${s.id}`} label="Goal (who wants what)" rows={2} value={s.goal} onSave={(goal) => setScene(i, { goal })} />
            <Field id={`sc-${s.id}`} label="Conflict (what stands in the way)" rows={2} value={s.conflict} onSave={(conflict) => setScene(i, { conflict })} />
            <Field id={`su-${s.id}`} label="Turn (what has changed by the end)" rows={2} value={s.turn} onSave={(turn) => setScene(i, { turn })} />
          </li>
        ))}
      </ol>
      <button onClick={() => upd({ scenes: [...project.scenes, { id: uid(), title: '', goal: '', conflict: '', turn: '' }] })}>Add scene card</button>
    </div>
  );
}

function EditorTab({ project }: { project: Project }) {
  useApiKey();
  const chapters = useLiveQuery(() => db.drafts.where('projectId').equals(project.id).sortBy('order'), [project.id]);
  const [chapterId, setChapterId] = useState('');
  const [pasted, setPasted] = useState('');
  const [notes, setNotes] = useState<EditorNotes | null>(null);
  const [raw, setRaw] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chapter = chapters?.find((c) => c.id === chapterId);
  const shown = notes ?? chapter?.editorNotes ?? null;

  async function run() {
    const text = chapter ? ((await db.drafts.get(chapter.id))?.text ?? '') : pasted;
    setBusy(true);
    setError(null);
    setRaw(null);
    try {
      const r = await editorNotes(project.premise, text);
      if (r.ok) {
        setNotes(r.data);
        if (chapter) await db.drafts.update(chapter.id, { editorNotes: r.data });
      } else setRaw(r.raw);
    } catch (e) {
      setError(toAiError(e).message);
    } finally {
      setBusy(false);
    }
  }

  const text = chapter ? chapter.text : pasted;
  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Editor mode</h2>
      <p className="small muted">Developmental questions and observations on a scene or chapter. The mentor does not rewrite your prose.</p>
      <div className="field">
        <label htmlFor="ech">Chapter</label>
        <select id="ech" value={chapterId} onChange={(e) => { setChapterId(e.target.value); setNotes(null); setRaw(null); }}>
          <option value="">Paste a scene instead</option>
          {chapters?.map((c) => <option key={c.id} value={c.id}>{c.title} ({c.words} words)</option>)}
        </select>
      </div>
      {!chapter && (
        <div className="field">
          <label htmlFor="paste">Scene or chapter</label>
          <textarea id="paste" rows={10} value={pasted} onChange={(e) => setPasted(e.target.value)} style={{ fontFamily: 'var(--serif)' }} />
        </div>
      )}
      {hasKey() ? (
        <button className="primary" onClick={run} disabled={busy || text.trim().length < 100}>{busy ? 'Reading…' : 'Ask for developmental notes'}</button>
      ) : (
        <p className="small"><a href="#/settings">Add your API key</a> to use Editor mode.</p>
      )}
      {error && <p className="note error" role="alert">{error}</p>}
      {raw && <div className="card prose" style={{ whiteSpace: 'pre-wrap', marginTop: 16 }}>{raw}</div>}
      {shown && (
        <section className="card" style={{ marginTop: 16 }}>
          <h3 style={{ marginTop: 0 }}>Observations</h3>
          <ul>{shown.observations.map((o) => <li key={o}>{o}</li>)}</ul>
          <h3>Questions</h3>
          <ol>{shown.questions.map((q) => <li key={q}>{q}</li>)}</ol>
          <p><span className="muted">Against the premise:</span> {shown.structural_note}</p>
        </section>
      )}
    </div>
  );
}

function ShelfTab({ project, upd }: TabProps) {
  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Reference shelf</h2>
      <p className="small muted">Touchstones for the book, one per line.</p>
      <Field id="shelf" label="References" hideLabel rows={12} value={project.references.join('\n')} onSave={(v) => upd({ references: v.split('\n') })} />
    </div>
  );
}
