import React, { useState } from 'react';
import { 
  X, 
  GitBranch, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  Lock, 
  Play,
  Share2
} from 'lucide-react';
import { STAGES } from '../../data/curriculum100';
import { TopicMasteryScore } from '../../types/evolution';

interface KnowledgeGraphModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedSquares: number[];
  topicMasteryMap: Record<string, TopicMasteryScore>;
  onJumpToStage: (firstTile: number) => void;
}

interface GraphNode {
  stageId: string;
  name: string;
  range: [number, number];
  color: string;
  prerequisites: string[];
  unlocks: string[];
  rationale: string;
  keyDataStructures: string[];
}

const GRAPH_NODES: GraphNode[] = [
  {
    stageId: 'foundations',
    name: 'Programming Foundations',
    range: [1, 10],
    color: '#10b981',
    prerequisites: [],
    unlocks: ['Arrays & Strings', 'Lists, Stacks & Queues'],
    rationale: 'Establishes basic memory layout, loop invariants, and asymptotic Big-O reasoning.',
    keyDataStructures: ['Contiguous Arrays', 'Call Stack Frames', 'Primitive Types']
  },
  {
    stageId: 'arrays_strings',
    name: 'Arrays & Strings',
    range: [11, 20],
    color: '#06b6d4',
    prerequisites: ['Programming Foundations'],
    unlocks: ['Searching & Sorting', 'Hashing & Backtracking'],
    rationale: 'Builds two-pointer and sliding-window techniques that convert O(N²) quadratic scans into linear O(N) passes.',
    keyDataStructures: ['Dynamic Arrays', 'Immutable Strings', 'Sliding Window Deque']
  },
  {
    stageId: 'linear_structures',
    name: 'Lists, Stacks & Queues',
    range: [21, 30],
    color: '#8b5cf6',
    prerequisites: ['Programming Foundations'],
    unlocks: ['Trees & Heaps', 'Graph Algorithms'],
    rationale: 'Teaches pointer traversal and LIFO/FIFO disciplines essential for DFS call stacks and BFS queues.',
    keyDataStructures: ['Singly/Doubly Linked Lists', 'Monotonic Stacks', 'Circular Queues']
  },
  {
    stageId: 'search_sort',
    name: 'Searching & Sorting',
    range: [31, 40],
    color: '#3b82f6',
    prerequisites: ['Arrays & Strings'],
    unlocks: ['Trees & Heaps', 'Greedy & DP'],
    rationale: 'Teaches divide-and-conquer principles and binary search invariants across sorted search spaces.',
    keyDataStructures: ['Binary Search Arrays', 'Merge Sort Partitions', 'Quick Sort Pivots']
  },
  {
    stageId: 'trees_heaps',
    name: 'Trees & Heaps',
    range: [41, 50],
    color: '#14b8a6',
    prerequisites: ['Lists, Stacks & Queues', 'Searching & Sorting'],
    unlocks: ['Graph Algorithms', 'Advanced DSA'],
    rationale: 'Extends linear linked lists into hierarchical recursive trees and logarithmic priority heaps.',
    keyDataStructures: ['Binary Search Trees (BST)', 'Binary Min/Max Heaps', 'Trie Prefix Trees']
  },
  {
    stageId: 'hashing_recursion',
    name: 'Hashing & Backtracking',
    range: [51, 60],
    color: '#f59e0b',
    prerequisites: ['Arrays & Strings'],
    unlocks: ['Greedy & DP', 'Apex Mastery'],
    rationale: 'Combines O(1) expected hash lookups with recursive state-space tree exploration and pruning.',
    keyDataStructures: ['Hash Maps with Chaining', 'State-Space Recursion Trees', 'Bitsets']
  },
  {
    stageId: 'graphs',
    name: 'Graph Algorithms',
    range: [61, 70],
    color: '#6366f1',
    prerequisites: ['Lists, Stacks & Queues', 'Trees & Heaps'],
    unlocks: ['Advanced DSA', 'Apex Mastery'],
    rationale: 'Generalizes trees into cyclic network topologies using BFS, DFS, Topological Sorting, and Dijkstra.',
    keyDataStructures: ['Adjacency Lists', 'Priority Queue (Dijkstra)', 'Union-Find (Kruskal)']
  },
  {
    stageId: 'greedy_dp',
    name: 'Greedy & Dynamic Programming',
    range: [71, 80],
    color: '#ec4899',
    prerequisites: ['Searching & Sorting', 'Hashing & Backtracking'],
    unlocks: ['Advanced DSA', 'Apex Mastery'],
    rationale: 'Optimizes overlapping subproblems via memoization and tabulation, transforming exponential O(2ᴺ) into polynomial time.',
    keyDataStructures: ['1D/2D DP Tables', 'Bitmask State Arrays', 'Interval Trees']
  },
  {
    stageId: 'advanced_dsa',
    name: 'Advanced DSA',
    range: [81, 90],
    color: '#a855f7',
    prerequisites: ['Trees & Heaps', 'Graph Algorithms', 'Greedy & DP'],
    unlocks: ['Apex Mastery'],
    rationale: 'High-performance competitive data structures: Segment Trees, Disjoint Set Union (DSU), and Fenwick Trees.',
    keyDataStructures: ['Segment Trees', 'DSU with Path Compression', 'Fenwick Binary Indexed Trees']
  },
  {
    stageId: 'mastery',
    name: 'Apex Titan Mastery',
    range: [91, 100],
    color: '#eab308',
    prerequisites: ['All Previous 9 Curriculum Stages'],
    unlocks: ['Technical Interview Graduation'],
    rationale: 'Multi-paradigm synthesis testing full problem-solving autonomy under high-stakes technical interview constraints.',
    keyDataStructures: ['Hybrid Composite Structures', 'Distributed Cache Indexes', 'System Invariants']
  }
];

