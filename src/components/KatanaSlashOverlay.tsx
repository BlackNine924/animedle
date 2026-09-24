import React, { useEffect, useState } from 'react';

interface KatanaSlashOverlayProps {
  active: boolean;
  onComplete?: () => void;
}

export const KatanaSlashOverlay: React.FC<KatanaSlashOverlayProps> = ({ active, onComplete }) => {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (active) {
      setAnimating(true);
      const timer = setTimeout(() => {
        setAnimating(false);
        if (onComplete) onComplete();
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [active, onComplete]);

  if (!animating) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
      {/* Background Flash */}
      <div className="absolute inset-0 bg-rose-500/10 animate-pulse transition-opacity duration-300" />

      {/* Main Nichirin Katana Slash Line */}
      <div className="w-[140%] h-2 bg-gradient-to-r from-transparent via-rose-500 via-amber-300 to-transparent shadow-[0_0_25px_#f43f5e] transform -rotate-12 animate-katanaSlash border-y border-white" />

      {/* Secondary Parallel Spark Slash */}
      <div className="w-[120%] h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] transform -rotate-6 animate-katanaSlashSecondary" />

      {/* Center Spark Explosion */}
      <div className="absolute w-32 h-32 rounded-full bg-rose-500/40 blur-xl animate-ping" />
    </div>
  );
};
