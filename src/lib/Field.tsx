import { useEffect, useRef, useState } from 'react';

/**
 * Text input/textarea bound to a stored value. Keeps keystrokes in local state
 * (so async live queries never move the cursor) and resyncs when the stored
 * value changes while the field isn't focused.
 */
export function Field({ id, label, value, onSave, rows, placeholder, hideLabel }: {
  id: string;
  label: string;
  value: string;
  onSave: (v: string) => void;
  rows?: number;
  placeholder?: string;
  hideLabel?: boolean;
}) {
  const [local, setLocal] = useState(value);
  const ref = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  useEffect(() => {
    if (document.activeElement !== ref.current) setLocal(value);
  }, [value]);
  const props = {
    id,
    ref,
    value: local,
    placeholder,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setLocal(e.target.value);
      onSave(e.target.value);
    },
  };
  return (
    <div className="field">
      <label htmlFor={id} className={hideLabel ? 'sr-only' : undefined}>{label}</label>
      {rows ? <textarea rows={rows} {...props} /> : <input type="text" {...props} />}
    </div>
  );
}
