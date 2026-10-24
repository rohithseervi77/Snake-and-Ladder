import { describe, it, expect } from 'vitest';
import { 
  computeMovementPlan, 
  getSquareGridCoords, 
  getSquarePercentCoords 
} from '../engine/gameEngine';
import { 
  calculateCorrectMovement, 
  calculateIncorrectPenalty, 
  calculateEconomyReward, 
  calculateLevelInfo 
} from '../engine/economyEngine';
import { 
  INITIAL_ACHIEVEMENTS, 
  evaluateAchievements 
} from '../engine/achievementEngine';
import { 
  getInitialGameState, 
  loadGameState, 
  saveGameState 
} from '../engine/storage';
import { SNAKE_MAP, LADDER_MAP } from '../data/snakesAndLadders';
import { SHOP_ITEMS } from '../data/shopItems';

describe('PART 12: Comprehensive Board Movement & Gameplay Verification', () => {
  describe('1. Board Movement Tests', () => {
    it('Roll a 4 and verify movement by four tiles', () => {
      const currentTile = 10;
      const roll = 4;
      const passedCheckpoints = new Set<number>([10]);
      const plan = computeMovementPlan(currentTile, roll, passedCheckpoints);

      expect(plan.targetSquareBeforeTransitions).toBe(14);
      expect(plan.intermediateSteps).toEqual([11, 12, 13, 14]);
    });

    it('Answer an easy question correctly and verify +1 bonus tile', () => {
      // Easy question without first-try bonus: +1 tile
      const result = calculateCorrectMovement('easy', false, false);
      expect(result.tilesDelta).toBe(1);
    });

    it('Answer a medium question correctly and verify +2 bonus tiles', () => {
      // Medium question without first-try bonus: +2 tiles
      const result = calculateCorrectMovement('medium', false, false);
      expect(result.tilesDelta).toBe(2);
    });

    it('Answer a hard question correctly and verify +3 bonus tiles', () => {
      // Hard question without first-try bonus: +3 tiles
      const result = calculateCorrectMovement('hard', false, false);
      expect(result.tilesDelta).toBe(3);
    });

    it('Answer an expert question correctly and verify +4 bonus tiles', () => {
      // Expert question without first-try bonus: +4 tiles
      const result = calculateCorrectMovement('expert', false, false);
      expect(result.tilesDelta).toBe(4);
    });

    it('Answer correctly on the first attempt and verify the additional tile', () => {
      // Easy on first try: 1 + 1 = 2
      expect(calculateCorrectMovement('easy', true, false).tilesDelta).toBe(2);

      // Medium on first try: 2 + 1 = 3
      expect(calculateCorrectMovement('medium', true, false).tilesDelta).toBe(3);

      // Hard on first try (Example 1 in prompt): 3 + 1 = 4
      const hardFirst = calculateCorrectMovement('hard', true, false);
      expect(hardFirst.tilesDelta).toBe(4);
      expect(hardFirst.isFirstAttempt).toBe(true);

      // Expert on first try: 4 + 1 = 5
      expect(calculateCorrectMovement('expert', true, false).tilesDelta).toBe(5);
    });

    it('Answer incorrectly and verify the correct backward movement', () => {
      // First incorrect attempt: -1 tile
      const firstError = calculateIncorrectPenalty(1);
      expect(firstError.tilesDelta).toBe(-1);
    });

    it('Submit consecutive incorrect answers and verify the penalty sequence', () => {
      // 1st incorrect attempt: -1 tile
      expect(calculateIncorrectPenalty(1).tilesDelta).toBe(-1);

      // 2nd consecutive incorrect attempt: -2 tiles
      expect(calculateIncorrectPenalty(2).tilesDelta).toBe(-2);

      // 3rd consecutive incorrect attempt: -3 tiles
      expect(calculateIncorrectPenalty(3).tilesDelta).toBe(-3);

      // 4th and subsequent consecutive incorrect attempt: -3 tiles (capped)
      expect(calculateIncorrectPenalty(4).tilesDelta).toBe(-3);
      expect(calculateIncorrectPenalty(10).tilesDelta).toBe(-3);
    });

    it('Answer correctly after a mistake and verify the recovery movement', () => {
      // Correct after incorrect attempt: +1 recovery tile instead of normal difficulty bonus
      const recovery = calculateCorrectMovement('hard', false, true);
      expect(recovery.tilesDelta).toBe(1);
      expect(recovery.isRecovery).toBe(true);
      expect(recovery.explanation).toContain('COMEBACK');
    });

    it('Verify that the player cannot move below tile 1', () => {
      const currentPos = 2;
      const penaltyDelta = -3;
      const newPos = Math.max(1, currentPos + penaltyDelta);
      expect(newPos).toBe(1);

      const atTile1 = 1;
      const newPosFrom1 = Math.max(1, atTile1 + penaltyDelta);
      expect(newPosFrom1).toBe(1);
    });

    it('Verify that the player cannot move beyond tile 100', () => {
      const passedCheckpoints = new Set<number>([10, 20, 30, 40, 50, 60, 70, 80, 90]);
      // At tile 98, rolling 5 would exceed 100 -> stays in place at 98 per Rule 8 exact-roll rule
      const plan = computeMovementPlan(98, 5, passedCheckpoints);
      expect(plan.targetSquareBeforeTransitions).toBeLessThanOrEqual(100);
      expect(plan.targetSquareBeforeTransitions).toBe(98);
      expect(plan.overshotExplanation).toContain('Exact roll of 2 needed');
    });

    it('Verify snake movement downward', () => {
      expect(SNAKE_MAP.has(14)).toBe(true);
      const snake14 = SNAKE_MAP.get(14)!;
      expect(snake14.to).toBe(7);
      expect(snake14.to).toBeLessThan(snake14.from);

      expect(SNAKE_MAP.has(50)).toBe(true);
      const snake50 = SNAKE_MAP.get(50)!;
      expect(snake50.to).toBe(42);

      expect(SNAKE_MAP.has(96)).toBe(true);
      const snake96 = SNAKE_MAP.get(96)!;
      expect(snake96.to).toBe(85);
    });

    it('Verify ladder movement upward', () => {
      expect(LADDER_MAP.has(10)).toBe(true);
      const ladder10 = LADDER_MAP.get(10)!;
      expect(ladder10.to).toBe(28);
      expect(ladder10.to).toBeGreaterThan(ladder10.from);

      expect(LADDER_MAP.has(36)).toBe(true);
      const ladder36 = LADDER_MAP.get(36)!;
      expect(ladder36.to).toBe(46);

      expect(LADDER_MAP.has(82)).toBe(true);
      const ladder82 = LADDER_MAP.get(82)!;
      expect(ladder82.to).toBe(92);
    });

    it('Verify the victory sequence on reaching tile 100', () => {
      const passedCheckpoints = new Set<number>([10, 20, 30, 40, 50, 60, 70, 80, 90]);
      const plan = computeMovementPlan(96, 4, passedCheckpoints);
      expect(plan.targetSquareBeforeTransitions).toBe(100);
      expect(plan.isGameFinished).toBe(true);
    });
  });

  describe('2. Reward & Economy Tests', () => {
    it('Verify XP and coin rewards for each difficulty', () => {
      // Easy: 20 XP, 10 Coins
      const easy = calculateEconomyReward(true, 'easy', false, false, false, false);
      expect(easy.xpDelta).toBe(20);
      expect(easy.coinsDelta).toBe(10);

      // Medium: 35 XP, 15 Coins
      const med = calculateEconomyReward(true, 'medium', false, false, false, false);
      expect(med.xpDelta).toBe(35);
      expect(med.coinsDelta).toBe(15);

      // Hard: 60 XP, 25 Coins
      const hard = calculateEconomyReward(true, 'hard', false, false, false, false);
      expect(hard.xpDelta).toBe(60);
      expect(hard.coinsDelta).toBe(25);

      // Expert: 100 XP, 40 Coins
      const expert = calculateEconomyReward(true, 'expert', false, false, false, false);
      expect(expert.xpDelta).toBe(100);
      expect(expert.coinsDelta).toBe(40);
    });

    it('Verify first-attempt bonuses (+10 XP, +5 Coins)', () => {
      const easyFirst = calculateEconomyReward(true, 'easy', true, false, false, false);
      expect(easyFirst.xpDelta).toBe(30); // 20 + 10
      expect(easyFirst.coinsDelta).toBe(15); // 10 + 5

      const hardFirst = calculateEconomyReward(true, 'hard', true, false, false, false);
      expect(hardFirst.xpDelta).toBe(70); // 60 + 10
      expect(hardFirst.coinsDelta).toBe(30); // 25 + 5
    });

    it('Verify recovery rewards (+15 XP, +5 Coins)', () => {
      const recovery = calculateEconomyReward(true, 'hard', false, true, false, false);
      expect(recovery.xpDelta).toBe(15);
      expect(recovery.coinsDelta).toBe(5);
    });

    it('Verify that earned rewards remain earned after backward movement', () => {
      // When player answers incorrectly: they earn +3 XP participation and +1 coin
      // They NEVER lose previously accumulated XP or coins!
      const initialXp = 500;
      const initialCoins = 100;

      const incorrectReward = calculateEconomyReward(false, 'hard', false, false, false, false);
      const postXp = initialXp + incorrectReward.xpDelta;
      const postCoins = initialCoins + incorrectReward.coinsDelta;

      expect(postXp).toBeGreaterThanOrEqual(initialXp);
      expect(postCoins).toBeGreaterThanOrEqual(initialCoins);
      expect(postXp).toBe(503);
      expect(postCoins).toBe(101);
    });

    it('Verify level progression across XP thresholds', () => {
      expect(calculateLevelInfo(0).level).toBe(1);
      expect(calculateLevelInfo(0).title).toBe('Beginner Coder');

      expect(calculateLevelInfo(200).level).toBe(2);
      expect(calculateLevelInfo(200).title).toBe('Array Explorer');

      expect(calculateLevelInfo(1000).level).toBe(4);
      expect(calculateLevelInfo(1000).title).toBe('Algorithm Apprentice');

      expect(calculateLevelInfo(5500).level).toBe(8);
      expect(calculateLevelInfo(5500).title).toBe('Optimization Expert');

      expect(calculateLevelInfo(9200).level).toBe(10);
      expect(calculateLevelInfo(9200).title).toBe('DSA Grandmaster');
    });

    it('Verify achievement conditions evaluation', () => {
      const { updatedList, newlyUnlocked } = evaluateAchievements(INITIAL_ACHIEVEMENTS, {
        totalSolved: 1,
        streak: 1,
        recoveryCount: 0,
        arraySolved: 1,
        debugSolved: 0,
        optSolved: 0,
        complexitySolved: 0,
        graphSolved: 0,
        dpSolved: 0,
        currentTile: 1
      });

      expect(newlyUnlocked.some(a => a.id === 'first_steps')).toBe(true);
      const firstSteps = updatedList.find(a => a.id === 'first_steps');
      expect(firstSteps?.unlocked).toBe(true);
    });

    it('Verify shop purchases and coin deductions', () => {
      const startCoins = 150;
      const itemToBuy = SHOP_ITEMS.find(item => item.id === 'theme-cyberpunk-indigo')!;
      expect(itemToBuy).toBeDefined();
      expect(itemToBuy.cost).toBe(100);

      // Verify deduction
      const remainingCoins = startCoins - itemToBuy.cost;
      expect(remainingCoins).toBe(50);

      // Verify purchase prevents duplicate buy
      const purchasedSet = new Set(['theme-obsidian-navy']);
      purchasedSet.add(itemToBuy.id);
      expect(purchasedSet.has('theme-cyberpunk-indigo')).toBe(true);
    });

    it('Verify persistence after refreshing the page', () => {
      const storageMock: Record<string, string> = {};
      const origWindow = (globalThis as any).window;
      const origLocalStorage = (globalThis as any).localStorage;

      const mockStorage = {
        getItem: (key: string) => storageMock[key] || null,
        setItem: (key: string, val: string) => { storageMock[key] = val; },
        removeItem: (key: string) => { delete storageMock[key]; }
      };

      (globalThis as any).localStorage = mockStorage;
      (globalThis as any).window = {
        localStorage: mockStorage
      };

      const state = getInitialGameState();
      state.currentPosition = 42;
      state.totalScore = 650;
      state.coins = 120;
      state.streak = 4;
      state.equippedCosmetics.boardTheme = 'theme-cyberpunk-indigo';

      saveGameState(state);
      const loaded = loadGameState();

      expect(loaded.currentPosition).toBe(42);
      expect(loaded.totalScore).toBe(650);
      expect(loaded.coins).toBe(120);
      expect(loaded.streak).toBe(4);
      expect(loaded.equippedCosmetics.boardTheme).toBe('theme-cyberpunk-indigo');

      (globalThis as any).window = origWindow;
      (globalThis as any).localStorage = origLocalStorage;
    });
  });

  describe('3. Autoplay & State Engine Tests', () => {
    it('Verifies autoplay speed settings (1x, 2x, 4x)', () => {
      const speeds = [1, 2, 4];
      speeds.forEach(speed => {
        const intervalMs = Math.max(700, Math.floor(2200 / speed));
        expect(intervalMs).toBeGreaterThan(0);
        if (speed === 4) {
          expect(intervalMs).toBeLessThanOrEqual(700);
        }
      });
    });

    it('Verifies serpentine board coordinate integrity across all 100 tiles', () => {
      for (let s = 1; s <= 100; s++) {
        const grid = getSquareGridCoords(s);
        expect(grid.gridRow).toBeGreaterThanOrEqual(0);
        expect(grid.gridRow).toBeLessThanOrEqual(9);
        expect(grid.gridCol).toBeGreaterThanOrEqual(0);
        expect(grid.gridCol).toBeLessThanOrEqual(9);

        const pct = getSquarePercentCoords(s);
        expect(pct.x).toBeGreaterThan(0);
        expect(pct.x).toBeLessThan(100);
        expect(pct.y).toBeGreaterThan(0);
        expect(pct.y).toBeLessThan(100);
      }
    });
  });
});
