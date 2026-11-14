import { useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useRoute } from './lib/router';
import { useSettings } from './lib/settings';
import { db } from './data/db';
import { Today } from './features/today/Today';
import { Session } from './features/session/Session';
import { Lessons } from './features/lessons/Lessons';
import { Library } from './features/library/Library';
import { Studio } from './features/studio/Studio';
import { Archive } from './features/archive/Archive';
import { Settings } from './features/settings/Settings';
import { Onboarding } from './features/onboarding/Onboarding';

const NAV = [
  ['/', 'Today'],
  ['/lessons', 'Lessons'],
  ['/library', 'Library'],
  ['/studio', 'Studio'],
  ['/archive', 'Archive'],
  ['/settings', 'Settings'],
] as const;

export function App() {
  const { parts } = useRoute();
  const settings = useSettings();
  const total = useLiveQuery(async () => {
    let n = 0;
    await db.wordLog.each((r) => (n += r.words));
    return n;
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', settings.theme);
    root.style.setProperty('--editor-size', `${settings.fontSize}px`);
  }, [settings.theme, settings.fontSize]);

  if (!settings.onboarded) return <Onboarding />;

  const section = parts[0] ?? '';
  let page;
  switch (section) {
    case 'session': page = <Session id={parts[1] ?? ''} />; break;
    case 'lessons': page = <Lessons id={parts[1]} />; break;
    case 'library': page = <Library sub={parts[1]} />; break;
    case 'studio': page = <Studio id={parts[1]} />; break;
    case 'archive': page = <Archive id={parts[1]} />; break;
    case 'settings': page = <Settings />; break;
    default: page = <Today />;
  }

  return (
    <div className="shell">
      <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }}>Skip to content</a>
      <header className="topbar">
        <a className="brand" href="#/">Marginalia</a>
        <nav className="nav" aria-label="Main">
          {NAV.map(([href, label]) => {
            const active = href === '/' ? section === '' : section === href.slice(1);
            return <a key={href} href={`#${href}`} aria-current={active ? 'page' : undefined}>{label}</a>;
          })}
        </nav>
      </header>
      <main id="main" tabIndex={-1}>{page}</main>
      <footer className="footer">{(total ?? 0).toLocaleString()} words written</footer>
    </div>
  );
}
