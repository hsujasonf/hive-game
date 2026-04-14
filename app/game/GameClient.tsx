'use client';

import { AiDifficulty, GameMode } from '@/lib/types';
import { Board } from '@/components/Board';
import { PieceInventory } from '@/components/PieceInventory';
import { TurnIndicator } from '@/components/TurnIndicator';
import { GameOverModal } from '@/components/GameOverModal';
import { useGameLogic } from './useGameLogic';

interface GameClientProps {
  mode: GameMode;
  difficulty: AiDifficulty;
  onMainMenu: () => void;
}

export const GameClient = ({ mode, difficulty, onMainMenu }: GameClientProps) => {
  const {
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
  } = useGameLogic(mode, difficulty);

  const topPlayer = 'black' as const;
  const bottomPlayer = 'white' as const;
  const noop = () => {};

  return (
    <div className="h-screen relative bg-slate-950 text-white">
      <Board
        state={gameState}
        selectedPiece={isHumanTurn ? selectedPiece : null}
        validMoves={isHumanTurn ? validMoves : []}
        lastMove={lastMove}
        onHexClick={isHumanTurn ? handleHexClick : noop}
        onBoardPieceClick={isHumanTurn ? handleBoardPieceClick : noop}
      />

      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
        <TurnIndicator state={gameState} mode={mode} difficulty={difficulty} isAiThinking={isAiThinking} onQuit={onMainMenu} />
      </div>

      <div className="absolute top-14 left-3 z-10">
        <PieceInventory
          player={topPlayer}
          pieces={gameState.unplacedPieces[topPlayer]}
          isCurrentTurn={isHumanTurn && gameState.currentPlayer === topPlayer}
          placeableTypes={gameState.currentPlayer === topPlayer ? placeableTypes : []}
          selectedPieceId={selectedPiece?.piece.id ?? null}
          onSelectPiece={handleSelectUnplacedPiece}
          mustPlaceQueen={mustPlaceQueenBlack}
        />
      </div>

      <div className="absolute bottom-3 right-3 z-10">
        <PieceInventory
          player={bottomPlayer}
          pieces={gameState.unplacedPieces[bottomPlayer]}
          isCurrentTurn={isHumanTurn && gameState.currentPlayer === bottomPlayer}
          placeableTypes={gameState.currentPlayer === bottomPlayer ? placeableTypes : []}
          selectedPieceId={selectedPiece?.piece.id ?? null}
          onSelectPiece={handleSelectUnplacedPiece}
          mustPlaceQueen={mustPlaceQueenWhite}
        />
      </div>

      {gameState.gameOver && (
        <GameOverModal
          winner={gameState.winner}
          onPlayAgain={handleReset}
          onMainMenu={onMainMenu}
        />
      )}
    </div>
  );
};
