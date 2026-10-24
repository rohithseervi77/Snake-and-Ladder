import React from 'react';
import { 
  Trophy, 
  X, 
  CheckCircle2, 
  Lock, 
  Flame, 
  Zap, 
  Bug, 
  Layers, 
  Clock, 
  RotateCcw, 
  Network, 
  TrendingUp, 
  Crown,
  Footprints
} from 'lucide-react';
import { Achievement } from '../../types/rewards';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  achievements
}) => {
  if (!isOpen) return null;

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'Footprints': return <Footprints className="w-5 h-5 text-[var(--color-indigo)]" />;
      case 'Layers': return <Layers className="w-5 h-5 text-[var(--color-emerald)]" />;
      case 'Bug': return <Bug className="w-5 h-5 text-[var(--color-rose)]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[var(--color-amber)]" />;
      case 'Clock': return <Clock className="w-5 h-5 text-[var(--color-indigo)]" />;
      case 'RotateCcw': return <RotateCcw className="w-5 h-5 text-[var(--color-teal)]" />;
      case 'Network': return <Network className="w-5 h-5 text-[var(--color-violet)]" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-[var(--color-pink)]" />;
      case 'Flame': return <Flame className="w-5 h-5 text-[var(--color-orange)]" />;
      case 'Crown': return <Crown className="w-5 h-5 text-[var(--color-amber)]" />;
      default: return <Trophy className="w-5 h-5 text-[var(--color-amber)]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[88vh] bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl sm:rounded-3xl shadow-2xl p-5 flex flex-col text-[var(--text-primary)] transition-colors duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[var(--color-amber-light)] text-[var(--color-amber)] border border-[var(--color-amber-border)]">
              <Trophy className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">DSA Achievements</h2>
              <p className="text-xs text-[var(--text-secondary)]">Milestones, streaks and masteries ({unlockedCount} / {achievements.length} Unlocked)</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Total Progress Bar */}
        <div className="my-3 p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
          <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
            <span className="text-[var(--text-secondary)]">Completion Progress</span>
            <span className="text-[var(--color-amber)] font-mono">{Math.round((unlockedCount / achievements.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-[var(--card-bg)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
            <div 
              className="h-full bg-[var(--color-amber)] rounded-full transition-all duration-300"
              style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Achievements List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 overflow-y-auto flex-1 py-1">
          {achievements.map(ach => (
            <div
              key={ach.id}
              className={`p-3 rounded-2xl border flex items-start gap-3 transition shadow-sm ${
                ach.unlocked
                  ? 'bg-[var(--card-secondary-bg)] border-[var(--color-amber-border)]'
                  : 'bg-[var(--card-bg)] border-[var(--border-subtle)] opacity-75'
              }`}
            >
              <div className={`p-2.5 rounded-xl flex items-center justify-center border flex-shrink-0 ${
                ach.unlocked 
                  ? 'bg-[var(--color-amber-light)] border-[var(--color-amber-border)]' 
                  : 'bg-[var(--card-secondary-bg)] border-[var(--border-subtle)]'
              }`}>
                {ach.unlocked ? getAchievementIcon(ach.icon) : <Lock className="w-5 h-5 text-[var(--text-muted)]" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className={`font-bold text-xs truncate ${ach.unlocked ? 'text-[var(--color-amber)]' : 'text-[var(--text-primary)]'}`}>
                    {ach.name}
                  </h4>
                  {ach.unlocked && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-emerald)] flex-shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-snug">
                  {ach.description}
                </p>

                {/* Progress Mini Bar */}
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-[var(--card-bg)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
                    <div 
                      className={`h-full rounded-full ${ach.unlocked ? 'bg-[var(--color-emerald)]' : 'bg-[var(--color-indigo)]'}`}
                      style={{ width: `${Math.min(100, (ach.progress / ach.maxProgress) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-secondary)]">
                    {ach.progress}/{ach.maxProgress}
                  </span>
                </div>
              </div>
            </div>
          ))}
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
