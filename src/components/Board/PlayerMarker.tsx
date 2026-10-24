import React from 'react';
import { UserCheck, Navigation, Bot, Crown } from 'lucide-react';

interface PlayerMarkerProps {
  equippedMarker?: string;
}

export const PlayerMarker: React.FC<PlayerMarkerProps> = ({ equippedMarker = 'marker-ninja-coder' }) => {
  const getMarkerIcon = () => {
    switch (equippedMarker) {
      case 'marker-cyber-glider':
        return <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />;
      case 'marker-terminal-bot':
        return <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />;
      case 'marker-grandmaster-crown':
        return <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />;
      case 'marker-ninja-coder':
      default:
        return <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />;
    }
  };

  const getMarkerBg = () => {
    switch (equippedMarker) {
      case 'marker-cyber-glider':
        return 'from-blue-600 to-indigo-500 border-cyan-300';
      case 'marker-terminal-bot':
        return 'from-purple-600 to-fuchsia-500 border-pink-300';
      case 'marker-grandmaster-crown':
        return 'from-amber-400 to-yellow-300 border-white';
      case 'marker-ninja-coder':
      default:
        return 'from-emerald-600 to-teal-400 border-white';
    }
  };

  return (
    <div 
      className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center animate-pulse"
      aria-label="Player current location"
    >
      {/* Outer glow ring */}
      <div className="absolute w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500/25 blur-sm" />
      
      {/* Inner Avatar Token */}
      <div className={`relative w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr ${getMarkerBg()} border-2 shadow-lg flex items-center justify-center font-black`}>
        {getMarkerIcon()}
      </div>
    </div>
  );
};
