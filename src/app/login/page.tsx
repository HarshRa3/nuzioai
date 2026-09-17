'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Radio, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email || 'harsh@csatechlab.com', password: password || 'password123' }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('nuzio_user', JSON.stringify(data.user));
        router.push('/onboarding');
      }
    } catch {
      router.push('/onboarding');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      const mockUser = {
        id: 'usr_google_7781',
        name: 'Harsh Rastogi',
        email: 'harsh@csatechlab.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
        preferences: {
          topics: ['Tech & AI', 'Startups', 'Markets & Finance', 'Science'],
          briefingDuration: 7,
          preferredHostId: 'alex-tech',
          profession: 'Software Engineer & Founder',
          language: 'English (US)',
          deliverySchedule: '08:00 AM (Morning)',
          autoPlay: true,
        },
        listeningStreakDays: 14,
        totalListeningMinutes: 184,
      };
      localStorage.setItem('nuzio_user', JSON.stringify(mockUser));
      router.push('/onboarding');
    }, 600);
  };

  return (
    <main className="min-h-screen bg-figma-ink flex flex-col justify-between items-center relative overflow-hidden px-4 py-8">
      {/* Figma Ambient Purple Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] purple-radial-glow rounded-full blur-3xl pointer-events-none" />

      {/* Header Container */}
      <div className="w-full max-w-md text-center z-10 pt-4">
        {/* 96px Logo Mark with Purple Radial Aura */}
        <div className="w-[96px] h-[96px] mx-auto rounded-3xl bg-gradient-to-tr from-purple-600 via-purple-500 to-indigo-500 flex items-center justify-center shadow-purpleGlowHeavy border border-purple-400/40 mb-4 animate-pulse-glow">
          <Radio className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">
          Welcome to Nuzio AI
        </h1>
        <p className="text-xs text-figma-textMuted mt-1">
          Zero-fluff audio news briefings tailored to your schedule.
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md figma-card p-6 sm:p-8 rounded-3xl z-10 my-auto shadow-2xl space-y-5">
        {/* Google OAuth Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs transition flex items-center justify-center gap-3 shadow-md"
        >
          {/* Google SVG Logo */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center gap-3 text-slate-500 text-[11px] uppercase tracking-wider">
          <div className="h-[1px] bg-white/10 flex-1" />
          <span>Or sign in with email</span>
          <div className="h-[1px] bg-white/10 flex-1" />
        </div>

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">EMAIL ADDRESS</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="harsh@csatechlab.com"
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-figma-purple transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">PASSWORD</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-figma-purple transition"
                required
              />
            </div>
          </div>

          {/* Quick Fill Demo */}
          <div className="flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => {
                setEmail('harsh@csatechlab.com');
                setPassword('demo123456');
              }}
              className="text-figma-purple hover:text-purple-300 font-medium flex items-center gap-1 transition"
            >
              <Sparkles className="w-3 h-3" />
              Fill Demo Account
            </button>
            <span className="text-slate-500 hover:text-slate-300 cursor-pointer">Forgot password?</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-purpleGlow transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In & Start Onboarding</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center text-[11px] text-slate-500 z-10 pt-4">
        By continuing, you agree to Nuzio AI Terms of Service and Privacy Policy.
      </div>
    </main>
  );
}
