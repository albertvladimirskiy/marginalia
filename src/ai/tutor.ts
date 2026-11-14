/** High-level Tutor operations. Each builds a small prompt and goes through client.callModel. */
import type { z } from 'zod';
import { callModel } from './client';
import { getStructured, type Structured } from './structured';
import {
  EDITOR_TASK, FEEDBACK_TASK, IMITATION_TASK, LESSON_TASK, MENTOR_CHAT_TASK, PREMISE_ADDENDUM,
  PREMISE_CARD_TASK, REPAIR_TASK, ROUND2_TASK, systemPrompt,
} from './prompts';
import {
  EditorNotesSchema, FeedbackSchema, ImitationJudgmentSchema, LessonContentSchema, PremiseCardSchema, Round2Schema,
  type EditorNotes, type Feedback, type ImitationJudgment, type LessonContentAI, type PremiseCard, type Round2,
} from './schemas';
import { getSettings } from '../lib/settings';
import { loadSessions, previousScores, profileText, rollingSummary } from './context';
import type { ChatMsg, LessonContent } from '../data/types';
import type { SyllabusEntry } from '../curriculum';
import type { Master } from '../masters/masters';

async function structured<T>(schema: z.ZodType<T>, task: string, user: string, model: string, effort: 'low' | 'medium' = 'medium'): Promise<Structured<T>> {
  const s = getSettings();
  const system = systemPrompt(s.intensity, task);
  const { zodOutputFormat } = await import('@anthropic-ai/sdk/helpers/zod');
  const format = zodOutputFormat(schema);
  const jsonFormat = { type: format.type, schema: format.schema };
  return getStructured({
    schema,
    call: async () => (await callModel({ model, system, effort, format: jsonFormat, messages: [{ role: 'user', content: user }] })).text,
    repair: async (raw, error) =>
      (
        await callModel({
          model,
          system,
          effort: 'low',
          format: jsonFormat,
          messages: [
            { role: 'user', content: user },
            { role: 'assistant', content: raw },
            { role: 'user', content: `${REPAIR_TASK}\n${error}` },
          ],
        })
      ).text,
  });
}

function lessonBlock(lesson: LessonContent, minWords: number, maxWords: number): string {
  return `<lesson>
Title: ${lesson.title}
Master lens: ${lesson.masterLens}
Exercise: ${lesson.exercise.prompt}
Constraints: ${[...lesson.exercise.constraints, lesson.microConstraint].filter(Boolean).join(' | ')}
Word range: ${minWords}-${maxWords}
Rubric: ${lesson.rubric.join(', ')}
</lesson>`;
}

async function studentContext(): Promise<string> {
  const sessions = await loadSessions();
  return `<weakness_profile>${profileText(sessions)}</weakness_profile>
<recent_sessions>
${rollingSummary(sessions)}
</recent_sessions>
<previous_scores>
${previousScores(sessions)}
</previous_scores>`;
}

export async function getFeedback(lesson: LessonContent, draft: string, range: { min: number; max: number }): Promise<Structured<Feedback>> {
  const user = `${lessonBlock(lesson, range.min, range.max)}
${await studentContext()}
<draft1>
${draft}
</draft1>`;
  return structured(FeedbackSchema, FEEDBACK_TASK, user, getSettings().model);
}

export interface RevisionInput {
  lessonTitle: string;
  draft1: string;
  draft2: string;
  /** Priority 1 from the mentor, or the student's own from the self-check. */
  priority: string;
  challenge?: string;
  criteria: string[];
  /** Draft 1 scores by criterion, when there are any. */
  before: Record<string, number> | null;
}

export async function getRound2(r: RevisionInput): Promise<Structured<Round2>> {
  const before = r.before ? r.criteria.map((c) => `${c}: ${r.before![c] ?? 'not scored'}`).join('\n') : 'Draft 1 was not scored.';
  const challenge = r.challenge ? `\nRevision challenge: ${r.challenge}` : '';
  const user = `<lesson>${r.lessonTitle}</lesson>
<priority>
${r.priority}${challenge}
</priority>
<criteria>${r.criteria.join(', ')}</criteria>
<draft1_scores>
${before}
</draft1_scores>
<draft1>
${r.draft1}
</draft1>
<draft2>
${r.draft2}
</draft2>`;
  return structured(Round2Schema, ROUND2_TASK, user, getSettings().model);
}

export async function generateLesson(entry: SyllabusEntry, longform: boolean): Promise<Structured<LessonContentAI>> {
  const sessions = await loadSessions();
  const user = `<syllabus_entry>
Track: ${entry.track} (level ${entry.level} of 4)
Title: ${entry.title}
Objective: ${entry.objective}
Master lens: ${entry.masterLens}
Exercise seed: ${entry.exerciseSeed}
Rubric: ${entry.rubricCriteria.join(', ')}
Word range: ${longform ? '800-1500 (long-form day)' : '200-600'}
</syllabus_entry>
<weakness_profile>${profileText(sessions)}</weakness_profile>`;
  return structured(LessonContentSchema, LESSON_TASK, user, getSettings().lessonModel, 'low');
}

export async function judgeImitation(master: Master, technique: string, attempt: string): Promise<Structured<ImitationJudgment>> {
  const user = `<master>${master.name}</master>
<technique>${technique}</technique>
<method_notes>${master.method}</method_notes>
<attempt>
${attempt}
</attempt>`;
  return structured(ImitationJudgmentSchema, IMITATION_TASK, user, getSettings().model);
}

export async function editorNotes(premise: string, passage: string): Promise<Structured<EditorNotes>> {
  const user = `<premise>${premise}</premise>
<passage>
${passage}
</passage>`;
  return structured(EditorNotesSchema, EDITOR_TASK, user, getSettings().model);
}

export async function draftPremiseCard(premise: string, transcript: ChatMsg[]): Promise<Structured<PremiseCard>> {
  const user = `<original_premise>${premise}</original_premise>
<workshop_transcript>
${transcript.map((m) => `${m.role === 'user' ? 'STUDENT' : 'MENTOR'}: ${m.content}`).join('\n\n')}
</workshop_transcript>`;
  return structured(PremiseCardSchema, PREMISE_CARD_TASK, user, getSettings().model);
}

/** Streams a chat reply. `context` is prepended to the first user turn. */
export async function chat(kind: 'mentor' | 'premise', context: string, history: ChatMsg[], onText: (d: string) => void, signal?: AbortSignal): Promise<string> {
  const s = getSettings();
  const task = kind === 'mentor' ? MENTOR_CHAT_TASK : PREMISE_ADDENDUM;
  const messages = history.map((m, i) => ({ role: m.role, content: i === 0 ? `${context}\n\n${m.content}` : m.content }));
  const { text } = await callModel({ model: s.model, system: systemPrompt(s.intensity, task), effort: 'low', maxTokens: 4000, messages, onText, signal });
  return text;
}
