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
        return 'from-blue-600 to-indigo-500 border-cyan-300';
      case 'marker-terminal-bot':
        return 'from-purple-600 to-fuchsia-500 border-pink-300';
      case 'marker-grandmaster-crown':
        return 'from-amber-400 to-yellow-300 border-white';
      case 'marker-ninja-coder':
      default:
        return 'from-emerald-500 to-teal-400 border-white';
    }
  };

  return (
    <div 
      className="relative flex items-center justify-center filter drop-shadow-lg"
      aria-label="Player Avatar Location"
    >
      {/* Outer pulsating beacon */}
      <div className="absolute w-10 h-10 rounded-full bg-cyan-400/40 animate-ping" />
      
      {/* Inner Avatar Token */}
      <div className={`relative w-8 h-8 rounded-full bg-gradient-to-tr ${getMarkerBg()} border-2 shadow-2xl flex items-center justify-center font-black ring-2 ring-cyan-400/80`}>
        {getMarkerIcon()}
      </div>
    </div>
  );
};
