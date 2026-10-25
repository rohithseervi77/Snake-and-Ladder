import React from 'react';
import { Dices, Pause, Play, Square } from 'lucide-react';
import { AutoplaySpeed } from '../../types/game';

interface DiceControlsProps {
  currentPosition: number;
  lastDiceRoll: number;
  diceSkin?: string;
  isRolling: boolean;
  isMoving: boolean;
  isAutoplayRunning: boolean;
  isAutoplayPaused?: boolean;
  autoplaySpeed?: AutoplaySpeed;
  onRollDice: () => void;
  onStartAutoplay?: () => void;
  onPauseAutoplay?: () => void;
  onResumeAutoplay?: () => void;
  onStopAutoplay?: () => void;
  onSetAutoplaySpeed?: (speed: AutoplaySpeed) => void;
}

export const DiceControls: React.FC<DiceControlsProps> = ({
  currentPosition,
  lastDiceRoll,
  isRolling,
  isMoving,
  isAutoplayRunning,
  isAutoplayPaused = false,
  onRollDice,
  onPauseAutoplay,
  onResumeAutoplay,
  onStopAutoplay
}) => {
  const progressPercent = Math.min(100, Math.max(1, currentPosition));

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-2.5 bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-2xl flex items-center justify-between gap-4 shadow-sm shrink-0">
      {/* 1. Primary Roll Dice Action Button */}
      <button
        onClick={onRollDice}
        disabled={isRolling || isMoving || isAutoplayRunning}
        className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-[var(--color-indigo)] hover:bg-[var(--color-indigo-hover)] disabled:opacity-50 text-white font-black text-sm tracking-wide shadow-sm transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed shrink-0"
        aria-label="Roll the Dice"
      >
        <Dices className={`w-5 h-5 ${isRolling ? 'animate-spin' : ''}`} />
        <span>
          {isRolling ? 'Rolling...' : isMoving ? 'Moving...' : 'Roll Dice'}
        </span>
        {!isRolling && !isMoving && lastDiceRoll > 0 && (
          <span className="ml-1 px-2 py-0.5 rounded-md bg-white/20 text-xs font-mono">
            {lastDiceRoll}
          </span>
        )}
      </button>

      {/* 2. Position Badge */}
      <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-secondary)] shrink-0">
        <span>Position:</span>
        <span className="font-mono text-sm font-black text-[var(--color-indigo)]">
          {currentPosition} / 100
        </span>
      </div>

      {/* 3. Clean Progress Bar */}
      <div className="hidden sm:flex items-center gap-2 flex-1 max-w-[180px]">
        <div className="w-full">
          <div className="flex justify-between items-center text-[10px] mb-1 font-semibold text-[var(--text-secondary)]">
            <span>Progress</span>
            <span className="font-mono text-[var(--color-indigo)]">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-[var(--card-secondary-bg)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
            <div 
              className="h-full bg-[var(--color-indigo)] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4. Autoplay controls only appear if autoplay is running */}
      {isAutoplayRunning && (
        <div className="flex items-center gap-1.5 shrink-0 pl-2 border-l border-[var(--border-subtle)]">
          {isAutoplayPaused ? (
            <button
              onClick={onResumeAutoplay}
              className="p-2 rounded-lg bg-[var(--color-emerald)] text-white text-xs font-bold"
              title="Resume Autoplay"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
          ) : (
            <button
              onClick={onPauseAutoplay}
              className="p-2 rounded-lg bg-[var(--color-amber)] text-white text-xs font-bold"
              title="Pause Autoplay"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
            </button>
          )}
          <button
            onClick={onStopAutoplay}
            className="p-2 rounded-lg bg-[var(--color-rose)] text-white text-xs font-bold"
            title="Stop Autoplay"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>
      )}
    </div>
  );
};
