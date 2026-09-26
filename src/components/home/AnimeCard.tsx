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
      className="group relative flex items-stretch h-[114px] rounded-2xl bg-gradient-to-r from-[#0c1426] to-[#0a0f1d] transition-all duration-200 cursor-pointer overflow-hidden select-none"
      style={{
        border: `1.5px solid ${anime.themeColor}90`,
        boxShadow: `0 4px 18px -2px rgba(0, 0, 0, 0.6), 0 0 12px -2px ${anime.themeColor}28`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = anime.themeColor;
        e.currentTarget.style.boxShadow = `0 8px 26px -3px ${anime.themeColor}55, 0 0 20px -2px ${anime.themeColor}40`;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${anime.themeColor}90`;
        e.currentTarget.style.boxShadow = `0 4px 18px -2px rgba(0, 0, 0, 0.6), 0 0 12px -2px ${anime.themeColor}28`;
        e.currentTarget.style.transform = 'translateY(0px)';
      }}
    >
      {/* Glow de fundo no hover */}
      <div
        className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full blur-2xl opacity-10 group-hover:opacity-25 transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: anime.themeColor }}
      />

      {/* Lado Esquerdo: Arte do Personagem com Sangria Total (100% de altura, 110px de largura) */}
      <div className="relative w-[110px] min-w-[110px] max-w-[110px] flex-shrink-0 h-full overflow-hidden bg-[#070b14]">
        <img
          src={coverUrl}
          alt={anime.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
          loading="lazy"
          onError={(e) => {
            if (anime.logo) {
              e.currentTarget.src = anime.logo;
              e.currentTarget.className = 'w-full h-full object-contain p-2';
            }
          }}
        />
        {/* Gradiente suave na borda direita da imagem para fusão contínua com o painel de texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0f1d]/90 pointer-events-none" />
      </div>

      {/* Lado Direito: Informações e Ação */}
      <div className="flex-1 min-w-0 p-3 flex flex-col justify-between h-full z-10">
        <div>
          {/* Título e Emblema Oficial da Franquia */}
          <div className="flex items-center gap-1.5 mb-0.5 min-w-0">
            <FranchiseEmblem slug={anime.slug} size={16} className="flex-shrink-0" />
            <h3
              className={`font-black text-white tracking-tight truncate group-hover:text-slate-100 ${
                anime.title.length > 15 ? 'text-[11px] sm:text-[11.5px]' : 'text-xs sm:text-[13px]'
              }`}
            >
              {anime.title}
            </h3>
          </div>

          {/* Contador de Modos */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium ml-0.5">
            <Gamepad2 size={12} className="text-slate-500" />
            <span>{modesCount} modos</span>
          </div>
        </div>

        {/* Botão Largo Outline com Cor Temática */}
        <div className="w-full">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(anime.slug);
            }}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-extrabold text-white transition-all duration-200 border shadow-sm active:scale-95"
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
