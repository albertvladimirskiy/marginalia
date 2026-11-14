import { z } from 'zod';

/** Fixed taxonomy for the Weakness Profile. Feedback may only use these tags. */
export const WEAKNESS_TAGS = [
  'abstraction',
  'cliche',
  'hedging-passive',
  'telling-not-showing',
  'monotone-rhythm',
  'over-explaining',
  'vague-emotion',
  'dialogue-as-exposition',
  'weak-ending',
  'borrowed-voice',
  'filter-words',
  'flat-verbs',
  'unclear-stakes',
  'structural-drift',
  'unsupported-claim',
] as const;
export type WeaknessTag = (typeof WEAKNESS_TAGS)[number];

export const WEAKNESS_LABELS: Record<WeaknessTag, string> = {
  abstraction: 'Abstraction',
  cliche: 'Cliché',
  'hedging-passive': 'Hedging / passive',
  'telling-not-showing': 'Telling, not showing',
  'monotone-rhythm': 'Monotone rhythm',
  'over-explaining': 'Over-explaining',
  'vague-emotion': 'Vague emotion',
  'dialogue-as-exposition': 'Dialogue as exposition',
  'weak-ending': 'Weak ending',
  'borrowed-voice': 'Borrowed voice',
  'filter-words': 'Filter words (saw, felt, noticed)',
  'flat-verbs': 'Flat verbs',
  'unclear-stakes': 'Unclear stakes',
  'structural-drift': 'Structural drift',
  'unsupported-claim': 'Unsupported claim',
};

const score = z.object({
  criterion: z.string(),
  score: z.number().int().min(1).max(5),
  justification: z.string(),
});

export const FeedbackSchema = z.object({
  reader_response: z.string().describe('3-5 sentences as a smart first-time reader: what pulled you in, where you drifted or got confused.'),
  strongest_moment: z.object({
    quote: z.string().describe("Exact quote from the student's text."),
    reason: z.string().describe('The technical reason it works.'),
  }),
  priorities: z
    .array(
      z.object({
        issue: z.string(),
        evidence: z.string().describe("Exact quote from the student's text."),
        why_it_matters: z.string(),
        technique_to_apply: z.string(),
        micro_example: z.string().describe('Rewrite of at most ONE of their sentences, or a parallel example on unrelated material.'),
      }),
    )
    .min(1)
    .max(3),
  revision_challenge: z.string().describe('One concrete constraint for Draft 2.'),
  scores: z.array(score).min(4).max(6),
  weakness_tags: z.array(z.enum(WEAKNESS_TAGS)).max(4),
  next_step: z.string(),
});
export type Feedback = z.infer<typeof FeedbackSchema>;

/** Second round: deliberately much shorter than first-round feedback. */
export const Round2Schema = z.object({
  resolved: z.enum(['yes', 'partially', 'no']),
  evidence: z.string().describe('Exact quote from Draft 2 that shows it.'),
  scores: z
    .array(
      z.object({
        criterion: z.string(),
        score: z.number().int().min(1).max(5),
        note: z.string().describe('At most 12 words.'),
      }),
    )
    .min(1)
    .max(6),
  improved: z.string().describe('One sentence: what got better.'),
  worse: z.string().nullable().describe('One sentence: what got worse or was lost, or null.'),
  new_observation: z.string().nullable(),
});
export type Round2 = z.infer<typeof Round2Schema>;

export const LessonContentSchema = z.object({
  title: z.string(),
  hook: z.string().describe('One or two sentences that open the lesson.'),
  body: z.string().describe('Markdown, 350-600 words, original prose.'),
  modelPassage: z.object({
    text: z.string().describe('Short public-domain excerpt, or an original demonstration passage.'),
    source: z.string().describe('Author, work, translator; or "Original demonstration".'),
  }),
  questions: z.array(z.string()).length(2),
  exercise: z.object({
    prompt: z.string(),
    constraints: z.array(z.string()).min(1).max(5),
    minWords: z.number().int(),
    maxWords: z.number().int(),
  }),
  rubric: z.array(z.string()).min(4).max(6),
  pitfalls: z.array(z.string()).length(3),
  microConstraint: z.string().nullable().describe('Extra constraint targeting a recurring weakness, or null.'),
});
export type LessonContentAI = z.infer<typeof LessonContentSchema>;

export const ImitationJudgmentSchema = z.object({
  technique_captured: z.enum(['yes', 'partially', 'no']),
  evidence: z.string().describe("Exact quote from the student's imitation."),
  copying_risk: z.enum(['low', 'medium', 'high']),
  copying_note: z.string().describe('Where the student borrowed surface (words, images, rhythm) instead of method; or why they did not.'),
  advice: z.string(),
  score: z.number().int().min(1).max(5),
});
export type ImitationJudgment = z.infer<typeof ImitationJudgmentSchema>;

export const EditorNotesSchema = z.object({
  observations: z.array(z.string()).min(1).max(6),
  questions: z.array(z.string()).min(2).max(6),
  structural_note: z.string(),
});
export type EditorNotes = z.infer<typeof EditorNotesSchema>;

export const PremiseCardSchema = z.object({
  logline: z.string(),
  want: z.string(),
  need: z.string(),
  lie: z.string(),
  irony: z.string(),
  stance: z.string(),
  tone: z.string(),
  endingQuestion: z.string(),
});
export type PremiseCard = z.infer<typeof PremiseCardSchema>;

export const EMPTY_PREMISE_CARD: PremiseCard = {
  logline: '',
  want: '',
  need: '',
  lie: '',
  irony: '',
  stance: '',
  tone: '',
  endingQuestion: '',
};
