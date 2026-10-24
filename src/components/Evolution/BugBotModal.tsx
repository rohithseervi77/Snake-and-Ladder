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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#0c1527] border-2 border-[#243556] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-slate-200 flex flex-col max-h-[92vh]">
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1e2d4d] bg-[#091020]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 font-mono flex items-center gap-1">
                  <Swords className="w-3.5 h-3.5" /> Virtual Rival Arena
                </span>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-800 text-slate-300 font-mono">
                  {scenario.topic}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                Rival BugBot Challenge Arena
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-5 py-2 bg-slate-950/80 border-b border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('duel')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'duel'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            <span>Head-to-Head Algorithm Duel</span>
          </button>
          <button
            onClick={() => setActiveTab('repair')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'repair'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                : 'text-slate-400 hover:text-white'
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
              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <span className="text-xs font-bold text-cyan-300">Rival BugBot Algorithm Lock:</span>
                  <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">
                    "I am locking in <strong>Bubble Sort (O(N²))</strong> on a dataset of <strong>5,000 random integers</strong>! Think your algorithm can execute faster without crashing?"
                  </p>
                </div>
              </div>

              {/* Player Weapon Selection */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
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
                          ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-md'
                          : 'bg-[#091020] border-[#1b2b48] text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <div>
                        <span className="font-mono text-[10px] text-cyan-400 font-bold block">{algo.complexity}</span>
                        <h4 className="font-bold text-xs text-white leading-tight mt-1">{algo.name}</h4>
                      </div>
                      <span className="text-[10.5px] text-slate-400 mt-2 font-mono">
                        ~{algo.opsFor5k.toLocaleString()} ops
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Duel Simulation Arena */}
              <div className="p-4 rounded-2xl bg-[#080f1e] border border-[#1b2b48] flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-cyan-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-ping" />
                    YOU: {chosenAlgo.name}
                  </span>
                  <span className="text-rose-400">RIVAL: Bubble Sort (O(N²))</span>
                </div>

                {/* Operations Counters */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/40">
                    <span className="text-[10px] text-slate-400 font-mono uppercase">Your Operations</span>
                    <div className="text-lg sm:text-xl font-black font-mono text-cyan-300 mt-0.5">
                      {simulatedPlayerOps.toLocaleString()} ops
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">
                      {duelFinished ? (chosenAlgo.isSuperior ? '✓ Execution Finished (2ms)!' : 'Finished') : isDuelSimulating ? 'Computing...' : 'Ready'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-800/40">
                    <span className="text-[10px] text-slate-400 font-mono uppercase">BugBot Operations</span>
                    <div className="text-lg sm:text-xl font-black font-mono text-rose-300 mt-0.5">
                      {simulatedRivalOps.toLocaleString()} ops
                    </div>
                    <span className="text-[10px] text-rose-400 font-bold">
                      {duelFinished ? '⚠️ High CPU Bottleneck (200× Slower)' : isDuelSimulating ? 'Throttling CPU...' : 'Ready'}
                    </span>
                  </div>
                </div>

                {/* Duel Trigger CTA */}
                {!duelFinished && (
                  <button
                    onClick={handleStartDuel}
                    disabled={isDuelSimulating}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm tracking-wide transition shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>{isDuelSimulating ? 'Simulating Operations...' : 'Launch Head-to-Head Duel!'}</span>
                  </button>
                )}

                {/* Post-Duel Verdict */}
                {duelFinished && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/50 flex flex-col gap-1.5 animate-fadeIn">
                    <div className="flex items-center gap-2 font-bold text-emerald-300 text-xs sm:text-sm">
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <span>{chosenAlgo.isSuperior ? 'Asymptotic Dominance Verified!' : 'Sub-Optimal Choice'}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {chosenAlgo.takeaway}
                    </p>
                    {chosenAlgo.isSuperior && (
                      <div className="flex items-center justify-between pt-2 border-t border-emerald-800/40 text-xs">
                        <span className="text-amber-300 font-bold">Bounty Earned: +{scenario.rewardXp} XP, +{scenario.rewardCoins} Coins</span>
                        <button
                          onClick={handleClaim}
                          className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition cursor-pointer"
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
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 pb-1 border-b border-slate-800 font-sans">
                  <span className="font-semibold text-rose-300">BugBot's Submitted Code:</span>
                  <span className="text-slate-400">{scenario.errorCategory}</span>
                </div>
                <pre className="text-slate-200 overflow-x-auto leading-relaxed">{scenario.buggyCode}</pre>
              </div>

              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Identify the Fatal Flaw in BugBot's Solution:
              </h4>

              {/* Options */}
              <div className="space-y-2">
                {scenario.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  let optionStyle = 'bg-[#091020] border-[#1b2b48] text-slate-200 hover:border-slate-700';

                  if (hasSubmitted) {
                    if (option.isCorrect) {
                      optionStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200';
                    } else if (isSelected && !option.isCorrect) {
                      optionStyle = 'bg-rose-950/50 border-rose-500 text-rose-200';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-cyan-950/50 border-cyan-500 text-cyan-100 shadow-sm';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={hasSubmitted && isCorrect}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-[10px] font-mono mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-relaxed flex-1">{option.text}</span>
                      {hasSubmitted && option.isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {hasSubmitted && isSelected && !option.isCorrect && (
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
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
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                  }`}
                >
                  <p className="font-semibold mb-1">
                    {isCorrect ? 'BugBot Refuted!' : 'BugBot Laughs at Your Guess!'}
                  </p>
                  <p>{selectedOption !== null ? scenario.options[selectedOption].explanation : scenario.bugExplanation}</p>
                </div>
              )}

              {/* Repair Footer */}
              <div className="pt-2 flex items-center justify-end">
                {!hasSubmitted ? (
                  <button
                    disabled={selectedOption === null}
                    onClick={handleVerify}
                    className="py-2 px-5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
                  >
                    Expose Bug
                  </button>
                ) : isCorrect ? (
                  <button
                    onClick={handleClaim}
                    className="py-2 px-5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                  >
                    Claim Victory <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setHasSubmitted(false)}
                    className="py-2 px-5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    Try Again
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-[#1e2d4d] bg-[#091020] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Bounty:</span>
            <span className="text-indigo-400 font-semibold">+{scenario.rewardXp} XP</span>
            <span className="text-amber-400 font-semibold">+{scenario.rewardCoins} Coins</span>
            <span className="text-emerald-400 font-semibold">+{scenario.rewardEnergy} ⚡</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
          >
            Close Arena
          </button>
        </div>
      </div>
    </div>
  );
};
