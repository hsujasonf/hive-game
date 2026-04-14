'use client';

import { useRef } from 'react';
import { GameState, HexCoord, Move, Piece } from '@/lib/types';
import { coordKeyFromHex, hexToPixel } from '@/lib/hex';
import { HEX_SIZE } from '@/lib/constants';
import { HexTile } from './HexTile';
import { PieceSVG } from './Piece';
import { usePanZoom } from './board/usePanZoom';
import { useMoveAnimation } from './board/useMoveAnimation';
import { useHexesToRender } from './board/useHexesToRender';
import { ZoomControls } from './board/ZoomControls';
import { TreeStumpBg } from './board/TreeStumpBg';

interface BoardProps {
  state: GameState;
  selectedPiece: { piece: Piece; coord?: HexCoord } | null;
  validMoves: HexCoord[];
  lastMove: Move | null;
  onHexClick: (coord: HexCoord) => void;
  onBoardPieceClick: (coord: HexCoord) => void;
}

const INITIAL_HALF = HEX_SIZE * 7.5;
const ANIM_DURATION = 350;

export const Board = ({ state, selectedPiece, validMoves, lastMove, onHexClick, onBoardPieceClick }: BoardProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { pan, zoom, handleMouseDown, handleMouseMove, handleMouseUp, zoomIn, zoomOut, resetView } = usePanZoom();
  const animInfo = useMoveAnimation(lastMove, state.turnNumber, ANIM_DURATION);
  const { hexMap, validMoveKeys } = useHexesToRender(state.board, validMoves);

  const selectedCoordKey = selectedPiece?.coord ? coordKeyFromHex(selectedPiece.coord) : null;

  const half = INITIAL_HALF;
  const finalVB = {
    x: -half - pan.x,
    y: -half - pan.y,
    width: (half * 2) / zoom,
    height: (half * 2) / zoom,
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <TreeStumpBg />
      <svg
        ref={svgRef}
        className="absolute inset-0 z-10 w-full h-full"
        viewBox={`${finalVB.x} ${finalVB.y} ${finalVB.width} ${finalVB.height}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <rect
          className="board-bg"
          x={finalVB.x - 2000}
          y={finalVB.y - 2000}
          width={finalVB.width + 4000}
          height={finalVB.height + 4000}
          fill="transparent"
        />
        {Array.from(hexMap).map(([key, { coord, occupied }]) => {
          const { x, y } = hexToPixel(coord, HEX_SIZE);
          const isSelected = key === selectedCoordKey;
          const isValidTarget = validMoveKeys.has(key);
          const cell = state.board.get(key);
          const topPiece = cell?.pieces[cell.pieces.length - 1];

          const anim = animInfo && animInfo.key === key
            ? { x: animInfo.fromX, y: animInfo.fromY, type: animInfo.type as 'slide' | 'drop' | 'jump', id: animInfo.turnId }
            : undefined;

          return (
            <HexTile
              key={anim ? `${key}-anim-${anim.id}` : key}
              x={x}
              y={y}
              isSelected={isSelected}
              isValidTarget={isValidTarget}
              isOccupied={occupied}
              owner={topPiece?.owner}
              animateFrom={anim}
              animDuration={ANIM_DURATION}
              onClick={() => {
                if (isValidTarget) onHexClick(coord);
                else if (occupied) onBoardPieceClick(coord);
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
      <ZoomControls zoom={zoom} onZoomIn={zoomIn} onZoomOut={zoomOut} onReset={resetView} />
    </div>
  );
};
