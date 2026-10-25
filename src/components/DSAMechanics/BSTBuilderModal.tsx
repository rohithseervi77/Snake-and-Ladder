import React, { useState } from 'react';
import { X, Network, CheckCircle2, AlertTriangle, RotateCcw } from 'lucide-react';

interface BSTBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardReward?: (xp: number, coins: number) => void;
}

interface PlacementStep {
  val: number;
  question: string;
  options: { label: string; isCorrect: boolean }[];
  explanation: string;
}

const STEPS: PlacementStep[] = [
  {
    val: 30,
    question: 'Where should incoming value [30] be placed relative to root [50]?',
    options: [
      { label: 'Left child of 50 (since 30 < 50)', isCorrect: true },
      { label: 'Right child of 50 (since 30 > 50)', isCorrect: false }
    ],
    explanation: 'In a BST, keys smaller than the parent go to the left subtree: 30 < 50, so it becomes the left child of 50.'
  },
  {
    val: 70,
    question: 'Where should incoming value [70] be placed relative to root [50]?',
    options: [
      { label: 'Right child of 50 (since 70 > 50)', isCorrect: true },
      { label: 'Left child of 30', isCorrect: false }
    ],
    explanation: '70 is greater than root 50, so it becomes the right child of 50.'
  },
  {
    val: 20,
    question: 'Where should incoming value [20] be placed?',
    options: [
      { label: 'Left child of 30 (since 20 < 50 and 20 < 30)', isCorrect: true },
      { label: 'Right child of 30', isCorrect: false },
      { label: 'Left child of 70', isCorrect: false }
    ],
    explanation: 'Comparing with root: 20 < 50 (go left to 30). Comparing with 30: 20 < 30 (go left). It becomes the left child of 30.'
  },
  {
    val: 40,
    question: 'Where should incoming value [40] be placed?',
    options: [
      { label: 'Right child of 30 (since 40 < 50 and 40 > 30)', isCorrect: true },
      { label: 'Left child of 20', isCorrect: false },
      { label: 'Right child of 70', isCorrect: false }
    ],
    explanation: 'Comparing with root: 40 < 50 (go left to 30). Comparing with 30: 40 > 30 (go right). It becomes the right child of 30.'
  }
];

export const BSTBuilderModal: React.FC<BSTBuilderModalProps> = ({
  isOpen,
  onClose,
  onAwardReward
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [placedValues, setPlacedValues] = useState<number[]>([50]);
  const [feedback, setFeedback] = useState<string>('Root node [50] is established. Place the remaining numbers into the BST.');
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentStep = STEPS[currentStepIdx];

  const handleSelectOption = (isCorrect: boolean) => {
    if (isCorrect) {
      const newPlaced = [...placedValues, currentStep.val];
      setPlacedValues(newPlaced);
      setFeedback(`Correct! ${currentStep.explanation}`);

      if (currentStepIdx + 1 < STEPS.length) {
        setCurrentStepIdx(prev => prev + 1);
      } else {
        setHasCompleted(true);
        onAwardReward?.(50, 20);
      }
    } else {
      setFeedback('Incorrect choice! Remember the BST Invariant: Left Subtree < Parent < Right Subtree.');
    }
  };

  const handleReset = () => {
    setCurrentStepIdx(0);
    setPlacedValues([50]);
    setFeedback('Reset. Root node [50] is established.');
    setHasCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl p-5 flex flex-col gap-4 text-[var(--text-primary)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#14B8A6]/20 border border-[#14B8A6]/40 flex items-center justify-center text-[#14B8A6]">
              <Network className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#14B8A6]">CO4 Mini-Game</span>
              <h3 className="text-base font-black">Interactive BST Builder</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--card-secondary-bg)] text-[var(--text-secondary)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tree ASCII Visualizer */}
        <div className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border-subtle)] flex flex-col items-center">
          <span className="text-[10px] font-mono text-[var(--text-secondary)] mb-2">Current BST Structure:</span>
          <pre className="font-mono text-xs text-[#06B6D4] leading-tight text-center">
            {placedValues.includes(50) && `          [50]\n`}
            {(placedValues.includes(30) || placedValues.includes(70)) && `         /    \\\n`}
            {placedValues.includes(30) && placedValues.includes(70) && `      [30]    [70]\n`}
            {placedValues.includes(30) && !placedValues.includes(70) && `      [30]      ?\n`}
            {(placedValues.includes(20) || placedValues.includes(40)) && `      /  \\\n`}
            {placedValues.includes(20) && placedValues.includes(40) && `   [20]  [40]\n`}
            {placedValues.includes(20) && !placedValues.includes(40) && `   [20]    ?\n`}
          </pre>
        </div>

        {/* Question Prompt */}
        {!hasCompleted ? (
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[var(--text-secondary)]">
              Step {currentStepIdx + 1} of {STEPS.length}: Placing Value [{currentStep.val}]
            </span>
            <p className="text-xs font-semibold text-[var(--text-primary)]">
              {currentStep.question}
            </p>

            <div className="flex flex-col gap-1.5 mt-1">
              {currentStep.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.isCorrect)}
                  className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--card-secondary-bg)] hover:bg-[var(--card-bg)] hover:border-[#14B8A6] text-left text-xs font-mono font-medium transition cursor-pointer"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Flawless! You successfully constructed the BST with all 5 nodes obeying left &lt; parent &lt; right! +50 XP, +20 Coins.</span>
          </div>
        )}

        {/* Feedback message */}
        <div className="p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)]">
          {feedback}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Tree</span>
          </button>
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-bold text-xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
