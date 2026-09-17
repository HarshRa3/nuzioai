import { NextResponse } from 'next/server';
import { SAMPLE_ARTICLES, AI_HOSTS } from '@/lib/newsData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const duration = parseInt(searchParams.get('duration') || '7', 10);
  const hostId = searchParams.get('hostId') || 'alex-tech';

  const host = AI_HOSTS.find(h => h.id === hostId) || AI_HOSTS[0];

  // Curate dynamic audio playlist based on duration
  const targetCount = duration === 3 ? 2 : duration === 7 ? 4 : 5;
  const playlist = SAMPLE_ARTICLES.slice(0, targetCount).map(article => ({
    ...article,
    host: host,
  }));

  const totalDurationSeconds = playlist.reduce((acc, a) => acc + a.audioDurationSeconds, 0);

  return NextResponse.json({
    briefingId: `brf_${Date.now()}`,
    title: `Your Personalized ${duration}-Minute Morning Briefing`,
    date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
    host: host,
    totalDurationSeconds: totalDurationSeconds,
    playlist: playlist,
  });
}
