import mongoose, { Schema, Document, Model } from 'mongoose';
import { User, UserPreferences } from '@/lib/types';
import { INITIAL_USER } from '@/lib/newsData';
import { connectToDatabase } from '@/lib/server/mongoose';

export interface IUserPreferencesSubdocument {
  topics: string[];
  briefingDuration: 3 | 7 | 15;
  preferredHostId: string;
  profession: string;
  language: string;
  deliverySchedule: string;
  autoPlay: boolean;
}

export interface IUserDocument extends Document {
  id: string;
  name: string;
  email: string;
  passwordHash?: string;
  avatar: string;
  preferences: IUserPreferencesSubdocument;
  listeningStreakDays: number;
  totalListeningMinutes: number;
}

const UserPreferencesSchema = new Schema<IUserPreferencesSubdocument>({
  topics: { type: [String], default: ['Tech & AI', 'Startups', 'Markets & Finance', 'Science'] },
  briefingDuration: { type: Number, enum: [3, 7, 15], default: 7 },
  preferredHostId: { type: String, default: 'alex-tech' },
  profession: { type: String, default: 'Software Engineer & Founder' },
  language: { type: String, default: 'English (US)' },
  deliverySchedule: { type: String, default: '08:00 AM (Morning)' },
  autoPlay: { type: Boolean, default: true },
});

const UserSchema = new Schema<IUserDocument>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String },
    avatar: { type: String },
    preferences: { type: UserPreferencesSchema, default: () => ({}) },
    listeningStreakDays: { type: Number, default: 1 },
    totalListeningMinutes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const UserModelMongo: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema);

export class UserModel {
  public static async findByEmail(email: string): Promise<User | null> {
    try {
      await connectToDatabase();
      const user = await UserModelMongo.findOne({ email: email.toLowerCase() });
      if (!user) return null;
      return this.formatUser(user);
    } catch {
      return null;
    }
  }

  public static async findById(id: string): Promise<User | null> {
    try {
      await connectToDatabase();
      const user = await UserModelMongo.findOne({ id });
      if (!user) return null;
      return this.formatUser(user);
    } catch {
      return null;
    }
  }

  public static async createUser(userData: {
    name: string;
    email: string;
    passwordHash?: string;
    avatar?: string;
  }): Promise<User> {
    const avatarUrl =
      userData.avatar ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.name)}`;

    const userId = `usr_${Date.now()}`;

    try {
      await connectToDatabase();
      const created = await UserModelMongo.create({
        id: userId,
        name: userData.name,
        email: userData.email.toLowerCase(),
        passwordHash: userData.passwordHash || 'demo_hash',
        avatar: avatarUrl,
        preferences: {
          topics: ['Tech & AI', 'Startups', 'Markets & Finance', 'Science'],
          briefingDuration: 7,
          preferredHostId: 'alex-tech',
          profession: 'Software Engineer & Founder',
          language: 'English (US)',
          deliverySchedule: '08:00 AM (Morning)',
          autoPlay: true,
        },
        listeningStreakDays: 1,
        totalListeningMinutes: 0,
      });

      return this.formatUser(created);
    } catch {
      return {
        id: userId,
        name: userData.name,
        email: userData.email,
        avatar: avatarUrl,
        preferences: INITIAL_USER.preferences,
        listeningStreakDays: 1,
        totalListeningMinutes: 0,
      };
    }
  }

  public static async updateStats(userId: string, minutes: number): Promise<User | null> {
    try {
      await connectToDatabase();
      const updated = await UserModelMongo.findOneAndUpdate(
        { id: userId },
        { $inc: { totalListeningMinutes: minutes } },
        { new: true }
      );
      if (!updated) return null;
      return this.formatUser(updated);
    } catch {
      return null;
    }
  }

  public static formatUser(doc: IUserDocument): User {
    return {
      id: doc.id,
      name: doc.name,
      email: doc.email,
      avatar: doc.avatar || INITIAL_USER.avatar,
      preferences: {
        topics: doc.preferences?.topics || INITIAL_USER.preferences.topics,
        briefingDuration: (doc.preferences?.briefingDuration as any) || 7,
        preferredHostId: doc.preferences?.preferredHostId || 'alex-tech',
        profession: doc.preferences?.profession || 'Developer & Founder',
        language: doc.preferences?.language || 'English (US)',
        deliverySchedule: doc.preferences?.deliverySchedule || '08:00 AM (Morning)',
        autoPlay: doc.preferences?.autoPlay ?? true,
      },
      listeningStreakDays: doc.listeningStreakDays || 1,
      totalListeningMinutes: doc.totalListeningMinutes || 0,
    };
  }
}
