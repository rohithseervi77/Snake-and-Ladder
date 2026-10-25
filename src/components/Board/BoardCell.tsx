import React from 'react';
import { SquareMetadata } from '../../types/curriculum';
import { SNAKES_AND_LADDERS } from '../../data/snakesAndLadders';
import { PlayerMarker } from './PlayerMarker';

interface BoardCellProps {
  square: SquareMetadata;
  isCurrent: boolean;
  isCompleted: boolean;
  isSelected: boolean;
  equippedMarker?: string;
  onSelect: (square: SquareMetadata) => void;
}

export const BoardCell: React.FC<BoardCellProps> = ({
  square,
  isCurrent,
  isCompleted,
  isSelected,
  equippedMarker,
  onSelect
}) => {
  const ladder = SNAKES_AND_LADDERS.find(item => item.type === 'ladder' && item.from === square.id);
  const snake = SNAKES_AND_LADDERS.find(item => item.type === 'snake' && item.from === square.id);
  const isStart = square.id === 1;
  const isFinish = square.id === 100;

  // Alternate tile background color for clean board-game feel
  const isAlt = (Math.floor((square.id - 1) / 10) + ((square.id - 1) % 10)) % 2 === 1;

  const getTileClasses = () => {
    if (isCurrent) {
      return 'bg-[var(--card-bg)] border-[var(--color-indigo)] shadow-md ring-2 ring-[var(--color-indigo)] z-20';
    }
    if (isSelected) {
      return 'bg-[var(--card-secondary-bg)] border-[var(--color-indigo)] ring-2 ring-[var(--color-indigo)]/50 z-10';
    }
    if (isFinish) {
      return 'bg-[var(--card-bg)] border-[var(--color-amber)] text-[var(--color-amber)]';
    }
    if (isStart) {
      return 'bg-[var(--card-bg)] border-[var(--color-emerald)] text-[var(--color-emerald)]';
    }
    if (snake) {
      return 'bg-[var(--card-bg)] border-[var(--color-rose-border)] hover:border-[var(--color-rose)]';
    }
    if (ladder) {
      return 'bg-[var(--card-bg)] border-[var(--color-amber-border)] hover:border-[var(--color-amber)]';
    }
    return isAlt 
      ? 'bg-[var(--card-secondary-bg)] border-[var(--border-subtle)] hover:border-[var(--color-indigo-border)]'
      : 'bg-[var(--card-bg)] border-[var(--border-subtle)] hover:border-[var(--color-indigo-border)]';
  };

  return (
    <div
      id={`cell-${square.id}`}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(square)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(square);
        }
      }}
      aria-label={`Tile ${square.id}: ${square.title}`}
      className={`relative w-full h-full aspect-square rounded-lg sm:rounded-xl border p-1 sm:p-1.5 flex flex-col justify-between transition-all duration-150 cursor-pointer select-none group ${getTileClasses()}`}
    >
      {/* Top Header: Tile Number + Badge/Icon */}
      <div className="flex items-center justify-between w-full leading-none">
        <span className={`font-mono font-black text-xs sm:text-sm md:text-base ${
          isCurrent 
            ? 'text-[var(--color-indigo)]' 
            : isFinish 
              ? 'text-[var(--color-amber)]' 
              : isStart 
                ? 'text-[var(--color-emerald)]' 
                : 'text-[var(--text-primary)]'
        }`}>
          {square.id}
        </span>

        {/* Small Game Marker: Snake / Ladder / Start / Finish / Question */}
        <div className="flex items-center gap-0.5 text-[9px] sm:text-[10px] font-bold">
          {isFinish && (
            <span className="text-[var(--color-amber)]" title="Finish Tile 100">🏆</span>
          )}
          {isStart && (
            <span className="text-[var(--color-emerald)]" title="Start Tile 1">🏁</span>
          )}
          {snake && !isFinish && (
            <span className="text-[var(--color-rose)] font-mono font-bold flex items-center" title={`Snake slides down to Tile ${snake.to}`}>
              <span>🐍</span>
              <span className="hidden xl:inline text-[8px] ml-0.5">↓{snake.to}</span>
            </span>
          )}
          {ladder && !isStart && (
            <span className="text-[var(--color-amber)] font-mono font-bold flex items-center" title={`Ladder climbs up to Tile ${ladder.to}`}>
              <span>🪜</span>
              <span className="hidden xl:inline text-[8px] ml-0.5">↑{ladder.to}</span>
            </span>
          )}
          {!snake && !ladder && !isStart && !isFinish && square.isCheckpoint && (
            <span className="w-3.5 h-3.5 rounded-full bg-[var(--color-cyan-light)] text-[var(--color-cyan)] border border-[var(--color-cyan-border)] flex items-center justify-center text-[9px] font-bold" title="Checkpoint Challenge">
              ?
            </span>
          )}
        </div>
      </div>

      {/* Center: Player Token (When on this tile) */}
      <div className="flex-1 flex items-center justify-center my-auto">
        {isCurrent ? (
          <div className="scale-75 sm:scale-90 md:scale-100 transition-transform">
            <PlayerMarker equippedMarker={equippedMarker} />
          </div>
        ) : isCompleted ? (
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--color-emerald)]/70" title="Completed" />
        ) : null}
      </div>

      {/* Bottom Subtitle / Tag (Short & clean) */}
      <div className="w-full text-[8px] sm:text-[9px] font-medium text-[var(--text-secondary)] truncate leading-none">
        {square.topic}
      </div>
    </div>
  );
};
