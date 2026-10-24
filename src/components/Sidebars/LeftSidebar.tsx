import React from 'react';
import { 
  Dices, 
  Sparkles, 
  Flag, 
  HelpCircle, 
  Layers, 
  Zap, 
  AlertTriangle 
} from 'lucide-react';

export const LeftSidebar: React.FC = () => {
  return (
    <aside className="w-full lg:w-64 xl:w-72 flex flex-col gap-4 text-slate-300">
      {/* Card 1: How It Works */}
      <div className="bg-[#10192e] border border-[#1e2d4d] rounded-2xl p-4 shadow-lg">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3.5 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-blue-400" />
          How It Works
        </h2>
        
        <div className="flex flex-col gap-3">
          {/* Step 1 */}
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 font-bold text-xs flex items-center justify-center border border-blue-500/40">
              1
            </span>
            <div>
              <p className="text-xs font-semibold text-white">Roll the dice</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Move forward on the 100-square serpentine board.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600/30 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/40">
              2
            </span>
            <div>
              <p className="text-xs font-semibold text-white">Pass the checkpoint</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Solve a concept, dry-run code, or analyze time/space complexity.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-600/30 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/40">
              3
            </span>
            <div>
              <p className="text-xs font-semibold text-white">Climb the ladder</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Refactor a brute-force solution into an optimal one!
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-600/30 text-rose-400 font-bold text-xs flex items-center justify-center border border-rose-500/40">
              4
            </span>
            <div>
              <p className="text-xs font-semibold text-white">Avoid the snake</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Fix a runtime bug or handle edge cases &mdash; or slide down!
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600/30 text-purple-400 font-bold text-xs flex items-center justify-center border border-purple-500/40">
              5
            </span>
            <div>
              <p className="text-xs font-semibold text-white">Reach 100</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Master DSA, one square at a time, to conquer interviews.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Legend */}
      <div className="bg-[#10192e] border border-[#1e2d4d] rounded-2xl p-4 shadow-lg">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          Legend
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-md bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 text-[10px] font-bold">
              ✓
            </span>
            <span className="text-slate-300">Normal Square (Concept)</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-md bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 font-bold">
              <Zap className="w-3.5 h-3.5" />
            </span>
            <span className="text-slate-300">Ladder (Optimization Leap)</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-md bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-400 font-bold">
              <AlertTriangle className="w-3.5 h-3.5" />
            </span>
            <span className="text-slate-300">Snake (Debugging Trap)</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-md bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400 font-bold">
              <Dices className="w-3.5 h-3.5" />
            </span>
            <span className="text-slate-300">Dice Roll (Move Forward)</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-md bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center text-yellow-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-slate-300">Current Position</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-md bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center text-indigo-400 font-bold">
              <Flag className="w-3.5 h-3.5" />
            </span>
            <span className="text-slate-300">Start / Finish</span>
          </div>
        </div>
      </div>

      {/* Quote Banner */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border border-blue-900/30 text-center">
        <p className="text-xs italic text-blue-300 font-serif">
          &ldquo;Not just coding... but leveling up!&rdquo;
        </p>
      </div>
    </aside>
  );
};
