/**
 * Sync Queue Manager
 * Prepares architecture for future backend synchronization
 * Currently a no-op since no backend is configured
 */

import type { SyncQueueItem, ScoringEvent } from './types';
import { getSyncQueue, addToSyncQueue, removeFromSyncQueue, clearSyncQueue } from './db';

// ============================================================
// Sync Queue Configuration
// ============================================================

/**
 * Check if a backend is configured for synchronization
 * Currently returns false - no backend in Phase 1
 */
export function isBackendConfigured(): boolean {
  // Phase 1: No backend configured
  // Phase 2+: Check for API URL, WebSocket URL, etc.
  return false;
}

/**
 * Get the backend API URL (when configured)
 */
export function getBackendUrl(): string | null {
  // Phase 1: No backend URL
  return null;
}

// ============================================================
// Sync Queue Operations
// ============================================================

/**
 * Add a scoring event to the sync queue
 * The event will be persisted locally and marked as pending
 */
export async function queueScoringEvent(event: ScoringEvent): Promise<void> {
  const queueItem: SyncQueueItem = {
    id: `sq_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    type: 'scoring_event',
    payload: event,
    createdAt: new Date().toISOString(),
    retryCount: 0,
  };

  await addToSyncQueue(queueItem);
}

/**
 * Get all pending items in the sync queue
 */
export async function getPendingItems(): Promise<SyncQueueItem[]> {
  const queue = await getSyncQueue();
  return queue.filter(
    (item) => (item.payload as ScoringEvent)?.syncStatus === 'pending' || item.retryCount === 0
  );
}

/**
 * Get the count of pending items
 */
export async function getPendingCount(): Promise<number> {
  const pending = await getPendingItems();
  return pending.length;
}

/**
 * Attempt to sync pending events
 * Currently a no-op since no backend is configured
 * In Phase 2+, this will send events to the backend
 */
export async function syncPendingEvents(): Promise<{
  success: boolean;
  synced: number;
  failed: number;
  message: string;
}> {
  if (!isBackendConfigured()) {
    return {
      success: true,
      synced: 0,
      failed: 0,
      message: 'No backend configured. Events stored locally only.',
    };
  }

  // Phase 2+: Implement actual sync logic here
  // 1. Get pending items
  // 2. Send to backend API
  // 3. Mark as synced on success
  // 4. Retry on failure

  return {
    success: true,
    synced: 0,
    failed: 0,
    message: 'Sync not yet implemented.',
  };
}

/**
 * Mark a sync queue item as synced
 */
export async function markAsSynced(queueItemId: string): Promise<void> {
  await removeFromSyncQueue(queueItemId);
}

/**
 * Increment retry count for a failed item
 */
export async function incrementRetryCount(queueItemId: string): Promise<void> {
  const queue = await getSyncQueue();
  const item = queue.find((i) => i.id === queueItemId);
  if (item) {
    item.retryCount += 1;
    await addToSyncQueue(item);
  }
}

/**
 * Clear the entire sync queue
 * Use with confirmation - this deletes local data
 */
export async function clearAllPendingEvents(): Promise<void> {
  await clearSyncQueue();
}

/**
 * Get sync queue statistics
 */
export async function getSyncStats(): Promise<{
  total: number;
  pending: number;
  synced: number;
  failed: number;
}> {
  const queue = await getSyncQueue();
  const pending = queue.filter((item) => item.retryCount === 0).length;
  const failed = queue.filter((item) => item.retryCount > 3).length;
  const synced = queue.length - pending - failed;

  return {
    total: queue.length,
    pending,
    synced,
    failed,
  };
}
