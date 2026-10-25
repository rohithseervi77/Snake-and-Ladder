import React, { useState } from 'react';
import { X, Users, ArrowRight, CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';

interface QueueStationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardReward?: (xp: number, coins: number) => void;
}

interface Command {
  op: 'ENQUEUE' | 'DEQUEUE';
  val?: number;
}

const COMMAND_SEQUENCE: Command[] = [
  { op: 'ENQUEUE', val: 10 },
  { op: 'ENQUEUE', val: 20 },
  { op: 'DEQUEUE' },
  { op: 'ENQUEUE', val: 30 },
  { op: 'DEQUEUE' },
  { op: 'ENQUEUE', val: 40 }
];

export const QueueStationModal: React.FC<QueueStationModalProps> = ({
  isOpen,
  onClose,
  onAwardReward
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [queueState, setQueueState] = useState<number[]>([]);
  const [log, setLog] = useState<string[]>(['Queue station ready. Step through the FIFO command sequence.']);
  const [hasCompleted, setHasCompleted] = useState(false);

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (currentStep >= COMMAND_SEQUENCE.length) return;

    const cmd = COMMAND_SEQUENCE[currentStep];
    const newQueue = [...queueState];
    let msg = '';

    if (cmd.op === 'ENQUEUE' && cmd.val !== undefined) {
      newQueue.push(cmd.val);
      msg = `Step ${currentStep + 1}: ENQUEUE ${cmd.val} -> added at REAR. Current: [${newQueue.join(', ')}]`;
    } else {
      const removed = newQueue.shift();
      msg = `Step ${currentStep + 1}: DEQUEUE -> removed ${removed} from FRONT. Current: [${newQueue.join(', ')}]`;
    }

    setQueueState(newQueue);
    setLog(prev => [msg, ...prev]);
    const next = currentStep + 1;
    setCurrentStep(next);

    if (next === COMMAND_SEQUENCE.length && !hasCompleted) {
      setHasCompleted(true);
      onAwardReward?.(40, 15);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setQueueState([]);
    setLog(['Queue station reset.']);
    setHasCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl p-5 flex flex-col gap-4 text-[var(--text-primary)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/20 border border-[#F59E0B]/40 flex items-center justify-center text-[#F59E0B]">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#F59E0B]">CO2 Mini-Game</span>
              <h3 className="text-base font-black">Queue Station: FIFO Simulation</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--card-secondary-bg)] text-[var(--text-secondary)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Task description */}
        <div className="p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-xs flex flex-col gap-1">
          <span className="font-bold text-[#F59E0B]">Command Sequence:</span>
          <div className="flex flex-wrap gap-1 font-mono text-[11px] mt-1">
            {COMMAND_SEQUENCE.map((c, i) => (
              <span
                key={i}
                className={`px-1.5 py-0.5 rounded border text-[10px] ${
                  i < currentStep
                    ? 'bg-[#10B981]/20 border-[#10B981]/40 text-[#10B981] line-through'
                    : i === currentStep
                    ? 'bg-[#F59E0B]/20 border-[#F59E0B] text-[#F59E0B] font-bold'
                    : 'bg-[var(--card-bg)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                }`}
              >
                {c.op} {c.val ?? ''}
              </span>
            ))}
          </div>
        </div>

        {/* Queue Visual Conveyor Belt */}
        <div className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border-subtle)] flex flex-col items-center gap-2">
          <div className="flex items-center justify-between w-full text-[11px] font-mono text-[var(--text-secondary)] px-2">
            <span className="text-[#F43F5E] font-bold">← FRONT (Deletions)</span>
            <span className="text-[#10B981] font-bold">REAR (Insertions) ←</span>
          </div>

          <div className="flex items-center gap-2 min-h-[50px] w-full p-2 rounded-xl bg-[var(--card-secondary-bg)]/50 border border-dashed border-[var(--border-subtle)] overflow-x-auto justify-center">
            {queueState.length > 0 ? (
              queueState.map((val, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-[#F59E0B] text-white font-mono font-black text-sm shadow-md shadow-[#F59E0B]/20 border border-white/20 flex flex-col items-center"
                >
                  <span>{val}</span>
                  <span className="text-[9px] font-normal opacity-80">
                    {idx === 0 && 'FRONT'}
                    {idx === queueState.length - 1 && idx !== 0 && 'REAR'}
                  </span>
                </div>
              ))
            ) : (
              <span className="text-xs text-[var(--text-secondary)] italic">Queue is currently empty</span>
            )}
          </div>
        </div>

        {/* Step log */}
        <div className="p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] max-h-28 overflow-y-auto font-mono text-[11px] flex flex-col gap-1">
          {log.map((item, idx) => (
            <div key={idx} className={idx === 0 ? 'text-[var(--text-primary)] font-semibold' : 'text-[var(--text-secondary)]'}>
              {item}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>

          {!hasCompleted ? (
            <button
              onClick={handleNextStep}
              className="py-2 px-4 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-[#F59E0B]/20"
            >
              <span>Execute Step {currentStep + 1}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#10B981] flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Done! +40 XP
              </span>
              <button
                onClick={onClose}
                className="py-2 px-4 rounded-xl bg-[#10B981] text-white font-bold text-xs cursor-pointer"
              >
                Close Station
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
