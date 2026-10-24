import React from 'react';
import { Compass, ShieldCheck, Zap, Lock, ArrowRight, X } from 'lucide-react';
import { RouteOption, RouteType } from '../../types/evolution';

interface RouteModalProps {
  isOpen: boolean;
  tile: number;
  routeOptions: RouteOption[];
  currentSelectedRoute: RouteType;
  onSelectRoute: (type: RouteType) => void;
  onClose: () => void;
}

export const RouteModal: React.FC<RouteModalProps> = ({
  isOpen,
  tile,
  routeOptions,
  currentSelectedRoute,
  onSelectRoute,
  onClose,
}) => {
  if (!isOpen) return null;

  const getRouteBadge = (type: RouteType) => {
    switch (type) {
      case 'knowledge':
        return {
          icon: ShieldCheck,
          badgeBg: 'bg-[var(--color-emerald-light)] text-[var(--color-emerald)] border-[var(--color-emerald-border)]',
          borderHover: 'hover:border-[var(--color-emerald)]',
        };
      case 'challenge':
        return {
          icon: Compass,
          badgeBg: 'bg-[var(--color-indigo-light)] text-[var(--color-indigo)] border-[var(--color-indigo-border)]',
          borderHover: 'hover:border-[var(--color-indigo)]',
        };
      case 'risk':
        return {
          icon: Zap,
          badgeBg: 'bg-[var(--color-amber-light)] text-[var(--color-amber)] border-[var(--color-amber-border)]',
          borderHover: 'hover:border-[var(--color-amber)]',
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-2xl text-[var(--text-primary)] overflow-hidden max-h-[90vh] flex flex-col transition-colors duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-indigo-light)] border border-[var(--color-indigo-border)] flex items-center justify-center text-[var(--color-indigo)]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-wider text-[var(--color-indigo)] font-bold">Decision Crossroads</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-mono">
                  Tile {tile}
                </span>
              </div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">Choose Your Algorithmic Path</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg hover:bg-[var(--card-secondary-bg)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-[var(--text-secondary)] mb-6">
          Decision tiles test your strategic foresight. Select the path that best matches your mastery and appetite for risk.
          Unlocked routes depend on demonstrated topic mastery and algorithmic energy.
        </p>

        {/* Route Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto pr-1">
          {routeOptions.map((opt) => {
            const badge = getRouteBadge(opt.type);
            const Icon = badge.icon;
            const isSelected = currentSelectedRoute === opt.type;

            return (
              <div
                key={opt.id}
                className={`relative flex flex-col justify-between rounded-xl border p-5 transition-all duration-200 bg-[var(--card-secondary-bg)] shadow-sm ${
                  opt.isUnlocked
                    ? `${badge.borderHover} cursor-pointer active:scale-98 ${
                        isSelected ? 'ring-2 ring-[var(--color-indigo)] border-[var(--color-indigo)]' : 'border-[var(--border-subtle)]'
                      }`
                    : 'opacity-60 border-[var(--border-subtle)] cursor-not-allowed'
                }`}
                onClick={() => {
                  if (opt.isUnlocked) {
                    onSelectRoute(opt.type);
                  }
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badge.badgeBg}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {opt.title}
                    </span>
                    {!opt.isUnlocked && (
                      <span className="inline-flex items-center gap-1 text-xs text-[var(--color-rose)] bg-[var(--color-rose-light)] px-2 py-0.5 rounded-full border border-[var(--color-rose-border)]">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">{opt.description}</p>

                  <div className="space-y-2 text-xs border-t border-[var(--border-subtle)] pt-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--text-muted)]">Difficulty:</span>
                      <span className="font-semibold text-[var(--text-primary)] uppercase text-[10px] tracking-wide">
                        {opt.difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--text-muted)]">Reward:</span>
                      <span className="text-[var(--color-emerald)] font-medium">{opt.movementReward}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--text-muted)]">Risk / Penalty:</span>
                      <span className="text-[var(--color-rose)] font-medium">{opt.possiblePenalty}</span>
                    </div>
                  </div>
                </div>

                <div>
                  {!opt.isUnlocked && opt.lockedReason && (
                    <div className="mb-3 p-2 rounded-lg bg-[var(--color-rose-light)] border border-[var(--color-rose-border)] text-[11px] text-[var(--color-rose)]">
                      <strong>Requirements:</strong> {opt.lockedReason}
                    </div>
                  )}

                  <button
                    disabled={!opt.isUnlocked}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (opt.isUnlocked) {
                        onSelectRoute(opt.type);
                        onClose();
                      }
                    }}
                    className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                      opt.isUnlocked
                        ? isSelected
                          ? 'bg-[var(--color-indigo)] hover:bg-[var(--color-indigo-hover)] text-white shadow-md'
                          : 'bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] text-[var(--text-primary)] border border-[var(--border-subtle)]'
                        : 'bg-[var(--card-bg)] text-[var(--text-muted)] border border-[var(--border-subtle)] cursor-not-allowed'
                    }`}
                  >
                    {opt.isUnlocked ? (
                      isSelected ? (
                        'Active Route'
                      ) : (
                        <>
                          Select Route <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )
                    ) : (
                      'Locked'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
