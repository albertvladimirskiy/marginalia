import type { TrackId } from '../data/types';
import type { SyllabusEntry } from '../curriculum/types';
import { weekday } from './dates';

export type Slot = TrackId | 'project' | 'longform' | 'review';

/** Sun review · Mon essay · Tue fiction · Wed philosophy · Thu style · Fri long project · Sat long-form. */
export const DEFAULT_ROTATION: Slot[] = ['review', 'essay', 'fiction', 'philosophy', 'style', 'project', 'longform'];

/** Saturday long-form days cycle through these tracks. */
export const LONGFORM_TRACKS: TrackId[] = ['fiction', 'essay', 'novel', 'screen', 'philosophy', 'compression'];

export const FORTNIGHT = 14;
export const LONGFORM_RANGE = { min: 800, max: 1500 };

export type TodayPlan =
  | { kind: 'lesson'; lessonId: string; longform: boolean; reason: string }
  | { kind: 'project'; reason: string }
  | { kind: 'review'; reason: string };

export interface PlanInput {
  date: string;
  syllabus: SyllabusEntry[];
  completed: Set<string>;
  rotation: Slot[];
  longformCount: number;
  hasReviewable: boolean;
  hasProject: boolean;
}

/** Next lesson in a track: the first incomplete one whose prerequisites are met, else the first incomplete. */
export function nextInTrack(track: TrackId, syllabus: SyllabusEntry[], completed: Set<string>): SyllabusEntry | undefined {
  const open = syllabus.filter((e) => e.track === track && !completed.has(e.id));
  return open.find((e) => e.prerequisites.every((p) => completed.has(p))) ?? open[0];
}

/** Any lesson at all, so a finished track never strands the student. */
function anyNext(syllabus: SyllabusEntry[], completed: Set<string>): SyllabusEntry | undefined {
  return syllabus.find((e) => !completed.has(e.id) && e.prerequisites.every((p) => completed.has(p))) ?? syllabus.find((e) => !completed.has(e.id));
}

export function planToday(input: PlanInput): TodayPlan {
  const { syllabus, completed, date } = input;
  const fortnight = syllabus.filter((e) => e.track === 'foundations').slice(0, FORTNIGHT);
  const nextFoundation = fortnight.find((e) => !completed.has(e.id));
  if (nextFoundation) {
    return { kind: 'lesson', lessonId: nextFoundation.id, longform: false, reason: 'Foundations fortnight' };
  }

  const slot = input.rotation[weekday(date)] ?? 'review';
  if (slot === 'project' && input.hasProject) return { kind: 'project', reason: 'Long Project day' };
  if (slot === 'review' && input.hasReviewable) return { kind: 'review', reason: 'Review day: revise an older piece' };

  let track: TrackId | undefined;
  let longform = false;
  if (slot === 'longform') {
    longform = true;
    for (let i = 0; i < LONGFORM_TRACKS.length; i++) {
      const t = LONGFORM_TRACKS[(input.longformCount + i) % LONGFORM_TRACKS.length]!;
      if (nextInTrack(t, syllabus, completed)) {
        track = t;
        break;
      }
    }
  } else if (slot !== 'project' && slot !== 'review') {
    track = slot;
  }

  const entry = (track && nextInTrack(track, syllabus, completed)) ?? anyNext(syllabus, completed);
  if (!entry) return { kind: 'review', reason: 'Every lesson is done: revise an older piece' };
  return { kind: 'lesson', lessonId: entry.id, longform, reason: longform ? 'Long-form day' : `${entry.track} day` };
}
