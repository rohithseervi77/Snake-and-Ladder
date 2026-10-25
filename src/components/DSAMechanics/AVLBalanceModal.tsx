import React, { useState } from 'react';
import { X, Scale, RotateCw, CheckCircle2, AlertTriangle, RotateCcw } from 'lucide-react';
import { RotationType } from '../../algorithms/trees';

interface AVLBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardReward?: (xp: number, coins: number) => void;
}

interface AVLScenario {
  title: string;
  beforeAscii: string;
  imbalanceDesc: string;
  correctRotation: RotationType;
  afterAscii: string;
  explanation: string;
}

const SCENARIOS: AVLScenario[] = [
  {
    title: 'LL Imbalance (Left-Left)',
    imbalanceDesc: 'Node [30] has BF = +2 because [10] was inserted into the left child of [20].',
    beforeAscii: `       [30] (BF = +2)\n       /\n     [20] (BF = +1)\n     /\n   [10]`,
    correctRotation: 'LL',
    afterAscii: `       [20] (BF = 0)\n      /    \\\n    [10]   [30]`,
    explanation: 'A Single Right Rotation (LL Rotation) on node [30] pulls [20] up as the root, pushing [30] down to the right. Tree is now height-balanced with BF = 0.'
  },
  {
    title: 'LR Imbalance (Left-Right Zigzag)',
    imbalanceDesc: 'Node [30] has BF = +2 because [25] was inserted into the right child of [10].',
    beforeAscii: `       [30] (BF = +2)\n       /\n     [10] (BF = -1)\n       \\\n       [25]`,
    correctRotation: 'LR',
    afterAscii: `       [25] (BF = 0)\n      /    \\\n    [10]   [30]`,
    explanation: 'An LR double rotation first Left-Rotates [10] (straightening the zigzag to 30-25-10), then Right-Rotates [30]. Node [25] becomes the new balanced root.'
  }
];

export const AVLBalanceModal: React.FC<AVLBalanceModalProps> = ({
  isOpen,
  onClose,
  onAwardReward
}) => {
  const [scenarioIdx, setScenarioIdx] = useState<number>(0);
  const [selectedRotation, setSelectedRotation] = useState<RotationType | null>(null);
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [hasClaimed, setHasClaimed] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentScenario = SCENARIOS[scenarioIdx];
  const isCorrect = selectedRotation === currentScenario.correctRotation;

  const handleVerify = () => {
    setIsEvaluated(true);
    if (isCorrect && !hasClaimed) {
      setHasClaimed(true);
      onAwardReward?.(45, 20);
    }
  };

  const handleNext = () => {
    setScenarioIdx((prev) => (prev + 1) % SCENARIOS.length);
    setSelectedRotation(null);
    setIsEvaluated(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl p-5 flex flex-col gap-4 text-[var(--text-primary)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center text-[#10B981]">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#10B981]">CO4 Mini-Game</span>
              <h3 className="text-base font-black">AVL Balance & Rotation Challenge</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--card-secondary-bg)] text-[var(--text-secondary)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Imbalance Description */}
        <div className="p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-xs flex flex-col gap-1">
          <span className="font-bold text-[#10B981]">{currentScenario.title}</span>
          <p className="text-[11px] text-[var(--text-secondary)]">{currentScenario.imbalanceDesc}</p>
        </div>

        {/* Tree Display */}
        <div className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border-subtle)] flex flex-col items-center">
          <span className="text-[10px] font-mono text-[var(--text-secondary)] mb-1">
            {isEvaluated && isCorrect ? 'Balanced Tree after Rotation:' : 'Unbalanced AVL Tree (BF >= 2):'}
          </span>
          <pre className="font-mono text-xs text-[#06B6D4] leading-tight text-center py-2">
            {isEvaluated && isCorrect ? currentScenario.afterAscii : currentScenario.beforeAscii}
          </pre>
        </div>

        {/* Rotation Choice Buttons */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-[var(--text-secondary)]">Select Required AVL Rotation:</span>
          <div className="grid grid-cols-4 gap-2">
            {(['LL', 'RR', 'LR', 'RL'] as RotationType[]).map((rot) => (
              <button
                key={rot}
                disabled={isEvaluated}
                onClick={() => setSelectedRotation(rot)}
                className={`py-2 px-3 rounded-xl border font-mono text-xs font-bold transition cursor-pointer disabled:cursor-default ${
                  selectedRotation === rot
                    ? isEvaluated
                      ? rot === currentScenario.correctRotation
                        ? 'bg-[#10B981] text-white border-[#10B981]'
                        : 'bg-[#F43F5E] text-white border-[#F43F5E]'
                      : 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]'
                    : 'bg-[var(--card-secondary-bg)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {rot} Rotation
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {isEvaluated && (
          <div className={`p-3 rounded-xl border text-xs font-mono ${
            isCorrect
              ? 'bg-[#10B981]/15 border-[#10B981]/40 text-[#10B981]'
              : 'bg-[#F43F5E]/15 border-[#F43F5E]/40 text-[#F43F5E]'
          }`}>
            {isCorrect ? (
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Correct! {currentScenario.explanation}</span>
              </div>
            ) : (
              <div className="flex items-start gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Incorrect rotation! Check the direction of the insertion bend (LL, RR, LR, or RL).</span>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
          <button
            onClick={handleNext}
            className="flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Next Scenario</span>
          </button>

          {!isEvaluated ? (
            <button
              onClick={handleVerify}
              disabled={selectedRotation === null}
              className="py-2 px-4 rounded-xl bg-[#10B981] hover:bg-[#059669] disabled:opacity-40 text-white font-bold text-xs cursor-pointer"
            >
              Apply Rotation
            </button>
          ) : (
            <button
              onClick={onClose}
              className="py-2 px-4 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-bold text-xs cursor-pointer"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
