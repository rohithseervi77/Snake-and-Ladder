import React, { useState } from 'react';
import { X, Search, CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';

interface BinarySearchPathModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardReward?: (xp: number, coins: number) => void;
}

const SORTED_ARRAY = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
const TARGET = 23;

export const BinarySearchPathModal: React.FC<BinarySearchPathModalProps> = ({
  isOpen,
  onClose,
  onAwardReward
}) => {
  const [low, setLow] = useState<number>(0);
  const [high, setHigh] = useState<number>(SORTED_ARRAY.length - 1);
  const [stepCount, setStepCount] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('Select the correct MID index for the current [low..high] range.');
  const [isFound, setIsFound] = useState<boolean>(false);
  const [hasClaimed, setHasClaimed] = useState<boolean>(false);

  if (!isOpen) return null;

  const expectedMid = Math.floor((low + high) / 2);

  const handleSelectMid = (idx: number) => {
    if (isFound) return;

    if (idx !== expectedMid) {
      setFeedback(`Incorrect mid index! Formula is floor((${low} + ${high}) / 2) = ${expectedMid}.`);
      return;
    }

    const val = SORTED_ARRAY[idx];
    setStepCount(prev => prev + 1);

    if (val === TARGET) {
      setIsFound(true);
      setFeedback(`🎯 Target ${TARGET} FOUND at index ${idx} in ${stepCount + 1} comparisons!`);
      if (!hasClaimed) {
        setHasClaimed(true);
        onAwardReward?.(40, 20);
      }
    } else if (val < TARGET) {
      setFeedback(`Value ${val} < ${TARGET}. Target is in the right half. Low moves to mid + 1 (${idx + 1}).`);
      setLow(idx + 1);
    } else {
      setFeedback(`Value ${val} > ${TARGET}. Target is in the left half. High moves to mid - 1 (${idx - 1}).`);
      setHigh(idx - 1);
    }
  };

  const handleReset = () => {
    setLow(0);
    setHigh(SORTED_ARRAY.length - 1);
    setStepCount(0);
    setIsFound(false);
    setFeedback('Select the correct MID index for the current [low..high] range.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl p-5 flex flex-col gap-4 text-[var(--text-primary)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#06B6D4]/20 border border-[#06B6D4]/40 flex items-center justify-center text-[#06B6D4]">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#06B6D4]">CO3 Mini-Game</span>
              <h3 className="text-base font-black">Binary Search Path Challenge</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--card-secondary-bg)] text-[var(--text-secondary)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target and Range Info */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
          <div className="p-2 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
            <span className="text-[10px] text-[var(--text-secondary)] block">TARGET</span>
            <span className="font-bold text-sm text-[#06B6D4]">{TARGET}</span>
          </div>
          <div className="p-2 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
            <span className="text-[10px] text-[var(--text-secondary)] block">LOW</span>
            <span className="font-bold text-sm text-[#10B981]">{low}</span>
          </div>
          <div className="p-2 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
            <span className="text-[10px] text-[var(--text-secondary)] block">HIGH</span>
            <span className="font-bold text-sm text-[#F43F5E]">{high}</span>
          </div>
          <div className="p-2 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
            <span className="text-[10px] text-[var(--text-secondary)] block">STEPS</span>
            <span className="font-bold text-sm">{stepCount}</span>
          </div>
        </div>

        {/* Array Items Clickable Grid */}
        <div className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border-subtle)] flex flex-col items-center gap-3">
          <div className="text-[11px] font-mono text-[var(--text-secondary)]">
            Click the box that corresponds to `mid = floor((${low} + ${high}) / 2)`:
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 w-full">
            {SORTED_ARRAY.map((val, idx) => {
              const inRange = idx >= low && idx <= high;
              const isLow = idx === low;
              const isHigh = idx === high;
              const isTargetMatch = isFound && val === TARGET;

              return (
                <button
                  key={idx}
                  disabled={!inRange || isFound}
                  onClick={() => handleSelectMid(idx)}
                  className={`flex flex-col items-center justify-between p-2 rounded-xl border text-xs font-mono transition-all cursor-pointer disabled:cursor-default ${
                    isTargetMatch
                      ? 'bg-[#10B981] text-white shadow-lg border-[#10B981] scale-105'
                      : inRange
                      ? 'bg-[var(--card-secondary-bg)] border-[#06B6D4] text-[var(--text-primary)] hover:border-[#10B981] hover:scale-105'
                      : 'border-dashed border-[var(--border-subtle)] text-[var(--text-secondary)] opacity-25'
                  }`}
                >
                  <span className="text-[9px] text-[var(--text-secondary)]">[{idx}]</span>
                  <span className="font-black text-sm my-0.5">{val}</span>
                  <span className="text-[8px] font-bold">
                    {isLow && 'LOW'}
                    {isHigh && !isLow && 'HIGH'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback banner */}
        <div className={`p-3 rounded-xl border text-xs font-mono ${
          isFound
            ? 'bg-[#10B981]/15 border-[#10B981]/40 text-[#10B981]'
            : 'bg-[var(--card-secondary-bg)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
        }`}>
          {feedback}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-bold text-xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
