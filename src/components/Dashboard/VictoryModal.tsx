import React from 'react';
import { Trophy, Crown, Sparkles, RotateCcw, X } from 'lucide-react';

interface VictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayAgain: () => void;
  totalScore: number;
  laddersClimbed: number;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  onClose,
  onPlayAgain,
  totalScore,
  laddersClimbed
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#141b36] to-[#0a0f1f] border-2 border-amber-400/80 rounded-3xl shadow-2xl p-6 sm:p-8 text-center text-slate-200">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Trophy Graphic */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 shadow-xl shadow-amber-500/30 flex items-center justify-center text-slate-950 mb-4 animate-bounce">
          <Trophy className="w-10 h-10 fill-slate-950" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider mb-2">
          <Crown className="w-3.5 h-3.5" />
          DSA Grandmaster
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Congratulations, Developer!
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-sm mx-auto leading-relaxed">
          You have conquered all 100 Squares of Code & Ladders! From Programming Foundations to Advanced Dynamic Programming and Graph Theory, you are interview-ready!
        </p>

        {/* Stats Badges */}
        <div className="grid grid-cols-2 gap-3 my-6 max-w-xs mx-auto">
          <div className="p-3 rounded-2xl bg-[#141e38] border border-[#23355e]">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Final Score</div>
            <div className="text-xl font-black text-yellow-400 mt-0.5">{totalScore} XP</div>
          </div>
          <div className="p-3 rounded-2xl bg-[#141e38] border border-[#23355e]">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Ladders Leaped</div>
            <div className="text-xl font-black text-amber-400 mt-0.5">{laddersClimbed}</div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#1e293b] hover:bg-[#334155] text-xs font-bold text-slate-200 transition cursor-pointer"
          >
            Review Board
          </button>
          <button
            onClick={onPlayAgain}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};
