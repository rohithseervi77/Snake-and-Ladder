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
      className="w-full mx-auto px-2.5 py-1 bg-[#111827] border border-[#263449] rounded-lg flex items-center justify-between gap-2 text-xs shrink-0"
      style={{ maxWidth: 'min(100%, calc(100vh - 200px), 680px)' }}
    >
      {/* Left: Autoplay status */}
      <div className="flex items-center gap-1.5 shrink-0">
        <Bot className={`w-3.5 h-3.5 ${isRunning ? 'text-[#22D3EE] animate-pulse' : 'text-[#64748B]'}`} />
        <span className="text-[11px] font-bold text-[#94A3B8]">
          Autoplay
        </span>
        {isRunning && (
          <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-bold border ${
            isPaused ? 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/40' : 'bg-[#2563EB]/20 text-[#22D3EE] border-[#2563EB]/40'
          }`}>
            {isPaused ? 'PAUSED' : 'LIVE'}
          </span>
        )}
      </div>

      {/* Center: Controls */}
      <div className="flex items-center gap-1 shrink-0">
        {!isRunning ? (
          <button
            onClick={onStart}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#2563EB] hover:bg-[#1d4ed8] text-[#F8FAFC] font-bold text-[10.5px] transition shadow cursor-pointer"
          >
            <Play className="w-2.5 h-2.5 fill-white" /> Start
          </button>
        ) : (
          <>
            {isPaused ? (
              <button
                onClick={onResume}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#10B981] hover:bg-[#059669] text-[#F8FAFC] font-bold text-[10.5px] transition cursor-pointer"
              >
                <Play className="w-2.5 h-2.5 fill-white" /> Resume
              </button>
            ) : (
              <button
                onClick={onPause}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#F59E0B] hover:bg-[#d97706] text-[#080D1A] font-bold text-[10.5px] transition cursor-pointer"
              >
                <Pause className="w-2.5 h-2.5 fill-current" /> Pause
              </button>
            )}

            <button
              onClick={onStop}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#F43F5E] hover:bg-[#e11d48] text-[#F8FAFC] font-bold text-[10.5px] transition cursor-pointer"
            >
              <Square className="w-2.5 h-2.5 fill-white" /> Stop
            </button>
          </>
        )}
      </div>

      {/* Right: Speed Toggles */}
      <div className="flex items-center gap-1 text-[10px] font-mono shrink-0">
        <span className="text-[#64748B] hidden sm:inline">Speed:</span>
        {([1, 2, 4] as AutoplaySpeed[]).map((spd) => (
          <button
            key={spd}
            onClick={() => onSetSpeed(spd)}
            className={`px-1.5 py-0.5 rounded font-bold transition cursor-pointer ${
              speed === spd
                ? 'bg-[#2563EB] text-[#F8FAFC] shadow-sm'
                : 'bg-[#080D1A] text-[#94A3B8] border border-[#263449] hover:bg-[#172033] hover:text-[#F8FAFC]'
            }`}
          >
            {spd}x
          </button>
        ))}
      </div>
    </div>
  );
};
