'use client';

import React, { useState } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  Sparkles,
  ChevronDown,
  FileText,
  Volume2,
} from 'lucide-react';
import { Article, HostVoice } from '@/lib/types';
import { AI_HOSTS } from '@/lib/newsData';
import { AudioVisualizer } from './AudioVisualizer';

interface FullPlayerModalProps {
  article: Article;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  speed: number;
  volume: number;
  isMuted: boolean;
  onClose: () => void;
  onPlayPause: () => void;
  onSeek: (secs: number) => void;
  onSpeedChange: (speed: number) => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
  onHostChange: (host: HostVoice) => void;
  onNextStory?: () => void;
  onPrevStory?: () => void;
}

export const FullPlayerModal: React.FC<FullPlayerModalProps> = ({
  article,
  isPlaying,
  currentTime,
  duration,
  speed,
  onClose,
  onPlayPause,
  onSeek,
  onSpeedChange,
  onHostChange,
  onNextStory,
  onPrevStory,
}) => {
  const [showHostDropdown, setShowHostDropdown] = useState(false);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const speedOptions = [1.0, 1.25, 1.5];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-2xl animate-fadeIn">
      {/* Figma Modal Container */}
      <div className="w-full max-w-4xl h-[92vh] bg-figma-ink rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-2xl relative">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-figma-purple animate-ping" />
            <span className="text-xs font-mono font-bold text-figma-purple uppercase tracking-wider">
              Nuzio AI Player
            </span>
          </div>

          {/* Host Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowHostDropdown(!showHostDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 hover:border-figma-purple text-xs text-white transition"
            >
              <div className="w-5 h-5 rounded-full overflow-hidden border border-figma-purple">
                {/* eslint-disable-next-html-element-suppression */}
                <img src={article.host.avatar} alt={article.host.name} className="w-full h-full object-cover" />
              </div>
              <span>Host: <strong className="text-white font-mono">{article.host.name}</strong></span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showHostDropdown && (
              <div className="absolute right-0 mt-2 w-64 figma-card rounded-2xl p-2 border border-white/15 z-50 shadow-2xl bg-figma-dark">
                <div className="text-[10px] font-mono font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">
                  Select AI Voice Host
                </div>
                {AI_HOSTS.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => {
                      onHostChange(h);
                      setShowHostDropdown(false);
                    }}
                    className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left text-xs transition ${
                      article.host.id === h.id ? 'bg-purple-600/30 text-purple-200 font-bold border border-figma-purple' : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-slate-700">
                      {/* eslint-disable-next-html-element-suppression */}
                      <img src={h.avatar} alt={h.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-semibold">{h.name}</div>
                      <div className="text-[10px] text-slate-400">{h.role}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left Column: Player & Avatar Artwork (5 cols) */}
          <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between overflow-y-auto relative">
            {/* Figma Ambient Purple Glow Behind Avatar */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 purple-radial-glow rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4 text-center z-10">
              {/* Host Avatar with Purple Halo Glow */}
              <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-full p-1.5 bg-gradient-to-tr from-purple-600 via-purple-500 to-indigo-500 shadow-purpleGlowHeavy border border-purple-400/50 relative">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  {/* eslint-disable-next-html-element-suppression */}
                  <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
                  {article.category}
                </span>
                <h2 className="text-base sm:text-lg font-display font-bold text-white mt-2 leading-snug">
                  {article.title}
                </h2>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {article.subtitle}
                </p>
              </div>

              {/* Visualizer Equalizer */}
              <div className="py-1">
                <AudioVisualizer isPlaying={isPlaying} barCount={20} heightClass="h-10" />
              </div>
            </div>

            {/* Controls Block */}
            <div className="space-y-4 pt-2 z-10">
              {/* Timeline Scrubber */}
              <div>
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={(e) => onSeek(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-figma-purple"
                />
                <div className="flex justify-between text-xs font-mono text-slate-400 mt-1.5">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-4">
                {onPrevStory && (
                  <button onClick={onPrevStory} className="p-2 text-slate-400 hover:text-white transition">
                    <SkipBack className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => onSeek(currentTime - 10)}
                  className="p-2 text-slate-400 hover:text-white transition"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button
                  onClick={onPlayPause}
                  className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 hover:scale-105 text-white flex items-center justify-center shadow-purpleGlow transition-transform"
                >
                  {isPlaying ? <Pause className="w-7 h-7 fill-white" /> : <Play className="w-7 h-7 fill-white ml-1" />}
                </button>
                <button
                  onClick={() => onSeek(currentTime + 10)}
                  className="p-2 text-slate-400 hover:text-white transition"
                >
                  <RotateCw className="w-5 h-5" />
                </button>
                {onNextStory && (
                  <button onClick={onNextStory} className="p-2 text-slate-400 hover:text-white transition">
                    <SkipForward className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Speed Multiplier Pills */}
              <div className="flex items-center justify-center gap-2 pt-1">
                <span className="text-[10px] text-slate-500 font-mono font-semibold uppercase">Speed:</span>
                {speedOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => onSpeedChange(s)}
                    className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold transition ${
                      speed === s
                        ? 'bg-figma-purple text-white shadow-purpleGlow'
                        : 'bg-white/10 text-slate-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {s.toFixed(1)}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Transcript with Speaker Labels (7 cols) */}
          <div className="lg:col-span-7 p-6 overflow-y-auto space-y-6">
            {/* Key Takeaways */}
            <div className="p-4 rounded-2xl figma-card border border-purple-500/30">
              <h4 className="text-xs font-mono font-bold text-figma-purple uppercase tracking-wider flex items-center gap-2 mb-2.5">
                <Sparkles className="w-4 h-4 text-figma-purple" />
                AI Key Takeaways
              </h4>
              <div className="space-y-2">
                {article.keyTakeaways.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                    <span className="text-figma-purple font-bold">•</span>
                    <p className="leading-relaxed">{pt}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Read-Along Transcript */}
            <div className="p-4 rounded-2xl figma-card">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-slate-400" />
                Live Transcript
              </h4>

              <div className="space-y-3">
                {article.fullTranscript.map((seg) => {
                  const isActive = currentTime >= seg.startTime && currentTime <= seg.endTime;
                  const isPassed = currentTime > seg.endTime;

                  return (
                    <div
                      key={seg.id}
                      onClick={() => onSeek(seg.startTime)}
                      className={`p-3.5 rounded-xl transition-all cursor-pointer text-xs sm:text-sm leading-relaxed border ${
                        isActive
                          ? 'bg-purple-600/20 border-figma-purple text-white shadow-purpleGlow font-medium'
                          : isPassed
                          ? 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200'
                          : 'bg-white/5 border-white/5 text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                        <span className="font-bold text-figma-purple">{seg.speaker}</span>
                        <span className={isActive ? 'text-figma-purple font-bold' : ''}>
                          {formatTime(seg.startTime)}
                        </span>
                      </div>
                      <p>{seg.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
