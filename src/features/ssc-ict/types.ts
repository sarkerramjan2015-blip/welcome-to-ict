export type SscPaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'expired';

export type SscOrderType = 'chapter' | 'package';

export interface SscMcq {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isPublished: boolean;
}

export interface SscShortQuestion {
  id: string;
  question: string;
  answer: string;
  importance: 'High' | 'Medium' | 'Low';
  isPublished: boolean;
}

export interface SscChapter {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  orderIndex: number;
  isPublished: boolean;
  freePreviewEnabled: boolean;
  pdfTitle: string;
  pdfPages: string[];
  previewPageLimit: number;
  mcqs: SscMcq[];
  shortQuestions: SscShortQuestion[];
}

export interface SscPackagePlan {
  id: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  isPublished: boolean;
}

export interface SscQuizSettings {
  durationMinutes: number;
  totalQuestions: number;
  negativeMarkingEnabled: boolean;
  negativeMarkValue: number;
  leaderboardEnabled: boolean;
}

export interface SscIctConfig {
  chapters: SscChapter[];
  packagePlan: SscPackagePlan;
  quizSettings: SscQuizSettings;
  updatedAt: string;
}

export interface SscOrder {
  id: string;
  userId: string;
  userName: string;
  userEmail?: string | null;
  type: SscOrderType;
  chapterSlug?: string;
  packageId?: string;
  amount: number;
  paymentMethod: 'bKash' | 'Nagad' | 'manual' | 'admin';
  transactionId?: string | null;
  status: SscPaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SscAccessState {
  userId: string;
  fullPackage: boolean;
  chapterSlugs: string[];
  pendingChapterSlugs: string[];
  pendingPackage: boolean;
  updatedAt: string;
}

export interface SscPracticeAnswer {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
  attemptedAt: string;
}

export interface SscChapterProgress {
  chapterSlug: string;
  pdfLastPage: number;
  practiceAnswers: Record<string, SscPracticeAnswer>;
  bookmarkedQuestionIds: string[];
  learnedShortQuestionIds: string[];
  lastActivityAt: string;
}

export interface SscUserProgress {
  userId: string;
  chapters: Record<string, SscChapterProgress>;
  dailyPracticeDates: string[];
  updatedAt: string;
}

export interface SscQuizAttempt {
  id: string;
  userId: string;
  displayName: string;
  chapterSlug: string;
  chapterTitle: string;
  quizTitle: string;
  score: number;
  total: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  timeTakenSeconds: number;
  answers: Record<string, number>;
  submittedAt: string;
  rankSnapshot?: number;
}

