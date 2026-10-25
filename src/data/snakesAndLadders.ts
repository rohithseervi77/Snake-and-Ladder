import { SnakeOrLadder } from '../types/game';

export const SNAKES_AND_LADDERS: SnakeOrLadder[] = [
  // LADDERS: Algorithmic Optimization & Mastery Leaps (from lower to higher)
  {
    id: 'ladder-10-28',
    type: 'ladder',
    from: 10,
    to: 28,
    title: 'Recurrence Modeling Breakthrough',
    description: 'Mastered mathematical loop invariants and leapt straight into solving divide-and-conquer recurrences!',
    pedagogicalReason: 'Understanding how instructions grow per loop enables direct formulation of recurrence relations.'
  },
  {
    id: 'ladder-36-46',
    type: 'ladder',
    from: 36,
    to: 46,
    title: 'Master Theorem Acceleration',
    description: 'Applied Master Theorem Case 1 directly instead of expanding 10 levels of recurrence by hand!',
    pedagogicalReason: 'Master Theorem allows immediate O(n^(log_b a)) asymptotic classification without laborious tree summation.'
  },
  {
    id: 'ladder-54-67',
    type: 'ladder',
    from: 54,
    to: 67,
    title: 'Circular Buffer Wrap-Around Leap',
    description: 'Used modulo arithmetic (rear + 1) % size to eliminate fake overflow and advanced into pointer structures!',
    pedagogicalReason: 'Circular queues reclaim dequeued memory spaces in O(1) time, mirroring dynamic pointer flexibility.'
  },
  {
    id: 'ladder-72-88',
    type: 'ladder',
    from: 72,
    to: 88,
    title: 'Non-Comparison Sorting Leap',
    description: 'Bypassed the Omega(n log n) comparison barrier using Counting Sort O(n + k) and leapt to self-balancing trees!',
    pedagogicalReason: 'Integer indexing allows linear O(n) sorting when keys are bounded, inspiring hierarchical indexing.'
  },
  {
    id: 'ladder-82-92',
    type: 'ladder',
    from: 82,
    to: 92,
    title: 'Tree-to-Graph Generalization',
    description: 'Extended hierarchical tree traversals directly into generalized graph BFS exploration!',
    pedagogicalReason: 'Trees are simply connected acyclic graphs; Level-order tree traversal is BFS with a single root source.'
  },

  // SNAKES: Classic DSA Lab & Exam Traps (from higher to lower)
  {
    id: 'snake-18-8',
    type: 'snake',
    from: 18,
    to: 8,
    title: 'Growth Rate Confusion Trap',
    description: 'Mistakenly assumed polynomial n³ grows faster than exponential 2ⁿ for large n. Recalculate operation counts!',
    pedagogicalReason: 'Exponential functions 2ⁿ asymptotically outgrow any polynomial n^k as n approaches infinity.'
  },
  {
    id: 'snake-30-14',
    type: 'snake',
    from: 30,
    to: 14,
    title: 'Inductive Hypothesis Flaw',
    description: 'Failed to prove the exact constant in the substitution method induction step. Back to Big-O definitions!',
    pedagogicalReason: 'Substitution requires proving T(n) <= c*g(n) for the same constant c across both inductive step and base case.'
  },
  {
    id: 'snake-50-42',
    type: 'snake',
    from: 50,
    to: 42,
    title: 'Stack Underflow Crash',
    description: 'Popped from an empty stack without checking isEmpty() first! Re-examine stack guard conditions.',
    pedagogicalReason: 'Popping an empty stack leads to undefined behavior or negative top index underflow errors in array stacks.'
  },
  {
    id: 'snake-62-55',
    type: 'snake',
    from: 62,
    to: 55,
    title: 'Circular Queue Full Condition Error',
    description: 'Used rear == size - 1 instead of (rear + 1) % size == front, causing buffer corruption.',
    pedagogicalReason: 'In a circular queue, rear wraps around to index 0. The full condition must test (rear + 1) % size == front.'
  },
  {
    id: 'snake-70-61',
    type: 'snake',
    from: 70,
    to: 61,
    title: 'Severed Pointer Chain Bug',
    description: 'Overwrote curr.next before storing the reference to nextNode, orphaning the rest of the linked list!',
    pedagogicalReason: 'Linked list node insertions and deletions require temporary pointers to avoid garbage-collecting subsequent nodes.'
  },
  {
    id: 'snake-95-84',
    type: 'snake',
    from: 95,
    to: 84,
    title: 'Dijkstra Negative Edge Trap',
    description: 'Ran Dijkstra on a graph containing negative edge weights! Greedily visited vertices gave wrong shortest path.',
    pedagogicalReason: 'Dijkstra assumes visited nodes have final shortest paths. Negative edges invalidate this greedy invariant.'
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
