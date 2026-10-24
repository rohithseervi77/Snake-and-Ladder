import { BossBattle, TopicMasteryScore } from '../types/evolution';
import { LearnerProfile } from '../types/learner';
import { BOSS_BATTLES } from '../data/bossBattles';

interface TopicWeaknessSummary {
  topic: string;
  score: number;
  incorrectCount: number;
}

/**
 * Dynamically synthesizes a personalized Tile 100 Grandmaster Boss Trial
 * tailored specifically against the player's demonstrated learning weaknesses.
 */
export function generatePersonalizedFinalBoss(
  topicMasteryMap: Record<string, TopicMasteryScore>,
  learnerProfile: LearnerProfile
): BossBattle {
  const defaultTitan = BOSS_BATTLES.find(b => b.tileNumber === 100) || BOSS_BATTLES[BOSS_BATTLES.length - 1];

  // 1. Identify weakest topics from mastery map & attempt history
  const topicList: TopicWeaknessSummary[] = Object.values(topicMasteryMap).map(tm => ({
    topic: tm.topicName,
    score: tm.score,
    incorrectCount: tm.incorrectCount
  }));

  // Sort by lowest score, then highest mistakes
  topicList.sort((a, b) => a.score - b.score || b.incorrectCount - a.incorrectCount);

  const weakest1 = topicList[0]?.topic || 'Dynamic programming';
  const weakest2 = topicList[1]?.topic || 'Graphs';

  // If player is already a master across all topics (all >= 80)
  const isAllMastered = topicList.every(t => t.score >= 80);

  if (isAllMastered) {
    return {
      id: 'boss-personalized-grandmaster',
      region: 5,
      regionName: 'Apex Grandmaster Citadel (Tile 100)',
      tileNumber: 100,
      bossName: 'The Omniscient Algorithmic Titan',
      title: 'Apex Graduation: High-Order Synthesis & Trade-Off Matrix',
      lore: 'You have mastered all standard DSA curriculum pillars. The Titan unleashes an Apex synthesis trial combining advanced disjoint state partitions with distributed memory scale.',
      steps: [
        {
          stepNumber: 1,
          title: 'Phase 1: Dynamic State Compression',
          question: 'When solving Traveling Salesperson or Hamiltonian Path with N = 20, how can state space be compressed efficiently into memory?',
          options: [
            'Bitmask DP dp[mask][u] where bitmask represents visited subset in O(N² · 2ᴺ) time and O(N · 2ᴺ) space',
            'Full brute force recursion checking N! permutations sequentially in O(N!) time',
            'Store all paths as JSON strings inside a global hash table',
            'Apply Dijkstra directly without tracking visited vertices'
          ],
          correctIndex: 0,
          explanation: 'Bitmask DP compresses the set of visited vertices into a 32-bit integer bitfield, reducing N! down to O(N² · 2ᴺ).'
        },
        {
          stepNumber: 2,
          title: 'Phase 2: Amortized Union-Find Disjoint Set',
          question: 'What is the tightest upper bound on M union/find operations over N elements using Path Compression and Union by Rank?',
          options: [
            'O(M · α(N)) where α is the Inverse Ackermann function (effectively constant <= 4 for all universe atoms)',
            'Strict O(M · log N) logarithmic time',
            'O(M · N) quadratic time',
            'O(M · √N) square root time'
          ],
          correctIndex: 0,
          explanation: 'Combining path compression and union by rank guarantees nearly linear O(M · α(N)) amortized time.'
        },
        {
          stepNumber: 3,
          title: 'Phase 3: Asymptotic Boundary Proof',
          question: 'Why can comparison-based sorting algorithms never achieve a worst-case time complexity better than Ω(N log N)?',
          options: [
            'Any decision tree for N distinct items has N! leaves and height at least log₂(N!) ≈ N log₂ N by Stirling\'s approximation',
            'Because modern computer CPUs only have 64-bit registers',
            'Because memory allocation always requires quadratic overhead',
            'Because array traversal requires logarithmic pointer lookups'
          ],
          correctIndex: 0,
          explanation: 'The decision tree model mathematically proves that any comparison sort requires height >= log₂(N!) = Ω(N log N).'
        }
      ],
      rewardXp: 500,
      rewardCoins: 150,
      rewardEnergy: 10,
      defeated: false
    };
  }

  // 2. Synthesize custom trial addressing weakest1 and weakest2
  return {
    id: `boss-personalized-${Date.now()}`,
    region: 5,
    regionName: `Adaptive Crucible: ${weakest1} & ${weakest2} (Tile 100)`,
    tileNumber: 100,
    bossName: `The Adaptive Titan of ${weakest1}`,
    title: `Personalized Final Boss: Remediation & Titan Mastery`,
    lore: `The Final Titan senses your journey history! Based on your cognitive Error DNA, it constructs a tailored trial targeting your historical growth areas in ${weakest1} and ${weakest2}.`,
    steps: [
      {
        stepNumber: 1,
        title: `Phase 1: Remediation of ${weakest1}`,
        question: `To conquer your growth area in ${weakest1}, what foundational invariant prevents off-by-one errors and guarantees algorithmic correctness?`,
        options: [
          `Explicitly define inductive base states, bound state transition parameters, and verify termination conditions`,
          `Skip edge cases and rely on default try/catch error handling in runtime`,
          `Use nested loops across all possibilities without bounding complexity`,
          `Disable memoization to reduce RAM memory pressure`
        ],
        correctIndex: 0,
        explanation: `Establishing rigorous base cases and inductive invariants ensures your ${weakest1} solutions never fail boundary edge cases.`
      },
      {
        stepNumber: 2,
        title: `Phase 2: Advanced Defense in ${weakest2}`,
        question: `When optimizing high-scale operations involving ${weakest2}, which strategy guarantees optimal time and space complexity?`,
        options: [
          `Eliminate redundant sub-computations via hash tables or dynamic programming, achieving optimal asymptotic bounds`,
          `Re-run linear searches on every element repeatedly`,
          `Store duplicate states in unbounded arrays without indexing`,
          `Use bubble sort to organize vertices on every lookup`
        ],
        correctIndex: 0,
        explanation: `Caching repeated subproblems and indexing vertices turns quadratic bottlenecks into linear or log-linear pipelines.`
      },
      {
        stepNumber: 3,
        title: 'Phase 3: The Grandmaster Synthesis Trial',
        question: `In modern technical engineering, how do top developers verify that their solution is interview-ready and optimal before submitting?`,
        options: [
          `Dry-run with extreme edge cases (empty, single element, negative, duplicates), state time & space Big-O, and justify tradeoffs`,
          `Immediately submit without dry running to save time`,
          `Only check happy-path inputs where N is small`,
          `Rely entirely on automated test suites without manual trace analysis`
        ],
        correctIndex: 0,
        explanation: `Verifying edge-cases, dry-running with pointer traces, and articulating Big-O tradeoffs represents true DSA mastery.`
      }
    ],
    rewardXp: 400,
    rewardCoins: 120,
    rewardEnergy: 8,
    defeated: false
  };
}
