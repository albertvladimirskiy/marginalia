import JSZip from 'jszip';
import { z } from 'zod';
import { db, TABLES, type TableName } from './db';
import type { Draft } from './types';
import { getSettings, updateSettings, type Settings } from '../lib/settings';
import { WRITTEN_LESSONS, syllabusById, trackName } from '../curriculum';
import { sessionToMarkdown } from './sessionMarkdown';
import { localDate } from '../lib/dates';

export interface Backup {
  app: 'marginalia';
  version: 1;
  exportedAt: string;
  settings: Partial<Settings>;
  tables: Record<TableName, unknown[]>;
}

const BackupSchema = z.object({
  app: z.literal('marginalia'),
  version: z.literal(1),
  exportedAt: z.string(),
  settings: z.record(z.string(), z.unknown()),
  tables: z.object(Object.fromEntries(TABLES.map((t) => [t, z.array(z.record(z.string(), z.unknown()))])) as Record<TableName, z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>>>),
});

export async function exportBackup(): Promise<Backup> {
  const tables = {} as Record<TableName, unknown[]>;
  for (const t of TABLES) tables[t] = await db.table(t).toArray();
  return { app: 'marginalia', version: 1, exportedAt: new Date().toISOString(), settings: getSettings(), tables };
}

/** Replaces all local data with the backup. Throws a readable Error on a bad file. */
export async function importBackup(input: unknown): Promise<void> {
  const parsed = BackupSchema.safeParse(input);
  if (!parsed.success) throw new Error('This file is not a Marginalia backup (or it is damaged).');
  const { tables, settings } = parsed.data;
  await db.transaction('rw', TABLES.map((t) => db.table(t)), async () => {
    for (const t of TABLES) {
      await db.table(t).clear();
      await db.table(t).bulkPut(tables[t]);
    }
  });
  updateSettings(settings as Partial<Settings>);
}

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50) || 'untitled';

const yaml = (v: string) => JSON.stringify(v); // JSON strings are valid YAML scalars

export function draftToMarkdown(d: Draft, projectTitle?: string): string {
  const lesson = d.lessonId ? syllabusById.get(d.lessonId) : undefined;
  const fm = [
    '---',
    `title: ${yaml(d.title)}`,
    `date: ${new Date(d.createdAt).toISOString()}`,
    `kind: ${d.kind}`,
    lesson ? `lesson: ${yaml(lesson.title)}` : null,
    d.track ? `track: ${yaml(trackName(d.track))}` : null,
    projectTitle ? `project: ${yaml(projectTitle)}` : null,
    `words: ${d.words}`,
    '---',
  ].filter(Boolean);
  return `${fm.join('\n')}\n\n${d.text}\n`;
}

export async function exportMarkdownZip(): Promise<Blob> {
  const zip = new JSZip();
  const projects = new Map((await db.projects.toArray()).map((p) => [p.id, p.title]));
  const drafts = await db.drafts.orderBy('createdAt').toArray();
  for (const d of drafts) {
    if (!d.text.trim()) continue;
    const folder = d.projectId ? `projects/${slug(projects.get(d.projectId) ?? 'project')}` : d.kind;
    const name = `${localDate(new Date(d.createdAt))}-${slug(d.title)}-${d.id.slice(0, 6)}.md`;
    zip.file(`marginalia/${folder}/${name}`, draftToMarkdown(d, d.projectId ? projects.get(d.projectId) : undefined));
  }

  // One file per session, with the feedback written out in full.
  const byId = new Map(drafts.map((d) => [d.id, d]));
  const cached = new Map((await db.lessons.toArray()).map((l) => [l.id, l.content]));
  for (const s of await db.sessions.orderBy('date').toArray()) {
    if (!s.draft1Id) continue;
    const entry = s.lessonId ? syllabusById.get(s.lessonId) : undefined;
    const title = s.kind === 'review' ? `Review: ${byId.get(s.reviewOfId ?? '')?.title ?? 'an older piece'}` : (entry?.title ?? 'Session');
    const lesson = s.lessonId ? (WRITTEN_LESSONS.get(s.lessonId) ?? cached.get(s.lessonId)) : undefined;
    const md = sessionToMarkdown({
      session: s,
      title,
      track: entry ? trackName(entry.track) : undefined,
      questions: s.kind === 'lesson' ? (lesson?.questions ?? []) : [],
      draft1: byId.get(s.draft1Id)?.text,
      draft2: s.draft2Id ? byId.get(s.draft2Id)?.text : undefined,
    });
    zip.file(`marginalia/sessions/${s.date}-${slug(title)}-${s.id.slice(0, 6)}.md`, md);
  }
  return zip.generateAsync({ type: 'blob' });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function downloadJsonBackup(): Promise<void> {
  const backup = await exportBackup();
  downloadBlob(new Blob([JSON.stringify(backup, null, 1)], { type: 'application/json' }), `marginalia-backup-${localDate()}.json`);
  updateSettings({ lastBackupAt: Date.now() });
}

export async function downloadMarkdownZip(): Promise<void> {
  downloadBlob(await exportMarkdownZip(), `marginalia-${localDate()}.zip`);
  updateSettings({ lastBackupAt: Date.now() });
}
