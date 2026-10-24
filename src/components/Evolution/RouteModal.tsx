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
          badgeBg: 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40',
          borderHover: 'hover:border-[#10B981]',
        };
      case 'challenge':
        return {
          icon: Compass,
          badgeBg: 'bg-[#2563EB]/20 text-[#22D3EE] border-[#2563EB]/40',
          borderHover: 'hover:border-[#2563EB]',
        };
      case 'risk':
        return {
          icon: Zap,
          badgeBg: 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/40',
          borderHover: 'hover:border-[#F59E0B]',
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080D1A]/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#111827] border border-[#263449] rounded-2xl p-6 shadow-2xl text-[#F8FAFC] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#263449] pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2563EB]/20 border border-[#2563EB]/40 flex items-center justify-center text-[#22D3EE]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-wider text-[#22D3EE]">Decision Crossroads</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#080D1A] border border-[#263449] text-[#94A3B8] font-mono">
                  Tile {tile}
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#F8FAFC] tracking-tight">Choose Your Algorithmic Path</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#94A3B8] hover:text-[#F8FAFC] rounded-lg hover:bg-[#172033] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-[#94A3B8] mb-6">
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
                className={`relative flex flex-col justify-between rounded-xl border p-5 transition-all duration-200 bg-[#172033] ${
                  opt.isUnlocked
                    ? `${badge.borderHover} cursor-pointer ${
                        isSelected ? 'ring-2 ring-[#2563EB] border-[#2563EB]' : 'border-[#263449]'
                      }`
                    : 'opacity-60 border-[#263449] cursor-not-allowed'
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
                      <span className="inline-flex items-center gap-1 text-xs text-[#F43F5E] bg-[#F43F5E]/10 px-2 py-0.5 rounded-full border border-[#F43F5E]/20">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">{opt.description}</p>

                  <div className="space-y-2 text-xs border-t border-[#263449] pt-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#64748B]">Difficulty:</span>
                      <span className="font-semibold text-[#F8FAFC] uppercase text-[10px] tracking-wide">
                        {opt.difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#64748B]">Reward:</span>
                      <span className="text-[#10B981] font-medium">{opt.movementReward}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#64748B]">Risk / Penalty:</span>
                      <span className="text-[#F43F5E] font-medium">{opt.possiblePenalty}</span>
                    </div>
                  </div>
                </div>

                <div>
                  {!opt.isUnlocked && opt.lockedReason && (
                    <div className="mb-3 p-2 rounded-lg bg-[#F43F5E]/10 border border-[#F43F5E]/30 text-[11px] text-[#F43F5E]">
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
                          ? 'bg-[#2563EB] hover:bg-[#1d4ed8] text-[#F8FAFC] shadow-lg shadow-[#2563EB]/25'
                          : 'bg-[#080D1A] hover:bg-[#111827] text-[#F8FAFC] border border-[#263449]'
                        : 'bg-[#080D1A] text-[#64748B] border border-[#263449] cursor-not-allowed'
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
