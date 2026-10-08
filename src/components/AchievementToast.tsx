import React, { useState, useEffect } from 'react';
import { Achievement } from '../data/achievements';
import { Trophy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AchievementToast: React.FC = () => {
  const [queue, setQueue] = useState<Achievement[]>([]);
  const [current, setCurrent] = useState<Achievement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleUnlock = (event: Event) => {
      const customEvent = event as CustomEvent<{ id: string; info?: Achievement }>;
      if (customEvent.detail?.info) {
        const achievement = customEvent.detail.info;
        setQueue((prev) => {
          if (prev.some((item) => item.id === achievement.id)) return prev;
          return [...prev, achievement];
        });
      }
    };

    window.addEventListener('animedle_achievement_unlocked', handleUnlock);
    return () => window.removeEventListener('animedle_achievement_unlocked', handleUnlock);
  }, []);

  useEffect(() => {
    if (current || queue.length === 0) return;

    const nextAchievement = queue[0];
    setQueue((prev) => prev.slice(1));
    setCurrent(nextAchievement);
    setIsVisible(false);

    // Entrada suave
    const enterTimer = setTimeout(() => {
      setIsVisible(true);
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.15, x: 0.5 },
        });
      } catch (e) {
        // ignore
      }
    }, 50);

    // Inicia saída após 4.5 segundos de exibição
    const startExitTimer = setTimeout(() => {
      setIsVisible(false);
    }, 4500);

    // Aguarda a animação de saída (700ms) terminar completamente antes de permitir a próxima
    const finishExitTimer = setTimeout(() => {
      setCurrent(null);
    }, 5350);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(startExitTimer);
      clearTimeout(finishExitTimer);
    };
  }, [current, queue]);

  if (!current) return null;

  return (
    <div
      style={{
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-8 scale-95'
      }`}
    >
      <div className="bg-gradient-to-r from-[#0d1426] via-[#16223b] to-[#0d1426] border-2 border-amber-400 rounded-3xl p-5 shadow-[0_0_50px_rgba(251,191,36,0.35)] flex items-center gap-4 max-w-md w-[90vw] backdrop-blur-xl">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center p-1.5 flex-shrink-0 shadow-inner overflow-hidden">
          {current.icon && current.icon.startsWith('/') ? (
            <img src={current.icon} alt={current.title} className="w-full h-full object-contain" />
          ) : (
            <span className="text-3xl">{current.icon || '🏆'}</span>
          )}
        </div>
        <div className="text-left min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-amber-400 mb-0.5">
            <Sparkles size={13} className="text-amber-300 animate-pulse" /> Conquista Desbloqueada!
          </div>
          <h4 className="text-base font-black text-white truncate">{current.title}</h4>
          <p className="text-xs text-slate-300 font-medium line-clamp-2 mt-0.5">{current.description}</p>
        </div>
      </div>
    </div>
  );
};
