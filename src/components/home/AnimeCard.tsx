import React from 'react';
import { Gamepad2, ArrowRight } from 'lucide-react';
import { AnimeConfig } from '../../types/anime';

interface AnimeCardProps {
  anime: AnimeConfig;
  onSelect: (slug: string) => void;
  modesCount: number;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onSelect, modesCount }) => {
  const coverUrl = `/card-covers/${anime.slug}.png`;

  return (
    <div
      onClick={() => onSelect(anime.slug)}
      className="group relative flex items-center gap-3.5 p-3 sm:p-3.5 rounded-2xl bg-[#0d1527]/80 hover:bg-[#111c34] border border-[#202b43] transition-all duration-300 shadow-lg cursor-pointer overflow-hidden select-none hover:-translate-y-0.5 hover:shadow-2xl"
      style={{
        boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${anime.themeColor}90`;
        e.currentTarget.style.boxShadow = `0 10px 28px -4px ${anime.themeColor}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#202b43';
        e.currentTarget.style.boxShadow = '0 4px 20px -2px rgba(0, 0, 0, 0.4)';
      }}
    >
      {/* Glow sutil no fundo ao passar o mouse */}
      <div
        className="absolute -right-8 -top-8 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: anime.themeColor }}
      />

      {/* Avatar do Personagem (Esquerda) */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#090d18] border border-white/10 shadow-inner group-hover:scale-105 transition-transform duration-300">
        <img
          src={coverUrl}
          alt={anime.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            // Fallback caso imagem não exista
            if (anime.logo) {
              e.currentTarget.src = anime.logo;
              e.currentTarget.className = 'w-full h-full object-contain p-2';
            }
          }}
        />
        <div
          className="absolute inset-0 border-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ borderColor: `${anime.themeColor}60` }}
        />
      </div>

      {/* Detalhes do Anime (Direita) */}
      <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {anime.logo ? (
              <img src={anime.logo} alt="" className="w-4 h-4 object-contain flex-shrink-0" />
            ) : (
              <span className="text-sm flex-shrink-0">{anime.banner}</span>
            )}
            <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight truncate group-hover:text-slate-100">
              {anime.title}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <Gamepad2 size={13} className="text-slate-500" />
            <span>{modesCount} {modesCount === 1 ? 'modo' : 'modos'}</span>
          </div>
        </div>

        {/* Botão Jogar */}
        <div className="mt-2.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(anime.slug);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all duration-200 border"
            style={{
              backgroundColor: `${anime.themeColor}18`,
              borderColor: `${anime.themeColor}70`,
              color: '#ffffff',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${anime.themeColor}40`;
              e.currentTarget.style.borderColor = anime.themeColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = `${anime.themeColor}18`;
              e.currentTarget.style.borderColor = `${anime.themeColor}70`;
            }}
          >
            <span>Jogar</span>
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
