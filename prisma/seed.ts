import { PrismaClient } from '@prisma/client';
import { AI_HOSTS, INITIAL_USER, SAMPLE_ARTICLES } from '../src/lib/newsData';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Prisma Database Schema for Nuzio AI...');

  // 1. Seed Host Voices
  for (const host of AI_HOSTS) {
    await prisma.hostVoice.upsert({
      where: { id: host.id },
      update: {
        name: host.name,
        role: host.role,
        accent: host.accent,
        avatar: host.avatar,
        description: host.description,
      },
      create: {
        id: host.id,
        name: host.name,
        role: host.role,
        accent: host.accent,
        avatar: host.avatar,
        description: host.description,
      },
    });
  }
  console.log(`✅ Seeded ${AI_HOSTS.length} HostVoice models`);

  // 2. Seed Initial User
  const user = await prisma.user.upsert({
    where: { email: INITIAL_USER.email },
    update: {},
    create: {
      id: INITIAL_USER.id,
      name: INITIAL_USER.name,
      email: INITIAL_USER.email,
      avatar: INITIAL_USER.avatar,
      passwordHash: 'demo123456_hash',
      listeningStreakDays: INITIAL_USER.listeningStreakDays,
      totalListeningMinutes: INITIAL_USER.totalListeningMinutes,
      preferences: {
        create: {
          topics: JSON.stringify(INITIAL_USER.preferences.topics),
          briefingDuration: INITIAL_USER.preferences.briefingDuration,
          preferredHostId: INITIAL_USER.preferences.preferredHostId,
          profession: INITIAL_USER.preferences.profession,
          language: INITIAL_USER.preferences.language,
          deliverySchedule: INITIAL_USER.preferences.deliverySchedule,
          autoPlay: INITIAL_USER.preferences.autoPlay,
        },
      },
    },
  });
  console.log(`✅ Seeded User model: ${user.name} (${user.email})`);

  // 3. Seed Sample Articles & Transcript Segments
  for (const art of SAMPLE_ARTICLES) {
    await prisma.article.upsert({
      where: { id: art.id },
      update: {},
      create: {
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
        keyTakeaways: JSON.stringify(art.keyTakeaways),
        isTrending: art.isTrending || false,
        fullTranscript: {
          create: art.fullTranscript.map((t) => ({
            speaker: t.speaker,
            startTime: t.startTime,
            endTime: t.endTime,
            text: t.text,
          })),
        },
      },
    });
  }
  console.log(`✅ Seeded ${SAMPLE_ARTICLES.length} Article & TranscriptSegment models`);

  console.log('🎉 Database Schema Seed Completed!');
}

main()
  .catch((e) => {
    console.error('Prisma seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
