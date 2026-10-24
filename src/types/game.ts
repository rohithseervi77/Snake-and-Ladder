export type StageId = 
  | 'foundations'
  | 'arrays_strings'
  | 'linear_structures'
  | 'search_sort'
  | 'trees_heaps'
  | 'hashing_recursion'
  | 'graphs'
  | 'greedy_dp'
  | 'advanced_dsa'
  | 'mastery';

export type SquareType = 'normal' | 'checkpoint' | 'ladder_start' | 'ladder_end' | 'snake_head' | 'snake_tail' | 'start' | 'finish';

export interface SnakeOrLadder {
  id: string;
  type: 'snake' | 'ladder';
  from: number; // For snake: head (higher); for ladder: bottom (lower)
  to: number;   // For snake: tail (lower); for ladder: top (higher)
  title: string;
  description: string;
  pedagogicalReason: string;
}

export interface ActivityRecord {
  id: string;
  timestamp: number;
  type: 'ladder' | 'snake' | 'checkpoint' | 'challenge' | 'stage_completed';
  square: number;
  title: string;
  detail: string;
  scoreDelta: number;
}

export type AutoplaySpeed = 1 | 2 | 4;

export interface AutoplayConfig {
  isRunning: boolean;
  isPaused: boolean;
  speed: AutoplaySpeed;
  mode: 'demonstration' | 'fast_forward';
}

export interface GameSettings {
  soundEnabled: boolean;
  soundVolume: number; // 0 to 1
  reducedMotion: boolean;
  autoOpenChallenge: boolean;
  difficulty: 'beginner' | 'intermediate' | 'interview_ready';
}
