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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-[var(--text-primary)] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="error-dna-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--card-secondary-bg)]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F43F5E]/20 border border-[#F43F5E]/40 flex items-center justify-center text-[#F43F5E] shrink-0">
              <Dna className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#F43F5E] font-mono">
                  Cognitive Diagnostic Report
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--card-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-mono">
                  {dna.totalMistakesAnalyzed} Signals Analyzed
                </span>
              </div>
              <h2 id="error-dna-title" className="text-base sm:text-lg font-black text-[var(--text-primary)] leading-tight">
                Cognitive Error DNA
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer"
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
            <div className="sm:col-span-2 p-3.5 rounded-2xl bg-[var(--card-secondary-bg)] border border-[#F43F5E]/40 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#F43F5E] uppercase tracking-wider flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Primary Friction Vector ({dna.primaryVector.percentage}%)
                </span>
                <h3 className="text-sm sm:text-base font-black text-[var(--text-primary)] mt-1">
                  {dna.primaryVector.displayName}
                </h3>
                <p className="text-[11px] text-[var(--text-secondary)] mt-1 leading-relaxed">
                  {dna.primaryVector.description}
                </p>
              </div>
              <div className="mt-2.5 pt-2 border-t border-[var(--border-subtle)] text-[10.5px] text-[#F43F5E] font-medium">
                💡 <strong>Remedial Focus:</strong> {dna.primaryVector.remedialFocus}
              </div>
            </div>

            {/* Learning Debt Card */}
            <div className="p-3.5 rounded-2xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-mono font-bold text-[#F59E0B] uppercase tracking-wider flex items-center gap-1 mb-1">
                <TrendingDown className="w-3.5 h-3.5" />
                Learning Debt
              </span>
              <div className="text-3xl font-black font-mono text-[#F59E0B]">
                {dna.learningDebtPercentage}%
              </div>
              <p className="text-[10px] text-[var(--text-secondary)] mt-1 leading-tight">
                Curriculum deficit across unmastered topics.
              </p>
            </div>
          </div>

          {/* Error Vectors Distribution Breakdown */}
          <div className="p-4 rounded-2xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col gap-2.5">
            <span className="text-[11px] font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider">
              Diagnostic Vector Distribution
            </span>
            <div className="flex flex-col gap-2">
              {(Object.keys(dna.categoryBreakdown) as CognitiveErrorCategory[]).map(catKey => {
                const item = dna.categoryBreakdown[catKey];
                return (
                  <div key={catKey} className="flex flex-col gap-0.5">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-semibold text-[var(--text-primary)]">{item.displayName}</span>
                      <span className="font-mono text-[var(--text-secondary)]">{item.count} errors ({item.percentage}%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-[var(--card-bg)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          catKey === dna.primaryVector.category
                            ? 'bg-[#F43F5E]'
                            : 'bg-[#6366F1]'
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
            <span className="text-[11px] font-mono font-bold text-[#06B6D4] uppercase tracking-wider flex items-center gap-1">
              <Target className="w-3.5 h-3.5" />
              Prescribed Remedial Drills
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {dna.recommendedDrills.map((drill, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] hover:border-[#06B6D4] transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#06B6D4] mb-1">
                      <span>Tile {drill.targetSquare}</span>
                      <span className="px-1.5 py-0.2 rounded bg-[var(--card-bg)] border border-[var(--border-subtle)] text-[#06B6D4]">
                        {drill.topic}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-[var(--text-primary)] leading-tight">
                      {drill.title}
                    </h4>
                    <p className="text-[10.5px] text-[var(--text-secondary)] mt-1 leading-snug">
                      {drill.rationale}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onJumpToDrill(drill.targetSquare);
                    }}
                    className="mt-2.5 w-full py-1.5 px-2.5 rounded-lg bg-[#6366F1] hover:bg-[#4F46E5] text-white text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
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
        <div className="px-5 py-3 border-t border-[var(--border-subtle)] bg-[var(--card-secondary-bg)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
          <span>Error DNA updates dynamically after every challenge attempt.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold text-xs transition cursor-pointer"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
