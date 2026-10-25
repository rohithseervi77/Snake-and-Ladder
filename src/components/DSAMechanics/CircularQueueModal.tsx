import React, { useState } from 'react';
import { X, RefreshCw, PlusCircle, MinusCircle, CheckCircle2, AlertTriangle, RotateCcw } from 'lucide-react';
import { CircularQueue } from '../../algorithms/circularQueue';

interface CircularQueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardReward?: (xp: number, coins: number) => void;
}

export const CircularQueueModal: React.FC<CircularQueueModalProps> = ({
  isOpen,
  onClose,
  onAwardReward
}) => {
  const SIZE = 5;
  const [cq] = useState<CircularQueue<number>>(() => new CircularQueue<number>(SIZE));
  const [buffer, setBuffer] = useState<(number | null)[]>(cq.getBuffer());
  const [frontIndex, setFrontIndex] = useState<number>(cq.getFrontIndex());
  const [rearIndex, setRearIndex] = useState<number>(cq.getRearIndex());
  const [nextValue, setNextValue] = useState<number>(10);
  const [statusMsg, setStatusMsg] = useState<string>('Circular queue ready (SIZE = 5). Enqueue and dequeue to observe wrap-around.');
  const [hasWrapped, setHasWrapped] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleEnqueue = () => {
    if (cq.isFull()) {
      setStatusMsg(`Circular Queue is FULL! Condition (rear + 1) % ${SIZE} == FRONT (${(rearIndex + 1) % SIZE} == ${frontIndex}).`);
      return;
    }

    const prevRear = rearIndex;
    cq.enqueue(nextValue);
    setBuffer(cq.getBuffer());
    const newFront = cq.getFrontIndex();
    const newRear = cq.getRearIndex();
    setFrontIndex(newFront);
    setRearIndex(newRear);

    let msg = `Enqueued ${nextValue} at index ${newRear}.`;
    if (prevRear === SIZE - 1 && newRear === 0) {
      msg = `🔄 WRAP-AROUND! REAR moved from index ${prevRear} to 0 using (${prevRear} + 1) % ${SIZE} = 0!`;
      if (!hasWrapped) {
        setHasWrapped(true);
        onAwardReward?.(45, 20);
      }
    }
    setStatusMsg(msg);
    setNextValue(prev => prev + 5);
  };

  const handleDequeue = () => {
    if (cq.isEmpty()) {
      setStatusMsg('Circular Queue Underflow! Cannot dequeue from an empty queue.');
      return;
    }

    const prevFront = frontIndex;
    const removed = cq.dequeue();
    setBuffer(cq.getBuffer());
    const newFront = cq.getFrontIndex();
    const newRear = cq.getRearIndex();
    setFrontIndex(newFront);
    setRearIndex(newRear);

    let msg = `Dequeued ${removed} from index ${prevFront}.`;
    if (prevFront === SIZE - 1 && newFront === 0) {
      msg = `🔄 FRONT WRAP-AROUND! FRONT moved from ${prevFront} to 0 via (${prevFront} + 1) % ${SIZE} = 0.`;
    }
    setStatusMsg(msg);
  };

  const handleReset = () => {
    cq.clear();
    setBuffer(cq.getBuffer());
    setFrontIndex(-1);
    setRearIndex(-1);
    setNextValue(10);
    setStatusMsg('Circular Queue reset.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl p-5 flex flex-col gap-4 text-[var(--text-primary)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#06B6D4]/20 border border-[#06B6D4]/40 flex items-center justify-center text-[#06B6D4]">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#06B6D4]">CO2 Mini-Game</span>
              <h3 className="text-base font-black">Circular Queue Lab (Wrap-Around)</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--card-secondary-bg)] text-[var(--text-secondary)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* State Banner */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
          <div className="p-2 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
            <span className="text-[10px] text-[var(--text-secondary)] block">SIZE</span>
            <span className="font-bold text-sm">{SIZE}</span>
          </div>
          <div className="p-2 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
            <span className="text-[10px] text-[#06B6D4] block">FRONT</span>
            <span className="font-bold text-sm text-[#06B6D4]">{frontIndex}</span>
          </div>
          <div className="p-2 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
            <span className="text-[10px] text-[#10B981] block">REAR</span>
            <span className="font-bold text-sm text-[#10B981]">{rearIndex}</span>
          </div>
          <div className="p-2 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
            <span className="text-[10px] text-[var(--text-secondary)] block">COUNT</span>
            <span className="font-bold text-sm">{cq.size()}</span>
          </div>
        </div>

        {/* Circular Buffer Slot Array */}
        <div className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border-subtle)] flex flex-col items-center gap-3">
          <div className="text-xs font-semibold text-[var(--text-secondary)]">
            Array Buffer Indices [0 .. {SIZE - 1}]
          </div>

          <div className="grid grid-cols-5 gap-2 w-full">
            {buffer.map((val, idx) => {
              const isFront = idx === frontIndex;
              const isRear = idx === rearIndex;
              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-between p-2 rounded-xl border transition-all ${
                    val !== null
                      ? 'bg-[var(--card-secondary-bg)] border-[#06B6D4]'
                      : 'border-dashed border-[var(--border-subtle)] opacity-40'
                  }`}
                >
                  <span className="text-[10px] font-mono text-[var(--text-secondary)]">[{idx}]</span>
                  <span className="text-base font-black my-1">{val ?? '-'}</span>
                  <div className="flex flex-col gap-0.5 text-[9px] font-mono font-bold">
                    {isFront && <span className="bg-[#06B6D4] text-white px-1 rounded">FRONT</span>}
                    {isRear && <span className="bg-[#10B981] text-white px-1 rounded">REAR</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status display */}
        <div className="p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)]">
          {statusMsg}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleEnqueue}
            disabled={cq.isFull()}
            className="py-2.5 px-3 rounded-xl bg-[#06B6D4] hover:bg-[#0891B2] disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>ENQUEUE ({nextValue})</span>
          </button>
          <button
            onClick={handleDequeue}
            disabled={cq.isEmpty()}
            className="py-2.5 px-3 rounded-xl bg-[#F43F5E] hover:bg-[#E11D48] disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <MinusCircle className="w-4 h-4" />
            <span>DEQUEUE</span>
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)] text-xs">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-bold text-xs cursor-pointer"
          >
            Close Lab
          </button>
        </div>
      </div>
    </div>
  );
};
