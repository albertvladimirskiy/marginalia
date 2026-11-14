import type { FeedbackResult, Round2Result, Session } from './types';
import { WEAKNESS_LABELS } from '../ai/schemas';

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

export function round2ToMarkdown(r: Round2Result): string {
  if (!r.ok) return r.raw;
  const verdict = { yes: 'Resolved.', partially: 'Partially resolved.', no: 'Not resolved yet.' }[r.data.resolved];
  return [`**${verdict}**`, quote(r.data.evidence), r.data.new_observation ? `One more thing: ${r.data.new_observation}` : ''].filter(Boolean).join('\n\n');
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
  if (s.feedback2) parts.push('## Did the revision fix it?', round2ToMarkdown(s.feedback2));
  if (s.reflection) parts.push('## Reflection', s.reflection);
  if (s.chat?.length) parts.push('## Ask the Mentor', s.chat.map((m) => `**${m.role === 'user' ? 'You' : 'Mentor'}:** ${m.content}`).join('\n\n'));

  return `${front.join('\n')}\n\n${parts.join('\n\n')}\n`;
}
