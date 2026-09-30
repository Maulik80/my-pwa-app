/**
 * IndexedDB Database Abstraction
 * Uses idb library for clean promise-based API
 */

import { openDB, type IDBPDatabase } from 'idb';
import type { Match } from '../../types/match.types';
import type { Team, Player } from '../../types/team.types';
import type { Tournament } from '../../types/tournament.types';
import type { ScoringEvent, SyncQueueItem, ScoringSession } from './types';

const DB_NAME = 'skpt-cricket-db';
const DB_VERSION = 1;

export const STORES = {
  MATCHES: 'matches',
  TEAMS: 'teams',
  PLAYERS: 'players',
  TOURNAMENTS: 'tournaments',
  SCORING_EVENTS: 'scoringEvents',
  SYNC_QUEUE: 'syncQueue',
  SCORING_SESSION: 'scoringSession',
  PREFERENCES: 'preferences',
} as const;

let dbInstance: IDBPDatabase | null = null;

/**
 * Get or create the IndexedDB database instance
 */
export async function getDB(): Promise<IDBPDatabase> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Matches store
      if (!db.objectStoreNames.contains(STORES.MATCHES)) {
        db.createObjectStore(STORES.MATCHES, { keyPath: 'id' });
      }

      // Teams store
      if (!db.objectStoreNames.contains(STORES.TEAMS)) {
        db.createObjectStore(STORES.TEAMS, { keyPath: 'id' });
      }

      // Players store
      if (!db.objectStoreNames.contains(STORES.PLAYERS)) {
        db.createObjectStore(STORES.PLAYERS, { keyPath: 'id' });
      }

      // Tournaments store
      if (!db.objectStoreNames.contains(STORES.TOURNAMENTS)) {
        db.createObjectStore(STORES.TOURNAMENTS, { keyPath: 'id' });
      }

      // Scoring events store
      if (!db.objectStoreNames.contains(STORES.SCORING_EVENTS)) {
        const store = db.createObjectStore(STORES.SCORING_EVENTS, { keyPath: 'id' });
        store.createIndex('matchId', 'matchId', { unique: false });
        store.createIndex('syncStatus', 'syncStatus', { unique: false });
      }

      // Sync queue store
      if (!db.objectStoreNames.contains(STORES.SYNC_QUEUE)) {
        db.createObjectStore(STORES.SYNC_QUEUE, { keyPath: 'id' });
      }

      // Scoring session store (single record)
      if (!db.objectStoreNames.contains(STORES.SCORING_SESSION)) {
        db.createObjectStore(STORES.SCORING_SESSION, { keyPath: 'id' });
      }

      // Preferences store
      if (!db.objectStoreNames.contains(STORES.PREFERENCES)) {
        db.createObjectStore(STORES.PREFERENCES, { keyPath: 'key' });
      }
    },
  });

  return dbInstance;
}

/**
 * Close the database connection
 */
export async function closeDB(): Promise<void> {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
}

// ============================================================
// Generic CRUD operations
// ============================================================

export async function getAll<T>(storeName: string): Promise<T[]> {
  const db = await getDB();
  return db.getAll(storeName);
}

export async function getById<T>(storeName: string, id: string): Promise<T | undefined> {
  const db = await getDB();
  return db.get(storeName, id);
}

export async function put<T>(storeName: string, value: T): Promise<void> {
  const db = await getDB();
  await db.put(storeName, value);
}

export async function remove(storeName: string, id: string): Promise<void> {
  const db = await getDB();
  await db.delete(storeName, id);
}

export async function clear(storeName: string): Promise<void> {
  const db = await getDB();
  await db.clear(storeName);
}

// ============================================================
// Match operations
// ============================================================

export async function getAllMatches(): Promise<Match[]> {
  return getAll<Match>(STORES.MATCHES);
}

export async function getMatch(id: string): Promise<Match | undefined> {
  return getById<Match>(STORES.MATCHES, id);
}

export async function saveMatch(match: Match): Promise<void> {
  await put(STORES.MATCHES, match);
}

