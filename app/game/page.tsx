'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { GameClient } from './GameClient';
import { AiDifficulty, GameMode } from '@/game-logic/types';

const GameContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = (searchParams.get('mode') as GameMode) || 'hvh';
  const difficulty = (searchParams.get('difficulty') as AiDifficulty) || 'medium';

  return (
    <GameClient
      mode={mode}
      difficulty={difficulty}
      onMainMenu={() => router.push('/')}
    />
  );
};

const GamePage = () => (
  <Suspense fallback={<div className="h-screen flex items-center justify-center bg-slate-950 text-white">Loading...</div>}>
    <GameContent />
  </Suspense>
);

export default GamePage;
