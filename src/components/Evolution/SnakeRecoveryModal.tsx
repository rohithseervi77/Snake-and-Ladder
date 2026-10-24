import React, { useState } from 'react';
import { AlertTriangle, Shield, Bug, ArrowDownRight, CheckCircle2, XCircle } from 'lucide-react';
import { IntelligentSnake, SnakeRecoveryChoice } from '../../types/evolution';

interface SnakeRecoveryModalProps {
  isOpen: boolean;
  snake: IntelligentSnake | null;
  hasShield: boolean;
  onUseShield: () => void;
  onSelectChoice: (choice: SnakeRecoveryChoice) => void;
  onClose: () => void;
}

export const SnakeRecoveryModal: React.FC<SnakeRecoveryModalProps> = ({
  isOpen,
  snake,
  hasShield,
  onUseShield,
  onSelectChoice,
}) => {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  if (!isOpen || !snake) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-rose-500/40 rounded-2xl p-6 shadow-2xl text-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Glow behind */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
            <Bug className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider text-rose-400 font-semibold">
                Snake Encounter &bull; Tile {snake.from} &rarr; {snake.to}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">{snake.name}</h2>
          </div>
        </div>

        {/* Shield Alert if active */}
        {hasShield && (
          <div className="mb-4 p-3 rounded-xl bg-indigo-950/60 border border-indigo-500/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-indigo-200">Invariant Shield is Active!</p>
                <p className="text-[11px] text-indigo-300">You can expend your shield to neutralize this snake descent completely.</p>
              </div>
            </div>
            <button
              onClick={onUseShield}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all shrink-0 ml-3"
            >
              Deflect with Shield
            </button>
          </div>
        )}

        {/* Misconception Lore & Code snippet */}
        <div className="space-y-3 mb-5 overflow-y-auto pr-1">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs">
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 pb-1 border-b border-slate-800 font-sans">
              <span className="font-medium text-rose-300 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                Algorithmic Bug Manifestation
              </span>
              <span className="text-slate-400">Category: {snake.misconceptionType}</span>
            </div>
            <pre className="text-rose-200 text-xs overflow-x-auto leading-relaxed">{snake.codeSnippet}</pre>
          </div>

          <p className="text-xs text-slate-300 bg-slate-800/40 p-3 rounded-lg border border-slate-800 leading-relaxed">
            <strong className="text-white">Why this trap triggers: </strong>
            {snake.explanation}
          </p>
        </div>

        {/* Recovery Choices */}
        <div className="mt-auto">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Choose Your Recovery Strategy:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {snake.choices.map((choice) => {
              const isAccept = choice.id === 'accept';
              const isConcept = choice.id === 'concept';
              const isDebug = choice.id === 'debugging';

              return (
                <button
                  key={choice.id}
                  onClick={() => {
                    setSelectedChoiceId(choice.id);
                    onSelectChoice(choice);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                    isAccept
                      ? 'bg-slate-900/80 border-slate-700/80 hover:border-slate-500'
                      : isConcept
                      ? 'bg-amber-950/20 border-amber-500/30 hover:border-amber-500/70'
                      : 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/70'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-white">{choice.title}</span>
                      {isAccept && <ArrowDownRight className="w-4 h-4 text-slate-400" />}
                      {isConcept && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                      {isDebug && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <p className="text-[11px] text-slate-300 mb-2 leading-relaxed">{choice.description}</p>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-mono">
                      Target: Tile {snake.to + choice.recoveryDelta}
                    </span>
                    <span
                      className={`font-semibold ${
                        choice.recoveryDelta > 0 ? 'text-emerald-400' : 'text-slate-400'
                      }`}
                    >
                      {choice.recoveryDelta > 0 ? `+${choice.recoveryDelta} Recovery` : 'Standard'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
