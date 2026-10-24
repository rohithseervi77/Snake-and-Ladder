import { RouteOption, TopicMasteryScore } from '../types/evolution';

export interface DecisionTileConfig {
  tileNumber: number;
  topicName: string;
  title: string;
  lore: string;
  routes: {
    knowledge: Omit<RouteOption, 'isUnlocked' | 'lockedReason'>;
    challenge: Omit<RouteOption, 'isUnlocked' | 'lockedReason'>;
    risk: Omit<RouteOption, 'isUnlocked' | 'lockedReason'>;
  };
}

export const DECISION_TILES: DecisionTileConfig[] = [
  {
    tileNumber: 15,
    topicName: 'Arrays and strings',
    title: 'Crossroads of the Array Wilderness',
    lore: 'The path splits. Will you consolidate basic memory pointers, brave nested index scanning, or risk in-place Dutch Flag partitioning?',
    routes: {
      knowledge: {
        id: 'route-15-knowledge',
        type: 'knowledge',
        title: 'Knowledge Route: Index Basics & Bounds',
        description: 'Focus on 0-indexed bounds, character immutability, and defensive pointer checks.',
        difficulty: 'easy',
        movementReward: '+1 Tile on success',
        possiblePenalty: '0 Tiles penalty (safe path)',
        unlockRequirements: {}
      },
      challenge: {
        id: 'route-15-challenge',
        type: 'challenge',
        title: 'Challenge Route: Two-Pointer Convergence',
        description: 'Solve two-pointer converging intervals in linear O(N) time.',
        difficulty: 'medium',
        movementReward: '+2 Tiles forward & +40 XP',
        possiblePenalty: '-1 Tile backward on failure',
        unlockRequirements: {
          minMastery: 30,
          requiredTopic: 'Arrays and strings'
        }
      },
      risk: {
        id: 'route-15-risk',
        type: 'risk',
        title: 'Risk Route: 3-Way In-Place Partitioning',
        description: 'Implement Dutch National Flag single-pass 3-way partition without extra memory.',
        difficulty: 'hard',
        movementReward: '+4 Tiles forward & +100 XP & +20 Coins',
        possiblePenalty: '-2 Tiles backward on failure',
        unlockRequirements: {
          minMastery: 55,
          requiredTopic: 'Arrays and strings',
          minEnergy: 3
        }
      }
    }
  },
  {
    tileNumber: 30,
    topicName: 'Stacks and queues',
    title: 'Nexus of Linear Structures',
    lore: 'A subterranean cavern where memory pointers twist. Choose your traversal strategy.',
    routes: {
      knowledge: {
        id: 'route-30-knowledge',
        type: 'knowledge',
        title: 'Knowledge Route: LIFO & FIFO Foundations',
        description: 'Consolidate push, pop, peek, and circular modulo ring buffer arithmetic.',
        difficulty: 'easy',
        movementReward: '+1 Tile on success',
        possiblePenalty: '0 Tiles penalty',
        unlockRequirements: {}
      },
      challenge: {
        id: 'route-30-challenge',
        type: 'challenge',
        title: 'Challenge Route: Balanced Expression Parsing',
        description: 'Parse nested parentheses, brackets, and arithmetic operators using stacks.',
        difficulty: 'medium',
        movementReward: '+3 Tiles forward & +50 XP',
        possiblePenalty: '-1 Tile backward on failure',
        unlockRequirements: {
          minMastery: 35,
          requiredTopic: 'Stacks and queues'
        }
      },
      risk: {
        id: 'route-30-risk',
        type: 'risk',
        title: 'Risk Route: Monotonic Queue Sliding Maximum',
        description: 'Maintain an amortized O(1) monotonic deque over a moving window.',
        difficulty: 'hard',
        movementReward: '+5 Tiles leap & +120 XP & +30 Coins',
        possiblePenalty: '-3 Tiles backward on failure',
        unlockRequirements: {
          minMastery: 60,
          requiredTopic: 'Stacks and queues',
          minEnergy: 4
        }
      }
    }
  },
  {
    tileNumber: 60,
    topicName: 'Searching and sorting',
    title: 'The Sorting Citadel Crossroads',
    lore: 'Towering heaps of records. How will you organize them?',
    routes: {
      knowledge: {
        id: 'route-60-knowledge',
        type: 'knowledge',
        title: 'Knowledge Route: Binary Search Boundaries',
        description: 'Consolidate lower bound and upper bound index predicates.',
        difficulty: 'easy',
        movementReward: '+1 Tile on success',
        possiblePenalty: '0 Tiles penalty',
        unlockRequirements: {}
      },
      challenge: {
        id: 'route-60-challenge',
        type: 'challenge',
        title: 'Challenge Route: Quicksort Hoare Partitioning',
        description: 'Analyze average O(N log N) pivot selection versus degenerate O(N²).',
        difficulty: 'medium',
        movementReward: '+3 Tiles forward & +60 XP',
        possiblePenalty: '-1 Tile backward on failure',
        unlockRequirements: {
          minMastery: 40,
          requiredTopic: 'Searching and sorting'
        }
      },
      risk: {
        id: 'route-60-risk',
        type: 'risk',
        title: 'Risk Route: Non-Comparison Radix Bucket Sort',
        description: 'Break comparison sort bounds and achieve linear O(N) sort time.',
        difficulty: 'hard',
        movementReward: '+5 Tiles leap & +150 XP & +40 Coins',
        possiblePenalty: '-3 Tiles backward on failure',
        unlockRequirements: {
          minMastery: 65,
          requiredTopic: 'Searching and sorting',
          minEnergy: 4
        }
      }
    }
  },
  {
    tileNumber: 75,
    topicName: 'Graphs',
    title: 'Gates of the Graph Labyrinth',
    lore: 'Dense graphs and directed cycles loom. Select your path through the adjacency matrix.',
    routes: {
      knowledge: {
        id: 'route-75-knowledge',
        type: 'knowledge',
        title: 'Knowledge Route: BFS & DFS Connectivity',
        description: 'Review visited tracking and connected components.',
        difficulty: 'easy',
        movementReward: '+1 Tile on success',
        possiblePenalty: '0 Tiles penalty',
        unlockRequirements: {}
      },
      challenge: {
        id: 'route-75-challenge',
        type: 'challenge',
        title: 'Challenge Route: Kahn\'s Topological Sort',
        description: 'Detect directed cycles and compute task ordering via in-degree queues.',
        difficulty: 'medium',
        movementReward: '+3 Tiles forward & +70 XP',
        possiblePenalty: '-1 Tile backward on failure',
        unlockRequirements: {
          minMastery: 45,
          requiredTopic: 'Graphs'
        }
      },
      risk: {
        id: 'route-75-risk',
        type: 'risk',
        title: 'Risk Route: Dijkstra with Min-Heap Optimization',
        description: 'Implement single-source shortest paths in O((V + E) log V).',
        difficulty: 'hard',
        movementReward: '+5 Tiles leap & +160 XP & +45 Coins',
        possiblePenalty: '-3 Tiles backward on failure',
        unlockRequirements: {
          minMastery: 70,
          requiredTopic: 'Graphs',
          minEnergy: 5
        }
      }
    }
  }
];

