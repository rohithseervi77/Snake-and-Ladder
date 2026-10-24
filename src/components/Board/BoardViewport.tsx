import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Crosshair, 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp, 
  ChevronDown,
  Compass, 
  ArrowRight,
  Eye
} from 'lucide-react';
import { BoardGrid } from './BoardGrid';
import { SquareMetadata } from '../../types/curriculum';
import { TopicMasteryScore } from '../../types/evolution';

interface BoardViewportProps {
  currentPosition: number;
  completedSquares: number[];
  equippedMarker?: string;
  boardTheme?: string;
  onSelectSquare: (square: SquareMetadata) => void;
  topicMasteryMap?: Record<string, TopicMasteryScore>;
}

const ZOOM_STEPS = [0.75, 0.85, 1.0, 1.15, 1.3];
const BASE_TILE_WIDTH = 138;
const BASE_TILE_HEIGHT = 118;

const ROW_SECTIONS = [
  { label: '1–10', center: 5, min: 1, max: 10 },
  { label: '11–20', center: 15, min: 11, max: 20 },
  { label: '21–30', center: 25, min: 21, max: 30 },
  { label: '31–40', center: 35, min: 31, max: 40 },
  { label: '41–50', center: 45, min: 41, max: 50 },
  { label: '51–60', center: 55, min: 51, max: 60 },
  { label: '61–70', center: 65, min: 61, max: 70 },
  { label: '71–80', center: 75, min: 71, max: 80 },
  { label: '81–90', center: 85, min: 81, max: 90 },
  { label: '91–100', center: 95, min: 91, max: 100 },
];

