import { Board, BoardCell, GameState, GameMode, HexCoord, Move, Piece, PieceType, Player } from './types';
import { coordKeyFromHex, getNeighbors } from './hex';
import { PIECE_COUNTS } from './constants';
import { getValidPlacements, getPlaceablePieceTypes } from './placement';
import { getMovesForPiece } from './movement';

const createPieces = (owner: Player): Piece[] => {
  const pieces: Piece[] = [];
  for (const [type, count] of Object.entries(PIECE_COUNTS)) {
    for (let i = 0; i < count; i++) {
      pieces.push({
        id: `${owner}-${type}-${i}`,
        type: type as PieceType,
        owner,
      });
    }
  }
  return pieces;
};

export const createInitialState = (): GameState => {
  return {
    board: new Map(),
    currentPlayer: 'white',
    turnNumber: 0,
    whiteTurns: 0,
    blackTurns: 0,
    unplacedPieces: {
      white: createPieces('white'),
      black: createPieces('black'),
    },
    queenPlaced: { white: false, black: false },
    gameOver: false,
    winner: null,
  };
};

export const cloneBoard = (board: Board): Board => {
  const newBoard = new Map<string, BoardCell>();
  for (const [key, cell] of board) {
    newBoard.set(key, {
      coord: { ...cell.coord },
      pieces: cell.pieces.map(p => ({ ...p })),
    });
  }
  return newBoard;
};

export const cloneState = (state: GameState): GameState => {
  return {
    board: cloneBoard(state.board),
    currentPlayer: state.currentPlayer,
    turnNumber: state.turnNumber,
    whiteTurns: state.whiteTurns,
    blackTurns: state.blackTurns,
    unplacedPieces: {
      white: state.unplacedPieces.white.map(p => ({ ...p })),
      black: state.unplacedPieces.black.map(p => ({ ...p })),
    },
    queenPlaced: { ...state.queenPlaced },
    gameOver: state.gameOver,
    winner: state.winner,
  };
};

export const applyMove = (state: GameState, move: Move): GameState => {
  const newState = cloneState(state);
  const { board } = newState;

  if (move.type === 'place') {
    // Remove piece from unplaced
    const unplaced = newState.unplacedPieces[move.piece.owner];
    const idx = unplaced.findIndex(p => p.id === move.piece.id);
    if (idx !== -1) unplaced.splice(idx, 1);

    // Place on board
    const key = coordKeyFromHex(move.to);
    const existing = board.get(key);
    if (existing) {
      existing.pieces.push({ ...move.piece });
    } else {
      board.set(key, {
        coord: { ...move.to },
        pieces: [{ ...move.piece }],
      });
    }

    if (move.piece.type === 'queen') {
      newState.queenPlaced[move.piece.owner] = true;
    }
  } else {
    // Move piece on board
    const fromKey = coordKeyFromHex(move.from!);
    const fromCell = board.get(fromKey);
    if (fromCell) {
      fromCell.pieces.pop(); // remove top piece
      if (fromCell.pieces.length === 0) {
        board.delete(fromKey);
      }
    }

    const toKey = coordKeyFromHex(move.to);
    const toCell = board.get(toKey);
    if (toCell) {
      toCell.pieces.push({ ...move.piece });
    } else {
      board.set(toKey, {
        coord: { ...move.to },
        pieces: [{ ...move.piece }],
      });
    }
  }

  // Advance turn
  if (newState.currentPlayer === 'white') {
    newState.whiteTurns++;
  } else {
    newState.blackTurns++;
  }
  newState.turnNumber++;
  newState.currentPlayer = newState.currentPlayer === 'white' ? 'black' : 'white';

  // Check win condition
  const winCheck = checkWinCondition(newState);
  newState.gameOver = winCheck.gameOver;
  newState.winner = winCheck.winner;

  return newState;
};

export const isQueenSurrounded = (board: Board, player: Player): boolean => {
  for (const [, cell] of board) {
    const topPiece = cell.pieces[cell.pieces.length - 1];
    if (topPiece.type === 'queen' && topPiece.owner === player) {
      const neighbors = getNeighbors(cell.coord);
      return neighbors.every(n => {
        const nCell = board.get(coordKeyFromHex(n));
        return nCell && nCell.pieces.length > 0;
      });
    }
  }
  return false;
};

export const checkWinCondition = (state: GameState): { gameOver: boolean; winner: Player | 'draw' | null } => {
  const whiteSurrounded = isQueenSurrounded(state.board, 'white');
  const blackSurrounded = isQueenSurrounded(state.board, 'black');

  if (whiteSurrounded && blackSurrounded) {
    return { gameOver: true, winner: 'draw' };
  }
  if (whiteSurrounded) {
    return { gameOver: true, winner: 'black' };
  }
  if (blackSurrounded) {
    return { gameOver: true, winner: 'white' };
  }
  return { gameOver: false, winner: null };
};

// Get all legal moves for the current player
export const getAllValidMoves = (state: GameState): Move[] => {
  const player = state.currentPlayer;
  const moves: Move[] = [];

  // Placement moves
  const placements = getValidPlacements(state);
  const placeableTypes = getPlaceablePieceTypes(state);

  if (placements.length > 0 && placeableTypes.length > 0) {
    // For each placeable type, pick the first available piece of that type
    for (const type of placeableTypes) {
      const piece = state.unplacedPieces[player].find(p => p.type === type);
      if (piece) {
        for (const to of placements) {
          moves.push({ type: 'place', piece, to });
        }
      }
    }
  }

  // Movement moves (only if queen is placed)
  if (state.queenPlaced[player]) {
    for (const [, cell] of state.board) {
      const topPiece = cell.pieces[cell.pieces.length - 1];
      if (topPiece.owner === player) {
        const validMoves = getMovesForPiece(state, topPiece, cell.coord);
        for (const to of validMoves) {
          moves.push({ type: 'move', piece: topPiece, from: cell.coord, to });
        }
      }
    }
  }

  return moves;
};

// Check if current player must pass (no legal moves)
export const mustPass = (state: GameState): boolean => {
  return getAllValidMoves(state).length === 0;
};
