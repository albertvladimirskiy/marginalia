import { db } from '../data/db';
import type { Session } from '../data/types';
import { syllabusById } from '../curriculum';
import { WEAKNESS_LABELS, type WeaknessTag } from './schemas';

export interface WeaknessCount {
  tag: WeaknessTag;
  count: number;
}

/** Weakness tags from the last 20 feedback rounds, most frequent first. */
export function weaknessProfile(sessions: Session[]): WeaknessCount[] {
  const counts = new Map<WeaknessTag, number>();
  const recent = sessions.filter((s) => s.feedback1?.ok).sort((a, b) => b.startedAt - a.startedAt).slice(0, 20);
  for (const s of recent) {
    if (s.feedback1?.ok) for (const t of s.feedback1.data.weakness_tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts.entries()].map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count);
}

/** A tag counts as recurring once it shows up in at least 3 of the recent rounds. */
export const RECURRING_THRESHOLD = 3;

export function recurringWeakness(sessions: Session[]): WeaknessTag | undefined {
  const top = weaknessProfile(sessions)[0];
  return top && top.count >= RECURRING_THRESHOLD ? top.tag : undefined;
}

/** Offline micro-constraints for written lessons, keyed by weakness. */
export const MICRO_CONSTRAINTS: Record<WeaknessTag, string> = {
  abstraction: 'Recurring weakness — abstraction: no abstract noun may stand as the subject of a sentence.',
  cliche: 'Recurring weakness — cliché: after drafting, find every phrase you have heard before and replace it with something observed.',
  'hedging-passive': 'Recurring weakness — hedging/passive: no "seemed", "somewhat", "perhaps", and no passive voice.',
  'telling-not-showing': 'Recurring weakness — telling: name no emotion anywhere in the piece.',
  'monotone-rhythm': 'Recurring weakness — rhythm: include at least two sentences under five words and one over thirty-five.',
  'over-explaining': 'Recurring weakness — over-explaining: delete your final paragraph before submitting.',
  'vague-emotion': 'Recurring weakness — vague emotion: every feeling must be carried by a physical action or object.',
  'dialogue-as-exposition': 'Recurring weakness — exposition in dialogue: no character may say something the other already knows.',
  'weak-ending': 'Recurring weakness — endings: end on a concrete image or action, not a reflection.',
  'borrowed-voice': 'Recurring weakness — borrowed voice: use no word you would not say aloud to a friend.',
  'filter-words': 'Recurring weakness — filter words: banned: saw, heard, felt, noticed, realized, watched.',
  'flat-verbs': 'Recurring weakness — flat verbs: at most three forms of "to be" in the piece.',
  'unclear-stakes': 'Recurring weakness — stakes: by the end of the first paragraph the reader must know what could be lost.',
  'structural-drift': 'Recurring weakness — drift: write a one-line purpose above the draft and cut anything that does not serve it.',
  'unsupported-claim': 'Recurring weakness — unsupported claims: every claim gets a concrete example in the same paragraph.',
};

/** Compressed rolling summary of the last ~10 sessions. Deterministic: no AI call needed. */
export function rollingSummary(sessions: Session[]): string {
  const done = sessions.filter((s) => s.completedAt).sort((a, b) => b.startedAt - a.startedAt).slice(0, 10);
  if (!done.length) return 'No previous sessions.';
  return done
    .map((s) => {
      const title = s.lessonId ? (syllabusById.get(s.lessonId)?.title ?? s.lessonId) : 'Review session';
      const f = s.feedback1?.ok ? s.feedback1.data : undefined;
      const avg = f ? (f.scores.reduce((n, x) => n + x.score, 0) / f.scores.length).toFixed(1) : '-';
      const tags = f?.weakness_tags.length ? f.weakness_tags.join(', ') : 'none';
      const fixed = s.feedback2?.ok ? s.feedback2.data.resolved : '-';
      const refl = s.reflection ? ` Reflection: "${s.reflection.slice(0, 140)}"` : '';
      return `${s.date} ${title}: avg ${avg}; tags ${tags}; revision fixed p1: ${fixed}.${refl}`;
    })
    .join('\n');
}

/** Previous 5 score sets, to anchor calibration. */
export function previousScores(sessions: Session[]): string {
  const rows = sessions
    .filter((s) => s.feedback1?.ok)
    .sort((a, b) => b.startedAt - a.startedAt)
    .slice(0, 5)
    .map((s) => (s.feedback1?.ok ? `${s.date}: ${s.feedback1.data.scores.map((x) => `${x.criterion} ${x.score}`).join(', ')}` : ''));
  return rows.length ? rows.join('\n') : 'No previous scores.';
}

export function profileText(sessions: Session[]): string {
  const p = weaknessProfile(sessions).slice(0, 5);
  return p.length ? p.map((w) => `${WEAKNESS_LABELS[w.tag]} (${w.count})`).join(', ') : 'Not enough feedback yet.';
}

export async function loadSessions(): Promise<Session[]> {
  return db.sessions.toArray();
}