export const BoardViewport: React.FC<BoardViewportProps> = ({
  currentPosition,
  completedSquares,
  equippedMarker,
  boardTheme,
  onSelectSquare,
  topicMasteryMap
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

  // Jump input state
  const [jumpInput, setJumpInput] = useState<string>('');
  const [jumpError, setJumpError] = useState<boolean>(false);

  // Scroll visibility cues state
  const [canScrollUp, setCanScrollUp] = useState<boolean>(false);
  const [canScrollDown, setCanScrollDown] = useState<boolean>(false);
  const [visibleRangeText, setVisibleRangeText] = useState<string>('Levels 1–100');

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

  // Robust geometric centering to any tile inside the viewport container
  const scrollToTile = useCallback((tileId: number, highlight = true) => {
    const container = viewportRef.current;
    if (!container) return;

    const clampedId = Math.max(1, Math.min(100, Math.round(tileId)));
    const el = document.getElementById(`cell-${clampedId}`);
    if (!el) return;

    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    const currentScrollTop = container.scrollTop;
    const currentScrollLeft = container.scrollLeft;

    const deltaY = (elRect.top - containerRect.top) - (containerRect.height / 2) + (elRect.height / 2);
    const deltaX = (elRect.left - containerRect.left) - (containerRect.width / 2) + (elRect.width / 2);

    container.scrollTo({
      top: Math.max(0, currentScrollTop + deltaY),
      left: Math.max(0, currentScrollLeft + deltaX),
      behavior: 'smooth'
    });

    if (highlight) {
      // Remove any existing highlight first
      document.querySelectorAll('.tile-focus-pulse').forEach(node => {
        node.classList.remove('tile-focus-pulse');
      });

      el.classList.add('tile-focus-pulse');
      setTimeout(() => {
        el.classList.remove('tile-focus-pulse');
      }, 2000);
    }
  }, []);

  // Update visible range and scroll cues on scroll
  const handleScroll = useCallback(() => {
    const container = viewportRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    setCanScrollUp(scrollTop > 40);
    setCanScrollDown(scrollTop + clientHeight < scrollHeight - 40);

    // Calculate approximate visible levels based on row geometry
    // In our 10x10 board:
    // Row 0 is Top (levels 91-100)
    // Row 9 is Bottom (levels 1-10)
    const containerRect = container.getBoundingClientRect();
    let minId = 100;
    let maxId = 1;
    let anyFound = false;

    // Check sample tile samples to locate bounding levels in view
    for (let id = 1; id <= 100; id += 2) {
      const el = document.getElementById(`cell-${id}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom > containerRect.top && rect.top < containerRect.bottom) {
          anyFound = true;
          if (id < minId) minId = id;
          if (id > maxId) maxId = id;
        }
      }
    }

    if (anyFound) {
      setVisibleRangeText(`Levels ${minId}–${maxId} of 100`);
    }
  }, []);

  // Initial scroll to player's current tile on mount or when currentPosition moves
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToTile(currentPosition, false);
      handleScroll();
    }, 350);
    return () => clearTimeout(timer);
  }, [currentPosition, scrollToTile, handleScroll]);

  // Jump to Level handler
  const handleJumpSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const num = parseInt(jumpInput.trim(), 10);
    if (!isNaN(num) && num >= 1 && num <= 100) {
      setJumpError(false);
      scrollToTile(num, true);
      setJumpInput('');
    } else {
      setJumpError(true);
      setTimeout(() => setJumpError(false), 2000);
    }
  };

  // Scroll page up/down buttons
  const scrollPage = (direction: 'up' | 'down') => {
    const container = viewportRef.current;
    if (!container) return;
    const delta = direction === 'up' ? -container.clientHeight * 0.75 : container.clientHeight * 0.75;
    container.scrollBy({ top: delta, behavior: 'smooth' });
  };

  const tileWidth = Math.round(BASE_TILE_WIDTH * zoom);
  const tileHeight = Math.round(BASE_TILE_HEIGHT * zoom);

  return (
    <div className="flex flex-col w-full h-full bg-[#0B1220] rounded-2xl border border-[#263449] shadow-2xl overflow-hidden relative">
      {/* 1. TOP VIEWPORT TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2 bg-[#111827] border-b border-[#263449] z-30 backdrop-blur-md shrink-0">
        {/* Left: Focus & Stepper Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {/* Focus You Button */}
          <button
            onClick={() => scrollToTile(currentPosition, true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2563EB]/20 hover:bg-[#2563EB]/30 border border-[#2563EB]/60 text-[#22D3EE] text-xs font-black transition-all shadow-md active:scale-95 cursor-pointer"
            title="Smoothly center and highlight your current position"
          >
            <Crosshair className="w-3.5 h-3.5 text-[#22D3EE] animate-spin-slow" />
            <span>Focus You (Lvl {currentPosition})</span>
          </button>

          {/* Previous / Next Level Stepper */}
          <div className="flex items-center bg-[#080D1A] rounded-xl border border-[#263449] p-0.5 shadow-inner">
            <button
              onClick={() => scrollToTile(currentPosition - 1, true)}
              disabled={currentPosition <= 1}
              className="flex items-center gap-0.5 px-2 py-1 text-[#94A3B8] hover:text-[#F8FAFC] disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold transition rounded-lg cursor-pointer"
              title={`View previous level (${currentPosition - 1})`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lvl {currentPosition - 1}</span>
            </button>

            <span className="text-[10px] text-[#64748B] px-1 font-mono">|</span>

            <button
              onClick={() => scrollToTile(currentPosition + 1, true)}
              disabled={currentPosition >= 100}
              className="flex items-center gap-0.5 px-2 py-1 text-[#94A3B8] hover:text-[#F8FAFC] disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold transition rounded-lg cursor-pointer"
              title={`View next level (${currentPosition + 1})`}
            >
              <span className="hidden sm:inline">Lvl {currentPosition + 1}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Jump to Level Input */}
          <form onSubmit={handleJumpSubmit} className="flex items-center gap-1">
            <div className="relative">
              <input
                type="number"
                min="1"
                max="100"
                value={jumpInput}
                onChange={(e) => setJumpInput(e.target.value)}
                placeholder="1–100"
                className={`w-16 sm:w-20 px-2 py-1 rounded-lg bg-[#080D1A] border text-xs font-mono font-bold text-[#F8FAFC] placeholder-[#64748B] focus:outline-none transition ${
                  jumpError 
                    ? 'border-[#F43F5E] ring-2 ring-[#F43F5E]/30' 
                    : 'border-[#263449] focus:border-[#22D3EE]'
                }`}
                title="Enter any level number from 1 to 100"
              />
            </div>
            <button
              type="submit"
              className="px-2.5 py-1 rounded-lg bg-[#2563EB] hover:bg-[#3B82F6] text-[#F8FAFC] text-xs font-bold transition cursor-pointer active:scale-95"
            >
              Go
            </button>
          </form>
        </div>

        {/* Right: Position Indicator & Zoom Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Viewport Position Indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#080D1A] border border-[#263449] text-[11px] font-mono text-[#94A3B8] shadow-inner">
            <Eye className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
            <span className="font-semibold text-[#F8FAFC]">{visibleRangeText}</span>
          </div>

          {/* Zoom Toolbar */}
          <div className="flex items-center bg-[#080D1A] rounded-xl border border-[#263449] p-0.5 shadow-inner">
            <button
              onClick={handleZoomOut}
              disabled={zoomIndex === 0}
              className="p-1.5 text-[#94A3B8] hover:text-[#F8FAFC] disabled:opacity-30 disabled:hover:text-[#64748B] transition-colors rounded cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleResetZoom}
              className="px-2 py-0.5 text-xs font-mono font-bold text-[#F8FAFC] hover:text-[#22D3EE] transition-colors cursor-pointer"
              title="Reset Zoom to 100%"
            >
              {Math.round(zoom * 100)}%
            </button>

            <button
              onClick={handleZoomIn}
              disabled={zoomIndex === ZOOM_STEPS.length - 1}
              className="p-1.5 text-[#94A3B8] hover:text-[#F8FAFC] disabled:opacity-30 disabled:hover:text-[#64748B] transition-colors rounded cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            {zoom !== 1.0 && (
              <button
                onClick={handleResetZoom}
                className="p-1.5 ml-0.5 text-[#94A3B8] hover:text-[#F59E0B] transition-colors rounded border-l border-[#263449] cursor-pointer"
                title="Reset to 100%"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. SECTION / ROW NAVIGATION CHIPS (1-10 ... 91-100) */}
      <div className="flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 bg-[#111827]/90 border-b border-[#263449] overflow-x-auto text-[11px] font-mono shrink-0 custom-scrollbar z-20">
        <span className="text-[#94A3B8] font-semibold uppercase text-[10px] tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <Compass className="w-3 h-3 text-[#22D3EE]" />
          <span>Jump Row:</span>
        </span>
        {ROW_SECTIONS.map((sec) => {
          const isPlayerInRow = currentPosition >= sec.min && currentPosition <= sec.max;
          return (
            <button
              key={sec.label}
              onClick={() => scrollToTile(sec.center, true)}
              className={`px-2 py-0.5 rounded-md font-bold transition shrink-0 cursor-pointer text-xs ${
                isPlayerInRow
                  ? 'bg-[#2563EB]/25 border border-[#2563EB] text-[#22D3EE] shadow-sm shadow-[#2563EB]/30'
                  : 'bg-[#172033] hover:bg-[#1E293B] border border-[#263449] text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
              title={`Scroll to levels ${sec.label}`}
            >
              {sec.label}
              {isPlayerInRow && <span className="ml-1 text-[9px] text-[#22D3EE]">●</span>}
            </button>
          );
        })}
      </div>

      {/* 3. SCROLLABLE BOARD CANVAS (No vertical centering flex to ensure 0-max scrollability!) */}
      <div 
        ref={viewportRef}
        onScroll={handleScroll}
        className="flex-1 w-full overflow-x-auto overflow-y-auto board-scroll-viewport relative select-none scroll-smooth focus:outline-none"
        tabIndex={0}
      >
        {/* Inner canvas wrapper:
            - items-center centers horizontally on wide displays
            - justify-start aligns content from top (Row 10 / Lvl 100)
            - pb-36 provides abundant bottom margin so Row 1 (Lvl 1-10) is fully accessible and centered
        */}
        <div className="min-w-fit min-h-fit w-full flex flex-col items-center justify-start p-4 sm:p-8 pb-36 sm:pb-48">
          <BoardGrid
            currentPosition={currentPosition}
            completedSquares={completedSquares}
            equippedMarker={equippedMarker}
            boardTheme={boardTheme}
            onSelectSquare={onSelectSquare}
            tileWidth={tileWidth}
            tileHeight={tileHeight}
            topicMasteryMap={topicMasteryMap}
          />
        </div>
      </div>

      {/* 4. SUBTLE SCROLL DIRECTION CUES */}
      {canScrollUp && (
        <button
          onClick={() => scrollPage('up')}
          className="absolute top-20 left-1/2 -translate-x-1/2 z-30 px-3 py-1 rounded-full bg-[#111827]/95 hover:bg-[#172033] border border-[#263449] text-[#22D3EE] text-[11px] font-bold shadow-xl backdrop-blur-md flex items-center gap-1.5 transition-all animate-bounce cursor-pointer active:scale-95"
          title="Scroll up to view higher levels"
        >
          <ChevronUp className="w-3.5 h-3.5 text-[#22D3EE]" />
          <span>Levels Above (Scroll Up)</span>
        </button>
      )}

      {canScrollDown && (
        <button
          onClick={() => scrollPage('down')}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 px-3 py-1 rounded-full bg-[#111827]/95 hover:bg-[#172033] border border-[#263449] text-[#22D3EE] text-[11px] font-bold shadow-xl backdrop-blur-md flex items-center gap-1.5 transition-all animate-bounce cursor-pointer active:scale-95"
          title="Scroll down to view lower levels"
        >
          <ChevronDown className="w-3.5 h-3.5 text-[#22D3EE]" />
          <span>Levels Below (Scroll Down)</span>
        </button>
      )}
    </div>
  );
};
