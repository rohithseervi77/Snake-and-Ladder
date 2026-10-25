import React from 'react';
import { HelpCircle, BookOpen } from 'lucide-react';

interface LeftSidebarProps {
  onSelectCO?: (co: string) => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = () => {
  return (
    <aside className="w-full flex flex-col gap-3 text-[var(--text-secondary)]">
      {/* 1. How to Play Card */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-2xl p-4 shadow-sm">
        <h2 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-[var(--color-indigo)]" />
          How to Play
        </h2>

        <ol className="flex flex-col gap-2 text-xs leading-relaxed text-[var(--text-secondary)] pl-4 list-decimal marker:text-[var(--color-indigo)] marker:font-bold">
          <li>
            <strong className="text-[var(--text-primary)]">Roll the dice</strong> to move your token.
          </li>
          <li>
            <strong className="text-[var(--text-primary)]">Move your token</strong> across 100 tiles.
          </li>
          <li>
            <strong className="text-[var(--text-primary)]">Answer questions</strong> on challenge tiles.
          </li>
          <li>
            <strong className="text-[var(--text-primary)]">Climb ladders</strong> to leap forward.
          </li>
          <li>
            <strong className="text-[var(--text-primary)]">Avoid snakes</strong> that slide you down.
          </li>
          <li>
            <strong className="text-[var(--text-primary)]">Reach tile 100</strong> to win the game!
          </li>
        </ol>
      </div>

      {/* 2. Syllabus Overview Card */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-2xl p-4 shadow-sm">
        <h2 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-[var(--color-indigo)]" />
          Syllabus Units
        </h2>

        <div className="flex flex-col gap-2 text-xs">
          <div className="p-2 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
            <div className="font-bold text-[var(--text-primary)]">CO1: Techniques & Analysis</div>
            <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Asymptotics, Recurrences & Master Theorem (Tiles 1–40)</div>
          </div>

          <div className="p-2 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
            <div className="font-bold text-[var(--text-primary)]">CO2: Stacks, Queues & Lists</div>
            <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Array Stack, Circular Queue & Linked Lists (Tiles 41–70)</div>
          </div>

          <div className="p-2 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
            <div className="font-bold text-[var(--text-primary)]">CO3: Sorting & Searching</div>
            <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Merge/Quick/Heap Sort, Binary Search & Hashing (Tiles 71–80)</div>
          </div>

          <div className="p-2 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
            <div className="font-bold text-[var(--text-primary)]">CO4: Trees & Graphs</div>
            <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">BST, AVL, BFS/DFS, Dijkstra, MST & Huffman (Tiles 81–100)</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
