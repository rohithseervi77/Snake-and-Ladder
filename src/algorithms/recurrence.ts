/**
 * Mathematical Foundations & Recurrence Relations (CO1)
 * Substitution Method, Recurrence Tree & Master Theorem Solver
 */

export interface MasterTheoremResult {
  a: number;
  b: number;
  k: number;
  p: number;
  log_b_a: number;
  caseMatched: 1 | 2 | 3;
  complexity: string;
  explanation: string;
}

/**
 * Solves recurrences of standard divide-and-conquer form:
 * T(n) = a * T(n/b) + Theta(n^k * (log n)^p)
 */
export function solveMasterTheorem(
  a: number,
  b: number,
  k: number = 1,
  p: number = 0
): MasterTheoremResult {
  if (a < 1 || b <= 1) {
    throw new Error('Master Theorem requires a >= 1 and b > 1.');
  }

  const log_b_a = Math.log(a) / Math.log(b);
  const epsilon = 1e-6;

  // Case 1: log_b(a) > k
  if (log_b_a - k > epsilon) {
    const formattedLog = Number.isInteger(log_b_a) ? log_b_a.toString() : log_b_a.toFixed(2);
    return {
      a,
      b,
      k,
      p,
      log_b_a,
      caseMatched: 1,
      complexity: `Θ(n^${formattedLog})`,
      explanation: `Since log_${b}(${a}) = ${formattedLog} > k (${k}), the work is root-dominated by leaves. Complexity is Θ(n^(log_b a)) = Θ(n^${formattedLog}).`
    };
  }

  // Case 2: log_b(a) == k
  if (Math.abs(log_b_a - k) <= epsilon) {
    const logPower = p + 1;
    const logStr = logPower === 1 ? 'log n' : `log^${logPower} n`;
    const nStr = k === 0 ? '' : k === 1 ? 'n ' : `n^${k} `;
    return {
      a,
      b,
      k,
      p,
      log_b_a,
      caseMatched: 2,
      complexity: `Θ(${nStr}${logStr})`,
      explanation: `Since log_${b}(${a}) = k = ${k}, work is distributed equally across all tree levels. Complexity is Θ(n^k * log^(p+1) n) = Θ(${nStr}${logStr}).`
    };
  }

  // Case 3: log_b(a) < k
  const logStr = p === 0 ? '' : p === 1 ? ' log n' : ` log^${p} n`;
  const nStr = k === 1 ? 'n' : `n^${k}`;
  return {
    a,
    b,
    k,
    p,
    log_b_a,
    caseMatched: 3,
    complexity: `Θ(${nStr}${logStr})`,
    explanation: `Since log_${b}(${a}) (${log_b_a.toFixed(2)}) < k (${k}), the work is dominated by the top root level. Complexity is Θ(f(n)) = Θ(${nStr}${logStr}).`
  };
}

/**
 * Calculates Recurrence Tree statistics:
 * - Height: log_b(n)
 * - Number of subproblems at level i: a^i
 * - Size of subproblem at level i: n / (b^i)
 * - Work at level i
 */
export function getRecurrenceTreeLevelInfo(
  a: number,
  b: number,
  level: number
): { subproblems: number; subproblemSizeFraction: string; workFactor: number } {
  const subproblems = Math.pow(a, level);
  const sizeDivisor = Math.pow(b, level);
  return {
    subproblems,
    subproblemSizeFraction: `n / ${sizeDivisor}`,
    workFactor: subproblems / sizeDivisor
  };
}
