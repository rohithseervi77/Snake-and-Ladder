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
          cubeBg: 'bg-gradient-to-br from-rose-500 to-red-700 border-rose-400 shadow-rose-900/40',
          pipColor: 'bg-white'
        };
      case 'dice-emerald-cyber':
        return {
          cubeBg: 'bg-gradient-to-br from-emerald-600 to-teal-800 border-emerald-400 shadow-emerald-900/40',
          pipColor: 'bg-emerald-200'
        };
      case 'dice-gold-royale':
        return {
          cubeBg: 'bg-gradient-to-br from-amber-400 to-yellow-600 border-amber-300 shadow-amber-900/40',
          pipColor: 'bg-slate-950'
        };
      case 'dice-classic-ivory':
      default:
        return {
          cubeBg: 'bg-white border-slate-300 shadow-slate-900/30',
          pipColor: 'bg-slate-900'
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
      className="w-full max-w-5xl mx-auto px-4 py-2 bg-slate-900/95 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xl backdrop-blur-md shrink-0"
    >
      {/* 3D Dice Button */}
      <button
        onClick={onRollDice}
        disabled={isRolling || isMoving || isAutoplayRunning}
        className="flex items-center gap-3 min-h-[48px] px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 border border-blue-400/40 text-white shadow-lg shadow-blue-600/30 transition-all transform active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
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
          <div className="text-[10px] text-blue-200/90 font-medium leading-none mt-0.5">
            {isAutoplayRunning ? 'Autoplay Active' : `Rolled ${lastDiceRoll} • Click to Move`}
          </div>
        </div>
      </button>

      {/* Center Position Badge */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-slate-300 text-xs shrink-0 shadow-inner">
        <Compass className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-semibold text-slate-400 hidden sm:inline">Position:</span>
        <span className="text-xs font-black text-cyan-200 bg-cyan-950/80 border border-cyan-500/40 px-2 py-0.5 rounded-lg font-mono">
          Tile {currentPosition} / 100
        </span>
      </div>

      {/* Progress Bar */}
      <div className="hidden md:flex items-center gap-2.5 flex-1 max-w-[200px]">
        <div className="flex-1">
          <div className="flex justify-between items-center text-[10px] mb-1">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              Journey Progress
            </span>
            <span className="font-mono font-bold text-emerald-400 text-[10px]">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Integrated Autoplay Section */}
      <div className="flex items-center gap-2 shrink-0 pl-2 border-l border-slate-800">
        {!isAutoplayRunning ? (
          <button
            onClick={onStartAutoplay}
            className="flex items-center gap-1.5 min-h-[44px] px-3.5 py-1.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 border border-indigo-400/30 text-white font-bold text-xs transition shadow-md cursor-pointer active:scale-95"
            title="Start automated demonstration on the real game board"
          >
            <Bot className="w-4 h-4 text-indigo-200" />
            <span>Autoplay</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5">
            {isAutoplayPaused ? (
              <button
                onClick={onResumeAutoplay}
                className="flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition cursor-pointer shadow active:scale-95"
              >
                <Play className="w-3 h-3 fill-white" /> Resume
              </button>
            ) : (
              <button
                onClick={onPauseAutoplay}
                className="flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition cursor-pointer shadow active:scale-95"
              >
                <Pause className="w-3 h-3 fill-white" /> Pause
              </button>
            )}

            <button
              onClick={onStopAutoplay}
              className="flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition cursor-pointer shadow active:scale-95"
            >
              <Square className="w-3 h-3 fill-white" /> Stop
            </button>

            {/* Speed Buttons */}
            {onSetAutoplaySpeed && (
              <div className="hidden sm:flex items-center gap-1 ml-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                {([1, 2, 4] as AutoplaySpeed[]).map((spd) => (
                  <button
                    key={spd}
                    onClick={() => onSetAutoplaySpeed(spd)}
                    className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                      autoplaySpeed === spd
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
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
