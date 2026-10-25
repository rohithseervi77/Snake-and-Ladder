import React, { useState } from 'react';
import { 
  X, 
  FlaskConical, 
  Layers, 
  ArrowRightLeft, 
  RotateCw, 
  GitFork, 
  ArrowUpDown, 
  Search, 
  Binary, 
  Scale, 
  Network, 
  Trophy,
  Play
} from 'lucide-react';
import { StackTowerModal } from '../DSAMechanics/StackTowerModal';
import { QueueStationModal } from '../DSAMechanics/QueueStationModal';
import { CircularQueueModal } from '../DSAMechanics/CircularQueueModal';
import { LinkedListRepairModal } from '../DSAMechanics/LinkedListRepairModal';
import { SortingRaceModal } from '../DSAMechanics/SortingRaceModal';
import { BinarySearchPathModal } from '../DSAMechanics/BinarySearchPathModal';
import { BSTBuilderModal } from '../DSAMechanics/BSTBuilderModal';
import { AVLBalanceModal } from '../DSAMechanics/AVLBalanceModal';
import { GraphRouteModal } from '../DSAMechanics/GraphRouteModal';
import { AlgorithmBossModal } from '../DSAMechanics/AlgorithmBossModal';

interface DSALabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardReward?: (xp: number, coins: number) => void;
}

export type ActiveLabMechanic = 
  | 'stack_tower' 
  | 'queue_station' 
  | 'circular_queue' 
  | 'linked_list_repair' 
  | 'sorting_race' 
  | 'binary_search_path' 
  | 'bst_builder' 
  | 'avl_balance' 
  | 'graph_route' 
  | 'algorithm_boss' 
  | null;

