import { Board, GameState, HexCoord, Piece } from './types';
import { coordKeyFromHex, getNeighbors, coordEquals, canSlide, AXIAL_DIRECTIONS } from './hex';
import { isHiveConnected } from './hiveConnectivity';

// Check if removing this piece from its position would break the hive
function wouldBreakHive(board: Board, coord: HexCoord): boolean {
  const cell = board.get(coordKeyFromHex(coord));
  if (!cell) return false;
  // If there's a stack, removing the top piece doesn't affect connectivity
  if (cell.pieces.length > 1) return false;
  return !isHiveConnected(board, coord);
}

// Check if a hex is occupied at ground level (has pieces)
function isOccupied(board: Board, coord: HexCoord): boolean {
  const cell = board.get(coordKeyFromHex(coord));
  return !!cell && cell.pieces.length > 0;
}

// Check that after moving, the piece remains adjacent to at least one other piece
function touchesHive(board: Board, from: HexCoord, to: HexCoord): boolean {
  const neighbors = getNeighbors(to);
  return neighbors.some(n => {
    if (coordEquals(n, from)) {
      // The piece we're moving: check if its old position still has pieces (stacked)
      const cell = board.get(coordKeyFromHex(from));
      return !!cell && cell.pieces.length > 1;
    }
    return isOccupied(board, n);
  });
}

// Queen: moves exactly 1 space, must slide, must not break hive
export function getQueenMoves(state: GameState, coord: HexCoord): HexCoord[] {
  const { board } = state;
  if (wouldBreakHive(board, coord)) return [];

  return getNeighbors(coord).filter(n => {
    if (isOccupied(board, n)) return false;
    if (!canSlide(board, coord, n)) return false;
    if (!touchesHive(board, coord, n)) return false;
    return true;
  });
}

// Beetle: moves exactly 1 space, CAN climb on top of other pieces
export function getBeetleMoves(state: GameState, coord: HexCoord): HexCoord[] {
  const { board } = state;
  const cell = board.get(coordKeyFromHex(coord));
  if (!cell) return [];

  const isOnTop = cell.pieces.length > 1;

  if (!isOnTop && wouldBreakHive(board, coord)) return [];

  return getNeighbors(coord).filter(n => {
    const targetOccupied = isOccupied(board, n);

    if (isOnTop) {
      // On top of hive: can move to any adjacent hex (occupied or empty)
      // but must still touch the hive
      if (!targetOccupied && !touchesHive(board, coord, n)) return false;
      return true;
    }

    // On ground: slide rule applies only when moving to an empty space
    if (!targetOccupied) {
      if (!canSlide(board, coord, n)) return false;
      if (!touchesHive(board, coord, n)) return false;
    }
    // Can always climb onto an occupied hex from ground level
    return true;
  });
}

// Spider: moves exactly 3 spaces around the hive perimeter, no backtracking
export function getSpiderMoves(state: GameState, coord: HexCoord): HexCoord[] {
  const { board } = state;
  if (wouldBreakHive(board, coord)) return [];

  const results = new Set<string>();

  // DFS with exactly 3 steps
  function dfs(current: HexCoord, steps: number, visited: Set<string>) {
    if (steps === 3) {
      results.add(coordKeyFromHex(current));
      return;
    }

    for (const neighbor of getNeighbors(current)) {
      const nKey = coordKeyFromHex(neighbor);

      // Can't revisit hexes in the path, and can't revisit the starting hex
      if (visited.has(nKey)) continue;
      if (coordEquals(neighbor, coord)) continue;

      // Must be empty
      if (isOccupied(board, neighbor)) continue;

      // Must slide (freedom to move)
      if (!canSlide(board, current, neighbor)) continue;

      // Must remain in contact with the hive (excluding the spider's origin)
      const neighbors = getNeighbors(neighbor);
      const touchesOther = neighbors.some(nn => {
        if (coordEquals(nn, coord)) return false; // exclude origin
        if (coordEquals(nn, current)) return false; // exclude where we came from (we're moving along the edge)
        return isOccupied(board, nn);
      });
      // Also touching current position's neighbors that are occupied counts
      // Actually, we need to check if the target touches the hive excluding our path
      const touchesCurrent = neighbors.some(nn => {
        if (coordEquals(nn, coord)) return false;
        if (visited.has(coordKeyFromHex(nn))) return false;
        return isOccupied(board, nn);
      });

      if (!touchesCurrent) continue;

      visited.add(nKey);
      dfs(neighbor, steps + 1, visited);
      visited.delete(nKey);
    }
  }

  const visited = new Set<string>();
  visited.add(coordKeyFromHex(coord));
  dfs(coord, 0, visited);

  // Remove origin from results (shouldn't be there, but safety check)
  results.delete(coordKeyFromHex(coord));

  return Array.from(results).map(k => {
    const [q, r] = k.split(',').map(Number);
    return { q, r };
  });
}

