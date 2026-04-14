'use client';

import { useRouter } from 'next/navigation';
import { HeroTitle } from '@/components/home/HeroTitle';
import { PlayMenu } from '@/components/home/PlayMenu';
import { HowToPlayDialog } from '@/components/home/HowToPlayDialog';
import { TreeStumpHomeBg } from '@/components/home/TreeStumpHomeBg';

const Home = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen relative overflow-hidden text-white">
      {/* Background */}
      <TreeStumpHomeBg />

      {/* Title — fixed position, left side, vertically centered */}
      <div className="absolute left-[15%] top-1/2 -translate-y-1/2 z-10">
        <HeroTitle />
      </div>

      {/* Play — fixed position */}
      <div className="absolute left-1/2 top-1/2 -translate-y-full -mt-2 z-10">
        <PlayMenu
          onStartHvH={() => router.push('/game?mode=hvh')}
          onStartHvC={(d) => router.push(`/game?mode=hvc&difficulty=${d}`)}
        />
      </div>

      {/* How to Play — fixed position, below Play */}
      <div className="absolute left-1/2 top-1/2 mt-2 z-10">
        <HowToPlayDialog />
      </div>
    </div>
  );
};

export default Home;
