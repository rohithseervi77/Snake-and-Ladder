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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 shadow-2xl text-slate-100 overflow-hidden flex flex-col">
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-semibold">
                Optimization Ladder &bull; Base Tile {ladder.from}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">{ladder.title}</h2>
          </div>
        </div>

        {/* Boost Banner if active */}
        {hasLadderBoost && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 animate-bounce" />
            <p className="text-xs text-emerald-200">
              <strong>Optimization Overdrive Active!</strong> You will gain an additional <strong>+2 bonus tiles</strong> on whichever option you choose.
            </p>
          </div>
        )}

        {/* Algorithm Problem Lore */}
        <div className="mb-5 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
          <span className="text-slate-400 font-medium">Algorithmic Challenge Context:</span>
          <p className="text-slate-200 font-medium mt-1">{ladder.originalProblem}</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Safe Ladder */}
          <div
            onClick={() => onSelectOption('safe')}
            className="flex flex-col justify-between p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 hover:border-emerald-500/70 hover:bg-emerald-950/30 cursor-pointer transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Safe Ladder Ascent
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-900/40 text-emerald-300 border border-emerald-700/50">
                  Target: {effectiveSafeDestination}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1.5">{ladder.safeOption.title}</h4>
              <p className="text-xs text-slate-300 mb-3">{ladder.safeOption.description}</p>
            </div>

            <div className="pt-3 border-t border-emerald-900/40">
              <div className="text-[11px] text-emerald-400 font-medium mb-3">
                {hasLadderBoost
                  ? `Climb to Tile ${effectiveSafeDestination} (+2 Boost applied)`
                  : ladder.safeOption.rewardDescription}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectOption('safe');
                }}
                className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all"
              >
                Choose Safe Ascent
              </button>
            </div>
          </div>

          {/* Expert Ladder */}
          <div
            onClick={() => onSelectOption('expert')}
            className="flex flex-col justify-between p-4 rounded-xl border border-indigo-500/30 bg-indigo-950/20 hover:border-indigo-500/70 hover:bg-indigo-950/30 cursor-pointer transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Expert Optimization
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-900/40 text-indigo-300 border border-indigo-700/50">
                  Target: {effectiveExpertDestination}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1.5">{ladder.expertOption.title}</h4>
              <p className="text-xs text-slate-300 mb-3">{ladder.expertOption.description}</p>
            </div>

            <div className="pt-3 border-t border-indigo-900/40">
              <div className="text-[11px] text-indigo-300 font-medium mb-1">
                Reward: Climb to Tile {effectiveExpertDestination} (+{ladder.expertOption.bonusTiles} bonus!)
              </div>
              <div className="text-[11px] text-rose-400 font-medium mb-3">
                Risk: {ladder.expertOption.penaltyDescription}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectOption('expert');
                }}
                className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all"
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
