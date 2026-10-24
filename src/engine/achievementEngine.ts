import { Achievement } from '../types/rewards';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Solve your very first DSA challenge.',
    icon: 'Footprints',
    category: 'challenge',
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'array_explorer',
    name: 'Array Explorer',
    description: 'Master 3 array or string challenges.',
    icon: 'Layers',
    category: 'challenge',
    unlocked: false,
    progress: 0,
    maxProgress: 3
  },
  {
    id: 'debugging_detective',
    name: 'Debugging Detective',
    description: 'Diagnose and fix 2 edge-case debugging challenges.',
    icon: 'Bug',
    category: 'challenge',
    unlocked: false,
    progress: 0,
    maxProgress: 2
  },
  {
    id: 'optimization_master',
    name: 'Optimization Master',
    description: 'Refactor 2 brute-force solutions on optimization ladders.',
    icon: 'Zap',
    category: 'ladder',
    unlocked: false,
    progress: 0,
    maxProgress: 2
  },
  {
    id: 'complexity_analyst',
    name: 'Complexity Analyst',
    description: 'Correctly analyze Big-O time or space complexity.',
    icon: 'Clock',
    category: 'special',
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'comeback_champion',
    name: 'Comeback Champion',
    description: 'Recover from 2 incorrect attempts with successful comeback answers.',
    icon: 'RotateCcw',
    category: 'special',
    unlocked: false,
    progress: 0,
    maxProgress: 2
  },
  {
    id: 'graph_navigator',
    name: 'Graph Navigator',
    description: 'Master 2 graph traversal or shortest-path challenges.',
    icon: 'Network',
    category: 'challenge',
    unlocked: false,
    progress: 0,
    maxProgress: 2
  },
  {
    id: 'dp_strategist',
    name: 'DP Strategist',
    description: 'Complete 2 dynamic programming memoization or tabulation challenges.',
    icon: 'TrendingUp',
    category: 'challenge',
    unlocked: false,
    progress: 0,
    maxProgress: 2
  },
  {
    id: 'consistent_learner',
    name: 'Consistent Learner',
    description: 'Achieve a streak of 5 consecutive correct answers.',
    icon: 'Flame',
    category: 'streak',
    unlocked: false,
    progress: 0,
    maxProgress: 5
  },
  {
    id: 'board_champion',
    name: 'Board Champion',
    description: 'Reach Tile 100 and complete the DSA Grandmaster journey!',
    icon: 'Crown',
    category: 'special',
    unlocked: false,
    progress: 0,
    maxProgress: 1
  }
];

export interface AchievementEvaluationContext {
  totalSolved: number;
  streak: number;
  recoveryCount: number;
  arraySolved: number;
  debugSolved: number;
  optSolved: number;
  complexitySolved: number;
  graphSolved: number;
  dpSolved: number;
  currentTile: number;
}

/**
 * Checks all achievement conditions against the player's cumulative stats.
 * Returns updated achievements list and array of newly unlocked achievements.
 */
export function evaluateAchievements(
  currentAchievements: Achievement[],
  context: AchievementEvaluationContext
): { updatedList: Achievement[]; newlyUnlocked: Achievement[] } {
  const newlyUnlocked: Achievement[] = [];

  const updatedList = currentAchievements.map(ach => {
    let progress = ach.progress;
    let unlocked = ach.unlocked;

    switch (ach.id) {
      case 'first_steps':
        progress = Math.min(1, context.totalSolved);
        break;
      case 'array_explorer':
        progress = Math.min(3, context.arraySolved);
        break;
      case 'debugging_detective':
        progress = Math.min(2, context.debugSolved);
        break;
      case 'optimization_master':
        progress = Math.min(2, context.optSolved);
        break;
      case 'complexity_analyst':
        progress = Math.min(1, context.complexitySolved);
        break;
      case 'comeback_champion':
        progress = Math.min(2, context.recoveryCount);
        break;
      case 'graph_navigator':
        progress = Math.min(2, context.graphSolved);
        break;
      case 'dp_strategist':
        progress = Math.min(2, context.dpSolved);
        break;
      case 'consistent_learner':
        progress = Math.min(5, context.streak);
        break;
      case 'board_champion':
        progress = context.currentTile >= 100 ? 1 : 0;
        break;
    }

    if (!unlocked && progress >= ach.maxProgress) {
      unlocked = true;
      const unlockedItem = {
        ...ach,
        progress,
        unlocked: true,
        unlockedAt: Date.now()
      };
      newlyUnlocked.push(unlockedItem);
      return unlockedItem;
    }

    return {
      ...ach,
      progress,
      unlocked
    };
  });

  return { updatedList, newlyUnlocked };
}
