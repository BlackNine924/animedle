import React, { useState } from 'react';
import { Film, Eye, EyeOff } from 'lucide-react';
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

  // Sempre que mudar de desafio (troca de personagem, nova rodada diária ou infinita), reinicia em P&B
  React.useEffect(() => {
    setIsColorEnabled(false);
  }, [challenge.id]);

  const handleToggleColor = () => {
    setIsColorEnabled((prev) => {
      const next = !prev;
      if (next) {
        sessionStorage.setItem(`animedle_scene_color_used_${challenge.id}`, 'true');
      } else {
        sessionStorage.removeItem(`animedle_scene_color_used_${challenge.id}`);
      }
      return next;
    });
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
  // O jogador tem direito a 3 tentativas com a cena 100% nítida antes de perder!
  const isFullyClear = blurPx === 0 && !isWon;
  const attemptsWithClear = Math.max(0, guessCount - 4);
  const remainingChances = Math.max(0, 3 - attemptsWithClear);

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
            Modo Cena & Jutsu
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
            <span>⚠️ 0% de borrão! Restam {remainingChances} de 3 chances com a cena visível antes da derrota!</span>
          </div>
        )}
      </div>

      {/* Janela de Exibição do Vídeo / Cena em Loop */}
      <div className="relative w-full max-w-md mx-auto aspect-video rounded-2xl overflow-hidden border-2 border-[#202b43] bg-black shadow-2xl flex items-center justify-center group select-none">
        <img
          src={challenge.videoUrl}
          alt="Cena do Personagem"
          className="w-full h-full object-cover transition-all duration-500 pointer-events-none"
          style={{
            filter: `blur(${blurPx}px) ${isColorEnabled ? 'grayscale(0%)' : 'grayscale(100%)'}`,
          }}
          onContextMenu={(e) => e.preventDefault()}
          draggable={false}
        />

        {/* Gradiente sutil nas bordas */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-inner border border-white/10" />
      </div>
    </div>
  );
};
