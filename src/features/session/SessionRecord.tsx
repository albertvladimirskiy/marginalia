import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../data/db';
import type { LessonContent, Session } from '../../data/types';
import { FeedbackView, Round2View } from './FeedbackView';

/** Everything one session produced, on one page: drafts, feedback, revision check, reflection, mentor chat. */
export function SessionRecord({ session, lesson }: { session: Session; lesson: LessonContent }) {
  const drafts = useLiveQuery(async () => {
    const [warmup, draft1, draft2, reviewOf] = await db.drafts.bulkGet([session.warmupId ?? '', session.draft1Id ?? '', session.draft2Id ?? '', session.reviewOfId ?? '']);
    return { warmup, draft1, draft2, reviewOf };
  }, [session.warmupId, session.draft1Id, session.draft2Id, session.reviewOfId]);
  if (!drafts) return null;
  const { warmup, draft1, draft2, reviewOf } = drafts;

  return (
    <div className="stack" style={{ textAlign: 'left', maxWidth: 'var(--measure)', margin: '0 auto' }}>
      <p className="small muted">
        {session.kind === 'review' ? (
          <>Review of {reviewOf ? <a href={`#/archive/${reviewOf.id}`}>{reviewOf.title}</a> : 'an older piece'}</>
        ) : session.lessonId ? (
          <>Lesson: <a href={`#/lessons/${session.lessonId}`}>{lesson.title}</a></>
        ) : null}
        {session.longform && ' · long-form day'}
        {' · '}
        {new Date(session.startedAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      {warmup?.text.trim() && <DraftBlock title="Warm-up" id={warmup.id} text={warmup.text} words={warmup.words} />}

      {lesson.questions.length > 0 && session.study.some((a) => a.trim()) && (
        <section>
          <h2>Study</h2>
          {lesson.questions.map((q, i) => (
            <div key={q} style={{ marginBottom: 12 }}>
              <p className="small muted" style={{ marginBottom: 4 }}>{q}</p>
              <p className="prose" style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{session.study[i] || '—'}</p>
            </div>
          ))}
        </section>
      )}

      {draft1 && <DraftBlock title="Draft 1" id={draft1.id} text={draft1.text} words={draft1.words} />}

      <section>
        <h2>Feedback</h2>
        {session.feedback1 ? (
          <FeedbackView result={session.feedback1} />
        ) : session.selfPriority ? (
          <div className="card">
            <p className="small muted" style={{ marginTop: 0 }}>Self-check (no mentor feedback this session)</p>
            {session.selfScores && (
              <table className="scores small">
                <tbody>
                  {Object.entries(session.selfScores).map(([criterion, score]) => (
                    <tr key={criterion}><td>{criterion}</td><td>{score} / 5</td></tr>
                  ))}
                </tbody>
              </table>
            )}
            <p style={{ marginBottom: 0 }}><strong>Your priority 1:</strong> {session.selfPriority}</p>
          </div>
        ) : (
          <p className="muted">No feedback was recorded for this session.</p>
        )}
      </section>

      {draft2 && <DraftBlock title="Draft 2" id={draft2.id} text={draft2.text} words={draft2.words} />}

      {session.feedback2 && (
        <section>
          <h2>Did the revision fix it?</h2>
          <Round2View result={session.feedback2} />
        </section>
      )}

      {session.reflection && (
        <section>
          <h2>Reflection</h2>
          <p className="prose"><em>{session.reflection}</em></p>
        </section>
      )}

      {session.chat && session.chat.length > 0 && (
        <details>
          <summary>Ask the Mentor conversation ({session.chat.length} messages)</summary>
          <div className="chat" style={{ maxHeight: 'none', marginTop: 12 }}>
            {session.chat.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>
                <span className="small muted">{m.role === 'user' ? 'You' : 'Mentor'}: </span>
                {m.content}
              </div>
            ))}
          </div>
        </details>
      )}

      {session.usage.costUsd > 0 && (
        <p className="small muted">
          Mentor cost for this session: about ${session.usage.costUsd.toFixed(3)} ({(session.usage.inputTokens + session.usage.outputTokens).toLocaleString()} tokens).
        </p>
      )}
    </div>
  );
}

function DraftBlock({ title, id, text, words }: { title: string; id: string; text: string; words: number }) {
  return (
    <section>
      <details>
        <summary>
          <strong>{title}</strong> <span className="small muted">· {words} words</span>
        </summary>
        <div className="prose" style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>{text}</div>
      </details>
      <p className="small" style={{ margin: '4px 0 0' }}><a href={`#/archive/${id}`}>Open {title} in the Archive</a></p>
    </section>
  );
}
