import React from 'react';
import { 
  Sparkles, 
  X, 
  Calendar, 
  Play 
} from 'lucide-react';
import { RevisionItem } from '../../types/learner';

interface RevisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  revisionQueue: RevisionItem[];
  onStartRevision: (squareId: number) => void;
}

export const RevisionModal: React.FC<RevisionModalProps> = ({
  isOpen,
  onClose,
  revisionQueue,
  onStartRevision
}) => {
  if (!isOpen) return null;

  const dueItems = revisionQueue.filter(item => item.isDue || item.nextDueDate <= Date.now());
  const upcomingItems = revisionQueue.filter(item => !dueItems.includes(item));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl max-h-[85vh] bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl sm:rounded-3xl shadow-2xl p-5 flex flex-col text-[var(--text-primary)] transition-colors duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[var(--color-emerald-light)] text-[var(--color-emerald)] border border-[var(--color-emerald-border)]">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)]">Spaced Repetition Review</h2>
              <p className="text-xs text-[var(--text-secondary)]">SM-2 algorithmic retention scheduler</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body list */}
        <div className="py-4 overflow-y-auto flex-1 flex flex-col gap-4 text-xs">
          {/* Due Now */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-emerald)] mb-2 flex items-center gap-1.5">
              <span>Ready for Review ({dueItems.length})</span>
            </h3>
            {dueItems.length === 0 ? (
              <div className="p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] text-center">
                All reviewed! No topics currently due for revision.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {dueItems.map(item => (
                  <div 
                    key={item.id}
                    className="p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--color-emerald-border)] flex items-center justify-between shadow-sm"
                  >
                    <div>
                      <div className="font-bold text-[var(--text-primary)] text-xs">{item.topicName}</div>
                      <div className="text-[10px] text-[var(--text-secondary)]">
                        Square {item.squareId} &bull; Repetition #{item.repetitionCount} &bull; Interval {item.intervalDays}d
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onStartRevision(item.squareId);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[var(--color-indigo)] hover:bg-[var(--color-indigo-hover)] text-white font-bold text-xs flex items-center gap-1 cursor-pointer shadow-sm active:scale-95"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      Review Now
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Schedule */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[var(--color-cyan)]" />
              <span>Upcoming Reviews ({upcomingItems.length})</span>
            </h3>
            {upcomingItems.length === 0 ? (
              <p className="text-[var(--text-muted)] text-center py-2">No scheduled future reviews yet.</p>
            ) : (
              <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
                {upcomingItems.map(item => {
                  const daysLeft = Math.max(1, Math.ceil((item.nextDueDate - Date.now()) / (24 * 3600 * 1000)));
                  return (
                    <div 
                      key={item.id}
                      className="p-2.5 rounded-lg bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex items-center justify-between"
                    >
                      <span className="font-medium text-[var(--text-primary)]">{item.topicName}</span>
                      <span className="text-[10px] text-[var(--color-cyan)] font-mono">in {daysLeft} day(s)</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[var(--border-subtle)] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
