import { describe, it, expect } from 'vitest';
import { CURRICULUM_100, SQUARE_MAP, STAGES } from '../data/curriculum100';
import { CHALLENGES, ChallengeRegistry } from '../data/challenges';

describe('100-Square Curriculum & Challenge Bank', () => {
  it('contains exactly 100 uniquely numbered squares from 1 to 100', () => {
    expect(CURRICULUM_100.length).toBe(100);

    const ids = CURRICULUM_100.map(s => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(100);

    for (let i = 1; i <= 100; i++) {
      expect(SQUARE_MAP.has(i)).toBe(true);
      const sq = SQUARE_MAP.get(i);
      expect(sq?.id).toBe(i);
      expect(sq?.title).toBeDefined();
      expect(sq?.topic).toBeDefined();
      expect(sq?.stage).toBeDefined();
      expect(sq?.checkpointTasks.length).toBeGreaterThan(0);
    }
  });

  it('covers all 10 DSA curriculum stages properly', () => {
    expect(STAGES.length).toBe(10);
    
    STAGES.forEach(stage => {
      const squaresInStage = CURRICULUM_100.filter(s => s.stage === stage.id);
      expect(squaresInStage.length).toBe(10);
    });
  });

  it('contains unique challenge IDs without duplicates', () => {
    const challengeIds = CHALLENGES.map(c => c.id);
    const uniqueChallengeIds = new Set(challengeIds);
    expect(uniqueChallengeIds.size).toBe(CHALLENGES.length);
  });

  it('verifies optimization ladders have complete brute-force and optimal comparisons', () => {
    const optimizationChallenges = CHALLENGES.filter(c => c.type === 'optimize_algorithm');
    expect(optimizationChallenges.length).toBeGreaterThanOrEqual(5);

    optimizationChallenges.forEach(opt => {
      expect(opt.optimizationComparison).toBeDefined();
      expect(opt.optimizationComparison?.bruteForce.timeComplexity).toBeDefined();
      expect(opt.optimizationComparison?.optimal.timeComplexity).toBeDefined();
      expect(opt.optimizationComparison?.whyOptimalWorks).toBeDefined();
    });
  });

  it('verifies debugging snakes have bug diagnosis and error categories', () => {
    const bugChallenges = CHALLENGES.filter(c => c.bugInfo !== undefined);
    expect(bugChallenges.length).toBeGreaterThanOrEqual(4);

    bugChallenges.forEach(bug => {
      expect(bug.bugInfo?.errorCategory).toBeDefined();
      expect(bug.bugInfo?.buggyCode).toBeDefined();
      expect(bug.bugInfo?.fixedCode).toBeDefined();
    });
  });

  it('prevents immediate question repetition using ChallengeRegistry', () => {
    const registry = new ChallengeRegistry([]);
    const firstChallenge = registry.getChallengeForSquare(1);
    expect(firstChallenge).toBeDefined();

    registry.markAttempted(firstChallenge.id, 1);
    const secondChallenge = registry.getChallengeForSquare(1);

    expect(secondChallenge.id).not.toBe(firstChallenge.id);
  });
});
