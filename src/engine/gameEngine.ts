import { SNAKE_MAP, LADDER_MAP } from '../data/snakesAndLadders';
import { SQUARE_MAP } from '../data/curriculum100';
import { SnakeOrLadder } from '../types/game';

export interface GridCoords {
  gridRow: number; // 0 to 9 (0 is top row 91-100, 9 is bottom row 1-10)
  gridCol: number; // 0 to 9 (0 is left, 9 is right)
}

export interface PercentCoords {
  x: number; // 0 to 100 (%)
  y: number; // 0 to 100 (%)
}

/**
 * Maps 1-100 square ID to 10x10 serpentine grid coordinates.
 * Row 1 (1-10): Left to Right (gridRow 9)
 * Row 2 (11-20): Right to Left (gridRow 8)
 * ...
 * Row 10 (91-100): Right to Left (gridRow 0, 100 at col 0)
 */
export function getSquareGridCoords(squareId: number): GridCoords {
  const clampedId = Math.max(1, Math.min(100, squareId));
  const bottomRow = Math.floor((clampedId - 1) / 10);
  const gridRow = 9 - bottomRow;
  const colInRow = (clampedId - 1) % 10;
  const isEvenBottomRow = bottomRow % 2 === 0;

  const gridCol = isEvenBottomRow ? colInRow : 9 - colInRow;
  return { gridRow, gridCol };
}

/**
 * Returns center coordinates of the square in percentage (0% to 100%)
 */
export function getSquarePercentCoords(squareId: number): PercentCoords {
  const { gridRow, gridCol } = getSquareGridCoords(squareId);
  return {
    x: (gridCol + 0.5) * 10,
    y: (gridRow + 0.5) * 10
  };
}

/**
 * Generate a random die roll between 1 and 6.
 */
export function rollDice(): number {
  return Math.floor(Math.random() * 6) + 1;
}

export interface MovementPlan {
  initialPosition: number;
  diceRoll: number;
  intermediateSteps: number[];
  stoppedAtCheckpoint: boolean;
  checkpointSquareId?: number;
  targetSquareBeforeTransitions: number;
  snakeOrLadderEncountered?: SnakeOrLadder;
  finalPosition: number;
  isGameFinished: boolean;
  overshotTarget?: boolean;
  overshotExplanation?: string;
}

/**
 * Calculates step-by-step movement plan respecting:
 * 1. Step-by-step path
 * 2. Stopping at mandatory checkpoints (cannot skip with high roll)
 * 3. 100 Finish boundaries (exact landing required: rolls exceeding 100 remain in place)
 * 4. Snakes and Ladders transitions
 */
export function computeMovementPlan(
  currentPos: number,
  roll: number,
  passedCheckpoints: Set<number>
): MovementPlan {
  let target = currentPos + roll;
  let isGameFinished = false;
  let overshotTarget = false;
  let overshotExplanation: string | undefined = undefined;

  // Exact landing rule for Tile 100: If roll exceeds 100, player remains in place
  if (target > 100) {
    overshotTarget = true;
    const needed = 100 - currentPos;
    overshotExplanation = `Rolled ${roll}! Exact roll of ${needed} needed to face the Final Titan on Tile 100. Remaining on Tile ${currentPos}.`;
    target = currentPos;
  }

  // Check if any unpassed checkpoint lies strictly between currentPos and target
  let stoppedAtCheckpoint = false;
  let checkpointSquareId: number | undefined = undefined;

  for (let s = currentPos + 1; s <= Math.min(target, 100); s++) {
    const sq = SQUARE_MAP.get(s);
    if (sq && sq.isCheckpoint && !passedCheckpoints.has(s) && s !== target) {
      target = s;
      stoppedAtCheckpoint = true;
      checkpointSquareId = s;
      break;
    }
  }

  // Generate intermediate step sequence for animation
  const intermediateSteps: number[] = [];
  if (target > currentPos) {
    for (let s = currentPos + 1; s <= target; s++) {
      intermediateSteps.push(s);
    }
  } else if (target < currentPos) {
    for (let s = currentPos - 1; s >= target; s--) {
      intermediateSteps.push(s);
    }
  }

  // Check for snake or ladder on target square
  let snakeOrLadderEncountered: SnakeOrLadder | undefined = undefined;
  let finalPos = target;

  const ladder = LADDER_MAP.get(target);
  const snake = SNAKE_MAP.get(target);

  if (ladder) {
    snakeOrLadderEncountered = ladder;
    finalPos = ladder.to;
  } else if (snake) {
    snakeOrLadderEncountered = snake;
    finalPos = snake.to;
  }

  if (finalPos === 100 || target === 100) {
    isGameFinished = true;
  }

  return {
    initialPosition: currentPos,
    diceRoll: roll,
    intermediateSteps,
    stoppedAtCheckpoint,
    checkpointSquareId,
    targetSquareBeforeTransitions: target,
    snakeOrLadderEncountered,
    finalPosition: finalPos,
    isGameFinished,
    overshotTarget,
    overshotExplanation
  };
}
