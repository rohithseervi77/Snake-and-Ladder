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
  RotateCcw,
  Shield,
  Search,
  Sparkles,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { Challenge, ChallengeAttemptResult } from '../../types/challenge';
import { calculateCorrectMovement, calculateIncorrectPenalty } from '../../engine/economyEngine';
import { EnergyAbility } from '../../types/evolution';

interface ChallengeModalProps {
  challenge: Challenge;
  isOpen: boolean;
  consecutiveIncorrect: number;
  energy?: number;
  activeShield?: boolean;
  activeSecondChance?: boolean;
  onClose: () => void;
  onSubmit: (result: ChallengeAttemptResult, isFirstAttempt: boolean, isRecovery: boolean) => void;
  onUseAbility?: (abilityId: EnergyAbility['id']) => void;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  challenge,
  isOpen,
  consecutiveIncorrect,
  energy = 0,
  activeShield = false,
  activeSecondChance = false,
  onClose,
  onSubmit,
  onUseAbility
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [unlockedHintTier, setUnlockedHintTier] = useState<number>(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attemptCount, setAttemptCount] = useState(1);
  const [hadPreviousFailure, setHadPreviousFailure] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);
  const [secondChanceUsed, setSecondChanceUsed] = useState(false);
  const [showForfeitConfirm, setShowForfeitConfirm] = useState(false);

  if (!isOpen) return null;

  const isOptimization = challenge.type === 'optimize_algorithm' && !!challenge.optimizationComparison;
  const isSnakeDebugging = challenge.skillCategory === 'debugging' || !!challenge.bugInfo;

  const prospectiveReward = calculateCorrectMovement(
    challenge.difficulty,
    attemptCount === 1 && !hadPreviousFailure,
    hadPreviousFailure
  );

  const prospectivePenalty = calculateIncorrectPenalty(consecutiveIncorrect + 1);

  // Debug Scan: Eliminates 1 incorrect option
  const handleDebugScan = () => {
    if (energy < 20 || eliminatedOptions.length > 0) return;
    if (onUseAbility) {
      onUseAbility('debug_scan');
    }
    const correctIdx = challenge.correctOptionIndex ?? 0;
    const incorrectIndices = (challenge.options || [])
      .map((_, i) => i)
      .filter(i => i !== correctIdx && !eliminatedOptions.includes(i));
    
    if (incorrectIndices.length > 0) {
      const toEliminate = incorrectIndices[Math.floor(Math.random() * incorrectIndices.length)];
      setEliminatedOptions(prev => [...prev, toEliminate]);
    }
  };

  // Progressive Hint Unlock
  const handleUnlockHint = (targetTier: number) => {
    if (targetTier > unlockedHintTier) {
      if (targetTier >= 2 && onUseAbility) {
        onUseAbility('hint');
      }
      setUnlockedHintTier(targetTier);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const correct = selectedOption === (challenge.correctOptionIndex ?? 0);
    
    // Check if Second Chance ability is active and player failed
    if (!correct && (activeSecondChance || secondChanceUsed === false && activeSecondChance)) {
      setSecondChanceUsed(true);
      if (onUseAbility) {
        onUseAbility('second_chance');
      }
      setSelectedOption(null);
      return;
    }

    setIsCorrect(correct);
    setHasSubmitted(true);

    if (!correct) {
      setHadPreviousFailure(true);
    }
  };

  const handleFinish = (forceFail: boolean = false) => {
    const finalCorrect = forceFail ? false : isCorrect;
    const isFirst = attemptCount === 1 && !hadPreviousFailure && !forceFail;
    const isRecovery = hadPreviousFailure && finalCorrect;

    onSubmit({
      challengeId: challenge.id,
      squareId: challenge.squareId,
      isCorrect: finalCorrect,
      selectedOptionIndex: selectedOption ?? undefined,
      scoreAwarded: finalCorrect 
        ? (challenge.difficulty === 'hard' || challenge.difficulty === 'expert' ? 60 : challenge.difficulty === 'medium' ? 35 : 20) 
        : 3,
      timeSpentSeconds: 15,
      hintUsed: unlockedHintTier > 0,
      skillCategory: challenge.skillCategory,
      topic: challenge.topic,
      feedback: finalCorrect ? 'Concept verified successfully' : challenge.explanation
    }, isFirst, isRecovery);

    // Reset local state
    setSelectedOption(null);
    setUnlockedHintTier(0);
    setHasSubmitted(false);
    setAttemptCount(1);
    setHadPreviousFailure(false);
    setEliminatedOptions([]);
    setSecondChanceUsed(false);
    setShowForfeitConfirm(false);
  };

  const handleRetry = () => {
    // Player failed attempt and wants to try again for recovery bonus
    const isFirst = attemptCount === 1 && !hadPreviousFailure;
    
    // Execute penalty for this incorrect attempt
    onSubmit({
      challengeId: challenge.id,
      squareId: challenge.squareId,
      isCorrect: false,
      selectedOptionIndex: selectedOption ?? undefined,
      scoreAwarded: 3,
      timeSpentSeconds: 15,
      hintUsed: unlockedHintTier > 0,
      skillCategory: challenge.skillCategory,
      topic: challenge.topic,
      feedback: challenge.explanation
    }, isFirst, false);

    // Allow retry on this challenge
    setAttemptCount(prev => prev + 1);
    setHasSubmitted(false);
    setSelectedOption(null);
  };

  // Safe Close Handler: Prevents bypassing penalties!
  const handleModalClose = () => {
    if (hasSubmitted) {
      // If submitted and wrong, close must execute consequence
      handleFinish(false);
    } else {
      // Unsubmitted attempt: confirm forfeit
      setShowForfeitConfirm(true);
    }
  };

  const handleConfirmForfeit = () => {
    handleFinish(true); // Forfeit applies failure penalty
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#0b1326] border border-[#233554] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-slate-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="challenge-modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1e293b] bg-[#090f1e]">
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
                {activeShield && (
                  <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-[10px] flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Shield Active
                  </span>
                )}
              </span>
              <h2 id="challenge-modal-title" className="text-base sm:text-lg font-bold text-white leading-tight">
                {challenge.title}
              </h2>
            </div>
          </div>

          <button
            onClick={handleModalClose}
            aria-label="Close Challenge"
            className="p-1.5 rounded-lg bg-[#141e33] hover:bg-[#1e2d4d] text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Movement Stakes Banner */}
        <div className="px-5 py-2 bg-[#10192e] border-b border-[#1c2944] flex items-center justify-between text-[11px] flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Success: {prospectiveReward.badgeText}</span>
          </div>
          <div className="flex items-center gap-1.5 text-rose-400 font-semibold">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>
              Mistake: {activeShield ? '🛡️ Absorbed by Invariant Shield (0 penalty)' : prospectivePenalty.badgeText}
            </span>
          </div>
        </div>

        {/* Forfeit Confirmation Banner */}
        {showForfeitConfirm && (
          <div className="px-5 py-3 bg-rose-950/90 border-b border-rose-800 flex items-center justify-between gap-3 text-xs text-rose-200 animate-fadeIn">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>Conceding will apply the standard mistake penalty ({prospectivePenalty.badgeText}). Are you sure?</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setShowForfeitConfirm(false)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
              >
                Keep Trying
              </button>
              <button
                onClick={handleConfirmForfeit}
                className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer"
              >
                Concede & Slide Back
              </button>
            </div>
          </div>
        )}

        {/* Second Chance Notification */}
        {secondChanceUsed && (
          <div className="px-5 py-2 bg-amber-950/80 border-b border-amber-800 text-xs text-amber-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span><strong>SECOND CHANCE TRIGGERED:</strong> Incorrect penalty waived! Select another answer.</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-4 text-xs sm:text-sm">
          {/* Prompt statement */}
          <div className="p-3.5 rounded-xl bg-[#131d33] border border-[#1e2e4f] text-slate-100 font-medium leading-relaxed">
            {challenge.prompt}
          </div>

          {/* Optimization Ladder: Side-by-Side Tradeoff Comparison */}
          {isOptimization && challenge.optimizationComparison && (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              <div className="px-3 py-1.5 bg-[#091120] border-b border-[#1b2a44] text-[11px] font-mono text-slate-400 flex items-center justify-between">
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
            <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-[#0c1426] border border-[#1d2d4c]">
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
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Select the Optimal Answer:
                </span>
                {!hasSubmitted && eliminatedOptions.length === 0 && energy >= 20 && (
                  <button
                    onClick={handleDebugScan}
                    className="flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-800/60 px-2 py-0.5 rounded cursor-pointer"
                  >
                    <Search className="w-3 h-3" />
                    <span>Debug Scan: Eliminate 1 Choice (20⚡)</span>
                  </button>
                )}
              </div>
              {challenge.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isEliminated = eliminatedOptions.includes(idx);
                let optionStyle = 'bg-[#121c32] border-[#223355] text-slate-200 hover:border-blue-500/60';

                if (isEliminated) {
                  optionStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 line-through opacity-50 cursor-not-allowed';
                } else if (hasSubmitted) {
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
                    disabled={hasSubmitted || isEliminated}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full p-3 rounded-xl border text-left flex items-start gap-3 transition cursor-pointer disabled:cursor-default ${optionStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-xs sm:text-sm leading-snug flex-1">{opt}</span>
                    {isEliminated && (
                      <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-950/60 px-1.5 py-0.5 rounded">
                        Eliminated
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Progressive 3-Tier Hint Section */}
          {challenge.hints && challenge.hints.length > 0 && (
            <div className="mt-1 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  Progressive Hints:
                </span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3].map(tier => {
                    const isUnlocked = unlockedHintTier >= tier;
                    const canAfford = tier === 1 || energy >= (tier === 2 ? 10 : 15);
                    return (
                      <button
                        key={tier}
                        onClick={() => handleUnlockHint(tier)}
                        disabled={isUnlocked}
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold border transition cursor-pointer ${
                          isUnlocked 
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' 
                            : canAfford
                              ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-amber-300'
                              : 'bg-slate-900 border-slate-800 text-slate-600 opacity-50 cursor-not-allowed'
                        }`}
                      >
                        Hint {tier} {tier === 1 ? '(Free)' : tier === 2 ? '(10⚡)' : '(15⚡)'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {unlockedHintTier > 0 && (
                <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 text-amber-200 text-xs flex flex-col gap-1.5 animate-fadeIn">
                  {challenge.hints.slice(0, unlockedHintTier).map((h, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px]">
                        Tier {i + 1}
                      </span>
                      <p className="text-[11px] text-amber-200/90 leading-relaxed">{h}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Post-submission Deep Explanation with Objective & Trap */}
          {hasSubmitted && (
            <div className={`p-4 rounded-xl border flex flex-col gap-3 animate-fadeIn ${
              isCorrect ? 'bg-emerald-950/40 border-emerald-600 text-emerald-200' : 'bg-rose-950/40 border-rose-600 text-rose-200'
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
                      <span>
                        {activeShield 
                          ? 'Shield absorbed the penalty! 0 backward movement.' 
                          : prospectivePenalty.explanation}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {challenge.explanation}
              </p>

              {/* Learning Objective & Trap */}
              {(challenge.learningObjective || challenge.commonMistake) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                  {challenge.learningObjective && (
                    <div className="p-2 rounded bg-black/30 border border-slate-800 flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-blue-300">Core Takeaway: </span>
                        <span className="text-slate-300">{challenge.learningObjective}</span>
                      </div>
                    </div>
                  )}
                  {challenge.commonMistake && (
                    <div className="p-2 rounded bg-black/30 border border-slate-800 flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-300">Common Pitfall: </span>
                        <span className="text-slate-300">{challenge.commonMistake}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-5 py-3.5 border-t border-[#1e293b] bg-[#090f1e] flex items-center justify-between">
          <div className="text-xs text-slate-400 font-medium">
            Category: <span className="text-slate-200 capitalize">{challenge.skillCategory}</span> &bull; 
            Difficulty: <span className="text-slate-200 capitalize">{challenge.difficulty}</span>
          </div>

          <div className="flex items-center gap-2.5">
            {!hasSubmitted ? (
              <>
                <button
                  onClick={() => setShowForfeitConfirm(true)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  Concede (-penalty)
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={selectedOption === null}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-blue-600/30 transition cursor-pointer disabled:cursor-not-allowed"
                >
                  Submit Answer
                </button>
              </>
            ) : !isCorrect ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleFinish(false)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition cursor-pointer"
                >
                  Accept Penalty & Continue
                </button>
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retry for Comeback (+1 Recovery Tile)</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleFinish(false)}
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
