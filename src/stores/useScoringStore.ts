import { create } from 'zustand';
import type { Ball, Innings } from '../types/match.types';
import { liveInnings, liveBalls } from '../lib/mockData';
import { getScoringSession, saveScoringSession, clearScoringSession } from '../lib/pwa/db';
import type { ScoringSession } from '../lib/pwa/types';

interface ScoringStore {
  currentMatchId: string | null;
  currentInnings: Innings | null;
  currentOver: Ball[];
  currentBatsman: string | null;
  currentBowler: string | null;
  isScoring: boolean;
  ballHistory: Ball[];
  isHydrated: boolean;

  startScoring: (matchId: string) => void;
  stopScoring: () => void;
  addBall: (ball: Omit<Ball, 'id'>) => void;
  undoLastBall: () => void;
  setCurrentBatsman: (name: string) => void;
  setCurrentBowler: (name: string) => void;
  resetInnings: () => void;
  hydrate: () => Promise<void>;
}

export const useScoringStore = create<ScoringStore>((set) => ({
  currentMatchId: null,
  currentInnings: null,
  currentOver: [],
  currentBatsman: null,
  currentBowler: null,
  isScoring: false,
  ballHistory: [],
  isHydrated: false,

  startScoring: (matchId) => {
    const session: ScoringSession = {
      currentMatchId: matchId,
      currentInnings: { ...liveInnings },
      currentOver: [...liveBalls],
      currentBatsman: liveInnings.currentBatsman1 || null,
      currentBowler: liveInnings.currentBowler || null,
      isScoring: true,
      ballHistory: [...liveBalls],
      lastUpdated: new Date().toISOString(),
    };

    set({
      currentMatchId: matchId,
      currentInnings: { ...liveInnings },
      currentOver: [...liveBalls],
      currentBatsman: liveInnings.currentBatsman1 || null,
      currentBowler: liveInnings.currentBowler || null,
      isScoring: true,
      ballHistory: [...liveBalls],
    });

    saveScoringSession(session);
  },

  stopScoring: () => {
    set({
      currentMatchId: null,
      currentInnings: null,
      currentOver: [],
      currentBatsman: null,
      currentBowler: null,
      isScoring: false,
      ballHistory: [],
    });

    clearScoringSession();
  },

  addBall: (ball) => {
    const newBall: Ball = {
      ...ball,
      id: `b${Date.now()}`,
    };

    set((state) => {
      const newState = {
        currentOver: [...state.currentOver, newBall],
        ballHistory: [...state.ballHistory, newBall],
      };

      // Persist to IndexedDB
      const session: ScoringSession = {
        currentMatchId: state.currentMatchId,
        currentInnings: state.currentInnings,
        currentOver: newState.currentOver,
        currentBatsman: state.currentBatsman,
        currentBowler: state.currentBowler,
        isScoring: state.isScoring,
        ballHistory: newState.ballHistory,
        lastUpdated: new Date().toISOString(),
      };
      saveScoringSession(session);

      return newState;
    });
  },

  undoLastBall: () => {
    set((state) => {
      const newState = {
        currentOver: state.currentOver.slice(0, -1),
        ballHistory: state.ballHistory.slice(0, -1),
      };

      const session: ScoringSession = {
        currentMatchId: state.currentMatchId,
        currentInnings: state.currentInnings,
        currentOver: newState.currentOver,
        currentBatsman: state.currentBatsman,
        currentBowler: state.currentBowler,
        isScoring: state.isScoring,
        ballHistory: newState.ballHistory,
        lastUpdated: new Date().toISOString(),
      };
      saveScoringSession(session);

      return newState;
    });
  },

  setCurrentBatsman: (name) => set({ currentBatsman: name }),
  setCurrentBowler: (name) => set({ currentBowler: name }),

  resetInnings: () => {
    set((state) => {
      const newState = {
        currentOver: [],
        ballHistory: [],
      };

      const session: ScoringSession = {
        currentMatchId: state.currentMatchId,
        currentInnings: state.currentInnings,
        currentOver: [],
        currentBatsman: state.currentBatsman,
        currentBowler: state.currentBowler,
        isScoring: state.isScoring,
        ballHistory: [],
        lastUpdated: new Date().toISOString(),
      };
      saveScoringSession(session);

      return newState;
    });
  },

  hydrate: async () => {
    try {
      const session = await getScoringSession();
      if (session && session.isScoring) {
        set({
          currentMatchId: session.currentMatchId,
          currentInnings: session.currentInnings,
          currentOver: session.currentOver,
          currentBatsman: session.currentBatsman,
          currentBowler: session.currentBowler,
          isScoring: session.isScoring,
          ballHistory: session.ballHistory,
          isHydrated: true,
        });
      } else {
        set({ isHydrated: true });
      }
    } catch (error) {
      console.error('Failed to hydrate scoring session:', error);
      set({ isHydrated: true });
    }
  },
}));
