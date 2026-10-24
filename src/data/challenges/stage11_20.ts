import { Challenge } from '../../types/challenge';

export const STAGE_11_20_CHALLENGES: Challenge[] = [
  {
    id: 'c-11-two-pointers',
    squareId: 11,
    title: 'Two Pointers: Target Sum Invariant',
    topic: 'Arrays',
    subtopic: 'Two Pointers Technique',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'In a sorted array `nums`, why does the two-pointer approach (starting at indices `0` and `n-1`) guarantee finding two numbers that sum to target in O(n) without missing any candidates?',
    options: [
      'If sum < target, increasing left pointer is the only way to increase sum; if sum > target, decreasing right is the only way to decrease sum',
      'The array is partitioned around the median on each comparison like quickselect',
      'Both pointers jump exponentially by powers of two towards each other',
      'It tests all n * (n - 1) / 2 combinations simultaneously via SIMD parallelism'
    ],
    correctOptionIndex: 0,
    hints: [
      'Think about monotonic properties of sorted arrays.',
      'If nums[L] + nums[R] < target, can any index with R produce the target with nums[L]?',
      'Because all elements to the left of R are smaller, nums[L] cannot pair with anything else; hence L must increment.'
    ],
    explanation: 'Monotonicity invariant: Because the array is sorted, if nums[L] + nums[R] < target, pairing nums[L] with any element smaller than nums[R] would yield an even smaller sum. Thus nums[L] can never participate in a valid pair, allowing us to safely discard L in O(1).',
    learningObjective: 'Understand the monotonicity invariant behind the two-pointer technique on sorted arrays.',
    commonMistake: 'Applying the two-pointer opposite-ends technique to an unsorted array without sorting first.',
    tags: ['arrays', 'two-pointers', 'invariants']
  },
  {
    id: 'c-12-sliding-window',
    squareId: 12,
    title: 'Sliding Window: Max Sum of Size K',
    topic: 'Arrays',
    subtopic: 'Fixed-Size Sliding Window',
    skillCategory: 'complexity',
    difficulty: 'easy',
    type: 'complexity_choice',
    prompt: 'Given an array of size N, what is the optimal time complexity to find the maximum sum of any contiguous subarray of size K?',
    options: [
      'O(N) time and O(1) auxiliary space by subtracting the outgoing element and adding the incoming element',
      'O(N * K) time by recalculating the sum of all K elements at each step',
      'O(N log N) time by sorting the subarrays in a max-heap',
      'O(K) time because we only inspect K total elements'
    ],
    correctOptionIndex: 0,
    hints: [
      'Avoid recomputing the entire sum of K elements from scratch at each step.',
      'When window moves from [i, i+k-1] to [i+1, i+k], what changes in the sum?',
      'New Sum = Old Sum - arr[i] + arr[i+k]. That is an O(1) update per window.'
    ],
    explanation: 'With a sliding window, the next window sum is obtained in O(1) time by adding the incoming element arr[i] and subtracting the outgoing element arr[i-k]. Doing this across N elements gives O(N) total time.',
    learningObjective: 'Identify when overlapping computations can be updated incrementally in O(1).',
    commonMistake: 'Recalculating the inner sum inside a nested loop, degrading complexity to O(N * K).',
    tags: ['arrays', 'sliding-window', 'optimization']
  },
  {
    id: 'c-13-prefix-sum',
    squareId: 13,
    title: 'Range Sum Query via Prefix Sum',
    topic: 'Arrays',
    subtopic: 'Prefix Sum Arrays',
    skillCategory: 'dry_run',
    difficulty: 'easy',
    type: 'code_trace',
    codeSnippet: `const nums = [3, 1, 4, 1, 5, 9];
const P = [0];
for (let x of nums) P.push(P[P.length - 1] + x);
// Query sum of range [2, 4] (0-indexed: nums[2]+nums[3]+nums[4])
const ans = P[5] - P[2];`,
    prompt: 'What value does `ans` hold after executing the prefix sum range query?',
    options: [
      '10',
      '14',
      '6',
      '9'
    ],
    correctOptionIndex: 0,
    hints: [
      'Compute the prefix array P: P[0]=0, P[1]=3, P[2]=4, P[3]=8, P[4]=9, P[5]=14, P[6]=23.',
      'Check the elements at indices 2, 3, and 4: 4 + 1 + 5.',
      'P[5] - P[2] = 14 - 4 = 10.'
    ],
    explanation: 'Sum of nums[L...R] is given by P[R+1] - P[L]. Here L=2, R=4: P[5] is 3+1+4+1+5=14, and P[2] is 3+1=4. Thus 14 - 4 = 10, which matches nums[2] + nums[3] + nums[4] = 4 + 1 + 5 = 10.',
    learningObjective: 'Master 1-indexed prefix sum array range queries in O(1) time.',
    commonMistake: 'Off-by-one errors when subtracting P[L] instead of P[L] or confusing 0-indexed bounds.',
    tags: ['arrays', 'prefix-sum', 'range-queries']
  },
  {
    id: 'c-14-kadane',
    squareId: 14,
    title: 'Kadane\'s Algorithm Invariant',
    topic: 'Arrays',
    subtopic: 'Dynamic Programming / Greedy on Arrays',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'In Kadane\'s algorithm for the Maximum Subarray problem, what is the core state transition for `current_max` at index `i`?',
    options: [
      'current_max = Math.max(nums[i], current_max + nums[i])',
      'current_max = Math.max(0, current_max) + Math.abs(nums[i])',
      'current_max = current_max * nums[i]',
      'current_max = Math.min(nums[i], current_max - nums[i])'
    ],
    correctOptionIndex: 0,
    hints: [
      'At each index, do you extend the previous subarray or start a new one?',
      'If current_max before nums[i] is negative, adding it makes things worse than starting fresh.',
      'Math.max(nums[i], current_max + nums[i]) captures this exact decision.'
    ],
    explanation: 'At index i, the maximum subarray ending at i either extends the previous subarray (current_max + nums[i]) or starts fresh at nums[i] if the prior sum was negative and detrimental. Hence current_max = max(nums[i], current_max + nums[i]).',
    learningObjective: 'Understand Kadane\'s local optimal subarray choice in O(n) time and O(1) space.',
    commonMistake: 'Resetting current_max to 0 without considering arrays that contain entirely negative numbers.',
    tags: ['arrays', 'kadane', 'dynamic-programming']
  },
  {
    id: 'c-15-dutch-flag',
    squareId: 15,
    title: 'Dutch National Flag Partitioning',
    topic: 'Arrays',
    subtopic: 'Three-way Partitioning',
    skillCategory: 'debugging',
    difficulty: 'medium',
    type: 'bug_hunt',
    codeSnippet: `function sort012(arr) {
  let low = 0, mid = 0, high = arr.length - 1;
  while (mid <= high) {
    if (arr[mid] === 0) {
      [arr[low], arr[mid]] = [arr[mid], arr[low]];
      low++; mid++;
    } else if (arr[mid] === 1) {
      mid++;
    } else { // arr[mid] === 2
      [arr[mid], arr[high]] = [arr[high], arr[mid]];
      high--;
      mid++; // BUG HERE?
    }
  }
}`,
    prompt: 'Why is incrementing `mid++` immediately after swapping with `high` a critical bug in 3-way partitioning?',
    options: [
      'The element swapped from `high` has not been inspected yet; it could be a 0 or 2, so `mid` must not advance until evaluated',
      'It causes `high` to become negative on small arrays',
      'Array indices in JavaScript cannot be swapped using destructuring assignment',
      'The algorithm requires allocating a secondary bucket array of size 3'
    ],
    correctOptionIndex: 0,
    hints: [
      'When you swap arr[mid] with arr[low], you know arr[low] was previously 1 or 0 (since mid >= low).',
      'What do you know about the element that was at arr[high] before the swap?',
      'Nothing! It was unexamined. If you advance mid, you skip examining that element.'
    ],
    explanation: 'Elements above high are guaranteed to be 2. When arr[mid] === 2, we swap it with arr[high] and decrement high. But the element brought from high has not yet been processed; it could be 0, 1, or 2. Advancing mid would leave that value uninspected in the middle section.',
    learningObjective: 'Master loop invariants in Dijkstra\'s Dutch National Flag 3-pointer algorithm.',
    commonMistake: 'Advancing the inspection pointer mid after swapping with an uninspected element.',
    tags: ['arrays', 'three-way-partition', 'invariants', 'debugging']
  },
  {
    id: 'c-16-string-anagram',
    squareId: 16,
    title: 'Valid Anagram Frequency Counting',
    topic: 'Strings',
    subtopic: 'Hash Maps & Character Arrays',
    skillCategory: 'complexity',
    difficulty: 'easy',
    type: 'complexity_choice',
    prompt: 'What is the optimal time and space complexity to determine if string s and string t (both lowercase English letters of length N) are anagrams?',
    options: [
      'O(N) time and O(1) space (fixed 26-element frequency array)',
      'O(N log N) time and O(N) space via sorting',
      'O(N^2) time and O(1) space via character-by-character search and delete',
      'O(2^N) time via recursive permutation generation'
    ],
    correctOptionIndex: 0,
    hints: [
      'How many distinct lowercase English alphabet characters exist?',
      'Since alphabet size is constant (26), an array of 26 integers is O(1) auxiliary space.',
      'One pass to increment counts for s and one pass to decrement for t takes O(N) time.'
    ],
    explanation: 'Using an array of size 26, we increment counts for characters in s and decrement for t. Since alphabet size is bounded (26 letters), the space complexity is O(26) = O(1), and we process both strings in a single O(N) pass.',
    learningObjective: 'Leverage bounded alphabet sizes to achieve O(1) auxiliary space in string problems.',
    commonMistake: 'Sorting strings (O(N log N)) when direct O(N) frequency counting is faster and cleaner.',
    tags: ['strings', 'hash-map', 'complexity']
  },
  {
    id: 'c-17-string-palindrome',
    squareId: 17,
    title: 'Longest Palindromic Substring: Expand from Center',
    topic: 'Strings',
    subtopic: 'Palindromes & Center Expansion',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'For a string of length N, how many potential centers must be checked when using the "expand around center" algorithm for palindromic substrings?',
    options: [
      '2N - 1 centers (N single-character centers and N - 1 two-character centers)',
      'N centers (only single characters can be centers)',
      'N^2 centers (every pair of indices)',
      'N / 2 centers (only characters in the first half)'
    ],
    correctOptionIndex: 0,
    hints: [
      'Palindromes can be odd-length (like "aba") or even-length (like "abba").',
      'An odd palindrome centers on a single character arr[i] (N choices).',
      'An even palindrome centers between two adjacent characters arr[i] and arr[i+1] (N-1 choices).'
    ],
    explanation: 'Palindromes can have odd lengths (e.g. "racecar", center at \'e\') or even lengths (e.g. "noon", center between \'o\' and \'o\'). There are N odd centers and N-1 even centers, giving a total of 2N - 1 centers. Each expansion takes up to O(N) time, yielding O(N^2) total.',
    learningObjective: 'Understand odd vs even symmetry centers in string palindrome algorithms.',
    commonMistake: 'Only expanding around single character centers, completely missing even-length palindromes.',
    tags: ['strings', 'palindromes', 'two-pointers']
  },
  {
    id: 'c-18-in-place-reversal',
    squareId: 18,
    title: 'In-Place Word Reversal Algorithm',
    topic: 'Strings',
    subtopic: 'In-Place Array Manipulation',
    skillCategory: 'dry_run',
    difficulty: 'medium',
    type: 'code_trace',
    codeSnippet: `// Reverse words in a character array: "the sky is blue"
// Step 1: Reverse entire array -> "eulb si yks eht"
// Step 2: Reverse each individual word delimited by space
// What does word 1 ("eulb") become after Step 2?`,
    prompt: 'What is the final state of the string after reversing the entire array and then reversing each individual word?',
    options: [
      '"blue is sky the"',
      '"the sky is blue"',
      '"eulb si yks eht"',
      '"blue sky is the"'
    ],
    correctOptionIndex: 0,
    hints: [
      'The entire array is flipped backwards first: last word becomes first word, but with its letters reversed.',
      'Reversing each word restores the correct letter ordering within each word.',
      'Result: words appear in reverse order while characters inside each word are in forward order.'
    ],
    explanation: 'The double reversal pattern reverses the order of words in O(N) time and O(1) space. Reversing the whole string places "blue" at the front as "eulb". Reversing the characters of each individual word then restores "blue", giving "blue is sky the".',
    learningObjective: 'Apply the 2-step in-place reversal pattern to rotate or reorder word sequences.',
    commonMistake: 'Allocating temporary word arrays or string splits, violating the O(1) auxiliary space constraint.',
    tags: ['strings', 'two-pointers', 'in-place']
  },
  {
    id: 'c-19-string-compression',
    squareId: 19,
    title: 'Run-Length String Compression',
    topic: 'Strings',
    subtopic: 'Run-Length Encoding & Two Pointers',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'When compressing an array of characters `[\'a\',\'a\',\'b\',\'b\',\'c\',\'c\',\'c\']` in-place, how do we write multi-digit counts (e.g. 12 repetitions) using O(1) extra space?',
    options: [
      'Convert the count to characters (e.g. \'1\', \'2\') and write each digit into consecutive array cells',
      'Cast the integer 12 into a single 32-bit character code byte',
      'Allocate a new dynamic hash table to store overflow digits',
      'Skip counts greater than 9 because run-length encoding only supports single digits'
    ],
    correctOptionIndex: 0,
    hints: [
      'The problem statement specifies in-place modification of character array.',
      'A count of 12 consists of characters \'1\' followed by \'2\'.',
      'Write the character first, then write each character of String(count).'
    ],
    explanation: 'To write count >= 10 in-place into a character array, we convert the count to its decimal string representation and write each digit sequentially (`[\'a\', \'1\', \'2\']`). This modifies the array in-place with O(1) extra space.',
    learningObjective: 'Handle variable-length numeric encodings in in-place string algorithms.',
    commonMistake: 'Storing the integer directly or failing to handle multi-digit counts properly.',
    tags: ['strings', 'in-place', 'two-pointers']
  },
  {
    id: 'c-20-boss-arrays-strings',
    squareId: 20,
    title: 'GATEWAY BOSS: The Substring Sentinel',
    topic: 'Strings',
    subtopic: 'Sliding Window with Dynamic Hash Counter',
    skillCategory: 'optimization',
    difficulty: 'hard',
    type: 'bug_hunt',
    codeSnippet: `// Minimum Window Substring: find smallest s-window containing all chars of t
function minWindow(s, t) {
  let need = new Map(), window = new Map();
  for (let c of t) need.set(c, (need.get(c) || 0) + 1);
  let left = 0, right = 0, valid = 0;
  let start = 0, minLen = Infinity;
  
  while (right < s.length) {
    let c = s[right]; right++;
    if (need.has(c)) {
      window.set(c, (window.get(c) || 0) + 1);
      if (window.get(c) === need.get(c)) valid++;
    }
    while (valid === need.size) {
      if (right - left < minLen) {
        start = left; minLen = right - left;
      }
      let d = s[left]; left++;
      if (need.has(d)) {
        if (window.get(d) === need.get(d)) valid--;
        window.set(d, window.get(d) - 1);
      }
    }
  }
  return minLen === Infinity ? "" : s.substring(start, start + minLen);
}`,
    prompt: 'Why is this sliding window implementation optimal at O(S + T) time complexity?',
    options: [
      'Both `left` and `right` pointers traverse each index of string S at most once, and Map lookups are O(1)',
      'The inner while loop runs S times for every single step of right, yielding O(S * T)',
      'It sorts both strings in O(S log S + T log T) before windowing',
      'String slicing inside the inner loop is executed unconditionally on every character'
    ],
    correctOptionIndex: 0,
    hints: [
      'How many times does the right pointer increment?',
      'How many times does the left pointer increment across the entire execution?',
      'Both pointers advance strictly from 0 to S.length, so the total inner loop iterations cannot exceed S.'
    ],
    explanation: 'Although there is a nested while loop, the `left` pointer only moves forward and never resets. Each character in S is visited at most once by `right` and at most once by `left`. Therefore, the amortized cost across the entire string is 2 * |S| operations, giving O(|S| + |T|) total time.',
    learningObjective: 'Master amortized two-pointer sliding window complexity analysis for hard interview problems.',
    commonMistake: 'Assuming nested while loops automatically imply O(N^2) complexity without analyzing pointer bounds.',
    tags: ['strings', 'sliding-window', 'hard', 'boss-battle']
  }
];
