import React from 'react';
import { 
  Trophy, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Code, 
  Layers, 
  Search, 
  FolderTree, 
  Network, 
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
 * Natural human-friendly title formatting for student cards:
 * Replaces overly formal generated phrasing with concise, punchy topic names.
 */
function formatTopicName(title: string): string {
  let clean = title.replace(/\s*\([^)]*\)/g, '').trim();
  clean = clean.replace(/Primitive Operations & Computational Cost Analysis/i, 'Primitive Operations');
  clean = clean.replace(/Comparative Asymptotic Function Analysis/i, 'Compare Function Growth');
  clean = clean.replace(/Exponential & Factorial Growth Dominance/i, 'Exponential vs Factorial');
  clean = clean.replace(/Algorithm Correctness & Specifications/i, 'Algorithm Correctness');
  clean = clean.replace(/Strict Upper Bounds \(O-Notation\)/i, 'Big-O Notation');
  clean = clean.replace(/Strict Lower Bounds \(Omega-Notation\)/i, 'Big-Omega Notation');
  clean = clean.replace(/Tight Bounds \(Theta-Notation\)/i, 'Big-Theta Notation');
  clean = clean.replace(/Instruction Counting Model/i, 'Instruction Counting');
  return clean;
}

function formatDifficulty(diff: string): string {
  if (diff === 'easy') return 'Easy';
  if (diff === 'medium') return 'Med';
  if (diff === 'hard') return 'Hard';
  return 'Exp';
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

  // Card theme styling with calm, human borders rather than excessive neon glows
  const getCardClasses = () => {
    // 1. Current Player Tile
    if (isCurrent) {
      return 'bg-[var(--card-bg)] border-[var(--color-indigo)] text-[var(--text-primary)] ring-2 ring-[var(--color-indigo)]/50 shadow-sm z-20 scale-[1.01]';
    }
    // 2. Tile 100 Finish
    if (square.id === 100) {
      return 'bg-[var(--card-bg)] border-[var(--color-violet)] text-[var(--text-primary)] hover:border-[var(--color-violet)] shadow-sm';
    }
    // 3. Snake Tile (Mistake trap)
    if (snake) {
      return 'bg-[var(--card-bg)] border-[var(--color-rose)] text-[var(--text-primary)] hover:border-[var(--color-rose)] shadow-sm';
    }
    // 4. Ladder Tile (Optimization leap)
    if (ladder) {
      return 'bg-[var(--card-bg)] border-[var(--color-amber)] text-[var(--text-primary)] hover:border-[var(--color-amber)] shadow-sm';
    }
    // 5. Checkpoint Tile
    if (square.isCheckpoint) {
      return 'bg-[var(--card-bg)] border-[var(--color-amber)] text-[var(--text-primary)] hover:border-[var(--color-amber)] shadow-sm';
    }
    // 6. Mastered Tile
    if ((masteryScore ?? 0) >= 80) {
      return 'bg-[var(--card-bg)] border-[var(--color-emerald)] text-[var(--text-primary)] hover:border-[var(--color-emerald)] shadow-sm';
    }
    // 7. Completed Tile
    if (isCompleted) {
      return 'bg-[var(--card-bg)] border-[var(--color-cyan)] text-[var(--text-primary)] hover:border-[var(--color-cyan)] shadow-sm';
    }
    // 8. Standard Tile
    return 'bg-[var(--card-bg)] border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--color-indigo)]/50 shadow-sm';
  };

  const getStageIcon = () => {
    switch (square.stage) {
      case 'co1_math_analysis': 
      case 'co1_asymptotic': 
      case 'co1_recurrence_sub': 
      case 'co1_master_tree': 
        return <Code className="w-3.5 h-3.5 text-[var(--color-emerald)] shrink-0" />;
      case 'co2_stacks': 
      case 'co2_queues': 
      case 'co2_linked_lists': 
        return <Layers className="w-3.5 h-3.5 text-[var(--color-cyan)] shrink-0" />;
      case 'co3_sorting_searching': 
        return <Search className="w-3.5 h-3.5 text-[var(--color-indigo)] shrink-0" />;
      case 'co4_trees': 
        return <FolderTree className="w-3.5 h-3.5 text-[var(--color-violet)] shrink-0" />;
      case 'co4_graphs_algorithms': 
        return <Network className="w-3.5 h-3.5 text-[var(--color-violet)] shrink-0" />;
      default: 
        return <Sparkles className="w-3.5 h-3.5 text-[var(--color-cyan)] shrink-0" />;
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
      className={`relative z-10 rounded-2xl border p-2 sm:p-2.5 flex flex-col justify-between transition-all duration-150 cursor-pointer select-none group text-left ${getCardClasses()} ${
        !isCurrent ? 'hover:-translate-y-0.5 hover:shadow' : ''
      }`}
    >
      {/* 1. TOP ROW: Level Number and Status/Badge */}
      <div className="flex items-center justify-between w-full border-b border-[var(--border-subtle)] pb-1">
        <div className="flex items-center gap-1.5">
          <span className={`font-mono font-bold text-base sm:text-lg tracking-tight leading-none ${
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

        {/* Status Indicator */}
        <div className="flex items-center gap-1">
          {isCurrent ? (
            <span className="px-1.5 py-0.5 rounded-full bg-[var(--color-indigo-light)] border border-[var(--color-indigo-border)] text-[var(--color-indigo)] font-semibold text-[9.5px] flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-indigo)]" />
              You
            </span>
          ) : (masteryScore ?? 0) >= 80 ? (
            <span className="px-1.5 py-0.5 rounded-full bg-[var(--color-emerald-light)] border border-[var(--color-emerald-border)] text-[var(--color-emerald)] font-medium text-[9.5px] flex items-center gap-0.5 shadow-sm" title={`Mastered (${masteryScore}%)`}>
              <Star className="w-2.5 h-2.5 fill-[var(--color-emerald)] text-[var(--color-emerald)]" />
              Master
            </span>
          ) : (masteryScore ?? 0) >= 55 ? (
            <span className="px-1.5 py-0.5 rounded-full bg-[var(--color-cyan-light)] border border-[var(--color-cyan-border)] text-[var(--color-cyan)] font-medium text-[9.5px] flex items-center gap-0.5 shadow-sm" title={`Strong (${masteryScore}%)`}>
              <Sparkles className="w-2.5 h-2.5 text-[var(--color-cyan)]" />
              Strong
            </span>
          ) : isCompleted ? (
            <span className="px-1.5 py-0.5 rounded-full bg-[var(--color-cyan-light)] border border-[var(--color-cyan-border)] text-[var(--color-cyan)] font-medium text-[9.5px] flex items-center gap-1 shadow-sm" title="Completed">
              <CheckCircle2 className="w-2.5 h-2.5 text-[var(--color-cyan)]" />
              Done
            </span>
          ) : (
            <span className="text-[9.5px] font-mono font-medium text-[var(--text-muted)]" title="Difficulty">
              {formatDifficulty(square.difficulty)}
            </span>
          )}
        </div>
      </div>

      {/* 2. MIDDLE ROW: Topic Name and Short Description */}
      <div className="flex-1 flex flex-col justify-center py-1">
        <h4 className="font-bold text-[12.5px] sm:text-[13px] md:text-[13.5px] text-[var(--text-primary)] leading-tight tracking-tight line-clamp-2 break-words group-hover:text-[var(--color-indigo)] transition-colors">
          {topicName}
        </h4>
        <p className="text-[10px] sm:text-[10.5px] text-[var(--text-secondary)] leading-tight line-clamp-1 mt-0.5 font-normal">
          {square.subtopic || square.summary || square.topic}
        </p>
      </div>

      {/* 3. BOTTOM ROW: Type Badge */}
      <div className="flex items-center justify-between w-full pt-1 border-t border-[var(--border-subtle)]">
        {square.id === 100 ? (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[var(--color-violet-light)] border border-[var(--color-violet-border)] text-[var(--color-violet)] font-semibold text-[9.5px] shadow-sm">
            <Trophy className="w-2.5 h-2.5 text-[var(--color-violet)]" />
            Finish (100)
          </span>
        ) : square.id === 1 ? (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[var(--color-indigo-light)] border border-[var(--color-indigo-border)] text-[var(--color-indigo)] font-semibold text-[9.5px] shadow-sm">
            Start
          </span>
        ) : ladder ? (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[var(--color-amber-light)] border border-[var(--color-amber-border)] text-[var(--color-amber)] font-medium text-[9.5px] shadow-sm">
            <Zap className="w-2.5 h-2.5 text-[var(--color-amber)]" />
            <span>Ladder &rarr; {ladder.to}</span>
          </span>
        ) : snake ? (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[var(--color-rose-light)] border border-[var(--color-rose-border)] text-[var(--color-rose)] font-medium text-[9.5px] shadow-sm">
            <AlertTriangle className="w-2.5 h-2.5 text-[var(--color-rose)]" />
            <span>Snake &darr; {snake.to}</span>
          </span>
        ) : ladderDestination ? (
          <span className="inline-flex items-center gap-1 px-1 py-0.5 rounded bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--color-amber)] font-normal text-[9px]">
            <ArrowUpRight className="w-2.5 h-2.5 text-[var(--color-amber)]" />
            Exit ({ladderDestination.from})
          </span>
        ) : snakeDestination ? (
          <span className="inline-flex items-center gap-1 px-1 py-0.5 rounded bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--color-rose)] font-normal text-[9px]">
            <ArrowDownRight className="w-2.5 h-2.5 text-[var(--color-rose)]" />
            Drop ({snakeDestination.from})
          </span>
        ) : square.isCheckpoint ? (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[var(--color-amber-light)] border border-[var(--color-amber-border)] text-[var(--color-amber)] font-medium text-[9.5px] shadow-sm">
            Checkpoint
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] text-[9.5px] font-normal">
            {square.stageName.split(' ')[0]}
          </span>
        )}

        {/* Small Detail Indicator */}
        <span className="text-[9.5px] text-[var(--text-muted)] font-mono group-hover:text-[var(--color-indigo)] transition-colors">
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
