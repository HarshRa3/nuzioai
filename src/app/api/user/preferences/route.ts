import { NextResponse } from 'next/server';
import { db } from '@/lib/server/db';
import { getAuthUser } from '@/lib/server/auth';
import { INITIAL_USER } from '@/lib/newsData';

export async function GET() {
  const user = await getAuthUser();
  const userId = user?.id || INITIAL_USER.id;
  const dbUser = db.getUserById(userId) || INITIAL_USER;

  return NextResponse.json({
    preferences: dbUser.preferences,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await getAuthUser();
    const userId = user?.id || INITIAL_USER.id;

    const updatedUser = db.updateUserPreferences(userId, body);

    return NextResponse.json({
      success: true,
      preferences: updatedUser?.preferences || body,
    });
  } catch (err) {
    console.error('Update preferences error:', err);
    return NextResponse.json(
      { error: 'Failed to update preferences' },
      { status: 400 }
    );
  }
}
