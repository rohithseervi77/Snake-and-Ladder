import { LearnerProfile, TopicMasteryRecord, AdaptiveRecommendation, SkillMasteryRecord } from '../types/learner';
import { ChallengeAttemptResult, SkillCategory } from '../types/challenge';
import { CURRICULUM_100, SQUARE_MAP } from '../data/curriculum100';

const DEFAULT_SKILLS: Record<SkillCategory, SkillMasteryRecord> = {
  conceptual: { attempts: 0, correct: 0, incorrect: 0, accuracy: 1, level: 'novice' },
  tracing: { attempts: 0, correct: 0, incorrect: 0, accuracy: 1, level: 'novice' },
  dry_run: { attempts: 0, correct: 0, incorrect: 0, accuracy: 1, level: 'novice' },
  implementation: { attempts: 0, correct: 0, incorrect: 0, accuracy: 1, level: 'novice' },
  complexity: { attempts: 0, correct: 0, incorrect: 0, accuracy: 1, level: 'novice' },
  optimization: { attempts: 0, correct: 0, incorrect: 0, accuracy: 1, level: 'novice' },
  debugging: { attempts: 0, correct: 0, incorrect: 0, accuracy: 1, level: 'novice' },
  numerical: { attempts: 0, correct: 0, incorrect: 0, accuracy: 1, level: 'novice' },
  compare_approaches: { attempts: 0, correct: 0, incorrect: 0, accuracy: 1, level: 'novice' },
  code_trace: { attempts: 0, correct: 0, incorrect: 0, accuracy: 1, level: 'novice' }
};

export function createInitialLearnerProfile(userId: string = 'guest-dev', displayName: string = 'Developer'): LearnerProfile {
  return {
    userId,
    displayName,
    level: 1,
    totalXp: 0,
    totalAttempts: 0,
    totalCorrect: 0,
    overallAccuracy: 1,
    laddersClimbed: 0,
    snakesEncountered: 0,
    checkpointsPassed: 0,
    topicMasteries: {},
    revisionQueue: [],
    recentRecommendations: [],
    attemptHistory: []
  };
}

export function evaluateSkillLevel(attempts: number, accuracy: number): SkillMasteryRecord['level'] {
  if (attempts < 2) return 'novice';
  if (accuracy >= 0.85 && attempts >= 4) return 'mastered';
  if (accuracy >= 0.65) return 'proficient';
  return 'learning';
}

/**
 * Updates learner profile deterministically upon completing an assessment attempt.
 */
export function recordChallengeAttempt(
  profile: LearnerProfile,
  attempt: ChallengeAttemptResult
): LearnerProfile {
  const updated = { ...profile };
  const topicId = attempt.topic;

  // 1. Overall stats
  updated.totalAttempts += 1;
  if (attempt.isCorrect) {
    updated.totalCorrect += 1;
    updated.totalXp += attempt.scoreAwarded;
  }
  updated.overallAccuracy = updated.totalCorrect / updated.totalAttempts;
  updated.level = Math.max(1, Math.floor(updated.totalXp / 150) + 1);

  // 2. Topic stats
  const existingTopic: TopicMasteryRecord = updated.topicMasteries[topicId] || {
    topicId,
    topicName: topicId,
    attempts: 0,
    correct: 0,
    incorrect: 0,
    accuracy: 1,
    lastPracticed: Date.now(),
    streak: 0,
    commonErrors: [],
    skills: { ...DEFAULT_SKILLS }
  };

  const newTopicAttempts = existingTopic.attempts + 1;
  const newTopicCorrect = existingTopic.correct + (attempt.isCorrect ? 1 : 0);
  const newTopicIncorrect = existingTopic.incorrect + (attempt.isCorrect ? 0 : 1);
  const newTopicAccuracy = newTopicCorrect / newTopicAttempts;
  const newStreak = attempt.isCorrect ? existingTopic.streak + 1 : 0;

  // Update specific skill
  const skill = attempt.skillCategory;
  const existingSkill = existingTopic.skills[skill] || { attempts: 0, correct: 0, incorrect: 0, accuracy: 1, level: 'novice' };
  const newSkillAttempts = existingSkill.attempts + 1;
  const newSkillCorrect = existingSkill.correct + (attempt.isCorrect ? 1 : 0);
  const newSkillIncorrect = existingSkill.incorrect + (attempt.isCorrect ? 0 : 1);
  const newSkillAccuracy = newSkillCorrect / newSkillAttempts;
  const newSkillLevel = evaluateSkillLevel(newSkillAttempts, newSkillAccuracy);

  const updatedSkills = {
    ...existingTopic.skills,
    [skill]: {
      attempts: newSkillAttempts,
      correct: newSkillCorrect,
      incorrect: newSkillIncorrect,
      accuracy: newSkillAccuracy,
      level: newSkillLevel
    }
  };

  const commonErrors = [...existingTopic.commonErrors];
  if (!attempt.isCorrect && attempt.feedback && !commonErrors.includes(attempt.feedback)) {
    commonErrors.push(attempt.feedback);
    if (commonErrors.length > 5) commonErrors.shift();
  }

  updated.topicMasteries = {
    ...updated.topicMasteries,
    [topicId]: {
      ...existingTopic,
      attempts: newTopicAttempts,
      correct: newTopicCorrect,
      incorrect: newTopicIncorrect,
      accuracy: newTopicAccuracy,
      lastPracticed: Date.now(),
      streak: newStreak,
      commonErrors,
      skills: updatedSkills
    }
  };

  // 3. Append to attempt history
  updated.attemptHistory = [
    {
      challengeId: attempt.challengeId,
      topic: attempt.topic,
      squareId: attempt.squareId,
      isCorrect: attempt.isCorrect,
      timestamp: Date.now(),
      skillCategory: attempt.skillCategory
    },
    ...updated.attemptHistory.slice(0, 49) // retain last 50 attempts
  ];

  // 4. Generate Explainable Recommendations
  updated.recentRecommendations = generateAdaptiveRecommendations(updated);

  return updated;
}

