import React, { useMemo } from 'react';
import { SquareMetadata } from '../../types/curriculum';
import { SQUARE_MAP } from '../../data/curriculum100';
import { BoardCell } from './BoardCell';
import { SnakeLadderSvg } from './SnakeLadderSvg';

interface BoardGridProps {
  currentPosition: number;
  completedSquares: number[];
  equippedMarker?: string;
  boardTheme?: string;
  onSelectSquare: (square: SquareMetadata) => void;
}

export const BoardGrid: React.FC<BoardGridProps> = ({
  currentPosition,
  completedSquares,
  equippedMarker,
  boardTheme = 'theme-obsidian-navy',
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

  const getThemeClass = () => {
    switch (boardTheme) {
      case 'theme-cyberpunk-indigo':
        return 'bg-[#120a26] border-indigo-700/50 shadow-indigo-950/50';
      case 'theme-emerald-matrix':
        return 'bg-[#051711] border-emerald-700/50 shadow-emerald-950/50';
      case 'theme-solar-amber':
        return 'bg-[#191004] border-amber-700/50 shadow-amber-950/50';
      case 'theme-obsidian-navy':
      default:
        return 'bg-[#090f1d] border-[#1e293b] shadow-slate-950/50';
    }
  };

  return (
    <div 
      className={`relative w-full aspect-square mx-auto p-1 sm:p-1.5 md:p-2 rounded-xl sm:rounded-2xl border shadow-2xl overflow-hidden flex flex-col justify-center transition-colors duration-500 shrink-0 ${getThemeClass()}`}
      style={{
        maxWidth: 'min(100%, calc(100vh - 200px), 680px)',
        maxHeight: 'calc(100vh - 200px)',
      }}
    >
      {/* 10x10 Grid */}
      <div className="relative w-full h-full grid grid-cols-10 grid-rows-10 gap-0.5 sm:gap-1">
        {orderedSquares.map(square => (
          <BoardCell
            key={`cell-${square.id}`}
            square={square}
            isCurrent={square.id === currentPosition}
            isCompleted={completedSet.has(square.id)}
            equippedMarker={equippedMarker}
            onSelect={onSelectSquare}
          />
        ))}

        {/* SVG Snakes & Ladders Overlay */}
        <SnakeLadderSvg />
      </div>
    </div>
  );
};
