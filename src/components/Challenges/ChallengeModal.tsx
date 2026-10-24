import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  AlertOctagon, 
  Lightbulb, 
  Zap, 
  Bug, 
  Layers, 
  ArrowRight,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import { Challenge, ChallengeAttemptResult } from '../../types/challenge';
import { calculateCorrectMovement, calculateIncorrectPenalty } from '../../engine/economyEngine';

interface ChallengeModalProps {
  challenge: Challenge;
  isOpen: boolean;
  consecutiveIncorrect: number;
  onClose: () => void;
  onSubmit: (result: ChallengeAttemptResult, isFirstAttempt: boolean, isRecovery: boolean) => void;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  challenge,
  isOpen,
  consecutiveIncorrect,
  onClose,
  onSubmit
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attemptCount, setAttemptCount] = useState(1);
  const [hadPreviousFailure, setHadPreviousFailure] = useState(false);

  if (!isOpen) return null;

  const isOptimization = challenge.type === 'optimize_algorithm' && !!challenge.optimizationComparison;
  const isSnakeDebugging = challenge.skillCategory === 'debugging' || !!challenge.bugInfo;

  const prospectiveReward = calculateCorrectMovement(
    challenge.difficulty,
    attemptCount === 1 && !hadPreviousFailure,
    hadPreviousFailure
  );

  const prospectivePenalty = calculateIncorrectPenalty(consecutiveIncorrect + 1);

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const correct = selectedOption === (challenge.correctOptionIndex ?? 0);
    setIsCorrect(correct);
    setHasSubmitted(true);

    if (!correct) {
      setHadPreviousFailure(true);
    }
  };

  const handleFinish = () => {
    const isFirst = attemptCount === 1 && !hadPreviousFailure;
    const isRecovery = hadPreviousFailure && isCorrect;

    onSubmit({
      challengeId: challenge.id,
      squareId: challenge.squareId,
      isCorrect,
      selectedOptionIndex: selectedOption ?? undefined,
      scoreAwarded: isCorrect ? (challenge.difficulty === 'hard' ? 60 : challenge.difficulty === 'medium' ? 35 : 20) : 3,
      timeSpentSeconds: 15,
      hintUsed: showHint,
      skillCategory: challenge.skillCategory,
      topic: challenge.topic,
      feedback: isCorrect ? 'Concept verified successfully' : challenge.explanation
    }, isFirst, isRecovery);

    // Reset local state
    setSelectedOption(null);
    setShowHint(false);
    setHasSubmitted(false);
    setAttemptCount(1);
    setHadPreviousFailure(false);
  };

  const handleRetry = () => {
    // Player failed attempt and wants to try again to get Recovery reward!
    const isFirst = attemptCount === 1 && !hadPreviousFailure;
    
    // First trigger the penalty movement for the incorrect attempt
    onSubmit({
      challengeId: challenge.id,
      squareId: challenge.squareId,
      isCorrect: false,
      selectedOptionIndex: selectedOption ?? undefined,
      scoreAwarded: 3,
      timeSpentSeconds: 15,
      hintUsed: showHint,
      skillCategory: challenge.skillCategory,
      topic: challenge.topic,
      feedback: challenge.explanation
    }, isFirst, false);

    // Allow retry on this challenge
    setAttemptCount(prev => prev + 1);
    setHasSubmitted(false);
    setSelectedOption(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#0c1427] border border-[#233554] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-slate-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1e293b] bg-[#0a1020]">
          <div className="flex items-center gap-2.5">
            {isOptimization ? (
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Zap className="w-4 h-4" />
              </span>
            ) : isSnakeDebugging ? (
              <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <Bug className="w-4 h-4" />
              </span>
            ) : (
              <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <Layers className="w-4 h-4" />
              </span>
            )}
            <div>
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-2">
                <span>Tile {challenge.squareId} &bull; {challenge.topic}</span>
                <span className="px-1.5 py-0.2 rounded bg-slate-800 text-blue-300 font-mono text-[10px]">
                  {challenge.difficulty.toUpperCase()}
                </span>
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                {challenge.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#141e33] hover:bg-[#1e2d4d] text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Movement Stakes Banner */}
        <div className="px-5 py-2 bg-[#121c33] border-b border-[#1c2944] flex items-center justify-between text-[11px] flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Success: {prospectiveReward.badgeText}</span>
          </div>
          <div className="flex items-center gap-1.5 text-rose-400 font-semibold">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Mistake: {prospectivePenalty.badgeText}</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-4 text-xs sm:text-sm">
          {/* Prompt statement */}
          <div className="p-3.5 rounded-xl bg-[#142038] border border-[#1e2e4f] text-slate-100 font-medium leading-relaxed">
            {challenge.prompt}
          </div>

          {/* Optimization Ladder: Side-by-Side Tradeoff Comparison */}
          {isOptimization && challenge.optimizationComparison && (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Brute Force Card */}
                <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-800/40">
                  <div className="flex items-center justify-between text-rose-300 font-bold mb-1">
                    <span>{challenge.optimizationComparison.bruteForce.approachTitle}</span>
                    <span className="font-mono text-xs">{challenge.optimizationComparison.bruteForce.timeComplexity}</span>
                  </div>
                  <pre className="p-2 rounded bg-black/40 font-mono text-[10px] text-slate-300 overflow-x-auto my-1">
                    {challenge.optimizationComparison.bruteForce.codeSnippet}
                  </pre>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {challenge.optimizationComparison.bruteForce.explanation}
                  </p>
                </div>

                {/* Optimal Solution Card */}
                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-700/50">
                  <div className="flex items-center justify-between text-emerald-300 font-bold mb-1">
                    <span>{challenge.optimizationComparison.optimal.approachTitle}</span>
                    <span className="font-mono text-xs">{challenge.optimizationComparison.optimal.timeComplexity}</span>
                  </div>
                  <pre className="p-2 rounded bg-black/40 font-mono text-[10px] text-emerald-200 overflow-x-auto my-1">
                    {challenge.optimizationComparison.optimal.codeSnippet}
                  </pre>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {challenge.optimizationComparison.optimal.explanation}
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-800/40 text-amber-200 text-xs">
                <strong>Why It Scales:</strong> {challenge.optimizationComparison.whyOptimalWorks}
              </div>
            </div>
          )}

          {/* Code Snippet */}
          {!isOptimization && challenge.codeSnippet && (
            <div className="rounded-xl overflow-hidden border border-[#233554] bg-[#070d18]">
              <div className="px-3 py-1.5 bg-[#0a1220] border-b border-[#1b2a44] text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Code Example</span>
                <span className="text-[10px] text-blue-400">TypeScript / Python</span>
              </div>
              <pre className="p-3.5 font-mono text-xs text-blue-200 overflow-x-auto leading-relaxed">
                <code>{challenge.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Dry Run Tracing Steps */}
          {challenge.traceSteps && (
            <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-[#0d1629] border border-[#1d2d4c]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Execution Dry-Run
              </span>
              <div className="flex flex-col gap-1">
                {challenge.traceSteps.map((s, i) => (
                  <div key={i} className="text-xs text-slate-300 flex items-center gap-2">
                    <span className="px-1.5 py-0.2 bg-blue-500/20 text-blue-400 font-mono rounded text-[10px]">
                      Step {s.step}
                    </span>
                    <span>{s.explanation}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Options List */}
          {challenge.options && (
            <div className="flex flex-col gap-2 mt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Select the Optimal Answer:
              </span>
              {challenge.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let optionStyle = 'bg-[#121c32] border-[#223355] text-slate-200 hover:border-blue-500/60';

                if (hasSubmitted) {
                  if (idx === challenge.correctOptionIndex) {
                    optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold shadow-md shadow-emerald-500/10';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 shadow-md shadow-rose-500/10';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-500/20';
                }

                return (
                  <button
                    key={idx}
                    disabled={hasSubmitted}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full p-3 rounded-xl border text-left flex items-start gap-3 transition cursor-pointer disabled:cursor-default ${optionStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-xs sm:text-sm leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Hint Button & Disclosure */}
          {challenge.hints && challenge.hints.length > 0 && (
            <div className="mt-1">
              {!showHint ? (
                <button
                  onClick={() => setShowHint(true)}
                  className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  Request algorithmic hint
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 text-amber-200 text-xs">
                  <div className="font-bold mb-1 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" />
                    Algorithmic Hint:
                  </div>
                  {challenge.hints.map((h, i) => (
                    <p key={i} className="text-[11px] text-amber-300/90 leading-relaxed mb-0.5">&bull; {h}</p>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Post-submission Evaluation & Explanation */}
          {hasSubmitted && (
            <div className={`p-4 rounded-xl border flex flex-col gap-2 ${
              isCorrect ? 'bg-emerald-950/50 border-emerald-600 text-emerald-200' : 'bg-rose-950/50 border-rose-600 text-rose-200'
            }`}>
              <div className="flex items-center justify-between font-bold text-sm">
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span>{prospectiveReward.explanation}</span>
                    </>
                  ) : (
                    <>
                      <AlertOctagon className="w-5 h-5 text-rose-400" />
                      <span>{prospectivePenalty.explanation}</span>
                    </>
                  )}
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {challenge.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-5 py-3.5 border-t border-[#1e293b] bg-[#0a1020] flex items-center justify-between">
          <div className="text-xs text-slate-400 font-medium">
            Category: <span className="text-slate-200 capitalize">{challenge.skillCategory}</span> &bull; 
            Difficulty: <span className="text-slate-200 capitalize">{challenge.difficulty}</span>
          </div>

          <div className="flex items-center gap-2.5">
            {!hasSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-blue-600/30 transition cursor-pointer disabled:cursor-not-allowed"
              >
                Submit Answer
              </button>
            ) : !isCorrect ? (
              <button
                onClick={handleRetry}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry for Comeback (+1 Recovery Tile)</span>
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-emerald-600/30 transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue Forward</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
