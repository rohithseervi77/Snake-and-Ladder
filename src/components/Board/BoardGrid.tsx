import React, { useMemo } from 'react';
import { SquareMetadata } from '../../types/curriculum';
import { SQUARE_MAP } from '../../data/curriculum100';
import { BoardCell } from './BoardCell';
import { SnakeLadderSvg } from './SnakeLadderSvg';

interface BoardGridProps {
  currentPosition: number;
  selectedSquareId?: number | null;
  completedSquares: number[];
  equippedMarker?: string;
  onSelectSquare: (square: SquareMetadata) => void;
}

export const BoardGrid: React.FC<BoardGridProps> = ({
  currentPosition,
  selectedSquareId,
  completedSquares,
  equippedMarker,
  onSelectSquare
}) => {
  const orderedSquares = useMemo(() => {
    const list: SquareMetadata[] = [];
    for (let gridRow = 0; gridRow < 10; gridRow++) {
      const bottomRow = 9 - gridRow;
      const isEven = bottomRow % 2 === 0;
      for (let gridCol = 0; gridCol < 10; gridCol++) {
        const colInRow = isEven ? gridCol : 9 - gridCol;
        const squareId = bottomRow * 10 + colInRow + 1;
        const sq = SQUARE_MAP.get(squareId);
        if (sq) list.push(sq);
      }
    }
    return list;
  }, []);

  const completedSet = useMemo(() => new Set(completedSquares), [completedSquares]);

  return (
    <div className="relative w-full max-w-[min(100%,calc(100vh-210px))] aspect-square mx-auto p-1.5 sm:p-2.5 rounded-2xl bg-[var(--board-bg)] border-2 border-[var(--border-subtle)] shadow-xl flex items-center justify-center">
      {/* 10x10 Serpentine Grid Container */}
      <div className="relative w-full h-full grid grid-cols-10 grid-rows-10 gap-1 sm:gap-1.5">
        {/* Layer 1: SVG Snakes & Ladders */}
        <SnakeLadderSvg />

        {/* Layer 2: 100 Board Cells */}
        {orderedSquares.map(square => (
          <BoardCell
            key={square.id}
            square={square}
            isCurrent={square.id === currentPosition}
            isCompleted={completedSet.has(square.id)}
            isSelected={selectedSquareId === square.id}
            equippedMarker={equippedMarker}
            onSelect={onSelectSquare}
          />
        ))}
      </div>
    </div>
  );
};
