'use client';

import React from 'react';
import { Layers, Cpu, TrendingUp, Atom, Globe, Rocket, Bookmark } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  showSavedOnly?: boolean;
  onToggleSavedOnly?: () => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  showSavedOnly = false,
  onToggleSavedOnly,
}) => {
  const getIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'tech & ai':
        return <Cpu className="w-3.5 h-3.5 text-sky-400" />;
      case 'markets':
        return <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />;
      case 'science':
        return <Atom className="w-3.5 h-3.5 text-purple-400" />;
      case 'world':
        return <Globe className="w-3.5 h-3.5 text-amber-400" />;
      case 'startups':
        return <Rocket className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 my-4">
      {/* Pills Container */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
        {categories.map((cat) => {
          const active = selectedCategory === cat && !showSavedOnly;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                active
                  ? 'bg-sky-500 text-white shadow-glow border border-sky-400'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {getIcon(cat)}
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Saved Bookmarks Toggle */}
      {onToggleSavedOnly && (
        <button
          onClick={onToggleSavedOnly}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
            showSavedOnly
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-glow'
              : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-amber-400 text-amber-400' : ''}`} />
          <span>Saved Articles</span>
        </button>
      )}
    </div>
  );
};
