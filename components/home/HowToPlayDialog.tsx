'use client';

import { useState } from 'react';
import { PieceType } from '@/game-logic/types';
import { PIECE_NAMES, PIECE_DESCRIPTIONS, PIECE_TYPE_COLORS, PIECE_IMAGES } from '@/components/Piece';

const pieces: { type: PieceType; detail: string }[] = [
  { type: 'queen', detail: 'x1 per player' },
  { type: 'beetle', detail: 'x2 per player' },
  { type: 'spider', detail: 'x2 per player' },
  { type: 'grasshopper', detail: 'x3 per player' },
  { type: 'ant', detail: 'x3 per player' },
];

export const HowToPlayDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-2xl font-semibold text-white hover:text-amber-400 transition-colors cursor-pointer bg-transparent border-none text-outline-sm"
      >
        How to Play
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-slate-800 border border-slate-600 rounded-2xl p-6 max-w-lg mx-4 shadow-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-amber-400 mb-4">How to Play</h2>

            <div className="space-y-4 text-sm text-slate-300">
              <div>
                <h3 className="text-white font-semibold mb-1">Objective</h3>
                <p>Surround your opponent&apos;s Queen Bee on all six sides to win.</p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-1">Placing Pieces</h3>
                <p>On your turn, place a piece from your inventory or move one on the board. New pieces must only touch your own color (except the first two pieces).</p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-1">Queen Deadline</h3>
                <p>Your Queen Bee must be placed within your first 4 turns.</p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">Pieces</h3>
                <div className="flex flex-col gap-2">
                  {pieces.map(({ type, detail }) => {
                    const typeColor = PIECE_TYPE_COLORS[type];
                    return (
                      <div key={type} className="flex items-center gap-3 bg-slate-700/50 rounded-lg p-2">
                        <div
                          className="w-10 h-10 rounded-full border-2 overflow-hidden shrink-0"
                          style={{ borderColor: typeColor.accent, backgroundColor: '#FFF8E7' }}
                        >
                          <img
                            src={PIECE_IMAGES[type]}
                            alt={PIECE_NAMES[type]}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-xs" style={{ color: typeColor.accent }}>
                            {PIECE_NAMES[type]} <span className="font-normal text-slate-500">{detail}</span>
                          </span>
                          <span className="text-xs text-slate-400">{PIECE_DESCRIPTIONS[type]}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-1">Important Rules</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li>Moving a piece must never split the hive into two groups</li>
                  <li>Pieces cannot slide through gaps that are too narrow</li>
                  <li>You can only move pieces after your Queen is placed</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-6 w-full py-2 text-sm font-medium text-slate-400 hover:text-amber-400 transition-colors cursor-pointer bg-transparent border border-slate-600 rounded-lg hover:border-amber-400/50"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
