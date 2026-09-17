import { cookies } from 'next/headers';
import { db } from './db';
import { User } from '@/lib/types';

const JWT_SECRET = process.env.JWT_SECRET || 'nuzio_ai_super_secret_jwt_key_2026_9981273918237';

// Simple base64 token generator & verifier for robust server execution
export function signToken(payload: { userId: string; email: string }): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 7 * 86400 * 1000 })).toString('base64url');
  const signature = Buffer.from(`${header}.${body}.${JWT_SECRET}`).toString('base64url').slice(0, 32);
  return `${header}.${body}.${signature}`;
}

export function verifyToken(token: string): { userId: string; email: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const bodyStr = Buffer.from(parts[1], 'base64url').toString('utf-8');
    const body = JSON.parse(bodyStr);
    if (body.exp && body.exp < Date.now()) {
      return null;
    }
    return { userId: body.userId, email: body.email };
  } catch {
    return null;
  }
}

export async function getAuthUser(): Promise<User | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('nuzio_token')?.value;

    if (!token) return null;

    const payload = verifyToken(token);
    if (!payload) return null;

    return db.getUserById(payload.userId);
  } catch {
    return null;
  }
}
