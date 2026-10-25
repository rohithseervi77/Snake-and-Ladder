import React from 'react';
import { X, BookOpen, CheckCircle2, Award } from 'lucide-react';
import { CURRICULUM_TOPICS, STAGES } from '../../data/curriculum100';
import { CourseOutcome } from '../../types/curriculum';

interface SyllabusModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedSquares: number[];
  onSelectRange?: (range: [number, number]) => void;
}

export const SyllabusModal: React.FC<SyllabusModalProps> = ({
  isOpen,
  onClose,
  completedSquares,
  onSelectRange
}) => {
  if (!isOpen) return null;

  const completedSet = new Set(completedSquares);

  const CO_MAP: Record<CourseOutcome, { title: string; color: string }> = {
    CO1: { title: 'CO1 — Mathematical Foundations & Analysis', color: '#10B981' },
    CO2: { title: 'CO2 — Stacks, Queues & Linked Lists', color: '#06B6D4' },
    CO3: { title: 'CO3 — Sorting, Searching & Hashing', color: '#6366F1' },
    CO4: { title: 'CO4 — Trees, Graphs & Algorithm Design', color: '#8B5CF6' }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl p-5 flex flex-col gap-4 text-[var(--text-primary)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#6366F1]/20 border border-[#6366F1]/40 flex items-center justify-center text-[#6366F1]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#6366F1]">Academic Curriculum</span>
              <h3 className="text-base font-black">DSA Syllabus & Progress Tracker</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--card-secondary-bg)] text-[var(--text-secondary)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Topics List */}
        <div className="overflow-y-auto pr-1 flex flex-col gap-3 flex-1 text-xs">
          {(['CO1', 'CO2', 'CO3', 'CO4'] as CourseOutcome[]).map((coKey) => {
            const coInfo = CO_MAP[coKey];
            const topics = CURRICULUM_TOPICS.filter(t => t.co === coKey);

            return (
              <div key={coKey} className="p-3.5 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[var(--text-primary)]" style={{ color: coInfo.color }}>
                    {coInfo.title}
                  </h4>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--border-subtle)]">
                    {coKey}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {topics.map((t) => {
                    const [start, end] = t.boardRange;
                    let completedCount = 0;
                    for (let s = start; s <= end; s++) {
                      if (completedSet.has(s)) completedCount++;
                    }
                    const totalTiles = end - start + 1;
                    const pct = Math.round((completedCount / totalTiles) * 100);

                    return (
                      <div key={t.id} className="p-2.5 rounded-lg bg-[var(--card-bg)] border border-[var(--border-subtle)] flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span>{t.title}</span>
                          <span className="font-mono text-[11px] text-[var(--text-secondary)]">
                            Tiles {start}–{end} • {pct}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-[var(--card-secondary-bg)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{ width: `${pct}%`, backgroundColor: coInfo.color }}
                          />
                        </div>

                        {/* Subtopics pill list */}
                        <div className="flex flex-wrap gap-1 mt-1">
                          {t.subtopics.map((sub, i) => (
                            <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[var(--card-secondary-bg)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
          <span>Syllabus mapped strictly to VIT university curriculum.</span>
          <button
            onClick={onClose}
            className="py-1.5 px-4 rounded-lg bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-bold text-xs cursor-pointer hover:bg-[var(--card-bg)]"
          >
            Close Syllabus
          </button>
        </div>
      </div>
    </div>
  );
};
