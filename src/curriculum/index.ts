import type { LessonContent } from '../data/types';
import { FOUNDATIONS_A } from './foundations-a';
import { FOUNDATIONS_B } from './foundations-b';

export { SYLLABUS, syllabusById } from './syllabus';
export { TRACKS, trackName } from './types';
export type { SyllabusEntry } from './types';

/** The hand-written Foundations fortnight. Everything else is generated just-in-time. */
export const WRITTEN_LESSONS = new Map<string, LessonContent>([...FOUNDATIONS_A, ...FOUNDATIONS_B].map((l) => [l.id, l]));
