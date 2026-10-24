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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080D1A]/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#111827] border border-[#263449] rounded-2xl shadow-2xl p-5 text-[#F8FAFC]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5 text-[#F43F5E] font-bold text-base">
            <span className="p-2 rounded-xl bg-[#F43F5E]/20 border border-[#F43F5E]/40">
              <AlertTriangle className="w-5 h-5 text-[#F43F5E]" />
            </span>
            <span>Reset Game Progress?</span>
          </div>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#F8FAFC] cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#94A3B8] mb-4 leading-relaxed">
          This will reset your position back to <strong className="text-[#F8FAFC]">Square 1</strong>, clear all completed squares, 
          reset your score and badges, and re-initialize your adaptive learner model. 
          This action cannot be undone.
        </p>

        <div className="flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#172033] hover:bg-[#263449] border border-[#263449] text-xs font-semibold text-[#94A3B8] hover:text-[#F8FAFC] transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirmReset}
            className="px-4 py-2 rounded-xl bg-[#F43F5E] hover:bg-[#e11d48] text-xs font-bold text-[#F8FAFC] shadow-lg shadow-[#F43F5E]/25 transition flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Confirm Reset
          </button>
        </div>
      </div>
    </div>
  );
};
