/**
 * Local Storage Utilities
 * For small preferences only - NOT for large datasets
 */

import type { UserPreferences } from './types';

const STORAGE_PREFIX = 'skpt_';

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'system',
  dismissedInstallPrompt: false,
  lastOnlineAt: new Date().toISOString(),
  offlineNoticeShown: false,
};

/**
 * Get a value from localStorage with type safety
 */
export function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch {
    return defaultValue;
  }
}

/**
 * Set a value in localStorage
 */
export function setStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (error) {
    console.warn('Failed to write to localStorage:', error);
  }
}

/**
 * Remove a value from localStorage
 */
export function removeStorageItem(key: string): void {
  try {
    localStorage.removeItem(STORAGE_PREFIX + key);
  } catch (error) {
    console.warn('Failed to remove from localStorage:', error);
  }
}

/**
 * Get user preferences
 */
export function getUserPreferences(): UserPreferences {
  return getStorageItem<UserPreferences>('preferences', DEFAULT_PREFERENCES);
}

/**
 * Save user preferences
 */
export function saveUserPreferences(preferences: Partial<UserPreferences>): void {
  const current = getUserPreferences();
  setStorageItem('preferences', { ...current, ...preferences });
}

/**
 * Check if install prompt was dismissed
 */
export function wasInstallPromptDismissed(): boolean {
  return getStorageItem<boolean>('install_dismissed', false);
}

/**
 * Mark install prompt as dismissed
 */
export function dismissInstallPrompt(): void {
  setStorageItem('install_dismissed', true);
}

/**
 * Reset install prompt dismissal (for testing)
 */
export function resetInstallPromptDismissal(): void {
  removeStorageItem('install_dismissed');
}

/**
 * Get the last online timestamp
 */
export function getLastOnlineAt(): string | null {
  return getStorageItem<string | null>('last_online_at', null);
}

/**
 * Update the last online timestamp
 */
export function updateLastOnlineAt(): void {
  setStorageItem('last_online_at', new Date().toISOString());
}

/**
 * Clear all app data from localStorage
 */
export function clearAllStorage(): void {
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(STORAGE_PREFIX)) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key));
}

/**
 * Get storage usage estimate in bytes
 */
export function getStorageUsage(): { used: number; quota: number } {
  let used = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      used += key.length + (localStorage.getItem(key)?.length || 0);
    }
  }
  // Most browsers provide ~5MB quota
  return { used, quota: 5 * 1024 * 1024 };
}
