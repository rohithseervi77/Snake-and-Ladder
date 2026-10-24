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
  onSelect: (square: SquareMetadata) => void;
}

export const BoardCell: React.FC<BoardCellProps> = ({
  square,
  isCurrent,
  isCompleted,
  onSelect
}) => {
  // Map color categories to refined indie-gaming palette
  const getStyleClasses = () => {
    if (square.id === 100) {
      return 'bg-gradient-to-br from-indigo-900/90 via-purple-900/90 to-amber-900/90 border-amber-400 text-amber-200 shadow-lg shadow-amber-500/20';
    }
    if (square.type === 'snake_head') {
      return 'bg-rose-950/60 border-rose-700/70 text-rose-200 hover:border-rose-500';
    }
    if (square.type === 'ladder_start') {
      return 'bg-amber-950/60 border-amber-600/70 text-amber-200 hover:border-amber-400';
    }
    if (square.isCheckpoint) {
      return 'bg-amber-950/40 border-amber-500/60 text-amber-300';
    }

    switch (square.colorCategory) {
      case 'emerald':
        return 'bg-[#0f2420] border-emerald-800/50 text-emerald-300 hover:border-emerald-500';
      case 'purple':
        return 'bg-[#1e1533] border-purple-800/50 text-purple-300 hover:border-purple-500';
      case 'amber':
        return 'bg-[#291b0f] border-amber-800/50 text-amber-300 hover:border-amber-500';
      case 'blue':
        return 'bg-[#10203a] border-blue-800/50 text-blue-300 hover:border-blue-500';
      case 'teal':
        return 'bg-[#0f272a] border-teal-800/50 text-teal-300 hover:border-teal-500';
      default:
        return 'bg-[#141e33] border-slate-800 text-slate-300 hover:border-slate-600';
    }
  };

  const renderIcon = () => {
    if (square.id === 100) return <Trophy className="w-3.5 h-3.5 text-amber-400" />;
    if (square.type === 'ladder_start') return <Zap className="w-3 h-3 text-amber-400" />;
    if (square.type === 'snake_head') return <AlertTriangle className="w-3 h-3 text-rose-400" />;
    if (square.isCheckpoint) return <CheckCircle2 className="w-3 h-3 text-amber-300" />;

    switch (square.stage) {
      case 'foundations': return <Code className="w-3 h-3 opacity-80" />;
      case 'arrays_strings': return <Layers className="w-3 h-3 opacity-80" />;
      case 'linear_structures': return <GitBranch className="w-3 h-3 opacity-80" />;
      case 'search_sort': return <Search className="w-3 h-3 opacity-80" />;
      case 'trees_heaps': return <FolderTree className="w-3 h-3 opacity-80" />;
      case 'hashing_recursion': return <Hash className="w-3 h-3 opacity-80" />;
      case 'graphs': return <Network className="w-3 h-3 opacity-80" />;
      case 'greedy_dp': return <Clock className="w-3 h-3 opacity-80" />;
      default: return <Sparkles className="w-3 h-3 opacity-80" />;
    }
  };

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
      className={`relative w-full h-full min-h-[52px] sm:min-h-[58px] md:min-h-[64px] rounded-lg sm:rounded-xl border p-1 sm:p-1.5 flex flex-col justify-between transition-all duration-200 cursor-pointer overflow-hidden ${getStyleClasses()} ${
        isCurrent ? 'ring-2 ring-emerald-400 shadow-lg shadow-emerald-500/30 z-20 scale-[1.02]' : 'z-0'
      }`}
    >
      {/* Top Header: Number and Mini Badge */}
      <div className="flex items-center justify-between w-full">
        <span className={`text-[10px] sm:text-xs font-black tracking-tight ${square.id === 100 ? 'text-amber-300' : 'text-white'}`}>
          {square.id}
        </span>
        <div className="flex items-center gap-0.5">
          {renderIcon()}
          {isCompleted && !isCurrent && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Square Completed" />
          )}
        </div>
      </div>

      {/* Middle: Topic Name */}
      <div className="flex-1 flex flex-col justify-center my-0.5 leading-tight">
        <p className="text-[9px] sm:text-[10.5px] font-bold text-slate-100 line-clamp-2">
          {square.title}
        </p>
      </div>

      {/* Bottom: Sub-badge or indicator */}
      <div className="flex items-center justify-between text-[8px] sm:text-[9px] text-slate-400">
        {square.id === 1 ? (
          <span className="px-1 py-0.2 rounded bg-emerald-500/30 text-emerald-300 font-black uppercase text-[8px]">
            START
          </span>
        ) : square.id === 100 ? (
          <span className="px-1 py-0.2 rounded bg-amber-500 text-black font-black uppercase text-[8px]">
            FINISH
          </span>
        ) : square.type === 'ladder_start' ? (
          <span className="text-amber-400 font-semibold flex items-center gap-0.5">
            Ladder &uarr;
          </span>
        ) : square.type === 'snake_head' ? (
          <span className="text-rose-400 font-semibold flex items-center gap-0.5">
            Snake &darr;
          </span>
        ) : square.isCheckpoint ? (
          <span className="text-amber-300 font-semibold">Checkpoint</span>
        ) : (
          <span className="truncate opacity-75">{square.topic}</span>
        )}
      </div>

      {/* Player Marker (if current position) */}
      {isCurrent && (
        <PlayerMarker />
      )}
    </div>
  );
};
