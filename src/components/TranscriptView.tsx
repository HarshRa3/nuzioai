'use client';

import React from 'react';
import { Sparkles, FileText, CheckCircle } from 'lucide-react';
import { Article } from '@/lib/types';

interface TranscriptViewProps {
  article: Article;
  currentTime: number;
  onSeek: (seconds: number) => void;
}

export const TranscriptView: React.FC<TranscriptViewProps> = ({
  article,
  currentTime,
  onSeek,
}) => {
  return (
    <div className="space-y-6">
      {/* Key Takeaways Section */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-sky-500/30 shadow-glass">
        <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-sky-400" />
          AI Executive Summary & Takeaways
        </h4>
        <div className="space-y-2.5">
          {article.keyTakeaways.map((point, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Synchronized Transcript */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-4">
          <FileText className="w-4 h-4 text-slate-400" />
          Live Read-Along Transcript
        </h4>

        <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
          {article.fullTranscript.map((segment) => {
            const isActive =
              currentTime >= segment.startTime && currentTime <= segment.endTime;
            const isPassed = currentTime > segment.endTime;

            return (
              <div
                key={segment.id}
                onClick={() => onSeek(segment.startTime)}
                className={`p-3 rounded-xl transition-all cursor-pointer text-xs sm:text-sm leading-relaxed border ${
                  isActive
                    ? 'bg-sky-500/15 border-sky-500/50 text-white shadow-glow font-medium'
                    : isPassed
                    ? 'bg-slate-900/40 border-slate-800/50 text-slate-400 hover:text-slate-200'
                    : 'bg-slate-900/20 border-slate-800/30 text-slate-500 hover:text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                  <span className={isActive ? 'text-sky-400 font-bold' : ''}>
                    {Math.floor(segment.startTime / 60)}:
                    {Math.floor(segment.startTime % 60)
                      .toString()
                      .padStart(2, '0')}
                  </span>
                  {isActive && (
                    <span className="text-sky-400 flex items-center gap-1 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                      Active Voice Segment
                    </span>
                  )}
                </div>
                <p>{segment.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
