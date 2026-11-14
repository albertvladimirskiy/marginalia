import type { LessonContent } from '../data/types';
import { FOUNDATIONS_A } from './foundations-a';
import { FOUNDATIONS_B } from './foundations-b';
import { LEVEL1_ESSAY_PHILOSOPHY } from './level1-essay-philosophy';
import { LEVEL1_FICTION_NOVEL } from './level1-fiction-novel';
import { LEVEL1_SCREEN_STYLE_COMPRESSION } from './level1-screen-style-compression';

export { SYLLABUS, syllabusById } from './syllabus';
export { TRACKS, trackName } from './types';
export type { SyllabusEntry } from './types';

/**
 * Hand-written lessons: the Foundations fortnight plus level 1 of every other track.
 * Any syllabus entry without one is generated just-in-time by the Tutor.
 */
export const WRITTEN_LESSONS = new Map<string, LessonContent>(
  [...FOUNDATIONS_A, ...FOUNDATIONS_B, ...LEVEL1_ESSAY_PHILOSOPHY, ...LEVEL1_FICTION_NOVEL, ...LEVEL1_SCREEN_STYLE_COMPRESSION].map((l) => [l.id, l]),
);
