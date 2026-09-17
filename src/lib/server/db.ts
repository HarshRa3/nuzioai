import { UserModel } from '@/models/User';
import { ArticleModel } from '@/models/Article';
import { PreferencesModel } from '@/models/Preferences';
import { Article, User } from '@/lib/types';
import { INITIAL_USER, SAMPLE_ARTICLES } from '@/lib/newsData';

export const db = {
  getUserByEmail: (email: string) => UserModel.findByEmail(email),

  getUserById: (id: string) => UserModel.findById(id),

  createUser: (user: any) => UserModel.create(user),

  updateUserPreferences: (userId: string, preferences: any) =>
    PreferencesModel.update(userId, preferences),

  updateUserStats: (userId: string, minutesAdded: number) =>
    UserModel.updateStats(userId, minutesAdded),

  getArticles: () => SAMPLE_ARTICLES,

  getArticleById: (id: string) =>
    SAMPLE_ARTICLES.find((a) => a.id === id) || null,

  addArticle: (article: Article) => ArticleModel.create(article),

  toggleSaveArticle: (userId: string, articleId: string) =>
    ArticleModel.toggleSave(userId, articleId),

  getSavedArticleIds: (userId: string) =>
    ArticleModel.getSavedArticleIds(userId),
};
