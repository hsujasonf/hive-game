import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { AiDifficulty, GameMode, HexCoord, Piece } from '@/game-logic/types';
import { coordEquals } from '@/game-logic/hex';
import { mustPass } from '@/game-logic/game-state';
import { getPlaceablePieceTypes } from '@/game-logic/placement';
import { QUEEN_DEADLINE } from '@/game-logic/constants';
import { gameReducer, createInitialUIState } from './game-reducer';

export const useGameLogic = (mode: GameMode, difficulty: AiDifficulty) => {
  const [state, dispatch] = useReducer(gameReducer, undefined, () =>
    createInitialUIState(mode, difficulty)
  );

  const { gameState, selectedPiece, validMoves, lastMove, isAiThinking } = state;

  const playerMustPass = useMemo(() => mustPass(gameState), [gameState]);

  // Auto-pass if no legal moves
  useEffect(() => {
    if (gameState.gameOver || !playerMustPass) return;
    const timer = setTimeout(() => dispatch({ type: 'PASS_TURN' }), 300);
    return () => clearTimeout(timer);
  }, [playerMustPass, gameState.gameOver]);

  // AI move trigger
  useEffect(() => {
    if (mode !== 'hvc') return;
    if (gameState.currentPlayer !== 'black') return;
    if (gameState.gameOver || playerMustPass) return;

    dispatch({ type: 'AI_THINKING', thinking: true });
    const timer = setTimeout(() => dispatch({ type: 'AI_MOVE' }), 400);
    return () => clearTimeout(timer);
  }, [gameState.currentPlayer, gameState.turnNumber, gameState.gameOver, mode, playerMustPass]);

  const placeableTypes = useMemo(() => getPlaceablePieceTypes(gameState), [gameState]);

  const mustPlaceQueenWhite = useMemo(
    () => !gameState.queenPlaced.white && gameState.whiteTurns >= QUEEN_DEADLINE - 1,
    [gameState]
  );

  const mustPlaceQueenBlack = useMemo(
    () => !gameState.queenPlaced.black && gameState.blackTurns >= QUEEN_DEADLINE - 1,
    [gameState]
  );

  const isHumanTurn = mode === 'hvh' || gameState.currentPlayer === 'white';

  const handleHexClick = useCallback((coord: HexCoord) => {
    if (!selectedPiece) return;
    dispatch({ type: selectedPiece.coord ? 'MOVE_PIECE' : 'PLACE_PIECE', coord });
  }, [selectedPiece]);

  const handleBoardPieceClick = useCallback((coord: HexCoord) => {
    if (selectedPiece && validMoves.some(m => coordEquals(m, coord))) {
      dispatch({ type: selectedPiece.coord ? 'MOVE_PIECE' : 'PLACE_PIECE', coord });
      return;
    }
    if (selectedPiece?.coord && coordEquals(selectedPiece.coord, coord)) {
      dispatch({ type: 'DESELECT' });
      return;
    }
    dispatch({ type: 'SELECT_BOARD_PIECE', coord });
  }, [selectedPiece, validMoves]);

  const handleSelectUnplacedPiece = useCallback((piece: Piece) => {
    dispatch(
      selectedPiece?.piece.id === piece.id
        ? { type: 'DESELECT' }
        : { type: 'SELECT_UNPLACED_PIECE', piece }
    );
  }, [selectedPiece]);

  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET', mode });
  }, [mode]);

  return {
    gameState,
    selectedPiece,
    validMoves,
    lastMove,
    isAiThinking,
    isHumanTurn,
    placeableTypes,
    mustPlaceQueenWhite,
    mustPlaceQueenBlack,
    handleHexClick,
    handleBoardPieceClick,
    handleSelectUnplacedPiece,
    handleReset,
  };
};
