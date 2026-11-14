import { useSyncExternalStore } from 'react';

/** Hash routing: GitHub Pages has no SPA fallback, and #/paths need none. */
function subscribe(cb: () => void) {
  window.addEventListener('hashchange', cb);
  return () => window.removeEventListener('hashchange', cb);
}
const getPath = () => window.location.hash.replace(/^#/, '') || '/';

export function useRoute(): { path: string; parts: string[]; query: URLSearchParams } {
  const raw = useSyncExternalStore(subscribe, getPath);
  const [path = '/', qs = ''] = raw.split('?');
  return { path, parts: path.split('/').filter(Boolean), query: new URLSearchParams(qs) };
}

export function navigate(to: string): void {
  window.location.hash = to;
  window.scrollTo(0, 0);
}
