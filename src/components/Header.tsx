import React from 'react';
import { 
  Code2, 
  Settings, 
  RotateCcw,
  Coins,
  BookOpen,
  GraduationCap,
  Clock,
  FlaskConical,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  totalXp: number;
  coinBalance: number;
  streak?: number;
  onOpenSettings: () => void;
  onOpenReset: () => void;
  onOpenSyllabus?: () => void;
  onOpenPracticeMode?: () => void;
  onOpenExamMode?: () => void;
  onOpenDSALab?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalXp,
  coinBalance,
  onOpenSettings,
  onOpenReset,
  onOpenSyllabus,
  onOpenPracticeMode,
  onOpenExamMode,
  onOpenDSALab
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className="w-full bg-[var(--header-bg)] border-b border-[var(--border-subtle)] px-4 py-2.5 flex items-center justify-between gap-3 text-[var(--text-primary)] sticky top-0 z-40 shadow-sm shrink-0">
      {/* 1. LEFT: Project Title & Subtitle */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[var(--color-indigo)] text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
          <Code2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-base font-black tracking-tight text-[var(--text-primary)] m-0 leading-none">
            Code & Ladders
          </h1>
          <p className="text-[11px] text-[var(--text-secondary)] font-medium m-0 mt-0.5">
            DSA Learning Game
          </p>
        </div>
      </div>

      {/* 2. CENTER: Clean Academic Navigation Tabs */}
      <nav className="hidden md:flex items-center gap-1.5">
        {onOpenSyllabus && (
          <button
            onClick={onOpenSyllabus}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[var(--card-secondary-bg)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[var(--color-indigo)]" />
            <span>Syllabus</span>
          </button>
        )}

        {onOpenPracticeMode && (
          <button
            onClick={onOpenPracticeMode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[var(--card-secondary-bg)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-[var(--color-cyan)]" />
            <span>Practice</span>
          </button>
        )}

        {onOpenExamMode && (
          <button
            onClick={onOpenExamMode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[var(--card-secondary-bg)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer"
          >
            <Clock className="w-4 h-4 text-[var(--color-rose)]" />
            <span>Exam</span>
          </button>
        )}

        {onOpenDSALab && (
          <button
            onClick={onOpenDSALab}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[var(--card-secondary-bg)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer"
          >
            <FlaskConical className="w-4 h-4 text-[var(--color-violet)]" />
            <span>DSA Lab</span>
          </button>
        )}
      </nav>

      {/* 3. RIGHT: Score, Coins, Theme, Settings, Reset */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Score */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--card-bg)] border border-[var(--border-subtle)] text-xs font-bold">
          <span className="text-[var(--text-secondary)] hidden sm:inline">Score:</span>
          <span className="font-mono text-[var(--color-indigo)]">{totalXp} XP</span>
        </div>

        {/* Coins */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--card-bg)] border border-[var(--border-subtle)] text-xs font-bold">
          <Coins className="w-3.5 h-3.5 text-[var(--color-amber)]" />
          <span className="font-mono text-[var(--color-amber)]">{coinBalance}</span>
        </div>

        {/* Light / Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="p-1.5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer shadow-sm active:scale-95"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-[#F59E0B]" />
          ) : (
            <Moon className="w-4 h-4 text-[#4F46E5]" />
          )}
        </button>

        {/* Settings Dialog */}
        <button
          onClick={onOpenSettings}
          title="Settings"
          aria-label="Settings"
          className="p-1.5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer shadow-sm active:scale-95"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Reset Game */}
        <button
          onClick={onOpenReset}
          title="Reset Game"
          aria-label="Reset Game"
          className="p-1.5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--color-rose-light)] hover:border-[var(--color-rose-border)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--color-rose)] transition cursor-pointer shadow-sm active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
