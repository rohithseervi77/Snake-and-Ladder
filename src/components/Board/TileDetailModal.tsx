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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#080D1A]/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-[#111827] border border-[#263449] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-[#F8FAFC] flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tile-detail-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#263449] bg-[#0B1220]">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black font-mono text-lg shadow-md ${
              square.id === 100 
                ? 'bg-[#8B5CF6] text-[#F8FAFC] ring-2 ring-[#8B5CF6]' 
                : isCurrent 
                  ? 'bg-[#2563EB] text-[#F8FAFC] ring-2 ring-[#22D3EE]' 
                  : isCompleted 
                    ? 'bg-[#10B981] text-[#F8FAFC]' 
                    : 'bg-[#172033] border border-[#263449] text-[#22D3EE]'
            }`}>
              {square.id}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
                  {square.stageName}
                </span>
                <span className="px-1.5 py-0.2 rounded bg-[#080D1A] border border-[#263449] text-[#22D3EE] font-mono text-[10px] uppercase font-bold">
                  {square.difficulty}
                </span>
              </div>
              <h2 id="tile-detail-title" className="text-base sm:text-lg font-black text-[#F8FAFC] leading-tight">
                {square.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Level Details"
            className="p-1.5 rounded-lg bg-[#172033] hover:bg-[#263449] border border-[#263449] text-[#94A3B8] hover:text-[#F8FAFC] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-4 text-xs sm:text-sm">
          {/* Status Banner */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#172033] border border-[#263449] text-xs">
            <span className="font-semibold text-[#94A3B8]">Level Status:</span>
            <span className="font-bold flex items-center gap-1.5">
              {isCurrent ? (
                <span className="text-[#22D3EE] flex items-center gap-1.5 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22D3EE] animate-ping inline-block" />
                  ● Current Position
                </span>
              ) : isCompleted ? (
                <span className="text-[#10B981] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  ✓ Completed
                </span>
              ) : (
                <span className="text-[#94A3B8] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                  Available Level
                </span>
              )}
            </span>
          </div>

          {/* Description & Summary */}
          <div className="p-3.5 rounded-xl bg-[#172033] border border-[#263449]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#22D3EE] mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Core Concept Summary
            </div>
            <p className="text-[#F8FAFC] leading-relaxed text-xs sm:text-sm font-medium">
              {square.summary || 'Explore fundamental algorithmic principles on this curriculum stage.'}
            </p>
            {square.keyTakeaway && (
              <p className="text-[#10B981] text-xs mt-2 pt-2 border-t border-[#263449] font-semibold flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                <span>Key Takeaway: {square.keyTakeaway}</span>
              </p>
            )}
          </div>

          {/* Optimization Ladder Details */}
          {relatedLadder && (
            <div className="p-3.5 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/40 text-[#F8FAFC]">
              <div className="flex items-center justify-between font-bold text-xs mb-1">
                <span className="flex items-center gap-1.5 text-[#F59E0B]">
                  <Zap className="w-4 h-4" />
                  Optimization Ladder: Leap to Tile {relatedLadder.to}
                </span>
                <span className="font-mono text-[11px] bg-[#F59E0B]/20 px-2 py-0.5 rounded text-[#F59E0B] border border-[#F59E0B]/40">
                  +{relatedLadder.to - relatedLadder.from} Tiles
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed mt-1">
                {relatedLadder.description}
              </p>
              {relatedLadder.pedagogicalReason && (
                <p className="text-[11px] text-[#F59E0B] mt-1.5 font-semibold">
                  Why it optimizes: {relatedLadder.pedagogicalReason}
                </p>
              )}
            </div>
          )}

          {/* Intelligent Snake Trap Details */}
          {relatedSnake && (
            <div className="p-3.5 rounded-xl bg-[#F43F5E]/10 border border-[#F43F5E]/40 text-[#F8FAFC]">
              <div className="flex items-center justify-between font-bold text-xs mb-1">
                <span className="flex items-center gap-1.5 text-[#F43F5E]">
                  <AlertTriangle className="w-4 h-4" />
                  Debugging Snake: Hazard Drop to Tile {relatedSnake.to}
                </span>
                <span className="font-mono text-[11px] bg-[#F43F5E]/20 px-2 py-0.5 rounded text-[#F43F5E] border border-[#F43F5E]/40">
                  -{relatedSnake.from - relatedSnake.to} Tiles
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed mt-1">
                {relatedSnake.description}
              </p>
              {relatedSnake.pedagogicalReason && (
                <p className="text-[11px] text-[#F43F5E] mt-1.5 font-semibold">
                  Underlying Pitfall: {relatedSnake.pedagogicalReason}
                </p>
              )}
            </div>
          )}

          {/* Ladder Destination Notice */}
          {ladderDestination && (
            <div className="p-2.5 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F8FAFC] text-xs flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span>Optimization Ladder Destination from Tile {ladderDestination.from}.</span>
            </div>
          )}

          {/* Snake Destination Notice */}
          {snakeDestination && (
            <div className="p-2.5 rounded-xl bg-[#F43F5E]/10 border border-[#F43F5E]/30 text-[#F8FAFC] text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#F43F5E] shrink-0" />
              <span>Snake Trap Slide Termination from Tile {snakeDestination.from}.</span>
            </div>
          )}

          {/* Checkpoint Criteria */}
          {square.checkpointTasks && square.checkpointTasks.length > 0 && (
            <div className="p-3.5 rounded-xl bg-[#172033] border border-[#263449]">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                Checkpoint Objectives
              </div>
              <ul className="flex flex-col gap-1.5">
                {square.checkpointTasks.map((task, i) => (
                  <li key={i} className="text-xs text-[#94A3B8] flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0 mt-1.5" />
                    <span className="leading-snug">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#263449] bg-[#0B1220] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#172033] hover:bg-[#263449] border border-[#263449] text-xs font-bold text-[#94A3B8] hover:text-[#F8FAFC] transition cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onStartChallenge(square.id);
            }}
            className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-[#F8FAFC] font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-[#2563EB]/25 transition flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isCompleted ? 'Review Challenge' : 'Solve Challenge & Move'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
