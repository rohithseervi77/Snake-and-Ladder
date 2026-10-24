import { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  loadGameState, 
  saveGameState, 
  resetGameStorage, 
  PersistentGameState 
} from '../engine/storage';
import { 
  rollDice, 
  computeMovementPlan, 
  MovementPlan 
} from '../engine/gameEngine';
import { sound } from '../engine/soundEngine';
import { ChallengeRegistry } from '../data/challenges';
import { SQUARE_MAP, CURRICULUM_100 } from '../data/curriculum100';
import { Challenge, ChallengeAttemptResult } from '../types/challenge';
import { recordChallengeAttempt } from '../engine/adaptiveEngine';
import { scheduleTopicRevision } from '../engine/spacedRevision';
import { AutoplaySpeed } from '../types/game';

export function useGameState() {
  const [gameState, setGameState] = useState<PersistentGameState>(() => loadGameState());
  const [displayedPosition, setDisplayedPosition] = useState<number>(() => gameState.currentPosition);
  const [isRolling, setIsRolling] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [lastDiceRoll, setLastDiceRoll] = useState<number>(3);
  
  // Modals
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  const [isRevisionMode, setIsRevisionMode] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [isAdaptiveModalOpen, setIsAdaptiveModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState(false);

  // Autoplay
  const [isAutoplayRunning, setIsAutoplayRunning] = useState(false);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [autoplaySpeed, setAutoplaySpeed] = useState<AutoplaySpeed>(1);
  const autoplayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Challenge Registry with anti-repetition tracking
  const challengeRegistryRef = useRef<ChallengeRegistry>(
    new ChallengeRegistry(gameState.learnerProfile.attemptHistory.map(h => h.challengeId))
  );

  // Sync sound settings
  useEffect(() => {
    sound.setEnabled(gameState.settings.soundEnabled);
    sound.setVolume(gameState.settings.soundVolume);
  }, [gameState.settings.soundEnabled, gameState.settings.soundVolume]);

  // Sync persistence
  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  // Keep displayedPosition synced when gameState.currentPosition jumps directly
  useEffect(() => {
    if (!isMoving) {
      setDisplayedPosition(gameState.currentPosition);
    }
  }, [gameState.currentPosition, isMoving]);

  /**
   * Complete step-by-step movement animation along serpentine track.
   */
  const executeMovement = useCallback((plan: MovementPlan, isDemo: boolean = false) => {
    setIsMoving(true);
    const stepDelay = Math.max(90, Math.floor(280 / (isDemo ? autoplaySpeed : 1)));

    let currentStepIdx = 0;
    const steps = plan.intermediateSteps;

    const interval = setInterval(() => {
      if (currentStepIdx < steps.length) {
        const nextPos = steps[currentStepIdx];
        setDisplayedPosition(nextPos);
        sound.playMoveStep();
        currentStepIdx++;
      } else {
        clearInterval(interval);
        setIsMoving(false);

        // Final target reached
        setGameState(prev => {
          const newCompleted = Array.from(new Set([...prev.completedSquares, plan.finalPosition]));
          const newPassedCheckpoints = plan.stoppedAtCheckpoint && plan.checkpointSquareId
            ? Array.from(new Set([...prev.passedCheckpoints, plan.checkpointSquareId]))
            : prev.passedCheckpoints;

          let laddersClimbed = prev.laddersClimbed;
          let snakesEncountered = prev.snakesEncountered;
          let scoreDelta = 10;
          const activities = [...prev.recentActivities];

          if (plan.snakeOrLadderEncountered?.type === 'ladder') {
            laddersClimbed += 1;
            scoreDelta += 50;
            sound.playLadderClimb();
            confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
            activities.unshift({
              id: `act-ladder-${Date.now()}`,
              timestamp: Date.now(),
              type: 'ladder',
              square: plan.finalPosition,
              title: `Climbed Ladder at ${plan.targetSquareBeforeTransitions}!`,
              detail: `${plan.snakeOrLadderEncountered.title}: ${plan.snakeOrLadderEncountered.description}`,
              scoreDelta: 50
            });
          } else if (plan.snakeOrLadderEncountered?.type === 'snake') {
            snakesEncountered += 1;
            sound.playSnakeDrop();
            activities.unshift({
              id: `act-snake-${Date.now()}`,
              timestamp: Date.now(),
              type: 'snake',
              square: plan.finalPosition,
              title: `Slid down Snake at ${plan.targetSquareBeforeTransitions}!`,
              detail: `${plan.snakeOrLadderEncountered.title}: ${plan.snakeOrLadderEncountered.description}`,
              scoreDelta: 0
            });
          }

          if (plan.isGameFinished) {
            sound.playStageComplete();
            confetti({ particleCount: 100, spread: 100, origin: { y: 0.6 } });
            setIsVictoryModalOpen(true);
          }

          return {
            ...prev,
            currentPosition: plan.finalPosition,
            completedSquares: newCompleted,
            passedCheckpoints: newPassedCheckpoints,
            laddersClimbed,
            snakesEncountered,
            totalScore: prev.totalScore + scoreDelta,
            recentActivities: activities.slice(0, 30)
          };
        });

        // Open challenge if required
        const targetSquare = SQUARE_MAP.get(plan.finalPosition) || CURRICULUM_100[0];
        const challenge = challengeRegistryRef.current.getChallengeForSquare(targetSquare.id);

        if (!isDemo && gameState.settings.autoOpenChallenge) {
          setActiveChallenge(challenge);
          setIsRevisionMode(false);
          setIsChallengeOpen(true);
        }
      }
    }, stepDelay);
  }, [autoplaySpeed, gameState.settings.autoOpenChallenge]);

  /**
   * Main player dice roll handler
   */
  const handleRollDice = useCallback(() => {
    if (isRolling || isMoving || isAutoplayRunning) return;

    setIsRolling(true);
    sound.playDiceRoll();

    const rollValue = rollDice();
    setLastDiceRoll(rollValue);

    setTimeout(() => {
      setIsRolling(false);
      const passedSet = new Set(gameState.passedCheckpoints);
      const plan = computeMovementPlan(gameState.currentPosition, rollValue, passedSet);
      executeMovement(plan, false);
    }, 550);
  }, [isRolling, isMoving, isAutoplayRunning, gameState.currentPosition, gameState.passedCheckpoints, executeMovement]);

  /**
   * Start challenge on current or selected square
   */
  const handleOpenSquareChallenge = useCallback((squareId?: number) => {
    const targetId = squareId ?? gameState.currentPosition;
    const challenge = challengeRegistryRef.current.getChallengeForSquare(targetId);
    setActiveChallenge(challenge);
    setIsRevisionMode(false);
    setIsChallengeOpen(true);
  }, [gameState.currentPosition]);

  /**
   * Submit challenge answer
   */
  const handleCompleteChallenge = useCallback((result: ChallengeAttemptResult, isDemo: boolean = false) => {
    challengeRegistryRef.current.markAttempted(result.challengeId, result.squareId);

    if (result.isCorrect) {
      sound.playSuccess();
      if (!isDemo) {
        confetti({ particleCount: 20, spread: 45, origin: { y: 0.8 } });
      }
    } else {
      sound.playFailure();
    }

    if (!isDemo) {
      // Update real learner profile
      setGameState(prev => {
        const updatedProfile = recordChallengeAttempt(prev.learnerProfile, result);
        const updatedRevision = scheduleTopicRevision(
          updatedProfile.revisionQueue,
          result.topic,
          result.squareId,
          result.isCorrect
        );
        updatedProfile.revisionQueue = updatedRevision;

        const newScore = prev.totalScore + (result.isCorrect ? result.scoreAwarded : 0);
        const activities = [...prev.recentActivities];
        activities.unshift({
          id: `act-chal-${Date.now()}`,
          timestamp: Date.now(),
          type: 'challenge',
          square: result.squareId,
          title: `${result.isCorrect ? 'Solved' : 'Attempted'}: ${result.topic}`,
          detail: result.isCorrect ? `+${result.scoreAwarded} XP awarded` : `Review recommended`,
          scoreDelta: result.isCorrect ? result.scoreAwarded : 0
        });

        return {
          ...prev,
          totalScore: newScore,
          learnerProfile: updatedProfile,
          recentActivities: activities.slice(0, 30)
        };
      });
    }

    setIsChallengeOpen(false);
    setActiveChallenge(null);
  }, []);

  /**
   * Autoplay Loop Implementation
   * Section 13: Demonstrates the actual game on the real 100-square board!
   */
  useEffect(() => {
    if (!isAutoplayRunning || isAutoplayPaused || isMoving || isRolling || isChallengeOpen) {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
      return;
    }

    const intervalMs = Math.max(700, Math.floor(2200 / autoplaySpeed));

    autoplayTimerRef.current = setTimeout(() => {
      if (gameState.currentPosition >= 100) {
        setIsAutoplayRunning(false);
        return;
      }

      // 1. Roll dice automatically
      setIsRolling(true);
      sound.playDiceRoll();
      const rollValue = rollDice();
      setLastDiceRoll(rollValue);

      setTimeout(() => {
        setIsRolling(false);
        const passedSet = new Set(gameState.passedCheckpoints);
        const plan = computeMovementPlan(gameState.currentPosition, rollValue, passedSet);
        executeMovement(plan, true);

        // 2. Simulate challenge demonstration without granting fake mastery
        setTimeout(() => {
          const targetSquare = SQUARE_MAP.get(plan.finalPosition) || CURRICULUM_100[0];
          const challenge = challengeRegistryRef.current.getChallengeForSquare(targetSquare.id);

          setActiveChallenge(challenge);
          setIsChallengeOpen(true);

          // Close demonstration challenge after brief reading window
          setTimeout(() => {
            handleCompleteChallenge({
              challengeId: challenge.id,
              squareId: targetSquare.id,
              isCorrect: true,
              selectedOptionIndex: challenge.correctOptionIndex ?? 0,
              scoreAwarded: 0, // 0 XP in autoplay mode: strictly preserves mastery integrity!
              timeSpentSeconds: 2,
              hintUsed: false,
              skillCategory: challenge.skillCategory,
              topic: challenge.topic,
              feedback: 'Autoplay demonstration completed'
            }, true);
          }, Math.max(900, Math.floor(2400 / autoplaySpeed)));

        }, (plan.intermediateSteps.length + 1) * Math.max(90, Math.floor(280 / autoplaySpeed)) + 200);

      }, 400);
    }, intervalMs);

    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };
  }, [
    isAutoplayRunning, 
    isAutoplayPaused, 
    isMoving, 
    isRolling, 
    isChallengeOpen, 
    autoplaySpeed, 
    gameState.currentPosition, 
    gameState.passedCheckpoints, 
    executeMovement, 
    handleCompleteChallenge
  ]);

  // Autoplay control actions
  const startAutoplay = useCallback(() => {
    setIsAutoplayRunning(true);
    setIsAutoplayPaused(false);
  }, []);

  const pauseAutoplay = useCallback(() => {
    setIsAutoplayPaused(true);
  }, []);

  const resumeAutoplay = useCallback(() => {
    setIsAutoplayPaused(false);
  }, []);

  const stopAutoplay = useCallback(() => {
    setIsAutoplayRunning(false);
    setIsAutoplayPaused(false);
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  const handleResetGame = useCallback(() => {
    stopAutoplay();
    const fresh = resetGameStorage();
    setGameState(fresh);
    setDisplayedPosition(1);
    setIsResetModalOpen(false);
    setIsVictoryModalOpen(false);
    challengeRegistryRef.current = new ChallengeRegistry([]);
    sound.playMoveStep();
  }, [stopAutoplay]);

  const updateSettings = useCallback((newSettings: Partial<PersistentGameState['settings']>) => {
    setGameState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  }, []);

  return {
    gameState,
    displayedPosition,
    isRolling,
    isMoving,
    lastDiceRoll,
    activeChallenge,
    isChallengeOpen,
    isRevisionMode,
    isResetModalOpen,
    isRevisionModalOpen,
    isAdaptiveModalOpen,
    isSettingsModalOpen,
    isVictoryModalOpen,
    isAutoplayRunning,
    isAutoplayPaused,
    autoplaySpeed,
    handleRollDice,
    handleOpenSquareChallenge,
    handleCompleteChallenge,
    startAutoplay,
    pauseAutoplay,
    resumeAutoplay,
    stopAutoplay,
    setAutoplaySpeed,
    handleResetGame,
    updateSettings,
    setIsResetModalOpen,
    setIsRevisionModalOpen,
    setIsAdaptiveModalOpen,
    setIsSettingsModalOpen,
    setIsVictoryModalOpen,
    setIsChallengeOpen
  };
}
