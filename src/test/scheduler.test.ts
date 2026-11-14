import { describe, expect, it } from 'vitest';
import { planToday, DEFAULT_ROTATION, nextInTrack, LONGFORM_TRACKS } from '../lib/scheduler';
import { SYLLABUS, WRITTEN_LESSONS } from '../curriculum';

const fortnight = SYLLABUS.filter((e) => e.track === 'foundations').slice(0, 14).map((e) => e.id);
const base = { syllabus: SYLLABUS, rotation: DEFAULT_ROTATION, longformCount: 0, hasReviewable: true, hasProject: true };

// 2026-11-09 Mon, 10 Tue, 11 Wed, 12 Thu, 13 Fri, 14 Sat, 15 Sun
describe('syllabus', () => {
  it('has at least 120 lessons with unique ids and valid prerequisites', () => {
    expect(SYLLABUS.length).toBeGreaterThanOrEqual(120);
    const ids = new Set(SYLLABUS.map((e) => e.id));
    expect(ids.size).toBe(SYLLABUS.length);
    for (const e of SYLLABUS) for (const p of e.prerequisites) expect(ids.has(p), `${e.id} -> ${p}`).toBe(true);
  });

  it('has the 14 Foundations lessons fully written, 350-600 word bodies', () => {
    expect(fortnight.every((id) => WRITTEN_LESSONS.has(id))).toBe(true);
    for (const l of WRITTEN_LESSONS.values()) {
      const words = l.body.split(/\s+/).length;
      expect(words, l.id).toBeGreaterThanOrEqual(350);
      expect(words, l.id).toBeLessThanOrEqual(600);
      expect(l.questions).toHaveLength(2);
      expect(l.pitfalls).toHaveLength(3);
    }
  });
});

describe('planToday', () => {
  it('serves the Foundations fortnight in order regardless of weekday', () => {
    expect(planToday({ ...base, date: '2026-11-13', completed: new Set() })).toMatchObject({ kind: 'lesson', lessonId: 'f-01' });
    expect(planToday({ ...base, date: '2026-11-15', completed: new Set(fortnight.slice(0, 5)) })).toMatchObject({ kind: 'lesson', lessonId: 'f-06' });
  });

  it('follows the weekly rotation after the fortnight', () => {
    const completed = new Set(fortnight);
    expect(planToday({ ...base, date: '2026-11-09', completed })).toMatchObject({ kind: 'lesson', lessonId: 'e-01' });
    expect(planToday({ ...base, date: '2026-11-10', completed })).toMatchObject({ kind: 'lesson', lessonId: 'fi-01' });
    expect(planToday({ ...base, date: '2026-11-11', completed })).toMatchObject({ kind: 'lesson', lessonId: 'p-01' });
    expect(planToday({ ...base, date: '2026-11-12', completed })).toMatchObject({ kind: 'lesson', lessonId: 'st-01' });
    expect(planToday({ ...base, date: '2026-11-13', completed }).kind).toBe('project');
    expect(planToday({ ...base, date: '2026-11-14', completed })).toMatchObject({ kind: 'lesson', longform: true });
    expect(planToday({ ...base, date: '2026-11-15', completed }).kind).toBe('review');
  });

  it('cycles long-form days through tracks', () => {
    const completed = new Set(fortnight);
    const tracks = [0, 1, 2].map((n) => {
      const p = planToday({ ...base, date: '2026-11-14', completed, longformCount: n });
      return p.kind === 'lesson' ? SYLLABUS.find((e) => e.id === p.lessonId)?.track : undefined;
    });
    expect(tracks).toEqual(LONGFORM_TRACKS.slice(0, 3));
  });

  it('falls back to a lesson when there is nothing to review or no project', () => {
    const completed = new Set(fortnight);
    expect(planToday({ ...base, date: '2026-11-15', completed, hasReviewable: false }).kind).toBe('lesson');
    expect(planToday({ ...base, date: '2026-11-13', completed, hasProject: false }).kind).toBe('lesson');
  });

  it('never dead-ends when a track is finished', () => {
    const completed = new Set([...fortnight, ...SYLLABUS.filter((e) => e.track === 'essay').map((e) => e.id)]);
    const plan = planToday({ ...base, date: '2026-11-09', completed });
    expect(plan.kind).toBe('lesson');
    if (plan.kind === 'lesson') expect(completed.has(plan.lessonId)).toBe(false);
  });

  it('prefers lessons whose prerequisites are met', () => {
    // fi-04 ("Choosing point of view") requires f-13; it is the only fiction lesson unlocked here.
    expect(nextInTrack('fiction', SYLLABUS, new Set(['f-13']))?.id).toBe('fi-04');
    // Nothing unlocked: fall back to the first open lesson rather than dead-ending.
    expect(nextInTrack('fiction', SYLLABUS, new Set())?.id).toBe('fi-01');
  });

  it('suggests review when every lesson is done', () => {
    const completed = new Set(SYLLABUS.map((e) => e.id));
    expect(planToday({ ...base, date: '2026-11-09', completed, hasReviewable: false }).kind).toBe('review');
  });
});
