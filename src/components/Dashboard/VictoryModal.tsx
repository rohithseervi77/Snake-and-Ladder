import React from 'react';
import { 
  Trophy, 
  Crown, 
  Sparkles, 
  RotateCcw, 
  X, 
  TrendingUp, 
  Target, 
  Award, 
  Zap, 
  CheckCircle, 
  AlertCircle,
  Compass,
  ArrowRight
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#080D1A]/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#111827] border-2 border-[#F59E0B] rounded-3xl shadow-2xl overflow-hidden text-[#F8FAFC]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="victory-modal-title"
      >
        <button 
          onClick={onClose} 
          aria-label="Close Victory Review"
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#080D1A] border border-[#263449] text-[#94A3B8] hover:text-[#F8FAFC] transition cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 flex flex-col items-center text-center">
          {/* Big Trophy Graphic */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-[#F59E0B] shadow-xl shadow-[#F59E0B]/30 flex items-center justify-center text-[#080D1A] mb-3 animate-bounce">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 fill-[#080D1A]" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40 text-xs font-bold uppercase tracking-wider mb-2">
            <Crown className="w-3.5 h-3.5" />
            DSA Grandmaster Achieved
          </div>

          <h2 id="victory-modal-title" className="text-2xl sm:text-3xl font-black text-[#F8FAFC] tracking-tight">
            Congratulations, Developer!
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-md mx-auto leading-relaxed">
            You have ascended all 100 Squares of Code & Ladders, vanquished the Master Bug Titan, and proven algorithmic mastery!
          </p>

          {/* Performance Overview Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full my-5">
            <div className="p-3 rounded-2xl bg-[#172033] border border-[#263449] text-center">
              <div className="text-[10px] text-[#94A3B8] uppercase font-semibold">Final XP</div>
              <div className="text-lg sm:text-xl font-black text-[#22D3EE] mt-0.5">{totalScore}</div>
            </div>
            <div className="p-3 rounded-2xl bg-[#172033] border border-[#263449] text-center">
              <div className="text-[10px] text-[#94A3B8] uppercase font-semibold">Coins Earned</div>
              <div className="text-lg sm:text-xl font-black text-[#F59E0B] mt-0.5">{coins} 🪙</div>
            </div>
            <div className="p-3 rounded-2xl bg-[#172033] border border-[#263449] text-center">
              <div className="text-[10px] text-[#94A3B8] uppercase font-semibold">Accuracy</div>
              <div className="text-lg sm:text-xl font-black text-[#10B981] mt-0.5">
                {questionsAttempted > 0 ? `${accuracy}%` : '100%'}
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-[#172033] border border-[#263449] text-center">
              <div className="text-[10px] text-[#94A3B8] uppercase font-semibold">Best Streak</div>
              <div className="text-lg sm:text-xl font-black text-[#F59E0B] mt-0.5">{longestStreak} 🔥</div>
            </div>
          </div>

          {/* Secondary Statistical Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full text-left bg-[#080D1A] p-3 rounded-2xl border border-[#263449] mb-5 text-[11px]">
            <div>
              <span className="text-[#94A3B8]">Total Moves: </span>
              <span className="font-bold text-[#F8FAFC]">{turnsCompleted} turns</span>
            </div>
            <div>
              <span className="text-[#94A3B8]">Ladders Leaped: </span>
              <span className="font-bold text-[#10B981]">{laddersClimbed}</span>
            </div>
            <div>
              <span className="text-[#94A3B8]">Traps Encountered: </span>
              <span className="font-bold text-[#F43F5E]">{snakesEncountered}</span>
            </div>
            <div>
              <span className="text-[#94A3B8]">Energy Cast: </span>
              <span className="font-bold text-[#22D3EE]">{energyUsed} ⚡</span>
            </div>
          </div>

          {/* Post-Game Topic Analysis & Recommendations */}
          <div className="w-full text-left flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] flex items-center gap-1.5">
              <Target className="w-4 h-4 text-[#22D3EE]" />
              <span>Cognitive Mastery & Recommended Practice</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Strengths */}
              <div className="p-3.5 rounded-2xl bg-[#172033] border border-[#10B981]/40">
                <div className="flex items-center gap-1.5 font-bold text-[#10B981] text-xs mb-2">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Top Demonstrated Strengths:</span>
                </div>
                {strengths.length > 0 ? (
                  <div className="flex flex-col gap-1.5">
                    {strengths.map((t, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-[#F8FAFC] font-medium">{t.topicName}</span>
                        <span className="px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] font-mono text-[10px] font-bold border border-[#10B981]/40">
                          {t.score}% Mastery
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#94A3B8]">Consistent performance across all curriculum stages.</p>
                )}
              </div>

              {/* Recommended Focus */}
              <div className="p-3.5 rounded-2xl bg-[#172033] border border-[#F59E0B]/40">
                <div className="flex items-center gap-1.5 font-bold text-[#F59E0B] text-xs mb-2">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Recommended Revision Focus:</span>
                </div>
                {focusAreas.length > 0 ? (
                  <div className="flex flex-col gap-1.5">
                    {focusAreas.map((t, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-[#F8FAFC] font-medium">{t.topicName}</span>
                        <span className="px-2 py-0.5 rounded bg-[#F59E0B]/20 text-[#F59E0B] font-mono text-[10px] font-bold border border-[#F59E0B]/40">
                          {t.score}% Mastery
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#94A3B8]">All topics validated at interview-ready proficiency!</p>
                )}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#172033] border border-[#2563EB]/40 text-[11px] text-[#CBD5E1] flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#22D3EE] flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#F8FAFC]">Next Milestone:</strong> Practice implementing the optimal O(N) Space-Time tradeoffs for your lowest-scoring topics on LeetCode / NeetCode 150 to lock in your interview readiness!
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 border-t border-[#263449] bg-[#0B1220] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#172033] hover:bg-[#263449] border border-[#263449] text-xs font-bold text-[#94A3B8] hover:text-[#F8FAFC] transition cursor-pointer"
          >
            Review Board
          </button>
          <button
            onClick={onPlayAgain}
            className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-[#F8FAFC] font-black text-xs sm:text-sm shadow-lg shadow-[#2563EB]/25 transition flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Start New Journey</span>
          </button>
        </div>
      </div>
    </div>
  );
};
