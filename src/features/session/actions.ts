import { db, uid } from '../../data/db';
import type { Draft, LessonContent, Session } from '../../data/types';
import { createDraft } from '../../data/drafts';
import { localDate } from '../../lib/dates';
import { getSettings } from '../../lib/settings';
import { navigate } from '../../lib/router';
import { LONGFORM_RANGE } from '../../lib/scheduler';

const ZERO = { inputTokens: 0, outputTokens: 0, costUsd: 0 };

export async function startLessonSession(lessonId: string, longform = false): Promise<void> {
  const session: Session = {
    id: uid(),
    date: localDate(),
    kind: 'lesson',
    lessonId,
    longform,
    step: getSettings().warmup ? 'warmup' : 'lesson',
    study: [],
    usage: ZERO,
    startedAt: Date.now(),
  };
  await db.sessions.add(session);
  navigate(`/session/${session.id}`);
}

/** Drafts worth revisiting: Draft 1/2 and freewrites at least 3 days old, oldest-untouched first, not reviewed already. */
export function reviewCandidates(drafts: Draft[], sessions: Session[]): Draft[] {
  const reviewed = new Set(sessions.map((s) => s.reviewOfId).filter(Boolean));
  const cutoff = Date.now() - 3 * 86_400_000;
  return drafts
    .filter((d) => ['draft1', 'draft2', 'freewrite'].includes(d.kind) && d.createdAt < cutoff && d.words >= 50 && !reviewed.has(d.id))
    .sort((a, b) => a.updatedAt - b.updatedAt);
}

export async function startReviewSession(old: Draft): Promise<void> {
  const id = uid();
  const draft1 = await createDraft('draft1', `Review: ${old.title}`, { text: old.text, track: old.track, lessonId: old.lessonId, sessionId: id });
  const session: Session = {
    id,
    date: localDate(),
    kind: 'review',
    reviewOfId: old.id,
    lessonId: old.lessonId,
    step: 'draft',
    study: [],
    draft1Id: draft1.id,
    usage: ZERO,
    startedAt: Date.now(),
  };
  await db.sessions.add(session);
  navigate(`/session/${id}`);
}

export function reviewLesson(old: Draft): LessonContent {
  return {
    id: 'review',
    track: old.track ?? 'foundations',
    masterLens: 'Tolstoy: revision as re-seeing',
    title: `Review: ${old.title}`,
    hook: 'Sunday is for going back. A draft you wrote days ago is now a stranger’s page, which is exactly why you can see it.',
    body: 'Read the piece once, straight through, without touching it. Then decide, in one sentence, what it is really about. Revise in order: purpose, structure, sentences. Cut the warm-up. Cut the explaining ending. Replace the abstractions. The goal is not a polished copy of the old piece but a better piece.',
    modelPassage: { text: '', source: '' },
    questions: [],
    exercise: {
      prompt: 'Revise this older piece at three levels: purpose, structure, sentences. It is prefilled below.',
      constraints: ['Write a one-line "this is about" statement first, then delete it when you are done.', 'Begin later than the original began.', 'Cut at least one sentence you like.'],
      minWords: Math.min(100, old.words),
      maxWords: Math.max(old.words + 300, 600),
    },
    rubric: ['Clarity of purpose', 'Structure', 'Economy', 'Sentence quality', 'Improvement over original'],
    pitfalls: ['Polishing sentences before fixing structure.', 'Changing words but keeping the same shape.', 'Saving every good line.'],
    microConstraint: null,
  };
}

export function wordRange(lesson: LessonContent, longform?: boolean): { min: number; max: number } {
  return longform ? LONGFORM_RANGE : { min: lesson.exercise.minWords, max: lesson.exercise.maxWords };
}

export const STEP_ORDER = ['warmup', 'lesson', 'study', 'draft', 'feedback', 'revise', 'reflect', 'done'] as const;
