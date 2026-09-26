import React from 'react';
import { Gamepad2, ArrowRight } from 'lucide-react';
import { AnimeConfig } from '../../types/anime';
import { FranchiseEmblem } from '../FranchiseEmblem';

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
      className="group relative flex items-stretch h-[126px] sm:h-[132px] rounded-2xl bg-gradient-to-r from-[#0c1426] to-[#0a0f1d] transition-all duration-300 cursor-pointer overflow-hidden select-none"
      style={{
        border: `1.5px solid ${anime.themeColor}90`,
        boxShadow: `0 6px 20px -3px rgba(0, 0, 0, 0.6), 0 0 14px -2px ${anime.themeColor}28`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = anime.themeColor;
        e.currentTarget.style.boxShadow = `0 12px 30px -4px ${anime.themeColor}55, 0 0 24px -2px ${anime.themeColor}45`;
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${anime.themeColor}90`;
        e.currentTarget.style.boxShadow = `0 6px 20px -3px rgba(0, 0, 0, 0.6), 0 0 14px -2px ${anime.themeColor}28`;
        e.currentTarget.style.transform = 'translateY(0px)';
      }}
    >
      {/* Glow de fundo no hover */}
      <div
        className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: anime.themeColor }}
      />

      {/* Lado Esquerdo: Arte do Personagem com Sangria Total (100% de altura) */}
      <div className="relative w-[36%] sm:w-[38%] min-w-[95px] max-w-[125px] flex-shrink-0 h-full overflow-hidden bg-[#070b14]">
        <img
          src={coverUrl}
          alt={anime.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          onError={(e) => {
            if (anime.logo) {
              e.currentTarget.src = anime.logo;
              e.currentTarget.className = 'w-full h-full object-contain p-2';
            }
          }}
        />
        {/* Gradiente suave na borda direita da imagem para fusão orgânica com o painel de texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0f1d]/90 pointer-events-none" />
      </div>

      {/* Lado Direito: Informações e Ação */}
      <div className="flex-1 min-w-0 p-3 sm:p-3.5 flex flex-col justify-between h-full z-10">
        <div>
          {/* Título e Emblema Oficial da Franquia */}
          <div className="flex items-center gap-2 mb-1">
            <FranchiseEmblem slug={anime.slug} size={18} className="flex-shrink-0" />
            <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight truncate group-hover:text-slate-100">
              {anime.title}
            </h3>
          </div>

          {/* Contador de Modos */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium ml-0.5">
            <Gamepad2 size={12} className="text-slate-500" />
            <span>{modesCount} {modesCount === 1 ? 'modo' : 'modos'}</span>
          </div>
        </div>

        {/* Botão Largo Outline com Cor Temática */}
        <div className="mt-2 w-full">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(anime.slug);
            }}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-black text-white transition-all duration-200 border shadow-sm group-hover:shadow-md active:scale-95"
            style={{
              backgroundColor: `${anime.themeColor}15`,
              borderColor: `${anime.themeColor}95`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${anime.themeColor}40`;
              e.currentTarget.style.borderColor = anime.themeColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = `${anime.themeColor}15`;
              e.currentTarget.style.borderColor = `${anime.themeColor}95`;
            }}
          >
            <span>Jogar</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