export const KnowledgeGraphModal: React.FC<KnowledgeGraphModalProps> = ({
  isOpen,
  onClose,
  completedSquares,
  onJumpToStage
}) => {
  const [selectedNode, setSelectedNode] = useState<GraphNode>(GRAPH_NODES[0]);

  if (!isOpen) return null;

  const completedSet = new Set(completedSquares);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-[var(--text-primary)] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="knowledge-graph-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--card-secondary-bg)]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#06B6D4]/20 border border-[#06B6D4]/40 flex items-center justify-center text-[#06B6D4] shrink-0">
              <Share2 className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#06B6D4] font-mono">
                Curriculum Dependency Architecture
              </span>
              <h2 id="knowledge-graph-title" className="text-base sm:text-lg font-black text-[var(--text-primary)] leading-tight">
                DSA Knowledge Graph
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer"
            aria-label="Close Knowledge Graph"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col lg:flex-row gap-5 text-xs sm:text-sm">
          {/* Left: 10-Stage Pipeline Map */}
          <div className="flex-1 flex flex-col gap-2">
            <span className="text-[11px] font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider">
              100-Level Curriculum Roadmap (Click Stage to Inspect)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {GRAPH_NODES.map((node) => {
                const isSelected = selectedNode.stageId === node.stageId;
                // Count completed squares in this stage
                let completedCount = 0;
                for (let s = node.range[0]; s <= node.range[1]; s++) {
                  if (completedSet.has(s)) completedCount++;
                }
                const progressPct = Math.round((completedCount / 10) * 100);

                return (
                  <button
                    key={node.stageId}
                    onClick={() => setSelectedNode(node)}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition cursor-pointer ${
                      isSelected
                        ? 'bg-[#6366F1]/20 border-2 border-[#6366F1] text-[var(--text-primary)] shadow-lg shadow-[#6366F1]/25 scale-[1.01]'
                        : 'bg-[var(--card-secondary-bg)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[#06B6D4]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-mono text-[10px] text-[var(--text-secondary)]">
                        Tiles {node.range[0]}–{node.range[1]}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-[#06B6D4]">
                        {progressPct}% Done
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-[var(--text-primary)] leading-tight">
                      {node.name}
                    </h4>

                    {/* Mini progress bar */}
                    <div className="w-full h-1 bg-[var(--card-bg)] rounded-full overflow-hidden mt-2 border border-[var(--border-subtle)]">
                      <div 
                        className="h-full bg-[#06B6D4] rounded-full"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Node Prerequisite & Architectural Analysis */}
          <div className="w-full lg:w-80 p-4 rounded-2xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col justify-between gap-3 shrink-0">
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-[#06B6D4] pb-2 border-b border-[var(--border-subtle)]">
                <span>Stage {GRAPH_NODES.findIndex(n => n.stageId === selectedNode.stageId) + 1} of 10</span>
                <span>Tiles {selectedNode.range[0]}–{selectedNode.range[1]}</span>
              </div>

              <h3 className="text-base font-black text-[var(--text-primary)] mt-2">
                {selectedNode.name}
              </h3>

              <p className="text-[11px] text-[var(--text-secondary)] mt-1 leading-relaxed">
                {selectedNode.rationale}
              </p>

              {/* Prerequisites */}
              <div className="mt-3">
                <span className="text-[10px] font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider block mb-1">
                  Prerequisites Required:
                </span>
                <div className="flex flex-wrap gap-1">
                  {selectedNode.prerequisites.map((req, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] text-[var(--text-secondary)] text-[10px] font-medium border border-[var(--border-subtle)]">
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              {/* Unlocks */}
              <div className="mt-2.5">
                <span className="text-[10px] font-mono font-bold text-[#10B981] uppercase tracking-wider block mb-1">
                  Unlocks Downstream:
                </span>
                <div className="flex flex-wrap gap-1">
                  {selectedNode.unlocks.map((unl, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] text-[10px] font-medium border border-[#10B981]/40">
                      &rarr; {unl}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Data Structures */}
              <div className="mt-2.5">
                <span className="text-[10px] font-mono font-bold text-[#06B6D4] uppercase tracking-wider block mb-1">
                  Key Data Structures:
                </span>
                <div className="flex flex-wrap gap-1">
                  {selectedNode.keyDataStructures.map((ds, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] text-[#06B6D4] text-[10px] font-mono border border-[var(--border-subtle)]">
                      {ds}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Jump to Board Section Button */}
            <button
              onClick={() => {
                onClose();
                onJumpToStage(selectedNode.range[0]);
              }}
              className="w-full py-2 px-3 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white font-bold text-xs tracking-wide transition shadow-md shadow-[#6366F1]/25 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Scroll to Stage (Tile {selectedNode.range[0]})</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[var(--border-subtle)] bg-[var(--card-secondary-bg)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
          <span>Every stage directly establishes prerequisites for downstream interview topics.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold text-xs transition cursor-pointer"
          >
            Close Graph
          </button>
        </div>
      </div>
    </div>
  );
};
