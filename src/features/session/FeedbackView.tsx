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

/** Second-round feedback: short by design. Draft 1 scores (mentor or self-check) sit beside Draft 2's. */
export function Round2View({ result, before }: { result: Round2Result; before?: Record<string, number> | null }) {
  if (!result.ok) return <div className="card prose" style={{ whiteSpace: 'pre-wrap' }}>{result.raw}</div>;
  const r = result.data;
  const verdict = { yes: 'Priority 1: resolved.', partially: 'Priority 1: partially resolved.', no: 'Priority 1: not resolved yet.' }[r.resolved];
  // Results saved before scores were added have none; show what there is.
  const scores = r.scores ?? [];
  return (
    <section className="card">
      <p style={{ marginTop: 0 }}><strong>{verdict}</strong></p>
      <blockquote className="passage">{r.evidence}</blockquote>
      {r.improved && <p><span className="muted">Better:</span> {r.improved}</p>}
      {r.worse && <p><span className="muted">Worse:</span> {r.worse}</p>}
      {scores.length > 0 && (
        <table className="scores small">
          <thead>
            <tr><th scope="col">Criterion</th><th scope="col">Draft 1</th><th scope="col">Draft 2</th><th scope="col"><span className="sr-only">Note</span></th></tr>
          </thead>
          <tbody>
            {scores.map((s) => {
              const was = before?.[s.criterion];
              const delta = was === undefined ? null : s.score - was;
              return (
                <tr key={s.criterion}>
                  <td>{s.criterion}</td>
                  <td>{was ?? '—'}</td>
                  <td className={delta && delta > 0 ? 'score-up' : undefined}>
                    {s.score}
                    {delta ? ` (${delta > 0 ? '+' : '−'}${Math.abs(delta)})` : ''}
                  </td>
                  <td className="muted">{s.note}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {r.new_observation && <p style={{ marginBottom: 0 }}><span className="muted">One more thing:</span> {r.new_observation}</p>}
    </section>
  );
}
