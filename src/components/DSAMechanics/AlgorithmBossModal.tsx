import React, { useState } from 'react';
import { X, Trophy, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface AlgorithmBossModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardReward?: (xp: number, coins: number) => void;
}

interface BossScenario {
  id: string;
  title: string;
  problemStatement: string;
  constraints: string;
  options: {
    name: string;
    complexity: string;
    isOptimal: boolean;
    explanation: string;
  }[];
}

const BOSS_SCENARIOS: BossScenario[] = [
  {
    id: 'boss-1',
    title: 'Final Mastery: Network Fiber Cable Design',
    problemStatement: 'A university campus needs to connect 50 buildings with high-speed fiber cables. The construction cost between every pair of buildings is known and non-negative. What algorithm finds the minimum total cost network connecting all buildings with 0 cycles?',
    constraints: 'V = 50 buildings, dense grid of potential cable connections.',
    options: [
      {
        name: "Prim's Algorithm (MST)",
        complexity: 'O(V^2) or O(E log V)',
        isOptimal: true,
        explanation: 'Prim builds a single connected spanning tree with minimum total edge weight, guaranteeing that all buildings are connected at minimum cost with zero cycles.'
      },
      {
        name: "Dijkstra's Algorithm",
        complexity: 'O((V + E) log V)',
        isOptimal: false,
        explanation: 'Dijkstra finds the shortest path from ONE source to all destinations, which does NOT minimize the total sum of edge weights across all buildings.'
      },
      {
        name: 'Depth-First Search (DFS)',
        complexity: 'O(V + E)',
        isOptimal: false,
        explanation: 'DFS produces a spanning tree, but completely ignores edge weights and will not find the minimum cost network.'
      },
      {
        name: 'Binary Search',
        complexity: 'O(log n)',
        isOptimal: false,
        explanation: 'Binary Search operates on sorted 1D arrays, not weighted network graphs.'
      }
    ]
  },
  {
    id: 'boss-2',
    title: 'Lossless Satellite Telemetry Compression',
    problemStatement: 'A remote space probe sends telemetry packets containing characters with heavily skewed frequencies (e.g. status "OK" appears 85% of the time, while sensor errors appear < 0.1%). Which algorithm compresses this data losslessly with optimal average bit length?',
    constraints: 'Must be prefix-free and decompress unambiguously in real time.',
    options: [
      {
        name: 'Huffman Coding',
        complexity: 'O(n log n)',
        isOptimal: true,
        explanation: 'Huffman Coding produces an optimal variable-length prefix-free code, assigning short 1-bit codes to frequent characters and minimizing total transmission bandwidth.'
      },
      {
        name: 'Merge Sort',
        complexity: 'O(n log n)',
        isOptimal: false,
        explanation: 'Merge Sort sorts items in ascending order but does not compress data or generate bit codes.'
      },
      {
        name: 'Linear Search',
        complexity: 'O(n)',
        isOptimal: false,
        explanation: 'Linear search scans arrays for targets; it cannot compress text streams.'
      },
      {
        name: 'Heap Sort',
        complexity: 'O(n log n)',
        isOptimal: false,
        explanation: 'Heap sort is an in-place sorting algorithm, not a lossless compression encoder.'
      }
    ]
  }
];

export const AlgorithmBossModal: React.FC<AlgorithmBossModalProps> = ({
  isOpen,
  onClose,
  onAwardReward
}) => {
  const [scenarioIdx, setScenarioIdx] = useState<number>(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [hasClaimed, setHasClaimed] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentScenario = BOSS_SCENARIOS[scenarioIdx];
  const chosen = selectedIdx !== null ? currentScenario.options[selectedIdx] : null;

  const handleVerify = () => {
    if (selectedIdx === null) return;
    setIsEvaluated(true);
    if (chosen?.isOptimal && !hasClaimed) {
      setHasClaimed(true);
      onAwardReward?.(100, 50);
    }
  };

  const handleNext = () => {
    setScenarioIdx(prev => (prev + 1) % BOSS_SCENARIOS.length);
    setSelectedIdx(null);
    setIsEvaluated(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl p-5 flex flex-col gap-4 text-[var(--text-primary)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EAB308]/20 border border-[#EAB308]/40 flex items-center justify-center text-[#EAB308]">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#EAB308]">Tile 100 Capstone</span>
              <h3 className="text-base font-black">Algorithm Boss Challenge</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--card-secondary-bg)] text-[var(--text-secondary)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Problem card */}
        <div className="p-4 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)]">
            <span className="font-bold text-[var(--text-primary)]">{currentScenario.title}</span>
            <span>Scenario {scenarioIdx + 1} of {BOSS_SCENARIOS.length}</span>
          </div>
          <p className="text-xs text-[var(--text-primary)] leading-relaxed">
            {currentScenario.problemStatement}
          </p>
          <div className="text-[11px] font-mono text-[#06B6D4] bg-[var(--card-bg)] p-2 rounded-lg border border-[var(--border-subtle)]">
            <strong>Constraint:</strong> {currentScenario.constraints}
          </div>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-[var(--text-secondary)]">Select the Optimal Syllabus Algorithm:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentScenario.options.map((opt, idx) => {
              const isSelected = selectedIdx === idx;
              let btnStyle = 'bg-[var(--card-secondary-bg)] border-[var(--border-subtle)] text-[var(--text-primary)]';
              if (isEvaluated) {
                if (opt.isOptimal) btnStyle = 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]';
                else if (isSelected) btnStyle = 'bg-[#F43F5E]/20 border-[#F43F5E] text-[#F43F5E]';
              } else if (isSelected) {
                btnStyle = 'bg-[#6366F1]/20 border-[#6366F1] text-[var(--text-primary)]';
              }

              return (
                <button
                  key={idx}
                  disabled={isEvaluated}
                  onClick={() => setSelectedIdx(idx)}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer disabled:cursor-default flex flex-col justify-between ${btnStyle}`}
                >
                  <div className="font-bold text-xs">{opt.name}</div>
                  <div className="text-[10px] font-mono text-[var(--text-secondary)] mt-1">{opt.complexity}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Evaluation Explanation */}
        {isEvaluated && chosen && (
          <div className={`p-3.5 rounded-xl border text-xs font-mono leading-relaxed ${
            chosen.isOptimal
              ? 'bg-[#10B981]/15 border-[#10B981]/40 text-[#10B981]'
              : 'bg-[#F43F5E]/15 border-[#F43F5E]/40 text-[#F43F5E]'
          }`}>
            <div className="font-bold flex items-center gap-1.5 mb-1">
              {chosen.isOptimal ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              <span>{chosen.isOptimal ? 'Optimal Algorithm Verified!' : 'Sub-Optimal Choice'}</span>
            </div>
            <p>{chosen.explanation}</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
          <button
            onClick={handleNext}
            className="flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <span>Next Scenario</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {!isEvaluated ? (
            <button
              onClick={handleVerify}
              disabled={selectedIdx === null}
              className="py-2 px-4 rounded-xl bg-[#EAB308] hover:bg-[#CA8A04] disabled:opacity-40 text-black font-bold text-xs cursor-pointer shadow-md shadow-[#EAB308]/20"
            >
              Verify Algorithm Choice
            </button>
          ) : (
            <button
              onClick={onClose}
              className="py-2 px-4 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-bold text-xs cursor-pointer"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
