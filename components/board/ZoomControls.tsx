'use client';

interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export const ZoomControls = ({ zoom, onZoomIn, onZoomOut, onReset }: ZoomControlsProps) => (
  <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1">
    <button
      onClick={onZoomOut}
      className="w-8 h-8 flex items-center justify-center rounded bg-slate-700/80 hover:bg-slate-600 text-slate-200 text-lg font-bold cursor-pointer transition-colors"
    >
      -
    </button>
    <button
      onClick={onReset}
      className="h-8 px-2 flex items-center justify-center rounded bg-slate-700/80 hover:bg-slate-600 text-slate-300 text-xs font-medium cursor-pointer transition-colors min-w-[48px]"
    >
      {Math.round(zoom * 100)}%
    </button>
    <button
      onClick={onZoomIn}
      className="w-8 h-8 flex items-center justify-center rounded bg-slate-700/80 hover:bg-slate-600 text-slate-200 text-lg font-bold cursor-pointer transition-colors"
    >
      +
    </button>
  </div>
);
