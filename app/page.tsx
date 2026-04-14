'use client';

import { useRouter } from 'next/navigation';
import { HeroTitle } from '@/components/home/HeroTitle';
import { PlayMenu } from '@/components/home/PlayMenu';
import { HowToPlayDialog } from '@/components/home/HowToPlayDialog';

const Home = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen relative bg-slate-950 text-white">
      {/* Title — fixed position, left side, vertically centered */}
      <div className="absolute left-16 top-1/2 -translate-y-1/2">
        <HeroTitle />
      </div>

      {/* Play — fixed position */}
      <div className="absolute left-1/2 top-1/2 -translate-y-full -mt-2">
        <PlayMenu
          onStartHvH={() => router.push('/game?mode=hvh')}
          onStartHvC={(d) => router.push(`/game?mode=hvc&difficulty=${d}`)}
        />
      </div>

      {/* How to Play — fixed position, below Play */}
      <div className="absolute left-1/2 top-1/2 mt-2">
        <HowToPlayDialog />
      </div>
    </div>
  );
};

export default Home;
