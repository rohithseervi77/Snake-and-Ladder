import React from 'react';
import { Play, CheckCircle2, Flame, Award, HelpCircle } from 'lucide-react';
import { SquareMetadata } from '../../types/curriculum';
import { SQUARE_CHALLENGES_MAP } from '../../data/challenges';

interface RightSidebarProps {
  currentSquare: SquareMetadata;
  totalAttempts: number;
  totalCorrect: number;
  accuracy: number;
  streak: number;
  totalScore: number;
  onStartChallenge: (squareId: number) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  currentSquare,
  totalAttempts,
  totalCorrect,
  accuracy,
  streak,
  totalScore,
  onStartChallenge
}) => {
  // Look up challenge for current square
  const challenges = SQUARE_CHALLENGES_MAP.get(currentSquare.id) || [];
  const currentChallenge = challenges[0];

  const accuracyPercent = totalAttempts > 0 
    ? Math.round((totalCorrect / totalAttempts) * 100) 
    : 100;

  return (
    <aside className="w-full flex flex-col gap-3 text-[var(--text-secondary)]">
      {/* 1. Current Tile & Challenge Card */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-2xl p-4 shadow-sm flex flex-col gap-3">
        {/* Header: Tile Number & CO Tag */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[var(--color-indigo)] text-white font-mono font-black text-sm flex items-center justify-center shadow-sm">
              {currentSquare.id}
            </span>
            <span className="text-xs font-bold text-[var(--text-primary)]">
              Tile {currentSquare.id} of 100
            </span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--color-indigo-light)] text-[var(--color-indigo)] border border-[var(--color-indigo-border)]">
            {currentSquare.co}
          </span>
        </div>

        {/* Title & Topic */}
        <div>
          <h3 className="text-sm font-black text-[var(--text-primary)] leading-tight m-0">
            {currentSquare.title}
          </h3>
          <p className="text-[11px] text-[var(--text-secondary)] mt-1 line-clamp-2 leading-relaxed">
            {currentSquare.summary || currentSquare.subtopic}
          </p>
        </div>

        {/* Question Prompt Preview or Code Snippet */}
        {currentChallenge && (
          <div className="p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] flex flex-col gap-2">
            <div className="flex items-start gap-1.5 font-medium text-[var(--text-primary)]">
              <HelpCircle className="w-3.5 h-3.5 text-[var(--color-indigo)] shrink-0 mt-0.5" />
              <span>{currentChallenge.prompt}</span>
            </div>

            {currentChallenge.codeSnippet && (
              <pre className="p-2 rounded-lg bg-[var(--board-bg)] border border-[var(--border-subtle)] font-mono text-[10.5px] text-[var(--text-secondary)] overflow-x-auto m-0 leading-tight">
                {currentChallenge.codeSnippet}
              </pre>
            )}
          </div>
        )}

        {/* Solve Challenge Action Button */}
        <button
          onClick={() => onStartChallenge(currentSquare.id)}
          className="w-full py-2.5 px-4 rounded-xl bg-[var(--color-indigo)] hover:bg-[var(--color-indigo-hover)] text-white font-bold text-xs tracking-wide shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Solve Challenge</span>
        </button>
      </div>

      {/* 2. Your Progress / Stats Card */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-2xl p-4 shadow-sm flex flex-col gap-3">
        <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider flex items-center justify-between m-0">
          <span>Your Progress</span>
          <Award className="w-4 h-4 text-[var(--color-indigo)]" />
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* Position */}
          <div className="p-2.5 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col">
            <span className="text-[10px] text-[var(--text-secondary)] font-medium">Position</span>
            <span className="font-mono font-bold text-[var(--text-primary)] text-sm mt-0.5">
              {currentSquare.id} / 100
            </span>
          </div>

          {/* Score */}
          <div className="p-2.5 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col">
            <span className="text-[10px] text-[var(--text-secondary)] font-medium">Total Score</span>
            <span className="font-mono font-bold text-[var(--color-indigo)] text-sm mt-0.5">
              {totalScore} XP
            </span>
          </div>

          {/* Solved Questions */}
          <div className="p-2.5 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col">
            <span className="text-[10px] text-[var(--text-secondary)] font-medium">Questions Solved</span>
            <span className="font-mono font-bold text-[var(--color-emerald)] text-sm mt-0.5">
              {totalCorrect}
            </span>
          </div>

          {/* Accuracy */}
          <div className="p-2.5 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col">
            <span className="text-[10px] text-[var(--text-secondary)] font-medium">Accuracy</span>
            <span className="font-mono font-bold text-[var(--text-primary)] text-sm mt-0.5">
              {accuracyPercent}%
            </span>
          </div>
        </div>

        {/* Streak Indicator */}
        {streak > 0 && (
          <div className="p-2 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex items-center justify-between text-xs">
            <span className="text-[var(--text-secondary)] font-medium flex items-center gap-1.5">
              <Flame className="w-4 h-4 fill-[var(--color-amber)] text-[var(--color-amber)]" />
              <span>Current Streak</span>
            </span>
            <span className="font-mono font-bold text-[var(--color-amber)]">
              {streak} in a row
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};
