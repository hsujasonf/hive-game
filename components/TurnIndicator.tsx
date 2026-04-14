'use client';

import { GameState, GameMode, AiDifficulty } from '@/game-logic/types';

interface TurnIndicatorProps {
  state: GameState;
  mode: GameMode;
  difficulty?: AiDifficulty;
  isAiThinking?: boolean;
  onQuit: () => void;
}

export const TurnIndicator = ({ state, mode, difficulty, isAiThinking, onQuit }: TurnIndicatorProps) => {
  const { currentPlayer, turnNumber, gameOver, winner } = state;

  if (gameOver) {
    return (
      <div className="text-center py-2 px-4 rounded-lg bg-amber-500/20 border border-amber-500/30">
        <span className="text-amber-300 font-bold text-lg">
          {winner === 'draw' ? 'Draw!' : `${winner === 'white' ? 'White' : 'Black'} Wins!`}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between px-6 py-2 rounded-lg bg-white/5 border border-white/10">
      <div className="flex items-center gap-2">
        <div
          className="w-4 h-4 rounded-full border-2"
          style={{
            backgroundColor: currentPlayer === 'white' ? '#FFF8E7' : '#2C2C2C',
            borderColor: currentPlayer === 'white' ? '#8B7355' : '#555',
          }}
        />
        <span className="text-sm font-medium text-slate-200">
          {currentPlayer === 'white' ? 'White' : 'Black'}&apos;s Turn
        </span>
        {isAiThinking && (
          <span className="text-xs text-blue-400 animate-pulse ml-1">(AI thinking...)</span>
        )}
      </div>
      <button
        onClick={onQuit}
        className="ml-4 px-2 py-1 rounded bg-slate-700/80 hover:bg-red-600/80 text-slate-300 hover:text-white text-xs transition-colors cursor-pointer"
      >
        Quit
      </button>
    </div>
  );
}
