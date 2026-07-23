import React, { useState } from 'react';
import { IPAItem, IPACategory } from '../types';
import { PHONICS_DATA } from '../data/phonicsData';
import { speakNativeText, playFunSound } from '../utils/audio';
import { Volume2, Sparkles, Mic, HelpCircle, Check, Info, ChevronRight, Play } from 'lucide-react';

interface IPAChartProps {
  onSelectForPractice: (item: IPAItem) => void;
  soundEnabled: boolean;
  completedSoundIds: string[];
}

export const IPAChart: React.FC<IPAChartProps> = ({
  onSelectForPractice,
  soundEnabled,
  completedSoundIds
}) => {
  const [selectedCategory, setSelectedCategory] = useState<IPACategory | 'all'>('all');
  const [selectedItem, setSelectedItem] = useState<IPAItem | null>(PHONICS_DATA[0]);

  const categories: { id: IPACategory | 'all'; label: string; icon: string; bg: string }[] = [
    { id: 'all', label: 'Tất cả IPA', icon: '🌈', bg: 'bg-purple-100 text-purple-800' },
    { id: 'short_vowels', label: 'Nguyên âm ngắn', icon: '🍎', bg: 'bg-rose-100 text-rose-800' },
    { id: 'long_vowels', label: 'Nguyên âm dài', icon: '⭐️', bg: 'bg-amber-100 text-amber-800' },
    { id: 'diphthongs', label: 'Nguyên âm đôi', icon: '🚀', bg: 'bg-sky-100 text-sky-800' },
    { id: 'consonants_unvoiced', label: 'Phụ âm bật hơi', icon: '💨', bg: 'bg-indigo-100 text-indigo-800' },
    { id: 'consonants_voiced', label: 'Phụ âm rung', icon: '🔔', bg: 'bg-emerald-100 text-emerald-800' }
  ];

  const filteredData = selectedCategory === 'all'
    ? PHONICS_DATA
    : PHONICS_DATA.filter(item => item.category === selectedCategory);

  const handleSoundClick = (item: IPAItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedItem(item);
    if (soundEnabled) playFunSound('pop');
    speakNativeText(item.exampleWord);
  };

  const handleWordClick = (word: string) => {
    if (soundEnabled) playFunSound('pop');
    speakNativeText(word);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 text-9xl opacity-20 pointer-events-none select-none">
          🎨
        </div>
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bảng Âm Quốc Tế IPA Cho Tiểu Học</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black leading-tight">
            Khám Phá Các Âm Tiếng Anh Vui Nhộn!
          </h1>
          <p className="text-white/90 text-sm">
            Nhấn vào từng thẻ âm để nghe giọng đọc bản xứ, xem hướng dẫn phát âm và tập đọc cùng AI nào!
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              if (soundEnabled) playFunSound('pop');
              setSelectedCategory(cat.id);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-slate-900 text-white shadow-md scale-105'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-100'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Sound Cards Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          {filteredData.map((item) => {
            const isCompleted = completedSoundIds.includes(item.id);
            const isSelected = selectedItem?.id === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleSoundClick(item)}
                className={`group relative p-4 rounded-3xl border-3 transition-all cursor-pointer bg-white flex flex-col justify-between h-44 shadow-xs hover:shadow-md hover:-translate-y-1 ${
                  isSelected
                    ? 'border-purple-500 ring-4 ring-purple-100 bg-purple-50/30'
                    : 'border-slate-100 hover:border-amber-300'
                }`}
              >
                {/* Header & Status */}
                <div className="flex items-start justify-between">
                  <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {item.categoryNameVi.split(' ')[0]}
                  </span>
                  {isCompleted && (
                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                      ✓
                    </span>
                  )}
                </div>

                {/* IPA Symbol & Emoji */}
                <div className="text-center my-1">
                  <div className="text-3xl font-black text-purple-700 group-hover:scale-110 transition-transform">
                    {item.symbol}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-0.5">
                    {item.exampleWord} {item.emoji}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-purple-600 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-mono text-slate-500">{item.wordIPA}</span>
                  <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <Volume2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Sound Detail & Mouth Guide */}
        {selectedItem && (
          <div className="bg-white rounded-3xl p-6 border-3 border-purple-200 shadow-md space-y-5 h-fit sticky top-24">
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-2xl border border-purple-100">
              <div>
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                  {selectedItem.categoryNameVi}
                </span>
                <h3 className="text-3xl font-black text-slate-800 mt-1">
                  {selectedItem.symbol}
                </h3>
              </div>
              <button
                onClick={(e) => handleSoundClick(selectedItem, e)}
                className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                title="Nghe mẫu phát âm"
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>

            {/* Target Word Example */}
            <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-700 font-bold">Từ mẫu đại diện:</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-2xl">{selectedItem.emoji}</span>
                  <span className="text-xl font-black text-slate-800">{selectedItem.exampleWord}</span>
                  <span className="text-sm font-mono text-slate-500">{selectedItem.wordIPA}</span>
                </div>
                <p className="text-xs text-amber-900 mt-1 font-medium">{selectedItem.wordMeaning}</p>
              </div>
              <button
                onClick={() => handleWordClick(selectedItem.exampleWord)}
                className="p-2.5 rounded-xl bg-amber-200 text-amber-800 hover:bg-amber-300 font-bold text-xs flex items-center gap-1"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Nghe</span>
              </button>
            </div>

            {/* Mouth Guide in Vietnamese */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                <Info className="w-4 h-4 text-purple-600" />
                <span>Hướng dẫn mở miệng & đặt lưỡi:</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                {selectedItem.mouthGuideVi}
              </p>
              <div className="bg-pink-50 p-3 rounded-2xl border border-pink-100 flex items-start gap-2">
                <span className="text-lg">💡</span>
                <p className="text-xs text-pink-900 font-medium leading-relaxed">
                  <strong>Mẹo bờ môi:</strong> {selectedItem.lipTipVi}
                </p>
              </div>
            </div>

            {/* Sample Words List */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700">Từ vựng luyện tập mẫu:</span>
              <div className="grid grid-cols-2 gap-2">
                {selectedItem.sampleWords.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleWordClick(sample.word)}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{sample.emoji}</span>
                      <div>
                        <div className="font-bold text-xs text-slate-800">{sample.word}</div>
                        <div className="text-[10px] font-mono text-slate-500">{sample.ipa}</div>
                      </div>
                    </div>
                    <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Practice Button */}
            <button
              onClick={() => {
                if (soundEnabled) playFunSound('star');
                onSelectForPractice(selectedItem);
              }}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white rounded-2xl font-black text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Mic className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Ghi Âm & Chấm Điểm Từ Này Ngay!</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
