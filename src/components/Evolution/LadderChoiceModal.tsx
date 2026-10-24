import React from 'react';
import { TrendingUp, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { OptimizationLadderChoice } from '../../types/evolution';

interface LadderChoiceModalProps {
  isOpen: boolean;
  ladder: OptimizationLadderChoice | null;
  hasLadderBoost: boolean;
  onSelectOption: (option: 'safe' | 'expert') => void;
  onClose: () => void;
}

export const LadderChoiceModal: React.FC<LadderChoiceModalProps> = ({
  isOpen,
  ladder,
  hasLadderBoost,
  onSelectOption,
}) => {
  if (!isOpen || !ladder) return null;

  const effectiveSafeDestination = ladder.safeOption.destinationTile + (hasLadderBoost ? 2 : 0);
  const effectiveExpertDestination = Math.min(100, ladder.expertOption.destinationTile + (hasLadderBoost ? 2 : 0));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080D1A]/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#111827] border border-[#F59E0B]/40 rounded-2xl p-6 shadow-2xl text-[#F8FAFC] overflow-hidden flex flex-col">
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#F59E0B]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[#263449] pb-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/40 flex items-center justify-center text-[#F59E0B] shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider text-[#F59E0B] font-semibold">
                Optimization Ladder &bull; Base Tile {ladder.from}
              </span>
            </div>
            <h2 className="text-xl font-bold text-[#F8FAFC] tracking-tight">{ladder.title}</h2>
          </div>
        </div>

        {/* Boost Banner if active */}
        {hasLadderBoost && (
          <div className="mb-4 p-3 rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#10B981] shrink-0 animate-bounce" />
            <p className="text-xs text-[#F8FAFC]">
              <strong>Optimization Overdrive Active!</strong> You will gain an additional <strong>+2 bonus tiles</strong> on whichever option you choose.
            </p>
          </div>
        )}

        {/* Algorithm Problem Lore */}
        <div className="mb-5 p-3 rounded-xl bg-[#080D1A] border border-[#263449] text-xs">
          <span className="text-[#94A3B8] font-medium">Algorithmic Challenge Context:</span>
          <p className="text-[#F8FAFC] font-medium mt-1">{ladder.originalProblem}</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Safe Ladder */}
          <div
            onClick={() => onSelectOption('safe')}
            className="flex flex-col justify-between p-4 rounded-xl border border-[#10B981]/40 bg-[#172033] hover:border-[#10B981] cursor-pointer transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#10B981] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  Safe Ladder Ascent
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#080D1A] text-[#10B981] border border-[#10B981]/40">
                  Target: {effectiveSafeDestination}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-[#F8FAFC] mb-1.5">{ladder.safeOption.title}</h4>
              <p className="text-xs text-[#94A3B8] mb-3">{ladder.safeOption.description}</p>
            </div>

            <div className="pt-3 border-t border-[#263449]">
              <div className="text-[11px] text-[#10B981] font-medium mb-3">
                {hasLadderBoost
                  ? `Climb to Tile ${effectiveSafeDestination} (+2 Boost applied)`
                  : ladder.safeOption.rewardDescription}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectOption('safe');
                }}
                className="w-full py-2 px-3 rounded-lg bg-[#10B981] hover:bg-[#059669] text-[#F8FAFC] text-xs font-semibold shadow-md transition-all cursor-pointer"
              >
                Choose Safe Ascent
              </button>
            </div>
          </div>

          {/* Expert Ladder */}
          <div
            onClick={() => onSelectOption('expert')}
            className="flex flex-col justify-between p-4 rounded-xl border border-[#F59E0B]/40 bg-[#172033] hover:border-[#F59E0B] cursor-pointer transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#F59E0B] flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#F59E0B]" />
                  Expert Optimization
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#080D1A] text-[#F59E0B] border border-[#F59E0B]/40">
                  Target: {effectiveExpertDestination}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-[#F8FAFC] mb-1.5">{ladder.expertOption.title}</h4>
              <p className="text-xs text-[#94A3B8] mb-3">{ladder.expertOption.description}</p>
            </div>

            <div className="pt-3 border-t border-[#263449]">
              <div className="text-[11px] text-[#22D3EE] font-medium mb-1">
                Reward: Climb to Tile {effectiveExpertDestination} (+{ladder.expertOption.bonusTiles} bonus!)
              </div>
              <div className="text-[11px] text-[#F43F5E] font-medium mb-3">
                Risk: {ladder.expertOption.penaltyDescription}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectOption('expert');
                }}
                className="w-full py-2 px-3 rounded-lg bg-[#F59E0B] hover:bg-[#d97706] text-[#080D1A] text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                Choose Expert Ascent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
