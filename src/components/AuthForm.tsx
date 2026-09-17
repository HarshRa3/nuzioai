'use client';

import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, ArrowRight, Radio, Sparkles, CheckCircle2 } from 'lucide-react';

interface AuthFormProps {
  onSuccess: (user: any) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email || 'harsh@csatechlab.com', password: password || 'password123' }),
      });
      const data = await res.json();
      if (res.ok) {
        onSuccess(data.user);
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = () => {
    setEmail('harsh@csatechlab.com');
    setPassword('demo123456');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Container Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-glass relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-purple-600 mb-3 shadow-glow">
            <Radio className="w-6 h-6 text-white animate-pulse" />
          </div>
          <h2 className="text-2xl font-display font-bold text-white tracking-tight">
            {isLogin ? 'Welcome Back to Nuzio AI' : 'Create Your Nuzio AI Account'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isLogin ? 'Listen to zero-fluff, personalized audio news briefings.' : 'Tailored audio briefings powered by intelligent AI hosts.'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-slate-900/80 p-1 rounded-xl mb-6 border border-slate-800">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
              isLogin ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
              !isLogin ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Harsh Rastogi"
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="harsh@csatechlab.com"
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
                required
              />
            </div>
          </div>

          {/* Quick Demo Fill Helper */}
          <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
            <button
              type="button"
              onClick={handleQuickDemo}
              className="text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium transition"
            >
              <Sparkles className="w-3 h-3" />
              Fill Demo Credentials
            </button>
            {isLogin && <span className="hover:text-slate-300 cursor-pointer">Forgot password?</span>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white font-semibold text-xs shadow-glow transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>{isLogin ? 'Sign In & Start Listening' : 'Create My Audio Feed'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Feature Highlights */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2 text-slate-400 text-[11px]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>5, 7, & 15-minute daily personalized AI briefings</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>Interactive word-by-word synced transcripts</span>
          </div>
        </div>
      </div>
    </div>
  );
};
