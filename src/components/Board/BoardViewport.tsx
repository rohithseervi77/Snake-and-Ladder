import React from 'react';
import { BoardGrid } from './BoardGrid';
import { SquareMetadata } from '../../types/curriculum';
import { TopicMasteryScore } from '../../types/evolution';

interface BoardViewportProps {
  currentPosition: number;
  selectedSquareId?: number | null;
  completedSquares: number[];
  equippedMarker?: string;
  boardTheme?: string;
  onSelectSquare: (square: SquareMetadata) => void;
  topicMasteryMap?: Record<string, TopicMasteryScore>;
}

export const BoardViewport: React.FC<BoardViewportProps> = ({
  currentPosition,
  selectedSquareId,
  completedSquares,
  equippedMarker,
  onSelectSquare
}) => {
  return (
    <div className="w-full h-full flex items-center justify-center overflow-auto p-1 sm:p-2 scrollbar-none">
      <BoardGrid
        currentPosition={currentPosition}
        selectedSquareId={selectedSquareId}
        completedSquares={completedSquares}
        equippedMarker={equippedMarker}
        onSelectSquare={onSelectSquare}
      />
    </div>
  );
};
