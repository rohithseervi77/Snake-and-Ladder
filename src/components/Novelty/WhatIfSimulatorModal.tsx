import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  Play, 
  RotateCcw, 
  Sparkles, 
  Layers, 
  Network, 
  Binary, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface WhatIfSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SimulationScenario {
  id: string;
  title: string;
  topic: string;
  question: string;
  initialStateDescription: string;
  actions: Array<{
    label: string;
    resultTitle: string;
    resultDescription: string;
    asciiDiagram: string;
    isOptimal: boolean;
    takeaway: string;
  }>;
}

const SCENARIOS: SimulationScenario[] = [
  {
    id: 'bst-deletion',
    title: 'BST Two-Child Node Deletion',
    topic: 'Trees & Heaps',
    question: 'You want to delete node [50], which has both a left child [30] and a right child [70]. What happens under each strategy?',
    initialStateDescription: 'BST Structure: [50] (root) -> Left: [30] (with child [20], [40]), Right: [70] (with child [60], [80])',
    actions: [
      {
        label: 'Strategy A: Replace with Inorder Successor',
        resultTitle: 'Inorder Successor Preserves BST Invariant',
        resultDescription: 'Find the minimum element in the right subtree ([60]). Copy [60] into root position and delete the leaf [60]. Left subtree remains strictly < 60, right subtree strictly > 60.',
        asciiDiagram: `      [60] <--- (Replaced by Inorder Successor)\n     /    \\\n   [30]   [70]\n   /  \\      \\\n [20] [40]   [80]`,
        isOptimal: true,
        takeaway: 'Standard textbook implementation. Guarantees that BST ordering property is maintained across all levels.'
      },
      {
        label: 'Strategy B: Replace with Inorder Predecessor',
        resultTitle: 'Inorder Predecessor Also Valid',
        resultDescription: 'Find the maximum element in the left subtree ([40]). Copy [40] into root position and delete leaf [40]. Left subtree remains < 40, right subtree remains > 40.',
        asciiDiagram: `      [40] <--- (Replaced by Inorder Predecessor)\n     /    \\\n   [30]   [70]\n   /      /  \\\n [20]   [60] [80]`,
        isOptimal: true,
        takeaway: 'Equally valid alternative! Alternating between successor and predecessor prevents tree skewing in long-running applications.'
      },
      {
        label: 'Strategy C: Naively Delete & Shift Left Child',
        resultTitle: 'Invariant Violation! Structure Ruined',
        resultDescription: 'Promoting [30] leaves the right subtree [70] orphaned, or violates ordering if right subtree is attached blindly under [40].',
        asciiDiagram: `      [30] (Broken BST)\n     /    \\\n   [20]   [40] -> [70] ? (Violates binary tree degree <= 2)`,
        isOptimal: false,
        takeaway: 'Without finding successor/predecessor, tree properties collapse or require costly complete tree reconstruction.'
      }
    ]
  },
  {
    id: 'hash-load-factor',
    title: 'Hash Table High Load Factor Collision',
    topic: 'Hashing',
    question: 'A hash table with capacity 8 currently holds 7 items (Load factor α = 7/8 = 0.875). What happens next?',
    initialStateDescription: 'Buckets: [0] -> itemA, [1] -> itemB -> itemC (collision chain), [3] -> itemD, [7] -> itemE -> itemF -> itemG',
    actions: [
      {
        label: 'Option A: Automatic Dynamic Rehashing (Capacity × 2)',
        resultTitle: 'Rehashing Restores O(1) Expected Time',
        resultDescription: 'Array doubles from 8 to 16 buckets. Every key is re-hashed (hash(key) % 16). Collisions disperse, dropping load factor to 7/16 = 0.4375.',
        asciiDiagram: `Capacity 16: α = 0.44\n[0]->A, [1]->B, [3]->D, [7]->E, [9]->C, [11]->F, [15]->G\nMax chain length drops from 3 down to 1!`,
        isOptimal: true,
        takeaway: 'Amortized cost of occasional O(N) resize is O(1) per insert, preserving fast constant-time performance.'
      },
      {
        label: 'Option B: Omit Resizing & Keep Appending Chaining',
        resultTitle: 'Degradation into O(N) Linked List Traversal',
        resultDescription: 'As items grow to 1,000 without resizing, 8 buckets hold an average of 125 nodes per chain. Lookup deteriorates into slow linear search O(N).',
        asciiDiagram: `Bucket [1]: [item1] -> [item2] -> [item3] ... -> [item125]\nLookup requires traversing 125 linked pointers! (O(N) catastrophe)`,
        isOptimal: false,
        takeaway: 'Always trigger dynamic resizing when load factor α exceeds threshold (typically 0.75).'
      }
    ]
  },
  {
    id: 'graph-cycle',
    title: 'Dijkstra on Negative Edge Weights',
    topic: 'Graph Algorithms',
    question: 'A directed graph contains edge A -> B with weight -5. What happens if Dijkstra\'s algorithm is run?',
    initialStateDescription: 'Path 1: S -> A (weight 2) -> B (weight -5) = Total -3. Path 2: S -> B (weight 1) directly.',
    actions: [
      {
        label: 'Option A: Run Dijkstra Without Check',
        resultTitle: 'Greedy Choice Fails with Negative Edges',
        resultDescription: 'Dijkstra greedily marks B as visited with distance 1. Because Dijkstra assumes visited vertices never need re-evaluation, it permanently misses the cheaper path S -> A -> B (-3)!',
        asciiDiagram: `Dijkstra visited: B (dist = 1)\nTrue shortest path was S -> A -> B (dist = -3)!\nDijkstra output is mathematically incorrect!`,
        isOptimal: false,
        takeaway: 'Dijkstra\'s greedy invariant requires all edge weights to be non-negative (w >= 0).'
      },
      {
        label: 'Option B: Use Bellman-Ford or SPFA Algorithm',
        resultTitle: 'Bellman-Ford Handles Negative Edges Safely',
        resultDescription: 'Bellman-Ford relaxes all |E| edges |V|-1 times. It correctly finds path S -> A -> B = -3, and detects if any negative weight cycles exist!',
        asciiDiagram: `Round 1: relax (S,B)=1, (S,A)=2\nRound 2: relax (A,B) -> updates dist(B) to -3!\nCorrect shortest path found in O(V · E) time!`,
        isOptimal: true,
        takeaway: 'Use Bellman-Ford or Floyd-Warshall whenever negative edge weights are present.'
      }
    ]
  }
];

