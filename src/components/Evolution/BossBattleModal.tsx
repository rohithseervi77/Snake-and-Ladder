import React, { useState } from 'react';
import { Skull, Swords, CheckCircle2, AlertCircle, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { BossBattle } from '../../types/evolution';

interface BossBattleModalProps {
  isOpen: boolean;
  boss: BossBattle | null;
  onVictory: (tileNumber: number, xp: number, coins: number, energy: number) => void;
  onClose: () => void;
}

export const BossBattleModal: React.FC<BossBattleModalProps> = ({
  isOpen,
  boss,
  onVictory,
  onClose,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080D1A]/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#111827] border border-[#8B5CF6]/40 rounded-2xl p-6 shadow-2xl text-[#F8FAFC] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Glow */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[#263449] pb-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6] shrink-0">
            <Swords className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider text-[#8B5CF6] font-semibold flex items-center gap-1">
                <Skull className="w-3.5 h-3.5" /> Regional Boss Encounter &bull; Tile {boss.tileNumber}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#080D1A] text-[#94A3B8] border border-[#263449] font-mono">
                {boss.regionName}
              </span>
            </div>
            <h2 className="text-xl font-bold text-[#F8FAFC] tracking-tight">{boss.bossName}</h2>
          </div>
        </div>

        {/* Victory Screen */}
        {isComplete ? (
          <div className="py-8 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-[#F59E0B]/20 border border-[#F59E0B]/50 flex items-center justify-center text-[#F59E0B] mb-4 animate-bounce">
              <Trophy className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-[#F8FAFC] mb-2">Boss Vanquished!</h3>
            <p className="text-sm text-[#94A3B8] max-w-md mb-6">
              You systematically dismantled the {boss.bossName} through architectural foresight, loop invariants, and boundary precision.
            </p>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#080D1A] border border-[#263449] mb-6">
              <div className="text-center px-4">
                <div className="text-xs text-[#94A3B8]">Experience</div>
                <div className="text-lg font-bold text-[#22D3EE]">+{boss.rewardXp} XP</div>
              </div>
              <div className="h-8 w-px bg-[#263449]" />
              <div className="text-center px-4">
                <div className="text-xs text-[#94A3B8]">Coins</div>
                <div className="text-lg font-bold text-[#F59E0B]">+{boss.rewardCoins}</div>
              </div>
              <div className="h-8 w-px bg-[#263449]" />
              <div className="text-center px-4">
                <div className="text-xs text-[#94A3B8]">Energy</div>
                <div className="text-lg font-bold text-[#10B981]">+{boss.rewardEnergy} ⚡</div>
              </div>
            </div>

            <button
              onClick={handleClaimVictory}
              className="py-3 px-8 rounded-xl bg-[#8B5CF6] hover:bg-[#7c3aed] text-[#F8FAFC] font-semibold flex items-center gap-2 shadow-lg shadow-[#8B5CF6]/30 transition-all cursor-pointer"
            >
              Continue Adventure <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            {/* Step Progress & Lore */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-1.5 font-mono">
                <span>Phase {currentStepIndex + 1} of {boss.steps.length}: {currentStep.title}</span>
                <span className="text-[#8B5CF6] font-semibold">{Math.round(((currentStepIndex) / boss.steps.length) * 100)}% Complete</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#080D1A] border border-[#263449] overflow-hidden">
                <div
                  className="h-full bg-[#8B5CF6] transition-all duration-300"
                  style={{ width: `${((currentStepIndex + 1) / boss.steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Question */}
            <div className="overflow-y-auto pr-1 flex-1">
              <div className="p-3.5 rounded-xl bg-[#172033] border border-[#263449] mb-4">
                <p className="text-xs text-[#8B5CF6] font-mono mb-1">{boss.lore}</p>
                <h4 className="text-sm font-semibold text-[#F8FAFC] leading-relaxed">{currentStep.question}</h4>
              </div>

              {/* Options */}
              <div className="space-y-2.5 mb-4">
                {currentStep.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  let optionStyle = 'bg-[#172033] border-[#263449] text-[#F8FAFC] hover:border-[#22D3EE]';

                  if (hasSubmitted) {
                    if (idx === currentStep.correctIndex) {
                      optionStyle = 'bg-[#10B981]/20 border-2 border-[#10B981] text-[#10B981]';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'bg-[#F43F5E]/20 border-2 border-[#F43F5E] text-[#F43F5E]';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-[#8B5CF6]/20 border-2 border-[#8B5CF6] text-[#F8FAFC] shadow-sm';
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
                      {hasSubmitted && idx === currentStep.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      )}
                      {hasSubmitted && isSelected && !isCorrect && (
                        <AlertCircle className="w-4 h-4 text-[#F43F5E] shrink-0 mt-0.5" />
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
                      ? 'bg-[#10B981]/15 border-[#10B981]/50 text-[#F8FAFC]'
                      : 'bg-[#F43F5E]/15 border-[#F43F5E]/50 text-[#F8FAFC]'
                  }`}
                >
                  <p className={`font-semibold mb-1 ${isCorrect ? 'text-[#10B981]' : 'text-[#F43F5E]'}`}>
                    {isCorrect ? 'Correct Tactical Strike!' : 'The Boss Counterattacked!'}
                  </p>
                  <p className="text-[#CBD5E1]">{currentStep.explanation}</p>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-[#263449] flex justify-end gap-3 mt-auto">
              {!hasSubmitted ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleVerify}
                  className="py-2 px-5 rounded-lg bg-[#8B5CF6] hover:bg-[#7c3aed] disabled:opacity-50 text-[#F8FAFC] text-xs font-semibold shadow-md transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  Execute Tactical Move
                </button>
              ) : isCorrect ? (
                <button
                  onClick={handleNextStep}
                  className="py-2 px-5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-[#F8FAFC] text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                >
                  {currentStepIndex + 1 < boss.steps.length ? 'Next Battle Phase' : 'Claim Victory!'} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => setHasSubmitted(false)}
                  className="py-2 px-5 rounded-lg bg-[#172033] hover:bg-[#263449] border border-[#263449] text-[#94A3B8] hover:text-[#F8FAFC] text-xs font-semibold transition-all cursor-pointer"
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
