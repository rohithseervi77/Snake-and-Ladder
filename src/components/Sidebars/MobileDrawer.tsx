import React, { useState } from 'react';
import { HelpCircle, BarChart3, Layers, X } from 'lucide-react';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { SquareMetadata } from '../../types/curriculum';
import { ActivityRecord } from '../../types/game';

interface MobileDrawerProps {
  currentSquare: SquareMetadata;
  completedCount: number;
  laddersClimbed: number;
  snakesEncountered: number;
  totalScore: number;
  recentActivities: ActivityRecord[];
  onStartChallenge: (squareId: number) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  currentSquare,
  completedCount,
  laddersClimbed,
  snakesEncountered,
  totalScore,
  recentActivities,
  onStartChallenge
}) => {
  const [activeTab, setActiveTab] = useState<'none' | 'rules' | 'progress'>('none');

  if (activeTab === 'none') {
    return (
      <div className="fixed bottom-3 right-3 lg:hidden z-40 flex items-center gap-2">
        <button
          onClick={() => setActiveTab('rules')}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#141e35] border border-blue-500/40 text-blue-300 shadow-xl font-bold text-xs cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" />
          Rules & Legend
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#141e35] border border-emerald-500/40 text-emerald-300 shadow-xl font-bold text-xs cursor-pointer"
        >
          <BarChart3 className="w-4 h-4" />
          Current & Stats
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/70 backdrop-blur-sm">
      <div className="w-full max-h-[85vh] bg-[#0c1427] border-t border-[#233554] rounded-t-3xl p-4 overflow-y-auto flex flex-col text-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'rules' ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              How It Works & Legend
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'progress' ? 'bg-emerald-600 text-white' : 'text-slate-400'
              }`}
            >
              Challenge & Progress
            </button>
          </div>
          <button 
            onClick={() => setActiveTab('none')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pb-4">
          {activeTab === 'rules' ? (
            <LeftSidebar />
          ) : (
            <RightSidebar
              currentSquare={currentSquare}
              completedCount={completedCount}
              laddersClimbed={laddersClimbed}
              snakesEncountered={snakesEncountered}
              totalScore={totalScore}
              recentActivities={recentActivities}
              onStartChallenge={(sq) => {
                setActiveTab('none');
                onStartChallenge(sq);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
