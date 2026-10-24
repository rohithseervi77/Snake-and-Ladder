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
  Bot,
  Network,
  Gauge,
  Sliders,
  Dna,
  Workflow
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
  onOpenKnowledgeGraph?: () => void;
  onOpenComplexityMeter?: () => void;
  onOpenWhatIfSimulator?: () => void;
  onOpenErrorDNA?: () => void;
  onOpenDecisionLab?: () => void;
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
  onOpenBugBotDuel,
  onOpenKnowledgeGraph,
  onOpenComplexityMeter,
  onOpenWhatIfSimulator,
  onOpenErrorDNA,
  onOpenDecisionLab
}) => {
  const dueRevisionCount = learnerProfile.revisionQueue.filter(r => r.isDue).length;
  const levelInfo = calculateLevelInfo(totalXp);

  return (
    <header className="w-full bg-[#080D1A] border-b border-[#263449] px-3 sm:px-4 py-1.5 flex flex-wrap items-center justify-between gap-2.5 text-[#F8FAFC] sticky top-0 z-40 backdrop-blur-md shrink-0">
      {/* Left: Brand & Tagline */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#2563EB] shadow-sm shadow-[#2563EB]/30 text-[#F8FAFC] font-bold">
          <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#F8FAFC]" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-sm sm:text-base font-black tracking-tight text-[#F8FAFC] m-0">Code & Ladders</h1>
            <span className="hidden sm:inline-block px-1.5 py-0.2 text-[8.5px] uppercase font-bold tracking-wider bg-[#2563EB]/15 text-[#22D3EE] border border-[#2563EB]/40 rounded-md">
              DSA Adventure
            </span>
          </div>
          <p className="text-[9px] sm:text-[10px] text-[#94A3B8] font-medium m-0 hidden md:block">
            Learn Data Structures &bull; Roll &bull; Solve &bull; Level Up
          </p>
        </div>
      </div>

      {/* Center: Progression, Coins, Streak */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        {/* Streak Counter */}
        <div 
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#111827] border border-[#F59E0B]/50 text-[#F59E0B] font-bold text-xs"
          title={`Current Streak: ${streak} correct in a row`}
        >
          <Flame className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B] animate-pulse" />
          <span className="font-mono">{streak}</span>
          <span className="hidden md:inline text-[10px] uppercase font-semibold text-[#F59E0B]/80">Streak</span>
        </div>

        {/* Coin Balance */}
        <button
          onClick={onOpenShop}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#111827] hover:bg-[#172033] border border-[#F59E0B]/50 text-[#F59E0B] font-bold text-xs transition cursor-pointer"
          title="Open Cosmetic Shop"
        >
          <Coins className="w-4 h-4 text-[#F59E0B]" />
          <span className="font-mono">{coinBalance}</span>
          <span className="hidden md:inline text-[10px] uppercase font-semibold text-[#F59E0B]/80">Coins</span>
        </button>

        {/* Player Level Badge */}
        <div className="flex items-center gap-2 px-3 py-1 bg-[#111827] border border-[#263449] rounded-xl">
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-[#F8FAFC]">
                Lvl {levelInfo.level} &bull; <span className="text-[#22D3EE]">{levelInfo.title}</span>
              </span>
              <span className="text-[10px] text-[#F59E0B] font-mono font-bold">
                {totalXp} XP
              </span>
            </div>
            <div className="w-24 sm:w-28 h-1.5 bg-[#080D1A] rounded-full overflow-hidden mt-0.5 border border-[#263449]">
              <div 
                className="h-full bg-gradient-to-r from-[#22D3EE] to-[#2563EB] rounded-full transition-all duration-300"
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
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#111827] hover:bg-[#172033] border border-[#8B5CF6]/50 text-[#8B5CF6] text-xs font-semibold transition cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span className="hidden sm:inline">Mastery</span>
          </button>
        )}

        {/* BugBot Duel Button */}
        {onOpenBugBotDuel && (
          <button
            onClick={onOpenBugBotDuel}
            title="Duel Rival BugBot"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#111827] hover:bg-[#172033] border border-[#22D3EE]/50 text-[#22D3EE] text-xs font-semibold transition cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span className="hidden sm:inline">Rival Duel</span>
          </button>
        )}

        {/* Knowledge Graph Roadmap Button */}
        {onOpenKnowledgeGraph && (
          <button
            onClick={onOpenKnowledgeGraph}
            title="DSA Curriculum Knowledge Graph Roadmap"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#111827] hover:bg-[#172033] border border-[#22D3EE]/50 text-[#22D3EE] text-xs font-semibold transition cursor-pointer"
          >
            <Network className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span className="hidden xl:inline">Graph</span>
          </button>
        )}

        {/* Complexity Meter Button */}
        {onOpenComplexityMeter && (
          <button
            onClick={onOpenComplexityMeter}
            title="Asymptotic Complexity Meter & Big-O Benchmark"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#111827] hover:bg-[#172033] border border-[#10B981]/50 text-[#10B981] text-xs font-semibold transition cursor-pointer"
          >
            <Gauge className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="hidden xl:inline">Big-O</span>
          </button>
        )}

        {/* What-If Structural Simulator Button */}
        {onOpenWhatIfSimulator && (
          <button
            onClick={onOpenWhatIfSimulator}
            title="What-If Structural Sandbox & Edge Case Simulator"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#111827] hover:bg-[#172033] border border-[#8B5CF6]/50 text-[#8B5CF6] text-xs font-semibold transition cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span className="hidden xl:inline">What-If</span>
          </button>
        )}

        {/* Error DNA Button */}
        {onOpenErrorDNA && (
          <button
            onClick={onOpenErrorDNA}
            title="Cognitive Error DNA & Learning Debt Diagnostics"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#111827] hover:bg-[#172033] border border-[#F43F5E]/50 text-[#F43F5E] text-xs font-semibold transition cursor-pointer"
          >
            <Dna className="w-3.5 h-3.5 text-[#F43F5E]" />
            <span className="hidden xl:inline">Error DNA</span>
          </button>
        )}

        {/* Algorithm Decision Lab Button */}
        {onOpenDecisionLab && (
          <button
            onClick={onOpenDecisionLab}
            title="Algorithm Decision Lab: Production Scale Scenarios"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#111827] hover:bg-[#172033] border border-[#2563EB]/50 text-[#2563EB] text-xs font-semibold transition cursor-pointer"
          >
            <Workflow className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="hidden xl:inline">Decision Lab</span>
          </button>
        )}

        {/* Shop Button */}
        <button
          onClick={onOpenShop}
          title="Cosmetics Shop"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#111827] hover:bg-[#172033] border border-[#F59E0B]/50 text-[#F59E0B] text-xs font-semibold transition cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Shop</span>
        </button>

        {/* Achievements Button */}
        <button
          onClick={onOpenAchievements}
          title="DSA Achievements"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#111827] hover:bg-[#172033] border border-[#F59E0B]/50 text-[#F59E0B] text-xs font-semibold transition cursor-pointer"
        >
          <Trophy className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Badges</span>
        </button>

        {/* Spaced Revision Pill */}
        <button
          onClick={onOpenRevision}
          title="Spaced Repetition Review Queue"
          className="relative flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#111827] hover:bg-[#172033] border border-[#10B981]/50 text-[#10B981] text-xs font-medium transition cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
          <span className="hidden lg:inline">Review</span>
          {dueRevisionCount > 0 && (
            <span className="px-1.5 py-0.2 bg-[#10B981] text-[#080D1A] text-[9px] font-black rounded-full">
              {dueRevisionCount}
            </span>
          )}
        </button>

        {/* Audio Toggle */}
        <button
          onClick={onToggleSound}
          title={settings.soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
          className="p-1.5 rounded-lg bg-[#111827] hover:bg-[#172033] border border-[#263449] text-[#94A3B8] hover:text-[#F8FAFC] transition cursor-pointer"
        >
          {settings.soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-[#2563EB]" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-[#64748B]" />
          )}
        </button>

        {/* Settings Dialog */}
        <button
          onClick={onOpenSettings}
          title="Game Settings"
          className="p-1.5 rounded-lg bg-[#111827] hover:bg-[#172033] border border-[#263449] text-[#94A3B8] hover:text-[#F8FAFC] transition cursor-pointer"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>

        {/* Reset Game */}
        <button
          onClick={onOpenReset}
          title="Reset Game Progress"
          className="p-1.5 rounded-lg bg-[#111827] hover:bg-[#F43F5E]/15 hover:border-[#F43F5E]/50 border border-[#263449] text-[#94A3B8] hover:text-[#F43F5E] transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
