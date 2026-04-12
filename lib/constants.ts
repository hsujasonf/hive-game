import { PieceType } from './types';

export const PIECE_COUNTS: Record<PieceType, number> = {
  queen: 1,
  beetle: 2,
  spider: 2,
  grasshopper: 3,
  ant: 3,
};

export const HEX_SIZE = 40;

export const QUEEN_DEADLINE = 4;

export const TOTAL_PIECES_PER_PLAYER = 11;
