import React from 'react';
import { 
  X, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Play, 
  BookOpen, 
  Sparkles
} from 'lucide-react';
import { SquareMetadata } from '../../types/curriculum';
import { SNAKES_AND_LADDERS } from '../../data/snakesAndLadders';

interface TileDetailModalProps {
  square: SquareMetadata | null;
  isOpen: boolean;
  isCurrent: boolean;
  isCompleted: boolean;
  onClose: () => void;
  onStartChallenge: (squareId: number) => void;
}

export const TileDetailModal: React.FC<TileDetailModalProps> = ({
  square,
  isOpen,
  isCurrent,
  isCompleted,
  onClose,
  onStartChallenge
}) => {
  if (!isOpen || !square) return null;

  // Find related snake or ladder
  const relatedLadder = SNAKES_AND_LADDERS.find(item => item.type === 'ladder' && item.from === square.id);
  const relatedSnake = SNAKES_AND_LADDERS.find(item => item.type === 'snake' && item.from === square.id);
  const ladderDestination = SNAKES_AND_LADDERS.find(item => item.type === 'ladder' && item.to === square.id);
  const snakeDestination = SNAKES_AND_LADDERS.find(item => item.type === 'snake' && item.to === square.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-[var(--text-primary)] flex flex-col max-h-[90vh] transition-colors duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tile-detail-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--card-secondary-bg)]">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black font-mono text-lg shadow-md ${
              square.id === 100 
                ? 'bg-[var(--color-violet)] text-white ring-2 ring-[var(--color-violet)]' 
                : isCurrent 
                  ? 'bg-[var(--color-indigo)] text-white ring-2 ring-[var(--color-cyan)]' 
                  : isCompleted 
                    ? 'bg-[var(--color-emerald)] text-white' 
                    : 'bg-[var(--card-bg)] border border-[var(--border-subtle)] text-[var(--color-cyan)]'
            }`}>
              {square.id}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                  {square.stageName}
                </span>
                <span className="px-1.5 py-0.2 rounded bg-[var(--card-bg)] border border-[var(--border-subtle)] text-[var(--color-cyan)] font-mono text-[10px] uppercase font-bold">
                  {square.difficulty}
                </span>
              </div>
              <h2 id="tile-detail-title" className="text-base sm:text-lg font-black text-[var(--text-primary)] leading-tight">
                {square.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Level Details"
            className="p-1.5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-4 text-xs sm:text-sm">
          {/* Status Banner */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-xs">
            <span className="font-semibold text-[var(--text-secondary)]">Level Status:</span>
            <span className="font-bold flex items-center gap-1.5">
              {isCurrent ? (
                <span className="text-[var(--color-indigo)] flex items-center gap-1.5 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-indigo)] animate-ping inline-block" />
                  ● Current Position
                </span>
              ) : isCompleted ? (
                <span className="text-[var(--color-emerald)] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  ✓ Completed
                </span>
              ) : (
                <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--color-indigo)]" />
                  Available Level
                </span>
              )}
            </span>
          </div>

          {/* Description & Summary */}
          <div className="p-3.5 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-cyan)] mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Core Concept Summary
            </div>
            <p className="text-[var(--text-primary)] leading-relaxed text-xs sm:text-sm font-medium">
              {square.summary || 'Explore fundamental algorithmic principles on this curriculum stage.'}
            </p>
            {square.keyTakeaway && (
              <p className="text-[var(--color-emerald)] text-xs mt-2 pt-2 border-t border-[var(--border-subtle)] font-semibold flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[var(--color-emerald)] shrink-0 mt-0.5" />
                <span>Key Takeaway: {square.keyTakeaway}</span>
              </p>
            )}
          </div>

          {/* Optimization Ladder Details */}
          {relatedLadder && (
            <div className="p-3.5 rounded-xl bg-[var(--color-amber-light)] border border-[var(--color-amber-border)] text-[var(--text-primary)]">
              <div className="flex items-center justify-between font-bold text-xs mb-1">
                <span className="flex items-center gap-1.5 text-[var(--color-amber)]">
                  <Zap className="w-4 h-4" />
                  Optimization Ladder: Leap to Tile {relatedLadder.to}
                </span>
                <span className="font-mono text-[11px] bg-[var(--card-bg)] px-2 py-0.5 rounded text-[var(--color-amber)] border border-[var(--color-amber-border)]">
                  +{relatedLadder.to - relatedLadder.from} Tiles
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-1">
                {relatedLadder.description}
              </p>
              {relatedLadder.pedagogicalReason && (
                <p className="text-[11px] text-[var(--color-amber)] mt-1.5 font-semibold">
                  Why it optimizes: {relatedLadder.pedagogicalReason}
                </p>
              )}
            </div>
          )}

          {/* Intelligent Snake Trap Details */}
          {relatedSnake && (
            <div className="p-3.5 rounded-xl bg-[var(--color-rose-light)] border border-[var(--color-rose-border)] text-[var(--text-primary)]">
              <div className="flex items-center justify-between font-bold text-xs mb-1">
                <span className="flex items-center gap-1.5 text-[var(--color-rose)]">
                  <AlertTriangle className="w-4 h-4" />
                  Debugging Snake: Hazard Drop to Tile {relatedSnake.to}
                </span>
                <span className="font-mono text-[11px] bg-[var(--card-bg)] px-2 py-0.5 rounded text-[var(--color-rose)] border border-[var(--color-rose-border)]">
                  -{relatedSnake.from - relatedSnake.to} Tiles
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-1">
                {relatedSnake.description}
              </p>
              {relatedSnake.pedagogicalReason && (
                <p className="text-[11px] text-[var(--color-rose)] mt-1.5 font-semibold">
                  Underlying Pitfall: {relatedSnake.pedagogicalReason}
                </p>
              )}
            </div>
          )}

          {/* Ladder Destination Notice */}
          {ladderDestination && (
            <div className="p-2.5 rounded-xl bg-[var(--color-amber-light)] border border-[var(--color-amber-border)] text-[var(--text-primary)] text-xs flex items-center gap-2">
              <Zap className="w-4 h-4 text-[var(--color-amber)] shrink-0" />
              <span>Optimization Ladder Destination from Tile {ladderDestination.from}.</span>
            </div>
          )}

          {/* Snake Destination Notice */}
          {snakeDestination && (
            <div className="p-2.5 rounded-xl bg-[var(--color-rose-light)] border border-[var(--color-rose-border)] text-[var(--text-primary)] text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[var(--color-rose)] shrink-0" />
              <span>Snake Trap Slide Termination from Tile {snakeDestination.from}.</span>
            </div>
          )}

          {/* Checkpoint Criteria */}
          {square.checkpointTasks && square.checkpointTasks.length > 0 && (
            <div className="p-3.5 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-emerald)]" />
                Checkpoint Objectives
              </div>
              <ul className="flex flex-col gap-1.5">
                {square.checkpointTasks.map((task, i) => (
                  <li key={i} className="text-xs text-[var(--text-secondary)] flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-emerald)] shrink-0 mt-1.5" />
                    <span className="leading-snug">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[var(--border-subtle)] bg-[var(--card-secondary-bg)] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onStartChallenge(square.id);
            }}
            className="px-6 py-2.5 rounded-xl bg-[var(--color-indigo)] hover:bg-[var(--color-indigo-hover)] text-white font-black text-xs sm:text-sm tracking-wide shadow-md transition flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isCompleted ? 'Review Challenge' : 'Solve Challenge & Move'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
