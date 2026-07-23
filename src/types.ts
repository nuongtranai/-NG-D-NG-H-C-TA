export type IPACategory = 
  | 'short_vowels' 
  | 'long_vowels' 
  | 'diphthongs' 
  | 'consonants_voiced' 
  | 'consonants_unvoiced';

export interface SampleWord {
  word: string;
  ipa: string;
  meaning: string;
  emoji: string;
}

export interface IPAItem {
  id: string;
  symbol: string;
  category: IPACategory;
  categoryNameVi: string;
  exampleWord: string;
  wordIPA: string;
  wordMeaning: string;
  emoji: string;
  mouthGuideVi: string;
  lipTipVi: string;
  practiceSentence: string;
  sampleWords: SampleWord[];
  soundKey?: string;
}

export interface PronunciationResult {
  targetWord: string;
  targetIPA: string;
  spokenText: string;
  score: number; // 0 - 100
  stars: number; // 1 - 5
  accuracyGrade: 'Xuất sắc! 🌟' | 'Rất tốt! 🎉' | 'Khá tốt! 👍' | 'Cần cố gắng! 💪';
  feedbackMessageVi: string;
  mouthTipVi: string;
  phonemeBreakdown: {
    part: string;
    ipa: string;
    status: 'correct' | 'improvable' | 'missing';
    commentVi: string;
  }[];
  xpGained: number;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  stars: number;
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  dailyGoalWords: number;
  dailyCompletedWords: number;
  completedSoundIds: string[];
  unlockedBadges: string[];
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  xpToday: number;
  totalStars: number;
  streak: number;
  isCurrentUser?: boolean;
  rankBadge?: string;
}

export interface QuizQuestion {
  id: string;
  type: 'listen_select' | 'sound_match' | 'speak_challenge';
  targetIPA: IPAItem;
  promptVi: string;
  audioText: string;
  options?: {
    id: string;
    label: string;
    emoji?: string;
    ipa?: string;
    isCorrect: boolean;
  }[];
}
