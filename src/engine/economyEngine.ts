import { LevelInfo, DifficultyLevel } from '../types/rewards';

export const LEVEL_TIERS: { level: number; title: string; minXp: number; maxXp: number }[] = [
  { level: 1, title: 'Beginner Coder', minXp: 0, maxXp: 200 },
  { level: 2, title: 'Array Explorer', minXp: 200, maxXp: 500 },
  { level: 3, title: 'Logic Builder', minXp: 500, maxXp: 1000 },
  { level: 4, title: 'Algorithm Apprentice', minXp: 1000, maxXp: 1800 },
  { level: 5, title: 'Debugging Detective', minXp: 1800, maxXp: 2800 },
  { level: 6, title: 'Data Structure Specialist', minXp: 2800, maxXp: 4000 },
  { level: 7, title: 'Algorithm Strategist', minXp: 4000, maxXp: 5500 },
  { level: 8, title: 'Optimization Expert', minXp: 5500, maxXp: 7200 },
  { level: 9, title: 'Graph Master', minXp: 7200, maxXp: 9200 },
  { level: 10, title: 'DSA Grandmaster', minXp: 9200, maxXp: 999999 }
];

export function calculateLevelInfo(totalXp: number): LevelInfo {
  let tier = LEVEL_TIERS[0];
  for (let i = LEVEL_TIERS.length - 1; i >= 0; i--) {
    if (totalXp >= LEVEL_TIERS[i].minXp) {
      tier = LEVEL_TIERS[i];
      break;
    }
  }

  const isMaxLevel = tier.level === 10;
  const currentLevelXp = totalXp - tier.minXp;
  const span = tier.maxXp - tier.minXp;
  const xpNeededForNext = isMaxLevel ? 0 : Math.max(0, tier.maxXp - totalXp);
  const progressPercent = isMaxLevel ? 100 : Math.min(100, Math.max(0, (currentLevelXp / span) * 100));

  return {
    level: tier.level,
    title: tier.title,
    minXp: tier.minXp,
    maxXp: tier.maxXp,
    progressPercent,
    currentLevelXp,
    xpNeededForNext
  };
}

export interface MovementRewardCalculation {
  tilesDelta: number;
  isRecovery: boolean;
  isFirstAttempt: boolean;
  explanation: string;
  badgeText: string;
}

/**
 * Calculates answer-based forward movement according to specifications:
 * - Easy: +1, Medium: +2, Hard: +3, Expert: +4
 * - First attempt: +1 additional tile
 * - Recovery after error: +1 recovery tile instead of normal difficulty bonus
 */
export function calculateCorrectMovement(
  difficulty: DifficultyLevel,
  isFirstAttempt: boolean,
  isRecovery: boolean
): MovementRewardCalculation {
  if (isRecovery) {
    return {
      tilesDelta: 1,
      isRecovery: true,
      isFirstAttempt: false,
      explanation: 'COMEBACK! You learned from the mistake. +1 RECOVERY TILE!',
      badgeText: '+1 RECOVERY TILE'
    };
  }

  let baseTiles = 1;
  switch (difficulty) {
    case 'easy': baseTiles = 1; break;
    case 'medium': baseTiles = 2; break;
    case 'hard': baseTiles = 3; break;
    case 'expert': baseTiles = 4; break;
  }

  const bonusTiles = isFirstAttempt ? 1 : 0;
  const totalDelta = baseTiles + bonusTiles;

  const badge = isFirstAttempt 
    ? `+${baseTiles} ${difficulty.toUpperCase()} + 1 FIRST-TRY BONUS` 
    : `+${baseTiles} ${difficulty.toUpperCase()} TILES`;

  const explanation = isFirstAttempt 
    ? `CORRECT ANSWER! +${baseTiles} BONUS TILES + FIRST-TRY BONUS!` 
    : `CORRECT ANSWER! +${baseTiles} BONUS TILES!`;

  return {
    tilesDelta: totalDelta,
    isRecovery: false,
    isFirstAttempt,
    explanation,
    badgeText: badge
  };
}

export interface MovementPenaltyCalculation {
  tilesDelta: number; // Negative number
  consecutiveIncorrect: number;
  explanation: string;
  badgeText: string;
}

/**
 * Calculates answer-based backward movement penalty for incorrect attempts:
 * - 1st error: -1 tile
 * - 2nd consecutive error: -2 tiles
 * - 3rd+ consecutive error: -3 tiles
 */
export function calculateIncorrectPenalty(
  consecutiveIncorrect: number
): MovementPenaltyCalculation {
  let penalty = 1;
  if (consecutiveIncorrect === 1) {
    penalty = 1;
  } else if (consecutiveIncorrect === 2) {
    penalty = 2;
  } else {
    penalty = 3;
  }

  return {
    tilesDelta: -penalty,
    consecutiveIncorrect,
    explanation: `NOT QUITE! -${penalty} TILE${penalty > 1 ? 'S' : ''}. REVIEW THE EXPLANATION AND TRY AGAIN.`,
    badgeText: `-${penalty} TILE${penalty > 1 ? 'S' : ''} PENALTY`
  };
}

export interface EconomyRewardResult {
  xpDelta: number;
  coinsDelta: number;
  explanation: string;
}

/**
 * Centralized XP and Coins Reward calculation
 */
export function calculateEconomyReward(
  isCorrect: boolean,
  difficulty: DifficultyLevel,
  isFirstAttempt: boolean,
  isRecovery: boolean,
  isOptimization: boolean,
  hintUsed: boolean
): EconomyRewardResult {
  if (!isCorrect) {
    // Participation reward for incorrect attempt (+3 XP, +1 coin)
    return {
      xpDelta: 3,
      coinsDelta: 1,
      explanation: '+3 XP and +1 Coin participation reward for effort.'
    };
  }

  if (isRecovery) {
    // Recovery reward: +15 XP, +5 Coins
    return {
      xpDelta: 15,
      coinsDelta: 5,
      explanation: '+15 XP and +5 Coins for recovering from a previous mistake!'
    };
  }

  // Base rewards
  let baseXp = 20;
  let baseCoins = 10;

  switch (difficulty) {
    case 'easy': baseXp = 20; baseCoins = 10; break;
    case 'medium': baseXp = 35; baseCoins = 15; break;
    case 'hard': baseXp = 60; baseCoins = 25; break;
    case 'expert': baseXp = 100; baseCoins = 40; break;
  }

  let bonusXp = 0;
  let bonusCoins = 0;

  if (isFirstAttempt) {
    bonusXp += 10;
    bonusCoins += 5;
  }

  if (isOptimization) {
    bonusXp += 20;
    bonusCoins += 10;
  }

  if (hintUsed) {
    // Slightly reduced bonus if hint was used
    baseXp = Math.max(10, baseXp - 10);
  }

  return {
    xpDelta: baseXp + bonusXp,
    coinsDelta: baseCoins + bonusCoins,
    explanation: `Earned +${baseXp + bonusXp} XP and +${baseCoins + bonusCoins} Coins!`
  };
}
