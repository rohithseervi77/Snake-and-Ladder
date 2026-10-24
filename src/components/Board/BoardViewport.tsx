import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Crosshair, 
  Trophy, 
  Play, 
  Info,
  Maximize2
} from 'lucide-react';
import { BoardGrid } from './BoardGrid';
import { SquareMetadata } from '../../types/curriculum';

interface BoardViewportProps {
  currentPosition: number;
  completedSquares: number[];
  equippedMarker?: string;
  boardTheme?: string;
  onSelectSquare: (square: SquareMetadata) => void;
}

const ZOOM_STEPS = [0.75, 0.85, 1.0, 1.15, 1.3];
const DEFAULT_ZOOM = 1.0;
const BASE_TILE_WIDTH = 138;
const BASE_TILE_HEIGHT = 118;

export const BoardViewport: React.FC<BoardViewportProps> = ({
  currentPosition,
  completedSquares,
  equippedMarker,
  boardTheme,
  onSelectSquare
}) => {
  const [zoomIndex, setZoomIndex] = useState(() => {
    const saved = localStorage.getItem('board_zoom_level');
    if (saved) {
      const idx = ZOOM_STEPS.indexOf(parseFloat(saved));
      if (idx !== -1) return idx;
    }
    return 2; // index 2 is 1.0 (100%)
  });

  const zoom = ZOOM_STEPS[zoomIndex];
  const viewportRef = useRef<HTMLDivElement>(null);

  // Save zoom preference
  useEffect(() => {
    localStorage.setItem('board_zoom_level', zoom.toString());
  }, [zoom]);

  const handleZoomIn = () => {
    if (zoomIndex < ZOOM_STEPS.length - 1) {
      setZoomIndex(prev => prev + 1);
    }
  };

  const handleZoomOut = () => {
    if (zoomIndex > 0) {
      setZoomIndex(prev => prev - 1);
    }
  };

  const handleResetZoom = () => {
    setZoomIndex(2); // 1.0
  };

  // Smooth scroll to a specific tile ID
  const scrollToTile = useCallback((tileId: number, highlight = true) => {
    const el = document.getElementById(`cell-${tileId}`);
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });

      if (highlight) {
        el.classList.add('ring-8', 'ring-cyan-300', 'animate-pulse');
        setTimeout(() => {
          el.classList.remove('ring-8', 'ring-cyan-300', 'animate-pulse');
        }, 1500);
      }
    }
  }, []);

  // Center on current position when player moves
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToTile(currentPosition, false);
    }, 400);
    return () => clearTimeout(timer);
  }, [currentPosition, scrollToTile]);

  const tileWidth = Math.round(BASE_TILE_WIDTH * zoom);
  const tileHeight = Math.round(BASE_TILE_HEIGHT * zoom);

  return (
    <div className="flex flex-col w-full h-full bg-[#070b14] rounded-2xl border border-slate-800/80 shadow-2xl overflow-hidden">
      {/* 1. TOP VIEWPORT TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-900/95 border-b border-slate-800 z-20 backdrop-blur-md">
        {/* Left: Quick Jump Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => scrollToTile(currentPosition, true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-200 text-xs font-bold transition-all shadow-sm active:scale-95"
            title="Center view on your current board tile"
          >
            <Crosshair className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
            <span>Focus You (Lvl {currentPosition})</span>
          </button>

          <button
            onClick={() => scrollToTile(1, true)}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium transition-all"
            title="Scroll to Level 1 (Start)"
          >
            <Play className="w-3 h-3 text-emerald-400" />
            <span>Start</span>
          </button>

          <button
            onClick={() => scrollToTile(100, true)}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium transition-all"
            title="Scroll to Level 100 (Final Titan)"
          >
            <Trophy className="w-3 h-3 text-amber-400" />
            <span>Finish</span>
          </button>
        </div>

        {/* Right: Board Zoom Controls & Hint */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-400/80 mr-2">
            <Info className="w-3.5 h-3.5 text-slate-500" />
            <span>Click any tile to inspect curriculum & start challenges</span>
          </div>

          <div className="flex items-center bg-slate-950/80 rounded-lg border border-slate-700/80 p-0.5 shadow-inner">
            <button
              onClick={handleZoomOut}
              disabled={zoomIndex === 0}
              className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors rounded"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleResetZoom}
              className="px-2 py-0.5 text-xs font-mono font-bold text-slate-200 hover:text-cyan-400 transition-colors"
              title="Reset Zoom to 100%"
            >
              {Math.round(zoom * 100)}%
            </button>

            <button
              onClick={handleZoomIn}
              disabled={zoomIndex === ZOOM_STEPS.length - 1}
              className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors rounded"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            {zoom !== 1.0 && (
              <button
                onClick={handleResetZoom}
                className="p-1.5 ml-0.5 text-slate-400 hover:text-amber-400 transition-colors rounded border-l border-slate-800"
                title="Reset to 100%"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. SCROLLABLE BOARD CANVAS */}
      <div 
        ref={viewportRef}
        className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 flex items-center justify-start xl:justify-center custom-scrollbar focus:outline-none"
        tabIndex={0}
      >
        <BoardGrid
          currentPosition={currentPosition}
          completedSquares={completedSquares}
          equippedMarker={equippedMarker}
          boardTheme={boardTheme}
          onSelectSquare={onSelectSquare}
          tileWidth={tileWidth}
          tileHeight={tileHeight}
        />
      </div>
    </div>
  );
};
