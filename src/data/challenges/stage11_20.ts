import { Challenge } from '../../types/challenge';

export const STAGE_11_20_CHALLENGES: Challenge[] = [
  {
    id: 'q-11-big-o-def',
    squareId: 11,
    co: 'CO1',
    title: 'Formal Definition of Big-O',
    topic: 'Asymptotic Notations',
    subtopic: 'Formal Definition of O(g(n))',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'Which mathematical statement accurately defines f(n) = O(g(n))?',
    options: [
      'There exist positive constants c and n0 such that 0 <= f(n) <= c * g(n) for all n >= n0',
      'f(n) >= c * g(n) for all n >= 0',
      'f(n) equals g(n) for all n >= n0',
      'The limit of f(n)/g(n) as n -> infinity must equal 0'
    ],
    correctOptionIndex: 0,
    hints: [
      'Big-O represents an asymptotic upper bound.',
      'Look for the inequality with f(n) bounded from above by c * g(n).'
    ],
    explanation: 'By formal definition, f(n) = O(g(n)) iff there exist positive constants c and n0 such that 0 <= f(n) <= c*g(n) for all n >= n0.',
    tags: ['big_o', 'definition', 'upper_bound']
  },
  {
    id: 'q-12-big-omega-def',
    squareId: 12,
    co: 'CO1',
    title: 'Big-Omega Witness Pair',
    topic: 'Asymptotic Notations',
    subtopic: 'Formal Definition of Omega(g(n))',
    skillCategory: 'numerical',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'For f(n) = 3n^2 + 5, which witness pair (c, n0) proves that f(n) = Omega(n^2)?',
    options: [
      'c = 3 and n0 = 1, because 3n^2 + 5 >= 3 * n^2 for all n >= 1',
      'c = 10 and n0 = 1',
      'c = 0 and n0 = 100',
      'c = -1 and n0 = 0'
    ],
    correctOptionIndex: 0,
    hints: [
      'We need f(n) >= c * n^2 for all n >= n0.',
      'Since 3n^2 + 5 >= 3n^2 for all n >= 1, c = 3 works directly.'
    ],
    explanation: 'For all n >= 1, 3n^2 + 5 is strictly greater than or equal to 3n^2. Thus, c = 3 and n0 = 1 satisfy the Big-Omega definition f(n) >= c*g(n).',
    tags: ['big_omega', 'witness', 'lower_bound']
  },
  {
    id: 'q-13-big-theta-def',
    squareId: 13,
    co: 'CO1',
    title: 'Big-Theta Sandwiched Bound',
    topic: 'Asymptotic Notations',
    subtopic: 'Asymptotically Tight Bounds',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'If f(n) = O(n^2) and f(n) = Omega(n^2), what can we conclusively state about f(n)?',
    options: [
      'f(n) = Theta(n^2), meaning it is asymptotically tightly bound by n^2',
      'f(n) = o(n^2)',
      'f(n) = O(n log n)',
      'f(n) must equal exactly n^2 for all values of n'
    ],
    correctOptionIndex: 0,
    hints: [
      'When an upper bound and a lower bound match, what is the resulting notation?',
      'Theta represents the intersection of O and Omega.'
    ],
    explanation: 'By the sandwich theorem of asymptotic notations, f(n) = Theta(g(n)) if and only if f(n) = O(g(n)) and f(n) = Omega(g(n)).',
    tags: ['big_theta', 'tight_bound']
  },
  {
    id: 'q-14-little-o-omega',
    squareId: 14,
    co: 'CO1',
    title: 'Strict Asymptotic Bounds: Little-o vs Big-O',
    topic: 'Asymptotic Notations',
    subtopic: 'Strict Asymptotic Bounds',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'compare_approaches',
    prompt: 'Which of the following statements is mathematically TRUE regarding Little-o notation?',
    options: [
      '2n = o(n^2) is true, but 2n^2 = o(n^2) is false',
      '2n^2 = o(n^2) is true because the constant 2 can be dropped',
      'Little-o allows the functions to be asymptotically equal up to a constant',
      'If f(n) = O(g(n)), then f(n) is always o(g(n))'
    ],
    correctOptionIndex: 0,
    hints: [
      'Little-o requires lim(n->inf) [f(n)/g(n)] = 0.',
      'lim 2n/n^2 = 0 (true), but lim 2n^2/n^2 = 2 != 0 (false).'
    ],
    explanation: 'Little-o is a strict upper bound: lim n->inf f(n)/g(n) must equal 0. 2n/n^2 -> 0, so 2n = o(n^2). However, 2n^2/n^2 -> 2 != 0, so 2n^2 = O(n^2) is true but 2n^2 = o(n^2) is false.',
    tags: ['little_o', 'strict_bound']
  },
  {
    id: 'q-15-dominance-rules',
    squareId: 15,
    co: 'CO1',
    title: 'Ranking Asymptotic Growth Rates',
    topic: 'Growth Rate of Functions',
    subtopic: 'Hierarchy of Standard Growth Rates',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'Which list correctly orders the standard growth rates from slowest growing to fastest growing?',
    options: [
      'O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n)',
      'O(1) < O(n) < O(log n) < O(n^2) < O(n log n) < O(2^n)',
      'O(log n) < O(1) < O(n) < O(n log n) < O(2^n) < O(n^2)',
      'O(1) < O(log n) < O(n log n) < O(n) < O(n^2) < O(2^n)'
    ],
    correctOptionIndex: 0,
    hints: [
      'Constant O(1) is slowest, exponential O(2^n) is fastest.',
      'Does n grow faster or slower than n log n?'
    ],
    explanation: 'The standard asymptotic hierarchy is: Constant < Logarithmic < Linear < Linearithmic < Quadratic < Cubic < Exponential < Factorial.',
    tags: ['dominance', 'ranking', 'growth_rates']
  },
  {
    id: 'q-16-log-linear',
    squareId: 16,
    co: 'CO1',
    title: 'Logarithm Base Invariance in Big-O',
    topic: 'Growth Rate of Functions',
    subtopic: 'Sublinear vs Linear Growth',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'Why do we typically write O(log n) without specifying the base of the logarithm in Big-O notation?',
    options: [
      'Changing the log base simply multiplies by a constant factor: log_a(n) = log_b(n) / log_b(a), and Big-O ignores constant factors',
      'All computers internally compute logarithms only in base e',
      'Logarithms with base > 10 are undefined in computer science',
      'Base 2 and Base 10 logarithms produce identical values for integers'
    ],
    correctOptionIndex: 0,
    hints: [
      'Recall the change-of-base formula from high school math.',
      '1 / log_b(a) is just a fixed constant number.'
    ],
    explanation: 'By the change of base formula, log_a(n) = log_b(n) / log_b(a). Since 1/log_b(a) is a constant, log_a(n) = Theta(log_b(n)) for any valid bases a, b > 1.',
    tags: ['logarithms', 'base_invariance']
  },
  {
    id: 'q-17-poly-growth',
    squareId: 17,
    co: 'CO1',
    title: 'Comparing Polynomial Powers',
    topic: 'Growth Rate of Functions',
    subtopic: 'n log n vs n^k Comparisons',
    skillCategory: 'complexity',
    difficulty: 'medium',
    type: 'time_complexity',
    prompt: 'Which function grows asymptotically faster as n -> infinity: f(n) = 100 * n * log2(n) or g(n) = n^1.5?',
    options: [
      'g(n) = n^1.5 grows faster, because n^0.5 outgrows log2(n)',
      'f(n) grows faster because the constant 100 multiplies it',
      'They grow at the exact same rate because both contain n',
      'f(n) grows faster because logarithmic functions outgrow fractional powers'
    ],
    correctOptionIndex: 0,
    hints: [
      'Divide both functions by n: we are comparing 100 * log2(n) against n^0.5.',
      'Any positive polynomial power n^eps outgrows any logarithm (log n)^k.'
    ],
    explanation: 'Dividing both by n leaves 100 * log2(n) vs n^0.5. By limit analysis, lim n->inf [log2(n) / n^0.5] = 0. Any positive power of n, even n^0.01, eventually outgrows any power of log n.',
    tags: ['polynomial_growth', 'log_vs_poly']
  },
  {
    id: 'q-18-exponential-growth',
    squareId: 18,
    co: 'CO1',
    title: 'Polynomial vs Exponential Growth',
    topic: 'Growth Rate of Functions',
    subtopic: '2^n, 3^n and n! Explosions',
    skillCategory: 'numerical',
    difficulty: 'hard',
    type: 'compare_approaches',
    prompt: 'Consider Algorithm A with T(n) = n^5 and Algorithm B with T(n) = 2^n. For what value of n does Algorithm B decisively surpass Algorithm A in operation count?',
    options: [
      'Around n = 23 (2^23 > 23^5)',
      'Only when n exceeds 1,000,000',
      'Algorithm A is always slower for all n >= 2',
      'Algorithm B is always faster for all positive integers'
    ],
    correctOptionIndex: 0,
    hints: [
      'For small n: 2^4 = 16 < 4^5 = 1024.',
      'For n = 25: 2^25 = 33,554,432 while 25^5 = 9,765,625.'
    ],
    explanation: 'For small inputs (n < 23), n^5 is larger than 2^n. But at n = 23, 2^23 = 8,388,608 while 23^5 = 6,436,343. Exponential growth accelerates dramatically and forever dwarfs polynomial growth.',
    tags: ['exponential', 'polynomial_comparison']
  },
  {
    id: 'q-19-limits-hopital',
    squareId: 19,
    co: 'CO1',
    title: "L'Hopital's Rule for Asymptotic Comparison",
    topic: 'Growth Rate of Functions',
    subtopic: "L'Hopital's Rule for Asymptotics",
    skillCategory: 'numerical',
    difficulty: 'hard',
    type: 'time_complexity',
    prompt: "Evaluate lim(n -> inf) [ln(n) / sqrt(n)] using L'Hopital's rule to determine the asymptotic relationship between ln(n) and sqrt(n):",
    options: [
      'The limit is 0, proving that ln(n) = o(sqrt(n))',
      'The limit is 1, proving that ln(n) = Theta(sqrt(n))',
      'The limit is infinity, proving that ln(n) = Omega(sqrt(n))',
      "L'Hopital's rule cannot be applied to logarithms"
    ],
    correctOptionIndex: 0,
    hints: [
      'Derivative of ln(n) is 1/n.',
      'Derivative of sqrt(n) is 1 / (2 * sqrt(n)).',
      'Compute (1/n) / (1 / (2*sqrt(n))) = 2 / sqrt(n).'
    ],
    explanation: "Differentiating numerator and denominator yields lim (1/n) / (1/(2*sqrt(n))) = lim 2/sqrt(n) = 0. Since the limit is 0, ln(n) is strictly Little-o of sqrt(n).",
    tags: ['hopital', 'limits', 'proof']
  },
  {
    id: 'q-20-checkpoint-asymptotic',
    squareId: 20,
    co: 'CO1',
    title: 'Checkpoint 2: Asymptotic Classification',
    topic: 'Growth Rate of Functions',
    subtopic: 'Unit 2 Milestone Evaluation',
    skillCategory: 'complexity',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'You have five functions: f1 = n^2, f2 = 2^n, f3 = n log n, f4 = n!, f5 = log n. Which of the following lists them in strictly increasing order of asymptotic growth?',
    options: [
      'f5 < f3 < f1 < f2 < f4',
      'f5 < f1 < f3 < f2 < f4',
      'f3 < f5 < f1 < f4 < f2',
      'f1 < f3 < f5 < f2 < f4'
    ],
    correctOptionIndex: 0,
    hints: [
      'Smallest is log n (f5).',
      'Largest is factorial n! (f4).',
      'n log n (f3) is strictly smaller than n^2 (f1).'
    ],
    explanation: 'Correct order: log n (f5) < n log n (f3) < n^2 (f1) < 2^n (f2) < n! (f4). This verifies full competence in asymptotic function ordering.',
    tags: ['checkpoint', 'classification', 'growth_ordering']
  },
  {
    id: 'q-extra-11',
    squareId: 11,
    co: 'CO1',
    title: 'Transitivity of Big-O',
    topic: 'Asymptotic Notations',
    subtopic: 'Asymptotic Properties',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'If f(n) = O(g(n)) and g(n) = O(h(n)), which property guarantees that f(n) = O(h(n))?',
    options: [
      'Transitivity of asymptotic bounds',
      'Reflexivity of Big-O',
      'Symmetry of Theta',
      'Associativity of additions'
    ],
    correctOptionIndex: 0,
    hints: [
      'If A <= B and B <= C, then A <= C.',
      'This is the transitivity property.'
    ],
    explanation: 'Transitivity states that if f(n) = O(g(n)) and g(n) = O(h(n)), then f(n) = O(h(n)). This holds for O, Omega, Theta, o, and omega.',
    tags: ['transitivity', 'properties']
  },
  {
    id: 'q-extra-13',
    squareId: 13,
    co: 'CO1',
    title: 'Big-Theta of Linear Function',
    topic: 'Asymptotic Notations',
    subtopic: 'Simple Polynomial Theta',
    skillCategory: 'numerical',
    difficulty: 'easy',
    type: 'time_complexity',
    prompt: 'Given f(n) = 5n + 20, what is its tightest Big-Theta complexity?',
    options: ['Theta(n)', 'Theta(n^2)', 'Theta(1)', 'Theta(5n)'],
    correctOptionIndex: 0,
    hints: [
      'Drop the constant multiplier (5) and the additive constant (20).',
      'The leading term is n.'
    ],
    explanation: 'For all n >= 5, 5n <= 5n + 20 <= 9n. Therefore, f(n) = Theta(n).',
    tags: ['linear', 'theta']
  }
];
