import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../data/db';
import { Editor } from './Editor';
import { navigate } from '../../lib/router';
import { syllabusById, trackName } from '../../curriculum';
import { ImitationResult } from '../library/ImitationResult';
import { Field } from '../../lib/Field';

const KIND_LABEL: Record<string, string> = {
  freewrite: 'Freewrite', warmup: 'Warm-up', study: 'Study answers', draft1: 'Draft 1', draft2: 'Draft 2',
  reflection: 'Reflection', chapter: 'Chapter', imitation: 'Imitation', scratch: 'Free page',
};
export const kindLabel = (k: string) => KIND_LABEL[k] ?? k;

/** Open any draft from the Archive: rename, keep writing, see history, delete. */
export function Write({ id }: { id: string }) {
  const draft = useLiveQuery(() => db.drafts.get(id), [id]);
  if (draft === undefined) return <p className="muted">Opening…</p>;
  if (!draft) return <p>That draft no longer exists. <a href="#/archive">Back to the Archive</a></p>;

  const lesson = draft.lessonId ? syllabusById.get(draft.lessonId) : undefined;

  async function remove() {
    if (!window.confirm(`Delete "${draft!.title}" and its version history? This cannot be undone unless you have a backup.`)) return;
    await db.transaction('rw', db.drafts, db.versions, async () => {
      await db.versions.where('draftId').equals(id).delete();
      await db.drafts.delete(id);
    });
    navigate('/archive');
  }

  return (
    <div>
      <div className="hide-in-focus">
        <p className="small"><a href="#/archive">← Archive</a></p>
        <Field id="title" label="Title" value={draft.title} onSave={(title) => db.drafts.update(id, { title })} />
        <p className="small muted">
          {kindLabel(draft.kind)} · {new Date(draft.createdAt).toLocaleDateString()}
          {lesson && ` · ${lesson.title}`}
          {draft.track && ` · ${trackName(draft.track)}`}
        </p>
        {draft.sessionId && (
          <p className="small"><a href={`#/session/${draft.sessionId}`}>See this session's feedback, drafts and reflection</a></p>
        )}
      </div>
      <Editor draftId={id} preview={draft.kind === 'chapter' || draft.kind === 'scratch'} />
      {draft.imitation?.judgment && <ImitationResult judgment={draft.imitation.judgment} />}
      <p className="hide-in-focus" style={{ marginTop: 32 }}>
        <button onClick={remove}>Delete this draft</button>
      </p>
    </div>
  );
}
