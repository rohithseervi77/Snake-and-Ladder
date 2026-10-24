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
    <aside className="w-full flex flex-col gap-2.5 text-slate-300">
      {/* Card 1: How It Works */}
      <div className="bg-[#10192e] border border-[#1e2d4d] rounded-xl p-3 shadow-md">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
          How It Works
        </h2>
        
        <div className="flex flex-col gap-2">
          {/* Step 1 */}
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 font-bold text-[10px] flex items-center justify-center border border-blue-500/40">
              1
            </span>
            <div>
              <p className="text-[11px] font-semibold text-white leading-tight">Roll the dice</p>
              <p className="text-[10px] text-slate-400 leading-tight">
                Move forward on 100-square serpentine board.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-400 font-bold text-[10px] flex items-center justify-center border border-emerald-500/40">
              2
            </span>
            <div>
              <p className="text-[11px] font-semibold text-white leading-tight">Pass the checkpoint</p>
              <p className="text-[10px] text-slate-400 leading-tight">
                Solve concepts, dry-run code, or analyze complexity.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-600/30 text-amber-400 font-bold text-[10px] flex items-center justify-center border border-amber-500/40">
              3
            </span>
            <div>
              <p className="text-[11px] font-semibold text-white leading-tight">Climb the ladder</p>
              <p className="text-[10px] text-slate-400 leading-tight">
                Refactor brute-force solutions into optimal algorithms.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-600/30 text-rose-400 font-bold text-[10px] flex items-center justify-center border border-rose-500/40">
              4
            </span>
            <div>
              <p className="text-[11px] font-semibold text-white leading-tight">Avoid the snake</p>
              <p className="text-[10px] text-slate-400 leading-tight">
                Fix runtime bugs or handle edge cases &mdash; or slide down!
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600/30 text-purple-400 font-bold text-[10px] flex items-center justify-center border border-purple-500/40">
              5
            </span>
            <div>
              <p className="text-[11px] font-semibold text-white leading-tight">Reach 100</p>
              <p className="text-[10px] text-slate-400 leading-tight">
                Conquer 100 DSA squares to master tech interviews.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Legend */}
      <div className="bg-[#10192e] border border-[#1e2d4d] rounded-xl p-3 shadow-md">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          Legend
        </h2>

        <div className="grid grid-cols-1 gap-1.5 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 text-[9px] font-bold">
              ✓
            </span>
            <span className="text-slate-300">Concept Square</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 font-bold">
              <Zap className="w-3 h-3" />
            </span>
            <span className="text-slate-300">Optimization Ladder</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-400 font-bold">
              <AlertTriangle className="w-3 h-3" />
            </span>
            <span className="text-slate-300">Intelligent Snake</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400 font-bold">
              <Dices className="w-3 h-3" />
            </span>
            <span className="text-slate-300">Dice Movement</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center text-yellow-400 font-bold">
              <Sparkles className="w-3 h-3" />
            </span>
            <span className="text-slate-300">Current Position</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center text-indigo-400 font-bold">
              <Flag className="w-3 h-3" />
            </span>
            <span className="text-slate-300">Start / Finish</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
