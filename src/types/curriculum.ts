import { StageId, SquareType } from './game';

export type CourseOutcome = 'CO1' | 'CO2' | 'CO3' | 'CO4';

export interface CurriculumTopic {
  id: string;
  co: CourseOutcome;
  title: string;
  subtopics: string[];
  boardRange: [number, number];
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

export type SquareColorCategory = 
  | 'emerald' // Mathematical foundations & Algorithm analysis
  | 'amber'   // Recurrence relations, Master theorem, Queue
  | 'purple'  // Stacks, Parentheses, Linked lists
  | 'blue'    // Sorting, Searching, Complexity
  | 'teal'    // Trees, BST, AVL
  | 'rose'    // Snakes / Debugging Edge Cases
  | 'indigo'  // Graphs, Shortest path, MST, Huffman
  | 'gold';   // Checkpoints, Milestones, Grandmaster

export interface SquareMetadata {
  id: number;
  co: CourseOutcome;
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
  co: CourseOutcome;
  range: [number, number];
  color: string;
  description: string;
}
