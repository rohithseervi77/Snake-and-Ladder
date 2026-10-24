import { LearnerProfile } from '../types/learner';
import { MisconceptionRecord, TopicMasteryScore } from '../types/evolution';
import { DSA_TOPICS } from './masteryEngine';

export type CognitiveErrorCategory = 
  | 'complexity_confusion'
  | 'off_by_one'
  | 'edge_case_neglect'
  | 'data_structure_mismatch'
  | 'recursion_base_case'
  | 'logic_invariant_flaw';

export interface ErrorDnaProfile {
  totalMistakesAnalyzed: number;
  primaryVector: {
    category: CognitiveErrorCategory;
    displayName: string;
    count: number;
    percentage: number;
    description: string;
    remedialFocus: string;
  };
  secondaryVector?: {
    category: CognitiveErrorCategory;
    displayName: string;
    count: number;
    percentage: number;
  };
  categoryBreakdown: Record<CognitiveErrorCategory, { count: number; percentage: number; displayName: string }>;
  learningDebtPercentage: number;
  topicHealthMap: Record<string, 'stable' | 'needs_attention' | 'critical'>;
  recommendedDrills: Array<{
    title: string;
    topic: string;
    targetSquare: number;
    rationale: string;
  }>;
}

const CATEGORY_NAMES: Record<CognitiveErrorCategory, string> = {
  complexity_confusion: 'Asymptotic Complexity Confusion',
  off_by_one: 'Off-By-One & Boundary Bounds',
  edge_case_neglect: 'Edge-Case & Null-Safety Neglect',
  data_structure_mismatch: 'Data Structure Mismatch',
  recursion_base_case: 'Recursion Call Stack & Base Case',
  logic_invariant_flaw: 'Algorithm Invariant & State Flaw'
};

const CATEGORY_DESCRIPTIONS: Record<CognitiveErrorCategory, string> = {
  complexity_confusion: 'Tendency to miscalculate Big-O worst-case vs average-case time, or neglect auxiliary space recursion frames.',
  off_by_one: 'Loop bounds checking (<= vs <, 0 vs 1 indexing, or two-pointer crossover) is the frequent point of failure.',
  edge_case_neglect: 'Submissions succeed on standard inputs but fail empty arrays, single elements, duplicates, or negative bounds.',
  data_structure_mismatch: 'Selecting sub-optimal container types (e.g. array lookup O(N) when hash set O(1) or heap O(log N) was required).',
  recursion_base_case: 'Omitting termination return conditions or causing unnecessary branching stack frame depth.',
  logic_invariant_flaw: 'The core state transition or greedy premise was flawed or failed to preserve loop invariants.'
};

/**
 * Classifies a raw misconception / incorrect attempt into a cognitive error vector.
 */
export function classifyError(topic: string, skill: string, feedback: string): CognitiveErrorCategory {
  const text = `${topic} ${skill} ${feedback}`.toLowerCase();

  if (text.includes('complex') || text.includes('big-o') || text.includes('o(') || text.includes('time') || text.includes('space') || skill === 'complexity') {
    return 'complexity_confusion';
  }
  if (text.includes('bound') || text.includes('off-by-one') || text.includes('index') || text.includes('<=') || text.includes('loop condition')) {
    return 'off_by_one';
  }
  if (text.includes('edge') || text.includes('null') || text.includes('empty') || text.includes('negative') || text.includes('single element')) {
    return 'edge_case_neglect';
  }
  if (text.includes('heap') || text.includes('hash') || text.includes('stack') || text.includes('queue') || text.includes('structure') || text.includes('mismatch')) {
    return 'data_structure_mismatch';
  }
  if (text.includes('recur') || text.includes('base case') || text.includes('stack overflow') || text.includes('frame')) {
    return 'recursion_base_case';
  }
  return 'logic_invariant_flaw';
}

/**
 * Generates an authoritative Error DNA cognitive profile from learner history.
 */
