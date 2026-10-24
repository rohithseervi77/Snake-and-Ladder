import React from 'react';
import { Settings, X, Volume2, Shield, Eye, Flame, Sun, Moon } from 'lucide-react';
import { GameSettings } from '../../types/game';
import { useTheme } from '../../context/ThemeContext';

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
  const { theme, setTheme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl sm:rounded-3xl shadow-2xl p-5 flex flex-col text-[var(--text-primary)] transition-colors duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[var(--color-indigo-light)] text-[var(--color-indigo)] border border-[var(--color-indigo-border)]">
              <Settings className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)]">Game Settings</h2>
              <p className="text-xs text-[var(--text-secondary)]">Audio, theme, animations and gameplay preferences</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings options */}
        <div className="py-4 flex flex-col gap-3.5 text-xs">
          {/* Theme Mode Toggle Option */}
          <div className="p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold">
                {theme === 'dark' ? <Moon className="w-4 h-4 text-[var(--color-indigo)]" /> : <Sun className="w-4 h-4 text-[var(--color-amber)]" />}
                <span>Interface Theme</span>
              </div>
              <span className="text-[11px] font-mono capitalize text-[var(--text-secondary)] font-bold">
                {theme} Mode
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                  theme === 'light'
                    ? 'bg-[var(--color-indigo)] text-white shadow-sm'
                    : 'bg-[var(--card-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Light Mode</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-[var(--color-indigo)] text-white shadow-sm'
                    : 'bg-[var(--card-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark Mode</span>
              </button>
            </div>
          </div>

          {/* Sound Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
            <div className="flex items-center gap-2.5">
              <Volume2 className="w-4 h-4 text-[var(--color-indigo)]" />
              <div>
                <div className="font-bold text-[var(--text-primary)]">Sound Effects</div>
                <div className="text-[11px] text-[var(--text-secondary)]">Audio synthesizer effects for rolls and leaps</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.soundEnabled}
              onChange={(e) => onUpdateSettings({ soundEnabled: e.target.checked })}
              className="w-4 h-4 accent-[var(--color-indigo)] rounded cursor-pointer"
            />
          </div>

          {/* Sound Volume Slider */}
          {settings.soundEnabled && (
            <div className="p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-secondary)] font-medium">Volume</span>
                <span className="font-mono text-[var(--color-indigo)]">{Math.round(settings.soundVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.soundVolume}
                onChange={(e) => onUpdateSettings({ soundVolume: parseFloat(e.target.value) })}
                className="w-full accent-[var(--color-indigo)] cursor-pointer"
              />
            </div>
          )}

          {/* Reduced Motion Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
            <div className="flex items-center gap-2.5">
              <Eye className="w-4 h-4 text-[var(--color-cyan)]" />
              <div>
                <div className="font-bold text-[var(--text-primary)]">Reduced Motion</div>
                <div className="text-[11px] text-[var(--text-secondary)]">Minimize animations for vestibular comfort</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.reducedMotion}
              onChange={(e) => onUpdateSettings({ reducedMotion: e.target.checked })}
              className="w-4 h-4 accent-[var(--color-indigo)] rounded cursor-pointer"
            />
          </div>

          {/* Auto Open Challenge */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-[var(--color-emerald)]" />
              <div>
                <div className="font-bold text-[var(--text-primary)]">Auto-Open Challenges</div>
                <div className="text-[11px] text-[var(--text-secondary)]">Prompt challenge immediately upon landing</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.autoOpenChallenge}
              onChange={(e) => onUpdateSettings({ autoOpenChallenge: e.target.checked })}
              className="w-4 h-4 accent-[var(--color-emerald)] rounded cursor-pointer"
            />
          </div>

          {/* Difficulty Selection */}
          <div className="p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold">
              <Flame className="w-4 h-4 text-[var(--color-amber)]" />
              <span>Challenge Difficulty</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {(['beginner', 'intermediate', 'interview_ready'] as const).map(diff => (
                <button
                  key={diff}
                  onClick={() => onUpdateSettings({ difficulty: diff })}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-bold capitalize transition cursor-pointer ${
                    settings.difficulty === diff 
                      ? 'bg-[var(--color-indigo)] text-white shadow-md' 
                      : 'bg-[var(--card-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {diff.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[var(--border-subtle)] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[var(--color-indigo)] hover:bg-[var(--color-indigo-hover)] font-bold text-white text-xs transition cursor-pointer active:scale-95 shadow-sm"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};
