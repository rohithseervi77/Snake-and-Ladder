import { Challenge } from '../../types/challenge';

export const STAGE_91_100_CHALLENGES: Challenge[] = [
  {
    id: 'c-91-trie-prefix-tree',
    squareId: 91,
    title: 'Trie (Prefix Tree) Node Architecture',
    topic: 'Trees',
    subtopic: 'Prefix Trees & Retrieval',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'In a Trie (Prefix Tree) used for fast string lookup and autocomplete, what does each Trie node typically contain?',
    options: [
      'An array or map of child node references indexed by character, and a boolean flag `isEndOfWord` marking word termination',
      'The complete string value concatenated from the root to the current node',
      'A pointer to an operating system thread lock',
      'A hash value computed from the entire dictionary'
    ],
    correctOptionIndex: 0,
    hints: [
      'Do Trie nodes need to store the full word string at each node?',
      'No! The path from the root down to the node represents the prefix.',
      'Each node only needs pointers to children (`children: Map<char, TrieNode>`) and a flag indicating if that prefix is a complete word.'
    ],
    explanation: 'A Trie node represents a shared prefix. It contains links to its children (e.g. an array of size 26 or a Map) and a boolean `isEndOfWord`. Characters are implicitly defined by the edge transitions. Inserting and searching words of length L takes strictly O(L) time regardless of dictionary size.',
    learningObjective: 'Master Trie node memory structure and O(L) prefix querying.',
    commonMistake: 'Storing entire prefix strings inside every node, wasting substantial heap memory.',
    tags: ['trie', 'prefix-tree', 'strings', 'data-structures']
  },
  {
    id: 'c-92-lru-cache-design',
    squareId: 92,
    title: 'LRU Cache Design: Hash Map + Doubly Linked List',
    topic: 'Stacks & Queues',
    subtopic: 'System Design & Composite Data Structures',
    skillCategory: 'conceptual',
    difficulty: 'hard',
    type: 'conceptual_mcq',
    prompt: 'To achieve strictly O(1) time complexity for BOTH `get(key)` and `put(key, value)` in a Least Recently Used (LRU) Cache, which two data structures must be combined?',
    options: [
      'A Hash Map (for O(1) key-to-node lookups) and a Doubly Linked List (for O(1) node removal and insertion at head)',
      'A Binary Search Tree and a Min-Heap',
      'A Single Dynamic Array and a Stack',
      'A Trie and a Circular Queue'
    ],
    correctOptionIndex: 0,
    hints: [
      'Hash Map alone provides O(1) lookup, but cannot maintain usage ordering in O(1).',
      'Singly linked list cannot delete a node in O(1) because it lacks access to the predecessor node.',
      'A Doubly Linked List can unlink any node in O(1) given its direct pointer from the Hash Map.'
    ],
    explanation: 'An LRU cache pairs a Hash Map with a Doubly Linked List. The Map provides O(1) access to any node. The Doubly Linked List allows moving an accessed node to the most-recently-used front or evicting the least-recently-used tail node in O(1) time without traversal. Together, both get() and put() run in strictly O(1) time.',
    learningObjective: 'Combine Hash Maps and Doubly Linked Lists to build O(1) composite eviction systems.',
    commonMistake: 'Using a Singly Linked List, which requires O(N) traversal to locate the preceding node for deletion.',
    tags: ['lru-cache', 'system-design', 'hash-map', 'doubly-linked-list']
  },
  {
    id: 'c-93-sliding-window-max-deque',
    squareId: 93,
    title: 'Sliding Window Maximum: Monotonic Deque Invariant',
    topic: 'Stacks & Queues',
    subtopic: 'Monotonic Double-Ended Queue (Deque)',
    skillCategory: 'conceptual',
    difficulty: 'hard',
    type: 'conceptual_mcq',
    prompt: 'To find the maximum element in every sliding window of size K in O(N) total time, which invariant must the double-ended queue (deque) maintain?',
    options: [
      'Elements stored as indices in the deque must have strictly decreasing values from front to back; front of deque is always the current window maximum',
      'The deque must be sorted in strictly ascending order from front to back',
      'The deque must store exactly K elements at all times',
      'The deque must alternate between maximum and minimum values'
    ],
    correctOptionIndex: 0,
    hints: [
      'If an incoming element arr[i] is greater than an existing element arr[j] in the window (with j < i), can arr[j] ever be the maximum in any future window?',
      'No! arr[j] is smaller AND expires sooner. It can be safely popped from the back of the deque.',
      'This keeps the deque monotonically decreasing; the front always holds the maximum.'
    ],
    explanation: 'Monotonic Deque invariant: If an older element is smaller than the newly arrived element, it can never be the maximum in any future window because it is both smaller and expires earlier. Popping smaller elements from the back maintains a strictly decreasing sequence. The front always points to the maximum. Each index is pushed and popped at most once, yielding O(N) total time.',
    learningObjective: 'Apply monotonic double-ended queues for linear-time sliding window extrema.',
    commonMistake: 'Using a max-heap of size K, which takes O(N log K) time and requires lazy deletion.',
    tags: ['deque', 'monotonic-queue', 'sliding-window', 'optimization']
  },
  {
    id: 'c-94-segment-tree-invariants',
    squareId: 94,
    title: 'Segment Tree: Range Query & Point Update Invariants',
    topic: 'Trees',
    subtopic: 'Range Queries & Point Updates',
    skillCategory: 'complexity',
    difficulty: 'hard',
    type: 'complexity_choice',
    prompt: 'For an array of size N that undergoes frequent range sum queries `query(L, R)` and single-element modifications `update(idx, val)`, why is a Segment Tree optimal?',
    options: [
      'Both range queries and point updates run in strictly O(log N) time, avoiding the O(N) query time of prefix arrays with updates',
      'Segment trees run queries in O(1) time and updates in O(1) time',
      'Segment trees compress the array data using Huffman coding',
      'Segment trees run on GPUs without CPU intervention'
    ],
    correctOptionIndex: 0,
    hints: [
      'A plain array has O(1) update but O(N) range query.',
      'A prefix sum array has O(1) range query, but updating an element takes O(N) to recalculate prefixes.',
      'A Segment Tree balances both operations to O(log N).'
    ],
    explanation: 'A segment tree decomposes intervals into canonical binary intervals. A point update modifies one leaf and its ancestors up the tree (depth = log N), taking O(log N) time. A range query decomposes any arbitrary [L, R] into at most 2 * log N disjoint canonical segments, taking O(log N) time. This balances mutable range queries optimally.',
    learningObjective: 'Master logarithmic range query and point update tradeoffs in segment trees.',
    commonMistake: 'Attempting to use a static prefix sum array for high-frequency mutable point-update streams.',
    tags: ['segment-tree', 'range-queries', 'complexity']
  },
  {
    id: 'c-95-fenwick-tree-lowbit',
    squareId: 95,
    title: 'Fenwick Tree (Binary Indexed Tree): Lowbit Navigation',
    topic: 'Trees',
    subtopic: 'Binary Indexed Trees & Bitwise Navigation',
    skillCategory: 'conceptual',
    difficulty: 'hard',
    type: 'conceptual_mcq',
    prompt: 'In a 1-indexed Fenwick Tree (BIT), which bitwise expression calculates the length of the interval responsible for index `i`, used to traverse ancestors during prefix queries (`i -= lowbit(i)`) and updates (`i += lowbit(i)`)?',
    options: [
      '`i & (-i)` (the lowest set bit in two\'s complement)',
      '`i ^ (i - 1)`',
      '`i >> 1`',
      '`~i`'
    ],
    correctOptionIndex: 0,
    hints: [
      'In two\'s complement binary: -i = ~i + 1.',
      'Bitwise AND of i and -i isolates the rightmost 1-bit.',
      'For i = 12 (1100 in binary), 12 & -12 = 4 (0100).'
    ],
    explanation: 'The elegance of Peter Fenwick\'s Binary Indexed Tree lies in the lowest set bit `lowbit(i) = i & (-i)`. Each cell `tree[i]` stores the sum of `lowbit(i)` consecutive elements ending at i. To compute prefix sums, we subtract `lowbit(i)` to jump to predecessor ranges in O(log N). To update, we add `lowbit(i)` to propagate modifications to all containing intervals in O(log N).',
    learningObjective: 'Apply two\'s complement lowbit arithmetic for compact binary indexed trees.',
    commonMistake: 'Using 0-indexing for a Fenwick tree without offset, causing an infinite loop since `0 & -0 === 0`.',
    tags: ['fenwick-tree', 'bit', 'lowbit', 'data-structures']
  },
  {
    id: 'c-96-tarjan-bridges-lowlink',
    squareId: 96,
    title: 'Tarjan\'s Bridge-Finding Algorithm: Low-Link Invariant',
    topic: 'Graph Algorithms',
    subtopic: 'Articulation Points, Bridges & Low-Link Values',
    skillCategory: 'conceptual',
    difficulty: 'expert',
    type: 'conceptual_mcq',
    prompt: 'In Tarjan\'s linear-time bridge-finding algorithm, edge `(u, v)` (where v is a DFS child of u) is a BRIDGE (critical connection) if and only if which condition holds?',
    options: [
      '`low[v] > tin[u]` (the subtree rooted at v has NO back edge to u or any of u\'s ancestors)',
      '`low[v] < tin[u]`',
      '`tin[u] === tin[v]`',
      'The degree of vertex u is equal to 1'
    ],
    correctOptionIndex: 0,
    hints: [
      'tin[u] is the discovery time of vertex u.',
      'low[v] is the earliest discovery time reachable from v\'s subtree using at most one back edge.',
      'If low[v] > tin[u], can v reach any vertex above u without passing through edge (u, v)?'
    ],
    explanation: 'In Tarjan\'s bridge algorithm: `tin[u]` is u\'s discovery time, and `low[v]` is the smallest discovery time reachable from v\'s subtree via back edges. If `low[v] > tin[u]`, it means no node in v\'s subtree can bypass edge (u, v) to reach u or any ancestor of u. Removing edge (u, v) disconnects v\'s subtree, making (u, v) a critical bridge.',
    learningObjective: 'Master DFS tree back-edge classification and low-link invariants for connectivity analysis.',
    commonMistake: 'Using `>=` instead of `>` (low[v] >= tin[u] is the condition for Articulation Points, NOT Bridges).',
    tags: ['graphs', 'tarjan', 'bridges', 'advanced']
  },
  {
    id: 'c-97-trapping-rain-water',
    squareId: 97,
    title: 'Trapping Rain Water: Two-Pointer Elevation Invariant',
    topic: 'Arrays',
    subtopic: 'Two-Pointer Elevation Bounding',
    skillCategory: 'conceptual',
    difficulty: 'hard',
    type: 'conceptual_mcq',
    prompt: 'In the O(N) time, O(1) space Two-Pointer algorithm for Trapping Rain Water, why can we safely calculate trapped water at `left` whenever `leftMax <= rightMax` without knowing the exact heights of intermediate bars?',
    options: [
      'The volume of water trapped above a bar is strictly bounded by the SHORTER of its left and right boundaries; since `leftMax <= rightMax`, the right side is guaranteed to be tall enough to retain water up to `leftMax`',
      'Rain water always drains towards the left side of the screen',
      'The right pointer is always stationary until left finishes',
      'All intermediate bars are guaranteed to be zero height'
    ],
    correctOptionIndex: 0,
    hints: [
      'Water level at index i is `min(maxLeft, maxRight) - height[i]`.',
      'If leftMax <= rightMax, which is the limiting boundary? leftMax!',
      'Even if there is a bar in the middle taller than rightMax, the bottleneck for left is ALREADY determined by leftMax.'
    ],
    explanation: 'Water trapped at any column is governed by `min(maxLeft, maxRight) - height[i]`. When `leftMax <= rightMax`, `leftMax` is unequivocally the limiting factor for `left`, regardless of whether intermediate bars are taller or shorter. We can immediately accumulate `leftMax - height[left]` and advance `left++`. Symmetrically, if `rightMax < leftMax`, `right` is bounded by `rightMax`.',
    learningObjective: 'Prove two-pointer boundary sufficiency for container capacity invariants.',
    commonMistake: 'Thinking water calculation requires scanning both maximums in both directions in O(N) space.',
    tags: ['arrays', 'two-pointers', 'trapping-rain-water', 'invariants']
  },
  {
    id: 'c-98-median-two-sorted-arrays',
    squareId: 98,
    title: 'Median of Two Sorted Arrays: Logarithmic Binary Partition',
    topic: 'Searching & Sorting',
    subtopic: 'Dual Array Partitioning & Binary Search',
    skillCategory: 'complexity',
    difficulty: 'expert',
    type: 'complexity_choice',
    prompt: 'Why does the binary search partition approach for finding the median of two sorted arrays of sizes M and N achieve O(log(min(M, N))) time complexity?',
    options: [
      'By always binary searching on the SHORTER array (size <= min(M, N)), the partition index on the longer array is automatically determined in O(1) by `(M + N + 1) / 2 - partitionX`',
      'It merges both arrays in parallel using a GPU compute shader',
      'It drops half the elements from both arrays simultaneously',
      'The algorithm relies on precomputed hash tables of array medians'
    ],
    correctOptionIndex: 0,
    hints: [
      'If you partition the first array at index i, how many elements MUST be taken from the second array to form half of the total elements?',
      'Exactly `(M + N + 1)/2 - i`.',
      'By searching on the shorter array, the search space is bounded to [0, min(M, N)], guaranteeing O(log(min(M, N))) steps.'
    ],
    explanation: 'The combined median partitions the union into two equal halves. Partitioning array A at index i implies array B must be partitioned at `j = (M + N + 1)/2 - i`. Binary searching exclusively over the shorter array guarantees valid indices in both arrays and minimizes iterations to O(log(min(M, N))) with O(1) space.',
    learningObjective: 'Formulate dependent dual-variable binary search on partitioned continuous sets.',
    commonMistake: 'Merging both arrays in O(M + N) time, violating the strict logarithmic interview constraint.',
    tags: ['searching', 'binary-search', 'median', 'hard']
  },
  {
    id: 'c-99-kmp-failure-function',
    squareId: 99,
    title: 'Knuth-Morris-Pratt (KMP): Prefix Function Invariant',
    topic: 'Strings',
    subtopic: 'KMP String Matching & LPS Array',
    skillCategory: 'conceptual',
    difficulty: 'expert',
    type: 'conceptual_mcq',
    prompt: 'In the Knuth-Morris-Pratt (KMP) string matching algorithm, what does each entry `pi[i]` (or `lps[i]`) of the Longest Proper Prefix which is also Suffix array represent?',
    options: [
      'The length of the longest proper prefix of `pattern[0...i]` that is also a suffix of `pattern[0...i]`, enabling the pattern to shift without re-matching previous text characters',
      'The total number of unique vowels in the prefix up to index i',
      'The ASCII checksum of the first i characters',
      'The frequency of the most common character in the pattern'
    ],
    correctOptionIndex: 0,
    hints: [
      'If pattern "AABA" mismatches on character 4, what prefix can be salvaged?',
      '"A" is both a prefix and a suffix.',
      'KMP shifts the pattern pointer to `lps[j-1]` instead of backtracking the text pointer.'
    ],
    explanation: 'The KMP failure function `pi[i]` stores the length of the longest proper prefix that matches a suffix of the prefix ending at i. When a mismatch occurs at `pattern[j]`, the text pointer does NOT backtrack; instead, the pattern pointer jumps to `pi[j-1]`. This guarantees linear O(N + M) search time with zero text pointer reversal.',
    learningObjective: 'Understand the deterministic finite automaton principles behind KMP prefix failure functions.',
    commonMistake: 'Backtracking the text pointer upon a mismatch, which causes worst-case O(N * M) behavior.',
    tags: ['strings', 'kmp', 'pattern-matching', 'advanced']
  },
  {
    id: 'c-100-grand-titan-final-boss',
    squareId: 100,
    title: 'THE FINAL GATEWAY: THE GRAND ARCHITECT TITAN',
    topic: 'Graph Algorithms',
    subtopic: 'Capstone Algorithmic Synthesis & System Optimization',
    skillCategory: 'optimization',
    difficulty: 'expert',
    type: 'conceptual_mcq',
    prompt: 'You have ascended to Tile 100! To claim ultimate mastery over Data Structures and Algorithms, synthesize the four foundational paradigms: (1) Invariant Preservation, (2) Space-Time Duality, (3) Monotonic State Pruning, and (4) Cache Locality. Which of the following statements represents the absolute golden rule of professional algorithmic engineering?',
    options: [
      'The optimal solution is defined by identifying the invariant domain of the problem, pruning redundant state transitions before allocation, and aligning data structures with hardware memory hierarchies to achieve minimal asymptotic and constant-factor complexity',
      'Always use nested hash maps because memory lookup is instantaneously zero seconds on all hardware architectures',
      'Recursive algorithms without memoization are always superior because they utilize operating system hardware stacks directly',
      'Sorting an array before every query is the most robust strategy because CPU sorting algorithms are unconstrained by Big-O bounds'
    ],
    correctOptionIndex: 0,
    hints: [
      'Recall all the lessons across the 100 tiles: loop invariants, two pointers, prefix sums, tree balances, dynamic programming, and memory layouts.',
      'True mastery combines theoretical asymptotic optimality with practical hardware sympathetic design.',
      'Option 1 unites all four core engineering pillars.'
    ],
    explanation: 'Algorithmic Mastery: Theoretical Big-O complexity establishes asymptotic boundaries, but true software engineering excellence demands preserving state invariants, eliminating redundant state spaces via monotonicity and dynamic programming, and structuring memory to maximize CPU L1/L2 cache locality. You have conquered the 100 tiles of Code & Ladders!',
    learningObjective: 'Synthesize invariant design, algorithmic complexity, and hardware memory sympathy for production systems.',
    commonMistake: 'Treating algorithmic design as isolated trivia rather than an integrated engineering methodology.',
    tags: ['capstone', 'grand-boss', 'mastery', 'synthesis', 'victory']
  }
];
