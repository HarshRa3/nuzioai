'use client';

import React from 'react';
import { Play, Pause, RotateCcw, RotateCw, Maximize2, Radio } from 'lucide-react';
import { Article } from '@/lib/types';
import { AudioVisualizer } from './AudioVisualizer';

interface MiniPlayerProps {
  article: Article;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onSeek: (seconds: number) => void;
  onExpand: () => void;
}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({
  article,
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  onSeek,
  onExpand,
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-4 pointer-events-none">
      <div className="max-w-4xl mx-auto glass-panel border border-sky-500/30 rounded-2xl p-3 shadow-glow pointer-events-auto relative overflow-hidden">
        {/* Top Progress Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-sky-500 to-purple-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          {/* Left: Article Info & Thumbnail */}
          <div className="flex items-center gap-3 min-w-0 cursor-pointer" onClick={onExpand}>
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 relative border border-slate-700">
              {/* eslint-disable-next-html-element-suppression */}
              <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] text-sky-400 font-semibold">
                <Radio className="w-3 h-3 text-sky-400 animate-pulse" />
                <span>{article.host.name}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 font-normal">{article.category}</span>
              </div>
              <h4 className="text-xs sm:text-sm font-semibold text-white truncate max-w-[200px] sm:max-w-xs">
                {article.title}
              </h4>
            </div>
          </div>

          {/* Middle: Equalizer Visualizer & Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:block">
              <AudioVisualizer isPlaying={isPlaying} barCount={10} heightClass="h-7" />
            </div>

            <button
              onClick={() => onSeek(currentTime - 10)}
              className="p-1.5 text-slate-400 hover:text-white transition"
              title="Skip back 10s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onPlayPause}
              className="w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-400 text-white flex items-center justify-center shadow-glow transition"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
            </button>

            <button
              onClick={() => onSeek(currentTime + 10)}
              className="p-1.5 text-slate-400 hover:text-white transition"
              title="Skip forward 10s"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Time & Expand Trigger */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs font-mono text-slate-400">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            <button
              onClick={onExpand}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
              title="Expand Full Screen Audio Player"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
