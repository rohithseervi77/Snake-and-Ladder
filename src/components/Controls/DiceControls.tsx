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
      className="w-full max-w-5xl mx-auto px-4 py-2 bg-[#111827] border border-[#263449] rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xl backdrop-blur-md shrink-0"
    >
      {/* 3D Dice Button (Primary Action: Electric Blue) */}
      <button
        onClick={onRollDice}
        disabled={isRolling || isMoving || isAutoplayRunning}
        className="flex items-center gap-3 min-h-[48px] px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#3B82F6] border border-[#2563EB] text-[#F8FAFC] shadow-lg shadow-[#2563EB]/25 transition-all transform active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
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
          <div className="text-sm font-black tracking-wide leading-tight">
            {isRolling ? 'Rolling...' : isMoving ? 'Moving...' : 'Roll Dice'}
          </div>
          <div className="text-[10px] text-[#22D3EE] font-medium leading-none mt-0.5">
            {isAutoplayRunning ? 'Autoplay Active' : `Rolled ${lastDiceRoll} • Click to Move`}
          </div>
        </div>
      </button>

      {/* Center Position Badge */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#080D1A] border border-[#263449] rounded-xl text-[#CBD5E1] text-xs shrink-0 shadow-inner">
        <Compass className="w-4 h-4 text-[#22D3EE]" />
        <span className="text-xs font-semibold text-[#94A3B8] hidden sm:inline">Position:</span>
        <span className="text-xs font-black text-[#22D3EE] bg-[#22D3EE]/15 border border-[#22D3EE]/40 px-2 py-0.5 rounded-lg font-mono">
          Tile {currentPosition} / 100
        </span>
      </div>

      {/* Progress Bar (Cyber Cyan) */}
      <div className="hidden md:flex items-center gap-2.5 flex-1 max-w-[200px]">
        <div className="flex-1">
          <div className="flex justify-between items-center text-[10px] mb-1">
            <span className="text-[#94A3B8] font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#22D3EE]" />
              Journey Progress
            </span>
            <span className="font-mono font-bold text-[#22D3EE] text-[10px]">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-[#080D1A] rounded-full overflow-hidden border border-[#263449]">
            <div 
              className="h-full bg-gradient-to-r from-[#22D3EE] to-[#2563EB] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Integrated Autoplay Section */}
      <div className="flex items-center gap-2 shrink-0 pl-2 border-l border-[#263449]">
        {!isAutoplayRunning ? (
          <button
            onClick={onStartAutoplay}
            className="flex items-center gap-1.5 min-h-[44px] px-3.5 py-1.5 rounded-xl bg-[#2563EB]/25 hover:bg-[#2563EB]/40 border border-[#2563EB]/60 text-[#22D3EE] font-bold text-xs transition shadow-md cursor-pointer active:scale-95"
            title="Start automated demonstration on the real game board"
          >
            <Bot className="w-4 h-4 text-[#22D3EE]" />
            <span>Autoplay</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5">
            {isAutoplayPaused ? (
              <button
                onClick={onResumeAutoplay}
                className="flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-[#F8FAFC] font-bold text-xs transition cursor-pointer shadow active:scale-95"
              >
                <Play className="w-3 h-3 fill-[#F8FAFC]" /> Resume
              </button>
            ) : (
              <button
                onClick={onPauseAutoplay}
                className="flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#080D1A] font-bold text-xs transition cursor-pointer shadow active:scale-95"
              >
                <Pause className="w-3 h-3 fill-[#080D1A]" /> Pause
              </button>
            )}

            <button
              onClick={onStopAutoplay}
              className="flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-xl bg-[#F43F5E] hover:bg-[#E11D48] text-[#F8FAFC] font-bold text-xs transition cursor-pointer shadow active:scale-95"
            >
              <Square className="w-3 h-3 fill-[#F8FAFC]" /> Stop
            </button>

            {/* Speed Buttons */}
            {onSetAutoplaySpeed && (
              <div className="hidden sm:flex items-center gap-1 ml-1 bg-[#080D1A] p-1 rounded-xl border border-[#263449]">
                {([1, 2, 4] as AutoplaySpeed[]).map((spd) => (
                  <button
                    key={spd}
                    onClick={() => onSetAutoplaySpeed(spd)}
                    className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                      autoplaySpeed === spd
                        ? 'bg-[#2563EB] text-[#F8FAFC] shadow-sm'
                        : 'bg-[#111827] text-[#94A3B8] hover:text-[#F8FAFC]'
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
