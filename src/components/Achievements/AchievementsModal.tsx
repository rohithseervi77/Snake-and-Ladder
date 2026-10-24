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
      case 'Footprints': return <Footprints className="w-5 h-5 text-blue-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-emerald-400" />;
      case 'Bug': return <Bug className="w-5 h-5 text-rose-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Clock': return <Clock className="w-5 h-5 text-indigo-400" />;
      case 'RotateCcw': return <RotateCcw className="w-5 h-5 text-teal-400" />;
      case 'Network': return <Network className="w-5 h-5 text-purple-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-pink-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-orange-400" />;
      case 'Crown': return <Crown className="w-5 h-5 text-yellow-400" />;
      default: return <Trophy className="w-5 h-5 text-yellow-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080D1A]/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[88vh] bg-[#111827] border border-[#263449] rounded-2xl sm:rounded-3xl shadow-2xl p-5 flex flex-col text-[#F8FAFC]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#263449]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40">
              <Trophy className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#F8FAFC]">DSA Achievements</h2>
              <p className="text-xs text-[#94A3B8]">Milestones, streaks and masteries ({unlockedCount} / {achievements.length} Unlocked)</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Total Progress Bar */}
        <div className="my-3 p-3 rounded-xl bg-[#172033] border border-[#263449]">
          <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
            <span className="text-[#94A3B8]">Completion Progress</span>
            <span className="text-[#F59E0B] font-mono">{Math.round((unlockedCount / achievements.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-[#080D1A] rounded-full overflow-hidden border border-[#263449]">
            <div 
              className="h-full bg-[#F59E0B] rounded-full transition-all duration-300"
              style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Achievements List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 overflow-y-auto flex-1 py-1">
          {achievements.map(ach => (
            <div
              key={ach.id}
              className={`p-3 rounded-2xl border flex items-start gap-3 transition ${
                ach.unlocked
                  ? 'bg-[#172033] border-[#F59E0B]/40 shadow-sm'
                  : 'bg-[#111827] border-[#263449] opacity-75'
              }`}
            >
              <div className={`p-2.5 rounded-xl flex items-center justify-center border flex-shrink-0 ${
                ach.unlocked 
                  ? 'bg-[#F59E0B]/20 border-[#F59E0B]/40' 
                  : 'bg-[#080D1A] border-[#263449]'
              }`}>
                {ach.unlocked ? getAchievementIcon(ach.icon) : <Lock className="w-5 h-5 text-[#64748B]" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className={`font-bold text-xs truncate ${ach.unlocked ? 'text-[#F59E0B]' : 'text-[#F8FAFC]'}`}>
                    {ach.name}
                  </h4>
                  {ach.unlocked && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-[#94A3B8] mt-0.5 leading-snug">
                  {ach.description}
                </p>

                {/* Progress Mini Bar */}
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-[#080D1A] rounded-full overflow-hidden border border-[#263449]">
                    <div 
                      className={`h-full rounded-full ${ach.unlocked ? 'bg-[#10B981]' : 'bg-[#2563EB]'}`}
                      style={{ width: `${Math.min(100, (ach.progress / ach.maxProgress) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-[#94A3B8]">
                    {ach.progress}/{ach.maxProgress}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#263449] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#172033] hover:bg-[#263449] border border-[#263449] text-xs font-semibold text-[#94A3B8] hover:text-[#F8FAFC] transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
