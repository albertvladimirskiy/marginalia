import { db, uid } from './db';
import type { Draft, DraftKind } from './types';
import { countWords } from '../lib/words';
import { localDate } from '../lib/dates';

export const MAX_VERSIONS = 20;
/** Minimum gap between automatic version snapshots while typing. */
export const SNAPSHOT_EVERY_MS = 2 * 60 * 1000;

export async function createDraft(kind: DraftKind, title: string, extra: Partial<Draft> = {}): Promise<Draft> {
  const now = Date.now();
  const text = extra.text ?? '';
  const draft: Draft = { id: uid(), kind, title, text, words: countWords(text), createdAt: now, updatedAt: now, ...extra };
  await db.drafts.add(draft);
  return draft;
}

/** Adds words to today's log. Only additions count as "written"; deleting never subtracts. */
export async function logWords(words: number, projectId = '', date = localDate()): Promise<void> {
  if (words <= 0) return;
  const id = `${date}|${projectId}`;
  await db.transaction('rw', db.wordLog, async () => {
    const row = await db.wordLog.get(id);
    await db.wordLog.put({ id, date, projectId, words: (row?.words ?? 0) + words });
  });
}

/**
 * Saves text, logs positive word deltas, and snapshots a version at most every
 * two minutes (or immediately with force). Keeps the last 20 versions.
 *
 * One read-write transaction: overlapping saves of the same draft (blur +
 * unmount, pagehide + visibilitychange) run one after another, so the second
 * sees the first's text and words are logged once. Reads started after a save
 * also wait for it, so the revision check never sees a half-saved draft.
 */
export async function saveDraftText(id: string, text: string, opts: { forceSnapshot?: boolean } = {}): Promise<void> {
  await db.transaction('rw', db.drafts, db.wordLog, db.versions, async () => {
    const draft = await db.drafts.get(id);
    if (!draft) return;
    const words = countWords(text);
    if (text !== draft.text) {
      await db.drafts.update(id, { text, words, updatedAt: Date.now() });
      await logWords(words - draft.words, draft.projectId ?? '');
    }
    await maybeSnapshot(id, text, words, opts.forceSnapshot ?? false);
  });
}

async function maybeSnapshot(draftId: string, text: string, words: number, force: boolean): Promise<void> {
  if (!text.trim()) return;
  const last = await db.versions.where('draftId').equals(draftId).last();
  if (last?.text === text) return;
  if (!force && last && Date.now() - last.savedAt < SNAPSHOT_EVERY_MS) return;
  await db.versions.add({ draftId, text, words, savedAt: Date.now() });
  const ids = await db.versions.where('draftId').equals(draftId).primaryKeys();
  if (ids.length > MAX_VERSIONS) await db.versions.bulkDelete(ids.slice(0, ids.length - MAX_VERSIONS));
}

export async function restoreVersion(draftId: string, versionId: number): Promise<string | undefined> {
  return db.transaction('rw', db.drafts, db.versions, async () => {
    const v = await db.versions.get(versionId);
    const draft = await db.drafts.get(draftId);
    if (!v || !draft) return undefined;
    await maybeSnapshot(draftId, draft.text, draft.words, true); // keep what we're replacing
    await db.drafts.update(draftId, { text: v.text, words: v.words, updatedAt: Date.now() });
    return v.text;
  });
}

export async function totalWordsWritten(): Promise<number> {
  let total = 0;
  await db.wordLog.each((r) => (total += r.words));
  return total;
}
