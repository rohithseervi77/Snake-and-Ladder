import React from 'react';
import { UserCheck, Navigation, Bot, Crown } from 'lucide-react';

interface PlayerMarkerProps {
  equippedMarker?: string;
}

export const PlayerMarker: React.FC<PlayerMarkerProps> = ({ equippedMarker = 'marker-ninja-coder' }) => {
  const getMarkerIcon = () => {
    switch (equippedMarker) {
      case 'marker-cyber-glider':
        return <Navigation className="w-4 h-4 text-white" />;
      case 'marker-terminal-bot':
        return <Bot className="w-4 h-4 text-white" />;
      case 'marker-grandmaster-crown':
        return <Crown className="w-4 h-4 text-slate-950" />;
      case 'marker-ninja-coder':
      default:
        return <UserCheck className="w-4 h-4 text-slate-950" />;
    }
  };

  const getMarkerBg = () => {
    switch (equippedMarker) {
      case 'marker-cyber-glider':
        return 'from-[#2563EB] to-[#22D3EE] border-[#22D3EE]';
      case 'marker-terminal-bot':
        return 'from-[#8B5CF6] to-[#2563EB] border-[#8B5CF6]';
      case 'marker-grandmaster-crown':
        return 'from-[#F59E0B] to-[#FCD34D] border-[#F59E0B]';
      case 'marker-ninja-coder':
      default:
        return 'from-[#2563EB] to-[#22D3EE] border-[#22D3EE]';
    }
  };

  return (
    <div 
      className="relative flex items-center justify-center filter drop-shadow-lg"
      aria-label="Player Avatar Location: YOU ARE HERE"
    >
      {/* Outer pulsating beacon */}
      <div className="absolute w-9 h-9 rounded-full bg-[#22D3EE]/30 animate-ping pointer-events-none" />
      
      {/* Inner Avatar Token */}
      <div className={`relative w-8 h-8 rounded-full bg-gradient-to-tr ${getMarkerBg()} border-2 shadow-2xl flex items-center justify-center font-black ring-2 ring-[#2563EB]`}>
        {getMarkerIcon()}
      </div>
    </div>
  );
};
