import React, { useEffect, useRef } from 'react';

interface ObfuscatedMysteryAvatarProps {
  avatarUrl: string;
  mode: 'wanted' | 'zoom';
  blurAmount?: number;
  zoomScale?: number;
  isRevealed: boolean;
  className?: string;
}

export const ObfuscatedMysteryAvatar: React.FC<ObfuscatedMysteryAvatarProps> = ({
  avatarUrl,
  mode,
  blurAmount = 24,
  zoomScale = 3.5,
  isRevealed,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    let isCancelled = false;

    img.onload = () => {
      if (isCancelled || !canvas) return;

      const size = 240;
      canvas.width = size;
      canvas.height = size;

      ctx.clearRect(0, 0, size, size);

      if (isRevealed) {
        // Revelado: desenha 100% nítido
        ctx.filter = 'none';
        ctx.drawImage(img, 0, 0, size, size);
      } else if (mode === 'wanted') {
        // Modo Procurado: aplica desfoque diretamente no buffer do canvas
        ctx.filter = blurAmount > 0 ? `blur(${Math.max(1, blurAmount)}px)` : 'none';
        // Desenha levemente ampliado para evitar bordas transparentes do blur
        const margin = blurAmount > 0 ? blurAmount * 1.5 : 0;
        ctx.drawImage(img, -margin, -margin, size + margin * 2, size + margin * 2);
      } else if (mode === 'zoom') {
        // Modo Zoom: desenha em alta resolução e utiliza interpolação fluida via hardware
        ctx.filter = 'none';
        ctx.drawImage(img, 0, 0, size, size);
      }
    };

    img.src = avatarUrl;

    return () => {
      isCancelled = true;
    };
  }, [avatarUrl, mode, blurAmount, isRevealed]);

  const currentScale = mode === 'zoom' ? (isRevealed ? 1 : Math.max(1, zoomScale)) : 1;

  return (
    <div
      className={`relative select-none overflow-hidden rounded-full ${className}`}
      onContextMenu={(e) => e.preventDefault()}
      draggable={false}
    >
      <canvas
        ref={canvasRef}
        width={240}
        height={240}
        className="w-full h-full object-cover pointer-events-none rounded-full"
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          transform: `scale(${currentScale})`,
          transformOrigin: '50% 36%',
          transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
        }}
      />
    </div>
  );
};
