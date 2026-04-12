'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { GameState, HexCoord, Piece } from '@/lib/types';
import { coordKeyFromHex, hexToPixel } from '@/lib/hex';
import { HEX_SIZE } from '@/lib/constants';
import { HexTile } from './HexTile';
import { PieceSVG } from './Piece';

interface BoardProps {
  state: GameState;
  selectedPiece: { piece: Piece; coord?: HexCoord } | null;
  validMoves: HexCoord[];
  onHexClick: (coord: HexCoord) => void;
  onBoardPieceClick: (coord: HexCoord) => void;
}

// Fixed table: centered at origin, only grows when occupied pieces reach the edge
const INITIAL_HALF = HEX_SIZE * 7.5; // comfortable starting view

export function Board({ state, selectedPiece, validMoves, onHexClick, onBoardPieceClick }: BoardProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  // Fixed table size — user controls zoom/pan manually
  const tableHalf = INITIAL_HALF;

  const validMoveKeys = useMemo(() => {
    return new Set(validMoves.map(coordKeyFromHex));
  }, [validMoves]);

  // Only render occupied hexes + valid move targets
  const hexesToRender = useMemo(() => {
    const hexMap = new Map<string, { coord: HexCoord; occupied: boolean }>();

    for (const [key, cell] of state.board) {
      hexMap.set(key, { coord: cell.coord, occupied: true });
    }

    for (const coord of validMoves) {
      const key = coordKeyFromHex(coord);
      if (!hexMap.has(key)) {
        hexMap.set(key, { coord, occupied: false });
      }
    }

    if (state.board.size === 0 && validMoves.length === 0) {
      hexMap.set(coordKeyFromHex({ q: 0, r: 0 }), { coord: { q: 0, r: 0 }, occupied: false });
    }

    return hexMap;
  }, [state.board, validMoves]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if ((e.target as Element).tagName === 'svg' || (e.target as Element).classList.contains('board-bg')) {
      setDragging(true);
      dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    }
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPan({ x: dragStart.current.panX + dx / zoom, y: dragStart.current.panY + dy / zoom });
  }, [dragging, zoom]);

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  const selectedCoordKey = selectedPiece?.coord ? coordKeyFromHex(selectedPiece.coord) : null;

  // ViewBox: centered at origin, sized by tableHalf, adjusted by pan/zoom
  const half = tableHalf;
  const finalVB = {
    x: -half - pan.x,
    y: -half - pan.y,
    width: (half * 2) / zoom,
    height: (half * 2) / zoom,
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox={`${finalVB.x} ${finalVB.y} ${finalVB.width} ${finalVB.height}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ width: '100%', height: '100%' }}
      >
        <rect
          className="board-bg"
          x={finalVB.x - 2000}
          y={finalVB.y - 2000}
          width={finalVB.width + 4000}
          height={finalVB.height + 4000}
          fill="transparent"
        />
        {Array.from(hexesToRender).map(([key, { coord, occupied }]) => {
          const { x, y } = hexToPixel(coord, HEX_SIZE);
          const isSelected = key === selectedCoordKey;
          const isValidTarget = validMoveKeys.has(key);
          const cell = state.board.get(key);
          const topPiece = cell?.pieces[cell.pieces.length - 1];

          return (
            <HexTile
              key={key}
              x={x}
              y={y}
              isSelected={isSelected}
              isValidTarget={isValidTarget}
              isOccupied={occupied}
              owner={topPiece?.owner}
              onClick={() => {
                if (isValidTarget) {
                  onHexClick(coord);
                } else if (occupied) {
                  onBoardPieceClick(coord);
                }
              }}
            >
              {topPiece && (
                <PieceSVG
                  type={topPiece.type}
                  owner={topPiece.owner}
                  stackCount={cell!.pieces.length > 1 ? cell!.pieces.length : undefined}
                />
              )}
            </HexTile>
          );
        })}
      </svg>
      <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1">
        <button
          onClick={() => setZoom(z => Math.max(0.3, z * 0.8))}
          className="w-8 h-8 flex items-center justify-center rounded bg-slate-700/80 hover:bg-slate-600 text-slate-200 text-lg font-bold cursor-pointer transition-colors"
        >
          -
        </button>
        <button
          onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
          className="h-8 px-2 flex items-center justify-center rounded bg-slate-700/80 hover:bg-slate-600 text-slate-300 text-xs font-medium cursor-pointer transition-colors min-w-[48px]"
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          onClick={() => setZoom(z => Math.min(3, z * 1.25))}
          className="w-8 h-8 flex items-center justify-center rounded bg-slate-700/80 hover:bg-slate-600 text-slate-200 text-lg font-bold cursor-pointer transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
