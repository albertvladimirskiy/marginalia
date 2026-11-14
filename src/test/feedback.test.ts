import { describe, expect, it, vi } from 'vitest';
import { FeedbackSchema, Round2Schema } from '../ai/schemas';
import { getStructured, parseStructured } from '../ai/structured';

const valid = {
  reader_response: 'The kitchen pulled me in. I drifted in the middle paragraph when the mother appears.',
  strongest_moment: { quote: 'The kettle ticked as it cooled.', reason: 'A sound that measures time passing without saying so.' },
  priorities: [
    {
      issue: 'Abstract summary replaces the moment',
      evidence: 'I felt an overwhelming sense of loss.',
      why_it_matters: 'The reader is told the feeling and given nothing to feel it about.',
      technique_to_apply: 'Concrete over abstract: show the object that holds the loss.',
      micro_example: 'Her coat was still on the hook.',
    },
  ],
  revision_challenge: 'Cut every sentence that names an emotion.',
  scores: [
    { criterion: 'Concreteness', score: 3, justification: 'Strong in the opening, abstract at the end.' },
    { criterion: 'Verb strength', score: 2, justification: 'Mostly was/were.' },
    { criterion: 'Rhythm', score: 3, justification: 'Some variation.' },
    { criterion: 'Economy', score: 3, justification: 'Some padding.' },
  ],
  weakness_tags: ['abstraction', 'telling-not-showing'],
  next_step: 'Revise the last paragraph around one object.',
};

describe('feedback schema', () => {
  it('accepts a valid feedback object', () => {
    expect(FeedbackSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects more than three priorities, out-of-range scores, and unknown tags', () => {
    const p = valid.priorities[0]!;
    expect(FeedbackSchema.safeParse({ ...valid, priorities: [p, p, p, p] }).success).toBe(false);
    expect(FeedbackSchema.safeParse({ ...valid, scores: valid.scores.map((s) => ({ ...s, score: 6 })) }).success).toBe(false);
    expect(FeedbackSchema.safeParse({ ...valid, weakness_tags: ['laziness'] }).success).toBe(false);
  });

  it('requires 4-6 scores', () => {
    expect(FeedbackSchema.safeParse({ ...valid, scores: valid.scores.slice(0, 3) }).success).toBe(false);
  });

  it('validates round 2', () => {
    expect(Round2Schema.safeParse({ resolved: 'partially', evidence: 'x', new_observation: null }).success).toBe(true);
    expect(Round2Schema.safeParse({ resolved: 'maybe', evidence: 'x', new_observation: null }).success).toBe(false);
  });
});

describe('parseStructured', () => {
  it('extracts JSON from code fences and prose', () => {
    const r = parseStructured(FeedbackSchema, 'Here you go:\n```json\n' + JSON.stringify(valid) + '\n```');
    expect(r.ok).toBe(true);
  });

  it('reports invalid JSON and schema issues', () => {
    expect(parseStructured(FeedbackSchema, '{not json}')).toMatchObject({ ok: false });
    const r = parseStructured(FeedbackSchema, JSON.stringify({ ...valid, next_step: 5 }));
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toContain('next_step');
  });
});

describe('getStructured (validate, repair once, fall back to raw)', () => {
  it('returns parsed data without repairing when valid', async () => {
    const repair = vi.fn();
    const r = await getStructured({ schema: FeedbackSchema, call: async () => JSON.stringify(valid), repair });
    expect(r.ok).toBe(true);
    expect(repair).not.toHaveBeenCalled();
  });

  it('repairs once when the first output is invalid', async () => {
    const broken = JSON.stringify({ ...valid, scores: [] });
    const repair = vi.fn(async (_raw: string, error: string) => {
      expect(error).toContain('scores');
      return JSON.stringify(valid);
    });
    const r = await getStructured({ schema: FeedbackSchema, call: async () => broken, repair });
    expect(repair).toHaveBeenCalledTimes(1);
    expect(r).toMatchObject({ ok: true });
  });

  it('falls back to raw text when the repair also fails', async () => {
    const raw = 'The draft is promising but the ending explains too much.';
    const r = await getStructured({ schema: FeedbackSchema, call: async () => raw, repair: async () => 'still not json' });
    expect(r).toEqual({ ok: false, raw });
  });

  it('falls back to raw text when the repair call throws', async () => {
    const r = await getStructured({ schema: FeedbackSchema, call: async () => '{}', repair: async () => { throw new Error('network'); } });
    expect(r).toEqual({ ok: false, raw: '{}' });
  });

  it('propagates errors from the first call', async () => {
    await expect(getStructured({ schema: FeedbackSchema, call: async () => { throw new Error('401'); }, repair: async () => '' })).rejects.toThrow('401');
  });
});
