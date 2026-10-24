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
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'challenge':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
      case 'knowledge':
      default:
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
  };

  return (
    <div 
      className="w-full max-w-5xl mx-auto bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5 shadow-md flex items-center justify-between gap-2 overflow-x-auto shrink-0"
    >
      {/* Left: Turn, Route, Energy & Buffs */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[11px] font-mono text-slate-400 font-semibold hidden sm:inline">
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
          className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[11px] font-bold"
          title={`Algorithm Energy: ${energy} of ${MAX_ENERGY}`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
          <span>{energy}</span>
          <span className="text-[9px] text-amber-400/80">/ {MAX_ENERGY}</span>
        </div>

        {/* Active Buffs */}
        {hasShield && (
          <span 
            className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 animate-pulse"
            title="Invariant Shield absorbs next penalty or snake drop"
          >
            <Shield className="w-2.5 h-2.5" /> Shield
          </span>
        )}
        {hasLadderBoost && (
          <span 
            className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse"
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
                  ? 'bg-slate-800/40 border-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                  : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:bg-indigo-950 hover:border-indigo-500/50 hover:text-white shadow-sm'
              }`}
            >
              <Icon className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="hidden md:inline">{ability.name.split(' ')[0]}</span>
              <span className="text-[9px] font-mono text-amber-300/90 font-bold">
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
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-cyan-950/50 hover:bg-cyan-900/70 border border-cyan-700/50 text-cyan-300 text-[10px] font-bold transition shrink-0"
        >
          <Bot className="w-3 h-3" />
          <span className="hidden sm:inline">Rival Duel</span>
        </button>
      )}
    </div>
  );
};
