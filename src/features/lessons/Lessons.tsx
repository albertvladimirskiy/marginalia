import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../data/db';
import { SYLLABUS, TRACKS, WRITTEN_LESSONS, syllabusById } from '../../curriculum';
import { weaknessProfile } from '../../ai/context';
import { WEAKNESS_LABELS } from '../../ai/schemas';
import { hasKey } from '../../ai/client';
import { useApiKey } from '../../lib/settings';
import { useLesson } from './useLesson';
import { LessonBody, Passage, ExerciseBrief } from './LessonView';
import { startLessonSession, wordRange } from '../session/actions';

export function Lessons({ id }: { id?: string }) {
  if (id) return <LessonDetail id={id} />;
  return <LessonIndex />;
}

function LessonIndex() {
  const data = useLiveQuery(async () => ({ sessions: await db.sessions.toArray(), cached: new Set(await db.lessons.toCollection().primaryKeys()) }), []);
  if (!data) return null;
  const done = new Set(data.sessions.filter((s) => s.completedAt && s.lessonId).map((s) => s.lessonId!));
  const profile = weaknessProfile(data.sessions);

  return (
    <div>
      <h1>Lessons</h1>
      <p className="muted">{SYLLABUS.length} lessons in eight tracks. Today's rotation picks for you; you can start any lesson here. Prerequisites are suggestions, never locks.</p>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>Weakness Profile</h2>
        {profile.length ? (
          <>
            <p className="small muted">From your last 20 rounds of mentor feedback. Lessons add a constraint against your top weakness once it recurs three times.</p>
            <ul className="list">
              {profile.map((w) => (
                <li key={w.tag} className="spread">
                  <span>{WEAKNESS_LABELS[w.tag]}</span>
                  <span className="muted small">{w.count}×</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="small muted">Builds from mentor feedback. Nothing yet.</p>
        )}
      </section>

      {TRACKS.map((t) => {
        const entries = SYLLABUS.filter((e) => e.track === t.id);
        const count = entries.filter((e) => done.has(e.id)).length;
        return (
          <section key={t.id}>
            <h2>{t.name} <span className="small muted">{count}/{entries.length}</span></h2>
            <p className="small muted">{t.blurb}</p>
            <ul className="list">
              {entries.map((e) => (
                <li key={e.id} className="spread">
                  <a href={`#/lessons/${e.id}`}>{e.title}</a>
                  <span className="small muted">
                    L{e.level}
                    {done.has(e.id) && ' · done'}
                    {WRITTEN_LESSONS.has(e.id) ? ' · written' : data.cached.has(e.id) ? ' · saved offline' : ''}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

function LessonDetail({ id }: { id: string }) {
  useApiKey();
  const entry = syllabusById.get(id);
  const { state, generating, error, generate } = useLesson(id);
  if (!entry) return <p>No such lesson. <a href="#/lessons">All lessons</a></p>;
  if (state.status === 'loading') return null;
  const lesson = state.status === 'ready' ? state.lesson : state.seed;
  const prereqs = entry.prerequisites.map((p) => syllabusById.get(p)?.title).filter(Boolean);

  return (
    <div>
      <p className="small"><a href="#/lessons">← All lessons</a></p>
      {state.status === 'missing' && (
        <div className="note" style={{ marginBottom: 16 }}>
          <p style={{ marginTop: 0 }}>This lesson is written by the Tutor on demand and saved for offline use.</p>
          {error && <p className="small" role="alert">{error}</p>}
          {hasKey() ? (
            <button onClick={() => generate()} disabled={generating}>{generating ? 'Writing the lesson…' : 'Generate this lesson'}</button>
          ) : (
            <p className="small" style={{ marginBottom: 0 }}><a href="#/settings">Add your API key</a> to generate it. You can still start the exercise.</p>
          )}
        </div>
      )}
      <LessonBody lesson={lesson} />
      <Passage lesson={lesson} />
      <ExerciseBrief lesson={lesson} range={wordRange(lesson)} />
      {prereqs.length > 0 && <p className="small muted">Suggested first: {prereqs.join(', ')}.</p>}
      <div className="row" style={{ marginTop: 16 }}>
        <button className="primary" onClick={() => startLessonSession(id)}>Start this lesson</button>
        {state.status === 'ready' && state.source === 'generated' && hasKey() && (
          <button onClick={() => generate()} disabled={generating}>{generating ? 'Rewriting…' : 'Regenerate lesson'}</button>
        )}
      </div>
    </div>
  );
}
