import React from 'react';
import { UserCheck } from 'lucide-react';

export const PlayerMarker: React.FC = () => {
  return (
    <div 
      className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center animate-pulse"
      aria-label="Player current location"
    >
      {/* Outer glow ring */}
      <div className="absolute w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500/25 blur-sm" />
      
      {/* Inner Avatar Token */}
      <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 border-2 border-white shadow-lg flex items-center justify-center text-slate-950 font-black">
        <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
      </div>
    </div>
  );
};
