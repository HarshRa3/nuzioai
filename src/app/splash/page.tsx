'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Radio, ArrowRight } from 'lucide-react';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    // Auto timer to language select after 2.5s
    const timer = setTimeout(() => {
      router.push('/language');
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-figma-ink flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Figma Ambient Radial Purple Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] purple-radial-glow rounded-full blur-2xl pointer-events-none" />

      {/* 110px Logo Mark with Glow */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
        <div className="w-[110px] h-[110px] rounded-3xl bg-gradient-to-tr from-purple-600 via-purple-500 to-indigo-500 flex items-center justify-center shadow-purpleGlowHeavy border border-purple-400/40 animate-pulse-glow">
          <Radio className="w-14 h-14 text-white" />
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
            NUZIO <span className="text-figma-purple">AI</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-figma-textMuted mt-1 tracking-widest uppercase">
            Personalized Audio Intelligence
          </p>
        </div>

        {/* Loading Indicator */}
        <div className="flex items-center gap-2 pt-4">
          <div className="w-2 h-2 rounded-full bg-figma-purple animate-ping" />
          <span className="text-xs text-slate-400 font-mono">Initializing Neural Audio Feeds...</span>
        </div>

        {/* Direct Action Button */}
        <button
          onClick={() => router.push('/language')}
          className="mt-6 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/15 transition flex items-center gap-2"
        >
          <span>Continue to Language Setup</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </main>
  );
}
