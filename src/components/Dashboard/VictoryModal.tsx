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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-gradient-to-b from-[#131b36] via-[#0d1428] to-[#070b16] border-2 border-amber-400/80 rounded-3xl shadow-2xl overflow-hidden text-slate-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="victory-modal-title"
      >
        <button 
          onClick={onClose} 
          aria-label="Close Victory Review"
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-black/40 text-slate-400 hover:text-white transition cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 flex flex-col items-center text-center">
          {/* Big Trophy Graphic */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 shadow-xl shadow-amber-500/30 flex items-center justify-center text-slate-950 mb-3 animate-bounce">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 fill-slate-950" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider mb-2">
            <Crown className="w-3.5 h-3.5" />
            DSA Grandmaster Achieved
          </div>

          <h2 id="victory-modal-title" className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Congratulations, Developer!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto leading-relaxed">
            You have ascended all 100 Squares of Code & Ladders, vanquished the Master Bug Titan, and proven algorithmic mastery!
          </p>

          {/* Performance Overview Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full my-5">
            <div className="p-3 rounded-2xl bg-[#14203d] border border-[#233560] text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Final XP</div>
              <div className="text-lg sm:text-xl font-black text-yellow-400 mt-0.5">{totalScore}</div>
            </div>
            <div className="p-3 rounded-2xl bg-[#14203d] border border-[#233560] text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Coins Earned</div>
              <div className="text-lg sm:text-xl font-black text-amber-300 mt-0.5">{coins} 🪙</div>
            </div>
            <div className="p-3 rounded-2xl bg-[#14203d] border border-[#233560] text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Accuracy</div>
              <div className="text-lg sm:text-xl font-black text-emerald-400 mt-0.5">
                {questionsAttempted > 0 ? `${accuracy}%` : '100%'}
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-[#14203d] border border-[#233560] text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Best Streak</div>
              <div className="text-lg sm:text-xl font-black text-orange-400 mt-0.5">{longestStreak} 🔥</div>
            </div>
          </div>

          {/* Secondary Statistical Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full text-left bg-black/30 p-3 rounded-2xl border border-slate-800/80 mb-5 text-[11px]">
            <div>
              <span className="text-slate-400">Total Moves: </span>
              <span className="font-bold text-white">{turnsCompleted} turns</span>
            </div>
            <div>
              <span className="text-slate-400">Ladders Leaped: </span>
              <span className="font-bold text-emerald-300">{laddersClimbed}</span>
            </div>
            <div>
              <span className="text-slate-400">Traps Encountered: </span>
              <span className="font-bold text-rose-300">{snakesEncountered}</span>
            </div>
            <div>
              <span className="text-slate-400">Energy Cast: </span>
              <span className="font-bold text-cyan-300">{energyUsed} ⚡</span>
            </div>
          </div>

          {/* Post-Game Topic Analysis & Recommendations */}
          <div className="w-full text-left flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-blue-400" />
              <span>Cognitive Mastery & Recommended Practice</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Strengths */}
              <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-700/40">
                <div className="flex items-center gap-1.5 font-bold text-emerald-300 text-xs mb-2">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Top Demonstrated Strengths:</span>
                </div>
                {strengths.length > 0 ? (
                  <div className="flex flex-col gap-1.5">
                    {strengths.map((t, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-slate-200 font-medium">{t.topicName}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                          {t.score}% Mastery
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">Consistent performance across all curriculum stages.</p>
                )}
              </div>

              {/* Recommended Focus */}
              <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-700/40">
                <div className="flex items-center gap-1.5 font-bold text-amber-300 text-xs mb-2">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Recommended Revision Focus:</span>
                </div>
                {focusAreas.length > 0 ? (
                  <div className="flex flex-col gap-1.5">
                    {focusAreas.map((t, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-slate-200 font-medium">{t.topicName}</span>
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold">
                          {t.score}% Mastery
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">All topics validated at interview-ready proficiency!</p>
                )}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-800/40 text-[11px] text-blue-200 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Next Milestone:</strong> Practice implementing the optimal O(N) Space-Time tradeoffs for your lowest-scoring topics on LeetCode / NeetCode 150 to lock in your interview readiness!
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 border-t border-[#1e293b] bg-[#080d1a] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#17223b] hover:bg-[#223257] text-xs font-bold text-slate-200 transition cursor-pointer"
          >
            Review Board
          </button>
          <button
            onClick={onPlayAgain}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Start New Journey</span>
          </button>
        </div>
      </div>
    </div>
  );
};
