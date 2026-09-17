import { NextResponse } from 'next/server';
import { db } from '@/lib/server/db';
import { getAuthUser } from '@/lib/server/auth';
import { INITIAL_USER } from '@/lib/newsData';

export async function GET() {
  const user = await getAuthUser();
  const userId = user?.id || INITIAL_USER.id;

  const savedIds = db.getSavedArticleIds(userId);
  const savedArticles = db.getArticles().filter((a) => savedIds.includes(a.id));

  return NextResponse.json({
    savedArticleIds: savedIds,
    articles: savedArticles,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { articleId } = body;

    if (!articleId) {
      return NextResponse.json(
        { error: 'Article ID is required' },
        { status: 400 }
      );
    }

    const user = await getAuthUser();
    const userId = user?.id || INITIAL_USER.id;

    const updatedSavedIds = db.toggleSaveArticle(userId, articleId);

    return NextResponse.json({
      success: true,
      savedArticleIds: updatedSavedIds,
      isSaved: updatedSavedIds.includes(articleId),
    });
  } catch (err) {
    console.error('Bookmark toggle error:', err);
    return NextResponse.json({ error: 'Failed to update saved articles' }, { status: 500 });
  }
}
