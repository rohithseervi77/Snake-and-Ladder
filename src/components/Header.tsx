import React from 'react';
import { 
  Code2, 
  Settings, 
  Volume2, 
  VolumeX, 
  User, 
  BrainCircuit, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { LearnerProfile } from '../types/learner';
import { GameSettings } from '../types/game';

interface HeaderProps {
  currentPosition: number;
  learnerProfile: LearnerProfile;
  settings: GameSettings;
  onToggleSound: () => void;
  onOpenSettings: () => void;
  onOpenAdaptive: () => void;
  onOpenRevision: () => void;
  onOpenReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPosition,
  learnerProfile,
  settings,
  onToggleSound,
  onOpenSettings,
  onOpenAdaptive,
  onOpenRevision,
  onOpenReset
}) => {
  const dueRevisionCount = learnerProfile.revisionQueue.filter(r => r.isDue).length;
  const levelProgress = ((learnerProfile.totalXp % 150) / 150) * 100;

  return (
    <header className="w-full bg-[#0d1527] border-b border-[#1e293b] px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-slate-200">
      {/* Left: Brand & Tagline */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-md shadow-blue-500/20 text-white font-bold">
          <Code2 className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black tracking-tight text-white m-0">Code & Ladders</h1>
            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md">
              DSA Quest
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium m-0">
            DSA Learning &bull; One Square at a Time
          </p>
        </div>
      </div>

      {/* Center: Slogan */}
      <div className="hidden lg:flex flex-col items-center">
        <span className="text-sm font-semibold tracking-wide text-slate-300">
          Roll &bull; Learn &bull; Solve &bull; Level Up
        </span>
        <span className="text-xs text-slate-500">
          From Arrays to Advanced DP &mdash; 100 Squares, 1 Journey.
        </span>
      </div>

      {/* Right: User Profile & Quick Actions */}
      <div className="flex items-center gap-3">
        {/* Adaptive Intelligence Pill */}
        <button
          onClick={onOpenAdaptive}
          title="Open Adaptive DSA Intelligence"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-700/50 text-indigo-300 text-xs font-medium transition cursor-pointer"
        >
          <BrainCircuit className="w-4 h-4 text-indigo-400" />
          <span className="hidden sm:inline">Adaptive Mastery</span>
        </button>

        {/* Spaced Revision Pill */}
        <button
          onClick={onOpenRevision}
          title="Spaced Repetition Review Queue"
          className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/50 text-emerald-300 text-xs font-medium transition cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline">Revision</span>
          {dueRevisionCount > 0 && (
            <span className="ml-1 px-1.5 py-0.2 bg-emerald-500 text-black text-[10px] font-black rounded-full">
              {dueRevisionCount}
            </span>
          )}
        </button>

        {/* Developer Level Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#141e33] border border-[#24324f] rounded-xl">
          <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-slate-300">
            <User className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold text-slate-300">
                Level {learnerProfile.level}
              </span>
              <span className="text-[10px] text-blue-400 font-mono">
                {learnerProfile.totalXp} XP
              </span>
            </div>
            <div className="w-20 sm:w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-0.5">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(5, levelProgress))}%` }}
              />
            </div>
          </div>
        </div>

        {/* Audio Toggle */}
        <button
          onClick={onToggleSound}
          title={settings.soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
          className="p-2 rounded-lg bg-[#141e33] hover:bg-[#1e2d4d] border border-[#24324f] text-slate-300 hover:text-white transition cursor-pointer"
        >
          {settings.soundEnabled ? (
            <Volume2 className="w-4 h-4 text-blue-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-500" />
          )}
        </button>

        {/* Settings Dialog */}
        <button
          onClick={onOpenSettings}
          title="Game Settings"
          className="p-2 rounded-lg bg-[#141e33] hover:bg-[#1e2d4d] border border-[#24324f] text-slate-300 hover:text-white transition cursor-pointer"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Reset Game */}
        <button
          onClick={onOpenReset}
          title="Reset Game Progress"
          className="p-2 rounded-lg bg-[#141e33] hover:bg-rose-950/50 hover:border-rose-800/50 border border-[#24324f] text-slate-400 hover:text-rose-400 transition cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
