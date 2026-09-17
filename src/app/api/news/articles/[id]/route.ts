import { NextResponse } from 'next/server';
import { db } from '@/lib/server/db';
import { getAuthUser } from '@/lib/server/auth';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const article = db.getArticleById(params.id);
  if (!article) {
    return NextResponse.json(
      { error: 'Article not found' },
      { status: 404 }
    );
  }

  const user = await getAuthUser();
  const userId = user?.id || 'usr_9921';
  const savedIds = db.getSavedArticleIds(userId);

  return NextResponse.json({
    article: {
      ...article,
      isSaved: savedIds.includes(article.id),
    },
  });
}
