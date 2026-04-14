'use client';

interface DifficultySelectorProps {
  onSelect: (difficulty: string) => void;
}

const difficulties = [
  { key: 'easy', label: 'Easy', from: 'from-green-700', to: 'to-green-600', hoverFrom: 'hover:from-green-600', hoverTo: 'hover:to-green-500', shadow: 'shadow-green-500/20', hoverShadow: 'hover:shadow-green-500/40' },
  { key: 'medium', label: 'Medium', from: 'from-amber-600', to: 'to-amber-500', hoverFrom: 'hover:from-amber-500', hoverTo: 'hover:to-amber-400', shadow: 'shadow-amber-500/20', hoverShadow: 'hover:shadow-amber-500/40' },
  { key: 'hard', label: 'Hard', from: 'from-red-700', to: 'to-red-600', hoverFrom: 'hover:from-red-600', hoverTo: 'hover:to-red-500', shadow: 'shadow-red-500/20', hoverShadow: 'hover:shadow-red-500/40' },
] as const;

export const DifficultySelector = ({ onSelect }: DifficultySelectorProps) => (
  <div className="mt-2">
    <p className="text-sm text-slate-400 mb-3 text-center">Human vs Computer</p>
    <div className="flex gap-3">
      {difficulties.map(({ key, label, from, to, hoverFrom, hoverTo, shadow, hoverShadow }) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`flex-1 py-3 px-4 rounded-xl bg-gradient-to-r ${from} ${to} ${hoverFrom} ${hoverTo} text-white font-semibold transition-all shadow-lg ${shadow} ${hoverShadow} cursor-pointer`}
        >
          {label}
        </button>
      ))}
    </div>
  </div>
);
