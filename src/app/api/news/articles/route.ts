import { NextResponse } from 'next/server';
import { db } from '@/lib/server/db';
import { getAuthUser } from '@/lib/server/auth';
import { AI_HOSTS } from '@/lib/newsData';
import { Article } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const savedOnly = searchParams.get('saved') === 'true';

  const user = await getAuthUser();
  const userId = user?.id || 'usr_9921';
  const savedIds = db.getSavedArticleIds(userId);

  let articles = db.getArticles().map((art) => ({
    ...art,
    isSaved: savedIds.includes(art.id),
  }));

  if (category && category !== 'All') {
    articles = articles.filter(
      (art) => art.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    const q = search.toLowerCase();
    articles = articles.filter(
      (art) =>
        art.title.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        art.category.toLowerCase().includes(q)
    );
  }

  if (savedOnly) {
    articles = articles.filter((art) => art.isSaved);
  }

  return NextResponse.json({
    articles: articles,
    total: articles.length,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, subtitle, category, summary, keyTakeaways, hostId } = body;

    if (!title || !category || !summary) {
      return NextResponse.json(
        { error: 'Title, category, and summary are required' },
        { status: 400 }
      );
    }

    const host = AI_HOSTS.find((h) => h.id === hostId) || AI_HOSTS[0];
    const newArticle: Article = {
      id: `art_${Date.now()}`,
      title,
      subtitle: subtitle || 'AI Synthesized audio briefing story.',
      category: category || 'Tech & AI',
      source: 'Nuzio AI Intelligence',
      publishedAt: 'Just now',
      readTimeMinutes: 4,
      audioDurationSeconds: 150,
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      host: host,
      isTrending: true,
      isSaved: false,
      summary: summary,
      keyTakeaways: keyTakeaways || [
        'Synthesized in real-time by Nuzio AI neural engine.',
        'High-density key points extracted for efficient listening.',
        'Customized according to user topics and audio length preference.'
      ],
      fullTranscript: [
        {
          id: `tr_${Date.now()}_1`,
          speaker: `[${host.name.split(' ')[0]}]`,
          startTime: 0,
          endTime: 15,
          text: `Welcome to your Nuzio AI update. ${title}. ${summary}`,
        },
        {
          id: `tr_${Date.now()}_2`,
          speaker: `[${host.name.split(' ')[0]}]`,
          startTime: 15,
          endTime: 60,
          text: `Key insights include automated pipeline synthesis, fast verification loops, and zero-screen time productivity optimization.`,
        }
      ],
    };

    db.addArticle(newArticle);
    return NextResponse.json({
      success: true,
      article: newArticle,
    });
  } catch (err) {
    console.error('Create article error:', err);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
