'use client';

import { useState } from 'react';

interface PlayMenuProps {
  onStartHvH: () => void;
  onStartHvC: (difficulty: string) => void;
}

const difficulties = ['Easy', 'Medium', 'Hard'] as const;

export const PlayMenu = ({ onStartHvH, onStartHvC }: PlayMenuProps) => {
  const [expanded, setExpanded] = useState(false);
  const [showDifficulty, setShowDifficulty] = useState(false);

  const handlePlay = () => {
    setExpanded(true);
    setShowDifficulty(false);
  };

  const handleComputer = () => {
    setShowDifficulty(true);
  };

  const handleBack = () => {
    if (showDifficulty) {
      setShowDifficulty(false);
    } else {
      setExpanded(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={expanded ? handleBack : handlePlay}
        className="text-2xl font-semibold text-white hover:text-amber-400 transition-colors cursor-pointer bg-transparent border-none shrink-0 w-14 text-outline-sm"
      >
        Play
      </button>

      {expanded && !showDifficulty && (
        <div className="flex items-center gap-1 animate-fade-in">
          <span className="text-slate-600 mr-2 text-outline-sm">/</span>
          <button
            onClick={onStartHvH}
            className="text-xl font-medium text-white hover:text-amber-400 transition-colors cursor-pointer bg-transparent border-none text-outline-sm"
          >
            Human
          </button>
          <span className="text-slate-600 mx-1 text-outline-sm">/</span>
          <button
            onClick={handleComputer}
            className="text-xl font-medium text-white hover:text-amber-400 transition-colors cursor-pointer bg-transparent border-none text-outline-sm"
          >
            Computer
          </button>
        </div>
      )}

      {expanded && showDifficulty && (
        <div className="flex items-center gap-1 animate-fade-in">
          <span className="text-slate-600 mr-2 text-outline-sm">/</span>
          {difficulties.map((d, i) => (
            <span key={d} className="flex items-center">
              {i > 0 && <span className="text-slate-600 mx-1 text-outline-sm">/</span>}
              <button
                onClick={() => onStartHvC(d.toLowerCase())}
                className="text-xl font-medium text-white hover:text-amber-400 transition-colors cursor-pointer bg-transparent border-none text-outline-sm"
              >
                {d}
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
