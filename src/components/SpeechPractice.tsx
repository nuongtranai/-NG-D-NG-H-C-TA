import React, { useState, useEffect, useRef } from 'react';
import { IPAItem, PronunciationResult } from '../types';
import { PHONICS_DATA } from '../data/phonicsData';
import { speakNativeText, playFunSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Mic, MicOff, Play, Volume2, Sparkles, RefreshCw, Star, Trophy, CheckCircle, Info, ChevronRight, Zap } from 'lucide-react';

interface SpeechPracticeProps {
  initialItem?: IPAItem | null;
  onRecordSuccess: (xpGained: number, starsGained: number, soundId: string) => void;
  soundEnabled: boolean;
}

export const SpeechPractice: React.FC<SpeechPracticeProps> = ({
  initialItem,
  onRecordSuccess,
  soundEnabled
}) => {
  const [selectedItem, setSelectedItem] = useState<IPAItem>(initialItem || PHONICS_DATA[0]);
  const [targetWordIndex, setTargetWordIndex] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [result, setResult] = useState<PronunciationResult | null>(null);
  const [recordingTime, setRecordingTime] = useState<number>(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  const currentSampleWord = selectedItem.sampleWords[targetWordIndex] || {
    word: selectedItem.exampleWord,
    ipa: selectedItem.wordIPA,
    meaning: selectedItem.wordMeaning,
    emoji: selectedItem.emoji
  };

  useEffect(() => {
    if (initialItem) {
      setSelectedItem(initialItem);
      setTargetWordIndex(0);
      setResult(null);
    }
  }, [initialItem]);

  // Clean up recording timer
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startRecording = async () => {
    setTranscript('');
    setAudioBlob(null);
    setAudioUrl(null);
    setResult(null);
    setRecordingTime(0);

    if (soundEnabled) playFunSound('recording');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Start 5-second auto recording timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 4) {
            stopRecording();
            return 5;
          }
          return prev + 1;
        });
      }, 1000);

      // Setup Web Speech Recognition for live transcript
      const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognitionClass) {
        const recognition = new SpeechRecognitionClass();
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.continuous = false;

        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          const speechTranscript = event.results[current][0].transcript;
          setTranscript(speechTranscript);
        };

        recognition.onerror = (err: any) => {
          console.warn('Speech recognition error:', err);
        };

        recognition.start();
        recognitionRef.current = recognition;
      }
    } catch (err) {
      alert('Vui lòng cho phép ứng dụng truy cập micro để luyện phát âm nhé!');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRecording(false);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore stop error
      }
    }
  };

  // Convert blob to Base64
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        const base64 = dataUrl.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const evaluateSpeech = async () => {
    setIsEvaluating(true);
    if (soundEnabled) playFunSound('pop');

    try {
      let base64Audio = '';
      if (audioBlob) {
        base64Audio = await blobToBase64(audioBlob);
      }

      const response = await fetch('/api/gemini/evaluate-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetWord: currentSampleWord.word,
          targetIPA: currentSampleWord.ipa,
          spokenText: transcript || currentSampleWord.word,
          audioBase64: base64Audio,
          mimeType: 'audio/webm'
        })
      });

      const evaluationData: PronunciationResult = await response.json();
      setResult(evaluationData);

      // Trigger gamification updates
      onRecordSuccess(
        evaluationData.xpGained || 20,
        evaluationData.stars || 4,
        selectedItem.id
      );

      // Celebration effects on score >= 80
      if (evaluationData.score >= 80) {
        if (soundEnabled) playFunSound('success');
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else if (soundEnabled) {
        playFunSound('correct');
      }
    } catch (error) {
      console.error('Error evaluating speech:', error);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handlePlayWord = () => {
    if (soundEnabled) playFunSound('pop');
    speakNativeText(currentSampleWord.word);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100 text-pink-700 rounded-full font-bold text-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Phòng Luyện Giọng & Chấm Điểm AI</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
          Thu Âm Giọng Đọc Của Bé
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Nhấn nút Micro, phát âm chuẩn theo từ bên dưới và cùng xem Cô Giáo AI chấm được bao nhiêu sao nhé!
        </p>
      </div>

      {/* Main Target Card */}
      <div className="bg-white rounded-3xl p-6 border-3 border-pink-200 shadow-md space-y-6 relative overflow-hidden">
        {/* Phoneme selector tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PHONICS_DATA.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (soundEnabled) playFunSound('pop');
                setSelectedItem(item);
                setTargetWordIndex(0);
                setResult(null);
                setTranscript('');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
                selectedItem.id === item.id
                  ? 'bg-pink-500 text-white shadow-xs scale-105'
                  : 'bg-slate-100 hover:bg-pink-50 text-slate-600'
              }`}
            >
              {item.symbol} {item.exampleWord}
            </button>
          ))}
        </div>

        {/* Selected Target Word Card */}
        <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 rounded-2xl p-6 border-2 border-amber-200 text-center space-y-3 relative">
          <div className="text-6xl animate-bounce">{currentSampleWord.emoji}</div>
          <div className="space-y-1">
            <h3 className="text-4xl font-black text-slate-800 tracking-wide">
              {currentSampleWord.word}
            </h3>
            <div className="text-xl font-mono text-pink-600 font-bold">
              {currentSampleWord.ipa}
            </div>
            <p className="text-sm font-semibold text-slate-600">
              {currentSampleWord.meaning}
            </p>
          </div>

          {/* Listen Native Speaker Button */}
          <button
            onClick={handlePlayWord}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-sm shadow-md transition-all transform hover:scale-105 cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>Nghe Giọng Mẫu Chuẩn</span>
          </button>

          {/* Sample Words Switcher */}
          {selectedItem.sampleWords.length > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <span className="text-xs font-bold text-slate-500">Đổi từ khác:</span>
              {selectedItem.sampleWords.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (soundEnabled) playFunSound('pop');
                    setTargetWordIndex(idx);
                    setResult(null);
                    setTranscript('');
                  }}
                  className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center border ${
                    targetWordIndex === idx
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mouth positioning quick guide */}
        <div className="bg-indigo-50/80 rounded-2xl p-4 border border-indigo-100 flex items-start gap-3">
          <span className="text-2xl">👄</span>
          <div className="text-xs leading-relaxed space-y-0.5">
            <span className="font-bold text-indigo-900 block">Hướng dẫn khẩu hình mở miệng:</span>
            <p className="text-indigo-800">{selectedItem.mouthGuideVi}</p>
          </div>
        </div>

        {/* Recording Section */}
        <div className="text-center space-y-4 pt-2">
          {/* Recording Status & Wave */}
          {isRecording ? (
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-100 text-rose-700 rounded-full font-bold text-xs animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                <span>Đang ghi âm... ({recordingTime}/5s)</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 h-12">
                <span className="w-2 bg-rose-500 rounded-full animate-bounce h-6"></span>
                <span className="w-2 bg-pink-500 rounded-full animate-bounce h-10 delay-75"></span>
                <span className="w-2 bg-amber-500 rounded-full animate-bounce h-8 delay-150"></span>
                <span className="w-2 bg-purple-500 rounded-full animate-bounce h-12 delay-100"></span>
                <span className="w-2 bg-rose-500 rounded-full animate-bounce h-7"></span>
              </div>
            </div>
          ) : (
            <p className="text-xs font-semibold text-slate-500">
              {audioBlob ? 'Bé đã thu âm xong! Bấm "Chấm Điểm AI" để nhận kết quả nhé.' : 'Bấm nút Micro màu hồng bên dưới để bắt đầu:'}
            </p>
          )}

          {/* Record Button */}
          <div className="flex items-center justify-center gap-4">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all group cursor-pointer border-4 border-white"
                title="Bắt đầu ghi âm"
              >
                <Mic className="w-9 h-9 group-hover:scale-110 transition-transform" />
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="w-20 h-20 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-lg hover:bg-slate-900 transition-all cursor-pointer border-4 border-white animate-pulse"
                title="Dừng ghi âm"
              >
                <MicOff className="w-9 h-9 text-rose-400" />
              </button>
            )}
          </div>

          {/* Audio Replay & Evaluation Trigger */}
          {audioUrl && !isRecording && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-center gap-3">
                <audio src={audioUrl} controls className="h-10 rounded-2xl shadow-xs" />
                <button
                  onClick={startRecording}
                  className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs flex items-center gap-1"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Thu lại</span>
                </button>
              </div>

              {/* Live Transcript badge if available */}
              {transcript && (
                <div className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-xl text-xs font-medium">
                  Nhận dạng giọng nói: &quot;<strong className="text-purple-700">{transcript}</strong>&quot;
                </div>
              )}

              {/* Evaluate Button */}
              <div>
                <button
                  onClick={evaluateSpeech}
                  disabled={isEvaluating}
                  className="px-8 py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white rounded-2xl font-black text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer disabled:opacity-50"
                >
                  {isEvaluating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Cô Giáo AI Đang Chấm Điểm...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Chấm Điểm Phát Âm Ngay 🚀</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Evaluation Results Card */}
      {result && (
        <div className="bg-white rounded-3xl p-6 border-3 border-amber-300 shadow-xl space-y-6 animate-fade-in">
          {/* Header Score & Stars */}
          <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 rounded-2xl p-6 text-white text-center space-y-2 relative overflow-hidden">
            <div className="text-xs font-extrabold uppercase tracking-widest text-amber-100">
              {result.accuracyGrade}
            </div>

            {/* Score Number */}
            <div className="text-6xl font-black tracking-tight drop-shadow-sm">
              {result.score} <span className="text-2xl font-normal opacity-80">/ 100</span>
            </div>

            {/* Stars Rating */}
            <div className="flex items-center justify-center gap-1.5 pt-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-7 h-7 ${
                    s <= result.stars
                      ? 'text-amber-200 fill-amber-200 animate-bounce'
                      : 'text-white/30 fill-white/20'
                  }`}
                />
              ))}
            </div>

            {/* XP Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white mt-2">
              <Zap className="w-4 h-4 text-amber-200 fill-amber-200" />
              <span>+{result.xpGained} XP Tiếng Anh</span>
            </div>
          </div>

          {/* AI Teacher Feedback */}
          <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 space-y-2">
            <div className="flex items-center gap-2 font-bold text-purple-900 text-sm">
              <span>👩‍🏫 Cô Giáo AI Nhận Xét:</span>
            </div>
            <p className="text-sm font-semibold text-purple-800 leading-relaxed">
              &quot;{result.feedbackMessageVi}&quot;
            </p>
          </div>

          {/* Mouth Position Tip */}
          {result.mouthTipVi && (
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div className="space-y-0.5 text-xs text-amber-900">
                <span className="font-bold block">Mẹo nhỏ cải thiện khẩu hình:</span>
                <p>{result.mouthTipVi}</p>
              </div>
            </div>
          )}

          {/* Phoneme Breakdown */}
          {result.phonemeBreakdown && result.phonemeBreakdown.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 block">
                Phân tích chi tiết âm tiết:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.phonemeBreakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${
                      item.status === 'correct'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm bg-white px-2 py-0.5 rounded-lg shadow-2xs">
                        {item.part} ({item.ipa})
                      </span>
                      <span>{item.commentVi}</span>
                    </div>
                    <span>{item.status === 'correct' ? '✅' : '💪'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Word Action */}
          <div className="pt-2 text-center">
            <button
              onClick={() => {
                if (soundEnabled) playFunSound('star');
                // Cycle to next sample word or next sound
                if (targetWordIndex < selectedItem.sampleWords.length - 1) {
                  setTargetWordIndex(targetWordIndex + 1);
                } else {
                  // Next sound
                  const currentIndex = PHONICS_DATA.findIndex(p => p.id === selectedItem.id);
                  const nextItem = PHONICS_DATA[(currentIndex + 1) % PHONICS_DATA.length];
                  setSelectedItem(nextItem);
                  setTargetWordIndex(0);
                }
                setResult(null);
                setAudioUrl(null);
                setAudioBlob(null);
                setTranscript('');
              }}
              className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-xs shadow-md hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
            >
              <span>Thử Từ Tiếp Theo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
