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
      return { label: 'Optimal', color: 'text-[#10B981] bg-[#10B981]/15 border-[#10B981]/50' };
    }
    if (accuracy >= 0.5 && debt.debtPercentage <= 60) {
      return { label: 'Stable', color: 'text-[#22D3EE] bg-[#22D3EE]/15 border-[#22D3EE]/50' };
    }
    return { label: 'Needs Repair', color: 'text-[#F43F5E] bg-[#F43F5E]/15 border-[#F43F5E]/50' };
  };

  const health = getHealthBadge();

  return (
    <aside className="w-full flex flex-col gap-2.5 text-[#94A3B8]">
      {/* Card 1: Current Tile Focus */}
      <div className="bg-[#111827] border border-[#263449] rounded-xl p-3 shadow-md">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">
          Current Tile Focus
        </div>

        {/* Square Title Header */}
        <div className="flex items-start gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[#2563EB] text-[#F8FAFC] flex items-center justify-center font-black text-sm shadow-sm shrink-0">
            {currentSquare.id}
          </div>
          <div className="min-w-0">
            <h3 className="text-xs font-bold text-[#F8FAFC] leading-tight truncate">
              {currentSquare.title}
            </h3>
            <p className="text-[10px] text-[#94A3B8] mt-0.5 line-clamp-1">
              {currentSquare.summary}
            </p>
          </div>
        </div>

        {/* Checkpoint Checklist */}
        <div className="mb-2.5 bg-[#172033] border border-[#263449] rounded-lg p-2">
          <div className="text-[9px] font-bold text-[#22D3EE] uppercase tracking-wide mb-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#22D3EE]" />
            Checkpoint Criteria
          </div>
          <div className="flex flex-col gap-1">
            {currentSquare.checkpointTasks.slice(0, 3).map((task, idx) => (
              <div key={idx} className="flex items-start gap-1 text-[10.5px] text-[#CBD5E1]">
                <Circle className="w-2.5 h-2.5 text-[#64748B] mt-0.5 shrink-0" />
                <span className="leading-snug truncate">{task}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Start Challenge CTA (Primary Button: Electric Blue) */}
        <button
          onClick={() => onStartChallenge(currentSquare.id)}
          className="w-full py-2 px-3 rounded-lg bg-[#2563EB] hover:bg-[#3B82F6] text-[#F8FAFC] font-black text-xs tracking-wide shadow-md shadow-[#2563EB]/25 transition-all transform active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-[#F8FAFC]" />
          Solve Challenge & Move
        </button>
      </div>

      {/* Card 2: Player Statistics Panel */}
      <div className="bg-[#111827] border border-[#263449] rounded-xl p-3 shadow-md">
        <h3 className="text-[10px] font-bold text-[#F8FAFC] uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Player Statistics</span>
          <Target className="w-3 h-3 text-[#22D3EE]" />
        </h3>

        <div className="grid grid-cols-2 gap-1.5 text-xs">
          {/* Tile Position */}
          <div className="p-2 rounded-lg bg-[#080D1A] border border-[#263449] flex flex-col">
            <span className="text-[9px] text-[#94A3B8] font-semibold uppercase">Position</span>
            <span className="font-mono font-bold text-[#F8FAFC] text-xs mt-0.5">Tile {currentSquare.id}/100</span>
          </div>

          {/* Accuracy (Cyan Accent) */}
          <div className="p-2 rounded-lg bg-[#080D1A] border border-[#263449] flex flex-col">
            <span className="text-[9px] text-[#94A3B8] font-semibold uppercase">Accuracy</span>
            <span className="font-mono font-bold text-[#22D3EE] text-xs mt-0.5">
              {(accuracy * 100).toFixed(0)}%
            </span>
          </div>

          {/* Solved vs Incorrect (Green & Rose Accents) */}
          <div className="p-2 rounded-lg bg-[#080D1A] border border-[#263449] flex flex-col">
            <span className="text-[9px] text-[#94A3B8] font-semibold uppercase">Solved / Failed</span>
            <span className="font-mono font-bold text-[#F8FAFC] text-[11px] mt-0.5">
              <span className="text-[#10B981]">{totalCorrect}</span> / <span className="text-[#F43F5E]">{incorrectCount}</span>
            </span>
          </div>

          {/* Streaks (Amber Accent) */}
          <div className="p-2 rounded-lg bg-[#080D1A] border border-[#263449] flex flex-col">
            <span className="text-[9px] text-[#94A3B8] font-semibold uppercase">Active Streak</span>
            <span className="font-mono font-bold text-[#F59E0B] text-[11px] mt-0.5 flex items-center gap-1">
              <Flame className="w-3 h-3 fill-[#F59E0B]" /> {streak}
            </span>
          </div>
        </div>
      </div>

      {/* Card 3: Learning Debt & Algorithm Health */}
      <div className="bg-[#111827] border border-[#263449] rounded-xl p-3 shadow-md flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#F8FAFC] uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>Algorithm Health</span>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${health.color}`}>
            {health.label}
          </span>
        </div>

        {/* Learning Debt Gauge */}
        <div className="bg-[#080D1A] border border-[#263449] rounded-lg p-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#94A3B8] font-semibold flex items-center gap-1">
              <Dna className="w-3 h-3 text-[#F43F5E]" /> Learning Debt
            </span>
            <span className="font-mono font-bold text-[#F43F5E]">
              {debt.debtPercentage}% ({debt.debtStatus})
            </span>
          </div>

          <div className="w-full bg-[#0B1220] rounded-full h-1.5 overflow-hidden border border-[#263449]">
            <div 
              className={`h-full transition-all duration-300 ${
                debt.debtPercentage < 30 ? 'bg-[#10B981]' :
                debt.debtPercentage < 60 ? 'bg-[#F59E0B]' : 'bg-[#F43F5E]'
              }`}
              style={{ width: `${Math.min(100, Math.max(5, debt.debtPercentage))}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#94A3B8] mt-0.5">
            <span>{debt.totalMisconceptions} DNA mutations</span>
            {onOpenErrorDNA && (
              <button 
                onClick={onOpenErrorDNA}
                className="text-[#22D3EE] hover:text-[#38BDF8] font-semibold flex items-center gap-0.5 cursor-pointer"
              >
                Inspect DNA <ArrowUpRight className="w-2.5 h-2.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Card 4: Interactive DSA Labs Shortcut */}
      <div className="bg-[#111827] border border-[#263449] rounded-xl p-2.5 shadow-md flex flex-col gap-1.5">
        <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider px-1">
          DSA Novelty Labs
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          {onOpenKnowledgeGraph && (
            <button
              onClick={onOpenKnowledgeGraph}
              className="p-2 rounded-lg bg-[#172033] hover:bg-[#1E293B] border border-[#263449] text-left transition cursor-pointer flex flex-col gap-1"
            >
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#22D3EE]">
                <Network className="w-3 h-3 text-[#22D3EE]" /> Graph
              </div>
              <span className="text-[9px] text-[#94A3B8] leading-tight">Curriculum Map</span>
            </button>
          )}

          {onOpenComplexityMeter && (
            <button
              onClick={onOpenComplexityMeter}
              className="p-2 rounded-lg bg-[#172033] hover:bg-[#1E293B] border border-[#263449] text-left transition cursor-pointer flex flex-col gap-1"
            >
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#10B981]">
                <Gauge className="w-3 h-3 text-[#10B981]" /> Big-O
              </div>
              <span className="text-[9px] text-[#94A3B8] leading-tight">Complexity Scale</span>
            </button>
          )}

          {onOpenWhatIfSimulator && (
            <button
              onClick={onOpenWhatIfSimulator}
              className="p-2 rounded-lg bg-[#172033] hover:bg-[#1E293B] border border-[#263449] text-left transition cursor-pointer flex flex-col gap-1"
            >
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#8B5CF6]">
                <Sliders className="w-3 h-3 text-[#8B5CF6]" /> What-If
              </div>
              <span className="text-[9px] text-[#94A3B8] leading-tight">Structural Sandbox</span>
            </button>
          )}

          {onOpenDecisionLab && (
            <button
              onClick={onOpenDecisionLab}
              className="p-2 rounded-lg bg-[#172033] hover:bg-[#1E293B] border border-[#263449] text-left transition cursor-pointer flex flex-col gap-1"
            >
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#2563EB]">
                <Workflow className="w-3 h-3 text-[#2563EB]" /> Decision
              </div>
              <span className="text-[9px] text-[#94A3B8] leading-tight">Scale Scenarios</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
