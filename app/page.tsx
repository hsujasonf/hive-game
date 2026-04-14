'use client';

import { useRouter } from 'next/navigation';
import { HeroTitle } from '@/components/home/HeroTitle';
import { DifficultySelector } from '@/components/home/DifficultySelector';
import { HowToPlay } from '@/components/home/HowToPlay';

const Home = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white px-4">
      <HeroTitle />

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          onClick={() => router.push('/game?mode=hvh')}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold text-lg transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 cursor-pointer"
        >
          Human vs Human
          <span className="block text-sm font-normal text-blue-200 mt-1">Play locally on the same screen</span>
        </button>

        <DifficultySelector onSelect={(d) => router.push(`/game?mode=hvc&difficulty=${d}`)} />
      </div>

      <HowToPlay />
    </div>
  );
};

export default Home;
