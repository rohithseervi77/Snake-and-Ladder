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
import { AutoplaySpeed, GamePhase } from '../types/game';
import { 
  calculateLevelInfo, 
  calculateCorrectMovement, 
  calculateIncorrectPenalty, 
  calculateEconomyReward 
} from '../engine/economyEngine';
import { evaluateAchievements } from '../engine/achievementEngine';
import { CosmeticItem, CosmeticType, MovementNotification } from '../types/rewards';
import { SNAKE_MAP, LADDER_MAP } from '../data/snakesAndLadders';

// Evolution Imports
import { 
  RouteType, 
  RouteOption, 
  IntelligentSnake, 
  SnakeRecoveryChoice, 
  OptimizationLadderChoice, 
  BossBattle, 
  BugBotScenario, 
  BoardMutationEvent, 
  EnergyAbility 
} from '../types/evolution';
import { INTELLIGENT_SNAKE_MAP } from '../data/intelligentSnakes';
import { OPTIMIZATION_LADDER_MAP } from '../data/optimizationLadders';
import { DECISION_TILE_MAP, evaluateRouteAvailability } from '../data/routeSelection';
import { BOSS_BATTLES } from '../data/bossBattles';
import { BOARD_MUTATIONS } from '../data/boardMutations';
import { BUGBOT_SCENARIOS } from '../data/bugBotScenarios';
import { updateTopicMastery, normalizeDsaTopic } from '../engine/masteryEngine';
import { generatePersonalizedFinalBoss } from '../engine/personalizedBossEngine';
import { addEnergy, consumeEnergy } from '../engine/energyEngine';
import { createMisconceptionRecord, generateEchoChallenge } from '../engine/futureEchoEngine';

