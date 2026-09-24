import React, { useMemo } from 'react';

export const WisteriaParticles: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 10 + 6,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.5 + 0.25,
      type: i % 3 === 0 ? 'ember' : 'petal',
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full animate-floatParticle ${
            p.type === 'ember'
              ? 'bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.8)]'
              : 'bg-purple-300/60 shadow-[0_0_6px_rgba(216,180,254,0.6)] rotate-45 rounded-tl-none'
          }`}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * (p.type === 'petal' ? 1.4 : 1)}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            top: '-5%',
          }}
        />
      ))}
    </div>
  );
};
