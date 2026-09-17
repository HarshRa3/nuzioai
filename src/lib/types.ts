export interface HostVoice {
  id: string;
  name: string;
  role: string;
  accent: string;
  avatar: string;
  sampleAudio?: string;
  description: string;
}

export interface TranscriptSegment {
  id: string;
  speaker: string;     // e.g. [Marcus], [Maya]
  startTime: number;   // in seconds
  endTime: number;     // in seconds
  text: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: 'Tech & AI' | 'Markets' | 'Science' | 'World' | 'Startups';
  source: string;
  publishedAt: string;
  readTimeMinutes: number;
  audioDurationSeconds: number;
  audioUrl?: string;
  imageUrl: string;
  host: HostVoice;
  keyTakeaways: string[];
  fullTranscript: TranscriptSegment[];
  summary: string;
  isTrending?: boolean;
  isSaved?: boolean;
}

export interface UserPreferences {
  topics: string[];
  briefingDuration: 3 | 7 | 15; // in minutes
  preferredHostId: string;
  profession: string;
  language: string;             // e.g. English, Spanish, French, German, Japanese
  deliverySchedule: string;     // e.g. "08:00 AM (Morning)", "06:00 PM (Evening)"
  autoPlay: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  preferences: UserPreferences;
  listeningStreakDays: number;
  totalListeningMinutes: number;
}

export interface PlaybackState {
  currentArticle: Article | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackSpeed: number; // 1.0, 1.25, 1.5, 2.0
  volume: number;
  isMuted: boolean;
  playlist: Article[];
  currentIndex: number;
  activeHost: HostVoice;
}
