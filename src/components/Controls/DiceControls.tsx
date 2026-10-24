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
      className="w-full mx-auto px-3 py-1 sm:py-1.5 bg-[#0d1527] border border-[#1e293b] rounded-xl flex items-center justify-between gap-2.5 shadow-md shrink-0"
      style={{ maxWidth: 'min(100%, calc(100vh - 128px), 840px)' }}
    >
      {/* 3D Dice Button */}
      <button
        onClick={onRollDice}
        disabled={isRolling || isMoving || isAutoplayRunning}
        className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border border-blue-400/40 text-white shadow-md shadow-blue-600/30 transition-all transform active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        aria-label="Roll the Dice"
      >
        {/* Animated 3D Die Cube */}
        <div 
          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md ${cubeBg} shadow border flex items-center justify-center transition-transform shrink-0 ${
            isRolling ? 'animate-spin' : ''
          }`}
        >
          {renderDicePips(lastDiceRoll)}
        </div>

        <div className="text-left">
          <div className="text-xs font-black tracking-wide leading-tight">
            {isRolling ? 'Rolling...' : isMoving ? 'Moving...' : 'Roll Dice'}
          </div>
          <div className="text-[9px] text-blue-200 opacity-90 leading-none">
            {isAutoplayRunning ? 'Autoplay Active' : `Rolled ${lastDiceRoll} • Click`}
          </div>
        </div>
      </button>

      {/* Center Position Badge */}
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#141e33] border border-[#24324f] rounded-lg text-slate-300 text-xs shrink-0">
        <Compass className="w-3.5 h-3.5 text-blue-400" />
        <span className="text-[11px] font-semibold hidden sm:inline">Tile:</span>
        <span className="text-xs font-black text-white bg-blue-600/30 border border-blue-500/40 px-1.5 py-0.2 rounded font-mono">
          {currentPosition} / 100
        </span>
      </div>

      {/* Progress Bar */}
      <div className="hidden md:flex items-center gap-2 flex-1 max-w-[170px]">
        <div className="flex-1">
          <div className="flex justify-between items-center text-[9.5px] mb-0.5">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
              Progress
            </span>
            <span className="font-mono font-bold text-emerald-400 text-[9.5px]">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Integrated Autoplay Section */}
      <div className="flex items-center gap-1.5 shrink-0 pl-1 border-l border-slate-800/80">
        {!isAutoplayRunning ? (
          <button
            onClick={onStartAutoplay}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white font-bold text-[10.5px] transition shadow-sm cursor-pointer"
            title="Start automated demonstration on the real game board"
          >
            <Bot className="w-3.5 h-3.5 text-indigo-200" />
            <span>Autoplay</span>
          </button>
        ) : (
          <div className="flex items-center gap-1">
            {isAutoplayPaused ? (
              <button
                onClick={onResumeAutoplay}
                className="flex items-center gap-1 px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] transition cursor-pointer"
              >
                <Play className="w-2.5 h-2.5 fill-white" /> Resume
              </button>
            ) : (
              <button
                onClick={onPauseAutoplay}
                className="flex items-center gap-1 px-2 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white font-bold text-[10px] transition cursor-pointer"
              >
                <Pause className="w-2.5 h-2.5 fill-white" /> Pause
              </button>
            )}

            <button
              onClick={onStopAutoplay}
              className="flex items-center gap-1 px-2 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] transition cursor-pointer"
            >
              <Square className="w-2.5 h-2.5 fill-white" /> Stop
            </button>

            {/* Speed Buttons */}
            {onSetAutoplaySpeed && (
              <div className="hidden sm:flex items-center gap-0.5 ml-1">
                {([1, 2, 4] as AutoplaySpeed[]).map((spd) => (
                  <button
                    key={spd}
                    onClick={() => onSetAutoplaySpeed(spd)}
                    className={`px-1.5 py-0.5 rounded text-[9.5px] font-mono font-bold transition cursor-pointer ${
                      autoplaySpeed === spd
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
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
