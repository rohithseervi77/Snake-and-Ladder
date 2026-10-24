import React, { useState } from 'react';
import { 
  X, 
  Sliders, 
  Info,
  Gauge
} from 'lucide-react';

interface ComplexityMeterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMPLEXITY_CLASSES = [
  {
    notation: 'O(1)',
    name: 'Constant Time',
    color: 'emerald',
    badgeClass: 'bg-[var(--color-emerald-light)] text-[var(--color-emerald)] border-[var(--color-emerald-border)]',
    barClass: 'bg-[var(--color-emerald)]',
    example: 'Hash map lookup, array indexing arr[i], push/pop stack',
    calculateOps: (_n: number) => 1,
    timeEstimate: 'Instant (< 1 ns)',
    rating: 'Optimal'
  },
  {
    notation: 'O(log N)',
    name: 'Logarithmic Time',
    color: 'teal',
    badgeClass: 'bg-[var(--color-cyan-light)] text-[var(--color-cyan)] border-[var(--color-cyan-border)]',
    barClass: 'bg-[var(--color-cyan)]',
    example: 'Binary search, balanced BST search, heap insert/delete',
    calculateOps: (n: number) => Math.max(1, Math.round(Math.log2(n))),
    timeEstimate: 'Lightning (< 1 μs)',
    rating: 'Near-Optimal'
  },
  {
    notation: 'O(N)',
    name: 'Linear Time',
    color: 'cyan',
    badgeClass: 'bg-[var(--color-indigo-light)] text-[var(--color-indigo)] border-[var(--color-indigo-border)]',
    barClass: 'bg-[var(--color-indigo)]',
    example: 'Linear array scan, BFS/DFS traversal, counting elements',
    calculateOps: (n: number) => n,
    timeEstimate: '< 1 ms at 100K',
    rating: 'Scalable'
  },
  {
    notation: 'O(N log N)',
    name: 'Log-Linear Time',
    color: 'blue',
    badgeClass: 'bg-[var(--color-violet-light)] text-[var(--color-violet)] border-[var(--color-violet-border)]',
    barClass: 'bg-[var(--color-violet)]',
    example: 'Merge Sort, Quick Sort (avg), Heap Sort, divide-and-conquer',
    calculateOps: (n: number) => Math.round(n * Math.max(1, Math.log2(n))),
    timeEstimate: '~ 5 ms at 100K',
    rating: 'Standard'
  },
  {
    notation: 'O(N²)',
    name: 'Quadratic Time',
    color: 'amber',
    badgeClass: 'bg-[var(--color-amber-light)] text-[var(--color-amber)] border-[var(--color-amber-border)]',
    barClass: 'bg-[var(--color-amber)]',
    example: 'Nested loops, Bubble Sort, pairwise matrix comparison',
    calculateOps: (n: number) => (n > 100000 ? 1e10 : n * n),
    timeEstimate: '> 10 seconds at 100K',
    rating: 'Bottleneck'
  },
  {
    notation: 'O(2ᴺ)',
    name: 'Exponential Time',
    color: 'rose',
    badgeClass: 'bg-[var(--color-rose-light)] text-[var(--color-rose)] border-[var(--color-rose-border)]',
    barClass: 'bg-[var(--color-rose)]',
    example: 'Recursive Fibonacci without memoization, generating all subsets',
    calculateOps: (n: number) => (n > 30 ? 1e12 : Math.pow(2, n)),
    timeEstimate: 'Freezes CPU / Exceeds Universe Life',
    rating: 'Intractable'
  }
];

