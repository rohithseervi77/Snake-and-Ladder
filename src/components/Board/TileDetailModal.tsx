import React from 'react';
import { 
  X, 
  Layers, 
  Target, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Play, 
  BookOpen, 
  Trophy, 
  Sparkles,
  ArrowRight,
  Shield,
  HelpCircle
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-[#0c1527] border-2 border-[#243556] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-slate-200 flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tile-detail-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1e2d4d] bg-[#091020]">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black font-mono text-lg shadow-md ${
              square.id === 100 
                ? 'bg-amber-400 text-slate-950' 
                : isCurrent 
                  ? 'bg-cyan-500 text-slate-950 ring-2 ring-cyan-400' 
                  : isCompleted 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-blue-600 text-white'
            }`}>
              {square.id}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {square.stageName}
                </span>
                <span className="px-1.5 py-0.2 rounded bg-slate-800 text-blue-300 font-mono text-[10px] uppercase font-bold">
                  {square.difficulty}
                </span>
              </div>
              <h2 id="tile-detail-title" className="text-base sm:text-lg font-black text-white leading-tight">
                {square.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Level Details"
            className="p-1.5 rounded-lg bg-[#141f38] hover:bg-[#1e2e50] text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-4 text-xs sm:text-sm">
          {/* Status Banner */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#121c33] border border-[#1e2e4e] text-xs">
            <span className="font-semibold text-slate-400">Level Status:</span>
            <span className="font-bold flex items-center gap-1.5">
              {isCurrent ? (
                <span className="text-cyan-400 flex items-center gap-1.5 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping inline-block" />
                  ● Current Position
                </span>
              ) : isCompleted ? (
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  ✓ Completed
                </span>
              ) : (
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  Available Level
                </span>
              )}
            </span>
          </div>

          {/* Description & Summary */}
          <div className="p-3.5 rounded-xl bg-[#14203a] border border-[#203154]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Core Concept Summary
            </div>
            <p className="text-slate-200 leading-relaxed text-xs sm:text-sm font-medium">
              {square.summary || 'Explore fundamental algorithmic principles on this curriculum stage.'}
            </p>
            {square.keyTakeaway && (
              <p className="text-emerald-300 text-xs mt-2 pt-2 border-t border-slate-800 font-semibold flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Key Takeaway: {square.keyTakeaway}</span>
              </p>
            )}
          </div>

          {/* Optimization Ladder Details */}
          {relatedLadder && (
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-600/50 text-amber-200">
              <div className="flex items-center justify-between font-bold text-xs mb-1">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Zap className="w-4 h-4" />
                  Optimization Ladder: Leap to Tile {relatedLadder.to}
                </span>
                <span className="font-mono text-[11px] bg-amber-500/20 px-2 py-0.5 rounded text-amber-300">
                  +{relatedLadder.to - relatedLadder.from} Tiles
                </span>
              </div>
              <p className="text-xs text-amber-200/90 leading-relaxed mt-1">
                {relatedLadder.description}
              </p>
              {relatedLadder.pedagogicalReason && (
                <p className="text-[11px] text-amber-400/90 mt-1.5 font-semibold">
                  Why it optimizes: {relatedLadder.pedagogicalReason}
                </p>
              )}
            </div>
          )}

          {/* Intelligent Snake Trap Details */}
          {relatedSnake && (
            <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-600/50 text-rose-200">
              <div className="flex items-center justify-between font-bold text-xs mb-1">
                <span className="flex items-center gap-1.5 text-rose-300">
                  <AlertTriangle className="w-4 h-4" />
                  Debugging Snake: Hazard Drop to Tile {relatedSnake.to}
                </span>
                <span className="font-mono text-[11px] bg-rose-500/20 px-2 py-0.5 rounded text-rose-300">
                  -{relatedSnake.from - relatedSnake.to} Tiles
                </span>
              </div>
              <p className="text-xs text-rose-200/90 leading-relaxed mt-1">
                {relatedSnake.description}
              </p>
              {relatedSnake.pedagogicalReason && (
                <p className="text-[11px] text-rose-400/90 mt-1.5 font-semibold">
                  Underlying Pitfall: {relatedSnake.pedagogicalReason}
                </p>
              )}
            </div>
          )}

          {/* Ladder Destination Notice */}
          {ladderDestination && (
            <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-700/40 text-amber-200 text-xs flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Optimization Ladder Destination from Tile {ladderDestination.from}.</span>
            </div>
          )}

          {/* Snake Destination Notice */}
          {snakeDestination && (
            <div className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-700/40 text-rose-200 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Snake Trap Slide Termination from Tile {snakeDestination.from}.</span>
            </div>
          )}

          {/* Checkpoint Criteria */}
          {square.checkpointTasks && square.checkpointTasks.length > 0 && (
            <div className="p-3.5 rounded-xl bg-[#0e172a] border border-[#1e2e4f]">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Checkpoint Objectives
              </div>
              <ul className="flex flex-col gap-1.5">
                {square.checkpointTasks.map((task, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span className="leading-snug">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#1e2d4d] bg-[#091020] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#141f38] hover:bg-[#1e2e50] text-xs font-bold text-slate-300 transition cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onStartChallenge(square.id);
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-emerald-500/25 transition flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>{isCompleted ? 'Review Challenge' : 'Solve Challenge & Move'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
