import { Challenge } from '../../types/challenge';

export const STAGE_71_80_CHALLENGES: Challenge[] = [
  {
    id: 'c-71-greedy-vs-dp',
    squareId: 71,
    title: 'Greedy Choice Property vs Dynamic Programming',
    topic: 'Greedy Algorithms',
    subtopic: 'Greedy Choice Property & Counterexamples',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'For coin denominations `[1, 3, 4]`, making change for amount 6 using a greedy strategy (always taking largest coin <= remaining) yields `4 + 1 + 1 = 3 coins`. What is the true optimal solution, proving greedy fails?',
    options: [
      '2 coins: `3 + 3 = 6`',
      '4 coins: `1 + 1 + 1 + 1 + 1 + 1`',
      'Greedy never fails for integer coin change',
      '1 coin: `6`'
    ],
    correctOptionIndex: 0,
    hints: [
      'Can you reach 6 using only two 3-cent coins?',
      '3 + 3 = 6 (2 coins).',
      'The greedy choice of 4 traps the solver into taking two 1-cent coins (3 coins total).'
    ],
    explanation: 'The greedy choice property does NOT hold for arbitrary coin systems. Choosing 4 greedily leaves 2, which requires two 1s (total 3 coins). Dynamic programming considers all choices and finds `3 + 3 = 6` using only 2 coins. Canonical currency systems (US, Euro) are designed so greedy works, but arbitrary sets require DP.',
    learningObjective: 'Recognize when locally optimal greedy choices fail to produce a globally optimal solution.',
    commonMistake: 'Assuming the greedy coin change algorithm works on all denomination sets.',
    tags: ['greedy', 'dynamic-programming', 'counterexample']
  },
  {
    id: 'c-72-interval-scheduling',
    squareId: 72,
    title: 'Interval Scheduling: Earliest Finish Time Invariant',
    topic: 'Greedy Algorithms',
    subtopic: 'Interval Scheduling Maximization',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'To select the maximum number of mutually compatible intervals (non-overlapping meetings), how MUST the intervals be sorted?',
    options: [
      'By end time (finish time) in ascending order',
      'By start time in ascending order',
      'By total duration (shortest interval first)',
      'By number of overlapping conflicts'
    ],
    correctOptionIndex: 0,
    hints: [
      'Sorting by start time can pick a very long meeting that blocks many short ones.',
      'Sorting by duration can pick a short meeting that conflicts with two others.',
      'Finishing earliest leaves the maximum possible remaining time for future meetings.'
    ],
    explanation: 'Greedy invariant: Picking the interval that finishes earliest frees up the resource as early as possible for subsequent tasks. If we sort by end time, we always pick the first compatible interval. A standard "exchange argument" proves this greedy strategy is globally optimal.',
    learningObjective: 'Apply the Earliest Finish Time First greedy policy for interval scheduling.',
    commonMistake: 'Sorting intervals by start time or duration, both of which have trivial counterexamples.',
    tags: ['greedy', 'intervals', 'scheduling']
  },
  {
    id: 'c-73-jump-game-greedy',
    squareId: 73,
    title: 'Jump Game: Maximum Reachable Index Invariant',
    topic: 'Greedy Algorithms',
    subtopic: 'Greedy Reachability',
    skillCategory: 'dry_run',
    difficulty: 'medium',
    type: 'code_trace',
    codeSnippet: `function canJump(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
    if (maxReach >= nums.length - 1) return true;
  }
  return true;
}`,
    prompt: 'For `nums = [3, 2, 1, 0, 4]`, at what index `i` does the loop determine that the end cannot be reached?',
    options: [
      'At index `i = 4`, because `i > maxReach` (4 > 3), returning false',
      'At index `i = 3`, because nums[3] === 0',
      'At index `i = 0`, because maxReach is 3',
      'It returns true because 3 + 2 = 5 > 4'
    ],
    correctOptionIndex: 0,
    hints: [
      'Trace maxReach: i=0: max(0, 0+3) = 3; i=1: max(3, 1+2) = 3; i=2: max(3, 2+1) = 3; i=3: max(3, 3+0) = 3.',
      'Now what happens when loop reaches index 4?',
      'i = 4, but maxReach is 3. Since 4 > 3, index 4 cannot be reached!'
    ],
    explanation: 'At indices 0, 1, 2, and 3, maxReach never exceeds 3. When the loop advances to index 4, `i > maxReach` (4 > 3), meaning index 4 is completely unreachable. The function returns `false` in O(N) time and O(1) space without needing DP or BFS.',
    learningObjective: 'Maintain a running maximum reach boundary for linear-time reachability.',
    commonMistake: 'Thinking encountering a zero immediately returns false without checking if previous jumps jump past the zero.',
    tags: ['greedy', 'jump-game', 'dry-run']
  },
  {
    id: 'c-74-dp-memo-vs-tabulation',
    squareId: 74,
    title: 'Dynamic Programming: Memoization vs Tabulation',
    topic: 'Dynamic Programming',
    subtopic: 'Top-Down vs Bottom-Up Tradeoffs',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'What is the fundamental architectural difference between Top-Down DP (Memoization) and Bottom-Up DP (Tabulation)?',
    options: [
      'Top-Down starts at the target problem and recurses backwards caching needed states; Bottom-Up fills an array iteratively from base cases up to the target without recursion stack overhead',
      'Top-Down is strictly O(N) time while Bottom-Up is always O(N^2)',
      'Memoization can only be used on tree data structures',
      'Tabulation requires allocating memory on the GPU'
    ],
    correctOptionIndex: 0,
    hints: [
      'Top-down: `function f(n)` calls `f(n-1)` and `f(n-2)` and saves answers in a hash map or cache array.',
      'Bottom-up: `dp[0]=0, dp[1]=1; for (i=2...n) dp[i] = dp[i-1] + dp[i-2]`.',
      'Bottom-up eliminates call-stack recursion overhead and often enables space optimization.'
    ],
    explanation: 'Top-Down uses recursion + memoization, solving only required subproblems on-demand but paying call-stack overhead. Bottom-Up iteratively computes all subproblems from base cases upwards in topological order, avoiding stack frames and often allowing space compression (e.g. keeping only the last 2 variables).',
    learningObjective: 'Compare top-down memoization and bottom-up tabulation tradeoffs.',
    commonMistake: 'Using recursion without memoization, causing exponential O(2^N) time explosion.',
    tags: ['dynamic-programming', 'memoization', 'tabulation']
  },
  {
    id: 'c-75-climbing-stairs-space',
    squareId: 75,
    title: 'Climbing Stairs: O(1) Space State Compression',
    topic: 'Dynamic Programming',
    subtopic: 'State Space Optimization',
    skillCategory: 'optimization',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'In the Climbing Stairs problem (`dp[i] = dp[i-1] + dp[i-2]`), how can the space complexity be reduced from O(N) to O(1)?',
    options: [
      'Because each state only depends on the previous two states, we only need to maintain two variables (`prev1` and `prev2`) during the iteration',
      'By storing values in 16-bit integers instead of 64-bit floats',
      'By using a binary search tree to store the array',
      'By clearing the array on every even step'
    ],
    correctOptionIndex: 0,
    hints: [
      'Does dp[5] need dp[1] or dp[2]?',
      'No, dp[5] only needs dp[4] and dp[3].',
      'A sliding window of two variables `let a = 1, b = 2; let c = a + b; a = b; b = c;` takes O(1) space.'
    ],
    explanation: 'When computing transition `dp[i] = f(dp[i-1], dp[i-2])`, earlier historical states (`dp[0...i-3]`) are never referenced again. Keeping two variables (`prev2, prev1`) and updating them like Fibonacci reduces space from O(N) to strictly O(1) while maintaining O(N) time.',
    learningObjective: 'Apply space compression to dynamic programming recurrences with bounded state lookbacks.',
    commonMistake: 'Allocating full size-N arrays when only a fixed window of preceding states is required.',
    tags: ['dynamic-programming', 'space-optimization']
  },
  {
    id: 'c-76-coin-change-unbounded',
    squareId: 76,
    title: 'Coin Change: Minimum Coins Recurrence',
    topic: 'Dynamic Programming',
    subtopic: 'Unbounded Knapsack DP',
    skillCategory: 'dry_run',
    difficulty: 'medium',
    type: 'code_trace',
    codeSnippet: `// dp[a] = min coins to make amount a
// coins = [1, 2, 5], target = 4
// Initial dp: [0, Inf, Inf, Inf, Inf]
// After processing coin 1: dp = [0, 1, 2, 3, 4]
// After processing coin 2 for a = 2, 3, 4:
// What does dp[4] become?`,
    prompt: 'What is the value of `dp[4]` after considering coins `1` and `2`?',
    options: [
      '2 (via two 2-cent coins: 2 + 2 = 4)',
      '4 (via four 1-cent coins)',
      '3 (via 2 + 1 + 1)',
      '1'
    ],
    correctOptionIndex: 0,
    hints: [
      'With coin 1: dp[4] = 4 (1+1+1+1).',
      'With coin 2: dp[4] = min(dp[4], dp[4 - 2] + 1) = min(4, dp[2] + 1).',
      'dp[2] with coin 2 is min(2, dp[0] + 1) = 1. So dp[4] = min(4, 1 + 1) = 2.'
    ],
    explanation: 'For amount 4, `dp[4] = Math.min(dp[4], dp[4 - 2] + 1)`. Since `dp[2] = 1` (a single 2-coin), `dp[4] = 1 + 1 = 2` (two 2-coins). This beats the earlier 4 coins, updating `dp[4]` to 2.',
    learningObjective: 'Trace bottom-up 1D array updates in unbounded knapsack coin-change algorithms.',
    commonMistake: 'Initializing dp array with 0 instead of Infinity, which corrupts Math.min calculations.',
    tags: ['dynamic-programming', 'coin-change', 'dry-run']
  },
  {
    id: 'c-77-01-knapsack-reverse-loop',
    squareId: 77,
    title: '0/1 Knapsack: The Reverse Inner Loop Invariant',
    topic: 'Dynamic Programming',
    subtopic: '0/1 Knapsack & 1D Space Reduction',
    skillCategory: 'debugging',
    difficulty: 'hard',
    type: 'conceptual_mcq',
    prompt: 'When compressing 0/1 Knapsack DP from a 2D table `dp[i][w]` to a 1D array `dp[w]`, why MUST the weight loop run in REVERSE from `W` down to `weight[i]`?',
    options: [
      'Running backwards ensures `dp[w - weight[i]]` still contains values from the PREVIOUS item, preventing the current item from being used multiple times in the same step',
      'Reversing the loop reduces the CPU branch mispredictions',
      'It is required so negative item weights do not produce negative array indices',
      'Array indices in JavaScript are faster when decremented'
    ],
    correctOptionIndex: 0,
    hints: [
      'In 0/1 knapsack, each item can only be selected ONCE (0 or 1 time).',
      'If you iterate forward (w = weight to W), `dp[w]` uses `dp[w - weight]`, which was ALREADY updated with the current item in the same pass (this creates an unbounded knapsack!).',
      'Iterating backward reads pristine values from the previous item iteration.'
    ],
    explanation: 'In 0/1 knapsack, each item can be chosen at most once. Transition: `dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt] + val)`. In a 1D array, iterating backwards (`w = W down to wt`) ensures that when computing `dp[w]`, the value `dp[w - wt]` has NOT yet been updated for the current item and still holds `dp[i-1][w - wt]`. Forward iteration would simulate infinite copies (unbounded knapsack).',
    learningObjective: 'Master the reverse iteration invariant when reducing 2D DP tables to 1D arrays for 0/1 constraints.',
    commonMistake: 'Iterating forward in 0/1 Knapsack, accidentally converting it to an Unbounded Knapsack.',
    tags: ['dynamic-programming', 'knapsack', 'invariants']
  },
  {
    id: 'c-78-lcs-2d-recurrence',
    squareId: 78,
    title: 'Longest Common Subsequence (LCS) Recurrence',
    topic: 'Dynamic Programming',
    subtopic: 'String DP & Grid Alignment',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'For strings s1 and s2, what is the state transition for `dp[i][j]` (LCS of prefixes `s1[0...i-1]` and `s2[0...j-1]`) when characters match versus when they mismatch?',
    options: [
      'If s1[i-1] === s2[j-1]: `1 + dp[i-1][j-1]`; else: `Math.max(dp[i-1][j], dp[i][j-1])`',
      'If s1[i-1] === s2[j-1]: `dp[i-1][j-1] + dp[i][j]`; else: `0`',
      'Always `Math.max(dp[i-1][j-1], dp[i-1][j] + 1)`',
      'If s1[i-1] === s2[j-1]: `2 * dp[i-1][j-1]`; else: `-1`'
    ],
    correctOptionIndex: 0,
    hints: [
      'If the last characters match, both can be consumed together, extending the LCS by 1.',
      'If they mismatch, either s1\'s character is excluded or s2\'s character is excluded.',
      'Take the maximum between skipping s1\'s char (dp[i-1][j]) and skipping s2\'s char (dp[i][j-1]).'
    ],
    explanation: 'Matching characters extend the optimal alignment diagonally: `1 + dp[i-1][j-1]`. When characters differ, the optimal alignment cannot pair both simultaneously, so we take the best choice between dropping one character from s1 (`dp[i-1][j]`) or from s2 (`dp[i][j-1]`).',
    learningObjective: 'Formulate 2D grid DP transitions for sequence alignment problems.',
    commonMistake: 'Resetting dp to 0 on mismatch (which computes Longest Common Substring, NOT Subsequence).',
    tags: ['dynamic-programming', 'lcs', 'strings']
  },
  {
    id: 'c-79-lis-patience-sorting',
    squareId: 79,
    title: 'Longest Increasing Subsequence: O(N log N) via Binary Search',
    topic: 'Dynamic Programming',
    subtopic: 'Patience Sorting & Monotonic Tails',
    skillCategory: 'complexity',
    difficulty: 'hard',
    type: 'complexity_choice',
    prompt: 'While standard DP for Longest Increasing Subsequence (LIS) takes O(N^2) time, how does the Patience Sorting algorithm achieve O(N log N)?',
    options: [
      'It maintains an array `tails` of smallest tail values for increasing subsequences of various lengths, updated via binary search in O(log N) per element',
      'It sorts the input array in O(N log N) and returns the unique elements',
      'It builds a balanced AVL tree and deletes duplicate nodes in O(log N)',
      'It uses the Fast Fourier Transform on polynomial representation of the array'
    ],
    correctOptionIndex: 0,
    hints: [
      'Think about card game solitaire / patience sorting.',
      'The array `tails[len]` stores the smallest possible ending element of an increasing subsequence of length len.',
      'Because `tails` is strictly increasing, each incoming number finds its slot via binary search (lower_bound) in O(log N).'
    ],
    explanation: 'In patience sorting, `tails[i]` stores the smallest tail of all increasing subsequences of length `i+1`. For each number x in arr, binary search finds the first element in `tails` >= x and overwrites it (or appends x if x is greater than all tails). Running binary search across N elements takes O(N log N) total time.',
    learningObjective: 'Accelerate DP from O(N^2) to O(N log N) using monotonic tail arrays and binary search.',
    commonMistake: 'Assuming the `tails` array itself contains the actual elements of the LIS (it only stores the optimal tails; its length equals the LIS length).',
    tags: ['dynamic-programming', 'lis', 'binary-search', 'optimization']
  },
  {
    id: 'c-80-gateway-boss-partition-equal-sum',
    squareId: 80,
    title: 'GATEWAY BOSS: The Partition Parity Sentinel',
    topic: 'Dynamic Programming',
    subtopic: 'Subset Sum Reduction & Bitset Acceleration',
    skillCategory: 'optimization',
    difficulty: 'hard',
    type: 'bug_hunt',
    codeSnippet: `function canPartition(nums) {
  let sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2 !== 0) return false; // Odd sum can never partition equally
  let target = sum / 2;
  let dp = new Array(target + 1).fill(false);
  dp[0] = true; // Base case: sum 0 is always achievable
  
  for (let num of nums) {
    for (let j = target; j >= num; j--) {
      dp[j] = dp[j] || dp[j - num];
    }
  }
  return dp[target];
}`,
    prompt: 'Why is the mathematical precondition `sum % 2 !== 0 => return false` guaranteed to be correct for equal subset partitioning?',
    options: [
      'Partitioning into two subsets with equal integer sums S1 and S2 means Total Sum = 2 * S1, which is strictly even; an odd total sum cannot be divided into two equal integers',
      'Dynamic programming arrays cannot have odd lengths in JavaScript',
      'Odd sums cause floating point rounding errors in CPU registers',
      'An odd sum implies negative numbers are present in the array'
    ],
    correctOptionIndex: 0,
    hints: [
      'Let the sum of each partition be S.',
      'Total sum = S + S = 2S.',
      'Can 2S ever be an odd number if S is an integer?'
    ],
    explanation: 'Parity invariant: If an array can be split into two subsets of equal sum S, then totalSum = S + S = 2S. 2S is an even integer by definition. If totalSum is odd, no two integer sums can equal totalSum / 2. This O(N) parity check immediately prunes impossible instances before running any DP.',
    learningObjective: 'Apply mathematical invariant pruning to eliminate impossible subproblems before allocating DP state.',
    commonMistake: 'Running expensive O(N * Target) DP on instances where total sum is odd.',
    tags: ['dynamic-programming', 'subset-sum', 'invariants', 'boss-battle']
  }
];
