import { AiDifficulty, GameState, Move, Player } from './types';
import { coordKeyFromHex, getNeighbors, hexDistance } from './hex';
import { getAllValidMoves, applyMove, cloneState } from './game-state';

const DEPTH_BY_DIFFICULTY: Record<AiDifficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

const getOpponent = (player: Player): Player => {
  return player === 'white' ? 'black' : 'white';
};

const findQueen = (state: GameState, player: Player): { q: number; r: number } | null => {
  for (const [, cell] of state.board) {
    for (const piece of cell.pieces) {
      if (piece.type === 'queen' && piece.owner === player) {
        return cell.coord;
      }
    }
  }
  return null;
};

const countSurrounding = (state: GameState, coord: { q: number; r: number }): number => {
  const neighbors = getNeighbors(coord);
  let count = 0;
  for (const n of neighbors) {
    const cell = state.board.get(coordKeyFromHex(n));
    if (cell && cell.pieces.length > 0) count++;
  }
  return count;
};

const evaluateState = (state: GameState, aiPlayer: Player): number => {
  const opponent = getOpponent(aiPlayer);
  let score = 0;

  const aiQueen = findQueen(state, aiPlayer);
  const oppQueen = findQueen(state, opponent);

  if (oppQueen) {
    const oppSurr = countSurrounding(state, oppQueen);
    if (oppSurr === 6) return 100000;
    score += oppSurr * 150;
  }

  if (aiQueen) {
    const aiSurr = countSurrounding(state, aiQueen);
    if (aiSurr === 6) return -100000;
    score -= aiSurr * 150;
    score += (6 - aiSurr) * 10;
  }

  const aiMoves = getAllValidMoves(
    state.currentPlayer === aiPlayer ? state : { ...state, currentPlayer: aiPlayer }
  );
  const oppMoves = getAllValidMoves(
    state.currentPlayer === opponent ? state : { ...state, currentPlayer: opponent }
  );
  score += (aiMoves.length - oppMoves.length) * 3;

  const aiOnBoard = countPlayerPieces(state, aiPlayer);
  const oppOnBoard = countPlayerPieces(state, opponent);
  score += (aiOnBoard - oppOnBoard) * 5;

  if (oppQueen) {
    for (const [, cell] of state.board) {
      const topPiece = cell.pieces[cell.pieces.length - 1];
      if (topPiece.owner === aiPlayer && (topPiece.type === 'ant' || topPiece.type === 'beetle')) {
        const dist = hexDistance(cell.coord, oppQueen);
        if (dist <= 2) score += (3 - dist) * 20;
      }
    }
  }

  return score;
};

const countPlayerPieces = (state: GameState, player: Player): number => {
  let count = 0;
  for (const [, cell] of state.board) {
    for (const piece of cell.pieces) {
      if (piece.owner === player) count++;
    }
  }
  return count;
};

const minimax = (
  state: GameState,
  depth: number,
  alpha: number,
  beta: number,
  aiPlayer: Player,
  maximizing: boolean
): number => {
  if (depth === 0 || state.gameOver) {
    return evaluateState(state, aiPlayer);
  }

  const moves = getAllValidMoves(state);
  if (moves.length === 0) {
    const passed = cloneState(state);
    passed.currentPlayer = getOpponent(passed.currentPlayer);
    passed.turnNumber++;
    return minimax(passed, depth - 1, alpha, beta, aiPlayer, !maximizing);
  }

  if (maximizing) {
    let maxEval = -Infinity;
    for (const move of moves) {
      const newState = applyMove(state, move);
      const evalScore = minimax(newState, depth - 1, alpha, beta, aiPlayer, false);
      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      const newState = applyMove(state, move);
      const evalScore = minimax(newState, depth - 1, alpha, beta, aiPlayer, true);
      minEval = Math.min(minEval, evalScore);
      beta = Math.min(beta, evalScore);
      if (beta <= alpha) break;
    }
    return minEval;
  }
};

export const getBestMove = (state: GameState, difficulty: AiDifficulty = 'medium'): Move | null => {
  const moves = getAllValidMoves(state);
  if (moves.length === 0) return null;

  // Easy mode: 40% chance of picking a random move
  if (difficulty === 'easy' && Math.random() < 0.4) {
    return moves[Math.floor(Math.random() * moves.length)];
  }

  const aiPlayer = state.currentPlayer;
  const depth = DEPTH_BY_DIFFICULTY[difficulty];

  // Move ordering: prioritize moves near opponent's queen
  const oppQueen = findQueen(state, getOpponent(aiPlayer));
  if (oppQueen) {
    moves.sort((a, b) => {
      const distA = hexDistance(a.to, oppQueen);
      const distB = hexDistance(b.to, oppQueen);
      return distA - distB;
    });
  }

  let bestMove = moves[0];
  let bestScore = -Infinity;

  for (const move of moves) {
    const newState = applyMove(state, move);
    const score = minimax(newState, depth - 1, -Infinity, Infinity, aiPlayer, false);
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
};