export const WhatIfSimulatorModal: React.FC<WhatIfSimulatorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [selectedActionIndex, setSelectedActionIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const currentScenario = SCENARIOS[selectedScenarioIndex];
  const activeAction = selectedActionIndex !== null ? currentScenario.actions[selectedActionIndex] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] bg-[#0c1527] border-2 border-[#243556] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-slate-200 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="what-if-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1e2d4d] bg-[#091020]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400 font-mono">
                Interactive DSA Sandbox
              </span>
              <h2 id="what-if-title" className="text-base sm:text-lg font-black text-white leading-tight">
                "What If?" Structural Simulator
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#141e33] hover:bg-[#1e2d4d] text-slate-400 hover:text-white transition cursor-pointer"
            aria-label="Close What-If Simulator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4 text-xs sm:text-sm">
          {/* Scenario Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-800">
            {SCENARIOS.map((sc, idx) => (
              <button
                key={sc.id}
                onClick={() => {
                  setSelectedScenarioIndex(idx);
                  setSelectedActionIndex(null);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition cursor-pointer ${
                  selectedScenarioIndex === idx
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {sc.title}
              </button>
            ))}
          </div>

          {/* Scenario Prompt */}
          <div className="p-4 rounded-2xl bg-[#091122] border border-[#1b2b48] flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-purple-400">
              <span>Domain: {currentScenario.topic}</span>
              <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800/60 text-purple-300">
                Sandbox Simulation
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              {currentScenario.question}
            </h3>
            <p className="text-[11px] text-slate-400 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 font-mono">
              <strong>Initial State: </strong> {currentScenario.initialStateDescription}
            </p>
          </div>

          {/* Interactive Strategy Selector */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Choose an Architectural Action to Simulate:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentScenario.actions.map((act, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedActionIndex(idx)}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition cursor-pointer ${
                    selectedActionIndex === idx
                      ? 'bg-purple-950/40 border-purple-400 text-white shadow-lg shadow-purple-950/50 scale-[1.01]'
                      : 'bg-[#091020] border-[#1e2d4d] text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                    selectedActionIndex === idx ? 'bg-purple-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="text-xs font-semibold leading-snug">{act.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Simulation Outcome Card */}
          {activeAction ? (
            <div className={`p-4 rounded-2xl border flex flex-col gap-2.5 animate-fadeIn ${
              activeAction.isOptimal 
                ? 'bg-emerald-950/20 border-emerald-600/50 text-emerald-200' 
                : 'bg-rose-950/20 border-rose-600/50 text-rose-200'
            }`}>
              <div className="flex items-center justify-between font-bold text-xs sm:text-sm">
                <span>{activeAction.resultTitle}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                  activeAction.isOptimal ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}>
                  {activeAction.isOptimal ? 'Invariant Preserved' : 'Violation / Inefficient'}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {activeAction.resultDescription}
              </p>

              {/* ASCII Visual Structure */}
              <pre className="p-3 rounded-xl bg-black/60 font-mono text-[11px] text-cyan-300 overflow-x-auto border border-slate-800/80">
                <code>{activeAction.asciiDiagram}</code>
              </pre>

              <div className="pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
                <strong className="text-slate-200">Algorithmic Insight: </strong>
                {activeAction.takeaway}
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-[#091020]/60 border border-dashed border-slate-800 text-center text-slate-400 text-xs">
              Select one of the strategies above to trigger the live structural simulation.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#1e2d4d] bg-[#091020] flex items-center justify-between text-xs text-slate-400">
          <span>Experiment freely with different invariants to observe algorithmic outcomes.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition cursor-pointer"
          >
            Close Sandbox
          </button>
        </div>
      </div>
    </div>
  );
};
