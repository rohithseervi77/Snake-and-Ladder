import { BossBattle } from '../types/evolution';

export const BOSS_BATTLES: BossBattle[] = [
  {
    id: 'boss-region-1',
    region: 1,
    regionName: 'Array Wilderness (Tiles 1–20)',
    tileNumber: 20,
    bossName: 'Array Wilderness Colossus',
    title: 'Regional Boss Battle: Array Invariant Mastery',
    lore: 'The Colossus guards the exit of the Array Wilderness. It demands proof of contiguous memory traversal, in-place pointer manipulation, and boundary defense.',
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Algorithm Paradigm Choice',
        question: 'To reverse an array of size N in-place with O(1) auxiliary space, which strategy is optimal?',
        options: [
          'Two pointers starting at opposite ends swapping elements while left < right',
          'Allocate a second array of size N and copy elements in reverse order',
          'Insert all elements into a binary search tree and read inorder',
          'Recursively push elements onto call stack without base case'
        ],
        correctIndex: 0,
        explanation: 'Two converging pointers execute N/2 swaps in strictly O(N) time and O(1) auxiliary space.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Loop Termination Invariant',
        question: 'What is the precise loop condition to prevent double-swapping and preserve the middle element?',
        options: [
          'while (left < right)',
          'while (left <= arr.length)',
          'while (right >= 0)',
          'while (left !== right)'
        ],
        correctIndex: 0,
        explanation: 'left < right terminates when pointers meet or cross, preventing accidental reversal reversal.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Edge Case Analysis',
        question: 'What occurs if the input array is empty (arr.length === 0) with two pointers left = 0 and right = arr.length - 1?',
        options: [
          'left = 0 and right = -1, condition (0 < -1) is immediately false so loop exits safely in O(1)',
          'The function throws an IndexOutOfBoundsException immediately',
          'The CPU hangs in an infinite loop',
          'The array is filled with null values'
        ],
        correctIndex: 0,
        explanation: 'Because 0 < -1 is false, the loop never enters, protecting against crashes.'
      }
    ],
    rewardXp: 150,
    rewardCoins: 40,
    rewardEnergy: 4,
    defeated: false
  },
  {
    id: 'boss-region-2',
    region: 2,
    regionName: 'Recursion Caverns (Tiles 21–40)',
    tileNumber: 40,
    bossName: 'Recursion Caverns Phantom',
    title: 'Regional Boss Battle: Call Stack & Base Case Defense',
    lore: 'A spectral entity haunting recursive call frames. It traps developers in infinite stack loops unless base cases and return unwinding are flawless.',
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Base Case Identification',
        question: 'In computing the N-th Fibonacci number recursively (fib(n) = fib(n-1) + fib(n-2)), what are the mandatory base cases?',
        options: [
          'if (n <= 0) return 0; if (n === 1) return 1;',
          'if (n === 100) return 100;',
          'No base cases are needed if tail call optimization is enabled',
          'if (n % 2 === 0) return 0;'
        ],
        correctIndex: 0,
        explanation: 'Base cases n <= 0 and n === 1 terminate the binary recursion tree.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Call Stack Space Complexity',
        question: 'Without memoization, what is the maximum call stack depth of fib(N)?',
        options: [
          'O(N) stack frames at maximum depth along the leftmost branch',
          'O(2ᴺ) stack frames simultaneously in memory',
          'O(1) constant stack frames',
          'O(N!) stack frames'
        ],
        correctIndex: 0,
        explanation: 'Although total operations are O(2ᴺ), the call stack only stores one branch at a time, taking O(N) maximum depth.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Optimization into Linear Time',
        question: 'How do you prevent the exponential O(2ᴺ) explosion of redundant recursive calls?',
        options: [
          'Memoize results in an array/map dp[n], or compute iteratively using 2 variables in O(N) time and O(1) space',
          'Increase the CPU clock frequency',
          'Use bubble sort between recursive calls',
          'Convert the recursive function into a while(true) loop'
        ],
        correctIndex: 0,
        explanation: 'Memoization caches subproblem results, eliminating redundant branches.'
      }
    ],
    rewardXp: 180,
    rewardCoins: 50,
    rewardEnergy: 4,
    defeated: false
  },
  {
    id: 'boss-region-3',
    region: 3,
    regionName: 'Sorting Citadel (Tiles 41–60)',
    tileNumber: 60,
    bossName: 'Sorting Citadel Gatekeeper',
    title: 'Regional Boss Battle: Divide & Conquer Sorting Mastery',
    lore: 'The ancient mechanical guardian of the Citadel. It challenges your knowledge of stability, in-place partitioning, and worst-case complexities.',
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Worst-Case Quicksort Degeneracy',
        question: 'Why does standard Quicksort with the first element as pivot degrade to O(N²) on already sorted arrays?',
        options: [
          'Each partition creates maximally unbalanced subproblems of size 0 and N - 1, producing N recursion levels',
          'Sorted arrays cannot be partitioned mathematically',
          'Comparison operators stop functioning on sorted inputs',
          'The call stack memory is automatically cleared'
        ],
        correctIndex: 0,
        explanation: 'Picking extreme pivots on sorted inputs produces unbalanced N-level recursion: N + (N-1) + ... + 1 = O(N²).'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Pivot Randomization Defense',
        question: 'How does randomized pivot selection guarantee expected O(N log N) performance?',
        options: [
          'It ensures any adversary cannot craft an input that consistently forces worst-case splits',
          'It converts Quicksort into Merge Sort internally',
          'Random numbers execute in negative clock cycles',
          'It eliminates recursive calls entirely'
        ],
        correctIndex: 0,
        explanation: 'Randomization yields an expected balanced split regardless of input ordering.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Stability Comparison',
        question: 'Why is Merge Sort stable while standard Quicksort is unstable?',
        options: [
          'Merge Sort preserves the relative order of duplicate elements when merging with (left[i] <= right[j]); Quicksort swaps over long distances',
          'Merge Sort uses floating point numbers',
          'Quicksort only works on integers',
          'Stability is not a property of comparison sorts'
        ],
        correctIndex: 0,
        explanation: 'Long-distance swaps in partition can move an equal element past another equal element.'
      }
    ],
    rewardXp: 200,
    rewardCoins: 60,
    rewardEnergy: 5,
    defeated: false
  },
  {
    id: 'boss-region-4',
    region: 4,
    regionName: 'Graph Labyrinth (Tiles 61–80)',
    tileNumber: 80,
    bossName: 'Graph Labyrinth Minotaur',
    title: 'Regional Boss Battle: Shortest Paths & Cycles',
    lore: 'The Minotaur commands the weighted paths of the labyrinth. Only true masters of Dijkstra, BFS, and cycle detection can escape.',
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Algorithm Selection',
        question: 'In a graph with non-negative edge weights, which algorithm computes the single-source shortest path to all vertices optimally?',
        options: [
          'Dijkstra\'s algorithm with min-heap in O((V + E) log V)',
          'Breadth-First Search (BFS), which only works for unweighted graphs',
          'Bellman-Ford in O(V × E)',
          'Floyd-Warshall in O(V³)'
        ],
        correctIndex: 0,
        explanation: 'Dijkstra with a priority queue is optimal for non-negative weighted graphs.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Visited Invariant and Negative Weights',
        question: 'Why does Dijkstra\'s algorithm fail when the graph contains negative edge weights?',
        options: [
          'Dijkstra assumes that once a vertex is finalized from the min-heap, its distance cannot be reduced further by longer paths',
          'Negative numbers cause integer overflow',
          'The priority queue cannot store negative numbers',
          'Compilers reject negative graph weights'
        ],
        correctIndex: 0,
        explanation: 'A negative edge visited later could reduce the distance of an already finalized node, violating Dijkstra\'s greedy choice.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Directed Cycle Detection',
        question: 'Which method detects cycles in a directed graph during DFS traversal?',
        options: [
          'Three-color DFS marking: detect a back-edge to a node currently in the call stack (GRAY node)',
          'Check if vertex count exceeds edge count',
          'Count odd degree vertices',
          'Check if the graph is bipartite'
        ],
        correctIndex: 0,
        explanation: 'Encountering an active ancestor (GRAY / in-progress) confirms a directed cycle.'
      }
    ],
    rewardXp: 220,
    rewardCoins: 70,
    rewardEnergy: 5,
    defeated: false
  },
  {
    id: 'boss-region-5',
    region: 5,
    regionName: 'DP Final Fortress (Tiles 81–100)',
    tileNumber: 100,
    bossName: 'Dynamic Programming Overlord',
    title: 'Grandmaster Boss Battle: 0/1 Knapsack & Optimal Substructure',
    lore: 'The final titan of Code & Ladders. Defeat the Overlord to complete your journey and achieve DSA Grandmaster graduation!',
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: State Representation & Recurrence',
        question: 'In the 0/1 Knapsack problem with weights w[i] and values v[i], what is the state transition for dp[i][c]?',
        options: [
          'dp[i][c] = max(dp[i-1][c], v[i] + dp[i-1][c - w[i]]) if c >= w[i] else dp[i-1][c]',
          'dp[i][c] = dp[i-1][c] + dp[i][c-1]',
          'dp[i][c] = v[i] * w[i]',
          'dp[i][c] = min(dp[i-1][c], dp[i-1][c - w[i]])'
        ],
        correctIndex: 0,
        explanation: 'At each item, we either exclude it or include it and take the maximum.'
      },
      {
        stepNumber: 2,
        title: 'Step 2: Space Optimization to 1D Array',
        question: 'When compressing 0/1 Knapsack into a 1D array dp[c], why MUST the capacity loop iterate backwards from C down to w[i]?',
        options: [
          'Iterating backwards prevents using the same item multiple times in the same step (which would solve Unbounded Knapsack instead)',
          'Iterating forwards is not allowed in JavaScript',
          'Backwards iteration speeds up memory caching on x86 processors',
          'Because capacity C is always a negative number'
        ],
        correctIndex: 0,
        explanation: 'Iterating backwards ensures dp[c - w[i]] refers to the previous row value, enforcing the 0/1 restriction.'
      },
      {
        stepNumber: 3,
        title: 'Step 3: Asymptotic Complexity Classification',
        question: 'What is the time complexity of 0/1 Knapsack with N items and capacity C?',
        options: [
          'O(N × C) pseudo-polynomial time, which is polynomial in numeric value of C but exponential in input bit-length',
          'O(N!) factorial time',
          'O(log N) logarithmic time',
          'Strict polynomial O(N²)'
        ],
        correctIndex: 0,
        explanation: 'Knapsack runs in O(N × C) pseudo-polynomial time, a classic weakly NP-complete problem.'
      }
    ],
    rewardXp: 300,
    rewardCoins: 100,
    rewardEnergy: 6,
    defeated: false
  }
];

export const BOSS_BATTLE_MAP = new Map<number, BossBattle>();
BOSS_BATTLES.forEach(b => BOSS_BATTLE_MAP.set(b.tileNumber, b));
