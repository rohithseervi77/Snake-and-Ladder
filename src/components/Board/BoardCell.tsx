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

  // Card theme styling based on category and event
  const getCardClasses = () => {
    if (square.id === 100) {
      return 'bg-gradient-to-br from-[#2a1a05] via-[#1a0f2e] to-[#0d1633] border-amber-400 text-amber-100 shadow-xl shadow-amber-500/20';
    }
    if (square.id === 1) {
      return 'bg-[#062017] border-emerald-500 text-emerald-100 shadow-md shadow-emerald-950/40';
    }
    if (ladder) {
      return 'bg-[#211504] border-amber-500/90 text-amber-100 hover:border-amber-300 shadow-md shadow-amber-950/40';
    }
    if (snake) {
      return 'bg-[#240a10] border-rose-500/90 text-rose-100 hover:border-rose-300 shadow-md shadow-rose-950/40';
    }
    if (square.isCheckpoint) {
      return 'bg-[#1e1705] border-amber-400/80 text-amber-100 shadow-md';
    }

    switch (square.colorCategory) {
      case 'emerald':
        return 'bg-[#081f18] border-emerald-700/60 text-emerald-100 hover:border-emerald-400';
      case 'purple':
        return 'bg-[#170e2b] border-purple-700/60 text-purple-100 hover:border-purple-400';
      case 'amber':
        return 'bg-[#211405] border-amber-700/60 text-amber-100 hover:border-amber-400';
      case 'blue':
        return 'bg-[#0a1930] border-blue-700/60 text-blue-100 hover:border-blue-400';
      case 'teal':
        return 'bg-[#082024] border-teal-700/60 text-teal-100 hover:border-teal-400';
      case 'indigo':
        return 'bg-[#0f1130] border-indigo-700/60 text-indigo-100 hover:border-indigo-400';
      case 'rose':
        return 'bg-[#20090f] border-rose-700/60 text-rose-100 hover:border-rose-400';
      default:
        return 'bg-[#0d172b] border-slate-700/60 text-slate-100 hover:border-slate-400';
    }
  };

  const getStageIcon = () => {
    switch (square.stage) {
      case 'foundations': return <Code className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
      case 'arrays_strings': return <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
      case 'linear_structures': return <GitBranch className="w-3.5 h-3.5 text-purple-400 shrink-0" />;
      case 'search_sort': return <Search className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
      case 'trees_heaps': return <FolderTree className="w-3.5 h-3.5 text-teal-400 shrink-0" />;
      case 'hashing_recursion': return <Hash className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
      case 'graphs': return <Network className="w-3.5 h-3.5 text-indigo-400 shrink-0" />;
      case 'greedy_dp': return <Clock className="w-3.5 h-3.5 text-pink-400 shrink-0" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-yellow-400 shrink-0" />;
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
        isCurrent 
          ? 'ring-4 ring-cyan-400 border-cyan-300 shadow-2xl shadow-cyan-500/50 scale-[1.02] z-20' 
          : 'hover:-translate-y-0.5 hover:shadow-xl'
      }`}
    >
      {/* 1. TOP ROW: Level Number (18-22px) and Status/Badge */}
      <div className="flex items-center justify-between w-full border-b border-white/10 pb-1">
        <div className="flex items-center gap-1.5">
          <span className={`font-mono font-black text-lg sm:text-xl tracking-tight leading-none ${
            square.id === 100 
              ? 'text-amber-300' 
              : isCurrent 
                ? 'text-cyan-300' 
                : 'text-white'
          }`}>
            {formattedNumber}
          </span>
          {getStageIcon()}
        </div>

        {/* Status Indicator / Mastered Tile Evolution */}
        <div className="flex items-center gap-1">
          {isCurrent ? (
            <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/30 border border-cyan-400 text-cyan-200 font-extrabold text-[10px] uppercase tracking-wide flex items-center gap-1 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
              You
            </span>
          ) : (masteryScore ?? 0) >= 80 ? (
            <span className="px-1.5 py-0.5 rounded-full bg-amber-400/25 border border-amber-400/80 text-amber-300 font-black text-[9.5px] uppercase tracking-wide flex items-center gap-0.5 shadow-sm shadow-amber-950/60" title={`Mastered (${masteryScore}%)`}>
              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
              ★ Master
            </span>
          ) : (masteryScore ?? 0) >= 55 ? (
            <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/60 text-cyan-300 font-bold text-[9.5px] flex items-center gap-0.5" title={`Strong (${masteryScore}%)`}>
              <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
              ◉ Strong
            </span>
          ) : isCompleted ? (
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/25 border border-emerald-500/60 text-emerald-300 font-bold text-[9.5px] flex items-center gap-1" title="Practiced">
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
              ◐ Done
            </span>
          ) : (
            <span className="text-[9.5px] font-mono font-medium text-slate-500" title="Unseen">
              ○ {square.difficulty.slice(0, 3).toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* 2. MIDDLE ROW: Topic Name (14-16px Bold) and Short Description (11-12px) */}
      <div className="flex-1 flex flex-col justify-center py-1">
        <h4 className="font-extrabold text-[13px] sm:text-[14px] md:text-[15px] text-white leading-tight tracking-tight line-clamp-2 break-words group-hover:text-blue-200 transition-colors">
          {topicName}
        </h4>
        <p className="text-[10.5px] sm:text-[11.5px] text-slate-300/80 leading-tight line-clamp-1 mt-0.5 font-medium">
          {square.subtopic || square.summary || square.topic}
        </p>
      </div>

      {/* 3. BOTTOM ROW: Type Badge ([CONCEPT], [LADDER], [SNAKE], [BOSS], [FINAL]) */}
      <div className="flex items-center justify-between w-full pt-1 border-t border-white/5">
        {square.id === 100 ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow">
            <Trophy className="w-3 h-3 fill-slate-950" />
            FINAL TITAN
          </span>
        ) : square.id === 1 ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/30 border border-emerald-500/60 text-emerald-300 font-bold text-[10px] uppercase tracking-wider">
            START
          </span>
        ) : ladder ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/25 border border-amber-500/60 text-amber-200 font-bold text-[10.5px] uppercase tracking-wide">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>LADDER &rarr; {ladder.to}</span>
          </span>
        ) : snake ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-500/25 border border-rose-500/60 text-rose-200 font-bold text-[10.5px] uppercase tracking-wide">
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            <span>SNAKE &darr; {snake.to}</span>
          </span>
        ) : ladderDestination ? (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-500/15 text-amber-300/90 font-medium text-[9.5px]">
            <ArrowUpRight className="w-2.5 h-2.5 text-amber-400" />
            Exit (From {ladderDestination.from})
          </span>
        ) : snakeDestination ? (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-rose-500/15 text-rose-300/90 font-medium text-[9.5px]">
            <ArrowDownRight className="w-2.5 h-2.5 text-rose-400" />
            Drop (From {snakeDestination.from})
          </span>
        ) : square.isCheckpoint ? (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold text-[10px] uppercase">
            Checkpoint
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300 text-[10px] font-semibold uppercase tracking-wider">
            {square.stageName.split(' ')[0]}
          </span>
        )}

        {/* Small Detail Indicator */}
        <span className="text-[10px] text-slate-400/80 font-mono group-hover:text-blue-300 transition-colors">
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
