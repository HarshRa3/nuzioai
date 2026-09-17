import { NextResponse } from 'next/server';
import { db } from '@/lib/server/db';
import { AI_HOSTS } from '@/lib/newsData';
import { Article } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { topic, durationMins, hostId } = body;

    const selectedTopic = topic || 'Artificial Intelligence & Software';
    const host = AI_HOSTS.find((h) => h.id === hostId) || AI_HOSTS[0];

    const generatedArticle: Article = {
      id: `art_gen_${Date.now()}`,
      title: `AI Digest: Latest Breakthroughs in ${selectedTopic}`,
      subtitle: `Synthesized audio briefing on ${selectedTopic} trends and executive takeaways.`,
      category: 'Tech & AI',
      source: 'Nuzio Neural Generator',
      publishedAt: 'Generated just now',
      readTimeMinutes: durationMins || 5,
      audioDurationSeconds: (durationMins || 5) * 30,
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      host: host,
      isTrending: true,
      isSaved: false,
      summary: `A personalized AI-synthesized news briefing highlighting autonomous software agents, hardware efficiency, and market adoption in ${selectedTopic}.`,
      keyTakeaways: [
        `Accelerates developer workflows in ${selectedTopic} by 3x.`,
        'Automated type safety and multi-modal visual debugging built-in.',
        'High enterprise adoption expected across North America and Europe.'
      ],
      fullTranscript: [
        {
          id: `gen_tr_1`,
          speaker: `[${host.name.split(' ')[0]}]`,
          startTime: 0,
          endTime: 15,
          text: `Welcome to your custom Nuzio AI briefing on ${selectedTopic}.`
        },
        {
          id: `gen_tr_2`,
          speaker: `[${host.name.split(' ')[0]}]`,
          startTime: 15,
          endTime: 45,
          text: `Recent engineering benchmarks indicate unprecedented acceleration in autonomous software generation.`
        },
        {
          id: `gen_tr_3`,
          speaker: `[${host.name.split(' ')[0]}]`,
          startTime: 45,
          endTime: (durationMins || 5) * 30,
          text: `Stay tuned as Nuzio AI continues monitoring real-time developments across global markets.`
        }
      ]
    };

    db.addArticle(generatedArticle);

    return NextResponse.json({
      success: true,
      article: generatedArticle,
    });
  } catch (err) {
    console.error('AI News generation error:', err);
    return NextResponse.json({ error: 'Failed to generate AI news' }, { status: 500 });
  }
}
