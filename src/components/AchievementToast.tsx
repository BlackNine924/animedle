import React, { useState, useEffect } from 'react';
import { Achievement } from '../data/achievements';
import { Trophy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AchievementToast: React.FC = () => {
  const [current, setCurrent] = useState<Achievement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const queueRef = React.useRef<Achievement[]>([]);
  const isDisplayingRef = React.useRef(false);

  useEffect(() => {
    const processQueue = () => {
      if (isDisplayingRef.current || queueRef.current.length === 0) {
        return;
      }

      isDisplayingRef.current = true;
      const next = queueRef.current.shift()!;
      setCurrent(next);
      setIsVisible(false);

      // Frame seguinte: entrada visível
      setTimeout(() => {
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

      // Permanece na tela por 4 segundos
      setTimeout(() => {
        setIsVisible(false); // Inicia animação de saída (duração 700ms)
      }, 4000);

      // Quando a animação de saída termina completamente (4000 + 700 + 150 = 4850ms)
      setTimeout(() => {
        setCurrent(null);
        isDisplayingRef.current = false;
        // Intervalo de 200ms antes de iniciar a próxima conquista da fila
        setTimeout(() => {
          processQueue();
        }, 200);
      }, 4850);
    };

    const handleUnlock = (event: Event) => {
      const customEvent = event as CustomEvent<{ id: string; info?: Achievement }>;
      if (customEvent.detail?.info) {
        const achievement = customEvent.detail.info;
        if (!queueRef.current.some((item) => item.id === achievement.id)) {
          queueRef.current.push(achievement);
          processQueue();
        }
      }
    };

    window.addEventListener('animedle_achievement_unlocked', handleUnlock);
    return () => {
      window.removeEventListener('animedle_achievement_unlocked', handleUnlock);
    };
  }, []);

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
