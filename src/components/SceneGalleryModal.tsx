import React, { useState, useMemo } from 'react';
import { Film, Search, X, Eye, EyeOff, ExternalLink, SlidersHorizontal } from 'lucide-react';
import { SCENE_CHALLENGES } from '../data/scenes/sceneChallenges';
import { ANIMES_CONFIG } from '../data/animes/config';
import { SceneChallenge } from '../types/anime';

interface SceneGalleryModalProps {
  onClose: () => void;
  initialAnimeSlug?: string;
}

export const SceneGalleryModal: React.FC<SceneGalleryModalProps> = ({
  onClose,
  initialAnimeSlug = 'todos',
}) => {
  const [selectedAnime, setSelectedAnime] = useState<string>(initialAnimeSlug);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Controles idênticos ao Modo Cena nativo do jogo
  const [isColorEnabled, setIsColorEnabled] = useState<boolean>(false);
  const [blurPercentage, setBlurPercentage] = useState<number>(0); // 100%, 75%, 50%, 25%, 0%

  // Mapeamento exato de % de borrão para pixels igual ao ScenePlayerCard (100% -> 16px, 75% -> 12px, 50% -> 8px, 25% -> 4px, 0% -> 0px)
  const blurPx = Math.round((blurPercentage / 100) * 16);

  // Lista de animes que possuem cenas cadastradas + Categoria "Todos"
  const animesWithScenes = useMemo(() => {
    const list = Object.keys(SCENE_CHALLENGES).map((slug) => ({
      slug,
      title: ANIMES_CONFIG[slug]?.title || slug,
      count: SCENE_CHALLENGES[slug]?.length || 0,
      themeColor: ANIMES_CONFIG[slug]?.themeColor || '#eab308',
    }));

    const totalCount = list.reduce((acc, a) => acc + a.count, 0);

    return [
      {
        slug: 'todos',
        title: 'Todos',
        count: totalCount,
        themeColor: '#f59e0b',
      },
      ...list,
    ];
  }, []);

  const currentAnimeChallenges = useMemo(() => {
    let list: SceneChallenge[] = [];
    if (selectedAnime === 'todos') {
      list = Object.values(SCENE_CHALLENGES).flat();
    } else {
      list = SCENE_CHALLENGES[selectedAnime] || [];
    }

    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase().trim();
    return list.filter(
      (c) =>
        c.characterName.toLowerCase().includes(q) ||
        c.techniqueOrSceneName.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q))
    );
  }, [selectedAnime, searchQuery]);

  const activeAnimeConfig = selectedAnime === 'todos' ? null : ANIMES_CONFIG[selectedAnime];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-7xl h-[94vh] flex flex-col bg-[#0b1222] border border-[#202b43] rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#202b43] bg-[#0c162d]/80">
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
                Teste filtros de desfoque nativos e paleta de cores como no próprio jogo.
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

        {/* Barra Superior: Filtro por Anime + Controles Nativos de Borrão e Cores */}
        <div className="px-5 py-2.5 border-b border-[#1c2840] bg-[#080d19] flex flex-col lg:flex-row gap-3 items-center justify-between">
          
          {/* Seletor de Animes em Pílulas com Scroll Customizado */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 custom-scrollbar max-w-full">
            {animesWithScenes.map((anime) => {
              const isSelected = anime.slug === selectedAnime;
              return (
                <button
                  key={anime.slug}
                  onClick={() => {
                    setSelectedAnime(anime.slug);
                    setSearchQuery('');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                    isSelected
                      ? 'bg-amber-500/25 text-amber-300 border-amber-500/60 shadow-sm'
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

          {/* Controles de Simulação do Modo Cena: Borrão (%) & Ativar Cor */}
          <div className="flex items-center gap-2.5 w-full lg:w-auto justify-between lg:justify-end flex-wrap">
            
            {/* Seletor de Borrão (% nativas do jogo) */}
            <div className="flex items-center gap-1 bg-[#10192e] border border-[#1e2c49] p-1 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-400 px-1.5 flex items-center gap-1">
                <SlidersHorizontal size={11} className="text-amber-400" />
                Borrão:
              </span>
              {[100, 75, 50, 25, 0].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setBlurPercentage(pct)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition-all ${
                    blurPercentage === pct
                      ? 'bg-amber-500 text-black shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>

            {/* Alternador de Cores (P&B por padrão) */}
            <button
              onClick={() => setIsColorEnabled(!isColorEnabled)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all shadow-sm active:scale-95 ${
                isColorEnabled
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-750'
              }`}
              title="Alternar entre visualização P&B ou Colorida"
            >
              {isColorEnabled ? <Eye size={13} className="text-emerald-400" /> : <EyeOff size={13} className="text-slate-400" />}
              <span>{isColorEnabled ? 'Cores: Ativadas' : 'Preto & Branco (Padrão)'}</span>
            </button>

            {/* Campo de Busca por Personagem / Golpe */}
            <div className="relative w-full sm:w-56 flex-shrink-0">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar cena..."
                className="w-full bg-[#10192e] border border-[#1e2c49] focus:border-amber-400/60 rounded-xl pl-8 pr-7 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X size={12} />
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Grade de Cenas com Rolagem Customizada */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#070b14] custom-scrollbar">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-400">
              Exibindo <strong className="text-white">{currentAnimeChallenges.length}</strong> cenas{' '}
              {selectedAnime === 'todos' ? (
                <>de <strong className="text-amber-400">Todos os Animes</strong></>
              ) : (
                <>de <strong className="text-amber-400">{activeAnimeConfig?.title || selectedAnime}</strong></>
              )}
              {blurPercentage > 0 && <span className="text-sky-300 ml-2">({blurPercentage}% Borrão)</span>}
              {!isColorEnabled && <span className="text-slate-500 ml-2">(P&B)</span>}
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
                  {/* Player de Vídeo / WebP Animado com Filtros de Borrão e P&B em Tempo Real */}
                  <div className="relative aspect-video w-full bg-black/80 overflow-hidden flex items-center justify-center select-none">
                    <img
                      src={challenge.videoUrl}
                      alt={challenge.characterName}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 pointer-events-none"
                      style={{
                        filter: `blur(${blurPx}px) ${isColorEnabled ? 'grayscale(0%)' : 'grayscale(100%)'}`,
                      }}
                      loading="lazy"
                      draggable={false}
                    />

                    {/* Tag de ID/Anime */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm text-[10px] font-mono text-slate-300 border border-white/10">
                      {challenge.animeSlug}
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
