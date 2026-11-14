/**
 * Rotating epigraphs for Today. Only public-domain quotations the author is
 * confident are accurate, in public-domain translations; paraphrases are
 * labelled "after ...".
 */
export const EPIGRAPHS: { text: string; source: string }[] = [
  { text: 'In the morning when thou risest unwillingly, let this thought be present—I am rising to the work of a human being.', source: 'Marcus Aurelius, Meditations V, trans. George Long' },
  { text: 'It is not that we have too little time, but that we waste much of it.', source: 'after Seneca, On the Shortness of Life' },
  { text: 'I went to the woods because I wished to live deliberately, to front only the essential facts of life.', source: 'Henry David Thoreau, Walden' },
  { text: 'Man is but a reed, the most feeble thing in nature; but he is a thinking reed.', source: 'Blaise Pascal, Pensées, trans. W. F. Trotter' },
  { text: 'Vanity of vanities, saith the Preacher, vanity of vanities; all is vanity.', source: 'Ecclesiastes 1:2 (KJV)' },
  { text: 'An essay is an attempt: write to find out what you think.', source: 'after Montaigne' },
  { text: 'Look on my Works, ye Mighty, and despair!', source: 'Percy Bysshe Shelley, "Ozymandias"' },
  { text: 'To believe your own thought, to believe that what is true for you in your private heart is true for all men,—that is genius.', source: 'Ralph Waldo Emerson, "Self-Reliance"' },
  { text: 'Write today’s page as if it were the only one you will be allowed to keep.', source: 'after Marcus Aurelius' },
  { text: 'The mass of men lead lives of quiet desperation.', source: 'Henry David Thoreau, Walden' },
];

export function epigraphFor(date: string): { text: string; source: string } {
  let h = 0;
  for (const c of date) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return EPIGRAPHS[h % EPIGRAPHS.length]!;
}
