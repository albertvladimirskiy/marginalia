import { describe, expect, it } from 'vitest';
import { SYLLABUS, WRITTEN_LESSONS } from '../curriculum';
import { WARMUPS, FREE_PAGE_PROMPTS, freePagePrompt, warmupFor } from '../curriculum/warmups';

describe('warm-up prompts', () => {
  it('gives every hand-written lesson its own warm-up', () => {
    for (const id of WRITTEN_LESSONS.keys()) expect(WARMUPS[id], id).toBeTruthy();
  });

  it('gives every syllabus lesson some warm-up, and only real syllabus ids have custom ones', () => {
    for (const e of SYLLABUS) expect(warmupFor(e.id, e.track).length, e.id).toBeGreaterThan(10);
    const ids = new Set(SYLLABUS.map((e) => e.id));
    for (const id of Object.keys(WARMUPS)) expect(ids.has(id), id).toBe(true);
  });

  it('is stable for a given lesson and date', () => {
    expect(warmupFor('e-07', 'essay')).toBe(warmupFor('e-07', 'essay'));
    expect(freePagePrompt('2026-11-14')).toBe(freePagePrompt('2026-11-14'));
    expect(FREE_PAGE_PROMPTS).toContain(freePagePrompt('2026-11-15'));
  });
});
