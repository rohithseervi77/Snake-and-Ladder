import { Challenge } from '../../types/challenge';

export const STAGE_81_90_CHALLENGES: Challenge[] = [
  {
    id: 'c-81-bitwise-xor-single-number',
    squareId: 81,
    title: 'Bitwise XOR: Single Number Invariant',
    topic: 'Bit Manipulation',
    subtopic: 'XOR Algebraic Properties',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'In an array where every element appears twice except for one unique element, XORing all elements together finds the unique element in O(N) time and O(1) space. What algebraic properties make this work?',
    options: [
      'Self-inverse (`x ^ x = 0`), Identity (`x ^ 0 = x`), and Commutative/Associative ordering',
      'XOR converts decimal integers into floating point IEEE 754 representations',
      'The CPU accumulator reverses the sign bit on duplicate elements',
      'XOR calculates the arithmetic mean of all odd-indexed numbers'
    ],
    correctOptionIndex: 0,
    hints: [
      'What is 5 ^ 5? 0.',
      'What is 0 ^ 9? 9.',
      'Because order does not matter ((a ^ a) ^ (b ^ b) ^ ... ^ x = 0 ^ 0 ^ ... ^ x = x).'
    ],
    explanation: 'XOR is commutative (`a ^ b = b ^ a`) and associative (`(a ^ b) ^ c = a ^ (b ^ c)`). Furthermore, `x ^ x = 0` (any number XORed with itself cancels out to 0) and `x ^ 0 = x`. Therefore, pairing duplicate numbers cancels them all to zero, leaving strictly the single non-duplicate element in O(N) time and O(1) space.',
    learningObjective: 'Leverage group-theoretic properties of bitwise XOR for linear-time O(1) memory algorithms.',
    commonMistake: 'Allocating a hash table or sorting array to find the single element, wasting O(N) space or O(N log N) time.',
    tags: ['bit-manipulation', 'xor', 'invariants']
  },
  {
    id: 'c-82-brian-kernighan-bits',
    squareId: 82,
    title: 'Brian Kernighan\'s Algorithm: Set Bit Invariant',
    topic: 'Bit Manipulation',
    subtopic: 'Bit Masking & Low Bit Elimination',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'Why does the bitwise expression `n & (n - 1)` clear the lowest (rightmost) set 1-bit of `n` in O(1) time?',
    options: [
      'Subtracting 1 flips the rightmost 1-bit to 0 and all trailing 0s to 1s; bitwise AND with original n zeroes out that bit and keeps higher bits unchanged',
      'It performs an arithmetic right shift by 1 position',
      'It multiplies n by -1 in two\'s complement',
      'Bitwise AND with n - 1 clears all odd bits in the integer'
    ],
    correctOptionIndex: 0,
    hints: [
      'Take n = 12 (binary 1100). What is n - 1? 11 (binary 1011).',
      'Now compute 1100 & 1011: 1000 (decimal 8).',
      'The rightmost 1-bit at position 2 was cleared, leaving the rest intact.'
    ],
    explanation: 'In binary, `n - 1` borrows from the least significant set bit, flipping that 1 to 0 and setting all subsequent lower zero bits to 1. Higher bits remain identical. Performing `n & (n - 1)` leaves higher bits untouched and annihilates the lowest set bit. Repeating this counts set bits in O(number of 1-bits) rather than O(32).',
    learningObjective: 'Master Brian Kernighan\'s lowest-set-bit cancellation technique for bit manipulation.',
    commonMistake: 'Iterating through all 32 or 64 bits with shifts when only set bits need processing.',
    tags: ['bit-manipulation', 'kernighan', 'optimization']
  },
  {
    id: 'c-83-power-of-two-invariant',
    squareId: 83,
    title: 'Power of Two: Single Bit Invariant',
    topic: 'Bit Manipulation',
    subtopic: 'Binary Representation Properties',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'Which single conditional expression correctly checks if integer `n` is a power of two in O(1) time?',
    options: [
      '`n > 0 && (n & (n - 1)) === 0`',
      '`n % 2 === 0`',
      '`(n | (n - 1)) === n`',
      '`Math.pow(2, Math.log2(n)) === 0`'
    ],
    correctOptionIndex: 0,
    hints: [
      'A power of two in binary has exactly ONE set bit: 1 (0001), 2 (0010), 4 (0100), 8 (1000).',
      'If it has only one set bit, clearing that bit using `n & (n - 1)` must produce 0.',
      'Remember to guard against n <= 0 (e.g. 0 is not a power of two).'
    ],
    explanation: 'A positive power of two has exactly one bit set to 1 in its binary representation. Clearing that single set bit via `n & (n - 1)` results in 0. Guarding with `n > 0` ensures non-positive numbers (like 0 and negative integers) are excluded.',
    learningObjective: 'Apply bitwise operations to evaluate integer algebraic properties in O(1) time.',
    commonMistake: 'Forgetting `n > 0`, which mistakenly identifies 0 as a power of two since `0 & -1 === 0`.',
    tags: ['bit-manipulation', 'math', 'invariants']
  },
  {
    id: 'c-84-two-single-numbers-bitmask',
    squareId: 84,
    title: 'Two Non-Repeating Numbers: Diff Bit Partition',
    topic: 'Bit Manipulation',
    subtopic: 'Two\'s Complement & Bitmask Partitioning',
    skillCategory: 'conceptual',
    difficulty: 'hard',
    type: 'conceptual_mcq',
    prompt: 'In an array where every number appears twice except TWO numbers (x and y), XORing all numbers produces `XOR_total = x ^ y`. How do we isolate a discriminating bit to partition the array into two groups?',
    options: [
      'Find any set bit in `XOR_total` via `diffBit = XOR_total & (-XOR_total)`; numbers with that bit set belong to group 1, and others to group 2',
      'Divide XOR_total by 2 and run binary search on both halves',
      'Invert XOR_total and multiply by the array length',
      'Cast XOR_total to a string and inspect the first character'
    ],
    correctOptionIndex: 0,
    hints: [
      'Since x !== y, XOR_total has at least one bit set to 1.',
      'A 1-bit in XOR_total means x and y differ at that exact bit position.',
      'Using `diff & (-diff)` extracts the lowest set bit in two\'s complement, allowing an unambiguous 2-group partition.'
    ],
    explanation: 'Because x !== y, `x ^ y !== 0`. Any set bit in `x ^ y` indicates that x and y differ at that bit position (one has 1, the other 0). `diff & (-diff)` isolates the lowest set bit. Partitioning all array elements into two groups based on whether this bit is set splits x and y into different buckets, while identical duplicates always fall into the same bucket and cancel out via XOR.',
    learningObjective: 'Use two\'s complement lowest-set-bit masking (`x & -x`) to partition datasets.',
    commonMistake: 'Assuming two unknown values cannot be disentangled after being merged with XOR.',
    tags: ['bit-manipulation', 'xor', 'partitioning']
  },
  {
    id: 'c-85-unique-paths-grid-dp',
    squareId: 85,
    title: 'Unique Paths on 2D Grid: Recurrence & Combinatorics',
    topic: 'Dynamic Programming',
    subtopic: '2D Grid DP & Pascal\'s Triangle',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'A robot starts at (0, 0) and can only move Down or Right to reach (M-1, N-1). What is the exact combinatorial formula for the total number of unique paths?',
    options: [
      'Combination `C((M - 1) + (N - 1), M - 1)` = `(M + N - 2)! / ((M - 1)! * (N - 1)!)`',
      '`(M * N) / 2`',
      '`2^(M + N)`',
      '`M^(N - 1)`'
    ],
    correctOptionIndex: 0,
    hints: [
      'How many total moves must the robot make? (M - 1) Down moves and (N - 1) Right moves.',
      'Total moves = (M - 1) + (N - 1) = M + N - 2.',
      'Out of these total moves, how many must be chosen as "Down"? Exactly M - 1.'
    ],
    explanation: 'Any valid route consists of exactly `(M - 1)` Down steps and `(N - 1)` Right steps in some sequence. The total number of steps is `(M + N - 2)`. Choosing which `M - 1` of these steps are Down steps is given by the combination formula `C(M+N-2, M-1)`. This can be computed in O(min(M, N)) time or via 2D DP in O(M * N).',
    learningObjective: 'Connect 2D grid DP transitions (`dp[i][j] = dp[i-1][j] + dp[i][j-1]`) with binomial coefficients.',
    commonMistake: 'Simulating paths with recursive DFS without memoization, leading to exponential O(2^(M+N)) blowup.',
    tags: ['dynamic-programming', 'combinatorics', 'grid-paths']
  },
  {
    id: 'c-86-min-path-sum-grid',
    squareId: 86,
    title: 'Minimum Path Sum: In-Place DP Invariant',
    topic: 'Dynamic Programming',
    subtopic: 'Grid Optimization & In-Place Updates',
    skillCategory: 'dry_run',
    difficulty: 'medium',
    type: 'code_trace',
    codeSnippet: `// Grid: [[1, 3], [1, 5]]
// Cell (0,0) = 1
// First row: grid[0][1] += grid[0][0] => 3 + 1 = 4
// First col: grid[1][0] += grid[0][0] => 1 + 1 = 2
// What is the value of grid[1][1] after grid[1][1] += min(grid[0][1], grid[1][0])?`,
    prompt: 'What is the minimum path sum to reach cell (1, 1)?',
    options: [
      '7 (via Path: 1 -> 1 -> 5)',
      '9 (via Path: 1 -> 3 -> 5)',
      '6',
      '8'
    ],
    correctOptionIndex: 0,
    hints: [
      'To reach (1, 1), you come from above (0, 1 with cost 4) or from left (1, 0 with cost 2).',
      'min(4, 2) is 2.',
      'Add current cell cost 5: 2 + 5 = 7.'
    ],
    explanation: 'To reach cell (1, 1), the robot enters from (0, 1) [cost 4] or (1, 0) [cost 2]. The minimum entry cost is `min(4, 2) = 2`. Adding cell (1, 1)\'s weight (5) yields `2 + 5 = 7`. Modifying the input grid directly achieves O(M * N) time with O(1) auxiliary space.',
    learningObjective: 'Trace in-place DP grid state transitions and cost minimization.',
    commonMistake: 'Taking path 1 -> 3 -> 5 = 9 instead of the cheaper 1 -> 1 -> 5 = 7.',
    tags: ['dynamic-programming', 'grid', 'dry-run']
  },
  {
    id: 'c-87-edit-distance-recurrence',
    squareId: 87,
    title: 'Edit Distance (Levenshtein): 3-Operation Recurrence',
    topic: 'Dynamic Programming',
    subtopic: 'String Distance Metrics',
    skillCategory: 'conceptual',
    difficulty: 'hard',
    type: 'conceptual_mcq',
    prompt: 'In Wagner-Fischer algorithm for Edit Distance between word1 and word2, what do the three terms `dp[i-1][j]`, `dp[i][j-1]`, and `dp[i-1][j-1]` represent when characters mismatch (`word1[i-1] !== word2[j-1]`)?',
    options: [
      'Delete from word1 (`dp[i-1][j] + 1`), Insert into word1 (`dp[i][j-1] + 1`), and Replace in word1 (`dp[i-1][j-1] + 1`)',
      'Reverse word1, Reverse word2, and Swap adjacent characters',
      'Uppercase word1, Lowercase word2, and Clear string buffer',
      'Left bit shift, Right bit shift, and Bitwise NOT'
    ],
    correctOptionIndex: 0,
    hints: [
      'Transition: `1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])`.',
      'i-1 with j represents removing a character from word1 (deletion).',
      'i with j-1 represents inserting a matching character into word1.',
      'i-1 with j-1 represents substituting the mismatching character.'
    ],
    explanation: 'When characters mismatch, we choose the cheapest of 3 edits: (1) `dp[i-1][j] + 1` (delete word1[i-1]); (2) `dp[i][j-1] + 1` (insert word2[j-1]); (3) `dp[i-1][j-1] + 1` (replace word1[i-1] with word2[j-1]). Taking the minimum over all three subproblems in an M x N table solves Levenshtein distance in O(M * N).',
    learningObjective: 'Master the formal operational mapping of 2D string editing dynamic programming.',
    commonMistake: 'Assuming insertion and deletion always cost different amounts without checking problem weights.',
    tags: ['dynamic-programming', 'edit-distance', 'strings']
  },
  {
    id: 'c-88-matrix-chain-multiplication',
    squareId: 88,
    title: 'Matrix Chain Multiplication: Interval DP',
    topic: 'Dynamic Programming',
    subtopic: 'Interval DP & Parenthesization',
    skillCategory: 'complexity',
    difficulty: 'hard',
    type: 'complexity_choice',
    prompt: 'Given matrices A1, A2, ..., An, why does the interval DP formulation for optimal parenthesization require O(N^3) time complexity?',
    options: [
      'There are O(N^2) intervals [i, j], and finding the optimal split point k between i and j takes O(N) comparisons: sum from len=2 to N of (N - len + 1) * len = O(N^3)',
      'Matrix multiplication itself is always an O(N^4) algorithm on floating point hardware',
      'Interval DP requires building a full 3D spatial tensor',
      'It computes all N! permutations of matrix multiplications'
    ],
    correctOptionIndex: 0,
    hints: [
      'State: `dp[i][j]` = minimum scalar multiplications to multiply matrices from index i to j.',
      'How many pairs of (i, j) exist? O(N^2) intervals.',
      'For each interval [i, j], split point k ranges from i to j-1 (up to O(N) choices). O(N^2) * O(N) = O(N^3).'
    ],
    explanation: 'Interval DP defines `dp[i][j] = min_{i <= k < j} (dp[i][k] + dp[k+1][j] + p_{i-1} * p_k * p_j)`. There are O(N^2) subproblems (intervals of length 2 to N). For each subproblem, testing all possible split positions k requires O(j - i) = O(N) work. Total time is Theta(N^3) with O(N^2) space.',
    learningObjective: 'Understand the subproblem structure and cubic complexity of interval DP.',
    commonMistake: 'Trying to solve matrix chain parenthesization with a greedy approach based on dimension sizes.',
    tags: ['dynamic-programming', 'interval-dp', 'complexity']
  },
  {
    id: 'c-89-bitmask-dp-tsp',
    squareId: 89,
    title: 'Bitmask Dynamic Programming: TSP Invariant',
    topic: 'Dynamic Programming',
    subtopic: 'State Compression & Traveling Salesperson',
    skillCategory: 'complexity',
    difficulty: 'hard',
    type: 'complexity_choice',
    prompt: 'In the Held-Karp algorithm for Traveling Salesperson Problem (TSP), state `dp[mask][u]` denotes the minimum cost to visit the set of cities encoded by bitmask `mask` ending at city `u`. What is the time complexity of this bitmask DP?',
    options: [
      'O(N^2 * 2^N) time, a monumental improvement over brute-force O(N!) factorial time',
      'O(N!) time and O(N^2) space',
      'O(2^N) time strictly with O(N) space',
      'O(N^3) polynomial time'
    ],
    correctOptionIndex: 0,
    hints: [
      'How many subsets of N cities exist? 2^N masks.',
      'How many ending cities u can each subset have? At most N.',
      'From state (mask, u), transitioning to next unvisited city v takes O(N) iterations. Thus: 2^N * N * N = O(N^2 * 2^N).'
    ],
    explanation: 'Held-Karp replaces O(N!) brute force with bitmask DP. There are 2^N masks and N possible last-visited cities, giving N * 2^N total states. From each state, trying to visit any unvisited city v requires N transitions, yielding O(N^2 * 2^N) total time. For N=20, 20! is ~2.4 x 10^18 (impossible), whereas 20^2 * 2^20 is ~4.1 x 10^8 operations (feasible).',
    learningObjective: 'Apply bitmask state compression to optimize exponential combinatorial search problems.',
    commonMistake: 'Assuming NP-hard problems cannot be significantly accelerated through dynamic programming.',
    tags: ['dynamic-programming', 'bitmask', 'tsp', 'complexity']
  },
  {
    id: 'c-90-burst-balloons-inverse-dp',
    squareId: 90,
    title: 'Burst Balloons: The Inverse Thinking Invariant',
    topic: 'Dynamic Programming',
    subtopic: 'Inverse Interval DP',
    skillCategory: 'conceptual',
    difficulty: 'hard',
    type: 'conceptual_mcq',
    prompt: 'In the Burst Balloons problem, why does defining the subproblem by choosing which balloon to burst FIRST fail, whereas choosing which balloon to burst LAST succeeds?',
    options: [
      'Bursting a balloon first creates dependencies across subproblems (left and right become adjacent and interact); choosing the LAST balloon k keeps the boundary balloons intact, isolating subproblems [i, k] and [k, j] independently',
      'Bursting the first balloon causes array index out of bounds errors in C++',
      'The last balloon always has a value equal to 1',
      'Interval DP can only be evaluated backwards from right to left'
    ],
    correctOptionIndex: 0,
    hints: [
      'If you burst balloon k first, balloon k-1 and k+1 become new neighbors. Now subproblem left depends on subproblem right!',
      'If balloon k is the LAST to burst in range (i, j), who are its neighbors when it bursts?',
      'Since all other balloons in (i, j) are already burst, its neighbors are guaranteed to be exactly the fixed boundaries i and j!'
    ],
    explanation: 'Reverse thinking invariant: If balloon k bursts first, the subproblems on either side are coupled because their elements become adjacent. But if balloon k is assumed to be the LAST to burst in interval (i, j), all other balloons in that range are already gone. Therefore, balloon k is guaranteed to be flanked by boundary balloons arr[i] and arr[j]. This decouples the subproblems into `dp[i][k] + dp[k][j] + arr[i]*arr[k]*arr[j]`.',
    learningObjective: 'Master inverse thinking in interval dynamic programming to decouple interacting subproblems.',
    commonMistake: 'Attempting to divide intervals based on the first action rather than the final isolating event.',
    tags: ['dynamic-programming', 'interval-dp', 'hard', 'boss-battle']
  }
];
