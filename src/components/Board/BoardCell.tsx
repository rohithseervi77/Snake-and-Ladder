import React from 'react';
import { 
  Trophy, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Code, 
  GitBranch, 
  Layers, 
  Search, 
  Hash, 
  FolderTree, 
  Network, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import { SquareMetadata } from '../../types/curriculum';
import { PlayerMarker } from './PlayerMarker';

interface BoardCellProps {
  square: SquareMetadata;
  isCurrent: boolean;
  isCompleted: boolean;
  equippedMarker?: string;
  onSelect: (square: SquareMetadata) => void;
}

/**
 * Formats long or parenthetical curriculum titles into clean, high-visibility topic labels.
 */
function formatCellTitle(title: string): string {
  // Strip parenthetical notes e.g. "Arrays (Manipulation)" -> "Arrays"
  let clean = title.replace(/\s*\([^)]*\)/g, '').trim();

  // Targeted clean mappings for crystal-clear readability
  const map: Record<string, string> = {
    'Singly Linked List': 'Singly List',
    'Doubly Linked List': 'Doubly List',
    'Circular Linked List': 'Circular List',
    'Breadth-First Search': 'BFS',
    'Depth-First Search': 'DFS',
    'Dynamic Programming': 'Dynamic Prog',
    'Bitmasking Techniques': 'Bitmasking',
    'Topological Sort': 'Topo Sort',
    'Variables & Types': 'Variables',
    'Input / Output': 'Input / Output',
    'Conditionals': 'Conditions',
    'Operator Precedence': 'Operators',
    'Problem Solving': 'Algorithms',
    'Disjoint Set': 'Disjoint Set',
    'Segment Trees': 'Segment Tree',
    'Binary Search Tree': 'BST',
    'Priority Queue': 'Priority Queue',
    'Floyd-Warshall': 'Floyd-Warshall',
    'Dijkstra\'s Algorithm': 'Dijkstra',
    'Kruskal\'s Algorithm': 'Kruskal MST',
    'Prim\'s Algorithm': 'Prim MST',
    'Sliding Window': 'Sliding Window',
    'Two Pointers': 'Two Pointers',
    'Recursion & Backtracking': 'Recursion',
    'Heap Sort': 'Heap Sort',
    'Quick Sort': 'Quick Sort',
    'Merge Sort': 'Merge Sort',
    'Binary Search': 'Binary Search',
    'Linear Search': 'Linear Search'
  };

  return map[clean] || clean;
}