interface MechanicCard {
  id: ActiveLabMechanic;
  title: string;
  co: 'CO1' | 'CO2' | 'CO3' | 'CO4';
  icon: React.ReactNode;
  description: string;
  syllabusTopic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const MECHANICS: MechanicCard[] = [
  {
    id: 'stack_tower',
    title: 'Stack Tower Laboratory',
    co: 'CO2',
    icon: <Layers className="w-5 h-5 text-[var(--color-indigo)]" />,
    description: 'Experiment with LIFO order, Push, Pop, Peek, and verify Stack Underflow and Overflow boundary conditions.',
    syllabusTopic: 'Array Stack & LIFO Dynamics (Squares 41–50)',
    difficulty: 'Beginner'
  },
  {
    id: 'queue_station',
    title: 'FIFO Queue Station',
    co: 'CO2',
    icon: <ArrowRightLeft className="w-5 h-5 text-[var(--color-cyan)]" />,
    description: 'Process incoming requests in strict FIFO order, observing front and rear pointer increments.',
    syllabusTopic: 'Linear Queue & Job Scheduling (Squares 51–55)',
    difficulty: 'Beginner'
  },
  {
    id: 'circular_queue',
    title: 'Circular Queue Buffer',
    co: 'CO2',
    icon: <RotateCw className="w-5 h-5 text-[var(--color-violet)]" />,
    description: 'Master modulo arithmetic (rear + 1) % N to prevent linear queue memory drift and handle buffer wraps.',
    syllabusTopic: 'Circular Queue & Modulo Arithmetic (Squares 56–60)',
    difficulty: 'Intermediate'
  },
  {
    id: 'linked_list_repair',
    title: 'Linked List Pointer Repair',
    co: 'CO2',
    icon: <GitFork className="w-5 h-5 text-[var(--color-emerald)]" />,
    description: 'Reconnect severed next pointers to insert nodes into singly and doubly linked lists without memory leaks.',
    syllabusTopic: 'Singly & Doubly Linked Lists (Squares 61–70)',
    difficulty: 'Intermediate'
  },
  {
    id: 'sorting_race',
    title: 'Sorting Race Arena',
    co: 'CO3',
    icon: <ArrowUpDown className="w-5 h-5 text-[var(--color-amber)]" />,
    description: 'Compare Insertion Sort, Merge Sort, Quick Sort, and Heap Sort step-by-step on identical arrays.',
    syllabusTopic: 'Sorting Algorithms & Asymptotics (Squares 71–75)',
    difficulty: 'Intermediate'
  },
  {
    id: 'binary_search_path',
    title: 'Binary Search Halving Path',
    co: 'CO3',
    icon: <Search className="w-5 h-5 text-[var(--color-cyan)]" />,
    description: 'Select midpoint low + (high - low) / 2 to halve sorted search spaces in logarithmic O(log n) time.',
    syllabusTopic: 'Searching Algorithms (Squares 76–80)',
    difficulty: 'Beginner'
  },
  {
    id: 'bst_builder',
    title: 'Binary Search Tree Builder',
    co: 'CO4',
    icon: <Binary className="w-5 h-5 text-[var(--color-emerald)]" />,
    description: 'Insert keys into a tree while strictly preserving the BST invariant (left < root < right).',
    syllabusTopic: 'Trees & BST Construction (Squares 81–85)',
    difficulty: 'Intermediate'
  },
  {
    id: 'avl_balance',
    title: 'AVL Tree Rotation Balancer',
    co: 'CO4',
    icon: <Scale className="w-5 h-5 text-[var(--color-rose)]" />,
    description: 'Detect balance factors outside {-1, 0, +1} and perform LL, RR, LR, or RL rotations to restore balance.',
    syllabusTopic: 'AVL Height-Balanced Trees (Squares 86–90)',
    difficulty: 'Advanced'
  },
  {
    id: 'graph_route',
    title: 'Graph Traversal & MST Route',
    co: 'CO4',
    icon: <Network className="w-5 h-5 text-[var(--color-indigo)]" />,
    description: 'Execute BFS, DFS, Dijkstra shortest path, and Prim / Kruskal Minimum Spanning Tree algorithms.',
    syllabusTopic: 'Graphs, BFS/DFS, Dijkstra & MST (Squares 91–98)',
    difficulty: 'Advanced'
  },
  {
    id: 'algorithm_boss',
    title: 'Algorithm Boss: Capstone Challenge',
    co: 'CO4',
    icon: <Trophy className="w-5 h-5 text-[var(--color-amber)]" />,
    description: 'Select the optimal algorithm and time complexity for large-scale engineering problems at Tile 100.',
    syllabusTopic: 'Curriculum Capstone (Square 100)',
    difficulty: 'Advanced'
  }
];

export const DSALabModal: React.FC<DSALabModalProps> = ({
  isOpen,
  onClose,
  onAwardReward
}) => {
  const [activeMechanic, setActiveMechanic] = useState<ActiveLabMechanic>(null);
  const [selectedCO, setSelectedCO] = useState<string>('All');

  if (!isOpen) return null;

  const filteredMechanics = MECHANICS.filter(m => selectedCO === 'All' || m.co === selectedCO);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
        <div className="relative w-full max-w-5xl max-h-[92vh] bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[var(--text-primary)]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[var(--border-subtle)] bg-[var(--header-bg)]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-[var(--color-indigo)] to-[var(--color-violet)] text-white shadow-md">
                <FlaskConical className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-black tracking-tight text-[var(--text-primary)] m-0">
                    DSA Interactive Mechanics Laboratory
                  </h2>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-[var(--color-indigo-light)] text-[var(--color-indigo)] border border-[var(--color-indigo-border)]">
                    10 Simulations
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] m-0 mt-0.5">
                  Hands-on visual interactive models strictly mapped to University DSA syllabus outcomes CO1–CO4
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-secondary-bg)] transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Bar */}
          <div className="p-3.5 border-b border-[var(--border-subtle)] bg-[var(--card-secondary-bg)] flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[var(--text-secondary)]">Filter by Outcome:</span>
              {['All', 'CO2', 'CO3', 'CO4'].map(co => (
                <button
                  key={co}
                  onClick={() => setSelectedCO(co)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    selectedCO === co
                      ? 'bg-[var(--color-indigo)] text-white shadow-sm'
                      : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                  }`}
                >
                  {co === 'All' ? 'All Units' : co}
                </button>
              ))}
            </div>
            <div className="text-xs text-[var(--text-secondary)]">
              Interactive simulation sandbox &bull; Earn XP & Coins on completion
            </div>
          </div>

          {/* Grid of Mechanics */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMechanics.map(m => (
              <div
                key={m.id}
                className="p-4 sm:p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-subtle)] hover:border-[var(--color-indigo-border)] transition-all shadow-sm flex flex-col justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] group-hover:scale-105 transition-transform">
                        {m.icon}
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] m-0">
                          {m.title}
                        </h3>
                        <span className="text-[11px] font-mono text-[var(--color-cyan)]">
                          {m.syllabusTopic}
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--color-indigo-light)] text-[var(--color-indigo)] border border-[var(--color-indigo-border)]">
                      {m.co}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed m-0 mt-2">
                    {m.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    m.difficulty === 'Beginner' ? 'text-[var(--color-emerald)]' :
                    m.difficulty === 'Intermediate' ? 'text-[var(--color-amber)]' : 'text-[var(--color-rose)]'
                  }`}>
                    {m.difficulty} Level
                  </span>

                  <button
                    onClick={() => setActiveMechanic(m.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--color-indigo)] hover:bg-[var(--color-indigo-hover)] text-white text-xs font-bold transition shadow-sm active:scale-95 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Launch Sim</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3.5 border-t border-[var(--border-subtle)] bg-[var(--header-bg)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <span>Each simulation tests core invariants and algorithms directly from the syllabus</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-[var(--card-secondary-bg)] hover:bg-[var(--card-bg)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-bold text-xs transition cursor-pointer"
            >
              Close Lab
            </button>
          </div>
        </div>
      </div>

      {/* Render Individual Mechanic Modals */}
      <StackTowerModal
        isOpen={activeMechanic === 'stack_tower'}
        onClose={() => setActiveMechanic(null)}
        onAwardReward={onAwardReward}
      />
      <QueueStationModal
        isOpen={activeMechanic === 'queue_station'}
        onClose={() => setActiveMechanic(null)}
        onAwardReward={onAwardReward}
      />
      <CircularQueueModal
        isOpen={activeMechanic === 'circular_queue'}
        onClose={() => setActiveMechanic(null)}
        onAwardReward={onAwardReward}
      />
      <LinkedListRepairModal
        isOpen={activeMechanic === 'linked_list_repair'}
        onClose={() => setActiveMechanic(null)}
        onAwardReward={onAwardReward}
      />
      <SortingRaceModal
        isOpen={activeMechanic === 'sorting_race'}
        onClose={() => setActiveMechanic(null)}
        onAwardReward={onAwardReward}
      />
      <BinarySearchPathModal
        isOpen={activeMechanic === 'binary_search_path'}
        onClose={() => setActiveMechanic(null)}
        onAwardReward={onAwardReward}
      />
      <BSTBuilderModal
        isOpen={activeMechanic === 'bst_builder'}
        onClose={() => setActiveMechanic(null)}
        onAwardReward={onAwardReward}
      />
      <AVLBalanceModal
        isOpen={activeMechanic === 'avl_balance'}
        onClose={() => setActiveMechanic(null)}
        onAwardReward={onAwardReward}
      />
      <GraphRouteModal
        isOpen={activeMechanic === 'graph_route'}
        onClose={() => setActiveMechanic(null)}
        onAwardReward={onAwardReward}
      />
      <AlgorithmBossModal
        isOpen={activeMechanic === 'algorithm_boss'}
        onClose={() => setActiveMechanic(null)}
        onAwardReward={onAwardReward}
      />
    </>
  );
};