// Grasshopper: jumps in a straight line over at least one piece
export function getGrasshopperMoves(state: GameState, coord: HexCoord): HexCoord[] {
  const { board } = state;
  if (wouldBreakHive(board, coord)) return [];

  const moves: HexCoord[] = [];

  for (const dir of AXIAL_DIRECTIONS) {
    // Move in this direction; first adjacent hex must be occupied
    let current = { q: coord.q + dir.q, r: coord.r + dir.r };
    if (!isOccupied(board, current)) continue;

    // Keep going until we find an empty space
    while (isOccupied(board, current)) {
      current = { q: current.q + dir.q, r: current.r + dir.r };
    }

    moves.push(current);
  }

  return moves;
}

// Ant: moves any number of spaces around the hive perimeter
export function getAntMoves(state: GameState, coord: HexCoord): HexCoord[] {
  const { board } = state;
  if (wouldBreakHive(board, coord)) return [];

  const results = new Set<string>();
  const visited = new Set<string>();
  const originKey = coordKeyFromHex(coord);
  visited.add(originKey);

  const queue: HexCoord[] = [coord];

  while (queue.length > 0) {
    const current = queue.shift()!;

    for (const neighbor of getNeighbors(current)) {
      const nKey = coordKeyFromHex(neighbor);
      if (visited.has(nKey)) continue;

      // Must be empty
      if (isOccupied(board, neighbor)) continue;

      // Must slide
      if (!canSlide(board, current, neighbor)) continue;

      // Must stay in contact with the hive (excluding the ant's origin)
      const neighbors = getNeighbors(neighbor);
      const touchesHiveExcludingOrigin = neighbors.some(nn => {
        if (coordEquals(nn, coord)) return false;
        return isOccupied(board, nn);
      });

      if (!touchesHiveExcludingOrigin) continue;

      visited.add(nKey);
      results.add(nKey);
      queue.push(neighbor);
    }
  }

  return Array.from(results).map(k => {
    const [q, r] = k.split(',').map(Number);
    return { q, r };
  });
}

// Get all valid moves for a specific piece on the board
export function getMovesForPiece(state: GameState, piece: Piece, coord: HexCoord): HexCoord[] {
  // Can't move pieces until queen is placed
  if (!state.queenPlaced[piece.owner]) return [];

  // Only the top piece of a stack can move
  const cell = state.board.get(coordKeyFromHex(coord));
  if (!cell) return [];
  const topPiece = cell.pieces[cell.pieces.length - 1];
  if (topPiece.id !== piece.id) return [];

  switch (piece.type) {
    case 'queen': return getQueenMoves(state, coord);
    case 'beetle': return getBeetleMoves(state, coord);
    case 'spider': return getSpiderMoves(state, coord);
    case 'grasshopper': return getGrasshopperMoves(state, coord);
    case 'ant': return getAntMoves(state, coord);
    default: return [];
  }
}
