import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../data/db';
import { createDraft } from '../../data/drafts';
import { SYLLABUS, syllabusById } from '../../curriculum';
import { planToday } from '../../lib/scheduler';
import { localDate } from '../../lib/dates';
import { computeStreak, MIN_DAILY_WORDS } from '../../lib/streak';
import { useSettings } from '../../lib/settings';
import { navigate } from '../../lib/router';
import { epigraphFor } from '../../masters/epigraphs';
import { reviewCandidates, startLessonSession, startReviewSession } from '../session/actions';

const WEEK_MS = 7 * 86_400_000;

export function Today() {
  const settings = useSettings();
  const today = localDate();
  const data = useLiveQuery(async () => {
    const [sessions, drafts, projects, log] = await Promise.all([db.sessions.toArray(), db.drafts.toArray(), db.projects.toArray(), db.wordLog.toArray()]);
    return { sessions, drafts, projects, log };
  }, []);
  if (!data) return null;

  const { sessions, drafts, projects, log } = data;
  const completed = new Set(sessions.filter((s) => s.completedAt && s.lessonId && s.kind === 'lesson').map((s) => s.lessonId!));
  const candidates = reviewCandidates(drafts, sessions);
  const plan = planToday({
    date: today,
    syllabus: SYLLABUS,
    completed,
    rotation: settings.rotation,
    longformCount: sessions.filter((s) => s.longform && s.completedAt).length,
    hasReviewable: candidates.length > 0,
    hasProject: projects.length > 0,
  });
  const open = sessions.filter((s) => !s.completedAt).sort((a, b) => b.startedAt - a.startedAt)[0];
  const doneToday = sessions.some((s) => s.date === today && s.completedAt);

  const byDate = new Map<string, number>();
  for (const r of log) byDate.set(r.date, (byDate.get(r.date) ?? 0) + r.words);
  const streak = computeStreak(byDate, today);
  const wordsToday = byDate.get(today) ?? 0;
  const hasHistory = byDate.size > 0;
  const backupDue = drafts.length > 0 && (!settings.lastBackupAt || Date.now() - settings.lastBackupAt > WEEK_MS);

  let title: string;
  let detail: string;
  if (plan.kind === 'lesson') {
    const e = syllabusById.get(plan.lessonId);
    title = e?.title ?? '';
    detail = plan.longform ? 'Long-form day: 800–1,500 words.' : (e?.objective ?? '');
  } else if (plan.kind === 'project') {
    title = projects[0]?.title ?? 'Long Project';
    detail = `Long Project day: ${projects[0]?.dailyGoal ?? 500} words on the book.`;
  } else {
    title = candidates[0] ? `Revise: ${candidates[0].title}` : 'Review';
    detail = 'Review day: revise an older piece.';
  }

  async function begin() {
    if (plan.kind === 'lesson') await startLessonSession(plan.lessonId, plan.longform);
    else if (plan.kind === 'project') navigate(`/studio/${projects[0]!.id}`);
    else if (candidates[0]) await startReviewSession(candidates[0]);
  }

  async function quickPage() {
    const d = await createDraft('scratch', `Free page ${today}`);
    navigate(`/archive/${d.id}`);
  }

  return (
    <div className="today">
      {open ? (
        <>
          <h1>Pick up where you left off.</h1>
          <p className="lede">{open.lessonId ? syllabusById.get(open.lessonId)?.title : 'Review session'}</p>
          <button className="primary big" onClick={() => navigate(`/session/${open.id}`)}>Resume today's session</button>
        </>
      ) : (
        <>
          <h1>{settings.name ? `${settings.name}, today:` : 'Today:'} {title}</h1>
          <p className="lede">{detail}</p>
          <button className="primary big" onClick={begin}>{doneToday ? 'Begin another session' : "Begin today's session"}</button>
        </>
      )}

      <p className="small" style={{ marginTop: 16 }}>
        <button className="link" onClick={quickPage}>Short on time? Write {MIN_DAILY_WORDS} words.</button>
      </p>

      <p className="muted small" style={{ marginTop: 32 }}>
        {wordsToday > 0 ? `${wordsToday} words today` : 'Nothing on the page yet today'}
        {streak.current > 0 && ` · ${streak.current}-day streak`}
        {streak.current > 0 && !streak.restUsedThisWeek && ' · rest day available this week'}
      </p>
      {hasHistory && streak.missedYesterday && !streak.todayDone && !open && (
        <p className="muted small">Yesterday was a rest. Never miss twice: {MIN_DAILY_WORDS} words keeps the thread.</p>
      )}
      {backupDue && (
        <p className="small"><a href="#/archive">Back up your pages</a> <span className="muted">— {settings.lastBackupAt ? 'it has been over a week' : 'no backup yet'}. Clearing browser data erases anything not exported.</span></p>
      )}

      <EpigraphBlock date={today} />
    </div>
  );
}

function EpigraphBlock({ date }: { date: string }) {
  const e = epigraphFor(date);
  return (
    <blockquote className="epigraph">
      {e.text}
      <cite>{e.source}</cite>
    </blockquote>
  );
}
