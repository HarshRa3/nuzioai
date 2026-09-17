'use client';

import React, { useState } from 'react';
import { Play, Pause, Bookmark, Clock, Sparkles, ChevronDown, ChevronUp, Radio } from 'lucide-react';
import { Article } from '@/lib/types';

interface NewsCardProps {
  article: Article;
  isPlaying: boolean;
  isCurrent: boolean;
  onPlay: (article: Article) => void;
  onPause: () => void;
  onToggleSave?: (articleId: string) => void;
  onOpenDetails?: (article: Article) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  isPlaying,
  isCurrent,
  onPlay,
  onPause,
  onToggleSave,
  onOpenDetails,
}) => {
  const [showTakeaways, setShowTakeaways] = useState(false);
  const [saved, setSaved] = useState(article.isSaved || false);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(!saved);
    if (onToggleSave) onToggleSave(article.id);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrent && isPlaying) {
      onPause();
    } else {
      onPlay(article);
    }
  };

  return (
    <div
      onClick={() => onOpenDetails && onOpenDetails(article)}
      className={`glass-panel glass-panel-hover rounded-2xl p-5 border transition-all cursor-pointer relative group flex flex-col justify-between ${
        isCurrent
          ? 'border-sky-500/60 shadow-glow bg-slate-900/90'
          : 'border-slate-800 hover:border-slate-700'
      }`}
    >
      <div>
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20">
              {article.category}
            </span>
            {article.isTrending && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 flex items-center gap-1 border border-amber-500/30">
                <Sparkles className="w-2.5 h-2.5" />
                Trending AI Brief
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              {Math.ceil(article.audioDurationSeconds / 60)} min audio
            </span>
            <button
              onClick={handleSaveClick}
              className="p-1 text-slate-400 hover:text-amber-400 transition"
              title="Bookmark article"
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Cover Image & Title */}
        <div className="flex gap-4 mb-3">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 relative border border-slate-800">
            {/* eslint-disable-next-html-element-suppression */}
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Play Overlay Button */}
            <button
              onClick={handlePlayClick}
              className={`absolute inset-0 flex items-center justify-center transition-all ${
                isCurrent && isPlaying
                  ? 'bg-sky-950/80'
                  : 'bg-black/40 group-hover:bg-black/20'
              }`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white shadow-lg transition-transform ${
                isCurrent && isPlaying ? 'bg-sky-500 scale-105' : 'bg-sky-500/90 group-hover:scale-110'
              }`}>
                {isCurrent && isPlaying ? (
                  <Pause className="w-4 h-4 fill-white" />
                ) : (
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                )}
              </div>
            </button>
          </div>

          <div className="flex-1">
            <h3 className="text-sm sm:text-base font-display font-semibold text-white group-hover:text-sky-300 transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              {article.subtitle}
            </p>
          </div>
        </div>

        {/* AI Host Tag */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full overflow-hidden border border-sky-500/30">
              {/* eslint-disable-next-html-element-suppression */}
              <img src={article.host.avatar} alt={article.host.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-[11px] text-slate-300">
              Voice: <strong className="text-sky-400">{article.host.name}</strong>
            </span>
          </div>
          <span className="text-[11px] text-slate-500">{article.publishedAt}</span>
        </div>

        {/* Collapsible Key Takeaways */}
        {showTakeaways && (
          <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1.5 animate-fadeIn">
            <div className="font-semibold text-sky-400 text-[11px] uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI Key Takeaways
            </div>
            {article.keyTakeaways.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-sky-500 font-bold">•</span>
                <span className="leading-tight">{point}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Toggle Button */}
      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/50">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowTakeaways(!showTakeaways);
          }}
          className="flex items-center gap-1 text-slate-400 hover:text-sky-400 transition"
        >
          <span>{showTakeaways ? 'Hide Key Points' : 'Quick Key Points'}</span>
          {showTakeaways ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        <button
          onClick={handlePlayClick}
          className="flex items-center gap-1 text-sky-400 hover:text-sky-300 font-medium transition"
        >
          <Radio className="w-3 h-3" />
          <span>{isCurrent && isPlaying ? 'Playing Audio' : 'Listen Now'}</span>
        </button>
      </div>
    </div>
  );
};
