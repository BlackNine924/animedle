import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AnimeEntry } from '../data/animes/animeRegistry';

interface ComingSoonProps {
  anime: AnimeEntry;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ anime }) => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Wallpaper de fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(/wallpapers/${anime.slug}.png)` }}
      />
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        {/* Logo do anime */}
        <img
          src={`/logos/${anime.slug}.png`}
          alt={anime.name}
          className="h-24 sm:h-32 w-auto object-contain drop-shadow-2xl"
          onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
        />

        {/* Badge */}
        <span className="bg-amber-500 text-black text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-amber-500/30">
          Em Breve
        </span>

        {/* Título */}
        <h1 className="text-4xl sm:text-5xl font-black text-white drop-shadow-lg leading-tight">
          {anime.name}
        </h1>

        {/* Mensagem */}
        <p className="text-slate-300 text-base sm:text-lg max-w-sm leading-relaxed">
          Este anime ainda está sendo preparado. Volte em breve para descobrir seus personagens!
        </p>

        {/* Botão voltar */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mt-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-bold rounded-2xl transition-all duration-200 backdrop-blur-sm active:scale-95"
        >
          <ArrowLeft size={16} />
          Voltar para a Home
        </button>
      </div>
    </div>
  );
};
