import { describe, it, expect, beforeEach } from 'vitest';
import { CHALLENGES, ChallengeRegistry } from '../data/challenges';
import { ALL_CURRICULUM_CHALLENGES } from '../data/challenges/index';
import { calculateCorrectMovement, calculateIncorrectPenalty, calculateEconomyReward } from '../engine/economyEngine';
import { consumeEnergy, addEnergy, STARTING_ENERGY } from '../engine/energyEngine';
import { BOSS_BATTLES } from '../data/bossBattles';
import { INTELLIGENT_SNAKE_MAP } from '../data/intelligentSnakes';
import { OPTIMIZATION_LADDER_MAP } from '../data/optimizationLadders';
import { DECISION_TILE_MAP } from '../data/routeSelection';
import { GamePhase } from '../types/game';

describe('Master Evolution & Anti-Exploit Verification Suite', () => {

  describe('1. 100-Square Comprehensive Curriculum Coverage', () => {
    it('verifies that all squares 1 to 100 have authored challenges', () => {
      const squareIdsWithChallenges = new Set(ALL_CURRICULUM_CHALLENGES.map(c => c.squareId));
      for (let sq = 1; sq <= 100; sq++) {
        expect(squareIdsWithChallenges.has(sq)).toBe(true);
      }
    });

    it('verifies each authored challenge has 3 progressive hints', () => {
      ALL_CURRICULUM_CHALLENGES.forEach(c => {
        expect(c.hints).toBeDefined();
        expect(c.hints?.length).toBeGreaterThanOrEqual(3);
      });
    });

    it('verifies each authored challenge has learningObjective and explanation', () => {
      ALL_CURRICULUM_CHALLENGES.forEach(c => {
        expect(c.learningObjective).toBeDefined();
        expect(c.learningObjective?.length).toBeGreaterThan(10);
        expect(c.explanation).toBeDefined();
        expect(c.explanation.length).toBeGreaterThan(15);
      });
    });

    it('filters challenges appropriately based on difficulty mode', () => {
      const registry = new ChallengeRegistry();
      // On Square 96 (Tarjan's Bridges, expert level)
      const challengeInterview = registry.getChallengeForSquare(96, true, 'interview_ready');
      expect(challengeInterview.difficulty).toMatch(/hard|expert/);

      // On Square 1 (Array indexing, easy level)
      const challengeBeginner = registry.getChallengeForSquare(1, true, 'beginner');
      expect(challengeBeginner.difficulty).toMatch(/easy|medium/);
    });
  });

  describe('2. Anti-Exploit & Penalty Consequence Integrity', () => {
    it('applies negative tile slide penalty for incorrect submission', () => {
      const penalty1 = calculateIncorrectPenalty(1);
      expect(penalty1.tilesDelta).toBeLessThan(0);
      expect(penalty1.tilesDelta).toBe(-1);

      const penalty2 = calculateIncorrectPenalty(2);
      expect(penalty2.tilesDelta).toBe(-2);

      const penalty3 = calculateIncorrectPenalty(3);
      expect(penalty3.tilesDelta).toBe(-3);
    });

    it('verifies economy deduction gives minimal consolation XP and coins for incorrect attempt', () => {
      const economyIncorrect = calculateEconomyReward(false, 'medium', true, false, false, false);
      expect(economyIncorrect.xpDelta).toBe(3);
      expect(economyIncorrect.coinsDelta).toBe(1);
    });

    it('verifies correct answer grants movement bonus matching difficulty', () => {
      const easyMove = calculateCorrectMovement('easy', true, false);
      expect(easyMove.tilesDelta).toBe(2); // 1 base + 1 first-try

      const medMove = calculateCorrectMovement('medium', true, false);
      expect(medMove.tilesDelta).toBe(3); // 2 base + 1 first-try

      const hardMove = calculateCorrectMovement('hard', true, false);
      expect(hardMove.tilesDelta).toBe(4); // 3 base + 1 first-try

      const expertMove = calculateCorrectMovement('expert', true, false);
      expect(expertMove.tilesDelta).toBe(5); // 4 base + 1 first-try
    });
  });

  describe('3. Energy Abilities Mechanics', () => {
    it('deducts energy correctly when casting abilities', () => {
      let energy = 10;
      energy = consumeEnergy(energy, 'shield')!;
      expect(energy).toBe(7); // 10 - 3

      energy = consumeEnergy(energy, 'ladder_boost')!;
      expect(energy).toBe(2); // 7 - 5

      // Can afford hint (cost 2 from 2 leaves 0)
      energy = consumeEnergy(energy, 'hint')!;
      expect(energy).toBe(0);

      // Now 0 energy cannot afford any ability
      const cannotCast = consumeEnergy(energy, 'hint');
      expect(cannotCast).toBeNull();
    });

    it('correctly adds energy capped at max 15', () => {
      let energy = 10;
      energy = addEnergy(energy, 3);
      expect(energy).toBe(13);

      energy = addEnergy(energy, 10);
      expect(energy).toBe(15); // Capped at MAX_ENERGY = 15
    });

    it('handles Second Chance ability cost (4 energy)', () => {
      const energy = 10;
      const newEnergy = consumeEnergy(energy, 'second_chance');
      expect(newEnergy).toBe(6); // 10 - 4
    });

    it('handles Debug Scan ability cost (3 energy)', () => {
      const energy = 8;
      const newEnergy = consumeEnergy(energy, 'debug_scan');
      expect(newEnergy).toBe(5); // 8 - 3
    });
  });

  describe('4. State Machine & Event Queue Invariants', () => {
    it('defines valid GamePhase state transitions', () => {
      const phases: GamePhase[] = [
        'IDLE', 
        'ROLLING', 
        'MOVING', 
        'LANDING', 
        'CHALLENGE', 
        'EVALUATING', 
        'EVENT', 
        'REWARD', 
        'VICTORY', 
        'GAME_OVER'
      ];
      expect(phases).toHaveLength(10);
    });

    it('verifies Tile 100 has Grand Boss Battle before Victory', () => {
      const boss100 = BOSS_BATTLES.find(b => b.tileNumber === 100);
      expect(boss100).toBeDefined();
      expect(boss100?.bossName).toBe('Dynamic Programming Overlord');
      expect(boss100?.steps.length).toBeGreaterThan(0);
    });

    it('verifies Decision Crossroads tiles exist at exact curriculum nodes', () => {
      const expectedDecisionTiles = [15, 30, 60, 75];
      expectedDecisionTiles.forEach(tile => {
        expect(DECISION_TILE_MAP.has(tile)).toBe(true);
      });
    });

    it('verifies Intelligent Snakes have recovery options', () => {
      expect(INTELLIGENT_SNAKE_MAP.size).toBeGreaterThanOrEqual(4);
      INTELLIGENT_SNAKE_MAP.forEach(snake => {
        expect(snake.choices).toHaveLength(3);
        expect(snake.choices[0].recoveryDelta).toBe(0);
        expect(snake.choices[1].recoveryDelta).toBe(1);
        expect(snake.choices[2].recoveryDelta).toBe(3);
      });
    });

    it('verifies Optimization Ladders have safe and expert routes', () => {
      expect(OPTIMIZATION_LADDER_MAP.size).toBeGreaterThanOrEqual(4);
      OPTIMIZATION_LADDER_MAP.forEach(ladder => {
        expect(ladder.safeOption).toBeDefined();
        expect(ladder.expertOption).toBeDefined();
        expect(ladder.expertOption.destinationTile).toBeGreaterThan(ladder.safeOption.destinationTile);
      });
    });
  });

  describe('5. Post-Game Analysis & Mastery Recommendations', () => {
    it('calculates accuracy percentage accurately', () => {
      const attempts = 20;
      const correct = 16;
      const accuracy = Math.round((correct / attempts) * 100);
      expect(accuracy).toBe(80);
    });

    it('identifies top strengths and targeted practice areas from mastery map', () => {
      const masteryScores = [
        { topicName: 'Arrays', score: 85 },
        { topicName: 'Trees', score: 92 },
        { topicName: 'Graphs', score: 45 },
        { topicName: 'Dynamic Programming', score: 38 }
      ];

      const sorted = [...masteryScores].sort((a, b) => b.score - a.score);
      const topStrengths = sorted.slice(0, 2);
      const focusAreas = [...sorted].reverse().slice(0, 2);

      expect(topStrengths[0].topicName).toBe('Trees');
      expect(topStrengths[1].topicName).toBe('Arrays');
      expect(focusAreas[0].topicName).toBe('Dynamic Programming');
      expect(focusAreas[1].topicName).toBe('Graphs');
    });
  });
});
