import React from 'react';
import { 
  Sparkles, 
  X, 
  Calendar, 
  CheckCircle2, 
  Play, 
  ArrowUpRight 
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl max-h-[85vh] bg-[#0f172a] border border-emerald-700/50 rounded-2xl sm:rounded-3xl shadow-2xl p-5 flex flex-col text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#1e293b]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-white">Spaced Repetition Review</h2>
              <p className="text-xs text-slate-400">SM-2 algorithmic retention scheduler</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body list */}
        <div className="py-4 overflow-y-auto flex-1 flex flex-col gap-4 text-xs">
          {/* Due Now */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
              <span>Ready for Review ({dueItems.length})</span>
            </h3>
            {dueItems.length === 0 ? (
              <div className="p-3 rounded-xl bg-[#131d33] border border-[#1e2a44] text-slate-400 text-center">
                All reviewed! No topics currently due for revision.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {dueItems.map(item => (
                  <div 
                    key={item.id}
                    className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-700/40 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-white text-xs">{item.topicName}</div>
                      <div className="text-[10px] text-slate-400">
                        Square {item.squareId} &bull; Repetition #{item.repetitionCount} &bull; Interval {item.intervalDays}d
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onStartRevision(item.squareId);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Play className="w-3 h-3" />
                      Review Now
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Schedule */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Upcoming Reviews ({upcomingItems.length})</span>
            </h3>
            {upcomingItems.length === 0 ? (
              <p className="text-slate-500 text-center py-2">No scheduled future reviews yet.</p>
            ) : (
              <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
                {upcomingItems.map(item => {
                  const daysLeft = Math.max(1, Math.ceil((item.nextDueDate - Date.now()) / (24 * 3600 * 1000)));
                  return (
                    <div 
                      key={item.id}
                      className="p-2.5 rounded-lg bg-[#141e33] border border-[#202e4f] flex items-center justify-between"
                    >
                      <span className="font-medium text-slate-300">{item.topicName}</span>
                      <span className="text-[10px] text-blue-400 font-mono">in {daysLeft} day(s)</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#1e293b] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#1e293b] hover:bg-[#334155] text-xs font-semibold text-slate-300 transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
