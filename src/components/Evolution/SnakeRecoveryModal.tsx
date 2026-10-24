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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080D1A]/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#111827] border border-[#F43F5E]/40 rounded-2xl p-6 shadow-2xl text-[#F8FAFC] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Glow behind */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#F43F5E]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[#263449] pb-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#F43F5E]/20 border border-[#F43F5E]/40 flex items-center justify-center text-[#F43F5E] shrink-0">
            <Bug className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider text-[#F43F5E] font-semibold">
                Snake Encounter &bull; Tile {snake.from} &rarr; {snake.to}
              </span>
            </div>
            <h2 className="text-xl font-bold text-[#F8FAFC] tracking-tight">{snake.name}</h2>
          </div>
        </div>

        {/* Shield Alert if active */}
        {hasShield && (
          <div className="mb-4 p-3 rounded-xl bg-[#2563EB]/20 border border-[#2563EB]/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-[#22D3EE] shrink-0" />
              <div>
                <p className="text-xs font-semibold text-[#F8FAFC]">Invariant Shield is Active!</p>
                <p className="text-[11px] text-[#94A3B8]">You can expend your shield to neutralize this snake descent completely.</p>
              </div>
            </div>
            <button
              onClick={onUseShield}
              className="px-3 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] text-[#F8FAFC] text-xs font-semibold shadow-md shadow-[#2563EB]/25 transition-all shrink-0 ml-3 cursor-pointer"
            >
              Deflect with Shield
            </button>
          </div>
        )}

        {/* Misconception Lore & Code snippet */}
        <div className="space-y-3 mb-5 overflow-y-auto pr-1">
          <div className="p-3.5 rounded-xl bg-[#080D1A] border border-[#263449] font-mono text-xs">
            <div className="flex items-center justify-between text-[11px] text-[#94A3B8] mb-1.5 pb-1 border-b border-[#263449] font-sans">
              <span className="font-medium text-[#F43F5E] flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-[#F43F5E]" />
                Algorithmic Bug Manifestation
              </span>
              <span className="text-[#94A3B8]">Category: {snake.misconceptionType}</span>
            </div>
            <pre className="text-[#F43F5E] text-xs overflow-x-auto leading-relaxed">{snake.codeSnippet}</pre>
          </div>

          <p className="text-xs text-[#94A3B8] bg-[#172033] p-3 rounded-lg border border-[#263449] leading-relaxed">
            <strong className="text-[#F8FAFC]">Why this trap triggers: </strong>
            {snake.explanation}
          </p>
        </div>

        {/* Recovery Choices */}
        <div className="mt-auto">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-3">
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
                  className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                    isAccept
                      ? 'bg-[#172033] border-[#263449] hover:border-[#94A3B8]'
                      : isConcept
                      ? 'bg-[#172033] border-[#F59E0B]/40 hover:border-[#F59E0B]'
                      : 'bg-[#172033] border-[#10B981]/40 hover:border-[#10B981]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-[#F8FAFC]">{choice.title}</span>
                      {isAccept && <ArrowDownRight className="w-4 h-4 text-[#94A3B8]" />}
                      {isConcept && <CheckCircle2 className="w-4 h-4 text-[#F59E0B]" />}
                      {isDebug && <CheckCircle2 className="w-4 h-4 text-[#10B981]" />}
                    </div>
                    <p className="text-[11px] text-[#94A3B8] mb-2 leading-relaxed">{choice.description}</p>
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#263449] flex items-center justify-between text-[11px]">
                    <span className="text-[#64748B] font-mono">
                      Target: Tile {snake.to + choice.recoveryDelta}
                    </span>
                    <span
                      className={`font-semibold ${
                        choice.recoveryDelta > 0 ? 'text-[#10B981]' : 'text-[#64748B]'
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
