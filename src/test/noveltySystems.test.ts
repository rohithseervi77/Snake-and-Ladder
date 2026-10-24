import { describe, it, expect } from 'vitest';
import { generateErrorDnaProfile, calculateLearningDebt, classifyError } from '../engine/errorDnaEngine';
import { generatePersonalizedFinalBoss } from '../engine/personalizedBossEngine';
import { normalizeDsaTopic, getInitialMasteryMap, updateTopicMastery } from '../engine/masteryEngine';
import { computeMovementPlan } from '../engine/gameEngine';
import { createInitialLearnerProfile } from '../engine/adaptiveEngine';
import { LearnerProfile } from '../types/learner';
import { MisconceptionRecord, TopicMasteryScore } from '../types/evolution';

describe('Novelty Systems & Pedagogical Verification', () => {
  const dummyProfile: LearnerProfile = {
    ...createInitialLearnerProfile(),
    totalAttempts: 12,
    totalCorrect: 8,
    overallAccuracy: 0.67,
    attemptHistory: [
      {
        challengeId: 'q-1',
        squareId: 14,
        topic: 'Binary Search',
        skillCategory: 'implementation',
        isCorrect: false,
        timestamp: Date.now() - 5000
      },
      {
        challengeId: 'q-2',
        squareId: 44,
        topic: 'Graph Traversal',
        skillCategory: 'dry_run',
        isCorrect: false,
        timestamp: Date.now() - 2000
      }
    ]
  };

  const dummyMisconceptions: MisconceptionRecord[] = [
    {
      id: 'misc-1',
      topic: 'Binary Search',
      errorCategory: 'off_by_one',
      questionId: 'q-1',
      timestamp: Date.now() - 5000,
      hintUsed: false,
      explanationShown: 'Midpoint pointer calculation exceeded upper boundary high = mid instead of mid - 1',
      resolved: false
    },
    {
      id: 'misc-2',
      topic: 'Recursion',
      errorCategory: 'recursion_base_case',
      questionId: 'q-3',
      timestamp: Date.now() - 1000,
      hintUsed: true,
      explanationShown: 'Missing base case returns undefined on empty node recursion',
      resolved: false
    }
  ];

  it('1. Cognitive Error DNA: accurately categorizes misconceptions and produces diagnostic breakdown', () => {
    const masteryMap = getInitialMasteryMap();
    const dnaProfile = generateErrorDnaProfile(dummyProfile, dummyMisconceptions, masteryMap);

    expect(dnaProfile.totalMistakesAnalyzed).toBeGreaterThanOrEqual(2);
    expect(dnaProfile.primaryVector).toBeDefined();
    expect(dnaProfile.categoryBreakdown).toBeDefined();
    expect(dnaProfile.categoryBreakdown.off_by_one.count).toBeGreaterThanOrEqual(1);
    expect(dnaProfile.learningDebtPercentage).toBeGreaterThan(0);
    expect(dnaProfile.recommendedDrills.length).toBeGreaterThanOrEqual(1);
  });

  it('2. Learning Debt Engine: calculates intuitive deficit score and health status', () => {
    const masteryMap = getInitialMasteryMap();
    // Default fresh mastery has low initial scores (~15%), so debt is high
    const freshDebt = calculateLearningDebt(masteryMap, dummyMisconceptions);
    expect(freshDebt.debtPercentage).toBeGreaterThanOrEqual(70);
    expect(freshDebt.totalMisconceptions).toBe(2);
    expect(freshDebt.debtStatus).toBe('Critical');

    // Upgrade all topics to mastery (95)
    const masteredMap: Record<string, TopicMasteryScore> = {};
    Object.keys(masteryMap).forEach(key => {
      masteredMap[key] = {
        ...masteryMap[key],
        score: 95
      };
    });

    const masteredDebt = calculateLearningDebt(masteredMap, []);
    expect(masteredDebt.debtPercentage).toBeLessThan(10);
    expect(masteredDebt.debtStatus).toBe('Minimal');
  });

  it('3. Personalized Final Boss: tailors Tile 100 Grandmaster encounter to player weakest topics', () => {
    const masteryMap = getInitialMasteryMap();
    // Intentionally make Dynamic Programming and Graphs the absolute weakest
    masteryMap['Dynamic programming'] = {
      ...masteryMap['Dynamic programming'],
      score: 5,
      incorrectCount: 8
    };
    masteryMap['Graphs'] = {
      ...masteryMap['Graphs'],
      score: 10,
      incorrectCount: 6
    };

    const boss = generatePersonalizedFinalBoss(masteryMap, dummyProfile);
    expect(boss.tileNumber).toBe(100);
    expect(boss.steps.length).toBe(3);
    expect(boss.lore).toContain('cognitive Error DNA');
    expect(boss.lore).toContain('Dynamic programming');
    expect(boss.lore).toContain('Graphs');
    expect(boss.steps[0].question).toBeDefined();
    expect(boss.steps[1].options.length).toBe(4);
    expect(boss.steps[2].correctIndex).toBeGreaterThanOrEqual(0);
  });

  it('4. Topic Mastery Normalization: maps curriculum topics deterministically into 11 foundational DSA pillars', () => {
    expect(normalizeDsaTopic('Sliding Window')).toBe('Arrays and strings');
    expect(normalizeDsaTopic('Binary Search Tree Insert')).toBe('Trees and heaps');
    expect(normalizeDsaTopic('Dijkstra Algorithm')).toBe('Graphs');
    expect(normalizeDsaTopic('Dynamic Programming')).toBe('Dynamic programming');
    expect(normalizeDsaTopic('Sorting & Searching')).toBe('Searching and sorting');
    expect(normalizeDsaTopic('Linked List Inversion')).toBe('Linked lists');
  });

  it('5. Exact-Roll Grandmaster Rule: rolls exceeding Tile 100 remain in place with explicit explanation', () => {
    const allCheckpoints = new Set<number>([10, 20, 30, 40, 50, 60, 70, 80, 90]);
    
    // Player is at Tile 99, rolls a 3 -> overshoots Tile 100
    const overshotPlan = computeMovementPlan(99, 3, allCheckpoints);
    expect(overshotPlan.targetSquareBeforeTransitions).toBe(99);
    expect(overshotPlan.overshotTarget).toBe(true);
    expect(overshotPlan.overshotExplanation).toContain('Exact roll of 1 needed');

    // Player is at Tile 99, rolls a 1 -> exact roll lands cleanly on Tile 100
    const exactPlan = computeMovementPlan(99, 1, allCheckpoints);
    expect(exactPlan.targetSquareBeforeTransitions).toBe(100);
    expect(exactPlan.overshotTarget).toBe(false);
  });

  it('6. Progressive Mastery Evolution: updates topic score on correct challenge and awards first-try bonus', () => {
    const initialMap = getInitialMasteryMap();
    const topicKey = 'Searching and sorting';
    const before = initialMap[topicKey];

    const updated = updateTopicMastery(before, true, 'medium', true, false, false);
    expect(updated.score).toBeGreaterThan(before.score);
    expect(updated.correctCount).toBe(1);
    expect(updated.firstTryCount).toBe(1);
    expect(updated.evidence.length).toBeGreaterThan(0);
  });
});
