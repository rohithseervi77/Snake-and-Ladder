import React, { useState } from 'react';
import { X, GitBranch, ArrowRight, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

interface LinkedListRepairModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardReward?: (xp: number, coins: number) => void;
}

export const LinkedListRepairModal: React.FC<LinkedListRepairModalProps> = ({
  isOpen,
  onClose,
  onAwardReward
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [hasClaimed, setHasClaimed] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleVerify = () => {
    setIsEvaluated(true);
    if (selectedOption === 0 && !hasClaimed) {
      setHasClaimed(true);
      onAwardReward?.(40, 20);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsEvaluated(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl p-5 flex flex-col gap-4 text-[var(--text-primary)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EC4899]/20 border border-[#EC4899]/40 flex items-center justify-center text-[#EC4899]">
              <GitBranch className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#EC4899]">CO2 Mini-Game</span>
              <h3 className="text-base font-black">Linked List Pointer Repair</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--card-secondary-bg)] text-[var(--text-secondary)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Challenge prompt */}
        <div className="p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-xs flex flex-col gap-1.5">
          <span className="font-bold text-[#EC4899]">Mission: Insert Node [25] between [20] and [30]</span>
          <p className="text-[11px] text-[var(--text-secondary)]">
            Pointer `curr` currently points to node [20]. `newNode` holds data 25. Select the correct pointer assignment order to prevent memory loss.
          </p>
        </div>

        {/* Visual Linked List */}
        <div className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border-subtle)] flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 overflow-x-auto py-2">
            <div className="px-3 py-1.5 rounded-lg bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] font-mono text-xs font-bold">
              10
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
            <div className="px-3 py-1.5 rounded-lg bg-[#EC4899] text-white font-mono text-xs font-bold border border-white/20">
              20 (curr)
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
            <div className="px-3 py-1.5 rounded-lg bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] font-mono text-xs font-bold">
              30
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
            <div className="px-3 py-1.5 rounded-lg bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] font-mono text-xs font-bold">
              40
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
            <span className="font-mono text-xs text-[var(--text-secondary)]">NULL</span>
          </div>

          <div className="p-2 px-3 rounded-lg bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] font-mono text-xs font-bold flex items-center gap-1.5">
            <span>Incoming Node: [25]</span>
          </div>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-[var(--text-secondary)]">Choose Pointer Statement Sequence:</span>

          <button
            onClick={() => setSelectedOption(0)}
            disabled={isEvaluated}
            className={`p-3 rounded-xl border text-left font-mono text-xs transition cursor-pointer ${
              selectedOption === 0
                ? isEvaluated
                  ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]'
                  : 'bg-[#6366F1]/20 border-[#6366F1] text-[var(--text-primary)]'
                : 'bg-[var(--card-secondary-bg)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
            }`}
          >
            <div className="font-bold text-[var(--text-primary)]">Option A: Link to future node first</div>
            <div className="mt-1">1. newNode-&gt;next = curr-&gt;next;</div>
            <div>2. curr-&gt;next = newNode;</div>
          </button>

          <button
            onClick={() => setSelectedOption(1)}
            disabled={isEvaluated}
            className={`p-3 rounded-xl border text-left font-mono text-xs transition cursor-pointer ${
              selectedOption === 1
                ? isEvaluated
                  ? 'bg-[#F43F5E]/20 border-[#F43F5E] text-[#F43F5E]'
                  : 'bg-[#6366F1]/20 border-[#6366F1] text-[var(--text-primary)]'
                : 'bg-[var(--card-secondary-bg)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
            }`}
          >
            <div className="font-bold text-[var(--text-primary)]">Option B: Overwrite curr-&gt;next first</div>
            <div className="mt-1">1. curr-&gt;next = newNode;</div>
            <div>2. newNode-&gt;next = curr-&gt;next;</div>
          </button>
        </div>

        {/* Evaluation Feedback */}
        {isEvaluated && (
          <div className={`p-3 rounded-xl border text-xs font-mono ${
            selectedOption === 0
              ? 'bg-[#10B981]/15 border-[#10B981]/40 text-[#10B981]'
              : 'bg-[#F43F5E]/15 border-[#F43F5E]/40 text-[#F43F5E]'
          }`}>
            {selectedOption === 0 ? (
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Correct! Setting newNode-&gt;next = curr-&gt;next preserves the reference to node [30]. Then curr-&gt;next = newNode cleanly inserts [25] in O(1) time without severing pointers!</span>
              </div>
            ) : (
              <div className="flex items-start gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Memory Disaster! Overwriting `curr-&gt;next = newNode` first erases the reference to node [30]. Nodes [30, 40] are permanently orphaned in heap memory!</span>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
          <button onClick={handleReset} className="flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          {!isEvaluated ? (
            <button
              onClick={handleVerify}
              disabled={selectedOption === null}
              className="py-2 px-4 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] disabled:opacity-40 text-white font-bold text-xs cursor-pointer"
            >
              Verify Pointer Chain
            </button>
          ) : (
            <button onClick={onClose} className="py-2 px-4 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-bold text-xs cursor-pointer">
              Close Lab
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
