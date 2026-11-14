import ReactMarkdown from 'react-markdown';
import type { LessonContent } from '../../data/types';
import { trackName } from '../../curriculum';

export function LessonBody({ lesson }: { lesson: LessonContent }) {
  return (
    <article>
      <p className="small muted">{trackName(lesson.track)} · Master lens: {lesson.masterLens}</p>
      <h1>{lesson.title}</h1>
      <p className="lede">{lesson.hook}</p>
      <div className="prose">
        <ReactMarkdown>{lesson.body}</ReactMarkdown>
      </div>
    </article>
  );
}

export function Passage({ lesson }: { lesson: LessonContent }) {
  if (!lesson.modelPassage.text) return null;
  return (
    <figure style={{ margin: '0 0 24px' }}>
      <blockquote className="passage">{lesson.modelPassage.text}</blockquote>
      <figcaption className="small muted">{lesson.modelPassage.source}</figcaption>
    </figure>
  );
}

export function ExerciseBrief({ lesson, range, micro }: { lesson: LessonContent; range: { min: number; max: number }; micro?: string | null }) {
  return (
    <section className="card">
      <h2 style={{ marginTop: 0 }}>Exercise</h2>
      <p className="prose" style={{ margin: 0 }}>{lesson.exercise.prompt}</p>
      <ul>
        {lesson.exercise.constraints.map((c) => <li key={c}>{c}</li>)}
        {micro && <li><strong>{micro}</strong></li>}
      </ul>
      <p className="small muted">{range.min}–{range.max} words.</p>
      {lesson.pitfalls.length > 0 && (
        <details>
          <summary className="small">Common pitfalls</summary>
          <ul className="small">{lesson.pitfalls.map((p) => <li key={p}>{p}</li>)}</ul>
        </details>
      )}
    </section>
  );
}
