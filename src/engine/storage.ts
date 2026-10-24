import { LearnerProfile } from '../types/learner';
import { GameSettings, ActivityRecord } from '../types/game';
import { Achievement, EquippedCosmetics } from '../types/rewards';
import { TopicMasteryScore, MisconceptionRecord, FutureEchoChallenge, RouteType } from '../types/evolution';
import { createInitialLearnerProfile } from './adaptiveEngine';
import { INITIAL_ACHIEVEMENTS } from './achievementEngine';
import { createInitialMasteryMap } from './masteryEngine';
import { STARTING_ENERGY } from './energyEngine';

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

  // Evolution (v3) fields
  topicMasteryMap: Record<string, TopicMasteryScore>;
  energy: number;
  activeShield: boolean;
  activeSecondChance: boolean;
  activeLadderBoost: boolean;
  misconceptions: MisconceptionRecord[];
  futureEchoes: FutureEchoChallenge[];
  turnsCompleted: number;
  defeatedBosses: number[];
  completedMutations: string[];
  currentRouteType: RouteType;
  activeRouteTile: number | null;
  questionsAttempted: number;
  questionsCorrect: number;
  energyUsed: number;
}

const STORAGE_KEY_V3 = 'code_and_ladders_save_v3';
const STORAGE_KEY_V2 = 'code_and_ladders_save_v2';
const STORAGE_KEY_V1 = 'code_and_ladders_save_v1';

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
    version: 3,
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
        detail: 'Arrays & Strings foundation unlocked',
        scoreDelta: 50
      }
    ],
    learnerProfile: createInitialLearnerProfile(),
    settings: DEFAULT_SETTINGS,

    // Evolution initial state
    topicMasteryMap: createInitialMasteryMap(),
    energy: STARTING_ENERGY,
    activeShield: false,
    activeSecondChance: false,
    activeLadderBoost: false,
    misconceptions: [],
    futureEchoes: [],
    turnsCompleted: 0,
    defeatedBosses: [],
    completedMutations: [],
    currentRouteType: 'knowledge',
    activeRouteTile: null,
    questionsAttempted: 0,
    questionsCorrect: 0,
    energyUsed: 0
  };
}

export function loadGameState(): PersistentGameState {
  if (typeof window === 'undefined') return getInitialGameState();

  try {
    const raw = localStorage.getItem(STORAGE_KEY_V3) 
      || localStorage.getItem(STORAGE_KEY_V2) 
      || localStorage.getItem(STORAGE_KEY_V1);

    if (!raw) return getInitialGameState();

    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      const initial = getInitialGameState();
      const validPosition = typeof parsed.currentPosition === 'number' && !isNaN(parsed.currentPosition)
        ? Math.max(1, Math.min(100, Math.floor(parsed.currentPosition)))
        : initial.currentPosition;

      return {
        ...initial,
        ...parsed,
        version: 3,
        currentPosition: validPosition,
        coins: typeof parsed.coins === 'number' && !isNaN(parsed.coins) ? Math.max(0, parsed.coins) : initial.coins,
        streak: typeof parsed.streak === 'number' && !isNaN(parsed.streak) ? Math.max(0, parsed.streak) : initial.streak,
        longestStreak: typeof parsed.longestStreak === 'number' && !isNaN(parsed.longestStreak) ? Math.max(0, parsed.longestStreak) : initial.longestStreak,
        recoveryStreak: typeof parsed.recoveryStreak === 'number' && !isNaN(parsed.recoveryStreak) ? Math.max(0, parsed.recoveryStreak) : initial.recoveryStreak,
        consecutiveIncorrect: typeof parsed.consecutiveIncorrect === 'number' && !isNaN(parsed.consecutiveIncorrect) ? Math.max(0, parsed.consecutiveIncorrect) : 0,
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
        },
        // Evolution migrations
        topicMasteryMap: parsed.topicMasteryMap && typeof parsed.topicMasteryMap === 'object'
          ? { ...initial.topicMasteryMap, ...parsed.topicMasteryMap }
          : initial.topicMasteryMap,
        energy: typeof parsed.energy === 'number' ? parsed.energy : initial.energy,
        activeShield: Boolean(parsed.activeShield),
        activeSecondChance: Boolean(parsed.activeSecondChance),
        activeLadderBoost: Boolean(parsed.activeLadderBoost),
        misconceptions: Array.isArray(parsed.misconceptions) ? parsed.misconceptions : [],
        futureEchoes: Array.isArray(parsed.futureEchoes) ? parsed.futureEchoes : [],
        turnsCompleted: typeof parsed.turnsCompleted === 'number' ? parsed.turnsCompleted : 0,
        defeatedBosses: Array.isArray(parsed.defeatedBosses) ? parsed.defeatedBosses : [],
        completedMutations: Array.isArray(parsed.completedMutations) ? parsed.completedMutations : [],
        currentRouteType: parsed.currentRouteType || 'knowledge',
        activeRouteTile: parsed.activeRouteTile || null,
        questionsAttempted: typeof parsed.questionsAttempted === 'number' ? parsed.questionsAttempted : 0,
        questionsCorrect: typeof parsed.questionsCorrect === 'number' ? parsed.questionsCorrect : 0,
        energyUsed: typeof parsed.energyUsed === 'number' ? parsed.energyUsed : 0,
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
    localStorage.setItem(STORAGE_KEY_V3, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to write to localStorage:', err);
  }
}

export function resetGameStorage(): PersistentGameState {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY_V3);
    localStorage.removeItem(STORAGE_KEY_V2);
    localStorage.removeItem(STORAGE_KEY_V1);
  }
  return getInitialGameState();
}
