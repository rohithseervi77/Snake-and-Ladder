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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#0f172a] border border-[#233554] rounded-2xl sm:rounded-3xl shadow-2xl p-5 flex flex-col text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#1e293b]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Settings className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-white">Game Settings</h2>
              <p className="text-xs text-slate-400">Audio, animations and gameplay preferences</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings options */}
        <div className="py-4 flex flex-col gap-4 text-xs">
          {/* Sound Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#141e33] border border-[#202e4f]">
            <div className="flex items-center gap-2.5">
              <Volume2 className="w-4 h-4 text-blue-400" />
              <div>
                <div className="font-bold text-white">Sound Effects</div>
                <div className="text-[11px] text-slate-400">Audio synthesizer effects for rolls and leaps</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.soundEnabled}
              onChange={(e) => onUpdateSettings({ soundEnabled: e.target.checked })}
              className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
            />
          </div>

          {/* Sound Volume Slider */}
          {settings.soundEnabled && (
            <div className="p-3 rounded-xl bg-[#141e33] border border-[#202e4f] flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Volume</span>
                <span className="font-mono text-blue-400">{Math.round(settings.soundVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.soundVolume}
                onChange={(e) => onUpdateSettings({ soundVolume: parseFloat(e.target.value) })}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>
          )}

          {/* Reduced Motion Toggle (Section 17/18) */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#141e33] border border-[#202e4f]">
            <div className="flex items-center gap-2.5">
              <Eye className="w-4 h-4 text-indigo-400" />
              <div>
                <div className="font-bold text-white">Reduced Motion</div>
                <div className="text-[11px] text-slate-400">Minimize animations for vestibular comfort</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.reducedMotion}
              onChange={(e) => onUpdateSettings({ reducedMotion: e.target.checked })}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
          </div>

          {/* Auto Open Challenge */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#141e33] border border-[#202e4f]">
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="font-bold text-white">Auto-Open Challenges</div>
                <div className="text-[11px] text-slate-400">Prompt challenge immediately upon landing</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.autoOpenChallenge}
              onChange={(e) => onUpdateSettings({ autoOpenChallenge: e.target.checked })}
              className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
            />
          </div>

          {/* Difficulty Selection */}
          <div className="p-3 rounded-xl bg-[#141e33] border border-[#202e4f] flex flex-col gap-2">
            <div className="flex items-center gap-2 text-slate-300 font-semibold">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Challenge Difficulty</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {(['beginner', 'intermediate', 'interview_ready'] as const).map(diff => (
                <button
                  key={diff}
                  onClick={() => onUpdateSettings({ difficulty: diff })}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-bold capitalize transition cursor-pointer ${
                    settings.difficulty === diff 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-[#1a2642] text-slate-400 hover:text-white'
                  }`}
                >
                  {diff.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#1e293b] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-white text-xs transition cursor-pointer"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};