export const BoardCell: React.FC<BoardCellProps> = ({
  square,
  isCurrent,
  isCompleted,
  equippedMarker,
  onSelect
}) => {
  // High-contrast, vibrant palette for board tiles
  const getStyleClasses = () => {
    if (square.id === 100) {
      return 'bg-gradient-to-br from-amber-900/90 via-purple-900/90 to-indigo-900/90 border-amber-400 text-amber-200 shadow-lg shadow-amber-500/25 ring-1 ring-amber-300/40';
    }
    if (square.type === 'snake_head') {
      return 'bg-[#2a0b12] border-rose-600/80 text-rose-200 hover:border-rose-400 shadow-sm shadow-rose-950/40';
    }
    if (square.type === 'ladder_start') {
      return 'bg-[#291703] border-amber-500/80 text-amber-200 hover:border-amber-300 shadow-sm shadow-amber-950/40';
    }
    if (square.isCheckpoint) {
      return 'bg-[#241a05] border-amber-400/80 text-amber-300 shadow-sm shadow-amber-950/40';
    }

    switch (square.colorCategory) {
      case 'emerald':
        return 'bg-[#0a231c] border-emerald-700/60 text-emerald-200 hover:border-emerald-400';
      case 'purple':
        return 'bg-[#1b1031] border-purple-700/60 text-purple-200 hover:border-purple-400';
      case 'amber':
        return 'bg-[#281807] border-amber-700/60 text-amber-200 hover:border-amber-400';
      case 'blue':
        return 'bg-[#0d1d36] border-blue-700/60 text-blue-200 hover:border-blue-400';
      case 'teal':
        return 'bg-[#0b2529] border-teal-700/60 text-teal-200 hover:border-teal-400';
      default:
        return 'bg-[#111c33] border-slate-700/60 text-slate-200 hover:border-slate-500';
    }
  };

  const renderIcon = () => {
    if (square.id === 100) return <Trophy className="w-3.5 h-3.5 text-amber-300 shrink-0" />;
    if (square.type === 'ladder_start') return <Zap className="w-3.5 h-3.5 text-amber-300 shrink-0" />;
    if (square.type === 'snake_head') return <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />;
    if (square.isCheckpoint) return <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0" />;

    switch (square.stage) {
      case 'foundations': return <Code className="w-3 h-3 text-emerald-400 opacity-90 shrink-0" />;
      case 'arrays_strings': return <Layers className="w-3 h-3 text-cyan-400 opacity-90 shrink-0" />;
      case 'linear_structures': return <GitBranch className="w-3 h-3 text-purple-400 opacity-90 shrink-0" />;
      case 'search_sort': return <Search className="w-3 h-3 text-blue-400 opacity-90 shrink-0" />;
      case 'trees_heaps': return <FolderTree className="w-3 h-3 text-teal-400 opacity-90 shrink-0" />;
      case 'hashing_recursion': return <Hash className="w-3 h-3 text-amber-400 opacity-90 shrink-0" />;
      case 'graphs': return <Network className="w-3 h-3 text-indigo-400 opacity-90 shrink-0" />;
      case 'greedy_dp': return <Clock className="w-3 h-3 text-pink-400 opacity-90 shrink-0" />;
      default: return <Sparkles className="w-3 h-3 text-yellow-400 opacity-90 shrink-0" />;
    }
  };

  const displayTitle = formatCellTitle(square.title);
  const isSpecial = square.id === 1 || square.id === 100 || square.type === 'ladder_start' || square.type === 'snake_head' || square.isCheckpoint;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(square)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(square);
        }
      }}
      aria-label={`Square ${square.id}: ${square.title}. ${square.type !== 'normal' ? square.type : ''}`}
      className={`relative w-full h-full min-h-0 rounded-lg border p-1 sm:p-1.5 flex flex-col justify-between transition-all duration-200 cursor-pointer select-none ${getStyleClasses()} ${
        isCurrent ? 'ring-2 ring-emerald-400 shadow-lg shadow-emerald-500/40 z-20 scale-[1.03]' : 'z-0'
      }`}
    >
      {/* Top Header: Tile Number and Status Icon */}
      <div className="flex items-center justify-between w-full">
        <span className={`text-[11px] sm:text-[12px] md:text-[13px] font-black tracking-tight ${
          square.id === 100 ? 'text-amber-300' : 'text-white'
        }`}>
          {square.id}
        </span>
        <div className="flex items-center gap-1">
          {renderIcon()}
          {isCompleted && !isCurrent && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-500/50 shrink-0" title="Completed" />
          )}
        </div>
      </div>

      {/* Main Center Topic: Bold, Large, Legible */}
      <div className="flex-1 flex items-center justify-center py-0.5 text-center px-0.5">
        <p className="text-[10px] sm:text-[11px] md:text-[12px] font-extrabold text-white leading-tight tracking-tight break-words drop-shadow-sm">
          {displayTitle}
        </p>
      </div>

      {/* Bottom Status Badge (Only shown for special tiles to leave room for big text) */}
      <div className="flex items-center justify-center w-full min-h-[14px]">
        {square.id === 1 ? (
          <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 font-black uppercase text-[8px] tracking-wider">
            START
          </span>
        ) : square.id === 100 ? (
          <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-black uppercase text-[8.5px] tracking-wider shadow">
            FINISH
          </span>
        ) : square.type === 'ladder_start' ? (
          <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold uppercase text-[7.5px] tracking-wider">
            Ladder &uarr;
          </span>
        ) : square.type === 'snake_head' ? (
          <span className="px-1.5 py-0.2 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold uppercase text-[7.5px] tracking-wider">
            Snake &darr;
          </span>
        ) : square.isCheckpoint ? (
          <span className="px-1.5 py-0.2 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 font-bold uppercase text-[7.5px] tracking-wider">
            Checkpoint
          </span>
        ) : (
          /* Subtle topic indicator on standard tiles */
          <span className="text-[8px] font-semibold text-slate-400/70 truncate tracking-wide">
            {square.topic}
          </span>
        )}
      </div>

      {/* Player Marker (if current position) */}
      {isCurrent && (
        <PlayerMarker equippedMarker={equippedMarker} />
      )}
    </div>
  );
};
