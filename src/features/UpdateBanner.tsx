import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { STALE_EVENT } from '../ai/client';

const CHECK_EVERY_MS = 60 * 60 * 1000;

/**
 * New versions wait until you choose to reload. This shows when one is ready, or
 * when this page is older than the files on the server (a lazy load failed).
 */
export function UpdateBanner() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    // An installed app can stay open for days; look for a new version hourly.
    onRegisteredSW(_url, registration) {
      if (registration) setInterval(() => registration.update().catch(() => undefined), CHECK_EVERY_MS);
    },
  });
  const [stale, setStale] = useState(false);

  useEffect(() => {
    const onStale = () => setStale(true);
    window.addEventListener(STALE_EVENT, onStale);
    window.addEventListener('vite:preloadError', onStale);
    return () => {
      window.removeEventListener(STALE_EVENT, onStale);
      window.removeEventListener('vite:preloadError', onStale);
    };
  }, []);

  if (!needRefresh && !stale) return null;
  return (
    <div className="update-banner" role="status">
      <span>A new version of Marginalia is ready. Your writing is saved.</span>
      <button className="primary" onClick={() => (needRefresh ? updateServiceWorker(true) : window.location.reload())}>Reload</button>
    </div>
  );
}
