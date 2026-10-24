import React from 'react';
import { AlertTriangle, RotateCcw, X } from 'lucide-react';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: () => void;
}

export const ResetModal: React.FC<ResetModalProps> = ({
  isOpen,
  onClose,
  onConfirmReset
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#0f172a] border border-rose-800/50 rounded-2xl shadow-2xl p-5 text-slate-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5 text-rose-400 font-bold text-base">
            <span className="p-2 rounded-xl bg-rose-950/60 border border-rose-700/50">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
            </span>
            <span>Reset Game Progress?</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          This will reset your position back to <strong>Square 1</strong>, clear all completed squares, 
          reset your score and badges, and re-initialize your adaptive learner model. 
          This action cannot be undone.
        </p>

        <div className="flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#1e293b] hover:bg-[#334155] text-xs font-semibold text-slate-300 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirmReset}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white shadow-lg shadow-rose-600/30 transition flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Confirm Reset
          </button>
        </div>
      </div>
    </div>
  );
};
