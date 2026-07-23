import React, { useState } from 'react';
import { UserProfile } from '../types';
import { AVATAR_OPTIONS } from '../data/phonicsData';
import { saveUserProfile } from '../utils/storage';
import { X, Check, Award, Flame, Star, Zap, Edit2, Sparkles, BookOpen } from 'lucide-react';
import { playFunSound } from '../utils/audio';

interface ProfileModalProps {
  user: UserProfile;
  onClose: () => void;
  onUpdateUser: (updatedUser: UserProfile) => void;
  soundEnabled: boolean;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  user,
  onClose,
  onUpdateUser,
  soundEnabled
}) => {
  const [name, setName] = useState<string>(user.name);
  const [avatar, setAvatar] = useState<string>(user.avatar);
  const [dailyGoal, setDailyGoal] = useState<number>(user.dailyGoalWords || 5);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSave = () => {
    if (soundEnabled) playFunSound('star');
    const updated: UserProfile = {
      ...user,
      name,
      avatar,
      dailyGoalWords: dailyGoal
    };
    saveUserProfile(updated);
    onUpdateUser(updated);
    setIsSaved(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 border-4 border-purple-200 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center space-y-1">
          <div className="text-5xl">{avatar}</div>
          <h3 className="text-2xl font-black text-slate-800">Hồ Sơ Của Bé</h3>
          <p className="text-xs font-medium text-slate-500">Cấp độ Level {user.level} • {user.xp} XP</p>
        </div>

        {/* Edit Name */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">Tên bé hiển thị:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 font-bold text-sm text-slate-800 focus:outline-none focus:border-purple-500"
            placeholder="Nhập tên bé..."
          />
        </div>

        {/* Avatar Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">Chọn Linh Vật Đại Diện:</label>
          <div className="grid grid-cols-4 gap-2.5">
            {AVATAR_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  if (soundEnabled) playFunSound('pop');
                  setAvatar(opt.emoji);
                }}
                className={`p-3 rounded-2xl border-2 text-center text-3xl transition-all cursor-pointer ${
                  avatar === opt.emoji
                    ? 'bg-purple-100 border-purple-500 scale-105 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {opt.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Goal Adjuster */}
        <div className="space-y-2 bg-purple-50 p-4 rounded-2xl border border-purple-100">
          <label className="text-xs font-bold text-purple-900 block">Mục Tiêu Luyện Từ Mỗi Ngày:</label>
          <div className="flex items-center gap-3">
            {[3, 5, 8, 10].map((num) => (
              <button
                key={num}
                onClick={() => {
                  if (soundEnabled) playFunSound('pop');
                  setDailyGoal(num);
                }}
                className={`flex-1 py-2 rounded-xl font-black text-xs transition-all ${
                  dailyGoal === num
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-white text-purple-800 border border-purple-200 hover:bg-purple-100'
                }`}
              >
                {num} từ/ngày
              </button>
            ))}
          </div>
        </div>

        {/* Badge Gallery */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">Danh Hiệu Đạt Được:</label>
          <div className="flex flex-wrap gap-2">
            {user.unlockedBadges && user.unlockedBadges.length > 0 ? (
              user.unlockedBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold border border-amber-300"
                >
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>{badge}</span>
                </span>
              ))
            ) : (
              <p className="text-xs text-slate-400">Hãy hoàn thành bài học đầu tiên để nhận danh hiệu nhé!</p>
            )}
          </div>
        </div>

        {/* Save Action */}
        <button
          onClick={handleSave}
          className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white rounded-2xl font-black text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isSaved ? (
            <>
              <Check className="w-5 h-5" />
              <span>Đã Lưu Thay Đổi!</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Lưu Hồ Sơ</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
