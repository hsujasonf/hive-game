'use client';

import { Player } from '@/game-logic/types';

interface GameOverModalProps {
  winner: Player | 'draw' | null;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

export const GameOverModal = ({ winner, onPlayAgain, onMainMenu }: GameOverModalProps) => {
  if (!winner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-800 border border-slate-600 rounded-2xl p-8 text-center shadow-2xl max-w-sm mx-4">
        <h2 className="text-3xl font-bold mb-2 text-white">
          {winner === 'draw' ? 'Draw!' : 'Game Over!'}
        </h2>
        <p className="text-lg text-slate-300 mb-6">
          {winner === 'draw'
            ? 'Both queens were surrounded simultaneously.'
            : `${winner === 'white' ? 'White' : 'Black'} wins by surrounding the opponent's Queen Bee!`}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onPlayAgain}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
          >
            Play Again
          </button>
          <button
            onClick={onMainMenu}
            className="px-6 py-2.5 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-medium transition-colors"
          >
            Main Menu
          </button>
        </div>
      </div>
    </div>
  );
}
