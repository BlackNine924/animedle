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
        // Modo Zoom: recorta e desenha apenas a sub-região focada
        ctx.filter = 'none';
        const scale = Math.max(1, zoomScale);
        const cropW = img.width / scale;
        const cropH = img.height / scale;
        // Ponto focal centralizado na região dos olhos/face (50% X, 36% Y)
        const cropX = Math.max(0, Math.min(img.width - cropW, img.width * 0.5 - cropW * 0.5));
        const cropY = Math.max(0, Math.min(img.height - cropH, img.height * 0.36 - cropH * 0.5));

        ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, size, size);
      }
    };

    img.src = avatarUrl;

    return () => {
      isCancelled = true;
    };
  }, [avatarUrl, mode, blurAmount, zoomScale, isRevealed]);

  return (
    <div
      className={`relative select-none ${className}`}
      onContextMenu={(e) => e.preventDefault()}
      draggable={false}
    >
      <canvas
        ref={canvasRef}
        width={240}
        height={240}
        className="w-full h-full object-cover pointer-events-none rounded-full"
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      />
    </div>
  );
};
