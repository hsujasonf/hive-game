import { useCallback, useRef, useState } from 'react';

export const usePanZoom = () => {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

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

  const handleMouseUp = useCallback(() => setDragging(false), []);

  const zoomIn = useCallback(() => setZoom(z => Math.min(3, z * 1.25)), []);
  const zoomOut = useCallback(() => setZoom(z => Math.max(0.3, z * 0.8)), []);
  const resetView = useCallback(() => { setZoom(1); setPan({ x: 0, y: 0 }); }, []);

  return {
    pan,
    zoom,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    zoomIn,
    zoomOut,
    resetView,
  };
};
