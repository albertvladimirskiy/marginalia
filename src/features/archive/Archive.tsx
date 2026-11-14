import { useEffect, useRef, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../data/db';
import { downloadJsonBackup, downloadMarkdownZip, importBackup } from '../../data/backup';
import { syllabusById, trackName } from '../../curriculum';
import { addDays, localDate, weekStart } from '../../lib/dates';
import { computeStreak } from '../../lib/streak';
import { useSettings } from '../../lib/settings';
import { navigate, useRoute } from '../../lib/router';
import type { Draft, Session } from '../../data/types';
import { Write, kindLabel } from '../editor/Write';

const MILESTONE = 100_000;

export function Archive({ id }: { id?: string }) {
  if (id) return <Write id={id} />;
  return <ArchiveIndex />;
}

function ArchiveIndex() {
  const { query } = useRoute();
  const tab = query.get('tab') === 'sessions' ? 'sessions' : 'pages';
  const [q, setQ] = useState('');
  const data = useLiveQuery(async () => ({
    drafts: await db.drafts.orderBy('createdAt').reverse().toArray(),
    sessions: await db.sessions.orderBy('date').reverse().toArray(),
    log: await db.wordLog.toArray(),
    projects: await db.projects.toArray(),
  }), []);
  if (!data) return null;

  const needle = q.trim().toLowerCase();
  const shown = data.drafts.filter((d) => d.text.trim() && (!needle || d.title.toLowerCase().includes(needle) || d.text.toLowerCase().includes(needle)));

  return (
    <div>
      <h1>Archive</h1>
      <Pile log={data.log} projects={data.projects} />
      <Backup />
      <div className="tabs" role="tablist" style={{ marginTop: 28 }}>
        <button role="tab" aria-selected={tab === 'pages'} onClick={() => navigate('/archive')}>Every page</button>
        <button role="tab" aria-selected={tab === 'sessions'} onClick={() => navigate('/archive?tab=sessions')}>Sessions and feedback</button>
      </div>
      <label htmlFor="search" className="sr-only">Search</label>
      <input id="search" type="search" placeholder={tab === 'pages' ? 'Search everything you have written' : 'Search sessions, feedback and reflections'} value={q} onChange={(e) => setQ(e.target.value)} />
      {tab === 'sessions' ? <SessionList sessions={data.sessions} drafts={data.drafts} needle={needle} /> : (
      <>
      <p className="small muted">{shown.length} {shown.length === 1 ? 'piece' : 'pieces'}</p>
      <ul className="list">
        {shown.map((d) => {
          const lesson = d.lessonId ? syllabusById.get(d.lessonId) : undefined;
          const at = needle ? d.text.toLowerCase().indexOf(needle) : -1;
          return (
            <li key={d.id}>
              <div className="spread">
                <a href={`#/archive/${d.id}`}>{d.title}</a>
                <span className="small muted">{d.words} words</span>
              </div>
              <div className="small muted">
                {new Date(d.createdAt).toLocaleDateString()} · {kindLabel(d.kind)}
                {lesson && ` · ${lesson.title}`}
                {d.track && ` · ${trackName(d.track)}`}
              </div>
              {at >= 0 && <div className="small">…{d.text.slice(Math.max(0, at - 60), at + 80)}…</div>}
            </li>
          );
        })}
      </ul>
      </>
      )}
    </div>
  );
}

function sessionTitle(s: Session, drafts: Map<string, Draft>): string {
  if (s.kind === 'review') return `Review: ${drafts.get(s.reviewOfId ?? '')?.title ?? 'an older piece'}`;
  return (s.lessonId && syllabusById.get(s.lessonId)?.title) || 'Session';
}

/** One row per session, newest first, linking to the full record (drafts, feedback, revision check, reflection). */
function SessionList({ sessions, drafts, needle }: { sessions: Session[]; drafts: Draft[]; needle: string }) {
  const byId = new Map(drafts.map((d) => [d.id, d]));
  const rows = sessions
    .slice()
    .sort((a, b) => b.startedAt - a.startedAt)
    .filter((s) => !needle || `${sessionTitle(s, byId)} ${s.reflection ?? ''} ${s.selfPriority ?? ''} ${JSON.stringify(s.feedback1 ?? '')} ${JSON.stringify(s.feedback2 ?? '')}`.toLowerCase().includes(needle));
  if (!rows.length) return <p className="muted" style={{ marginTop: 16 }}>{needle ? 'No sessions match.' : 'No sessions yet. Your first one will appear here with its feedback.'}</p>;
  return (
    <>
      <p className="small muted">{rows.length} {rows.length === 1 ? 'session' : 'sessions'}</p>
      <ul className="list">
        {rows.map((s) => {
          const f = s.feedback1?.ok ? s.feedback1.data : undefined;
          const avg = f ? (f.scores.reduce((n, x) => n + x.score, 0) / f.scores.length).toFixed(1) : null;
          const verdict = s.feedback2?.ok ? { yes: 'revision fixed it', partially: 'revision partly fixed it', no: 'revision did not fix it' }[s.feedback2.data.resolved] : null;
          const detail = [
            s.completedAt ? null : s.setAsideAt ? 'set aside · open it to pick it back up' : 'in progress',
            s.longform ? 'long-form' : null,
            avg ? `average ${avg}/5` : s.feedback1 ? 'mentor feedback' : s.selfPriority ? 'self-check' : null,
            verdict,
          ].filter(Boolean).join(' · ');
          return (
            <li key={s.id}>
              <div className="spread">
                <a href={`#/session/${s.id}`}>{sessionTitle(s, byId)}</a>
                <span className="small muted">{new Date(s.startedAt).toLocaleDateString()}</span>
              </div>
              {detail && <div className="small muted">{detail}</div>}
              {s.reflection && <div className="small"><em>{s.reflection}</em></div>}
            </li>
          );
        })}
      </ul>
    </>
  );
}

/** The visible pile of pages: streak, totals, 100k progress, heat map, words per project. */
function Pile({ log, projects }: { log: { date: string; projectId: string; words: number }[]; projects: { id: string; title: string }[] }) {
  const byDate = new Map<string, number>();
  const byProject = new Map<string, number>();
  let total = 0;
  for (const r of log) {
    byDate.set(r.date, (byDate.get(r.date) ?? 0) + r.words);
    if (r.projectId) byProject.set(r.projectId, (byProject.get(r.projectId) ?? 0) + r.words);
    total += r.words;
  }
  const today = localDate();
  const streak = computeStreak(byDate, today);

  // 26 weeks ending this week, columns Monday→Sunday.
  const start = addDays(weekStart(today), -25 * 7);
  const cells: { date: string; words: number }[] = [];
  for (let d = start; d <= addDays(weekStart(today), 6); d = addDays(d, 1)) cells.push({ date: d, words: d > today ? -1 : (byDate.get(d) ?? 0) });
  const level = (w: number) => (w <= 0 ? 0 : w < 100 ? 1 : w < 300 ? 2 : w < 700 ? 3 : 4);

  return (
    <section>
      <div className="cards">
        <div className="card"><div className="stat">{total.toLocaleString()}</div><div className="small muted">words written</div></div>
        <div className="card"><div className="stat">{streak.current}</div><div className="small muted">day streak (one rest day a week allowed)</div></div>
        <div className="card">
          <div className="stat">{((total / MILESTONE) * 100).toFixed(1)}%</div>
          <div className="small muted">of the first 100,000 words</div>
          <progress max={MILESTONE} value={Math.min(total, MILESTONE)} aria-label="Progress to 100,000 words" />
        </div>
      </div>
      <h2>Days written</h2>
      <div className="heat" role="img" aria-label={`Heat map of the last 26 weeks: ${[...byDate.values()].filter((w) => w >= 100).length} days with 100 or more words`}>
        {cells.map((c) => <span key={c.date} data-l={level(c.words)} title={c.words >= 0 ? `${c.date}: ${c.words} words` : ''} style={c.words < 0 ? { visibility: 'hidden' } : undefined} />)}
      </div>
      {projects.length > 0 && (
        <p className="small muted">
          {projects.map((p) => `${p.title}: ${(byProject.get(p.id) ?? 0).toLocaleString()} words`).join(' · ')}
        </p>
      )}
    </section>
  );
}

function Backup() {
  const settings = useSettings();
  const [persisted, setPersisted] = useState<boolean | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const file = useRef<HTMLInputElement>(null);

  useEffect(() => {
    navigator.storage?.persisted?.().then(setPersisted).catch(() => setPersisted(null));
  }, []);

  async function restore(f: File) {
    if (!window.confirm('Restoring replaces everything in this browser with the backup. Continue?')) return;
    try {
      await importBackup(JSON.parse(await f.text()));
      setMsg('Restored.');
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'That file could not be restored.');
    }
  }

  async function run(fn: () => Promise<void>) {
    try {
      await fn();
      setMsg(null);
    } catch {
      setMsg('Export failed. Try again.');
    }
  }

  return (
    <section className="card" style={{ marginTop: 20 }}>
      <h2 style={{ marginTop: 0 }}>Your pages are yours</h2>
      <p className="small">
        Everything lives in this browser only. <strong>Clearing browser data erases everything you have not exported.</strong> Back up weekly.
        {settings.lastBackupAt ? ` Last backup: ${new Date(settings.lastBackupAt).toLocaleDateString()}.` : ' No backup yet.'}
        {persisted === true && ' Persistent storage is on.'}
        {persisted === false && ' The browser has not granted persistent storage; backups matter even more.'}
      </p>
      <div className="row">
        <button onClick={() => run(downloadMarkdownZip)}>Export all as Markdown (.zip)</button>
        <button onClick={() => run(downloadJsonBackup)}>Download full backup (.json)</button>
        <button onClick={() => file.current?.click()}>Restore from backup…</button>
        <input ref={file} type="file" accept="application/json,.json" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) restore(f); e.target.value = ''; }} />
      </div>
      {msg && <p className="small" role="status">{msg}</p>}
    </section>
  );
}
