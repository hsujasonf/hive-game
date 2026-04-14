import { HexCoord, Board } from './types';

export const coordKey = (q: number, r: number): string => {
  return `${q},${r}`;
};

export const coordKeyFromHex = (coord: HexCoord): string => {
  return `${coord.q},${coord.r}`;
};

export const parseCoord = (key: string): HexCoord => {
  const [q, r] = key.split(',').map(Number);
  return { q, r };
};

// Pointy-top axial directions (6 neighbors)
export const AXIAL_DIRECTIONS: HexCoord[] = [
  { q: 1, r: 0 },
  { q: 1, r: -1 },
  { q: 0, r: -1 },
  { q: -1, r: 0 },
  { q: -1, r: 1 },
  { q: 0, r: 1 },
];

export const getNeighbors = (coord: HexCoord): HexCoord[] => {
  return AXIAL_DIRECTIONS.map(d => ({ q: coord.q + d.q, r: coord.r + d.r }));
};

export const areAdjacent = (a: HexCoord, b: HexCoord): boolean => {
  const dq = b.q - a.q;
  const dr = b.r - a.r;
  return AXIAL_DIRECTIONS.some(d => d.q === dq && d.r === dr);
};

export const coordEquals = (a: HexCoord, b: HexCoord): boolean => {
  return a.q === b.q && a.r === b.r;
};

export const hexDistance = (a: HexCoord, b: HexCoord): number => {
  return (Math.abs(a.q - b.q) + Math.abs(a.q + a.r - b.q - b.r) + Math.abs(a.r - b.r)) / 2;
};

// Pointy-top hex to pixel
export const hexToPixel = (coord: HexCoord, size: number): { x: number; y: number } => {
  const x = size * (Math.sqrt(3) * coord.q + (Math.sqrt(3) / 2) * coord.r);
  const y = size * (3 / 2) * coord.r;
  return { x, y };
};

// Freedom-to-move (slide rule): can a piece slide from `from` to `to`?
// The two common neighbors of `from` and `to` cannot both be occupied at ground level.
export const canSlide = (board: Board, from: HexCoord, to: HexCoord): boolean => {
  const fromNeighbors = getNeighbors(from);
  const toNeighbors = getNeighbors(to);

  const commonNeighbors = fromNeighbors.filter(fn =>
    toNeighbors.some(tn => coordEquals(fn, tn))
  );

  // Both common neighbors occupied at ground level => can't slide
  const bothBlocked = commonNeighbors.every(cn => {
    const cell = board.get(coordKeyFromHex(cn));
    return cell && cell.pieces.length > 0;
  });

  return !bothBlocked;
};

// Get all hex positions adjacent to any piece on the board
export const getAllAdjacentEmpty = (board: Board): HexCoord[] => {
  const occupied = new Set<string>();
  const adjacent = new Set<string>();

  for (const [key] of board) {
    occupied.add(key);
  }

  for (const [, cell] of board) {
    for (const neighbor of getNeighbors(cell.coord)) {
      const nKey = coordKeyFromHex(neighbor);
      if (!occupied.has(nKey)) {
        adjacent.add(nKey);
      }
    }
  }

  return Array.from(adjacent).map(parseCoord);
};
