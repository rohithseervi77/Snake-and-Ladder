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
        return 'bg-[var(--color-amber-light)] text-[var(--color-amber)] border-[var(--color-amber-border)]';
      case 'challenge':
        return 'bg-[var(--color-indigo-light)] text-[var(--color-indigo)] border-[var(--color-indigo-border)]';
      case 'knowledge':
      default:
        return 'bg-[var(--color-cyan-light)] text-[var(--color-cyan)] border-[var(--color-cyan-border)]';
    }
  };

  return (
    <div 
      className="w-full max-w-5xl mx-auto bg-[var(--header-bg)] border border-[var(--border-subtle)] rounded-xl px-3 py-1.5 shadow-sm flex items-center justify-between gap-2 overflow-x-auto shrink-0 transition-colors duration-200"
    >
      {/* Left: Turn, Route, Energy & Buffs */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[11px] font-mono text-[var(--text-secondary)] font-semibold hidden sm:inline">
          T{turn}
        </span>

        {/* Route Badge */}
        {onOpenCrossroads ? (
          <button
            onClick={onOpenCrossroads}
            title="Inspect Decision Crossroads"
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border transition shadow-sm ${getRouteBadgeStyle(
              currentRouteType
            )}`}
          >
            <Compass className="w-3 h-3" />
            <span className="capitalize">{currentRouteType}</span>
          </button>
        ) : (
          <span
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border shadow-sm ${getRouteBadgeStyle(
              currentRouteType
            )}`}
          >
            <Compass className="w-3 h-3" />
            <span className="capitalize">{currentRouteType}</span>
          </span>
        )}

        {/* Energy Meter */}
        <div 
          className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[var(--card-secondary-bg)] border border-[var(--color-amber-border)] text-[var(--color-amber)] font-mono text-[11px] font-bold shadow-sm"
          title={`Algorithm Energy: ${energy} of ${MAX_ENERGY}`}
        >
          <Zap className="w-3.5 h-3.5 text-[var(--color-amber)] fill-[var(--color-amber)] animate-pulse" />
          <span>{energy}</span>
          <span className="text-[9px] opacity-80">/ {MAX_ENERGY}</span>
        </div>

        {/* Active Buffs */}
        {hasShield && (
          <span 
            className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[var(--color-indigo-light)] text-[var(--color-indigo)] border border-[var(--color-indigo-border)] shadow-sm"
            title="Invariant Shield absorbs next penalty or snake drop"
          >
            <Shield className="w-2.5 h-2.5" /> Shield
          </span>
        )}
        {hasLadderBoost && (
          <span 
            className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[var(--color-amber-light)] text-[var(--color-amber)] border border-[var(--color-amber-border)] shadow-sm"
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
                  ? 'bg-[var(--card-secondary-bg)] border-[var(--border-subtle)] text-[var(--text-muted)] cursor-not-allowed opacity-50'
                  : 'bg-[var(--card-bg)] border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)] shadow-sm active:scale-95 cursor-pointer'
              }`}
            >
              <Icon className="w-3 h-3 text-[var(--color-amber)] shrink-0" />
              <span className="hidden md:inline">{ability.name.split(' ')[0]}</span>
              <span className="text-[9px] font-mono text-[var(--color-amber)] font-bold">
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
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--color-pink-border)] text-[var(--color-pink)] text-[10px] font-bold transition shrink-0 cursor-pointer shadow-sm active:scale-95"
        >
          <Bot className="w-3 h-3" />
          <span className="hidden sm:inline">Rival Duel</span>
        </button>
      )}
    </div>
  );
};
