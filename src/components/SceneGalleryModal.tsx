import React, { useState, useMemo } from 'react';
import { Film, Search, X, Volume2, Play, ExternalLink } from 'lucide-react';
import { SCENE_CHALLENGES } from '../data/scenes/sceneChallenges';
import { ANIMES_CONFIG } from '../data/animes/config';
import { SceneChallenge } from '../types/anime';

interface SceneGalleryModalProps {
  onClose: () => void;
  initialAnimeSlug?: string;
}

export const SceneGalleryModal: React.FC<SceneGalleryModalProps> = ({
  onClose,
  initialAnimeSlug = 'one-piece',
}) => {
  const [selectedAnime, setSelectedAnime] = useState<string>(initialAnimeSlug);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Lista de animes que possuem cenas cadastradas
  const animesWithScenes = useMemo(() => {
    return Object.keys(SCENE_CHALLENGES).map((slug) => ({
      slug,
      title: ANIMES_CONFIG[slug]?.title || slug,
      count: SCENE_CHALLENGES[slug]?.length || 0,
      themeColor: ANIMES_CONFIG[slug]?.themeColor || '#eab308',
    }));
  }, []);

  const currentAnimeChallenges = useMemo(() => {
    const list = SCENE_CHALLENGES[selectedAnime] || [];
    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase().trim();
    return list.filter(
      (c) =>
        c.characterName.toLowerCase().includes(q) ||
        c.techniqueOrSceneName.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q))
    );
  }, [selectedAnime, searchQuery]);

  const activeAnimeConfig = ANIMES_CONFIG[selectedAnime];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-7xl h-[92vh] flex flex-col bg-[#0b1222] border border-[#202b43] rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#202b43] bg-[#0c162d]/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Film size={22} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                Visualizador de Cenas do Jogo
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                  Dev Preview
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Veja todas as cenas ativas com os respectivos personagens, golpes e clipes em tempo real.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#14203a] hover:bg-[#1e2f54] text-slate-400 hover:text-white border border-[#233355] transition-all"
            title="Fechar Visualizador"
          >
            <X size={20} />
          </button>
        </div>

        {/* Barra de Filtros e Abas de Animes */}
        <div className="px-5 py-3 border-b border-[#1c2840] bg-[#080d19] flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Seletor de Animes em Pílulas */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-thin">
            {animesWithScenes.map((anime) => {
              const isSelected = anime.slug === selectedAnime;
              return (
                <button
                  key={anime.slug}
                  onClick={() => {
                    setSelectedAnime(anime.slug);
                    setSearchQuery('');
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                      : 'bg-[#10192e] text-slate-400 border-[#1c2840] hover:text-white hover:bg-[#172442]'
                  }`}
                >
                  <span>{anime.title}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isSelected ? 'bg-amber-400/20 text-amber-200' : 'bg-[#182645] text-slate-400'
                  }`}>
                    {anime.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Campo de Busca por Personagem / Golpe */}
          <div className="relative w-full sm:w-72 flex-shrink-0">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar personagem ou cena..."
              className="w-full bg-[#10192e] border border-[#1e2c49] focus:border-amber-400/60 rounded-xl pl-9 pr-8 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Grade de Cenas com Rolagem */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#070b14] scrollbar-thin">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-400">
              Exibindo <strong className="text-white">{currentAnimeChallenges.length}</strong> cenas de{' '}
              <strong className="text-amber-400">{activeAnimeConfig?.title || selectedAnime}</strong>
            </span>
          </div>

          {currentAnimeChallenges.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Film size={40} className="text-slate-600 mb-3" />
              <p className="text-sm font-semibold text-slate-300">Nenhuma cena encontrada</p>
              <p className="text-xs text-slate-500 mt-1">Tente pesquisar com outro termo ou selecione outro anime.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {currentAnimeChallenges.map((challenge: SceneChallenge) => (
                <div
                  key={challenge.id}
                  className="group relative flex flex-col rounded-2xl bg-[#0c1427] border border-[#1d2b48] hover:border-amber-500/50 shadow-md hover:shadow-xl transition-all overflow-hidden"
                >
                  {/* Player de Vídeo / WebP Animado */}
                  <div className="relative aspect-video w-full bg-black/60 overflow-hidden flex items-center justify-center">
                    <img
                      src={challenge.videoUrl}
                      alt={challenge.characterName}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Tag de ID/Anime */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm text-[10px] font-mono text-slate-300 border border-white/10">
                      {challenge.characterId}
                    </div>
                  </div>

                  {/* Informações da Cena */}
                  <div className="p-3.5 flex flex-col flex-1 justify-between gap-2 bg-[#0c1427]">
                    <div>
                      {/* Nome do Personagem em destaque */}
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
                        <span>{challenge.characterName}</span>
                      </h3>

                      {/* Nome da Técnica / Cena */}
                      <p className="text-[11px] font-semibold text-amber-400/90 mt-0.5 line-clamp-1" title={challenge.techniqueOrSceneName}>
                        {challenge.techniqueOrSceneName}
                      </p>

                      {/* Descrição detalhada */}
                      {challenge.description && (
                        <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2 leading-relaxed" title={challenge.description}>
                          {challenge.description}
                        </p>
                      )}
                    </div>

                    {/* Rodapé do Card */}
                    <div className="pt-2 border-t border-[#172238] flex items-center justify-between text-[10px] text-slate-500">
                      <span className="truncate max-w-[170px]" title={challenge.videoUrl}>
                        {challenge.videoUrl}
                      </span>
                      <a
                        href={challenge.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-0.5 ml-1"
                        title="Abrir arquivo direto"
                      >
                        Ver <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
