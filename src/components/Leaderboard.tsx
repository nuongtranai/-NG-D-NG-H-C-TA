import React, { useState } from 'react';
import { LeaderboardEntry, UserProfile } from '../types';
import { getCombinedLeaderboard } from '../utils/storage';
import { Trophy, Flame, Star, Zap, Award, Sparkles, ChevronRight } from 'lucide-react';
import { playFunSound } from '../utils/audio';

interface LeaderboardProps {
  user: UserProfile;
  soundEnabled: boolean;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ user, soundEnabled }) => {
  const [activeFilter, setActiveFilter] = useState<'today' | 'stars' | 'streak'>('today');

  const leaderboardData = getCombinedLeaderboard();

  // Sort based on active filter
  const sortedData = [...leaderboardData].sort((a, b) => {
    if (activeFilter === 'today') return b.xpToday - a.xpToday;
    if (activeFilter === 'stars') return b.totalStars - a.totalStars;
    return b.streak - a.streak;
  });

  const top3 = sortedData.slice(0, 3);
  const remaining = sortedData.slice(3);

  const currentUserRankIndex = sortedData.findIndex((item) => item.isCurrentUser);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-bold text-xs">
          <Trophy className="w-3.5 h-3.5 text-amber-600" />
          <span>Bảng Xếp Hạng Tiến Độ Hàng Ngày</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
          Vinh Danh Các Siêu Nhí Phonics!
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Chăm chỉ luyện tập phát âm hàng ngày để thu thập thật nhiều sao và dẫn đầu bảng xếp hạng nhé!
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit mx-auto">
        <button
          onClick={() => {
            if (soundEnabled) playFunSound('pop');
            setActiveFilter('today');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeFilter === 'today'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          ⚡️ Điểm XP Hôm Nay
        </button>
        <button
          onClick={() => {
            if (soundEnabled) playFunSound('pop');
            setActiveFilter('stars');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeFilter === 'stars'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          ⭐️ Tổng Sao Đạt Được
        </button>
        <button
          onClick={() => {
            if (soundEnabled) playFunSound('pop');
            setActiveFilter('streak');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeFilter === 'streak'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          🔥 Chuỗi Chăm Chỉ
        </button>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-3 items-end pt-6 pb-2">
        {/* 2nd Place */}
        {top3[1] && (
          <div className="bg-gradient-to-t from-slate-100 to-white border-2 border-slate-300 rounded-2xl p-4 text-center space-y-2 shadow-sm relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl">🥈</div>
            <div className="text-4xl mt-2">{top3[1].avatar}</div>
            <div className="font-bold text-xs text-slate-800 truncate">{top3[1].name}</div>
            <div className="text-xs font-extrabold text-amber-600">
              {activeFilter === 'today' ? `${top3[1].xpToday} XP` : activeFilter === 'stars' ? `${top3[1].totalStars} ⭐️` : `${top3[1].streak} ngày 🔥`}
            </div>
          </div>
        )}

        {/* 1st Place */}
        {top3[0] && (
          <div className="bg-gradient-to-t from-amber-100 via-amber-50 to-white border-3 border-amber-400 rounded-3xl p-5 text-center space-y-2 shadow-md relative -translate-y-2">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl animate-bounce">👑</div>
            <div className="text-5xl mt-1">{top3[0].avatar}</div>
            <div className="font-black text-sm text-slate-900 truncate">{top3[0].name}</div>
            <div className="text-sm font-black text-amber-600 bg-amber-100 px-3 py-1 rounded-full inline-block">
              {activeFilter === 'today' ? `${top3[0].xpToday} XP` : activeFilter === 'stars' ? `${top3[0].totalStars} ⭐️` : `${top3[0].streak} ngày 🔥`}
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {top3[2] && (
          <div className="bg-gradient-to-t from-orange-50 to-white border-2 border-orange-200 rounded-2xl p-4 text-center space-y-2 shadow-sm relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl">🥉</div>
            <div className="text-4xl mt-2">{top3[2].avatar}</div>
            <div className="font-bold text-xs text-slate-800 truncate">{top3[2].name}</div>
            <div className="text-xs font-extrabold text-orange-600">
              {activeFilter === 'today' ? `${top3[2].xpToday} XP` : activeFilter === 'stars' ? `${top3[2].totalStars} ⭐️` : `${top3[2].streak} ngày 🔥`}
            </div>
          </div>
        )}
      </div>

      {/* User Status Motivation Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-4 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{user.avatar}</div>
          <div>
            <div className="text-xs font-bold text-purple-200">Thứ hạng của bé hôm nay:</div>
            <div className="text-lg font-black">Hạng #{currentUserRankIndex + 1} ({user.xp} XP)</div>
          </div>
        </div>
        <div className="text-xs font-semibold bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/30 hidden sm:block">
          Cố lên! Càng luyện tập vị trí càng cao! 🚀
        </div>
      </div>

      {/* Leaderboard Table List */}
      <div className="bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-sm space-y-2">
        {remaining.map((item, index) => {
          const rank = index + 4;
          return (
            <div
              key={item.id}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-colors ${
                item.isCurrentUser
                  ? 'bg-amber-50 border-amber-300 font-bold'
                  : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 text-center text-xs font-black text-slate-400">
                  #{rank}
                </span>
                <span className="text-2xl">{item.avatar}</span>
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    {item.name} {item.isCurrentUser && <span className="text-amber-600">(Bé)</span>}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    🔥 Chuỗi {item.streak} ngày • ⭐️ {item.totalStars} Sao
                  </div>
                </div>
              </div>

              <div className="text-xs font-black text-purple-700">
                {activeFilter === 'today' ? `${item.xpToday} XP` : activeFilter === 'stars' ? `${item.totalStars} ⭐️` : `${item.streak} Ngày`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
