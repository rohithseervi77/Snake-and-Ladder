import React from 'react';
import { 
  Play, 
  CheckCircle2, 
  Circle, 
  Zap, 
  Flame, 
  Target,
  Dna,
  Activity,
  Network,
  Gauge,
  Sliders,
  Workflow,
  ArrowUpRight
} from 'lucide-react';
import { SquareMetadata } from '../../types/curriculum';
import { ActivityRecord } from '../../types/game';
import { TopicMasteryScore, MisconceptionRecord } from '../../types/evolution';
import { calculateLearningDebt } from '../../engine/errorDnaEngine';

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
  topicMasteryMap?: Record<string, TopicMasteryScore>;
  misconceptions?: MisconceptionRecord[];
  onOpenErrorDNA?: () => void;
  onOpenDecisionLab?: () => void;
  onOpenComplexityMeter?: () => void;
  onOpenWhatIfSimulator?: () => void;
  onOpenKnowledgeGraph?: () => void;
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
  onStartChallenge,
  topicMasteryMap = {},
  misconceptions = [],
  onOpenErrorDNA,
  onOpenDecisionLab,
  onOpenComplexityMeter,
  onOpenWhatIfSimulator,
  onOpenKnowledgeGraph
}) => {
  const incorrectCount = Math.max(0, totalAttempts - totalCorrect);
  const debt = calculateLearningDebt(topicMasteryMap, misconceptions);

  const getHealthBadge = () => {
    if (accuracy >= 0.8 && debt.debtPercentage <= 30) {
      return { label: 'Optimal', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-700/50' };
    }
    if (accuracy >= 0.5 && debt.debtPercentage <= 60) {
      return { label: 'Stable', color: 'text-cyan-400 bg-cyan-950/40 border-cyan-700/50' };
    }
    return { label: 'Needs Repair', color: 'text-rose-400 bg-rose-950/40 border-rose-700/50' };
  };

  const health = getHealthBadge();

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

      {/* Card 3: Learning Debt & Algorithm Health (Novelty) */}
      <div className="bg-[#10192e] border border-[#1e2d4d] rounded-xl p-3 shadow-md flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Algorithm Health</span>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${health.color}`}>
            {health.label}
          </span>
        </div>

        {/* Learning Debt Gauge */}
        <div className="bg-[#141e35] border border-[#202e4f] rounded-lg p-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Dna className="w-3 h-3 text-rose-400" /> Learning Debt
            </span>
            <span className="font-mono font-bold text-rose-300">
              {debt.debtPercentage}% ({debt.debtStatus})
            </span>
          </div>

          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                debt.debtPercentage < 30 ? 'bg-emerald-500' :
                debt.debtPercentage < 60 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${Math.min(100, Math.max(5, debt.debtPercentage))}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-0.5">
            <span>{debt.totalMisconceptions} DNA mutations</span>
            {onOpenErrorDNA && (
              <button 
                onClick={onOpenErrorDNA}
                className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-0.5 cursor-pointer"
              >
                Inspect DNA <ArrowUpRight className="w-2.5 h-2.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Card 4: Interactive DSA Labs Shortcut */}
      <div className="bg-[#10192e] border border-[#1e2d4d] rounded-xl p-2.5 shadow-md flex flex-col gap-1.5">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
          DSA Novelty Labs
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          {onOpenKnowledgeGraph && (
            <button
              onClick={onOpenKnowledgeGraph}
              className="p-2 rounded-lg bg-[#141f38] hover:bg-[#1a294c] border border-[#23355a] text-left transition cursor-pointer flex flex-col gap-1"
            >
              <div className="flex items-center gap-1 text-[11px] font-bold text-teal-300">
                <Network className="w-3 h-3 text-teal-400" /> Graph
              </div>
              <span className="text-[9px] text-slate-400 leading-tight">Curriculum Map</span>
            </button>
          )}

          {onOpenComplexityMeter && (
            <button
              onClick={onOpenComplexityMeter}
              className="p-2 rounded-lg bg-[#141f38] hover:bg-[#1a294c] border border-[#23355a] text-left transition cursor-pointer flex flex-col gap-1"
            >
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-300">
                <Gauge className="w-3 h-3 text-emerald-400" /> Big-O
              </div>
              <span className="text-[9px] text-slate-400 leading-tight">Complexity Scale</span>
            </button>
          )}

          {onOpenWhatIfSimulator && (
            <button
              onClick={onOpenWhatIfSimulator}
              className="p-2 rounded-lg bg-[#141f38] hover:bg-[#1a294c] border border-[#23355a] text-left transition cursor-pointer flex flex-col gap-1"
            >
              <div className="flex items-center gap-1 text-[11px] font-bold text-purple-300">
                <Sliders className="w-3 h-3 text-purple-400" /> What-If
              </div>
              <span className="text-[9px] text-slate-400 leading-tight">Structural Sandbox</span>
            </button>
          )}

          {onOpenDecisionLab && (
            <button
              onClick={onOpenDecisionLab}
              className="p-2 rounded-lg bg-[#141f38] hover:bg-[#1a294c] border border-[#23355a] text-left transition cursor-pointer flex flex-col gap-1"
            >
              <div className="flex items-center gap-1 text-[11px] font-bold text-blue-300">
                <Workflow className="w-3 h-3 text-blue-400" /> Decision
              </div>
              <span className="text-[9px] text-slate-400 leading-tight">Scale Scenarios</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
