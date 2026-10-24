import React from 'react';
import { 
  Zap, 
  Shield, 
  HelpCircle, 
  RotateCcw, 
  Crosshair, 
  ArrowUpRight, 
  Sparkles,
  Compass,
  Bot
} from 'lucide-react';
import { EnergyAbility, RouteType } from '../../types/evolution';
import { ENERGY_ABILITIES, MAX_ENERGY } from '../../engine/energyEngine';

interface EnergyActionBarProps {
  energy: number;
  hasShield: boolean;
  hasLadderBoost: boolean;
  canReroll: boolean;
  turn?: number;
  currentRouteType?: RouteType;
  onOpenCrossroads?: () => void;
  onOpenBugBot?: () => void;
  onUseAbility: (abilityId: EnergyAbility['id']) => void;
}

export const EnergyActionBar: React.FC<EnergyActionBarProps> = ({
  energy,
  hasShield,
  hasLadderBoost,
  canReroll,
  turn = 1,
  currentRouteType = 'knowledge',
  onOpenCrossroads,
  onOpenBugBot,
  onUseAbility,
}) => {
  const getIcon = (id: EnergyAbility['id']) => {
    switch (id) {
      case 'hint':
        return HelpCircle;
      case 'shield':
        return Shield;
      case 'debug_scan':
        return Crosshair;
      case 'reroll':
        return RotateCcw;
      case 'second_chance':
        return Sparkles;
      case 'ladder_boost':
        return ArrowUpRight;
    }
  };

  const getRouteBadgeStyle = (type: RouteType) => {
    switch (type) {
      case 'risk':
        return 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/40';
      case 'challenge':
        return 'bg-[#2563EB]/15 text-[#22D3EE] border-[#2563EB]/40';
      case 'knowledge':
      default:
        return 'bg-[#22D3EE]/15 text-[#22D3EE] border-[#22D3EE]/40';
    }
  };

  return (
    <div 
      className="w-full max-w-5xl mx-auto bg-[#111827] border border-[#263449] rounded-xl px-3 py-1.5 shadow-md flex items-center justify-between gap-2 overflow-x-auto shrink-0"
    >
      {/* Left: Turn, Route, Energy & Buffs */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[11px] font-mono text-[#94A3B8] font-semibold hidden sm:inline">
          T{turn}
        </span>

        {/* Route Badge */}
        {onOpenCrossroads ? (
          <button
            onClick={onOpenCrossroads}
            title="Inspect Decision Crossroads"
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border transition ${getRouteBadgeStyle(
              currentRouteType
            )}`}
          >
            <Compass className="w-3 h-3" />
            <span className="capitalize">{currentRouteType}</span>
          </button>
        ) : (
          <span
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${getRouteBadgeStyle(
              currentRouteType
            )}`}
          >
            <Compass className="w-3 h-3" />
            <span className="capitalize">{currentRouteType}</span>
          </span>
        )}

        {/* Energy Meter */}
        <div 
          className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#080D1A] border border-[#F59E0B]/40 text-[#F59E0B] font-mono text-[11px] font-bold"
          title={`Algorithm Energy: ${energy} of ${MAX_ENERGY}`}
        >
          <Zap className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B] animate-pulse" />
          <span>{energy}</span>
          <span className="text-[9px] text-[#F59E0B]/80">/ {MAX_ENERGY}</span>
        </div>

        {/* Active Buffs */}
        {hasShield && (
          <span 
            className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#2563EB]/15 text-[#22D3EE] border border-[#2563EB]/50"
            title="Invariant Shield absorbs next penalty or snake drop"
          >
            <Shield className="w-2.5 h-2.5" /> Shield
          </span>
        )}
        {hasLadderBoost && (
          <span 
            className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/50"
            title="Optimization Overdrive grants +2 bonus tiles on next ladder"
          >
            <Sparkles className="w-2.5 h-2.5" /> +2 Boost
          </span>
        )}
      </div>

      {/* Center: Tactical Abilities */}
      <div className="flex items-center gap-1 overflow-x-auto py-0.2 shrink-0">
        {ENERGY_ABILITIES.map((ability) => {
          const Icon = getIcon(ability.id);
          const isAffordable = energy >= ability.cost;
          const isAlreadyBuffed =
            (ability.id === 'shield' && hasShield) ||
            (ability.id === 'ladder_boost' && hasLadderBoost);
          const isDisabled = !isAffordable || isAlreadyBuffed || (ability.id === 'reroll' && !canReroll);

          return (
            <button
              key={ability.id}
              disabled={isDisabled}
              onClick={() => onUseAbility(ability.id)}
              title={`${ability.name} (${ability.cost} ⚡): ${ability.description}`}
              className={`px-1.5 sm:px-2 py-1 rounded-md text-[10.5px] font-medium flex items-center gap-1 transition-all border shrink-0 ${
                isDisabled
                  ? 'bg-[#080D1A] border-[#263449]/50 text-[#64748B] cursor-not-allowed opacity-50'
                  : 'bg-[#172033] border-[#263449] text-[#F8FAFC] hover:border-[#22D3EE]/60 hover:text-[#22D3EE] shadow-sm'
              }`}
            >
              <Icon className="w-3 h-3 text-[#F59E0B] shrink-0" />
              <span className="hidden md:inline">{ability.name.split(' ')[0]}</span>
              <span className="text-[9px] font-mono text-[#F59E0B] font-bold">
                {ability.cost}⚡
              </span>
            </button>
          );
        })}
      </div>

      {/* Right: Rival Duel Action */}
      {onOpenBugBot && (
        <button
          onClick={onOpenBugBot}
          title="Duel BugBot Rival"
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#172033] hover:bg-[#1E293B] border border-[#22D3EE]/50 text-[#22D3EE] text-[10px] font-bold transition shrink-0 cursor-pointer"
        >
          <Bot className="w-3 h-3" />
          <span className="hidden sm:inline">Rival Duel</span>
        </button>
      )}
    </div>
  );
};
