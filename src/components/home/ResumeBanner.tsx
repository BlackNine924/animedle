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
  const displaySlug = activeSlug || 'jujutsu-kaisen';
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
    <div className="w-full max-w-[960px] mx-auto my-3 sm:my-4 px-4 z-20 relative">
      <div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0c142b] via-[#101a36] to-[#0c142b] p-3 sm:p-3.5 shadow-2xl transition-all duration-300"
        style={{
          border: '1.5px solid #3b82f6',
          boxShadow: '0 8px 30px -4px rgba(0, 0, 0, 0.7), 0 0 20px -2px rgba(59, 130, 246, 0.35)',
        }}
      >
        {/* Glow de fundo */}
        <div
          className="absolute -left-10 -top-10 w-48 h-48 rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ backgroundColor: '#3b82f6' }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Lado Esquerdo: Capa + Textos */}
          <div className="flex items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#070b14] border border-blue-500/40 shadow-lg">
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
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400 mb-0.5">
                {isNewPlayer ? (
                  <>
                    <Sparkles size={13} className="text-sky-400" />
                    <span>Destaque do Dia</span>
                  </>
                ) : (
                  <>
                    <Clock size={13} className="text-sky-400" />
                    <span>Continuar jogando</span>
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

          {/* Lado Direito: Botão Sólido Azul/Índigo */}
          <div className="w-full sm:w-auto flex-shrink-0">
            <button
              onClick={() => onContinue(displaySlug, lastMode)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-black px-6 py-2.5 rounded-xl shadow-lg shadow-blue-600/40 transition-all duration-200 active:scale-95 text-sm"
            >
              <Play size={14} fill="currentColor" />
              <span>{isNewPlayer ? 'Jogar Agora' : 'Continuar'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
