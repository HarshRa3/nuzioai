import { NextResponse } from 'next/server';
import { db } from '@/lib/server/db';
import { getAuthUser } from '@/lib/server/auth';
import { INITIAL_USER } from '@/lib/newsData';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { minutesListened } = body;

    const user = await getAuthUser();
    const userId = user?.id || INITIAL_USER.id;

    const added = Math.ceil((minutesListened || 1));
    const updatedUser = db.updateUserStats(userId, added);

    return NextResponse.json({
      success: true,
      totalListeningMinutes: updatedUser?.totalListeningMinutes || 185,
      listeningStreakDays: updatedUser?.listeningStreakDays || 14,
    });
  } catch (err) {
    console.error('Stats update error:', err);
    return NextResponse.json({ error: 'Failed to update stats' }, { status: 500 });
  }
}
