'use client';

import { Piece, PieceType, Player } from '@/lib/types';
import { getPieceColor, PIECE_NAMES, PIECE_DESCRIPTIONS, PIECE_TYPE_COLORS, PIECE_IMAGES } from './Piece';

interface PieceInventoryProps {
  player: Player;
  pieces: Piece[];
  isCurrentTurn: boolean;
  placeableTypes: PieceType[];
  selectedPieceId: string | null;
  onSelectPiece: (piece: Piece) => void;
  mustPlaceQueen: boolean;
}

export function PieceInventory({
  player,
  pieces,
  isCurrentTurn,
  placeableTypes,
  selectedPieceId,
  onSelectPiece,
  mustPlaceQueen,
}: PieceInventoryProps) {
  const grouped: Record<PieceType, Piece[]> = {
    queen: [],
    beetle: [],
    spider: [],
    grasshopper: [],
    ant: [],
  };

  for (const piece of pieces) {
    grouped[piece.type].push(piece);
  }

  const colors = getPieceColor(player);

  return (
    <div className="flex flex-col gap-1 p-2 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10">
      <div className="flex items-center gap-2 px-1 pb-1">
        <div
          className="w-6 h-6 rounded-full border-2"
          style={{ backgroundColor: colors.fill, borderColor: colors.stroke }}
        />
        {isCurrentTurn && <span className="text-green-500 animate-pulse text-sm">●</span>}
        {mustPlaceQueen && isCurrentTurn && (
          <span className="text-[10px] text-amber-400 font-medium">Queen!</span>
        )}
      </div>
      {(Object.entries(grouped) as [PieceType, Piece[]][]).map(([type, typePieces]) => {
        if (typePieces.length === 0) return null;
        const canPlace = isCurrentTurn && placeableTypes.includes(type);
        const isSelected = typePieces.some(p => p.id === selectedPieceId);
        const typeColor = PIECE_TYPE_COLORS[type];

        return (
          <button
            key={type}
            onClick={() => canPlace && onSelectPiece(typePieces[0])}
            disabled={!canPlace}
            title={`${PIECE_NAMES[type]}: ${PIECE_DESCRIPTIONS[type]}`}
            className={`
              flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-all
              ${canPlace ? 'hover:bg-white/15 cursor-pointer' : 'opacity-40 cursor-not-allowed'}
              ${isSelected ? 'bg-blue-500/30 ring-1 ring-blue-400' : ''}
            `}
          >
            <div
              className="w-8 h-8 rounded-full border-2 overflow-hidden shrink-0"
              style={{ borderColor: typeColor.accent, backgroundColor: colors.fill }}
            >
              <img
                src={PIECE_IMAGES[type]}
                alt={PIECE_NAMES[type]}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium" style={{ color: typeColor.accent }}>
                {PIECE_NAMES[type]}
              </span>
              <span className="text-[10px] text-slate-400">x{typePieces.length}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
