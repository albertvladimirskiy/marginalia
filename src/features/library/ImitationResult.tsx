import type { ImitationJudgment } from '../../data/types';

export function ImitationResult({ judgment: j }: { judgment: ImitationJudgment }) {
  const captured = { yes: 'Technique captured.', partially: 'Technique partly captured.', no: 'Technique not captured yet.' }[j.technique_captured];
  const copying = { low: 'Little surface copying.', medium: 'Some surface copying.', high: 'Drifting into copying.' }[j.copying_risk];
  return (
    <section className="card hide-in-focus" style={{ marginTop: 16 }}>
      <p style={{ marginTop: 0 }}><strong>{captured}</strong> {copying} <span className="muted">Score {j.score}/5.</span></p>
      <blockquote className="passage">{j.evidence}</blockquote>
      <p><span className="muted">On copying:</span> {j.copying_note}</p>
      <p style={{ marginBottom: 0 }}><span className="muted">Next:</span> {j.advice}</p>
    </section>
  );
}
