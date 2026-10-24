import { describe, it, expect, beforeEach } from 'vitest';
import { 
  getInitialMasteryMap, 
  updateTopicMastery, 
  calculateMasteryLevel, 
  DSA_TOPICS 
} from '../engine/masteryEngine';
import { 
  DECISION_TILES, 
  evaluateRouteAvailability 
} from '../data/routeSelection';
import { INTELLIGENT_SNAKES, INTELLIGENT_SNAKE_MAP } from '../data/intelligentSnakes';
import { OPTIMIZATION_LADDERS, OPTIMIZATION_LADDER_MAP } from '../data/optimizationLadders';
import { BOSS_BATTLES } from '../data/bossBattles';
import { BUGBOT_SCENARIOS } from '../data/bugBotScenarios';
import { BOARD_MUTATIONS } from '../data/boardMutations';
import { 
  addEnergy, 
  consumeEnergy, 
  canAffordAbility, 
  MAX_ENERGY, 
  STARTING_ENERGY, 
  ENERGY_ABILITIES 
} from '../engine/energyEngine';
import { createMisconceptionRecord, generateEchoChallenge } from '../engine/futureEchoEngine';
import { getInitialGameState, loadGameState, saveGameState } from '../engine/storage';

// In-memory localStorage mock for node environment
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

(globalThis as any).localStorage = localStorageMock;
(globalThis as any).window = globalThis;

describe('FEATURE 1: LIVING BOARD & ROUTE SELECTION', () => {
  it('defines decision tiles at strategic intervals (15, 30, 60, 75)', () => {
    const tileNumbers = DECISION_TILES.map(d => d.tileNumber);
    expect(tileNumbers).toEqual([15, 30, 60, 75]);
  });

  it('evaluates Knowledge Route as unconditionally unlocked for foundational recovery', () => {
    const config = DECISION_TILES[0]; // Tile 15
    const masteryMap = getInitialMasteryMap();
    const result = evaluateRouteAvailability(config, masteryMap, 0);

    expect(result.knowledge.isUnlocked).toBe(true);
    expect(result.knowledge.type).toBe('knowledge');
  });

  it('locks Challenge Route when mastery requirement is not met', () => {
    const config = DECISION_TILES[0]; // Tile 15 requires 30 mastery
    const masteryMap = getInitialMasteryMap(); // initial score is 15
    const result = evaluateRouteAvailability(config, masteryMap, 0);

    expect(result.challenge.isUnlocked).toBe(false);
    expect(result.challenge.lockedReason).toContain('Requires 30% mastery');
  });

  it('unlocks Challenge Route once topic mastery threshold is reached', () => {
    const config = DECISION_TILES[0];
    const masteryMap = getInitialMasteryMap();
    masteryMap['Arrays and strings'].score = 45; // Met >= 30

    const result = evaluateRouteAvailability(config, masteryMap, 0);
    expect(result.challenge.isUnlocked).toBe(true);
  });

  it('locks Risk Route when energy is insufficient even if mastery is satisfied', () => {
    const config = DECISION_TILES[0]; // requires 55 mastery & 3 energy
    const masteryMap = getInitialMasteryMap();
    masteryMap['Arrays and strings'].score = 70;

    const result = evaluateRouteAvailability(config, masteryMap, 1); // only 1 energy
    expect(result.risk.isUnlocked).toBe(false);
    expect(result.risk.lockedReason).toContain('Algorithm Energy');
  });

  it('unlocks Risk Route when both high mastery and sufficient energy are present', () => {
    const config = DECISION_TILES[0];
    const masteryMap = getInitialMasteryMap();
    masteryMap['Arrays and strings'].score = 65;

    const result = evaluateRouteAvailability(config, masteryMap, 5); // 5 energy >= 3
    expect(result.risk.isUnlocked).toBe(true);
  });
});

