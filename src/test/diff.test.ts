import { describe, expect, it } from 'vitest';
import { diffDrafts, diffStats, type DiffOp } from '../lib/diff';

const before = (ops: DiffOp[]) => ops.map((o) => (o.type === 'add' ? '' : o.a)).join('');
const after = (ops: DiffOp[]) => ops.map((o) => (o.type === 'del' ? '' : o.b)).join('');

describe('diffDrafts', () => {
  it('marks cut and added words and reconstructs both drafts exactly', () => {
    const a = 'He cracks them one-handed, which he learned from a television chef, and drops a shell.';
    const b = 'He cracks them one-handed and drops a shell. He salts them twice.';
    const ops = diffDrafts(a, b);
    expect(before(ops)).toBe(a);
    expect(after(ops)).toBe(b);
    expect(ops.some((o) => o.type === 'del' && o.a.includes('television'))).toBe(true);
    expect(ops.some((o) => o.type === 'add' && o.b.includes('twice'))).toBe(true);
  });

  it('treats identical drafts as one unchanged block', () => {
    const ops = diffDrafts('The dog crossed the road.', 'The dog crossed the road.');
    expect(ops).toEqual([{ type: 'same', a: 'The dog crossed the road.', b: 'The dog crossed the road.' }]);
    expect(diffStats(ops)).toEqual({ cut: 0, added: 0, kept: 5 });
  });

  it('ignores whitespace-only changes', () => {
    const ops = diffDrafts('one two\nthree', 'one  two three');
    expect(diffStats(ops)).toMatchObject({ cut: 0, added: 0 });
  });

  it('handles empty drafts', () => {
    expect(diffStats(diffDrafts('', 'new words here'))).toEqual({ cut: 0, added: 3, kept: 0 });
    expect(diffStats(diffDrafts('old words', ''))).toEqual({ cut: 2, added: 0, kept: 0 });
  });

  it('counts words cut, added and kept', () => {
    expect(diffStats(diffDrafts('I felt an overwhelming sense of loss.', 'Her coat was still on the hook.'))).toMatchObject({ kept: 0 });
    expect(diffStats(diffDrafts('a b c d', 'a c d e f'))).toEqual({ cut: 1, added: 2, kept: 3 });
  });

  it('falls back to sentence level for very long drafts and stays exact', () => {
    const para = (n: number, extra = '') => Array.from({ length: n }, (_, i) => `Sentence number ${i} is here${i === 7 ? extra : ''}.`).join(' ');
    const a = para(500);
    const b = para(500, ' with a change');
    const ops = diffDrafts(a, b);
    expect(before(ops)).toBe(a);
    expect(after(ops)).toBe(b);
    expect(ops.filter((o) => o.type !== 'same').length).toBe(2);
  });
});
