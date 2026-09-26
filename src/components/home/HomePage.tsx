import React, { useState, useMemo } from 'react';
import { Search, Check, Layers, Sparkles, Clock, Heart, Gamepad2, ArrowRight } from 'lucide-react';
import { ANIMES_CONFIG } from '../../data/animes/config';
import { AnimeConfig } from '../../types/anime';
import { AnimeCard } from './AnimeCard';
import { ResumeBanner } from './ResumeBanner';
import { FranchiseEmblem } from '../FranchiseEmblem';

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
          anime.slug !== 'romance'
      )
      .filter((anime) =>
        anime.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [allAnimesList, searchTerm]);

  return (
    <div className="flex-1 w-full relative overflow-x-hidden selection:bg-rose-500 selection:text-white">
      {/* ========================================================
          HERO SECTION COM SILHUETAS TRANSLÚCIDAS & FRASES
          ======================================================== */}
      <section className="relative w-full pt-8 pb-4 overflow-hidden border-b border-[#1b2640]/40">
        {/* Silhueta Translúcida do Gojo Satoru (Esquerda) */}
        <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-80 xl:w-96 pointer-events-none select-none z-0">
          <img
            src="/hero-gojo.png"
            alt=""
            className="w-full h-full object-cover object-left-top opacity-20 filter drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#030712]/50 to-[#030712]" />
        </div>

        {/* Silhueta Translúcida do Monkey D. Luffy (Direita) */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-80 xl:w-96 pointer-events-none select-none z-0">
          <img
            src="/hero-luffy.png"
            alt=""
            className="w-full h-full object-cover object-right-top opacity-20 filter drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#030712]/50 to-[#030712]" />
        </div>

        {/* Conteúdo Central do Hero */}
        <div className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto relative z-10 flex items-center justify-between">
          {/* Frase Lateral Esquerda */}
          <div className="hidden lg:flex flex-col items-start text-left max-w-[210px] pl-2 z-10 select-none">
            <p className="text-sm font-semibold text-slate-300 leading-snug">
              Mais <br />
              que animes, <br />
              <span className="font-extrabold text-sky-400">é conhecimento.</span>
            </p>
            <div className="w-9 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full mt-2.5" />
          </div>

          {/* Título & Subtítulo Principal */}
          <div className="text-center flex-1 mx-auto max-w-2xl px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Escolha o que{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-300 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                jogar
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-400 mt-2 font-medium">
              Desafios diários dos seus animes favoritos
            </p>
          </div>

          {/* Frase Lateral Direita */}
          <div className="hidden lg:flex flex-col items-end text-right max-w-[210px] pr-2 z-10 select-none">
            <p className="text-sm italic font-medium text-slate-300 leading-snug">
              “Todo dia <br />
              um novo desafio.”
            </p>
            <span className="text-xs font-extrabold text-sky-400 mt-1 tracking-wide">— AnimeDLE</span>
          </div>
        </div>

        {/* Banner "Continuar jogando" / "Destaque do Dia" */}
        <div className="mt-4">
          <ResumeBanner onContinue={onSelectAnime} />
        </div>
      </section>

      {/* ========================================================
          BARRA DE PESQUISA & FILTROS (LINHA ÚNICA NO DESKTOP)
          ======================================================== */}
      <div className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto mt-6 mb-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0a1020]/60 p-2 sm:p-2.5 rounded-2xl border border-[#1b2640]">
          {/* Campo de Busca */}
          <div className="relative flex-1 w-full">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar anime..."
              className="w-full pl-10 pr-4 py-2 bg-[#0c1428] border border-[#202f50] rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Pílulas de Filtro Alinhadas */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto custom-scrollbar pb-1 sm:pb-0 flex-shrink-0">
            <button
              onClick={() => setActiveFilter('all')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                activeFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-blue-600/30 border border-blue-500'
                  : 'bg-[#0e162c] text-slate-300 hover:text-white border border-[#202f50] hover:border-slate-600'
              }`}
            >
              <span>Todos</span>
            </button>

            <button
              onClick={() => setActiveFilter('available')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                activeFilter === 'available'
                  ? 'bg-blue-600 text-white shadow-blue-600/30 border border-blue-500'
                  : 'bg-[#0e162c] text-slate-300 hover:text-white border border-[#202f50] hover:border-slate-600'
              }`}
            >
              <Check size={14} className="text-emerald-400" />
              <span>Disponíveis</span>
            </button>

            <button
              onClick={() => setActiveFilter('collections')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                activeFilter === 'collections'
                  ? 'bg-blue-600 text-white shadow-blue-600/30 border border-blue-500'
                  : 'bg-[#0e162c] text-slate-300 hover:text-white border border-[#202f50] hover:border-slate-600'
              }`}
            >
              <Layers size={14} className="text-sky-400" />
              <span>Coleções</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          GRADE DE ANIMES DISPONÍVEIS (LAYOUT 4 COLUNAS)
          ======================================================== */}
      {(activeFilter === 'all' || activeFilter === 'available') && (
        <section className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto mt-6">
          {/* Cabeçalho da Seção */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-sky-400" />
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                  Animes disponíveis
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Escolha um anime e teste seus conhecimentos!
              </p>
            </div>

            <span className="text-xs font-semibold text-slate-400 select-none">
              {availableAnimes.length} animes disponíveis
            </span>
          </div>

          {/* Grid de 4 Colunas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {availableAnimes.map((anime) => (
              <AnimeCard
                key={anime.slug}
                anime={anime}
                onSelect={(slug) => onSelectAnime(slug)}
                modesCount={getModesCount(anime.slug)}
              />
            ))}
          </div>

          {availableAnimes.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-sm bg-[#0a1020]/50 border border-[#1b2640] rounded-2xl my-4">
              Nenhum anime disponível encontrado com o termo "{searchTerm}".
            </div>
          )}
        </section>
      )}

      {/* ========================================================
          SEÇÃO DE COLEÇÕES (MODO ROMANCE COM MARIN KITAGAWA)
          ======================================================== */}
      {(activeFilter === 'all' || activeFilter === 'collections') && (
        <section className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto mt-10">
          <div className="flex items-center gap-2 mb-1">
            <Layers size={17} className="text-pink-400" />
            <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
              Coleções
            </h2>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Desafios especiais com personagens de vários animes!
          </p>

          {/* Card Largo da Coleção Romance */}
          <div
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#170e24] via-[#1c1230] to-[#170e24] p-3.5 sm:p-4 transition-all duration-300 shadow-xl"
            style={{
              border: '1.5px solid #ec4899',
              boxShadow: '0 8px 30px -4px rgba(0, 0, 0, 0.7), 0 0 20px -2px rgba(236, 72, 153, 0.35)',
            }}
          >
            {/* Glow de fundo rosa */}
            <div className="absolute -left-10 -top-10 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none bg-pink-500" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Lado Esquerdo: Ícone + Foto Marin + Textos */}
              <div className="flex items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                {/* Ícone de Coração Rosa */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-pink-500/20 border border-pink-500/50 flex items-center justify-center text-pink-400 flex-shrink-0 shadow-md">
                  <Heart size={22} fill="currentColor" />
                </div>

                {/* Foto da Marin Kitagawa */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[#120a1c] border border-pink-500/40 shadow-lg">
                  <img
                    src="/card-covers/romance.png"
                    alt="Coleção Romance - Marin Kitagawa"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                      Romance
                    </h3>
                    <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40">
                      Coleção Especial
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">
                    Personagens de vários animes de romance e comédia romântica
                  </p>
                </div>
              </div>

              {/* Lado Direito: Modos + Botão Rosa */}
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end flex-shrink-0">
                <div className="flex items-center gap-1.5 text-xs text-pink-300 font-bold bg-pink-500/10 border border-pink-500/30 px-3 py-1.5 rounded-xl">
                  <Gamepad2 size={13} className="text-pink-400" />
                  <span>4 modos</span>
                </div>

                <button
                  disabled
                  className="flex items-center justify-center gap-1.5 py-2 px-5 rounded-xl text-xs font-extrabold text-pink-300 border border-pink-500/60 bg-pink-500/15 cursor-not-allowed opacity-90 shadow-sm"
                  title="Modo Romance em desenvolvimento!"
                >
                  <span>Em breve</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          SEÇÃO "EM BREVE" (CÁPSULAS COM BRASÕES OFICIAIS)
          ======================================================== */}
      {activeFilter === 'all' && (
        <section className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto mt-10 mb-16">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-sky-400" />
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                  Em breve
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Mais animes chegando em breve!
              </p>
            </div>

            <span className="text-xs text-slate-400 hidden sm:inline select-none">
              Fique ligado para mais novidades!
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {upcomingAnimes.map((anime) => (
              <div
                key={anime.slug}
                className="flex items-center justify-between gap-2.5 p-3 rounded-2xl bg-[#0a1020]/70 border border-[#1b2640] hover:border-slate-600 transition-all select-none"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <FranchiseEmblem slug={anime.slug} size={18} className="flex-shrink-0" />
                  <span className="text-xs font-bold text-slate-300 truncate">
                    {anime.title}
                  </span>
                </div>
                <span className="text-[10px] bg-[#0c1428] text-slate-400 border border-[#202f50] px-2 py-0.5 rounded-full font-semibold flex-shrink-0">
                  Em breve
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
