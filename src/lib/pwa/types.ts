/**
 * PWA Type Definitions
 * Types for IndexedDB persistence, sync queue, and PWA state
 */

import type { Match, Innings, Ball } from '../../types/match.types';
import type { Team, Player } from '../../types/team.types';
import type { Tournament } from '../../types/tournament.types';

// ============================================================
// Sync Status
// ============================================================

export type SyncStatus = 'local' | 'synced' | 'pending';

// ============================================================
// Scoring Event (for sync queue)
// ============================================================

export interface ScoringEvent {
  id: string;
  matchId: string;
  inningsId: string;
  over: number;
  ball: number;
  runs: number;
  extras?: number;
  wicket?: boolean;
  wicketType?: string;
  batsmanName: string;
  bowlerName: string;
  timestamp: string;
  syncStatus: SyncStatus;
}

// ============================================================
// Sync Queue Item
// ============================================================

export interface SyncQueueItem {
  id: string;
  type: 'scoring_event' | 'match_update' | 'innings_update';
  payload: ScoringEvent | Match | Innings;
  createdAt: string;
  retryCount: number;
  lastError?: string;
}

// ============================================================
// Preferences (localStorage)
// ============================================================

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  dismissedInstallPrompt: boolean;
  lastOnlineAt: string;
  offlineNoticeShown: boolean;
}

// ============================================================
// Database Schema
// ============================================================

export interface SkptDatabase {
  matches: Match[];
  teams: Team[];
  players: Player[];
  tournaments: Tournament[];
  scoringEvents: ScoringEvent[];
  syncQueue: SyncQueueItem[];
  preferences: { key: string; value: unknown }[];
}

// ============================================================
// Scoring Session (persisted)
// ============================================================

export interface ScoringSession {
  currentMatchId: string | null;
  currentInnings: Innings | null;
  currentOver: Ball[];
  currentBatsman: string | null;
  currentBowler: string | null;
  isScoring: boolean;
  ballHistory: Ball[];
  lastUpdated: string;
}

// ============================================================
// PWA Install State
// ============================================================

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// ============================================================
// PWA Update State
// ============================================================

export interface PWAUpdateState {
  hasUpdate: boolean;
  isUpdating: boolean;
  updateAvailable: boolean;
}
