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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-amber-500/40 rounded-2xl p-6 shadow-2xl text-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Glow */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> Turn {mutation.triggerTurn} Board Mutation
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                  {mutation.type.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">{mutation.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mutation Description & Risks */}
        <div className="mb-4 p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs">
          <p className="text-slate-200 mb-2">{mutation.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-[11px] pt-2 border-t border-amber-900/40">
            <span className="text-emerald-400 font-medium">Reward: {mutation.bonusReward}</span>
            <span className="text-rose-400 font-medium">Risk: {mutation.penaltyRisk}</span>
          </div>
        </div>

        {/* Challenge prompt */}
        <div className="overflow-y-auto pr-1 flex-1 space-y-4 mb-4">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <h4 className="text-xs font-semibold text-amber-300 mb-1">{challenge.title}</h4>
            <p className="text-xs text-slate-200 leading-relaxed">{challenge.prompt}</p>
          </div>

          <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Select the Solution:</h5>

          <div className="space-y-2.5">
            {(challenge.options || []).map((option, idx) => {
              const isSelected = selectedOption === idx;
              let optionStyle = 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-slate-700';

              if (hasSubmitted) {
                if (idx === challenge.correctOptionIndex) {
                  optionStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-rose-950/50 border-rose-500 text-rose-200';
                }
              } else if (isSelected) {
                optionStyle = 'bg-amber-950/50 border-amber-500 text-amber-100 shadow-sm';
              }

              return (
                <button
                  key={idx}
                  disabled={hasSubmitted && isCorrect}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-3 ${optionStyle}`}
                >
                  <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-[10px] font-mono mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed flex-1">{option}</span>
                  {hasSubmitted && idx === challenge.correctOptionIndex && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {hasSubmitted && isSelected && !isCorrect && (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
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
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
              }`}
            >
              <p className="font-semibold mb-1">
                {isCorrect ? 'Mutation Invariant Resolved!' : 'Failed to Stabilize Mutation!'}
              </p>
              <p>{challenge.explanation}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end gap-3 mt-auto">
          {!hasSubmitted ? (
            <button
              disabled={selectedOption === null}
              onClick={handleVerify}
              className="py-2 px-5 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-semibold shadow-md transition-all"
            >
              Submit Invariant Solution
            </button>
          ) : (
            <button
              onClick={handleContinue}
              className="py-2 px-5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
            >
              Continue Adventure <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
