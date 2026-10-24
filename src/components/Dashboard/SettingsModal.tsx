import React from 'react';
import { Settings, X, Volume2, Shield, Eye, Flame } from 'lucide-react';
import { GameSettings } from '../../types/game';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080D1A]/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#111827] border border-[#263449] rounded-2xl sm:rounded-3xl shadow-2xl p-5 flex flex-col text-[#F8FAFC]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#263449]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#2563EB]/20 text-[#22D3EE] border border-[#2563EB]/40">
              <Settings className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-[#F8FAFC]">Game Settings</h2>
              <p className="text-xs text-[#94A3B8]">Audio, animations and gameplay preferences</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#F8FAFC] cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings options */}
        <div className="py-4 flex flex-col gap-4 text-xs">
          {/* Sound Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#172033] border border-[#263449]">
            <div className="flex items-center gap-2.5">
              <Volume2 className="w-4 h-4 text-[#22D3EE]" />
              <div>
                <div className="font-bold text-[#F8FAFC]">Sound Effects</div>
                <div className="text-[11px] text-[#94A3B8]">Audio synthesizer effects for rolls and leaps</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.soundEnabled}
              onChange={(e) => onUpdateSettings({ soundEnabled: e.target.checked })}
              className="w-4 h-4 accent-[#2563EB] rounded cursor-pointer"
            />
          </div>

          {/* Sound Volume Slider */}
          {settings.soundEnabled && (
            <div className="p-3 rounded-xl bg-[#172033] border border-[#263449] flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#94A3B8] font-medium">Volume</span>
                <span className="font-mono text-[#22D3EE]">{Math.round(settings.soundVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.soundVolume}
                onChange={(e) => onUpdateSettings({ soundVolume: parseFloat(e.target.value) })}
                className="w-full accent-[#2563EB] cursor-pointer"
              />
            </div>
          )}

          {/* Reduced Motion Toggle (Section 17/18) */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#172033] border border-[#263449]">
            <div className="flex items-center gap-2.5">
              <Eye className="w-4 h-4 text-[#22D3EE]" />
              <div>
                <div className="font-bold text-[#F8FAFC]">Reduced Motion</div>
                <div className="text-[11px] text-[#94A3B8]">Minimize animations for vestibular comfort</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.reducedMotion}
              onChange={(e) => onUpdateSettings({ reducedMotion: e.target.checked })}
              className="w-4 h-4 accent-[#2563EB] rounded cursor-pointer"
            />
          </div>

          {/* Auto Open Challenge */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#172033] border border-[#263449]">
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-[#10B981]" />
              <div>
                <div className="font-bold text-[#F8FAFC]">Auto-Open Challenges</div>
                <div className="text-[11px] text-[#94A3B8]">Prompt challenge immediately upon landing</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.autoOpenChallenge}
              onChange={(e) => onUpdateSettings({ autoOpenChallenge: e.target.checked })}
              className="w-4 h-4 accent-[#10B981] rounded cursor-pointer"
            />
          </div>

          {/* Difficulty Selection */}
          <div className="p-3 rounded-xl bg-[#172033] border border-[#263449] flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#F8FAFC] font-semibold">
              <Flame className="w-4 h-4 text-[#F59E0B]" />
              <span>Challenge Difficulty</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {(['beginner', 'intermediate', 'interview_ready'] as const).map(diff => (
                <button
                  key={diff}
                  onClick={() => onUpdateSettings({ difficulty: diff })}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-bold capitalize transition cursor-pointer ${
                    settings.difficulty === diff 
                      ? 'bg-[#2563EB] text-[#F8FAFC] shadow-md' 
                      : 'bg-[#080D1A] border border-[#263449] text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  {diff.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#263449] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] font-bold text-[#F8FAFC] text-xs transition cursor-pointer"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};
