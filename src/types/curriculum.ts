import { StageId, SquareType } from './game';

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

export type SquareColorCategory = 
  | 'emerald' // Programming Foundations & Basic Arrays
  | 'amber'   // Recursion & Math & Dynamic Programming
  | 'purple'  // Linked Lists, Stacks, Queues, Strings
  | 'blue'    // Searching, Sorting, Algorithms
  | 'teal'    // Trees, BST, Heaps, Graph Theory
  | 'rose'    // Snakes / Debugging Edge Cases
  | 'indigo'  // Advanced DSA (Trie, Segment Trees, DSU)
  | 'gold';   // Milestones, Masteries, Checkpoints

export interface SquareMetadata {
  id: number;
  title: string;
  topic: string;
  subtopic: string;
  stage: StageId;
  stageName: string;
  difficulty: DifficultyLevel;
  type: SquareType;
  isCheckpoint: boolean;
  checkpointTasks: string[];
  challengeIds: string[];
  colorCategory: SquareColorCategory;
  iconName: string;
  prerequisiteTopics: string[];
  summary: string;
  keyTakeaway: string;
}

export interface StageInfo {
  id: StageId;
  name: string;
  range: [number, number];
  color: string;
  description: string;
}
