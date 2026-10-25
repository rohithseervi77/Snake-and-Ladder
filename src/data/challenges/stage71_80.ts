import { Challenge } from '../../types/challenge';

export const STAGE_71_80_CHALLENGES: Challenge[] = [
  {
    id: 'q-71-insertion-sort',
    squareId: 71,
    co: 'CO3',
    title: 'Insertion Sort Invariant & Best Case',
    topic: 'Insertion Sort / Counting Sort',
    subtopic: 'In-Place Adaptive Sorting',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'What is the best-case time complexity of Insertion Sort, and what type of input achieves it?',
    options: [
      'O(n), when the array is already sorted in ascending order',
      'O(n log n), when the array is randomly shuffled',
      'O(n^2), when all elements are identical',
      'O(1), when the array length is a power of 2'
    ],
    correctOptionIndex: 0,
    hints: [
      'In an already sorted array, the inner while loop comparison `arr[j] > key` fails immediately on the very first test.',
      'Only 1 comparison is made per element.'
    ],
    explanation: 'If the array is already sorted, each element is compared once with its predecessor and immediately placed without shifting. The inner loop runs in O(1), giving an overall best-case running time of O(n).',
    tags: ['insertion_sort', 'best_case', 'adaptive']
  },
  {
    id: 'q-72-counting-sort',
    squareId: 72,
    co: 'CO3',
    title: 'Counting Sort Non-Comparison Barrier',
    topic: 'Insertion Sort / Counting Sort',
    subtopic: 'O(n + k) Integer Frequency Bucketing',
    skillCategory: 'complexity',
    difficulty: 'medium',
    type: 'time_complexity',
    prompt: 'You have 10,000,000 integers, but each integer is strictly in the range [0, 500]. Which algorithm sorts this data in O(n) linear time with minimal auxiliary memory?',
    options: [
      'Counting Sort, running in O(n + k) where k = 501',
      'Quick Sort with random pivot',
      'Merge Sort with recursive partitions',
      'Heap Sort using binary max-heap'
    ],
    correctOptionIndex: 0,
    hints: [
      'The range of values k (501) is tiny compared to n (10 million).',
      'Non-comparison sorting using a frequency array of size 501 achieves true linear time.'
    ],
    explanation: 'Counting Sort runs in O(n + k) time. Here n = 10,000,000 and k = 501. The frequency count array requires only 501 integers (~2 KB of RAM), achieving linear O(n) speed and completely outperforming comparison sorts.',
    tags: ['counting_sort', 'linear_time', 'non_comparison']
  },
  {
    id: 'q-73-radix-sort',
    squareId: 73,
    co: 'CO3',
    title: 'Radix Sort Stability Requirement',
    topic: 'Radix Sort / Merge Sort',
    subtopic: 'Least Significant Digit Stable Sorting',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'Why MUST the intermediate sorting algorithm used within Radix Sort (e.g. Counting Sort) be STABLE?',
    options: [
      'To preserve the relative order of elements established by earlier digit passes',
      'Because unstable sorts consume more RAM',
      'To ensure negative integers can be sorted',
      'Because unstable sorts cannot run on multi-core CPUs'
    ],
    correctOptionIndex: 0,
    hints: [
      'Consider sorting numbers like 42 and 45. In pass 1 (units digit), 42 comes before 45.',
      'In pass 2 (tens digit), both have digit 4. If the sort is not stable, 45 might jump ahead of 42!'
    ],
    explanation: 'Radix Sort sorts digit by digit from least significant to most significant. When sorting by the tens digit, equal tens digits must remain in the order established by their units digits. Only a stable sort guarantees this relative order.',
    tags: ['radix_sort', 'stability', 'intermediate_sort']
  },
  {
    id: 'q-74-merge-sort',
    squareId: 74,
    co: 'CO3',
    title: 'Merge Sort Worst-Case Guarantee',
    topic: 'Radix Sort / Merge Sort',
    subtopic: 'Stable O(n log n) Guaranteed Sorting',
    skillCategory: 'complexity',
    difficulty: 'medium',
    type: 'time_complexity',
    prompt: 'What are the worst-case time complexity and auxiliary space complexity of standard Merge Sort on an array of size n?',
    options: [
      'Time: O(n log n); Auxiliary Space: O(n)',
      'Time: O(n^2); Auxiliary Space: O(1)',
      'Time: O(n log n); Auxiliary Space: O(1)',
      'Time: O(n); Auxiliary Space: O(log n)'
    ],
    correctOptionIndex: 0,
    hints: [
      'Merge Sort divides the array in half at each step (log n levels) and does O(n) work to merge.',
      'Merging two sorted arrays requires a temporary array of size n.'
    ],
    explanation: 'Merge Sort solves T(n) = 2T(n/2) + O(n), which guarantees O(n log n) time in all cases (worst, average, best). Merging requires an auxiliary array of size n, so auxiliary space is O(n).',
    tags: ['merge_sort', 'worst_case', 'space_complexity']
  },
  {
    id: 'q-75-quick-sort',
    squareId: 75,
    co: 'CO3',
    title: 'Quick Sort Worst-Case Trigger',
    topic: 'Quick Sort',
    subtopic: 'Lomuto vs Hoare Partitioning',
    skillCategory: 'complexity',
    difficulty: 'medium',
    type: 'time_complexity',
    prompt: 'When using standard Quick Sort with the last element chosen as the pivot, what input arrangement causes the worst-case running time of O(n^2)?',
    options: [
      'An already sorted array (ascending or descending)',
      'An array with randomly distributed values',
      'An array of alternating odd and even numbers',
      'An array where every element is unique and powers of 2'
    ],
    correctOptionIndex: 0,
    hints: [
      'Worst case occurs when the pivot partition is maximally unbalanced (subproblem sizes 0 and n - 1).',
      'In a sorted array, the last element is the maximum, producing partitions of size n - 1 and 0.'
    ],
    explanation: 'When the array is already sorted, choosing the last element as pivot means every partition splits into an empty subproblem and an (n-1) subproblem. Recurrence becomes T(n) = T(n-1) + O(n) = O(n^2).',
    tags: ['quick_sort', 'worst_case', 'pivot']
  },
  {
    id: 'q-76-heap-sort',
    squareId: 76,
    co: 'CO3',
    title: 'Heap Sort: In-Place Max-Heap Sorting',
    topic: 'Heap Sort',
    subtopic: 'In-Place Max-Heap Construction & Extraction',
    skillCategory: 'conceptual',
    difficulty: 'hard',
    type: 'compare_approaches',
    prompt: 'How does Heap Sort achieve O(n log n) worst-case time while using only O(1) auxiliary space, unlike Merge Sort?',
    options: [
      'It represents the binary heap directly within the input array using parent-child index arithmetic: left = 2i+1, right = 2i+2',
      'It uses multi-threaded CPU cache registers',
      'It compresses array data into binary bit vectors',
      'It skips comparing elements larger than the median'
    ],
    correctOptionIndex: 0,
    hints: [
      'A complete binary tree can be mapped onto an array without any pointers.',
      'Indices i, 2i+1, and 2i+2 require 0 auxiliary memory.'
    ],
    explanation: 'Heap Sort constructs a Max-Heap in-place inside the array itself using index math (children at 2i+1 and 2i+2). Extracted maximum elements are swapped to the end of the array, requiring 0 extra memory (O(1) auxiliary space).',
    tags: ['heap_sort', 'in_place', 'binary_heap']
  },
  {
    id: 'q-77-linear-vs-binary-search',
    squareId: 77,
    co: 'CO3',
    title: 'Linear vs Binary Search Maximum Comparisons',
    topic: 'Linear Search / Binary Search / Jump Search',
    subtopic: 'Comparing O(n) and O(log n) Search Spaces',
    skillCategory: 'numerical',
    difficulty: 'easy',
    type: 'time_complexity',
    prompt: 'You need to search for a target value in a sorted array of 1,024 integers. In the worst case, how many comparisons will Binary Search make compared to Linear Search?',
    options: [
      'Binary Search: at most 11 comparisons; Linear Search: 1,024 comparisons',
      'Binary Search: 512 comparisons; Linear Search: 1,024 comparisons',
      'Binary Search: 100 comparisons; Linear Search: 100 comparisons',
      'Both make exactly 1 comparison'
    ],
    correctOptionIndex: 0,
    hints: [
      '1,024 = 2^10.',
      'Binary search makes at most floor(log2(n)) + 1 comparisons.',
      'log2(1024) = 10, so at most 11 comparisons.'
    ],
    explanation: 'Linear search must inspect all 1,024 elements in the worst case (O(n)). Binary search cuts the search space in half each step: log2(1024) + 1 = 10 + 1 = 11 comparisons maximum (O(log n)).',
    tags: ['binary_search', 'linear_search', 'comparisons']
  },
  {
    id: 'q-78-jump-search',
    squareId: 78,
    co: 'CO3',
    title: 'Jump Search Optimal Block Size Derivation',
    topic: 'Linear Search / Binary Search / Jump Search',
    subtopic: 'Block Jumping with Step Size m = sqrt(n)',
    skillCategory: 'numerical',
    difficulty: 'medium',
    type: 'time_complexity',
    prompt: 'In Jump Search on a sorted array of size n, why is the optimal jump step size chosen as m = sqrt(n)?',
    options: [
      'Minimizing the total worst-case comparisons f(m) = (n/m) + (m - 1) via derivative df/dm = 0 yields m = sqrt(n)',
      'Because computers execute square roots in O(1) hardware cycles',
      'Because array indices must be squares of integers',
      'Because jump search is only defined for perfect square lengths'
    ],
    correctOptionIndex: 0,
    hints: [
      'Total worst-case comparisons = (number of block jumps) + (linear search within block).',
      'f(m) = n/m + m - 1. Differentiate with respect to m: -n/m^2 + 1 = 0 -> m^2 = n.'
    ],
    explanation: 'In the worst case, jump search makes n/m jumps and m-1 linear comparisons. Total steps = n/m + m - 1. Taking the derivative with respect to m and equating to zero: -n/m^2 + 1 = 0 => m = sqrt(n), giving O(sqrt(n)) overall time.',
    tags: ['jump_search', 'optimal_step', 'calculus']
  },
  {
    id: 'q-79-sorting-searching-analysis',
    squareId: 79,
    co: 'CO3',
    title: 'Comparison Sort Lower Bound',
    topic: 'Time Complexity Analysis of Sorting and Searching Algorithms',
    subtopic: 'Comprehensive Comparative Analysis',
    skillCategory: 'conceptual',
    difficulty: 'hard',
    type: 'conceptual_mcq',
    prompt: 'What mathematical argument proves that any comparison-based sorting algorithm must take at least Omega(n log n) time in the worst case?',
    options: [
      'A decision tree for n items must have at least n! leaves; the tree height is at least log2(n!) = Omega(n log n)',
      'Because CPU comparison instructions take logarithmic clock cycles',
      'Because binary search takes O(log n) time',
      'Because RAM addresses are 64-bit words'
    ],
    correctOptionIndex: 0,
    hints: [
      'There are n! possible permutations of n elements.',
      'A binary decision tree of height h has at most 2^h leaves.',
      '2^h >= n! => h >= log2(n!) = Omega(n log n) by Stirling\'s approximation.'
    ],
    explanation: 'Any comparison sort is modeled as a decision tree with n! leaves (one for each permutation). A binary tree with L leaves must have height h >= log2(L). Here h >= log2(n!) = sum log(i) = Omega(n log n) by Stirling\'s formula.',
    tags: ['lower_bound', 'decision_tree', 'stirling']
  },
  {
    id: 'q-80-checkpoint-hashing',
    squareId: 80,
    co: 'CO3',
    title: 'Checkpoint 8: Hash Table Linear Probing',
    topic: 'Hashing',
    subtopic: 'Hash Functions, Separate Chaining & Open Addressing',
    skillCategory: 'dry_run',
    difficulty: 'hard',
    type: 'dry_run_trace',
    prompt: 'A hash table of capacity 7 uses the hash function h(k) = k % 7 and Linear Probing for collision resolution. Insert the keys in order: 10, 17, 24, 38.\nAt which index does the key 38 end up?',
    options: [
      'Index 6',
      'Index 3',
      'Index 4',
      'Index 5'
    ],
    correctOptionIndex: 0,
    hints: [
      '10 % 7 = 3 (placed at index 3).',
      '17 % 7 = 3 (collision! Probe index 4 -> empty, placed at 4).',
      '24 % 7 = 3 (collision! Probe 4 (occupied), probe 5 (empty) -> placed at 5).',
      '38 % 7 = 3. Check indices 3, 4, 5, 6...'
    ],
    explanation: '1) 10 % 7 = 3 -> slot 3. 2) 17 % 7 = 3 -> slot 3 occupied, probes slot 4 -> slot 4. 3) 24 % 7 = 3 -> slots 3, 4 occupied, probes slot 5 -> slot 5. 4) 38 % 7 = 3 -> slots 3, 4, 5 occupied, probes slot 6 -> placed at slot 6. Result: Index 6.',
    tags: ['checkpoint', 'hashing', 'linear_probing']
  },
  {
    id: 'q-extra-71',
    squareId: 71,
    co: 'CO3',
    title: 'Insertion Sort Dry Run Single Pass',
    topic: 'Insertion Sort / Counting Sort',
    subtopic: 'Dry Run Insertion Step',
    skillCategory: 'dry_run',
    difficulty: 'easy',
    type: 'dry_run_trace',
    prompt: 'Given the array [3, 8, 5, 1], after the insertion sort iteration for key = 5, what does the array look like?',
    options: [
      '[3, 5, 8, 1]',
      '[3, 8, 5, 1]',
      '[1, 3, 5, 8]',
      '[5, 3, 8, 1]'
    ],
    correctOptionIndex: 0,
    hints: [
      'The sorted prefix is [3, 8].',
      'Key = 5 is compared with 8: 8 shifts right.',
      'Key 5 is placed before 8.'
    ],
    explanation: 'The sorted prefix is [3, 8]. When 5 is inserted, 8 > 5, so 8 shifts right. 3 < 5, so 5 is placed at index 1. The array becomes [3, 5, 8, 1].',
    tags: ['insertion_sort', 'step_trace']
  },
  {
    id: 'q-extra-77',
    squareId: 77,
    co: 'CO3',
    title: 'Midpoint Overflow Bug in Binary Search',
    topic: 'Linear Search / Binary Search / Jump Search',
    subtopic: 'Numerical Midpoint Calculation',
    skillCategory: 'debugging',
    difficulty: 'medium',
    type: 'find_bug',
    prompt: 'Why is `mid = low + (high - low) / 2` preferred over `mid = (low + high) / 2` in C/C++/Java binary search implementations?',
    options: [
      '`(low + high)` can cause 32-bit signed integer overflow when low + high exceeds 2^31 - 1',
      '`low + (high - low) / 2` runs twice as fast in assembly',
      '`(low + high) / 2` does not work for odd array sizes',
      '`(low + high) / 2` produces floating-point errors'
    ],
    correctOptionIndex: 0,
    hints: [
      'Consider low = 1,500,000,000 and high = 2,000,000,000.',
      'Their sum is 3.5 billion, which exceeds the max 32-bit integer (2,147,483,647).'
    ],
    explanation: 'If `low + high` exceeds 2,147,483,647 (INT_MAX), it overflows to a negative value, causing an invalid negative array index crash. `low + (high - low) / 2` calculates the identical midpoint without any overflow risk.',
    tags: ['binary_search', 'integer_overflow', 'famous_bug']
  },
  {
    id: 'q-extra-80',
    squareId: 80,
    co: 'CO3',
    title: 'Load Factor in Hash Tables',
    topic: 'Hashing',
    subtopic: 'Hash Table Load Factor',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'In a Hash Table with n stored keys and m buckets, how is the Load Factor (alpha) defined?',
    options: ['alpha = n / m', 'alpha = m / n', 'alpha = n * m', 'alpha = n - m'],
    correctOptionIndex: 0,
    hints: [
      'Load factor measures how full the table is.',
      'Ratio of number of keys to number of slots.'
    ],
    explanation: 'Load factor alpha = n / m represents the average number of elements per bucket. When alpha exceeds a threshold (typically 0.75), rehashing is triggered to maintain O(1) lookup time.',
    tags: ['hashing', 'load_factor']
  }
];