export async function saveMatches(matches: Match[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(STORES.MATCHES, 'readwrite');
  await Promise.all([...matches.map((m) => tx.store.put(m)), tx.done]);
}

// ============================================================
// Team operations
// ============================================================

export async function getAllTeams(): Promise<Team[]> {
  return getAll<Team>(STORES.TEAMS);
}

export async function saveTeams(teams: Team[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(STORES.TEAMS, 'readwrite');
  await Promise.all([...teams.map((t) => tx.store.put(t)), tx.done]);
}

// ============================================================
// Player operations
// ============================================================

export async function getAllPlayers(): Promise<Player[]> {
  return getAll<Player>(STORES.PLAYERS);
}

export async function savePlayers(players: Player[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(STORES.PLAYERS, 'readwrite');
  await Promise.all([...players.map((p) => tx.store.put(p)), tx.done]);
}

// ============================================================
// Tournament operations
// ============================================================

export async function getAllTournaments(): Promise<Tournament[]> {
  return getAll<Tournament>(STORES.TOURNAMENTS);
}

export async function saveTournaments(tournaments: Tournament[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(STORES.TOURNAMENTS, 'readwrite');
  await Promise.all([...tournaments.map((t) => tx.store.put(t)), tx.done]);
}

// ============================================================
// Scoring Event operations
// ============================================================

export async function getAllScoringEvents(): Promise<ScoringEvent[]> {
  return getAll<ScoringEvent>(STORES.SCORING_EVENTS);
}

export async function getScoringEventsByMatch(matchId: string): Promise<ScoringEvent[]> {
  const db = await getDB();
  return db.getAllFromIndex(STORES.SCORING_EVENTS, 'matchId', matchId);
}

export async function saveScoringEvent(event: ScoringEvent): Promise<void> {
  await put(STORES.SCORING_EVENTS, event);
}

export async function saveScoringEvents(events: ScoringEvent[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(STORES.SCORING_EVENTS, 'readwrite');
  await Promise.all([...events.map((e) => tx.store.put(e)), tx.done]);
}

// ============================================================
// Sync Queue operations
// ============================================================

export async function getSyncQueue(): Promise<SyncQueueItem[]> {
  return getAll<SyncQueueItem>(STORES.SYNC_QUEUE);
}

export async function addToSyncQueue(item: SyncQueueItem): Promise<void> {
  await put(STORES.SYNC_QUEUE, item);
}

export async function removeFromSyncQueue(id: string): Promise<void> {
  await remove(STORES.SYNC_QUEUE, id);
}

export async function clearSyncQueue(): Promise<void> {
  await clear(STORES.SYNC_QUEUE);
}

// ============================================================
// Scoring Session operations
// ============================================================

const SCORING_SESSION_ID = 'current';

export async function getScoringSession(): Promise<ScoringSession | undefined> {
  return getById<ScoringSession>(STORES.SCORING_SESSION, SCORING_SESSION_ID);
}

export async function saveScoringSession(session: ScoringSession): Promise<void> {
  await put(STORES.SCORING_SESSION, { ...session, id: SCORING_SESSION_ID });
}

export async function clearScoringSession(): Promise<void> {
  await remove(STORES.SCORING_SESSION, SCORING_SESSION_ID);
}

// ============================================================
// Bulk initialization
// ============================================================

export async function initializeDatabase(data: {
  matches: Match[];
  teams: Team[];
  players: Player[];
  tournaments: Tournament[];
}): Promise<void> {
  await saveMatches(data.matches);
  await saveTeams(data.teams);
  await savePlayers(data.players);
  await saveTournaments(data.tournaments);
}

// ============================================================
// Database health check
// ============================================================

export async function isDatabaseHealthy(): Promise<boolean> {
  try {
    const db = await getDB();
    // Try to read from each store
    await db.count(STORES.MATCHES);
    await db.count(STORES.TEAMS);
    await db.count(STORES.PLAYERS);
    await db.count(STORES.TOURNAMENTS);
    return true;
  } catch {
    return false;
  }
}
