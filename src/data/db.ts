import Dexie, { type Table } from 'dexie';
import type { CachedLesson, Draft, Project, ReadingEntry, Session, Version, WordLogEntry } from './types';
import { seedProject, seedReadingLog } from './seed';

export class MarginaliaDB extends Dexie {
  drafts!: Table<Draft, string>;
  versions!: Table<Version, number>;
  sessions!: Table<Session, string>;
  lessons!: Table<CachedLesson, string>;
  projects!: Table<Project, string>;
  readingLog!: Table<ReadingEntry, string>;
  wordLog!: Table<WordLogEntry, string>;

  constructor(name = 'marginalia') {
    super(name);
    this.version(1).stores({
      drafts: 'id, kind, createdAt, updatedAt, lessonId, sessionId, projectId',
      versions: '++id, draftId, savedAt',
      sessions: 'id, date, lessonId, completedAt',
      lessons: 'id',
      projects: 'id, createdAt',
      readingLog: 'id',
      wordLog: 'id, date, projectId',
    });
    this.on('populate', (tx) => {
      tx.table('projects').add(seedProject());
      tx.table('readingLog').bulkAdd(seedReadingLog());
    });
  }
}

export const db = new MarginaliaDB();

export const TABLES = ['drafts', 'versions', 'sessions', 'lessons', 'projects', 'readingLog', 'wordLog'] as const;
export type TableName = (typeof TABLES)[number];

export const uid = () => crypto.randomUUID();
