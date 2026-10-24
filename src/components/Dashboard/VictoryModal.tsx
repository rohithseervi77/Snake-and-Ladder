import React from 'react';
import { 
  Trophy, 
  Crown, 
  Sparkles, 
  RotateCcw, 
  X, 
  Target, 
  CheckCircle, 
  Compass
} from 'lucide-react';
import { TopicMasteryScore } from '../../types/evolution';

interface VictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayAgain: () => void;
  totalScore: number;
  coins?: number;
  laddersClimbed: number;
  snakesEncountered?: number;
  turnsCompleted?: number;
  questionsAttempted?: number;
  questionsCorrect?: number;
  longestStreak?: number;
  energyUsed?: number;
  topicMasteryMap?: Record<string, TopicMasteryScore>;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  onClose,
  onPlayAgain,
  totalScore,
  coins = 0,
  laddersClimbed,
  snakesEncountered = 0,
  turnsCompleted = 0,
  questionsAttempted = 0,
  questionsCorrect = 0,
  longestStreak = 0,
  energyUsed = 0,
  topicMasteryMap = {}
}) => {
  if (!isOpen) return null;

  const totalAttempts = Math.max(1, questionsAttempted || 1);
  const accuracy = Math.round(((questionsCorrect || 0) / totalAttempts) * 100);

  // Compute Topic Strengths and Focus Areas
  const topicsArray = Object.values(topicMasteryMap);
  const sortedTopics = [...topicsArray].sort((a, b) => b.score - a.score);
  
  const strengths = sortedTopics.slice(0, 2);
  const focusAreas = sortedTopics.length > 2 
    ? [...sortedTopics].reverse().slice(0, 2) 
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[var(--modal-bg)] border-2 border-[var(--color-amber)] rounded-3xl shadow-2xl overflow-hidden text-[var(--text-primary)] transition-colors duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="victory-modal-title"
      >
        <button 
          onClick={onClose} 
          aria-label="Close Victory Review"
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-[var(--card-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 flex flex-col items-center text-center">
          {/* Big Trophy Graphic */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-[var(--color-amber)] shadow-xl shadow-[var(--color-amber)]/30 flex items-center justify-center text-white mb-3 animate-bounce">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 fill-white" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-amber-light)] text-[var(--color-amber)] border border-[var(--color-amber-border)] text-xs font-bold uppercase tracking-wider mb-2">
            <Crown className="w-3.5 h-3.5" />
            DSA Grandmaster Achieved
          </div>

          <h2 id="victory-modal-title" className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Congratulations, Developer!
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-md mx-auto leading-relaxed">
            You have ascended all 100 Squares of Code & Ladders, vanquished the Master Bug Titan, and proven algorithmic mastery!
          </p>

          {/* Performance Overview Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full my-5">
            <div className="p-3 rounded-2xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-center shadow-sm">
              <div className="text-[10px] text-[var(--text-secondary)] uppercase font-semibold">Final XP</div>
              <div className="text-lg sm:text-xl font-black text-[var(--color-indigo)] mt-0.5">{totalScore}</div>
            </div>
            <div className="p-3 rounded-2xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-center shadow-sm">
              <div className="text-[10px] text-[var(--text-secondary)] uppercase font-semibold">Coins Earned</div>
              <div className="text-lg sm:text-xl font-black text-[var(--color-amber)] mt-0.5">{coins} 🪙</div>
            </div>
            <div className="p-3 rounded-2xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-center shadow-sm">
              <div className="text-[10px] text-[var(--text-secondary)] uppercase font-semibold">Accuracy</div>
              <div className="text-lg sm:text-xl font-black text-[var(--color-emerald)] mt-0.5">
                {questionsAttempted > 0 ? `${accuracy}%` : '100%'}
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-center shadow-sm">
              <div className="text-[10px] text-[var(--text-secondary)] uppercase font-semibold">Best Streak</div>
              <div className="text-lg sm:text-xl font-black text-[var(--color-orange)] mt-0.5">{longestStreak} 🔥</div>
            </div>
          </div>

          {/* Secondary Statistical Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full text-left bg-[var(--card-secondary-bg)] p-3 rounded-2xl border border-[var(--border-subtle)] mb-5 text-[11px]">
            <div>
              <span className="text-[var(--text-secondary)]">Total Moves: </span>
              <span className="font-bold text-[var(--text-primary)]">{turnsCompleted} turns</span>
            </div>
            <div>
              <span className="text-[var(--text-secondary)]">Ladders Leaped: </span>
              <span className="font-bold text-[var(--color-emerald)]">{laddersClimbed}</span>
            </div>
            <div>
              <span className="text-[var(--text-secondary)]">Traps Encountered: </span>
              <span className="font-bold text-[var(--color-rose)]">{snakesEncountered}</span>
            </div>
            <div>
              <span className="text-[var(--text-secondary)]">Energy Cast: </span>
              <span className="font-bold text-[var(--color-cyan)]">{energyUsed} ⚡</span>
            </div>
          </div>

          {/* Post-Game Topic Analysis & Recommendations */}
          <div className="w-full text-left flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
              <Target className="w-4 h-4 text-[var(--color-indigo)]" />
              <span>Cognitive Mastery & Recommended Practice</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Strengths */}
              <div className="p-3.5 rounded-2xl bg-[var(--card-secondary-bg)] border border-[var(--color-emerald-border)] shadow-sm">
                <div className="flex items-center gap-1.5 font-bold text-[var(--color-emerald)] text-xs mb-2">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Top Demonstrated Strengths:</span>
                </div>
                {strengths.length > 0 ? (
                  <div className="flex flex-col gap-1.5">
                    {strengths.map((t, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-[var(--text-primary)] font-medium">{t.topicName}</span>
                        <span className="px-2 py-0.5 rounded bg-[var(--color-emerald-light)] text-[var(--color-emerald)] font-mono text-[10px] font-bold border border-[var(--color-emerald-border)]">
                          {t.score}% Mastery
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[var(--text-secondary)]">Consistent performance across all curriculum stages.</p>
                )}
              </div>

              {/* Recommended Focus */}
              <div className="p-3.5 rounded-2xl bg-[var(--card-secondary-bg)] border border-[var(--color-amber-border)] shadow-sm">
                <div className="flex items-center gap-1.5 font-bold text-[var(--color-amber)] text-xs mb-2">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Recommended Revision Focus:</span>
                </div>
                {focusAreas.length > 0 ? (
                  <div className="flex flex-col gap-1.5">
                    {focusAreas.map((t, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-[var(--text-primary)] font-medium">{t.topicName}</span>
                        <span className="px-2 py-0.5 rounded bg-[var(--color-amber-light)] text-[var(--color-amber)] font-mono text-[10px] font-bold border border-[var(--color-amber-border)]">
                          {t.score}% Mastery
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[var(--text-secondary)]">All topics validated at interview-ready proficiency!</p>
                )}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)] flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[var(--color-cyan)] flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-[var(--text-primary)]">Next Milestone:</strong> Practice implementing the optimal O(N) Space-Time tradeoffs for your lowest-scoring topics on LeetCode / NeetCode 150 to lock in your interview readiness!
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 border-t border-[var(--border-subtle)] bg-[var(--card-secondary-bg)] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer"
          >
            Review Board
          </button>
          <button
            onClick={onPlayAgain}
            className="px-6 py-2.5 rounded-xl bg-[var(--color-indigo)] hover:bg-[var(--color-indigo-hover)] text-white font-black text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Start New Journey</span>
          </button>
        </div>
      </div>
    </div>
  );
};