describe('FEATURE 2: MASTERY TRACKING & ANTI-INFLATION ENGINE', () => {
  it('initializes all 11 distinct DSA topics with baseline metrics', () => {
    const masteryMap = getInitialMasteryMap();
    const topics = Object.keys(masteryMap);
    expect(topics.length).toBe(11);
    expect(topics).toContain('Arrays and strings');
    expect(topics).toContain('Dynamic programming');
    expect(topics).toContain('Graphs');
  });

  it('correctly maps scores to mastery tiers', () => {
    expect(calculateMasteryLevel(20)).toBe('novice');
    expect(calculateMasteryLevel(45)).toBe('practitioner');
    expect(calculateMasteryLevel(72)).toBe('expert');
    expect(calculateMasteryLevel(90)).toBe('master');
  });

  it('applies anti-inflation diminishing returns to high scores', () => {
    const initial = getInitialMasteryMap()['Arrays and strings'];
    
    // Normal progress when score is low
    const lowScoreObj = { ...initial, score: 20 };
    const lowResult = updateTopicMastery(lowScoreObj, true, 'hard', true, false, false);
    const lowGain = lowResult.score - 20;

    // Diminished progress when score is in expert range (>= 80)
    const highScoreObj = { ...initial, score: 82 };
    const highResult = updateTopicMastery(highScoreObj, true, 'hard', true, false, false);
    const highGain = highResult.score - 82;

    expect(highGain).toBeLessThan(lowGain);
    expect(highResult.score).toBeLessThanOrEqual(100);
  });

  it('awards extra bonus for comeback recovery following an earlier mistake', () => {
    const initial = getInitialMasteryMap()['Dynamic programming'];
    const standardSolve = updateTopicMastery(initial, true, 'medium', false, false, false);
    const recoverySolve = updateTopicMastery(initial, true, 'medium', false, true, false);

    expect(recoverySolve.score).toBeGreaterThan(standardSolve.score);
    expect(recoverySolve.evidence[0]).toContain('Recovered with comeback answer');
  });

  it('strictly bounds mastery scores between 0 and 100', () => {
    const initial = getInitialMasteryMap()['Stacks and queues'];
    const zeroFloorObj = { ...initial, score: 2 };
    const decayed = updateTopicMastery(zeroFloorObj, false, 'hard', false, false, false);
    expect(decayed.score).toBe(0);

    const ceilingObj = { ...initial, score: 98 };
    const boosted = updateTopicMastery(ceilingObj, true, 'hard', true, true, false);
    expect(boosted.score).toBeLessThanOrEqual(100);
  });
});

describe('FEATURE 3: INTELLIGENT SNAKES & RECOVERY CHOICES', () => {
  it('provides 5 named snakes with explicit algorithmic misconceptions', () => {
    expect(INTELLIGENT_SNAKES.length).toBe(5);
    const tiles = INTELLIGENT_SNAKES.map(s => s.from);
    expect(tiles).toEqual([14, 19, 50, 63, 96]);
  });

  it('includes 3 strategic recovery options for each snake', () => {
    INTELLIGENT_SNAKES.forEach(snake => {
      expect(snake.choices.length).toBe(3);
      const choiceIds = snake.choices.map(c => c.id);
      expect(choiceIds).toContain('accept');
      expect(choiceIds).toContain('concept');
      expect(choiceIds).toContain('debugging');

      const conceptChoice = snake.choices.find(c => c.id === 'concept')!;
      expect(conceptChoice.recoveryDelta).toBe(1);

      const debugChoice = snake.choices.find(c => c.id === 'debugging')!;
      expect(debugChoice.recoveryDelta).toBe(3);
    });
  });

  it('can be queried instantly via INTELLIGENT_SNAKE_MAP', () => {
    const snake50 = INTELLIGENT_SNAKE_MAP.get(50);
    expect(snake50).toBeDefined();
    expect(snake50?.name).toContain('Off-by-One');
    expect(snake50?.misconceptionType).toBe('off_by_one');
  });
});

describe('FEATURE 4: OPTIMIZATION LADDERS', () => {
  it('provides 5 optimization ladders with Safe vs Expert options', () => {
    expect(OPTIMIZATION_LADDERS.length).toBe(5);
    const ladder10 = OPTIMIZATION_LADDER_MAP.get(10);
    expect(ladder10).toBeDefined();

    expect(ladder10?.safeOption.destinationTile).toBe(28);
    expect(ladder10?.expertOption.destinationTile).toBe(32);
    expect(ladder10?.expertOption.bonusTiles).toBe(4);
    expect(ladder10?.expertOption.failurePenalty).toBe(2);
  });
});

describe('FEATURE 5: FUTURE ECHO ENGINE', () => {
  it('records misconception and schedules an echo 6 tiles ahead', () => {
    const misc = createMisconceptionRecord(
      'Linked lists',
      'null_pointer',
      'c-22',
      'Dereferenced null pointer during list reversal',
      false
    );

    expect(misc.topic).toBe('Linked lists');
    expect(misc.errorCategory).toBe('null_pointer');
    expect(misc.resolved).toBe(false);

    const echo = generateEchoChallenge(misc, 24);
    expect(echo.scheduledTile).toBe(30); // 24 + 6
    expect(echo.active).toBe(true);
    expect(echo.challenge.title).toContain('Future Echo');
    expect(echo.challenge.prompt).toContain('FUTURE ECHO CHALLENGE');
  });
});

describe('FEATURE 6: BOARD MUTATIONS', () => {
  it('schedules predetermined mutation events on turns 5, 10, 15, 20', () => {
    expect(BOARD_MUTATIONS.length).toBeGreaterThanOrEqual(4);
    const turns = BOARD_MUTATIONS.map(m => m.triggerTurn);
    expect(turns).toContain(5);
    expect(turns).toContain(10);
    expect(turns).toContain(15);
    expect(turns).toContain(20);
  });
});

