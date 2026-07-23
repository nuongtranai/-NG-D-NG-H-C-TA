import React from 'react';
import { UserProfile } from '../types';
import { Flame, Star, Zap, Volume2, VolumeX, Sparkles, Trophy, Mic, BookOpen, Gamepad2, User } from 'lucide-react';
import { playFunSound } from '../utils/audio';

interface NavbarProps {
  user: UserProfile;
  activeTab: 'ipa' | 'practice' | 'games' | 'leaderboard' | 'profile';
  setActiveTab: (tab: 'ipa' | 'practice' | 'games' | 'leaderboard' | 'profile') => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled,
  onOpenProfile
}) => {
  const handleTabChange = (tab: 'ipa' | 'practice' | 'games' | 'leaderboard' | 'profile') => {
    if (soundEnabled) playFunSound('pop');
    setActiveTab(tab);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) playFunSound('star');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-4 border-amber-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-2">
        {/* Top bar with logo and stats */}
        <div className="flex items-center justify-between gap-2">
          {/* Logo */}
          <div 
            onClick={() => handleTabChange('ipa')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-pink-500 flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform">
              🗣️
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-black text-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 bg-clip-text text-transparent tracking-wide">
                  Phonics Kids
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-full border border-amber-300">
                  IPA
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
                Học Phát Âm Tiếng Anh Tiểu Học
              </p>
            </div>
          </div>

          {/* Gamification Stats */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Streak */}
            <div className="flex items-center gap-1 px-2.5 py-1 bg-orange-50 border-2 border-orange-200 rounded-2xl shadow-xs">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-400 animate-bounce" />
              <span className="text-xs sm:text-sm font-extrabold text-orange-600">
                {user.streakDays} ngày
              </span>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 border-2 border-amber-200 rounded-2xl shadow-xs">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span className="text-xs sm:text-sm font-extrabold text-amber-700">
                {user.stars}
              </span>
            </div>

            {/* XP */}
            <div className="hidden md:flex items-center gap-1 px-2.5 py-1 bg-purple-50 border-2 border-purple-200 rounded-2xl shadow-xs">
              <Zap className="w-4 h-4 text-purple-600 fill-purple-400" />
              <span className="text-xs sm:text-sm font-extrabold text-purple-700">
                {user.xp} XP
              </span>
            </div>

            {/* Mute/Unmute sound effects */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}
              className="p-2 rounded-2xl bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-700 transition-colors border border-slate-200"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
            </button>

            {/* User Profile Avatar */}
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-1.5 p-1 pl-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl shadow-xs hover:opacity-95 transition-opacity"
            >
              <span className="text-xl leading-none">{user.avatar}</span>
              <span className="text-xs font-bold max-w-[80px] truncate pr-1 hidden sm:inline">
                Lv.{user.level}
              </span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center justify-around sm:justify-center gap-1 sm:gap-3 mt-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => handleTabChange('ipa')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'ipa'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-200 scale-105'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Bảng IPA</span>
          </button>

          <button
            onClick={() => handleTabChange('practice')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'practice'
                ? 'bg-pink-500 text-white shadow-md shadow-pink-200 scale-105'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>Chấm Điểm AI</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping hidden sm:inline-block"></span>
          </button>

          <button
            onClick={() => handleTabChange('games')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'games'
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200 scale-105'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Trò Chơi</span>
          </button>

          <button
            onClick={() => handleTabChange('leaderboard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'leaderboard'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-200 scale-105'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Bảng Xếp Hạng</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
