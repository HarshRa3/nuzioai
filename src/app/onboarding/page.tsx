'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Radio, Check, Clock, Volume2, ArrowRight, ArrowLeft, Sparkles, Calendar } from 'lucide-react';
import { AI_HOSTS, INITIAL_USER } from '@/lib/newsData';

export default function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);

  // Form State
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['Tech & AI', 'Markets & Finance', 'Science']);
  const [selectedHostId, setSelectedHostId] = useState<string>('alex-tech');
  const [briefingDuration, setBriefingDuration] = useState<3 | 7 | 15>(7);
  const [deliverySchedule, setDeliverySchedule] = useState<string>('08:00 AM (Morning)');
  const [profession, setProfession] = useState<string>('Software Engineer & Founder');
  const [initializing, setInitializing] = useState<boolean>(false);

  const availableTopics = [
    'Tech & AI',
    'Markets & Finance',
    'Science',
    'World News',
    'AI & Future',
    'Startups',
    'Culture & Tech',
    'Climate & Energy',
  ];

  const deliverySchedules = [
    { time: '08:00 AM (Morning)', label: 'Morning Commute', desc: 'Ready as you wake up or start your daily commute.' },
    { time: '01:00 PM (Midday)', label: 'Lunch Digest', desc: 'Quick midday briefing during lunch hours.' },
    { time: '06:00 PM (Evening)', label: 'Evening Catchup', desc: 'Comprehensive wrap-up of the day’s top developments.' },
  ];

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      if (selectedTopics.length > 1) {
        setSelectedTopics(selectedTopics.filter((t) => t !== topic));
      }
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else if (step === 4) {
      // Transition to Step 05 (Initialization)
      setStep(5);
      setInitializing(true);

      setTimeout(() => {
        const stored = localStorage.getItem('nuzio_user');
        const currentUser = stored ? JSON.parse(stored) : INITIAL_USER;
        const updatedUser = {
          ...currentUser,
          preferences: {
            ...currentUser.preferences,
            topics: selectedTopics,
            briefingDuration,
            preferredHostId: selectedHostId,
            profession,
            deliverySchedule,
          },
        };
        localStorage.setItem('nuzio_user', JSON.stringify(updatedUser));
        router.push('/');
      }, 2200);
    }
  };

  return (
    <main className="min-h-screen bg-figma-ink flex flex-col justify-between relative overflow-hidden px-4 py-6">
      {/* Figma Ambient Purple Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] purple-radial-glow rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar (38px Logo + Monospace Step Indicator 01/05) */}
      <header className="max-w-3xl mx-auto w-full flex items-center justify-between z-10 py-2 border-b border-white/10">
        <div className="flex items-center gap-3">
          {/* 38px Logo Mark */}
          <div className="w-[38px] h-[38px] rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-purpleGlow">
            <Radio className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-lg text-white">
            NUZIO <span className="text-figma-purple">AI</span>
          </span>
        </div>

        {/* Monospace Step Indicator */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-figma-purple font-bold">
            0{step}/05
          </span>
          <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden hidden sm:block">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Step Contents Container */}
      <div className="max-w-3xl mx-auto w-full z-10 my-auto py-6">
        {/* STEP 1: TOPIC SELECTION */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center sm:text-left">
              <span className="text-xs font-mono text-figma-purple font-semibold uppercase tracking-wider">Step 01 / 05</span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                Select Your Core News Topics
              </h2>
              <p className="text-xs text-figma-textMuted mt-1">
                Choose the domains you want your AI host to prioritize in your daily audio feeds.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {availableTopics.map((topic) => {
                const selected = selectedTopics.includes(topic);
                return (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`p-4 rounded-2xl border text-xs font-semibold flex items-center justify-between transition ${
                      selected
                        ? 'bg-purple-600/25 border-figma-purple text-purple-200 shadow-purpleGlow'
                        : 'figma-card text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <span>{topic}</span>
                    {selected && <Check className="w-4 h-4 text-figma-purple" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: AI VOICE HOSTS */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center sm:text-left">
              <span className="text-xs font-mono text-figma-purple font-semibold uppercase tracking-wider">Step 02 / 05</span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                Choose Your Preferred AI Narrator
              </h2>
              <p className="text-xs text-figma-textMuted mt-1">
                Select an AI voice host persona to anchor your audio briefings.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AI_HOSTS.map((host) => {
                const active = selectedHostId === host.id;
                return (
                  <div
                    key={host.id}
                    onClick={() => setSelectedHostId(host.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex gap-3.5 ${
                      active
                        ? 'bg-purple-600/25 border-figma-purple shadow-purpleGlow'
                        : 'figma-card hover:border-white/20'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-purple-400/40">
                      {/* eslint-disable-next-html-element-suppression */}
                      <img src={host.avatar} alt={host.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white">{host.name}</h4>
                        {active && <Check className="w-4 h-4 text-figma-purple" />}
                      </div>
                      <p className="text-[11px] text-figma-purple font-medium">{host.role}</p>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-snug">{host.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: BRIEFING DURATION */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center sm:text-left">
              <span className="text-xs font-mono text-figma-purple font-semibold uppercase tracking-wider">Step 03 / 05</span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                Set Your Daily Audio Briefing Length
              </h2>
              <p className="text-xs text-figma-textMuted mt-1">
                How much screen-free listening time do you want each day?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { mins: 3, label: '3 Min Express', desc: 'Top 2 high-level headlines for quick catchups.' },
                { mins: 7, label: '7 Min Daily Brief', desc: 'Curated 4-story roundup with core takeaways.' },
                { mins: 15, label: '15 Min Deep Dive', desc: 'Comprehensive coverage with full context.' },
              ].map((item) => {
                const active = briefingDuration === item.mins;
                return (
                  <div
                    key={item.mins}
                    onClick={() => setBriefingDuration(item.mins as any)}
                    className={`p-5 rounded-2xl border cursor-pointer transition ${
                      active
                        ? 'bg-purple-600/25 border-figma-purple shadow-purpleGlow'
                        : 'figma-card hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-white flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-figma-purple" />
                        {item.label}
                      </span>
                      {active && <Check className="w-4 h-4 text-figma-purple" />}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: DELIVERY SCHEDULE */}
        {step === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center sm:text-left">
              <span className="text-xs font-mono text-figma-purple font-semibold uppercase tracking-wider">Step 04 / 05</span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                Automated Delivery Schedule
              </h2>
              <p className="text-xs text-figma-textMuted mt-1">
                When should your AI host synthesize and publish your custom audio feed?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {deliverySchedules.map((sched) => {
                const active = deliverySchedule === sched.time;
                return (
                  <div
                    key={sched.time}
                    onClick={() => setDeliverySchedule(sched.time)}
                    className={`p-5 rounded-2xl border cursor-pointer transition ${
                      active
                        ? 'bg-purple-600/25 border-figma-purple shadow-purpleGlow'
                        : 'figma-card hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-figma-purple" />
                        {sched.time}
                      </span>
                      {active && <Check className="w-4 h-4 text-figma-purple" />}
                    </div>
                    <div className="text-xs font-semibold text-purple-200">{sched.label}</div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{sched.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: INITIALIZATION LOADING SCREEN */}
        {step === 5 && (
          <div className="text-center py-12 space-y-6 animate-fadeIn">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-purpleGlowHeavy border border-purple-400/40 animate-pulse-glow">
              <Radio className="w-10 h-10 text-white" />
            </div>

            <div>
              <span className="text-xs font-mono text-figma-purple font-bold uppercase tracking-widest">Step 05 / 05</span>
              <h2 className="text-2xl font-display font-bold text-white mt-1">
                Synthesizing Your Custom Nuzio AI Feed...
              </h2>
              <p className="text-xs text-figma-textMuted mt-1">
                Compiling today’s top stories in {selectedTopics.join(', ')} with voice host {selectedHostId}.
              </p>
            </div>

            <div className="w-64 mx-auto h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 animate-pulse" style={{ width: '85%' }} />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation Buttons */}
      {step < 5 && (
        <footer className="max-w-3xl mx-auto w-full z-10 flex items-center justify-between pt-4 border-t border-white/10">
          <button
            onClick={() => step > 1 && setStep(step - 1)}
            disabled={step === 1}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
              step === 1 ? 'opacity-30 cursor-not-allowed text-slate-500' : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            onClick={handleNextStep}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-purpleGlow transition flex items-center gap-2"
          >
            <span>{step === 4 ? 'Synthesize My Feed' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </footer>
      )}
    </main>
  );
}
