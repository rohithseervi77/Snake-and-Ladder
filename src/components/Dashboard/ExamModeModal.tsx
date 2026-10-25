import React, { useState, useEffect } from 'react';
import { X, Clock, Award, RotateCcw } from 'lucide-react';
import { Challenge } from '../../types/challenge';
import { ChallengeRegistry } from '../../data/challenges';

interface ExamModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecordResult?: (scoreDelta: number, coinsDelta: number) => void;
}

const EXAM_QUESTION_COUNT = 20;
const EXAM_DURATION_SECONDS = 20 * 60; // 20 minutes

export const ExamModeModal: React.FC<ExamModeModalProps> = ({
  isOpen,
  onClose,
  onRecordResult
}) => {
  const [questions, setQuestions] = useState<Challenge[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(EXAM_DURATION_SECONDS);
  const [isExamActive, setIsExamActive] = useState<boolean>(false);
  const [isExamSubmitted, setIsExamSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (!isExamActive || isExamSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamActive, isExamSubmitted]);

  if (!isOpen) return null;

  const handleStartExam = () => {
    const registry = new ChallengeRegistry();
    const examQuestions = registry.getExamQuestions(EXAM_QUESTION_COUNT);
    setQuestions(examQuestions);
    setCurrentIndex(0);
    setUserAnswers({});
    setTimeLeft(EXAM_DURATION_SECONDS);
    setIsExamActive(true);
    setIsExamSubmitted(false);
  };

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (isExamSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitExam = () => {
    setIsExamSubmitted(true);
    setIsExamActive(false);

    // Calculate score
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctOptionIndex) {
        correctCount++;
      }
    });

    onRecordResult?.(correctCount * 15, correctCount * 5);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex];

  // Final performance evaluation
  let correctCount = 0;
  const topicBreakdown: Record<string, { correct: number; total: number }> = {};
  if (isExamSubmitted) {
    questions.forEach((q, idx) => {
      const isCorrect = userAnswers[idx] === q.correctOptionIndex;
      if (isCorrect) correctCount++;
      const current = topicBreakdown[q.topic] || { correct: 0, total: 0 };
      topicBreakdown[q.topic] = {
        correct: current.correct + (isCorrect ? 1 : 0),
        total: current.total + 1
      };
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-[var(--modal-bg)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl p-5 flex flex-col gap-4 text-[var(--text-primary)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F43F5E]/20 border border-[#F43F5E]/40 flex items-center justify-center text-[#F43F5E]">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#F43F5E]">Exam Simulation</span>
              <h3 className="text-base font-black">DSA Lab Examination (20 Questions)</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--card-secondary-bg)] text-[var(--text-secondary)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* State 1: Start Screen */}
        {!isExamActive && !isExamSubmitted ? (
          <div className="flex flex-col gap-3 py-4 text-center items-center">
            <Clock className="w-12 h-12 text-[#F43F5E] my-2" />
            <h4 className="text-lg font-black">Timed DSA Assessment</h4>
            <p className="text-xs text-[var(--text-secondary)] max-w-md">
              20 randomized multiple-choice questions across CO1, CO2, CO3, and CO4. Strict 20-minute countdown timer with no hints.
            </p>
            <div className="p-3 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)] flex flex-col gap-1 w-full max-w-sm mt-2">
              <span>• Total Questions: 20</span>
              <span>• Time Allowed: 20:00</span>
              <span>• Negative Marking: None</span>
              <span>• Comprehensive Topic Breakdown at Finish</span>
            </div>
            <button
              onClick={handleStartExam}
              className="mt-4 py-2.5 px-6 rounded-xl bg-[#F43F5E] hover:bg-[#E11D48] text-white font-bold text-xs cursor-pointer shadow-md shadow-[#F43F5E]/25"
            >
              Start Exam Now
            </button>
          </div>
        ) : isExamActive && currentQ ? (
          /* State 2: Active Exam */
          <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
            {/* Top Bar: Progress & Timer */}
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)] text-xs font-mono">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span className="font-bold text-sm text-[#F43F5E] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {formatTime(timeLeft)}
              </span>
            </div>

            {/* Question Card */}
            <div className="p-3.5 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col gap-1">
              <span className="text-[10px] font-mono text-[#06B6D4] font-bold">{currentQ.co} • {currentQ.topic}</span>
              <p className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] leading-relaxed">
                {currentQ.prompt}
              </p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-1.5">
              {currentQ.options?.map((opt, idx) => {
                const isSelected = userAnswers[currentIndex] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(currentIndex, idx)}
                    className={`p-3 rounded-xl border text-left text-xs font-mono transition cursor-pointer flex items-start gap-2 ${
                      isSelected
                        ? 'bg-[#6366F1]/20 border-[#6366F1] text-[var(--text-primary)] font-bold'
                        : 'bg-[var(--card-secondary-bg)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-[var(--card-bg)] border border-[var(--border-subtle)] flex items-center justify-center text-[10px] shrink-0 font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigator Palette */}
            <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex(prev => prev - 1)}
                  className="py-1.5 px-3 rounded-lg border border-[var(--border-subtle)] text-xs font-bold disabled:opacity-40 cursor-pointer"
                >
                  Previous
                </button>
                <button
                  disabled={currentIndex === questions.length - 1}
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                  className="py-1.5 px-3 rounded-lg border border-[var(--border-subtle)] text-xs font-bold disabled:opacity-40 cursor-pointer"
                >
                  Next
                </button>
              </div>

              <button
                onClick={handleSubmitExam}
                className="py-1.5 px-4 rounded-xl bg-[#F43F5E] hover:bg-[#E11D48] text-white font-bold text-xs cursor-pointer shadow-sm"
              >
                Submit Exam
              </button>
            </div>
          </div>
        ) : (
          /* State 3: Final Exam Score & Topic Breakdown */
          <div className="flex flex-col gap-4 py-2 flex-1 overflow-y-auto">
            <div className="p-4 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col items-center gap-1 text-center">
              <Award className="w-8 h-8 text-[#EAB308] mb-1" />
              <h4 className="text-base font-black">Exam Evaluation Complete!</h4>
              <div className="text-3xl font-black font-mono text-[#EAB308] my-1">
                {correctCount} / {questions.length} ({Math.round((correctCount / questions.length) * 100)}%)
              </div>
              <p className="text-xs text-[var(--text-secondary)]">Awarded +{correctCount * 15} XP and +{correctCount * 5} Coins.</p>
            </div>

            {/* Topic Performance Grid */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-[var(--text-secondary)]">Topic-wise Score Breakdown:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {Object.entries(topicBreakdown).map(([t, s]) => {
                  const pct = Math.round((s.correct / s.total) * 100);
                  return (
                    <div key={t} className="p-2.5 rounded-lg bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] flex flex-col gap-1">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-bold truncate">{t}</span>
                        <span className={pct >= 70 ? 'text-[#10B981]' : 'text-[#F59E0B]'}>
                          {s.correct}/{s.total} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-1 bg-[var(--card-bg)] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, backgroundColor: pct >= 70 ? '#10B981' : '#F59E0B' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
              <button
                onClick={handleStartExam}
                className="flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Exam</span>
              </button>
              <button
                onClick={onClose}
                className="py-2 px-5 rounded-xl bg-[var(--card-secondary-bg)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-bold text-xs cursor-pointer hover:bg-[var(--card-bg)]"
              >
                Close Exam
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
