import { useCallback, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../data/db';
import type { LessonContent } from '../../data/types';
import { WRITTEN_LESSONS, syllabusById, type SyllabusEntry } from '../../curriculum';
import { generateLesson } from '../../ai/tutor';
import { toAiError } from '../../ai/client';
import { getSettings } from '../../lib/settings';

export type LessonState =
  | { status: 'loading' }
  | { status: 'ready'; lesson: LessonContent; source: 'written' | 'generated' }
  | { status: 'missing'; entry: SyllabusEntry; seed: LessonContent };

/** Offline stand-in for an ungenerated lesson: the syllabus entry's own objective and exercise seed. */
export function seedLesson(entry: SyllabusEntry): LessonContent {
  return {
    id: entry.id,
    track: entry.track,
    masterLens: entry.masterLens,
    title: entry.title,
    hook: entry.objective,
    body: `The full text of this lesson is written for you by the Tutor, and it hasn't been generated yet (no API key, or you are offline). You can still do the exercise now.\n\n**Objective.** ${entry.objective}\n\n**Lens.** ${entry.masterLens}`,
    modelPassage: { text: '', source: '' },
    questions: [],
    exercise: { prompt: entry.exerciseSeed, constraints: ['Write the whole piece before revising anything.'], minWords: 200, maxWords: 600 },
    rubric: entry.rubricCriteria,
    pitfalls: [],
    microConstraint: null,
  };
}

export function useLesson(lessonId: string | undefined) {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cached = useLiveQuery(async () => (lessonId ? ((await db.lessons.get(lessonId)) ?? null) : null), [lessonId]);

  let state: LessonState = { status: 'loading' };
  const entry = lessonId ? syllabusById.get(lessonId) : undefined;
  const written = lessonId ? WRITTEN_LESSONS.get(lessonId) : undefined;
  if (written) state = { status: 'ready', lesson: written, source: 'written' };
  else if (cached) state = { status: 'ready', lesson: cached.content, source: 'generated' };
  else if (entry && cached === null) state = { status: 'missing', entry, seed: seedLesson(entry) };

  /** Generate (or regenerate) and cache in IndexedDB. Returns true on success. */
  const generate = useCallback(async (longform = false): Promise<boolean> => {
    if (!entry) return false;
    setGenerating(true);
    setError(null);
    try {
      const result = await generateLesson(entry, longform);
      if (!result.ok) {
        setError('The Tutor returned a lesson that could not be read. Try again.');
        return false;
      }
      await db.lessons.put({
        id: entry.id,
        content: { ...result.data, id: entry.id, track: entry.track, masterLens: entry.masterLens },
        generatedAt: Date.now(),
        model: getSettings().lessonModel,
      });
      return true;
    } catch (e) {
      setError(toAiError(e).message);
      return false;
    } finally {
      setGenerating(false);
    }
  }, [entry]);

  return { state, entry, generating, error, generate };
}
