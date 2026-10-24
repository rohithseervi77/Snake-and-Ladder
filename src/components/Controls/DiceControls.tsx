import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface DiceControlsProps {
  currentPosition: number;
  lastDiceRoll: number;
  diceSkin?: string;
  isRolling: boolean;
  isMoving: boolean;
  isAutoplayRunning: boolean;
  onRollDice: () => void;
}

export const DiceControls: React.FC<DiceControlsProps> = ({
  currentPosition,
  lastDiceRoll,
  diceSkin = 'dice-classic-ivory',
  isRolling,
  isMoving,
  isAutoplayRunning,
  onRollDice
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
        return <div className={`w-2.5 h-2.5 rounded-full ${pipColor} mx-auto my-auto`} />;
      case 2:
        return (
          <div className="w-full h-full p-1 flex justify-between">
            <div className={`w-2 h-2 rounded-full ${pipColor}`} />
            <div className={`w-2 h-2 rounded-full ${pipColor} self-end`} />
          </div>
        );
      case 3:
        return (
          <div className="w-full h-full p-1 flex flex-col justify-between items-center">
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor} self-start`} />
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor} self-center`} />
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor} self-end`} />
          </div>
        );
      case 4:
        return (
          <div className="w-full h-full p-1 grid grid-cols-2 gap-1 items-center justify-items-center">
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor}`} />
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor}`} />
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor}`} />
            <div className={`w-1.5 h-1.5 rounded-full ${pipColor}`} />
          </div>
        );
      case 5:
        return (
          <div className="w-full h-full p-1 grid grid-cols-3 gap-0.5 items-center justify-items-center">
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
          <div className="w-full h-full p-1 grid grid-cols-2 gap-1 items-center justify-items-center">
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
    <div className="w-full max-w-[850px] mx-auto mt-3 px-4 py-3 bg-[#0d1527] border border-[#1e293b] rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
      {/* 3D Dice Button */}
      <button
        onClick={onRollDice}
        disabled={isRolling || isMoving || isAutoplayRunning}
        className={`flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border border-blue-400/40 text-white shadow-lg shadow-blue-600/30 transition-all transform active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label="Roll the Dice"
      >
        {/* Animated 3D Die Cube */}
        <div 
          className={`w-9 h-9 rounded-lg ${cubeBg} shadow-md border-b-2 flex items-center justify-center transition-transform ${
            isRolling ? 'animate-spin' : ''
          }`}
        >
          {renderDicePips(lastDiceRoll)}
        </div>

        <div className="text-left">
          <div className="text-sm font-black tracking-wide leading-tight">
            {isRolling ? 'Rolling...' : isMoving ? 'Moving...' : 'Roll Dice'}
          </div>
          <div className="text-[10px] text-blue-200 opacity-90">
            {isAutoplayRunning ? 'Autoplay Active' : `Rolled: ${lastDiceRoll} (Click to Move)`}
          </div>
        </div>
      </button>

      {/* Center Position Badge */}
      <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#141e33] border border-[#24324f] rounded-xl text-slate-300">
        <Compass className="w-4 h-4 text-blue-400" />
        <span className="text-xs font-semibold">Current Tile:</span>
        <span className="text-xs font-black text-white bg-blue-600/30 border border-blue-500/40 px-2 py-0.5 rounded-md">
          {currentPosition}
        </span>
      </div>

      {/* Right: Overall Progress Bar */}
      <div className="flex items-center gap-3 min-w-[180px] flex-1 sm:flex-initial">
        <div className="flex-1">
          <div className="flex justify-between items-center text-[11px] mb-1">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              Board Progress
            </span>
            <span className="font-mono font-bold text-emerald-400">{currentPosition} / 100</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
