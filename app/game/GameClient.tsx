'use client';

import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { AiDifficulty, GameMode, GameState, HexCoord, Piece, PieceType } from '@/lib/types';
import { coordKeyFromHex, coordEquals } from '@/lib/hex';
import { createInitialState, applyMove, getAllValidMoves, mustPass } from '@/lib/gameState';
import { getValidPlacements, getPlaceablePieceTypes } from '@/lib/placement';
import { getMovesForPiece } from '@/lib/movement';
import { getBestMove } from '@/lib/ai';
import { Board } from '@/components/Board';
import { PieceInventory } from '@/components/PieceInventory';
import { TurnIndicator } from '@/components/TurnIndicator';
import { GameOverModal } from '@/components/GameOverModal';
import { QUEEN_DEADLINE } from '@/lib/constants';

interface UIState {
  gameState: GameState;
  selectedPiece: { piece: Piece; coord?: HexCoord } | null;
  validMoves: HexCoord[];
  mode: GameMode;
  difficulty: AiDifficulty;
  isAiThinking: boolean;
}

type Action =
  | { type: 'SELECT_UNPLACED_PIECE'; piece: Piece }
  | { type: 'SELECT_BOARD_PIECE'; coord: HexCoord }
  | { type: 'PLACE_PIECE'; coord: HexCoord }
  | { type: 'MOVE_PIECE'; coord: HexCoord }
  | { type: 'DESELECT' }
  | { type: 'AI_MOVE' }
  | { type: 'AI_THINKING'; thinking: boolean }
  | { type: 'PASS_TURN' }
  | { type: 'RESET'; mode: GameMode };

function reducer(state: UIState, action: Action): UIState {
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
      const newGameState = applyMove(state.gameState, {
        type: 'place',
        piece: state.selectedPiece.piece,
        to: action.coord,
      });
      return {
        ...state,
        gameState: newGameState,
        selectedPiece: null,
        validMoves: [],
      };
    }
    case 'MOVE_PIECE': {
      if (!state.selectedPiece || !state.selectedPiece.coord) return state;
      const newGameState = applyMove(state.gameState, {
        type: 'move',
        piece: state.selectedPiece.piece,
        from: state.selectedPiece.coord,
        to: action.coord,
      });
      return {
        ...state,
        gameState: newGameState,
        selectedPiece: null,
        validMoves: [],
      };
    }
    case 'DESELECT':
      return { ...state, selectedPiece: null, validMoves: [] };
    case 'AI_MOVE': {
      const move = getBestMove(state.gameState, state.difficulty);
      if (!move) return state;
      const newGameState = applyMove(state.gameState, move);
      return {
        ...state,
        gameState: newGameState,
        selectedPiece: null,
        validMoves: [],
        isAiThinking: false,
      };
    }
    case 'AI_THINKING':
      return { ...state, isAiThinking: action.thinking };
    case 'PASS_TURN': {
      // Pass: just switch current player
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
      return {
        gameState: createInitialState(),
        selectedPiece: null,
        validMoves: [],
        mode: action.mode,
        difficulty: state.difficulty,
        isAiThinking: false,
      };
    default:
      return state;
  }
}

interface GameClientProps {
  mode: GameMode;
  difficulty: AiDifficulty;
  onMainMenu: () => void;
}

