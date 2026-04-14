// ─── Enums ──────────────────────────────────────────────────────────
export type Difficulty       = "beginner" | "intermediate" | "advanced";
export type ExerciseType     = "quiz" | "media_submission" | "video_lesson";
export type SubmissionStatus = "pending" | "in_review" | "approved" | "needs_work";
export type UserRole         = "student" | "mentor" | "admin";
export type BadgeRarity      = "common" | "rare" | "epic" | "legendary" | "ultimate";
export type VideoProvider    = "youtube" | "cloudflare" | "bunny";

// ─── Track ──────────────────────────────────────────────────────────
export interface Track {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  emoji: string;
  iconUrl?: string;
  color: string;
  category: string;
  difficulty: Difficulty;
  totalExercises: number;
  estimatedHours: number;
  tags: string[];
  authorId: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
}

// ─── Exercise ───────────────────────────────────────────────────────
export interface BaseExercise {
  id: string;
  trackId: string;
  trackSlug: string;
  title: string;
  description: string;
  instructions: string;
  order: number;
  xpReward: number;
  difficulty: Difficulty;
  type: ExerciseType;
  createdAt: string;
}

export interface QuizOption   { id: string; text: string; isCorrect: boolean; }
export interface QuizQuestion {
  id: string; text: string;
  type: "single" | "multiple";
  options: QuizOption[];
  explanation?: string;
}
export interface QuizExercise extends BaseExercise {
  type: "quiz";
  questions: QuizQuestion[];
  passingScore: number;
}

export interface MediaSubmissionExercise extends BaseExercise {
  type: "media_submission";
  submissionPrompt: string;
  acceptedTypes: ("video" | "audio" | "image" | "text")[];
  maxFileSizeMb?: number;
}

export interface VideoLessonExercise extends BaseExercise {
  type: "video_lesson";
  videoProvider: VideoProvider;
  videoId: string;           // YouTube ID, Cloudflare stream ID, etc.
  videoDurationMins?: number;
  requiresCompletion: boolean;
}

export type Exercise = QuizExercise | MediaSubmissionExercise | VideoLessonExercise;

// ─── User ────────────────────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  role: UserRole;
  bio?: string;
  location?: string;
  pronouns?: string;
  githubHandle?: string;
  linkedinHandle?: string;
  twitterHandle?: string;
  totalXp: number;
  level: number;
  joinedAt: string;
}

// ─── Progress ────────────────────────────────────────────────────────
export interface UserProgress {
  userId: string;
  trackId: string;
  completedExercises: string[];
  currentExerciseOrder: number;
  totalXpEarned: number;
  startedAt: string;
  completedAt?: string;
  percentComplete: number;
  lastTouched: string;
}

// ─── Badge ───────────────────────────────────────────────────────────
export interface Badge {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconName: string;
  rarity: BadgeRarity;
  numAwardees?: number;
  condition: string;
  xpRequired?: number;
}
export interface UserBadge { userId: string; badgeId: string; earnedAt: string; }

// ─── Testimonial ─────────────────────────────────────────────────────
export interface Testimonial {
  id: string;
  content: string;
  student: { handle: string; avatarUrl: string; };
  mentor:  { handle: string; avatarUrl: string; };
  exercise: { title: string; iconUrl: string; };
  track:    { title: string; iconUrl: string; };
  createdAt: string;
}

// ─── XP / Level helpers ───────────────────────────────────────────────
export const XP_PER_LEVEL = 500;
export const getLevelFromXp     = (xp: number) => Math.floor(xp / XP_PER_LEVEL) + 1;
export const getXpInLevel       = (xp: number) => xp % XP_PER_LEVEL;
export const getXpToNextLevel   = (xp: number) => XP_PER_LEVEL - getXpInLevel(xp);
export const getLevelProgress   = (xp: number) => (getXpInLevel(xp) / XP_PER_LEVEL) * 100;
