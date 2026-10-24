import React from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  Bot 
} from 'lucide-react';
import { AutoplaySpeed } from '../../types/game';

interface AutoplayBarProps {
  isRunning: boolean;
  isPaused: boolean;
  speed: AutoplaySpeed;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onSetSpeed: (speed: AutoplaySpeed) => void;
}

export const AutoplayBar: React.FC<AutoplayBarProps> = ({
  isRunning,
  isPaused,
  speed,
  onStart,
  onPause,
  onResume,
  onStop,
  onSetSpeed
}) => {
  return (
    <div 
      className="w-full mx-auto px-2.5 py-1 bg-[#0c1424] border border-[#1e2a44] rounded-lg flex items-center justify-between gap-2 text-xs shrink-0"
      style={{ maxWidth: 'min(100%, calc(100vh - 200px), 680px)' }}
    >
      {/* Left: Autoplay status */}
      <div className="flex items-center gap-1.5 shrink-0">
        <Bot className={`w-3.5 h-3.5 ${isRunning ? 'text-indigo-400 animate-pulse' : 'text-slate-400'}`} />
        <span className="text-[11px] font-bold text-slate-300">
          Autoplay
        </span>
        {isRunning && (
          <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
            {isPaused ? 'PAUSED' : 'LIVE'}
          </span>
        )}
      </div>

      {/* Center: Controls */}
      <div className="flex items-center gap-1 shrink-0">
        {!isRunning ? (
          <button
            onClick={onStart}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10.5px] transition shadow cursor-pointer"
          >
            <Play className="w-2.5 h-2.5 fill-white" /> Start
          </button>
        ) : (
          <>
            {isPaused ? (
              <button
                onClick={onResume}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10.5px] transition cursor-pointer"
              >
                <Play className="w-2.5 h-2.5 fill-white" /> Resume
              </button>
            ) : (
              <button
                onClick={onPause}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-600 hover:bg-amber-500 text-white font-bold text-[10.5px] transition cursor-pointer"
              >
                <Pause className="w-2.5 h-2.5 fill-white" /> Pause
              </button>
            )}

            <button
              onClick={onStop}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10.5px] transition cursor-pointer"
            >
              <Square className="w-2.5 h-2.5 fill-white" /> Stop
            </button>
          </>
        )}
      </div>

      {/* Right: Speed Toggles */}
      <div className="flex items-center gap-1 text-[10px] font-mono shrink-0">
        <span className="text-slate-400 hidden sm:inline">Speed:</span>
        {([1, 2, 4] as AutoplaySpeed[]).map((spd) => (
          <button
            key={spd}
            onClick={() => onSetSpeed(spd)}
            className={`px-1.5 py-0.5 rounded font-bold transition cursor-pointer ${
              speed === spd
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {spd}x
          </button>
        ))}
      </div>
    </div>
  );
};
