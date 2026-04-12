'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white px-4">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-3 tracking-tight">
          <span className="text-amber-400">H</span>ive
        </h1>
        <p className="text-slate-400 text-lg">The strategic bug-stacking board game</p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          onClick={() => router.push('/game?mode=hvh')}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold text-lg transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 cursor-pointer"
        >
          Human vs Human
          <span className="block text-sm font-normal text-blue-200 mt-1">Play locally on the same screen</span>
        </button>

        <div className="mt-2">
          <p className="text-sm text-slate-400 mb-3 text-center">Human vs Computer</p>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/game?mode=hvc&difficulty=easy')}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 text-white font-semibold transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/40 cursor-pointer"
            >
              Easy
            </button>
            <button
              onClick={() => router.push('/game?mode=hvc&difficulty=medium')}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-semibold transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 cursor-pointer"
            >
              Medium
            </button>
            <button
              onClick={() => router.push('/game?mode=hvc&difficulty=hard')}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-semibold transition-all shadow-lg shadow-red-500/20 hover:shadow-red-500/40 cursor-pointer"
            >
              Hard
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-md text-center text-sm text-slate-500">
        <h2 className="text-slate-400 font-medium mb-2">How to Play</h2>
        <p>
          Surround your opponent&apos;s Queen Bee on all six sides to win.
          Place pieces adjacent to your own color. The Queen must be placed within your first four turns.
          Each bug type moves differently.
        </p>
      </div>
    </div>
  );
}
