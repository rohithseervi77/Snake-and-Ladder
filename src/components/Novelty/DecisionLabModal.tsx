import React, { useState } from 'react';
import { 
  X, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  ArrowRight, 
  Sparkles,
  HelpCircle,
  TrendingUp,
  Database
} from 'lucide-react';

interface DecisionLabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardReward?: (xp: number, coins: number) => void;
}

interface DecisionScenario {
  id: string;
  title: string;
  scaleMetric: string;
  constraint: string;
  scenarioText: string;
  options: Array<{
    title: string;
    complexity: string;
    isOptimal: boolean;
    tradeoffSummary: string;
  }>;
  followUpReasoning: {
    question: string;
    choices: string[];
    correctIndex: number;
    explanation: string;
  };
}

const SCENARIOS: DecisionScenario[] = [
  {
    id: 'sensor-stream-sort',
    title: 'High-Volume Sensor Stream Sort',
    scaleMetric: '10,000,000 Data Points',
    constraint: 'Input values bounded in integer range [0, 1000]. Maximum latency: < 50ms.',
    scenarioText: 'An industrial IoT gateway receives 10 million telemetry readings every minute. Each reading is an integer temperature from 0 to 1,000. Which algorithm achieves optimal throughput?',
    options: [
      {
        title: 'Counting Sort (Histogram Array of Size 1001)',
        complexity: 'O(N + K) Time • O(K) Auxiliary Space',
        isOptimal: true,
        tradeoffSummary: 'Because key range K = 1,000 is tiny compared to N = 10,000,000, counting sort runs in pure linear O(N) time with only ~4KB of RAM!'
      },
      {
        title: 'Standard Quick Sort (In-Place Partitioning)',
        complexity: 'O(N log N) Average • O(log N) Space',
        isOptimal: false,
        tradeoffSummary: 'Requires ~230 million comparisons (N log₂ N), wasting CPU cycles when range K is bounded.'
      },
      {
        title: 'Standard Merge Sort (Divide & Conquer)',
        complexity: 'O(N log N) Time • O(N) Auxiliary Space',
        isOptimal: false,
        tradeoffSummary: 'Allocates a second 10M array in RAM (~80MB), triggering garbage collection overhead.'
      },
      {
        title: 'Bubble Sort with Early Exit',
        complexity: 'O(N²) Quadratic Time',
        isOptimal: false,
        tradeoffSummary: 'Catastrophic failure: 10¹⁴ operations would take weeks to finish.'
      }
    ],
    followUpReasoning: {
      question: 'Why does Counting Sort bypass the mathematical comparison sort barrier of Ω(N log N)?',
      choices: [
        'It uses array indices as direct memory addresses (bucketing) rather than comparing elements pairwise',
        'It utilizes multi-threaded parallel GPU acceleration automatically',
        'Modern compilers translate counting loops into quantum registers',
        'It drops duplicate items to save time'
      ],
      correctIndex: 0,
      explanation: 'Non-comparison sorts (Counting Sort, Radix Sort, Bucket Sort) avoid pairwise decision trees by using integer address indexing, achieving true linear O(N + K) time.'
    }
  },
  {
    id: 'leaderboard-top-k',
    title: 'Real-Time Top 100 Leaderboard',
    scaleMetric: '500,000 Active Players',
    constraint: 'Continuous score updates. Real-time Top-100 extraction under 1ms.',
    scenarioText: 'An online competitive gaming platform has 500,000 players whose scores change every second. You must maintain and return the current Top 100 players instantly.',
    options: [
      {
        title: 'Min-Heap of Fixed Size K = 100',
        complexity: 'O(N log K) Ingestion • O(1) Top-K Extraction • O(K) Space',
        isOptimal: true,
        tradeoffSummary: 'Root stores the 100th player. New scores only compare against the root in O(1). If higher, replace and sift down in O(log 100) ≈ 7 operations!'
      },
      {
        title: 'Sort Full 500,000 Array on Every Request',
        complexity: 'O(N log N) per query (~9,500,000 ops)',
        isOptimal: false,
        tradeoffSummary: 'Sorting 500K records on every query causes server CPU spikes and 500ms API lag.'
      },
      {
        title: 'Unsorted Array with Linear Scan',
        complexity: 'O(N · K) Time (~50,000,000 ops)',
        isOptimal: false,
        tradeoffSummary: 'Scanning 500K elements 100 times is too slow for real-time multiplayer games.'
      }
    ],
    followUpReasoning: {
      question: 'Why is a Min-Heap preferred over a Max-Heap when finding the Top K largest elements?',
      choices: [
        'The Min-Heap root always holds the smallest of the top candidates, allowing immediate O(1) rejection of incoming scores below the cutoff',
        'A Min-Heap uses half as much memory as a Max-Heap',
        'Max-Heaps cannot store numerical scores',
        'Because Min-Heaps sort elements in reverse'
      ],
      correctIndex: 0,
      explanation: 'In a Top-K Min-Heap, the root is the current threshold. If a new score is smaller than the root, it cannot be in the top K and is discarded in O(1).'
    }
  }
];

