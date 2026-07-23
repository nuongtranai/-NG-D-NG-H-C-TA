import React, { useState, useEffect } from 'react';
import { PHONICS_DATA } from '../data/phonicsData';
import { IPAItem } from '../types';
import { speakNativeText, playFunSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, RefreshCw, Trophy, CheckCircle, HelpCircle, Star, Gamepad2, Zap } from 'lucide-react';

interface PhonicsGamesProps {
  onGameSuccess: (xpGained: number) => void;
  soundEnabled: boolean;
}

export const PhonicsGames: React.FC<PhonicsGamesProps> = ({
  onGameSuccess,
  soundEnabled
}) => {
  const [activeGameMode, setActiveGameMode] = useState<'listen_pick' | 'picture_match'>('listen_pick');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [targetItem, setTargetItem] = useState<IPAItem>(PHONICS_DATA[0]);
  const [options, setOptions] = useState<IPAItem[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streakCount, setStreakCount] = useState<number>(0);

  // Generate a random question
  const generateQuestion = () => {
    setSelectedOptionId(null);
    setIsAnswered(false);

    // Pick a random target sound
    const randomIndex = Math.floor(Math.random() * PHONICS_DATA.length);
    const target = PHONICS_DATA[randomIndex];
    setTargetItem(target);

    // Pick 3 other distractor options
    const otherItems = PHONICS_DATA.filter(item => item.id !== target.id);
    const shuffledOthers = [...otherItems].sort(() => 0.5 - Math.random()).slice(0, 3);
    const allOptions = [...shuffledOthers, target].sort(() => 0.5 - Math.random());
    setOptions(allOptions);

    // Auto-play audio if mode is listen_pick
    if (activeGameMode === 'listen_pick') {
      setTimeout(() => {
        speakNativeText(target.exampleWord);
      }, 300);
    }
  };

  useEffect(() => {
    generateQuestion();
  }, [activeGameMode]);

  const handlePlayTargetAudio = () => {
    if (soundEnabled) playFunSound('pop');
    speakNativeText(targetItem.exampleWord);
  };

  const handleSelectOption = (item: IPAItem) => {
    if (isAnswered) return;
    setSelectedOptionId(item.id);
    setIsAnswered(true);

    const isCorrect = item.id === targetItem.id;

    if (isCorrect) {
      if (soundEnabled) playFunSound('correct');
      const gainedXP = 15 + streakCount * 5;
      setScore(prev => prev + 1);
      setStreakCount(prev => prev + 1);
      onGameSuccess(gainedXP);

      if ((streakCount + 1) % 3 === 0) {
        if (soundEnabled) playFunSound('star');
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } else {
      if (soundEnabled) playFunSound('wrong');
      setStreakCount(0);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Title & Mode Switcher */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-bold text-xs">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Góc Trò Chơi Phonics Vui Nhộn</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
          Chơi Game Học Âm Tiếng Anh
        </h2>

        {/* Game Mode Pills */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <button
            onClick={() => {
              if (soundEnabled) playFunSound('pop');
              setActiveGameMode('listen_pick');
            }}
            className={`px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
              activeGameMode === 'listen_pick'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-white text-slate-600 border-2 border-slate-200 hover:bg-slate-50'
            }`}
          >
            🎧 Nghe & Chọn Âm IPA
          </button>
          <button
            onClick={() => {
              if (soundEnabled) playFunSound('pop');
              setActiveGameMode('picture_match');
            }}
            className={`px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
              activeGameMode === 'picture_match'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-600 border-2 border-slate-200 hover:bg-slate-50'
            }`}
          >
            🖼️ Nhìn Hình Chọn Âm
          </button>
        </div>
      </div>

      {/* Game Card */}
      <div className="bg-white rounded-3xl p-6 border-3 border-emerald-200 shadow-md space-y-6 relative overflow-hidden">
        {/* Score & Streak Header */}
        <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-bold text-slate-700">Điểm số: <strong className="text-emerald-600 text-sm">{score}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">
            <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>Chuỗi đúng: {streakCount} 🔥</span>
          </div>
        </div>

        {/* Prompt Card */}
        {activeGameMode === 'listen_pick' ? (
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border-2 border-emerald-200 text-center space-y-4">
            <p className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
              Bấm loa nghe âm thanh mẫu & chọn thẻ âm IPA tương ứng:
            </p>
            <button
              onClick={handlePlayTargetAudio}
              className="w-20 h-20 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg hover:scale-105 transition-transform cursor-pointer"
            >
              <Volume2 className="w-9 h-9" />
            </button>
            <p className="text-xs text-slate-500 font-medium">Bấm vào đây để nghe lại từ mẫu</p>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200 text-center space-y-3">
            <div className="text-6xl animate-bounce">{targetItem.emoji}</div>
            <div>
              <h3 className="text-3xl font-black text-slate-800">{targetItem.exampleWord}</h3>
              <p className="text-xs text-slate-500 font-medium">{targetItem.wordMeaning}</p>
            </div>
            <p className="text-xs font-bold text-indigo-700">
              Chọn biểu tượng âm IPA tương ứng với từ vựng trên:
            </p>
          </div>
        )}

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-4">
          {options.map((item) => {
            const isSelected = selectedOptionId === item.id;
            const isCorrect = item.id === targetItem.id;

            let cardStyle = 'bg-slate-50 border-slate-200 hover:border-emerald-300 text-slate-800';
            if (isAnswered) {
              if (isCorrect) {
                cardStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 ring-4 ring-emerald-200';
              } else if (isSelected && !isCorrect) {
                cardStyle = 'bg-rose-100 border-rose-400 text-rose-900';
              }
            }

            return (
              <button
                key={item.id}
                onClick={() => handleSelectOption(item)}
                disabled={isAnswered}
                className={`p-5 rounded-2xl border-3 text-center transition-all shadow-xs flex flex-col items-center justify-center space-y-1.5 cursor-pointer ${cardStyle}`}
              >
                <span className="text-3xl font-black text-purple-700">{item.symbol}</span>
                <span className="text-xs font-bold text-slate-600">
                  {item.exampleWord} {item.emoji}
                </span>
                <span className="text-[10px] font-mono text-slate-400">{item.wordIPA}</span>
              </button>
            );
          })}
        </div>

        {/* Next Question Footer */}
        {isAnswered && (
          <div className="text-center pt-2 animate-fade-in">
            <button
              onClick={() => {
                if (soundEnabled) playFunSound('pop');
                generateQuestion();
              }}
              className="px-8 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs shadow-md hover:bg-emerald-700 transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Câu Tiếp Theo 🚀</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
