import { useEffect, useRef, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../data/db';
import type { Draft, LessonContent, Session as SessionT, SessionStep } from '../../data/types';
import { createDraft, saveDraftText } from '../../data/drafts';
import { Editor } from '../editor/Editor';
import { LessonBody, Passage, ExerciseBrief } from '../lessons/LessonView';
import { useLesson } from '../lessons/useLesson';
import { FeedbackView, Round2View } from './FeedbackView';
import { Chat } from './Chat';
import { reviewLesson, wordRange } from './actions';
import { addUsage, hasKey, onUsage, toAiError } from '../../ai/client';
import { getFeedback, getRound2 } from '../../ai/tutor';
import { MICRO_CONSTRAINTS, recurringWeakness } from '../../ai/context';
import { useApiKey } from '../../lib/settings';
import { localDate } from '../../lib/dates';
import { countWords } from '../../lib/words';

const LABEL: Record<SessionStep, string> = {
  warmup: 'Warm-up', lesson: 'Lesson', study: 'Study', draft: 'Draft', feedback: 'Feedback', revise: 'Revise', reflect: 'Reflect', done: 'Done',
};

type DraftField = 'warmupId' | 'draft1Id' | 'draft2Id';
const inflight = new Set<string>();

/** Create a session's draft exactly once, even under StrictMode double effects. */
async function ensureDraft(sessionId: string, field: DraftField, make: () => Promise<Draft>): Promise<void> {
  const key = `${sessionId}:${field}`;
  if (inflight.has(key)) return;
  inflight.add(key);
  const fresh = await db.sessions.get(sessionId);
  if (fresh?.[field]) return;
  const d = await make();
  await db.sessions.update(sessionId, { [field]: d.id } as Partial<SessionT>);
}

/** The draft id comes from the live session row; the effect only makes sure it exists. */
function useDraft(session: SessionT, field: DraftField, make: () => Promise<Draft>): string | undefined {
  const id = session[field];
  const makeRef = useRef(make);
  useEffect(() => {
    if (!id) ensureDraft(session.id, field, makeRef.current);
  }, [id, session.id, field]);
  return id;
}

export function Session({ id }: { id: string }) {
  const session = useLiveQuery(() => db.sessions.get(id), [id]);
  const old = useLiveQuery(async () => (session?.reviewOfId ? ((await db.drafts.get(session.reviewOfId)) ?? null) : null), [session?.reviewOfId]);
  const allSessions = useLiveQuery(() => db.sessions.toArray(), []);
  const { state, generate, generating, error } = useLesson(session?.kind === 'lesson' ? session.lessonId : undefined);
  const [useSeed, setUseSeed] = useState(false);
  const [panel, setPanel] = useState(false);
  const autoGen = useRef(false);
  useApiKey();

  // Count this session's AI spend.
  useEffect(
    () =>
      onUsage((u) => {
        db.transaction('rw', db.sessions, async () => {
          const s = await db.sessions.get(id);
          if (s) await db.sessions.update(id, { usage: addUsage(s.usage, u) });
        });
      }),
    [id],
  );

  // Generate the lesson just-in-time when it isn't cached and a key exists.
  useEffect(() => {
    if (state.status === 'missing' && hasKey() && !autoGen.current && navigator.onLine) {
      autoGen.current = true;
      generate(session?.longform);
    }
  }, [state.status, generate, session?.longform]);

  if (session === undefined) return <p className="muted">Opening the session…</p>;
  if (!session) return <p>Session not found. <a href="#/">Back to Today</a></p>;

  let lesson: LessonContent | null = null;
  let written = false;
  if (session.kind === 'review') {
    if (old) lesson = reviewLesson(old);
    else if (old === null) return <p>The piece under review was deleted. <a href="#/">Back to Today</a></p>;
  } else if (state.status === 'ready') {
    lesson = state.lesson;
    written = state.source === 'written';
  } else if (state.status === 'missing') {
    if (generating) return <p className="lede">The Tutor is writing today's lesson…</p>;
    if (useSeed || !hasKey() || error) {
      lesson = state.seed;
    }
  }

  if (!lesson) {
    return (
      <div className="stack">
        <p className="muted">Preparing the lesson…</p>
        {state.status === 'missing' && <button onClick={() => setUseSeed(true)}>Do the exercise without the lesson text</button>}
      </div>
    );
  }

  const range = wordRange(lesson, session.longform);
  const recurring = allSessions ? recurringWeakness(allSessions) : undefined;
  const micro = lesson.microConstraint ?? (written && recurring ? MICRO_CONSTRAINTS[recurring] : null);
  const hasPassage = Boolean(lesson.modelPassage.text);
  const steps: SessionStep[] =
    session.kind === 'review'
      ? ['draft', 'feedback', 'revise', 'reflect']
      : [...(session.warmupId || session.step === 'warmup' ? (['warmup'] as const) : []), 'lesson', ...(hasPassage ? (['study'] as const) : []), 'draft', 'feedback', 'revise', 'reflect'];
  const go = (step: SessionStep) => {
    db.sessions.update(id, { step });
    window.scrollTo(0, 0);
  };
  const next = () => go(steps[steps.indexOf(session.step) + 1] ?? 'done');
  const currentIdx = steps.indexOf(session.step);

  const mentorContext = async () => {
    const draftId = session.draft2Id ?? session.draft1Id ?? session.warmupId;
    const draft = draftId ? await db.drafts.get(draftId) : undefined;
    return `<lesson>${lesson!.title}\nExercise: ${lesson!.exercise.prompt}\nConstraints: ${lesson!.exercise.constraints.join(' | ')}</lesson>\n<current_draft>\n${draft?.text || '(nothing written yet)'}\n</current_draft>`;
  };

  return (
    <div className={`split ${panel ? 'with-panel' : ''}`}>
      <div>
        {session.step !== 'done' && (
          <div className="spread hide-in-focus">
            <ol className="steps" aria-label="Session steps">
              {steps.map((s, i) => (
                <li key={s} aria-current={s === session.step ? 'step' : undefined} className={i < currentIdx ? 'done' : ''}>{LABEL[s]}</li>
              ))}
            </ol>
            <button onClick={() => setPanel((p) => !p)} aria-expanded={panel}>{panel ? 'Close mentor' : 'Ask the mentor'}</button>
          </div>
        )}
        {state.status === 'missing' && lesson === state.seed && session.kind === 'lesson' && (
          <p className="note small hide-in-focus">
            {error ? `${error} ` : 'This lesson has not been generated yet. '}
            You are working from the syllabus entry.
            {hasKey() && <button className="link" onClick={() => generate(session.longform)}>Try generating it again</button>}
          </p>
        )}

        {session.step === 'warmup' && <WarmupStep session={session} onNext={next} />}
        {session.step === 'lesson' && (
          <div>
            <LessonBody lesson={lesson} />
            <button className="primary" onClick={next}>{hasPassage ? 'Study the model passage' : 'Go to the exercise'}</button>
          </div>
        )}
        {session.step === 'study' && <StudyStep session={session} lesson={lesson} onNext={next} />}
        {session.step === 'draft' && <DraftStep session={session} lesson={lesson} range={range} micro={micro} onNext={next} />}
        {session.step === 'feedback' && <FeedbackStep session={session} lesson={lesson} range={range} onNext={next} />}
        {session.step === 'revise' && <ReviseStep session={session} lesson={lesson} onNext={next} />}
        {session.step === 'reflect' && <ReflectStep session={session} lesson={lesson} />}
        {session.step === 'done' && <DoneStep session={session} lesson={lesson} />}
      </div>
      {panel && (
        <aside className="panel hide-in-focus" aria-label="Ask the mentor">
          <h2 style={{ marginTop: 0 }}>Ask the mentor</h2>
          <Chat kind="mentor" history={session.chat ?? []} onHistory={(chat) => db.sessions.update(id, { chat })} context={mentorContext} placeholder="Ask about the lesson or your draft." />
        </aside>
      )}
    </div>
  );
}

function WarmupStep({ session, onNext }: { session: SessionT; onNext: () => void }) {
  const draftId = useDraft(session, 'warmupId', () => createDraft('warmup', `Warm-up ${localDate()}`, { sessionId: session.id }));
  return (
    <div>
      <h1>Warm-up</h1>
      <p className="lede">Write first, read second. Five minutes without stopping. Start anywhere; nothing here is judged.</p>
      {draftId && <Editor draftId={draftId} timerMinutes={5} label="Warm-up freewrite" placeholder="Start with what is in front of you." />}
      <div className="row hide-in-focus" style={{ marginTop: 16 }}>
        <button className="primary" onClick={onNext}>Continue to the lesson</button>
      </div>
    </div>
  );
}

function StudyStep({ session, lesson, onNext }: { session: SessionT; lesson: LessonContent; onNext: () => void }) {
  const [answers, setAnswers] = useState<string[]>(() => lesson.questions.map((_, i) => session.study[i] ?? ''));
  const ready = answers.every((a) => countWords(a) >= 5);

  function update(i: number, v: string) {
    const next = answers.map((a, j) => (j === i ? v : a));
    setAnswers(next);
    db.sessions.update(session.id, { study: next });
  }

  async function finish() {
    const text = lesson.questions.map((q, i) => `**${q}**\n\n${answers[i]}`).join('\n\n');
    const d = await createDraft('study', `${lesson.title} — Study`, { lessonId: lesson.id, track: lesson.track, sessionId: session.id });
    await saveDraftText(d.id, text);
    onNext();
  }

  return (
    <div>
      <h1>Study</h1>
      <p className="muted">Three minutes. Read the passage, then answer in writing.</p>
      <Passage lesson={lesson} />
      {lesson.questions.map((q, i) => (
        <div className="field" key={q}>
          <label htmlFor={`q${i}`} style={{ color: 'var(--ink)', fontSize: '1rem' }}>{q}</label>
          <textarea id={`q${i}`} rows={4} value={answers[i]} onChange={(e) => update(i, e.target.value)} />
        </div>
      ))}
      <button className="primary" disabled={!ready} onClick={finish}>Go to the exercise</button>
      {!ready && <p className="small muted">Answer both questions (a sentence or two each) to continue.</p>}
    </div>
  );
}

function DraftStep({ session, lesson, range, micro, onNext }: { session: SessionT; lesson: LessonContent; range: { min: number; max: number }; micro: string | null; onNext: () => void }) {
  const draftId = useDraft(session, 'draft1Id', () =>
    createDraft('draft1', `${lesson.title} — Draft 1`, { lessonId: lesson.id === 'review' ? undefined : lesson.id, track: lesson.track, sessionId: session.id }),
  );
  const [words, setWords] = useState(0);
  return (
    <div>
      <div className="hide-in-focus">
        <h1>{session.kind === 'review' ? lesson.title : 'Draft 1'}</h1>
        {session.kind === 'review' && <p className="lede">{lesson.hook}</p>}
        <ExerciseBrief lesson={lesson} range={range} micro={micro} />
      </div>
      {draftId && <Editor draftId={draftId} minWords={range.min} maxWords={range.max} onWords={setWords} label="Draft 1" />}
      <div className="row hide-in-focus" style={{ marginTop: 16 }}>
        <button className="primary" disabled={words < range.min} onClick={onNext}>Submit Draft 1</button>
        {words < range.min && <span className="small muted">The lesson completes only with a draft of at least {range.min} words.</span>}
      </div>
    </div>
  );
}

function FeedbackStep({ session, lesson, range, onNext }: { session: SessionT; lesson: LessonContent; range: { min: number; max: number }; onNext: () => void }) {
  useApiKey();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offline, setOffline] = useState(!hasKey());
  const [scores, setScores] = useState<Record<string, number>>(session.selfScores ?? {});
  const [priority, setPriority] = useState(session.selfPriority ?? '');

  async function ask() {
    setBusy(true);
    setError(null);
    try {
      const draft = await db.drafts.get(session.draft1Id!);
      const feedback1 = await getFeedback(lesson, draft?.text ?? '', range);
      await db.sessions.update(session.id, { feedback1 });
    } catch (e) {
      setError(toAiError(e).message);
    } finally {
      setBusy(false);
    }
  }

  if (session.feedback1) {
    return (
      <div>
        <h1>Feedback</h1>
        <FeedbackView result={session.feedback1} />
        <button className="primary" style={{ marginTop: 16 }} onClick={onNext}>Revise</button>
      </div>
    );
  }

  if (offline) {
    const done = priority.trim().length > 0 && lesson.rubric.every((r) => scores[r]);
    return (
      <div>
        <h1>Self-check</h1>
        {!hasKey() && <p className="note small">Mentor feedback needs your API key. <a href="#/settings">Add it in Settings</a> to get line-by-line feedback. For now, be your own first reader.</p>}
        <p>Reread Draft 1 aloud. Score it honestly against today's rubric: 3 is competent, 5 is rare.</p>
        <table className="small">
          <tbody>
            {lesson.rubric.map((r) => (
              <tr key={r}>
                <th scope="row" style={{ fontWeight: 'normal' }}>{r}</th>
                <td>
                  <div className="row" role="radiogroup" aria-label={r}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <label key={n} className="check" style={{ margin: 0 }}>
                        <input type="radio" name={r} checked={scores[r] === n} onChange={() => setScores({ ...scores, [r]: n })} /> {n}
                      </label>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="field" style={{ marginTop: 16 }}>
          <label htmlFor="p1">Your priority #1 for the revision: the single biggest problem, with the sentence that shows it.</label>
          <textarea id="p1" rows={3} value={priority} onChange={(e) => setPriority(e.target.value)} />
        </div>
        <div className="row">
          <button className="primary" disabled={!done} onClick={async () => { await db.sessions.update(session.id, { selfScores: scores, selfPriority: priority }); onNext(); }}>Revise</button>
          {hasKey() && <button onClick={() => setOffline(false)}>Ask the mentor instead</button>}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Feedback</h1>
      <p>Draft 1 is saved. The mentor will read it as a smart first-time reader and give you at most three priorities.</p>
      {error && <p className="note error" role="alert">{error}</p>}
      <div className="row">
        <button className="primary" onClick={ask} disabled={busy}>{busy ? 'Reading your draft…' : error ? 'Try again' : 'Get feedback'}</button>
        <button onClick={() => setOffline(true)} disabled={busy}>Continue without mentor feedback</button>
      </div>
    </div>
  );
}

function ReviseStep({ session, lesson, onNext }: { session: SessionT; lesson: LessonContent; onNext: () => void }) {
  useApiKey();
  const draft1 = useLiveQuery(() => db.drafts.get(session.draft1Id ?? ''), [session.draft1Id]);
  const draftId = useDraft(session, 'draft2Id', async () => {
    const d1 = await db.drafts.get(session.draft1Id ?? '');
    return createDraft('draft2', `${lesson.title} — Draft 2`, { text: d1?.text ?? '', lessonId: d1?.lessonId, track: lesson.track, sessionId: session.id });
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unchanged, setUnchanged] = useState(false);

  const f = session.feedback1;
  const p1 = f?.ok ? f.data.priorities[0] : undefined;

  async function check() {
    setBusy(true);
    setError(null);
    try {
      const d2 = await db.drafts.get(draftId!);
      const feedback = f?.ok ? f.data : (session.selfPriority ?? (f && !f.ok ? f.raw.slice(0, 600) : ''));
      const feedback2 = await getRound2(lesson, draft1?.text ?? '', d2?.text ?? '', feedback);
      await db.sessions.update(session.id, { feedback2 });
    } catch (e) {
      setError(toAiError(e).message);
    } finally {
      setBusy(false);
    }
  }

  async function finish() {
    const d2 = await db.drafts.get(draftId!);
    if (!d2 || d2.text.trim() === (draft1?.text ?? '').trim()) {
      setUnchanged(true);
      return;
    }
    onNext();
  }

  return (
    <div>
      <div className="hide-in-focus">
        <h1>Draft 2</h1>
        <div className="note">
          {p1 ? (
            <>
              <p style={{ marginTop: 0 }}><strong>Priority 1:</strong> {p1.issue}. {p1.technique_to_apply}</p>
              {f?.ok && <p style={{ marginBottom: 0 }}><strong>Revision challenge:</strong> {f.data.revision_challenge}</p>}
            </>
          ) : session.selfPriority ? (
            <p style={{ margin: 0 }}><strong>Your priority 1:</strong> {session.selfPriority}</p>
          ) : (
            <p style={{ margin: 0 }}>Address the biggest problem the feedback named.</p>
          )}
        </div>
        <details style={{ margin: '12px 0' }}>
          <summary>Draft 1 (for reference)</summary>
          <div className="prose" style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>{draft1?.text}</div>
        </details>
        <p className="small muted">Ten minutes. Your Draft 1 is copied below; change what priority 1 asks you to change.</p>
      </div>
      {draftId && <Editor draftId={draftId} timerMinutes={10} label="Draft 2" />}
      <div className="stack hide-in-focus" style={{ marginTop: 16 }}>
        {session.feedback2 && <Round2View result={session.feedback2} />}
        {error && <p className="note error" role="alert">{error}</p>}
        {unchanged && <p className="note" role="alert">Draft 2 is identical to Draft 1. The revision is the lesson: change something.</p>}
        <div className="row">
          {hasKey() && (f || session.selfPriority) && (
            <button onClick={check} disabled={busy || !draftId}>{busy ? 'Checking…' : session.feedback2 ? 'Check again' : 'Did my revision fix it?'}</button>
          )}
          <button className="primary" onClick={finish} disabled={!draftId}>Finish revision</button>
        </div>
      </div>
    </div>
  );
}

function ReflectStep({ session, lesson }: { session: SessionT; lesson: LessonContent }) {
  const [text, setText] = useState(session.reflection ?? '');
  async function finish() {
    const d = await createDraft('reflection', `${lesson.title} — Reflection`, { lessonId: session.kind === 'lesson' ? lesson.id : undefined, track: lesson.track, sessionId: session.id });
    await saveDraftText(d.id, text.trim());
    await db.sessions.update(session.id, { reflection: text.trim(), completedAt: Date.now(), step: 'done' });
  }
  return (
    <div>
      <h1>Reflect</h1>
      <p>One sentence: what you learned today, and what you will try tomorrow.</p>
      <label htmlFor="reflection" className="sr-only">Reflection</label>
      <textarea id="reflection" rows={3} value={text} onChange={(e) => setText(e.target.value)} />
      <button className="primary" style={{ marginTop: 12 }} disabled={countWords(text) < 4} onClick={finish}>Finish today's session</button>
    </div>
  );
}

function DoneStep({ session, lesson }: { session: SessionT; lesson: LessonContent }) {
  const today = useLiveQuery(async () => {
    let n = 0;
    await db.wordLog.where('date').equals(session.date).each((r) => (n += r.words));
    return n;
  }, [session.date]);
  return (
    <div className="today">
      <h1>Done.</h1>
      <p className="lede">{lesson.title}. {today ?? 0} words on the page today.</p>
      {session.reflection && <p className="prose" style={{ margin: '0 auto' }}><em>{session.reflection}</em></p>}
      <div className="row" style={{ justifyContent: 'center', marginTop: 24 }}>
        <a className="btn" href="#/archive">See it in the Archive</a>
        <a className="btn" href="#/">Back to Today</a>
      </div>
    </div>
  );
}
