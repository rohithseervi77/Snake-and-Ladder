import { Challenge } from '../../types/challenge';

export const STAGE_1_10_CHALLENGES: Challenge[] = [
  {
    id: 'q-1-algo-role',
    squareId: 1,
    co: 'CO1',
    title: 'Algorithm Definition & Role',
    topic: 'Mathematical Foundation',
    subtopic: 'Role of Algorithms in Computing',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'Which of the following is a mandatory characteristic of any valid algorithm?',
    options: [
      'It must terminate after a finite number of steps for any valid input',
      'It must be written in an object-oriented programming language',
      'It must run in linear O(n) time complexity',
      'It must use at most 1 MB of memory'
    ],
    correctOptionIndex: 0,
    hints: [
      'Think about the formal criteria for an algorithm vs an infinite loop.',
      'Finiteness is a fundamental requirement.'
    ],
    explanation: 'By formal definition, an algorithm must be well-defined, unambiguous, produce an output, and terminate after a finite number of steps for any valid input.',
    tags: ['algorithm', 'definition', 'finiteness']
  },
  {
    id: 'q-2-correctness',
    squareId: 2,
    co: 'CO1',
    title: 'Total vs Partial Correctness',
    topic: 'Mathematical Foundation',
    subtopic: 'Correctness & Proofs',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'What is the key difference between partial correctness and total correctness of an algorithm?',
    options: [
      'Partial correctness does not require the algorithm to terminate; total correctness requires termination and correct output',
      'Partial correctness applies to recursive functions; total correctness applies only to iterative loops',
      'Partial correctness means the code passes half the test cases in the lab',
      'Partial correctness applies to randomized algorithms only'
    ],
    correctOptionIndex: 0,
    hints: [
      'Consider what happens if an algorithm enters an infinite loop while computing.',
      'Total correctness = Partial correctness + Termination.'
    ],
    explanation: 'An algorithm is partially correct if it produces the correct output whenever it halts. It is totally correct if it is partially correct AND guaranteed to terminate.',
    tags: ['correctness', 'termination', 'proofs']
  },
  {
    id: 'q-3-tradeoff',
    squareId: 3,
    co: 'CO1',
    title: 'Time-Space Trade-off in Computing',
    topic: 'Mathematical Foundation',
    subtopic: 'Computational Resource Models',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'In competitive programming and software design, what does the classic "time-space trade-off" refer to?',
    options: [
      'Using extra auxiliary memory (space) to store precomputed data can reduce execution time',
      'Memory access is always faster than arithmetic register operations',
      'An algorithm that uses less memory always runs faster on all hardware',
      'Disk space must equal RAM space to prevent CPU throttling'
    ],
    correctOptionIndex: 0,
    hints: [
      'Think about lookup tables or frequency arrays.',
      'Extra storage often avoids recomputing values.'
    ],
    explanation: 'The time-space trade-off describes the relationship where an algorithm can achieve faster execution time by storing precomputed values or tables in extra memory.',
    tags: ['tradeoff', 'memory', 'time']
  },
  {
    id: 'q-4-instruction-count',
    squareId: 4,
    co: 'CO1',
    title: 'Instruction Counting in Loops',
    topic: 'Analysis Framework',
    subtopic: 'Instruction Counting Model',
    skillCategory: 'numerical',
    difficulty: 'easy',
    type: 'output_prediction',
    prompt: 'Consider this C snippet:\n\nint count = 0;\nfor (int i = 0; i < n; i++) {\n    count += 2;\n}\n\nHow many times does the addition `count += 2` execute?',
    options: ['n times', 'n + 1 times', '2n times', 'n - 1 times'],
    correctOptionIndex: 0,
    hints: [
      'The loop counter i starts at 0 and increments up to n - 1.',
      'Counting from 0 to n - 1 gives exactly n iterations.'
    ],
    explanation: 'The loop executes for i = 0, 1, 2, ..., n-1, which is exactly n iterations. Therefore, the body `count += 2` executes n times.',
    tags: ['loops', 'counting', 'instructions']
  },
  {
    id: 'q-5-case-analysis',
    squareId: 5,
    co: 'CO1',
    title: 'Worst vs Average Case Analysis',
    topic: 'Analysis Framework',
    subtopic: 'Input Distribution Analysis',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'Why do computer scientists prioritize worst-case time complexity over average-case in safety-critical systems?',
    options: [
      'Worst-case analysis provides an absolute upper bound guarantee that runtime will never exceed for any input',
      'Worst-case complexity is always easier to compute using simple integrals',
      'Average-case complexity is only defined for floating-point calculations',
      'Worst-case analysis assumes all array elements are negative numbers'
    ],
    correctOptionIndex: 0,
    hints: [
      'Consider what happens if an autonomous vehicle takes too long on an unexpected input.',
      'A guarantee holds for all possible inputs.'
    ],
    explanation: 'Worst-case analysis provides an upper bound guarantee for any input of size n, ensuring the system will not freeze or crash even under worst adversarial conditions.',
    tags: ['worst_case', 'guarantee', 'analysis']
  },
  {
    id: 'q-6-input-size',
    squareId: 6,
    co: 'CO1',
    title: 'Input Size Dominance',
    topic: 'Analysis Framework',
    subtopic: 'Characterizing Input Size n',
    skillCategory: 'complexity',
    difficulty: 'medium',
    type: 'time_complexity',
    prompt: 'An algorithm has an exact operation count of T(n) = 3n^2 + 1000n + 50000. For very large n (e.g., n = 1,000,000), which term contributes the vast majority of the total running time?',
    options: [
      'The 3n^2 term, because quadratic growth overwhelms linear and constant terms as n approaches infinity',
      'The 50000 constant term, because 50000 is the largest coefficient',
      'The 1000n term, because 1000 is larger than 3',
      'All three terms contribute equally regardless of n'
    ],
    correctOptionIndex: 0,
    hints: [
      'Substitute n = 1,000,000 into 3n^2 vs 1000n.',
      '3 * (10^6)^2 = 3 * 10^12 vs 1000 * 10^6 = 10^9.'
    ],
    explanation: 'For n = 10^6, 3n^2 is 3 * 10^12 operations (99.97% of the total), while 1000n is only 10^9 operations. The highest power term dominates asymptotic performance.',
    tags: ['dominance', 'polynomial', 'growth']
  },
  {
    id: 'q-7-loop-invariant',
    squareId: 7,
    co: 'CO1',
    title: 'Three Steps of Loop Invariants',
    topic: 'Analysis Framework',
    subtopic: 'Initialization, Maintenance & Termination',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'Proving algorithm correctness using a loop invariant requires establishing three properties. What are they?',
    options: [
      'Initialization, Maintenance, and Termination',
      'Input, Processing, and Output',
      'Base Case, Recursive Step, and Memory Deallocation',
      'Compilation, Execution, and Garbage Collection'
    ],
    correctOptionIndex: 0,
    hints: [
      'Think about mathematical induction.',
      'Check before the loop, during the loop, and when the loop terminates.'
    ],
    explanation: 'A loop invariant proof requires: 1) Initialization (true before first iteration), 2) Maintenance (if true before an iteration, remains true before next), and 3) Termination (gives useful correctness property when loop halts).',
    tags: ['loop_invariant', 'correctness', 'induction']
  },
  {
    id: 'q-8-nested-loops',
    squareId: 8,
    co: 'CO1',
    title: 'Nested Loop Tracing & Summation',
    topic: 'Analysis Framework',
    subtopic: 'Nested Loop Complexity',
    skillCategory: 'tracing',
    difficulty: 'medium',
    type: 'code_trace',
    prompt: 'Trace the following nested loop:\n\nint counter = 0;\nfor (int i = 1; i <= 4; i++) {\n    for (int j = 1; j <= i; j++) {\n        counter++;\n    }\n}\n\nWhat is the final value of counter?',
    options: ['10', '16', '8', '12'],
    correctOptionIndex: 0,
    hints: [
      'When i = 1: j runs 1 time.',
      'When i = 2: j runs 2 times.',
      'Sum the values: 1 + 2 + 3 + 4.'
    ],
    explanation: 'The inner loop runs i times for each i from 1 to 4. Total executions = 1 + 2 + 3 + 4 = 10. For general n, this is n(n+1)/2 = O(n^2).',
    tags: ['nested_loops', 'arithmetic_series', 'tracing']
  },
  {
    id: 'q-9-experimental-vs-theory',
    squareId: 9,
    co: 'CO1',
    title: 'Benchmarking vs Asymptotics',
    topic: 'Analysis Framework',
    subtopic: 'Experimental vs Theoretical Analysis',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'compare_approaches',
    prompt: 'A student benchmarks an O(n^2) algorithm and an O(n log n) algorithm on their laptop for n = 50. The O(n^2) algorithm runs in 0.02ms while O(n log n) takes 0.05ms. Why is this possible?',
    options: [
      'For very small n, constant factors and lower-order setup overhead can make an O(n^2) algorithm faster than O(n log n)',
      'The theoretical complexity formulas are fundamentally wrong for sorting',
      'O(n^2) is asymptotically faster than O(n log n)',
      'The compiler automatically converts O(n^2) to O(1) in release mode'
    ],
    correctOptionIndex: 0,
    hints: [
      'Remember that Big-O hides constant factors c.',
      'For small n, c1*n^2 may be smaller than c2*n*log(n) if c2 is large.'
    ],
    explanation: 'Asymptotic notation describes growth as n approaches infinity. For small inputs (n = 50), an algorithm with high constant overhead (like recursive call allocations in merge sort) may take more wall-clock time than a simple quadratic loop.',
    tags: ['constants', 'asymptotic', 'benchmarking']
  },
  {
    id: 'q-10-checkpoint-analysis',
    squareId: 10,
    co: 'CO1',
    title: 'Checkpoint 1: Loop Complexity Dry Run',
    topic: 'Analysis Framework',
    subtopic: 'Unit 1 Milestone Evaluation',
    skillCategory: 'dry_run',
    difficulty: 'medium',
    type: 'dry_run_trace',
    prompt: 'Dry-run the following function and determine its exact Big-O time complexity:\n\nvoid solve(int n) {\n    for (int i = 1; i < n; i *= 2) {\n        for (int j = 0; j < n; j++) {\n            printf("*");\n        }\n    }\n}',
    options: ['O(n log n)', 'O(n^2)', 'O(n)', 'O(log n)'],
    correctOptionIndex: 0,
    hints: [
      'Look at the outer loop: i doubles on every iteration (i = 1, 2, 4, 8, ...). How many times does it run?',
      'Look at the inner loop: j runs from 0 to n - 1 (n times).'
    ],
    explanation: 'The outer loop variable i doubles each step (1, 2, 4, ..., n), executing log2(n) times. The inner loop executes n times for each outer iteration. Total operations = n * log2(n) = O(n log n).',
    tags: ['checkpoint', 'dry_run', 'log_loop']
  },
  {
    id: 'q-extra-1',
    squareId: 4,
    co: 'CO1',
    title: 'Step Counting with Step Size 2',
    topic: 'Analysis Framework',
    subtopic: 'Loop Stride Analysis',
    skillCategory: 'numerical',
    difficulty: 'easy',
    type: 'output_prediction',
    prompt: 'How many times does the body of this loop execute?\n\nfor (int i = 0; i < 20; i += 2) {\n    printf("%d", i);\n}',
    options: ['10 times', '20 times', '9 times', '11 times'],
    correctOptionIndex: 0,
    hints: [
      'i takes values 0, 2, 4, 6, 8, 10, 12, 14, 16, 18.',
      'Count the number of even numbers strictly less than 20.'
    ],
    explanation: 'i increments by 2 each step, taking values 0, 2, 4, 6, 8, 10, 12, 14, 16, 18. This gives exactly 20 / 2 = 10 iterations.',
    tags: ['loop_stride', 'counting']
  },
  {
    id: 'q-extra-2',
    squareId: 8,
    co: 'CO1',
    title: 'Independent vs Dependent Nested Loops',
    topic: 'Analysis Framework',
    subtopic: 'Nested Loop Variations',
    skillCategory: 'complexity',
    difficulty: 'medium',
    type: 'time_complexity',
    prompt: 'What is the time complexity of the following code?\n\nfor (int i = 0; i < n; i++) {\n    for (int j = 0; j < 100; j++) {\n        doConstantWork();\n    }\n}',
    options: ['O(n)', 'O(n^2)', 'O(100n^2)', 'O(n log n)'],
    correctOptionIndex: 0,
    hints: [
      'Does the inner loop bound depend on n?',
      'The inner loop always runs a fixed 100 times regardless of n.'
    ],
    explanation: 'The inner loop runs exactly 100 times (a constant). The outer loop runs n times. Total work = 100 * n = O(n). Constants are dropped in asymptotic notation.',
    tags: ['constants', 'independent_loops']
  }
];
