import React from 'react';
import { Zap, Shield, HelpCircle, RotateCcw, Crosshair, ArrowUpRight, Sparkles } from 'lucide-react';
import { EnergyAbility } from '../../types/evolution';
import { ENERGY_ABILITIES, MAX_ENERGY } from '../../engine/energyEngine';

interface EnergyActionBarProps {
  energy: number;
  hasShield: boolean;
  hasLadderBoost: boolean;
  canReroll: boolean;
  onUseAbility: (abilityId: EnergyAbility['id']) => void;
}

export const EnergyActionBar: React.FC<EnergyActionBarProps> = ({
  energy,
  hasShield,
  hasLadderBoost,
  canReroll,
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

  return (
    <div className="bg-slate-900/95 border border-slate-800 rounded-xl p-3 shadow-lg flex flex-wrap items-center justify-between gap-3">
      {/* Energy Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono">
          <Zap className="w-4 h-4 text-amber-400 animate-pulse fill-amber-400" />
          <span className="text-xs font-bold">
            {energy} / {MAX_ENERGY}
          </span>
          <span className="text-[10px] text-amber-400/80 uppercase">Energy</span>
        </div>

        {/* Active Buff Badges */}
        <div className="flex items-center gap-1.5">
          {hasShield && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 animate-pulse">
              <Shield className="w-3 h-3" /> Shield Active
            </span>
          )}
          {hasLadderBoost && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
              <Sparkles className="w-3 h-3" /> Boost Active (+2)
            </span>
          )}
        </div>
      </div>

      {/* Ability Action Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
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
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all border shrink-0 ${
                isDisabled
                  ? 'bg-slate-800/40 border-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                  : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:bg-indigo-950/60 hover:border-indigo-500/50 hover:text-white shadow-sm'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-amber-400" />
              <span>{ability.name}</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-slate-900 border border-slate-700/60 text-amber-300">
                {ability.cost}⚡
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
