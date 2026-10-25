import React, { useState } from 'react';
import { X, GraduationCap, CheckCircle2, AlertCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { CourseOutcome } from '../../types/curriculum';
import { Challenge } from '../../types/challenge';
import { ChallengeRegistry } from '../../data/challenges';

interface PracticeModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecordResult?: (scoreDelta: number, coinsDelta: number) => void;
  onRecordMistake?: (topic: string, question: string, yourAnswer: string, correctAnswer: string) => void;
}

export const PracticeModeModal: React.FC<PracticeModeModalProps> = ({
  isOpen,
  onClose,
  onRecordResult,
  onRecordMistake
}) => {
  const [selectedCO, setSelectedCO] = useState<CourseOutcome | null>(null);
  const [questions, setQuestions] = useState<Challenge[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [topicStats, setTopicStats] = useState<Record<string, { correct: number; total: number }>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  if (!isOpen) return null;

  const registry = new ChallengeRegistry();

  const handleStartPractice = (co: CourseOutcome) => {
    setSelectedCO(co);
    const qList = registry.getPracticeQuestions(co, 10);
    setQuestions(qList);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setTopicStats({});
    setIsCompleted(false);
  };

  const currentQ = questions[currentQuestionIdx];

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !currentQ) return;
    setIsAnswered(true);

    const isCorrect = selectedOption === currentQ.correctOptionIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      const yourAnswer = currentQ.options ? currentQ.options[selectedOption] : 'Option ' + selectedOption;
      const correctAnswer = currentQ.options && currentQ.correctOptionIndex !== undefined ? currentQ.options[currentQ.correctOptionIndex] : 'Correct answer';
      onRecordMistake?.(currentQ.topic, currentQ.prompt, yourAnswer, correctAnswer);
    }

    setTopicStats(prev => {
      const existing = prev[currentQ.topic] || { correct: 0, total: 0 };
      return {
        ...prev,
        [currentQ.topic]: {
          correct: existing.correct + (isCorrect ? 1 : 0),
          total: existing.total + 1
        }
      };
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx + 1 < questions.length) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      onRecordResult?.(score * 10, score * 5);
    }
  };

  const handleRestart = () => {
    setSelectedCO(null);
    setQuestions([]);
    setIsCompleted(false);
  };

  // Analyze strengths & weaknesses
  const strongTopics: string[] = [];
  const needsPracticeTopics: string[] = [];

  Object.entries(topicStats).forEach(([t, s]) => {
    if (s.correct / s.total >= 0.7) {
      strongTopics.push(t);
    } else {
      needsPracticeTopics.push(t);
    }
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl p-5 flex flex-col gap-4 text-[var(--text-primary)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center text-[#10B981]">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#10B981]">Exam Preparation</span>
              <h3 className="text-base font-black">Practice Mode (10 Questions)</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--card-secondary-bg)] text-[var(--text-secondary)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* State 1: Choose CO */}
        {!selectedCO ? (
          <div className="flex flex-col gap-3 py-2">
            <p className="text-xs text-[var(--text-secondary)]">
              Choose a Course Outcome (CO) unit to practice 10 focused questions with immediate explanations:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { co: 'CO1' as CourseOutcome, title: 'CO1 — Techniques & Analysis', desc: 'Mathematical Foundation, Asymptotic Notations, Recurrences, Master Theorem' },
                { co: 'CO2' as CourseOutcome, title: 'CO2 — Stacks, Queues & Lists', desc: 'Array Stacks, Balanced Parentheses, Infix/Postfix, Circular Queues, Linked Lists' },
                { co: 'CO3' as CourseOutcome, title: 'CO3 — Sorting & Searching', desc: 'Insertion/Counting/Radix/Merge/Quick/Heap Sort, Binary/Jump Search, Hashing' },
                { co: 'CO4' as CourseOutcome, title: 'CO4 — Trees, Graphs & Algorithms', desc: 'BST, AVL Rotations, BFS/DFS, Dijkstra, Prim/Kruskal, Huffman, Matrix-Chain' }
              ].map((item) => (
                <button
                  key={item.co}
                  onClick={() => handleStartPractice(item.co)}
                  className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--card-secondary-bg)] hover:bg-[var(--card-bg)] hover:border-[#10B981] text-left transition flex flex-col justify-between gap-1 cursor-pointer group"
                >
                  <div className="flex items-center justify-between font-bold text-xs text-[var(--text-primary)] group-hover:text-[#10B981]">
                    <span>{item.title}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--border-subtle)]">{item.co}</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        ) : !isCompleted && currentQ ? (
          /* State 2: Answering questions */
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] pb-2 border-b border-[var(--border-subtle)]">
              <span>Question {currentQuestionIdx + 1} of {questions.length} ({selectedCO})</span>
              <span>Score: <strong className="text-[#10B981]">{score}</strong> / {currentQuestionIdx}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col gap-1.5">
              <span className="text-[10px] font-mono text-[#06B6D4] font-bold">{currentQ.topic} • {currentQ.subtopic}</span>
              <p className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] leading-relaxed">
                {currentQ.prompt}
              </p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-1.5">
              {currentQ.options?.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctOptionIndex;

                let btnStyle = 'bg-[var(--card-secondary-bg)] border-[var(--border-subtle)] text-[var(--text-primary)]';
                if (isAnswered) {
                  if (isCorrect) btnStyle = 'bg-[#10B981]/20 border-[#10B981] text-[#10B981] font-bold';
                  else if (isSelected && !isCorrect) btnStyle = 'bg-[#F43F5E]/20 border-[#F43F5E] text-[#F43F5E]';
                } else if (isSelected) {
                  btnStyle = 'bg-[#10B981]/20 border-[#10B981] text-[var(--text-primary)]';
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => setSelectedOption(idx)}
                    className={`p-3 rounded-xl border text-left text-xs font-mono transition cursor-pointer disabled:cursor-default flex items-start gap-2 ${btnStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full bg-[var(--card-bg)] border border-[var(--border-subtle)] flex items-center justify-center text-[10px] shrink-0 font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation on submit */}
            {isAnswered && (
              <div className={`p-3 rounded-xl border text-xs font-mono ${
                selectedOption === currentQ.correctOptionIndex
                  ? 'bg-[#10B981]/15 border-[#10B981]/40 text-[#10B981]'
                  : 'bg-[#F43F5E]/15 border-[#F43F5E]/40 text-[#F43F5E]'
              }`}>
                <strong>{selectedOption === currentQ.correctOptionIndex ? 'Correct!' : 'Incorrect.'}</strong> {currentQ.explanation}
              </div>
            )}

            {/* Question Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
              <span className="text-[11px] text-[var(--text-secondary)] font-mono">
                {currentQ.difficulty.toUpperCase()} Level
              </span>

              {!isAnswered ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className="py-2 px-5 rounded-xl bg-[#10B981] hover:bg-[#059669] disabled:opacity-40 text-white font-bold text-xs cursor-pointer"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="py-2 px-5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <span>{currentQuestionIdx + 1 === questions.length ? 'View Results' : 'Next Question'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* State 3: Final Results & Analysis */
          <div className="flex flex-col gap-4 py-2">
            <div className="p-4 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col items-center gap-1 text-center">
              <Award className="w-8 h-8 text-[#10B981] mb-1" />
              <h4 className="text-base font-black">Practice Session Complete!</h4>
              <div className="text-2xl font-black font-mono text-[#10B981] my-1">
                Score: {score} / {questions.length} ({Math.round((score / questions.length) * 100)}% Accuracy)
              </div>
              <p className="text-xs text-[var(--text-secondary)]">Awarded +{score * 10} XP and +{score * 5} Coins.</p>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 flex flex-col gap-1.5">
                <span className="font-bold text-[#10B981] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Strong Topics:
                </span>
                {strongTopics.length > 0 ? (
                  <ul className="list-disc pl-4 text-[11px] text-[var(--text-primary)] space-y-0.5">
                    {strongTopics.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                ) : (
                  <span className="text-[11px] text-[var(--text-secondary)] italic">Keep practicing to build topic mastery!</span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex flex-col gap-1.5">
                <span className="font-bold text-[#F59E0B] flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Needs Practice:
                </span>
                {needsPracticeTopics.length > 0 ? (
                  <ul className="list-disc pl-4 text-[11px] text-[var(--text-primary)] space-y-0.5">
                    {needsPracticeTopics.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                ) : (
                  <span className="text-[11px] text-[#10B981] font-bold">Flawless performance across all tested topics!</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
              <button
                onClick={handleRestart}
                className="flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Practice Another Unit</span>
              </button>
              <button
                onClick={onClose}
                className="py-2 px-5 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-bold text-xs cursor-pointer hover:bg-[var(--card-bg)]"
              >
                Back to Board
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
