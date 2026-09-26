import React from 'react';
import { Play, Clock, Sparkles } from 'lucide-react';
import { ANIMES_CONFIG } from '../../data/animes/config';

interface ResumeBannerProps {
  onContinue: (slug: string, mode?: string) => void;
}

export const ResumeBanner: React.FC<ResumeBannerProps> = ({ onContinue }) => {
  // 1. Tenta recuperar o último anime e progresso salvo
  const lastSlug = typeof window !== 'undefined' ? localStorage.getItem('animedle_last_anime_slug') : null;
  const lastMode = typeof window !== 'undefined' ? localStorage.getItem('animedle_last_game_mode') || 'classic' : 'classic';

  // Obter data de hoje para checar progresso diário
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  
  let progressGuessesCount = 0;
  let activeSlug = lastSlug && ANIMES_CONFIG[lastSlug] ? lastSlug : null;

  if (activeSlug) {
    try {
      const saved = localStorage.getItem(`animedle_progress_${activeSlug}_${lastMode}_${todayStr}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.guesses)) {
          progressGuessesCount = parsed.guesses.length;
        }
      }
    } catch {
      // Ignora erro de parse
    }
  }

  // Se for novo jogador ou não tiver jogado recentemente, usa o Destaque do Dia (Opção A)
  const isNewPlayer = !activeSlug || progressGuessesCount === 0;
  const displaySlug = activeSlug || 'dragon-ball';
  const displayAnime = ANIMES_CONFIG[displaySlug] || ANIMES_CONFIG['demon-slayer'];

  const modeLabels: Record<string, string> = {
    classic: 'Clássico',
    wanted: 'Procurado',
    quote: 'Citação',
    ability: displaySlug === 'naruto' ? 'Jutsus' : 'Habilidade',
    zoom: 'Zoom',
    endless: 'Treino'
  };

  const currentModeLabel = modeLabels[lastMode] || 'Clássico';
  const coverUrl = `/card-covers/${displaySlug}.png`;

  return (
    <div className="w-full max-w-4xl mx-auto my-4 sm:my-6 px-4">
      <div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d152a] via-[#111c38] to-[#0d152a] border border-[#26375c] p-4 sm:p-5 shadow-2xl transition-all duration-300 hover:border-indigo-500/60"
        style={{
          boxShadow: '0 8px 32px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Glow de fundo */}
        <div
          className="absolute -left-12 -top-12 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: isNewPlayer ? '#6366f1' : displayAnime.themeColor }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Lado Esquerdo: Capa + Textos */}
          <div className="flex items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[#090d18] border border-white/10 shadow-md">
              <img
                src={coverUrl}
                alt={displayAnime.title}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  if (displayAnime.logo) {
                    e.currentTarget.src = displayAnime.logo;
                    e.currentTarget.className = 'w-full h-full object-contain p-2';
                  }
                }}
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 mb-0.5">
                {isNewPlayer ? (
                  <>
                    <Sparkles size={13} className="text-indigo-400" />
                    <span>Destaque do Dia</span>
                  </>
                ) : (
                  <>
                    <Clock size={13} className="text-cyan-400" />
                    <span className="text-cyan-400">Continuar jogando</span>
                  </>
                )}
              </div>

              <h2 className="text-base sm:text-lg font-black text-white tracking-tight truncate">
                {isNewPlayer
                  ? `Experimente hoje: ${displayAnime.title} — ${currentModeLabel}`
                  : `Continuar em ${displayAnime.title} — ${currentModeLabel}`}
              </h2>

              <p className="text-xs text-slate-400 truncate mt-0.5">
                {isNewPlayer
                  ? 'Teste seus conhecimentos no desafio diário de hoje!'
                  : progressGuessesCount > 0
                  ? `Você já fez ${progressGuessesCount} ${progressGuessesCount === 1 ? 'palpite' : 'palpites'}. Que tal continuar?`
                  : 'Sua rodada diária está aguardando você!'}
              </p>
            </div>
          </div>

          {/* Lado Direito: Botão Continuar */}
          <div className="w-full sm:w-auto flex-shrink-0">
            <button
              onClick={() => onContinue(displaySlug, lastMode)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-extrabold px-6 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-200 active:scale-95 text-sm"
            >
              <Play size={15} fill="currentColor" />
              <span>{isNewPlayer ? 'Jogar Agora' : 'Continuar'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
