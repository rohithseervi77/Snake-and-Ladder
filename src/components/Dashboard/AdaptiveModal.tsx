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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080D1A]/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[88vh] bg-[#111827] border border-[#263449] rounded-2xl sm:rounded-3xl shadow-2xl p-5 flex flex-col text-[#F8FAFC]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#263449]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#2563EB]/20 text-[#22D3EE] border border-[#2563EB]/40">
              <BrainCircuit className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-[#F8FAFC]">Adaptive Learning Intelligence</h2>
              <p className="text-xs text-[#94A3B8]">Diagnosis, skill mastery tracking & recommendations</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#F8FAFC] cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="py-4 overflow-y-auto flex-1 flex flex-col gap-4 text-xs">
          {/* Top Stats Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl bg-[#172033] border border-[#263449] text-center">
              <div className="text-[10px] text-[#94A3B8] font-semibold uppercase">Total Attempts</div>
              <div className="text-base font-black text-[#F8FAFC] mt-0.5">{learnerProfile.totalAttempts}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#172033] border border-[#263449] text-center">
              <div className="text-[10px] text-[#94A3B8] font-semibold uppercase">Accuracy</div>
              <div className="text-base font-black text-[#10B981] mt-0.5">
                {(learnerProfile.overallAccuracy * 100).toFixed(0)}%
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#172033] border border-[#263449] text-center">
              <div className="text-[10px] text-[#94A3B8] font-semibold uppercase">Ladders Leaped</div>
              <div className="text-base font-black text-[#F59E0B] mt-0.5">{learnerProfile.laddersClimbed}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#172033] border border-[#263449] text-center">
              <div className="text-[10px] text-[#94A3B8] font-semibold uppercase">Snakes Avoided</div>
              <div className="text-base font-black text-[#F43F5E] mt-0.5">{learnerProfile.snakesEncountered}</div>
            </div>
          </div>

          {/* Explainable Recommendations */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#22D3EE] mb-2.5 flex items-center gap-1.5">
              <Target className="w-4 h-4" />
              <span>Targeted Remediation & Recommendations</span>
            </h3>

            <div className="flex flex-col gap-2.5">
              {learnerProfile.recentRecommendations.length === 0 ? (
                <div className="p-3 rounded-xl bg-[#172033] border border-[#263449] text-[#94A3B8] text-center">
                  Complete more challenges to generate personalized adaptive recommendations.
                </div>
              ) : (
                learnerProfile.recentRecommendations.map(rec => (
                  <div 
                    key={rec.id}
                    className="p-3.5 rounded-xl bg-[#172033] border border-[#263449] flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-[#F8FAFC] text-xs sm:text-sm">{rec.headline}</div>
                        <p className="text-[11px] text-[#94A3B8] mt-0.5">{rec.explanation}</p>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          onJumpToSquare(rec.targetSquareId);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] text-[#F8FAFC] font-bold text-xs flex items-center gap-1 cursor-pointer flex-shrink-0"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        Square {rec.targetSquareId}
                      </button>
                    </div>

                    <div className="text-[10px] text-[#64748B] border-t border-[#263449] pt-1.5 flex items-center justify-between">
                      <span>Evidence: {rec.evidence}</span>
                      <span className="font-semibold text-[#22D3EE]">{rec.recommendedAction}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Topic Masteries breakdown */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Topic Mastery Matrix</span>
            </h3>

            {Object.keys(learnerProfile.topicMasteries).length === 0 ? (
              <p className="text-[#64748B] text-center py-2">
                Roll the dice and solve challenges to populate your mastery matrix.
              </p>
            ) : (
              <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
                {Object.values(learnerProfile.topicMasteries).map(tm => (
                  <div 
                    key={tm.topicId}
                    className="p-2.5 rounded-lg bg-[#172033] border border-[#263449] flex items-center justify-between"
                  >
                    <div>
                      <span className="font-semibold text-[#F8FAFC]">{tm.topicName}</span>
                      <span className="text-[10px] text-[#94A3B8] ml-2">
                        {tm.correct}/{tm.attempts} correct ({tm.streak} streak)
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      tm.accuracy >= 0.8 
                        ? 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40' 
                        : 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/40'
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
        <div className="pt-3 border-t border-[#263449] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#172033] hover:bg-[#263449] border border-[#263449] text-xs font-semibold text-[#94A3B8] hover:text-[#F8FAFC] transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
