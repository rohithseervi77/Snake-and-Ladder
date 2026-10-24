import React from 'react';
import { Compass, Sparkles, Bot, Play, Pause, Square } from 'lucide-react';
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
  diceSkin = 'dice-classic-ivory',
  isRolling,
  isMoving,
  isAutoplayRunning,
  isAutoplayPaused = false,
  autoplaySpeed = 1,
  onRollDice,
  onStartAutoplay,
  onPauseAutoplay,
  onResumeAutoplay,
  onStopAutoplay,
  onSetAutoplaySpeed
}) => {
  const getSkinStyles = () => {
    switch (diceSkin) {
      case 'dice-ruby-prism':
        return {
          cubeBg: 'bg-[#F43F5E] border-[#F43F5E] shadow-sm',
          pipColor: 'bg-[#F8FAFC]'
        };
      case 'dice-emerald-cyber':
        return {
          cubeBg: 'bg-[#10B981] border-[#10B981] shadow-sm',
          pipColor: 'bg-[#080D1A]'
        };
      case 'dice-gold-royale':
        return {
          cubeBg: 'bg-[#F59E0B] border-[#F59E0B] shadow-sm',
          pipColor: 'bg-[#080D1A]'
        };
      case 'dice-classic-ivory':
      default:
        return {
          cubeBg: 'bg-[#F8FAFC] border-[#263449] shadow-sm',
          pipColor: 'bg-[#080D1A]'
        };
    }
  };

  const { cubeBg, pipColor } = getSkinStyles();

  // Render dice face pips (1 to 6)
  const renderDicePips = (value: number) => {
    switch (value) {
      case 1:
        return <div className={`w-2 h-2 rounded-full ${pipColor} mx-auto my-auto`} />;
      case 2:
        return (
          <div className="w-full h-full p-0.5 flex justify-between">
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor}`} />
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor} self-end`} />
          </div>
        );
      case 3:
        return (
          <div className="w-full h-full p-0.5 flex flex-col justify-between items-center">
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor} self-start`} />
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor} self-center`} />
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor} self-end`} />
          </div>
        );
      case 4:
        return (
          <div className="w-full h-full p-0.5 grid grid-cols-2 gap-0.5 items-center justify-items-center">
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor}`} />
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor}`} />
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor}`} />
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor}`} />
          </div>
        );
      case 5:
        return (
          <div className="w-full h-full p-0.5 grid grid-cols-3 gap-0.5 items-center justify-items-center">
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor}`} />
            <div />
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor}`} />
            <div />
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor}`} />
            <div />
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor}`} />
            <div />
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor}`} />
          </div>
        );
      case 6:
      default:
        return (
          <div className="w-full h-full p-0.5 grid grid-cols-2 gap-0.5 items-center justify-items-center">
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor}`} />
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor}`} />
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor}`} />
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor}`} />
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor}`} />
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor}`} />
          </div>
        );
    }
  };

  const progressPercent = Math.min(100, Math.max(1, currentPosition));

  return (
    <div 
      className="w-full max-w-5xl mx-auto px-4 py-2 bg-[var(--header-bg)] border border-[var(--border-subtle)] rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-md backdrop-blur-md shrink-0 transition-colors duration-200"
    >
      {/* 3D Dice Button (Primary Action: Indigo -> Violet Gradient CTA) */}
      <button
        onClick={onRollDice}
        disabled={isRolling || isMoving || isAutoplayRunning}
        className="flex items-center gap-3 min-h-[48px] px-4 py-2 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#4F46E5] hover:to-[#7C3AED] border border-[#6366F1] text-white shadow-lg shadow-[#6366F1]/25 transition-all transform active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        aria-label="Roll the Dice"
      >
        {/* Animated 3D Die Cube */}
        <div 
          className={`w-8 h-8 rounded-lg ${cubeBg} shadow-md border flex items-center justify-center transition-transform shrink-0 ${
            isRolling ? 'animate-spin' : ''
          }`}
        >
          {renderDicePips(lastDiceRoll)}
        </div>

        <div className="text-left">
          <div className="text-sm font-black tracking-wide leading-tight text-white">
            {isRolling ? 'Rolling...' : isMoving ? 'Moving...' : 'Roll Dice'}
          </div>
          <div className="text-[10px] text-white/90 font-medium leading-none mt-0.5">
            {isAutoplayRunning ? 'Autoplay Active' : `Rolled ${lastDiceRoll} • Click to Move`}
          </div>
        </div>
      </button>

      {/* Center Position Badge */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-secondary)] text-xs shrink-0 shadow-inner">
        <Compass className="w-4 h-4 text-[var(--color-indigo)]" />
        <span className="text-xs font-semibold text-[var(--text-secondary)] hidden sm:inline">Position:</span>
        <span className="text-xs font-black text-[var(--color-indigo)] bg-[var(--color-indigo-light)] border border-[var(--color-indigo-border)] px-2 py-0.5 rounded-lg font-mono">
          Tile {currentPosition} / 100
        </span>
      </div>

      {/* Progress Bar (Teal / Cyan Progress Accent) */}
      <div className="hidden md:flex items-center gap-2.5 flex-1 max-w-[200px]">
        <div className="flex-1">
          <div className="flex justify-between items-center text-[10px] mb-1">
            <span className="text-[var(--text-secondary)] font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[var(--color-teal)]" />
              Journey Progress
            </span>
            <span className="font-mono font-bold text-[var(--color-teal)] text-[10px]">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-[var(--card-secondary-bg)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
            <div 
              className="h-full bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-teal)] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Integrated Autoplay Section */}
      <div className="flex items-center gap-2 shrink-0 pl-2 border-l border-[var(--border-subtle)]">
        {!isAutoplayRunning ? (
          <button
            onClick={onStartAutoplay}
            className="flex items-center gap-1.5 min-h-[44px] px-3.5 py-1.5 rounded-xl bg-[var(--color-teal-light)] hover:bg-[var(--color-teal-border)] border border-[var(--color-teal)] text-[var(--color-teal)] font-bold text-xs transition shadow-sm cursor-pointer active:scale-95"
            title="Start automated demonstration on the real game board"
          >
            <Bot className="w-4 h-4 text-[var(--color-teal)]" />
            <span>Autoplay</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5">
            {isAutoplayPaused ? (
              <button
                onClick={onResumeAutoplay}
                className="flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-xl bg-[var(--color-emerald)] hover:opacity-90 text-white font-bold text-xs transition cursor-pointer shadow active:scale-95"
              >
                <Play className="w-3 h-3 fill-white" /> Resume
              </button>
            ) : (
              <button
                onClick={onPauseAutoplay}
                className="flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-xl bg-[var(--color-amber)] hover:opacity-90 text-white font-bold text-xs transition cursor-pointer shadow active:scale-95"
              >
                <Pause className="w-3 h-3 fill-white" /> Pause
              </button>
            )}

            <button
              onClick={onStopAutoplay}
              className="flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-xl bg-[var(--color-rose)] hover:opacity-90 text-white font-bold text-xs transition cursor-pointer shadow active:scale-95"
            >
              <Square className="w-3 h-3 fill-white" /> Stop
            </button>

            {/* Speed Buttons */}
            {onSetAutoplaySpeed && (
              <div className="hidden sm:flex items-center gap-1 ml-1 bg-[var(--card-secondary-bg)] p-1 rounded-xl border border-[var(--border-subtle)]">
                {([1, 2, 4] as AutoplaySpeed[]).map((spd) => (
                  <button
                    key={spd}
                    onClick={() => onSetAutoplaySpeed(spd)}
                    className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                      autoplaySpeed === spd
                        ? 'bg-[var(--color-indigo)] text-white shadow-sm'
                        : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
