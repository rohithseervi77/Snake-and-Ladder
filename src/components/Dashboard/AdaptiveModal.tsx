import React from 'react';
import { 
  BrainCircuit, 
  X, 
  Target, 
  TrendingUp, 
  Play, 
  CheckCircle2, 
  AlertCircle 
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[88vh] bg-[#0f172a] border border-indigo-700/50 rounded-2xl sm:rounded-3xl shadow-2xl p-5 flex flex-col text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#1e293b]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <BrainCircuit className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-white">Adaptive Learning Intelligence</h2>
              <p className="text-xs text-slate-400">Diagnosis, skill mastery tracking & recommendations</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="py-4 overflow-y-auto flex-1 flex flex-col gap-4 text-xs">
          {/* Top Stats Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl bg-[#141e35] border border-[#223356] text-center">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Total Attempts</div>
              <div className="text-base font-black text-white mt-0.5">{learnerProfile.totalAttempts}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#141e35] border border-[#223356] text-center">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Accuracy</div>
              <div className="text-base font-black text-emerald-400 mt-0.5">
                {(learnerProfile.overallAccuracy * 100).toFixed(0)}%
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#141e35] border border-[#223356] text-center">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Ladders Leaped</div>
              <div className="text-base font-black text-amber-400 mt-0.5">{learnerProfile.laddersClimbed}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#141e35] border border-[#223356] text-center">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Snakes Avoided</div>
              <div className="text-base font-black text-rose-400 mt-0.5">{learnerProfile.snakesEncountered}</div>
            </div>
          </div>

          {/* Explainable Recommendations */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2.5 flex items-center gap-1.5">
              <Target className="w-4 h-4" />
              <span>Targeted Remediation & Recommendations</span>
            </h3>

            <div className="flex flex-col gap-2.5">
              {learnerProfile.recentRecommendations.length === 0 ? (
                <div className="p-3 rounded-xl bg-[#131d33] border border-[#1e2a44] text-slate-400 text-center">
                  Complete more challenges to generate personalized adaptive recommendations.
                </div>
              ) : (
                learnerProfile.recentRecommendations.map(rec => (
                  <div 
                    key={rec.id}
                    className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-700/40 flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-white text-xs sm:text-sm">{rec.headline}</div>
                        <p className="text-[11px] text-indigo-200 mt-0.5">{rec.explanation}</p>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          onJumpToSquare(rec.targetSquareId);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer flex-shrink-0"
                      >
                        <Play className="w-3 h-3" />
                        Square {rec.targetSquareId}
                      </button>
                    </div>

                    <div className="text-[10px] text-slate-400 border-t border-indigo-800/30 pt-1.5 flex items-center justify-between">
                      <span>Evidence: {rec.evidence}</span>
                      <span className="font-semibold text-indigo-300">{rec.recommendedAction}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Topic Masteries breakdown */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Topic Mastery Matrix</span>
            </h3>

            {Object.keys(learnerProfile.topicMasteries).length === 0 ? (
              <p className="text-slate-500 text-center py-2">
                Roll the dice and solve challenges to populate your mastery matrix.
              </p>
            ) : (
              <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
                {Object.values(learnerProfile.topicMasteries).map(tm => (
                  <div 
                    key={tm.topicId}
                    className="p-2.5 rounded-lg bg-[#141e33] border border-[#202e4f] flex items-center justify-between"
                  >
                    <div>
                      <span className="font-semibold text-slate-200">{tm.topicName}</span>
                      <span className="text-[10px] text-slate-400 ml-2">
                        {tm.correct}/{tm.attempts} correct ({tm.streak} streak)
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      tm.accuracy >= 0.8 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
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
        <div className="pt-3 border-t border-[#1e293b] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#1e293b] hover:bg-[#334155] text-xs font-semibold text-slate-300 transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
