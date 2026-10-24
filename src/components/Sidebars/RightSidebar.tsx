import React from 'react';
import { 
  Play, 
  CheckCircle2, 
  Circle, 
  Zap, 
  Flame, 
  Target
} from 'lucide-react';
import { SquareMetadata } from '../../types/curriculum';
import { ActivityRecord } from '../../types/game';

interface RightSidebarProps {
  currentSquare: SquareMetadata;
  completedCount: number;
  totalAttempts: number;
  totalCorrect: number;
  accuracy: number;
  streak: number;
  recoveryStreak: number;
  laddersClimbed: number;
  snakesEncountered: number;
  totalScore: number;
  coinBalance: number;
  recentActivities: ActivityRecord[];
  onStartChallenge: (squareId: number) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  currentSquare,
  completedCount,
  totalAttempts,
  totalCorrect,
  accuracy,
  streak,
  recoveryStreak,
  laddersClimbed,
  snakesEncountered,
  totalScore,
  coinBalance,
  recentActivities,
  onStartChallenge
}) => {
  const incorrectCount = Math.max(0, totalAttempts - totalCorrect);

  return (
    <aside className="w-full flex flex-col gap-2.5 text-slate-300">
      {/* Card 1: Current Tile Focus */}
      <div className="bg-[#10192e] border border-[#1e2d4d] rounded-xl p-3 shadow-md">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
          Current Tile Focus
        </div>

        {/* Square Title Header */}
        <div className="flex items-start gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-sm shadow-sm shrink-0">
            {currentSquare.id}
          </div>
          <div className="min-w-0">
            <h3 className="text-xs font-bold text-white leading-tight truncate">
              {currentSquare.title}
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
              {currentSquare.summary}
            </p>
          </div>
        </div>

        {/* Checkpoint Checklist */}
        <div className="mb-2.5 bg-[#141f38] border border-[#223356] rounded-lg p-2">
          <div className="text-[9px] font-bold text-emerald-400 uppercase tracking-wide mb-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Checkpoint Criteria
          </div>
          <div className="flex flex-col gap-1">
            {currentSquare.checkpointTasks.slice(0, 3).map((task, idx) => (
              <div key={idx} className="flex items-start gap-1 text-[10.5px] text-slate-300">
                <Circle className="w-2.5 h-2.5 text-slate-500 mt-0.5 shrink-0" />
                <span className="leading-snug truncate">{task}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Start Challenge CTA */}
        <button
          onClick={() => onStartChallenge(currentSquare.id)}
          className="w-full py-1.5 px-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs tracking-wide shadow-md shadow-emerald-500/20 transition-all transform active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-slate-950" />
          Solve Challenge & Move
        </button>
      </div>

      {/* Card 2: Player Statistics Panel */}
      <div className="bg-[#10192e] border border-[#1e2d4d] rounded-xl p-3 shadow-md">
        <h3 className="text-[10px] font-bold text-white uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Player Statistics</span>
          <Target className="w-3 h-3 text-blue-400" />
        </h3>

        <div className="grid grid-cols-2 gap-1.5 text-xs">
          {/* Tile Position */}
          <div className="p-1.5 rounded-lg bg-[#141e35] border border-[#202e4f] flex flex-col">
            <span className="text-[9px] text-slate-400 font-semibold uppercase">Position</span>
            <span className="font-mono font-bold text-white text-xs mt-0.5">Tile {currentSquare.id}/100</span>
          </div>

          {/* Accuracy */}
          <div className="p-1.5 rounded-lg bg-[#141e35] border border-[#202e4f] flex flex-col">
            <span className="text-[9px] text-slate-400 font-semibold uppercase">Accuracy</span>
            <span className="font-mono font-bold text-emerald-400 text-xs mt-0.5">
              {(accuracy * 100).toFixed(0)}%
            </span>
          </div>

          {/* Solved vs Incorrect */}
          <div className="p-1.5 rounded-lg bg-[#141e35] border border-[#202e4f] flex flex-col">
            <span className="text-[9px] text-slate-400 font-semibold uppercase">Solved / Failed</span>
            <span className="font-mono font-bold text-slate-200 text-[11px] mt-0.5">
              <span className="text-emerald-400">{totalCorrect}</span> / <span className="text-rose-400">{incorrectCount}</span>
            </span>
          </div>

          {/* Streaks */}
          <div className="p-1.5 rounded-lg bg-[#141e35] border border-[#202e4f] flex flex-col">
            <span className="text-[9px] text-slate-400 font-semibold uppercase">Active Streak</span>
            <span className="font-mono font-bold text-orange-400 text-[11px] mt-0.5 flex items-center gap-1">
              <Flame className="w-3 h-3 fill-orange-400" /> {streak}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
