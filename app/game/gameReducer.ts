import { AiDifficulty, GameMode, GameState, HexCoord, Move, Piece } from '@/lib/types';
import { coordKeyFromHex } from '@/lib/hex';
import { createInitialState, applyMove } from '@/lib/gameState';
import { getValidPlacements } from '@/lib/placement';
import { getMovesForPiece } from '@/lib/movement';
import { getBestMove } from '@/lib/ai';

export interface UIState {
  gameState: GameState;
  selectedPiece: { piece: Piece; coord?: HexCoord } | null;
  validMoves: HexCoord[];
  lastMove: Move | null;
  mode: GameMode;
  difficulty: AiDifficulty;
  isAiThinking: boolean;
}

export type Action =
  | { type: 'SELECT_UNPLACED_PIECE'; piece: Piece }
  | { type: 'SELECT_BOARD_PIECE'; coord: HexCoord }
  | { type: 'PLACE_PIECE'; coord: HexCoord }
  | { type: 'MOVE_PIECE'; coord: HexCoord }
  | { type: 'DESELECT' }
  | { type: 'AI_MOVE' }
  | { type: 'AI_THINKING'; thinking: boolean }
  | { type: 'PASS_TURN' }
  | { type: 'RESET'; mode: GameMode };

export const createInitialUIState = (mode: GameMode, difficulty: AiDifficulty): UIState => ({
  gameState: createInitialState(),
  selectedPiece: null,
  validMoves: [],
  lastMove: null,
  mode,
  difficulty,
  isAiThinking: false,
});

export const gameReducer = (state: UIState, action: Action): UIState => {
  switch (action.type) {
    case 'SELECT_UNPLACED_PIECE': {
      const placements = getValidPlacements(state.gameState);
      return {
        ...state,
        selectedPiece: { piece: action.piece },
        validMoves: placements,
      };
    }
    case 'SELECT_BOARD_PIECE': {
      const cell = state.gameState.board.get(coordKeyFromHex(action.coord));
      if (!cell || cell.pieces.length === 0) return state;
      const topPiece = cell.pieces[cell.pieces.length - 1];
      if (topPiece.owner !== state.gameState.currentPlayer) return state;

      const moves = getMovesForPiece(state.gameState, topPiece, action.coord);
      return {
        ...state,
        selectedPiece: { piece: topPiece, coord: action.coord },
        validMoves: moves,
      };
    }
    case 'PLACE_PIECE': {
      if (!state.selectedPiece || state.selectedPiece.coord) return state;
      const placeMove: Move = {
        type: 'place',
        piece: state.selectedPiece.piece,
        to: action.coord,
      };
      return {
        ...state,
        gameState: applyMove(state.gameState, placeMove),
        selectedPiece: null,
        validMoves: [],
        lastMove: placeMove,
      };
    }
    case 'MOVE_PIECE': {
      if (!state.selectedPiece || !state.selectedPiece.coord) return state;
      const moveMove: Move = {
        type: 'move',
        piece: state.selectedPiece.piece,
        from: state.selectedPiece.coord,
        to: action.coord,
      };
      return {
        ...state,
        gameState: applyMove(state.gameState, moveMove),
        selectedPiece: null,
        validMoves: [],
        lastMove: moveMove,
      };
    }
    case 'DESELECT':
      return { ...state, selectedPiece: null, validMoves: [] };
    case 'AI_MOVE': {
      const aiMove = getBestMove(state.gameState, state.difficulty);
      if (!aiMove) return state;
      return {
        ...state,
        gameState: applyMove(state.gameState, aiMove),
        selectedPiece: null,
        validMoves: [],
        lastMove: aiMove,
        isAiThinking: false,
      };
    }
    case 'AI_THINKING':
      return { ...state, isAiThinking: action.thinking };
    case 'PASS_TURN': {
      const passed = {
        ...state.gameState,
        currentPlayer: state.gameState.currentPlayer === 'white' ? 'black' as const : 'white' as const,
        turnNumber: state.gameState.turnNumber + 1,
      };
      if (state.gameState.currentPlayer === 'white') {
        passed.whiteTurns = state.gameState.whiteTurns + 1;
      } else {
        passed.blackTurns = state.gameState.blackTurns + 1;
      }
      return { ...state, gameState: passed, selectedPiece: null, validMoves: [] };
    }
    case 'RESET':
      return createInitialUIState(action.mode, state.difficulty);
    default:
      return state;
  }
};
