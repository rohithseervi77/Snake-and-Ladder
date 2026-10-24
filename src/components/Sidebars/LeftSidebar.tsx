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
    <aside className="w-full flex flex-col gap-2.5 text-[#94A3B8]">
      {/* Card 1: How It Works */}
      <div className="bg-[#111827] border border-[#263449] rounded-xl p-3 shadow-md">
        <h2 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-[#2563EB]" />
          How It Works
        </h2>
        
        <div className="flex flex-col gap-2">
          {/* Step 1 */}
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#2563EB]/20 text-[#22D3EE] font-bold text-[10px] flex items-center justify-center border border-[#2563EB]/50">
              1
            </span>
            <div>
              <p className="text-[11px] font-semibold text-[#F8FAFC] leading-tight">Roll the dice</p>
              <p className="text-[10px] text-[#94A3B8] leading-tight">
                Move forward on 100-square serpentine board.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#22D3EE]/20 text-[#22D3EE] font-bold text-[10px] flex items-center justify-center border border-[#22D3EE]/50">
              2
            </span>
            <div>
              <p className="text-[11px] font-semibold text-[#F8FAFC] leading-tight">Pass the checkpoint</p>
              <p className="text-[10px] text-[#94A3B8] leading-tight">
                Solve concepts, dry-run code, or analyze complexity.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] font-bold text-[10px] flex items-center justify-center border border-[#F59E0B]/50">
              3
            </span>
            <div>
              <p className="text-[11px] font-semibold text-[#F8FAFC] leading-tight">Climb the ladder</p>
              <p className="text-[10px] text-[#94A3B8] leading-tight">
                Refactor brute-force solutions into optimal algorithms.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#F43F5E]/20 text-[#F43F5E] font-bold text-[10px] flex items-center justify-center border border-[#F43F5E]/50">
              4
            </span>
            <div>
              <p className="text-[11px] font-semibold text-[#F8FAFC] leading-tight">Avoid the snake</p>
              <p className="text-[10px] text-[#94A3B8] leading-tight">
                Fix runtime bugs or handle edge cases &mdash; or slide down!
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] font-bold text-[10px] flex items-center justify-center border border-[#8B5CF6]/50">
              5
            </span>
            <div>
              <p className="text-[11px] font-semibold text-[#F8FAFC] leading-tight">Reach 100</p>
              <p className="text-[10px] text-[#94A3B8] leading-tight">
                Conquer 100 DSA squares to master tech interviews.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Legend */}
      <div className="bg-[#111827] border border-[#263449] rounded-xl p-3 shadow-md">
        <h2 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#22D3EE]" />
          Legend
        </h2>

        <div className="grid grid-cols-1 gap-1.5 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-[#10B981]/20 border border-[#10B981]/50 flex items-center justify-center text-[#10B981] text-[9px] font-bold">
              ✓
            </span>
            <span className="text-[#CBD5E1]">Concept Square</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-[#F59E0B]/20 border border-[#F59E0B]/50 flex items-center justify-center text-[#F59E0B] font-bold">
              <Zap className="w-3 h-3" />
            </span>
            <span className="text-[#CBD5E1]">Optimization Ladder</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-[#F43F5E]/20 border border-[#F43F5E]/50 flex items-center justify-center text-[#F43F5E] font-bold">
              <AlertTriangle className="w-3 h-3" />
            </span>
            <span className="text-[#CBD5E1]">Intelligent Snake</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-[#2563EB]/20 border border-[#2563EB]/50 flex items-center justify-center text-[#22D3EE] font-bold">
              <Dices className="w-3 h-3" />
            </span>
            <span className="text-[#CBD5E1]">Dice Movement</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-[#2563EB]/20 border border-[#2563EB]/60 flex items-center justify-center text-[#22D3EE] font-bold">
              <Sparkles className="w-3 h-3" />
            </span>
            <span className="text-[#CBD5E1]">Current Position</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-[#8B5CF6]/20 border border-[#8B5CF6]/50 flex items-center justify-center text-[#8B5CF6] font-bold">
              <Flag className="w-3 h-3" />
            </span>
            <span className="text-[#CBD5E1]">Start / Finish</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
