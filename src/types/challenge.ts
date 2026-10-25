import { DifficultyLevel, CourseOutcome } from './curriculum';

export type ChallengeType =
  | 'conceptual_mcq'
  | 'output_prediction'
  | 'dry_run_trace'
  | 'code_trace'
  | 'find_bug'
  | 'bug_hunt'
  | 'identify_edge_case'
  | 'time_complexity'
  | 'space_complexity'
  | 'complexity_choice'
  | 'complete_code'
  | 'select_data_structure'
  | 'optimize_algorithm'
  | 'write_solution'
  | 'compare_approaches';

export type SkillCategory = 
  | 'conceptual'
  | 'tracing'
  | 'dry_run'
  | 'implementation'
  | 'complexity'
  | 'optimization'
  | 'debugging'
  | 'numerical'
  | 'compare_approaches'
  | 'code_trace';

export interface CodeSnippet {
  language: 'typescript' | 'python' | 'cpp' | 'java';
  code: string;
}

export interface OptimizationStep {
  approachTitle: string;
  timeComplexity: string;
  spaceComplexity: string;
  codeSnippet: string;
  explanation: string;
  isOptimal: boolean;
}

export interface BugLocation {
  line: number;
  buggyCode: string;
  fixedCode: string;
  errorCategory: 'off_by_one' | 'boundary_condition' | 'null_pointer' | 'missing_base_case' | 'infinite_loop' | 'wrong_data_structure' | 'unhandled_duplicate';
  explanation: string;
}

export interface Challenge {
  id: string;
  squareId: number;
  co?: CourseOutcome;
  title: string;
  topic: string;
  subtopic: string;
  skillCategory: SkillCategory;
  difficulty: DifficultyLevel;
  type: ChallengeType;
  prompt: string;
  codeSnippet?: string;
  options?: string[]; // For multiple choice / selection
  correctOptionIndex?: number;
  correctAnswerText?: string;
  
  // Specific data for optimization ladders
  optimizationComparison?: {
    bruteForce: OptimizationStep;
    optimal: OptimizationStep;
    tradeOffSummary: string;
    whyOptimalWorks: string;
  };
  
  // Specific data for debugging snakes
  bugInfo?: BugLocation;
  
  // Tracing / dry run specific data
  traceSteps?: {
    step: number;
    variables: Record<string, string | number>;
    explanation: string;
  }[];
  
  // Edge cases
  edgeCases?: string[];
  
  // Complexity breakdown
  complexityInfo?: {
    time: string;
    space: string;
    worstCase: string;
    averageCase?: string;
    bestCase?: string;
    rationale: string;
  };
  
  hints: string[];
  explanation: string;
  learningObjective?: string;
  commonMistake?: string;
  tags: string[];
}

export interface ChallengeAttemptResult {
  challengeId: string;
  squareId: number;
  isCorrect: boolean;
  selectedOptionIndex?: number;
  submittedAnswer?: string;
  scoreAwarded: number;
  timeSpentSeconds: number;
  hintUsed: boolean;
  skillCategory: SkillCategory;
  topic: string;
  feedback: string;
}
