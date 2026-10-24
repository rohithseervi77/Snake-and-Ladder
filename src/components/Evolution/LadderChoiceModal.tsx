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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[var(--modal-bg)] border border-[var(--color-amber-border)] rounded-2xl p-6 shadow-2xl text-[var(--text-primary)] overflow-hidden flex flex-col transition-colors duration-200">
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[var(--color-amber)]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--color-amber-light)] border border-[var(--color-amber-border)] flex items-center justify-center text-[var(--color-amber)] shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider text-[var(--color-amber)] font-semibold">
                Optimization Ladder &bull; Base Tile {ladder.from}
              </span>
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">{ladder.title}</h2>
          </div>
        </div>

        {/* Boost Banner if active */}
        {hasLadderBoost && (
          <div className="mb-4 p-3 rounded-xl bg-[var(--color-emerald-light)] border border-[var(--color-emerald-border)] flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[var(--color-emerald)] shrink-0 animate-bounce" />
            <p className="text-xs text-[var(--text-primary)]">
              <strong>Optimization Overdrive Active!</strong> You will gain an additional <strong>+2 bonus tiles</strong> on whichever option you choose.
            </p>
          </div>
        )}

        {/* Algorithm Problem Lore */}
        <div className="mb-5 p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-xs">
          <span className="text-[var(--text-secondary)] font-medium">Algorithmic Challenge Context:</span>
          <p className="text-[var(--text-primary)] font-medium mt-1">{ladder.originalProblem}</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Safe Ladder */}
          <div
            onClick={() => onSelectOption('safe')}
            className="flex flex-col justify-between p-4 rounded-xl border border-[var(--color-emerald-border)] bg-[var(--card-secondary-bg)] hover:border-[var(--color-emerald)] cursor-pointer transition-all shadow-sm active:scale-98"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[var(--color-emerald)] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[var(--color-emerald)]" />
                  Safe Ladder Ascent
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--card-bg)] text-[var(--color-emerald)] border border-[var(--color-emerald-border)]">
                  Target: {effectiveSafeDestination}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1.5">{ladder.safeOption.title}</h4>
              <p className="text-xs text-[var(--text-secondary)] mb-3">{ladder.safeOption.description}</p>
            </div>

            <div className="pt-3 border-t border-[var(--border-subtle)]">
              <div className="text-[11px] text-[var(--color-emerald)] font-medium mb-3">
                {hasLadderBoost
                  ? `Climb to Tile ${effectiveSafeDestination} (+2 Boost applied)`
                  : ladder.safeOption.rewardDescription}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectOption('safe');
                }}
                className="w-full py-2 px-3 rounded-lg bg-[var(--color-emerald)] hover:opacity-90 text-white text-xs font-semibold shadow-md transition-all cursor-pointer active:scale-95"
              >
                Choose Safe Ascent
              </button>
            </div>
          </div>

          {/* Expert Ladder */}
          <div
            onClick={() => onSelectOption('expert')}
            className="flex flex-col justify-between p-4 rounded-xl border border-[var(--color-amber-border)] bg-[var(--card-secondary-bg)] hover:border-[var(--color-amber)] cursor-pointer transition-all shadow-sm active:scale-98"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[var(--color-amber)] flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[var(--color-amber)]" />
                  Expert Optimization
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--card-bg)] text-[var(--color-amber)] border border-[var(--color-amber-border)]">
                  Target: {effectiveExpertDestination}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1.5">{ladder.expertOption.title}</h4>
              <p className="text-xs text-[var(--text-secondary)] mb-3">{ladder.expertOption.description}</p>
            </div>

            <div className="pt-3 border-t border-[var(--border-subtle)]">
              <div className="text-[11px] text-[var(--color-indigo)] font-medium mb-1">
                Reward: Climb to Tile {effectiveExpertDestination} (+{ladder.expertOption.bonusTiles} bonus!)
              </div>
              <div className="text-[11px] text-[var(--color-rose)] font-medium mb-3">
                Risk: {ladder.expertOption.penaltyDescription}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectOption('expert');
                }}
                className="w-full py-2 px-3 rounded-lg bg-[var(--color-amber)] hover:opacity-90 text-white text-xs font-bold shadow-md transition-all cursor-pointer active:scale-95"
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
