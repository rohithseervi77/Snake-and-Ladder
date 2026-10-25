import React, { useMemo, useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { SQUARE_MAP, CURRICULUM_100 } from './data/curriculum100';
import { Header } from './components/Header';
import { LeftSidebar } from './components/Sidebars/LeftSidebar';
import { RightSidebar } from './components/Sidebars/RightSidebar';
import { MobileDrawer } from './components/Sidebars/MobileDrawer';
import { BoardViewport } from './components/Board/BoardViewport';
import { DiceControls } from './components/Controls/DiceControls';
import { ChallengeModal } from './components/Challenges/ChallengeModal';
import { ResetModal } from './components/Dashboard/ResetModal';
import { SettingsModal } from './components/Dashboard/SettingsModal';
import { VictoryModal } from './components/Dashboard/VictoryModal';
import { SyllabusModal } from './components/Dashboard/SyllabusModal';
import { PracticeModeModal } from './components/Dashboard/PracticeModeModal';
import { ExamModeModal } from './components/Dashboard/ExamModeModal';
import { DSALabModal } from './components/Dashboard/DSALabModal';
import { MovementToast } from './components/Common/MovementToast';
import { SquareMetadata } from './types/curriculum';

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
    isSettingsModalOpen,
    isVictoryModalOpen,
    currentNotification,
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
    handleAwardReward,
    handleRecordPracticeMistake,
    dismissNotification,

    handleUseAbility,

    setIsResetModalOpen,
    setIsSettingsModalOpen,
    setIsVictoryModalOpen,
    setIsChallengeOpen
  } = useGameState();

  const [inspectingSquare, setInspectingSquare] = useState<SquareMetadata | null>(null);

  // Student Academic Modals State
  const [isSyllabusOpen, setIsSyllabusOpen] = useState<boolean>(false);
  const [isPracticeModeOpen, setIsPracticeModeOpen] = useState<boolean>(false);
  const [isExamModeOpen, setIsExamModeOpen] = useState<boolean>(false);
  const [isDSALabOpen, setIsDSALabOpen] = useState<boolean>(false);

  const currentSquare = useMemo(() => {
    return SQUARE_MAP.get(displayedPosition) || CURRICULUM_100[0];
  }, [displayedPosition]);

  const activeFocusSquare = inspectingSquare || currentSquare;

  return (
    <div className="min-h-screen w-full bg-[var(--app-bg)] text-[var(--text-primary)] flex flex-col font-sans select-none antialiased transition-colors duration-200">
      {/* 1. Header: Clean Student Project Navbar */}
      <Header
        totalXp={gameState.totalScore}
        coinBalance={gameState.coins}
        streak={gameState.streak}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onOpenReset={() => setIsResetModalOpen(true)}
        onOpenSyllabus={() => setIsSyllabusOpen(true)}
        onOpenPracticeMode={() => setIsPracticeModeOpen(true)}
        onOpenExamMode={() => setIsExamModeOpen(true)}
        onOpenDSALab={() => setIsDSALabOpen(true)}
      />

      {/* Floating Movement Notification Toast */}
      <MovementToast
        notification={currentNotification}
        onDismiss={dismissNotification}
      />

      {/* 2. Main 3-Section Game Layout */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-4 py-3 flex flex-col lg:flex-row gap-4 items-start justify-center">
        {/* Left Section: How to Play & Syllabus Units */}
        <section className="w-full lg:w-60 xl:w-64 shrink-0 order-2 lg:order-1">
          <LeftSidebar />
        </section>

        {/* Center Section: Snake & Ladder Board + Roll Dice */}
        <section className="flex-1 w-full flex flex-col items-center gap-3 order-1 lg:order-2">
          {/* Authentic 100-Square Game Board */}
          <div className="w-full flex items-center justify-center">
            <BoardViewport
              currentPosition={displayedPosition}
              selectedSquareId={activeFocusSquare.id}
              completedSquares={gameState.completedSquares}
              equippedMarker={gameState.equippedCosmetics.playerMarker}
              onSelectSquare={(sq) => setInspectingSquare(sq)}
            />
          </div>

          {/* Simple Bottom Roll Dice Control Bar */}
          <DiceControls
            currentPosition={displayedPosition}
            lastDiceRoll={lastDiceRoll}
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

        {/* Right Section: Current Challenge & Your Stats */}
        <section className="w-full lg:w-72 xl:w-80 shrink-0 order-3">
          <RightSidebar
            currentSquare={activeFocusSquare}
            totalAttempts={gameState.learnerProfile.totalAttempts}
            totalCorrect={gameState.learnerProfile.totalCorrect}
            accuracy={gameState.learnerProfile.overallAccuracy}
            streak={gameState.streak}
            totalScore={gameState.totalScore}
            onStartChallenge={(sqId) => handleOpenSquareChallenge(sqId)}
          />
        </section>
      </main>

      {/* Mobile Drawer for Small Screens */}
      <MobileDrawer
        currentSquare={activeFocusSquare}
        totalAttempts={gameState.learnerProfile.totalAttempts}
        totalCorrect={gameState.learnerProfile.totalCorrect}
        accuracy={gameState.learnerProfile.overallAccuracy}
        streak={gameState.streak}
        totalScore={gameState.totalScore}
        onStartChallenge={(sqId) => handleOpenSquareChallenge(sqId)}
      />

      {/* 3. Challenge Dialog Modal */}
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

      {/* Syllabus Modal */}
      <SyllabusModal
        isOpen={isSyllabusOpen}
        onClose={() => setIsSyllabusOpen(false)}
        completedSquares={gameState.completedSquares}
        onSelectRange={([start]) => handleOpenSquareChallenge(start)}
      />

      {/* Practice Mode (10 Questions per Outcome with Explanations) */}
      <PracticeModeModal
        isOpen={isPracticeModeOpen}
        onClose={() => setIsPracticeModeOpen(false)}
        onRecordResult={handleAwardReward}
        onRecordMistake={handleRecordPracticeMistake}
      />

      {/* Exam Mode (20 Questions Timed Mock Test) */}
      <ExamModeModal
        isOpen={isExamModeOpen}
        onClose={() => setIsExamModeOpen(false)}
        onRecordResult={handleAwardReward}
      />

      {/* DSA Interactive Mechanics Laboratory (10 Visual Simulations) */}
      <DSALabModal
        isOpen={isDSALabOpen}
        onClose={() => setIsDSALabOpen(false)}
        onAwardReward={handleAwardReward}
      />

      {/* Settings Modal */}
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
    </div>
  );
};

export default App;
