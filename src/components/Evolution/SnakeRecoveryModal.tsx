import React, { useState } from 'react';
import { AlertTriangle, Shield, Bug, ArrowDownRight, CheckCircle2 } from 'lucide-react';
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
  const [_selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  if (!isOpen || !snake) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[var(--modal-bg)] border border-[var(--color-rose-border)] rounded-2xl p-6 shadow-2xl text-[var(--text-primary)] overflow-hidden max-h-[90vh] flex flex-col transition-colors duration-200">
        {/* Glow behind */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[var(--color-rose)]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--color-rose-light)] border border-[var(--color-rose-border)] flex items-center justify-center text-[var(--color-rose)] shrink-0">
            <Bug className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider text-[var(--color-rose)] font-semibold">
                Snake Encounter &bull; Tile {snake.from} &rarr; {snake.to}
              </span>
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">{snake.name}</h2>
          </div>
        </div>

        {/* Shield Alert if active */}
        {hasShield && (
          <div className="mb-4 p-3 rounded-xl bg-[var(--color-indigo-light)] border border-[var(--color-indigo-border)] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-[var(--color-indigo)] shrink-0" />
              <div>
                <p className="text-xs font-semibold text-[var(--text-primary)]">Invariant Shield is Active!</p>
                <p className="text-[11px] text-[var(--text-secondary)]">You can expend your shield to neutralize this snake descent completely.</p>
              </div>
            </div>
            <button
              onClick={onUseShield}
              className="px-3 py-1.5 rounded-lg bg-[var(--color-indigo)] hover:bg-[var(--color-indigo-hover)] text-white text-xs font-semibold shadow-md transition-all shrink-0 ml-3 cursor-pointer active:scale-95"
            >
              Deflect with Shield
            </button>
          </div>
        )}

        {/* Misconception Lore & Code snippet */}
        <div className="space-y-3 mb-5 overflow-y-auto pr-1">
          <div className="p-3.5 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] font-mono text-xs shadow-inner">
            <div className="flex items-center justify-between text-[11px] text-[var(--text-secondary)] mb-1.5 pb-1 border-b border-[var(--border-subtle)] font-sans">
              <span className="font-medium text-[var(--color-rose)] flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-[var(--color-rose)]" />
                Algorithmic Bug Manifestation
              </span>
              <span className="text-[var(--text-secondary)]">Category: {snake.misconceptionType}</span>
            </div>
            <pre className="text-[var(--color-rose)] text-xs overflow-x-auto leading-relaxed">{snake.codeSnippet}</pre>
          </div>

          <p className="text-xs text-[var(--text-secondary)] bg-[var(--card-secondary-bg)] p-3 rounded-xl border border-[var(--border-subtle)] leading-relaxed shadow-sm">
            <strong className="text-[var(--text-primary)]">Why this trap triggers: </strong>
            {snake.explanation}
          </p>
        </div>

        {/* Recovery Choices */}
        <div className="mt-auto">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
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
                  className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between cursor-pointer shadow-sm active:scale-98 ${
                    isAccept
                      ? 'bg-[var(--card-bg)] border-[var(--border-subtle)] hover:border-[var(--text-secondary)]'
                      : isConcept
                      ? 'bg-[var(--card-secondary-bg)] border-[var(--color-amber-border)] hover:border-[var(--color-amber)]'
                      : 'bg-[var(--card-secondary-bg)] border-[var(--color-emerald-border)] hover:border-[var(--color-emerald)]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-[var(--text-primary)]">{choice.title}</span>
                      {isAccept && <ArrowDownRight className="w-4 h-4 text-[var(--text-muted)]" />}
                      {isConcept && <CheckCircle2 className="w-4 h-4 text-[var(--color-amber)]" />}
                      {isDebug && <CheckCircle2 className="w-4 h-4 text-[var(--color-emerald)]" />}
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] mb-2 leading-relaxed">{choice.description}</p>
                  </div>

                  <div className="mt-2 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px]">
                    <span className="text-[var(--text-muted)] font-mono">
                      Target: Tile {snake.to + choice.recoveryDelta}
                    </span>
                    <span
                      className={`font-semibold ${
                        choice.recoveryDelta > 0 ? 'text-[var(--color-emerald)]' : 'text-[var(--text-muted)]'
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
