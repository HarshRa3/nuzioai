import { connectToDatabase } from './mongoose';
import { HostVoiceModel } from '@/models/HostVoice';
import { UserModelMongo } from '@/models/User';
import { ArticleModelMongo } from '@/models/Article';
import { AI_HOSTS, INITIAL_USER, SAMPLE_ARTICLES } from '@/lib/newsData';

export async function seedMongooseDatabase() {
  console.log('🌱 Starting Nuzio AI Mongoose MongoDB Seed...');

  try {
    await connectToDatabase();

    // 1. Seed Host Voices
    for (const host of AI_HOSTS) {
      await HostVoiceModel.findOneAndUpdate(
        { _id: host.id },
        {
          _id: host.id,
          name: host.name,
          role: host.role,
          accent: host.accent,
          avatar: host.avatar,
          description: host.description,
        },
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${AI_HOSTS.length} HostVoice Mongoose models`);

    // 2. Seed Initial User
    await UserModelMongo.findOneAndUpdate(
      { email: INITIAL_USER.email.toLowerCase() },
      {
        id: INITIAL_USER.id,
        name: INITIAL_USER.name,
        email: INITIAL_USER.email.toLowerCase(),
        avatar: INITIAL_USER.avatar,
        passwordHash: 'demo123456_hash',
        preferences: INITIAL_USER.preferences,
        listeningStreakDays: INITIAL_USER.listeningStreakDays,
        totalListeningMinutes: INITIAL_USER.totalListeningMinutes,
      },
      { upsert: true, new: true }
    );
    console.log(`✅ Seeded User Mongoose model: ${INITIAL_USER.name}`);

    // 3. Seed Articles & Transcripts
    for (const art of SAMPLE_ARTICLES) {
      await ArticleModelMongo.findOneAndUpdate(
        { id: art.id },
        {
          id: art.id,
          title: art.title,
          subtitle: art.subtitle,
          category: art.category,
          source: art.source,
          publishedAt: art.publishedAt,
          readTimeMinutes: art.readTimeMinutes,
          audioDurationSeconds: art.audioDurationSeconds,
          imageUrl: art.imageUrl,
          hostId: art.host.id,
          summary: art.summary,
          keyTakeaways: art.keyTakeaways,
          isTrending: art.isTrending || false,
          fullTranscript: art.fullTranscript,
        },
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${SAMPLE_ARTICLES.length} Article & Transcript Mongoose models`);

    console.log('🎉 MongoDB Mongoose Seed Completed Successfully!');
    return true;
  } catch (err) {
    console.error('Mongoose seed error:', err);
    return false;
  }
}
