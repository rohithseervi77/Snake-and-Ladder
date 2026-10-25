import React, { useState } from 'react';
import { X, AlertCircle, RefreshCw, CheckCircle2, HelpCircle } from 'lucide-react';
import { LearnerProfile } from '../../types/learner';
import { CHALLENGE_MAP } from '../../data/challenges';
import { Challenge } from '../../types/challenge';

interface MistakeLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  learnerProfile: LearnerProfile;
  onRetryChallenge?: (challenge: Challenge) => void;
}

export const MistakeLogModal: React.FC<MistakeLogModalProps> = ({
  isOpen,
  onClose,
  learnerProfile,
  onRetryChallenge
}) => {
  const [filterCO, setFilterCO] = useState<string>('All');

  if (!isOpen) return null;

  // Find all incorrect attempts
  const incorrectAttempts = learnerProfile.attemptHistory.filter(h => !h.isCorrect);

  // Deduplicate by challengeId (keep latest)
  const uniqueMistakesMap = new Map<string, typeof incorrectAttempts[0]>();
  incorrectAttempts.forEach(attempt => {
    uniqueMistakesMap.set(attempt.challengeId, attempt);
  });
  const mistakes = Array.from(uniqueMistakesMap.values()).reverse();

  const filteredMistakes = mistakes.filter(m => {
    const challenge = CHALLENGE_MAP.get(m.challengeId);
    if (!challenge) return true;
    if (filterCO === 'All') return true;
    return challenge.co === filterCO;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[var(--border-subtle)] bg-[var(--header-bg)]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[var(--color-rose-light)] text-[var(--color-rose)] border border-[var(--color-rose-border)]">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[var(--text-primary)] tracking-tight">
                Academic Mistake Log & Remediation
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Review your misconceptions, study the correct concepts, and retry questions to cement your mastery
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-secondary-bg)] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-3 sm:p-4 border-b border-[var(--border-subtle)] bg-[var(--card-secondary-bg)] flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[var(--text-secondary)]">Filter by Syllabus CO:</span>
            {['All', 'CO1', 'CO2', 'CO3', 'CO4'].map(co => (
              <button
                key={co}
                onClick={() => setFilterCO(co)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  filterCO === co
                    ? 'bg-[var(--color-rose)] text-white shadow-sm'
                    : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                }`}
              >
                {co}
              </button>
            ))}
          </div>
          <span className="text-xs text-[var(--text-secondary)] font-medium">
            Total Logged Mistakes: <span className="font-bold text-[var(--color-rose)]">{mistakes.length}</span>
          </span>
        </div>

        {/* Mistake Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {filteredMistakes.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[var(--color-emerald-light)] text-[var(--color-emerald)] flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">
                {mistakes.length === 0 ? 'No Mistakes Logged Yet!' : 'No Mistakes in Selected Category'}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
                {mistakes.length === 0
                  ? 'As you encounter challenging questions on the board, any incorrect attempts will appear here for targeted review and retry.'
                  : 'Great job! You have no unresolved misconceptions in this course outcome category.'}
              </p>
            </div>
          ) : (
            filteredMistakes.map(item => {
              const challenge = CHALLENGE_MAP.get(item.challengeId);
              return (
                <div
                  key={item.challengeId}
                  className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border-subtle)] hover:border-[var(--color-rose-border)] transition-all shadow-sm flex flex-col gap-3"
                >
                  {/* Item Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--color-rose-light)] text-[var(--color-rose)] border border-[var(--color-rose-border)]">
                        Square {item.squareId}
                      </span>
                      {challenge?.co && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--color-cyan-light)] text-[var(--color-cyan)] border border-[var(--color-cyan-border)]">
                          {challenge.co}
                        </span>
                      )}
                      <span className="text-xs font-semibold text-[var(--text-secondary)]">
                        Topic: <strong className="text-[var(--text-primary)]">{item.topic}</strong>
                      </span>
                    </div>

                    {challenge && onRetryChallenge && (
                      <button
                        onClick={() => {
                          onClose();
                          onRetryChallenge(challenge);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--color-indigo)] hover:bg-[var(--color-indigo-hover)] text-white text-xs font-bold transition shadow-sm cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Retry</span>
                      </button>
                    )}
                  </div>

                  {/* Question Prompt */}
                  {challenge && (
                    <div className="text-xs font-bold text-[var(--text-primary)] leading-relaxed">
                      {challenge.title}
                    </div>
                  )}

                  {/* Code snippet if present */}
                  {challenge?.codeSnippet && (
                    <div className="p-2.5 rounded-lg bg-[var(--board-bg)] border border-[var(--border-subtle)] font-mono text-[11px] text-[var(--text-secondary)] overflow-x-auto">
                      <pre className="m-0">{challenge.codeSnippet}</pre>
                    </div>
                  )}

                  {/* Pedagogical Explanation & Correct Answer */}
                  {challenge && (
                    <div className="p-3 rounded-lg bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col gap-2">
                      <div className="text-xs text-[var(--text-secondary)] flex items-start gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-emerald)] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[var(--text-primary)]">Correct Solution: </span>
                          <span className="font-semibold text-[var(--color-emerald)]">
                            {challenge.correctOptionIndex !== undefined && challenge.options
                              ? `${challenge.options[challenge.correctOptionIndex]}`
                              : challenge.correctAnswerText || 'Review concept explanation below'}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-[var(--text-secondary)] flex items-start gap-1.5">
                        <HelpCircle className="w-4 h-4 text-[var(--color-indigo)] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[var(--text-primary)]">Explanation: </span>
                          {challenge.explanation}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--header-bg)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
          <span>Targeted remediation based on learning history</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[var(--card-secondary-bg)] hover:bg-[var(--card-bg)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-bold text-xs transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
