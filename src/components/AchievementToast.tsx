import React, { useState, useEffect } from 'react';
import { Achievement } from '../data/achievements';
import { Trophy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AchievementToast: React.FC = () => {
  const [activeAchievement, setActiveAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    const handleUnlock = (event: Event) => {
      const customEvent = event as CustomEvent<{ id: string; info?: Achievement }>;
      if (customEvent.detail?.info) {
        setActiveAchievement(customEvent.detail.info);
        try {
          confetti({
            particleCount: 50,
            spread: 50,
            origin: { y: 0.8, x: 0.9 },
          });
        } catch (e) {
          // ignore
        }

        const timer = setTimeout(() => {
          setActiveAchievement(null);
        }, 4500);

        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('animedle_achievement_unlocked', handleUnlock);
    return () => window.removeEventListener('animedle_achievement_unlocked', handleUnlock);
  }, []);

  if (!activeAchievement) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className="bg-gradient-to-r from-[#0d1426] to-[#16223b] border-2 border-amber-400/80 rounded-2xl p-4 shadow-2xl flex items-center gap-3.5 max-w-sm backdrop-blur-md">
        <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl flex-shrink-0">
          {activeAchievement.icon || '🏆'}
        </div>
        <div className="text-left min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-amber-400">
            <Sparkles size={11} /> Conquista Desbloqueada!
          </div>
          <h4 className="text-sm font-extrabold text-white truncate">{activeAchievement.title}</h4>
          <p className="text-xs text-slate-300 line-clamp-1">{activeAchievement.description}</p>
        </div>
      </div>
    </div>
  );
};
