import { describe, expect, it } from 'vitest';
import { countWords } from '../lib/words';

describe('countWords', () => {
  it('counts simple words', () => expect(countWords('The dog crossed the road.')).toBe(5));
  it('handles empty and whitespace', () => {
    expect(countWords('')).toBe(0);
    expect(countWords('   \n\t ')).toBe(0);
  });
  it('keeps contractions and hyphenated words whole', () => {
    expect(countWords("Don't stop the well-made engine")).toBe(5);
    expect(countWords('It’s fine')).toBe(2);
  });
  it('splits on em dashes and slashes', () => {
    expect(countWords('ago—never mind')).toBe(3);
    expect(countWords('either/or')).toBe(2);
  });
  it('ignores punctuation and markdown symbols', () => expect(countWords('# Title\n\n- one, two... *three*!')).toBe(4));
  it('counts numbers and non-English letters', () => expect(countWords('Raskolnikov paid 15 roubles; Dostoïevski écrit')).toBe(6));
});
