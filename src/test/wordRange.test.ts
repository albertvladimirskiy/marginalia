import { describe, expect, it } from 'vitest';
import { saneRange, RANGE_LIMITS } from '../lib/wordRange';
import { WRITTEN_LESSONS } from '../curriculum';

describe('saneRange (word ranges from AI-written lessons are untrusted)', () => {
  it('leaves every hand-written lesson range unchanged', () => {
    for (const l of WRITTEN_LESSONS.values()) {
      expect(saneRange(l.exercise.minWords, l.exercise.maxWords), l.id).toEqual({ min: l.exercise.minWords, max: l.exercise.maxWords });
    }
  });

  it('caps an impossible minimum so Draft 1 can always be submitted', () => {
    expect(saneRange(2000, 2500).min).toBe(RANGE_LIMITS.minCeiling);
    expect(saneRange(0, 300).min).toBe(RANGE_LIMITS.minFloor);
  });

  it('repairs a minimum above the maximum', () => {
    expect(saneRange(500, 200)).toEqual({ min: 500, max: 600 });
  });

  it('handles missing or non-numeric values', () => {
    expect(saneRange(NaN, NaN)).toEqual({ min: 200, max: 600 });
    expect(saneRange(Infinity, 400)).toEqual({ min: 200, max: 400 });
  });

  it('rounds fractional values and caps the advisory maximum loosely', () => {
    expect(saneRange(249.6, 400.2)).toEqual({ min: 250, max: 400 });
    expect(saneRange(300, 1e9).max).toBe(RANGE_LIMITS.maxCeiling);
  });
});
