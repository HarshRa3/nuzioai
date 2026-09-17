import { NextResponse } from 'next/server';
import { db } from '@/lib/server/db';
import { signToken } from '@/lib/server/auth';
import { INITIAL_USER } from '@/lib/newsData';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    const existing = db.getUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    const userId = `usr_${Date.now()}`;
    const newUser = {
      ...INITIAL_USER,
      id: userId,
      name: name,
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      passwordHash: `${password}_hash`,
    };

    db.createUser(newUser);
    const token = signToken({ userId: newUser.id, email: newUser.email });

    const response = NextResponse.json({
      success: true,
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        preferences: newUser.preferences,
        listeningStreakDays: newUser.listeningStreakDays,
        totalListeningMinutes: newUser.totalListeningMinutes,
      },
    });

    response.cookies.set('nuzio_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 86400,
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('Registration API error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
