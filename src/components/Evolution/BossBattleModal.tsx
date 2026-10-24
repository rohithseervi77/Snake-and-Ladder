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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-purple-500/40 rounded-2xl p-6 shadow-2xl text-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Glow */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
            <Swords className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider text-purple-400 font-semibold flex items-center gap-1">
                <Skull className="w-3.5 h-3.5" /> Regional Boss Encounter &bull; Tile {boss.tileNumber}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {boss.regionName}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">{boss.bossName}</h2>
          </div>
        </div>

        {/* Victory Screen */}
        {isComplete ? (
          <div className="py-8 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 mb-4 animate-bounce">
              <Trophy className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Boss Vanquished!</h3>
            <p className="text-sm text-slate-300 max-w-md mb-6">
              You systematically dismantled the {boss.bossName} through architectural foresight, loop invariants, and boundary precision.
            </p>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 mb-6">
              <div className="text-center px-4">
                <div className="text-xs text-slate-400">Experience</div>
                <div className="text-lg font-bold text-indigo-400">+{boss.rewardXp} XP</div>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div className="text-center px-4">
                <div className="text-xs text-slate-400">Coins</div>
                <div className="text-lg font-bold text-amber-400">+{boss.rewardCoins}</div>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div className="text-center px-4">
                <div className="text-xs text-slate-400">Energy</div>
                <div className="text-lg font-bold text-emerald-400">+{boss.rewardEnergy} ⚡</div>
              </div>
            </div>

            <button
              onClick={handleClaimVictory}
              className="py-3 px-8 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all"
            >
              Continue Adventure <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            {/* Step Progress & Lore */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-mono">
                <span>Phase {currentStepIndex + 1} of {boss.steps.length}: {currentStep.title}</span>
                <span className="text-purple-400 font-semibold">{Math.round(((currentStepIndex) / boss.steps.length) * 100)}% Complete</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
                  style={{ width: `${((currentStepIndex + 1) / boss.steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Question */}
            <div className="overflow-y-auto pr-1 flex-1">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 mb-4">
                <p className="text-xs text-purple-300 font-mono mb-1">{boss.lore}</p>
                <h4 className="text-sm font-semibold text-white leading-relaxed">{currentStep.question}</h4>
              </div>

              {/* Options */}
              <div className="space-y-2.5 mb-4">
                {currentStep.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  let optionStyle = 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-slate-700';

                  if (hasSubmitted) {
                    if (idx === currentStep.correctIndex) {
                      optionStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'bg-rose-950/50 border-rose-500 text-rose-200';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-purple-950/50 border-purple-500 text-purple-100 shadow-sm';
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
                      {hasSubmitted && idx === currentStep.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {hasSubmitted && isSelected && !isCorrect && (
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
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
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                  }`}
                >
                  <p className="font-semibold mb-1">
                    {isCorrect ? 'Correct Tactical Strike!' : 'The Boss Counterattacked!'}
                  </p>
                  <p>{currentStep.explanation}</p>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-slate-800 flex justify-end gap-3 mt-auto">
              {!hasSubmitted ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleVerify}
                  className="py-2 px-5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-semibold shadow-md transition-all"
                >
                  Execute Tactical Move
                </button>
              ) : isCorrect ? (
                <button
                  onClick={handleNextStep}
                  className="py-2 px-5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
                >
                  {currentStepIndex + 1 < boss.steps.length ? 'Next Battle Phase' : 'Claim Victory!'} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => setHasSubmitted(false)}
                  className="py-2 px-5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold transition-all"
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
