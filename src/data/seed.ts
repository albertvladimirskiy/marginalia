import { EMPTY_PREMISE_CARD } from '../ai/schemas';
import type { Project, ReadingEntry } from './types';

export function seedProject(): Project {
  return {
    id: 'project-untitled-novel',
    title: 'Untitled novel',
    kind: 'novel',
    premise:
      'A man stakes the whole meaning of his life on being remembered, pours everything into becoming unforgettable, and dies having wasted his life. The book is about the cost of living for the verdict of strangers.',
    premiseCard: { ...EMPTY_PREMISE_CARD },
    references: [
      'Tolstoy, The Death of Ivan Ilyich: a life lived "correctly" for others, judged at the end',
      'Seneca, On the Shortness of Life: time spent on others’ opinion is time not lived',
      'Camus, The Myth of Sisyphus: meaning without the verdict of posterity',
      'Dostoevsky, Notes from Underground: the narrator who needs an audience even to despise',
      'Shelley, "Ozymandias": the monument outlives the meaning and then not even that',
      'Herostratus, who burned the Temple of Artemis at Ephesus to be remembered; Ephesus then forbade speaking his name',
      'Ecclesiastes: "there is no remembrance of former things"',
    ],
    characters: [],
    scenes: [],
    dailyGoal: 500,
    workshop: [],
    createdAt: Date.now(),
  };
}

const books: [string, string][] = [
  ['Notes from Underground', 'Fyodor Dostoevsky'],
  ['The Death of Ivan Ilyich', 'Leo Tolstoy'],
  ['On the Shortness of Life', 'Seneca'],
  ['Meditations', 'Marcus Aurelius'],
  ['The Myth of Sisyphus', 'Albert Camus'],
  ['Nausea', 'Jean-Paul Sartre'],
  ['The Metamorphosis', 'Franz Kafka'],
  ['Essays (start with "Of Idleness" and "That to Philosophize Is to Learn to Die")', 'Michel de Montaigne'],
  ['"Politics and the English Language"', 'George Orwell'],
  ['"The Lady with the Dog"', 'Anton Chekhov'],
  ['"Hills Like White Elephants"', 'Ernest Hemingway'],
  ['Mrs Dalloway', 'Virginia Woolf'],
  ['Notes of a Native Son', 'James Baldwin'],
  ['Ficciones', 'Jorge Luis Borges'],
  ['Walden', 'Henry David Thoreau'],
  ['Pensées', 'Blaise Pascal'],
];

export function seedReadingLog(): ReadingEntry[] {
  return books.map(([title, author], i) => ({
    id: `reading-${i + 1}`,
    title,
    author,
    read: false,
    notes: '',
    noticed: '',
  }));
}
