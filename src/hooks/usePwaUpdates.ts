import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

/** Installed apps can stay open across deploys; check when connectivity/focus returns. */
export function usePwaUpdates() {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration>();
  const { needRefresh: [updateAvailable], updateServiceWorker } = useRegisterSW({
    onRegisteredSW(_url, registered) { setRegistration(registered); },
  });

  useEffect(() => {
    if (!registration) return;
    let lastCheck = 0;
    async function check() {
      if (!navigator.onLine || document.visibilityState !== 'visible' || Date.now() - lastCheck < 60_000) return;
      lastCheck = Date.now();
      try { await registration!.update(); } catch { /* Keep the cached app usable on unreliable connections. */ }
    }
    void check();
    window.addEventListener('online', check);
    window.addEventListener('focus', check);
    document.addEventListener('visibilitychange', check);
    return () => {
      window.removeEventListener('online', check);
      window.removeEventListener('focus', check);
      document.removeEventListener('visibilitychange', check);
    };
  }, [registration]);

  return { updateAvailable, updateServiceWorker };
}
