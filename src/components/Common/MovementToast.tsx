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
        return 'bg-gradient-to-r from-emerald-900/90 to-teal-900/90 border-emerald-500 text-emerald-100 shadow-emerald-500/30';
      case 'penalty':
        return 'bg-gradient-to-r from-rose-950/90 to-red-950/90 border-rose-500 text-rose-100 shadow-rose-500/30';
      case 'recovery':
        return 'bg-gradient-to-r from-cyan-950/90 to-blue-950/90 border-cyan-400 text-cyan-100 shadow-cyan-500/30';
      case 'level_up':
        return 'bg-gradient-to-r from-indigo-950/90 to-purple-950/90 border-purple-400 text-purple-100 shadow-purple-500/30';
      case 'achievement':
        return 'bg-gradient-to-r from-amber-950/90 to-yellow-950/90 border-yellow-400 text-yellow-100 shadow-yellow-500/30';
      case 'ladder':
        return 'bg-gradient-to-r from-amber-950/90 to-orange-950/90 border-amber-500 text-amber-100 shadow-amber-500/30';
      case 'snake':
        return 'bg-gradient-to-r from-rose-950/90 to-red-950/90 border-red-500 text-red-100 shadow-red-500/30';
      default:
        return 'bg-[#141e35] border-blue-500 text-blue-100 shadow-blue-500/30';
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'bonus': return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'penalty': return <AlertTriangle className="w-5 h-5 text-rose-400" />;
      case 'recovery': return <RotateCcw className="w-5 h-5 text-cyan-400 animate-spin" />;
      case 'level_up': return <Crown className="w-5 h-5 text-purple-400" />;
      case 'achievement': return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 'ladder': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'snake': return <AlertTriangle className="w-5 h-5 text-rose-400" />;
      default: return <Zap className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 animate-bounce transition-all duration-300 pointer-events-auto">
      <div className={`px-4 py-2.5 rounded-2xl border-2 shadow-2xl flex items-center gap-3 backdrop-blur-md ${getStyle()}`}>
        <div className="p-1 rounded-xl bg-black/30">
          {getIcon()}
        </div>

        <div>
          <div className="text-xs sm:text-sm font-black tracking-wide leading-tight uppercase flex items-center gap-2">
            <span>{notification.title}</span>
            {notification.tilesDelta !== undefined && (
              <span className="px-1.5 py-0.2 rounded bg-black/40 font-mono text-xs">
                {notification.tilesDelta > 0 ? `+${notification.tilesDelta}` : notification.tilesDelta} TILES
              </span>
            )}
          </div>
          <div className="text-[11px] opacity-90 leading-tight mt-0.5">
            {notification.subtitle}
          </div>
        </div>

        <button 
          onClick={onDismiss}
          className="ml-2 p-1 text-slate-300 hover:text-white cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
