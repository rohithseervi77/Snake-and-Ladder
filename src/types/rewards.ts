export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

export interface LevelInfo {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
  progressPercent: number;
  currentLevelXp: number;
  xpNeededForNext: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'challenge' | 'streak' | 'ladder' | 'special';
  unlocked: boolean;
  unlockedAt?: number;
  progress: number;
  maxProgress: number;
}

export type CosmeticType = 'board_theme' | 'dice_skin' | 'player_marker';

export interface CosmeticItem {
  id: string;
  type: CosmeticType;
  name: string;
  description: string;
  cost: number;
  previewBg: string;
  previewAccent: string;
  iconName: string;
}

export interface EquippedCosmetics {
  boardTheme: string;
  diceSkin: string;
  playerMarker: string;
}

export interface MovementNotification {
  id: string;
  type: 'bonus' | 'penalty' | 'recovery' | 'level_up' | 'achievement' | 'snake' | 'ladder';
  title: string;
  subtitle: string;
  tilesDelta?: number;
  timestamp: number;
}

export interface PlayerEconomyState {
  coins: number;
  streak: number;
  longestStreak: number;
  firstAttemptStreak: number;
  recoveryStreak: number;
  consecutiveIncorrect: number;
  unlockedAchievements: string[];
  purchasedCosmetics: string[];
  equippedCosmetics: EquippedCosmetics;
}
