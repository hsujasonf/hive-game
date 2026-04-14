import { useMemo } from 'react';
import { GameState, HexCoord } from '@/lib/types';
import { coordKeyFromHex } from '@/lib/hex';

export const useHexesToRender = (board: GameState['board'], validMoves: HexCoord[]) => {
  const validMoveKeys = useMemo(() => new Set(validMoves.map(coordKeyFromHex)), [validMoves]);

  const hexMap = useMemo(() => {
    const map = new Map<string, { coord: HexCoord; occupied: boolean }>();
    for (const [key, cell] of board) {
      map.set(key, { coord: cell.coord, occupied: true });
    }
    for (const coord of validMoves) {
      const key = coordKeyFromHex(coord);
      if (!map.has(key)) map.set(key, { coord, occupied: false });
    }
    if (board.size === 0 && validMoves.length === 0) {
      map.set(coordKeyFromHex({ q: 0, r: 0 }), { coord: { q: 0, r: 0 }, occupied: false });
    }
    return map;
  }, [board, validMoves]);

  return { hexMap, validMoveKeys };
};
