import { useEffect, useRef, useState } from 'react';
import { Move } from '@/lib/types';
import { coordKeyFromHex, hexToPixel } from '@/lib/hex';
import { HEX_SIZE } from '@/lib/constants';

export interface AnimInfo {
  key: string;
  fromX: number;
  fromY: number;
  type: 'slide' | 'drop' | 'jump';
  turnId: number;
}

export const useMoveAnimation = (lastMove: Move | null, turnNumber: number, duration: number) => {
  const [animInfo, setAnimInfo] = useState<AnimInfo | null>(null);
  const prevTurnRef = useRef(turnNumber);

  useEffect(() => {
    if (!lastMove) return;
    if (turnNumber === prevTurnRef.current) return;
    prevTurnRef.current = turnNumber;

    const toPixel = hexToPixel(lastMove.to, HEX_SIZE);

    if (lastMove.type === 'place') {
      setAnimInfo({
        key: coordKeyFromHex(lastMove.to),
        fromX: toPixel.x,
        fromY: toPixel.y,
        type: 'drop',
        turnId: turnNumber,
      });
    } else if (lastMove.from) {
      const fromPixel = hexToPixel(lastMove.from, HEX_SIZE);
      setAnimInfo({
        key: coordKeyFromHex(lastMove.to),
        fromX: fromPixel.x,
        fromY: fromPixel.y,
        type: lastMove.piece.type === 'grasshopper' ? 'jump' : 'slide',
        turnId: turnNumber,
      });
    }

    const timer = setTimeout(() => setAnimInfo(null), duration + 100);
    return () => clearTimeout(timer);
  }, [lastMove, turnNumber, duration]);

  return animInfo;
};
