'use client';

import React from 'react';

interface AudioVisualizerProps {
  isPlaying: boolean;
  barCount?: number;
  heightClass?: string;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isPlaying,
  barCount = 16,
  heightClass = 'h-12',
}) => {
  return (
    <div className={`flex items-center justify-center gap-1 ${heightClass} px-2`}>
      {Array.from({ length: barCount }).map((_, idx) => {
        // Vary heights and animation delays for realistic waveform oscillation
        const delay = (idx % 5) * 0.2;
        const defaultHeight = `${20 + (idx % 7) * 10}%`;

        return (
          <div
            key={idx}
            style={{
              height: isPlaying ? undefined : defaultHeight,
              animationDelay: isPlaying ? `${delay}s` : '0s',
            }}
            className={`w-1 rounded-full transition-all duration-300 ${
              isPlaying
                ? 'bg-gradient-to-t from-sky-500 via-cyan-400 to-purple-500 animate-wave-bar shadow-glow'
                : 'bg-slate-700'
            }`}
          />
        );
      })}
    </div>
  );
};
