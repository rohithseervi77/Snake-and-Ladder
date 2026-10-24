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
  Clock,
  Flame,
  RotateCcw,
  Coins,
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
    <aside className="w-full lg:w-72 xl:w-80 flex flex-col gap-3.5 text-slate-300">
      {/* Card 1: Current Tile Focus */}
      <div className="bg-[#10192e] border border-[#1e2d4d] rounded-2xl p-4 shadow-xl">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
          Current Tile Focus
        </div>

        {/* Square Title Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-md shadow-emerald-500/20 flex-shrink-0">
            {currentSquare.id}
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
              {currentSquare.title}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
              {currentSquare.summary}
            </p>
          </div>
        </div>

        {/* Checkpoint Checklist */}
        <div className="mb-3.5 bg-[#141f38] border border-[#223356] rounded-xl p-2.5">
          <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Checkpoint Criteria
          </div>
          <div className="flex flex-col gap-1.5">
            {currentSquare.checkpointTasks.map((task, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                <Circle className="w-3 h-3 text-slate-500 mt-0.5 flex-shrink-0" />
                <span className="leading-snug text-[11px]">{task}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Start Challenge CTA */}
        <button
          onClick={() => onStartChallenge(currentSquare.id)}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-emerald-500/20 transition-all transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          Solve Challenge & Move
        </button>
      </div>

      {/* Card 2: Player Statistics Panel */}
      <div className="bg-[#10192e] border border-[#1e2d4d] rounded-2xl p-4 shadow-xl">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5 flex items-center justify-between">
          <span>Player Statistics</span>
          <Target className="w-3.5 h-3.5 text-blue-400" />
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* Tile Position */}
          <div className="p-2 rounded-xl bg-[#141e35] border border-[#202e4f] flex flex-col">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Position</span>
            <span className="font-mono font-bold text-white text-sm mt-0.5">Tile {currentSquare.id}/100</span>
          </div>

          {/* Accuracy */}
          <div className="p-2 rounded-xl bg-[#141e35] border border-[#202e4f] flex flex-col">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Accuracy</span>
            <span className="font-mono font-bold text-emerald-400 text-sm mt-0.5">
              {(accuracy * 100).toFixed(0)}%
            </span>
          </div>

          {/* Solved vs Incorrect */}
          <div className="p-2 rounded-xl bg-[#141e35] border border-[#202e4f] flex flex-col">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Solved / Failed</span>
            <span className="font-mono font-bold text-slate-200 text-xs mt-0.5">
              <span className="text-emerald-400">{totalCorrect}</span> / <span className="text-rose-400">{incorrectCount}</span>
            </span>
          </div>

          {/* Streaks */}
          <div className="p-2 rounded-xl bg-[#141e35] border border-[#202e4f] flex flex-col">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Active Streak</span>
            <span className="font-mono font-bold text-orange-400 text-xs mt-0.5 flex items-center gap-1">
              <Flame className="w-3 h-3 fill-orange-400" /> {streak} (Best: {Math.max(streak, totalCorrect)})
            </span>
          </div>

          {/* Recovery Streak */}
          <div className="p-2 rounded-xl bg-[#141e35] border border-[#202e4f] flex flex-col">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Comeback Streak</span>
            <span className="font-mono font-bold text-cyan-400 text-xs mt-0.5 flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> {recoveryStreak}
            </span>
          </div>

          {/* Mastered Tiles */}
          <div className="p-2 rounded-xl bg-[#141e35] border border-[#202e4f] flex flex-col">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Tiles Cleared</span>
            <span className="font-mono font-bold text-blue-400 text-xs mt-0.5">
              {completedCount} / 100
            </span>
          </div>
        </div>

        {/* Economy Bar */}
        <div className="mt-2.5 pt-2 border-t border-[#1a2744] flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="w-3.5 h-3.5 fill-yellow-400/20" />
            <span>{totalScore} XP</span>
          </div>
          <div className="flex items-center gap-1 text-amber-300">
            <Coins className="w-3.5 h-3.5 fill-amber-400/20" />
            <span>{coinBalance} Coins</span>
          </div>
        </div>
      </div>

      {/* Card 3: Recent Activity */}
      <div className="bg-[#10192e] border border-[#1e2d4d] rounded-2xl p-3.5 shadow-xl flex-1">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Recent Activity</span>
          <Clock className="w-3.5 h-3.5 text-slate-500" />
        </h3>

        <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
          {recentActivities.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-1">No recent activity recorded.</p>
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

      {/* Sticky Note Banner */}
      <div className="p-3 rounded-2xl bg-[#1a1c23] border border-amber-500/40 text-amber-200 shadow-md flex items-center justify-between">
        <span className="font-serif italic text-xs">
          &ldquo;Small steps build big skills!&rdquo;
        </span>
        <Crown className="w-4 h-4 text-amber-400" />
      </div>
    </aside>
  );
};
