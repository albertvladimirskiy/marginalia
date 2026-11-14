import { useEffect, useRef, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../data/db';
import { downloadJsonBackup, downloadMarkdownZip, importBackup } from '../../data/backup';
import { syllabusById, trackName } from '../../curriculum';
import { addDays, localDate, weekStart } from '../../lib/dates';
import { computeStreak } from '../../lib/streak';
import { useSettings } from '../../lib/settings';
import { Write, kindLabel } from '../editor/Write';

const MILESTONE = 100_000;

export function Archive({ id }: { id?: string }) {
  if (id) return <Write id={id} />;
  return <ArchiveIndex />;
}

function ArchiveIndex() {
  const [q, setQ] = useState('');
  const data = useLiveQuery(async () => ({
    drafts: await db.drafts.orderBy('createdAt').reverse().toArray(),
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
      <h2>Every page</h2>
      <label htmlFor="search" className="sr-only">Search your writing</label>
      <input id="search" type="search" placeholder="Search everything you have written" value={q} onChange={(e) => setQ(e.target.value)} />
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
    </div>
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
