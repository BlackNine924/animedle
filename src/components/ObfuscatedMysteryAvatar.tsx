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
  const currentScaleRef = useRef<number>(zoomScale);
  const animFrameRef = useRef<number | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Função para desenhar no canvas dado um scale e blur específicos
  const drawFrame = (scaleVal: number, blurVal: number) => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 240;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    if (isRevealed) {
      ctx.filter = 'none';
      ctx.drawImage(img, 0, 0, size, size);
    } else if (mode === 'wanted') {
      ctx.filter = blurVal > 0 ? `blur(${Math.max(1, blurVal)}px)` : 'none';
      const margin = blurVal > 0 ? blurVal * 1.5 : 0;
      ctx.drawImage(img, -margin, -margin, size + margin * 2, size + margin * 2);
    } else if (mode === 'zoom') {
      ctx.filter = 'none';
      const s = Math.max(1, scaleVal);
      const cropW = img.width / s;
      const cropH = img.height / s;
      const cropX = Math.max(0, Math.min(img.width - cropW, img.width * 0.5 - cropW * 0.5));
      const cropY = Math.max(0, Math.min(img.height - cropH, img.height * 0.36 - cropH * 0.5));
      ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, size, size);
    }
  };

  // Carregamento da imagem
  useEffect(() => {
    let isCancelled = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      if (isCancelled) return;
      imgRef.current = img;
      drawFrame(currentScaleRef.current, blurAmount);
    };

    img.src = avatarUrl;

    return () => {
      isCancelled = true;
    };
  }, [avatarUrl]);

  // Transição suave de afastamento da câmera (4.2 - Animação contínua e fluida de lente abrindo)
  useEffect(() => {
    const targetScale = isRevealed ? 1 : Math.max(1, zoomScale);

    if (mode === 'zoom' && imgRef.current && imgRef.current.complete) {
      if (Math.abs(currentScaleRef.current - targetScale) > 0.02) {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

        const startScale = currentScaleRef.current;
        const startTime = performance.now();
        const duration = 650; // 650ms de transição fluida cinematográfica

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(1, elapsed / duration);
          // Easing cúbico suave (ease-out)
          const ease = 1 - Math.pow(1 - progress, 3);
          const interpolated = startScale + (targetScale - startScale) * ease;

          currentScaleRef.current = interpolated;
          drawFrame(interpolated, blurAmount);

          if (progress < 1) {
            animFrameRef.current = requestAnimationFrame(animate);
          } else {
            currentScaleRef.current = targetScale;
            drawFrame(targetScale, blurAmount);
          }
        };

        animFrameRef.current = requestAnimationFrame(animate);

        return () => {
          if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
      } else {
        currentScaleRef.current = targetScale;
        drawFrame(targetScale, blurAmount);
      }
    } else {
      currentScaleRef.current = targetScale;
      drawFrame(targetScale, blurAmount);
    }
  }, [zoomScale, blurAmount, mode, isRevealed]);

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
        className="w-full h-full object-cover pointer-events-none rounded-full transition-all duration-300"
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      />
    </div>
  );
};
