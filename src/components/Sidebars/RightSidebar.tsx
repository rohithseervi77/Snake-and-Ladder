import React from 'react';
import { 
  Play, 
  CheckCircle2, 
  Circle, 
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
  completedCount: _completedCount,
  totalAttempts,
  totalCorrect,
  accuracy,
  streak,
  recoveryStreak: _recoveryStreak,
  laddersClimbed: _laddersClimbed,
  snakesEncountered: _snakesEncountered,
  totalScore: _totalScore,
  coinBalance: _coinBalance,
  recentActivities: _recentActivities,
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
      return { 
        label: 'Optimal', 
        color: 'text-[var(--color-emerald)] bg-[var(--color-emerald-light)] border-[var(--color-emerald-border)]' 
      };
    }
    if (accuracy >= 0.5 && debt.debtPercentage <= 60) {
      return { 
        label: 'Stable', 
        color: 'text-[var(--color-cyan)] bg-[var(--color-cyan-light)] border-[var(--color-cyan-border)]' 
      };
    }
    return { 
      label: 'Needs Repair', 
      color: 'text-[var(--color-rose)] bg-[var(--color-rose-light)] border-[var(--color-rose-border)]' 
    };
  };

  const health = getHealthBadge();

  return (
    <aside className="w-full flex flex-col gap-2.5 text-[var(--text-secondary)]">
      {/* Card 1: Current Tile Focus */}
      <div className="bg-[var(--sidebar-bg)] border border-[var(--border-subtle)] rounded-2xl p-3.5 shadow-sm transition-colors duration-200">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
          Current Tile Focus
        </div>

        {/* Square Title Header */}
        <div className="flex items-start gap-2.5 mb-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#4F46E5] text-white flex items-center justify-center font-black text-sm shadow-sm shrink-0">
            {currentSquare.id}
          </div>
          <div className="min-w-0">
            <h3 className="text-xs font-bold text-[var(--text-primary)] leading-tight truncate">
              {currentSquare.title}
            </h3>
            <p className="text-[10px] text-[var(--text-secondary)] mt-0.5 line-clamp-1">
              {currentSquare.summary}
            </p>
          </div>
        </div>

        {/* Checkpoint Checklist */}
        <div className="mb-2.5 bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-xl p-2.5 shadow-inner">
          <div className="text-[9.5px] font-bold text-[var(--color-cyan)] uppercase tracking-wide mb-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[var(--color-cyan)]" />
            Checkpoint Criteria
          </div>
          <div className="flex flex-col gap-1">
            {currentSquare.checkpointTasks.slice(0, 3).map((task, idx) => (
              <div key={idx} className="flex items-start gap-1 text-[10.5px] text-[var(--text-primary)]">
                <Circle className="w-2.5 h-2.5 text-[var(--text-muted)] mt-0.5 shrink-0" />
                <span className="leading-snug truncate">{task}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Start Challenge CTA (Primary Button: Indigo) */}
        <button
          onClick={() => onStartChallenge(currentSquare.id)}
          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#4F46E5] hover:from-[#4F46E5] hover:to-[#4338CA] text-white font-black text-xs tracking-wide shadow-md shadow-[#6366F1]/20 transition-all transform active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          Solve Challenge & Move
        </button>
      </div>

      {/* Card 2: Player Statistics Panel */}
      <div className="bg-[var(--sidebar-bg)] border border-[var(--border-subtle)] rounded-2xl p-3.5 shadow-sm transition-colors duration-200">
        <h3 className="text-[10px] font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Player Statistics</span>
          <Target className="w-3 h-3 text-[var(--color-indigo)]" />
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* Tile Position (Indigo) */}
          <div className="p-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--border-subtle)] flex flex-col shadow-sm">
            <span className="text-[9px] text-[var(--text-muted)] font-semibold uppercase">Position</span>
            <span className="font-mono font-bold text-[var(--color-indigo)] text-xs mt-0.5">
              Tile {currentSquare.id}/100
            </span>
          </div>

          {/* Accuracy (Emerald) */}
          <div className="p-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--border-subtle)] flex flex-col shadow-sm">
            <span className="text-[9px] text-[var(--text-muted)] font-semibold uppercase">Accuracy</span>
            <span className="font-mono font-bold text-[var(--color-emerald)] text-xs mt-0.5">
              {(accuracy * 100).toFixed(0)}%
            </span>
          </div>

          {/* Solved vs Incorrect (Green & Rose Accents) */}
          <div className="p-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--border-subtle)] flex flex-col shadow-sm">
            <span className="text-[9px] text-[var(--text-muted)] font-semibold uppercase">Solved / Failed</span>
            <span className="font-mono font-bold text-[var(--text-primary)] text-[11px] mt-0.5">
              <span className="text-[var(--color-emerald)]">{totalCorrect}</span> / <span className="text-[var(--color-rose)]">{incorrectCount}</span>
            </span>
          </div>

          {/* Streaks (Orange Accent) */}
          <div className="p-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--border-subtle)] flex flex-col shadow-sm">
            <span className="text-[9px] text-[var(--text-muted)] font-semibold uppercase">Active Streak</span>
            <span className="font-mono font-bold text-[var(--color-orange)] text-[11px] mt-0.5 flex items-center gap-1">
              <Flame className="w-3 h-3 fill-[var(--color-orange)]" /> {streak}
            </span>
          </div>
        </div>
      </div>

      {/* Card 3: Learning Debt & Algorithm Health */}
      <div className="bg-[var(--sidebar-bg)] border border-[var(--border-subtle)] rounded-2xl p-3.5 shadow-sm flex flex-col gap-2 transition-colors duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--text-primary)] uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-[var(--color-cyan)]" />
            <span>Algorithm Health</span>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${health.color}`}>
            {health.label}
          </span>
        </div>

        {/* Learning Debt Gauge */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-xl p-2.5 flex flex-col gap-1.5 shadow-sm">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[var(--text-secondary)] font-semibold flex items-center gap-1">
              <Dna className="w-3 h-3 text-[var(--color-rose)]" /> Learning Debt
            </span>
            <span className="font-mono font-bold text-[var(--color-rose)]">
              {debt.debtPercentage}% ({debt.debtStatus})
            </span>
          </div>

          <div className="w-full bg-[var(--board-bg)] rounded-full h-1.5 overflow-hidden border border-[var(--border-subtle)]">
            <div 
              className={`h-full transition-all duration-300 ${
                debt.debtPercentage < 30 ? 'bg-[var(--color-emerald)]' :
                debt.debtPercentage < 60 ? 'bg-[var(--color-amber)]' : 'bg-[var(--color-rose)]'
              }`}
              style={{ width: `${Math.min(100, Math.max(5, debt.debtPercentage))}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-[var(--text-secondary)] mt-0.5">
            <span>{debt.totalMisconceptions} DNA mutations</span>
            {onOpenErrorDNA && (
              <button 
                onClick={onOpenErrorDNA}
                className="text-[var(--color-cyan)] hover:text-[var(--color-indigo)] font-semibold flex items-center gap-0.5 cursor-pointer"
              >
                Inspect DNA <ArrowUpRight className="w-2.5 h-2.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Card 4: Interactive DSA Labs Shortcut */}
      <div className="bg-[var(--sidebar-bg)] border border-[var(--border-subtle)] rounded-2xl p-3 shadow-sm flex flex-col gap-2 transition-colors duration-200">
        <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider px-1">
          DSA Novelty Labs
        </div>

        <div className="grid grid-cols-2 gap-2">
          {onOpenKnowledgeGraph && (
            <button
              onClick={onOpenKnowledgeGraph}
              className="p-2 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-left transition cursor-pointer flex flex-col gap-1 shadow-sm active:scale-95"
            >
              <div className="flex items-center gap-1 text-[11px] font-bold text-[var(--color-cyan)]">
                <Network className="w-3 h-3 text-[var(--color-cyan)]" /> Graph
              </div>
              <span className="text-[9px] text-[var(--text-secondary)] leading-tight">Curriculum Map</span>
            </button>
          )}

          {onOpenComplexityMeter && (
            <button
              onClick={onOpenComplexityMeter}
              className="p-2 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-left transition cursor-pointer flex flex-col gap-1 shadow-sm active:scale-95"
            >
              <div className="flex items-center gap-1 text-[11px] font-bold text-[var(--color-emerald)]">
                <Gauge className="w-3 h-3 text-[var(--color-emerald)]" /> Big-O
              </div>
              <span className="text-[9px] text-[var(--text-secondary)] leading-tight">Complexity Scale</span>
            </button>
          )}

          {onOpenWhatIfSimulator && (
            <button
              onClick={onOpenWhatIfSimulator}
              className="p-2 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-left transition cursor-pointer flex flex-col gap-1 shadow-sm active:scale-95"
            >
              <div className="flex items-center gap-1 text-[11px] font-bold text-[var(--color-violet)]">
                <Sliders className="w-3 h-3 text-[var(--color-violet)]" /> What-If
              </div>
              <span className="text-[9px] text-[var(--text-secondary)] leading-tight">Structural Sandbox</span>
            </button>
          )}

          {onOpenDecisionLab && (
            <button
              onClick={onOpenDecisionLab}
              className="p-2 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-left transition cursor-pointer flex flex-col gap-1 shadow-sm active:scale-95"
            >
              <div className="flex items-center gap-1 text-[11px] font-bold text-[var(--color-indigo)]">
                <Workflow className="w-3 h-3 text-[var(--color-indigo)]" /> Decision
              </div>
              <span className="text-[9px] text-[var(--text-secondary)] leading-tight">Scale Scenarios</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