/**
 * Produces explainable recommendations based on learner strengths and diagnosed weaknesses.
 */
export function generateAdaptiveRecommendations(profile: LearnerProfile): AdaptiveRecommendation[] {
  const recommendations: AdaptiveRecommendation[] = [];

  // Check for skill weaknesses
  for (const [topicId, topicRecord] of Object.entries(profile.topicMasteries)) {
    for (const [skillKey, skillRecord] of Object.entries(topicRecord.skills)) {
      const skill = skillKey as SkillCategory;
      if (skillRecord.attempts >= 2 && skillRecord.accuracy < 0.6) {
        // Find matching square in curriculum
        const targetSquare = CURRICULUM_100.find(s => s.topic === topicId) || CURRICULUM_100[0];
        
        let headline = `Remediate ${skill.toUpperCase()} in ${topicId}`;
        let explanation = `Recommended because your recent accuracy in ${skill} is ${(skillRecord.accuracy * 100).toFixed(0)}% across ${skillRecord.attempts} attempts.`;
        let action = `Complete a targeted ${skill} dry-run exercise on Square ${targetSquare.id}.`;

        if (skill === 'debugging') {
          headline = `Debug Edge-Cases in ${topicId}`;
          explanation = `Recommended because you stumbled on edge-case conditions in your recent ${topicId} debugging attempts.`;
          action = `Review loop boundary invariants on Square ${targetSquare.id}.`;
        } else if (skill === 'complexity') {
          headline = `Strengthen Asymptotic Complexity in ${topicId}`;
          explanation = `Recommended because algorithm implementation succeeded, but Big-O complexity analysis was incorrect.`;
          action = `Practice Big-O summation and call stack space analysis on Square ${targetSquare.id}.`;
        }

        recommendations.push({
          id: `rec-${topicId}-${skill}-${Date.now()}`,
          type: 'weakness_remediation',
          topicId,
          topicName: topicId,
          targetSquareId: targetSquare.id,
          targetSkill: skill,
          headline,
          explanation,
          evidence: `${skillRecord.incorrect} errors in ${skillRecord.attempts} recent attempts (${(skillRecord.accuracy * 100).toFixed(0)}% accuracy)`,
          recommendedAction: action,
          timestamp: Date.now()
        });
      }
    }
  }

  // If no weaknesses, recommend advancement
  if (recommendations.length === 0) {
    const highestAttemptedSquare = profile.attemptHistory[0]?.squareId || 1;
    const nextSquareId = Math.min(100, highestAttemptedSquare + 1);
    const nextSquare = SQUARE_MAP.get(nextSquareId) || CURRICULUM_100[0];

    recommendations.push({
      id: `rec-advance-${nextSquareId}`,
      type: 'challenge_advancement',
      topicId: nextSquare.topic,
      topicName: nextSquare.topic,
      targetSquareId: nextSquareId,
      targetSkill: 'implementation',
      headline: `Advance to Square ${nextSquareId}: ${nextSquare.title}`,
      explanation: `Recommended because your overall performance is strong (${(profile.overallAccuracy * 100).toFixed(0)}% accuracy). Ready for higher complexity concepts!`,
      evidence: `Consecutive accurate attempts with stable mastery.`,
      recommendedAction: `Roll the dice and conquer Square ${nextSquareId} (${nextSquare.subtopic}).`,
      timestamp: Date.now()
    });
  }

  return recommendations.slice(0, 3);
}
