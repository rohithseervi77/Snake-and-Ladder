import React, { useState } from 'react';
import { X, Play, RotateCcw, ArrowRight, CheckCircle2, Award } from 'lucide-react';
import { insertionSortWithSteps, mergeSortWithSteps, quickSortWithSteps, heapSortWithSteps, SortStep } from '../../algorithms/sorting';

interface SortingRaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardReward?: (xp: number, coins: number) => void;
}

type SortType = 'insertion' | 'merge' | 'quick' | 'heap';

const INITIAL_ARRAY = [8, 3, 6, 1, 9];

export const SortingRaceModal: React.FC<SortingRaceModalProps> = ({
  isOpen,
  onClose,
  onAwardReward
}) => {
  const [selectedSort, setSelectedSort] = useState<SortType>('insertion');
  const [steps, setSteps] = useState<SortStep[]>(() => insertionSortWithSteps(INITIAL_ARRAY).steps);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSelectSort = (type: SortType) => {
    setSelectedSort(type);
    setCurrentStepIdx(0);
    setHasCompleted(false);

    let res: { sorted: number[]; steps: SortStep[] };
    if (type === 'insertion') res = insertionSortWithSteps(INITIAL_ARRAY);
    else if (type === 'merge') res = mergeSortWithSteps(INITIAL_ARRAY);
    else if (type === 'quick') res = quickSortWithSteps(INITIAL_ARRAY);
    else res = heapSortWithSteps(INITIAL_ARRAY);

    setSteps(res.steps);
  };

  const handleNextStep = () => {
    if (currentStepIdx < steps.length - 1) {
      const next = currentStepIdx + 1;
      setCurrentStepIdx(next);
      if (next === steps.length - 1 && !hasCompleted) {
        setHasCompleted(true);
        onAwardReward?.(45, 20);
      }
    }
  };

  const handleReset = () => {
    setCurrentStepIdx(0);
    setHasCompleted(false);
  };

  const activeStep = steps[currentStepIdx] || steps[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl p-5 flex flex-col gap-4 text-[var(--text-primary)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/20 border border-[#3B82F6]/40 flex items-center justify-center text-[#3B82F6]">
              <Play className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#3B82F6]">CO3 Mini-Game</span>
              <h3 className="text-base font-black">Sorting Race: Step-by-Step Simulation</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--card-secondary-bg)] text-[var(--text-secondary)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Algorithm Select Tabs */}
        <div className="grid grid-cols-4 gap-1.5">
          {(['insertion', 'merge', 'quick', 'heap'] as SortType[]).map((type) => (
            <button
              key={type}
              onClick={() => handleSelectSort(type)}
              className={`py-1.5 px-2 rounded-xl text-xs font-bold capitalize transition cursor-pointer ${
                selectedSort === type
                  ? 'bg-[#3B82F6] text-white shadow-sm'
                  : 'bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {type} Sort
            </button>
          ))}
        </div>

        {/* Array Bars Visualization */}
        <div className="p-5 rounded-xl bg-[var(--card-bg)] border border-[var(--border-subtle)] flex flex-col items-center gap-4">
          <div className="text-[11px] font-mono text-[var(--text-secondary)]">
            Step {currentStepIdx} of {steps.length - 1} • {activeStep.description}
          </div>

          <div className="flex items-end justify-center gap-3 h-28 w-full">
            {activeStep.arrayState.map((val, idx) => {
              const heightPct = (val / 9) * 100;
              return (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <span className="font-mono text-xs font-bold">{val}</span>
                  <div
                    className="w-10 rounded-t-lg bg-[#3B82F6] transition-all duration-300 shadow-md shadow-[#3B82F6]/25"
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="text-[10px] font-mono text-[var(--text-secondary)]">[{idx}]</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Complexity Info */}
        <div className="p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-xs font-mono flex justify-between items-center text-[var(--text-secondary)]">
          <span>Algorithm: <strong className="text-[var(--text-primary)] uppercase">{selectedSort} Sort</strong></span>
          <span>Time: <strong className="text-[#3B82F6]">{selectedSort === 'insertion' ? 'O(n^2) worst / O(n) best' : 'O(n log n)'}</strong></span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>

          {!hasCompleted ? (
            <button
              onClick={handleNextStep}
              className="py-2 px-4 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-[#3B82F6]/20"
            >
              <span>Next Simulation Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#10B981] flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Sorted! +45 XP
              </span>
              <button
                onClick={onClose}
                className="py-2 px-4 rounded-xl bg-[#10B981] text-white font-bold text-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
