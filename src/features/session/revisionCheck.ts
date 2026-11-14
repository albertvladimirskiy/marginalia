import { db } from '../../data/db';
import type { LessonContent, Session } from '../../data/types';
import { getRound2 } from '../../ai/tutor';

/** Draft 1 scores by criterion: the mentor's if there are any, else the student's self-check. */
export function draft1Scores(s: Session): Record<string, number> | null {
  if (s.feedback1?.ok) return Object.fromEntries(s.feedback1.data.scores.map((x) => [x.criterion, x.score]));
  return s.selfScores ?? null;
}

/**
 * Second-round check: did Draft 2 fix priority 1, plus a short re-score on the
 * same criteria as Draft 1. Saves the result on the session. Throws on API errors.
 */
export async function runRevisionCheck(session: Session, lesson: LessonContent): Promise<void> {
  const [d1, d2] = await db.drafts.bulkGet([session.draft1Id ?? '', session.draft2Id ?? '']);
  if (!d1 || !d2) throw new Error('Both drafts are needed for a revision check.');
  const f = session.feedback1;
  const p1 = f?.ok ? f.data.priorities[0] : undefined;
  const priority = p1
    ? `Priority 1: ${p1.issue}. Evidence: "${p1.evidence}". Technique: ${p1.technique_to_apply}`
    : session.selfPriority
      ? `Student-identified priority 1: ${session.selfPriority}`
      : f && !f.ok
        ? `First-round feedback (unstructured): ${f.raw.slice(0, 800)}`
        : 'No priority was recorded. Judge the most significant problem in Draft 1.';
  const before = draft1Scores(session);
  const feedback2 = await getRound2({
    lessonTitle: lesson.title,
    draft1: d1.text,
    draft2: d2.text,
    priority,
    challenge: f?.ok ? f.data.revision_challenge : undefined,
    criteria: before ? Object.keys(before) : lesson.rubric,
    before,
  });
  await db.sessions.update(session.id, { feedback2 });
}
