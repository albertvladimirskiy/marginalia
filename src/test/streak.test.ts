import { describe, expect, it } from 'vitest';
import { computeStreak } from '../lib/streak';

// 2026-11-09 is a Monday.
const days = (...entries: [string, number][]) => new Map(entries);

describe('computeStreak', () => {
  it('is zero with no writing', () => {
    expect(computeStreak(new Map(), '2026-11-12').current).toBe(0);
  });

  it('counts consecutive written days including today', () => {
    const s = computeStreak(days(['2026-11-10', 300], ['2026-11-11', 150], ['2026-11-12', 120]), '2026-11-12');
    expect(s.current).toBe(3);
    expect(s.todayDone).toBe(true);
  });

  it('does not break when today is not written yet', () => {
    const s = computeStreak(days(['2026-11-10', 300], ['2026-11-11', 150]), '2026-11-12');
    expect(s.current).toBe(2);
    expect(s.todayDone).toBe(false);
    expect(s.missedYesterday).toBe(false);
  });

  it('days under 100 words do not count', () => {
    const s = computeStreak(days(['2026-11-11', 99], ['2026-11-12', 100]), '2026-11-12');
    expect(s.current).toBe(1);
  });

  it('one rest day per week does not break the streak', () => {
    // Mon, Tue written; Wed rest; Thu written (today)
    const s = computeStreak(days(['2026-11-09', 200], ['2026-11-10', 200], ['2026-11-12', 200]), '2026-11-12');
    expect(s.current).toBe(3);
    expect(s.restUsedThisWeek).toBe(true);
  });

  it('a second missed day in the same week breaks it', () => {
    // Mon written; Tue and Wed missed; Thu written
    const s = computeStreak(days(['2026-11-09', 200], ['2026-11-12', 200]), '2026-11-12');
    expect(s.current).toBe(1);
  });

  it('allows one rest day in each of two different weeks', () => {
    // Week of Nov 2: rest on Sun Nov 8. Week of Nov 9: rest on Tue Nov 10.
    const written: [string, number][] = ['2026-11-05', '2026-11-06', '2026-11-07', '2026-11-09', '2026-11-11', '2026-11-12'].map((d) => [d, 150]);
    expect(computeStreak(new Map(written), '2026-11-12').current).toBe(6);
  });

  it('missing yesterday with today unwritten spends the rest day but keeps the streak', () => {
    const s = computeStreak(days(['2026-11-09', 200], ['2026-11-10', 200]), '2026-11-12');
    expect(s.current).toBe(2);
    expect(s.missedYesterday).toBe(true);
    expect(s.restUsedThisWeek).toBe(true);
  });

  it('rest flag is false when the week is clean', () => {
    const s = computeStreak(days(['2026-11-09', 200], ['2026-11-10', 200], ['2026-11-11', 200]), '2026-11-12');
    expect(s.restUsedThisWeek).toBe(false);
  });
});
