import React from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  Gauge, 
  Bot, 
  Sparkles 
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
    <div className="w-full max-w-[850px] mx-auto mt-2 px-3 py-2 bg-[#0c1424] border border-[#1e2a44] rounded-xl flex flex-wrap items-center justify-between gap-2.5 text-xs">
      {/* Left: Mode Title */}
      <div className="flex items-center gap-2">
        <div className={`p-1.5 rounded-lg ${isRunning ? 'bg-indigo-600/30 text-indigo-400 border border-indigo-500/40' : 'bg-slate-800 text-slate-400'}`}>
          <Bot className="w-4 h-4" />
        </div>
        <div>
          <div className="font-bold text-slate-200 flex items-center gap-1.5">
            Autoplay Demonstration
            {isRunning && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[9px] font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                LIVE DEMO
              </span>
            )}
          </div>
          <div className="text-[10px] text-slate-500">
            {isRunning ? 'Real-time board demonstration (0 XP awarded)' : 'Demonstrates 1-100 serpentine gameplay'}
          </div>
        </div>
      </div>

      {/* Center: Play/Pause/Stop Buttons */}
      <div className="flex items-center gap-1.5">
        {!isRunning ? (
          <button
            onClick={onStart}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition cursor-pointer shadow-md shadow-indigo-600/20"
          >
            <Play className="w-3.5 h-3.5" />
            Start Autoplay
          </button>
        ) : isPaused ? (
          <button
            onClick={onResume}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            Resume
          </button>
        ) : (
          <button
            onClick={onPause}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold transition cursor-pointer"
          >
            <Pause className="w-3.5 h-3.5" />
            Pause
          </button>
        )}

        {isRunning && (
          <button
            onClick={onStop}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-800/60 text-rose-300 font-semibold transition cursor-pointer"
          >
            <Square className="w-3.5 h-3.5" />
            Stop
          </button>
        )}
      </div>

      {/* Right: Speed Selector */}
      <div className="flex items-center gap-1.5 bg-[#131d33] px-2 py-1 rounded-lg border border-[#233352]">
        <Gauge className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[11px] text-slate-400 font-medium">Speed:</span>
        {([1, 2, 4] as AutoplaySpeed[]).map(s => (
          <button
            key={s}
            onClick={() => onSetSpeed(s)}
            className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
              speed === s 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  );
};
