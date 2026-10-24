import React from 'react';
import { 
  X, 
  Dna, 
  AlertTriangle, 
  ShieldAlert, 
  Sparkles, 
  Activity, 
  ArrowRight,
  TrendingDown,
  Target
} from 'lucide-react';
import { LearnerProfile } from '../../types/learner';
import { MisconceptionRecord, TopicMasteryScore } from '../../types/evolution';
import { generateErrorDnaProfile, CognitiveErrorCategory } from '../../engine/errorDnaEngine';

interface ErrorDNAModalProps {
  isOpen: boolean;
  onClose: () => void;
  learnerProfile: LearnerProfile;
  misconceptions: MisconceptionRecord[];
  topicMasteryMap: Record<string, TopicMasteryScore>;
  onJumpToDrill: (squareId: number) => void;
}

export const ErrorDNAModal: React.FC<ErrorDNAModalProps> = ({
  isOpen,
  onClose,
  learnerProfile,
  misconceptions,
  topicMasteryMap,
  onJumpToDrill
}) => {
  if (!isOpen) return null;

  const dna = generateErrorDnaProfile(learnerProfile, misconceptions, topicMasteryMap);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#080D1A]/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#111827] border border-[#263449] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-[#F8FAFC] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="error-dna-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#263449] bg-[#0B1220]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F43F5E]/20 border border-[#F43F5E]/40 flex items-center justify-center text-[#F43F5E] shrink-0">
              <Dna className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#F43F5E] font-mono">
                  Cognitive Diagnostic Report
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#080D1A] border border-[#263449] text-[#94A3B8] font-mono">
                  {dna.totalMistakesAnalyzed} Signals Analyzed
                </span>
              </div>
              <h2 id="error-dna-title" className="text-base sm:text-lg font-black text-[#F8FAFC] leading-tight">
                Cognitive Error DNA
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#172033] hover:bg-[#263449] border border-[#263449] text-[#94A3B8] hover:text-[#F8FAFC] transition cursor-pointer"
            aria-label="Close Error DNA Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4 text-xs sm:text-sm">
          {/* Top Banner: Primary Vector & Learning Debt */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Primary Vector Card */}
            <div className="sm:col-span-2 p-3.5 rounded-2xl bg-[#172033] border border-[#F43F5E]/40 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#F43F5E] uppercase tracking-wider flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Primary Friction Vector ({dna.primaryVector.percentage}%)
                </span>
                <h3 className="text-sm sm:text-base font-black text-[#F8FAFC] mt-1">
                  {dna.primaryVector.displayName}
                </h3>
                <p className="text-[11px] text-[#94A3B8] mt-1 leading-relaxed">
                  {dna.primaryVector.description}
                </p>
              </div>
              <div className="mt-2.5 pt-2 border-t border-[#263449] text-[10.5px] text-[#F43F5E] font-medium">
                💡 <strong>Remedial Focus:</strong> {dna.primaryVector.remedialFocus}
              </div>
            </div>

            {/* Learning Debt Card */}
            <div className="p-3.5 rounded-2xl bg-[#172033] border border-[#263449] flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-mono font-bold text-[#F59E0B] uppercase tracking-wider flex items-center gap-1 mb-1">
                <TrendingDown className="w-3.5 h-3.5" />
                Learning Debt
              </span>
              <div className="text-3xl font-black font-mono text-[#F59E0B]">
                {dna.learningDebtPercentage}%
              </div>
              <p className="text-[10px] text-[#94A3B8] mt-1 leading-tight">
                Curriculum deficit across unmastered topics.
              </p>
            </div>
          </div>

          {/* Error Vectors Distribution Breakdown */}
          <div className="p-4 rounded-2xl bg-[#172033] border border-[#263449] flex flex-col gap-2.5">
            <span className="text-[11px] font-mono font-bold text-[#94A3B8] uppercase tracking-wider">
              Diagnostic Vector Distribution
            </span>
            <div className="flex flex-col gap-2">
              {(Object.keys(dna.categoryBreakdown) as CognitiveErrorCategory[]).map(catKey => {
                const item = dna.categoryBreakdown[catKey];
                return (
                  <div key={catKey} className="flex flex-col gap-0.5">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-semibold text-[#F8FAFC]">{item.displayName}</span>
                      <span className="font-mono text-[#94A3B8]">{item.count} errors ({item.percentage}%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#080D1A] rounded-full overflow-hidden border border-[#263449]">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          catKey === dna.primaryVector.category
                            ? 'bg-[#F43F5E]'
                            : 'bg-[#2563EB]'
                        }`}
                        style={{ width: `${Math.max(2, item.percentage)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prescribed Targeted Drills */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-mono font-bold text-[#22D3EE] uppercase tracking-wider flex items-center gap-1">
              <Target className="w-3.5 h-3.5" />
              Prescribed Remedial Drills
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {dna.recommendedDrills.map((drill, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-xl bg-[#172033] border border-[#263449] hover:border-[#22D3EE] transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#22D3EE] mb-1">
                      <span>Tile {drill.targetSquare}</span>
                      <span className="px-1.5 py-0.2 rounded bg-[#080D1A] border border-[#263449] text-[#22D3EE]">
                        {drill.topic}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-[#F8FAFC] leading-tight">
                      {drill.title}
                    </h4>
                    <p className="text-[10.5px] text-[#94A3B8] mt-1 leading-snug">
                      {drill.rationale}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onJumpToDrill(drill.targetSquare);
                    }}
                    className="mt-2.5 w-full py-1.5 px-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] text-[#F8FAFC] text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Launch Drill</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#263449] bg-[#0B1220] flex items-center justify-between text-xs text-[#94A3B8]">
          <span>Error DNA updates dynamically after every challenge attempt.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#172033] hover:bg-[#263449] border border-[#263449] text-[#94A3B8] hover:text-[#F8FAFC] font-bold text-xs transition cursor-pointer"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
