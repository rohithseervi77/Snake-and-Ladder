import { LearnerProfile } from '../types/learner';
import { GameSettings, ActivityRecord } from '../types/game';
import { createInitialLearnerProfile } from './adaptiveEngine';

export interface PersistentGameState {
  version: number;
  currentPosition: number;
  completedSquares: number[];
  passedCheckpoints: number[];
  diceRollsLeft: number;
  totalScore: number;
  laddersClimbed: number;
  snakesEncountered: number;
  recentActivities: ActivityRecord[];
  learnerProfile: LearnerProfile;
  settings: GameSettings;
}

const STORAGE_KEY = 'code_and_ladders_save_v1';

export const DEFAULT_SETTINGS: GameSettings = {
  soundEnabled: true,
  soundVolume: 0.7,
  reducedMotion: false,
  autoOpenChallenge: true,
  difficulty: 'intermediate'
};

export function getInitialGameState(): PersistentGameState {
  return {
    version: 1,
    currentPosition: 1,
    completedSquares: [1],
    passedCheckpoints: [],
    diceRollsLeft: 3,
    totalScore: 240,
    laddersClimbed: 0,
    snakesEncountered: 0,
    recentActivities: [
      {
        id: 'act-init-1',
        timestamp: Date.now() - 3600000 * 2,
        type: 'challenge',
        square: 1,
        title: 'Started Journey on Square 1',
        detail: 'Arrays (Manipulation) concept unlocked',
        scoreDelta: 50
      }
    ],
    learnerProfile: createInitialLearnerProfile(),
    settings: DEFAULT_SETTINGS
  };
}

export function loadGameState(): PersistentGameState {
  if (typeof window === 'undefined') return getInitialGameState();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getInitialGameState();

    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && parsed.version === 1) {
      return {
        ...getInitialGameState(),
        ...parsed,
        learnerProfile: {
          ...createInitialLearnerProfile(),
          ...(parsed.learnerProfile || {})
        },
        settings: {
          ...DEFAULT_SETTINGS,
          ...(parsed.settings || {})
        }
      };
    }
  } catch (err) {
    console.error('Failed to parse saved game state:', err);
  }

  return getInitialGameState();
}

export function saveGameState(state: PersistentGameState): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to write to localStorage:', err);
  }
}

export function resetGameStorage(): PersistentGameState {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return getInitialGameState();
}
