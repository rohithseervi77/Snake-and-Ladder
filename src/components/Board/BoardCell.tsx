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
  Lock,
  Compass,
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
  let clean = title.replace(/\s*\([^)]*\)/g, '').trim();
  return clean;
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

  // Card theme styling strictly based on the Coolors-style semantic palette:
  // All normal tiles share background #111827 (Deep Slate), text #F8FAFC, border #263449.
  // Subtle semantic accents communicate tile type without creating rainbow visual noise.
  const getCardClasses = () => {
    // 1. Current Player Tile
    if (isCurrent) {
      return 'bg-[#111827] border-[#2563EB] text-[#F8FAFC] shadow-[0_0_20px_rgba(37,99,235,0.4)] ring-2 ring-[#2563EB]/80 z-20 scale-[1.02]';
    }
    // 2. Boss / Tile 100
    if (square.id === 100) {
      return 'bg-[#111827] border-[#8B5CF6] text-[#F8FAFC] shadow-[0_0_16px_rgba(139,92,246,0.35)] hover:border-[#8B5CF6]';
    }
    // 3. Snake Tile (Danger / Mistake)
    if (snake) {
      return 'bg-[#111827] border-[#F43F5E]/80 text-[#F8FAFC] hover:border-[#F43F5E] shadow-sm shadow-[#F43F5E]/15';
    }
    // 4. Ladder Tile (Optimization / Progress)
    if (ladder) {
      return 'bg-[#111827] border-[#F59E0B]/80 text-[#F8FAFC] hover:border-[#F59E0B] shadow-sm shadow-[#F59E0B]/15';
    }
    // 5. Checkpoint Tile (Reward / Milestone)
    if (square.isCheckpoint) {
      return 'bg-[#111827] border-[#F59E0B]/70 text-[#F8FAFC] hover:border-[#F59E0B] shadow-sm shadow-[#F59E0B]/15';
    }
    // 6. Mastered Tile (Emerald)
    if ((masteryScore ?? 0) >= 80) {
      return 'bg-[#111827] border-[#10B981]/80 text-[#F8FAFC] hover:border-[#10B981] shadow-sm shadow-[#10B981]/15';
    }
    // 7. Completed Tile (Cyan)
    if (isCompleted) {
      return 'bg-[#111827] border-[#22D3EE]/70 text-[#F8FAFC] hover:border-[#22D3EE] shadow-sm shadow-[#22D3EE]/15';
    }
    // 8. Normal Knowledge Tile (Deep Slate surface with subtle border #263449)
    return 'bg-[#111827] border-[#263449] text-[#F8FAFC] hover:border-[#22D3EE]/60';
  };

  const getStageIcon = () => {
    switch (square.stage) {
      case 'foundations': return <Code className="w-3.5 h-3.5 text-[#10B981] shrink-0" />;
      case 'arrays_strings': return <Layers className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />;
      case 'linear_structures': return <GitBranch className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />;
      case 'search_sort': return <Search className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />;
      case 'trees_heaps': return <FolderTree className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />;
      case 'hashing_recursion': return <Hash className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />;
      case 'graphs': return <Network className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />;
      case 'greedy_dp': return <Clock className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />;
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
        !isCurrent ? 'hover:-translate-y-0.5 hover:shadow-lg' : ''
      }`}
    >
      {/* 1. TOP ROW: Level Number and Status/Badge */}
      <div className="flex items-center justify-between w-full border-b border-[#263449] pb-1">
        <div className="flex items-center gap-1.5">
          <span className={`font-mono font-black text-lg sm:text-xl tracking-tight leading-none ${
            isCurrent 
              ? 'text-[#22D3EE]' 
              : square.id === 100 
                ? 'text-[#8B5CF6]' 
                : 'text-[#F8FAFC]'
          }`}>
            {formattedNumber}
          </span>
          {getStageIcon()}
        </div>

        {/* Status Indicator / Mastered Tile Evolution */}
        <div className="flex items-center gap-1">
          {isCurrent ? (
            <span className="px-1.5 py-0.5 rounded-full bg-[#2563EB]/25 border border-[#2563EB] text-[#22D3EE] font-black text-[9.5px] uppercase tracking-wide flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
              You
            </span>
          ) : (masteryScore ?? 0) >= 80 ? (
            <span className="px-1.5 py-0.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/70 text-[#10B981] font-bold text-[9.5px] uppercase tracking-wide flex items-center gap-0.5" title={`Mastered (${masteryScore}%)`}>
              <Star className="w-2.5 h-2.5 fill-[#10B981] text-[#10B981]" />
              ★ Master
            </span>
          ) : (masteryScore ?? 0) >= 55 ? (
            <span className="px-1.5 py-0.5 rounded-full bg-[#22D3EE]/15 border border-[#22D3EE]/60 text-[#22D3EE] font-bold text-[9.5px] flex items-center gap-0.5" title={`Strong (${masteryScore}%)`}>
              <Sparkles className="w-2.5 h-2.5 text-[#22D3EE]" />
              ◉ Strong
            </span>
          ) : isCompleted ? (
            <span className="px-1.5 py-0.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/60 text-[#10B981] font-bold text-[9.5px] flex items-center gap-1" title="Completed">
              <CheckCircle2 className="w-2.5 h-2.5 text-[#10B981]" />
              ✓ Done
            </span>
          ) : (
            <span className="text-[9.5px] font-mono font-medium text-[#64748B]" title="Unseen">
              ○ {square.difficulty.slice(0, 3).toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* 2. MIDDLE ROW: Topic Name (14-16px Bold) and Short Description (11-12px) */}
      <div className="flex-1 flex flex-col justify-center py-1">
        <h4 className="font-extrabold text-[13px] sm:text-[14px] md:text-[15px] text-[#F8FAFC] leading-tight tracking-tight line-clamp-2 break-words group-hover:text-[#22D3EE] transition-colors">
          {topicName}
        </h4>
        <p className="text-[10.5px] sm:text-[11.5px] text-[#94A3B8] leading-tight line-clamp-1 mt-0.5 font-medium">
          {square.subtopic || square.summary || square.topic}
        </p>
      </div>

      {/* 3. BOTTOM ROW: Type Badge ([CONCEPT], [LADDER], [SNAKE], [BOSS], [FINAL]) */}
      <div className="flex items-center justify-between w-full pt-1 border-t border-[#263449]">
        {square.id === 100 ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#8B5CF6]/25 border border-[#8B5CF6]/70 text-[#8B5CF6] font-black text-[10px] uppercase tracking-wider">
            <Trophy className="w-3 h-3 text-[#8B5CF6]" />
            FINAL TITAN
          </span>
        ) : square.id === 1 ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#2563EB]/20 border border-[#2563EB]/60 text-[#22D3EE] font-bold text-[10px] uppercase tracking-wider">
            START
          </span>
        ) : ladder ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F59E0B]/20 border border-[#F59E0B]/60 text-[#F59E0B] font-bold text-[10px] uppercase tracking-wide">
            <Zap className="w-3 h-3 text-[#F59E0B]" />
            <span>LADDER &rarr; {ladder.to}</span>
          </span>
        ) : snake ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F43F5E]/20 border border-[#F43F5E]/60 text-[#F43F5E] font-bold text-[10px] uppercase tracking-wide">
            <AlertTriangle className="w-3 h-3 text-[#F43F5E]" />
            <span>SNAKE &darr; {snake.to}</span>
          </span>
        ) : ladderDestination ? (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] font-medium text-[9.5px]">
            <ArrowUpRight className="w-2.5 h-2.5 text-[#F59E0B]" />
            Exit (From {ladderDestination.from})
          </span>
        ) : snakeDestination ? (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#F43F5E]/15 border border-[#F43F5E]/30 text-[#F43F5E] font-medium text-[9.5px]">
            <ArrowDownRight className="w-2.5 h-2.5 text-[#F43F5E]" />
            Drop (From {snakeDestination.from})
          </span>
        ) : square.isCheckpoint ? (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#F59E0B]/20 border border-[#F59E0B]/50 text-[#F59E0B] font-bold text-[10px] uppercase">
            CHECKPOINT
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#172033] border border-[#263449] text-[#94A3B8] text-[10px] font-semibold uppercase tracking-wider">
            {square.stageName.split(' ')[0]}
          </span>
        )}

        {/* Small Detail Indicator */}
        <span className="text-[10px] text-[#64748B] font-mono group-hover:text-[#22D3EE] transition-colors">
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
