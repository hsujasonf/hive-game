'use client';

import { useEffect, useRef, useState } from 'react';
import { Player } from '@/game-logic/types';
import { HEX_SIZE } from '@/game-logic/constants';

interface HexTileProps {
  x: number;
  y: number;
  isSelected?: boolean;
  isValidTarget?: boolean;
  isOccupied?: boolean;
  owner?: Player;
  animateFrom?: { x: number; y: number; type: 'slide' | 'drop' | 'jump'; id?: number };
  animDuration?: number;
  onClick?: () => void;
  children?: React.ReactNode;
}

const hexPoints = (size: number): string => {
  const points: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i - 30);
    const px = size * Math.cos(angle);
    const py = size * Math.sin(angle);
    points.push(`${px},${py}`);
  }
  return points.join(' ');
}

// Easing: ease-out cubic
const easeOut = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
}

export const HexTile = ({ x, y, isSelected, isValidTarget, isOccupied, owner, animateFrom, animDuration = 400, onClick, children }: HexTileProps) => {
  const [offset, setOffset] = useState<{ dx: number; dy: number; opacity: number }>({ dx: 0, dy: 0, opacity: 1 });
  const animRef = useRef<number>(0);
  const animIdRef = useRef(0); // track which animation is current

  useEffect(() => {
    if (!animateFrom) return;

    const startDx = animateFrom.x - x;
    const startDy = animateFrom.y - y;
    const type = animateFrom.type;
    const startTime = performance.now();
    const id = ++animIdRef.current;

    // Set initial position
    setOffset({ dx: startDx, dy: startDy, opacity: type === 'drop' ? 0 : 1 });

    const animate = (now: number) => {
      if (id !== animIdRef.current) return; // stale animation
      const elapsed = now - startTime;
      const rawT = Math.min(elapsed / animDuration, 1);
      const t = easeOut(rawT);

      let dx: number, dy: number, opacity: number;

      if (type === 'drop') {
        // Drop from above: start offset up by 70, drop down with slight overshoot
        dx = 0;
        const bounce = rawT < 0.7 ? 0 : Math.sin((rawT - 0.7) / 0.3 * Math.PI) * 4;
        dy = (1 - t) * -70 - bounce;
        opacity = Math.min(rawT * 4, 1); // fade in quickly
      } else if (type === 'jump') {
        // Arc: lerp position but add a vertical arc
        dx = startDx * (1 - t);
        const arcHeight = -35 * Math.sin(rawT * Math.PI); // parabolic arc
        dy = startDy * (1 - t) + arcHeight;
        opacity = 1;
      } else {
        // Slide: straight line interpolation
        dx = startDx * (1 - t);
        dy = startDy * (1 - t);
        opacity = 1;
      }

      setOffset({ dx, dy, opacity });

      if (rawT < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setOffset({ dx: 0, dy: 0, opacity: 1 });
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [animateFrom, x, y, animDuration]);

  let fill = 'transparent';
  let stroke = 'transparent';
  let strokeWidth = 1;
  let cursor = 'default';

  if (isSelected) {
    fill = owner === 'black' ? '#1e3a5f' : '#bfdbfe';
    stroke = '#3b82f6';
    strokeWidth = 2.5;
    cursor = 'pointer';
  } else if (isValidTarget) {
    fill = 'rgba(34, 197, 94, 0.3)';
    stroke = '#22c55e';
    strokeWidth = 2;
    cursor = 'pointer';
  } else if (isOccupied && owner) {
    fill = owner === 'white' ? '#FFF8E7' : '#2C2C2C';
    stroke = owner === 'white' ? '#8B7355' : '#555555';
    strokeWidth = 1.5;
    cursor = 'pointer';
  }

  return (
    <g
      transform={`translate(${x + offset.dx}, ${y + offset.dy})`}
      onClick={onClick}
      style={{ cursor }}
      opacity={offset.opacity}
    >
      <polygon
        points={hexPoints(HEX_SIZE)}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {children}
    </g>
  );
}