export const DECISION_TILE_MAP = new Map<number, DecisionTileConfig>();
DECISION_TILES.forEach(d => DECISION_TILE_MAP.set(d.tileNumber, d));

export function evaluateRouteAvailability(
  config: DecisionTileConfig,
  masteryMap: Record<string, TopicMasteryScore>,
  currentEnergy: number
): { knowledge: RouteOption; challenge: RouteOption; risk: RouteOption } {
  const topicMastery = masteryMap[config.topicName]?.score || 0;

  // Knowledge route is always unlocked
  const knowledge: RouteOption = {
    ...config.routes.knowledge,
    isUnlocked: true
  };

  // Challenge route requires minMastery
  const challengeReq = config.routes.challenge.unlockRequirements;
  const challengeUnlocked = topicMastery >= (challengeReq.minMastery || 0);
  const challenge: RouteOption = {
    ...config.routes.challenge,
    isUnlocked: challengeUnlocked,
    lockedReason: !challengeUnlocked 
      ? `Requires ${challengeReq.minMastery}% mastery in ${config.topicName} (Current: ${topicMastery}%).` 
      : undefined
  };

  // Risk route requires high mastery and minimum energy
  const riskReq = config.routes.risk.unlockRequirements;
  const masteryMet = topicMastery >= (riskReq.minMastery || 0);
  const energyMet = currentEnergy >= (riskReq.minEnergy || 0);
  const riskUnlocked = masteryMet && energyMet;

  let riskLockedReason = undefined;
  if (!riskUnlocked) {
    if (!masteryMet) {
      riskLockedReason = `Requires ${riskReq.minMastery}% mastery in ${config.topicName} (Current: ${topicMastery}%).`;
    } else {
      riskLockedReason = `Requires ${riskReq.minEnergy} Algorithm Energy (Current: ${currentEnergy}).`;
    }
  }

  const risk: RouteOption = {
    ...config.routes.risk,
    isUnlocked: riskUnlocked,
    lockedReason: riskLockedReason
  };

  return { knowledge, challenge, risk };
}
