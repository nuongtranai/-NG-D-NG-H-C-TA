import React, { useState, useEffect } from 'react';
import { UserProfile, IPAItem } from './types';
import { getUserProfile, addXPAndStars, saveUserProfile } from './utils/storage';
import { Navbar } from './components/Navbar';
import { IPAChart } from './components/IPAChart';
import { SpeechPractice } from './components/SpeechPractice';
import { PhonicsGames } from './components/PhonicsGames';
import { Leaderboard } from './components/Leaderboard';
import { ProfileModal } from './components/ProfileModal';
import { playFunSound } from './utils/audio';

export default function App() {
  const [user, setUser] = useState<UserProfile>(getUserProfile());
  const [activeTab, setActiveTab] = useState<'ipa' | 'practice' | 'games' | 'leaderboard'>('ipa');
  const [selectedPracticeItem, setSelectedPracticeItem] = useState<IPAItem | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSelectForPractice = (item: IPAItem) => {
    setSelectedPracticeItem(item);
    setActiveTab('practice');
  };

  const handleRecordSuccess = (xpGained: number, starsGained: number, soundId: string) => {
    const previousLevel = user.level;
    const updated = addXPAndStars(xpGained, starsGained, soundId);
    setUser(updated);

    if (updated.level > previousLevel) {
      if (soundEnabled) playFunSound('badge');
      showNotification(`🎉 CHÚC MỪNG BÉ LÊN LEVEL ${updated.level}! 🚀`);
    } else {
      showNotification(`🌟 Bé nhận được +${xpGained} XP và +${starsGained} Sao!`);
    }
  };

  const handleGameSuccess = (xpGained: number) => {
    const updated = addXPAndStars(xpGained, 1);
    setUser(updated);
    showNotification(`🎯 Trả lời đúng! +${xpGained} XP!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-purple-200">
      {/* Navbar */}
      <Navbar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {activeTab === 'ipa' && (
          <IPAChart
            onSelectForPractice={handleSelectForPractice}
            soundEnabled={soundEnabled}
            completedSoundIds={user.completedSoundIds || []}
          />
        )}

        {activeTab === 'practice' && (
          <SpeechPractice
            initialItem={selectedPracticeItem}
            onRecordSuccess={handleRecordSuccess}
            soundEnabled={soundEnabled}
          />
        )}

        {activeTab === 'games' && (
          <PhonicsGames
            onGameSuccess={handleGameSuccess}
            soundEnabled={soundEnabled}
          />
        )}

        {activeTab === 'leaderboard' && (
          <Leaderboard
            user={user}
            soundEnabled={soundEnabled}
          />
        )}
      </main>

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-md text-white px-6 py-3 rounded-2xl shadow-xl font-bold text-sm border-2 border-amber-300 animate-bounce flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Profile Modal */}
      {isProfileOpen && (
        <ProfileModal
          user={user}
          onClose={() => setIsProfileOpen(false)}
          onUpdateUser={(updated) => setUser(updated)}
          soundEnabled={soundEnabled}
        />
      )}
    </div>
  );
}
