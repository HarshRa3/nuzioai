'use client';

import React from 'react';
import Link from 'next/link';
import { Radio, Flame, Sparkles, SlidersHorizontal, LogOut, Globe } from 'lucide-react';
import { User } from '@/lib/types';

interface NavbarProps {
  user: User;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  return (
    <header className="sticky top-0 z-40 w-full figma-card border-b border-white/10 bg-figma-ink/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo (44px Logo Header Specs) */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-[44px] h-[44px] rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-purpleGlow group-hover:scale-105 transition-transform">
            <Radio className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-xl tracking-tight text-white">NUZIO</span>
              <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">AI</span>
            </div>
            <p className="text-[9px] font-mono text-figma-textMuted tracking-widest uppercase">Personalized Audio Briefings</p>
          </div>
        </Link>

        {/* User Stats & Navigation Triggers */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language Indicator */}
          <Link
            href="/language"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs transition"
          >
            <Globe className="w-3.5 h-3.5 text-figma-purple" />
            <span className="font-mono">{user.preferences.language || 'English (US)'}</span>
          </Link>

          {/* Listening Streak */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span className="font-mono">{user.listeningStreakDays}d Streak</span>
          </div>

          {/* Preferences Button */}
          <Link
            href="/onboarding"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 border border-figma-purple text-xs font-semibold shadow-purpleGlow transition"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-figma-purple" />
            <span className="hidden sm:inline">Preferences</span>
          </Link>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-purple-400/50">
              {/* eslint-disable-next-html-element-suppression */}
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>

            {onLogout && (
              <button
                onClick={onLogout}
                title="Log out"
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
