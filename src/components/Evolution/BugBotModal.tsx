import React, { useState } from 'react';
import { 
  Bot, 
  Bug, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Zap, 
  Trophy, 
  X,
  Swords,
  Play,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { BugBotScenario } from '../../types/evolution';

interface BugBotModalProps {
  isOpen: boolean;
  scenario: BugBotScenario | null;
  onVictory: (xp: number, coins: number, energy: number) => void;
  onClose: () => void;
}

interface AlgorithmOption {
  name: string;
  complexity: string;
  opsFor5k: number;
  timeMs: number;
  isSuperior: boolean;
  takeaway: string;
}

const PLAYER_ALGORITHMS: AlgorithmOption[] = [
  {
    name: 'Merge Sort (Divide & Conquer)',
    complexity: 'O(N log N)',
    opsFor5k: 61500,
    timeMs: 2,
    isSuperior: true,
    takeaway: 'Guaranteed O(N log N) divide-and-conquer splits array into halves, requiring only 61,500 operations for 5,000 items.'
  },
  {
    name: 'Quick Sort with Median-of-Three',
    complexity: 'O(N log N)',
    opsFor5k: 58000,
    timeMs: 1.5,
    isSuperior: true,
    takeaway: 'In-place partitioning with cache locality runs blazing fast in ~58,000 operations.'
  },
  {
    name: 'Selection Sort (Quadratic)',
    complexity: 'O(N²)',
    opsFor5k: 12500000,
    timeMs: 180,
    isSuperior: false,
    takeaway: 'Suffers 12.5 million operations because it repeatedly scans the entire remaining unsorted array.'
  }
];

export const BugBotModal: React.FC<BugBotModalProps> = ({
  isOpen,
  scenario,
  onVictory,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'duel' | 'repair'>('duel');

  // Duel State
  const [chosenAlgo, setChosenAlgo] = useState<AlgorithmOption>(PLAYER_ALGORITHMS[0]);
  const [isDuelSimulating, setIsDuelSimulating] = useState(false);
  const [duelFinished, setDuelFinished] = useState(false);
  const [simulatedPlayerOps, setSimulatedPlayerOps] = useState(0);
  const [simulatedRivalOps, setSimulatedRivalOps] = useState(0);

  // Bug Repair State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!isOpen || !scenario) return null;

  // Run Live Algorithm Duel Simulation
  const handleStartDuel = () => {
    setIsDuelSimulating(true);
    setDuelFinished(false);
    setSimulatedPlayerOps(0);
    setSimulatedRivalOps(0);

    const rivalTargetOps = 12500000;
    const playerTargetOps = chosenAlgo.opsFor5k;

    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.1;
      setSimulatedPlayerOps(Math.min(playerTargetOps, Math.round(playerTargetOps * progress * 2)));
      setSimulatedRivalOps(Math.min(rivalTargetOps, Math.round(rivalTargetOps * progress * 0.4)));

      if (progress >= 1.0) {
        clearInterval(interval);
        setSimulatedPlayerOps(playerTargetOps);
        setSimulatedRivalOps(rivalTargetOps);
        setIsDuelSimulating(false);
        setDuelFinished(true);
      }
    }, 60);
  };

  const handleSelectOption = (idx: number) => {
    if (hasSubmitted && isCorrect) return;
    setSelectedOption(idx);
    setHasSubmitted(false);
  };

  const handleVerify = () => {
    if (selectedOption === null) return;
    const correct = scenario.options[selectedOption].isCorrect;
    setIsCorrect(correct);
    setHasSubmitted(true);
  };

  const handleClaim = () => {
    onVictory(scenario.rewardXp, scenario.rewardCoins, scenario.rewardEnergy);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#080D1A]/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#111827] border border-[#263449] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-[#F8FAFC] flex flex-col max-h-[92vh]">
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#263449] bg-[#0B1220]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#2563EB]/20 border border-[#2563EB]/40 flex items-center justify-center text-[#22D3EE] shrink-0">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#22D3EE] font-mono flex items-center gap-1">
                  <Swords className="w-3.5 h-3.5" /> Virtual Rival Arena
                </span>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#080D1A] border border-[#263449] text-[#94A3B8] font-mono">
                  {scenario.topic}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-[#F8FAFC] leading-tight">
                Rival BugBot Challenge Arena
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#94A3B8] hover:text-[#F8FAFC] rounded-lg hover:bg-[#172033] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-5 py-2 bg-[#0B1220] border-b border-[#263449] text-xs">
          <button
            onClick={() => setActiveTab('duel')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'duel'
                ? 'bg-[#2563EB] text-[#F8FAFC] shadow-sm'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            <span>Head-to-Head Algorithm Duel</span>
          </button>
          <button
            onClick={() => setActiveTab('repair')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'repair'
                ? 'bg-[#2563EB] text-[#F8FAFC] shadow-sm'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <Bug className="w-3.5 h-3.5" />
            <span>Code Repair Challenge</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4 text-xs sm:text-sm">
          {activeTab === 'duel' ? (
            /* TAB 1: ALGORITHM DUEL */
            <div className="flex flex-col gap-4">
              {/* Rival Taunt */}
              <div className="p-3.5 rounded-xl bg-[#172033] border border-[#263449] flex items-start gap-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <span className="text-xs font-bold text-[#22D3EE]">Rival BugBot Algorithm Lock:</span>
                  <p className="text-xs text-[#94A3B8] mt-0.5 leading-relaxed">
                    "I am locking in <strong>Bubble Sort (O(N²))</strong> on a dataset of <strong>5,000 random integers</strong>! Think your algorithm can execute faster without crashing?"
                  </p>
                </div>
              </div>

              {/* Player Weapon Selection */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-mono font-bold text-[#94A3B8] uppercase tracking-wider">
                  Select Your Algorithm for the Duel:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {PLAYER_ALGORITHMS.map((algo) => (
                    <button
                      key={algo.name}
                      disabled={isDuelSimulating}
                      onClick={() => {
                        setChosenAlgo(algo);
                        setDuelFinished(false);
                      }}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition cursor-pointer disabled:cursor-not-allowed ${
                        chosenAlgo.name === algo.name
                          ? 'bg-[#2563EB]/20 border-2 border-[#2563EB] text-[#F8FAFC] shadow-md'
                          : 'bg-[#172033] border-[#263449] text-[#94A3B8] hover:border-[#22D3EE]'
                      }`}
                    >
                      <div>
                        <span className="font-mono text-[10px] text-[#22D3EE] font-bold block">{algo.complexity}</span>
                        <h4 className="font-bold text-xs text-[#F8FAFC] leading-tight mt-1">{algo.name}</h4>
                      </div>
                      <span className="text-[10.5px] text-[#94A3B8] mt-2 font-mono">
                        ~{algo.opsFor5k.toLocaleString()} ops
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Duel Simulation Arena */}
              <div className="p-4 rounded-2xl bg-[#080D1A] border border-[#263449] flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#22D3EE] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#22D3EE] inline-block animate-ping" />
                    YOU: {chosenAlgo.name}
                  </span>
                  <span className="text-[#F43F5E]">RIVAL: Bubble Sort (O(N²))</span>
                </div>

                {/* Operations Counters */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-[#172033] border border-[#263449]">
                    <span className="text-[10px] text-[#94A3B8] font-mono uppercase">Your Operations</span>
                    <div className="text-lg sm:text-xl font-black font-mono text-[#22D3EE] mt-0.5">
                      {simulatedPlayerOps.toLocaleString()} ops
                    </div>
                    <span className="text-[10px] text-[#10B981] font-bold">
                      {duelFinished ? (chosenAlgo.isSuperior ? '✓ Execution Finished (2ms)!' : 'Finished') : isDuelSimulating ? 'Computing...' : 'Ready'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#172033] border border-[#263449]">
                    <span className="text-[10px] text-[#94A3B8] font-mono uppercase">BugBot Operations</span>
                    <div className="text-lg sm:text-xl font-black font-mono text-[#F43F5E] mt-0.5">
                      {simulatedRivalOps.toLocaleString()} ops
                    </div>
                    <span className="text-[10px] text-[#F43F5E] font-bold">
                      {duelFinished ? '⚠️ High CPU Bottleneck (200× Slower)' : isDuelSimulating ? 'Throttling CPU...' : 'Ready'}
                    </span>
                  </div>
                </div>

                {/* Duel Trigger CTA */}
                {!duelFinished && (
                  <button
                    onClick={handleStartDuel}
                    disabled={isDuelSimulating}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] disabled:opacity-50 text-[#F8FAFC] font-bold text-xs sm:text-sm tracking-wide transition shadow-lg shadow-[#2563EB]/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>{isDuelSimulating ? 'Simulating Operations...' : 'Launch Head-to-Head Duel!'}</span>
                  </button>
                )}

                {/* Post-Duel Verdict */}
                {duelFinished && (
                  <div className="p-3.5 rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 flex flex-col gap-1.5 animate-fadeIn">
                    <div className="flex items-center gap-2 font-bold text-[#10B981] text-xs sm:text-sm">
                      <Trophy className="w-4 h-4 text-[#F59E0B]" />
                      <span>{chosenAlgo.isSuperior ? 'Asymptotic Dominance Verified!' : 'Sub-Optimal Choice'}</span>
                    </div>
                    <p className="text-[11px] text-[#CBD5E1] leading-relaxed">
                      {chosenAlgo.takeaway}
                    </p>
                    {chosenAlgo.isSuperior && (
                      <div className="flex items-center justify-between pt-2 border-t border-[#10B981]/30 text-xs">
                        <span className="text-[#F59E0B] font-bold">Bounty Earned: +{scenario.rewardXp} XP, +{scenario.rewardCoins} Coins</span>
                        <button
                          onClick={handleClaim}
                          className="px-4 py-1.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-[#F8FAFC] font-bold text-xs transition cursor-pointer"
                        >
                          Claim Duel Victory
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* TAB 2: CODE REPAIR CHALLENGE */
            <div className="flex flex-col gap-4">
              <div className="p-3.5 rounded-xl bg-[#080D1A] border border-[#263449] font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] text-[#94A3B8] mb-1.5 pb-1 border-b border-[#263449] font-sans">
                  <span className="font-semibold text-[#F43F5E]">BugBot's Submitted Code:</span>
                  <span className="text-[#94A3B8]">{scenario.errorCategory}</span>
                </div>
                <pre className="text-[#F8FAFC] overflow-x-auto leading-relaxed">{scenario.buggyCode}</pre>
              </div>

              <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                Identify the Fatal Flaw in BugBot's Solution:
              </h4>

              {/* Options */}
              <div className="space-y-2">
                {scenario.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  let optionStyle = 'bg-[#172033] border-[#263449] text-[#F8FAFC] hover:border-[#22D3EE]';

                  if (hasSubmitted) {
                    if (option.isCorrect) {
                      optionStyle = 'bg-[#10B981]/20 border-2 border-[#10B981] text-[#10B981]';
                    } else if (isSelected && !option.isCorrect) {
                      optionStyle = 'bg-[#F43F5E]/20 border-2 border-[#F43F5E] text-[#F43F5E]';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-[#2563EB]/20 border-2 border-[#2563EB] text-[#F8FAFC] shadow-sm';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={hasSubmitted && isCorrect}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-[#080D1A] border border-[#263449] flex items-center justify-center shrink-0 text-[10px] font-mono mt-0.5 text-[#94A3B8]">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-relaxed flex-1">{option.text}</span>
                      {hasSubmitted && option.isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      )}
                      {hasSubmitted && isSelected && !option.isCorrect && (
                        <AlertCircle className="w-4 h-4 text-[#F43F5E] shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {hasSubmitted && (
                <div
                  className={`p-3 rounded-xl border text-xs ${
                    isCorrect
                      ? 'bg-[#10B981]/15 border-[#10B981]/40 text-[#F8FAFC]'
                      : 'bg-[#F43F5E]/15 border-[#F43F5E]/40 text-[#F8FAFC]'
                  }`}
                >
                  <p className={`font-semibold mb-1 ${isCorrect ? 'text-[#10B981]' : 'text-[#F43F5E]'}`}>
                    {isCorrect ? 'BugBot Refuted!' : 'BugBot Laughs at Your Guess!'}
                  </p>
                  <p className="text-[#CBD5E1]">{selectedOption !== null ? scenario.options[selectedOption].explanation : scenario.bugExplanation}</p>
                </div>
              )}

              {/* Repair Footer */}
              <div className="pt-2 flex items-center justify-end">
                {!hasSubmitted ? (
                  <button
                    disabled={selectedOption === null}
                    onClick={handleVerify}
                    className="py-2 px-5 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] disabled:opacity-50 text-[#F8FAFC] text-xs font-semibold shadow-md transition-all cursor-pointer"
                  >
                    Expose Bug
                  </button>
                ) : isCorrect ? (
                  <button
                    onClick={handleClaim}
                    className="py-2 px-5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-[#F8FAFC] text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                  >
                    Claim Victory <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setHasSubmitted(false)}
                    className="py-2 px-5 rounded-lg bg-[#172033] hover:bg-[#263449] border border-[#263449] text-[#94A3B8] hover:text-[#F8FAFC] text-xs font-semibold transition-all cursor-pointer"
                  >
                    Try Again
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-[#263449] bg-[#0B1220] flex items-center justify-between text-xs text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <span>Bounty:</span>
            <span className="text-[#22D3EE] font-semibold">+{scenario.rewardXp} XP</span>
            <span className="text-[#F59E0B] font-semibold">+{scenario.rewardCoins} Coins</span>
            <span className="text-[#10B981] font-semibold">+{scenario.rewardEnergy} ⚡</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-[#172033] hover:bg-[#263449] border border-[#263449] text-[#94A3B8] hover:text-[#F8FAFC] text-xs font-bold transition cursor-pointer"
          >
            Close Arena
          </button>
        </div>
      </div>
    </div>
  );
};
