'use client';

import { useState } from 'react';

export const HowToPlayDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-2xl font-semibold text-slate-300 hover:text-amber-400 transition-colors cursor-pointer bg-transparent border-none"
      >
        How to Play
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-slate-800 border border-slate-600 rounded-2xl p-8 max-w-lg mx-4 shadow-2xl"
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
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-700/50 rounded-lg p-2">
                    <span className="text-amber-400 font-bold">Queen Bee</span> — Moves 1 space
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-2">
                    <span className="text-purple-400 font-bold">Beetle</span> — Moves 1 space, climbs on top
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-2">
                    <span className="text-red-400 font-bold">Spider</span> — Exactly 3 spaces along edge
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-2">
                    <span className="text-green-400 font-bold">Grasshopper</span> — Jumps over pieces in a line
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-2">
                    <span className="text-blue-400 font-bold">Ant</span> — Any distance along edge
                  </div>
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
