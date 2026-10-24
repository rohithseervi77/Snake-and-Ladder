import { Challenge } from './challenge';

export type RouteType = 'knowledge' | 'challenge' | 'risk';

export interface RouteOption {
  id: string;
  type: RouteType;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  movementReward: string;
  possiblePenalty: string;
  unlockRequirements: {
    minMastery?: number;
    requiredTopic?: string;
    minEnergy?: number;
    prerequisiteTile?: number;
  };
  isUnlocked: boolean;
  lockedReason?: string;
}

export type MasteryLevel = 'novice' | 'practitioner' | 'expert' | 'master';

export interface TopicMasteryScore {
  topicId: string;
  topicName: string;
  score: number; // 0 to 100
  level: MasteryLevel;
  attempts: number;
  correctCount: number;
  incorrectCount: number;
  firstTryCount: number;
  hintsUsedCount: number;
  evidence: string[];
  lastUpdated: number;
}

export type SnakeMisconceptionType = 
  | 'off_by_one'
  | 'infinite_loop'
  | 'base_case'
  | 'wrong_complexity'
  | 'overflow'
  | 'greedy_trap'
  | 'null_pointer';

export interface SnakeRecoveryChoice {
  id: 'accept' | 'concept' | 'debugging';
  title: string;
  description: string;
  challengeType: 'none' | 'concept' | 'debugging';
  recoveryDelta: number; // Tiles recovered (+0, +1, +3)
  penaltyDelta: number;  // Standard slide downward
  challengeId?: string;
}

export interface IntelligentSnake {
  id: string;
  from: number;
  to: number;
  name: string; // e.g. "Off-by-One Snake"
  misconceptionType: SnakeMisconceptionType;
  explanation: string;
  codeSnippet: string;
  choices: SnakeRecoveryChoice[];
}

export interface OptimizationLadderChoice {
  id: string;
  from: number;
  to: number;
  title: string;
  originalProblem: string;
  safeOption: {
    title: string;
    description: string;
    destinationTile: number;
    challengeId: string;
    rewardDescription: string;
  };
  expertOption: {
    title: string;
    description: string;
    destinationTile: number;
    bonusTiles: number;
    failurePenalty: number;
    challengeId: string;
    rewardDescription: string;
    penaltyDescription: string;
  };
}

export interface MisconceptionRecord {
  id: string;
  topic: string;
  errorCategory: string;
  questionId: string;
  timestamp: number;
  hintUsed: boolean;
  explanationShown: string;
  resolved: boolean;
  resolvedTimestamp?: number;
}

export interface FutureEchoChallenge {
  id: string;
  misconceptionId: string;
  originalTopic: string;
  errorCategory: string;
  challenge: Challenge;
  active: boolean;
  scheduledTile: number;
}

export type BoardMutationType = 
  | 'memory_leak'
  | 'optimization_window'
  | 'complexity_storm'
  | 'graph_portal'
  | 'recursion_loop'
  | 'knowledge_revival';

export interface BoardMutationEvent {
  id: string;
  type: BoardMutationType;
  title: string;
  description: string;
  triggerTurn: number;
  challenge: Challenge;
  bonusReward: string;
  penaltyRisk: string;
  bonusTiles: number;
  penaltyTiles: number;
  portalDestination?: number;
}

export type BossRegionId = 1 | 2 | 3 | 4 | 5;

export interface BossStep {
  stepNumber: number;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface BossBattle {
  id: string;
  region: BossRegionId;
  regionName: string; // e.g. "Array Wilderness (Tiles 1–20)"
  tileNumber: number; // 20, 40, 60, 80, 100
  bossName: string;   // e.g. "Array Wilderness Colossus"
  title: string;
  lore: string;
  steps: BossStep[];
  rewardXp: number;
  rewardCoins: number;
  rewardEnergy: number;
  defeated: boolean;
}

export interface BugBotScenario {
  id: string;
  title: string;
  topic: string;
  buggyCode: string;
  bugExplanation: string;
  errorCategory: string;
  rivalTaunt: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  rewardXp: number;
  rewardCoins: number;
  rewardEnergy: number;
}

export interface EnergyAbility {
  id: 'hint' | 'shield' | 'reroll' | 'debug_scan' | 'ladder_boost' | 'second_chance';
  name: string;
  description: string;
  cost: number;
  iconName: string;
  isUnlocked: boolean;
}
