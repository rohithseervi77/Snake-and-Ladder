import { RevisionItem } from '../types/learner';
import { SQUARE_MAP } from '../data/curriculum100';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Updates SM-2 spaced repetition parameters when a topic is reviewed.
 * quality: 0-5 (5 = perfect recall, 3 = remembered with effort, 0 = complete blackout)
 */
export function updateSpacedInterval(item: RevisionItem, quality: number): RevisionItem {
  let { repetitionCount, intervalDays, easeFactor } = item;

  // Update ease factor (SM-2 formula)
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

  if (quality < 3) {
    // Reset repetitions on failure
    repetitionCount = 0;
    intervalDays = 1;
  } else {
    repetitionCount += 1;
    if (repetitionCount === 1) {
      intervalDays = 1;
    } else if (repetitionCount === 2) {
      intervalDays = 3;
    } else {
      intervalDays = Math.round(intervalDays * easeFactor);
    }
  }

  const now = Date.now();
  const nextDueDate = now + intervalDays * ONE_DAY_MS;

  return {
    ...item,
    repetitionCount,
    intervalDays,
    easeFactor,
    lastReviewed: now,
    nextDueDate,
    isDue: false,
    priority: intervalDays <= 2 ? 'high' : intervalDays <= 7 ? 'medium' : 'low'
  };
}

/**
 * Creates or schedules a new topic into the revision queue
 */
export function scheduleTopicRevision(
  queue: RevisionItem[],
  topicId: string,
  squareId: number,
  isCorrect: boolean
): RevisionItem[] {
  const existingIdx = queue.findIndex(item => item.topicId === topicId);
  const quality = isCorrect ? 4 : 1;

  if (existingIdx >= 0) {
    const updatedItem = updateSpacedInterval(queue[existingIdx], quality);
    const updatedQueue = [...queue];
    updatedQueue[existingIdx] = updatedItem;
    return updatedQueue;
  }

  const sq = SQUARE_MAP.get(squareId);
  const topicName = sq?.topic || topicId;

  const newItem: RevisionItem = {
    id: `rev-${topicId}`,
    topicId,
    topicName,
    squareId,
    intervalDays: isCorrect ? 2 : 1,
    repetitionCount: isCorrect ? 1 : 0,
    easeFactor: 2.5,
    nextDueDate: Date.now() + (isCorrect ? 2 : 1) * ONE_DAY_MS,
    lastReviewed: Date.now(),
    isDue: false,
    priority: isCorrect ? 'medium' : 'high'
  };

  return [...queue, newItem];
}

/**
 * Refreshes isDue flags across the queue.
 */
export function getDueRevisionItems(queue: RevisionItem[]): RevisionItem[] {
  const now = Date.now();
  return queue.map(item => ({
    ...item,
    isDue: item.nextDueDate <= now
  })).filter(item => item.isDue);
}
