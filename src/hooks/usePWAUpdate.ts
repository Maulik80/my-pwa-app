/**
 * PWA Update Hook
 * Handles service worker update detection and user prompt
 */

import { useRegisterSW } from 'virtual:pwa-register/react';

interface PWAUpdateState {
  needRefresh: boolean;
  offlineReady: boolean;
  updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
}

export function usePWAUpdate(): PWAUpdateState {
  const {
    needRefresh: [needRefresh],
    offlineReady: [offlineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration) {
      // Check for updates every hour
      if (registration) {
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);
      }
    },
    onRegisterError(error) {
      console.error('SW registration error:', error);
    },
  });

  return {
    needRefresh,
    offlineReady,
    updateServiceWorker,
  };
}
