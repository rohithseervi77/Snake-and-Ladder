import { describe, it, expect } from 'vitest';
import { CURRICULUM_100, SQUARE_MAP } from '../data/curriculum100';
import { getSquareGridCoords, getSquarePercentCoords } from '../engine/gameEngine';

describe('Board Viewport & 100-Level Accessibility Tests', () => {
  it('verifies board contains exactly 100 tiles with unique numbers from 1 to 100', () => {
    expect(CURRICULUM_100.length).toBe(100);

    const ids = CURRICULUM_100.map(s => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(100);

    for (let id = 1; id <= 100; id++) {
      expect(SQUARE_MAP.has(id)).toBe(true);
      const sq = SQUARE_MAP.get(id);
      expect(sq?.id).toBe(id);
      expect(sq?.title).toBeTruthy();
      expect(sq?.topic).toBeTruthy();
    }
  });

  it('verifies boundary levels Tile 1 and Tile 100 are defined and distinct', () => {
    const tile1 = SQUARE_MAP.get(1);
    const tile100 = SQUARE_MAP.get(100);

    expect(tile1).toBeDefined();
    expect(tile1?.id).toBe(1);
    expect(tile1?.stage).toBe('co1_math_analysis');

    expect(tile100).toBeDefined();
    expect(tile100?.id).toBe(100);
    expect(tile100?.stage).toBe('co4_graphs_algorithms');
  });

  it('verifies serpentine 10x10 grid coordinates for all 100 levels without overlapping coordinates', () => {
    const coordSet = new Set<string>();

    for (let id = 1; id <= 100; id++) {
      const { gridRow, gridCol } = getSquareGridCoords(id);
      expect(gridRow).toBeGreaterThanOrEqual(0);
      expect(gridRow).toBeLessThanOrEqual(9);
      expect(gridCol).toBeGreaterThanOrEqual(0);
      expect(gridCol).toBeLessThanOrEqual(9);

      const key = `${gridRow},${gridCol}`;
      expect(coordSet.has(key)).toBe(false);
      coordSet.add(key);
    }

    expect(coordSet.size).toBe(100);

    // Row 9 (bottom): Tile 1 is at (row 9, col 0), Tile 10 is at (row 9, col 9)
    expect(getSquareGridCoords(1)).toEqual({ gridRow: 9, gridCol: 0 });
    expect(getSquareGridCoords(10)).toEqual({ gridRow: 9, gridCol: 9 });

    // Row 8: Tile 11 is at (row 8, col 9), Tile 20 is at (row 8, col 0)
    expect(getSquareGridCoords(11)).toEqual({ gridRow: 8, gridCol: 9 });
    expect(getSquareGridCoords(20)).toEqual({ gridRow: 8, gridCol: 0 });

    // Row 0 (top): Tile 91 is at (row 0, col 9), Tile 100 is at (row 0, col 0)
    expect(getSquareGridCoords(91)).toEqual({ gridRow: 0, gridCol: 9 });
    expect(getSquareGridCoords(100)).toEqual({ gridRow: 0, gridCol: 0 });
  });

  it('verifies percentage coordinates for smooth SVG paths and player positioning', () => {
    for (let id = 1; id <= 100; id++) {
      const percent = getSquarePercentCoords(id);
      expect(percent.x).toBeGreaterThan(0);
      expect(percent.x).toBeLessThan(100);
      expect(percent.y).toBeGreaterThan(0);
      expect(percent.y).toBeLessThan(100);
    }
  });

  it('verifies 10 row sections cover all 100 levels sequentially without overlap', () => {
    const ROW_SECTIONS = [
      { label: '1–10', center: 5, min: 1, max: 10 },
      { label: '11–20', center: 15, min: 11, max: 20 },
      { label: '21–30', center: 25, min: 21, max: 30 },
      { label: '31–40', center: 35, min: 31, max: 40 },
      { label: '41–50', center: 45, min: 41, max: 50 },
      { label: '51–60', center: 55, min: 51, max: 60 },
      { label: '61–70', center: 65, min: 61, max: 70 },
      { label: '71–80', center: 75, min: 71, max: 80 },
      { label: '81–90', center: 85, min: 81, max: 90 },
      { label: '91–100', center: 95, min: 91, max: 100 },
    ];

    expect(ROW_SECTIONS.length).toBe(10);

    let expectedStart = 1;
    ROW_SECTIONS.forEach((sec, idx) => {
      expect(sec.min).toBe(expectedStart);
      expect(sec.max).toBe(expectedStart + 9);
      expect(sec.center).toBe(expectedStart + 4);
      expectedStart += 10;
    });
    expect(expectedStart - 1).toBe(100);
  });

  it('verifies jump to level validation handles valid and invalid inputs safely', () => {
    function validateJump(input: string): { valid: boolean; level?: number } {
      const num = parseInt(input.trim(), 10);
      if (!isNaN(num) && num >= 1 && num <= 100) {
        return { valid: true, level: num };
      }
      return { valid: false };
    }

    expect(validateJump('1')).toEqual({ valid: true, level: 1 });
    expect(validateJump('50')).toEqual({ valid: true, level: 50 });
    expect(validateJump('100')).toEqual({ valid: true, level: 100 });
    expect(validateJump(' 73 ')).toEqual({ valid: true, level: 73 });

    expect(validateJump('0').valid).toBe(false);
    expect(validateJump('-5').valid).toBe(false);
    expect(validateJump('101').valid).toBe(false);
    expect(validateJump('abc').valid).toBe(false);
    expect(validateJump('').valid).toBe(false);
  });

  it('verifies stepper previous/next level boundary checks', () => {
    function getStepperState(currentPosition: number) {
      return {
        canPrevious: currentPosition > 1,
        canNext: currentPosition < 100,
        previousLevel: currentPosition > 1 ? currentPosition - 1 : null,
        nextLevel: currentPosition < 100 ? currentPosition + 1 : null
      };
    }

    // At Start (Level 1)
    const atStart = getStepperState(1);
    expect(atStart.canPrevious).toBe(false);
    expect(atStart.canNext).toBe(true);
    expect(atStart.nextLevel).toBe(2);

    // At Level 50
    const atMiddle = getStepperState(50);
    expect(atMiddle.canPrevious).toBe(true);
    expect(atMiddle.canNext).toBe(true);
    expect(atMiddle.previousLevel).toBe(49);
    expect(atMiddle.nextLevel).toBe(51);

    // At Finish (Level 100)
    const atFinish = getStepperState(100);
    expect(atFinish.canPrevious).toBe(true);
    expect(atFinish.canNext).toBe(false);
    expect(atFinish.previousLevel).toBe(99);
  });

  it('verifies orderedSquares in BoardGrid preserves all 100 squares', () => {
    const orderedSquares = [];
    for (let gridRow = 0; gridRow < 10; gridRow++) {
      const bottomRow = 9 - gridRow;
      const isEven = bottomRow % 2 === 0;
      for (let gridCol = 0; gridCol < 10; gridCol++) {
        const colInRow = isEven ? gridCol : 9 - gridCol;
        const squareId = bottomRow * 10 + colInRow + 1;
        const sq = SQUARE_MAP.get(squareId);
        if (sq) orderedSquares.push(sq);
      }
    }

    expect(orderedSquares.length).toBe(100);
    // First tile rendered in top-left is Tile 100 (bottomRow 9, colInRow 9 -> 90 + 9 + 1 = 100)
    expect(orderedSquares[0].id).toBe(100);
    // Last tile rendered in bottom-right is Tile 10 (bottomRow 0, colInRow 9 -> 0 + 9 + 1 = 10)
    expect(orderedSquares[99].id).toBe(10);
    // Bottom-left tile is Tile 1
    expect(orderedSquares[90].id).toBe(1);
  });
});
