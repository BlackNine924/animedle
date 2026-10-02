import React, { useState, useEffect } from 'react';
import { Achievement } from '../data/achievements';
import { Trophy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AchievementToast: React.FC = () => {
  const [activeAchievement, setActiveAchievement] = useState<Achievement | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleUnlock = (event: Event) => {
      const customEvent = event as CustomEvent<{ id: string; info?: Achievement }>;
      if (customEvent.detail?.info) {
        setActiveAchievement(customEvent.detail.info);
        setIsClosing(false);
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.5, x: 0.5 },
          });
        } catch (e) {
          // ignore
        }

        const closeTimer = setTimeout(() => {
          setIsClosing(true);
        }, 3500);

        const removeTimer = setTimeout(() => {
          setActiveAchievement(null);
          setIsClosing(false);
        }, 4000);

        return () => {
          clearTimeout(closeTimer);
          clearTimeout(removeTimer);
        };
      }
    };

    window.addEventListener('animedle_achievement_unlocked', handleUnlock);
    return () => window.removeEventListener('animedle_achievement_unlocked', handleUnlock);
  }, []);

  if (!activeAchievement) return null;

  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none transition-all duration-500 ease-out ${
        isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      <div className="bg-gradient-to-r from-[#0d1426] via-[#16223b] to-[#0d1426] border-2 border-amber-400 rounded-3xl p-5 shadow-[0_0_50px_rgba(251,191,36,0.35)] flex items-center gap-4 max-w-md w-[90vw] backdrop-blur-xl">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-3xl flex-shrink-0 shadow-inner">
          {activeAchievement.icon || '🏆'}
        </div>
        <div className="text-left min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-amber-400 mb-0.5">
            <Sparkles size={13} className="text-amber-300 animate-pulse" /> Conquista Desbloqueada!
          </div>
          <h4 className="text-base font-black text-white truncate">{activeAchievement.title}</h4>
          <p className="text-xs text-slate-300 font-medium line-clamp-2 mt-0.5">{activeAchievement.description}</p>
        </div>
      </div>
    </div>
  );
};
