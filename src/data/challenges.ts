import { Challenge } from '../types/challenge';
import { ALL_CURRICULUM_CHALLENGES } from './challenges/index';

export const BASE_CHALLENGES: Challenge[] = [
  // --- SQUARE 1: Arrays (Manipulation) ---
  {
    id: 'c-1-mcq',
    squareId: 1,
    title: 'Array Indexing Time Complexity',
    topic: 'Arrays',
    subtopic: 'Array Indexing & Access',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'Given an array arr of size N, what is the time complexity of accessing the element at index i (e.g., arr[i]), and why?',
    options: [
      'O(1) because arrays reside in contiguous memory, allowing address calculation as base_address + i * element_size',
      'O(N) because the CPU must traverse linearly through all preceding elements to reach index i',
      'O(log N) because modern compilers execute binary search across index buckets',
      'O(i) because lookup duration scales proportionally with the index depth'
    ],
    correctOptionIndex: 0,
    hints: [
      'Think about how arrays are laid out in physical computer RAM.',
      'Remember the pointer arithmetic equation: Address(A[i]) = Base + i * Size.'
    ],
    explanation: 'Arrays are stored in contiguous memory blocks. Accessing arr[i] requires just one arithmetic multiplication and addition (base + i * size), which the CPU performs in O(1) constant time.',
    tags: ['arrays', 'memory', 'complexity', 'foundations']
  },
  {
    id: 'c-1-trace',
    squareId: 1,
    title: 'Dry-Run Array Traversal',
    topic: 'Arrays',
    subtopic: 'Array Traversal & Accumulation',
    skillCategory: 'tracing',
    difficulty: 'easy',
    type: 'dry_run_trace',
    prompt: 'Dry-run the following code and predict the final value of variable total:\n\nconst arr = [3, 1, 4, 2];\nlet total = 0;\nfor (let i = 0; i < arr.length; i++) {\n  if (arr[i] % 2 === 0) {\n    total += arr[i] * 2;\n  } else {\n    total += arr[i];\n  }\n}',
    options: ['10', '16', '14', '18'],
    correctOptionIndex: 1,
    traceSteps: [
      { step: 1, variables: { i: 0, 'arr[i]': 3, total: 3 }, explanation: '3 is odd, total += 3 = 3' },
      { step: 2, variables: { i: 1, 'arr[i]': 1, total: 4 }, explanation: '1 is odd, total += 1 = 4' },
      { step: 3, variables: { i: 2, 'arr[i]': 4, total: 12 }, explanation: '4 is even, total += 4 * 2 = 12' },
      { step: 4, variables: { i: 3, 'arr[i]': 2, total: 16 }, explanation: '2 is even, total += 2 * 2 = 16' }
    ],
    hints: [
      'Track how total changes after each element: 3, 1, 4, 2.',
      'Notice that even numbers (4 and 2) are doubled before adding.'
    ],
    explanation: 'Iterating through [3, 1, 4, 2]: 3 is odd (total=3), 1 is odd (total=4), 4 is even (total=4+8=12), 2 is even (total=12+4=16). Final total is 16.',
    tags: ['arrays', 'dry-run', 'loops']
  },

  // --- SQUARE 2: Functions (Basic) ---
  {
    id: 'c-2-mcq',
    squareId: 2,
    title: 'Pure Functions & Side Effects',
    topic: 'Functions',
    subtopic: 'Parameters & Return Values',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'In algorithmic problem solving, why is a "pure function" strongly preferred over functions that mutate external global state?',
    options: [
      'Pure functions produce deterministic outputs for identical inputs without mutating shared state, making them testable and free from cascading bugs',
      'Pure functions run in hardware L1 cache while functions with side effects write directly to hard disk',
      'Compilers automatically convert pure functions into O(1) algorithms using quantum registers',
      'Pure functions can only accept numbers and cannot accept arrays or objects'
    ],
    correctOptionIndex: 0,
    hints: [
      'Think about debugging recursive functions when global variables get altered unexpectedly.',
      'Deterministic behavior means f(x) always gives the exact same result.'
    ],
    explanation: 'Pure functions have no side effects and always produce the same output for a given input. This isolation prevents hidden mutations across recursion and concurrent routines.',
    tags: ['functions', 'clean-code', 'foundations']
  },
  {
    id: 'c-2-code',
    squareId: 2,
    title: 'Predict Output of Pass-by-Reference',
    topic: 'Functions',
    subtopic: 'Memory References vs Primitives',
    skillCategory: 'implementation',
    difficulty: 'easy',
    type: 'output_prediction',
    codeSnippet: `function modify(arr, num) {
  num += 10;
  arr.push(num);
}
let n = 5;
let list = [1, 2];
modify(list, n);
console.log(n, list.length);`,
    prompt: 'What will be printed to the console?',
    options: ['5 3', '15 3', '5 2', '15 2'],
    correctOptionIndex: 0,
    hints: [
      'Primitives (like numbers) are passed by value.',
      'Arrays and objects are passed by reference sharing.'
    ],
    explanation: 'Primitive variable n is passed by value, so modifying num inside the function does not change n in the outer scope (n remains 5). However, list is passed by reference, so arr.push(15) modifies the underlying array, making its length 3. Output is "5 3".',
    tags: ['functions', 'pointers', 'memory']
  },

  // --- SQUARE 3: Loops (Basic) ---
  {
    id: 'c-3-trace',
    squareId: 3,
    title: 'Loop Termination Invariant',
    topic: 'Loops',
    subtopic: 'For and While Iteration',
    skillCategory: 'tracing',
    difficulty: 'easy',
    type: 'dry_run_trace',
    codeSnippet: `let count = 0;
let x = 16;
while (x > 1) {
  x = Math.floor(x / 2);
  count++;
}`,
    prompt: 'How many iterations does this while loop execute before terminating?',
    options: ['4 iterations', '16 iterations', '8 iterations', '5 iterations'],
    correctOptionIndex: 0,
    traceSteps: [
      { step: 1, variables: { x: 8, count: 1 }, explanation: '16 / 2 = 8 > 1' },
      { step: 2, variables: { x: 4, count: 2 }, explanation: '8 / 2 = 4 > 1' },
      { step: 3, variables: { x: 2, count: 3 }, explanation: '4 / 2 = 2 > 1' },
      { step: 4, variables: { x: 1, count: 4 }, explanation: '2 / 2 = 1, condition (1 > 1) is false! Loop stops.' }
    ],
    hints: [
      'Trace x halving each turn: 16 -> 8 -> 4 -> 2 -> 1.',
      'Notice the condition is x > 1 (not x > 0).'
    ],
    explanation: 'x halves each step: 16->8 (1), 8->4 (2), 4->2 (3), 2->1 (4). At x = 1, the condition (1 > 1) is false, so loop exits after exactly 4 iterations (log2(16) = 4).',
    tags: ['loops', 'binary-reduction', 'logarithm']
  },

  // --- SQUARE 4: Conditionals ---
  {
    id: 'c-4-mcq',
    squareId: 4,
    title: 'Short-Circuit Evaluation Guard',
    topic: 'Conditionals',
    subtopic: 'Boolean Logic & Guards',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'Why does if (ptr !== null && ptr.val === target) successfully prevent a NullPointer / TypeError crash, while if (ptr.val === target && ptr !== null) crashes?',
    options: [
      'Logical AND (&&) short-circuits: if the left operand evaluates to false, the right operand is never executed',
      'The CPU executes operands in reverse alphabetical order',
      'Compilers automatically invert conditional statements during compilation',
      'Null pointers can only be compared on the right side of expressions'
    ],
    correctOptionIndex: 0,
    hints: [
      'Remember short-circuit evaluation in modern languages (JS, TS, C++, Java, Python).',
      'If ptr is null, accessing ptr.val causes a crash immediately if not guarded.'
    ],
    explanation: 'Short-circuit evaluation dictates that in (A && B), if A is false, B is never evaluated. Therefore, checking ptr !== null first protects ptr.val from throwing a null dereference error.',
    tags: ['conditionals', 'defensive-programming', 'edge-cases']
  },
  {
    id: 'c-4-bug',
    squareId: 4,
    title: 'Branching Shadow Bug',
    topic: 'Conditionals',
    subtopic: 'Branch Order Invariants',
    skillCategory: 'debugging',
    difficulty: 'easy',
    type: 'find_bug',
    codeSnippet: `function classifyScore(score: number): string {
  if (score >= 60) return "Pass";
  if (score >= 90) return "Distinction";
  return "Fail";
}`,
    prompt: 'A student scored 95, but the function returned "Pass" instead of "Distinction". What is the bug?',
    options: [
      'The score >= 60 condition is checked first, shadowing and intercepting any score that is 90 or above',
      'The score 95 is treated as an octal number',
      'Strings cannot be returned from functions with number parameters',
      'The function is missing an else statement before return "Fail"'
    ],
    correctOptionIndex: 0,
    hints: [
      'Check which condition 95 satisfies first.',
      'Always order conditions from most specific (score >= 90) to least specific (score >= 60).'
    ],
    explanation: 'Since 95 is >= 60, the first branch executes immediately and returns "Pass". Conditions must be ordered from most restrictive (>= 90) to least restrictive (>= 60) to avoid shadowing.',
    tags: ['conditionals', 'debugging', 'logic']
  },

  // --- SQUARE 5: Strings ---
  {
    id: 'c-5-mcq',
    squareId: 5,
    title: 'String Immutability and Concatenation Cost',
    topic: 'Strings',
    subtopic: 'Memory Allocation & Immutability',
    skillCategory: 'complexity',
    difficulty: 'easy',
    type: 'time_complexity',
    prompt: 'In languages with immutable strings (like JavaScript, Java, Python), what is the time complexity of building a string of length N using repeated concatenation in a loop: s += char?',
    options: [
      'O(N²) because strings are immutable, requiring copying all existing characters into a newly allocated buffer on each iteration',
      'O(N) because concatenation is always an O(1) pointer swap',
      'O(log N) because string buffers double in capacity automatically',
      'O(N³) because character encodings require 3 bytes per letter'
    ],
    correctOptionIndex: 0,
    hints: [
      'Copying 1 char, then 2 chars, then 3 chars... up to N chars.',
      'Sum of 1 + 2 + 3 + ... + N = N(N+1)/2.'
    ],
    explanation: 'Because immutable strings cannot be modified in place, each concatenation copies the previous k characters into a new string buffer. Summing 1 + 2 + ... + N gives N(N+1)/2 = O(N²) time. Use an array join or StringBuilder for O(N).',
    tags: ['strings', 'complexity', 'memory']
  },

  // --- SQUARE 7: Data Types ---
  {
    id: 'c-7-mcq',
    squareId: 7,
    title: 'Integer Overflow & Binary Mid Calculation',
    topic: 'Data Types',
    subtopic: '32-Bit Signed Integer Bounds',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'In binary search over a large array, why is calculating mid = (low + high) / 2 dangerous in languages like C, C++, and Java, and what is the safe formula?',
    options: [
      'If low + high exceeds 2³¹ - 1 (2,147,483,647), it overflows into a negative integer; the safe formula is low + (high - low) / 2',
      'Division by 2 produces irrational fractions that crash the hardware floating point unit',
      'Compilers optimize / 2 into bitwise left shifts, which shift bits in the wrong direction',
      'Modern CPUs cannot add two integers whose indices are in the second half of RAM'
    ],
    correctOptionIndex: 0,
    hints: [
      'Max 32-bit signed integer is 2,147,483,647.',
      'Think what happens when low = 1.5 billion and high = 1.5 billion.'
    ],
    explanation: 'When low and high are large (e.g. > 1 billion), low + high exceeds INT_MAX and overflows to negative, causing out-of-bounds indexing. Using low + (high - low) / 2 avoids the overflow completely.',
    tags: ['data-types', 'binary-search', 'overflow', 'edge-cases']
  },

  // --- SQUARE 10: First Program (FOUNDATIONS CHECKPOINT & LADDER START) ---
  {
    id: 'c-10-opt',
    squareId: 10,
    title: 'Optimization Ladder: Brute-Force to Linear Frequency Map',
    topic: 'Foundations Checkpoint',
    subtopic: 'Two-Sum Frequency Optimization',
    skillCategory: 'optimization',
    difficulty: 'medium',
    type: 'optimize_algorithm',
    prompt: 'CLIMB THE LADDER! You have an array of integers and target T. The baseline approach tests all pairs (i, j) with nested loops in O(N²) time. Refactor this into an optimal single-pass solution.',
    optimizationComparison: {
      bruteForce: {
        approachTitle: 'Brute-Force Nested Pair Loops',
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(1)',
        codeSnippet: `for (let i = 0; i < n; i++) {\n  for (let j = i + 1; j < n; j++) {\n    if (arr[i] + arr[j] === target) return [i, j];\n  }\n}`,
        explanation: 'Inspects all N(N-1)/2 pairs exhaustively.',
        isOptimal: false
      },
      optimal: {
        approachTitle: 'Hash Map Complement Lookup',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        codeSnippet: `const seen = new Map();\nfor (let i = 0; i < n; i++) {\n  const complement = target - arr[i];\n  if (seen.has(complement)) return [seen.get(complement), i];\n  seen.set(arr[i], i);\n}`,
        explanation: 'Stores previously visited numbers in a hash map, looking up complement (target - arr[i]) in O(1) time.',
        isOptimal: true
      },
      tradeOffSummary: 'Trades O(N) auxiliary space in exchange for reducing execution time from quadratic O(N²) to linear O(N).',
      whyOptimalWorks: 'As we scan each element, we immediately check whether its required complement was already encountered. This reduces the search for the pair from an O(N) scan to an O(1) hash table lookup.'
    },
    options: [
      'Store visited numbers in a Hash Map to find complement (target - x) in O(1) average time, reducing overall complexity to O(N)',
      'Sort the array in O(N³) and run bubble search on every index',
      'Allocate an N × N 2D matrix to store precomputed sums in O(N²)',
      'Run three nested loops to test triples instead of pairs'
    ],
    correctOptionIndex: 0,
    hints: [
      'Instead of re-scanning previous elements, store them in a lookup structure.',
      'What data structure offers O(1) average lookup time?'
    ],
    explanation: 'By using a Hash Map, each element requires a single O(1) lookup for its complement (target - arr[i]). This slashes runtime from O(N²) down to O(N), climbing the ladder from Square 10 to Square 28!',
    tags: ['ladder', 'optimization', 'hash-map', 'foundations']
  },
  {
    id: 'c-10-mcq',
    squareId: 10,
    title: 'Foundations Synthesis Checkpoint',
    topic: 'Foundations Checkpoint',
    subtopic: 'Algorithm Invariants',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'Which combination of time and auxiliary space complexity is considered the ideal target for single-pass array algorithms that do not require sorting?',
    options: [
      'O(N) Time and O(1) Auxiliary Space',
      'O(N²) Time and O(N) Auxiliary Space',
      'O(2ⁿ) Time and O(1) Auxiliary Space',
      'O(log N) Time and O(N!) Auxiliary Space'
    ],
    correctOptionIndex: 0,
    hints: ['Single-pass means inspecting each of the N elements once.'],
    explanation: 'Visiting N items in a single loop takes O(N) time. If no additional dynamically sized data structures are allocated, the auxiliary space is O(1) constant, which is optimal for array manipulation.',
    tags: ['checkpoint', 'complexity', 'foundations']
  },

  // --- SQUARE 14: Functions & Scope (SNAKE HEAD) ---
  {
    id: 'c-14-snake',
    squareId: 14,
    title: 'DEBUGGING SNAKE: Variable Scope Shadowing Trap',
    topic: 'Functions & Scope',
    subtopic: 'Lexical Scope & Mutation',
    skillCategory: 'debugging',
    difficulty: 'medium',
    type: 'find_bug',
    prompt: 'AVOID THE SNAKE! A programmer wrote a helper function to process a batch of queries, but the outer loop only executes once instead of 10 times. Diagnose the bug to avoid sliding down to Square 7!',
    codeSnippet: `for (i = 0; i < 10; i++) {
  processBatch();
}
function processBatch() {
  for (i = 0; i < 5; i++) {
    // process item i
  }
}`,
    bugInfo: {
      line: 1,
      buggyCode: 'for (i = 0; ...',
      fixedCode: 'for (let i = 0; ...',
      errorCategory: 'off_by_one',
      explanation: 'Omitting let/var/const created an undeclared global variable i shared by both the outer loop and inner function!'
    },
    options: [
      'Variable i was declared globally without let or const, causing the helper function to overwrite the outer loop counter',
      'JavaScript does not support functions called inside for loops',
      'The loop condition should be i <= 10 instead of i < 10',
      'The inner loop should use while instead of for'
    ],
    correctOptionIndex: 0,
    hints: [
      'Look at how i is declared in both loops.',
      'Without let, i attaches to global window/global scope.'
    ],
    explanation: 'Because i was not declared with let/const, both loops mutated the same global variable i. When processBatch finished, i was set to 5, and subsequent loops rapidly corrupted termination. Declaring let i localizes scope.',
    tags: ['snake', 'debugging', 'scope', 'functions']
  },

  // --- SQUARE 19: Logic & Bitwise Ops (SNAKE HEAD) ---
  {
    id: 'c-19-snake',
    squareId: 19,
    title: 'DEBUGGING SNAKE: Bitwise Precedence Trap',
    topic: 'Bitwise',
    subtopic: 'Operator Precedence Pitfall',
    skillCategory: 'debugging',
    difficulty: 'medium',
    type: 'find_bug',
    prompt: 'AVOID THE SNAKE! The function is supposed to return true if num is even, but it returns false for all numbers! Find the bug or slide down to Square 11!',
    codeSnippet: `function isEven(num: number): boolean {
  return num & 1 === 0;
}`,
    bugInfo: {
      line: 2,
      buggyCode: 'return num & 1 === 0;',
      fixedCode: 'return (num & 1) === 0;',
      errorCategory: 'boundary_condition',
      explanation: 'Strict equality (===) has higher precedence than bitwise AND (&). (1 === 0) evaluates to false first!'
    },
    options: [
      'Operator === has higher precedence than &, so 1 === 0 is evaluated first to false, resulting in num & false (0)',
      'The bitwise operator & only works on negative numbers',
      'Even numbers have the least significant bit set to 1, not 0',
      'The return type should be number instead of boolean'
    ],
    correctOptionIndex: 0,
    hints: [
      'In JavaScript, C++, and Java, equality operators (==, ===) bind tighter than bitwise (&, |, ^).',
      'Check what 1 === 0 evaluates to.'
    ],
    explanation: 'Because === has higher precedence than &, num & 1 === 0 is evaluated as num & (1 === 0) -> num & false -> 0 (falsy). Wrapping in parentheses (num & 1) === 0 restores the intended evaluation order.',
    tags: ['snake', 'debugging', 'bitwise', 'operators']
  },

  // --- SQUARE 20: Checkpoint: Array Mastery ---
  {
    id: 'c-20-code',
    squareId: 20,
    title: 'Two-Pointer Array Reversal In-Place',
    topic: 'Array Checkpoint',
    subtopic: 'Two-Pointer Invariants',
    skillCategory: 'implementation',
    difficulty: 'medium',
    type: 'complete_code',
    codeSnippet: `function reverseInPlace(arr: number[]): void {
  let left = 0;
  let right = arr.length - 1;
  while (/* MISSING CONDITION */) {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }
}`,
    prompt: 'What is the correct missing condition in the while loop to reverse the array in-place without unnecessary double-swapping?',
    options: [
      'left < right',
      'left <= arr.length',
      'right >= 0',
      'left !== right'
    ],
    correctOptionIndex: 0,
    hints: [
      'When left and right meet in the middle (left === right), a single middle element does not need swapping with itself.',
      'If left crosses right, swapping again would undo the reversal!'
    ],
    explanation: 'The loop must run while left < right. Once left and right meet or cross, all pairs have been swapped exactly once in O(N/2) = O(N) time with O(1) auxiliary space.',
    tags: ['checkpoint', 'two-pointer', 'arrays', 'implementation']
  },
  {
    id: 'c-20-mcq',
    squareId: 20,
    title: 'Two-Pointer Complexity Guarantee',
    topic: 'Array Checkpoint',
    subtopic: 'Sliding Window & Converging Pointers',
    skillCategory: 'complexity',
    difficulty: 'easy',
    type: 'time_complexity',
    prompt: 'When two pointers start at opposite ends of an array of size N and move monotonically toward each other, what is the maximum number of pointer steps executed?',
    options: [
      'Exactly N steps, guaranteeing strict O(N) linear time',
      'N² steps because the pointers check every possible interval',
      'log N steps because the search space halves every comparison',
      '2ⁿ steps due to branching possibilities'
    ],
    correctOptionIndex: 0,
    hints: ['Each iteration increments left or decrements right, decreasing (right - left) by at least 1.'],
    explanation: 'Because each step decreases the distance between pointers by at least 1, the loop terminates after at most N steps, guaranteeing O(N) time complexity.',
    tags: ['two-pointer', 'complexity', 'arrays']
  },

  // --- SQUARE 36: Merge Sort (LADDER START) ---
  {
    id: 'c-36-opt',
    squareId: 36,
    title: 'Optimization Ladder: Quadratic to Divide-and-Conquer Sort',
    topic: 'Sorting',
    subtopic: 'Divide & Conquer Complexity Leap',
    skillCategory: 'optimization',
    difficulty: 'medium',
    type: 'optimize_algorithm',
    prompt: 'CLIMB THE LADDER! An algorithm currently sorts 1,000,000 records using Bubble Sort (taking over 15 minutes). Refactor this to guaranteed O(N log N) Merge Sort to leap from Square 36 to Square 46!',
    optimizationComparison: {
      bruteForce: {
        approachTitle: 'Bubble / Selection Sort',
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(1)',
        codeSnippet: `for (let i = 0; i < n; i++) {\n  for (let j = 0; j < n - i - 1; j++) {\n    if (arr[j] > arr[j + 1]) swap(j, j + 1);\n  }\n}`,
        explanation: 'Performs ~500,000,000,000 comparisons on 1,000,000 items, crashing servers.',
        isOptimal: false
      },
      optimal: {
        approachTitle: 'Recursive Merge Sort',
        timeComplexity: 'O(N log N)',
        spaceComplexity: 'O(N)',
        codeSnippet: `function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}`,
        explanation: 'Recursively divides array into halves (log N levels) and merges sorted halves in O(N) per level.',
        isOptimal: true
      },
      tradeOffSummary: 'Allocates O(N) auxiliary space during merge buffers to achieve guaranteed O(N log N) worst-case stability.',
      whyOptimalWorks: 'Halving the array recursively guarantees log2(N) levels of recursion. Merging two pre-sorted lists at each level takes linear O(N) time, producing total O(N log N) work.'
    },
    options: [
      'Divide the array into halves recursively (log N levels) and merge them in linear O(N) time per level, achieving O(N log N)',
      'Run Selection Sort backwards to take advantage of branch prediction',
      'Use nested while loops to repeat bubble sort until no swaps occur',
      'Convert all numbers to strings and sort lexicographically in O(1)'
    ],
    correctOptionIndex: 0,
    hints: [
      'Think about how recurrence relation T(N) = 2T(N/2) + O(N) solves.',
      'Master theorem states this gives O(N log N).'
    ],
    explanation: 'Merge sort splits the array into two halves, sorts each recursively, and merges the results in O(N). Because the tree has log2(N) levels and each level processes N elements total, runtime is strictly O(N log N), leaping to Square 46!',
    tags: ['ladder', 'sorting', 'divide-and-conquer', 'optimization']
  },

  // --- SQUARE 37: Binary Search ---
  {
    id: 'c-37-code',
    squareId: 37,
    title: 'Binary Search Implementation Invariant',
    topic: 'Searching',
    subtopic: 'Boundary Pointer Updates',
    skillCategory: 'implementation',
    difficulty: 'easy',
    type: 'complete_code',
    codeSnippet: `function binarySearch(arr: number[], target: number): number {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) {
      /* LINE A */
    } else {
      /* LINE B */
    }
  }
  return -1;
}`,
    prompt: 'What are the correct statements for LINE A and LINE B to guarantee logarithmic convergence and avoid infinite loops?',
    options: [
      'LINE A: low = mid + 1; LINE B: high = mid - 1;',
      'LINE A: low = mid; LINE B: high = mid;',
      'LINE A: low = high - 1; LINE B: high = low + 1;',
      'LINE A: high = mid + 1; LINE B: low = mid - 1;'
    ],
    correctOptionIndex: 0,
    hints: [
      'Since arr[mid] is strictly not the target, we can safely exclude mid from future search intervals.',
      'Setting low = mid can cause an infinite loop when low + 1 === high.'
    ],
    explanation: 'Because arr[mid] was already compared and found unequal to target, we exclude mid by advancing low = mid + 1 or high = mid - 1. This guarantees the search window shrinks every step.',
    tags: ['binary-search', 'invariants', 'implementation']
  },

  // --- SQUARE 50: Mid-Term Prep (SNAKE HEAD) ---
  {
    id: 'c-50-snake',
    squareId: 50,
    title: 'DEBUGGING SNAKE: Off-By-One Array Boundary Crash',
    topic: 'Mid-Term Milestone',
    subtopic: 'Boundary Index Violations',
    skillCategory: 'debugging',
    difficulty: 'hard',
    type: 'find_bug',
    prompt: 'AVOID THE SNAKE! A developer wrote a function to check if an array is strictly sorted. On test cases it crashes with IndexOutOfBoundsException. Diagnose the bug to avoid dropping to Square 42!',
    codeSnippet: `function isSorted(arr: number[]): boolean {
  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }
  return true;
}`,
    bugInfo: {
      line: 2,
      buggyCode: 'for (let i = 0; i <= arr.length; i++)',
      fixedCode: 'for (let i = 0; i < arr.length - 1; i++)',
      errorCategory: 'boundary_condition',
      explanation: 'When i = arr.length - 1, arr[i + 1] accesses arr[arr.length], which is undefined / out of bounds! Loop must terminate at i < arr.length - 1.'
    },
    options: [
      'Loop condition i <= arr.length causes arr[i + 1] to access out-of-bounds indices when i reaches or exceeds arr.length - 1',
      'Arrays in JavaScript cannot store negative numbers',
      'Return true must be placed inside the for loop',
      'The comparison > should be replaced with !='
    ],
    correctOptionIndex: 0,
    hints: [
      'What happens when i is at the last valid index (arr.length - 1)?',
      'arr[arr.length - 1 + 1] looks up arr[arr.length] which does not exist!'
    ],
    explanation: 'Because the comparison inspects arr[i + 1], the loop index i can only safely go up to arr.length - 2. Testing i <= arr.length causes two out-of-bounds reads (at arr.length and arr.length + 1), causing undefined crashes.',
    tags: ['snake', 'debugging', 'off-by-one', 'boundary']
  },

  // --- SQUARE 54: Greedy (Problems - LADDER START) ---
  {
    id: 'c-54-opt',
    squareId: 54,
    title: 'Optimization Ladder: Interval Scheduling Greedy Choice',
    topic: 'Greedy',
    subtopic: 'Earliest Deadline First Invariant',
    skillCategory: 'optimization',
    difficulty: 'medium',
    type: 'optimize_algorithm',
    prompt: 'CLIMB THE LADDER! You are given N meeting intervals [start, end]. The brute-force solution checks all 2ᴺ subsets to find the maximum non-overlapping set. Refactor this to an optimal greedy strategy to leap from Square 54 to Square 67!',
    optimizationComparison: {
      bruteForce: {
        approachTitle: 'Exponential Subset Enumeration',
        timeComplexity: 'O(2ᴺ)',
        spaceComplexity: 'O(N)',
        codeSnippet: `function maxIntervals(intervals) {\n  // Generates all 2^N combinations and validates non-overlap\n}`,
        explanation: 'Generates 2ᴺ subsets, impossible for N > 30.',
        isOptimal: false
      },
      optimal: {
        approachTitle: 'Earliest Finish Time Greedy Sort',
        timeComplexity: 'O(N log N)',
        spaceComplexity: 'O(1)',
        codeSnippet: `intervals.sort((a, b) => a.end - b.end);\nlet count = 0, lastEnd = -Infinity;\nfor (const [start, end] of intervals) {\n  if (start >= lastEnd) {\n    count++;\n    lastEnd = end;\n  }\n}`,
        explanation: 'Sorting by earliest finish time leaves the maximum possible remaining time for future intervals.',
        isOptimal: true
      },
      tradeOffSummary: 'Sorts intervals in O(N log N) once; then makes greedy selections in a single O(N) pass with O(1) extra space.',
      whyOptimalWorks: 'Picking the interval that finishes earliest frees up resource capacity as soon as possible, leaving maximum remaining time for subsequent intervals (Greedy Stays Ahead argument).'
    },
    options: [
      'Sort intervals by end time (earliest finish first) and greedily select each compatible interval in O(N log N)',
      'Sort intervals by start time and pick the longest interval first',
      'Run Dijkstra algorithm treating intervals as weighted vertices in O(V²)',
      'Randomly sample intervals using Monte Carlo simulation'
    ],
    correctOptionIndex: 0,
    hints: [
      'Which interval leaves the most room for other meetings?',
      'The one that ends as early as possible!'
    ],
    explanation: 'By sorting by earliest finish time, each selected interval frees up the room as early as possible, maximizing subsequent opportunities. This slashes complexity from O(2ᴺ) to O(N log N), leaping from 54 to 67!',
    tags: ['ladder', 'greedy', 'intervals', 'optimization']
  },

  // --- SQUARE 63: Linked Lists Advanced (SNAKE HEAD) ---
  {
    id: 'c-63-snake',
    squareId: 63,
    title: 'DEBUGGING SNAKE: Severed Pointer Chain in List Reversal',
    topic: 'Linked Lists',
    subtopic: 'Pointer Overwrite Sequence Bug',
    skillCategory: 'debugging',
    difficulty: 'hard',
    type: 'find_bug',
    prompt: 'AVOID THE SNAKE! A developer attempted in-place linked list reversal, but after the first node, all remaining nodes in the list were lost from memory! Diagnose the pointer bug or slide down to Square 57!',
    codeSnippet: `function reverseList(head: ListNode | null): ListNode | null {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    curr.next = prev; // BUG HERE!
    prev = curr;
    curr = curr.next;
  }
  return prev;
}`,
    bugInfo: {
      line: 5,
      buggyCode: 'curr.next = prev; curr = curr.next;',
      fixedCode: 'const nextNode = curr.next; curr.next = prev; prev = curr; curr = nextNode;',
      errorCategory: 'null_pointer',
      explanation: 'Overwriting curr.next before saving the original reference to the rest of the list orphaned all subsequent nodes!'
    },
    options: [
      'curr.next was overwritten with prev before saving the reference to the next node, severing the rest of the list and causing an infinite loop / lost nodes',
      'Linked lists cannot be reversed without an auxiliary hash map',
      'The return statement should return head instead of prev',
      'curr should be initialized to head.next'
    ],
    correctOptionIndex: 0,
    hints: [
      'Trace what happens on line 5: curr.next is set to prev (null).',
      'Then line 7 does curr = curr.next (which is now null!).'
    ],
    explanation: 'By mutating curr.next before saving the pointer to nextNode, the reference to the rest of the list is permanently lost, causing curr to immediately become null or loop. Storing const next = curr.next first prevents pointer severing.',
    tags: ['snake', 'debugging', 'linked-list', 'pointers']
  },

  // --- SQUARE 71: Interview Prep (LADDER START) ---
  {
    id: 'c-71-opt',
    squareId: 71,
    title: 'Optimization Ladder: State-Space Minimax Alpha-Beta Pruning',
    topic: 'Interview Strategy',
    subtopic: 'Game Tree Branch Elimination',
    skillCategory: 'optimization',
    difficulty: 'hard',
    type: 'optimize_algorithm',
    prompt: 'CLIMB THE LADDER! An adversarial search bot evaluates a game tree of branching factor B=30 and depth D=10. Plain Minimax explores Bᴰ = 30¹⁰ positions (impossible). Refactor with Alpha-Beta Pruning to leap from Square 71 to Square 88!',
    optimizationComparison: {
      bruteForce: {
        approachTitle: 'Full Minimax Game Tree Exploration',
        timeComplexity: 'O(Bᴰ)',
        spaceComplexity: 'O(D)',
        codeSnippet: `function minimax(node, depth, isMaximizing) {\n  if (depth === 0) return evaluate(node);\n  // Visits all B^D leaf nodes unconditionally\n}`,
        explanation: 'Explores every leaf node even when earlier sister branches have already proven the move inferior.',
        isOptimal: false
      },
      optimal: {
        approachTitle: 'Minimax with Alpha-Beta Pruning',
        timeComplexity: 'O(B^(D/2)) in best case',
        spaceComplexity: 'O(D)',
        codeSnippet: `function alphabeta(node, depth, alpha, beta, isMax) {\n  if (depth === 0) return eval(node);\n  if (isMax) {\n    for (child of node) {\n      alpha = Math.max(alpha, alphabeta(child, depth-1, alpha, beta, false));\n      if (beta <= alpha) break; // Beta cut-off pruning!\n    }\n    return alpha;\n  }\n  // Symmetric minimizing logic\n}`,
        explanation: 'Maintains alpha (max guaranteed score) and beta (min guaranteed score), pruning branches when beta <= alpha.',
        isOptimal: true
      },
      tradeOffSummary: 'Cuts search complexity from O(Bᴰ) down to O(B^(D/2)), effectively doubling the search depth within identical CPU budget.',
      whyOptimalWorks: 'If the opponent already has a move that limits our score to beta, and our current branch can already score alpha (with alpha >= beta), the opponent will never allow this branch to be reached. It can be safely pruned.'
    },
    options: [
      'Maintain alpha and beta bounds to prune subtrees that cannot influence the final root decision, cutting search time to O(B^(D/2))',
      'Replace game trees with Dijkstra shortest path on an adjacency matrix',
      'Use random number generation to guess the opponent move in O(1)',
      'Convert the minimax tree into a singly linked list'
    ],
    correctOptionIndex: 0,
    hints: [
      'Think about when you know a move is already worse than an alternative you already discovered.',
      'Alpha represents the minimum score the maximizing player is assured of.'
    ],
    explanation: 'Alpha-Beta pruning discards subtrees that cannot possibly affect the final minimax decision. In the best ordering, it reduces search complexity to O(B^(D/2)), leaping from Square 71 to Square 88!',
    tags: ['ladder', 'game-theory', 'minimax', 'optimization']
  },

  // --- SQUARE 82: Disjoint Set (LADDER START) ---
  {
    id: 'c-82-opt',
    squareId: 82,
    title: 'Optimization Ladder: Naive Connectivity to Union-Find with Path Compression',
    topic: 'Disjoint Sets',
    subtopic: 'Inverse Ackermann Amortized Leap',
    skillCategory: 'optimization',
    difficulty: 'medium',
    type: 'optimize_algorithm',
    prompt: 'CLIMB THE LADDER! A network connectivity tracker runs DFS across all vertices on every edge query, costing O(V + E) per check. Refactor with Disjoint Set Union (Path Compression + Union by Rank) to leap from Square 82 to Square 92!',
    optimizationComparison: {
      bruteForce: {
        approachTitle: 'Per-Query DFS / BFS Path Search',
        timeComplexity: 'O(Q × (V + E))',
        spaceComplexity: 'O(V + E)',
        codeSnippet: `function isConnected(u, v) {\n  const visited = new Set();\n  return dfs(u, v, visited);\n}`,
        explanation: 'Re-traverses graph edges repeatedly for every query.',
        isOptimal: false
      },
      optimal: {
        approachTitle: 'Union-Find with Path Compression & Rank',
        timeComplexity: 'O(Q × α(V)) ≈ O(Q)',
        spaceComplexity: 'O(V)',
        codeSnippet: `function find(i) {\n  if (parent[i] === i) return i;\n  return parent[i] = find(parent[i]); // Path compression!\n}\nfunction union(i, j) {\n  const rootI = find(i), rootJ = find(j);\n  if (rootI !== rootJ) parent[rootI] = rootJ;\n}`,
        explanation: 'Path compression flattens the tree during find, while union by rank keeps depth minimal.',
        isOptimal: true
      },
      tradeOffSummary: 'Reduces per-query cost from O(V + E) down to inverse Ackermann α(V) ≤ 4, which is effectively O(1) in the real universe.',
      whyOptimalWorks: 'Path compression links every node directly to the component root during traversal. This flattens trees so subsequent queries complete in almost instantaneous constant time.'
    },
    options: [
      'Implement Disjoint-Set Union with Path Compression and Union by Rank to achieve O(α(V)) ≈ O(1) amortized queries',
      'Compute all-pairs shortest paths using Floyd-Warshall in O(V³)',
      'Store all paths as strings in a 2D array and compare string equality',
      'Sort vertices alphabetically before every lookup'
    ],
    correctOptionIndex: 0,
    hints: [
      'Path compression sets parent[x] = find(parent[x]).',
      'Alpha is the inverse Ackermann function, less than 5 for all practical inputs.'
    ],
    explanation: 'Union-Find with path compression flattens component trees during every lookup, reducing query time to near O(1) amortized (O(α(N))). This allows instant Kruskal MST cycle detection and leaps to Square 92!',
    tags: ['ladder', 'disjoint-set', 'union-find', 'graphs', 'optimization']
  },

  // --- SQUARE 96: Advanced Trees (SNAKE HEAD) ---
  {
    id: 'c-96-snake',
    squareId: 96,
    title: 'DEBUGGING SNAKE: Skewed Tree Recursion Stack Overflow',
    topic: 'Advanced Trees',
    subtopic: 'Unbalanced Tree Degeneracy',
    skillCategory: 'debugging',
    difficulty: 'hard',
    type: 'find_bug',
    prompt: 'AVOID THE FINAL SNAKE! A tree height function worked flawlessly in unit tests with 50 nodes. In production with 100,000 sequentially inserted nodes, it crashed with "Maximum call stack size exceeded". Diagnose the issue to avoid sliding down to Square 85!',
    codeSnippet: `function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
    bugInfo: {
      line: 3,
      buggyCode: 'return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));',
      fixedCode: '// Balanced tree or iterative Morris / BFS queue traversal',
      errorCategory: 'missing_base_case',
      explanation: 'Sequential insertion without self-balancing (AVL/Red-Black) degenerates the tree into a linked list of depth N = 100,000, exhausting recursion stack limits.'
    },
    options: [
      'Inserting sequential values into an un-balanced BST creates a degenerate tree of height N (a linked list), exceeding the execution stack depth limit of ~10,000 frames',
      'The base case should return -1 instead of 0',
      'Math.max does not accept negative integers',
      'TreeNode objects cannot be passed recursively in TypeScript'
    ],
    correctOptionIndex: 0,
    hints: [
      'What shape does a BST take if you insert 1, 2, 3, 4, 5... in increasing order?',
      'It becomes a single long branch with depth equal to N.'
    ],
    explanation: 'When values are inserted in sorted order, an ordinary BST degenerates into a linear chain of depth N. A 100,000-deep recursion crashes the call stack (~10,000 frame limit). Balanced trees (AVL, Red-Black) or iterative BFS/Morris traversal guarantee safety.',
    tags: ['snake', 'debugging', 'trees', 'stack-overflow']
  },

  // --- SQUARE 100: Final Mastery ---
  {
    id: 'c-100-opt',
    squareId: 100,
    title: 'Grandmaster Synthesis: Optimal Algorithm Selection',
    topic: 'Comprehensive Mastery',
    subtopic: 'Final Graduation Challenge',
    skillCategory: 'optimization',
    difficulty: 'hard',
    type: 'compare_approaches',
    prompt: 'FINAL MASTERY ASSESSMENT: You need to find the shortest path between all pairs of nodes in a dense graph with N = 400 nodes and non-negative edge weights. Which approach provides the optimal balance of implementation simplicity, memory efficiency, and asymptotic performance?',
    options: [
      'Floyd-Warshall algorithm: O(V³) time with O(V²) memory using clean triple nested loops, running in ~64M ops (under 100ms)',
      'Bellman-Ford run V times: O(V²E) which takes over 10 seconds and requires heavy edge list parsing',
      'Generate all simple paths using Backtracking in O(V!) time',
      'Run BFS from each node, which fails to account for varying edge weights'
    ],
    correctOptionIndex: 0,
    hints: [
      'Dense graph means E ≈ V² ≈ 160,000.',
      'V = 400 means V³ = 64,000,000 operations, which runs well within standard 1-second limits.'
    ],
    explanation: 'For dense graphs where V ≤ 400, Floyd-Warshall executes in O(V³) = 6.4 × 10⁷ simple arithmetic ops in cache-friendly 2D arrays, making it faster and far simpler than running Dijkstra V times with priority queue overhead. Congratulations on mastering Code & Ladders!',
    tags: ['mastery', 'finish', 'floyd-warshall', 'interview-ready']
  },
  {
    id: 'c-100-mcq',
    squareId: 100,
    title: 'Code & Ladders Grandmaster Graduation',
    topic: 'Comprehensive Mastery',
    subtopic: 'DSA Grandmaster Invariants',
    skillCategory: 'conceptual',
    difficulty: 'hard',
    type: 'conceptual_mcq',
    prompt: 'You have conquered 100 squares of Data Structures & Algorithms. What is the fundamental principle of engineering trade-offs when optimizing production systems?',
    options: [
      'No single data structure is globally optimal; optimal architecture balances read vs write frequencies, memory constraints, latency bounds, and code maintainability',
      'Always pick the most complex data structure because compilers will figure out the rest',
      'Premature micro-optimization is better than algorithmic correctness',
      'All problems should be solved using brute-force loops because RAM is cheap'
    ],
    correctOptionIndex: 0,
    hints: ['Think about the balance between time, space, correctness, and simplicity.'],
    explanation: 'True DSA mastery is recognizing trade-offs: when to use a hash table (fast reads, high memory), a B-tree (disk caching), a heap (streaming extremes), or dynamic programming. You have completed Code & Ladders!',
    tags: ['mastery', 'graduation', 'tradeoffs']
  }
];

// Combine all 100 curriculum challenges with base challenges
export const CHALLENGES: Challenge[] = [
  ...ALL_CURRICULUM_CHALLENGES,
  ...BASE_CHALLENGES.filter(bc => !ALL_CURRICULUM_CHALLENGES.some(ac => ac.id === bc.id))
];

// Helper to retrieve challenge by ID
export const CHALLENGE_MAP = new Map<string, Challenge>();
CHALLENGES.forEach(c => CHALLENGE_MAP.set(c.id, c));

// Challenge Registry & Anti-Repetition Engine
export class ChallengeRegistry {
  private attemptedIds: Set<string> = new Set();
  private squareAttemptHistory: Map<number, string[]> = new Map();

  constructor(attemptedIds?: string[]) {
    if (attemptedIds) {
      attemptedIds.forEach(id => this.attemptedIds.add(id));
    }
  }

  public markAttempted(challengeId: string, squareId: number) {
    this.attemptedIds.add(challengeId);
    const existing = this.squareAttemptHistory.get(squareId) || [];
    existing.push(challengeId);
    this.squareAttemptHistory.set(squareId, existing);
  }

  public getChallengeForSquare(squareId: number, allowRevision: boolean = true, difficultyMode: string = 'intermediate'): Challenge {
    // 1. Direct specific challenges for square
    let candidates = CHALLENGES.filter(c => c.squareId === squareId);
    
    if (candidates.length > 0) {
      // If difficulty mode specified, prefer matching difficulty
      if (difficultyMode === 'beginner') {
        const easyMed = candidates.filter(c => c.difficulty === 'easy' || c.difficulty === 'medium');
        if (easyMed.length > 0) candidates = easyMed;
      } else if (difficultyMode === 'interview_ready') {
        const hardExp = candidates.filter(c => c.difficulty === 'hard' || c.difficulty === 'expert');
        if (hardExp.length > 0) candidates = hardExp;
      }

      // Find unattempted
      const unattempted = candidates.filter(c => !this.attemptedIds.has(c.id));
      if (unattempted.length > 0) {
        return unattempted[0];
      }
      if (allowRevision) {
        return candidates[0]; // Interleaved revision
      }
    }

    // 2. Synthesize fallback tailored challenge for this square's topic if ever needed
    return this.synthesizeSquareChallenge(squareId);
  }

  public synthesizeSquareChallenge(squareId: number): Challenge {
    // Check if challenge already in map
    const existing = CHALLENGE_MAP.get(`gen-${squareId}`);
    if (existing) return existing;

    // Generate deterministic high-quality challenge based on square topic
    const synth: Challenge = {
      id: `gen-${squareId}`,
      squareId,
      title: `Challenge: Square ${squareId} Mastery`,
      topic: 'Algorithm Invariants',
      subtopic: 'Efficiency & Correctness',
      skillCategory: 'conceptual',
      difficulty: squareId <= 30 ? 'easy' : squareId <= 70 ? 'medium' : 'hard',
      type: 'conceptual_mcq',
      prompt: `For the concept taught on Square ${squareId}, which algorithmic strategy maintains correctness while guaranteeing optimal asymptotic performance?`,
      options: [
        'Establish clear state invariants, verify termination conditions, and analyze time/space complexity',
        'Execute nested loops over all permutations without bounds checking',
        'Store all temporary states in global variables without encapsulation',
        'Disable compiler type checking to speed up iteration'
      ],
      correctOptionIndex: 0,
      hints: [
        'Think about the foundational invariants of this data structure.',
        'Correctness and termination proofs precede optimization.'
      ],
      explanation: `To master Square ${squareId}, maintaining explicit invariants and bounding resource complexity ensures reliable solutions across all edge cases.`,
      tags: ['curriculum', 'mastery', `square-${squareId}`]
    };

    CHALLENGE_MAP.set(synth.id, synth);
    return synth;
  }
}
