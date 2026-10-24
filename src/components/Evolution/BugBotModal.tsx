import React, { useState } from 'react';
import { Bot, Bug, AlertCircle, CheckCircle2, ArrowRight, Zap, Trophy, X } from 'lucide-react';
import { BugBotScenario } from '../../types/evolution';

interface BugBotModalProps {
  isOpen: boolean;
  scenario: BugBotScenario | null;
  onVictory: (xp: number, coins: number, energy: number) => void;
  onClose: () => void;
}

export const BugBotModal: React.FC<BugBotModalProps> = ({
  isOpen,
  scenario,
  onVictory,
  onClose,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!isOpen || !scenario) return null;

  const handleSelectOption = (idx: number) => {
    if (hasSubmitted && isCorrect) return;
    setSelectedOption(idx);
    setHasSubmitted(false);
  };

  const handleVerify = () => {
    if (selectedOption === null) return;
    const correct = scenario.options[selectedOption].isCorrect;
    setIsCorrect(correct);
    setHasSubmitted(true);
  };

  const handleClaim = () => {
    onVictory(scenario.rewardXp, scenario.rewardCoins, scenario.rewardEnergy);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 shadow-2xl text-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold flex items-center gap-1">
                  <Bug className="w-3.5 h-3.5" /> Virtual Rival Encounter
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                  {scenario.topic}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">{scenario.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rival Taunt */}
        <div className="mb-4 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
            🤖
          </div>
          <div>
            <span className="text-xs font-bold text-cyan-300">BugBot Taunt:</span>
            <p className="text-xs text-slate-200 italic mt-0.5 leading-relaxed">"{scenario.rivalTaunt}"</p>
          </div>
        </div>

        {/* Buggy Code block */}
        <div className="overflow-y-auto pr-1 flex-1 space-y-4 mb-4">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs">
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 pb-1 border-b border-slate-800 font-sans">
              <span className="font-semibold text-rose-300">BugBot's Submitted Code:</span>
              <span className="text-slate-400">{scenario.errorCategory}</span>
            </div>
            <pre className="text-slate-200 overflow-x-auto leading-relaxed">{scenario.buggyCode}</pre>
          </div>

          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Identify the Fatal Flaw in BugBot's Solution:
          </h4>

          {/* Options */}
          <div className="space-y-2.5">
            {scenario.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              let optionStyle = 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-slate-700';

              if (hasSubmitted) {
                if (option.isCorrect) {
                  optionStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200';
                } else if (isSelected && !option.isCorrect) {
                  optionStyle = 'bg-rose-950/50 border-rose-500 text-rose-200';
                }
              } else if (isSelected) {
                optionStyle = 'bg-cyan-950/50 border-cyan-500 text-cyan-100 shadow-sm';
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
                  <span className="leading-relaxed flex-1">{option.text}</span>
                  {hasSubmitted && option.isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {hasSubmitted && isSelected && !option.isCorrect && (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Feedback */}
          {hasSubmitted && (
            <div
              className={`p-3 rounded-xl border text-xs ${
                isCorrect
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
              }`}
            >
              <p className="font-semibold mb-1">
                {isCorrect ? 'BugBot Refuted!' : 'BugBot Laughs at Your Guess!'}
              </p>
              <p>{selectedOption !== null ? scenario.options[selectedOption].explanation : scenario.bugExplanation}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400">Bounty:</span>
            <span className="text-indigo-400 font-semibold">+{scenario.rewardXp} XP</span>
            <span className="text-amber-400 font-semibold">+{scenario.rewardCoins} Coins</span>
            <span className="text-emerald-400 font-semibold">+{scenario.rewardEnergy} ⚡</span>
          </div>

          {!hasSubmitted ? (
            <button
              disabled={selectedOption === null}
              onClick={handleVerify}
              className="py-2 px-5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-semibold shadow-md transition-all"
            >
              Expose Bug
            </button>
          ) : isCorrect ? (
            <button
              onClick={handleClaim}
              className="py-2 px-5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
            >
              Claim Victory <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setHasSubmitted(false)}
              className="py-2 px-5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold transition-all"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
