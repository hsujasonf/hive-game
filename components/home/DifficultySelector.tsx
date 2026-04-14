'use client';

interface DifficultySelectorProps {
  onSelect: (difficulty: string) => void;
}

const difficulties = [
  { key: 'easy', label: 'Easy' },
  { key: 'medium', label: 'Medium' },
  { key: 'hard', label: 'Hard' },
] as const;

export const DifficultySelector = ({ onSelect }: DifficultySelectorProps) => (
  <div className="flex flex-col gap-3">
    <p className="text-sm text-slate-500 uppercase tracking-widest">vs Computer</p>
    <div className="flex gap-6">
      {difficulties.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className="text-xl font-medium text-slate-400 hover:text-amber-400 transition-colors cursor-pointer bg-transparent border-none"
        >
          {label}
        </button>
      ))}
    </div>
  </div>
);
