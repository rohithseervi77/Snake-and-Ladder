import React, { useState } from 'react';
import { HelpCircle, BarChart3, X } from 'lucide-react';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { SquareMetadata } from '../../types/curriculum';
import { ActivityRecord } from '../../types/game';

interface MobileDrawerProps {
  currentSquare: SquareMetadata;
  completedCount: number;
  totalAttempts: number;
  totalCorrect: number;
  accuracy: number;
  streak: number;
  recoveryStreak: number;
  laddersClimbed: number;
  snakesEncountered: number;
  totalScore: number;
  coinBalance: number;
  recentActivities: ActivityRecord[];
  onStartChallenge: (squareId: number) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  currentSquare,
  completedCount,
  totalAttempts,
  totalCorrect,
  accuracy,
  streak,
  recoveryStreak,
  laddersClimbed,
  snakesEncountered,
  totalScore,
  coinBalance,
  recentActivities,
  onStartChallenge
}) => {
  const [activeTab, setActiveTab] = useState<'none' | 'rules' | 'progress'>('none');

  if (activeTab === 'none') {
    return (
      <div className="fixed bottom-3 right-3 lg:hidden z-40 flex items-center gap-2">
        <button
          onClick={() => setActiveTab('rules')}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#111827] border border-[#263449] text-[#22D3EE] shadow-xl font-bold text-xs hover:bg-[#172033] cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 text-[#22D3EE]" />
          Rules & Legend
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#111827] border border-[#263449] text-[#10B981] shadow-xl font-bold text-xs hover:bg-[#172033] cursor-pointer"
        >
          <BarChart3 className="w-4 h-4 text-[#10B981]" />
          Challenge & Stats
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-[#080D1A]/80 backdrop-blur-sm">
      <div className="w-full max-h-[85vh] bg-[#111827] border-t border-[#263449] rounded-t-3xl p-4 overflow-y-auto flex flex-col text-[#F8FAFC]">
        <div className="flex items-center justify-between pb-3 border-b border-[#263449] mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'rules' ? 'bg-[#2563EB] text-[#F8FAFC]' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              How It Works & Legend
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'progress' ? 'bg-[#2563EB] text-[#F8FAFC]' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              Challenge & Stats
            </button>
          </div>
          <button 
            onClick={() => setActiveTab('none')}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] cursor-pointer"
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
              totalAttempts={totalAttempts}
              totalCorrect={totalCorrect}
              accuracy={accuracy}
              streak={streak}
              recoveryStreak={recoveryStreak}
              laddersClimbed={laddersClimbed}
              snakesEncountered={snakesEncountered}
              totalScore={totalScore}
              coinBalance={coinBalance}
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
