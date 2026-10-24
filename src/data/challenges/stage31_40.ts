import { Challenge } from '../../types/challenge';

export const STAGE_31_40_CHALLENGES: Challenge[] = [
  {
    id: 'c-31-binary-search-overflow',
    squareId: 31,
    title: 'Binary Search & Integer Overflow Prevention',
    topic: 'Searching & Sorting',
    subtopic: 'Binary Search Invariants',
    skillCategory: 'debugging',
    difficulty: 'easy',
    type: 'bug_hunt',
    codeSnippet: `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    // BUGGY MID CALCULATION:
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
    prompt: 'In statically typed languages like Java, C++, and Rust (with 32-bit signed integers), why can `(low + high) / 2` cause a catastrophic bug when searching large arrays?',
    options: [
      'If low + high exceeds 2^31 - 1, it overflows into a negative number, causing an ArrayIndexOutOfBoundsException',
      'Division by 2 is not supported on 64-bit architectures',
      'The expression always rounds up instead of down',
      'Memory paging forbids adding two pointers together directly'
    ],
    correctOptionIndex: 0,
    hints: [
      'What happens when two large positive 32-bit integers are added together?',
      'If low and high are around 1.5 billion, low + high = 3.0 billion, which exceeds 2^31 - 1 (~2.14 billion).',
      'Use `low + (high - low) / 2` or bitwise unsigned shift `(low + high) >>> 1` instead.'
    ],
    explanation: 'In 32-bit signed systems, if `low + high > 2,147,483,647`, the sum overflows to a negative integer. Dividing by 2 yields a negative index, crashing with an out-of-bounds error. The mathematically equivalent `low + Math.floor((high - low) / 2)` prevents overflow completely.',
    learningObjective: 'Master numeric boundary safety and arithmetic overflow prevention in search algorithms.',
    commonMistake: 'Using (low + high) / 2 in production code on large arrays.',
    tags: ['binary-search', 'overflow', 'debugging']
  },
  {
    id: 'c-32-binary-search-bounds',
    squareId: 32,
    title: 'Binary Search: Lower Bound (First Occurrence)',
    topic: 'Searching & Sorting',
    subtopic: 'Binary Search Boundary Conditions',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'When searching for the FIRST occurrence of a target in a sorted array with duplicates, what must you do when `arr[mid] === target`?',
    options: [
      'Record mid as a potential answer and narrow the search space to the left: `high = mid - 1`',
      'Return mid immediately as the optimal answer',
      'Narrow the search space to the right: `low = mid + 1`',
      'Restart the search from index 0 using linear search'
    ],
    correctOptionIndex: 0,
    hints: [
      'Could there be another matching element to the left of mid?',
      'Since the array is sorted, any earlier occurrences of target must lie in the range [low, mid - 1].',
      'So keep mid as an answer candidate, but pull high to mid - 1 to see if an earlier index exists.'
    ],
    explanation: 'Finding the lower bound requires continuing the search in the left subarray: `ans = mid; high = mid - 1;`. Returning mid immediately is only guaranteed to find an arbitrary occurrence, not necessarily the first.',
    learningObjective: 'Master left-boundary and right-boundary binary search variants for duplicate keys.',
    commonMistake: 'Returning mid immediately upon finding a match, missing duplicate elements that appear earlier in the array.',
    tags: ['binary-search', 'bounds', 'invariants']
  },
  {
    id: 'c-33-rotated-array-search',
    squareId: 33,
    title: 'Search in Rotated Sorted Array',
    topic: 'Searching & Sorting',
    subtopic: 'Modified Binary Search',
    skillCategory: 'dry_run',
    difficulty: 'medium',
    type: 'code_trace',
    codeSnippet: `const nums = [4, 5, 6, 7, 0, 1, 2];
// Target = 0. low = 0 (val 4), high = 6 (val 2).
// mid = 3 (nums[mid] = 7).
// Which half of the array is strictly sorted?`,
    prompt: 'At `mid = 3` (value 7), is the left half `[0...3]` or the right half `[3...6]` strictly sorted, and where does target 0 lie?',
    options: [
      'Left half [4, 5, 6, 7] is sorted because nums[low] <= nums[mid]; target 0 does NOT lie in [4, 7], so search right: low = mid + 1',
      'Right half is sorted; target 0 lies in the left half, so search left: high = mid - 1',
      'Neither half is sorted because 7 is the global maximum',
      'Both halves are sorted independently in descending order'
    ],
    correctOptionIndex: 0,
    hints: [
      'Compare nums[low] (4) with nums[mid] (7). Since 4 <= 7, the left half has no rotation point and is fully sorted.',
      'Check if target (0) falls between 4 and 7.',
      '0 is not in [4, 7], so target must reside in the right half.'
    ],
    explanation: 'In a rotated sorted array, splitting at any mid leaves at least one half strictly sorted. Since nums[low] <= nums[mid] (4 <= 7), the left half is sorted. Because target 0 is not in range [4, 7], we eliminate the left half and set `low = mid + 1`. This preserves the O(log N) runtime.',
    learningObjective: 'Decompose rotated arrays into sorted halves to maintain logarithmic search time.',
    commonMistake: 'Assuming the entire array must be unrotated before performing binary search.',
    tags: ['searching', 'binary-search', 'rotated-array']
  },
  {
    id: 'c-34-integer-sqrt',
    squareId: 34,
    title: 'Integer Square Root via Monotonic Search',
    topic: 'Searching & Sorting',
    subtopic: 'Binary Search on Answer Space',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'Why can the integer square root of x (`floor(sqrt(x))`) be computed using binary search in O(log x) time?',
    options: [
      'The function f(k) = k * k is strictly monotonically increasing for non-negative integers',
      'Newton\'s method requires factorizing x into prime numbers first',
      'The binary digits of sqrt(x) are identical to x shifted by 1 bit',
      'Only prime numbers have real square roots'
    ],
    correctOptionIndex: 0,
    hints: [
      'Binary search applies to any monotonic decision predicate f(k).',
      'As k increases (0, 1, 2, ...), does k^2 strictly increase?',
      'Yes, monotonicity allows discarding half the search range on every comparison.'
    ],
    explanation: 'Any problem where a condition f(k) changes monotonically from true to false (or false to true) can be solved via binary search on the answer space. Because k * k increases monotonically with k, we can search in [0, x] in O(log x) steps.',
    learningObjective: 'Generalize binary search beyond arrays to monotonic function spaces (Binary Search on Answer).',
    commonMistake: 'Restricting binary search solely to pre-existing indexed arrays.',
    tags: ['binary-search', 'math', 'monotonicity']
  },
  {
    id: 'c-35-mergesort-recurrence',
    squareId: 35,
    title: 'MergeSort Recurrence & Master Theorem',
    topic: 'Searching & Sorting',
    subtopic: 'Divide & Conquer Recurrence Relations',
    skillCategory: 'complexity',
    difficulty: 'medium',
    type: 'complexity_choice',
    prompt: 'MergeSort divides an array of size N into two equal halves, sorts each, and merges them in linear time: T(N) = 2T(N/2) + O(N). What is its exact time complexity according to the Master Theorem?',
    options: [
      'Theta(N log N) in best, average, and worst cases',
      'Theta(N^2) in the worst case when the array is reversed',
      'Theta(N) best case when the array is already sorted',
      'Theta(log N) auxiliary time'
    ],
    correctOptionIndex: 0,
    hints: [
      'In Master Theorem: a = 2, b = 2, f(N) = N.',
      'log_b(a) = log_2(2) = 1. Compare N^1 with f(N) = N^1.',
      'Since f(N) = Theta(N^{log_b(a)}), Case 2 of Master Theorem applies: T(N) = Theta(N^{log_b(a)} * log N) = Theta(N log N).'
    ],
    explanation: 'By Case 2 of the Master Theorem, when f(N) = Theta(N^{log_b(a)}) = Theta(N^1), the recurrence solves to Theta(N log N). MergeSort unconditionally divides and merges across log N levels, maintaining Theta(N log N) performance regardless of initial array ordering.',
    learningObjective: 'Apply the Master Theorem to divide-and-conquer recurrence relations.',
    commonMistake: 'Believing standard MergeSort has an O(N) best case like Insertion Sort without an early-exit check.',
    tags: ['sorting', 'mergesort', 'complexity', 'master-theorem']
  },
  {
    id: 'c-36-quicksort-partition-invariant',
    squareId: 36,
    title: 'QuickSort: Lomuto Partition Invariant',
    topic: 'Searching & Sorting',
    subtopic: 'Partitioning Schemes',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'In Lomuto\'s partition scheme using pivot = arr[high], what invariant does the pointer `i` maintain throughout the loop `for j = low to high - 1`?',
    options: [
      'All elements in `arr[low...i]` are strictly <= pivot, and all elements in `arr[i+1...j-1]` are > pivot',
      'The array is completely sorted up to index i',
      'Pointer i always points to the median of the array',
      'All elements to the right of j are already placed in their final positions'
    ],
    correctOptionIndex: 0,
    hints: [
      'Pointer j scans forward through the array.',
      'When arr[j] <= pivot, i increments and arr[i] swaps with arr[j].',
      'This guarantees everything up to index i is <= pivot, and everything between i+1 and j-1 is > pivot.'
    ],
    explanation: 'Lomuto maintains the invariant: `arr[low...i] <= pivot` and `arr[i+1...j-1] > pivot`. When loop finishes, swapping `arr[i+1]` with `arr[high]` places the pivot into its final sorted position in O(N) time and O(1) space.',
    learningObjective: 'Understand partitioning loop invariants in QuickSort.',
    commonMistake: 'Confusing Lomuto partition (1 directional pointer) with Hoare partition (2 bidirectional pointers).',
    tags: ['sorting', 'quicksort', 'invariants']
  },
  {
    id: 'c-37-quicksort-worst-case',
    squareId: 37,
    title: 'QuickSort Worst-Case Degeneration & Mitigation',
    topic: 'Searching & Sorting',
    subtopic: 'Pivot Selection Strategies',
    skillCategory: 'debugging',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'Deterministic QuickSort that always chooses the first or last element as pivot degrades to O(N^2) time on already-sorted arrays. What standard technique prevents this in production?',
    options: [
      'Randomized pivot selection or Median-of-Three pivot selection',
      'Switching to Bubble Sort when N > 1000',
      'Allocating a hash table to count duplicate pivot elements',
      'Reversing the entire array before each partition step'
    ],
    correctOptionIndex: 0,
    hints: [
      'The worst case occurs when the chosen pivot is always the extreme minimum or maximum element.',
      'Selecting a random index or taking the median of (arr[low], arr[mid], arr[high]) avoids this.',
      'This guarantees balanced partitioning with overwhelming probability.'
    ],
    explanation: 'Degradation to O(N^2) happens when partitions are severely unbalanced (size 0 and size N-1). Choosing a pivot uniformly at random or using Median-of-Three breaks malicious or pre-sorted input patterns, ensuring expected O(N log N) time and O(log N) stack depth.',
    learningObjective: 'Identify worst-case algorithmic vulnerabilities and apply randomization / median heuristics.',
    commonMistake: 'Assuming QuickSort is always O(N log N) without accounting for pivot selection vulnerabilities.',
    tags: ['sorting', 'quicksort', 'optimization']
  },
  {
    id: 'c-38-counting-sort-stability',
    squareId: 38,
    title: 'Counting Sort & Stable Prefix Accumulation',
    topic: 'Searching & Sorting',
    subtopic: 'Non-Comparison Sorting & Stability',
    skillCategory: 'dry_run',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'In Counting Sort, why do we transform the count frequency array into a running prefix sum before placing elements into the output array?',
    options: [
      'The prefix sum directly provides the exact 0-indexed destination positions for elements, preserving stability when iterating backwards',
      'Prefix sums reduce the space complexity of the algorithm from O(K) to O(1)',
      'It allows counting negative numbers without offset shifts',
      'It converts the time complexity from O(N + K) to O(N log K)'
    ],
    correctOptionIndex: 0,
    hints: [
      'If there are 3 items <= 5, where should the last item with value 5 be placed?',
      'At index 3 - 1 = 2.',
      'Iterating backwards through the input array and decrementing the prefix count places equal items in their original relative order.'
    ],
    explanation: 'The running prefix sum of counts indicates how many items are less than or equal to each key. By iterating through the input array backwards and using `output[--count[val]] = val`, duplicate values preserve their relative input order, making Counting Sort stable.',
    learningObjective: 'Master stable non-comparison sorting via prefix count indexing.',
    commonMistake: 'Overwriting the original array directly from raw frequency counts, which destroys sort stability.',
    tags: ['sorting', 'counting-sort', 'stability']
  },
  {
    id: 'c-39-radix-sort-mechanics',
    squareId: 39,
    title: 'Radix Sort: LSD vs MSD and Stability Invariant',
    topic: 'Searching & Sorting',
    subtopic: 'Radix Sort',
    skillCategory: 'conceptual',
    difficulty: 'hard',
    type: 'conceptual_mcq',
    prompt: 'Why MUST the underlying subroutine in Least Significant Digit (LSD) Radix Sort be strictly STABLE?',
    options: [
      'If the subroutine is not stable, sorting by a higher digit destroys the already-sorted relative ordering of lower digits',
      'Unstable subroutines cause integer bit shifts to overflow 32-bit registers',
      'Radix sort cannot process numbers with unequal digit lengths unless stable',
      'Non-stable sorting increases the number of passes from D to D^2'
    ],
    correctOptionIndex: 0,
    hints: [
      'In LSD, numbers are sorted by units digit first, then tens digit, then hundreds digit.',
      'Suppose we have 25 and 23. After units sort: 23, 25. Now we sort by tens digit (both are 2).',
      'If the tens-digit sort is unstable and flips them to 25, 23, the final order is incorrect!'
    ],
    explanation: 'LSD Radix Sort relies on previous digit passes remaining intact for ties. When sorting by digit k, elements with identical k-th digits must preserve their relative order established by digits 0 through k-1. If an unstable sort is used, earlier work is scrambled.',
    learningObjective: 'Understand the mathematical necessity of stability in multi-pass radix sorting.',
    commonMistake: 'Using an unstable partition (like QuickSort) as the inner subroutine of LSD Radix Sort.',
    tags: ['sorting', 'radix-sort', 'stability']
  },
  {
    id: 'c-40-gateway-boss-quickselect',
    squareId: 40,
    title: 'GATEWAY BOSS: The Quickselect Invariant',
    topic: 'Searching & Sorting',
    subtopic: 'Selection Algorithms & Amortized Master Theorem',
    skillCategory: 'optimization',
    difficulty: 'hard',
    type: 'code_trace',
    codeSnippet: `// Quickselect: Find k-th smallest element in unsorted array
function quickselect(arr, left, right, k) {
  if (left === right) return arr[left];
  let pIndex = partition(arr, left, right);
  if (k === pIndex) return arr[k];
  else if (k < pIndex) return quickselect(arr, left, pIndex - 1, k);
  else return quickselect(arr, pIndex + 1, right, k);
}`,
    prompt: 'Why does Quickselect achieve O(N) average time complexity, while QuickSort requires O(N log N)?',
    options: [
      'Quickselect only recurses into the ONE partition containing index k, leading to recurrence T(N) = T(N/2) + O(N) = O(N)',
      'Quickselect sorts both halves in parallel using multi-threaded web workers',
      'The partition function in Quickselect runs in O(log N) instead of O(N)',
      'Quickselect caches previously sorted elements in a global Bloom filter'
    ],
    correctOptionIndex: 0,
    hints: [
      'Does Quickselect need to sort the half that DOES NOT contain k?',
      'No! It completely discards that entire half.',
      'Work: N + N/2 + N/4 + N/8 + ... = 2N = O(N).'
    ],
    explanation: 'QuickSort recurses into BOTH halves: T(N) = 2T(N/2) + O(N) => O(N log N). Quickselect discards the irrelevant half and recurses into only ONE half: T(N) = T(N/2) + O(N). Summing the geometric series N + N/2 + N/4 + ... converges to 2N, proving average O(N) time.',
    learningObjective: 'Master geometric series convergence and order-statistic selection in linear time.',
    commonMistake: 'Sorting the entire array in O(N log N) to find the k-th element instead of using O(N) Quickselect.',
    tags: ['sorting', 'quickselect', 'divide-and-conquer', 'boss-battle']
  }
];
