import React, { useState } from 'react';
import { Flame, CheckCircle2, AlertCircle, ArrowRight, Zap, X } from 'lucide-react';
import { BoardMutationEvent } from '../../types/evolution';

interface MutationModalProps {
  isOpen: boolean;
  mutation: BoardMutationEvent | null;
  onResolve: (isCorrect: boolean, bonusTiles: number, penaltyTiles: number, destination?: number) => void;
  onClose: () => void;
}

export const MutationModal: React.FC<MutationModalProps> = ({
  isOpen,
  mutation,
  onResolve,
  onClose,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!isOpen || !mutation) return null;

  const challenge = mutation.challenge;

  const handleSelectOption = (idx: number) => {
    if (hasSubmitted && isCorrect) return;
    setSelectedOption(idx);
    setHasSubmitted(false);
  };

  const handleVerify = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === challenge.correctOptionIndex;
    setIsCorrect(correct);
    setHasSubmitted(true);
  };

  const handleContinue = () => {
    onResolve(isCorrect, mutation.bonusTiles, mutation.penaltyTiles, mutation.portalDestination);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-2xl text-[var(--text-primary)] overflow-hidden flex flex-col max-h-[90vh] transition-colors duration-200">
        {/* Glow */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[var(--color-amber)]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-amber-light)] border border-[var(--color-amber-border)] flex items-center justify-center text-[var(--color-amber)] shrink-0">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-wider text-[var(--color-amber)] font-semibold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> Turn {mutation.triggerTurn} Board Mutation
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-mono">
                  {mutation.type.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">{mutation.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg hover:bg-[var(--card-secondary-bg)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mutation Description & Risks */}
        <div className="mb-4 p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-xs">
          <p className="text-[var(--text-primary)] mb-2">{mutation.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-[11px] pt-2 border-t border-[var(--border-subtle)]">
            <span className="text-[var(--color-emerald)] font-medium">Reward: {mutation.bonusReward}</span>
            <span className="text-[var(--color-rose)] font-medium">Risk: {mutation.penaltyRisk}</span>
          </div>
        </div>

        {/* Challenge prompt */}
        <div className="overflow-y-auto pr-1 flex-1 space-y-4 mb-4">
          <div className="p-3.5 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
            <h4 className="text-xs font-semibold text-[var(--color-cyan)] mb-1">{challenge.title}</h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{challenge.prompt}</p>
          </div>

          <h5 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Select the Solution:</h5>

          <div className="space-y-2.5">
            {(challenge.options || []).map((option, idx) => {
              const isSelected = selectedOption === idx;
              let optionStyle = 'bg-[var(--card-bg)] border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--color-indigo)]';

              if (hasSubmitted) {
                if (idx === challenge.correctOptionIndex) {
                  optionStyle = 'bg-[var(--color-emerald-light)] border-2 border-[var(--color-emerald)] text-[var(--color-emerald)]';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-[var(--color-rose-light)] border-2 border-[var(--color-rose)] text-[var(--color-rose)]';
                }
              } else if (isSelected) {
                optionStyle = 'bg-[var(--color-indigo-light)] border-2 border-[var(--color-indigo)] text-[var(--text-primary)] shadow-sm';
              }

              return (
                <button
                  key={idx}
                  disabled={hasSubmitted && isCorrect}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-3 cursor-pointer shadow-sm active:scale-98 ${optionStyle}`}
                >
                  <span className="w-5 h-5 rounded-full bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0 text-[10px] font-mono mt-0.5 text-[var(--text-secondary)]">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed flex-1">{option}</span>
                  {hasSubmitted && idx === challenge.correctOptionIndex && (
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-emerald)] shrink-0 mt-0.5" />
                  )}
                  {hasSubmitted && isSelected && !isCorrect && (
                    <AlertCircle className="w-4 h-4 text-[var(--color-rose)] shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {hasSubmitted && (
            <div
              className={`p-3 rounded-xl border text-xs ${
                isCorrect
                  ? 'bg-[var(--color-emerald-light)] border-[var(--color-emerald-border)] text-[var(--text-primary)]'
                  : 'bg-[var(--color-rose-light)] border-[var(--color-rose-border)] text-[var(--text-primary)]'
              }`}
            >
              <p className={`font-semibold mb-1 ${isCorrect ? 'text-[var(--color-emerald)]' : 'text-[var(--color-rose)]'}`}>
                {isCorrect ? 'Mutation Invariant Resolved!' : 'Failed to Stabilize Mutation!'}
              </p>
              <p className="text-[var(--text-secondary)]">{challenge.explanation}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[var(--border-subtle)] flex justify-end gap-3 mt-auto">
          {!hasSubmitted ? (
            <button
              disabled={selectedOption === null}
              onClick={handleVerify}
              className="py-2 px-5 rounded-lg bg-[var(--color-indigo)] hover:bg-[var(--color-indigo-hover)] disabled:opacity-50 text-white text-xs font-semibold shadow-md transition-all cursor-pointer active:scale-95"
            >
              Submit Invariant Solution
            </button>
          ) : (
            <button
              onClick={handleContinue}
              className="py-2 px-5 rounded-lg bg-[var(--color-emerald)] hover:opacity-90 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95"
            >
              Continue Adventure <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
