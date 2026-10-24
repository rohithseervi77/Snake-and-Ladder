import { CosmeticItem } from '../types/rewards';

export const SHOP_ITEMS: CosmeticItem[] = [
  // Board Themes
  {
    id: 'theme-obsidian-navy',
    type: 'board_theme',
    name: 'Obsidian Navy',
    description: 'The classic refined deep-space developer dashboard.',
    cost: 0,
    previewBg: '#090f1d',
    previewAccent: '#3b82f6',
    iconName: 'LayoutGrid'
  },
  {
    id: 'theme-cyberpunk-indigo',
    type: 'board_theme',
    name: 'Cyberpunk Indigo',
    description: 'Electric neon indigo grid inspired by cyberpunk code editors.',
    cost: 100,
    previewBg: '#130c27',
    previewAccent: '#8b5cf6',
    iconName: 'Sparkles'
  },
  {
    id: 'theme-emerald-matrix',
    type: 'board_theme',
    name: 'Emerald Matrix',
    description: 'Clean terminal aesthetic with digital emerald gradients.',
    cost: 160,
    previewBg: '#061a14',
    previewAccent: '#10b981',
    iconName: 'Terminal'
  },
  {
    id: 'theme-solar-amber',
    type: 'board_theme',
    name: 'Solar Amber',
    description: 'Warm obsidian and incandescent gold for grandmaster strategists.',
    cost: 240,
    previewBg: '#1c1206',
    previewAccent: '#f59e0b',
    iconName: 'Sun'
  },

  // Dice Skins
  {
    id: 'dice-classic-ivory',
    type: 'dice_skin',
    name: 'Classic Ivory',
    description: 'Smooth white polished die with deep charcoal pips.',
    cost: 0,
    previewBg: '#ffffff',
    previewAccent: '#0f172a',
    iconName: 'Dices'
  },
  {
    id: 'dice-ruby-prism',
    type: 'dice_skin',
    name: 'Ruby Prism',
    description: 'Vibrant crimson die with luminous white pips.',
    cost: 80,
    previewBg: '#e11d48',
    previewAccent: '#ffffff',
    iconName: 'Flame'
  },
  {
    id: 'dice-emerald-cyber',
    type: 'dice_skin',
    name: 'Emerald Cyber',
    description: 'Digital matrix cube with fluorescent green energy pips.',
    cost: 130,
    previewBg: '#065f46',
    previewAccent: '#34d399',
    iconName: 'Cpu'
  },
  {
    id: 'dice-gold-royale',
    type: 'dice_skin',
    name: 'Gold Royale',
    description: 'Solid 24-karat gold finish reserved for DSA champions.',
    cost: 200,
    previewBg: '#d97706',
    previewAccent: '#fef3c7',
    iconName: 'Crown'
  },

  // Player Markers
  {
    id: 'marker-ninja-coder',
    type: 'player_marker',
    name: 'Ninja Developer',
    description: 'Agile problem solver navigating edge cases with precision.',
    cost: 0,
    previewBg: '#10b981',
    previewAccent: '#ffffff',
    iconName: 'UserCheck'
  },
  {
    id: 'marker-cyber-glider',
    type: 'player_marker',
    name: 'Cyber Glider',
    description: 'Futuristic high-velocity algorithmic drone.',
    cost: 90,
    previewBg: '#3b82f6',
    previewAccent: '#60a5fa',
    iconName: 'Navigation'
  },
  {
    id: 'marker-terminal-bot',
    type: 'player_marker',
    name: 'Terminal Bot',
    description: 'Autonomous AI companion optimized for zero runtime errors.',
    cost: 150,
    previewBg: '#a855f7',
    previewAccent: '#c084fc',
    iconName: 'Bot'
  },
  {
    id: 'marker-grandmaster-crown',
    type: 'player_marker',
    name: 'Grandmaster Crown',
    description: 'Emblem of mastery over dynamic programming and graph theory.',
    cost: 250,
    previewBg: '#f59e0b',
    previewAccent: '#fbbf24',
    iconName: 'Crown'
  }
];
