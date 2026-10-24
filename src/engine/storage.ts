import { LearnerProfile } from '../types/learner';
import { GameSettings, ActivityRecord } from '../types/game';
import { Achievement, EquippedCosmetics } from '../types/rewards';
import { createInitialLearnerProfile } from './adaptiveEngine';
import { INITIAL_ACHIEVEMENTS } from './achievementEngine';

export interface PersistentGameState {
  version: number;
  currentPosition: number;
  completedSquares: number[];
  passedCheckpoints: number[];
  diceRollsLeft: number;
  totalScore: number; // Represents total XP
  coins: number;
  streak: number;
  longestStreak: number;
  recoveryStreak: number;
  consecutiveIncorrect: number;
  laddersClimbed: number;
  snakesEncountered: number;
  achievements: Achievement[];
  purchasedCosmetics: string[];
  equippedCosmetics: EquippedCosmetics;
  recentActivities: ActivityRecord[];
  learnerProfile: LearnerProfile;
  settings: GameSettings;
}

const STORAGE_KEY = 'code_and_ladders_save_v2';

export const DEFAULT_SETTINGS: GameSettings = {
  soundEnabled: true,
  soundVolume: 0.7,
  reducedMotion: false,
  autoOpenChallenge: true,
  difficulty: 'intermediate'
};

export const DEFAULT_EQUIPPED: EquippedCosmetics = {
  boardTheme: 'theme-obsidian-navy',
  diceSkin: 'dice-classic-ivory',
  playerMarker: 'marker-ninja-coder'
};

export function getInitialGameState(): PersistentGameState {
  return {
    version: 2,
    currentPosition: 1,
    completedSquares: [1],
    passedCheckpoints: [],
    diceRollsLeft: 3,
    totalScore: 240, // Base XP
    coins: 75,       // Starting coin balance
    streak: 0,
    longestStreak: 0,
    recoveryStreak: 0,
    consecutiveIncorrect: 0,
    laddersClimbed: 0,
    snakesEncountered: 0,
    achievements: INITIAL_ACHIEVEMENTS,
    purchasedCosmetics: ['theme-obsidian-navy', 'dice-classic-ivory', 'marker-ninja-coder'],
    equippedCosmetics: DEFAULT_EQUIPPED,
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
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('code_and_ladders_save_v1');
    if (!raw) return getInitialGameState();

    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      const initial = getInitialGameState();
      return {
        ...initial,
        ...parsed,
        version: 2,
        coins: typeof parsed.coins === 'number' ? parsed.coins : initial.coins,
        streak: typeof parsed.streak === 'number' ? parsed.streak : initial.streak,
        longestStreak: typeof parsed.longestStreak === 'number' ? parsed.longestStreak : initial.longestStreak,
        recoveryStreak: typeof parsed.recoveryStreak === 'number' ? parsed.recoveryStreak : initial.recoveryStreak,
        consecutiveIncorrect: typeof parsed.consecutiveIncorrect === 'number' ? parsed.consecutiveIncorrect : 0,
        achievements: Array.isArray(parsed.achievements) && parsed.achievements.length > 0 
          ? parsed.achievements 
          : initial.achievements,
        purchasedCosmetics: Array.isArray(parsed.purchasedCosmetics) 
          ? parsed.purchasedCosmetics 
          : initial.purchasedCosmetics,
        equippedCosmetics: parsed.equippedCosmetics || initial.equippedCosmetics,
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
    localStorage.removeItem('code_and_ladders_save_v1');
  }
  return getInitialGameState();
}
