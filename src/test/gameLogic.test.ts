import { describe, it, expect } from 'vitest';
import { 
  rollDice, 
  getSquareGridCoords, 
  getSquarePercentCoords, 
  computeMovementPlan 
} from '../engine/gameEngine';
import { SNAKES_AND_LADDERS } from '../data/snakesAndLadders';

describe('Game Logic & Serpentine Coordinate Engine', () => {
  it('rolls valid dice values between 1 and 6', () => {
    for (let i = 0; i < 100; i++) {
      const roll = rollDice();
      expect(roll).toBeGreaterThanOrEqual(1);
      expect(roll).toBeLessThanOrEqual(6);
      expect(Number.isInteger(roll)).toBe(true);
    }
  });

  it('correctly maps coordinates for 10x10 serpentine layout', () => {
    // Square 1: bottom-left (gridRow 9, gridCol 0)
    const sq1 = getSquareGridCoords(1);
    expect(sq1).toEqual({ gridRow: 9, gridCol: 0 });

    // Square 10: bottom-right (gridRow 9, gridCol 9)
    const sq10 = getSquareGridCoords(10);
    expect(sq10).toEqual({ gridRow: 9, gridCol: 9 });

    // Square 11: second row rightmost (gridRow 8, gridCol 9)
    const sq11 = getSquareGridCoords(11);
    expect(sq11).toEqual({ gridRow: 8, gridCol: 9 });

    // Square 20: second row leftmost (gridRow 8, gridCol 0)
    const sq20 = getSquareGridCoords(20);
    expect(sq20).toEqual({ gridRow: 8, gridCol: 0 });

    // Square 91: top row rightmost (gridRow 0, gridCol 9)
    const sq91 = getSquareGridCoords(91);
    expect(sq91).toEqual({ gridRow: 0, gridCol: 9 });

    // Square 100: top row leftmost finish (gridRow 0, gridCol 0)
    const sq100 = getSquareGridCoords(100);
    expect(sq100).toEqual({ gridRow: 0, gridCol: 0 });
  });

  it('computes valid center percentage coordinates for SVG rendering', () => {
    const coords1 = getSquarePercentCoords(1);
    expect(coords1.x).toBeCloseTo(5);
    expect(coords1.y).toBeCloseTo(95);

    const coords100 = getSquarePercentCoords(100);
    expect(coords100.x).toBeCloseTo(5);
    expect(coords100.y).toBeCloseTo(5);
  });

  it('validates all snakes and ladders', () => {
    expect(SNAKES_AND_LADDERS.length).toBeGreaterThanOrEqual(10);

    SNAKES_AND_LADDERS.forEach(item => {
      expect(item.from).toBeGreaterThanOrEqual(1);
      expect(item.from).toBeLessThanOrEqual(100);
      expect(item.to).toBeGreaterThanOrEqual(1);
      expect(item.to).toBeLessThanOrEqual(100);

      if (item.type === 'ladder') {
        // Ladders must ascend
        expect(item.to).toBeGreaterThan(item.from);
      } else {
        // Snakes must descend
        expect(item.to).toBeLessThan(item.from);
      }
    });
  });

  it('enforces mandatory checkpoint stops when rolling a high number', () => {
    // Square 10 is a checkpoint. Starting at 8 with roll 5 would land on 13,
    // but checkpoint at 10 must intercept player!
    const passedCheckpoints = new Set<number>();
    const plan = computeMovementPlan(8, 5, passedCheckpoints);

    expect(plan.stoppedAtCheckpoint).toBe(true);
    expect(plan.checkpointSquareId).toBe(10);
    expect(plan.targetSquareBeforeTransitions).toBe(10);
  });

  it('allows progression past checkpoint once checkpoint is passed', () => {
    const passedCheckpoints = new Set<number>([10]);
    const plan = computeMovementPlan(8, 5, passedCheckpoints);

    expect(plan.stoppedAtCheckpoint).toBe(false);
    expect(plan.targetSquareBeforeTransitions).toBe(13);
  });

  it('correctly handles bounce back on overshooting square 100', () => {
    const passedCheckpoints = new Set<number>([10, 20, 30, 40, 50, 60, 70, 80, 90]);
    // At square 98, roll 4 -> reaches 100 then bounces back 2 to 98
    const plan = computeMovementPlan(98, 4, passedCheckpoints);
    expect(plan.targetSquareBeforeTransitions).toBe(98);
  });

  it('detects winning condition on landing on square 100', () => {
    const passedCheckpoints = new Set<number>([10, 20, 30, 40, 50, 60, 70, 80, 90]);
    const plan = computeMovementPlan(97, 3, passedCheckpoints);
    expect(plan.targetSquareBeforeTransitions).toBe(100);
    expect(plan.isGameFinished).toBe(true);
  });
});
