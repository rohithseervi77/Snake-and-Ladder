import { SkillCategory } from './challenge';

export interface SkillMasteryRecord {
  attempts: number;
  correct: number;
  incorrect: number;
  accuracy: number; // 0 to 1
  level: 'novice' | 'learning' | 'proficient' | 'mastered';
}

export interface TopicMasteryRecord {
  topicId: string;
  topicName: string;
  attempts: number;
  correct: number;
  incorrect: number;
  accuracy: number;
  lastPracticed: number; // timestamp
  streak: number;
  commonErrors: string[];
  skills: Record<SkillCategory, SkillMasteryRecord>;
}

export interface RevisionItem {
  id: string;
  topicId: string;
  topicName: string;
  squareId: number;
  intervalDays: number;
  repetitionCount: number;
  easeFactor: number; // SM-2 parameter (default 2.5)
  nextDueDate: number; // timestamp
  lastReviewed: number; // timestamp
  isDue: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface AdaptiveRecommendation {
  id: string;
  type: 'weakness_remediation' | 'revision_reinforcement' | 'challenge_advancement' | 'prerequisite_review';
  topicId: string;
  topicName: string;
  targetSquareId: number;
  targetSkill: SkillCategory;
  headline: string;
  explanation: string; // Explainable reasoning
  evidence: string;    // e.g. "Struggled with boundary conditions in 2 recent attempts"
  recommendedAction: string;
  timestamp: number;
}

export interface LearnerProfile {
  userId: string;
  displayName: string;
  level: number;
  totalXp: number;
  totalAttempts: number;
  totalCorrect: number;
  overallAccuracy: number;
  laddersClimbed: number;
  snakesEncountered: number;
  checkpointsPassed: number;
  topicMasteries: Record<string, TopicMasteryRecord>;
  revisionQueue: RevisionItem[];
  recentRecommendations: AdaptiveRecommendation[];
  attemptHistory: {
    challengeId: string;
    topic: string;
    squareId: number;
    isCorrect: boolean;
    timestamp: number;
    skillCategory: SkillCategory;
  }[];
}