export const ComplexityMeterModal: React.FC<ComplexityMeterModalProps> = ({
  isOpen,
  onClose
}) => {
  const [inputSize, setInputSize] = useState<number>(1000);

  if (!isOpen) return null;

  const N_PRESETS = [10, 100, 1000, 10000, 100000];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-[var(--text-primary)] flex flex-col transition-colors duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="complexity-meter-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--card-secondary-bg)]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[var(--color-indigo-light)] border border-[var(--color-indigo-border)] flex items-center justify-center text-[var(--color-indigo)] shrink-0">
              <Gauge className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-indigo)] font-mono">
                Interactive Asymptotic Analysis
              </span>
              <h2 id="complexity-meter-title" className="text-base sm:text-lg font-black text-[var(--text-primary)] leading-tight">
                Asymptotic Complexity Meter
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer"
            aria-label="Close Complexity Meter"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4 text-xs sm:text-sm">
          {/* Interactive N Slider Controls */}
          <div className="p-4 rounded-2xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col gap-3 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[var(--color-indigo)]" />
                <span className="font-bold text-[var(--text-primary)] text-xs sm:text-sm">
                  Simulate Input Size (N):
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-[var(--card-bg)] border border-[var(--border-subtle)] text-[var(--color-indigo)] font-mono font-black text-sm">
                  N = {inputSize.toLocaleString()} elements
                </span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-1">
                {N_PRESETS.map(n => (
                  <button
                    key={n}
                    onClick={() => setInputSize(n)}
                    className={`px-2 py-1 rounded text-[11px] font-mono font-bold transition cursor-pointer ${
                      inputSize === n
                        ? 'bg-[var(--color-indigo)] text-white shadow-sm'
                        : 'bg-[var(--card-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {n >= 1000 ? `${n / 1000}k` : n}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider */}
            <input
              type="range"
              min="10"
              max="100000"
              step="100"
              value={inputSize}
              onChange={(e) => setInputSize(Number(e.target.value))}
              className="w-full accent-[var(--color-indigo)] cursor-pointer"
            />
          </div>

          {/* Comparative Complexity Bars */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[11px] font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider">
              Theoretical Execution Operations & Scaling
            </span>

            {COMPLEXITY_CLASSES.map(cls => {
              const ops = cls.calculateOps(inputSize);
              // Calculate visual bar width logarithmically bounded
              const logRatio = Math.min(100, Math.max(3, (Math.log10(Math.max(1, ops)) / Math.log10(1e10)) * 100));

              return (
                <div 
                  key={cls.notation}
                  className="p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col gap-1.5 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md font-mono font-black border text-xs ${cls.badgeClass}`}>
                        {cls.notation}
                      </span>
                      <span className="font-bold text-[var(--text-primary)]">{cls.name}</span>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-[11px]">
                      <span className="text-[var(--text-primary)] font-bold">
                        {ops >= 1e9 ? '> 1,000,000,000+ ops' : `${ops.toLocaleString()} ops`}
                      </span>
                      <span className="text-[var(--text-secondary)] hidden sm:inline">&bull; {cls.timeEstimate}</span>
                      <span className={`px-1.5 py-0.2 rounded font-sans text-[10px] font-bold ${
                        cls.rating === 'Optimal' ? 'text-[var(--color-emerald)] bg-[var(--color-emerald-light)]' :
                        cls.rating === 'Near-Optimal' ? 'text-[var(--color-cyan)] bg-[var(--color-cyan-light)]' :
                        cls.rating === 'Scalable' ? 'text-[var(--color-indigo)] bg-[var(--color-indigo-light)]' :
                        cls.rating === 'Standard' ? 'text-[var(--color-violet)] bg-[var(--color-violet-light)]' :
                        cls.rating === 'Bottleneck' ? 'text-[var(--color-amber)] bg-[var(--color-amber-light)]' :
                        'text-[var(--color-rose)] bg-[var(--color-rose-light)]'
                      }`}>
                        {cls.rating}
                      </span>
                    </div>
                  </div>

                  {/* Relative Bar Indicator */}
                  <div className="w-full h-2 bg-[var(--card-bg)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${cls.barClass}`}
                      style={{ width: `${logRatio}%` }}
                    />
                  </div>

                  <p className="text-[10.5px] text-[var(--text-secondary)] mt-0.5 leading-tight">
                    <strong className="text-[var(--text-primary)]">Standard Examples:</strong> {cls.example}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Educational Takeaway Callout */}
          <div className="p-3.5 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)] flex items-start gap-2 shadow-sm">
            <Info className="w-4 h-4 text-[var(--color-cyan)] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[var(--text-primary)]">Interview Takeaway: </strong>
              As input size N scales from 1,000 to 100,000 elements, an O(N log N) algorithm executes ~1.7 million operations, whereas an O(N²) algorithm explodes to 10 billion operations. In coding interviews, optimizing from O(N²) down to O(N log N) or O(N) is what distinguishes senior engineers.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[var(--border-subtle)] bg-[var(--card-secondary-bg)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
          <span>Operations estimated based on standard abstract RAM model calculations.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold text-xs transition cursor-pointer"
          >
            Done Exploring
          </button>
        </div>
      </div>
    </div>
  );
};
