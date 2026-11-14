/** Word-level diff between two drafts, for showing what a revision cut and added. */
import { countWords } from './words';

export type DiffOp = { type: 'same'; a: string; b: string } | { type: 'del'; a: string } | { type: 'add'; b: string };

/** A word or a single punctuation mark, plus its trailing whitespace: "handed," vs "handed" differs only by the comma. */
const words = (s: string) => s.match(/(?:[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*|[^\s\p{L}\p{N}])\s*|\s+/gu) ?? [];
const sentences = (s: string) => s.match(/[^.!?\n]+[.!?]*\s*|\n+/g) ?? [];

// ponytail: O(n·m) LCS table. Above ~4M cells (two ~2,000-word drafts) it diffs by sentence instead, coarser but bounded.
const MAX_CELLS = 4_000_000;

export function diffDrafts(a: string, b: string): DiffOp[] {
  let A = words(a);
  let B = words(b);
  if (A.length * B.length > MAX_CELLS) {
    A = sentences(a);
    B = sentences(b);
  }
  const key = (t: string) => t.trim();
  const n = A.length;
  const m = B.length;
  const w = m + 1;
  // dp[i*w+j] = length of the longest common subsequence of A[i..] and B[j..]
  const dp = new Uint32Array((n + 1) * w);
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i * w + j] = key(A[i]!) === key(B[j]!) ? dp[(i + 1) * w + j + 1]! + 1 : Math.max(dp[(i + 1) * w + j]!, dp[i * w + j + 1]!);
    }
  }

  const ops: DiffOp[] = [];
  const push = (op: DiffOp) => {
    const last = ops[ops.length - 1];
    if (last && last.type === op.type) {
      if (last.type !== 'add' && op.type !== 'add') last.a += op.a;
      if (last.type !== 'del' && op.type !== 'del') last.b += op.b;
    } else ops.push({ ...op });
  };
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (key(A[i]!) === key(B[j]!)) push({ type: 'same', a: A[i++]!, b: B[j++]! });
    else if (dp[(i + 1) * w + j]! >= dp[i * w + j + 1]!) push({ type: 'del', a: A[i++]! });
    else push({ type: 'add', b: B[j++]! });
  }
  while (i < n) push({ type: 'del', a: A[i++]! });
  while (j < m) push({ type: 'add', b: B[j++]! });
  return ops;
}

export function diffStats(ops: DiffOp[]): { cut: number; added: number; kept: number } {
  let cut = 0;
  let added = 0;
  let kept = 0;
  for (const op of ops) {
    if (op.type === 'del') cut += countWords(op.a);
    else if (op.type === 'add') added += countWords(op.b);
    else kept += countWords(op.b);
  }
  return { cut, added, kept };
}
