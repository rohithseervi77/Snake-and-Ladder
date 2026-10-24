import { BoardMutationEvent } from '../types/evolution';
import { Challenge } from '../types/challenge';

export const BOARD_MUTATIONS: BoardMutationEvent[] = [
  {
    id: 'mutation-turn-5',
    type: 'memory_leak',
    title: 'Board Mutation: Memory Leak Detected!',
    description: 'A stray pointer is causing memory pressure across the grid! Diagnose the leak to open a memory compaction shortcut (+3 Tiles).',
    triggerTurn: 5,
    bonusReward: '+3 Tiles Shortcut & +40 XP & +2 Energy',
    penaltyRisk: '-1 Tile delay if unaddressed',
    bonusTiles: 3,
    penaltyTiles: -1,
    challenge: {
      id: 'mut-chal-5',
      squareId: 15,
      title: 'Memory Leak: Circular Reference Diagnosis',
      topic: 'Linked lists',
      subtopic: 'Dynamic Memory & Deallocation',
      skillCategory: 'debugging',
      difficulty: 'medium',
      type: 'find_bug',
      prompt: 'Two objects maintain circular references in memory without weak references, preventing garbage collection. How do you resolve the leak?',
      options: [
        'Break the reference cycle manually or use WeakMap / WeakRef references',
        'Allocate double the RAM on startup to compensate',
        'Restart the computer after every loop iteration',
        'Convert all integers to strings'
      ],
      correctOptionIndex: 0,
      hints: ['Reference counters cannot reach 0 if two objects hold mutual references.'],
      explanation: 'Breaking the circular link allows the garbage collector to reclaim unreachable cycles.',
      tags: ['memory-leak', 'debugging', 'mutation']
    }
  },
  {
    id: 'mutation-turn-10',
    type: 'optimization_window',
    title: 'Board Mutation: Optimization Window Opened!',
    description: 'A high-throughput algorithmic rift opened! Successfully optimize the data structure to accelerate forward (+4 Tiles).',
    triggerTurn: 10,
    bonusReward: '+4 Tiles Acceleration & +60 XP & +3 Energy',
    penaltyRisk: 'No penalty (window simply closes)',
    bonusTiles: 4,
    penaltyTiles: 0,
    challenge: {
      id: 'mut-chal-10',
      squareId: 30,
      title: 'Optimization Window: Sliding Window Extreme',
      topic: 'Stacks and queues',
      subtopic: 'Monotonic Deque Optimization',
      skillCategory: 'optimization',
      difficulty: 'hard',
      type: 'optimize_algorithm',
      prompt: 'A stream of size N requires maximum element over sliding window of size K. Baseline checks take O(N × K). How do you achieve O(N)?',
      options: [
        'Use a monotonic deque storing indices of elements in descending value order, achieving amortized O(1) per step',
        'Re-sort each window of size K using QuickSort in O(N K log K)',
        'Allocate an N × N matrix of precalculated maximums',
        'Use random sampling to estimate the maximum'
      ],
      correctOptionIndex: 0,
      hints: ['Elements that are older and smaller than the current element can never be the maximum.'],
      explanation: 'A monotonic double-ended queue discards inferior elements in amortized O(1), cutting runtime to O(N)!',
      tags: ['optimization', 'deque', 'mutation']
    }
  },
  {
    id: 'mutation-turn-15',
    type: 'complexity_storm',
    title: 'Board Mutation: Complexity Storm Approaching!',
    description: 'An asymptotic storm is destabilizing time bounds! Accurately identify the recurrence relation to withstand the storm (+2 Tiles), or slide back (-2 Tiles).',
    triggerTurn: 15,
    bonusReward: '+2 Tiles Stability & +50 XP',
    penaltyRisk: '-2 Tiles backward if miscalculated',
    bonusTiles: 2,
    penaltyTiles: -2,
    challenge: {
      id: 'mut-chal-15',
      squareId: 45,
      title: 'Complexity Storm: Master Theorem Recurrence',
      topic: 'Time and space complexity',
      subtopic: 'Divide & Conquer Recurrences',
      skillCategory: 'complexity',
      difficulty: 'medium',
      type: 'time_complexity',
      prompt: 'An algorithm splits input into 2 halves and takes O(N) linear time to merge: T(N) = 2T(N/2) + O(N). What is its exact asymptotic time complexity by Master Theorem?',
      options: [
        'O(N log N) because log_b(a) = log_2(2) = 1, matching f(N) = N¹ (Case 2)',
        'O(N²) because there are two branches multiplying quadratic work',
        'O(log N) because the problem size is halved each step',
        'O(2ⁿ) because of binary branching'
      ],
      correctOptionIndex: 0,
      hints: ['Compare a=2, b=2 with f(n) = n.'],
      explanation: 'Since log_2(2) = 1 and f(n) = Θ(n¹), Case 2 of Master Theorem applies: T(n) = Θ(n log n).',
      tags: ['complexity', 'master-theorem', 'mutation']
    }
  },
  {
    id: 'mutation-turn-20',
    type: 'graph_portal',
    title: 'Board Mutation: Graph Portal Activated!',
    description: 'A subterranean wormhole connecting distant regions was discovered! Solve the shortest path challenge to warp forward (+6 Tiles)!',
    triggerTurn: 20,
    bonusReward: '+6 Tiles Portal Warp & +80 XP & +3 Energy',
    penaltyRisk: '0 Tiles penalty (portal remains inactive)',
    bonusTiles: 6,
    penaltyTiles: 0,
    portalDestination: 68,
    challenge: {
      id: 'mut-chal-20',
      squareId: 60,
      title: 'Graph Portal: Dijkstra Priority Queue',
      topic: 'Graphs',
      subtopic: 'Single Source Shortest Path',
      skillCategory: 'implementation',
      difficulty: 'hard',
      type: 'select_data_structure',
      prompt: 'In Dijkstra\'s algorithm for sparse graphs (E ≈ V), which data structure yields the optimal O((V + E) log V) running time?',
      options: [
        'Binary Min-Heap / Priority Queue storing vertices ordered by tentative distance',
        'Unordered Array requiring O(V) scan on every extraction (O(V²))',
        'Singly Linked List with linear insertion',
        'Stack popping vertices in LIFO order'
      ],
      correctOptionIndex: 0,
      hints: ['Extract-min needs to be logarithmic, not linear.'],
      explanation: 'A min-heap extracts the closest unvisited vertex in O(log V) time, achieving optimal O((V + E) log V).',
      tags: ['graphs', 'dijkstra', 'portal', 'mutation']
    }
  }
];

export function getMutationForTurn(turnNumber: number): BoardMutationEvent | null {
  return BOARD_MUTATIONS.find(m => m.triggerTurn === turnNumber) || null;
}
