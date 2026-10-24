import { TopicMasteryScore, MasteryLevel } from '../types/evolution';
import { DifficultyLevel } from '../types/curriculum';

export const DSA_TOPICS = [
  'Arrays and strings',
  'Linked lists',
  'Stacks and queues',
  'Searching and sorting',
  'Hashing',
  'Recursion and backtracking',
  'Trees and heaps',
  'Graphs',
  'Greedy algorithms',
  'Dynamic programming',
  'Time and space complexity'
] as const;

export type DsaTopicName = typeof DSA_TOPICS[number];

export function getInitialMasteryMap(): Record<string, TopicMasteryScore> {
  const map: Record<string, TopicMasteryScore> = {};

  DSA_TOPICS.forEach(topic => {
    map[topic] = {
      topicId: topic,
      topicName: topic,
      score: 15, // Base starting baseline
      level: 'novice',
      attempts: 0,
      correctCount: 0,
      incorrectCount: 0,
      firstTryCount: 0,
      hintsUsedCount: 0,
      evidence: ['Initial topic enrollment.'],
      lastUpdated: Date.now()
    };
  });

  return map;
}

export const createInitialMasteryMap = getInitialMasteryMap;

export function calculateMasteryLevel(score: number): MasteryLevel {
  if (score >= 85) return 'master';
  if (score >= 65) return 'expert';
  if (score >= 40) return 'practitioner';
  return 'novice';
}

/**
 * Updates topic mastery score based on answer correctness, difficulty, hints, and comeback proof.
 * Bounded strictly between 0 and 100.
 */
export function updateTopicMastery(
  current: TopicMasteryScore,
  isCorrect: boolean,
  difficulty: DifficultyLevel,
  isFirstAttempt: boolean,
  isRecovery: boolean,
  hintUsed: boolean
): TopicMasteryScore {
  const attempts = current.attempts + 1;
  const correctCount = current.correctCount + (isCorrect ? 1 : 0);
  const incorrectCount = current.incorrectCount + (isCorrect ? 0 : 1);
  const firstTryCount = current.firstTryCount + (isCorrect && isFirstAttempt ? 1 : 0);
  const hintsUsedCount = current.hintsUsedCount + (hintUsed ? 1 : 0);

  let delta = 0;
  const newEvidence = [...current.evidence];

  if (isCorrect) {
    // Base gain by difficulty
    let baseGain = 8;
    if (difficulty === 'medium') baseGain = 12;
    if (difficulty === 'hard') baseGain = 18;

    // Bonus for first attempt
    if (isFirstAttempt) {
      baseGain += 4;
    }

    // Bonus for recovery after a mistake
    if (isRecovery) {
      baseGain += 8;
      newEvidence.unshift(`Recovered with comeback answer on ${difficulty} challenge.`);
    }

    // Slight reduction if hint was used
    if (hintUsed) {
      baseGain = Math.max(4, baseGain - 4);
    }

    // Anti-inflation scaling: higher scores require more evidence
    if (current.score >= 80) {
      baseGain = Math.round(baseGain * 0.5);
    } else if (current.score >= 60) {
      baseGain = Math.round(baseGain * 0.75);
    }

    delta = baseGain;
    if (isFirstAttempt && !isRecovery) {
      newEvidence.unshift(`Solved ${difficulty} question on first attempt without hints.`);
    }
  } else {
    // Demonstrated misconception: slight decay
    delta = -6;
    newEvidence.unshift(`Misconception demonstrated on ${difficulty} challenge.`);
  }

  const newScore = Math.max(0, Math.min(100, current.score + delta));
  const newLevel = calculateMasteryLevel(newScore);

  return {
    ...current,
    score: newScore,
    level: newLevel,
    attempts,
    correctCount,
    incorrectCount,
    firstTryCount,
    hintsUsedCount,
    evidence: newEvidence.slice(0, 5), // Keep latest 5 evidence records
    lastUpdated: Date.now()
  };
}