export function GameClient({ mode, difficulty, onMainMenu }: GameClientProps) {
  const [state, dispatch] = useReducer(reducer, {
    gameState: createInitialState(),
    selectedPiece: null,
    validMoves: [],
    mode,
    difficulty,
    isAiThinking: false,
  });

  const { gameState, selectedPiece, validMoves, isAiThinking } = state;

  // Check if current player must pass
  const playerMustPass = useMemo(() => mustPass(gameState), [gameState]);

  // Auto-pass if no legal moves
  useEffect(() => {
    if (gameState.gameOver) return;
    if (!playerMustPass) return;

    // Small delay for UX
    const timer = setTimeout(() => {
      dispatch({ type: 'PASS_TURN' });
    }, 300);
    return () => clearTimeout(timer);
  }, [playerMustPass, gameState.gameOver]);

  // AI move trigger
  useEffect(() => {
    if (mode !== 'hvc') return;
    if (gameState.currentPlayer !== 'black') return;
    if (gameState.gameOver) return;
    if (playerMustPass) return;

    dispatch({ type: 'AI_THINKING', thinking: true });
    const timer = setTimeout(() => {
      dispatch({ type: 'AI_MOVE' });
    }, 400);
    return () => clearTimeout(timer);
  }, [gameState.currentPlayer, gameState.turnNumber, gameState.gameOver, mode, playerMustPass]);

  const placeableTypes = useMemo(
    () => getPlaceablePieceTypes(gameState),
    [gameState]
  );

  const mustPlaceQueenWhite = useMemo(() => {
    return !gameState.queenPlaced.white && gameState.whiteTurns >= QUEEN_DEADLINE - 1;
  }, [gameState]);

  const mustPlaceQueenBlack = useMemo(() => {
    return !gameState.queenPlaced.black && gameState.blackTurns >= QUEEN_DEADLINE - 1;
  }, [gameState]);

  const handleHexClick = useCallback((coord: HexCoord) => {
    if (!selectedPiece) return;
    if (selectedPiece.coord) {
      // Moving a board piece
      dispatch({ type: 'MOVE_PIECE', coord });
    } else {
      // Placing from inventory
      dispatch({ type: 'PLACE_PIECE', coord });
    }
  }, [selectedPiece]);

  const handleBoardPieceClick = useCallback((coord: HexCoord) => {
    // If we have a selected piece and click on a valid move target (occupied hex for beetle)
    if (selectedPiece && validMoves.some(m => coordEquals(m, coord))) {
      if (selectedPiece.coord) {
        dispatch({ type: 'MOVE_PIECE', coord });
      } else {
        dispatch({ type: 'PLACE_PIECE', coord });
      }
      return;
    }

    // If clicking the already selected piece, deselect
    if (selectedPiece?.coord && coordEquals(selectedPiece.coord, coord)) {
      dispatch({ type: 'DESELECT' });
      return;
    }

    // Select a board piece
    dispatch({ type: 'SELECT_BOARD_PIECE', coord });
  }, [selectedPiece, validMoves]);

  const handleSelectUnplacedPiece = useCallback((piece: Piece) => {
    if (selectedPiece?.piece.id === piece.id) {
      dispatch({ type: 'DESELECT' });
    } else {
      dispatch({ type: 'SELECT_UNPLACED_PIECE', piece });
    }
  }, [selectedPiece]);

  // Disable interaction when it's AI's turn
  const isHumanTurn = mode === 'hvh' || gameState.currentPlayer === 'white';

  // In HvC mode, human (white) is always at the bottom, opponent (black) at top.
  // In HvH mode, black at top, white at bottom.
  const topPlayer: 'white' | 'black' = 'black';
  const bottomPlayer: 'white' | 'black' = 'white';

  return (
    <div className="h-screen relative bg-slate-950 text-white">
      {/* Board takes the entire screen */}
      <Board
        state={gameState}
        selectedPiece={isHumanTurn ? selectedPiece : null}
        validMoves={isHumanTurn ? validMoves : []}
        onHexClick={isHumanTurn ? handleHexClick : () => {}}
        onBoardPieceClick={isHumanTurn ? handleBoardPieceClick : () => {}}
      />

      {/* Turn indicator — top center */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
        <TurnIndicator state={gameState} mode={mode} difficulty={difficulty} isAiThinking={isAiThinking} onQuit={onMainMenu} />
      </div>

      {/* Opponent tiles — upper left */}
      <div className="absolute top-14 left-3 z-10">
        <PieceInventory
          player={topPlayer}
          pieces={gameState.unplacedPieces[topPlayer]}
          isCurrentTurn={isHumanTurn && gameState.currentPlayer === topPlayer}
          placeableTypes={gameState.currentPlayer === topPlayer ? placeableTypes : []}
          selectedPieceId={selectedPiece?.piece.id ?? null}
          onSelectPiece={handleSelectUnplacedPiece}
          mustPlaceQueen={topPlayer === 'white' ? mustPlaceQueenWhite : mustPlaceQueenBlack}
        />
      </div>

      {/* Player tiles — lower right */}
      <div className="absolute bottom-3 right-3 z-10">
        <PieceInventory
          player={bottomPlayer}
          pieces={gameState.unplacedPieces[bottomPlayer]}
          isCurrentTurn={isHumanTurn && gameState.currentPlayer === bottomPlayer}
          placeableTypes={gameState.currentPlayer === bottomPlayer ? placeableTypes : []}
          selectedPieceId={selectedPiece?.piece.id ?? null}
          onSelectPiece={handleSelectUnplacedPiece}
          mustPlaceQueen={bottomPlayer === 'white' ? mustPlaceQueenWhite : mustPlaceQueenBlack}
        />
      </div>

      {gameState.gameOver && (
        <GameOverModal
          winner={gameState.winner}
          onPlayAgain={() => dispatch({ type: 'RESET', mode })}
          onMainMenu={onMainMenu}
        />
      )}
    </div>
  );
}
