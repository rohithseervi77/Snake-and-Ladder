import { SnakeOrLadder } from '../types/game';

export const SNAKES_AND_LADDERS: SnakeOrLadder[] = [
  // LADDERS: Algorithmic Optimization Leaps (from lower to higher)
  {
    id: 'ladder-10-28',
    type: 'ladder',
    from: 10,
    to: 28,
    title: 'Modular Abstraction Leap',
    description: 'Refactored linear procedural checks into structured object state encapsulation.',
    pedagogicalReason: 'Encapsulating repetitive data checks avoids redundant traversal and state duplication.'
  },
  {
    id: 'ladder-36-46',
    type: 'ladder',
    from: 36,
    to: 46,
    title: 'Divide-and-Conquer Breakthrough',
    description: 'Transformed an O(N²) bubble sort into an O(N log N) recursive merge partition.',
    pedagogicalReason: 'Splitting problems into independent subproblems unlocks logarithmic scaling.'
  },
  {
    id: 'ladder-54-67',
    type: 'ladder',
    from: 54,
    to: 67,
    title: 'Optimal Substructure Acceleration',
    description: 'Promoted a heuristic greedy choice into verified memoized dynamic programming.',
    pedagogicalReason: 'Recognizing overlapping subproblems prevents redundant recursive recalculation.'
  },
  {
    id: 'ladder-71-88',
    type: 'ladder',
    from: 71,
    to: 88,
    title: 'State-Space Pruning Leap',
    description: 'Integrated alpha-beta minimax pruning to cut game-tree exponential explosion.',
    pedagogicalReason: 'Pruning provably inferior branches shrinks decision trees without losing optimality.'
  },
  {
    id: 'ladder-82-92',
    type: 'ladder',
    from: 82,
    to: 92,
    title: 'Near-Linear Connectivity Leap',
    description: 'Combined Union-Find with Path Compression for O(α(N)) Kruskal MST detection.',
    pedagogicalReason: 'Inverse Ackermann complexity enables lightning-fast cycle detection in graphs.'
  },

  // SNAKES: Debugging Traps & Edge-Case Failures (from higher to lower)
  {
    id: 'snake-14-7',
    type: 'snake',
    from: 14,
    to: 7,
    title: 'Variable Scope Shadowing Trap',
    description: 'Mutated an outer loop counter inside a nested helper function, halting execution.',
    pedagogicalReason: 'Accidental variable shadowing causes silent infinite loops in procedural code.'
  },
  {
    id: 'snake-19-11',
    type: 'snake',
    from: 19,
    to: 11,
    title: 'Bitwise Precedence Edge Case',
    description: 'Evaluated (x & 1 == 0) where == took precedence over &, causing parity bugs.',
    pedagogicalReason: 'Operator precedence pitfalls lead to corrupted conditional checks.'
  },
  {
    id: 'snake-50-42',
    type: 'snake',
    from: 50,
    to: 42,
    title: 'Off-By-One Boundary Crash',
    description: 'Accessed array[n] instead of array[n-1], throwing OutOfBounds in boundary tests.',
    pedagogicalReason: 'Off-by-one errors in loop boundaries fail on empty and maximum-sized inputs.'
  },
  {
    id: 'snake-63-57',
    type: 'snake',
    from: 63,
    to: 57,
    title: 'Severed Pointer Chain',
    description: 'Overwrote curr.next before saving nextNode, breaking linked list continuity.',
    pedagogicalReason: 'Node pointer manipulation requires temporary pointers to prevent memory orphan loss.'
  },
  {
    id: 'snake-96-85',
    type: 'snake',
    from: 96,
    to: 85,
    title: 'Recursion Depth Overflow',
    description: 'Encountered a degenerate skewed BST causing call stack overflow (depth 10⁵).',
    pedagogicalReason: 'Unbalanced trees degenerate into linked lists unless balanced via AVL/Red-Black rotations.'
  }
];

export const SNAKE_MAP = new Map<number, SnakeOrLadder>();
export const LADDER_MAP = new Map<number, SnakeOrLadder>();

SNAKES_AND_LADDERS.forEach(item => {
  if (item.type === 'snake') {
    SNAKE_MAP.set(item.from, item);
  } else {
    LADDER_MAP.set(item.from, item);
  }
});
