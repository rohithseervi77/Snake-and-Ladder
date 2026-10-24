import { Challenge } from '../../types/challenge';

export const STAGE_51_60_CHALLENGES: Challenge[] = [
  {
    id: 'c-51-heap-array-indexing',
    squareId: 51,
    title: 'Binary Heap Array Index Invariants',
    topic: 'Heaps & Priority Queues',
    subtopic: 'Array-Based Heap Representation',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'In a 0-indexed array representation of a complete binary heap, given a node at index `i`, what are the exact formulas for its parent and children?',
    options: [
      'Parent: `Math.floor((i - 1) / 2)`, Left child: `2*i + 1`, Right child: `2*i + 2`',
      'Parent: `i / 2`, Left child: `2*i`, Right child: `2*i + 1` (this is 1-indexed)',
      'Parent: `i - 1`, Left child: `i + 1`, Right child: `i + 2`',
      'Parent: `Math.floor(i / 2)`, Left child: `2*i + 2`, Right child: `2*i + 4`'
    ],
    correctOptionIndex: 0,
    hints: [
      'Root is at index 0. Its children are at indices 1 and 2.',
      'Check if 2*0 + 1 = 1 and 2*0 + 2 = 2.',
      'For node 1, parent is Math.floor((1 - 1)/2) = 0. For node 2, Math.floor((2 - 1)/2) = 0.'
    ],
    explanation: 'For a 0-indexed complete binary tree array: root is at 0. Children of node i are at `2*i + 1` and `2*i + 2`. The parent of any node i > 0 is at `Math.floor((i - 1) / 2)`. This allows pointerless tree navigation with pure arithmetic.',
    learningObjective: 'Master array index arithmetic for complete binary trees and binary heaps.',
    commonMistake: 'Using 1-indexed formulas (2*i and 2*i + 1) in 0-indexed programming languages.',
    tags: ['heaps', 'array-indexing', 'data-structures']
  },
  {
    id: 'c-52-min-heap-property',
    squareId: 52,
    title: 'Min-Heap Structural & Ordering Invariant',
    topic: 'Heaps & Priority Queues',
    subtopic: 'Heap Invariants',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'What invariant must EVERY node `i` satisfy in a valid Min-Heap?',
    options: [
      'The value of node `i` must be less than or equal to the values of both of its children: `arr[i] <= arr[2*i + 1]` and `arr[i] <= arr[2*i + 2]`',
      'The left child must always be strictly smaller than the right child',
      'All leaf nodes must be sorted in strictly ascending order',
      'The root node contains the maximum element in the collection'
    ],
    correctOptionIndex: 0,
    hints: [
      'Does a Min-Heap enforce any order between the left child and right child?',
      'No! There is no relationship required between sibling nodes.',
      'Only the parent must be <= both of its children.'
    ],
    explanation: 'In a Min-Heap, the parent key is less than or equal to the keys of its children. Unlike a Binary Search Tree, there is no ordering constraint between left and right siblings. As a result, the root node arr[0] is guaranteed to be the global minimum.',
    learningObjective: 'Differentiate between BST ordering invariants and Heap ordering invariants.',
    commonMistake: 'Assuming heaps enforce left-to-right sorting between sibling subtrees.',
    tags: ['heaps', 'invariants']
  },
  {
    id: 'c-53-build-heap-complexity',
    squareId: 53,
    title: 'Build-Heap Linear Time Complexity',
    topic: 'Heaps & Priority Queues',
    subtopic: 'Heapify & Floyd\'s Algorithm',
    skillCategory: 'complexity',
    difficulty: 'hard',
    type: 'complexity_choice',
    prompt: 'Building a binary heap from an unsorted array of size N using bottom-up `heapify` (sift-down from N/2 down to 0) takes O(N) time, NOT O(N log N). Why?',
    options: [
      'Most nodes are near the bottom of the tree where the sift-down height h is small; the summation of (N / 2^(h+1)) * O(h) converges to O(N)',
      'Heapify sorts the array in-place using quicksort first',
      'Nodes with two children are skipped during bottom-up heap construction',
      'Memory caching in modern CPUs eliminates log N comparisons'
    ],
    correctOptionIndex: 0,
    hints: [
      'Half of the nodes in a complete binary tree are leaves with height 0 (0 sift-down cost).',
      'A quarter have height 1, an eighth have height 2.',
      'Work = sum from h=1 to log N of (N / 2^{h+1}) * h = N * sum(h / 2^{h+1}) = O(N).'
    ],
    explanation: 'Floyd\'s build-heap algorithm operates bottom-up. Half the nodes (N/2) require 0 work, N/4 require 1 step, N/8 require 2 steps. The arithmetic-geometric series sum(h / 2^h) converges to a constant (<= 2). Multiplying by N proves the entire build takes strictly O(N) time.',
    learningObjective: 'Prove why bottom-up heapify runs in linear O(N) time using Taylor series convergence.',
    commonMistake: 'Assuming inserting N elements one-by-one into an empty heap (O(N log N)) is the only way to build a heap.',
    tags: ['heaps', 'heapify', 'complexity', 'math']
  },
  {
    id: 'c-54-top-k-elements-min-heap',
    squareId: 54,
    title: 'Top-K Frequent Elements: Min-Heap of Size K',
    topic: 'Heaps & Priority Queues',
    subtopic: 'Top-K / Order Statistics',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'To find the K LARGEST elements in a dynamic data stream of N numbers, why do we maintain a MIN-HEAP of size K rather than a Max-Heap?',
    options: [
      'The root of a Min-Heap of size K holds the smallest of the top-K elements; if an incoming number is larger, it replaces the root in O(log K) time',
      'A Max-Heap cannot store more than K elements in memory',
      'Min-Heaps use less RAM per node than Max-Heaps',
      'Max-Heaps do not support insertion operations'
    ],
    correctOptionIndex: 0,
    hints: [
      'What do we want to evict when the heap size exceeds K?',
      'We want to evict the smallest element among the current candidates.',
      'In a Min-Heap, the smallest element is at the root (arr[0]), accessible in O(1) and evictable in O(log K).'
    ],
    explanation: 'A Min-Heap of size K maintains the K largest elements seen so far. Its root is the K-th largest (the threshold). Any incoming number larger than the root replaces it and sifts down in O(log K). At the end of N items, the heap contains the top-K in O(N log K) time and O(K) space.',
    learningObjective: 'Select the optimal heap variant (Min vs Max) for bounded Top-K candidate filters.',
    commonMistake: 'Using a Max-Heap of size N (O(N log N)) to extract K elements instead of a Min-Heap of size K (O(N log K)).',
    tags: ['heaps', 'top-k', 'optimization']
  },
  {
    id: 'c-55-median-finder-two-heaps',
    squareId: 55,
    title: 'Continuous Median Finder: Two-Heap Invariant',
    topic: 'Heaps & Priority Queues',
    subtopic: 'Dual Heap Pattern',
    skillCategory: 'conceptual',
    difficulty: 'hard',
    type: 'conceptual_mcq',
    prompt: 'In the Two-Heap algorithm for continuous running median (`leftMaxHeap` for smaller half, `rightMinHeap` for larger half), what two invariants must be maintained after every insertion?',
    options: [
      '1. Every element in leftMaxHeap <= every element in rightMinHeap; 2. The sizes differ by at most 1: `Math.abs(left.size - right.size) <= 1`',
      '1. Both heaps must have identical sizes at all times; 2. All numbers must be positive integers',
      '1. leftMaxHeap must be empty before rightMinHeap is filled; 2. Elements must be inserted in sorted order',
      '1. The height of both heaps must equal log N; 2. Root values must sum to 0'
    ],
    correctOptionIndex: 0,
    hints: [
      'The median divides data into two halves: lower half and upper half.',
      'The maximum of the lower half (left.peek()) must not exceed the minimum of the upper half (right.peek()).',
      'The balance condition ensures the median is either one of the roots or the average of both.'
    ],
    explanation: 'Dual-heap median: `leftMaxHeap` stores the lower half, `rightMinHeap` stores the upper half. Invariant 1: `left.peek() <= right.peek()`. Invariant 2: `0 <= left.size - right.size <= 1`. This allows O(log N) insertion and O(1) median retrieval (`left.peek()` or `(left.peek() + right.peek()) / 2`).',
    learningObjective: 'Design multi-heap systems with strict partitioning and balance invariants.',
    commonMistake: 'Letting one heap grow substantially larger than the other, losing O(1) median access.',
    tags: ['heaps', 'median-finder', 'system-design']
  },
  {
    id: 'c-56-backtracking-anatomy',
    squareId: 56,
    title: 'The Backtracking Canonical Blueprint',
    topic: 'Backtracking',
    subtopic: 'State Exploration & Restoration',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'What are the three mandatory steps executed inside the recursive loop of any classical backtracking algorithm?',
    options: [
      '1. Make a Choice (mutate state), 2. Recurse (explore subtree), 3. Undo Choice / Backtrack (restore state)',
      '1. Sort the input, 2. Run binary search, 3. Print the output array',
      '1. Allocate memory, 2. Garbage collect, 3. Return false',
      '1. Push to stack, 2. Invert binary bits, 3. Catch stack overflow'
    ],
    correctOptionIndex: 0,
    hints: [
      'Backtracking explores a decision tree via depth-first search.',
      'When returning from a branch to explore a sibling branch, the state must look like the branch was never taken.',
      'This requires: Choose -> Recurse -> Unchoose.'
    ],
    explanation: 'Backtracking uses DFS on state-space trees: (1) Make choice: add candidate to path; (2) Recurse: search deeper branches; (3) Undo choice: remove candidate from path so the next sibling candidate can be evaluated from the clean parent state.',
    learningObjective: 'Master the Choose-Explore-Unchoose template for state restoration in search trees.',
    commonMistake: 'Modifying shared state without undoing the mutation, contaminating parallel search branches.',
    tags: ['backtracking', 'invariants', 'recursion']
  },
  {
    id: 'c-57-subsets-power-set',
    squareId: 57,
    title: 'Subsets & Power Set Decision Tree',
    topic: 'Backtracking',
    subtopic: 'Combinatorial Search',
    skillCategory: 'complexity',
    difficulty: 'medium',
    type: 'complexity_choice',
    prompt: 'For a set of N distinct elements, why does generating all subsets (the power set) require strictly O(N * 2^N) time complexity?',
    options: [
      'There are 2^N total subsets (each element is either included or excluded), and copying each subset takes up to O(N) time',
      'Each element must be compared against all N^2 permutations',
      'The call stack depth reaches 2^N simultaneous activation frames',
      'Backtracking requires O(N!) passes over the array'
    ],
    correctOptionIndex: 0,
    hints: [
      'How many subsets does a set with N elements have? (2 * 2 * ... * 2 = 2^N).',
      'When a subset is completed, we clone it into the result array: `result.push([...path])`.',
      'Cloning an array of length up to N takes O(N) operations.'
    ],
    explanation: 'Every element has 2 binary states: included or excluded. Thus, the decision tree has 2^N leaf nodes (subsets). At each leaf, copying the current path to the result takes up to O(N) time. The total time complexity is Theta(N * 2^N), with O(N) auxiliary stack space.',
    learningObjective: 'Analyze asymptotic complexity of combinatorial subset generation.',
    commonMistake: 'Forgetting the O(N) cost of deep copying/cloning the candidate path at each leaf.',
    tags: ['backtracking', 'subsets', 'complexity']
  },
  {
    id: 'c-58-permutations-backtracking',
    squareId: 58,
    title: 'Permutations: Visited Array Invariant',
    topic: 'Backtracking',
    subtopic: 'Permutations & State Pruning',
    skillCategory: 'dry_run',
    difficulty: 'medium',
    type: 'code_trace',
    codeSnippet: `function permute(nums) {
  let res = [], used = new Array(nums.length).fill(false);
  function backtrack(path) {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      backtrack(path);
      path.pop();
      used[i] = false; // RESTORE
    }
  }
  backtrack([]);
  return res;
}`,
    prompt: 'Given `nums = [1, 2, 3]`, what is the total number of times `res.push` is executed (i.e. number of unique permutations)?',
    options: [
      '6 (3! = 3 * 2 * 1)',
      '8 (2^3)',
      '9 (3^2)',
      '3'
    ],
    correctOptionIndex: 0,
    hints: [
      'First position has 3 choices, second has 2 choices, third has 1 choice.',
      '3! = 3 * 2 * 1 = 6.',
      'Each valid permutation path hits length 3 and pushes to res.'
    ],
    explanation: 'The number of permutations of N distinct items is N! (factorial). For N=3, 3! = 6 unique permutations: [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]. The backtracking algorithm visits each leaf exactly once.',
    learningObjective: 'Trace factorial state expansion and visited flag restoration in permutation generators.',
    commonMistake: 'Confusing subsets (2^N) with permutations (N!).',
    tags: ['backtracking', 'permutations', 'dry-run']
  },
  {
    id: 'c-59-nqueens-diagonal-formula',
    squareId: 59,
    title: 'N-Queens: O(1) Diagonal Conflict Formula',
    topic: 'Backtracking',
    subtopic: 'Constraint Satisfaction & Geometry',
    skillCategory: 'conceptual',
    difficulty: 'hard',
    type: 'conceptual_mcq',
    prompt: 'When placing a queen at board cell `(row, col)`, which mathematical expressions uniquely identify its major and minor diagonals for O(1) conflict lookup?',
    options: [
      'Major diagonal: `row - col` (constant along top-left to bottom-right); Minor diagonal: `row + col` (constant along top-right to bottom-left)',
      'Major diagonal: `row * col`; Minor diagonal: `row / col`',
      'Major diagonal: `row + 2*col`; Minor diagonal: `2*row + col`',
      'Major diagonal: `Math.abs(row)`; Minor diagonal: `Math.abs(col)`'
    ],
    correctOptionIndex: 0,
    hints: [
      'Along a main diagonal moving right and down, both row and col increase by 1, so row - col remains unchanged.',
      'Along an anti-diagonal moving left and down, row increases by 1 while col decreases by 1, so row + col remains unchanged.',
      'Storing these in Sets (`diag1.has(r - c)` and `diag2.has(r + c)`) gives O(1) conflict checks.'
    ],
    explanation: 'Lines with slope +1 have constant `r - c`. Lines with slope -1 have constant `r + c`. By maintaining two HashSets or boolean arrays for `(r - c)` and `(r + c)` alongside column sets, queen attack conflicts are tested in O(1) time instead of scanning board diagonals in O(N).',
    learningObjective: 'Model geometric constraints using invariant coordinate arithmetic for O(1) pruning.',
    commonMistake: 'Scanning all diagonal board cells in O(N) time at every step instead of using invariant coordinate hashes.',
    tags: ['backtracking', 'n-queens', 'geometry', 'optimization']
  },
  {
    id: 'c-60-gateway-boss-word-search',
    squareId: 60,
    title: 'GATEWAY BOSS: The Word Search Invariant',
    topic: 'Backtracking',
    subtopic: '2D Grid DFS & In-Place Board Masking',
    skillCategory: 'optimization',
    difficulty: 'hard',
    type: 'bug_hunt',
    codeSnippet: `function exist(board, word) {
  const R = board.length, C = board[0].length;
  function dfs(r, c, idx) {
    if (idx === word.length) return true;
    if (r < 0 || r >= R || c < 0 || c >= C || board[r][c] !== word[idx]) return false;
    
    let temp = board[r][c];
    board[r][c] = '#'; // Mark visited in-place
    
    let found = dfs(r+1, c, idx+1) || dfs(r-1, c, idx+1) ||
                dfs(r, c+1, idx+1) || dfs(r, c-1, idx+1);
                
    board[r][c] = temp; // RESTORE
    return found;
  }
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }
  return false;
}`,
    prompt: 'Why is modifying `board[r][c] = \'#\'` and restoring it with `board[r][c] = temp` superior to passing a `Set<string>` of visited coordinates?',
    options: [
      'It avoids allocating thousands of Set objects and string keys across recursive calls, achieving O(1) auxiliary space beyond recursion stack',
      'JavaScript Sets cannot store coordinates greater than 10',
      'Mutating the board makes the recursive calls run in parallel across CPU cores',
      'The \'#\' character prevents JavaScript garbage collection from firing'
    ],
    correctOptionIndex: 0,
    hints: [
      'Creating string keys like `"\${r},\${c}"` allocates memory on every step.',
      'Adding and removing from a Set has hashing overhead.',
      'Direct in-place array mutation is O(1) with zero heap allocation.'
    ],
    explanation: 'In grid backtracking, in-place character masking (`#`) uses the grid itself as the visited structure. Restoring `board[r][c] = temp` upon return ensures state integrity for subsequent searches. This eliminates string key creation and Set allocations, keeping auxiliary space bounded to O(L) recursion stack depth.',
    learningObjective: 'Utilize in-place memory masking to optimize grid traversal search overhead.',
    commonMistake: 'Allocating new Set or 2D boolean arrays on each search path, causing excessive GC pressure.',
    tags: ['backtracking', 'grid-search', 'in-place', 'boss-battle']
  }
];
