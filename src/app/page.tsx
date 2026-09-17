'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { NewsCard } from '@/components/NewsCard';
import { MiniPlayer } from '@/components/MiniPlayer';
import { FullPlayerModal } from '@/components/FullPlayerModal';
import { AudioVisualizer } from '@/components/AudioVisualizer';
import { INITIAL_USER, SAMPLE_ARTICLES, AI_HOSTS } from '@/lib/newsData';
import { Article, HostVoice, PlaybackState, User } from '@/lib/types';
import { globalAudioEngine } from '@/lib/audioEngine';
import { Play, Pause, Radio, Sparkles, Search, SlidersHorizontal, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [articles, setArticles] = useState<Article[]>(SAMPLE_ARTICLES);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSavedOnly, setShowSavedOnly] = useState<boolean>(false);

  // Playback State
  const [playback, setPlayback] = useState<PlaybackState>({
    currentArticle: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    playbackSpeed: 1.0,
    volume: 1.0,
    isMuted: false,
    playlist: SAMPLE_ARTICLES,
    currentIndex: 0,
    activeHost: AI_HOSTS[0],
  });

  const [showFullPlayer, setShowFullPlayer] = useState<boolean>(false);

  // Load user profile from localStorage if present
  useEffect(() => {
    const stored = localStorage.getItem('nuzio_user');
    if (stored) {
      try {
        const u = JSON.parse(stored);
        setUser(u);
      } catch {
        // fallback
      }
    }
  }, []);

  // Filtered Articles List
  const filteredArticles = articles.filter((art) => {
    const matchesCat =
      selectedCategory === 'All' || art.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      searchQuery === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSaved = !showSavedOnly || art.isSaved;

    return matchesCat && matchesSearch && matchesSaved;
  });

  // Audio Playback Triggers
  const handlePlayArticle = (article: Article) => {
    const host = article.host || playback.activeHost;
    setPlayback((prev) => ({
      ...prev,
      currentArticle: article,
      isPlaying: true,
      currentTime: 0,
      duration: article.audioDurationSeconds,
      activeHost: host,
    }));

    globalAudioEngine.playArticle(
      article,
      host,
      (time) => {
        setPlayback((prev) => ({ ...prev, currentTime: time }));
      },
      () => {
        setPlayback((prev) => ({ ...prev, isPlaying: false }));
      }
    );
  };

  const handlePause = () => {
    globalAudioEngine.pause();
    setPlayback((prev) => ({ ...prev, isPlaying: false }));
  };

  const handleResume = () => {
    globalAudioEngine.resume();
    setPlayback((prev) => ({ ...prev, isPlaying: true }));
  };

  const handleSeek = (seconds: number) => {
    globalAudioEngine.seek(seconds);
    setPlayback((prev) => ({ ...prev, currentTime: seconds }));
  };

  const handleSpeedChange = (speed: number) => {
    globalAudioEngine.setSpeed(speed);
    setPlayback((prev) => ({ ...prev, playbackSpeed: speed }));
  };

  const handleHostChange = (newHost: HostVoice) => {
    setPlayback((prev) => ({ ...prev, activeHost: newHost }));
    if (playback.currentArticle) {
      handlePlayArticle({
        ...playback.currentArticle,
        host: newHost,
      });
    }
  };

  const handlePlayFullBriefing = () => {
    if (filteredArticles.length > 0) {
      handlePlayArticle(filteredArticles[0]);
      setShowFullPlayer(true);
    }
  };

  const handleToggleSaveArticle = (articleId: string) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === articleId ? { ...a, isSaved: !a.isSaved } : a))
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('nuzio_user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-figma-ink text-slate-100 flex flex-col pb-28 relative">
      {/* Figma Top Navbar */}
      <Navbar user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-8 flex-1 z-10">
        {/* Daily Briefing Hero Banner (Figma Style) */}
        <div className="relative rounded-3xl p-6 sm:p-8 figma-card border border-white/10 shadow-2xl overflow-hidden bg-gradient-to-r from-figma-dark via-purple-950/20 to-figma-dark">
          {/* Ambient Purple Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 purple-radial-glow rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-figma-purple" />
                  Your Personalized Briefing Ready
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
                Good Morning, {user.name.split(' ')[0]} 👋
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We compiled a <strong className="text-figma-purple font-mono">{user.preferences.briefingDuration}-minute briefing</strong> covering {user.preferences.topics.join(', ')} scheduled for <strong className="text-purple-300 font-mono">{user.preferences.deliverySchedule}</strong>.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handlePlayFullBriefing}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-purpleGlow transition flex items-center gap-2 group"
                >
                  <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
                  <span>Play My {user.preferences.briefingDuration}-Min Daily Brief</span>
                </button>

                <Link
                  href="/onboarding"
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-figma-purple" />
                  <span>Customize Schedule & Voice</span>
                </Link>
              </div>
            </div>

            {/* Right: AI Host Avatar Frame */}
            <div className="p-4 rounded-2xl figma-card border border-white/10 flex items-center gap-4 min-w-[280px]">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-400/60 shadow-purpleGlow relative flex-shrink-0">
                {/* eslint-disable-next-html-element-suppression */}
                <img
                  src={playback.activeHost.avatar}
                  alt={playback.activeHost.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-figma-purple font-bold">
                  Active AI Narrator
                </div>
                <div className="text-sm font-bold text-white">{playback.activeHost.name}</div>
                <div className="text-[11px] text-slate-400">{playback.activeHost.role}</div>

                <div className="mt-2">
                  <AudioVisualizer isPlaying={playback.isPlaying} barCount={10} heightClass="h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <span>Discover Stories</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/10 text-slate-300">
                  {filteredArticles.length} Available
                </span>
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI audio stories..."
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-figma-purple transition"
              />
            </div>
          </div>

          {/* Category Pill Filters */}
          <CategoryFilter
            categories={['All', 'Tech & AI', 'Markets', 'Science', 'World', 'Startups']}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setShowSavedOnly(false);
            }}
            showSavedOnly={showSavedOnly}
            onToggleSavedOnly={() => setShowSavedOnly(!showSavedOnly)}
          />
        </div>

        {/* News Cards Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art) => {
              const isCurrent = playback.currentArticle?.id === art.id;
              return (
                <NewsCard
                  key={art.id}
                  article={art}
                  isPlaying={playback.isPlaying}
                  isCurrent={isCurrent}
                  onPlay={handlePlayArticle}
                  onPause={handlePause}
                  onToggleSave={handleToggleSaveArticle}
                  onOpenDetails={(selected) => {
                    handlePlayArticle(selected);
                    setShowFullPlayer(true);
                  }}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 figma-card rounded-3xl border border-white/10 space-y-3">
            <Radio className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No audio stories match your search</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try changing your category filter or search query.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setShowSavedOnly(false);
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Sticky Bottom Mini Player */}
      {playback.currentArticle && (
        <MiniPlayer
          article={playback.currentArticle}
          isPlaying={playback.isPlaying}
          currentTime={playback.currentTime}
          duration={playback.duration}
          onPlayPause={() => {
            if (playback.isPlaying) handlePause();
            else handleResume();
          }}
          onSeek={handleSeek}
          onExpand={() => setShowFullPlayer(true)}
        />
      )}

      {/* Fullscreen Player Modal */}
      {showFullPlayer && playback.currentArticle && (
        <FullPlayerModal
          article={playback.currentArticle}
          isPlaying={playback.isPlaying}
          currentTime={playback.currentTime}
          duration={playback.duration}
          speed={playback.playbackSpeed}
          volume={playback.volume}
          isMuted={playback.isMuted}
          onClose={() => setShowFullPlayer(false)}
          onPlayPause={() => {
            if (playback.isPlaying) handlePause();
            else handleResume();
          }}
          onSeek={handleSeek}
          onSpeedChange={handleSpeedChange}
          onVolumeChange={(v) => setPlayback((prev) => ({ ...prev, volume: v }))}
          onToggleMute={() => setPlayback((prev) => ({ ...prev, isMuted: !prev.isMuted }))}
          onHostChange={handleHostChange}
          onNextStory={() => {
            const nextIdx = (playback.currentIndex + 1) % articles.length;
            setPlayback((prev) => ({ ...prev, currentIndex: nextIdx }));
            handlePlayArticle(articles[nextIdx]);
          }}
          onPrevStory={() => {
            const prevIdx = (playback.currentIndex - 1 + articles.length) % articles.length;
            setPlayback((prev) => ({ ...prev, currentIndex: prevIdx }));
            handlePlayArticle(articles[prevIdx]);
          }}
        />
      )}
    </div>
  );
}
