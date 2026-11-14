import 'fake-indexeddb/auto';
import { describe, expect, it } from 'vitest';
import { db } from '../data/db';
import type { Session } from '../data/types';
import { openSession } from '../features/session/actions';

const s = (id: string, startedAt: number, extra: Partial<Session> = {}): Session => ({
  id, date: '2026-11-14', kind: 'lesson', step: 'draft', study: [], usage: { inputTokens: 0, outputTokens: 0, costUsd: 0 }, startedAt, ...extra,
});

describe('openSession (what Today offers to resume)', () => {
  it('picks the newest unfinished session', () => {
    expect(openSession([s('a', 1), s('b', 2), s('c', 3, { completedAt: 4 })])?.id).toBe('b');
  });

  it('skips sessions that were set aside, so Today can begin a new one', () => {
    expect(openSession([s('a', 1, { setAsideAt: 5 })])).toBeUndefined();
    expect(openSession([s('a', 1), s('b', 2, { setAsideAt: 5 })])?.id).toBe('a');
  });

  it('clearing setAsideAt in the database makes the session open again', async () => {
    await db.delete();
    await db.open();
    await db.sessions.add(s('x', 1, { setAsideAt: 5 }));
    expect(openSession(await db.sessions.toArray())).toBeUndefined();
    await db.sessions.update('x', { setAsideAt: undefined });
    const back = await db.sessions.get('x');
    expect(back && 'setAsideAt' in back).toBe(false);
    expect(openSession(await db.sessions.toArray())?.id).toBe('x');
  });
});
