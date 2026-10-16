import React, { useState, useRef, useEffect } from 'react';
import { Film, Eye, EyeOff, Play, Pause, Maximize, Minimize } from 'lucide-react';
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
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Carregamento via Blob URL em memória para ocultar o nome do arquivo/personagem no Inspecionar Elementos (DevTools)
  const [blobUrl, setBlobUrl] = useState<string>('');

  useEffect(() => {
    let active = true;
    let currentObjectUrl = '';

    fetch(challenge.videoUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.blob();
      })
      .then((blob) => {
        if (!active) return;
        currentObjectUrl = URL.createObjectURL(blob);
        setBlobUrl(currentObjectUrl);
      })
      .catch(() => {
        if (active) setBlobUrl(challenge.videoUrl);
      });

    return () => {
      active = false;
      if (currentObjectUrl) {
        URL.revokeObjectURL(currentObjectUrl);
      }
    };
  }, [challenge.videoUrl]);

  // Sempre que mudar de desafio, reinicia estados
  useEffect(() => {
    setIsColorEnabled(false);
    setIsPaused(false);
  }, [challenge.id]);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
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

  const handleTogglePlay = () => {
    if (!isPaused) {
      // Congela o frame atual desenhando no canvas
      const img = imgRef.current;
      const canvas = canvasRef.current;
      if (img && canvas) {
        canvas.width = img.naturalWidth || img.clientWidth || 480;
        canvas.height = img.naturalHeight || img.clientHeight || 270;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      }
      setIsPaused(true);
    } else {
      setIsPaused(false);
    }
  };

  const handleToggleFullscreen = () => {
    const el = videoContainerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
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
  // A derrota agora acontece no 8º erro, garantindo que todas as 3 dicas sejam lidas com calma!
  const isFullyClear = blurPx === 0 && !isWon;
  const remainingChances = Math.max(0, 8 - guessCount);

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

        {/* Badges de Status do Desfoque e Toggle de Cores */}
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
        </div>

        {/* Alerta de Contagem Regressiva para Derrota quando o borrão zera */}
        {isFullyClear && (
          <div className="mt-3 px-3.5 py-1 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold animate-pulse inline-flex items-center gap-1.5">
            <span>⚠️ 0% de borrão! Restam {remainingChances} {remainingChances === 1 ? 'chance final' : 'chances'} antes da derrota!</span>
          </div>
        )}
      </div>

      {/* Janela de Exibição do Vídeo / Cena em Loop */}
      <div
        ref={videoContainerRef}
        className={`relative w-full max-w-md mx-auto aspect-video rounded-2xl overflow-hidden border-2 border-[#202b43] bg-black shadow-2xl flex items-center justify-center group select-none ${
          isFullscreen ? 'max-w-none w-screen h-screen rounded-none' : ''
        }`}
        data-debug-character={challenge.characterName}
        data-debug-character-id={challenge.characterId}
        data-debug-scene={challenge.techniqueOrSceneName}
      >
        <img
          ref={imgRef}
          src={blobUrl || challenge.videoUrl}
          alt={`Cena: ${challenge.characterName}`}
          data-character-name={challenge.characterName}
          className={`w-full h-full object-cover transition-all duration-500 pointer-events-none ${
            isPaused ? 'invisible' : 'visible'
          }`}
          style={{
            filter: `blur(${blurPx}px) ${isColorEnabled ? 'grayscale(0%)' : 'grayscale(100%)'}`,
          }}
          onContextMenu={(e) => e.preventDefault()}
          draggable={false}
        />

        {/* Canvas de congelamento quando pausado */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${
            isPaused ? 'block' : 'hidden'
          }`}
          style={{
            filter: `blur(${blurPx}px) ${isColorEnabled ? 'grayscale(0%)' : 'grayscale(100%)'}`,
          }}
        />

        {/* Badge quando pausado */}
        {isPaused && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 z-20">
            <Pause size={12} className="fill-amber-300" />
            <span>Pausado</span>
          </div>
        )}

        {/* Controles discretos no canto da cena (Play/Pause e Tela Cheia) */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
          <button
            type="button"
            onClick={handleTogglePlay}
            className="p-2 rounded-xl bg-black/65 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white shadow-xl transition-all active:scale-90"
            title={isPaused ? "Retomar cena (Play)" : "Congelar cena (Pausar)"}
          >
            {isPaused ? <Play size={15} className="fill-white" /> : <Pause size={15} className="fill-white" />}
          </button>
          <button
            type="button"
            onClick={handleToggleFullscreen}
            className="p-2 rounded-xl bg-black/65 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white shadow-xl transition-all active:scale-90"
            title={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
          >
            {isFullscreen ? <Minimize size={15} /> : <Maximize size={15} />}
          </button>
        </div>

        {/* Gradiente sutil nas bordas */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-inner border border-white/10" />
      </div>
    </div>
  );
};

