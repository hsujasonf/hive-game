'use client';

import { PieceType, Player } from '@/game-logic/types';

interface PieceProps {
  type: PieceType;
  owner: Player;
  size?: number;
  stackCount?: number;
}

const PIECE_LABELS: Record<PieceType, string> = {
  queen: 'Q',
  beetle: 'B',
  spider: 'S',
  grasshopper: 'G',
  ant: 'A',
};

const PIECE_NAMES: Record<PieceType, string> = {
  queen: 'Queen Bee',
  beetle: 'Beetle',
  spider: 'Spider',
  grasshopper: 'Grasshopper',
  ant: 'Ant',
};

const PIECE_DESCRIPTIONS: Record<PieceType, string> = {
  queen: 'Moves 1 space. Must be placed by turn 4. Surround her to win!',
  beetle: 'Moves 1 space. Can climb on top of other pieces to pin them.',
  spider: 'Moves exactly 3 spaces around the hive edge. No backtracking.',
  grasshopper: 'Jumps in a straight line over pieces to the first empty space.',
  ant: 'Moves any number of spaces around the hive edge. Very mobile!',
};

const PIECE_IMAGES: Record<PieceType, string> = {
  queen: '/queen_bee.jpg',
  beetle: '/beetle.png',
  spider: '/spider.png',
  grasshopper: '/grasshopper.png',
  ant: '/ant.jpg',
};

// Distinct accent color per piece type
const PIECE_TYPE_COLORS: Record<PieceType, { accent: string; accentDark: string }> = {
  queen:       { accent: '#F59E0B', accentDark: '#D97706' },
  beetle:      { accent: '#8B5CF6', accentDark: '#7C3AED' },
  spider:      { accent: '#EF4444', accentDark: '#DC2626' },
  grasshopper: { accent: '#22C55E', accentDark: '#16A34A' },
  ant:         { accent: '#3B82F6', accentDark: '#2563EB' },
};

export const getPieceColor = (owner: Player): { fill: string; stroke: string; text: string } => {
  if (owner === 'white') {
    return { fill: '#FFF8E7', stroke: '#8B7355', text: '#5C4033' };
  }
  return { fill: '#2C2C2C', stroke: '#555555', text: '#E8E8E8' };
}

export const PieceSVG = ({ type, owner, size = 28, stackCount }: PieceProps) => {
  const { stroke } = getPieceColor(owner);
  const typeColor = PIECE_TYPE_COLORS[type];
  const imgSize = size * 0.9;
  const clipId = `clip-${type}-${owner}-${Math.random().toString(36).slice(2, 7)}`;

  return (
    <g>
      <title>{`${PIECE_NAMES[type]}: ${PIECE_DESCRIPTIONS[type]}`}</title>
      {/* Colored ring for piece type */}
      <circle r={size * 0.58} fill="none" stroke={typeColor.accent} strokeWidth={2.5} opacity={0.85} />
      {/* Background circle */}
      <circle r={size * 0.48} fill={owner === 'white' ? '#FFF8E7' : '#2C2C2C'} stroke={stroke} strokeWidth={1.5} />
      {/* Clipped insect image */}
      <defs>
        <clipPath id={clipId}>
          <circle r={size * 0.43} />
        </clipPath>
      </defs>
      <image
        href={PIECE_IMAGES[type]}
        x={-imgSize / 2}
        y={-imgSize / 2}
        width={imgSize}
        height={imgSize}
        clipPath={`url(#${clipId})`}
        style={{ pointerEvents: 'none' }}
        opacity={owner === 'black' ? 0.85 : 1}
      />
      {/* Dark overlay for black pieces to distinguish sides */}
      {owner === 'black' && (
        <circle r={size * 0.43} fill="rgba(0,0,0,0.35)" style={{ pointerEvents: 'none' }} />
      )}
      {stackCount && stackCount > 1 && (
        <g>
          <circle cx={size * 0.4} cy={-size * 0.35} r={size * 0.22} fill="#ff6b35" stroke="#fff" strokeWidth={1} />
          <text
            x={size * 0.4}
            y={-size * 0.35}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#fff"
            fontSize={size * 0.25}
            fontWeight="bold"
            style={{ pointerEvents: 'none' }}
          >
            {stackCount}
          </text>
        </g>
      )}
    </g>
  );
}

export { PIECE_NAMES, PIECE_LABELS, PIECE_DESCRIPTIONS, PIECE_TYPE_COLORS, PIECE_IMAGES };
