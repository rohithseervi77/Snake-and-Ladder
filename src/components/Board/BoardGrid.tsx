import React, { useMemo } from 'react';
import { SquareMetadata } from '../../types/curriculum';
import { SQUARE_MAP } from '../../data/curriculum100';
import { BoardCell } from './BoardCell';
import { SnakeLadderSvg } from './SnakeLadderSvg';

interface BoardGridProps {
  currentPosition: number;
  completedSquares: number[];
  onSelectSquare: (square: SquareMetadata) => void;
}

export const BoardGrid: React.FC<BoardGridProps> = ({
  currentPosition,
  completedSquares,
  onSelectSquare
}) => {
  // Generate the 100 cells mapped in 10x10 serpentine order from top (row 0) to bottom (row 9)
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
    <div className="relative w-full max-w-[850px] aspect-square mx-auto p-1.5 sm:p-2.5 bg-[#090f1d] border border-[#1e293b] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-center">
      {/* 10x10 Grid */}
      <div className="relative w-full h-full grid grid-cols-10 grid-rows-10 gap-1 sm:gap-1.5">
        {orderedSquares.map(square => (
          <BoardCell
            key={`cell-${square.id}`}
            square={square}
            isCurrent={square.id === currentPosition}
            isCompleted={completedSet.has(square.id)}
            onSelect={onSelectSquare}
          />
        ))}

        {/* SVG Snakes & Ladders Overlay */}
        <SnakeLadderSvg />
      </div>
    </div>
  );
};
