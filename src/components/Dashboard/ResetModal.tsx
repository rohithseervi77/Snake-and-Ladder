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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl p-5 text-[var(--text-primary)] transition-colors duration-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5 text-[var(--color-rose)] font-bold text-base">
            <span className="p-2 rounded-xl bg-[var(--color-rose-light)] border border-[var(--color-rose-border)]">
              <AlertTriangle className="w-5 h-5 text-[var(--color-rose)]" />
            </span>
            <span>Reset Game Progress?</span>
          </div>
          <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
          This will reset your position back to <strong className="text-[var(--text-primary)]">Square 1</strong>, clear all completed squares, 
          reset your score and badges, and re-initialize your adaptive learner model. 
          This action cannot be undone.
        </p>

        <div className="flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirmReset}
            className="px-4 py-2 rounded-xl bg-[var(--color-rose)] hover:opacity-90 text-xs font-bold text-white shadow-md transition flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Confirm Reset
          </button>
        </div>
      </div>
    </div>
  );
};
