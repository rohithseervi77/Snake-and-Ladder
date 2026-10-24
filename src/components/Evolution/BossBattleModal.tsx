import React, { useState } from 'react';
import { Swords, Trophy, ArrowRight, Skull, CheckCircle2, AlertCircle } from 'lucide-react';
import { BossBattle } from '../../types/evolution';

interface BossBattleModalProps {
  isOpen: boolean;
  boss: BossBattle | null;
  onClose: () => void;
  onVictory: (tileNumber: number, xp: number, coins: number, energy: number) => void;
}

export const BossBattleModal: React.FC<BossBattleModalProps> = ({
  isOpen,
  boss,
  onClose,
  onVictory,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  if (!isOpen || !boss) return null;

  const currentStep = boss.steps[currentStepIndex];

  const handleSelectOption = (index: number) => {
    if (hasSubmitted && isCorrect) return;
    setSelectedOption(index);
    setHasSubmitted(false);
  };

  const handleVerify = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === currentStep.correctIndex;
    setIsCorrect(correct);
    setHasSubmitted(true);
  };

  const handleNextStep = () => {
    if (currentStepIndex + 1 < boss.steps.length) {
      setCurrentStepIndex(prev => prev + 1);
      setSelectedOption(null);
      setHasSubmitted(false);
      setIsCorrect(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleClaimVictory = () => {
    onVictory(boss.tileNumber, boss.rewardXp, boss.rewardCoins, boss.rewardEnergy);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[var(--modal-bg)] border border-[var(--color-violet-border)] rounded-2xl p-6 shadow-2xl text-[var(--text-primary)] overflow-hidden flex flex-col max-h-[90vh] transition-colors duration-200">
        {/* Subtle glow */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-[var(--color-violet)]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--color-violet-light)] border border-[var(--color-violet-border)] flex items-center justify-center text-[var(--color-violet)] shrink-0">
            <Swords className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider text-[var(--color-violet)] font-semibold flex items-center gap-1">
                <Skull className="w-3.5 h-3.5" /> Regional Boss Encounter &bull; Tile {boss.tileNumber}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--card-secondary-bg)] text-[var(--text-secondary)] border border-[var(--border-subtle)] font-mono">
                {boss.regionName}
              </span>
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] leading-tight mt-0.5">{boss.bossName}</h3>
          </div>
        </div>

        {/* Victory Screen */}
        {isComplete ? (
          <div className="py-8 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-[var(--color-amber-light)] border border-[var(--color-amber-border)] flex items-center justify-center text-[var(--color-amber)] mb-4 animate-bounce">
              <Trophy className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Boss Vanquished!</h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-md mb-6">
              You systematically dismantled the {boss.bossName} through architectural foresight, loop invariants, and boundary precision.
            </p>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] mb-6 shadow-sm">
              <div className="text-center px-4">
                <div className="text-xs text-[var(--text-secondary)]">Experience</div>
                <div className="text-lg font-bold text-[var(--color-cyan)]">+{boss.rewardXp} XP</div>
              </div>
              <div className="h-8 w-px bg-[var(--border-subtle)]" />
              <div className="text-center px-4">
                <div className="text-xs text-[var(--text-secondary)]">Coins</div>
                <div className="text-lg font-bold text-[var(--color-amber)]">+{boss.rewardCoins}</div>
              </div>
              <div className="h-8 w-px bg-[var(--border-subtle)]" />
              <div className="text-center px-4">
                <div className="text-xs text-[var(--text-secondary)]">Energy</div>
                <div className="text-lg font-bold text-[var(--color-emerald)]">+{boss.rewardEnergy} ⚡</div>
              </div>
            </div>

            <button
              onClick={handleClaimVictory}
              className="py-3 px-8 rounded-xl bg-[var(--color-violet)] hover:opacity-90 text-white font-semibold flex items-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95"
            >
              Continue Adventure <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            {/* Step Progress & Lore */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] mb-1.5 font-mono">
                <span>Phase {currentStepIndex + 1} of {boss.steps.length}: {currentStep.title}</span>
                <span className="text-[var(--color-violet)] font-semibold">{Math.round(((currentStepIndex) / boss.steps.length) * 100)}% Complete</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] overflow-hidden">
                <div
                  className="h-full bg-[var(--color-violet)] transition-all duration-300"
                  style={{ width: `${((currentStepIndex + 1) / boss.steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Question */}
            <div className="overflow-y-auto pr-1 flex-1">
              <div className="p-3.5 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] mb-4">
                <p className="text-xs text-[var(--color-violet)] font-mono mb-1">{boss.lore}</p>
                <h4 className="text-sm font-semibold text-[var(--text-primary)] leading-relaxed">{currentStep.question}</h4>
              </div>

              {/* Options */}
              <div className="space-y-2.5 mb-4">
                {currentStep.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  let optionStyle = 'bg-[var(--card-bg)] border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--color-indigo)]';

                  if (hasSubmitted) {
                    if (idx === currentStep.correctIndex) {
                      optionStyle = 'bg-[var(--color-emerald-light)] border-2 border-[var(--color-emerald)] text-[var(--color-emerald)]';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'bg-[var(--color-rose-light)] border-2 border-[var(--color-rose)] text-[var(--color-rose)]';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-[var(--color-violet-light)] border-2 border-[var(--color-violet)] text-[var(--text-primary)] shadow-sm';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={hasSubmitted && isCorrect}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-3 cursor-pointer shadow-sm ${optionStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0 text-[10px] font-mono mt-0.5 text-[var(--text-secondary)]">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-relaxed flex-1">{option}</span>
                      {hasSubmitted && idx === currentStep.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-emerald)] shrink-0 mt-0.5" />
                      )}
                      {hasSubmitted && isSelected && !isCorrect && (
                        <AlertCircle className="w-4 h-4 text-[var(--color-rose)] shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation feedback */}
              {hasSubmitted && (
                <div
                  className={`p-3 rounded-xl border text-xs mb-4 ${
                    isCorrect
                      ? 'bg-[var(--color-emerald-light)] border-[var(--color-emerald-border)] text-[var(--text-primary)]'
                      : 'bg-[var(--color-rose-light)] border-[var(--color-rose-border)] text-[var(--text-primary)]'
                  }`}
                >
                  <p className={`font-semibold mb-1 ${isCorrect ? 'text-[var(--color-emerald)]' : 'text-[var(--color-rose)]'}`}>
                    {isCorrect ? 'Correct Tactical Strike!' : 'The Boss Counterattacked!'}
                  </p>
                  <p className="text-[var(--text-secondary)]">{currentStep.explanation}</p>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-[var(--border-subtle)] flex justify-end gap-3 mt-auto">
              {!hasSubmitted ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleVerify}
                  className="py-2 px-5 rounded-lg bg-[var(--color-violet)] hover:opacity-90 disabled:opacity-50 text-white text-xs font-semibold shadow-md transition-all cursor-pointer disabled:cursor-not-allowed active:scale-95"
                >
                  Execute Tactical Move
                </button>
              ) : isCorrect ? (
                <button
                  onClick={handleNextStep}
                  className="py-2 px-5 rounded-lg bg-[var(--color-emerald)] hover:opacity-90 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95"
                >
                  {currentStepIndex + 1 < boss.steps.length ? 'Next Battle Phase' : 'Claim Victory!'} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => setHasSubmitted(false)}
                  className="py-2 px-5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-semibold transition-all cursor-pointer"
                >
                  Re-evaluate Approach
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
