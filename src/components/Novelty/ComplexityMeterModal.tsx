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
    badgeClass: 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40',
    barClass: 'bg-[#10B981]',
    example: 'Hash map lookup, array indexing arr[i], push/pop stack',
    calculateOps: (_n: number) => 1,
    timeEstimate: 'Instant (< 1 ns)',
    rating: 'Optimal'
  },
  {
    notation: 'O(log N)',
    name: 'Logarithmic Time',
    color: 'teal',
    badgeClass: 'bg-[#22D3EE]/20 text-[#22D3EE] border-[#22D3EE]/40',
    barClass: 'bg-[#22D3EE]',
    example: 'Binary search, balanced BST search, heap insert/delete',
    calculateOps: (n: number) => Math.max(1, Math.round(Math.log2(n))),
    timeEstimate: 'Lightning (< 1 μs)',
    rating: 'Near-Optimal'
  },
  {
    notation: 'O(N)',
    name: 'Linear Time',
    color: 'cyan',
    badgeClass: 'bg-[#2563EB]/20 text-[#22D3EE] border-[#2563EB]/40',
    barClass: 'bg-[#2563EB]',
    example: 'Linear array scan, BFS/DFS traversal, counting elements',
    calculateOps: (n: number) => n,
    timeEstimate: '< 1 ms at 100K',
    rating: 'Scalable'
  },
  {
    notation: 'O(N log N)',
    name: 'Log-Linear Time',
    color: 'blue',
    badgeClass: 'bg-[#8B5CF6]/20 text-[#8B5CF6] border-[#8B5CF6]/40',
    barClass: 'bg-[#8B5CF6]',
    example: 'Merge Sort, Quick Sort (avg), Heap Sort, divide-and-conquer',
    calculateOps: (n: number) => Math.round(n * Math.max(1, Math.log2(n))),
    timeEstimate: '~ 5 ms at 100K',
    rating: 'Standard'
  },
  {
    notation: 'O(N²)',
    name: 'Quadratic Time',
    color: 'amber',
    badgeClass: 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/40',
    barClass: 'bg-[#F59E0B]',
    example: 'Nested loops, Bubble Sort, pairwise matrix comparison',
    calculateOps: (n: number) => (n > 100000 ? 1e10 : n * n),
    timeEstimate: '> 10 seconds at 100K',
    rating: 'Bottleneck'
  },
  {
    notation: 'O(2ᴺ)',
    name: 'Exponential Time',
    color: 'rose',
    badgeClass: 'bg-[#F43F5E]/20 text-[#F43F5E] border-[#F43F5E]/40',
    barClass: 'bg-[#F43F5E]',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#080D1A]/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] bg-[#111827] border border-[#263449] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-[#F8FAFC] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="complexity-meter-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#263449] bg-[#0B1220]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2563EB]/20 border border-[#2563EB]/40 flex items-center justify-center text-[#22D3EE] shrink-0">
              <Gauge className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#22D3EE] font-mono">
                Interactive Asymptotic Analysis
              </span>
              <h2 id="complexity-meter-title" className="text-base sm:text-lg font-black text-[#F8FAFC] leading-tight">
                Asymptotic Complexity Meter
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#172033] hover:bg-[#263449] border border-[#263449] text-[#94A3B8] hover:text-[#F8FAFC] transition cursor-pointer"
            aria-label="Close Complexity Meter"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4 text-xs sm:text-sm">
          {/* Interactive N Slider Controls */}
          <div className="p-4 rounded-2xl bg-[#172033] border border-[#263449] flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#22D3EE]" />
                <span className="font-bold text-[#F8FAFC] text-xs sm:text-sm">
                  Simulate Input Size (N):
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-[#080D1A] border border-[#263449] text-[#22D3EE] font-mono font-black text-sm">
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
                        ? 'bg-[#2563EB] text-[#F8FAFC] shadow-sm'
                        : 'bg-[#080D1A] border border-[#263449] text-[#94A3B8] hover:text-[#F8FAFC]'
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
              className="w-full accent-[#2563EB] cursor-pointer"
            />
          </div>

          {/* Comparative Complexity Bars */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[11px] font-mono font-bold text-[#94A3B8] uppercase tracking-wider">
              Theoretical Execution Operations & Scaling
            </span>

            {COMPLEXITY_CLASSES.map(cls => {
              const ops = cls.calculateOps(inputSize);
              // Calculate visual bar width logarithmically bounded
              const logRatio = Math.min(100, Math.max(3, (Math.log10(Math.max(1, ops)) / Math.log10(1e10)) * 100));

              return (
                <div 
                  key={cls.notation}
                  className="p-3 rounded-xl bg-[#172033] border border-[#263449] flex flex-col gap-1.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md font-mono font-black border text-xs ${cls.badgeClass}`}>
                        {cls.notation}
                      </span>
                      <span className="font-bold text-[#F8FAFC]">{cls.name}</span>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-[11px]">
                      <span className="text-[#F8FAFC]">
                        {ops >= 1e9 ? '> 1,000,000,000+ ops' : `${ops.toLocaleString()} ops`}
                      </span>
                      <span className="text-[#94A3B8] hidden sm:inline">&bull; {cls.timeEstimate}</span>
                      <span className={`px-1.5 py-0.2 rounded font-sans text-[10px] font-bold ${
                        cls.rating === 'Optimal' ? 'text-[#10B981] bg-[#10B981]/15' :
                        cls.rating === 'Near-Optimal' ? 'text-[#22D3EE] bg-[#22D3EE]/15' :
                        cls.rating === 'Scalable' ? 'text-[#2563EB] bg-[#2563EB]/15' :
                        cls.rating === 'Standard' ? 'text-[#8B5CF6] bg-[#8B5CF6]/15' :
                        cls.rating === 'Bottleneck' ? 'text-[#F59E0B] bg-[#F59E0B]/15' :
                        'text-[#F43F5E] bg-[#F43F5E]/15'
                      }`}>
                        {cls.rating}
                      </span>
                    </div>
                  </div>

                  {/* Relative Bar Indicator */}
                  <div className="w-full h-2 bg-[#080D1A] rounded-full overflow-hidden border border-[#263449]">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${cls.barClass}`}
                      style={{ width: `${logRatio}%` }}
                    />
                  </div>

                  <p className="text-[10.5px] text-[#94A3B8] mt-0.5 leading-tight">
                    <strong className="text-[#F8FAFC]">Standard Examples:</strong> {cls.example}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Educational Takeaway Callout */}
          <div className="p-3.5 rounded-xl bg-[#172033] border border-[#2563EB]/40 text-[11px] text-[#CBD5E1] flex items-start gap-2">
            <Info className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#F8FAFC]">Interview Takeaway: </strong>
              As input size $N$ scales from 1,000 to 100,000 elements, an $O(N \log N)$ algorithm executes ~1.7 million operations, whereas an $O(N^2)$ algorithm explodes to 10 billion operations. In coding interviews, optimizing from $O(N^2)$ down to $O(N \log N)$ or $O(N)$ is what distinguishes senior engineers.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#263449] bg-[#0B1220] flex items-center justify-between text-xs text-[#94A3B8]">
          <span>Operations estimated based on standard abstract RAM model calculations.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#172033] hover:bg-[#263449] border border-[#263449] text-[#94A3B8] hover:text-[#F8FAFC] font-bold text-xs transition cursor-pointer"
          >
            Done Exploring
          </button>
        </div>
      </div>
    </div>
  );
};
