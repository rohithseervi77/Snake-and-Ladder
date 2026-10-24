import { MisconceptionRecord, FutureEchoChallenge } from '../types/evolution';
import { Challenge } from '../types/challenge';

export function createMisconceptionRecord(
  topic: string,
  errorCategory: string,
  questionId: string,
  explanationShown: string,
  hintUsed: boolean
): MisconceptionRecord {
  return {
    id: `misc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    topic,
    errorCategory,
    questionId,
    timestamp: Date.now(),
    hintUsed,
    explanationShown,
    resolved: false
  };
}

export function generateEchoChallenge(
  misconception: MisconceptionRecord,
  currentTile: number
): FutureEchoChallenge {
  const scheduledTile = Math.min(100, currentTile + 6);

  const echoChallenge: Challenge = {
    id: `echo-${misconception.id}`,
    squareId: scheduledTile,
    title: `Future Echo: ${misconception.errorCategory.replace('_', ' ').toUpperCase()} Revisit`,
    topic: misconception.topic,
    subtopic: 'Targeted Remediation Variant',
    skillCategory: 'debugging',
    difficulty: 'medium',
    type: 'identify_edge_case',
    prompt: `FUTURE ECHO CHALLENGE: Earlier you encountered an issue with ${misconception.errorCategory.replace('_', ' ')} in ${misconception.topic}. In the updated scenario below, identify the condition that guarantees correctness:`,
    options: [
      `Enforce rigorous ${misconception.errorCategory.replace('_', ' ')} guarding before state modification`,
      'Bypass boundary validations and rely on implicit runtime catching',
      'Allocate redundant global memory buffers without index bounds',
      'Disable strict typing checks'
    ],
    correctOptionIndex: 0,
    hints: [
      `Remember the earlier lesson: ${misconception.explanationShown.substring(0, 100)}...`,
      'Focus on the invariant that was previously violated.'
    ],
    explanation: `Excellent comeback! You successfully resolved the earlier ${misconception.errorCategory.replace('_', ' ')} vulnerability and reinforced your conceptual mastery!`,
    tags: ['future-echo', 'recovery', misconception.topic]
  };

  return {
    id: `echo-event-${misconception.id}`,
    misconceptionId: misconception.id,
    originalTopic: misconception.topic,
    errorCategory: misconception.errorCategory,
    challenge: echoChallenge,
    active: true,
    scheduledTile
  };
}
