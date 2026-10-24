import React from 'react';
import { 
  BrainCircuit, 
  X, 
  Target, 
  TrendingUp, 
  Play 
} from 'lucide-react';
import { LearnerProfile } from '../../types/learner';

interface AdaptiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  learnerProfile: LearnerProfile;
  onJumpToSquare: (squareId: number) => void;
}

export const AdaptiveModal: React.FC<AdaptiveModalProps> = ({
  isOpen,
  onClose,
  learnerProfile,
  onJumpToSquare
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[88vh] bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl sm:rounded-3xl shadow-2xl p-5 flex flex-col text-[var(--text-primary)] transition-colors duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[var(--color-indigo-light)] text-[var(--color-indigo)] border border-[var(--color-indigo-border)]">
              <BrainCircuit className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)]">Adaptive Learning Intelligence</h2>
              <p className="text-xs text-[var(--text-secondary)]">Diagnosis, skill mastery tracking & recommendations</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="py-4 overflow-y-auto flex-1 flex flex-col gap-4 text-xs">
          {/* Top Stats Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-center shadow-sm">
              <div className="text-[10px] text-[var(--text-secondary)] font-semibold uppercase">Total Attempts</div>
              <div className="text-base font-black text-[var(--text-primary)] mt-0.5">{learnerProfile.totalAttempts}</div>
            </div>
            <div className="p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-center shadow-sm">
              <div className="text-[10px] text-[var(--text-secondary)] font-semibold uppercase">Accuracy</div>
              <div className="text-base font-black text-[var(--color-emerald)] mt-0.5">
                {(learnerProfile.overallAccuracy * 100).toFixed(0)}%
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-center shadow-sm">
              <div className="text-[10px] text-[var(--text-secondary)] font-semibold uppercase">Ladders Leaped</div>
              <div className="text-base font-black text-[var(--color-amber)] mt-0.5">{learnerProfile.laddersClimbed}</div>
            </div>
            <div className="p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-center shadow-sm">
              <div className="text-[10px] text-[var(--text-secondary)] font-semibold uppercase">Snakes Avoided</div>
              <div className="text-base font-black text-[var(--color-rose)] mt-0.5">{learnerProfile.snakesEncountered}</div>
            </div>
          </div>

          {/* Explainable Recommendations */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-cyan)] mb-2.5 flex items-center gap-1.5">
              <Target className="w-4 h-4" />
              <span>Targeted Remediation & Recommendations</span>
            </h3>

            <div className="flex flex-col gap-2.5">
              {learnerProfile.recentRecommendations.length === 0 ? (
                <div className="p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] text-center">
                  Complete more challenges to generate personalized adaptive recommendations.
                </div>
              ) : (
                learnerProfile.recentRecommendations.map(rec => (
                  <div 
                    key={rec.id}
                    className="p-3.5 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col gap-2 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-[var(--text-primary)] text-xs sm:text-sm">{rec.headline}</div>
                        <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">{rec.explanation}</p>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          onJumpToSquare(rec.targetSquareId);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[var(--color-indigo)] hover:bg-[var(--color-indigo-hover)] text-white font-bold text-xs flex items-center gap-1 cursor-pointer flex-shrink-0 shadow-sm active:scale-95"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        Square {rec.targetSquareId}
                      </button>
                    </div>

                    <div className="text-[10px] text-[var(--text-muted)] border-t border-[var(--border-subtle)] pt-1.5 flex items-center justify-between">
                      <span>Evidence: {rec.evidence}</span>
                      <span className="font-semibold text-[var(--color-cyan)]">{rec.recommendedAction}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Topic Masteries breakdown */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[var(--color-indigo)]" />
              <span>Topic Mastery Matrix</span>
            </h3>

            {Object.keys(learnerProfile.topicMasteries).length === 0 ? (
              <p className="text-[var(--text-muted)] text-center py-2">
                Roll the dice and solve challenges to populate your mastery matrix.
              </p>
            ) : (
              <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
                {Object.values(learnerProfile.topicMasteries).map(tm => (
                  <div 
                    key={tm.topicId}
                    className="p-2.5 rounded-lg bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex items-center justify-between shadow-sm"
                  >
                    <div>
                      <span className="font-semibold text-[var(--text-primary)]">{tm.topicName}</span>
                      <span className="text-[10px] text-[var(--text-secondary)] ml-2">
                        {tm.correct}/{tm.attempts} correct ({tm.streak} streak)
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      tm.accuracy >= 0.8 
                        ? 'bg-[var(--color-emerald-light)] text-[var(--color-emerald)] border-[var(--color-emerald-border)]' 
                        : 'bg-[var(--color-amber-light)] text-[var(--color-amber)] border-[var(--color-amber-border)]'
                    }`}>
                      {(tm.accuracy * 100).toFixed(0)}% Accuracy
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[var(--border-subtle)] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
