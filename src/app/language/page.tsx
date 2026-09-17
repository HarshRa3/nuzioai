'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Radio, Globe, Check, ArrowRight } from 'lucide-react';

export default function LanguagePage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');

  const languages = [
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸', accent: 'Natural American Neural Voice' },
    { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧', accent: 'Crisp British Financial Voice' },
    { code: 'es', name: 'Spanish (Español)', flag: '🇪🇸', accent: 'Vibrant Neutral Spanish Voice' },
    { code: 'fr', name: 'French (Français)', flag: '🇫🇷', accent: 'Smooth European French Voice' },
    { code: 'de', name: 'German (Deutsch)', flag: '🇩🇪', accent: 'Precise German Tech Voice' },
    { code: 'ja', name: 'Japanese (日本語)', flag: '🇯🇵', accent: 'Clear Tokyo AI Voice' },
  ];

  const handleProceed = () => {
    localStorage.setItem('nuzio_language', selectedLanguage);
    router.push('/login');
  };

  return (
    <main className="min-h-screen bg-figma-ink flex flex-col justify-between relative overflow-hidden px-4 py-8">
      {/* Figma Ambient Radial Purple Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] purple-radial-glow rounded-full blur-3xl pointer-events-none" />

      {/* 76px Header Logo */}
      <div className="max-w-2xl mx-auto w-full text-center space-y-4 z-10 pt-4">
        <div className="w-[76px] h-[76px] mx-auto rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-purpleGlow border border-purple-400/30">
          <Radio className="w-9 h-9 text-white" />
        </div>

        <div>
          <span className="text-xs font-mono text-figma-purple tracking-wider uppercase font-semibold">Step 1 of 2</span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
            Choose Your AI Host Language
          </h1>
          <p className="text-xs text-figma-textMuted mt-1">
            Select the primary voice language for your daily news audio briefings.
          </p>
        </div>
      </div>

      {/* Language Options Grid */}
      <div className="max-w-xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 gap-3 z-10 my-auto py-6">
        {languages.map((lang) => {
          const active = selectedLanguage === lang.name;
          return (
            <div
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.name)}
              className={`p-4 rounded-2xl figma-card cursor-pointer transition flex items-center justify-between border ${
                active
                  ? 'bg-purple-600/20 border-figma-purple shadow-purpleGlow'
                  : 'hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{lang.flag}</span>
                <div>
                  <div className="text-xs font-bold text-white">{lang.name}</div>
                  <div className="text-[10px] text-figma-textMuted">{lang.accent}</div>
                </div>
              </div>
              {active && (
                <div className="w-5 h-5 rounded-full bg-figma-purple flex items-center justify-center text-white">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="max-w-xl mx-auto w-full z-10 text-center pb-4">
        <button
          onClick={handleProceed}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-purpleGlow transition flex items-center justify-center gap-2"
        >
          <span>Confirm Language & Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </main>
  );
}
