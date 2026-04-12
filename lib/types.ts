export interface HexCoord {
  q: number;
  r: number;
}

export type Player = 'white' | 'black';

export type PieceType = 'queen' | 'beetle' | 'spider' | 'grasshopper' | 'ant';

export interface Piece {
  id: string;
  type: PieceType;
  owner: Player;
}

export interface BoardCell {
  coord: HexCoord;
  pieces: Piece[]; // bottom to top; last element is the active top piece
}

// key = coordKey(q, r) e.g. "3,-1"
export type Board = Map<string, BoardCell>;

export interface GameState {
  board: Board;
  currentPlayer: Player;
  turnNumber: number; // increments each half-turn
  whiteTurns: number;
  blackTurns: number;
  unplacedPieces: {
    white: Piece[];
    black: Piece[];
  };
  queenPlaced: {
    white: boolean;
    black: boolean;
  };
  gameOver: boolean;
  winner: Player | 'draw' | null;
}

export type GameMode = 'hvh' | 'hvc';

export type AiDifficulty = 'easy' | 'medium' | 'hard';

export interface Move {
  type: 'place' | 'move';
  piece: Piece;
  from?: HexCoord;
  to: HexCoord;
}
