import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';
import JSZip from 'jszip';
import { db } from '../data/db';
import { createDraft, saveDraftText, restoreVersion, MAX_VERSIONS, totalWordsWritten } from '../data/drafts';
import { exportBackup, importBackup, exportMarkdownZip, draftToMarkdown } from '../data/backup';
import { sessionToMarkdown } from '../data/sessionMarkdown';

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

describe('session markdown export', () => {
  const feedback = {
    reader_response: 'The folder pulled me in.',
    strongest_moment: { quote: 'He counts them.', reason: 'Three words carry the obsession.' },
    priorities: [{ issue: 'Filler detail', evidence: 'which he learned from a television chef', why_it_matters: 'It dilutes the eggs paragraph.', technique_to_apply: 'Cutting.', micro_example: 'He cracks them one-handed.' }],
    revision_challenge: 'Cut every detail that does not point at the folder.',
    scores: [
      { criterion: 'Concreteness', score: 4, justification: 'Strong objects.' },
      { criterion: 'Economy', score: 3, justification: 'Some filler.' },
      { criterion: 'Rhythm', score: 3, justification: 'Even.' },
      { criterion: 'Clarity', score: 4, justification: 'Clear.' },
    ],
    weakness_tags: ['over-explaining' as const],
    next_step: 'Cut harder.',
  };

  it('writes one file per session with drafts, feedback, revision check and reflection', async () => {
    const d1 = await createDraft('draft1', 'Concrete over abstract — Draft 1', { text: 'My father keeps a folder.', lessonId: 'f-02', track: 'foundations' });
    const d2 = await createDraft('draft2', 'Concrete over abstract — Draft 2', { text: 'My father keeps a folder. Forty-one.', lessonId: 'f-02', track: 'foundations' });
    await db.sessions.add({
      id: 'sess-1', date: '2026-11-13', kind: 'lesson', lessonId: 'f-02', step: 'done',
      study: ['It gives places and motion.', 'The parenthesis is the comment.'],
      draft1Id: d1.id, draft2Id: d2.id,
      feedback1: { ok: true, data: feedback },
      feedback2: { ok: true, data: { resolved: 'partially', evidence: 'Forty-one.', new_observation: null } },
      reflection: 'Objects carry the feeling.',
      usage: { inputTokens: 0, outputTokens: 0, costUsd: 0 }, startedAt: Date.parse('2026-11-13T20:00:00Z'), completedAt: 2,
    });

    const zip = await JSZip.loadAsync(await (await exportMarkdownZip()).arrayBuffer());
    const sessionFiles = Object.keys(zip.files).filter((f) => f.startsWith('marginalia/sessions/') && f.endsWith('.md'));
    expect(sessionFiles).toHaveLength(1);
    const md = await zip.file(sessionFiles[0]!)!.async('string');
    expect(md).toContain('title: "Concrete over abstract"');
    expect(md).toContain('status: complete');
    expect(md).toContain('**Dickens could have written'); // study question from the written lesson
    expect(md).toContain('It gives places and motion.');
    expect(md).toContain('## Draft 1\n\nMy father keeps a folder.');
    expect(md).toContain('## Feedback');
    expect(md).toContain('> which he learned from a television chef');
    expect(md).toContain('- Concreteness: 4/5 — Strong objects.');
    expect(md).toContain('**Weakness tags:** Over-explaining');
    expect(md).toContain('## Draft 2\n\nMy father keeps a folder. Forty-one.');
    expect(md).toContain('**Partially resolved.**');
    expect(md).toContain('## Reflection\n\nObjects carry the feeling.');
  });

  it('writes the self-check when there was no mentor, and raw text when feedback was unstructured', () => {
    const base = { id: 's', date: '2026-11-13', kind: 'lesson' as const, step: 'done' as const, study: [], usage: { inputTokens: 0, outputTokens: 0, costUsd: 0 }, startedAt: 0 };
    const self = sessionToMarkdown({ session: { ...base, selfScores: { Clarity: 3 }, selfPriority: 'The ending explains.' }, title: 'T', questions: [] });
    expect(self).toContain('## Self-check');
    expect(self).toContain('- Clarity: 3/5');
    expect(self).toContain('**Priority 1:** The ending explains.');
    const raw = sessionToMarkdown({ session: { ...base, feedback1: { ok: false, raw: 'Plain notes from the mentor.' } }, title: 'T', questions: [] });
    expect(raw).toContain('Plain notes from the mentor.');
  });
});
