import React from 'react';
import { SNAKES_AND_LADDERS } from '../../data/snakesAndLadders';
import { getSquarePercentCoords } from '../../engine/gameEngine';

export const SnakeLadderSvg: React.FC = () => {
  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Soft shadow for ladders */}
        <filter id="ladder-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.25" />
        </filter>

        {/* Soft shadow for snakes */}
        <filter id="snake-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.3" />
        </filter>

        {/* Snake body gradient: coral/red with smooth finish */}
        <linearGradient id="snake-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="50%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>

        {/* Ladder rail gradient: warm golden wood */}
        <linearGradient id="ladder-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
      </defs>

      {/* Render Ladders */}
      {SNAKES_AND_LADDERS.filter(item => item.type === 'ladder').map(ladder => {
        const fromCoord = getSquarePercentCoords(ladder.from);
        const toCoord = getSquarePercentCoords(ladder.to);

        const x1 = fromCoord.x * 10;
        const y1 = fromCoord.y * 10;
        const x2 = toCoord.x * 10;
        const y2 = toCoord.y * 10;

        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy);
        if (length === 0) return null;

        const perpX = (-dy / length) * 8;
        const perpY = (dx / length) * 8;

        const rail1Start = { x: x1 + perpX, y: y1 + perpY };
        const rail1End = { x: x2 + perpX, y: y2 + perpY };
        const rail2Start = { x: x1 - perpX, y: y1 - perpY };
        const rail2End = { x: x2 - perpX, y: y2 - perpY };

        // Generate ladder rungs
        const rungCount = Math.max(4, Math.floor(length / 32));
        const rungs = [];
        for (let i = 1; i < rungCount; i++) {
          const t = i / rungCount;
          const rx1 = rail1Start.x + t * (rail1End.x - rail1Start.x);
          const ry1 = rail1Start.y + t * (rail1End.y - rail1Start.y);
          const rx2 = rail2Start.x + t * (rail2End.x - rail2Start.x);
          const ry2 = rail2Start.y + t * (rail2End.y - rail2Start.y);
          rungs.push(
            <line
              key={`rung-${ladder.id}-${i}`}
              x1={rx1}
              y1={ry1}
              x2={rx2}
              y2={ry2}
              stroke="url(#ladder-gradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          );
        }

        return (
          <g key={ladder.id} filter="url(#ladder-shadow)">
            {/* Left Rail */}
            <line
              x1={rail1Start.x}
              y1={rail1Start.y}
              x2={rail1End.x}
              y2={rail1End.y}
              stroke="url(#ladder-gradient)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Right Rail */}
            <line
              x1={rail2Start.x}
              y1={rail2Start.y}
              x2={rail2End.x}
              y2={rail2End.y}
              stroke="url(#ladder-gradient)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Ladder Rungs */}
            {rungs}
          </g>
        );
      })}

      {/* Render Snakes */}
      {SNAKES_AND_LADDERS.filter(item => item.type === 'snake').map(snake => {
        const headCoord = getSquarePercentCoords(snake.from);
        const tailCoord = getSquarePercentCoords(snake.to);

        const hx = headCoord.x * 10;
        const hy = headCoord.y * 10;
        const tx = tailCoord.x * 10;
        const ty = tailCoord.y * 10;

        const midX = (hx + tx) / 2;
        const midY = (hy + ty) / 2;
        const offset = ((snake.from % 2 === 0) ? 1 : -1) * 45;

        const cp1X = midX + offset;
        const cp1Y = hy + (midY - hy) * 0.4;
        const cp2X = midX - offset;
        const cp2Y = midY + (ty - midY) * 0.6;

        const pathD = `M ${hx} ${hy} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${tx} ${ty}`;

        return (
          <g key={snake.id} filter="url(#snake-shadow)">
            {/* Snake Body */}
            <path
              d={pathD}
              fill="none"
              stroke="url(#snake-gradient)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Snake Spine pattern */}
            <path
              d={pathD}
              fill="none"
              stroke="#FECACA"
              strokeWidth="2"
              strokeDasharray="4 6"
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Snake Head */}
            <circle
              cx={hx}
              cy={hy}
              r="8"
              fill="#DC2626"
              stroke="#991B1B"
              strokeWidth="1.5"
            />
            <circle cx={hx - 2.5} cy={hy - 2} r="1.5" fill="#FFFFFF" />
            <circle cx={hx + 2.5} cy={hy - 2} r="1.5" fill="#FFFFFF" />
            <circle cx={hx - 2.5} cy={hy - 2} r="0.8" fill="#000000" />
            <circle cx={hx + 2.5} cy={hy - 2} r="0.8" fill="#000000" />
          </g>
        );
      })}
    </svg>
  );
};