export const DecisionLabModal: React.FC<DecisionLabModalProps> = ({
  isOpen,
  onClose,
  onAwardReward
}) => {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedReasoning, setSelectedReasoning] = useState<number | null>(null);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(false);

  if (!isOpen) return null;

  const currentScenario = SCENARIOS[scenarioIndex];
  const chosenOption = selectedOption !== null ? currentScenario.options[selectedOption] : null;

  const handleEvaluate = () => {
    if (selectedOption === null || selectedReasoning === null) return;
    setIsEvaluated(true);
    if (chosenOption?.isOptimal && selectedReasoning === currentScenario.followUpReasoning.correctIndex && !hasClaimed) {
      setHasClaimed(true);
      if (onAwardReward) {
        onAwardReward(75, 25);
      }
    }
  };

  const handleNextScenario = () => {
    setScenarioIndex((prev) => (prev + 1) % SCENARIOS.length);
    setSelectedOption(null);
    setSelectedReasoning(null);
    setIsEvaluated(false);
    setHasClaimed(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-[var(--text-primary)] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="decision-lab-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--card-secondary-bg)]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/40 flex items-center justify-center text-[#F59E0B] shrink-0">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#F59E0B] font-mono">
                Production-Scale Architecture Lab
              </span>
              <h2 id="decision-lab-title" className="text-base sm:text-lg font-black text-[var(--text-primary)] leading-tight">
                Algorithm Decision Lab
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer"
            aria-label="Close Decision Lab"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4 text-xs sm:text-sm">
          {/* Scenario Overview Banner */}
          <div className="p-4 rounded-2xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
              <span className="px-2 py-0.5 rounded bg-[var(--card-bg)] border border-[#F59E0B]/40 text-[#F59E0B] font-bold">
                Scale: {currentScenario.scaleMetric}
              </span>
              <span className="text-[var(--text-secondary)]">
                Scenario {scenarioIndex + 1} of {SCENARIOS.length}
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] leading-snug">
              {currentScenario.title}
            </h3>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {currentScenario.scenarioText}
            </p>

            <div className="p-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--border-subtle)] text-[11px] text-[#06B6D4] font-mono">
              <strong className="text-[var(--text-primary)]">Constraint:</strong> {currentScenario.constraint}
            </div>
          </div>

          {/* Step 1: Choose Algorithm */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider">
              Step 1: Choose Production-Scale Algorithm Strategy
            </span>
            <div className="flex flex-col gap-2">
              {currentScenario.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let cardStyle = 'bg-[var(--card-secondary-bg)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[#6366F1]';

                if (isEvaluated) {
                  if (opt.isOptimal) {
                    cardStyle = 'bg-[#10B981]/20 border-2 border-[#10B981] text-[#10B981]';
                  } else if (isSelected && !opt.isOptimal) {
                    cardStyle = 'bg-[#F43F5E]/20 border-2 border-[#F43F5E] text-[#F43F5E]';
                  }
                } else if (isSelected) {
                  cardStyle = 'bg-[#6366F1]/20 border-2 border-[#6366F1] text-[var(--text-primary)] shadow-md shadow-[#6366F1]/25';
                }

                return (
                  <button
                    key={idx}
                    disabled={isEvaluated}
                    onClick={() => setSelectedOption(idx)}
                    className={`p-3 rounded-xl border text-left flex items-start justify-between gap-3 transition cursor-pointer disabled:cursor-default ${cardStyle}`}
                  >
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-[var(--text-primary)]">{opt.title}</div>
                      <div className="font-mono text-[11px] text-[#06B6D4] mt-0.5">{opt.complexity}</div>
                      {isEvaluated && (
                        <p className="text-[11px] text-[var(--text-secondary)] mt-1 leading-snug">
                          {opt.tradeoffSummary}
                        </p>
                      )}
                    </div>
                    {isEvaluated && opt.isOptimal && (
                      <span className="px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] font-bold text-[10px] shrink-0 border border-[#10B981]/40">
                        Optimal Choice
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Reason Justification */}
          {selectedOption !== null && (
            <div className="flex flex-col gap-2 animate-fadeIn">
              <span className="text-[11px] font-mono font-bold text-[#F59E0B] uppercase tracking-wider">
                Step 2: Algorithmic Justification (Why does this choice scale?)
              </span>
              <div className="p-3.5 rounded-2xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col gap-2.5">
                <p className="text-xs font-semibold text-[var(--text-primary)]">
                  {currentScenario.followUpReasoning.question}
                </p>
                <div className="flex flex-col gap-1.5">
                  {currentScenario.followUpReasoning.choices.map((choice, cIdx) => {
                    const isChoiceSelected = selectedReasoning === cIdx;
                    let cStyle = 'bg-[var(--card-bg)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[#6366F1]';

                    if (isEvaluated) {
                      if (cIdx === currentScenario.followUpReasoning.correctIndex) {
                        cStyle = 'bg-[#10B981]/20 border-2 border-[#10B981] text-[#10B981] font-semibold';
                      } else if (isChoiceSelected) {
                        cStyle = 'bg-[#F43F5E]/20 border-2 border-[#F43F5E] text-[#F43F5E]';
                      }
                    } else if (isChoiceSelected) {
                      cStyle = 'bg-[#6366F1]/20 border-2 border-[#6366F1] text-[var(--text-primary)]';
                    }

                    return (
                      <button
                        key={cIdx}
                        disabled={isEvaluated}
                        onClick={() => setSelectedReasoning(cIdx)}
                        className={`p-2.5 rounded-xl border text-left text-xs leading-snug transition cursor-pointer disabled:cursor-default ${cStyle}`}
                      >
                        {choice}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Post Evaluation Feedback */}
          {isEvaluated && (
            <div className="p-4 rounded-2xl bg-[var(--card-secondary-bg)] border border-[#6366F1]/40 text-[var(--text-secondary)] text-xs flex flex-col gap-2 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-sm text-[var(--text-primary)]">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <span>Production Architecture Verdict:</span>
              </div>
              <p className="leading-relaxed">
                {currentScenario.followUpReasoning.explanation}
              </p>
              {hasClaimed && (
                <div className="flex items-center gap-1.5 font-bold text-[#F59E0B] text-xs">
                  <Award className="w-4 h-4" />
                  <span>Awarded +75 XP and +25 Coins for flawless architectural reasoning!</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[var(--border-subtle)] bg-[var(--card-secondary-bg)] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-semibold text-xs transition cursor-pointer"
          >
            Close Lab
          </button>

          {!isEvaluated ? (
            <button
              onClick={handleEvaluate}
              disabled={selectedOption === null || selectedReasoning === null}
              className="px-5 py-2 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] disabled:opacity-50 text-white font-bold text-xs sm:text-sm tracking-wide transition shadow-md shadow-[#6366F1]/25 cursor-pointer disabled:cursor-not-allowed"
            >
              Verify Architectural Decision
            </button>
          ) : (
            <button
              onClick={handleNextScenario}
              className="px-5 py-2 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white font-bold text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#6366F1]/25"
            >
              <span>Next Scenario</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
