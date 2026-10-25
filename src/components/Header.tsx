import React from 'react';
import { 
  Code2, 
  Settings, 
  Volume2, 
  VolumeX, 
  RotateCcw,
  Sparkles,
  ShoppingBag,
  Trophy,
  Flame,
  Coins,
  BookOpen,
  GraduationCap,
  Clock,
  FlaskConical,
  FileQuestion,
  Gauge,
  Sun,
  Moon,
  AlertCircle
} from 'lucide-react';
import { LearnerProfile } from '../types/learner';
import { GameSettings } from '../types/game';
import { calculateLevelInfo } from '../engine/economyEngine';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  totalXp: number;
  coinBalance: number;
  streak: number;
  learnerProfile: LearnerProfile;
  settings: GameSettings;
  onToggleSound: () => void;
  onOpenSettings: () => void;
  onOpenAdaptive?: () => void;
  onOpenRevision: () => void;
  onOpenReset: () => void;
  onOpenShop: () => void;
  onOpenAchievements: () => void;
  onOpenSyllabus?: () => void;
  onOpenPracticeMode?: () => void;
  onOpenExamMode?: () => void;
  onOpenDSALab?: () => void;
  onOpenAlgorithmCards?: () => void;
  onOpenMistakeLog?: () => void;
  onOpenComplexityMeter?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalXp,
  coinBalance,
  streak,
  learnerProfile,
  settings,
  onToggleSound,
  onOpenSettings,
  onOpenRevision,
  onOpenReset,
  onOpenShop,
  onOpenAchievements,
  onOpenSyllabus,
  onOpenPracticeMode,
  onOpenExamMode,
  onOpenDSALab,
  onOpenAlgorithmCards,
  onOpenMistakeLog,
  onOpenComplexityMeter
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const dueRevisionCount = learnerProfile.revisionQueue.filter(r => r.isDue).length;
  const mistakeCount = learnerProfile.attemptHistory.filter(h => !h.isCorrect).length;
  const levelInfo = calculateLevelInfo(totalXp);

  return (
    <header className="w-full bg-[var(--header-bg)] border-b border-[var(--border-subtle)] px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2.5 text-[var(--text-primary)] sticky top-0 z-40 backdrop-blur-md shadow-sm shrink-0 transition-colors duration-200">
      {/* Left: Brand & Tagline */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] shadow-sm shadow-[#6366F1]/30 text-white font-bold shrink-0">
          <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-sm sm:text-base font-black tracking-tight text-[var(--text-primary)] m-0 leading-none">
              Code & Ladders
            </h1>
            <span className="hidden sm:inline-block px-1.5 py-0.5 text-[8.5px] uppercase font-bold tracking-wider bg-[var(--color-indigo-light)] text-[var(--color-indigo)] border border-[var(--color-indigo-border)] rounded-md">
              DSA Academic Project
            </span>
          </div>
          <p className="text-[9.5px] sm:text-[10px] text-[var(--text-secondary)] font-medium m-0 mt-0.5 hidden md:block">
            University Syllabus (CO1–CO4) &bull; Visual Learning &bull; Exam Prep
          </p>
        </div>
      </div>

      {/* Center: Progression, Coins, Streak */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        {/* Streak Counter */}
        <div 
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[var(--card-bg)] border border-[var(--color-orange-border)] text-[var(--color-orange)] font-bold text-xs shadow-sm"
          title={`Current Accuracy Streak: ${streak} correct answers in a row`}
        >
          <Flame className="w-4 h-4 fill-[var(--color-orange)] text-[var(--color-orange)] animate-pulse" />
          <span className="font-mono">{streak}</span>
          <span className="hidden md:inline text-[10px] uppercase font-semibold opacity-90">Streak</span>
        </div>

        {/* Coin Balance */}
        <button
          onClick={onOpenShop}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--color-amber-border)] text-[var(--color-amber)] font-bold text-xs transition shadow-sm cursor-pointer active:scale-95"
          title="Open Reward Shop (Cosmetics & Themes)"
        >
          <Coins className="w-4 h-4 text-[var(--color-amber)]" />
          <span className="font-mono">{coinBalance}</span>
          <span className="hidden md:inline text-[10px] uppercase font-semibold opacity-90">Coins</span>
        </button>

        {/* Player Level Badge */}
        <div className="flex items-center gap-2 px-3 py-1 bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-xl shadow-sm">
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-[var(--text-primary)]">
                Lvl {levelInfo.level} &bull; <span className="text-[var(--color-cyan)]">{levelInfo.title}</span>
              </span>
              <span className="text-[10px] text-[var(--color-amber)] font-mono font-bold">
                {totalXp} XP
              </span>
            </div>
            <div className="w-24 sm:w-28 h-1.5 bg-[var(--board-bg)] rounded-full overflow-hidden mt-0.5 border border-[var(--border-subtle)]">
              <div 
                className="h-full bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-indigo)] rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(5, levelInfo.progressPercent))}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right: Academic Modules & Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Syllabus Tracker Button */}
        {onOpenSyllabus && (
          <button
            onClick={onOpenSyllabus}
            title="View Course Outcomes (CO1–CO4) Syllabus Progress"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--color-indigo-border)] text-[var(--color-indigo)] text-xs font-bold transition cursor-pointer shadow-sm active:scale-95"
          >
            <BookOpen className="w-3.5 h-3.5 text-[var(--color-indigo)]" />
            <span className="hidden sm:inline">Syllabus</span>
          </button>
        )}

        {/* Practice Mode Button */}
        {onOpenPracticeMode && (
          <button
            onClick={onOpenPracticeMode}
            title="Practice Mode (10 Questions per Unit with Explanations)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--color-cyan-border)] text-[var(--color-cyan)] text-xs font-bold transition cursor-pointer shadow-sm active:scale-95"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[var(--color-cyan)]" />
            <span className="hidden sm:inline">Practice</span>
          </button>
        )}

        {/* Exam Mode Button */}
        {onOpenExamMode && (
          <button
            onClick={onOpenExamMode}
            title="Exam Mode (20 Questions, 20-Minute Timed Mock Test)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--color-rose-border)] text-[var(--color-rose)] text-xs font-bold transition cursor-pointer shadow-sm active:scale-95"
          >
            <Clock className="w-3.5 h-3.5 text-[var(--color-rose)]" />
            <span className="hidden sm:inline">Exam Mode</span>
          </button>
        )}

        {/* DSA Interactive Lab Button */}
        {onOpenDSALab && (
          <button
            onClick={onOpenDSALab}
            title="DSA Interactive Mechanics Lab (10 Simulations: Stacks, Queues, BST, AVL, Graphs, Sorting)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--color-violet-border)] text-[var(--color-violet)] text-xs font-bold transition cursor-pointer shadow-sm active:scale-95"
          >
            <FlaskConical className="w-3.5 h-3.5 text-[var(--color-violet)]" />
            <span className="hidden sm:inline">DSA Lab</span>
          </button>
        )}

        {/* Algorithm Flashcards */}
        {onOpenAlgorithmCards && (
          <button
            onClick={onOpenAlgorithmCards}
            title="Algorithm Reference Study Cards"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--color-emerald-border)] text-[var(--color-emerald)] text-xs font-bold transition cursor-pointer shadow-sm active:scale-95"
          >
            <FileQuestion className="w-3.5 h-3.5 text-[var(--color-emerald)]" />
            <span className="hidden xl:inline">Cards</span>
          </button>
        )}

        {/* Mistake Log Button */}
        {onOpenMistakeLog && (
          <button
            onClick={onOpenMistakeLog}
            title="Academic Mistake Log & Concept Remediation"
            className="relative flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--color-rose-border)] text-[var(--color-rose)] text-xs font-bold transition cursor-pointer shadow-sm active:scale-95"
          >
            <AlertCircle className="w-3.5 h-3.5 text-[var(--color-rose)]" />
            <span className="hidden xl:inline">Mistakes</span>
            {mistakeCount > 0 && (
              <span className="px-1.5 py-0.2 bg-[var(--color-rose)] text-white text-[9px] font-black rounded-full">
                {mistakeCount}
              </span>
            )}
          </button>
        )}

        {/* Complexity Meter Button */}
        {onOpenComplexityMeter && (
          <button
            onClick={onOpenComplexityMeter}
            title="Asymptotic Big-O Complexity Meter"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--color-amber-border)] text-[var(--color-amber)] text-xs font-bold transition cursor-pointer shadow-sm active:scale-95"
          >
            <Gauge className="w-3.5 h-3.5 text-[var(--color-amber)]" />
            <span className="hidden xl:inline">Big-O</span>
          </button>
        )}

        {/* Spaced Revision Pill */}
        <button
          onClick={onOpenRevision}
          title="Spaced Repetition Review Queue"
          className="relative flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-medium transition cursor-pointer shadow-sm active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-[var(--color-indigo)]" />
          <span className="hidden lg:inline">Review</span>
          {dueRevisionCount > 0 && (
            <span className="px-1.5 py-0.2 bg-[var(--color-indigo)] text-white text-[9px] font-black rounded-full">
              {dueRevisionCount}
            </span>
          )}
        </button>

        {/* Shop Button */}
        <button
          onClick={onOpenShop}
          title="Cosmetics & Themes Shop"
          className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-semibold transition cursor-pointer shadow-sm active:scale-95"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
        </button>

        {/* Badges Button */}
        <button
          onClick={onOpenAchievements}
          title="Badges & Milestones"
          className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-semibold transition cursor-pointer shadow-sm active:scale-95"
        >
          <Trophy className="w-3.5 h-3.5" />
        </button>

        {/* Light / Dark Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-strong)] text-[var(--text-primary)] text-xs font-bold transition shadow-sm cursor-pointer active:scale-95"
        >
          {isDark ? (
            <>
              <Sun className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span className="hidden sm:inline font-mono">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-[#4F46E5]" />
              <span className="hidden sm:inline font-mono">Dark</span>
            </>
          )}
        </button>

        {/* Audio Toggle */}
        <button
          onClick={onToggleSound}
          title={settings.soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
          className="p-1.5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer shadow-sm active:scale-95"
        >
          {settings.soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-[var(--color-indigo)]" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-[var(--text-muted)]" />
          )}
        </button>

        {/* Settings Dialog */}
        <button
          onClick={onOpenSettings}
          title="Game Settings"
          className="p-1.5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer shadow-sm active:scale-95"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>

        {/* Reset Game */}
        <button
          onClick={onOpenReset}
          title="Reset Game Progress"
          className="p-1.5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--color-rose-light)] hover:border-[var(--color-rose-border)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--color-rose)] transition cursor-pointer shadow-sm active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
