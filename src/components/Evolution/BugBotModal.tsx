import React, { useState } from 'react';
import { 
  Bot, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Trophy, 
  X,
  Swords,
  Play
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

  const handleStartDuel = () => {
    setIsDuelSimulating(true);
    setDuelFinished(false);
    setSimulatedPlayerOps(0);
    setSimulatedRivalOps(0);

    const targetPlayerOps = chosenAlgo.opsFor5k;
    const targetRivalOps = 12500000; // Bubble Sort O(N^2)

    const interval = setInterval(() => {
      setSimulatedPlayerOps(prev => {
        const next = prev + Math.floor(targetPlayerOps / 15);
        if (next >= targetPlayerOps) {
          return targetPlayerOps;
        }
        return next;
      });

      setSimulatedRivalOps(prev => {
        const next = prev + Math.floor(targetRivalOps / 25);
        if (next >= targetRivalOps) {
          clearInterval(interval);
          setIsDuelSimulating(false);
          setDuelFinished(true);
          return targetRivalOps;
        }
        return next;
      });
    }, 60);
  };

  const handleSelectOption = (index: number) => {
    if (hasSubmitted && isCorrect) return;
    setSelectedOption(index);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-[var(--text-primary)] flex flex-col max-h-[92vh] transition-colors duration-200">
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[var(--color-pink)]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--card-secondary-bg)]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-pink-light)] border border-[var(--color-pink-border)] flex items-center justify-center text-[var(--color-pink)] shrink-0">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-pink)] font-mono flex items-center gap-1">
                  <Swords className="w-3.5 h-3.5" /> Virtual Rival Arena
                </span>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-[var(--card-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-mono">
                  {scenario.topic}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-[var(--text-primary)] leading-tight">
                Rival BugBot Challenge Arena
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg hover:bg-[var(--card-bg)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-5 py-2 bg-[var(--card-secondary-bg)] border-b border-[var(--border-subtle)] text-xs">
          <button
            onClick={() => setActiveTab('duel')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'duel'
                ? 'bg-[var(--color-pink)] text-white shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            <span>Head-to-Head Algorithm Duel</span>
          </button>
          <button
            onClick={() => setActiveTab('repair')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'repair'
                ? 'bg-[var(--color-pink)] text-white shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Fix BugBot's Flawed Code</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto flex-1">
          {activeTab === 'duel' ? (
            /* TAB 1: DUEL BENCHMARK */
            <div className="flex flex-col gap-4">
              <div className="p-3.5 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)]">
                <span className="text-[10px] font-mono text-[var(--color-pink)] uppercase tracking-wider block font-bold">
                  Asymptotic Race Condition: N = 5,000 Elements
                </span>
                <h3 className="text-sm font-bold text-[var(--text-primary)] mt-1">
                  Race BugBot's Quadratic Implementation against Your Scalable Choice!
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                  BugBot is deploying a naïve nested loop algorithm. Choose an optimal data structure or divide-and-conquer strategy to beat it in raw CPU operations.
                </p>
              </div>

              {/* Player Algorithm Selection */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider">
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
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition cursor-pointer disabled:cursor-not-allowed shadow-sm ${
                        chosenAlgo.name === algo.name
                          ? 'bg-[var(--color-pink-light)] border-2 border-[var(--color-pink)] text-[var(--text-primary)]'
                          : 'bg-[var(--card-bg)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--color-pink)]'
                      }`}
                    >
                      <div>
                        <span className="font-mono text-[10px] text-[var(--color-pink)] font-bold block">{algo.complexity}</span>
                        <h4 className="font-bold text-xs text-[var(--text-primary)] leading-tight mt-1">{algo.name}</h4>
                      </div>
                      <span className="text-[10.5px] text-[var(--text-secondary)] mt-2 font-mono">
                        ~{algo.opsFor5k.toLocaleString()} ops
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Duel Simulation Arena */}
              <div className="p-4 rounded-2xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col gap-3 shadow-inner">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[var(--color-indigo)] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-indigo)] inline-block animate-ping" />
                    YOU: {chosenAlgo.name}
                  </span>
                  <span className="text-[var(--color-rose)]">RIVAL: Bubble Sort (O(N²))</span>
                </div>

                {/* Operations Counters */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-[var(--card-bg)] border border-[var(--border-subtle)] shadow-sm">
                    <span className="text-[10px] text-[var(--text-secondary)] font-mono uppercase">Your Operations</span>
                    <div className="text-lg sm:text-xl font-black font-mono text-[var(--color-indigo)] mt-0.5">
                      {simulatedPlayerOps.toLocaleString()} ops
                    </div>
                    <span className="text-[10px] text-[var(--color-emerald)] font-bold">
                      {duelFinished ? (chosenAlgo.isSuperior ? '✓ Execution Finished (2ms)!' : 'Finished') : isDuelSimulating ? 'Computing...' : 'Ready'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[var(--card-bg)] border border-[var(--border-subtle)] shadow-sm">
                    <span className="text-[10px] text-[var(--text-secondary)] font-mono uppercase">BugBot Operations</span>
                    <div className="text-lg sm:text-xl font-black font-mono text-[var(--color-rose)] mt-0.5">
                      {simulatedRivalOps.toLocaleString()} ops
                    </div>
                    <span className="text-[10px] text-[var(--color-rose)] font-bold">
                      {duelFinished ? '⚠️ High CPU Bottleneck (200× Slower)' : isDuelSimulating ? 'Throttling CPU...' : 'Ready'}
                    </span>
                  </div>
                </div>

                {/* Duel Trigger CTA */}
                {!duelFinished && (
                  <button
                    onClick={handleStartDuel}
                    disabled={isDuelSimulating}
                    className="w-full py-2.5 px-4 rounded-xl bg-[var(--color-pink)] hover:opacity-90 disabled:opacity-50 text-white font-bold text-xs sm:text-sm tracking-wide transition shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>{isDuelSimulating ? 'Simulating Operations...' : 'Launch Head-to-Head Duel!'}</span>
                  </button>
                )}

                {/* Post-Duel Verdict */}
                {duelFinished && (
                  <div className="p-3.5 rounded-xl bg-[var(--color-emerald-light)] border border-[var(--color-emerald-border)] flex flex-col gap-1.5 animate-fadeIn">
                    <div className="flex items-center gap-2 font-bold text-[var(--color-emerald)] text-xs sm:text-sm">
                      <Trophy className="w-4 h-4 text-[var(--color-amber)]" />
                      <span>{chosenAlgo.isSuperior ? 'Asymptotic Dominance Verified!' : 'Sub-Optimal Choice'}</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-primary)] leading-relaxed">
                      {chosenAlgo.takeaway}
                    </p>
                    {chosenAlgo.isSuperior && (
                      <div className="flex items-center justify-between pt-2 border-t border-[var(--color-emerald-border)] text-xs">
                        <span className="text-[var(--color-amber)] font-bold">Bounty Earned: +{scenario.rewardXp} XP, +{scenario.rewardCoins} Coins</span>
                        <button
                          onClick={handleClaim}
                          className="px-4 py-1.5 rounded-lg bg-[var(--color-emerald)] hover:opacity-90 text-white font-bold text-xs transition cursor-pointer active:scale-95"
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
              <div className="p-3.5 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] text-[var(--text-secondary)] mb-1.5 pb-1 border-b border-[var(--border-subtle)] font-sans">
                  <span className="font-semibold text-[var(--color-rose)]">BugBot's Submitted Code:</span>
                  <span className="text-[var(--text-secondary)]">{scenario.errorCategory}</span>
                </div>
                <pre className="text-[var(--text-primary)] overflow-x-auto leading-relaxed">{scenario.buggyCode}</pre>
              </div>

              <h4 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                Identify the Fatal Flaw in BugBot's Solution:
              </h4>

              {/* Options */}
              <div className="space-y-2">
                {scenario.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  let optionStyle = 'bg-[var(--card-bg)] border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--color-indigo)]';

                  if (hasSubmitted) {
                    if (option.isCorrect) {
                      optionStyle = 'bg-[var(--color-emerald-light)] border-2 border-[var(--color-emerald)] text-[var(--color-emerald)]';
                    } else if (isSelected && !option.isCorrect) {
                      optionStyle = 'bg-[var(--color-rose-light)] border-2 border-[var(--color-rose)] text-[var(--color-rose)]';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-[var(--color-pink-light)] border-2 border-[var(--color-pink)] text-[var(--text-primary)] shadow-sm';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={hasSubmitted && isCorrect}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-3 cursor-pointer shadow-sm ${optionStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0 text-[10px] font-mono mt-0.5 text-[var(--text-secondary)]">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-relaxed flex-1">{option.text}</span>
                      {hasSubmitted && option.isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-emerald)] shrink-0 mt-0.5" />
                      )}
                      {hasSubmitted && isSelected && !option.isCorrect && (
                        <AlertCircle className="w-4 h-4 text-[var(--color-rose)] shrink-0 mt-0.5" />
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
                      ? 'bg-[var(--color-emerald-light)] border-[var(--color-emerald-border)] text-[var(--text-primary)]'
                      : 'bg-[var(--color-rose-light)] border-[var(--color-rose-border)] text-[var(--text-primary)]'
                  }`}
                >
                  <p className={`font-semibold mb-1 ${isCorrect ? 'text-[var(--color-emerald)]' : 'text-[var(--color-rose)]'}`}>
                    {isCorrect ? 'BugBot Refuted!' : 'BugBot Laughs at Your Guess!'}
                  </p>
                  <p className="text-[var(--text-secondary)]">{selectedOption !== null ? scenario.options[selectedOption].explanation : scenario.bugExplanation}</p>
                </div>
              )}

              {/* Repair Footer */}
              <div className="pt-2 flex items-center justify-end">
                {!hasSubmitted ? (
                  <button
                    disabled={selectedOption === null}
                    onClick={handleVerify}
                    className="py-2 px-5 rounded-lg bg-[var(--color-pink)] hover:opacity-90 disabled:opacity-50 text-white text-xs font-semibold shadow-md transition-all cursor-pointer active:scale-95"
                  >
                    Expose Bug
                  </button>
                ) : isCorrect ? (
                  <button
                    onClick={handleClaim}
                    className="py-2 px-5 rounded-lg bg-[var(--color-emerald)] hover:opacity-90 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95"
                  >
                    Claim Victory <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setHasSubmitted(false)}
                    className="py-2 px-5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-semibold transition-all cursor-pointer"
                  >
                    Try Again
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-[var(--border-subtle)] bg-[var(--card-secondary-bg)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
          <div className="flex items-center gap-2">
            <span>Bounty:</span>
            <span className="text-[var(--color-indigo)] font-semibold">+{scenario.rewardXp} XP</span>
            <span className="text-[var(--color-amber)] font-semibold">+{scenario.rewardCoins} Coins</span>
            <span className="text-[var(--color-emerald)] font-semibold">+{scenario.rewardEnergy} ⚡</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-bold transition cursor-pointer"
          >
            Close Arena
          </button>
        </div>
      </div>
    </div>
  );
};
