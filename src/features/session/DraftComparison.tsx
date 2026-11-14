import { useMemo } from 'react';
import { diffDrafts, diffStats } from '../../lib/diff';

/** Draft 1 and Draft 2 side by side: what the revision cut (left) and added (right). Works offline. */
export function DraftComparison({ draft1, draft2 }: { draft1: string; draft2: string }) {
  const ops = useMemo(() => diffDrafts(draft1, draft2), [draft1, draft2]);
  const { cut, added, kept } = diffStats(ops);
  const total1 = cut + kept;
  const changed = total1 ? Math.round((cut / total1) * 100) : 0;

  return (
    <section>
      <h2>Draft 1 → Draft 2</h2>
      <p className="small muted">
        {cut} {cut === 1 ? 'word' : 'words'} cut, {added} added, {kept} kept{total1 > 0 && ` · about ${changed}% of Draft 1 cut or replaced`}.{' '}
        <span className="legend"><del>cut</del> <ins>added</ins></span>
      </p>
      <div className="compare">
        <div>
          <h3 className="small muted">Draft 1</h3>
          <div className="prose compare-text">
            {ops.map((o, i) => (o.type === 'same' ? <span key={i}>{o.a}</span> : o.type === 'del' ? <del key={i}>{o.a}</del> : null))}
          </div>
        </div>
        <div>
          <h3 className="small muted">Draft 2</h3>
          <div className="prose compare-text">
            {ops.map((o, i) => (o.type === 'same' ? <span key={i}>{o.b}</span> : o.type === 'add' ? <ins key={i}>{o.b}</ins> : null))}
          </div>
        </div>
      </div>
    </section>
  );
}
