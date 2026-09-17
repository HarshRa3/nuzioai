import { UserModelMongo, UserModel } from '@/models/User';
import { UserPreferences } from '@/lib/types';
import { INITIAL_USER } from '@/lib/newsData';
import { connectToDatabase } from '@/lib/server/mongoose';

export class PreferencesModel {
  public static async getByUserId(userId: string): Promise<UserPreferences> {
    try {
      await connectToDatabase();
      const user = await UserModelMongo.findOne({ id: userId });
      if (!user || !user.preferences) return INITIAL_USER.preferences;

      return {
        topics: user.preferences.topics || INITIAL_USER.preferences.topics,
        briefingDuration: user.preferences.briefingDuration as 3 | 7 | 15,
        preferredHostId: user.preferences.preferredHostId || 'alex-tech',
        profession: user.preferences.profession || 'Developer & Founder',
        language: user.preferences.language || 'English (US)',
        deliverySchedule: user.preferences.deliverySchedule || '08:00 AM (Morning)',
        autoPlay: user.preferences.autoPlay ?? true,
      };
    } catch {
      return INITIAL_USER.preferences;
    }
  }

  public static async update(
    userId: string,
    updates: Partial<UserPreferences>
  ): Promise<UserPreferences> {
    try {
      await connectToDatabase();
      const existing = await this.getByUserId(userId);
      const merged = { ...existing, ...updates };

      await UserModelMongo.findOneAndUpdate(
        { id: userId },
        { $set: { preferences: merged } },
        { new: true }
      );

      return merged;
    } catch {
      return { ...INITIAL_USER.preferences, ...updates };
    }
  }
}
