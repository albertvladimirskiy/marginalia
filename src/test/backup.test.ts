import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';
import JSZip from 'jszip';
import { db } from '../data/db';
import { createDraft, saveDraftText, restoreVersion, MAX_VERSIONS, totalWordsWritten } from '../data/drafts';
import { exportBackup, importBackup, exportMarkdownZip, draftToMarkdown } from '../data/backup';

beforeEach(async () => {
  await db.delete();
  await db.open();
});

describe('seed', () => {
  it('seeds the untitled novel and the reading log on first open', async () => {
    const projects = await db.projects.toArray();
    expect(projects[0]?.title).toBe('Untitled novel');
    expect(projects[0]?.references.some((r) => r.includes('Herostratus'))).toBe(true);
    expect(await db.readingLog.count()).toBeGreaterThanOrEqual(9);
  });
});

describe('drafts', () => {
  it('logs only added words and keeps at most 20 versions', async () => {
    const d = await createDraft('draft1', 'Test');
    await saveDraftText(d.id, 'one two three');
    await saveDraftText(d.id, 'one two');
    expect(await totalWordsWritten()).toBe(3);
    for (let i = 0; i < MAX_VERSIONS + 5; i++) await saveDraftText(d.id, `version ${i}`, { forceSnapshot: true });
    expect(await db.versions.where('draftId').equals(d.id).count()).toBe(MAX_VERSIONS);
  });

  it('restores a version and snapshots the replaced text first', async () => {
    const d = await createDraft('draft1', 'Test');
    await saveDraftText(d.id, 'first text', { forceSnapshot: true });
    const v = await db.versions.where('draftId').equals(d.id).first();
    await saveDraftText(d.id, 'second text', { forceSnapshot: true });
    await restoreVersion(d.id, v!.id!);
    expect((await db.drafts.get(d.id))?.text).toBe('first text');
    const texts = (await db.versions.where('draftId').equals(d.id).toArray()).map((x) => x.text);
    expect(texts).toContain('second text');
  });
});

describe('export / import round trip', () => {
  it('restores every table exactly', async () => {
    const d = await createDraft('freewrite', 'Day 0', { text: 'I want to write a novel about being remembered.' });
    await saveDraftText(d.id, d.text + ' What stopped me was fear.', { forceSnapshot: true });
    await db.sessions.add({ id: 's1', date: '2026-11-13', kind: 'lesson', lessonId: 'f-01', step: 'done', study: ['a', 'b'], usage: { inputTokens: 1, outputTokens: 2, costUsd: 0.001 }, startedAt: 1, completedAt: 2 });

    const before = await exportBackup();
    const json = JSON.parse(JSON.stringify(before));

    await db.delete();
    await db.open(); // re-seeds defaults, which import must replace
    await db.drafts.clear();
    await importBackup(json);

    const after = await exportBackup();
    expect(after.tables).toEqual(before.tables);
  });

  it('rejects files that are not backups', async () => {
    await expect(importBackup({ hello: 'world' })).rejects.toThrow('not a Marginalia backup');
  });
});

describe('markdown export', () => {
  it('writes front matter with date, lesson, track and word count', async () => {
    const d = await createDraft('draft1', 'The plain sentence — Draft 1', { text: 'The dog crossed the road.', lessonId: 'f-01', track: 'foundations' });
    const md = draftToMarkdown(d);
    expect(md).toMatch(/^---\ntitle: "The plain sentence/);
    expect(md).toContain('lesson: "The plain sentence"');
    expect(md).toContain('track: "Foundations"');
    expect(md).toContain('words: 5');
    expect(md).toContain('date: ');

    const zip = await JSZip.loadAsync(await (await exportMarkdownZip()).arrayBuffer());
    const files = Object.keys(zip.files).filter((f) => f.endsWith('.md'));
    expect(files).toHaveLength(1);
    expect(await zip.file(files[0]!)!.async('string')).toBe(md);
  });
});
