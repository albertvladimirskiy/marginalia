import type { Feedback, Round2, PremiseCard, ImitationJudgment, EditorNotes, LessonContentAI } from '../ai/schemas';

export type TrackId =
  | 'foundations'
  | 'essay'
  | 'philosophy'
  | 'fiction'
  | 'novel'
  | 'screen'
  | 'style'
  | 'compression';

export type DraftKind = 'freewrite' | 'warmup' | 'study' | 'draft1' | 'draft2' | 'reflection' | 'chapter' | 'imitation' | 'scratch';

export interface Draft {
  id: string;
  kind: DraftKind;
  title: string;
  text: string;
  words: number;
  createdAt: number;
  updatedAt: number;
  lessonId?: string;
  track?: TrackId;
  sessionId?: string;
  projectId?: string;
  /** Chapter order inside a project. */
  order?: number;
  imitation?: { masterId: string; technique: string; judgment?: ImitationJudgment };
  editorNotes?: EditorNotes;
}

export interface Version {
  id?: number;
  draftId: string;
  text: string;
  words: number;
  savedAt: number;
}

/** A complete lesson, whether hand-written (Foundations) or generated just-in-time. */
export interface LessonContent extends LessonContentAI {
  id: string;
  track: TrackId;
  masterLens: string;
}

export interface CachedLesson {
  id: string;
  content: LessonContent;
  generatedAt: number;
  model: string;
}

export type SessionStep = 'warmup' | 'lesson' | 'study' | 'draft' | 'feedback' | 'revise' | 'reflect' | 'done';

export type FeedbackResult = { ok: true; data: Feedback } | { ok: false; raw: string };
export type Round2Result = { ok: true; data: Round2 } | { ok: false; raw: string };

export interface ChatMsg {
  role: 'user' | 'assistant';
  content: string;
}

export interface Usage {
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
}

export interface Session {
  id: string;
  date: string;
  kind: 'lesson' | 'review';
  lessonId?: string;
  longform?: boolean;
  /** For review sessions: the older draft being revised. */
  reviewOfId?: string;
  step: SessionStep;
  warmupId?: string;
  study: string[];
  draft1Id?: string;
  draft2Id?: string;
  feedback1?: FeedbackResult;
  feedback2?: Round2Result;
  /** Offline path: the student names their own priority #1. */
  selfPriority?: string;
  selfScores?: Record<string, number>;
  reflection?: string;
  chat?: ChatMsg[];
  usage: Usage;
  startedAt: number;
  completedAt?: number;
}

export interface Character {
  id: string;
  name: string;
  want: string;
  fear: string;
  contradiction: string;
  voice: string;
  notes: string;
}

export interface SceneCard {
  id: string;
  title: string;
  goal: string;
  conflict: string;
  turn: string;
}

export interface Project {
  id: string;
  title: string;
  kind: 'novel' | 'screenplay' | 'collection' | 'other';
  premise: string;
  premiseCard: PremiseCard;
  references: string[];
  characters: Character[];
  /** Array order is the outline order. */
  scenes: SceneCard[];
  dailyGoal: number;
  workshop: ChatMsg[];
  createdAt: number;
}

export interface ReadingEntry {
  id: string;
  title: string;
  author: string;
  read: boolean;
  notes: string;
  noticed: string;
  finishedAt?: number;
}

export interface WordLogEntry {
  /** `${date}|${projectId}` — projectId is '' for non-project writing. */
  id: string;
  date: string;
  projectId: string;
  words: number;
}

export type { Feedback, Round2, PremiseCard, ImitationJudgment, EditorNotes };
