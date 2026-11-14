import type { TrackId } from '../data/types';

export interface SyllabusEntry {
  id: string;
  track: TrackId;
  level: 1 | 2 | 3 | 4;
  title: string;
  /** One sentence. */
  objective: string;
  /** "Master: technique" — the lens the lesson is seen through. */
  masterLens: string;
  exerciseSeed: string;
  rubricCriteria: string[];
  estMinutes: number;
  prerequisites: string[];
}

export const TRACKS: { id: TrackId; name: string; blurb: string }[] = [
  { id: 'foundations', name: 'Foundations', blurb: 'The plain sentence, detail, verbs, rhythm, cutting, voice, revising.' },
  { id: 'essay', name: 'Essay & Nonfiction', blurb: 'Personal, argumentative and exploratory essays, letters, memoir, reporting, professional prose.' },
  { id: 'philosophy', name: 'Philosophical Prose', blurb: 'Arguments, thought experiments, aphorisms, dialogues, confessions, parables.' },
  { id: 'fiction', name: 'Fiction', blurb: 'Scene, subtext, character, point of view, interiority, time, endings.' },
  { id: 'novel', name: 'Novel Craft', blurb: 'Premise, theme as a question, structure, motif, pacing, revision at length.' },
  { id: 'screen', name: 'Screenwriting', blurb: 'Visual storytelling, dialogue economy, format, structure, series arcs.' },
  { id: 'style', name: 'Style & Imitation', blurb: 'Copywork, then pastiche, then departure: one master at a time.' },
  { id: 'compression', name: 'Compression & Poetry', blurb: 'Image, line, aphorism, the prose poem.' },
];

export const trackName = (id: TrackId) => TRACKS.find((t) => t.id === id)?.name ?? id;