export function useGameState() {
  const [gameState, setGameState] = useState<PersistentGameState>(() => loadGameState());
  const [displayedPosition, setDisplayedPosition] = useState<number>(() => gameState.currentPosition);
  const [gamePhase, setGamePhase] = useState<GamePhase>('IDLE');
  const [isRolling, setIsRolling] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [lastDiceRoll, setLastDiceRoll] = useState<number>(3);
  const eventQueueRef = useRef<Array<() => void>>([]);
  
  // Standard Modals
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [isAdaptiveModalOpen, setIsAdaptiveModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState(false);
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);

  // Evolution Modals & State
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [currentDecisionTile, setCurrentDecisionTile] = useState<number>(15);
  const [availableRouteOptions, setAvailableRouteOptions] = useState<RouteOption[]>([]);

  const [activeIntelligentSnake, setActiveIntelligentSnake] = useState<IntelligentSnake | null>(null);
  const [isSnakeRecoveryModalOpen, setIsSnakeRecoveryModalOpen] = useState(false);

  const [activeOptimizationLadder, setActiveOptimizationLadder] = useState<OptimizationLadderChoice | null>(null);
  const [isLadderChoiceModalOpen, setIsLadderChoiceModalOpen] = useState(false);

  const [activeBossBattle, setActiveBossBattle] = useState<BossBattle | null>(null);
  const [isBossModalOpen, setIsBossModalOpen] = useState(false);

  const [activeBugBotScenario, setActiveBugBotScenario] = useState<BugBotScenario | null>(null);
  const [isBugBotModalOpen, setIsBugBotModalOpen] = useState(false);

  const [activeMutation, setActiveMutation] = useState<BoardMutationEvent | null>(null);
  const [isMutationModalOpen, setIsMutationModalOpen] = useState(false);

  const [isMasteryModalOpen, setIsMasteryModalOpen] = useState(false);

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
   * Evaluates decision tile crossroads
   */
  const triggerDecisionCrossroads = useCallback((tile: number) => {
    const config = DECISION_TILE_MAP.get(tile);
    if (!config) return;

    const evaluated = evaluateRouteAvailability(config, gameState.topicMasteryMap, gameState.energy);
    const optionsArray: RouteOption[] = [evaluated.knowledge, evaluated.challenge, evaluated.risk];

    setCurrentDecisionTile(tile);
    setAvailableRouteOptions(optionsArray);
    setIsRouteModalOpen(true);
  }, [gameState.topicMasteryMap, gameState.energy]);

  /**
   * Checks and triggers Regional Boss Battle (dynamically personalized at Tile 100)
   */
  const checkBossBattle = useCallback((tile: number): boolean => {
    const boss = BOSS_BATTLES.find(b => b.tileNumber === tile);
    if (boss && !gameState.defeatedBosses.includes(tile)) {
      if (tile === 100) {
        const personalized = generatePersonalizedFinalBoss(gameState.topicMasteryMap, gameState.learnerProfile);
        setActiveBossBattle(personalized);
      } else {
        setActiveBossBattle(boss);
      }
      setIsBossModalOpen(true);
      return true;
    }
    return false;
  }, [gameState.defeatedBosses, gameState.topicMasteryMap, gameState.learnerProfile]);

  /**
   * Checks and triggers Board Mutation every 5 turns
   */
  const checkBoardMutation = useCallback((turnCount: number): boolean => {
    const mutation = BOARD_MUTATIONS.find(m => m.triggerTurn === turnCount);
    if (mutation && !gameState.completedMutations.includes(mutation.id)) {
      setActiveMutation(mutation);
      setIsMutationModalOpen(true);
      return true;
    }
    return false;
  }, [gameState.completedMutations]);

  /**
   * Checks Future Echo return challenge
   */
  const checkFutureEcho = useCallback((tile: number): Challenge | null => {
    const echoIndex = gameState.futureEchoes.findIndex(e => e.active && e.scheduledTile === tile);
    if (echoIndex !== -1) {
      const echo = gameState.futureEchoes[echoIndex];
      showNotification({
        type: 'recovery',
        title: 'FUTURE ECHO RETURNS!',
        subtitle: `A past misconception in ${echo.originalTopic} resurfaces for mastery redemption!`
      });
      return echo.challenge;
    }
    return null;
  }, [gameState.futureEchoes, showNotification]);

  /**
   * Sequential Event Queue Processor to prevent overlapping modals
   */
  const processNextEvent = useCallback(() => {
    if (eventQueueRef.current.length > 0) {
      const nextEvent = eventQueueRef.current.shift();
      if (nextEvent) {
        nextEvent();
      }
    } else {
      if (gameState.currentPosition >= 100) {
        if (gameState.defeatedBosses.includes(100)) {
          sound.playStageComplete();
          confetti({ particleCount: 100, spread: 100, origin: { y: 0.6 } });
          setIsVictoryModalOpen(true);
          setGamePhase('VICTORY');
        } else {
          const finalBoss = BOSS_BATTLES.find(b => b.tileNumber === 100);
          if (finalBoss) {
            const personalized = generatePersonalizedFinalBoss(gameState.topicMasteryMap, gameState.learnerProfile);
            setActiveBossBattle(personalized);
            setIsBossModalOpen(true);
            setGamePhase('EVENT');
          } else {
            sound.playStageComplete();
            confetti({ particleCount: 100, spread: 100, origin: { y: 0.6 } });
            setIsVictoryModalOpen(true);
            setGamePhase('VICTORY');
          }
        }
      } else {
        setGamePhase('IDLE');
      }
    }
  }, [gameState.currentPosition, gameState.defeatedBosses]);

  /**
   * Main player dice roll handler
   */
  const handleRollDice = useCallback(() => {
    if (gamePhase !== 'IDLE' || isRolling || isMoving || isAutoplayRunning) return;

    setIsRolling(true);
    setGamePhase('ROLLING');
    sound.playDiceRoll();

    const rollValue = rollDice();
    setLastDiceRoll(rollValue);

    setTimeout(() => {
      setIsRolling(false);
      setGamePhase('MOVING');
      setIsMoving(true);

      const passedSet = new Set(gameState.passedCheckpoints);
      const plan = computeMovementPlan(gameState.currentPosition, rollValue, passedSet);
      const landingTile = plan.targetSquareBeforeTransitions;

      if (plan.overshotTarget) {
        sound.playFailure();
        showNotification({
          type: 'penalty',
          title: 'ROLL EXCEEDS FINISH!',
          subtitle: plan.overshotExplanation || `Exact roll required to reach Tile 100.`
        });
      }

      // Execute primary dice roll movement
      animateStepPath(gameState.currentPosition, landingTile, () => {
        setIsMoving(false);
        setGamePhase('LANDING');
        const newTurns = gameState.turnsCompleted + 1;

        setGameState(prev => ({
          ...prev,
          currentPosition: landingTile,
          turnsCompleted: newTurns,
          completedSquares: Array.from(new Set([...prev.completedSquares, landingTile]))
        }));

        // Build sequential event queue for this landing tile
        const events: Array<() => void> = [];

        // 1. Check for Regional Boss Encounter
        const boss = BOSS_BATTLES.find(b => b.tileNumber === landingTile);
        const hasBoss = boss && !gameState.defeatedBosses.includes(landingTile);
        if (hasBoss) {
          events.push(() => {
            if (landingTile === 100) {
              const personalized = generatePersonalizedFinalBoss(gameState.topicMasteryMap, gameState.learnerProfile);
              setActiveBossBattle(personalized);
            } else {
              setActiveBossBattle(boss);
            }
            setIsBossModalOpen(true);
            setGamePhase('EVENT');
          });
        }

        // 2. Check for Intelligent Snake
        const intelligentSnake = INTELLIGENT_SNAKE_MAP.get(landingTile);
        if (intelligentSnake) {
          if (gameState.activeShield) {
            sound.playSuccess();
            showNotification({
              type: 'bonus',
              title: 'INVARIANT SHIELD DEFLECTED TRAP!',
              subtitle: `Absorbed ${intelligentSnake.name}! You remain safely at Tile ${landingTile}.`
            });
            setGameState(prev => ({
              ...prev,
              activeShield: false,
              snakesEncountered: prev.snakesEncountered + 1
            }));
          } else {
            events.push(() => {
              setActiveIntelligentSnake(intelligentSnake);
              setIsSnakeRecoveryModalOpen(true);
              setGameState(prev => ({
                ...prev,
                snakesEncountered: prev.snakesEncountered + 1
              }));
              setGamePhase('EVENT');
            });
          }
        }

        // 3. Check for Optimization Ladder
        const optimizationLadder = OPTIMIZATION_LADDER_MAP.get(landingTile);
        if (optimizationLadder) {
          events.push(() => {
            setActiveOptimizationLadder(optimizationLadder);
            setIsLadderChoiceModalOpen(true);
            setGameState(prev => ({
              ...prev,
              laddersClimbed: prev.laddersClimbed + 1
            }));
            setGamePhase('EVENT');
          });
        }

        // 4. Check for Decision Crossroads Tile (15, 30, 60, 75)
        if (DECISION_TILE_MAP.has(landingTile) && gameState.activeRouteTile !== landingTile) {
          events.push(() => {
            triggerDecisionCrossroads(landingTile);
            setGamePhase('EVENT');
          });
        }

        // 5. Check for Turn-based Board Mutation
        const mutation = BOARD_MUTATIONS.find(m => m.triggerTurn === newTurns);
        if (mutation && !gameState.completedMutations.includes(mutation.id)) {
          events.push(() => {
            setActiveMutation(mutation);
            setIsMutationModalOpen(true);
            setGamePhase('EVENT');
          });
        }

        // 6. Check for Future Echo or Standard Challenge
        if (landingTile < 100 && gameState.settings.autoOpenChallenge && !hasBoss) {
          const echoChallenge = checkFutureEcho(landingTile);
          const challenge = echoChallenge || challengeRegistryRef.current.getChallengeForSquare(
            landingTile, 
            true, 
            gameState.settings.difficulty
          );

          events.push(() => {
            setActiveChallenge(challenge);
            setIsChallengeOpen(true);
            setGamePhase('CHALLENGE');
          });
        }

        // 7. Victory / Final Boss Event
        if (landingTile >= 100) {
          events.push(() => {
            if (gameState.defeatedBosses.includes(100)) {
              sound.playStageComplete();
              confetti({ particleCount: 100, spread: 100, origin: { y: 0.6 } });
              setIsVictoryModalOpen(true);
              setGamePhase('VICTORY');
            } else {
              const finalBoss = BOSS_BATTLES.find(b => b.tileNumber === 100);
              if (finalBoss) {
                const personalized = generatePersonalizedFinalBoss(gameState.topicMasteryMap, gameState.learnerProfile);
                setActiveBossBattle(personalized);
                setIsBossModalOpen(true);
                setGamePhase('EVENT');
              }
            }
          });
        }

        eventQueueRef.current = events;
        processNextEvent();
      }, false);
    }, 550);
  }, [
    gamePhase,
    isRolling, 
    isMoving, 
    isAutoplayRunning, 
    gameState.currentPosition, 
    gameState.passedCheckpoints, 
    gameState.activeShield,
    gameState.turnsCompleted,
    gameState.activeRouteTile,
    gameState.settings.autoOpenChallenge, 
    gameState.settings.difficulty,
    gameState.defeatedBosses,
    gameState.completedMutations,
    animateStepPath, 
    checkFutureEcho,
    triggerDecisionCrossroads,
    showNotification,
    processNextEvent
  ]);

  /**
   * Ability trigger handler
   */
  const handleUseAbility = useCallback((abilityId: EnergyAbility['id']) => {
    setGameState(prev => {
      const newEnergy = consumeEnergy(prev.energy, abilityId);
      if (newEnergy === null) {
        showNotification({
          type: 'penalty',
          title: 'INSUFFICIENT ENERGY!',
          subtitle: `You need more algorithm energy to cast this ability.`
        });
        return prev;
      }

      sound.playSuccess();
      const abilityCost = abilityId === 'shield' ? 25 : abilityId === 'second_chance' ? 30 : abilityId === 'debug_scan' ? 20 : abilityId === 'ladder_boost' ? 15 : abilityId === 'reroll' ? 15 : 10;
      const newEnergyUsed = (prev.energyUsed || 0) + abilityCost;

      if (abilityId === 'shield') {
        showNotification({
          type: 'bonus',
          title: 'INVARIANT SHIELD ACTIVATED!',
          subtitle: 'The next snake trap or incorrect penalty will be completely absorbed.'
        });
        return {
          ...prev,
          energy: newEnergy,
          energyUsed: newEnergyUsed,
          activeShield: true
        };
      }

      if (abilityId === 'second_chance') {
        showNotification({
          type: 'bonus',
          title: 'SECOND CHANCE PRIMED!',
          subtitle: 'The next incorrect challenge will grant a free retry without penalty.'
        });
        return {
          ...prev,
          energy: newEnergy,
          energyUsed: newEnergyUsed,
          activeSecondChance: true
        };
      }

      if (abilityId === 'ladder_boost') {
        showNotification({
          type: 'bonus',
          title: 'OPTIMIZATION OVERDRIVE!',
          subtitle: 'The next ladder climbed will grant +2 bonus tiles!'
        });
        return {
          ...prev,
          energy: newEnergy,
          energyUsed: newEnergyUsed,
          activeLadderBoost: true
        };
      }

      if (abilityId === 'reroll') {
        if (gamePhase !== 'IDLE') return prev;
        showNotification({
          type: 'bonus',
          title: 'QUANTUM REROLL!',
          subtitle: 'Rerolling dice to navigate alternate board timeline.'
        });
        setTimeout(() => handleRollDice(), 100);
        return {
          ...prev,
          energy: newEnergy,
          energyUsed: newEnergyUsed
        };
      }

      if (abilityId === 'debug_scan') {
        showNotification({
          type: 'bonus',
          title: 'DEBUG SCAN ACTIVE!',
          subtitle: 'Eliminated one incorrect answer choice from the challenge.'
        });
        return {
          ...prev,
          energy: newEnergy,
          energyUsed: newEnergyUsed
        };
      }

      if (abilityId === 'hint') {
        showNotification({
          type: 'bonus',
          title: 'HINT TIER UNLOCKED!',
          subtitle: 'Deeper algorithmic reasoning and code anchor revealed.'
        });
        return {
          ...prev,
          energy: newEnergy,
          energyUsed: newEnergyUsed
        };
      }

      return {
        ...prev,
        energy: newEnergy,
        energyUsed: newEnergyUsed
      };
    });
  }, [gamePhase, showNotification, handleRollDice]);

  /**
   * Route selection handler
   */
  const handleSelectRoute = useCallback((routeType: RouteType) => {
    setGameState(prev => ({
      ...prev,
      currentRouteType: routeType,
      activeRouteTile: currentDecisionTile
    }));
    setIsRouteModalOpen(false);

    sound.playSuccess();
    showNotification({
      type: 'bonus',
      title: `${routeType.toUpperCase()} ROUTE ENGAGED!`,
      subtitle: `Your path is now calibrated for ${routeType} challenges!`
    });

    setTimeout(() => processNextEvent(), 300);
  }, [currentDecisionTile, showNotification, processNextEvent]);

  /**
   * Snake Recovery choice handler
   */
  const handleSelectSnakeChoice = useCallback((choice: SnakeRecoveryChoice) => {
    if (!activeIntelligentSnake) return;

    const snake = activeIntelligentSnake;
    const finalPos = Math.max(1, snake.to + choice.recoveryDelta);

    setIsSnakeRecoveryModalOpen(false);
    setActiveIntelligentSnake(null);

    if (choice.recoveryDelta > 0) {
      sound.playSuccess();
      showNotification({
        type: 'recovery',
        title: 'TRAP MITIGATED!',
        subtitle: `Demonstrated ${snake.misconceptionType} insight! Landed at Tile ${finalPos} (+${choice.recoveryDelta} tiles saved).`
      });
    } else {
      sound.playSnakeDrop();
      showNotification({
        type: 'snake',
        title: 'SNAKE SLIDE ACCEPTED',
        subtitle: `Slid down to Tile ${finalPos}. Analyze the code snippet for future avoidance.`
      });
    }

    animateStepPath(snake.from, finalPos, () => {
      setGameState(prev => ({
        ...prev,
        currentPosition: finalPos,
        completedSquares: Array.from(new Set([...prev.completedSquares, finalPos]))
      }));
      setTimeout(() => processNextEvent(), 200);
    });
  }, [activeIntelligentSnake, animateStepPath, showNotification, processNextEvent]);

  /**
   * Ladder Choice handler (Safe vs Expert)
   */
  const handleSelectLadderOption = useCallback((option: 'safe' | 'expert') => {
    if (!activeOptimizationLadder) return;

    const ladder = activeOptimizationLadder;
    const boostBonus = gameState.activeLadderBoost ? 2 : 0;
    const targetTile = option === 'safe'
      ? Math.min(100, ladder.safeOption.destinationTile + boostBonus)
      : Math.min(100, ladder.expertOption.destinationTile + boostBonus);

    setIsLadderChoiceModalOpen(false);
    setActiveOptimizationLadder(null);

    sound.playLadderClimb();
    confetti({ particleCount: 45, spread: 70, origin: { y: 0.7 } });

    showNotification({
      type: 'ladder',
      title: option === 'expert' ? 'EXPERT LADDER ASCENDED!' : 'SAFE LADDER CLIMBED!',
      subtitle: `Ascended to Tile ${targetTile}! (+${targetTile - ladder.from} tiles gained)`
    });

    animateStepPath(ladder.from, targetTile, () => {
      setGameState(prev => ({
        ...prev,
        currentPosition: targetTile,
        activeLadderBoost: false,
        energy: addEnergy(prev.energy, option === 'expert' ? 3 : 1),
        completedSquares: Array.from(new Set([...prev.completedSquares, targetTile]))
      }));
      setTimeout(() => processNextEvent(), 200);
    });
  }, [activeOptimizationLadder, gameState.activeLadderBoost, animateStepPath, showNotification, processNextEvent]);

  /**
   * Boss Battle Victory
   */
  const handleBossVictory = useCallback((tileNumber: number, xp: number, coins: number, energy: number) => {
    sound.playStageComplete();
    confetti({ particleCount: 90, spread: 90, origin: { y: 0.6 } });

    showNotification({
      type: 'achievement',
      title: 'REGIONAL BOSS VANQUISHED!',
      subtitle: `Mastery proven at Tile ${tileNumber}! (+${xp} XP, +${coins} Coins, +${energy} Energy)`
    });

    setGameState(prev => ({
      ...prev,
      totalScore: prev.totalScore + xp,
      coins: prev.coins + coins,
      energy: addEnergy(prev.energy, energy),
      defeatedBosses: Array.from(new Set([...prev.defeatedBosses, tileNumber]))
    }));

    setIsBossModalOpen(false);
    setActiveBossBattle(null);

    if (tileNumber >= 100) {
      setTimeout(() => {
        sound.playStageComplete();
        confetti({ particleCount: 120, spread: 120, origin: { y: 0.5 } });
        setIsVictoryModalOpen(true);
        setGamePhase('VICTORY');
      }, 400);
    } else {
      setTimeout(() => processNextEvent(), 300);
    }
  }, [showNotification, processNextEvent]);

  /**
   * BugBot Rival Victory
   */
  const handleBugBotVictory = useCallback((xp: number, coins: number, energy: number) => {
    sound.playSuccess();
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });

    showNotification({
      type: 'bonus',
      title: 'BUGBOT DUEL WON!',
      subtitle: `Rival solution refuted! (+${xp} XP, +${coins} Coins, +${energy} Energy)`
    });

    setGameState(prev => ({
      ...prev,
      totalScore: prev.totalScore + xp,
      coins: prev.coins + coins,
      energy: addEnergy(prev.energy, energy)
    }));

    setIsBugBotModalOpen(false);
    setActiveBugBotScenario(null);
    setTimeout(() => processNextEvent(), 300);
  }, [showNotification, processNextEvent]);

  /**
   * Board Mutation Resolution
   */
  const handleResolveMutation = useCallback((isCorrect: boolean, bonusTiles: number, penaltyTiles: number, destination?: number) => {
    if (!activeMutation) return;

    const mutation = activeMutation;
    setIsMutationModalOpen(false);
    setActiveMutation(null);

    setGameState(prev => ({
      ...prev,
      completedMutations: [...prev.completedMutations, mutation.id]
    }));

    const startPos = gameState.currentPosition;
    let targetPos = destination ?? Math.max(1, Math.min(100, startPos + (isCorrect ? bonusTiles : penaltyTiles)));

    if (isCorrect) {
      sound.playSuccess();
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
      showNotification({
        type: 'bonus',
        title: 'MUTATION STABILIZED!',
        subtitle: `${mutation.title} resolved! Moving ${bonusTiles > 0 ? `+${bonusTiles} tiles` : 'forward'}.`
      });
      setGameState(prev => ({
        ...prev,
        energy: addEnergy(prev.energy, 2)
      }));
    } else {
      sound.playFailure();
      showNotification({
        type: 'penalty',
        title: 'MUTATION DESTABILIZED!',
        subtitle: `${mutation.title} caused an anomaly. Slide ${penaltyTiles} tiles.`
      });
    }

    animateStepPath(startPos, targetPos, () => {
      setGameState(prev => ({
        ...prev,
        currentPosition: targetPos,
        completedSquares: Array.from(new Set([...prev.completedSquares, targetPos]))
      }));
      setTimeout(() => processNextEvent(), 200);
    });
  }, [activeMutation, gameState.currentPosition, animateStepPath, showNotification, processNextEvent]);

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
   * Submits challenge answer and executes Answer-Based Movement & Evolution Tracking
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

    // 2. Calculate Answer-Based Movement with Route Modifiers
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

      // Risk Route bonus
      if (gameState.currentRouteType === 'risk') {
        tilesDelta += 1;
      }

      notifTitle = isRecovery ? 'COMEBACK!' : 'CORRECT ANSWER!';
      notifSubtitle = rewardCalc.explanation;

      showNotification({
        type: isRecovery ? 'recovery' : 'bonus',
        title: notifTitle,
        subtitle: `${notifSubtitle} (+${economy.xpDelta} XP, +${economy.coinsDelta} Coins, +1 ⚡)`,
        tilesDelta
      });
    } else {
      sound.playFailure();
      
      // If shield is active, deflect penalty!
      if (gameState.activeShield) {
        showNotification({
          type: 'bonus',
          title: 'INVARIANT SHIELD ABSORPTION!',
          subtitle: 'Shield absorbed your incorrect answer penalty! No backward slide applied.'
        });
        tilesDelta = 0;
      } else {
        const penaltyCalc = calculateIncorrectPenalty(gameState.consecutiveIncorrect + 1);
        tilesDelta = penaltyCalc.tilesDelta;

        showNotification({
          type: 'penalty',
          title: 'NOT QUITE!',
          subtitle: `${penaltyCalc.explanation} (Slide ${tilesDelta} tiles)`,
          tilesDelta
        });
      }
    }

    // 3. Centralized Movement Resolution
    const startPos = gameState.currentPosition;
    let intendedPos = Math.max(1, Math.min(100, startPos + tilesDelta));

    animateStepPath(startPos, intendedPos, () => {
      const isWin = intendedPos >= 100;
      if (isWin) {
        sound.playStageComplete();
        confetti({ particleCount: 100, spread: 100, origin: { y: 0.6 } });
        setIsVictoryModalOpen(true);
      }

      // 4. Update Evolution Mastery & Future Echo Tracking
      setGameState(prev => {
        const oldLevel = calculateLevelInfo(prev.totalScore).level;
        const newScore = prev.totalScore + (isDemo ? 0 : economy.xpDelta);
        const newCoins = prev.coins + (isDemo ? 0 : economy.coinsDelta);
        const newLevel = calculateLevelInfo(newScore).level;

        // Energy gain
        const energyGained = result.isCorrect ? (prev.currentRouteType === 'risk' ? 2 : 1) : 0;
        const newEnergy = addEnergy(prev.energy, energyGained);

        // Canonical Topic Mastery update
        const canonicalTopic = normalizeDsaTopic(result.topic);
        const currentTopicMastery = prev.topicMasteryMap[canonicalTopic] || {
          topicId: canonicalTopic,
          topicName: canonicalTopic,
          score: 15,
          level: 'novice',
          attempts: 0,
          correctCount: 0,
          incorrectCount: 0,
          firstTryCount: 0,
          hintsUsedCount: 0,
          evidence: [],
          lastUpdated: Date.now()
        };

        const updatedTopicScore = updateTopicMastery(
          currentTopicMastery,
          result.isCorrect,
          targetSquare.difficulty,
          isFirstAttempt,
          isRecovery,
          result.hintUsed
        );

        const newMasteryMap = {
          ...prev.topicMasteryMap,
          [canonicalTopic]: updatedTopicScore
        };

        // Future Echo handling
        const newEchoes = [...prev.futureEchoes];
        const newMisconceptions = [...prev.misconceptions];

        if (!result.isCorrect && !isDemo) {
          const misc = createMisconceptionRecord(
            result.topic,
            result.skillCategory,
            result.challengeId,
            result.feedback || 'Misconception identified',
            result.hintUsed
          );
          newMisconceptions.push(misc);
          newEchoes.push(generateEchoChallenge(misc, intendedPos));
        } else if (result.isCorrect) {
          // Resolve any active echo on this square
          const echoIdx = newEchoes.findIndex(e => e.scheduledTile === result.squareId && e.active);
          if (echoIdx !== -1) {
            newEchoes[echoIdx] = { ...newEchoes[echoIdx], active: false };
          }
        }

        const newStreak = result.isCorrect ? prev.streak + 1 : 0;
        const newLongest = Math.max(prev.longestStreak, newStreak);
        const newRecoveryStreak = isRecovery ? prev.recoveryStreak + 1 : (result.isCorrect ? prev.recoveryStreak : 0);
        const newConsecutiveIncorrect = result.isCorrect ? 0 : prev.consecutiveIncorrect + 1;

        // Learner profile update
        const updatedProfile = recordChallengeAttempt(prev.learnerProfile, result);
        const updatedRevision = scheduleTopicRevision(
          updatedProfile.revisionQueue,
          result.topic,
          result.squareId,
          result.isCorrect
        );
        updatedProfile.revisionQueue = updatedRevision;

        // Achievements check
        const { updatedList, newlyUnlocked } = evaluateAchievements(prev.achievements, {
          totalSolved: updatedProfile.totalCorrect,
          streak: newStreak,
          recoveryCount: newRecoveryStreak,
          arraySolved: updatedProfile.topicMasteries['Arrays']?.correct || 0,
          debugSolved: updatedProfile.attemptHistory.filter(h => h.skillCategory === 'debugging' && h.isCorrect).length,
          optSolved: prev.laddersClimbed,
          complexitySolved: updatedProfile.attemptHistory.filter(h => h.skillCategory === 'complexity' && h.isCorrect).length,
          graphSolved: updatedProfile.topicMasteries['Graphs']?.correct || 0,
          dpSolved: updatedProfile.topicMasteries['Dynamic Programming']?.correct || 0,
          currentTile: intendedPos
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
            ? `${tilesDelta > 0 ? `+${tilesDelta} Tiles` : ''} (+${economy.xpDelta} XP, +${economy.coinsDelta} Coins, +${energyGained} ⚡)` 
            : `${tilesDelta} Tiles Penalty (+3 XP, +1 Coin for effort)`,
          scoreDelta: result.isCorrect ? economy.xpDelta : 3
        });

        return {
          ...prev,
          currentPosition: intendedPos,
          completedSquares: Array.from(new Set([...prev.completedSquares, intendedPos])),
          totalScore: newScore,
          coins: newCoins,
          energy: newEnergy,
          activeShield: !result.isCorrect && prev.activeShield ? false : prev.activeShield,
          activeSecondChance: !result.isCorrect && prev.activeSecondChance ? false : prev.activeSecondChance,
          streak: newStreak,
          longestStreak: newLongest,
          recoveryStreak: newRecoveryStreak,
          consecutiveIncorrect: newConsecutiveIncorrect,
          questionsAttempted: (prev.questionsAttempted || 0) + 1,
          questionsCorrect: (prev.questionsCorrect || 0) + (result.isCorrect ? 1 : 0),
          topicMasteryMap: newMasteryMap,
          misconceptions: newMisconceptions,
          futureEchoes: newEchoes,
          achievements: updatedList,
          learnerProfile: updatedProfile,
          recentActivities: activities.slice(0, 30)
        };
      });

      setTimeout(() => processNextEvent(), 200);
    }, isDemo);

    setIsChallengeOpen(false);
    setActiveChallenge(null);
  }, [
    gameState.consecutiveIncorrect, 
    gameState.currentPosition, 
    gameState.currentRouteType,
    gameState.activeShield,
    animateStepPath, 
    showNotification,
    processNextEvent
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
    if (!isAutoplayRunning || isAutoplayPaused || isMoving || isRolling || isChallengeOpen || isRouteModalOpen || isSnakeRecoveryModalOpen || isLadderChoiceModalOpen || isBossModalOpen || isMutationModalOpen) {
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
    isRouteModalOpen,
    isSnakeRecoveryModalOpen,
    isLadderChoiceModalOpen,
    isBossModalOpen,
    isMutationModalOpen,
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
    setIsBossModalOpen(false);
    setIsRouteModalOpen(false);
    setIsSnakeRecoveryModalOpen(false);
    setIsLadderChoiceModalOpen(false);
    setIsMutationModalOpen(false);
    challengeRegistryRef.current = new ChallengeRegistry([]);
    sound.playMoveStep();
  }, [stopAutoplay]);

  const updateSettings = useCallback((newSettings: Partial<PersistentGameState['settings']>) => {
    setGameState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  }, []);

  const triggerBugBotDuel = useCallback((scenarioIndex: number = 0) => {
    const scenario = BUGBOT_SCENARIOS[scenarioIndex % BUGBOT_SCENARIOS.length];
    setActiveBugBotScenario(scenario);
    setIsBugBotModalOpen(true);
  }, []);

  const handleAwardReward = useCallback((xp: number, coins: number) => {
    sound.playSuccess();
    setGameState(prev => ({
      ...prev,
      totalScore: prev.totalScore + xp,
      coins: prev.coins + coins
    }));
  }, []);

  const handleRecordPracticeMistake = useCallback((topic: string, question: string, _yourAnswer: string, _correctAnswer: string) => {
    setGameState(prev => {
      const historyItem = {
        challengeId: `practice-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        topic,
        squareId: prev.currentPosition,
        isCorrect: false,
        timestamp: Date.now(),
        skillCategory: 'conceptual' as const
      };
      return {
        ...prev,
        learnerProfile: {
          ...prev.learnerProfile,
          totalAttempts: prev.learnerProfile.totalAttempts + 1,
          attemptHistory: [...prev.learnerProfile.attemptHistory, historyItem]
        }
      };
    });
  }, []);

  return {
    gameState,
    displayedPosition,
    gamePhase,
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

    // Evolution exports
    isRouteModalOpen,
    currentDecisionTile,
    availableRouteOptions,
    activeIntelligentSnake,
    isSnakeRecoveryModalOpen,
    activeOptimizationLadder,
    isLadderChoiceModalOpen,
    activeBossBattle,
    isBossModalOpen,
    activeBugBotScenario,
    isBugBotModalOpen,
    activeMutation,
    isMutationModalOpen,
    isMasteryModalOpen,

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
    handleAwardReward,
    handleRecordPracticeMistake,
    dismissNotification: () => setCurrentNotification(null),

    // Evolution actions
    handleSelectRoute,
    handleUseAbility,
    handleSelectSnakeChoice,
    handleSelectLadderOption,
    handleBossVictory,
    handleBugBotVictory,
    handleResolveMutation,
    triggerBugBotDuel,
    triggerDecisionCrossroads,

    setIsResetModalOpen,
    setIsRevisionModalOpen,
    setIsAdaptiveModalOpen,
    setIsSettingsModalOpen,
    setIsVictoryModalOpen,
    setIsShopModalOpen,
    setIsAchievementsModalOpen,
    setIsChallengeOpen,
    setIsRouteModalOpen,
    setIsSnakeRecoveryModalOpen,
    setIsLadderChoiceModalOpen,
    setIsBossModalOpen,
    setIsBugBotModalOpen,
    setIsMutationModalOpen,
    setIsMasteryModalOpen
  };
}
