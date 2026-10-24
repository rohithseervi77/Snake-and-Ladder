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
        return 'border-[#10B981] shadow-[#10B981]/20';
      case 'penalty':
        return 'border-[#F43F5E] shadow-[#F43F5E]/20';
      case 'recovery':
        return 'border-[#22D3EE] shadow-[#22D3EE]/20';
      case 'level_up':
        return 'border-[#8B5CF6] shadow-[#8B5CF6]/20';
      case 'achievement':
        return 'border-[#F59E0B] shadow-[#F59E0B]/20';
      case 'ladder':
        return 'border-[#F59E0B] shadow-[#F59E0B]/20';
      case 'snake':
        return 'border-[#F43F5E] shadow-[#F43F5E]/20';
      default:
        return 'border-[#2563EB] shadow-[#2563EB]/20';
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'bonus': return <TrendingUp className="w-5 h-5 text-[#10B981]" />;
      case 'penalty': return <AlertTriangle className="w-5 h-5 text-[#F43F5E]" />;
      case 'recovery': return <RotateCcw className="w-5 h-5 text-[#22D3EE] animate-spin" />;
      case 'level_up': return <Crown className="w-5 h-5 text-[#8B5CF6]" />;
      case 'achievement': return <Trophy className="w-5 h-5 text-[#F59E0B]" />;
      case 'ladder': return <Zap className="w-5 h-5 text-[#F59E0B]" />;
      case 'snake': return <AlertTriangle className="w-5 h-5 text-[#F43F5E]" />;
      default: return <Zap className="w-5 h-5 text-[#2563EB]" />;
    }
  };

  return (
    <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 animate-bounce transition-all duration-300 pointer-events-auto">
      <div className={`px-4 py-2.5 rounded-2xl bg-[#111827] border-2 shadow-2xl flex items-center gap-3 backdrop-blur-md text-[#F8FAFC] ${getStyle()}`}>
        <div className="p-1.5 rounded-xl bg-[#080D1A] border border-[#263449]">
          {getIcon()}
        </div>

        <div>
          <div className="text-xs sm:text-sm font-black tracking-wide leading-tight uppercase flex items-center gap-2">
            <span>{notification.title}</span>
            {notification.tilesDelta !== undefined && (
              <span className="px-1.5 py-0.5 rounded bg-[#080D1A] border border-[#263449] font-mono text-xs text-[#22D3EE]">
                {notification.tilesDelta > 0 ? `+${notification.tilesDelta}` : notification.tilesDelta} TILES
              </span>
            )}
          </div>
          <div className="text-[11px] text-[#94A3B8] leading-tight mt-0.5">
            {notification.subtitle}
          </div>
        </div>

        <button 
          onClick={onDismiss}
          className="ml-2 p-1 text-[#94A3B8] hover:text-[#F8FAFC] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
