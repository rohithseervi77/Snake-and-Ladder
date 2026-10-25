import React, { useState } from 'react';
import { X, Layers, ArrowUp, ArrowDown, Eye, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { ArrayStack } from '../../algorithms/stack';

interface StackTowerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardReward?: (xp: number, coins: number) => void;
}

export const StackTowerModal: React.FC<StackTowerModalProps> = ({
  isOpen,
  onClose,
  onAwardReward
}) => {
  const CAPACITY = 5;
  const [stack] = useState<ArrayStack<number>>(() => new ArrayStack<number>(CAPACITY));
  const [stackItems, setStackItems] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<number>(10);
  const [message, setMessage] = useState<string>('Use PUSH, POP, and PEEK to manipulate the stack.');
  const [targetGoal] = useState<number[]>([10, 20, 30]);
  const [isGoalMet, setIsGoalMet] = useState(false);
  const [peekedValue, setPeekedValue] = useState<number | null>(null);

  if (!isOpen) return null;

  const handlePush = () => {
    setPeekedValue(null);
    if (stack.isFull()) {
      setMessage('Stack Overflow! Cannot push into a full stack (top == MAX - 1).');
      return;
    }
    stack.push(inputValue);
    const updated = stack.toArray();
    setStackItems(updated);
    setInputValue(prev => prev + 10);
    setMessage(`Pushed ${inputValue} onto the stack. Top is now at index ${updated.length - 1}.`);

    // Check goal: [10, 20, 30]
    if (updated.length === 3 && updated[0] === 10 && updated[1] === 20 && updated[2] === 30 && !isGoalMet) {
      setIsGoalMet(true);
      setMessage('Great job! You built the target stack [10, 20, 30] in strict LIFO order! +50 XP, +20 Coins.');
      onAwardReward?.(50, 20);
    }
  };

  const handlePop = () => {
    setPeekedValue(null);
    if (stack.isEmpty()) {
      setMessage('Stack Underflow! Cannot pop from an empty stack (top == -1).');
      return;
    }
    const popped = stack.pop();
    const updated = stack.toArray();
    setStackItems(updated);
    setMessage(`Popped value ${popped} from the top of the stack.`);
  };

  const handlePeek = () => {
    if (stack.isEmpty()) {
      setMessage('Stack is empty (top == -1). Peek returns NULL.');
      setPeekedValue(null);
      return;
    }
    const val = stack.peek();
    setPeekedValue(val);
    setMessage(`PEEK (Top Element): ${val} at index ${stackItems.length - 1}. Stack state unchanged.`);
  };

  const handleReset = () => {
    stack.clear();
    setStackItems([]);
    setPeekedValue(null);
    setIsGoalMet(false);
    setInputValue(10);
    setMessage('Stack cleared. Ready for new operations.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl p-5 flex flex-col gap-4 text-[var(--text-primary)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#8B5CF6]">CO2 Mini-Game</span>
              <h3 className="text-base font-black">Stack Tower Challenge</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--card-secondary-bg)] text-[var(--text-secondary)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Task banner */}
        <div className="p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-xs flex flex-col gap-1">
          <span className="font-bold text-[#8B5CF6] flex items-center gap-1">
            🎯 Goal: Build a stack with [10, 20, 30] from bottom to top.
          </span>
          <p className="text-[11px] text-[var(--text-secondary)]">
            Observe LIFO discipline. Capacity is {CAPACITY}. Notice how top moves up with PUSH and down with POP.
          </p>
        </div>

        {/* Visual Stack Tower */}
        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border-subtle)]">
          <div className="w-48 border-2 border-dashed border-[#8B5CF6]/50 border-t-0 rounded-b-xl p-2 flex flex-col-reverse gap-1.5 min-h-[170px] bg-[var(--card-secondary-bg)]/40 relative">
            {Array.from({ length: CAPACITY }).map((_, idx) => {
              const item = stackItems[idx];
              const isTop = idx === stackItems.length - 1;
              return (
                <div
                  key={idx}
                  className={`w-full h-7 rounded-lg flex items-center justify-between px-3 text-xs font-mono font-bold transition-all ${
                    item !== undefined
                      ? isTop
                        ? 'bg-[#8B5CF6] text-white shadow-md shadow-[#8B5CF6]/30 border-2 border-white/40'
                        : 'bg-[var(--card-bg)] border border-[var(--border-subtle)] text-[var(--text-primary)]'
                      : 'border border-dashed border-[var(--border-subtle)] text-[var(--text-secondary)] opacity-30 justify-center'
                  }`}
                >
                  {item !== undefined ? (
                    <>
                      <span>Slot [{idx}]</span>
                      <span className="text-sm font-black">{item}</span>
                      {isTop && <span className="text-[10px] bg-white text-[#8B5CF6] px-1 rounded">TOP</span>}
                    </>
                  ) : (
                    <span>empty [{idx}]</span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="w-56 h-2 bg-[#8B5CF6] rounded-full mt-1" />
          <span className="text-[10px] font-mono text-[var(--text-secondary)] mt-1">Stack Base (Index 0)</span>
        </div>

        {/* Status Message */}
        <div className={`p-2.5 rounded-xl border text-xs font-mono leading-relaxed ${
          isGoalMet
            ? 'bg-[#10B981]/15 border-[#10B981]/40 text-[#10B981]'
            : 'bg-[var(--card-secondary-bg)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
        }`}>
          {isGoalMet ? <CheckCircle2 className="w-4 h-4 inline mr-1" /> : <AlertCircle className="w-4 h-4 inline mr-1" />}
          {message}
          {peekedValue !== null && (
            <span className="font-bold text-[#8B5CF6] block mt-1">Peeked: {peekedValue}</span>
          )}
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={handlePush}
            disabled={stackItems.length >= CAPACITY}
            className="py-2 px-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1 transition cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>PUSH ({inputValue})</span>
          </button>
          <button
            onClick={handlePop}
            disabled={stackItems.length === 0}
            className="py-2 px-3 rounded-xl bg-[#F43F5E] hover:bg-[#E11D48] disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1 transition cursor-pointer"
          >
            <ArrowDown className="w-3.5 h-3.5" />
            <span>POP</span>
          </button>
          <button
            onClick={handlePeek}
            disabled={stackItems.length === 0}
            className="py-2 px-3 rounded-xl bg-[var(--card-secondary-bg)] hover:bg-[var(--card-bg)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-bold text-xs flex items-center justify-center gap-1 transition cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>PEEK</span>
          </button>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Clear Stack</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-bold text-xs hover:bg-[var(--card-bg)] cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
