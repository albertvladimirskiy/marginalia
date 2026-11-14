import type { FeedbackResult, Round2Result } from '../../data/types';
import { WEAKNESS_LABELS } from '../../ai/schemas';

export function FeedbackView({ result }: { result: FeedbackResult }) {
  if (!result.ok) {
    return (
      <section className="card">
        <p className="small muted">The mentor's feedback came back unstructured. Here it is as written:</p>
        <div className="prose" style={{ whiteSpace: 'pre-wrap' }}>{result.raw}</div>
      </section>
    );
  }
  const f = result.data;
  return (
    <section className="stack">
      <div>
        <h3>As a reader</h3>
        <p className="prose">{f.reader_response}</p>
      </div>
      <div>
        <h3>Strongest moment</h3>
        <blockquote className="passage">{f.strongest_moment.quote}</blockquote>
        <p>{f.strongest_moment.reason}</p>
      </div>
      <div>
        <h3>Priorities</h3>
        <ol>
          {f.priorities.map((p, i) => (
            <li key={i} style={{ marginBottom: 16 }}>
              <strong>{p.issue}</strong>
              <blockquote className="passage">{p.evidence}</blockquote>
              <p><span className="muted">Why it matters:</span> {p.why_it_matters}</p>
              <p><span className="muted">Technique:</span> {p.technique_to_apply}</p>
              <p><span className="muted">Example:</span> <em>{p.micro_example}</em></p>
            </li>
          ))}
        </ol>
      </div>
      <div className="note">
        <strong>Revision challenge.</strong> {f.revision_challenge}
      </div>
      <div>
        <h3>Scores</h3>
        <table className="scores small">
          <tbody>
            {f.scores.map((s) => (
              <tr key={s.criterion}>
                <td>{s.criterion}</td>
                <td aria-label={`${s.score} out of 5`}>{s.score} / 5</td>
                <td className="muted">{s.justification}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="small muted">3 is competent. 5 is rare.</p>
      </div>
      {f.weakness_tags.length > 0 && (
        <p className="row small">{f.weakness_tags.map((t) => <span key={t} className="tag">{WEAKNESS_LABELS[t]}</span>)}</p>
      )}
      <p><span className="muted">Next step:</span> {f.next_step}</p>
    </section>
  );
}

export function Round2View({ result }: { result: Round2Result }) {
  if (!result.ok) return <div className="card prose" style={{ whiteSpace: 'pre-wrap' }}>{result.raw}</div>;
  const r = result.data;
  const verdict = { yes: 'Resolved.', partially: 'Partially resolved.', no: 'Not resolved yet.' }[r.resolved];
  return (
    <section className="card">
      <p><strong>{verdict}</strong></p>
      <blockquote className="passage">{r.evidence}</blockquote>
      {r.new_observation && <p><span className="muted">One more thing:</span> {r.new_observation}</p>}
    </section>
  );
}