export function generateErrorDnaProfile(
  profile: LearnerProfile,
  misconceptions: MisconceptionRecord[],
  topicMasteryMap: Record<string, TopicMasteryScore>
): ErrorDnaProfile {
  const counts: Record<CognitiveErrorCategory, number> = {
    complexity_confusion: 0,
    off_by_one: 0,
    edge_case_neglect: 0,
    data_structure_mismatch: 0,
    recursion_base_case: 0,
    logic_invariant_flaw: 0
  };

  // 1. Process explicit misconceptions
  misconceptions.forEach(m => {
    const cat = classifyError(m.topic, m.errorCategory, m.explanationShown);
    counts[cat] += 1;
  });

  // 2. Process failed attempts from profile
  const failedAttempts = profile.attemptHistory.filter(h => !h.isCorrect);
  failedAttempts.forEach(h => {
    const cat = classifyError(h.topic, h.skillCategory, '');
    counts[cat] += 1;
  });

  const totalMistakes = Object.values(counts).reduce((a, b) => a + b, 0);

  // If player has made 0 mistakes yet, seed baseline distribution
  if (totalMistakes === 0) {
    counts.complexity_confusion = 1;
    counts.edge_case_neglect = 1;
  }

  const effectiveTotal = Math.max(1, Object.values(counts).reduce((a, b) => a + b, 0));

  // Sort categories by frequency
  const sortedCategories = (Object.keys(counts) as CognitiveErrorCategory[]).sort(
    (a, b) => counts[b] - counts[a]
  );

  const primaryCat = sortedCategories[0];
  const secondaryCat = sortedCategories[1];

  const breakdown: ErrorDnaProfile['categoryBreakdown'] = {
    complexity_confusion: { count: counts.complexity_confusion, percentage: Math.round((counts.complexity_confusion / effectiveTotal) * 100), displayName: CATEGORY_NAMES.complexity_confusion },
    off_by_one: { count: counts.off_by_one, percentage: Math.round((counts.off_by_one / effectiveTotal) * 100), displayName: CATEGORY_NAMES.off_by_one },
    edge_case_neglect: { count: counts.edge_case_neglect, percentage: Math.round((counts.edge_case_neglect / effectiveTotal) * 100), displayName: CATEGORY_NAMES.edge_case_neglect },
    data_structure_mismatch: { count: counts.data_structure_mismatch, percentage: Math.round((counts.data_structure_mismatch / effectiveTotal) * 100), displayName: CATEGORY_NAMES.data_structure_mismatch },
    recursion_base_case: { count: counts.recursion_base_case, percentage: Math.round((counts.recursion_base_case / effectiveTotal) * 100), displayName: CATEGORY_NAMES.recursion_base_case },
    logic_invariant_flaw: { count: counts.logic_invariant_flaw, percentage: Math.round((counts.logic_invariant_flaw / effectiveTotal) * 100), displayName: CATEGORY_NAMES.logic_invariant_flaw }
  };

  // 3. Calculate Learning Debt & Topic Health
  let totalMasterySum = 0;
  let topicCount = 0;
  const topicHealthMap: Record<string, 'stable' | 'needs_attention' | 'critical'> = {};

  DSA_TOPICS.forEach(topic => {
    const tm = topicMasteryMap[topic];
    const score = tm?.score ?? 15;
    totalMasterySum += score;
    topicCount += 1;

    if (score >= 70) {
      topicHealthMap[topic] = 'stable';
    } else if (score >= 45) {
      topicHealthMap[topic] = 'needs_attention';
    } else {
      topicHealthMap[topic] = 'critical';
    }
  });

  const averageMastery = topicCount > 0 ? totalMasterySum / topicCount : 15;
  const learningDebtPercentage = Math.max(0, Math.min(100, Math.round(100 - averageMastery)));

  // 4. Targeted Drills Prescription
  const recommendedDrills = [
    {
      title: `Remediate ${CATEGORY_NAMES[primaryCat]}`,
      topic: 'Algorithms & Complexity',
      targetSquare: primaryCat === 'complexity_confusion' ? 8 : primaryCat === 'off_by_one' ? 14 : 62,
      rationale: `Diagnosed as your #1 cognitive friction vector (${breakdown[primaryCat].percentage}% of errors). Targeted practice strengthens loop bounds and asymptotic reasoning.`
    },
    {
      title: `Defense against ${CATEGORY_NAMES[secondaryCat]}`,
      topic: 'Data Structures',
      targetSquare: secondaryCat === 'edge_case_neglect' ? 22 : 44,
      rationale: `Secondary friction vector (${breakdown[secondaryCat].percentage}% of errors). Review edge cases and container invariants.`
    }
  ];

  return {
    totalMistakesAnalyzed: totalMistakes,
    primaryVector: {
      category: primaryCat,
      displayName: CATEGORY_NAMES[primaryCat],
      count: counts[primaryCat],
      percentage: breakdown[primaryCat].percentage,
      description: CATEGORY_DESCRIPTIONS[primaryCat],
      remedialFocus: `Focus on invariant bounding and systematic dry-running before committing solutions.`
    },
    secondaryVector: {
      category: secondaryCat,
      displayName: CATEGORY_NAMES[secondaryCat],
      count: counts[secondaryCat],
      percentage: breakdown[secondaryCat].percentage
    },
    categoryBreakdown: breakdown,
    learningDebtPercentage,
    topicHealthMap,
    recommendedDrills
  };
}

/**
 * Calculates dynamic Learning Debt & debt status from topic mastery scores and misconceptions.
 */
export function calculateLearningDebt(
  topicMasteryMap: Record<string, TopicMasteryScore>,
  misconceptions: MisconceptionRecord[]
) {
  const topics = Object.values(topicMasteryMap);
  const avg = topics.length > 0
    ? topics.reduce((acc, t) => acc + t.score, 0) / topics.length
    : 15;
  const debtPercentage = Math.max(0, Math.min(100, Math.round(100 - avg)));
  const totalMisconceptions = misconceptions.length;
  const activeWeakTopics = topics.filter(t => t.score < 50).map(t => t.topicName);

  let debtStatus: 'Minimal' | 'Moderate' | 'High' | 'Critical' = 'Minimal';
  if (debtPercentage > 75) debtStatus = 'Critical';
  else if (debtPercentage > 50) debtStatus = 'High';
  else if (debtPercentage > 25) debtStatus = 'Moderate';

  return {
    debtPercentage,
    totalMisconceptions,
    activeWeakTopics,
    debtStatus
  };
}
