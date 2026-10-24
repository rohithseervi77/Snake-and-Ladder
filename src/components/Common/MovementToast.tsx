import React from 'react';
import { 
  Zap, 
  AlertTriangle, 
  RotateCcw, 
  Crown, 
  Trophy, 
  TrendingUp, 
  X 
} from 'lucide-react';
import { MovementNotification } from '../../types/rewards';

interface MovementToastProps {
  notification: MovementNotification | null;
  onDismiss: () => void;
}

export const MovementToast: React.FC<MovementToastProps> = ({
  notification,
  onDismiss
}) => {
  if (!notification) return null;

  const getStyle = () => {
    switch (notification.type) {
      case 'bonus':
        return 'border-[var(--color-emerald)] shadow-[var(--color-emerald)]/20';
      case 'penalty':
        return 'border-[var(--color-rose)] shadow-[var(--color-rose)]/20';
      case 'recovery':
        return 'border-[var(--color-cyan)] shadow-[var(--color-cyan)]/20';
      case 'level_up':
        return 'border-[var(--color-violet)] shadow-[var(--color-violet)]/20';
      case 'achievement':
        return 'border-[var(--color-amber)] shadow-[var(--color-amber)]/20';
      case 'ladder':
        return 'border-[var(--color-amber)] shadow-[var(--color-amber)]/20';
      case 'snake':
        return 'border-[var(--color-rose)] shadow-[var(--color-rose)]/20';
      default:
        return 'border-[var(--color-indigo)] shadow-[var(--color-indigo)]/20';
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'bonus': return <TrendingUp className="w-5 h-5 text-[var(--color-emerald)]" />;
      case 'penalty': return <AlertTriangle className="w-5 h-5 text-[var(--color-rose)]" />;
      case 'recovery': return <RotateCcw className="w-5 h-5 text-[var(--color-cyan)] animate-spin" />;
      case 'level_up': return <Crown className="w-5 h-5 text-[var(--color-violet)]" />;
      case 'achievement': return <Trophy className="w-5 h-5 text-[var(--color-amber)]" />;
      case 'ladder': return <Zap className="w-5 h-5 text-[var(--color-amber)]" />;
      case 'snake': return <AlertTriangle className="w-5 h-5 text-[var(--color-rose)]" />;
      default: return <Zap className="w-5 h-5 text-[var(--color-indigo)]" />;
    }
  };

  return (
    <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 animate-bounce transition-all duration-300 pointer-events-auto">
      <div className={`px-4 py-2.5 rounded-2xl bg-[var(--modal-bg)] border-2 shadow-2xl flex items-center gap-3 backdrop-blur-md text-[var(--text-primary)] transition-colors duration-200 ${getStyle()}`}>
        <div className="p-1.5 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
          {getIcon()}
        </div>

        <div>
          <div className="text-xs sm:text-sm font-black tracking-wide leading-tight uppercase flex items-center gap-2">
            <span>{notification.title}</span>
            {notification.tilesDelta !== undefined && (
              <span className="px-1.5 py-0.5 rounded bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--color-indigo)] font-bold">
                {notification.tilesDelta > 0 ? `+${notification.tilesDelta}` : notification.tilesDelta} TILES
              </span>
            )}
          </div>
          <div className="text-[11px] text-[var(--text-secondary)] leading-tight mt-0.5">
            {notification.subtitle}
          </div>
        </div>

        <button 
          onClick={onDismiss}
          className="ml-2 p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
