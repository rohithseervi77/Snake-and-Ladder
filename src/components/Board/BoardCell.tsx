import React from 'react';
import { 
  Trophy, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Code, 
  GitBranch, 
  Layers, 
  Search, 
  Hash, 
  FolderTree, 
  Network, 
  Clock, 
  Sparkles, 
  ArrowUpRight, 
  ArrowDownRight, 
  Star 
} from 'lucide-react';
import { SquareMetadata } from '../../types/curriculum';
import { SNAKES_AND_LADDERS } from '../../data/snakesAndLadders';
import { PlayerMarker } from './PlayerMarker';

interface BoardCellProps {
  square: SquareMetadata;
  isCurrent: boolean;
  isCompleted: boolean;
  equippedMarker?: string;
  masteryScore?: number;
  masteryLevel?: string;
  onSelect: (square: SquareMetadata) => void;
}

/**
 * Clean multi-line formatting for topics so text wraps gracefully across lines
 * instead of arbitrary or awkward character slicing.
 */
function formatTopicName(title: string): string {
  return title.replace(/\s*\([^)]*\)/g, '').trim();
}

export const BoardCell: React.FC<BoardCellProps> = ({
  square,
  isCurrent,
  isCompleted,
  equippedMarker,
  masteryScore,
  onSelect
}) => {
  // Check for ladders and snakes
  const ladder = SNAKES_AND_LADDERS.find(item => item.type === 'ladder' && item.from === square.id);
  const snake = SNAKES_AND_LADDERS.find(item => item.type === 'snake' && item.from === square.id);
  const ladderDestination = SNAKES_AND_LADDERS.find(item => item.type === 'ladder' && item.to === square.id);
  const snakeDestination = SNAKES_AND_LADDERS.find(item => item.type === 'snake' && item.to === square.id);

  // Card theme styling strictly based on the Light/Dark semantic palette
  const getCardClasses = () => {
    // 1. Current Player Tile
    if (isCurrent) {
      return 'bg-[var(--card-bg)] border-[var(--color-indigo)] text-[var(--text-primary)] shadow-[0_0_20px_rgba(99,102,241,0.35)] ring-2 ring-[var(--color-indigo)]/70 z-20 scale-[1.02]';
    }
    // 2. Boss / Tile 100
    if (square.id === 100) {
      return 'bg-[var(--card-bg)] border-[var(--color-violet)] text-[var(--text-primary)] shadow-[0_0_16px_rgba(139,92,246,0.3)] hover:border-[var(--color-violet)]';
    }
    // 3. Snake Tile (Danger / Mistake)
    if (snake) {
      return 'bg-[var(--card-bg)] border-[var(--color-rose)] text-[var(--text-primary)] hover:border-[var(--color-rose)] shadow-sm';
    }
    // 4. Ladder Tile (Optimization / Progress)
    if (ladder) {
      return 'bg-[var(--card-bg)] border-[var(--color-amber)] text-[var(--text-primary)] hover:border-[var(--color-amber)] shadow-sm';
    }
    // 5. Checkpoint Tile (Reward / Milestone)
    if (square.isCheckpoint) {
      return 'bg-[var(--card-bg)] border-[var(--color-amber)] text-[var(--text-primary)] hover:border-[var(--color-amber)] shadow-sm';
    }
    // 6. Mastered Tile (Emerald)
    if ((masteryScore ?? 0) >= 80) {
      return 'bg-[var(--card-bg)] border-[var(--color-emerald)] text-[var(--text-primary)] hover:border-[var(--color-emerald)] shadow-sm';
    }
    // 7. Completed Tile (Cyan)
    if (isCompleted) {
      return 'bg-[var(--card-bg)] border-[var(--color-cyan)] text-[var(--text-primary)] hover:border-[var(--color-cyan)] shadow-sm';
    }
    // 8. Normal Knowledge Tile (Clean neutral surface with subtle border)
    return 'bg-[var(--card-bg)] border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--color-indigo)]/60 shadow-sm';
  };

  const getStageIcon = () => {
    switch (square.stage) {
      case 'foundations': return <Code className="w-3.5 h-3.5 text-[var(--color-emerald)] shrink-0" />;
      case 'arrays_strings': return <Layers className="w-3.5 h-3.5 text-[var(--color-cyan)] shrink-0" />;
      case 'linear_structures': return <GitBranch className="w-3.5 h-3.5 text-[var(--color-cyan)] shrink-0" />;
      case 'search_sort': return <Search className="w-3.5 h-3.5 text-[var(--color-indigo)] shrink-0" />;
      case 'trees_heaps': return <FolderTree className="w-3.5 h-3.5 text-[var(--color-cyan)] shrink-0" />;
      case 'hashing_recursion': return <Hash className="w-3.5 h-3.5 text-[var(--color-amber)] shrink-0" />;
      case 'graphs': return <Network className="w-3.5 h-3.5 text-[var(--color-violet)] shrink-0" />;
      case 'greedy_dp': return <Clock className="w-3.5 h-3.5 text-[var(--color-violet)] shrink-0" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-[var(--color-cyan)] shrink-0" />;
    }
  };

  const formattedNumber = square.id < 10 ? `0${square.id}` : `${square.id}`;
  const topicName = formatTopicName(square.title);

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
      aria-label={`Level ${square.id}: ${square.title}. Status: ${isCurrent ? 'Current' : isCompleted ? 'Completed' : 'Available'}`}
      style={{
        width: 'var(--tile-width, 135px)',
        height: 'var(--tile-height, 115px)',
        minWidth: 'var(--tile-width, 135px)',
        minHeight: 'var(--tile-height, 115px)'
      }}
      className={`relative z-10 rounded-2xl border-2 p-2 sm:p-2.5 flex flex-col justify-between transition-all duration-200 cursor-pointer select-none group text-left ${getCardClasses()} ${
        !isCurrent ? 'hover:-translate-y-0.5 hover:shadow-md' : ''
      }`}
    >
      {/* 1. TOP ROW: Level Number and Status/Badge */}
      <div className="flex items-center justify-between w-full border-b border-[var(--border-subtle)] pb-1">
        <div className="flex items-center gap-1.5">
          <span className={`font-mono font-black text-lg sm:text-xl tracking-tight leading-none ${
            isCurrent 
              ? 'text-[var(--color-indigo)]' 
              : square.id === 100 
                ? 'text-[var(--color-violet)]' 
                : 'text-[var(--text-primary)]'
          }`}>
            {formattedNumber}
          </span>
          {getStageIcon()}
        </div>

        {/* Status Indicator / Mastered Tile Evolution */}
        <div className="flex items-center gap-1">
          {isCurrent ? (
            <span className="px-1.5 py-0.5 rounded-full bg-[var(--color-indigo-light)] border border-[var(--color-indigo)] text-[var(--color-indigo)] font-black text-[9.5px] uppercase tracking-wide flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-indigo)] animate-pulse" />
              You
            </span>
          ) : (masteryScore ?? 0) >= 80 ? (
            <span className="px-1.5 py-0.5 rounded-full bg-[var(--color-emerald-light)] border border-[var(--color-emerald-border)] text-[var(--color-emerald)] font-bold text-[9.5px] uppercase tracking-wide flex items-center gap-0.5 shadow-sm" title={`Mastered (${masteryScore}%)`}>
              <Star className="w-2.5 h-2.5 fill-[var(--color-emerald)] text-[var(--color-emerald)]" />
              ★ Master
            </span>
          ) : (masteryScore ?? 0) >= 55 ? (
            <span className="px-1.5 py-0.5 rounded-full bg-[var(--color-cyan-light)] border border-[var(--color-cyan-border)] text-[var(--color-cyan)] font-bold text-[9.5px] flex items-center gap-0.5 shadow-sm" title={`Strong (${masteryScore}%)`}>
              <Sparkles className="w-2.5 h-2.5 text-[var(--color-cyan)]" />
              ◉ Strong
            </span>
          ) : isCompleted ? (
            <span className="px-1.5 py-0.5 rounded-full bg-[var(--color-cyan-light)] border border-[var(--color-cyan-border)] text-[var(--color-cyan)] font-bold text-[9.5px] flex items-center gap-1 shadow-sm" title="Completed">
              <CheckCircle2 className="w-2.5 h-2.5 text-[var(--color-cyan)]" />
              ✓ Done
            </span>
          ) : (
            <span className="text-[9.5px] font-mono font-medium text-[var(--text-muted)]" title="Unseen">
              ○ {square.difficulty.slice(0, 3).toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* 2. MIDDLE ROW: Topic Name and Short Description */}
      <div className="flex-1 flex flex-col justify-center py-1">
        <h4 className="font-extrabold text-[13px] sm:text-[14px] md:text-[15px] text-[var(--text-primary)] leading-tight tracking-tight line-clamp-2 break-words group-hover:text-[var(--color-indigo)] transition-colors">
          {topicName}
        </h4>
        <p className="text-[10.5px] sm:text-[11.5px] text-[var(--text-secondary)] leading-tight line-clamp-1 mt-0.5 font-medium">
          {square.subtopic || square.summary || square.topic}
        </p>
      </div>

      {/* 3. BOTTOM ROW: Type Badge ([CONCEPT], [LADDER], [SNAKE], [BOSS], [FINAL]) */}
      <div className="flex items-center justify-between w-full pt-1 border-t border-[var(--border-subtle)]">
        {square.id === 100 ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--color-violet-light)] border border-[var(--color-violet-border)] text-[var(--color-violet)] font-black text-[10px] uppercase tracking-wider shadow-sm">
            <Trophy className="w-3 h-3 text-[var(--color-violet)]" />
            FINAL TITAN
          </span>
        ) : square.id === 1 ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--color-indigo-light)] border border-[var(--color-indigo-border)] text-[var(--color-indigo)] font-bold text-[10px] uppercase tracking-wider shadow-sm">
            START
          </span>
        ) : ladder ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--color-amber-light)] border border-[var(--color-amber-border)] text-[var(--color-amber)] font-bold text-[10px] uppercase tracking-wide shadow-sm">
            <Zap className="w-3 h-3 text-[var(--color-amber)]" />
            <span>LADDER &rarr; {ladder.to}</span>
          </span>
        ) : snake ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--color-rose-light)] border border-[var(--color-rose-border)] text-[var(--color-rose)] font-bold text-[10px] uppercase tracking-wide shadow-sm">
            <AlertTriangle className="w-3 h-3 text-[var(--color-rose)]" />
            <span>SNAKE &darr; {snake.to}</span>
          </span>
        ) : ladderDestination ? (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[var(--color-amber-light)] border border-[var(--color-amber-border)] text-[var(--color-amber)] font-medium text-[9.5px]">
            <ArrowUpRight className="w-2.5 h-2.5 text-[var(--color-amber)]" />
            Exit ({ladderDestination.from})
          </span>
        ) : snakeDestination ? (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[var(--color-rose-light)] border border-[var(--color-rose-border)] text-[var(--color-rose)] font-medium text-[9.5px]">
            <ArrowDownRight className="w-2.5 h-2.5 text-[var(--color-rose)]" />
            Drop ({snakeDestination.from})
          </span>
        ) : square.isCheckpoint ? (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[var(--color-amber-light)] border border-[var(--color-amber-border)] text-[var(--color-amber)] font-bold text-[10px] uppercase shadow-sm">
            CHECKPOINT
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] text-[10px] font-semibold uppercase tracking-wider">
            {square.stageName.split(' ')[0]}
          </span>
        )}

        {/* Small Detail Indicator */}
        <span className="text-[10px] text-[var(--text-muted)] font-mono group-hover:text-[var(--color-indigo)] transition-colors">
          Info &rarr;
        </span>
      </div>

      {/* 4. PLAYER TOKEN (Non-overlapping Anchor) */}
      {isCurrent && (
        <div className="absolute -top-3 -right-3 z-30 pointer-events-none">
          <PlayerMarker equippedMarker={equippedMarker} />
        </div>
      )}
    </div>
  );
};
