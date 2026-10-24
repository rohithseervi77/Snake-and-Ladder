import { describe, it, expect } from 'vitest';
import { 
  calculateLevelInfo, 
  calculateCorrectMovement, 
  calculateIncorrectPenalty, 
  calculateEconomyReward 
} from '../engine/economyEngine';
import { 
  INITIAL_ACHIEVEMENTS, 
  evaluateAchievements 
} from '../engine/achievementEngine';

describe('Reward & Punishment Economy Engine', () => {
  it('calculates player levels and titles accurately', () => {
    const lvl1 = calculateLevelInfo(50);
    expect(lvl1.level).toBe(1);
    expect(lvl1.title).toBe('Beginner Coder');
    expect(lvl1.progressPercent).toBe(25);

    const lvl2 = calculateLevelInfo(350);
    expect(lvl2.level).toBe(2);
    expect(lvl2.title).toBe('Array Explorer');

    const lvl5 = calculateLevelInfo(2000);
    expect(lvl5.level).toBe(5);
    expect(lvl5.title).toBe('Debugging Detective');

    const lvl10 = calculateLevelInfo(12000);
    expect(lvl10.level).toBe(10);
    expect(lvl10.title).toBe('DSA Grandmaster');
    expect(lvl10.progressPercent).toBe(100);
  });

  describe('Answer-Based Forward Movement Rewards', () => {
    it('awards correct forward tiles based on difficulty with first-try bonus', () => {
      // Easy: +1 base + 1 first-try = +2 tiles
      const easyFirst = calculateCorrectMovement('easy', true, false);
      expect(easyFirst.tilesDelta).toBe(2);

      // Medium: +2 base + 1 first-try = +3 tiles
      const medFirst = calculateCorrectMovement('medium', true, false);
      expect(medFirst.tilesDelta).toBe(3);

      // Hard: +3 base + 1 first-try = +4 tiles (Example 1 in prompt!)
      const hardFirst = calculateCorrectMovement('hard', true, false);
      expect(hardFirst.tilesDelta).toBe(4);
      expect(hardFirst.explanation).toContain('FIRST-TRY BONUS');

      // Expert: +4 base + 0 (not first try) = +4 tiles
      const expertNotFirst = calculateCorrectMovement('expert', false, false);
      expect(expertNotFirst.tilesDelta).toBe(4);
    });

    it('awards strictly +1 recovery tile when answering correctly after a mistake (Example 2 in prompt)', () => {
      // Correct after incorrect attempt: +1 recovery tile instead of normal difficulty bonus
      const recoveryHard = calculateCorrectMovement('hard', false, true);
      expect(recoveryHard.tilesDelta).toBe(1);
      expect(recoveryHard.isRecovery).toBe(true);
      expect(recoveryHard.badgeText).toBe('+1 RECOVERY TILE');
    });
  });

  describe('Answer-Based Backward Movement Penalties', () => {
    it('penalizes consecutive incorrect attempts progressively', () => {
      // First incorrect attempt: -1 tile
      const firstErr = calculateIncorrectPenalty(1);
      expect(firstErr.tilesDelta).toBe(-1);

      // Second consecutive incorrect attempt: -2 tiles
      const secondErr = calculateIncorrectPenalty(2);
      expect(secondErr.tilesDelta).toBe(-2);

      // Third consecutive incorrect attempt: -3 tiles
      const thirdErr = calculateIncorrectPenalty(3);
      expect(thirdErr.tilesDelta).toBe(-3);

      // Fourth consecutive incorrect attempt: capped at -3 tiles
      const fourthErr = calculateIncorrectPenalty(4);
      expect(fourthErr.tilesDelta).toBe(-3);
    });
  });

  describe('XP and Coins Reward Integrity', () => {
    it('calculates correct rewards for easy, medium, hard, expert', () => {
      const easyReward = calculateEconomyReward(true, 'easy', true, false, false, false);
      expect(easyReward.xpDelta).toBe(30); // 20 base + 10 first-try
      expect(easyReward.coinsDelta).toBe(15); // 10 base + 5 first-try

      const hardOptReward = calculateEconomyReward(true, 'hard', true, false, true, false);
      expect(hardOptReward.xpDelta).toBe(90); // 60 base + 10 first-try + 20 optimization
      expect(hardOptReward.coinsDelta).toBe(40); // 25 base + 5 first-try + 10 optimization
    });

    it('awards participation XP/coins for mistakes without penalizing currency', () => {
      const incorrectReward = calculateEconomyReward(false, 'hard', false, false, false, false);
      expect(incorrectReward.xpDelta).toBe(3);
      expect(incorrectReward.coinsDelta).toBe(1);
    });

    it('awards recovery reward upon solving previously failed challenge', () => {
      const recoveryReward = calculateEconomyReward(true, 'hard', false, true, false, false);
      expect(recoveryReward.xpDelta).toBe(15);
      expect(recoveryReward.coinsDelta).toBe(5);
    });
  });

  describe('Achievement System', () => {
    it('unlocks achievements when criteria are satisfied', () => {
      let achievements = [...INITIAL_ACHIEVEMENTS];

      const { updatedList: list1, newlyUnlocked: unlocked1 } = evaluateAchievements(achievements, {
        totalSolved: 1,
        streak: 1,
        recoveryCount: 0,
        arraySolved: 1,
        debugSolved: 0,
        optSolved: 0,
        complexitySolved: 0,
        graphSolved: 0,
        dpSolved: 0,
        currentTile: 5
      });

      expect(unlocked1.length).toBe(1);
      expect(unlocked1[0].id).toBe('first_steps');

      // Check consistent learner (5 streak)
      const { updatedList: list2, newlyUnlocked: unlocked2 } = evaluateAchievements(list1, {
        totalSolved: 6,
        streak: 5,
        recoveryCount: 0,
        arraySolved: 3,
        debugSolved: 0,
        optSolved: 0,
        complexitySolved: 0,
        graphSolved: 0,
        dpSolved: 0,
        currentTile: 25
      });

      const consistentAch = unlocked2.find(a => a.id === 'consistent_learner');
      expect(consistentAch).toBeDefined();

      const arrayAch = unlocked2.find(a => a.id === 'array_explorer');
      expect(arrayAch).toBeDefined();
    });
  });
});
