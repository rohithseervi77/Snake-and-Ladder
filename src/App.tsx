import React, { useMemo } from 'react';
import { useGameState } from './hooks/useGameState';
import { SQUARE_MAP, CURRICULUM_100 } from './data/curriculum100';
import { Header } from './components/Header';
import { LeftSidebar } from './components/Sidebars/LeftSidebar';
import { RightSidebar } from './components/Sidebars/RightSidebar';
import { MobileDrawer } from './components/Sidebars/MobileDrawer';
import { BoardGrid } from './components/Board/BoardGrid';
import { DiceControls } from './components/Controls/DiceControls';
import { AutoplayBar } from './components/Controls/AutoplayBar';
import { ChallengeModal } from './components/Challenges/ChallengeModal';
import { ResetModal } from './components/Dashboard/ResetModal';
import { RevisionModal } from './components/Dashboard/RevisionModal';
import { AdaptiveModal } from './components/Dashboard/AdaptiveModal';
import { SettingsModal } from './components/Dashboard/SettingsModal';
import { VictoryModal } from './components/Dashboard/VictoryModal';
import { ShopModal } from './components/Shop/ShopModal';
import { AchievementsModal } from './components/Achievements/AchievementsModal';
import { MovementToast } from './components/Common/MovementToast';

// Evolution Components
import { EnergyActionBar } from './components/Evolution/EnergyActionBar';
import { RouteModal } from './components/Evolution/RouteModal';
import { SnakeRecoveryModal } from './components/Evolution/SnakeRecoveryModal';
import { LadderChoiceModal } from './components/Evolution/LadderChoiceModal';
import { BossBattleModal } from './components/Evolution/BossBattleModal';
import { BugBotModal } from './components/Evolution/BugBotModal';
import { MutationModal } from './components/Evolution/MutationModal';
import { MasteryModal } from './components/Evolution/MasteryModal';
import { Compass, Shield, Zap, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const {
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

    // Evolution state
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
    dismissNotification,

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
  } = useGameState();

  const currentSquare = useMemo(() => {
    return SQUARE_MAP.get(displayedPosition) || CURRICULUM_100[0];
  }, [displayedPosition]);

  return (
    <div className="min-h-screen w-full bg-[#080d1a] text-slate-100 flex flex-col font-sans select-none antialiased">
      {/* Top Application Header */}
      <Header
        totalXp={gameState.totalScore}
        coinBalance={gameState.coins}
        streak={gameState.streak}
        learnerProfile={gameState.learnerProfile}
        settings={gameState.settings}
        onToggleSound={() => updateSettings({ soundEnabled: !gameState.settings.soundEnabled })}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onOpenAdaptive={() => setIsAdaptiveModalOpen(true)}
        onOpenRevision={() => setIsRevisionModalOpen(true)}
        onOpenReset={() => setIsResetModalOpen(true)}
        onOpenShop={() => setIsShopModalOpen(true)}
        onOpenAchievements={() => setIsAchievementsModalOpen(true)}
        onOpenMasteryMatrix={() => setIsMasteryModalOpen(true)}
        onOpenBugBotDuel={() => triggerBugBotDuel()}
      />

      {/* Floating Movement Reward / Penalty / Level-Up Toast */}
      <MovementToast
        notification={currentNotification}
        onDismiss={dismissNotification}
      />

      {/* Main Game Dashboard */}
      <main className="flex-1 w-full max-w-[1720px] mx-auto p-2 sm:p-4 md:p-6 flex flex-col lg:flex-row gap-4 items-start justify-center">
        {/* Left Sidebar: Rules & Legend */}
        <div className="hidden lg:block flex-shrink-0">
          <LeftSidebar />
        </div>

        {/* Center Board & Controls */}
        <section className="flex-1 w-full flex flex-col items-center justify-center gap-3">
          {/* Active Strategic Route & Turn Banner */}
          <div className="w-full flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-mono">Turn {gameState.turnsCompleted + 1}</span>
              <span className="text-slate-600">&bull;</span>
              <div className="flex items-center gap-1.5 font-medium">
                <Compass className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-slate-400">Current Route:</span>
                <span className={`capitalize font-bold px-2 py-0.5 rounded-full border ${
                  gameState.currentRouteType === 'risk'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : gameState.currentRouteType === 'challenge'
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  {gameState.currentRouteType} Route
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => triggerDecisionCrossroads(15)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-700/50 text-indigo-300 transition"
              >
                Inspect Crossroads
              </button>
              <button
                onClick={() => triggerBugBotDuel()}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-700/50 text-cyan-300 transition"
              >
                Rival Duel 🤖
              </button>
            </div>
          </div>

          {/* Algorithm Energy & Tactical Abilities Bar */}
          <div className="w-full">
            <EnergyActionBar
              energy={gameState.energy}
              hasShield={gameState.activeShield}
              hasLadderBoost={gameState.activeLadderBoost}
              canReroll={!isRolling && !isMoving && !isAutoplayRunning}
              onUseAbility={handleUseAbility}
            />
          </div>

          {/* 1-100 Serpentine Board with SVG Snakes & Ladders */}
          <BoardGrid
            currentPosition={displayedPosition}
            completedSquares={gameState.completedSquares}
            equippedMarker={gameState.equippedCosmetics.playerMarker}
            boardTheme={gameState.equippedCosmetics.boardTheme}
            onSelectSquare={(sq) => handleOpenSquareChallenge(sq.id)}
          />

          {/* Dice & Movement Controls */}
          <DiceControls
            currentPosition={displayedPosition}
            lastDiceRoll={lastDiceRoll}
            diceSkin={gameState.equippedCosmetics.diceSkin}
            isRolling={isRolling}
            isMoving={isMoving}
            isAutoplayRunning={isAutoplayRunning}
            onRollDice={handleRollDice}
          />

          {/* Real Board Autoplay Controller */}
          <AutoplayBar
            isRunning={isAutoplayRunning}
            isPaused={isAutoplayPaused}
            speed={autoplaySpeed}
            onStart={startAutoplay}
            onPause={pauseAutoplay}
            onResume={resumeAutoplay}
            onStop={stopAutoplay}
            onSetSpeed={setAutoplaySpeed}
          />
        </section>

        {/* Right Sidebar: Focus & Progression */}
        <div className="hidden lg:block flex-shrink-0">
          <RightSidebar
            currentSquare={currentSquare}
            completedCount={gameState.completedSquares.length}
            totalAttempts={gameState.learnerProfile.totalAttempts}
            totalCorrect={gameState.learnerProfile.totalCorrect}
            accuracy={gameState.learnerProfile.overallAccuracy}
            streak={gameState.streak}
            recoveryStreak={gameState.recoveryStreak}
            laddersClimbed={gameState.laddersClimbed}
            snakesEncountered={gameState.snakesEncountered}
            totalScore={gameState.totalScore}
            coinBalance={gameState.coins}
            recentActivities={gameState.recentActivities}
            onStartChallenge={handleOpenSquareChallenge}
          />
        </div>
      </main>

      {/* Touch-Friendly Mobile Drawer */}
      <MobileDrawer
        currentSquare={currentSquare}
        completedCount={gameState.completedSquares.length}
        totalAttempts={gameState.learnerProfile.totalAttempts}
        totalCorrect={gameState.learnerProfile.totalCorrect}
        accuracy={gameState.learnerProfile.overallAccuracy}
        streak={gameState.streak}
        recoveryStreak={gameState.recoveryStreak}
        laddersClimbed={gameState.laddersClimbed}
        snakesEncountered={gameState.snakesEncountered}
        totalScore={gameState.totalScore}
        coinBalance={gameState.coins}
        recentActivities={gameState.recentActivities}
        onStartChallenge={handleOpenSquareChallenge}
      />

      {/* Interactive Challenge Modal */}
      {activeChallenge && (
        <ChallengeModal
          challenge={activeChallenge}
          isOpen={isChallengeOpen}
          consecutiveIncorrect={gameState.consecutiveIncorrect}
          onClose={() => setIsChallengeOpen(false)}
          onSubmit={(res, isFirst, isRecovery) => handleCompleteChallenge(res, isFirst, isRecovery, isAutoplayRunning)}
        />
      )}

      {/* Evolution: Route Decision Modal */}
      <RouteModal
        isOpen={isRouteModalOpen}
        tile={currentDecisionTile}
        routeOptions={availableRouteOptions}
        currentSelectedRoute={gameState.currentRouteType}
        onSelectRoute={handleSelectRoute}
        onClose={() => setIsRouteModalOpen(false)}
      />

      {/* Evolution: Intelligent Snake Recovery Modal */}
      <SnakeRecoveryModal
        isOpen={isSnakeRecoveryModalOpen}
        snake={activeIntelligentSnake}
        hasShield={gameState.activeShield}
        onUseShield={() => handleUseAbility('shield')}
        onSelectChoice={handleSelectSnakeChoice}
        onClose={() => setIsSnakeRecoveryModalOpen(false)}
      />

      {/* Evolution: Optimization Ladder Modal */}
      <LadderChoiceModal
        isOpen={isLadderChoiceModalOpen}
        ladder={activeOptimizationLadder}
        hasLadderBoost={gameState.activeLadderBoost}
        onSelectOption={handleSelectLadderOption}
        onClose={() => setIsLadderChoiceModalOpen(false)}
      />

      {/* Evolution: Regional Boss Battle Modal */}
      <BossBattleModal
        isOpen={isBossModalOpen}
        boss={activeBossBattle}
        onVictory={handleBossVictory}
        onClose={() => setIsBossModalOpen(false)}
      />

      {/* Evolution: BugBot Rival Modal */}
      <BugBotModal
        isOpen={isBugBotModalOpen}
        scenario={activeBugBotScenario}
        onVictory={handleBugBotVictory}
        onClose={() => setIsBugBotModalOpen(false)}
      />

      {/* Evolution: Board Mutation Modal */}
      <MutationModal
        isOpen={isMutationModalOpen}
        mutation={activeMutation}
        onResolve={handleResolveMutation}
        onClose={() => setIsMutationModalOpen(false)}
      />

      {/* Evolution: Cognitive Mastery Modal */}
      <MasteryModal
        isOpen={isMasteryModalOpen}
        topicMasteryMap={gameState.topicMasteryMap}
        onClose={() => setIsMasteryModalOpen(false)}
      />

      {/* Cosmetics & Themes Shop Modal */}
      <ShopModal
        isOpen={isShopModalOpen}
        onClose={() => setIsShopModalOpen(false)}
        coinBalance={gameState.coins}
        purchasedIds={gameState.purchasedCosmetics}
        equipped={gameState.equippedCosmetics}
        onPurchaseItem={handlePurchaseCosmetic}
        onEquipItem={handleEquipCosmetic}
      />

      {/* Achievements Modal */}
      <AchievementsModal
        isOpen={isAchievementsModalOpen}
        onClose={() => setIsAchievementsModalOpen(false)}
        achievements={gameState.achievements}
      />

      {/* Spaced Revision Modal */}
      <RevisionModal
        isOpen={isRevisionModalOpen}
        onClose={() => setIsRevisionModalOpen(false)}
        revisionQueue={gameState.learnerProfile.revisionQueue}
        onStartRevision={(sqId) => handleOpenSquareChallenge(sqId)}
      />

      {/* Adaptive Mastery Modal */}
      <AdaptiveModal
        isOpen={isAdaptiveModalOpen}
        onClose={() => setIsAdaptiveModalOpen(false)}
        learnerProfile={gameState.learnerProfile}
        onJumpToSquare={(sqId) => handleOpenSquareChallenge(sqId)}
      />

      {/* Game Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={gameState.settings}
        onUpdateSettings={updateSettings}
      />

      {/* Reset Confirmation Modal */}
      <ResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirmReset={handleResetGame}
      />

      {/* Victory Celebration Modal */}
      <VictoryModal
        isOpen={isVictoryModalOpen}
        onClose={() => setIsVictoryModalOpen(false)}
        onPlayAgain={handleResetGame}
        totalScore={gameState.totalScore}
        laddersClimbed={gameState.laddersClimbed}
      />
    </div>
  );
};

export default App;
