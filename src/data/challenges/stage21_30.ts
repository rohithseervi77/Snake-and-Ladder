import { Challenge } from '../../types/challenge';

export const STAGE_21_30_CHALLENGES: Challenge[] = [
  {
    id: 'q-21-recurrence-intro',
    squareId: 21,
    co: 'CO1',
    title: 'Formulating Recurrence from Recursive Code',
    topic: 'Recursive Functions',
    subtopic: 'Formulating Recurrences from Code',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'Consider this recursive algorithm:\n\nint search(int arr[], int low, int high, int key) {\n    if (low > high) return -1;\n    int mid = (low + high) / 2;\n    if (arr[mid] == key) return mid;\n    if (arr[mid] > key)\n        return search(arr, low, mid - 1, key);\n    return search(arr, mid + 1, high, key);\n}\n\nWhat is the recurrence relation describing its worst-case running time?',
    options: [
      'T(n) = T(n/2) + c',
      'T(n) = 2T(n/2) + c',
      'T(n) = T(n - 1) + c',
      'T(n) = 2T(n - 1) + c'
    ],
    correctOptionIndex: 0,
    hints: [
      'Binary search makes only ONE recursive call per step.',
      'The array size is halved (n/2), with O(1) constant work c for the comparison.'
    ],
    explanation: 'Binary search divides the problem into halves but only branches into one half. Non-recursive work is constant c (mid calculation and comparisons). Recurrence: T(n) = T(n/2) + c.',
    tags: ['recurrence', 'binary_search', 'modeling']
  },
  {
    id: 'q-22-unrolling-recurrence',
    squareId: 22,
    co: 'CO1',
    title: 'Solving Recurrence by Unrolling',
    topic: 'Recursive Functions',
    subtopic: 'Unrolling & Telescoping Recurrences',
    skillCategory: 'numerical',
    difficulty: 'easy',
    type: 'output_prediction',
    prompt: 'Unroll the recurrence T(n) = T(n - 1) + n with base case T(1) = 1. What is the closed-form solution?',
    options: [
      'T(n) = n(n + 1) / 2 = Theta(n^2)',
      'T(n) = n = Theta(n)',
      'T(n) = 2^n = Theta(2^n)',
      'T(n) = n log n = Theta(n log n)'
    ],
    correctOptionIndex: 0,
    hints: [
      'T(n) = T(n-1) + n = T(n-2) + (n-1) + n = ...',
      'Sum the natural numbers from 1 to n.'
    ],
    explanation: 'Unrolling gives T(n) = 1 + 2 + 3 + ... + n = n(n+1)/2 = Theta(n^2). This is the exact recurrence for worst-case Quick Sort and Selection Sort.',
    tags: ['unrolling', 'arithmetic_series']
  },
  {
    id: 'q-23-guess-form',
    squareId: 23,
    co: 'CO1',
    title: 'Substitution Method: Guessing Form',
    topic: 'Recursive Functions',
    subtopic: 'Hypothesis Formulation',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'When using the substitution method to solve T(n) = 2T(n/2) + n, what is the standard educated guess for the asymptotic upper bound?',
    options: [
      'Guess T(n) <= c * n log n',
      'Guess T(n) <= c * n^2',
      'Guess T(n) <= c * 2^n',
      'Guess T(n) <= c * log n'
    ],
    correctOptionIndex: 0,
    hints: [
      'Think about the recurrence for Merge Sort.',
      'Work at each level is n, and there are log n levels.'
    ],
    explanation: 'For T(n) = 2T(n/2) + n, a standard guess is T(n) = O(n log n), specifically testing the inductive hypothesis T(n) <= c * n log2(n).',
    tags: ['substitution', 'guess', 'merge_sort']
  },
  {
    id: 'q-24-induction-step',
    squareId: 24,
    co: 'CO1',
    title: 'Inductive Step in Substitution Proof',
    topic: 'Recursive Functions',
    subtopic: 'Proving T(n) <= c*g(n)',
    skillCategory: 'numerical',
    difficulty: 'medium',
    type: 'time_complexity',
    prompt: 'You are proving T(n) <= c * n log2(n) for T(n) = 2T(n/2) + n. Substituting the inductive hypothesis into the RHS gives:\n\n2 * [c * (n/2) * log2(n/2)] + n\n\nSimplifying this expression yields:',
    options: [
      'c * n * log2(n) - c * n + n, which is <= c * n * log2(n) as long as c >= 1',
      'c * n * log2(n) + c * n',
      '2c * n * log2(n)',
      'c * n^2'
    ],
    correctOptionIndex: 0,
    hints: [
      'Recall log2(n/2) = log2(n) - log2(2) = log2(n) - 1.',
      'Multiply by c * n: c * n * (log2(n) - 1) + n = c*n*log2(n) - c*n + n.'
    ],
    explanation: '2*(c*(n/2)*log2(n/2)) + n = c*n*(log2(n) - 1) + n = c*n*log2(n) - c*n + n. When c >= 1, the residual (-c*n + n) is <= 0, proving T(n) <= c*n*log2(n).',
    tags: ['induction', 'algebra', 'substitution']
  },
  {
    id: 'q-25-base-case-sub',
    squareId: 25,
    co: 'CO1',
    title: 'Base Case Threshold in Substitution',
    topic: 'Recursive Functions',
    subtopic: 'Base Case Verification in Induction',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'Why does the base case proof for T(n) <= c * n log2(n) fail at n = 1, and how is this resolved?',
    options: [
      'At n = 1, c * 1 * log2(1) = 0, but T(1) = 1 > 0; resolved by establishing base cases at n = 2 and n = 3 for n0 = 2',
      'The base case fails because negative logarithms cannot be computed by hardware',
      'It cannot be resolved, meaning the theorem is mathematically invalid',
      'Resolved by redefining log2(1) = 1 in discrete mathematics'
    ],
    correctOptionIndex: 0,
    hints: [
      'What is log2(1)? It is 0.',
      'Since asymptotic notation requires n >= n0, we can choose n0 = 2.'
    ],
    explanation: 'Since log2(1) = 0, c*1*0 = 0 cannot bound T(1) = 1. In asymptotic analysis, the condition must hold for n >= n0. Choosing n0 = 2 (where log2(2) = 1) allows T(2) <= c*2*1 to hold for any c >= T(2)/2.',
    tags: ['base_case', 'boundary', 'asymptotics']
  },
  {
    id: 'q-26-strengthen-hypothesis',
    squareId: 26,
    co: 'CO1',
    title: 'Strengthening the Inductive Hypothesis',
    topic: 'Recursive Functions',
    subtopic: 'Strengthening the Inductive Hypothesis',
    skillCategory: 'numerical',
    difficulty: 'hard',
    type: 'conceptual_mcq',
    prompt: 'You try to prove T(n) = 2T(n/2) + 1 is O(n) by guessing T(n) <= c*n. The inductive step yields 2(c*(n/2)) + 1 = c*n + 1, which fails to prove <= c*n. How do you fix this?',
    options: [
      'Strengthen the guess by subtracting a constant: T(n) <= c*n - d where d >= 1',
      'Change the guess to O(n^3)',
      'Add a factor of n^2 to the right-hand side',
      'Conclude that T(n) cannot be O(n)'
    ],
    correctOptionIndex: 0,
    hints: [
      'The proof failed because of the extra +1.',
      'Subtracting a constant -d produces a negative term in the inductive step to cancel the +1.'
    ],
    explanation: 'Guessing T(n) <= c*n - d gives: 2(c*(n/2) - d) + 1 = c*n - 2d + 1. For this to be <= c*n - d, we need -2d + 1 <= -d, which holds whenever d >= 1. This successfully proves T(n) = O(n).',
    tags: ['strengthening_hypothesis', 'lower_order_terms']
  },
  {
    id: 'q-27-change-variables',
    squareId: 27,
    co: 'CO1',
    title: 'Domain Transformation (Changing Variables)',
    topic: 'Recursive Functions',
    subtopic: 'Changing Variables / Domain Transformations',
    skillCategory: 'numerical',
    difficulty: 'hard',
    type: 'time_complexity',
    prompt: 'Solve the non-standard recurrence T(n) = 2T(sqrt(n)) + 1 by substituting m = log2(n) and S(m) = T(2^m):',
    options: [
      'T(n) = Theta(log n)',
      'T(n) = Theta(n)',
      'T(n) = Theta(sqrt(n))',
      'T(n) = Theta(n log n)'
    ],
    correctOptionIndex: 0,
    hints: [
      'sqrt(n) = n^(1/2) = 2^(m/2).',
      'T(2^m) = 2T(2^(m/2)) + 1 becomes S(m) = 2S(m/2) + 1.',
      'Solve S(m) using Master Theorem: S(m) = Theta(m). Substitute back m = log2(n).'
    ],
    explanation: 'Let m = log2(n), so n = 2^m. Then T(2^m) = 2T(2^(m/2)) + 1. Setting S(m) = T(2^m) gives S(m) = 2S(m/2) + 1. By Master Theorem (Case 1), S(m) = Theta(m). Replacing m = log2(n) gives T(n) = Theta(log n).',
    tags: ['change_variables', 'transformation', 'recurrence']
  },
  {
    id: 'q-28-divide-conquer-sub',
    squareId: 28,
    co: 'CO1',
    title: 'Binary Search Recurrence via Substitution',
    topic: 'Recursive Functions',
    subtopic: 'Divide-and-Conquer Recurrences',
    skillCategory: 'numerical',
    difficulty: 'medium',
    type: 'time_complexity',
    prompt: 'Prove T(n) = T(n/2) + 1 by substitution. If we guess T(n) <= c * log2(n), what is the minimum value of constant c needed to make the inductive step hold?',
    options: [
      'c = 1, because c * log2(n/2) + 1 = c * log2(n) - c + 1 <= c * log2(n) when c >= 1',
      'c must be at least 100',
      'c can be any negative number',
      'No constant c exists'
    ],
    correctOptionIndex: 0,
    hints: [
      'Substitute: c * log2(n/2) + 1 = c * (log2(n) - 1) + 1.',
      'We need -c + 1 <= 0, which means c >= 1.'
    ],
    explanation: 'T(n/2) + 1 <= c*log2(n/2) + 1 = c*log2(n) - c + 1. For this to be <= c*log2(n), we require -c + 1 <= 0, meaning c >= 1. Hence, T(n) = O(log n).',
    tags: ['binary_search', 'substitution_proof']
  },
  {
    id: 'q-29-substitution-pitfalls',
    squareId: 29,
    co: 'CO1',
    title: 'Fallacy of the Shifting Constant',
    topic: 'Recursive Functions',
    subtopic: 'Pitfalls in Substitution Induction',
    skillCategory: 'debugging',
    difficulty: 'hard',
    type: 'find_bug',
    prompt: 'A student attempts to prove T(n) = 2T(n/2) + n is O(n). They write:\n"Assume T(n/2) <= c*(n/2). Then T(n) <= 2*(c*n/2) + n = cn + n = (c+1)n = O(n)."\nWhat is the fatal flaw in this proof?',
    options: [
      'The inductive hypothesis assumed constant c, but the conclusion required a larger constant (c + 1); constant c must remain fixed across all induction steps',
      'Merge sort cannot be solved recursively',
      'n/2 is not a valid subproblem size',
      'The student forgot to multiply by log n'
    ],
    correctOptionIndex: 0,
    hints: [
      'In mathematical induction, the predicate P(n) must use the SAME constant c.',
      'You cannot shift from c to c+1, because over n steps the constant would grow to c + n.'
    ],
    explanation: 'The inductive hypothesis must be proven for the identical constant c. Concluding T(n) <= (c+1)n only proves that the constant increases at every step, which invalidates the proof that T(n) <= c*n for a fixed c.',
    tags: ['pitfall', 'debugging', 'induction_fallacy']
  },
  {
    id: 'q-30-checkpoint-substitution',
    squareId: 30,
    co: 'CO1',
    title: 'Checkpoint 3: Substitution Method',
    topic: 'Recursive Functions',
    subtopic: 'Unit 3 Milestone Evaluation',
    skillCategory: 'numerical',
    difficulty: 'hard',
    type: 'time_complexity',
    prompt: 'Solve T(n) = 2T(n/2) + c where c is a positive constant and T(1) = 1. What is the tight asymptotic bound?',
    options: [
      'Theta(n)',
      'Theta(n log n)',
      'Theta(log n)',
      'Theta(n^2)'
    ],
    correctOptionIndex: 0,
    hints: [
      'Unroll: T(n) = 2(2T(n/4) + c) + c = 4T(n/4) + 2c + c = ...',
      'Sum the powers of 2: c * (1 + 2 + 4 + ... + n/2) = c * (n - 1).'
    ],
    explanation: 'Unrolling yields T(n) = n*T(1) + c*(1 + 2 + 4 + ... + n/2) = n + c*(n - 1) = Theta(n). Notice this is Theta(n), NOT Theta(n log n), because the non-recursive work is constant c, not n.',
    tags: ['checkpoint', 'substitution', 'linear_bound']
  },
  {
    id: 'q-extra-21',
    squareId: 21,
    co: 'CO1',
    title: 'Linear Recurrence with Constant Subtraction',
    topic: 'Recursive Functions',
    subtopic: 'Decrementing Recurrences',
    skillCategory: 'numerical',
    difficulty: 'easy',
    type: 'time_complexity',
    prompt: 'What is the solution to the recurrence T(n) = T(n - 1) + 1 with T(0) = 0?',
    options: ['Theta(n)', 'Theta(n^2)', 'Theta(log n)', 'Theta(2^n)'],
    correctOptionIndex: 0,
    hints: [
      'T(n) = T(n-1) + 1 = T(n-2) + 1 + 1 = ...',
      'The +1 adds n times.'
    ],
    explanation: 'T(n) = T(n-1) + 1 unrolls to 1 + 1 + ... + 1 (n times) = n. Hence, T(n) = Theta(n).',
    tags: ['linear', 'decrement']
  },
  {
    id: 'q-extra-24',
    squareId: 24,
    co: 'CO1',
    title: 'Recurrence for Factorial Function',
    topic: 'Recursive Functions',
    subtopic: 'Classic Function Recurrences',
    skillCategory: 'complexity',
    difficulty: 'easy',
    type: 'time_complexity',
    prompt: 'What is the time complexity of the standard recursive factorial function fact(n) { if (n <= 1) return 1; return n * fact(n-1); }?',
    options: ['O(n)', 'O(n!)', 'O(log n)', 'O(n^2)'],
    correctOptionIndex: 0,
    hints: [
      'How many recursive calls are made for input n?',
      'fact(n) calls fact(n-1), which calls fact(n-2)... down to fact(1).'
    ],
    explanation: 'The function makes n recursive calls, doing O(1) multiplication at each level. Recurrence: T(n) = T(n-1) + 1, which solves to O(n) linear time. (The return value is n!, but the time complexity is O(n)).',
    tags: ['factorial', 'recursion_time']
  }
];
