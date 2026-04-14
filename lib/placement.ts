import { Board, GameState, HexCoord, PieceType, Player } from './types';
import { coordKeyFromHex, getNeighbors, getAllAdjacentEmpty } from './hex';
import { QUEEN_DEADLINE } from './constants';

// Get all valid positions where a player can place a new piece
export const getValidPlacements = (state: GameState): HexCoord[] => {
  const player = state.currentPlayer;
  const totalTurns = state.whiteTurns + state.blackTurns;

  // First piece of the game: place at origin
  if (totalTurns === 0) {
    return [{ q: 0, r: 0 }];
  }

  // Second piece (opponent's first): must be adjacent to the first piece
  if (totalTurns === 1) {
    const emptyAdj = getAllAdjacentEmpty(state.board);
    return emptyAdj;
  }

  // Normal placement: must be adjacent to at least one friendly piece,
  // and NOT adjacent to any enemy piece
  const emptyAdj = getAllAdjacentEmpty(state.board);

  return emptyAdj.filter(coord => {
    const neighbors = getNeighbors(coord);
    let touchesFriendly = false;
    let touchesEnemy = false;

    for (const n of neighbors) {
      const cell = state.board.get(coordKeyFromHex(n));
      if (cell && cell.pieces.length > 0) {
        const topPiece = cell.pieces[cell.pieces.length - 1];
        if (topPiece.owner === player) {
          touchesFriendly = true;
        } else {
          touchesEnemy = true;
        }
      }
    }

    return touchesFriendly && !touchesEnemy;
  });
};

// Get which piece types the current player can place
export const getPlaceablePieceTypes = (state: GameState): PieceType[] => {
  const player = state.currentPlayer;
  const playerTurns = player === 'white' ? state.whiteTurns : state.blackTurns;
  const queenPlaced = state.queenPlaced[player];
  const unplaced = state.unplacedPieces[player];

  // Must place queen by turn 4 (0-indexed: turns 0,1,2,3 => on turn 3 queen is forced)
  if (!queenPlaced && playerTurns >= QUEEN_DEADLINE - 1) {
    // Must place queen
    if (unplaced.some(p => p.type === 'queen')) {
      return ['queen'];
    }
  }

  // Get unique types that still have pieces remaining
  const availableTypes = new Set<PieceType>();
  for (const piece of unplaced) {
    availableTypes.add(piece.type);
  }

  return Array.from(availableTypes);
};
