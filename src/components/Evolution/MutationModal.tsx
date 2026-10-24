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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080D1A]/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#111827] border border-[#263449] rounded-2xl p-6 shadow-2xl text-[#F8FAFC] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Glow */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#F59E0B]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#263449] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/40 flex items-center justify-center text-[#F59E0B] shrink-0">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-wider text-[#F59E0B] font-semibold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> Turn {mutation.triggerTurn} Board Mutation
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#080D1A] border border-[#263449] text-[#94A3B8] font-mono">
                  {mutation.type.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#F8FAFC] tracking-tight">{mutation.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#94A3B8] hover:text-[#F8FAFC] rounded-lg hover:bg-[#172033] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mutation Description & Risks */}
        <div className="mb-4 p-3 rounded-xl bg-[#172033] border border-[#263449] text-xs">
          <p className="text-[#F8FAFC] mb-2">{mutation.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-[11px] pt-2 border-t border-[#263449]">
            <span className="text-[#10B981] font-medium">Reward: {mutation.bonusReward}</span>
            <span className="text-[#F43F5E] font-medium">Risk: {mutation.penaltyRisk}</span>
          </div>
        </div>

        {/* Challenge prompt */}
        <div className="overflow-y-auto pr-1 flex-1 space-y-4 mb-4">
          <div className="p-3.5 rounded-xl bg-[#080D1A] border border-[#263449]">
            <h4 className="text-xs font-semibold text-[#22D3EE] mb-1">{challenge.title}</h4>
            <p className="text-xs text-[#CBD5E1] leading-relaxed">{challenge.prompt}</p>
          </div>

          <h5 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Select the Solution:</h5>

          <div className="space-y-2.5">
            {(challenge.options || []).map((option, idx) => {
              const isSelected = selectedOption === idx;
              let optionStyle = 'bg-[#172033] border-[#263449] text-[#F8FAFC] hover:border-[#22D3EE]';

              if (hasSubmitted) {
                if (idx === challenge.correctOptionIndex) {
                  optionStyle = 'bg-[#10B981]/20 border-2 border-[#10B981] text-[#10B981]';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-[#F43F5E]/20 border-2 border-[#F43F5E] text-[#F43F5E]';
                }
              } else if (isSelected) {
                optionStyle = 'bg-[#2563EB]/20 border-2 border-[#2563EB] text-[#F8FAFC] shadow-sm';
              }

              return (
                <button
                  key={idx}
                  disabled={hasSubmitted && isCorrect}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                >
                  <span className="w-5 h-5 rounded-full bg-[#080D1A] border border-[#263449] flex items-center justify-center shrink-0 text-[10px] font-mono mt-0.5 text-[#94A3B8]">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed flex-1">{option}</span>
                  {hasSubmitted && idx === challenge.correctOptionIndex && (
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  )}
                  {hasSubmitted && isSelected && !isCorrect && (
                    <AlertCircle className="w-4 h-4 text-[#F43F5E] shrink-0 mt-0.5" />
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
                  ? 'bg-[#10B981]/15 border-[#10B981]/40 text-[#F8FAFC]'
                  : 'bg-[#F43F5E]/15 border-[#F43F5E]/40 text-[#F8FAFC]'
              }`}
            >
              <p className={`font-semibold mb-1 ${isCorrect ? 'text-[#10B981]' : 'text-[#F43F5E]'}`}>
                {isCorrect ? 'Mutation Invariant Resolved!' : 'Failed to Stabilize Mutation!'}
              </p>
              <p className="text-[#CBD5E1]">{challenge.explanation}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#263449] flex justify-end gap-3 mt-auto">
          {!hasSubmitted ? (
            <button
              disabled={selectedOption === null}
              onClick={handleVerify}
              className="py-2 px-5 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] disabled:opacity-50 text-[#F8FAFC] text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              Submit Invariant Solution
            </button>
          ) : (
            <button
              onClick={handleContinue}
              className="py-2 px-5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-[#F8FAFC] text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              Continue Adventure <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
