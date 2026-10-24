import React from 'react';
import { 
  Code2, 
  Settings, 
  Volume2, 
  VolumeX, 
  BrainCircuit, 
  RotateCcw,
  Sparkles,
  ShoppingBag,
  Trophy,
  Flame,
  Coins,
  Award,
  Bot
} from 'lucide-react';
import { LearnerProfile } from '../types/learner';
import { GameSettings } from '../types/game';
import { calculateLevelInfo } from '../engine/economyEngine';

interface HeaderProps {
  totalXp: number;
  coinBalance: number;
  streak: number;
  learnerProfile: LearnerProfile;
  settings: GameSettings;
  onToggleSound: () => void;
  onOpenSettings: () => void;
  onOpenAdaptive: () => void;
  onOpenRevision: () => void;
  onOpenReset: () => void;
  onOpenShop: () => void;
  onOpenAchievements: () => void;
  onOpenMasteryMatrix?: () => void;
  onOpenBugBotDuel?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalXp,
  coinBalance,
  streak,
  learnerProfile,
  settings,
  onToggleSound,
  onOpenSettings,
  onOpenAdaptive,
  onOpenRevision,
  onOpenReset,
  onOpenShop,
  onOpenAchievements,
  onOpenMasteryMatrix,
  onOpenBugBotDuel
}) => {
  const dueRevisionCount = learnerProfile.revisionQueue.filter(r => r.isDue).length;
  const levelInfo = calculateLevelInfo(totalXp);

  return (
    <header className="w-full bg-[#0d1527] border-b border-[#1e293b] px-3 sm:px-4 py-1 sm:py-1.5 flex flex-wrap items-center justify-between gap-2.5 text-slate-200 sticky top-0 z-40 backdrop-blur-md shrink-0">
      {/* Left: Brand & Tagline */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 shadow-sm shadow-blue-500/20 text-white font-bold">
          <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-sm sm:text-base font-black tracking-tight text-white m-0">Code & Ladders</h1>
            <span className="hidden sm:inline-block px-1.5 py-0.2 text-[8.5px] uppercase font-bold tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md">
              DSA Adventure
            </span>
          </div>
          <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium m-0 hidden md:block">
            Learn Data Structures &bull; Roll &bull; Solve &bull; Level Up
          </p>
        </div>
      </div>

      {/* Center: Progression, Coins, Streak */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        {/* Streak Counter */}
        <div 
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-orange-950/40 border border-orange-600/40 text-orange-400 font-bold text-xs"
          title={`Current Streak: ${streak} correct in a row`}
        >
          <Flame className="w-4 h-4 fill-orange-400 text-orange-400 animate-pulse" />
          <span className="font-mono">{streak}</span>
          <span className="hidden md:inline text-[10px] uppercase font-semibold text-orange-300/80">Streak</span>
        </div>

        {/* Coin Balance */}
        <button
          onClick={onOpenShop}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 border border-amber-600/40 text-amber-300 font-bold text-xs transition cursor-pointer"
          title="Open Cosmetic Shop"
        >
          <Coins className="w-4 h-4 text-amber-400 fill-amber-400/20" />
          <span className="font-mono">{coinBalance}</span>
          <span className="hidden md:inline text-[10px] uppercase font-semibold text-amber-300/80">Coins</span>
        </button>

        {/* Player Level Badge */}
        <div className="flex items-center gap-2 px-3 py-1 bg-[#141e33] border border-[#24324f] rounded-xl">
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-slate-200">
                Lvl {levelInfo.level} &bull; <span className="text-blue-400">{levelInfo.title}</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {totalXp} XP
              </span>
            </div>
            <div className="w-24 sm:w-28 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-0.5">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(5, levelInfo.progressPercent))}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right: Quick Action Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Topic Mastery Matrix Button */}
        {onOpenMasteryMatrix && (
          <button
            onClick={onOpenMasteryMatrix}
            title="Cognitive Mastery Matrix (11 Topics)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-700/50 text-indigo-300 text-xs font-semibold transition cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Mastery</span>
          </button>
        )}

        {/* BugBot Duel Button */}
        {onOpenBugBotDuel && (
          <button
            onClick={onOpenBugBotDuel}
            title="Duel Rival BugBot"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-700/50 text-cyan-300 text-xs font-semibold transition cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Rival Duel</span>
          </button>
        )}

        {/* Shop Button */}
        <button
          onClick={onOpenShop}
          title="Cosmetics Shop"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-950/40 hover:bg-amber-900/60 border border-amber-700/50 text-amber-300 text-xs font-semibold transition cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Shop</span>
        </button>

        {/* Achievements Button */}
        <button
          onClick={onOpenAchievements}
          title="DSA Achievements"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-yellow-950/40 hover:bg-yellow-900/60 border border-yellow-700/50 text-yellow-300 text-xs font-semibold transition cursor-pointer"
        >
          <Trophy className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Badges</span>
        </button>

        {/* Spaced Revision Pill */}
        <button
          onClick={onOpenRevision}
          title="Spaced Repetition Review Queue"
          className="relative flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/50 text-emerald-300 text-xs font-medium transition cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden lg:inline">Review</span>
          {dueRevisionCount > 0 && (
            <span className="px-1 py-0.2 bg-emerald-500 text-black text-[9px] font-black rounded-full">
              {dueRevisionCount}
            </span>
          )}
        </button>

        {/* Audio Toggle */}
        <button
          onClick={onToggleSound}
          title={settings.soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
          className="p-1.5 rounded-lg bg-[#141e33] hover:bg-[#1e2d4d] border border-[#24324f] text-slate-300 hover:text-white transition cursor-pointer"
        >
          {settings.soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-blue-400" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-slate-500" />
          )}
        </button>

        {/* Settings Dialog */}
        <button
          onClick={onOpenSettings}
          title="Game Settings"
          className="p-1.5 rounded-lg bg-[#141e33] hover:bg-[#1e2d4d] border border-[#24324f] text-slate-300 hover:text-white transition cursor-pointer"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>

        {/* Reset Game */}
        <button
          onClick={onOpenReset}
          title="Reset Game Progress"
          className="p-1.5 rounded-lg bg-[#141e33] hover:bg-rose-950/50 hover:border-rose-800/50 border border-[#24324f] text-slate-400 hover:text-rose-400 transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
