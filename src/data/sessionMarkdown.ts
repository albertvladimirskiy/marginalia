import type { FeedbackResult, Round2Result, Session } from './types';
import { WEAKNESS_LABELS } from '../ai/schemas';
import { diffDrafts, diffStats } from '../lib/diff';

const yaml = (v: string) => JSON.stringify(v);
const quote = (t: string) => t.split('\n').map((l) => `> ${l}`).join('\n');

export function feedbackToMarkdown(f: FeedbackResult): string {
  if (!f.ok) return `*Unstructured mentor feedback:*\n\n${f.raw}`;
  const d = f.data;
  return [
    '### As a reader',
    d.reader_response,
    '### Strongest moment',
    quote(d.strongest_moment.quote),
    '',
    d.strongest_moment.reason,
    '### Priorities',
    d.priorities
      .map((p, i) =>
        [
          `${i + 1}. **${p.issue}**`,
          '',
          quote(p.evidence),
          '',
          `   - Why it matters: ${p.why_it_matters}`,
          `   - Technique: ${p.technique_to_apply}`,
          `   - Example: *${p.micro_example}*`,
        ].join('\n'),
      )
      .join('\n\n'),
    '### Revision challenge',
    d.revision_challenge,
    '### Scores',
    d.scores.map((s) => `- ${s.criterion}: ${s.score}/5 — ${s.justification}`).join('\n'),
    d.weakness_tags.length ? `**Weakness tags:** ${d.weakness_tags.map((t) => WEAKNESS_LABELS[t]).join(', ')}` : '',
    `**Next step:** ${d.next_step}`,
  ]
    .filter((x) => x !== '')
    .join('\n\n');
}

export function round2ToMarkdown(r: Round2Result, before: Record<string, number> | null = null): string {
  if (!r.ok) return r.raw;
  const d = r.data;
  const verdict = { yes: 'Priority 1: resolved.', partially: 'Priority 1: partially resolved.', no: 'Priority 1: not resolved yet.' }[d.resolved];
  const scores = (d.scores ?? []).map((s) => `- ${s.criterion}: ${before?.[s.criterion] ?? '—'} → ${s.score} — ${s.note}`).join('\n');
  return [
    `**${verdict}**`,
    quote(d.evidence),
    d.improved ? `Better: ${d.improved}` : '',
    d.worse ? `Worse: ${d.worse}` : '',
    scores ? `Scores (Draft 1 → Draft 2):\n\n${scores}` : '',
    d.new_observation ? `One more thing: ${d.new_observation}` : '',
  ]
    .filter(Boolean)
    .join('\n\n');
}

/** A whole session as one Markdown document: study, drafts, feedback, revision check, reflection, mentor chat. */
export function sessionToMarkdown(args: {
  session: Session;
  title: string;
  track?: string;
  questions: string[];
  draft1?: string;
  draft2?: string;
}): string {
  const { session: s, title, track, questions, draft1, draft2 } = args;
  const front = [
    '---',
    `title: ${yaml(title)}`,
    `date: ${new Date(s.startedAt).toISOString()}`,
    'kind: session',
    track ? `track: ${yaml(track)}` : null,
    `status: ${s.completedAt ? 'complete' : 'in progress'}`,
    '---',
  ].filter(Boolean);

  const parts: string[] = [`# ${title}`];
  if (questions.length && s.study.some((a) => a.trim())) {
    parts.push('## Study', questions.map((q, i) => `**${q}**\n\n${s.study[i] || '—'}`).join('\n\n'));
  }
  if (draft1?.trim()) parts.push('## Draft 1', draft1);
  if (s.feedback1) parts.push('## Feedback', feedbackToMarkdown(s.feedback1));
  else if (s.selfPriority) {
    const scores = Object.entries(s.selfScores ?? {}).map(([c, n]) => `- ${c}: ${n}/5`).join('\n');
    parts.push('## Self-check', [scores, `**Priority 1:** ${s.selfPriority}`].filter(Boolean).join('\n\n'));
  }
  if (draft2?.trim()) parts.push('## Draft 2', draft2);
  if (draft1?.trim() && draft2?.trim() && draft1.trim() !== draft2.trim()) {
    const { cut, added, kept } = diffStats(diffDrafts(draft1, draft2));
    parts.push(`*Revision: ${cut} words cut, ${added} added, ${kept} kept.*`);
  }
  const before = s.feedback1?.ok ? Object.fromEntries(s.feedback1.data.scores.map((x) => [x.criterion, x.score])) : (s.selfScores ?? null);
  if (s.feedback2) parts.push('## How the revision did', round2ToMarkdown(s.feedback2, before));
  if (s.reflection) parts.push('## Reflection', s.reflection);
  if (s.chat?.length) parts.push('## Ask the Mentor', s.chat.map((m) => `**${m.role === 'user' ? 'You' : 'Mentor'}:** ${m.content}`).join('\n\n'));

  return `${front.join('\n')}\n\n${parts.join('\n\n')}\n`;
}
