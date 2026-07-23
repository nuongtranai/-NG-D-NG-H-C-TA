import { UserProfile, LeaderboardEntry } from '../types';
import { MOCK_LEADERBOARD } from '../data/phonicsData';

const USER_STORAGE_KEY = 'phonics_kids_user_profile_v1';

export const INITIAL_USER: UserProfile = {
  id: 'current_kid_user',
  name: 'Bé Học Việc 🌟',
  avatar: '🐼',
  level: 1,
  xp: 120,
  stars: 18,
  streakDays: 3,
  lastActiveDate: new Date().toISOString().slice(0, 10),
  dailyGoalWords: 5,
  dailyCompletedWords: 2,
  completedSoundIds: ['ae', 'p_sound'],
  unlockedBadges: ['Thần Đồng Phát Âm 🌟', 'Chiến Binh 3 Ngày 🔥']
};

export function getUserProfile(): UserProfile {
  try {
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    if (!saved) return INITIAL_USER;
    const parsed: UserProfile = JSON.parse(saved);
    
    // Check daily reset
    const todayStr = new Date().toISOString().slice(0, 10);
    if (parsed.lastActiveDate !== todayStr) {
      // Check if yesterday to maintain streak
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().slice(0, 10);

      if (parsed.lastActiveDate === yesterdayStr) {
        // Maintained streak
      } else {
        // Reset streak if missed days
        parsed.streakDays = 1;
      }
      parsed.lastActiveDate = todayStr;
      parsed.dailyCompletedWords = 0; // Reset daily count
      saveUserProfile(parsed);
    }
    return parsed;
  } catch (e) {
    console.error('Error reading profile from local storage:', e);
    return INITIAL_USER;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving profile to local storage:', e);
  }
}

export function addXPAndStars(xpAmount: number, starAmount: number, soundId?: string): UserProfile {
  const user = getUserProfile();
  user.xp += xpAmount;
  user.stars += starAmount;
  user.dailyCompletedWords += 1;

  if (soundId && !user.completedSoundIds.includes(soundId)) {
    user.completedSoundIds.push(soundId);
  }

  // Level up formula: every 150 XP = 1 Level
  user.level = Math.floor(user.xp / 150) + 1;

  // Check badges
  if (user.dailyCompletedWords >= user.dailyGoalWords && !user.unlockedBadges.includes('Chăm Chỉ Hàng Ngày 🎯')) {
    user.unlockedBadges.push('Chăm Chỉ Hàng Ngày 🎯');
  }
  if (user.stars >= 30 && !user.unlockedBadges.includes('Siêu Sao Phonics ⭐️')) {
    user.unlockedBadges.push('Siêu Sao Phonics ⭐️');
  }
  if (user.completedSoundIds.length >= 10 && !user.unlockedBadges.includes('Bậc Thầy IPA 🎓')) {
    user.unlockedBadges.push('Bậc Thầy IPA 🎓');
  }

  saveUserProfile(user);
  return user;
}

export function getCombinedLeaderboard(): LeaderboardEntry[] {
  const user = getUserProfile();
  const userEntry: LeaderboardEntry = {
    id: user.id,
    name: `${user.name} (Bé)`,
    avatar: user.avatar,
    xpToday: user.xp,
    totalStars: user.stars,
    streak: user.streakDays,
    isCurrentUser: true
  };

  // Merge current user with mock leaderboard and sort by today's XP
  const combined = [...MOCK_LEADERBOARD, userEntry];
  combined.sort((a, b) => b.xpToday - a.xpToday);

  // Assign badges
  return combined.map((entry, index) => ({
    ...entry,
    rankBadge: index === 0 ? '👑 Hạng 1' : index === 1 ? '🥈 Hạng 2' : index === 2 ? '🥉 Hạng 3' : `Top ${index + 1}`
  }));
}
