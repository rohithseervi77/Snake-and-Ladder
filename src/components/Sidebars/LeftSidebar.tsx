import React from 'react';
import { 
  Dices, 
  Sparkles, 
  Flag, 
  HelpCircle, 
  Layers, 
  Zap, 
  AlertTriangle,
  BookOpen
} from 'lucide-react';

export const LeftSidebar: React.FC = () => {
  return (
    <aside className="w-full flex flex-col gap-2.5 text-[var(--text-secondary)]">
      {/* Card 1: How It Works */}
      <div className="bg-[var(--sidebar-bg)] border border-[var(--border-subtle)] rounded-2xl p-3.5 shadow-sm transition-colors duration-200">
        <h2 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-[var(--color-indigo)]" />
          How It Works
        </h2>
        
        <div className="flex flex-col gap-2.5">
          {/* Step 1 */}
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-indigo-light)] text-[var(--color-indigo)] font-bold text-[10px] flex items-center justify-center border border-[var(--color-indigo-border)]">
              1
            </span>
            <div>
              <p className="text-[11px] font-bold text-[var(--text-primary)] leading-tight">Roll the dice</p>
              <p className="text-[10px] text-[var(--text-secondary)] leading-tight mt-0.5">
                Move forward along the 100-square serpentine board.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-cyan-light)] text-[var(--color-cyan)] font-bold text-[10px] flex items-center justify-center border border-[var(--color-cyan-border)]">
              2
            </span>
            <div>
              <p className="text-[11px] font-bold text-[var(--text-primary)] leading-tight">Solve DSA Challenges</p>
              <p className="text-[10px] text-[var(--text-secondary)] leading-tight mt-0.5">
                Answer asymptotic dry-runs, recurrences, pointers & invariants.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-amber-light)] text-[var(--color-amber)] font-bold text-[10px] flex items-center justify-center border border-[var(--color-amber-border)]">
              3
            </span>
            <div>
              <p className="text-[11px] font-bold text-[var(--text-primary)] leading-tight">Climb Ladders</p>
              <p className="text-[10px] text-[var(--text-secondary)] leading-tight mt-0.5">
                Advance forward with optimal algorithmic leaps and speedups.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-rose-light)] text-[var(--color-rose)] font-bold text-[10px] flex items-center justify-center border border-[var(--color-rose-border)]">
              4
            </span>
            <div>
              <p className="text-[11px] font-bold text-[var(--text-primary)] leading-tight">Avoid Snake Traps</p>
              <p className="text-[10px] text-[var(--text-secondary)] leading-tight mt-0.5">
                Overcome common misconceptions or slide down to rebuild basics.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-emerald-light)] text-[var(--color-emerald)] font-bold text-[10px] flex items-center justify-center border border-[var(--color-emerald-border)]">
              5
            </span>
            <div>
              <p className="text-[11px] font-bold text-[var(--text-primary)] leading-tight">Master Tile 100</p>
              <p className="text-[10px] text-[var(--text-secondary)] leading-tight mt-0.5">
                Complete the syllabus capstone to earn academic mastery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Syllabus Units Breakdown */}
      <div className="bg-[var(--sidebar-bg)] border border-[var(--border-subtle)] rounded-2xl p-3.5 shadow-sm transition-colors duration-200">
        <h2 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-[var(--color-cyan)]" />
          Syllabus Units
        </h2>

        <div className="flex flex-col gap-2 text-[11px]">
          <div className="flex items-center justify-between p-1.5 rounded-lg bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
            <span className="font-bold text-[var(--color-emerald)]">CO1: Math & Recurrences</span>
            <span className="font-mono text-[10px] text-[var(--text-secondary)] font-bold">Tiles 1–40</span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded-lg bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
            <span className="font-bold text-[var(--color-cyan)]">CO2: Stacks, Queues & Lists</span>
            <span className="font-mono text-[10px] text-[var(--text-secondary)] font-bold">Tiles 41–70</span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded-lg bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
            <span className="font-bold text-[var(--color-indigo)]">CO3: Sorting & Searching</span>
            <span className="font-mono text-[10px] text-[var(--text-secondary)] font-bold">Tiles 71–80</span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded-lg bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
            <span className="font-bold text-[var(--color-violet)]">CO4: Trees & Graphs</span>
            <span className="font-mono text-[10px] text-[var(--text-secondary)] font-bold">Tiles 81–100</span>
          </div>
        </div>
      </div>

      {/* Card 3: Board Legend */}
      <div className="bg-[var(--sidebar-bg)] border border-[var(--border-subtle)] rounded-2xl p-3.5 shadow-sm transition-colors duration-200">
        <h2 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[var(--color-amber)]" />
          Board Legend
        </h2>

        <div className="grid grid-cols-1 gap-2 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-[var(--color-cyan-light)] border border-[var(--color-cyan-border)] flex items-center justify-center text-[var(--color-cyan)] text-[9px] font-bold">
              ✓
            </span>
            <span className="text-[var(--text-primary)] font-medium">Concept Checkpoint</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-[var(--color-amber-light)] border border-[var(--color-amber-border)] flex items-center justify-center text-[var(--color-amber)] font-bold">
              <Zap className="w-3 h-3" />
            </span>
            <span className="text-[var(--text-primary)] font-medium">Algorithm Ladder</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-[var(--color-rose-light)] border border-[var(--color-rose-border)] flex items-center justify-center text-[var(--color-rose)] font-bold">
              <AlertTriangle className="w-3 h-3" />
            </span>
            <span className="text-[var(--text-primary)] font-medium">Misconception Snake</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-[var(--color-violet-light)] border border-[var(--color-violet-border)] flex items-center justify-center text-[var(--color-violet)] font-bold">
              <Dices className="w-3 h-3" />
            </span>
            <span className="text-[var(--text-primary)] font-medium">Dice Roll Movement</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-[var(--color-indigo-light)] border border-[var(--color-indigo-border)] flex items-center justify-center text-[var(--color-indigo)] font-bold">
              <Sparkles className="w-3 h-3" />
            </span>
            <span className="text-[var(--text-primary)] font-medium">Current Position</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-[var(--color-emerald-light)] border border-[var(--color-emerald-border)] flex items-center justify-center text-[var(--color-emerald)] font-bold">
              <Flag className="w-3 h-3" />
            </span>
            <span className="text-[var(--text-primary)] font-medium">Start (1) / Finish (100)</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
