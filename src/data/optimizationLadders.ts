import { OptimizationLadderChoice } from '../types/evolution';

export const OPTIMIZATION_LADDERS: OptimizationLadderChoice[] = [
  {
    id: 'ladder-10-28',
    from: 10,
    to: 28,
    title: 'Modular Abstraction & Two-Sum Optimization',
    originalProblem: 'Find two numbers in array that sum to Target T.',
    safeOption: {
      title: 'Safe Ladder: Hash Map Lookup',
      description: 'Standard O(N) single-pass complement lookup using a Hash Map.',
      destinationTile: 28,
      challengeId: 'c-10-opt',
      rewardDescription: 'Climb 18 tiles directly to Tile 28!'
    },
    expertOption: {
      title: 'Expert Ladder: Two-Pointer In-Place',
      description: 'Sort and solve with O(1) auxiliary space without extra map allocations.',
      destinationTile: 32,
      bonusTiles: 4,
      failurePenalty: 2,
      challengeId: 'c-10-opt-expert',
      rewardDescription: 'Super Climb 22 tiles to Tile 32!',
      penaltyDescription: 'Failure slides back 2 tiles to Tile 8.'
    }
  },
  {
    id: 'ladder-36-46',
    from: 36,
    to: 46,
    title: 'Divide-and-Conquer Sorting Optimization',
    originalProblem: 'Sort 1,000,000 records stably without O(N²) quadratic stagnation.',
    safeOption: {
      title: 'Safe Ladder: Merge Sort Invariants',
      description: 'Prove O(N log N) divide-and-conquer stability.',
      destinationTile: 46,
      challengeId: 'c-36-opt',
      rewardDescription: 'Climb 10 tiles directly to Tile 46!'
    },
    expertOption: {
      title: 'Expert Ladder: TimSort / Hybrid Analysis',
      description: 'Analyze cache-friendly run insertion combined with merge splits.',
      destinationTile: 52,
      bonusTiles: 6,
      failurePenalty: 3,
      challengeId: 'c-36-opt-expert',
      rewardDescription: 'Super Climb 16 tiles to Tile 52!',
      penaltyDescription: 'Failure slides back 3 tiles to Tile 33.'
    }
  },
  {
    id: 'ladder-54-67',
    from: 54,
    to: 67,
    title: 'Interval Scheduling & Optimal Substructure',
    originalProblem: 'Schedule maximum non-overlapping meeting requests.',
    safeOption: {
      title: 'Safe Ladder: Earliest Finish Greedy',
      description: 'Sort by end time and greedily select compatible intervals.',
      destinationTile: 67,
      challengeId: 'c-54-opt',
      rewardDescription: 'Climb 13 tiles directly to Tile 67!'
    },
    expertOption: {
      title: 'Expert Ladder: Weighted Interval DP + Binary Search',
      description: 'Solve weighted scheduling in O(N log N) using DP combined with binary search.',
      destinationTile: 72,
      bonusTiles: 5,
      failurePenalty: 3,
      challengeId: 'c-54-opt-expert',
      rewardDescription: 'Super Climb 18 tiles to Tile 72!',
      penaltyDescription: 'Failure slides back 3 tiles to Tile 51.'
    }
  },
  {
    id: 'ladder-71-88',
    from: 71,
    to: 88,
    title: 'Minimax Game Tree Search & Pruning',
    originalProblem: 'Evaluate zero-sum adversarial game tree of depth D and branching B.',
    safeOption: {
      title: 'Safe Ladder: Alpha-Beta Pruning',
      description: 'Maintain alpha/beta bounds to cut subtrees down to O(B^(D/2)).',
      destinationTile: 88,
      challengeId: 'c-71-opt',
      rewardDescription: 'Climb 17 tiles directly to Tile 88!'
    },
    expertOption: {
      title: 'Expert Ladder: Transposition Tables + Zobrist Hashing',
      description: 'Cache repeated game tree states using XOR bitwise transposition keys.',
      destinationTile: 94,
      bonusTiles: 6,
      failurePenalty: 4,
      challengeId: 'c-71-opt-expert',
      rewardDescription: 'Super Climb 23 tiles to Tile 94!',
      penaltyDescription: 'Failure slides back 4 tiles to Tile 67.'
    }
  },
  {
    id: 'ladder-82-92',
    from: 82,
    to: 92,
    title: 'Disjoint-Set Union / Near-Linear Connectivity',
    originalProblem: 'Maintain connected components and detect cycles in dynamic graphs.',
    safeOption: {
      title: 'Safe Ladder: Path Compression & Union-by-Rank',
      description: 'Achieve inverse Ackermann O(α(N)) amortized operations.',
      destinationTile: 92,
      challengeId: 'c-82-opt',
      rewardDescription: 'Climb 10 tiles directly to Tile 92!'
    },
    expertOption: {
      title: 'Expert Ladder: Offline Dynamic Connectivity / Rollback DSU',
      description: 'Support edge deletions with persistent stack state without path compression.',
      destinationTile: 97,
      bonusTiles: 5,
      failurePenalty: 4,
      challengeId: 'c-82-opt-expert',
      rewardDescription: 'Super Climb 15 tiles to Tile 97!',
      penaltyDescription: 'Failure slides back 4 tiles to Tile 78.'
    }
  }
];

export const OPTIMIZATION_LADDER_MAP = new Map<number, OptimizationLadderChoice>();
OPTIMIZATION_LADDERS.forEach(l => OPTIMIZATION_LADDER_MAP.set(l.from, l));
