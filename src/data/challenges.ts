import { Challenge } from '../types/challenge';
import { CourseOutcome } from '../types/curriculum';
import { ALL_CURRICULUM_CHALLENGES } from './challenges/index';
import { SQUARE_MAP } from './curriculum100';

export const CHALLENGES: Challenge[] = ALL_CURRICULUM_CHALLENGES;
export const BASE_CHALLENGES: Challenge[] = ALL_CURRICULUM_CHALLENGES;

export const CHALLENGE_MAP = new Map<string, Challenge>();
export const SQUARE_CHALLENGES_MAP = new Map<number, Challenge[]>();

CHALLENGES.forEach(c => {
  CHALLENGE_MAP.set(c.id, c);
  const existing = SQUARE_CHALLENGES_MAP.get(c.squareId) || [];
  existing.push(c);
  SQUARE_CHALLENGES_MAP.set(c.squareId, existing);
});

export class ChallengeRegistry {
  private attemptedIds: Set<string>;

  constructor(initialAttempted: string[] = []) {
    this.attemptedIds = new Set(initialAttempted);
  }

  public recordAttempt(challengeId: string): void {
    this.attemptedIds.add(challengeId);
  }

  public markAttempted(challengeId: string, _squareId?: number): void {
    this.attemptedIds.add(challengeId);
  }

  public getChallengeForSquare(
    squareId: number,
    allowRevision: boolean = true,
    difficultyMode: string = 'intermediate'
  ): Challenge {
    // 1. Get pre-authored challenges for this square
    const squareChallenges = SQUARE_CHALLENGES_MAP.get(squareId) || [];

    if (squareChallenges.length > 0) {
      let candidates = [...squareChallenges];

      // Filter by difficulty mode if multiple exist
      if (difficultyMode === 'beginner') {
        const easyMed = candidates.filter(c => c.difficulty === 'easy' || c.difficulty === 'medium');
        if (easyMed.length > 0) candidates = easyMed;
      } else if (difficultyMode === 'interview_ready' || difficultyMode === 'advanced') {
        const hardExp = candidates.filter(c => c.difficulty === 'hard' || c.difficulty === 'medium');
        if (hardExp.length > 0) candidates = hardExp;
      }

      // Find unattempted
      const unattempted = candidates.filter(c => !this.attemptedIds.has(c.id));
      if (unattempted.length > 0) {
        return unattempted[0];
      }

      // If all candidates are attempted, provide an unattempted synthesized question before looping back
      const synth = this.synthesizeSquareChallenge(squareId);
      if (!this.attemptedIds.has(synth.id)) {
        return synth;
      }

      if (allowRevision) {
        return candidates[0]; // Interleaved revision
      }
    }

    // 2. Synthesize fallback tailored challenge for this square's topic if ever needed
    return this.synthesizeSquareChallenge(squareId);
  }

  public synthesizeSquareChallenge(squareId: number): Challenge {
    const existing = CHALLENGE_MAP.get(`gen-${squareId}`);
    if (existing) return existing;

    const sq = SQUARE_MAP.get(squareId);
    const synth: Challenge = {
      id: `gen-${squareId}`,
      squareId,
      co: sq?.co || 'CO1',
      title: `${sq?.title || 'DSA'} Question`,
      topic: sq?.topic || 'DSA Concept',
      subtopic: sq?.subtopic || 'Core Concept',
      skillCategory: 'conceptual',
      difficulty: squareId <= 30 ? 'easy' : squareId <= 70 ? 'medium' : 'hard',
      type: 'conceptual_mcq',
      prompt: `Regarding ${sq?.title || 'this DSA topic'}: Which statement correctly identifies its core algorithmic property and complexity?`,
      options: [
        sq?.keyTakeaway || 'Maintains strict correctness while guaranteeing optimal time complexity',
        'Executes nested iterations over all permutations with unbounded memory',
        'Bypasses base cases and runs indefinitely',
        'Has no deterministic termination conditions'
      ],
      correctOptionIndex: 0,
      hints: [
        'Think about the foundational property taught on this square.',
        sq?.summary || 'Review the core syllabus takeaway.'
      ],
      explanation: sq?.keyTakeaway || 'This concept enforces correctness and bounded time complexity.',
      tags: ['syllabus', sq?.stage || 'dsa', `square-${squareId}`]
    };

    CHALLENGE_MAP.set(synth.id, synth);
    return synth;
  }

  /**
   * Returns all questions belonging to a specific Course Outcome (CO1, CO2, CO3, CO4).
   */
  public getQuestionsByCO(co: CourseOutcome): Challenge[] {
    return CHALLENGES.filter(c => c.co === co);
  }

  /**
   * Returns 10 randomized or sequential questions for Practice Mode on a specific CO.
   */
  public getPracticeQuestions(co: CourseOutcome, count: number = 10): Challenge[] {
    const pool = this.getQuestionsByCO(co);
    if (pool.length <= count) return [...pool];
    // Shuffle pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  /**
   * Returns randomized questions across the full syllabus for Exam Mode.
   */
  public getExamQuestions(count: number = 20): Challenge[] {
    const shuffled = [...CHALLENGES].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }
}
