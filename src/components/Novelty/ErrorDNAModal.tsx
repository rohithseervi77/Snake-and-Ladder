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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#0c1527] border-2 border-[#243556] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-slate-200 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="error-dna-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1e2d4d] bg-[#091020]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
              <Dna className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400 font-mono">
                  Cognitive Diagnostic Report
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                  {dna.totalMistakesAnalyzed} Signals Analyzed
                </span>
              </div>
              <h2 id="error-dna-title" className="text-base sm:text-lg font-black text-white leading-tight">
                Cognitive Error DNA
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#141e33] hover:bg-[#1e2d4d] text-slate-400 hover:text-white transition cursor-pointer"
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
            <div className="sm:col-span-2 p-3.5 rounded-2xl bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-950 border border-rose-600/40 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Primary Friction Vector ({dna.primaryVector.percentage}%)
                </span>
                <h3 className="text-sm sm:text-base font-black text-white mt-1">
                  {dna.primaryVector.displayName}
                </h3>
                <p className="text-[11px] text-slate-300/90 mt-1 leading-relaxed">
                  {dna.primaryVector.description}
                </p>
              </div>
              <div className="mt-2.5 pt-2 border-t border-rose-900/30 text-[10.5px] text-rose-300/90 font-medium">
                💡 <strong>Remedial Focus:</strong> {dna.primaryVector.remedialFocus}
              </div>
            </div>

            {/* Learning Debt Card */}
            <div className="p-3.5 rounded-2xl bg-[#091020] border border-[#1e2c4a] flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                <TrendingDown className="w-3.5 h-3.5" />
                Learning Debt
              </span>
              <div className="text-3xl font-black font-mono text-amber-400">
                {dna.learningDebtPercentage}%
              </div>
              <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                Curriculum deficit across unmastered topics.
              </p>
            </div>
          </div>

          {/* Error Vectors Distribution Breakdown */}
          <div className="p-4 rounded-2xl bg-[#091122] border border-[#1b2b48] flex flex-col gap-2.5">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Diagnostic Vector Distribution
            </span>
            <div className="flex flex-col gap-2">
              {(Object.keys(dna.categoryBreakdown) as CognitiveErrorCategory[]).map(catKey => {
                const item = dna.categoryBreakdown[catKey];
                return (
                  <div key={catKey} className="flex flex-col gap-0.5">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-semibold text-slate-300">{item.displayName}</span>
                      <span className="font-mono text-slate-400">{item.count} errors ({item.percentage}%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          catKey === dna.primaryVector.category
                            ? 'bg-rose-500'
                            : 'bg-indigo-500/70'
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
            <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
              <Target className="w-3.5 h-3.5" />
              Prescribed Remedial Drills
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {dna.recommendedDrills.map((drill, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-xl bg-[#0b1428] border border-cyan-800/40 hover:border-cyan-500/70 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300 mb-1">
                      <span>Tile {drill.targetSquare}</span>
                      <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                        {drill.topic}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white leading-tight">
                      {drill.title}
                    </h4>
                    <p className="text-[10.5px] text-slate-300/80 mt-1 leading-snug">
                      {drill.rationale}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onJumpToDrill(drill.targetSquare);
                    }}
                    className="mt-2.5 w-full py-1.5 px-2.5 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/40 text-cyan-200 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
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
        <div className="px-5 py-3 border-t border-[#1e2d4d] bg-[#091020] flex items-center justify-between text-xs text-slate-400">
          <span>Error DNA updates dynamically after every challenge attempt.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition cursor-pointer"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
