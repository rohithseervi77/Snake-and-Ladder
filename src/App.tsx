import React, { useMemo, useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { SQUARE_MAP, CURRICULUM_100 } from './data/curriculum100';
import { Header } from './components/Header';
import { LeftSidebar } from './components/Sidebars/LeftSidebar';
import { RightSidebar } from './components/Sidebars/RightSidebar';
import { MobileDrawer } from './components/Sidebars/MobileDrawer';
import { BoardViewport } from './components/Board/BoardViewport';
import { TileDetailModal } from './components/Board/TileDetailModal';
import { DiceControls } from './components/Controls/DiceControls';
import { ChallengeModal } from './components/Challenges/ChallengeModal';
import { ResetModal } from './components/Dashboard/ResetModal';
import { RevisionModal } from './components/Dashboard/RevisionModal';
import { AdaptiveModal } from './components/Dashboard/AdaptiveModal';
import { SettingsModal } from './components/Dashboard/SettingsModal';
import { VictoryModal } from './components/Dashboard/VictoryModal';
import { ShopModal } from './components/Shop/ShopModal';
import { AchievementsModal } from './components/Achievements/AchievementsModal';
import { MovementToast } from './components/Common/MovementToast';
import { SquareMetadata } from './types/curriculum';

// Evolution Components
import { EnergyActionBar } from './components/Evolution/EnergyActionBar';
import { RouteModal } from './components/Evolution/RouteModal';
import { SnakeRecoveryModal } from './components/Evolution/SnakeRecoveryModal';
import { LadderChoiceModal } from './components/Evolution/LadderChoiceModal';
import { BossBattleModal } from './components/Evolution/BossBattleModal';
import { BugBotModal } from './components/Evolution/BugBotModal';
import { MutationModal } from './components/Evolution/MutationModal';
import { MasteryModal } from './components/Evolution/MasteryModal';

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

  const [inspectingSquare, setInspectingSquare] = useState<SquareMetadata | null>(null);
  const [showLeftSidebar, setShowLeftSidebar] = useState<boolean>(true);
  const [showRightSidebar, setShowRightSidebar] = useState<boolean>(true);

  const currentSquare = useMemo(() => {
    return SQUARE_MAP.get(displayedPosition) || CURRICULUM_100[0];
  }, [displayedPosition]);

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden w-full bg-[#080d1a] text-slate-100 flex flex-col font-sans select-none antialiased">
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
      <main className="flex-1 w-full max-w-[1920px] mx-auto px-2 sm:px-3 py-1 sm:py-2 flex flex-col lg:flex-row gap-2.5 xl:gap-3.5 items-stretch justify-center overflow-hidden">
        {/* Left Sidebar: Rules & Legend */}
        {showLeftSidebar && (
          <div className="hidden lg:flex flex-col flex-shrink-0 w-60 xl:w-64 max-h-[calc(100vh-68px)] overflow-y-auto pr-1 scrollbar-thin transition-all">
            <LeftSidebar />
          </div>
        )}

        {/* Center Board & Controls */}
        <section className="flex-1 w-full flex flex-col items-center justify-between gap-1.5 h-full max-h-[calc(100vh-68px)] min-h-0 overflow-hidden">
          {/* Top Row: Sidebar Toggles & Energy Action Bar */}
          <div className="w-full flex items-center gap-2">
            <button
              onClick={() => setShowLeftSidebar(prev => !prev)}
              className={`hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition shadow-sm shrink-0 active:scale-95 ${
                showLeftSidebar 
                  ? 'bg-slate-800/90 hover:bg-slate-700 border-slate-700 text-slate-300' 
                  : 'bg-cyan-600/30 hover:bg-cyan-600/40 border-cyan-500/50 text-cyan-200'
              }`}
              title={showLeftSidebar ? 'Collapse Rules & Legend Sidebar' : 'Show Rules & Legend Sidebar'}
            >
              <span>{showLeftSidebar ? '◀ Legend' : '▶ Legend'}</span>
            </button>

            <div className="flex-1 min-w-0">
              <EnergyActionBar
                energy={gameState.energy}
                hasShield={gameState.activeShield}
                hasLadderBoost={gameState.activeLadderBoost}
                canReroll={!isRolling && !isMoving && !isAutoplayRunning}
                turn={gameState.turnsCompleted + 1}
                currentRouteType={gameState.currentRouteType}
                onOpenCrossroads={() => triggerDecisionCrossroads(15)}
                onOpenBugBot={() => triggerBugBotDuel()}
                onUseAbility={handleUseAbility}
              />
            </div>

            <button
              onClick={() => setShowRightSidebar(prev => !prev)}
              className={`hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition shadow-sm shrink-0 active:scale-95 ${
                showRightSidebar 
                  ? 'bg-slate-800/90 hover:bg-slate-700 border-slate-700 text-slate-300' 
                  : 'bg-cyan-600/30 hover:bg-cyan-600/40 border-cyan-500/50 text-cyan-200'
              }`}
              title={showRightSidebar ? 'Collapse Stats Sidebar' : 'Show Stats Sidebar'}
            >
              <span>{showRightSidebar ? 'Stats ▶' : 'Stats ◀'}</span>
            </button>
          </div>

          {/* 1-100 Serpentine Board with Dedicated Zoom & Viewport */}
          <div className="flex-1 w-full min-h-0">
            <BoardViewport
              currentPosition={displayedPosition}
              completedSquares={gameState.completedSquares}
              equippedMarker={gameState.equippedCosmetics.playerMarker}
              boardTheme={gameState.equippedCosmetics.boardTheme}
              onSelectSquare={(sq) => setInspectingSquare(sq)}
            />
          </div>

          {/* Unified Dice & Autoplay Movement Controller */}
          <DiceControls
            currentPosition={displayedPosition}
            lastDiceRoll={lastDiceRoll}
            diceSkin={gameState.equippedCosmetics.diceSkin}
            isRolling={isRolling}
            isMoving={isMoving}
            isAutoplayRunning={isAutoplayRunning}
            isAutoplayPaused={isAutoplayPaused}
            autoplaySpeed={autoplaySpeed}
            onRollDice={handleRollDice}
            onStartAutoplay={startAutoplay}
            onPauseAutoplay={pauseAutoplay}
            onResumeAutoplay={resumeAutoplay}
            onStopAutoplay={stopAutoplay}
            onSetAutoplaySpeed={setAutoplaySpeed}
          />
        </section>

        {/* Right Sidebar: Focus & Progression */}
        {showRightSidebar && (
          <div className="hidden lg:flex flex-col flex-shrink-0 w-64 xl:w-72 max-h-[calc(100vh-68px)] overflow-y-auto pr-1 scrollbar-thin transition-all">
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
        )}
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
          energy={gameState.energy}
          activeShield={gameState.activeShield}
          activeSecondChance={gameState.activeSecondChance}
          onClose={() => setIsChallengeOpen(false)}
          onSubmit={(res, isFirst, isRecovery) => handleCompleteChallenge(res, isFirst, isRecovery, isAutoplayRunning)}
          onUseAbility={handleUseAbility}
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
        coins={gameState.coins}
        laddersClimbed={gameState.laddersClimbed}
        snakesEncountered={gameState.snakesEncountered}
        turnsCompleted={gameState.turnsCompleted}
        questionsAttempted={gameState.questionsAttempted}
        questionsCorrect={gameState.questionsCorrect}
        longestStreak={gameState.longestStreak}
        energyUsed={gameState.energyUsed}
        topicMasteryMap={gameState.topicMasteryMap}
      />

      {/* Tile Curriculum & Checkpoint Inspection Modal */}
      <TileDetailModal
        square={inspectingSquare}
        isOpen={inspectingSquare !== null}
        isCurrent={inspectingSquare?.id === displayedPosition}
        isCompleted={inspectingSquare ? gameState.completedSquares.includes(inspectingSquare.id) : false}
        onClose={() => setInspectingSquare(null)}
        onStartChallenge={(sqId) => {
          setInspectingSquare(null);
          handleOpenSquareChallenge(sqId);
        }}
      />
    </div>
  );
};

export default App;
