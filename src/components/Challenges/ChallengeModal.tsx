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
  const [confidenceLevel, setConfidenceLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [reasoningChoice, setReasoningChoice] = useState<number | null>(null);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-[var(--text-primary)] transition-colors duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="challenge-modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--card-secondary-bg)]">
          <div className="flex items-center gap-2.5">
            {isOptimization ? (
              <span className="p-1.5 rounded-lg bg-[var(--color-amber-light)] text-[var(--color-amber)] border border-[var(--color-amber-border)]">
                <Zap className="w-4 h-4" />
              </span>
            ) : isSnakeDebugging ? (
              <span className="p-1.5 rounded-lg bg-[var(--color-rose-light)] text-[var(--color-rose)] border border-[var(--color-rose-border)]">
                <Bug className="w-4 h-4" />
              </span>
            ) : (
              <span className="p-1.5 rounded-lg bg-[var(--color-indigo-light)] text-[var(--color-indigo)] border border-[var(--color-indigo-border)]">
                <Layers className="w-4 h-4" />
              </span>
            )}
            <div>
              <span className="text-[11px] uppercase font-bold tracking-wider text-[var(--text-secondary)] flex items-center gap-2">
                <span>Tile {challenge.squareId} &bull; {challenge.topic}</span>
                <span className="px-1.5 py-0.2 rounded bg-[var(--card-bg)] border border-[var(--border-subtle)] text-[var(--color-cyan)] font-mono text-[10px]">
                  {challenge.difficulty.toUpperCase()}
                </span>
                {activeShield && (
                  <span className="px-1.5 py-0.2 rounded bg-[var(--color-indigo-light)] text-[var(--color-indigo)] border border-[var(--color-indigo-border)] font-bold text-[10px] flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Shield Active
                  </span>
                )}
              </span>
              <h2 id="challenge-modal-title" className="text-base sm:text-lg font-bold text-[var(--text-primary)] leading-tight">
                {challenge.title}
              </h2>
            </div>
          </div>

          <button
            onClick={handleModalClose}
            aria-label="Close Challenge"
            className="p-1.5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Movement Stakes Banner */}
        <div className="px-5 py-2 bg-[var(--card-secondary-bg)] border-b border-[var(--border-subtle)] flex items-center justify-between text-[11px] flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-[var(--color-emerald)] font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Success: {prospectiveReward.badgeText}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[var(--color-rose)] font-semibold">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>
              Mistake: {activeShield ? '🛡️ Absorbed by Invariant Shield (0 penalty)' : prospectivePenalty.badgeText}
            </span>
          </div>
        </div>

        {/* Forfeit Confirmation Banner */}
        {showForfeitConfirm && (
          <div className="px-5 py-3 bg-[var(--color-rose-light)] border-b border-[var(--color-rose-border)] flex items-center justify-between gap-3 text-xs text-[var(--text-primary)] animate-fadeIn">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[var(--color-rose)] flex-shrink-0" />
              <span>Conceding will apply the standard mistake penalty ({prospectivePenalty.badgeText}). Are you sure?</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setShowForfeitConfirm(false)}
                className="px-2.5 py-1 rounded bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-xs font-semibold cursor-pointer"
              >
                Keep Trying
              </button>
              <button
                onClick={handleConfirmForfeit}
                className="px-2.5 py-1 rounded bg-[var(--color-rose)] hover:opacity-90 text-white text-xs font-bold cursor-pointer"
              >
                Concede & Slide Back
              </button>
            </div>
          </div>
        )}

        {/* Second Chance Notification */}
        {secondChanceUsed && (
          <div className="px-5 py-2 bg-[var(--color-amber-light)] border-b border-[var(--color-amber-border)] text-xs text-[var(--text-primary)] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--color-amber)]" />
            <span><strong>SECOND CHANCE TRIGGERED:</strong> Incorrect penalty waived! Select another answer.</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-4 text-xs sm:text-sm">
          {/* Prompt statement */}
          <div className="p-3.5 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-medium leading-relaxed shadow-sm">
            {challenge.prompt}
          </div>

          {/* Code Snippet */}
          {!isOptimization && challenge.codeSnippet && (
            <div className="rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--card-secondary-bg)] shadow-sm">
              <div className="px-3 py-1.5 bg-[var(--card-bg)] border-b border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-secondary)] flex items-center justify-between">
                <span>Code Example</span>
                <span className="text-[10px] text-[var(--color-indigo)]">TypeScript / Python</span>
              </div>
              <pre className="p-3.5 font-mono text-xs text-[var(--color-indigo)] overflow-x-auto leading-relaxed">
                <code>{challenge.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Dry Run Tracing Steps */}
          {challenge.traceSteps && (
            <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Execution Dry-Run
              </span>
              <div className="flex flex-col gap-1">
                {challenge.traceSteps.map((s, i) => (
                  <div key={i} className="text-xs text-[var(--text-primary)] flex items-center gap-2">
                    <span className="px-1.5 py-0.2 bg-[var(--color-indigo-light)] text-[var(--color-indigo)] border border-[var(--color-indigo-border)] font-mono rounded text-[10px]">
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
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                  Select the Optimal Answer:
                </span>
                {!hasSubmitted && eliminatedOptions.length === 0 && energy >= 20 && (
                  <button
                    onClick={handleDebugScan}
                    className="flex items-center gap-1 text-[11px] font-semibold text-[var(--color-cyan)] hover:opacity-80 bg-[var(--card-secondary-bg)] border border-[var(--color-cyan-border)] px-2 py-0.5 rounded cursor-pointer"
                  >
                    <Search className="w-3 h-3" />
                    <span>Debug Scan: Eliminate 1 Choice (20⚡)</span>
                  </button>
                )}
              </div>
              {challenge.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isEliminated = eliminatedOptions.includes(idx);
                let optionStyle = 'bg-[var(--card-bg)] border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--color-indigo)]/70 shadow-sm';

                if (isEliminated) {
                  optionStyle = 'bg-[var(--card-secondary-bg)] border-[var(--border-subtle)] text-[var(--text-muted)] line-through opacity-50 cursor-not-allowed';
                } else if (hasSubmitted) {
                  if (idx === challenge.correctOptionIndex) {
                    optionStyle = 'bg-[var(--color-emerald-light)] border-2 border-[var(--color-emerald)] text-[var(--color-emerald)] font-semibold shadow-sm';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'bg-[var(--color-rose-light)] border-2 border-[var(--color-rose)] text-[var(--color-rose)] shadow-sm';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-[var(--color-indigo-light)] border-2 border-[var(--color-indigo)] text-[var(--text-primary)] shadow-sm';
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
                      <span className="text-[10px] uppercase font-bold text-[var(--color-rose)] bg-[var(--color-rose-light)] px-1.5 py-0.5 rounded border border-[var(--color-rose-border)]">
                        Eliminated
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Metacognitive Calibration: Confidence Rating */}
          {!hasSubmitted && (
            <div className="p-3 rounded-xl bg-[#080D1A] border border-[#263449] flex flex-col gap-1.5 mt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#F8FAFC] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
                  Metacognitive Calibration: How confident are you?
                </span>
                <span className="text-[10px] text-[#94A3B8] font-mono">Confidence vs Accuracy</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { level: 'low', label: 'Unsure (30%)', desc: 'Educated guess' },
                  { level: 'medium', label: 'Moderate (70%)', desc: 'Fairly confident' },
                  { level: 'high', label: 'Certain (95%)', desc: 'Proof verified' }
                ].map(c => (
                  <button
                    key={c.level}
                    type="button"
                    onClick={() => setConfidenceLevel(c.level as any)}
                    className={`p-2 rounded-lg border text-center transition cursor-pointer ${
                      confidenceLevel === c.level
                        ? c.level === 'low'
                          ? 'bg-[#22D3EE]/20 border-[#22D3EE] text-[#22D3EE] font-bold shadow-sm'
                          : c.level === 'medium'
                          ? 'bg-[#F59E0B]/20 border-[#F59E0B] text-[#F59E0B] font-bold shadow-sm'
                          : 'bg-[#10B981]/20 border-[#10B981] text-[#10B981] font-bold shadow-sm'
                        : 'bg-[#172033] border-[#263449] text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <div className="text-xs">{c.label}</div>
                    <div className="text-[9.5px] opacity-75">{c.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Explain-Your-Answer Reasoning Justification for Hard/Expert/Optimization Challenges */}
          {!hasSubmitted && (challenge.difficulty === 'hard' || challenge.difficulty === 'expert' || isOptimization) && (
            <div className="p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col gap-2 mt-1">
              <span className="text-xs font-bold text-[var(--color-amber)] flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-[var(--color-amber)]" />
                Explain Your Answer: Why does this strategy scale?
              </span>
              <div className="flex flex-col gap-1.5">
                {[
                  'It maintains strict inductive invariants while bounding auxiliary memory allocation',
                  'It executes parallel hardware instructions to bypass CPU clock limits',
                  'It relies on compiler garbage collection to handle unbounded recursion'
                ].map((reason, rIdx) => (
                  <button
                    key={rIdx}
                    type="button"
                    onClick={() => setReasoningChoice(rIdx)}
                    className={`p-2 rounded-lg border text-left text-xs transition cursor-pointer ${
                      reasoningChoice === rIdx
                        ? 'bg-[var(--color-amber-light)] border-[var(--color-amber)] text-[var(--text-primary)] font-semibold'
                        : 'bg-[var(--card-bg)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Progressive 3-Tier Hint Section */}
          {challenge.hints && challenge.hints.length > 0 && (
            <div className="mt-1 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[var(--text-secondary)] flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-[var(--color-amber)]" />
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
                            ? 'bg-[var(--color-amber-light)] border-[var(--color-amber-border)] text-[var(--color-amber)]' 
                            : canAfford
                              ? 'bg-[var(--card-secondary-bg)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--color-amber)]'
                              : 'bg-[var(--card-secondary-bg)] border-[var(--border-subtle)] text-[var(--text-muted)] opacity-50 cursor-not-allowed'
                        }`}
                      >
                        Hint {tier} {tier === 1 ? '(Free)' : tier === 2 ? '(10⚡)' : '(15⚡)'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {unlockedHintTier > 0 && (
                <div className="p-3 rounded-xl bg-[var(--color-amber-light)] border border-[var(--color-amber-border)] text-[var(--text-primary)] text-xs flex flex-col gap-1.5 animate-fadeIn">
                  {challenge.hints.slice(0, unlockedHintTier).map((h, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="px-1.5 py-0.2 rounded bg-[var(--card-bg)] text-[var(--color-amber)] font-mono text-[10px]">
                        Tier {i + 1}
                      </span>
                      <p className="text-[11px] text-[var(--text-primary)] leading-relaxed">{h}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Post-submission Deep Explanation with Objective & Trap */}
          {hasSubmitted && (
            <div className={`p-4 rounded-xl border flex flex-col gap-3 animate-fadeIn ${
              isCorrect ? 'bg-[var(--color-emerald-light)] border-[var(--color-emerald-border)] text-[var(--text-primary)]' : 'bg-[var(--color-rose-light)] border-[var(--color-rose-border)] text-[var(--text-primary)]'
            }`}>
              <div className="flex items-center justify-between font-bold text-sm">
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-[var(--color-emerald)]" />
                      <span className="text-[var(--color-emerald)]">{prospectiveReward.explanation}</span>
                    </>
                  ) : (
                    <>
                      <AlertOctagon className="w-5 h-5 text-[var(--color-rose)]" />
                      <span className="text-[var(--color-rose)]">
                        {activeShield 
                          ? 'Shield absorbed the penalty! 0 backward movement.' 
                          : prospectivePenalty.explanation}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {challenge.explanation}
              </p>

              {/* Metacognitive Diagnostic Insight */}
              <div className="p-3 rounded-xl bg-[var(--card-bg)] border border-[var(--border-subtle)] flex items-start gap-2.5 text-xs shadow-sm">
                <span className="text-lg">
                  {isCorrect && confidenceLevel === 'high' ? '🎯' :
                   !isCorrect && confidenceLevel === 'high' ? '⚠️' :
                   isCorrect && confidenceLevel === 'low' ? '💡' : '📚'}
                </span>
                <div>
                  <div className="font-bold text-[var(--text-primary)]">
                    {isCorrect && confidenceLevel === 'high' ? 'Calibrated Technical Mastery! 🎯' :
                     !isCorrect && confidenceLevel === 'high' ? 'Overconfidence Blindspot Detected! ⚠️' :
                     isCorrect && confidenceLevel === 'low' ? 'Algorithmic Intuition Verified! 💡' : 'Constructive Gap Identified 📚'}
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-snug">
                    {isCorrect && confidenceLevel === 'high'
                      ? 'You were highly confident and your algorithmic reasoning was spot-on. True technical mastery demonstrated!'
                      : !isCorrect && confidenceLevel === 'high'
                      ? 'You felt 95% certain, but tripped on a subtle edge case or invariant. Review the pitfall analysis below to eliminate this blindspot.'
                      : isCorrect && confidenceLevel === 'low'
                      ? 'You doubted your knowledge, but your conceptual intuition was correct! Trust your algorithmic pattern recognition.'
                      : 'You accurately anticipated uncertainty. Systematic review of this concept will solidify the missing invariant.'}
                  </p>
                </div>
              </div>

              {/* Learning Objective & Trap */}
              {(challenge.learningObjective || challenge.commonMistake) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[var(--border-subtle)] text-[11px]">
                  {challenge.learningObjective && (
                    <div className="p-2 rounded bg-[var(--card-bg)] border border-[var(--border-subtle)] flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[var(--color-cyan)] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[var(--color-cyan)]">Core Takeaway: </span>
                        <span className="text-[var(--text-secondary)]">{challenge.learningObjective}</span>
                      </div>
                    </div>
                  )}
                  {challenge.commonMistake && (
                    <div className="p-2 rounded bg-[var(--card-bg)] border border-[var(--border-subtle)] flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-[var(--color-amber)] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[var(--color-amber)]">Common Pitfall: </span>
                        <span className="text-[var(--text-secondary)]">{challenge.commonMistake}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-5 py-3.5 border-t border-[var(--border-subtle)] bg-[var(--card-secondary-bg)] flex items-center justify-between">
          <div className="text-xs text-[var(--text-secondary)] font-medium">
            Category: <span className="text-[var(--text-primary)] capitalize">{challenge.skillCategory}</span> &bull; 
            Difficulty: <span className="text-[var(--text-primary)] capitalize">{challenge.difficulty}</span>
          </div>

          <div className="flex items-center gap-2.5">
            {!hasSubmitted ? (
              <>
                <button
                  onClick={() => setShowForfeitConfirm(true)}
                  className="px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--color-rose)] cursor-pointer transition"
                >
                  Concede (-penalty)
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={selectedOption === null}
                  className="px-5 py-2 rounded-xl bg-[var(--color-indigo)] hover:bg-[var(--color-indigo-hover)] disabled:opacity-50 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition cursor-pointer disabled:cursor-not-allowed active:scale-95"
                >
                  Submit Answer
                </button>
              </>
            ) : !isCorrect ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleFinish(false)}
                  className="px-3.5 py-2 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-semibold text-xs transition cursor-pointer"
                >
                  Accept Penalty & Continue
                </button>
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 rounded-xl bg-[var(--color-indigo)] hover:bg-[var(--color-indigo-hover)] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retry for Comeback (+1 Recovery Tile)</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleFinish(false)}
                className="px-5 py-2 rounded-xl bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition flex items-center gap-1.5 cursor-pointer active:scale-95"
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
