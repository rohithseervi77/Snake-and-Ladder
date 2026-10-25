import React, { useState } from 'react';
import { X, Compass, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';
import { Graph } from '../../algorithms/graphs';

interface GraphRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardReward?: (xp: number, coins: number) => void;
}

type GraphTask = 'bfs' | 'dfs' | 'dijkstra' | 'mst';

export const GraphRouteModal: React.FC<GraphRouteModalProps> = ({
  isOpen,
  onClose,
  onAwardReward
}) => {
  const [activeTask, setActiveTask] = useState<GraphTask>('dijkstra');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [hasClaimed, setHasClaimed] = useState<boolean>(false);

  if (!isOpen) return null;

  const TASKS: Record<GraphTask, {
    question: string;
    options: string[];
    correct: string;
    explanation: string;
  }> = {
    bfs: {
      question: 'What is the BFS traversal order starting from vertex A? (Neighbors visited alphabetically)',
      options: ['A, B, C, D', 'A, B, D, C', 'A, C, B, D', 'D, C, B, A'],
      correct: 'A, B, C, D',
      explanation: 'From A, visit immediate neighbors B and C. Then from B, visit unvisited neighbor D. BFS order: A, B, C, D.'
    },
    dfs: {
      question: 'What is the DFS traversal order starting from vertex A? (Neighbors visited alphabetically)',
      options: ['A, B, C, D', 'A, B, D, C', 'A, C, D, B', 'B, A, C, D'],
      correct: 'A, B, C, D',
      explanation: 'From A -> go to first neighbor B -> from B go to first neighbor C -> from C go to D. Order: A, B, C, D.'
    },
    dijkstra: {
      question: 'Using Dijkstra\'s algorithm, what is the cost of the shortest path from A to D?',
      options: ['4 (Path: A -> B -> C -> D)', '6 (Path: A -> B -> D)', '5 (Path: A -> C -> D)', '7'],
      correct: '4 (Path: A -> B -> C -> D)',
      explanation: 'Edge weights: A->B is 1; B->C is 2 (total 3); C->D is 1 (total 4). Direct path A->B->D is 1 + 5 = 6. Path A->C->D is 4 + 1 = 5. Shortest path is 4.'
    },
    mst: {
      question: 'Using Prim or Kruskal, what is the total weight of the Minimum Spanning Tree (MST)?',
      options: ['4 (Edges: A-B=1, C-D=1, B-C=2)', '5', '6', '7'],
      correct: '4 (Edges: A-B=1, C-D=1, B-C=2)',
      explanation: 'Cheapest edges: A-B (1), C-D (1), B-C (2). These 3 edges connect all 4 vertices without cycles. Total MST weight = 1 + 1 + 2 = 4.'
    }
  };

  const current = TASKS[activeTask];
  const isCorrect = selectedAnswer === current.correct;

  const handleVerify = () => {
    setIsEvaluated(true);
    if (isCorrect && !hasClaimed) {
      setHasClaimed(true);
      onAwardReward?.(50, 25);
    }
  };

  const handleTaskChange = (task: GraphTask) => {
    setActiveTask(task);
    setSelectedAnswer(null);
    setIsEvaluated(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl p-5 flex flex-col gap-4 text-[var(--text-primary)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#6366F1]/20 border border-[#6366F1]/40 flex items-center justify-center text-[#6366F1]">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#6366F1]">CO4 Mini-Game</span>
              <h3 className="text-base font-black">Graph Route Challenge</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--card-secondary-bg)] text-[var(--text-secondary)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Algorithm Tabs */}
        <div className="grid grid-cols-4 gap-1.5">
          {(['dijkstra', 'mst', 'bfs', 'dfs'] as GraphTask[]).map((t) => (
            <button
              key={t}
              onClick={() => handleTaskChange(t)}
              className={`py-1.5 px-2 rounded-xl text-xs font-bold uppercase font-mono transition cursor-pointer ${
                activeTask === t
                  ? 'bg-[#6366F1] text-white shadow-sm'
                  : 'bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Graph Visual ASCII Diagram */}
        <div className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border-subtle)] flex flex-col items-center">
          <span className="text-[10px] font-mono text-[var(--text-secondary)] mb-1">Graph Topology (4 Vertices, 5 Weighted Edges):</span>
          <pre className="font-mono text-xs text-[#06B6D4] leading-relaxed text-center py-1">
{`    (A) ----- 1 ----- (B)
     |                 |  \\
     4                 2    5
     |                 |      \\
    (C) ----- 1 ----- (D)      (D)`}
          </pre>
          <span className="text-[10px] font-mono text-[var(--text-secondary)]">Edges: (A,B)=1, (A,C)=4, (B,C)=2, (B,D)=5, (C,D)=1</span>
        </div>

        {/* Question Prompt */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-[var(--text-primary)]">
            {current.question}
          </p>

          <div className="grid grid-cols-2 gap-2 mt-1">
            {current.options.map((opt, idx) => (
              <button
                key={idx}
                disabled={isEvaluated}
                onClick={() => setSelectedAnswer(opt)}
                className={`p-2.5 rounded-xl border text-left text-xs font-mono font-bold transition cursor-pointer disabled:cursor-default ${
                  selectedAnswer === opt
                    ? isEvaluated
                      ? opt === current.correct
                        ? 'bg-[#10B981] text-white border-[#10B981]'
                        : 'bg-[#F43F5E] text-white border-[#F43F5E]'
                      : 'bg-[#6366F1]/20 border-[#6366F1] text-[#6366F1]'
                    : 'bg-[var(--card-secondary-bg)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Evaluation */}
        {isEvaluated && (
          <div className={`p-3 rounded-xl border text-xs font-mono ${
            isCorrect
              ? 'bg-[#10B981]/15 border-[#10B981]/40 text-[#10B981]'
              : 'bg-[#F43F5E]/15 border-[#F43F5E]/40 text-[#F43F5E]'
          }`}>
            {isCorrect ? (
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Correct! {current.explanation}</span>
              </div>
            ) : (
              <div className="flex items-start gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Incorrect! Check the edge relaxations and traversal queue/stack rules.</span>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
          <button
            onClick={() => { setSelectedAnswer(null); setIsEvaluated(false); }}
            className="flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Choice</span>
          </button>

          {!isEvaluated ? (
            <button
              onClick={handleVerify}
              disabled={selectedAnswer === null}
              className="py-2 px-4 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] disabled:opacity-40 text-white font-bold text-xs cursor-pointer"
            >
              Verify Traversal
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
