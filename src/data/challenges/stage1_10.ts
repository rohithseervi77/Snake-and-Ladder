import { Challenge } from '../../types/challenge';

export const STAGE_1_10_CHALLENGES: Challenge[] = [
  {
    id: 'c-1-arrays',
    squareId: 1,
    title: 'Array Memory Invariant',
    topic: 'Arrays',
    subtopic: 'Contiguous Memory & Random Access',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'In low-level systems, why does accessing array element arr[i] take strictly O(1) constant time regardless of array size?',
    options: [
      'The CPU computes the exact memory address in one operation via base_address + (i * element_size)',
      'The operating system searches for index i using an internal binary search tree',
      'The CPU loads all previous elements (0 to i-1) in parallel before returning arr[i]',
      'Arrays are dynamically linked in RAM via hardware pointer registers'
    ],
    correctOptionIndex: 0,
    hints: [
      'Think about how RAM memory cells are physically addressed.',
      'Remember that array elements are laid out back-to-back in a contiguous block.',
      'Pointer arithmetic allows direct index multiplication: Base + i * Size.'
    ],
    explanation: 'Arrays allocate contiguous memory blocks. Element arr[i] resides at base_address + i * sizeof(type). A single addition and multiplication allows the CPU memory controller to jump directly to the target byte in O(1) time.',
    learningObjective: 'Understand contiguous memory allocation and why random indexing is O(1).',
    commonMistake: 'Confusing array index arithmetic with linked list sequential pointer traversal.',
    tags: ['arrays', 'memory', 'complexity', 'foundations']
  },
  {
    id: 'c-2-functions',
    squareId: 2,
    title: 'Call Stack & Stack Frames',
    topic: 'Functions',
    subtopic: 'Activation Records & Stack Memory',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'When function A() calls function B(), how does the runtime manage local variables and execution resumption?',
    options: [
      'It pushes a new activation record (stack frame) for B() onto the call stack and restores A() upon return',
      'It overwrites A()\'s variables with B()\'s variables in global heap memory',
      'It spawns a background operating system thread for every function call',
      'It converts both functions into static machine arrays before execution'
    ],
    correctOptionIndex: 0,
    hints: [
      'Think about LIFO (Last-In, First-Out) memory structures.',
      'When B() finishes, which function should resume execution?',
      'The call stack preserves return addresses and local variable scopes.'
    ],
    explanation: 'Function invocations use the runtime call stack. Calling B() pushes its frame containing parameters, local variables, and return address. When B() returns, its frame is popped, restoring A()\'s execution context.',
    learningObjective: 'Master call stack mechanics, stack frames, and local scope isolation.',
    commonMistake: 'Thinking local function variables persist globally across multiple calls.',
    tags: ['functions', 'call-stack', 'memory']
  },
  {
    id: 'c-3-loops',
    squareId: 3,
    title: 'Loop Termination Invariants',
    topic: 'Loops',
    subtopic: 'Iteration Bounds & Guard Conditions',
    skillCategory: 'debugging',
    difficulty: 'easy',
    type: 'find_bug',
    prompt: 'Analyze this loop intended to process elements from N-1 down to 0:\n\nfor (unsigned int i = n - 1; i >= 0; i--) {\n  process(arr[i]);\n}\n\nWhy does this code cause a fatal bug in languages like C/C++?',
    options: [
      'An unsigned int can never be negative; when i is 0, i-- underflows to 4,294,967,295, creating an infinite loop',
      'The loop condition i >= 0 fails to process the element at index 0',
      'Unsigned integers cannot be used as array indices',
      'The variable n is decremented automatically during each iteration'
    ],
    correctOptionIndex: 0,
    hints: [
      'Notice the data type of the loop variable: unsigned int.',
      'What happens when an unsigned 0 is decremented by 1?',
      'Unsigned numbers wrap around to their maximum value (2^32 - 1).'
    ],
    explanation: 'Unsigned integers are strictly non-negative (>= 0 is always true!). When i = 0, i-- underflows to 2^32 - 1, causing an out-of-bounds segfault or infinite loop. Loop counters with descending bounds should use signed types or while (i > 0).',
    learningObjective: 'Identify unsigned type underflow traps in descending loops.',
    commonMistake: 'Using unsigned integers for countdown loops that terminate at zero.',
    tags: ['loops', 'debugging', 'underflow']
  },
  {
    id: 'c-4-conditionals',
    squareId: 4,
    title: 'Short-Circuit Evaluation Defense',
    topic: 'Conditionals',
    subtopic: 'Boolean Short-Circuiting & Null Guards',
    skillCategory: 'implementation',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'In expressions like if (ptr != null && ptr.val == target), why is the order of conditions critical to preventing runtime crashes?',
    options: [
      'Logical AND (&&) short-circuits: if ptr != null is false, the right operand is never evaluated, guarding against null pointer dereference',
      'Logical AND evaluates right-to-left in modern compilers',
      'The compiler executes both sides in separate hardware registers concurrently',
      'The equality check (==) has higher operator precedence than logical AND'
    ],
    correctOptionIndex: 0,
    hints: [
      'What happens if ptr is null and you attempt to access ptr.val?',
      'Short-circuit evaluation skips evaluating subsequent operands once the outcome is decided.',
      'Left-hand guards protect right-hand property dereferences.'
    ],
    explanation: 'Short-circuit evaluation guarantees that if the left operand of && is false, evaluation halts immediately. Placing the null check first guarantees ptr.val is never evaluated when ptr is null, eliminating null-pointer exceptions.',
    learningObjective: 'Use boolean short-circuit evaluation for defensive null guarding.',
    commonMistake: 'Placing the property access before the null check (e.g. ptr.val == 5 && ptr != null).',
    tags: ['conditionals', 'null-safety', 'short-circuit']
  },
  {
    id: 'c-5-strings',
    squareId: 5,
    title: 'String Immutability & StringBuilder',
    topic: 'Strings',
    subtopic: 'Heap Allocation & Quadratic Concatenation',
    skillCategory: 'optimization',
    difficulty: 'easy',
    type: 'time_complexity',
    prompt: 'In languages with immutable strings (Java, JavaScript, Python), what is the time complexity of repeatedly concatenating a character inside an N-iteration loop: s += char?',
    options: [
      'O(N²) because each concatenation allocates a new string copy of growing length 1 + 2 + ... + N',
      'O(N) because characters are appended directly to the end of the existing memory buffer in O(1)',
      'O(1) because modern runtimes optimize strings into circular queues automatically',
      'O(N log N) because strings are re-balanced using rope trees on every append'
    ],
    correctOptionIndex: 0,
    hints: [
      'Remember that immutable means the existing string memory can never be altered.',
      'Appending creates a brand new string copy each time: 1 + 2 + 3 + ... + N bytes.',
      'The sum of 1 to N is N(N+1)/2, which is O(N²).'
    ],
    explanation: 'Immutable strings cannot be modified in place. Concatenating a character copies the entire existing string into a newly allocated buffer. Over N iterations, copying 1 + 2 + ... + N bytes takes O(N²) time. Use StringBuilder or array joins for linear O(N) performance.',
    learningObjective: 'Recognize hidden O(N²) quadratic overhead in string concatenation.',
    commonMistake: 'Assuming string += char operates in constant O(1) amortized time.',
    tags: ['strings', 'immutability', 'optimization']
  },
  {
    id: 'c-6-io',
    squareId: 6,
    title: 'Fast I/O & Buffer Streaming',
    topic: 'I/O',
    subtopic: 'Stream Buffering & System Call Overhead',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'Why does reading 100,000 integers using unbuffered I/O (like std::cin without sync_with_stdio(false) or single-byte reads) frequently cause Time Limit Exceeded (TLE)?',
    options: [
      'Every unbuffered read triggers an expensive operating system kernel context switch; buffering aggregates thousands of bytes per system call',
      'Input streams must encrypt each byte before transferring it to the user space buffer',
      'Unbuffered streams execute a linear search across the entire input file for every number',
      'Hard disks can only read numbers smaller than 256 without hardware decompression'
    ],
    correctOptionIndex: 0,
    hints: [
      'Think about the cost of switching between user mode and OS kernel mode.',
      'System calls are orders of magnitude slower than CPU memory operations.',
      'A buffer reads large chunks of data once and serves subsequent requests from memory.'
    ],
    explanation: 'System calls require kernel context switches, which take thousands of CPU cycles. Unbuffered reads call the kernel for individual bytes. Buffered I/O reads 4KB-64KB chunks into memory at once, reducing system calls by orders of magnitude.',
    learningObjective: 'Understand how I/O buffering minimizes kernel context switch penalties.',
    commonMistake: 'Blaming algorithm time complexity when slow I/O is the true bottleneck.',
    tags: ['io', 'buffering', 'performance']
  },
  {
    id: 'c-7-types',
    squareId: 7,
    title: 'Integer Overflow & Bit Limits',
    topic: 'Data Types',
    subtopic: '32-Bit Signed Integer Boundaries',
    skillCategory: 'debugging',
    difficulty: 'easy',
    type: 'output_prediction',
    codeSnippet: `let low = 2_000_000_000;\nlet high = 2_000_000_000;\n// In 32-bit signed integers (max: 2,147,483,647):\nlet mid = (low + high) / 2;`,
    prompt: 'In languages using 32-bit signed arithmetic (like C++/Java), why does let mid = (low + high) / 2 produce a negative number in binary search?',
    options: [
      'low + high equals 4,000,000,000, exceeding 2³¹ - 1 and wrapping to a negative integer before division',
      'Division by 2 inverts the sign bit of integers greater than 1 billion',
      'Binary search cannot calculate midpoints using addition',
      'The CPU switches to floating point notation and truncates the integer bits'
    ],
    correctOptionIndex: 0,
    hints: [
      'Maximum value of a 32-bit signed integer is 2,147,483,647.',
      'What is 2,000,000,000 + 2,000,000,000?',
      'Use mid = low + (high - low) / 2 to avoid overflow.'
    ],
    explanation: 'In 32-bit signed integers, max value is 2³¹ - 1 (≈ 2.14B). Summing 2B + 2B = 4B overflows the sign bit, wrapping to negative values. The safe idiom is mid = low + (high - low) / 2, which guarantees no sum exceeds high.',
    learningObjective: 'Prevent arithmetic overflow bugs in midpoint and sum calculations.',
    commonMistake: 'Writing (left + right) / 2 instead of left + (right - left) / 2.',
    tags: ['data-types', 'overflow', 'binary-search']
  },
  {
    id: 'c-8-operators',
    squareId: 8,
    title: 'Bitwise vs Logical Operators',
    topic: 'Operators',
    subtopic: 'Bitwise Masks & Logical Evaluation',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'What is the crucial difference between the bitwise AND operator (&) and the logical AND operator (&&)?',
    options: [
      '& computes bit-by-bit conjunction across all binary digits without short-circuiting; && evaluates boolean truth values and short-circuits',
      '& is only used for pointers while && is used for numeric addition',
      '&& reverses the order of bits while & shifts bits left by 1',
      'There is no difference; modern compilers treat them as interchangeable aliases'
    ],
    correctOptionIndex: 0,
    hints: [
      'Consider: 5 & 3 vs 5 && 3.',
      '5 is 101 in binary, 3 is 011 in binary: 101 & 011 = 001 (1).',
      '&& checks whether expressions are truthy and aborts early if false.'
    ],
    explanation: 'Bitwise & operates on individual bits of integer operands (e.g. 6 & 3 = 110 & 011 = 010 = 2) and always evaluates both sides. Logical && tests boolean conditions, returns true/false, and short-circuits if the left operand is false.',
    learningObjective: 'Distinguish bitwise manipulation from logical boolean control flow.',
    commonMistake: 'Accidentally typing & instead of && in conditional if statements.',
    tags: ['operators', 'bitwise', 'boolean']
  },
  {
    id: 'c-9-algorithms',
    squareId: 9,
    title: 'Asymptotic Growth Orders',
    topic: 'Algorithms',
    subtopic: 'Big-O Hierarchy & Scaling',
    skillCategory: 'complexity',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'Which of the following correctly orders standard algorithmic complexities from fastest growing (slowest execution) to slowest growing (fastest execution) for large N?',
    options: [
      'O(N!) > O(2ⁿ) > O(N²) > O(N log N) > O(N) > O(log N) > O(1)',
      'O(1) > O(N) > O(N log N) > O(N²) > O(2ⁿ) > O(N!)',
      'O(N²) > O(N log N) > O(N!) > O(2ⁿ) > O(log N) > O(1)',
      'O(log N) > O(N) > O(N²) > O(N log N) > O(2ⁿ) > O(N!)'
    ],
    correctOptionIndex: 0,
    hints: [
      'Think about an input size of N = 100: what function explodes fastest?',
      'Factorial N! grows faster than any exponential 2ⁿ.',
      'Logarithmic O(log N) and constant O(1) are the most scalable.'
    ],
    explanation: 'For large inputs, O(N!) (factorial) is the slowest feasible algorithm, followed by exponential O(2ⁿ), polynomial O(N²), linearithmic O(N log N), linear O(N), logarithmic O(log N), and constant O(1).',
    learningObjective: 'Master the Big-O asymptotic complexity hierarchy.',
    commonMistake: 'Thinking O(N log N) is slower than O(N²).',
    tags: ['complexity', 'big-o', 'foundations']
  },
  {
    id: 'c-10-opt',
    squareId: 10,
    title: 'Two-Sum: O(N²) Brute Force to O(N) Hash Map',
    topic: 'Arrays',
    subtopic: 'Optimization Ladder: Space-Time Tradeoff',
    skillCategory: 'optimization',
    difficulty: 'easy',
    type: 'optimize_algorithm',
    prompt: 'Given an array arr of size N, we must find two numbers that sum to Target T. Brute force uses nested loops in O(N²) time. How do we optimize this to O(N)?',
    options: [
      'Store each visited element in a Hash Map; for each element x, check if complement (T - x) exists in O(1) lookup time',
      'Run binary search on the unsorted array for each element in O(N log N)',
      'Recursively split the array into halves until single elements remain in O(log N)',
      'Compute the sum of all elements and divide by 2 in O(1)'
    ],
    correctOptionIndex: 0,
    hints: [
      'Instead of looking ahead through all remaining elements, look back at what you have already seen.',
      'If you need complement T - x, what data structure provides O(1) membership checks?',
      'A hash map trades O(N) auxiliary space to slash time from quadratic O(N²) to linear O(N).'
    ],
    explanation: 'By storing each number and its index in a hash map as we iterate, we can query whether target - arr[i] has already been seen in average O(1) time. This reduces the total runtime from O(N²) to O(N) with O(N) extra space.',
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
        codeSnippet: `const map = new Map();\nfor (let i = 0; i < n; i++) {\n  const diff = target - arr[i];\n  if (map.has(diff)) return [map.get(diff), i];\n  map.set(arr[i], i);\n}`,
        explanation: 'Trading O(N) memory gives instantaneous O(1) complement checks.',
        isOptimal: true
      },
      whyOptimalWorks: 'A single pass records elements in a hash map, trading O(N) auxiliary space to avoid nested quadratic scanning.',
      tradeOffSummary: 'Trades O(N) memory for O(N) linear time, replacing nested O(N²) scanning.'
    },
    learningObjective: 'Apply hash map complement lookups to optimize O(N²) search to O(N).',
    commonMistake: 'Sorting the array first when original indices must be preserved.',
    tags: ['arrays', 'hash-map', 'optimization', 'ladder']
  }
];
