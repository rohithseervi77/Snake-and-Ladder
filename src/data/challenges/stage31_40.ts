import { Challenge } from '../../types/challenge';

export const STAGE_31_40_CHALLENGES: Challenge[] = [
  {
    id: 'q-31-tree-structure',
    squareId: 31,
    co: 'CO1',
    title: 'Recurrence Tree Branching Factor',
    topic: 'Recurrence Tree Method',
    subtopic: 'Visualizing Subproblem Decomposition',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'For the recurrence T(n) = 3T(n/4) + cn^2, what is the branching factor (number of child nodes per parent) in the recurrence tree?',
    options: ['3', '4', '2', 'cn^2'],
    correctOptionIndex: 0,
    hints: [
      'In T(n) = a*T(n/b) + f(n), parameter a represents the number of subproblems.',
      'Here a = 3.'
    ],
    explanation: 'In the recurrence tree, parameter a represents the branching factor. For T(n) = 3T(n/4) + cn^2, a = 3, meaning each node branches into 3 subproblems of size n/4.',
    tags: ['recurrence_tree', 'branching_factor']
  },
  {
    id: 'q-32-level-work',
    squareId: 32,
    co: 'CO1',
    title: 'Work per Level in Recurrence Tree',
    topic: 'Recurrence Tree Method',
    subtopic: 'Calculating Work per Level',
    skillCategory: 'numerical',
    difficulty: 'medium',
    type: 'time_complexity',
    prompt: 'For T(n) = 2T(n/2) + n^2, what is the total non-recursive work performed at level 1 (the children of the root)?',
    options: [
      'n^2 / 2',
      'n^2',
      '2n^2',
      'n'
    ],
    correctOptionIndex: 0,
    hints: [
      'At level 1, there are 2 subproblems, each of size n/2.',
      'Work for one subproblem of size n/2 is (n/2)^2 = n^2 / 4.',
      'Multiply by 2 subproblems: 2 * (n^2 / 4).'
    ],
    explanation: 'At level 1, there are 2 subproblems of size n/2. The cost per subproblem is (n/2)^2 = n^2 / 4. Total work at level 1 = 2 * (n^2 / 4) = n^2 / 2. Notice that the work shrinks by a factor of 1/2 at each subsequent level (geometric series r = 1/2 < 1).',
    tags: ['recurrence_tree', 'level_work', 'root_heavy']
  },
  {
    id: 'q-33-tree-height-leaves',
    squareId: 33,
    co: 'CO1',
    title: 'Recurrence Tree Height and Leaf Count',
    topic: 'Recurrence Tree Method',
    subtopic: 'Tree Height and Leaf Node Count',
    skillCategory: 'numerical',
    difficulty: 'medium',
    type: 'output_prediction',
    prompt: 'For the recurrence T(n) = 4T(n/2) + n, what is the total number of leaf nodes in the recurrence tree?',
    options: [
      'n^2 leaves, because a^h = 4^(log2 n) = n^(log2 4) = n^2',
      'n leaves',
      'log2(n) leaves',
      '2n leaves'
    ],
    correctOptionIndex: 0,
    hints: [
      'Tree height is h = log2(n).',
      'Number of leaves = a^h = 4^(log2 n).',
      'Apply the logarithmic identity x^(log_b y) = y^(log_b x).'
    ],
    explanation: 'The height of the tree is log2(n). The number of leaves is 4^(log2 n) = n^(log2 4) = n^2. Since each leaf costs Theta(1), the leaf level alone does Theta(n^2) work.',
    tags: ['recurrence_tree', 'leaves', 'log_identity']
  },
  {
    id: 'q-34-tree-geometric-sum',
    squareId: 34,
    co: 'CO1',
    title: 'Geometric Series Summation in Trees',
    topic: 'Recurrence Tree Method',
    subtopic: 'Solving Tree Sums',
    skillCategory: 'numerical',
    difficulty: 'hard',
    type: 'time_complexity',
    prompt: 'In a recurrence tree, the work per level is: Level 0 = n^2, Level 1 = n^2 / 2, Level 2 = n^2 / 4, ..., Level i = n^2 / (2^i). What is the total work across all levels as n -> infinity?',
    options: [
      'Theta(n^2), because the sum of the infinite geometric series 1 + 1/2 + 1/4 + ... is bounded by 2',
      'Theta(n^2 log n)',
      'Theta(n^3)',
      'Theta(n)'
    ],
    correctOptionIndex: 0,
    hints: [
      'Factor out n^2: n^2 * (1 + 1/2 + 1/4 + 1/8 + ...).',
      'The sum of 1 / 2^i for i from 0 to infinity equals 1 / (1 - 1/2) = 2.'
    ],
    explanation: 'Sum = n^2 * sum_{i=0}^inf (1/2)^i = n^2 * [1 / (1 - 1/2)] = 2n^2 = Theta(n^2). Because the geometric ratio r = 1/2 is < 1, the work is strictly root-dominated by Level 0.',
    tags: ['geometric_series', 'tree_sum', 'master_case_3']
  },
  {
    id: 'q-35-master-theorem-form',
    squareId: 35,
    co: 'CO1',
    title: 'Master Theorem Canonical Form',
    topic: 'Master Theorem',
    subtopic: 'T(n) = a*T(n/b) + f(n) Canonical Form',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'In the Master Theorem form T(n) = a*T(n/b) + f(n), what critical value do we compare f(n) against?',
    options: [
      'n^(log_b a)',
      'n^b',
      'a * b',
      'log_a(b)'
    ],
    correctOptionIndex: 0,
    hints: [
      'This value represents the work done by the leaf level.',
      'Calculate log base b of a.'
    ],
    explanation: 'The Master Theorem compares f(n) against n^(log_b a), which represents the leaf level work. The relation between f(n) and n^(log_b a) determines whether Case 1, Case 2, or Case 3 applies.',
    tags: ['master_theorem', 'canonical_form', 'critical_exponent']
  },
  {
    id: 'q-36-master-case-1',
    squareId: 36,
    co: 'CO1',
    title: 'Master Theorem: Case 1 Application',
    topic: 'Master Theorem',
    subtopic: 'f(n) = O(n^(log_b(a) - epsilon))',
    skillCategory: 'numerical',
    difficulty: 'medium',
    type: 'time_complexity',
    prompt: 'Solve T(n) = 8T(n/2) + 1000n^2 using the Master Theorem:',
    options: [
      'Theta(n^3), by Master Theorem Case 1',
      'Theta(n^2), by Master Theorem Case 3',
      'Theta(n^2 log n), by Master Theorem Case 2',
      'Theta(n^8)'
    ],
    correctOptionIndex: 0,
    hints: [
      'a = 8, b = 2. Compute log_b(a) = log_2(8) = 3.',
      'Compare n^(log_2 8) = n^3 against f(n) = 1000n^2.',
      'Since n^2 is polynomially smaller than n^3 (eps = 1), Case 1 applies.'
    ],
    explanation: 'Here a = 8, b = 2, so n^(log_b a) = n^(log_2 8) = n^3. Since f(n) = 1000n^2 = O(n^(3 - 1)), Case 1 applies with eps = 1. Therefore, T(n) = Theta(n^(log_b a)) = Theta(n^3).',
    tags: ['master_theorem', 'case_1', 'numerical']
  },
  {
    id: 'q-37-master-case-2',
    squareId: 37,
    co: 'CO1',
    title: 'Master Theorem: Case 2 Application',
    topic: 'Master Theorem',
    subtopic: 'f(n) = Theta(n^(log_b a) * log^k n)',
    skillCategory: 'numerical',
    difficulty: 'medium',
    type: 'time_complexity',
    prompt: 'Solve T(n) = 2T(n/2) + 5n using the Master Theorem:',
    options: [
      'Theta(n log n), by Master Theorem Case 2',
      'Theta(n^2)',
      'Theta(n)',
      'Theta(log n)'
    ],
    correctOptionIndex: 0,
    hints: [
      'a = 2, b = 2. log_2(2) = 1.',
      'n^(log_b a) = n^1 = n.',
      'f(n) = 5n = Theta(n). Since f(n) matches n^(log_b a), Case 2 applies.'
    ],
    explanation: 'a = 2, b = 2, so n^(log_2 2) = n. Since f(n) = 5n = Theta(n), Case 2 applies with k = 0. Therefore, T(n) = Theta(n^(log_b a) * log n) = Theta(n log n). This is the Merge Sort recurrence.',
    tags: ['master_theorem', 'case_2', 'merge_sort']
  },
  {
    id: 'q-38-master-case-3',
    squareId: 38,
    co: 'CO1',
    title: 'Master Theorem: Case 3 Application',
    topic: 'Master Theorem',
    subtopic: 'f(n) = Omega(n^(log_b(a) + epsilon))',
    skillCategory: 'numerical',
    difficulty: 'medium',
    type: 'time_complexity',
    prompt: 'Solve T(n) = 2T(n/2) + n^2 using the Master Theorem:',
    options: [
      'Theta(n^2), by Master Theorem Case 3',
      'Theta(n log n)',
      'Theta(n^3)',
      'Theta(n)'
    ],
    correctOptionIndex: 0,
    hints: [
      'a = 2, b = 2, so log_2(2) = 1, and n^(log_b a) = n.',
      'f(n) = n^2 is polynomially larger than n (eps = 1).',
      'Check regularity: 2*(n/2)^2 = n^2 / 2 <= c*n^2 for c = 1/2 < 1.'
    ],
    explanation: 'a = 2, b = 2, n^(log_b a) = n. f(n) = n^2 = Omega(n^(1 + 1)). The regularity condition 2*(n/2)^2 = n^2/2 <= (1/2)*n^2 holds for c = 1/2 < 1. By Case 3, T(n) = Theta(f(n)) = Theta(n^2).',
    tags: ['master_theorem', 'case_3', 'regularity']
  },
  {
    id: 'q-39-master-limitations',
    squareId: 39,
    co: 'CO1',
    title: 'When Master Theorem Fails',
    topic: 'Master Theorem',
    subtopic: 'Non-Polynomial Gaps & When Master Theorem Fails',
    skillCategory: 'conceptual',
    difficulty: 'hard',
    type: 'conceptual_mcq',
    prompt: 'Why CANNOT the standard Master Theorem be applied to solve T(n) = 2T(n/2) + n / log(n)?',
    options: [
      'f(n) = n/log(n) is smaller than n^(log_2 2) = n, but NOT polynomially smaller by any factor n^epsilon',
      'The branching factor a = 2 is too small',
      'Division by 2 is an invalid subproblem size',
      'Logarithms cannot appear in recurrence relations'
    ],
    correctOptionIndex: 0,
    hints: [
      'Case 1 requires f(n) = O(n^(log_b a - eps)) for some positive constant eps > 0.',
      'Does log(n) equal n^eps for any positive constant eps? No, log(n) grows slower than any n^eps.'
    ],
    explanation: 'Here n^(log_b a) = n. The ratio n / (n/log n) = log n, which is not a polynomial factor n^eps for any eps > 0. The gap between f(n) and n is non-polynomial, so the standard Master Theorem does not apply.',
    tags: ['master_theorem', 'limitations', 'gap_condition']
  },
  {
    id: 'q-40-checkpoint-master-theorem',
    squareId: 40,
    co: 'CO1',
    title: 'Checkpoint 4: Master Theorem Exam Problem',
    topic: 'Master Theorem',
    subtopic: 'Unit 4 Milestone Evaluation',
    skillCategory: 'numerical',
    difficulty: 'hard',
    type: 'time_complexity',
    prompt: 'VIT Exam Problem: Solve the recurrence relation T(n) = 9T(n/3) + n:\n\nWhat is its asymptotic time complexity?',
    options: [
      'Theta(n^2)',
      'Theta(n log n)',
      'Theta(n^3)',
      'Theta(n)'
    ],
    correctOptionIndex: 0,
    hints: [
      'Identify a = 9, b = 3.',
      'Compute log_b a = log_3(9) = 2.',
      'Compare n^2 with f(n) = n.'
    ],
    explanation: 'a = 9, b = 3. Critical exponent = log_3(9) = 2, so n^(log_b a) = n^2. Since f(n) = n = O(n^(2 - 1)), Case 1 applies with eps = 1. Therefore, T(n) = Theta(n^2).',
    tags: ['checkpoint', 'exam_problem', 'master_theorem']
  },
  {
    id: 'q-extra-35',
    squareId: 35,
    co: 'CO1',
    title: 'Master Theorem: Strassen Recurrence',
    topic: 'Master Theorem',
    subtopic: 'Strassen Multiplication Recurrence',
    skillCategory: 'numerical',
    difficulty: 'hard',
    type: 'time_complexity',
    prompt: "Strassen's matrix multiplication recurrence is T(n) = 7T(n/2) + Theta(n^2). Which Master Theorem case applies, and what is the resulting complexity?",
    options: [
      'Case 1 applies, yielding Theta(n^(log_2 7)) approx Theta(n^2.807)',
      'Case 2 applies, yielding Theta(n^2 log n)',
      'Case 3 applies, yielding Theta(n^2)',
      'Master theorem cannot be used'
    ],
    correctOptionIndex: 0,
    hints: [
      'a = 7, b = 2.',
      'log_2(7) approx 2.807.',
      'Compare n^2.807 with f(n) = n^2.'
    ],
    explanation: 'a = 7, b = 2. log_2(7) approx 2.807 > 2. Since f(n) = n^2 = O(n^(2.807 - eps)) with eps approx 0.807, Case 1 applies. Complexity is Theta(n^(log_2 7)) approx Theta(n^2.807), which beats standard O(n^3).',
    tags: ['strassen', 'master_theorem', 'case_1']
  },
  {
    id: 'q-extra-37',
    squareId: 37,
    co: 'CO1',
    title: 'Master Theorem: Binary Search Formulation',
    topic: 'Master Theorem',
    subtopic: 'T(n) = T(n/2) + 1 Analysis',
    skillCategory: 'numerical',
    difficulty: 'easy',
    type: 'time_complexity',
    prompt: 'Apply the Master Theorem to T(n) = T(n/2) + 1. What are a, b, and the resulting complexity?',
    options: [
      'a = 1, b = 2, log_2(1) = 0, so n^0 = 1 = f(n) -> Case 2 -> Theta(log n)',
      'a = 1, b = 2 -> Case 1 -> Theta(n)',
      'a = 2, b = 1 -> Case 3 -> Theta(1)',
      'Master theorem does not apply'
    ],
    correctOptionIndex: 0,
    hints: [
      'a = 1, b = 2.',
      'n^(log_2 1) = n^0 = 1.',
      'f(n) = 1 matches n^0, so Case 2 gives 1 * log n = log n.'
    ],
    explanation: 'a = 1, b = 2. n^(log_2 1) = n^0 = 1. Since f(n) = 1 = Theta(1), Case 2 applies with k = 0. T(n) = Theta(n^0 * log n) = Theta(log n). This mathematically proves Binary Search complexity.',
    tags: ['binary_search', 'master_case_2']
  }
];
