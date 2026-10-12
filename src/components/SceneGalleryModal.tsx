import React, { useState, useMemo, useEffect } from 'react';
import { Film, Search, X, Eye, EyeOff, ExternalLink, SlidersHorizontal, ThumbsUp, ThumbsDown, CheckCircle2, AlertTriangle, RotateCcw } from 'lucide-react';
import { SCENE_CHALLENGES } from '../data/scenes/sceneChallenges';
import { ANIMES_CONFIG } from '../data/animes/config';
import { SceneChallenge } from '../types/anime';

interface SceneGalleryModalProps {
  onClose: () => void;
  initialAnimeSlug?: string;
}

type SceneQualityStatus = 'good' | 'bad';
type StatusFilter = 'all' | 'good' | 'bad' | 'unmarked';

const STORAGE_KEY_SCENE_REVIEWS = 'animedle_dev_scene_reviews_v1';

export const SceneGalleryModal: React.FC<SceneGalleryModalProps> = ({
  onClose,
  initialAnimeSlug = 'todos',
}) => {
  const [selectedAnime, setSelectedAnime] = useState<string>(initialAnimeSlug);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  // Controles idênticos ao Modo Cena nativo do jogo
  const [isColorEnabled, setIsColorEnabled] = useState<boolean>(false);
  const [blurPercentage, setBlurPercentage] = useState<number>(0); // 100%, 75%, 50%, 25%, 0%

  // Sistema de marcação de cenas (Boas ou Ruins) persistido no localStorage
  const [sceneReviews, setSceneReviews] = useState<Record<string, SceneQualityStatus>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SCENE_REVIEWS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SCENE_REVIEWS, JSON.stringify(sceneReviews));
    } catch {}
  }, [sceneReviews]);

  const handleToggleReview = (sceneId: string, status: SceneQualityStatus) => {
    setSceneReviews((prev) => {
      const next = { ...prev };
      if (next[sceneId] === status) {
        delete next[sceneId];
      } else {
        next[sceneId] = status;
      }
      return next;
    });
  };

  const handleClearReviews = () => {
    if (window.confirm('Deseja limpar todas as marcações de cenas Boas/Ruins?')) {
      setSceneReviews({});
    }
  };

  // Marca todas as cenas da categoria/anime atual como Boa
  const handleMarkAllCurrentAsGood = () => {
    setSceneReviews((prev) => {
      const next = { ...prev };
      for (const c of baseAnimeList) {
        next[c.id] = 'good';
      }
      return next;
    });
  };

  // Mapeamento exato de % de borrão para pixels igual ao ScenePlayerCard (100% -> 16px, 75% -> 12px, 50% -> 8px, 25% -> 4px, 0% -> 0px)
  const blurPx = Math.round((blurPercentage / 100) * 16);

  // Lista de animes que possuem cenas cadastradas + Categoria "Todos"
  const animesWithScenes = useMemo(() => {
    const list = Object.keys(SCENE_CHALLENGES).map((slug) => ({
      slug,
      title: ANIMES_CONFIG[slug]?.title || slug,
      banner: ANIMES_CONFIG[slug]?.banner || '🎬',
      count: SCENE_CHALLENGES[slug]?.length || 0,
      themeColor: ANIMES_CONFIG[slug]?.themeColor || '#eab308',
    }));

    const totalCount = list.reduce((acc, a) => acc + a.count, 0);

    return [
      {
        slug: 'todos',
        title: 'Todos',
        banner: '🌐',
        count: totalCount,
        themeColor: '#f59e0b',
      },
      ...list,
    ];
  }, []);

  // Lista base por anime (para contadores de status da aba selecionada)
  const baseAnimeList = useMemo(() => {
    if (selectedAnime === 'todos') {
      return Object.values(SCENE_CHALLENGES).flat();
    }
    return SCENE_CHALLENGES[selectedAnime] || [];
  }, [selectedAnime]);

  // Contadores de status sobre a categoria de anime selecionada
  const statusCounts = useMemo(() => {
    let good = 0;
    let bad = 0;
    let unmarked = 0;

    for (const c of baseAnimeList) {
      const st = sceneReviews[c.id];
      if (st === 'good') good++;
      else if (st === 'bad') bad++;
      else unmarked++;
    }

    return {
      all: baseAnimeList.length,
      good,
      bad,
      unmarked,
    };
  }, [baseAnimeList, sceneReviews]);

  // Lista filtrada final (Anime + Status + Busca simultaneamente ou de forma independente)
  const currentAnimeChallenges = useMemo(() => {
    let list = baseAnimeList;

    if (statusFilter !== 'all') {
      list = list.filter((c) => {
        const st = sceneReviews[c.id];
        if (statusFilter === 'good') return st === 'good';
        if (statusFilter === 'bad') return st === 'bad';
        if (statusFilter === 'unmarked') return !st;
        return true;
      });
    }

    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase().trim();
    return list.filter(
      (c) =>
        c.characterName.toLowerCase().includes(q) ||
        c.techniqueOrSceneName.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q))
    );
  }, [baseAnimeList, statusFilter, sceneReviews, searchQuery]);

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
                Avalie cenas como Boas ou Ruins, filtre por anime e simule o desfoque nativo e paleta P&B.
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

        {/* Barra Superior 1: Seletor de Animes em Pílulas com Emoji e Cor Oficial */}
        <div className="px-5 py-2.5 border-b border-[#1c2840] bg-[#080d19] flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
          {animesWithScenes.map((anime) => {
            const isSelected = anime.slug === selectedAnime;
            return (
              <button
                key={anime.slug}
                onClick={() => {
                  setSelectedAnime(anime.slug);
                }}
                style={
                  isSelected
                    ? {
                        backgroundColor: `${anime.themeColor}25`,
                        borderColor: anime.themeColor,
                        color: '#ffffff',
                      }
                    : undefined
                }
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  isSelected
                    ? 'shadow-sm'
                    : 'bg-[#10192e] text-slate-400 border-[#1c2840] hover:text-white hover:bg-[#172442]'
                }`}
              >
                <span>{anime.banner}</span>
                <span>{anime.title}</span>
                <span
                  style={
                    isSelected
                      ? { backgroundColor: `${anime.themeColor}40`, color: '#fff' }
                      : undefined
                  }
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isSelected ? '' : 'bg-[#182645] text-slate-400'
                  }`}
                >
                  {anime.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Barra Superior 2: Filtros de Status (Boas/Ruins) + Simulação de Borrão e Cores + Busca */}
        <div className="px-5 py-2.5 border-b border-[#1c2840] bg-[#0a1020] flex flex-col xl:flex-row gap-3 items-center justify-between">
          
          {/* Filtros de Avaliação (Todas, Boas, Ruins, Sem Marcação) */}
          <div className="flex items-center gap-1.5 flex-wrap w-full xl:w-auto">
            <span className="text-[10px] uppercase font-bold text-slate-400 mr-1">Status:</span>
            
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                statusFilter === 'all'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-[#10192e] text-slate-400 border-[#1c2840] hover:text-white'
              }`}
            >
              <span>Todas</span>
              <span className="text-[10px] px-1.5 rounded-full bg-black/30">{statusCounts.all}</span>
            </button>

            <button
              onClick={() => setStatusFilter('good')}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                statusFilter === 'good'
                  ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500/60 shadow-sm'
                  : 'bg-[#10192e] text-slate-400 border-[#1c2840] hover:text-emerald-300'
              }`}
            >
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span>Boas</span>
              <span className="text-[10px] px-1.5 rounded-full bg-emerald-950/60 text-emerald-300">{statusCounts.good}</span>
            </button>

            <button
              onClick={() => setStatusFilter('bad')}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                statusFilter === 'bad'
                  ? 'bg-rose-500/25 text-rose-300 border-rose-500/60 shadow-sm'
                  : 'bg-[#10192e] text-slate-400 border-[#1c2840] hover:text-rose-300'
              }`}
            >
              <AlertTriangle size={13} className="text-rose-400" />
              <span>Ruins</span>
              <span className="text-[10px] px-1.5 rounded-full bg-rose-950/60 text-rose-300">{statusCounts.bad}</span>
            </button>

            <button
              onClick={() => setStatusFilter('unmarked')}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                statusFilter === 'unmarked'
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                  : 'bg-[#10192e] text-slate-400 border-[#1c2840] hover:text-slate-200'
              }`}
            >
              <span>Não Avaliadas</span>
              <span className="text-[10px] px-1.5 rounded-full bg-black/30">{statusCounts.unmarked}</span>
            </button>

            <button
              onClick={handleMarkAllCurrentAsGood}
              className="px-2.5 py-1 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/35 text-emerald-300 border border-emerald-500/50 transition-all text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95"
              title={`Marcar todas as ${baseAnimeList.length} cenas desta categoria (${selectedAnime === 'todos' ? 'Todos' : activeAnimeConfig?.title || selectedAnime}) como Boas`}
            >
              <ThumbsUp size={12} className="text-emerald-400" />
              <span>
                Marcar {selectedAnime === 'todos' ? 'Todas' : activeAnimeConfig?.title || selectedAnime} como Boas
              </span>
            </button>

            {Object.keys(sceneReviews).length > 0 && (
              <button
                onClick={handleClearReviews}
                className="p-1.5 rounded-xl bg-slate-800/70 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-500/40 transition-all text-[10px] flex items-center gap-1"
                title="Limpar todas as marcações salvas"
              >
                <RotateCcw size={12} />
              </button>
            )}
          </div>

          {/* Controles de Simulação do Modo Cena: Borrão (%) & Ativar Cor + Busca */}
          <div className="flex items-center gap-2.5 w-full xl:w-auto justify-between xl:justify-end flex-wrap">
            
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
            <div className="relative w-full sm:w-52 flex-shrink-0">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar personagem..."
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
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="text-xs font-semibold text-slate-400">
              Exibindo <strong className="text-white">{currentAnimeChallenges.length}</strong> cenas{' '}
              {selectedAnime === 'todos' ? (
                <>de <strong className="text-amber-400">Todos os Animes</strong></>
              ) : (
                <>de <strong style={{ color: activeAnimeConfig?.themeColor || '#fbbf24' }}>{activeAnimeConfig?.banner} {activeAnimeConfig?.title || selectedAnime}</strong></>
              )}
              {statusFilter !== 'all' && (
                <span className="ml-2 px-2 py-0.5 rounded-md bg-white/5 text-slate-300">
                  Filtro: {statusFilter === 'good' ? '✅ Boas' : statusFilter === 'bad' ? '❌ Ruins' : '⏳ Não Avaliadas'}
                </span>
              )}
            </span>
          </div>

          {currentAnimeChallenges.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Film size={40} className="text-slate-600 mb-3" />
              <p className="text-sm font-semibold text-slate-300">Nenhuma cena encontrada</p>
              <p className="text-xs text-slate-500 mt-1">Tente ajustar o filtro de status (Boas/Ruins), buscar outro termo ou mudar de anime.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {currentAnimeChallenges.map((challenge: SceneChallenge) => {
                const animeCfg = ANIMES_CONFIG[challenge.animeSlug];
                const animeColor = animeCfg?.themeColor || '#eab308';
                const animeEmoji = animeCfg?.banner || '🎬';
                const animeTitle = animeCfg?.title || challenge.animeSlug;
                const reviewStatus = sceneReviews[challenge.id];

                return (
                  <div
                    key={challenge.id}
                    className={`group relative flex flex-col rounded-2xl bg-[#0c1427] border transition-all overflow-hidden shadow-md hover:shadow-xl ${
                      reviewStatus === 'good'
                        ? 'border-emerald-500/60 ring-1 ring-emerald-500/30'
                        : reviewStatus === 'bad'
                        ? 'border-rose-500/60 ring-1 ring-rose-500/30'
                        : 'border-[#1d2b48] hover:border-amber-500/50'
                    }`}
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

                      {/* Tag Estilizada do Anime com Cor Oficial em Hex e Emoji */}
                      <div
                        className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg backdrop-blur-md text-[11px] font-bold flex items-center gap-1.5 shadow-lg border"
                        style={{
                          backgroundColor: `${animeColor}28`,
                          borderColor: `${animeColor}85`,
                          color: '#ffffff',
                          boxShadow: `0 4px 14px ${animeColor}35`,
                        }}
                      >
                        <span className="text-xs leading-none">{animeEmoji}</span>
                        <span className="tracking-wide drop-shadow-sm">{animeTitle}</span>
                      </div>

                      {/* Badge de Status de Avaliação no canto superior direito */}
                      {reviewStatus && (
                        <div
                          className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider backdrop-blur-md border shadow-md ${
                            reviewStatus === 'good'
                              ? 'bg-emerald-500/30 border-emerald-400/70 text-emerald-200'
                              : 'bg-rose-500/30 border-rose-400/70 text-rose-200'
                          }`}
                        >
                          {reviewStatus === 'good' ? 'Boa' : 'Ruim'}
                        </div>
                      )}
                    </div>

                    {/* Informações da Cena e Botões de Avaliação */}
                    <div className="p-3.5 flex flex-col flex-1 justify-between gap-3 bg-[#0c1427]">
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

                      {/* Barra de Ações: Marcar como Boa / Ruim + Link Direto */}
                      <div className="pt-2.5 border-t border-[#172238] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleToggleReview(challenge.id, 'good')}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all active:scale-95 ${
                              reviewStatus === 'good'
                                ? 'bg-emerald-500 text-black border-emerald-400 shadow-sm'
                                : 'bg-[#111c35] text-slate-400 border-[#1e2f52] hover:text-emerald-300 hover:border-emerald-500/40'
                            }`}
                            title="Marcar cena como Boa"
                          >
                            <ThumbsUp size={12} />
                            <span>Boa</span>
                          </button>

                          <button
                            onClick={() => handleToggleReview(challenge.id, 'bad')}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all active:scale-95 ${
                              reviewStatus === 'bad'
                                ? 'bg-rose-500 text-white border-rose-400 shadow-sm'
                                : 'bg-[#111c35] text-slate-400 border-[#1e2f52] hover:text-rose-300 hover:border-rose-500/40'
                            }`}
                            title="Marcar cena como Ruim"
                          >
                            <ThumbsDown size={12} />
                            <span>Ruim</span>
                          </button>
                        </div>

                        <a
                          href={challenge.videoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-slate-400 hover:text-amber-300 font-medium flex items-center gap-1 transition-colors"
                          title={challenge.videoUrl}
                        >
                          <span>Arquivo</span>
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
