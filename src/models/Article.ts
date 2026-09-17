import mongoose, { Schema, Document, Model } from 'mongoose';
import { Article, HostVoice } from '@/lib/types';
import { AI_HOSTS, SAMPLE_ARTICLES } from '@/lib/newsData';
import { connectToDatabase } from '@/lib/server/mongoose';

export interface ITranscriptSegmentSubdocument {
  id?: string;
  speaker: string;
  startTime: number;
  endTime: number;
  text: string;
}

export interface IArticleDocument extends Document {
  id: string;
  title: string;
  subtitle: string;
  category: 'Tech & AI' | 'Markets' | 'Science' | 'World' | 'Startups';
  source: string;
  publishedAt: string;
  readTimeMinutes: number;
  audioDurationSeconds: number;
  imageUrl: string;
  hostId: string;
  summary: string;
  keyTakeaways: string[];
  isTrending: boolean;
  fullTranscript: ITranscriptSegmentSubdocument[];
}

const TranscriptSegmentSchema = new Schema<ITranscriptSegmentSubdocument>({
  speaker: { type: String, required: true },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  text: { type: String, required: true },
});

const ArticleSchema = new Schema<IArticleDocument>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    category: { type: String, required: true },
    source: { type: String, required: true },
    publishedAt: { type: String, required: true },
    readTimeMinutes: { type: Number, required: true },
    audioDurationSeconds: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    hostId: { type: String, required: true },
    summary: { type: String, required: true },
    keyTakeaways: { type: [String], default: [] },
    isTrending: { type: Boolean, default: false },
    fullTranscript: { type: [TranscriptSegmentSchema], default: [] },
  },
  { timestamps: true }
);

export const ArticleModelMongo: Model<IArticleDocument> =
  mongoose.models.Article || mongoose.model<IArticleDocument>('Article', ArticleSchema);

// Saved Articles Collection
export interface ISavedArticleDocument extends Document {
  userId: string;
  articleId: string;
}

const SavedArticleSchema = new Schema<ISavedArticleDocument>(
  {
    userId: { type: String, required: true },
    articleId: { type: String, required: true },
  },
  { timestamps: true }
);
SavedArticleSchema.index({ userId: 1, articleId: 1 }, { unique: true });

export const SavedArticleModelMongo: Model<ISavedArticleDocument> =
  mongoose.models.SavedArticle ||
  mongoose.model<ISavedArticleDocument>('SavedArticle', SavedArticleSchema);

export class ArticleModel {
  public static async findAll(options?: {
    category?: string;
    search?: string;
    userId?: string;
    savedOnly?: boolean;
  }): Promise<Article[]> {
    try {
      await connectToDatabase();
      const savedIds = options?.userId
        ? await this.getSavedArticleIds(options.userId)
        : [];

      const rawArticles = await ArticleModelMongo.find({}).sort({ createdAt: -1 });

      let articles = rawArticles.map((art) => this.formatArticle(art, savedIds.includes(art.id)));

      if (articles.length === 0) {
        articles = SAMPLE_ARTICLES.map((art) => ({
          ...art,
          isSaved: savedIds.includes(art.id),
        }));
      }

      if (options?.category && options.category !== 'All') {
        articles = articles.filter(
          (art) => art.category.toLowerCase() === options.category!.toLowerCase()
        );
      }

      if (options?.search) {
        const q = options.search.toLowerCase();
        articles = articles.filter(
          (art) =>
            art.title.toLowerCase().includes(q) ||
            art.summary.toLowerCase().includes(q) ||
            art.category.toLowerCase().includes(q)
        );
      }

      if (options?.savedOnly) {
        articles = articles.filter((art) => art.isSaved);
      }

      return articles;
    } catch {
      return SAMPLE_ARTICLES;
    }
  }

  public static async findById(id: string, userId?: string): Promise<Article | null> {
    try {
      await connectToDatabase();
      const savedIds = userId ? await this.getSavedArticleIds(userId) : [];
      const rawArticle = await ArticleModelMongo.findOne({ id });

      if (!rawArticle) {
        const sample = SAMPLE_ARTICLES.find((a) => a.id === id);
        return sample ? { ...sample, isSaved: savedIds.includes(sample.id) } : null;
      }

      return this.formatArticle(rawArticle, savedIds.includes(rawArticle.id));
    } catch {
      const sample = SAMPLE_ARTICLES.find((a) => a.id === id);
      return sample || null;
    }
  }

  public static async create(articleData: Article): Promise<Article> {
    try {
      await connectToDatabase();
      const created = await ArticleModelMongo.create({
        id: articleData.id,
        title: articleData.title,
        subtitle: articleData.subtitle,
        category: articleData.category,
        source: articleData.source,
        publishedAt: articleData.publishedAt,
        readTimeMinutes: articleData.readTimeMinutes,
        audioDurationSeconds: articleData.audioDurationSeconds,
        imageUrl: articleData.imageUrl,
        hostId: articleData.host.id,
        summary: articleData.summary,
        keyTakeaways: articleData.keyTakeaways,
        isTrending: articleData.isTrending || false,
        fullTranscript: articleData.fullTranscript,
      });

      return this.formatArticle(created, false);
    } catch {
      return articleData;
    }
  }

  public static async toggleSave(userId: string, articleId: string): Promise<boolean> {
    try {
      await connectToDatabase();
      const existing = await SavedArticleModelMongo.findOne({ userId, articleId });

      if (existing) {
        await SavedArticleModelMongo.deleteOne({ _id: existing._id });
        return false;
      } else {
        await SavedArticleModelMongo.create({ userId, articleId });
        return true;
      }
    } catch {
      return false;
    }
  }

  public static async getSavedArticleIds(userId: string): Promise<string[]> {
    try {
      await connectToDatabase();
      const saved = await SavedArticleModelMongo.find({ userId });
      return saved.map((s) => s.articleId);
    } catch {
      return [];
    }
  }

  private static formatArticle(raw: IArticleDocument, isSaved: boolean): Article {
    const host: HostVoice =
      AI_HOSTS.find((h) => h.id === raw.hostId) || AI_HOSTS[0];

    return {
      id: raw.id,
      title: raw.title,
      subtitle: raw.subtitle,
      category: raw.category,
      source: raw.source,
      publishedAt: raw.publishedAt,
      readTimeMinutes: raw.readTimeMinutes,
      audioDurationSeconds: raw.audioDurationSeconds,
      imageUrl: raw.imageUrl,
      host: host,
      summary: raw.summary,
      keyTakeaways: raw.keyTakeaways || [],
      isTrending: raw.isTrending,
      isSaved: isSaved,
      fullTranscript: raw.fullTranscript
        ? raw.fullTranscript.map((t, idx) => ({
            id: `tr_${idx}`,
            speaker: t.speaker || `[${host.name.split(' ')[0]}]`,
            startTime: t.startTime,
            endTime: t.endTime,
            text: t.text,
          }))
        : [],
    };
  }
}
