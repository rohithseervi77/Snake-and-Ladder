import { describe, it, expect } from 'vitest';
import { CURRICULUM_100, SQUARE_MAP, STAGES } from '../data/curriculum100';
import { CHALLENGES, ChallengeRegistry } from '../data/challenges';
import { SNAKES_AND_LADDERS } from '../data/snakesAndLadders';

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

  it('verifies curriculum ladders and snakes are mapped with pedagogical reasons', () => {
    expect(SNAKES_AND_LADDERS.length).toBeGreaterThanOrEqual(10);

    SNAKES_AND_LADDERS.forEach(item => {
      expect(item.pedagogicalReason).toBeDefined();
      expect(item.pedagogicalReason.length).toBeGreaterThan(10);
      expect(item.title).toBeDefined();
      expect(item.description).toBeDefined();
    });
  });

  it('verifies debugging and code analysis challenges exist with explanations', () => {
    const debugChallenges = CHALLENGES.filter(c => 
      c.skillCategory === 'debugging' || 
      c.skillCategory === 'dry_run' || 
      c.codeSnippet !== undefined
    );
    expect(debugChallenges.length).toBeGreaterThanOrEqual(10);

    debugChallenges.forEach(ch => {
      expect(ch.explanation).toBeDefined();
      expect(ch.explanation.length).toBeGreaterThan(10);
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
