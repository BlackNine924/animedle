import React, { useState, useRef, useEffect } from 'react';
import { Film, Eye, EyeOff, Play, Pause, Maximize2, Minimize2 } from 'lucide-react';
import { SceneChallenge } from '../types/anime';

interface ScenePlayerCardProps {
  challenge: SceneChallenge;
  guessCount: number;
  isWon: boolean;
  themeColor: string;
}

export const ScenePlayerCard: React.FC<ScenePlayerCardProps> = ({
  challenge,
  guessCount,
  isWon,
  themeColor,
}) => {
  // Toggle de cor: por padrão inicia em Preto e Branco (grayscale)
  const [isColorEnabled, setIsColorEnabled] = useState<boolean>(false);

  // Play / Pausa, Velocidade (0.5x / 1x - M3) e Tela Cheia (Categoria 5.1)
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isSlowMo, setIsSlowMo] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [useFallbackImg, setUseFallbackImg] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isPausedRef = useRef<boolean>(false);
  const isSlowMoRef = useRef<boolean>(false);
  const frameIndexRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);
  const decoderRef = useRef<any>(null);

  // Carregamento via Blob URL (fallback caso ImageDecoder não esteja disponível)
  const [blobUrl, setBlobUrl] = useState<string>('');

  // Sincroniza refs de pausa e câmera lenta com os estados
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    isSlowMoRef.current = isSlowMo;
  }, [isSlowMo]);

  // Sempre que mudar de desafio, reinicia estados de pausa, velocidade, cor e frame
  useEffect(() => {
    setIsColorEnabled(false);
    setIsPaused(false);
    setIsSlowMo(false);
    isPausedRef.current = false;
    isSlowMoRef.current = false;
    frameIndexRef.current = 0;
  }, [challenge.id]);

  // Decodificação frame a frame via ImageDecoder para pausar exatamente no frame atual sem voltar ao início
  useEffect(() => {
    let active = true;
    let currentObjectUrl = '';

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (decoderRef.current) {
      try {
        decoderRef.current.close();
      } catch {}
      decoderRef.current = null;
    }

    frameIndexRef.current = 0;

    const renderLoop = async () => {
      if (!active || isPausedRef.current || !decoderRef.current) return;
      const decoder = decoderRef.current;
      try {
        const track = decoder.tracks.selectedTrack;
        const frameCount = track?.frameCount || 1;
        const currentIdx = frameIndexRef.current % Math.max(1, frameCount);

        const result = await decoder.decode({ frameIndex: currentIdx });
        if (!active) {
          result.image.close();
          return;
        }

        const canvas = canvasRef.current;
        if (canvas) {
          const w = result.image.displayWidth || result.image.codedWidth || 640;
          const h = result.image.displayHeight || result.image.codedHeight || 360;
          if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
          }
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(result.image, 0, 0, w, h);
          }
        }

        // Duração em microssegundos no WebCodecs ImageDecoder -> converte para ms (M3: dobra duração em 0.5x)
        const baseDurationMs = result.image.duration ? Math.max(16, result.image.duration / 1000) : 42;
        const durationMs = isSlowMoRef.current ? baseDurationMs * 2.2 : baseDurationMs;
        result.image.close();

        if (!active || isPausedRef.current) return;

        frameIndexRef.current = (currentIdx + 1) % Math.max(1, frameCount);
        timerRef.current = window.setTimeout(renderLoop, durationMs);
      } catch {
        // Se atingir o fim do stream antes de saber o frameCount, reinicia no frame 0
        if (active && !isPausedRef.current && frameIndexRef.current > 0) {
          frameIndexRef.current = 0;
          timerRef.current = window.setTimeout(renderLoop, 40);
        }
      }
    };

    (containerRef.current as any)?. setAttribute?.('data-ready', 'true');
    (window as any).__resumeSceneLoop = renderLoop;

    fetch(challenge.videoUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.arrayBuffer();
      })
      .then(async (buffer) => {
        if (!active) return;

        if ('ImageDecoder' in window) {
          try {
            const ImageDecoderClass = (window as any).ImageDecoder;
            const decoder = new ImageDecoderClass({
              data: buffer,
              type: 'image/webp',
            });
            await decoder.tracks.ready;
            if (!active) {
              decoder.close();
              return;
            }
            decoderRef.current = decoder;
            setUseFallbackImg(false);
            renderLoop();
            return;
          } catch {
            // Fallback para img se ImageDecoder falhar
          }
        }

        const blob = new Blob([buffer], { type: 'image/webp' });
        currentObjectUrl = URL.createObjectURL(blob);
        setBlobUrl(currentObjectUrl);
        setUseFallbackImg(true);
      })
      .catch(() => {
        if (active) {
          setBlobUrl(challenge.videoUrl);
          setUseFallbackImg(true);
        }
      });

    return () => {
      active = false;
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (decoderRef.current) {
        try {
          decoderRef.current.close();
        } catch {}
        decoderRef.current = null;
      }
      if (currentObjectUrl) {
        URL.revokeObjectURL(currentObjectUrl);
      }
    };
  }, [challenge.videoUrl]);

  // Sincroniza estado de tela cheia do navegador
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleToggleColor = () => {
    setIsColorEnabled((prev) => {
      const next = !prev;
      if (next) {
        sessionStorage.setItem(`animedle_scene_color_used_${challenge.id}`, 'true');
      }
      return next;
    });
  };

  // 5.1 - Controle de Pausar e Retomar a animação exatamente no frame atual
  const handleTogglePause = () => {
    if (isPaused) {
      isPausedRef.current = false;
      setIsPaused(false);
      const resumeFn = (window as any).__resumeSceneLoop;
      if (typeof resumeFn === 'function') {
        resumeFn();
      }
    } else {
      isPausedRef.current = true;
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setIsPaused(true);
    }
  };

  // 5.1 - Controle de Tela Cheia
  const handleToggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => {});
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  // Desfoque progressivo baseado no número de palpites errados:
  // 0 erros -> 100% blur (16px)
  // 1 erro  -> 75% blur (12px)
  // 2 erros -> 50% blur (8px)
  // 3 erros -> 25% blur (4px)
  // 4+ erros -> 0% blur (0px / nítido)
  const blurSteps = [16, 12, 8, 4, 0];
  const blurPx = isWon ? 0 : blurSteps[Math.min(guessCount, blurSteps.length - 1)];
  const blurPercentage = isWon ? 0 : Math.max(0, 100 - guessCount * 25);

  // A partir de 4 erros, o desfoque é 0px (100% nítido).
  // Com o rebalanceamento de dicas (Dica 1 no 2º erro, Dica 2 no 4º erro, Dica 3 no 6º erro e derrota no 8º erro),
  // o jogador possui 4 chances com a cena 100% visível antes da derrota!
  const isFullyClear = blurPx === 0 && !isWon;
  const attemptsWithClear = Math.max(0, guessCount - 4);
  const remainingChances = Math.max(0, 4 - attemptsWithClear);

  return (
    <div className="w-full max-w-xl mx-auto my-6 p-6 bg-[#0a1020]/90 backdrop-blur-md border border-[#202b43] rounded-3xl shadow-2xl relative overflow-hidden">
      {/* Brilho decorativo no fundo */}
      <div
        className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: themeColor }}
      />

      {/* Cabeçalho do Card */}
      <div className="flex flex-col items-center justify-center text-center mb-5 relative">
        <div className="flex items-center justify-center gap-2 mb-1">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-md shrink-0"
            style={{ backgroundColor: themeColor }}
          >
            <Film size={18} />
          </div>
          <span className="text-sm uppercase font-black tracking-wider text-white">
            Modo Cena
          </span>
        </div>
        <p className="text-xs text-slate-400 font-medium max-w-md mx-auto">
          Identifique o personagem pela coreografia e execução da cena em loop
        </p>

        {/* Badges de Status do Desfoque, Toggle de Cores e Velocidade 0.5x/1x (M3) */}
        <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
          <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-300">
            {isWon ? 'Cena Revelada (100% Nítida)' : `Borrão: ${blurPercentage}%`}
          </span>

          <button
            onClick={handleToggleColor}
            className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full border transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${
              isColorEnabled
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Alternar entre visualização P&B ou Colorida"
          >
            {isColorEnabled ? <Eye size={12} /> : <EyeOff size={12} />}
            <span>{isColorEnabled ? 'Cores: Ativadas' : 'Preto & Branco (Padrão)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsSlowMo((s) => !s)}
            className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border transition-all flex items-center gap-1 shadow-sm active:scale-95 ${
              isSlowMo
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 hover:bg-purple-500/30'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Alternar câmera lenta (0.5x) ou velocidade normal (1x)"
          >
            <span>{isSlowMo ? '🐢 Câmera Lenta: 0.5x' : '⚡ Velocidade: 1x'}</span>
          </button>
        </div>

        {/* Alerta de Contagem Regressiva para Derrota quando o borrão zera */}
        {isFullyClear && (
          <div className="mt-3 px-3.5 py-1 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold animate-pulse inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(244,63,94,0.25)]">
            <span>🚨 0% de borrão! Restam {remainingChances} de 4 chances com a cena visível antes da derrota!</span>
          </div>
        )}
      </div>

      {/* Janela de Exibição do Vídeo / Cena em Loop com Controles Modernos */}
      <div
        ref={containerRef}
        className={`relative w-full max-w-md mx-auto aspect-video rounded-2xl overflow-hidden border-2 border-[#202b43] bg-black shadow-2xl flex items-center justify-center group select-none ${
          isFullscreen ? '!max-w-none !w-screen !h-screen !rounded-none !border-none' : ''
        }`}
        data-debug-character={challenge.characterName}
        data-debug-character-id={challenge.characterId}
        data-debug-scene={challenge.techniqueOrSceneName}
      >
        {/* Renderização em Canvas Frame-a-Frame (permite pausar exatamente no frame atual!) */}
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-cover transition-all duration-500 pointer-events-none ${
            useFallbackImg ? 'hidden' : 'block'
          }`}
          style={{
            filter: `blur(${blurPx}px) ${isColorEnabled ? 'grayscale(0%)' : 'grayscale(100%)'}`,
          }}
          onContextMenu={(e) => e.preventDefault()}
        />

        {/* Fallback em img apenas para navegadores sem suporte a ImageDecoder */}
        {useFallbackImg && (
          <img
            src={blobUrl || challenge.videoUrl}
            alt={`Cena: ${challenge.characterName}`}
            data-character-name={challenge.characterName}
            className="w-full h-full object-cover transition-all duration-500 pointer-events-none"
            style={{
              filter: `blur(${blurPx}px) ${isColorEnabled ? 'grayscale(0%)' : 'grayscale(100%)'}`,
            }}
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
          />
        )}

        {/* Badge discreto de "Pausado" ou "0.5x" no canto superior esquerdo */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-20">
          {isPaused && (
            <div className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 animate-fadeIn">
              <Pause size={12} className="text-amber-400" />
              <span>Pausado</span>
            </div>
          )}
          {isSlowMo && !isPaused && (
            <div className="px-2.5 py-1 rounded-lg bg-purple-950/80 backdrop-blur-md border border-purple-400/40 text-purple-200 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 animate-fadeIn">
              <span>🐢 0.5x</span>
            </div>
          )}
        </div>

        {/* 5.1 & M3 - Controles Modernos de Velocidade (0.5x/1x), Pausa e Tela Cheia sobrepostos na cena */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
          <button
            type="button"
            onClick={() => setIsSlowMo((s) => !s)}
            className={`px-2.5 py-2 rounded-xl backdrop-blur-md text-[11px] font-black border transition-all shadow-lg active:scale-90 flex items-center justify-center ${
              isSlowMo
                ? 'bg-purple-600/85 hover:bg-purple-500 text-white border-purple-300/50'
                : 'bg-black/60 hover:bg-black/85 text-white border-white/20'
            }`}
            title={isSlowMo ? 'Voltar para velocidade normal (1x)' : 'Ativar câmera lenta (0.5x)'}
          >
            <span>{isSlowMo ? '0.5x' : '1x'}</span>
          </button>

          <button
            type="button"
            onClick={handleTogglePause}
            className="p-2 rounded-xl bg-black/60 hover:bg-black/85 backdrop-blur-md text-white border border-white/20 transition-all shadow-lg active:scale-90 flex items-center justify-center"
            title={isPaused ? 'Retomar reprodução' : 'Pausar cena em frame específico'}
          >
            {isPaused ? <Play size={16} className="text-emerald-400 fill-emerald-400" /> : <Pause size={16} />}
          </button>

          <button
            type="button"
            onClick={handleToggleFullscreen}
            className="p-2 rounded-xl bg-black/60 hover:bg-black/85 backdrop-blur-md text-white border border-white/20 transition-all shadow-lg active:scale-90 flex items-center justify-center"
            title={isFullscreen ? 'Sair da tela cheia' : 'Visualizar em tela cheia'}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>

        {/* Gradiente sutil nas bordas */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-inner border border-white/10" />
      </div>
    </div>
  );
};
