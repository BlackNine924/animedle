import React, { useState, useMemo } from 'react';
import { Search, Check, Layers, Sparkles, Clock, Heart, Gamepad2 } from 'lucide-react';
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

  // Slugs dos animes disponíveis preservando a ordem e conteúdo real do projeto
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
          HERO SECTION COM SILHUETAS TRANSLÚCIDAS INTEGRADAS
          ======================================================== */}
      <section className="relative w-full pt-3 pb-1 overflow-hidden">
        {/* Silhueta Translúcida do Gojo Satoru (Esquerda) com desvanecimento suave */}
        <div
          className="hidden lg:block absolute left-0 top-0 bottom-0 w-[260px] pointer-events-none select-none z-0"
          style={{
            maskImage: 'linear-gradient(to right, black 25%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, black 25%, transparent 100%)',
          }}
        >
          <img
            src="/hero-gojo.png"
            alt=""
            className="w-full h-full object-cover object-left-top opacity-20 mix-blend-screen"
          />
        </div>

        {/* Silhueta Translúcida do Monkey D. Luffy (Direita) com desvanecimento suave */}
        <div
          className="hidden lg:block absolute right-0 top-0 bottom-0 w-[270px] pointer-events-none select-none z-0"
          style={{
            maskImage: 'linear-gradient(to left, black 25%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to left, black 25%, transparent 100%)',
          }}
        >
          <img
            src="/hero-luffy.png"
            alt=""
            className="w-full h-full object-cover object-right-top opacity-20 mix-blend-screen"
          />
        </div>

        {/* Conteúdo Central do Hero */}
        <div className="max-w-[1210px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto relative z-10 flex items-center justify-between">
          {/* Frase Lateral Esquerda */}
          <div className="hidden lg:flex flex-col items-start text-left max-w-[210px] pl-1 z-10 select-none">
            <p className="text-sm font-semibold text-slate-300 leading-snug">
              Mais <br />
              que animes, <br />
              <span className="font-black text-sky-400">é conhecimento.</span>
            </p>
            <div className="w-9 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full mt-2" />
          </div>

          {/* Título & Subtítulo Principal */}
          <div className="text-center flex-1 mx-auto max-w-2xl px-4">
            <h1 className="text-3xl sm:text-4xl md:text-[40px] font-black text-white tracking-tight leading-tight">
              Escolha o que{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-300 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                jogar
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-medium">
              Desafios diários dos seus animes favoritos
            </p>
          </div>

          {/* Frase Lateral Direita */}
          <div className="hidden lg:flex flex-col items-end text-right max-w-[210px] pr-1 z-10 select-none">
            <p className="text-sm italic font-medium text-slate-300 leading-snug">
              “Todo dia <br />
              um novo desafio.”
            </p>
            <span className="text-xs font-black text-sky-400 mt-1 tracking-wide">— AnimeDLE</span>
          </div>
        </div>

        {/* Banner "Continuar jogando" / "Destaque do Dia" */}
        <div className="mt-3">
          <ResumeBanner onContinue={onSelectAnime} />
        </div>
      </section>

      {/* ========================================================
          BARRA DE PESQUISA & FILTROS (COMPONENTES SEPARADOS, SEM MOLDURA EXTERNA)
          ======================================================== */}
      <div className="max-w-[1210px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto mt-3.5 mb-1.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Campo de Busca Standalone */}
          <div className="relative flex-1 w-full">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar anime..."
              className="w-full pl-11 pr-4 py-2 bg-[#0c1428] border border-[#202f50] rounded-full text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
            />
          </div>

          {/* Pílulas de Filtro Standalone */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto custom-scrollbar pb-1 sm:pb-0 flex-shrink-0">
            <button
              onClick={() => setActiveFilter('all')}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
                activeFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-blue-600/30 border border-blue-500'
                  : 'bg-[#0e162c] text-slate-300 hover:text-white border border-[#202f50] hover:border-slate-600'
              }`}
            >
              <span>Todos</span>
            </button>

            <button
              onClick={() => setActiveFilter('available')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
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
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
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
          GRADE DE ANIMES DISPONÍVEIS (LAYOUT 4 COLUNAS, MAX 1210PX)
          ======================================================== */}
      {(activeFilter === 'all' || activeFilter === 'available') && (
        <section className="max-w-[1210px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto mt-3.5">
          {/* Cabeçalho da Seção */}
          <div className="flex items-center justify-between mb-3">
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

          {/* Grid de 4 Colunas (16px gap horizontal, 12px vertical) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-3">
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
          SEÇÃO DE COLEÇÕES (CARD ROMANCE COM MEIA-LARGURA ~50%)
          ======================================================== */}
      {(activeFilter === 'all' || activeFilter === 'collections') && (
        <section className="max-w-[1210px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto mt-4.5">
          <div className="flex items-center gap-2 mb-0.5">
            <Layers size={17} className="text-pink-400" />
            <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
              Coleções
            </h2>
          </div>
          <p className="text-xs text-slate-400 mb-3.5">
            Desafios especiais com personagens de vários animes!
          </p>

          {/* Card de Romance ocupando aproximadamente 50% da largura do catálogo */}
          <div className="w-full lg:w-[calc(50%-10px)] max-w-[592px]">
            <div
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#170e24] via-[#1c1230] to-[#170e24] p-3 sm:p-3.5 transition-all duration-300 shadow-xl"
              style={{
                border: '1.5px solid #ec4899',
                boxShadow: '0 6px 24px -3px rgba(0, 0, 0, 0.7), 0 0 16px -2px rgba(236, 72, 153, 0.35)',
              }}
            >
              {/* Glow de fundo rosa */}
              <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none bg-pink-500" />

              <div className="relative z-10 flex items-center justify-between gap-3">
                {/* Lado Esquerdo: Ícone + Foto Marin + Textos */}
                <div className="flex items-center gap-3 min-w-0">
                  {/* Ícone de Coração Rosa */}
                  <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/50 flex items-center justify-center text-pink-400 flex-shrink-0 shadow-md">
                    <Heart size={20} fill="currentColor" />
                  </div>

                  {/* Foto da Personagem (Marin Kitagawa) */}
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-[#120a1c] border border-pink-500/40 shadow-lg">
                    <img
                      src="/card-covers/romance.png"
                      alt="Coleção Romance"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-black text-white tracking-tight">
                      Romance
                    </h3>
                    <p className="text-[11px] text-slate-400 truncate">
                      Personagens de vários animes
                    </p>
                  </div>
                </div>

                {/* Lado Direito: Modos + Botão Rosa Outline */}
                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <div className="hidden sm:flex items-center gap-1 text-[11px] text-pink-300 font-bold bg-pink-500/10 border border-pink-500/30 px-2.5 py-1 rounded-lg">
                    <Gamepad2 size={12} className="text-pink-400" />
                    <span>4 modos</span>
                  </div>

                  <button
                    disabled
                    className="flex items-center justify-center gap-1.5 py-1.5 px-4 rounded-xl text-xs font-extrabold text-pink-300 border border-pink-500/60 bg-pink-500/15 cursor-not-allowed opacity-90 shadow-sm"
                    title="Modo Romance em desenvolvimento!"
                  >
                    <span>Jogar →</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          SEÇÃO "EM BREVE" (CÁPSULAS DESATIVADAS / DORMANTES)
          ======================================================== */}
      {activeFilter === 'all' && (
        <section className="max-w-[1210px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto mt-5 mb-8">
          <div className="flex items-center justify-between mb-3">
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

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {upcomingAnimes.map((anime) => (
              <div
                key={anime.slug}
                className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#080d1a]/80 border border-[#172238] opacity-55 hover:opacity-80 transition-opacity select-none"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <FranchiseEmblem slug={anime.slug} size={16} className="flex-shrink-0 grayscale-[20%]" />
                  <span className="text-xs font-semibold text-slate-400 truncate">
                    {anime.title}
                  </span>
                </div>
                <span className="text-[9px] bg-[#0c1426] text-slate-400 border border-[#1e2a44] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0">
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
