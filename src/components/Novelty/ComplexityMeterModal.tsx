import React, { useState } from 'react';
import { 
  X, 
  Activity, 
  Sliders, 
  Clock, 
  Sparkles, 
  AlertTriangle, 
  Info,
  CheckCircle2,
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
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    barClass: 'bg-emerald-400',
    example: 'Hash map lookup, array indexing arr[i], push/pop stack',
    calculateOps: (_n: number) => 1,
    timeEstimate: 'Instant (< 1 ns)',
    rating: 'Optimal'
  },
  {
    notation: 'O(log N)',
    name: 'Logarithmic Time',
    color: 'teal',
    badgeClass: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    barClass: 'bg-teal-400',
    example: 'Binary search, balanced BST search, heap insert/delete',
    calculateOps: (n: number) => Math.max(1, Math.round(Math.log2(n))),
    timeEstimate: 'Lightning (< 1 μs)',
    rating: 'Near-Optimal'
  },
  {
    notation: 'O(N)',
    name: 'Linear Time',
    color: 'cyan',
    badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    barClass: 'bg-cyan-400',
    example: 'Linear array scan, BFS/DFS traversal, counting elements',
    calculateOps: (n: number) => n,
    timeEstimate: '< 1 ms at 100K',
    rating: 'Scalable'
  },
  {
    notation: 'O(N log N)',
    name: 'Log-Linear Time',
    color: 'blue',
    badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    barClass: 'bg-blue-400',
    example: 'Merge Sort, Quick Sort (avg), Heap Sort, divide-and-conquer',
    calculateOps: (n: number) => Math.round(n * Math.max(1, Math.log2(n))),
    timeEstimate: '~ 5 ms at 100K',
    rating: 'Standard'
  },
  {
    notation: 'O(N²)',
    name: 'Quadratic Time',
    color: 'amber',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    barClass: 'bg-amber-400',
    example: 'Nested loops, Bubble Sort, pairwise matrix comparison',
    calculateOps: (n: number) => (n > 100000 ? 1e10 : n * n),
    timeEstimate: '> 10 seconds at 100K',
    rating: 'Bottleneck'
  },
  {
    notation: 'O(2ᴺ)',
    name: 'Exponential Time',
    color: 'rose',
    badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    barClass: 'bg-rose-500',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] bg-[#0c1527] border-2 border-[#243556] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-slate-200 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="complexity-meter-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1e2d4d] bg-[#091020]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Gauge className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 font-mono">
                Interactive Asymptotic Analysis
              </span>
              <h2 id="complexity-meter-title" className="text-base sm:text-lg font-black text-white leading-tight">
                Asymptotic Complexity Meter
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#141e33] hover:bg-[#1e2d4d] text-slate-400 hover:text-white transition cursor-pointer"
            aria-label="Close Complexity Meter"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4 text-xs sm:text-sm">
          {/* Interactive N Slider Controls */}
          <div className="p-4 rounded-2xl bg-[#091122] border border-[#1b2b48] flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-white text-xs sm:text-sm">
                  Simulate Input Size (N):
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-200 font-mono font-black text-sm">
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
                        ? 'bg-cyan-500 text-slate-950 shadow-sm'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
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
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Comparative Complexity Bars */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Theoretical Execution Operations & Scaling
            </span>

            {COMPLEXITY_CLASSES.map(cls => {
              const ops = cls.calculateOps(inputSize);
              // Calculate visual bar width logarithmically bounded
              const logRatio = Math.min(100, Math.max(3, (Math.log10(Math.max(1, ops)) / Math.log10(1e10)) * 100));

              return (
                <div 
                  key={cls.notation}
                  className="p-3 rounded-xl bg-[#091020] border border-[#1b2b48] flex flex-col gap-1.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md font-mono font-black border text-xs ${cls.badgeClass}`}>
                        {cls.notation}
                      </span>
                      <span className="font-bold text-white">{cls.name}</span>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-[11px]">
                      <span className="text-slate-300">
                        {ops >= 1e9 ? '> 1,000,000,000+ ops' : `${ops.toLocaleString()} ops`}
                      </span>
                      <span className="text-slate-400 hidden sm:inline">&bull; {cls.timeEstimate}</span>
                      <span className={`px-1.5 py-0.2 rounded font-sans text-[10px] font-bold ${
                        cls.rating === 'Optimal' ? 'text-emerald-400 bg-emerald-950/60' :
                        cls.rating === 'Near-Optimal' ? 'text-teal-400 bg-teal-950/60' :
                        cls.rating === 'Scalable' ? 'text-cyan-400 bg-cyan-950/60' :
                        cls.rating === 'Standard' ? 'text-blue-400 bg-blue-950/60' :
                        cls.rating === 'Bottleneck' ? 'text-amber-400 bg-amber-950/60' :
                        'text-rose-400 bg-rose-950/60'
                      }`}>
                        {cls.rating}
                      </span>
                    </div>
                  </div>

                  {/* Relative Bar Indicator */}
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${cls.barClass}`}
                      style={{ width: `${logRatio}%` }}
                    />
                  </div>

                  <p className="text-[10.5px] text-slate-400 mt-0.5 leading-tight">
                    <strong>Standard Examples:</strong> {cls.example}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Educational Takeaway Callout */}
          <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-800/40 text-[11px] text-blue-200 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Interview Takeaway: </strong>
              As input size $N$ scales from 1,000 to 100,000 elements, an $O(N \log N)$ algorithm executes ~1.7 million operations, whereas an $O(N^2)$ algorithm explodes to 10 billion operations. In coding interviews, optimizing from $O(N^2)$ down to $O(N \log N)$ or $O(N)$ is what distinguishes senior engineers.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#1e2d4d] bg-[#091020] flex items-center justify-between text-xs text-slate-400">
          <span>Operations estimated based on standard abstract RAM model calculations.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition cursor-pointer"
          >
            Done Exploring
          </button>
        </div>
      </div>
    </div>
  );
};
