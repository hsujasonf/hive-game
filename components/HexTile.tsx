'use client';

import { Player } from '@/lib/types';
import { HEX_SIZE } from '@/lib/constants';

interface HexTileProps {
  x: number;
  y: number;
  isSelected?: boolean;
  isValidTarget?: boolean;
  isOccupied?: boolean;
  owner?: Player;
  onClick?: () => void;
  children?: React.ReactNode;
}

function hexPoints(size: number): string {
  const points: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i - 30);
    const px = size * Math.cos(angle);
    const py = size * Math.sin(angle);
    points.push(`${px},${py}`);
  }
  return points.join(' ');
}

export function HexTile({ x, y, isSelected, isValidTarget, isOccupied, owner, onClick, children }: HexTileProps) {
  let fill = 'transparent';
  let stroke = 'transparent';
  let strokeWidth = 1;
  let cursor = 'default';

  if (isSelected) {
    // Selected piece: blue highlight over the player color
    fill = owner === 'black' ? '#1e3a5f' : '#bfdbfe';
    stroke = '#3b82f6';
    strokeWidth = 2.5;
    cursor = 'pointer';
  } else if (isValidTarget) {
    fill = 'rgba(34, 197, 94, 0.3)';
    stroke = '#22c55e';
    strokeWidth = 2;
    cursor = 'pointer';
  } else if (isOccupied && owner) {
    // Fill the hex with the player's color
    fill = owner === 'white' ? '#FFF8E7' : '#2C2C2C';
    stroke = owner === 'white' ? '#8B7355' : '#555555';
    strokeWidth = 1.5;
    cursor = 'pointer';
  }

  return (
    <g
      transform={`translate(${x}, ${y})`}
      onClick={onClick}
      style={{ cursor }}
    >
      <polygon
        points={hexPoints(HEX_SIZE)}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {children}
    </g>
  );
}
