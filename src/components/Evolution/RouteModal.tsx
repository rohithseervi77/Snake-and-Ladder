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
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          borderHover: 'hover:border-emerald-500/60',
          gradient: 'from-emerald-950/40 via-slate-900/90 to-slate-950/90',
        };
      case 'challenge':
        return {
          icon: Compass,
          badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
          borderHover: 'hover:border-indigo-500/60',
          gradient: 'from-indigo-950/40 via-slate-900/90 to-slate-950/90',
        };
      case 'risk':
        return {
          icon: Zap,
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          borderHover: 'hover:border-amber-500/60',
          gradient: 'from-amber-950/40 via-slate-900/90 to-slate-950/90',
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900/95 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl text-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Background glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-wider text-indigo-400">Decision Crossroads</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono">
                  Tile {tile}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">Choose Your Algorithmic Path</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-300 mb-6">
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
                className={`relative flex flex-col justify-between rounded-xl border p-5 transition-all duration-200 bg-gradient-to-b ${badge.gradient} ${
                  opt.isUnlocked
                    ? `${badge.borderHover} cursor-pointer ${
                        isSelected ? 'ring-2 ring-indigo-400 border-indigo-400' : 'border-slate-800'
                      }`
                    : 'opacity-60 border-slate-800/80 cursor-not-allowed'
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
                      <span className="inline-flex items-center gap-1 text-xs text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{opt.description}</p>

                  <div className="space-y-2 text-xs border-t border-slate-800/80 pt-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Difficulty:</span>
                      <span className="font-semibold text-slate-200 uppercase text-[10px] tracking-wide">
                        {opt.difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Reward:</span>
                      <span className="text-emerald-400 font-medium">{opt.movementReward}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Risk / Penalty:</span>
                      <span className="text-rose-400 font-medium">{opt.possiblePenalty}</span>
                    </div>
                  </div>
                </div>

                <div>
                  {!opt.isUnlocked && opt.lockedReason && (
                    <div className="mb-3 p-2 rounded-lg bg-rose-950/40 border border-rose-800/40 text-[11px] text-rose-300">
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
                    className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                      opt.isUnlocked
                        ? isSelected
                          ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        : 'bg-slate-800/50 text-slate-500 border border-slate-800 cursor-not-allowed'
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
