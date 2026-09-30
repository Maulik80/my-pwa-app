import { useCallback, useSyncExternalStore } from 'react';
import type { BeforeInstallPromptEvent } from '../lib/pwa/types';
import { wasInstallPromptDismissed, dismissInstallPrompt } from '../lib/pwa/storage';

interface UsePWAInstallReturn {
  isInstallable: boolean;
  isInstalled: boolean;
  isDismissed: boolean;
  install: () => Promise<boolean>;
  dismiss: () => void;
}

function checkIsInstalled(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(display-mode: standalone)').matches;
}

// ============================================================
// Module-level shared state — single source of truth for all
// hook instances so Header and InstallPrompt stay in sync.
// ============================================================

interface SharedInstallState {
  deferredPrompt: BeforeInstallPromptEvent | null;
  isInstallable: boolean;
  isInstalled: boolean;
  isDismissed: boolean;
}

let sharedState: SharedInstallState = {
  deferredPrompt: null,
  isInstallable: false,
  isInstalled: checkIsInstalled(),
  isDismissed: wasInstallPromptDismissed(),
};

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): SharedInstallState {
  return sharedState;
}

// Set up global listeners once at module level
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    sharedState = {
      ...sharedState,
      deferredPrompt: e as BeforeInstallPromptEvent,
      isInstallable: true,
    };
    emitChange();
  });

  window.addEventListener('appinstalled', () => {
    sharedState = {
      ...sharedState,
      isInstalled: true,
      isInstallable: false,
      deferredPrompt: null,
    };
    emitChange();
  });
}

export function usePWAInstall(): UsePWAInstallReturn {
  const state = useSyncExternalStore(subscribe, getSnapshot);

  const install = useCallback(async (): Promise<boolean> => {
    if (!sharedState.deferredPrompt) return false;
    try {
      await sharedState.deferredPrompt.prompt();
      const { outcome } = await sharedState.deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        sharedState = {
          ...sharedState,
          deferredPrompt: null,
          isInstallable: false,
        };
        emitChange();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Install prompt failed:', error);
      return false;
    }
  }, []);

  const dismiss = useCallback(() => {
    sharedState = { ...sharedState, isDismissed: true };
    dismissInstallPrompt();
    emitChange();
  }, []);

  return {
    isInstallable: state.isInstallable,
    isInstalled: state.isInstalled,
    isDismissed: state.isDismissed,
    install,
    dismiss,
  };
}
