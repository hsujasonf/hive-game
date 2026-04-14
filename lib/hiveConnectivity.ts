import { Board, HexCoord } from './types';
import { coordKeyFromHex, getNeighbors } from './hex';

// Check if the hive remains a single connected component.
// If excludeCoord is provided, that position is treated as empty (for checking if a piece can move).
export const isHiveConnected = (board: Board, excludeCoord?: HexCoord): boolean => {
  const excludeKey = excludeCoord ? coordKeyFromHex(excludeCoord) : null;

  // Collect all occupied keys (excluding the removed piece)
  const occupiedKeys: string[] = [];
  for (const [key, cell] of board) {
    if (key === excludeKey) {
      // If the cell has stacked pieces (beetle on top), removing the top piece
      // still leaves the cell occupied
      if (cell.pieces.length > 1) {
        occupiedKeys.push(key);
      }
      continue;
    }
    if (cell.pieces.length > 0) {
      occupiedKeys.push(key);
    }
  }

  if (occupiedKeys.length <= 1) return true;

  // BFS from the first occupied position
  const visited = new Set<string>();
  const queue: string[] = [occupiedKeys[0]];
  visited.add(occupiedKeys[0]);

  const occupiedSet = new Set(occupiedKeys);

  while (queue.length > 0) {
    const current = queue.shift()!;
    const [q, r] = current.split(',').map(Number);
    const neighbors = getNeighbors({ q, r });

    for (const n of neighbors) {
      const nKey = coordKeyFromHex(n);
      if (occupiedSet.has(nKey) && !visited.has(nKey)) {
        visited.add(nKey);
        queue.push(nKey);
      }
    }
  }

  return visited.size === occupiedKeys.length;
};
