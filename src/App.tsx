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
    setIsResetModalOpen,
    setIsRevisionModalOpen,
    setIsAdaptiveModalOpen,
    setIsSettingsModalOpen,
    setIsVictoryModalOpen,
    setIsShopModalOpen,
    setIsAchievementsModalOpen,
    setIsChallengeOpen
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
      />

      {/* Floating Movement Reward / Penalty / Level-Up Toast */}
      <MovementToast
        notification={currentNotification}
        onDismiss={dismissNotification}
      />

      {/* Main Game Dashboard */}
      <main className="flex-1 w-full max-w-[1720px] mx-auto p-2 sm:p-4 md:p-6 flex flex-col lg:flex-row gap-4 items-start justify-center">
        {/* Left Sidebar: Rules & Legend (Hidden on mobile, accessible via bottom drawer) */}
        <div className="hidden lg:block flex-shrink-0">
          <LeftSidebar />
        </div>

        {/* Center Board & Controls */}
        <section className="flex-1 w-full flex flex-col items-center justify-center">
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

      {/* Interactive Challenge Modal with Stakes, Penalties & Retries */}
      {activeChallenge && (
        <ChallengeModal
          challenge={activeChallenge}
          isOpen={isChallengeOpen}
          consecutiveIncorrect={gameState.consecutiveIncorrect}
          onClose={() => setIsChallengeOpen(false)}
          onSubmit={(res, isFirst, isRecovery) => handleCompleteChallenge(res, isFirst, isRecovery, isAutoplayRunning)}
        />
      )}

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
