import React, { useState, useMemo } from 'react';
import { Search, Check, Layers, Sparkles, Clock, Heart, Gamepad2 } from 'lucide-react';
import { ANIMES_CONFIG } from '../../data/animes/config';
import { AnimeConfig } from '../../types/anime';
import { AnimeCard } from './AnimeCard';
import { ResumeBanner } from './ResumeBanner';

interface HomePageProps {
  onSelectAnime: (slug: string, mode?: string) => void;
}

type FilterType = 'all' | 'available' | 'collections';

export const HomePage: React.FC<HomePageProps> = ({ onSelectAnime }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Slugs dos animes 100% disponíveis com modos de jogo ativos
  const availableSlugs = [
    'demon-slayer',
    'jujutsu-kaisen',
    'one-piece',
    'naruto',
    'solo-leveling',
    'blue-lock',
    'record-of-ragnarok',
    'bleach',
    'dragon-ball',
  ];

  // Cálculo dinâmico de modos por anime
  const getModesCount = (slug: string): number => {
    if (slug === 'solo-leveling' || slug === 'blue-lock') {
      return 4; // Clássico, Procurado, Zoom, Treino
    }
    return 6; // Clássico, Procurado, Citação, Habilidade/Jutsu, Zoom, Treino
  };

  // Separação entre animes disponíveis e em breve
  const allAnimesList = useMemo(() => Object.values(ANIMES_CONFIG), []);

  const availableAnimes = useMemo(() => {
    return availableSlugs
      .map((slug) => ANIMES_CONFIG[slug])
      .filter((anime): anime is AnimeConfig => Boolean(anime))
      .filter((anime) =>
        anime.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm]);

  const upcomingAnimes = useMemo(() => {
    return allAnimesList
      .filter(
        (anime) =>
          !availableSlugs.includes(anime.slug) &&
          anime.slug !== 'romance' // Romance fica na seção exclusiva de Coleções
      )
      .filter((anime) =>
        anime.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [allAnimesList, searchTerm]);

  const showAvailable = activeFilter === 'all' || activeFilter === 'available';
  const showCollections = activeFilter === 'all' || activeFilter === 'collections';
  const showUpcoming = activeFilter === 'all';

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 pb-16 relative overflow-hidden">
      {/* Luz ambiente superior sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-indigo-900/15 via-blue-900/5 to-transparent blur-3xl pointer-events-none" />

      <main className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto pt-6 sm:pt-8">
        
        {/* ========================================================= */}
        {/* HERO SECTION COM TÍTULOS E SILHUETAS LATERAIS             */}
        {/* ========================================================= */}
        <section className="relative my-6 sm:my-10 text-center select-none">
          {/* Silhueta Gojo & Frase (Desktop apenas) */}
          <div className="hidden xl:flex flex-col items-start absolute left-4 top-1/2 -translate-y-1/2 max-w-[240px] text-left opacity-75">
            <span className="text-2xl mb-1 filter drop-shadow">🤞</span>
            <p className="text-sm font-semibold text-slate-300 leading-snug">
              Mais que animes,<br />
              <span className="text-cyan-400 font-extrabold">é conhecimento.</span>
            </p>
            <div className="w-10 h-1 bg-cyan-500/80 rounded-full mt-2.5 shadow-sm shadow-cyan-500/50" />
          </div>

          {/* Silhueta Luffy & Frase (Desktop apenas) */}
          <div className="hidden xl:flex flex-col items-end absolute right-4 top-1/2 -translate-y-1/2 max-w-[240px] text-right opacity-75">
            <span className="text-2xl mb-1 filter drop-shadow">🍖</span>
            <p className="text-sm font-semibold text-slate-300 leading-snug">
              "Todo dia<br />
              <span className="text-amber-400 font-extrabold">um novo desafio.</span>"
            </p>
            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500 mt-1">
              — AnimeDLE
            </span>
            <div className="w-10 h-1 bg-amber-500/80 rounded-full mt-2.5 shadow-sm shadow-amber-500/50" />
          </div>

          {/* Título Principal */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-2">
            Escolha o que{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-indigo-500 bg-clip-text text-transparent">
              jogar
            </span>
          </h1>
          <p className="text-sm sm:text-base font-medium text-slate-400 max-w-lg mx-auto">
            Desafios diários dos seus animes favoritos
          </p>
        </section>

        {/* ========================================================= */}
        {/* BANNER INTELIGENTE: CONTINUAR JOGANDO / DESTAQUE DO DIA    */}
        {/* ========================================================= */}
        <ResumeBanner onContinue={onSelectAnime} />

        {/* ========================================================= */}
        {/* BARRA DE PESQUISA & FILTROS RÁPIDOS                       */}
        {/* ========================================================= */}
        <div className="w-full max-w-4xl mx-auto my-6 px-4 flex flex-col sm:flex-row items-center gap-3">
          {/* Input de Busca */}
          <div className="relative flex-1 w-full">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar anime..."
              className="w-full bg-[#0d1527] border border-[#202b43] focus:border-indigo-500 text-sm rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 outline-none transition-all shadow-inner"
            />
          </div>

          {/* Pílulas de Filtro */}
          <div className="flex items-center gap-1.5 bg-[#0d1527] border border-[#202b43] p-1 rounded-xl w-full sm:w-auto justify-center">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveFilter('available')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeFilter === 'available'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Check size={13} className="text-emerald-400" />
              <span>Disponíveis</span>
            </button>
            <button
              onClick={() => setActiveFilter('collections')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeFilter === 'collections'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers size={13} className="text-pink-400" />
              <span>Coleções</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SEÇÃO 1: ANIMES DISPONÍVEIS                               */}
        {/* ========================================================= */}
        {showAvailable && (
          <section className="my-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-cyan-400" />
                  <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                    Animes disponíveis
                  </h2>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Escolha um anime e teste seus conhecimentos!
                </p>
              </div>

              <span className="text-xs font-semibold text-slate-400 bg-[#111a2d] border border-[#202b43] px-3 py-1 rounded-full">
                {availableAnimes.length} {availableAnimes.length === 1 ? 'anime disponível' : 'animes disponíveis'}
              </span>
            </div>

            {availableAnimes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {availableAnimes.map((anime) => (
                  <AnimeCard
                    key={anime.slug}
                    anime={anime}
                    onSelect={onSelectAnime}
                    modesCount={getModesCount(anime.slug)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 text-sm">
                Nenhum anime disponível encontrado com o termo "{searchTerm}".
              </div>
            )}
          </section>
        )}

        {/* ========================================================= */}
        {/* SEÇÃO 2: COLEÇÕES ESPECIAIS (ROMANCE)                     */}
        {/* ========================================================= */}
        {showCollections && (
          <section className="my-8">
            <div className="flex items-center gap-2 mb-1">
              <Layers size={18} className="text-pink-400" />
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Coleções
              </h2>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Desafios especiais com personagens de vários animes!
            </p>

            {/* Card Exclusivo de Romance com Marin Kitagawa */}
            <div className="max-w-xl">
              <div
                className="relative flex items-center gap-3.5 p-3 sm:p-4 rounded-2xl bg-[#141226]/80 border border-pink-500/30 transition-all duration-300 shadow-xl overflow-hidden"
                style={{
                  boxShadow: '0 8px 24px -4px rgba(244, 63, 94, 0.15)',
                }}
              >
                {/* Ícone de Coração */}
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center flex-shrink-0 text-pink-400">
                  <Heart size={20} fill="currentColor" />
                </div>

                {/* Avatar Marin Kitagawa */}
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden flex-shrink-0 bg-[#090d18] border border-pink-500/40 shadow-inner">
                  <img
                    src="/card-covers/romance.png"
                    alt="Romance - Marin Kitagawa"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Informações */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-extrabold text-white tracking-tight">
                    Romance
                  </h3>
                  <p className="text-xs text-pink-300/80 font-medium">
                    Personagens de vários animes
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 font-medium">
                    <Gamepad2 size={13} className="text-slate-500" />
                    <span>4 modos</span>
                  </div>
                </div>

                {/* Botão Em breve */}
                <div className="flex-shrink-0">
                  <span className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-pink-300 bg-pink-500/15 border border-pink-500/40 select-none">
                    Em breve
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* SEÇÃO 3: EM BREVE                                         */}
        {/* ========================================================= */}
        {showUpcoming && upcomingAnimes.length > 0 && (
          <section className="my-10 pt-4 border-t border-[#18233c]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-slate-400" />
                  <h2 className="text-base sm:text-lg font-black text-slate-200 tracking-tight">
                    Em breve
                  </h2>
                </div>
                <p className="text-xs text-slate-500">
                  Mais animes chegando em breve!
                </p>
              </div>

              <span className="text-[11px] font-medium text-slate-500 hidden sm:inline">
                Fique ligado para mais novidades!
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5">
              {upcomingAnimes.map((anime) => (
                <div
                  key={anime.slug}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#0b1220]/60 border border-[#1b263e] opacity-70 select-none"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <span className="text-sm flex-shrink-0">{anime.banner}</span>
                    <span className="text-xs font-semibold text-slate-300 truncate">
                      {anime.title}
                    </span>
                  </div>

                  <span className="text-[9px] bg-[#111a2d] text-slate-400 border border-[#202b43] px-1.5 py-0.5 rounded font-medium flex-shrink-0">
                    Em breve
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
};
