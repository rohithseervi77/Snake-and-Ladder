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
import { 
  calculateLevelInfo, 
  calculateCorrectMovement, 
  calculateIncorrectPenalty, 
  calculateEconomyReward 
} from '../engine/economyEngine';
import { evaluateAchievements } from '../engine/achievementEngine';
import { CosmeticItem, CosmeticType, MovementNotification } from '../types/rewards';
import { SNAKE_MAP, LADDER_MAP } from '../data/snakesAndLadders';

export function useGameState() {
  const [gameState, setGameState] = useState<PersistentGameState>(() => loadGameState());
  const [displayedPosition, setDisplayedPosition] = useState<number>(() => gameState.currentPosition);
  const [isRolling, setIsRolling] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [lastDiceRoll, setLastDiceRoll] = useState<number>(3);
  
  // Modals
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [isAdaptiveModalOpen, setIsAdaptiveModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState(false);
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);

  // Floating notifications / toasts
  const [currentNotification, setCurrentNotification] = useState<MovementNotification | null>(null);
  const notificationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Autoplay
  const [isAutoplayRunning, setIsAutoplayRunning] = useState(false);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [autoplaySpeed, setAutoplaySpeed] = useState<AutoplaySpeed>(1);
  const autoplayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Challenge Registry with anti-repetition tracking
  const challengeRegistryRef = useRef<ChallengeRegistry>(
    new ChallengeRegistry(gameState.learnerProfile.attemptHistory.map(h => h.challengeId))
  );

  const showNotification = useCallback((notif: Omit<MovementNotification, 'id' | 'timestamp'>) => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    const fullNotif: MovementNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: Date.now()
    };
    setCurrentNotification(fullNotif);
    notificationTimeoutRef.current = setTimeout(() => {
      setCurrentNotification(null);
    }, 3800);
  }, []);

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
   * Smooth step-by-step tile movement animation (forward or backward)
   */
  const animateStepPath = useCallback((startPos: number, endPos: number, onComplete: () => void, isDemo: boolean = false) => {
    if (startPos === endPos) {
      onComplete();
      return;
    }

    setIsMoving(true);
    const stepDelay = Math.max(90, Math.floor(260 / (isDemo ? autoplaySpeed : 1)));
    const isForward = endPos > startPos;

    let curr = startPos;
    const interval = setInterval(() => {
      curr = isForward ? curr + 1 : curr - 1;
      setDisplayedPosition(curr);
      sound.playMoveStep();

      if (curr === endPos) {
        clearInterval(interval);
        setIsMoving(false);
        onComplete();
      }
    }, stepDelay);
  }, [autoplaySpeed]);

  /**
   * Main player dice roll handler
   */
  const handleRollDice = useCallback(() => {
    if (isRolling || isMoving || isAutoplayRunning || isChallengeOpen) return;

    setIsRolling(true);
    sound.playDiceRoll();

    const rollValue = rollDice();
    setLastDiceRoll(rollValue);

    setTimeout(() => {
      setIsRolling(false);
      const passedSet = new Set(gameState.passedCheckpoints);
      const plan = computeMovementPlan(gameState.currentPosition, rollValue, passedSet);

      // Execute primary dice roll movement
      animateStepPath(gameState.currentPosition, plan.targetSquareBeforeTransitions, () => {
        // Resolve snake or ladder on landing tile
        let finalPos = plan.targetSquareBeforeTransitions;
        const ladder = LADDER_MAP.get(finalPos);
        const snake = SNAKE_MAP.get(finalPos);

        let laddersClimbed = gameState.laddersClimbed;
        let snakesEncountered = gameState.snakesEncountered;

        if (ladder) {
          laddersClimbed += 1;
          sound.playLadderClimb();
          confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
          showNotification({
            type: 'ladder',
            title: 'Ladder Leaped!',
            subtitle: `${ladder.title}: ${ladder.description}`
          });
          finalPos = ladder.to;
          setDisplayedPosition(ladder.to);
        } else if (snake) {
          snakesEncountered += 1;
          sound.playSnakeDrop();
          showNotification({
            type: 'snake',
            title: 'Snake Encountered!',
            subtitle: `${snake.title}: ${snake.description}`
          });
          finalPos = snake.to;
          setDisplayedPosition(snake.to);
        }

        const isWin = finalPos >= 100;
        if (isWin) {
          sound.playStageComplete();
          confetti({ particleCount: 100, spread: 100, origin: { y: 0.6 } });
          setIsVictoryModalOpen(true);
        }

        setGameState(prev => ({
          ...prev,
          currentPosition: finalPos,
          completedSquares: Array.from(new Set([...prev.completedSquares, finalPos])),
          laddersClimbed,
          snakesEncountered
        }));

        // Open challenge on landing tile
        const targetSquare = SQUARE_MAP.get(finalPos) || CURRICULUM_100[0];
        const challenge = challengeRegistryRef.current.getChallengeForSquare(targetSquare.id);

        if (gameState.settings.autoOpenChallenge && !isWin) {
          setActiveChallenge(challenge);
          setIsChallengeOpen(true);
        }
      }, false);
    }, 550);
  }, [
    isRolling, 
    isMoving, 
    isAutoplayRunning, 
    isChallengeOpen, 
    gameState.currentPosition, 
    gameState.passedCheckpoints, 
    gameState.laddersClimbed, 
    gameState.snakesEncountered, 
    gameState.settings.autoOpenChallenge, 
    animateStepPath, 
    showNotification
  ]);

  /**
   * Start challenge on current or selected square
   */
  const handleOpenSquareChallenge = useCallback((squareId?: number) => {
    const targetId = squareId ?? gameState.currentPosition;
    const challenge = challengeRegistryRef.current.getChallengeForSquare(targetId);
    setActiveChallenge(challenge);
    setIsChallengeOpen(true);
  }, [gameState.currentPosition]);

  /**
   * Submits challenge answer and executes Answer-Based Movement Rewards / Penalties!
   */
  const handleCompleteChallenge = useCallback((
    result: ChallengeAttemptResult, 
    isFirstAttempt: boolean = true, 
    isRecovery: boolean = false, 
    isDemo: boolean = false
  ) => {
    challengeRegistryRef.current.markAttempted(result.challengeId, result.squareId);

    const targetSquare = SQUARE_MAP.get(result.squareId) || CURRICULUM_100[0];
    const isOptimization = targetSquare.type === 'ladder_start';

    // 1. Calculate Economy Rewards (XP and Coins)
    const economy = calculateEconomyReward(
      result.isCorrect,
      targetSquare.difficulty,
      isFirstAttempt,
      isRecovery,
      isOptimization,
      result.hintUsed
    );

    // 2. Calculate Answer-Based Movement
    let tilesDelta = 0;
    let notifTitle = '';
    let notifSubtitle = '';

    if (result.isCorrect) {
      sound.playSuccess();
      if (!isDemo) {
        confetti({ particleCount: 25, spread: 50, origin: { y: 0.8 } });
      }

      const rewardCalc = calculateCorrectMovement(targetSquare.difficulty, isFirstAttempt, isRecovery);
      tilesDelta = rewardCalc.tilesDelta;
      notifTitle = isRecovery ? 'COMEBACK!' : 'CORRECT ANSWER!';
      notifSubtitle = rewardCalc.explanation;

      showNotification({
        type: isRecovery ? 'recovery' : 'bonus',
        title: notifTitle,
        subtitle: `${notifSubtitle} (+${economy.xpDelta} XP, +${economy.coinsDelta} Coins)`,
        tilesDelta
      });
    } else {
      sound.playFailure();
      const penaltyCalc = calculateIncorrectPenalty(gameState.consecutiveIncorrect + 1);
      tilesDelta = penaltyCalc.tilesDelta; // negative number

      showNotification({
        type: 'penalty',
        title: 'NOT QUITE!',
        subtitle: `${penaltyCalc.explanation} (Earned +3 XP, +1 Coin for effort)`,
        tilesDelta
      });
    }

    // 3. Centralized Movement Resolution
    const startPos = gameState.currentPosition;
    let intendedPos = Math.max(1, Math.min(100, startPos + tilesDelta));

    animateStepPath(startPos, intendedPos, () => {
      // 4. Resolve Snakes and Ladders on the new landing tile
      let finalLandingPos = intendedPos;
      const ladder = LADDER_MAP.get(intendedPos);
      const snake = SNAKE_MAP.get(intendedPos);

      let laddersClimbed = gameState.laddersClimbed;
      let snakesEncountered = gameState.snakesEncountered;

      if (ladder && result.isCorrect) {
        laddersClimbed += 1;
        sound.playLadderClimb();
        confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
        finalLandingPos = ladder.to;
        setDisplayedPosition(ladder.to);
        showNotification({
          type: 'ladder',
          title: 'Ladder Optimization Leap!',
          subtitle: `${ladder.title}: Climbed to Tile ${ladder.to}!`
        });
      } else if (snake && !result.isCorrect) {
        snakesEncountered += 1;
        sound.playSnakeDrop();
        finalLandingPos = snake.to;
        setDisplayedPosition(snake.to);
        showNotification({
          type: 'snake',
          title: 'Snake Attack!',
          subtitle: `${snake.title}: Slid to Tile ${snake.to}!`
        });
      }

      const isWin = finalLandingPos >= 100;
      if (isWin) {
        sound.playStageComplete();
        confetti({ particleCount: 100, spread: 100, origin: { y: 0.6 } });
        setIsVictoryModalOpen(true);
      }

      // 5. Update State: XP, Coins, Streaks, Achievements
      setGameState(prev => {
        const oldLevel = calculateLevelInfo(prev.totalScore).level;
        const newScore = prev.totalScore + (isDemo ? 0 : economy.xpDelta);
        const newCoins = prev.coins + (isDemo ? 0 : economy.coinsDelta);
        const newLevel = calculateLevelInfo(newScore).level;

        // Level Up check
        if (newLevel > oldLevel && !isDemo) {
          sound.playStageComplete();
          showNotification({
            type: 'level_up',
            title: 'LEVEL UP!',
            subtitle: `Reached Level ${newLevel}: ${calculateLevelInfo(newScore).title}!`
          });
        }

        const newStreak = result.isCorrect ? prev.streak + 1 : 0;
        const newLongest = Math.max(prev.longestStreak, newStreak);
        const newRecoveryStreak = isRecovery ? prev.recoveryStreak + 1 : (result.isCorrect ? prev.recoveryStreak : 0);
        const newConsecutiveIncorrect = result.isCorrect ? 0 : prev.consecutiveIncorrect + 1;

        // Update learner profile
        const updatedProfile = recordChallengeAttempt(prev.learnerProfile, result);
        const updatedRevision = scheduleTopicRevision(
          updatedProfile.revisionQueue,
          result.topic,
          result.squareId,
          result.isCorrect
        );
        updatedProfile.revisionQueue = updatedRevision;

        // Milestone streak celebration
        if ((newStreak === 3 || newStreak === 5 || newStreak === 10) && result.isCorrect && !isDemo) {
          confetti({ particleCount: 40, spread: 70, origin: { y: 0.5 } });
        }

        // Achievements check
        const { updatedList, newlyUnlocked } = evaluateAchievements(prev.achievements, {
          totalSolved: updatedProfile.totalCorrect,
          streak: newStreak,
          recoveryCount: newRecoveryStreak,
          arraySolved: updatedProfile.topicMasteries['Arrays']?.correct || 0,
          debugSolved: updatedProfile.attemptHistory.filter(h => h.skillCategory === 'debugging' && h.isCorrect).length,
          optSolved: laddersClimbed,
          complexitySolved: updatedProfile.attemptHistory.filter(h => h.skillCategory === 'complexity' && h.isCorrect).length,
          graphSolved: updatedProfile.topicMasteries['Graphs']?.correct || 0,
          dpSolved: updatedProfile.topicMasteries['Dynamic Programming']?.correct || 0,
          currentTile: finalLandingPos
        });

        if (newlyUnlocked.length > 0 && !isDemo) {
          sound.playSuccess();
          newlyUnlocked.forEach(ach => {
            showNotification({
              type: 'achievement',
              title: 'ACHIEVEMENT UNLOCKED!',
              subtitle: `${ach.name}: ${ach.description}`
            });
          });
        }

        const activities = [...prev.recentActivities];
        activities.unshift({
          id: `act-${Date.now()}`,
          timestamp: Date.now(),
          type: 'challenge',
          square: result.squareId,
          title: `${result.isCorrect ? 'Solved' : 'Attempted'}: ${result.topic}`,
          detail: result.isCorrect 
            ? `${tilesDelta > 0 ? `+${tilesDelta} Tiles` : ''} (+${economy.xpDelta} XP, +${economy.coinsDelta} Coins)` 
            : `${tilesDelta} Tiles Penalty (+3 XP, +1 Coin for effort)`,
          scoreDelta: result.isCorrect ? economy.xpDelta : 3
        });

        return {
          ...prev,
          currentPosition: finalLandingPos,
          completedSquares: Array.from(new Set([...prev.completedSquares, finalLandingPos])),
          totalScore: newScore,
          coins: newCoins,
          streak: newStreak,
          longestStreak: newLongest,
          recoveryStreak: newRecoveryStreak,
          consecutiveIncorrect: newConsecutiveIncorrect,
          laddersClimbed,
          snakesEncountered,
          achievements: updatedList,
          learnerProfile: updatedProfile,
          recentActivities: activities.slice(0, 30)
        };
      });
    }, isDemo);

    if (result.isCorrect) {
      setIsChallengeOpen(false);
      setActiveChallenge(null);
    }
  }, [
    gameState.consecutiveIncorrect, 
    gameState.currentPosition, 
    gameState.laddersClimbed, 
    gameState.snakesEncountered, 
    animateStepPath, 
    showNotification
  ]);

  /**
   * Shop purchase handler
   */
  const handlePurchaseCosmetic = useCallback((item: CosmeticItem) => {
    if (gameState.coins < item.cost) return;

    sound.playSuccess();
    setGameState(prev => {
      if (prev.purchasedCosmetics.includes(item.id)) return prev;

      return {
        ...prev,
        coins: prev.coins - item.cost,
        purchasedCosmetics: [...prev.purchasedCosmetics, item.id]
      };
    });

    showNotification({
      type: 'bonus',
      title: 'PURCHASE SUCCESSFUL!',
      subtitle: `Unlocked ${item.name} for ${item.cost} Coins!`
    });
  }, [gameState.coins, showNotification]);

  /**
   * Equip cosmetic item
   */
  const handleEquipCosmetic = useCallback((type: CosmeticType, itemId: string) => {
    sound.playMoveStep();
    setGameState(prev => {
      const equipped = { ...prev.equippedCosmetics };
      if (type === 'board_theme') equipped.boardTheme = itemId;
      if (type === 'dice_skin') equipped.diceSkin = itemId;
      if (type === 'player_marker') equipped.playerMarker = itemId;

      return {
        ...prev,
        equippedCosmetics: equipped
      };
    });
  }, []);

  /**
   * Autoplay Loop
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

      setIsRolling(true);
      sound.playDiceRoll();
      const rollValue = rollDice();
      setLastDiceRoll(rollValue);

      setTimeout(() => {
        setIsRolling(false);
        const passedSet = new Set(gameState.passedCheckpoints);
        const plan = computeMovementPlan(gameState.currentPosition, rollValue, passedSet);

        animateStepPath(gameState.currentPosition, plan.targetSquareBeforeTransitions, () => {
          const targetSquare = SQUARE_MAP.get(plan.targetSquareBeforeTransitions) || CURRICULUM_100[0];
          const challenge = challengeRegistryRef.current.getChallengeForSquare(targetSquare.id);

          setActiveChallenge(challenge);
          setIsChallengeOpen(true);

          setTimeout(() => {
            handleCompleteChallenge({
              challengeId: challenge.id,
              squareId: targetSquare.id,
              isCorrect: true,
              selectedOptionIndex: challenge.correctOptionIndex ?? 0,
              scoreAwarded: 0,
              timeSpentSeconds: 2,
              hintUsed: false,
              skillCategory: challenge.skillCategory,
              topic: challenge.topic,
              feedback: 'Autoplay demonstration completed'
            }, true, false, true);
          }, Math.max(900, Math.floor(2400 / autoplaySpeed)));
        }, true);
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
    animateStepPath, 
    handleCompleteChallenge
  ]);

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
    isResetModalOpen,
    isRevisionModalOpen,
    isAdaptiveModalOpen,
    isSettingsModalOpen,
    isVictoryModalOpen,
    isShopModalOpen,
    isAchievementsModalOpen,
    currentNotification,
    isAutoplayRunning,
    isAutoplayPaused,
    autoplaySpeed,
    handleRollDice,
    handleOpenSquareChallenge,
    handleCompleteChallenge,
    handlePurchaseCosmetic,
    handleEquipCosmetic,
    startAutoplay,
    pauseAutoplay,
    resumeAutoplay,
    stopAutoplay,
    setAutoplaySpeed,
    handleResetGame,
    updateSettings,
    dismissNotification: () => setCurrentNotification(null),
    setIsResetModalOpen,
    setIsRevisionModalOpen,
    setIsAdaptiveModalOpen,
    setIsSettingsModalOpen,
    setIsVictoryModalOpen,
    setIsShopModalOpen,
    setIsAchievementsModalOpen,
    setIsChallengeOpen
  };
}