describe('FEATURE 7: BOSS BATTLES', () => {
  it('configures 5 regional bosses at tiles 20, 40, 60, 80, 100', () => {
    expect(BOSS_BATTLES.length).toBe(5);
    const bossTiles = BOSS_BATTLES.map(b => b.tileNumber);
    expect(bossTiles).toEqual([20, 40, 60, 80, 100]);

    BOSS_BATTLES.forEach(boss => {
      expect(boss.steps.length).toBe(3);
      expect(boss.rewardXp).toBeGreaterThanOrEqual(150);
      expect(boss.rewardEnergy).toBeGreaterThanOrEqual(4);
    });
  });
});

describe('FEATURE 8: BUGBOT RIVAL SCENARIOS', () => {
  it('contains 5 rich debugging rival scenarios', () => {
    expect(BUGBOT_SCENARIOS.length).toBe(5);
    const topics = BUGBOT_SCENARIOS.map(s => s.topic);
    expect(topics).toContain('Arrays and Strings');
    expect(topics).toContain('Linked Lists');
    expect(topics).toContain('Recursion and Backtracking');
    expect(topics).toContain('Dynamic Programming');
    expect(topics).toContain('Graph Algorithms');

    BUGBOT_SCENARIOS.forEach(scenario => {
      expect(scenario.buggyCode.length).toBeGreaterThan(10);
      expect(scenario.options.some(o => o.isCorrect)).toBe(true);
      expect(scenario.rewardEnergy).toBeGreaterThan(0);
    });
  });
});

describe('FEATURE 9: ALGORITHM ENERGY SYSTEM', () => {
  it('manages energy bounds between 0 and 15 with starting value of 5', () => {
    expect(STARTING_ENERGY).toBe(5);
    expect(MAX_ENERGY).toBe(15);

    expect(addEnergy(5, 4)).toBe(9);
    expect(addEnergy(14, 5)).toBe(15); // capped at MAX_ENERGY
    expect(addEnergy(2, -10)).toBe(0); // floored at 0
  });

  it('validates ability affordability and consumes energy correctly', () => {
    expect(canAffordAbility(2, 'hint')).toBe(true);   // cost 2
    expect(canAffordAbility(2, 'shield')).toBe(false); // cost 3
    expect(canAffordAbility(5, 'ladder_boost')).toBe(true); // cost 5

    const remaining = consumeEnergy(5, 'shield');
    expect(remaining).toBe(2); // 5 - 3 = 2

    const unaffordable = consumeEnergy(2, 'ladder_boost');
    expect(unaffordable).toBeNull();
  });

  it('defines all 6 tactical abilities', () => {
    expect(ENERGY_ABILITIES.length).toBe(6);
    const ids = ENERGY_ABILITIES.map(a => a.id);
    expect(ids).toContain('hint');
    expect(ids).toContain('shield');
    expect(ids).toContain('debug_scan');
    expect(ids).toContain('reroll');
    expect(ids).toContain('second_chance');
    expect(ids).toContain('ladder_boost');
  });
});

describe('FEATURE 10: PERSISTENCE (V3 MIGRATION)', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('initializes default v3 state with all evolution properties', () => {
    const state = getInitialGameState();
    expect(state.version).toBe(3);
    expect(state.energy).toBe(5);
    expect(state.activeShield).toBe(false);
    expect(state.activeLadderBoost).toBe(false);
    expect(state.currentRouteType).toBe('knowledge');
    expect(Object.keys(state.topicMasteryMap).length).toBe(11);
  });

  it('migrates v2 state smoothly to v3 preserving score and coins', () => {
    const legacyV2State = {
      version: 2,
      currentPosition: 35,
      totalScore: 850,
      coins: 180,
      streak: 4,
      longestStreak: 7,
      completedSquares: [1, 2, 5, 10, 18, 35]
    };

    localStorageMock.setItem('code_and_ladders_save_v2', JSON.stringify(legacyV2State));

    const loaded = loadGameState();
    expect(loaded.version).toBe(3);
    expect(loaded.currentPosition).toBe(35);
    expect(loaded.totalScore).toBe(850);
    expect(loaded.coins).toBe(180);
    expect(loaded.streak).toBe(4);
    // Evolution fields populated with defaults
    expect(loaded.energy).toBe(5);
    expect(Object.keys(loaded.topicMasteryMap).length).toBe(11);
  });

  it('persists and reloads full v3 state', () => {
    const state = getInitialGameState();
    state.currentPosition = 42;
    state.energy = 12;
    state.activeShield = true;
    state.defeatedBosses = [20];
    state.currentRouteType = 'risk';

    saveGameState(state);

    const reloaded = loadGameState();
    expect(reloaded.currentPosition).toBe(42);
    expect(reloaded.energy).toBe(12);
    expect(reloaded.activeShield).toBe(true);
    expect(reloaded.defeatedBosses).toEqual([20]);
    expect(reloaded.currentRouteType).toBe('risk');
  });
});
