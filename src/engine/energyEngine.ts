import { EnergyAbility } from '../types/evolution';

export const MAX_ENERGY = 15;
export const STARTING_ENERGY = 5;

export const ENERGY_ABILITIES: EnergyAbility[] = [
  {
    id: 'hint',
    name: 'Algorithmic Hint',
    description: 'Reveals a guided hint without incurring any score or coin penalties.',
    cost: 2,
    iconName: 'Lightbulb',
    isUnlocked: true,
  },
  {
    id: 'shield',
    name: 'Invariant Shield',
    description: 'Absorbs the next backward slide from an incorrect answer or snake trap.',
    cost: 3,
    iconName: 'Shield',
    isUnlocked: true,
  },
  {
    id: 'debug_scan',
    name: 'Debug Scan',
    description: 'Eliminates 1 incorrect distractor option from current challenge choices.',
    cost: 3,
    iconName: 'Scan',
    isUnlocked: true,
  },
  {
    id: 'reroll',
    name: 'Quantum Reroll',
    description: 'Re-rolls the dice to explore an alternative route when hazards lurk ahead.',
    cost: 4,
    iconName: 'Dices',
    isUnlocked: true,
  },
  {
    id: 'second_chance',
    name: 'Second Chance',
    description: 'Gives one free instant retry on challenge error before penalty takes effect.',
    cost: 4,
    iconName: 'RotateCcw',
    isUnlocked: true,
  },
  {
    id: 'ladder_boost',
    name: 'Optimization Overdrive',
    description: 'Supercharges the next ladder climbed with +2 additional bonus tiles.',
    cost: 5,
    iconName: 'Zap',
    isUnlocked: true,
  },
];

/**
 * Adds energy with boundary clamp [0, MAX_ENERGY].
 */
export function addEnergy(currentEnergy: number, amount: number): number {
  return Math.min(MAX_ENERGY, Math.max(0, currentEnergy + amount));
}

/**
 * Checks if the player has enough energy for an ability.
 */
export function canAffordAbility(currentEnergy: number, abilityId: EnergyAbility['id']): boolean {
  const ability = ENERGY_ABILITIES.find(a => a.id === abilityId);
  if (!ability) return false;
  return currentEnergy >= ability.cost;
}

/**
 * Consumes energy if affordable, returning the new energy balance.
 * Returns null if unaffordable.
 */
export function consumeEnergy(currentEnergy: number, abilityId: EnergyAbility['id']): number | null {
  const ability = ENERGY_ABILITIES.find(a => a.id === abilityId);
  if (!ability || currentEnergy < ability.cost) {
    return null;
  }
  return currentEnergy - ability.cost;
}
