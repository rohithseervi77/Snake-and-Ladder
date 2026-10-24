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
  tileWidth?: number;
  tileHeight?: number;
}

export const BoardGrid: React.FC<BoardGridProps> = ({
  currentPosition,
  completedSquares,
  equippedMarker,
  boardTheme = 'theme-obsidian-navy',
  onSelectSquare,
  tileWidth = 138,
  tileHeight = 118
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
        return 'bg-[#0f0926] border-indigo-700/60 shadow-indigo-950/70';
      case 'theme-emerald-matrix':
        return 'bg-[#04140f] border-emerald-700/60 shadow-emerald-950/70';
      case 'theme-solar-amber':
        return 'bg-[#140c03] border-amber-700/60 shadow-amber-950/70';
      case 'theme-obsidian-navy':
      default:
        return 'bg-[#070c18] border-slate-800 shadow-slate-950/70';
    }
  };

  return (
    <div 
      className={`relative mx-auto p-4 rounded-3xl border-2 shadow-2xl transition-colors duration-500 shrink-0 ${getThemeClass()}`}
      style={{
        '--tile-width': `${tileWidth}px`,
        '--tile-height': `${tileHeight}px`,
        '--tile-gap': '10px',
        width: `calc(10 * var(--tile-width) + 9 * var(--tile-gap) + 32px)`,
        height: `calc(10 * var(--tile-height) + 9 * var(--tile-gap) + 32px)`,
        minWidth: `calc(10 * var(--tile-width) + 9 * var(--tile-gap) + 32px)`,
        minHeight: `calc(10 * var(--tile-height) + 9 * var(--tile-gap) + 32px)`,
      } as React.CSSProperties}
    >
      {/* 10x10 Serpentine Grid Container */}
      <div 
        className="relative grid grid-cols-10 grid-rows-10"
        style={{
          gap: 'var(--tile-gap, 10px)',
          width: 'calc(10 * var(--tile-width) + 9 * var(--tile-gap))',
          height: 'calc(10 * var(--tile-height) + 9 * var(--tile-gap))',
        }}
      >
        {/* Layer 1: SVG Snakes & Ladders Paths behind cards (z-0) */}
        <SnakeLadderSvg />

        {/* Layer 2: 100 Clear, Readable Level Cards (z-10) */}
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
      </div>
    </div>
  );
};
