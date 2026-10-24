import React from 'react';
import { 
  Play, 
  CheckCircle2, 
  Circle, 
  Layers, 
  Zap, 
  AlertTriangle, 
  Star, 
  Crown,
  Clock
} from 'lucide-react';
import { SquareMetadata } from '../../types/curriculum';
import { ActivityRecord } from '../../types/game';

interface RightSidebarProps {
  currentSquare: SquareMetadata;
  completedCount: number;
  laddersClimbed: number;
  snakesEncountered: number;
  totalScore: number;
  recentActivities: ActivityRecord[];
  onStartChallenge: (squareId: number) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  currentSquare,
  completedCount,
  laddersClimbed,
  snakesEncountered,
  totalScore,
  recentActivities,
  onStartChallenge
}) => {
  return (
    <aside className="w-full lg:w-72 xl:w-80 flex flex-col gap-4 text-slate-300">
      {/* Card 1: Current Square Focus */}
      <div className="bg-[#10192e] border border-[#1e2d4d] rounded-2xl p-4 shadow-xl">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
          Current Square
        </div>

        {/* Square Title Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-md shadow-emerald-500/20 flex-shrink-0">
            {currentSquare.id}
          </div>
          <div>
            <h3 className="text-base font-bold text-white leading-tight">
              {currentSquare.title}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
              {currentSquare.summary}
            </p>
          </div>
        </div>

        {/* Checkpoint Checklist */}
        <div className="mb-4 bg-[#141f38] border border-[#223356] rounded-xl p-3">
          <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Checkpoint Criteria
          </div>
          <div className="flex flex-col gap-2">
            {currentSquare.checkpointTasks.map((task, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <Circle className="w-3.5 h-3.5 text-slate-500 mt-0.5 flex-shrink-0" />
                <span className="leading-snug">{task}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Start Challenge CTA */}
        <button
          onClick={() => onStartChallenge(currentSquare.id)}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-emerald-500/20 transition-all transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          Start Challenge
        </button>
      </div>

      {/* Card 2: Your Progress */}
      <div className="bg-[#10192e] border border-[#1e2d4d] rounded-2xl p-4 shadow-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
          Your Progress
        </h3>

        <div className="flex flex-col gap-2.5 text-xs">
          {/* Concepts Cleared */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#141e35] border border-[#202e4f]">
            <div className="flex items-center gap-2 text-slate-300">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Concepts Cleared</span>
            </div>
            <span className="font-mono font-bold text-white">{completedCount} / 100</span>
          </div>

          {/* Ladders Climbed */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#141e35] border border-[#202e4f]">
            <div className="flex items-center gap-2 text-slate-300">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Ladders Climbed</span>
            </div>
            <span className="font-mono font-bold text-amber-400">{laddersClimbed}</span>
          </div>

          {/* Snakes Fallen */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#141e35] border border-[#202e4f]">
            <div className="flex items-center gap-2 text-slate-300">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Snakes Fallen</span>
            </div>
            <span className="font-mono font-bold text-rose-400">{snakesEncountered}</span>
          </div>

          {/* Total Score */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#141e35] border border-[#202e4f]">
            <div className="flex items-center gap-2 text-slate-300">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400/30" />
              <span>Total Score</span>
            </div>
            <span className="font-mono font-bold text-yellow-400">{totalScore}</span>
          </div>
        </div>
      </div>

      {/* Card 3: Recent Activity */}
      <div className="bg-[#10192e] border border-[#1e2d4d] rounded-2xl p-4 shadow-xl flex-1">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center justify-between">
          <span>Recent Activity</span>
          <Clock className="w-3.5 h-3.5 text-slate-500" />
        </h3>

        <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
          {recentActivities.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No recent activity recorded.</p>
          ) : (
            recentActivities.map(act => (
              <div 
                key={act.id} 
                className="p-2 rounded-lg bg-[#131d33] border border-[#1e2a44] text-[11px] flex flex-col gap-0.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200 truncate pr-2">
                    {act.title}
                  </span>
                  {act.scoreDelta > 0 && (
                    <span className="text-[10px] font-bold text-emerald-400">
                      +{act.scoreDelta} XP
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 truncate">{act.detail}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Card 4: Sticky Note Banner */}
      <div className="p-3.5 rounded-2xl bg-[#1a1c23] border border-amber-500/40 text-amber-200 shadow-md flex items-center justify-between">
        <span className="font-serif italic text-xs">
          &ldquo;Small steps build big skills!&rdquo;
        </span>
        <Crown className="w-4 h-4 text-amber-400" />
      </div>
    </aside>
  );
};
