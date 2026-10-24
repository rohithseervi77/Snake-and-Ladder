import { describe, it, expect } from 'vitest';
import { 
  createInitialLearnerProfile, 
  recordChallengeAttempt, 
  generateAdaptiveRecommendations 
} from '../engine/adaptiveEngine';
import { 
  updateSpacedInterval, 
  scheduleTopicRevision 
} from '../engine/spacedRevision';
import { ChallengeAttemptResult } from '../types/challenge';
import { RevisionItem } from '../types/learner';

describe('Adaptive Learning Engine & Spaced Repetition', () => {
  it('initializes a fresh learner profile', () => {
    const profile = createInitialLearnerProfile('user-1', 'Coder');
    expect(profile.level).toBe(1);
    expect(profile.totalXp).toBe(0);
    expect(profile.totalAttempts).toBe(0);
    expect(profile.attemptHistory.length).toBe(0);
  });

  it('updates mastery record accurately upon correct answer', () => {
    let profile = createInitialLearnerProfile('user-1', 'Coder');

    const attempt: ChallengeAttemptResult = {
      challengeId: 'c-1-mcq',
      squareId: 1,
      isCorrect: true,
      scoreAwarded: 50,
      timeSpentSeconds: 10,
      hintUsed: false,
      skillCategory: 'conceptual',
      topic: 'Arrays',
      feedback: 'Correct'
    };

    profile = recordChallengeAttempt(profile, attempt);
    expect(profile.totalAttempts).toBe(1);
    expect(profile.totalCorrect).toBe(1);
    expect(profile.totalXp).toBe(50);
    expect(profile.overallAccuracy).toBe(1);

    const arrayTopic = profile.topicMasteries['Arrays'];
    expect(arrayTopic).toBeDefined();
    expect(arrayTopic.attempts).toBe(1);
    expect(arrayTopic.correct).toBe(1);
    expect(arrayTopic.skills.conceptual.attempts).toBe(1);
    expect(arrayTopic.skills.conceptual.correct).toBe(1);
  });

  it('diagnoses skill weakness and generates explainable remediation', () => {
    let profile = createInitialLearnerProfile('user-1', 'Coder');

    // Simulate 2 failed debugging attempts
    for (let i = 0; i < 2; i++) {
      profile = recordChallengeAttempt(profile, {
        challengeId: `c-debug-${i}`,
        squareId: 14,
        isCorrect: false,
        scoreAwarded: 0,
        timeSpentSeconds: 20,
        hintUsed: true,
        skillCategory: 'debugging',
        topic: 'Functions & Scope',
        feedback: 'Scope shadowing error'
      });
    }

    expect(profile.topicMasteries['Functions & Scope'].skills.debugging.accuracy).toBe(0);
    const recs = generateAdaptiveRecommendations(profile);

    expect(recs.length).toBeGreaterThan(0);
    const rec = recs.find(r => r.targetSkill === 'debugging');
    expect(rec).toBeDefined();
    expect(rec?.type).toBe('weakness_remediation');
    expect(rec?.explanation.toLowerCase()).toContain('recommended');
  });

  it('adjusts spaced repetition intervals using SM-2 algorithm', () => {
    let item: RevisionItem = {
      id: 'rev-arrays',
      topicId: 'Arrays',
      topicName: 'Arrays',
      squareId: 1,
      intervalDays: 1,
      repetitionCount: 1,
      easeFactor: 2.5,
      nextDueDate: Date.now() + 86400000,
      lastReviewed: Date.now(),
      isDue: false,
      priority: 'high'
    };

    // Quality 5 (perfect recall) -> should increase interval
    item = updateSpacedInterval(item, 5);
    expect(item.repetitionCount).toBe(2);
    expect(item.intervalDays).toBe(3);

    // Another successful recall
    item = updateSpacedInterval(item, 5);
    expect(item.repetitionCount).toBe(3);
    expect(item.intervalDays).toBeGreaterThan(3);

    // Failure (quality 1) -> resets repetition
    item = updateSpacedInterval(item, 1);
    expect(item.repetitionCount).toBe(0);
    expect(item.intervalDays).toBe(1);
  });

  it('schedules new topics into the revision queue', () => {
    const queue = scheduleTopicRevision([], 'Linked Lists', 22, true);
    expect(queue.length).toBe(1);
    expect(queue[0].topicId).toBe('Linked Lists');
    expect(queue[0].intervalDays).toBe(2);
  });
});
