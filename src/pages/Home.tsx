import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import {
  AVAILABLE_ANIMES,
  COLLECTION_ANIMES,
  COMING_SOON_ANIMES,
  ALL_GENRES,
  AnimeGenre,
  AnimeEntry,
} from '../data/animes/animeRegistry';
import { ANIMES_CONFIG } from '../data/animes/config';

// ── Filtros de seção ────────────────────────────────────────────────────
type SectionToggle = { available: boolean; colecoes: boolean; comingSoon: boolean };

// ── Card individual padronizado ─────────────────────────────────────────
interface AnimeCardProps {
  anime: AnimeEntry;
  onClick: () => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onClick }) => {
  const cardWebp = `/cards/${anime.slug}.webp`;
  const cardPng = `/cards/${anime.slug}.png`;
  const isComingSoon = !anime.implemented;

  return (
    <div
      className="flex flex-col items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
      onClick={onClick}
    >
      {/* Moldura do card: proporção 2:3 padrão (1024x1536), moldura 100% visível sem cortes */}
      <div className="relative w-full aspect-[2/3] overflow-hidden rounded-2xl shadow-xl transition-all duration-300 ease-out group-hover:scale-[1.05] group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.8)] group-hover:ring-2 group-hover:ring-amber-400/60">
        <picture>
          <source srcSet={cardWebp} type="image/webp" />
          <img
            src={cardPng}
            alt={anime.name}
            className="w-full h-full object-contain object-center block"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.opacity = '0.3';
            }}
          />
        </picture>

        {/* Badge "Em Breve" estilizada */}
        {isComingSoon && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 backdrop-blur-[0.5px]">
            <span className="bg-amber-500 text-black text-[11px] sm:text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-xl">
              Em Breve
            </span>
          </div>
        )}

        {/* Badge "Coleção" */}
        {anime.type === 'colecao' && anime.implemented && (
          <div className="absolute top-2.5 right-2.5">
            <span className="bg-purple-600/95 text-white text-[11px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-full shadow-lg">
              Coleção
            </span>
          </div>
        )}
      </div>

      {/* Nome do anime: fonte Outfit estilosa, tamanho ampliado e contraste impecável */}
      <span className="text-center font-['Outfit',sans-serif] text-sm sm:text-base md:text-[17px] font-bold text-slate-100 leading-snug px-1 group-hover:text-amber-300 transition-colors duration-200 tracking-wide drop-shadow-sm">
        {anime.name}
      </span>
    </div>
  );
};

// ── Grid de cards com largura ampliada ───────────────────────────────────
interface AnimeGridProps {
  animes: AnimeEntry[];
  onSelect: (slug: string) => void;
}

const AnimeGrid: React.FC<AnimeGridProps> = ({ animes, onSelect }) => {
  if (animes.length === 0) {
    return (
      <p className="text-slate-500 text-sm text-center py-8">
        Nenhum anime encontrado para este filtro.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-7">
      {animes.map(anime => (
        <AnimeCard key={anime.slug} anime={anime} onClick={() => onSelect(anime.slug)} />
      ))}
    </div>
  );
};

// ── Carrossel "Continue Jogando" (Exibe 3 logos com animação clean) ─────
interface ContinuePlayingCarouselProps {
  animes: AnimeEntry[];
  onSelect: (slug: string) => void;
}

const ContinuePlayingCarousel: React.FC<ContinuePlayingCarouselProps> = ({ animes, onSelect }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(animes.length / itemsPerPage);

  const safePage = Math.min(currentPage, Math.max(0, totalPages - 1));

  const visibleAnimes = useMemo(() => {
    const start = safePage * itemsPerPage;
    return animes.slice(start, start + itemsPerPage);
  }, [animes, safePage]);

  const handlePrev = () => {
    setCurrentPage(prev => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  if (animes.length === 0) return null;

  return (
    <div className="mb-10 p-4 sm:p-6 rounded-3xl bg-[#090e1c]/80 border border-amber-500/25 backdrop-blur-md shadow-2xl">
      {/* Cabeçalho da seção com título e botões de navegação */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <span className="text-2xl select-none">⚡</span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2">
            <span>Continue Jogando</span>
            <span className="text-xs sm:text-sm font-bold text-slate-400 bg-[#0d1426] border border-[#202b43] px-2.5 py-0.5 rounded-full">
              {animes.length}
            </span>
          </h2>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Página anterior"
              className="p-2 rounded-xl bg-[#0d1426] hover:bg-[#16223d] border border-[#202b43] hover:border-amber-400/50 text-slate-300 hover:text-white transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-xs font-bold text-slate-400 px-1 select-none">
              {safePage + 1} / {totalPages}
            </span>
            <button
              onClick={handleNext}
              aria-label="Próxima página"
              className="p-2 rounded-xl bg-[#0d1426] hover:bg-[#16223d] border border-[#202b43] hover:border-amber-400/50 text-slate-300 hover:text-white transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Grid de 3 cards com animação clean */}
      <div
        key={safePage}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-in fade-in zoom-in-95 duration-300"
      >
        {visibleAnimes.map((anime) => {
          const logoWebp = `/logos/${anime.slug}.webp`;
          const logoPng = `/logos/${anime.slug}.png`;

          return (
            <div
              key={anime.slug}
              onClick={() => onSelect(anime.slug)}
              className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#0f172a]/95 via-[#0b1222]/90 to-[#070b16] border border-[#202b43] hover:border-amber-400/60 shadow-xl hover:shadow-[0_16px_36px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer overflow-hidden backdrop-blur-md"
            >
              {/* Efeito de brilho no topo do card ao passar o mouse */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400/0 group-hover:via-amber-400/70 to-transparent transition-all duration-500" />

              {/* Tag superior de status */}
              <div className="flex items-center justify-between w-full mb-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping inline-block" />
                  Em Progresso
                </span>
                <span className="text-lg select-none group-hover:scale-110 transition-transform">
                  {ANIMES_CONFIG[anime.slug]?.banner || '⚡'}
                </span>
              </div>

              {/* Centro: Logo oficial do anime em alta definição com animação clean */}
              <div className="h-24 sm:h-28 flex items-center justify-center my-3 w-full px-2">
                <picture className="max-h-full max-w-full flex items-center justify-center">
                  <source srcSet={logoWebp} type="image/webp" />
                  <img
                    src={logoPng}
                    alt={anime.name}
                    className="max-h-24 sm:max-h-28 w-auto max-w-[220px] object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.opacity = '0.4';
                    }}
                  />
                </picture>
              </div>

              {/* Rodapé: Título e Botão de Continuar */}
              <div className="w-full mt-2 flex flex-col items-center">
                <p className="font-['Outfit',sans-serif] text-sm sm:text-base font-extrabold text-white group-hover:text-amber-300 transition-colors text-center truncate w-full mb-3">
                  {anime.name}
                </p>
                <button
                  className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 group-hover:from-amber-400 group-hover:to-amber-500 text-black font-black text-xs sm:text-sm tracking-wide shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
                >
                  <Play size={14} className="fill-black" />
                  <span>Continuar Jogo</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pontinhos indicadores (Dots) */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              aria-label={`Ir para página ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === safePage
                  ? 'w-6 bg-amber-400 shadow-sm shadow-amber-400/50'
                  : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ── Seção colapsável ─────────────────────────────────────────────────────
interface SectionProps {
  title: string;
  count: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
  icon?: string;
}

const Section: React.FC<SectionProps> = ({
  title,
  count,
  children,
  defaultOpen = true,
  isOpen,
  onToggle,
  icon,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isOpen !== undefined ? isOpen : internalOpen;

  const handleToggle = () => {
    if (onToggle) {
      onToggle(!open);
    } else {
      setInternalOpen(o => !o);
    }
  };

  return (
    <div className="mb-12">
      <button
        className="flex items-center gap-3 mb-6 w-full text-left group"
        onClick={handleToggle}
      >
        {icon && <span className="text-2xl">{icon}</span>}
        <h2 className="text-xl sm:text-2xl font-black text-slate-100 group-hover:text-amber-300 transition-colors tracking-tight">
          {title}
        </h2>
        <span className="text-xs sm:text-sm font-bold text-slate-400 bg-[#0d1426] border border-[#202b43] px-2.5 py-0.5 rounded-full">
          {count}
        </span>
        <span className="ml-auto text-slate-500 group-hover:text-amber-400 transition-colors">
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>

      {open && (
        <div className="animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
};

// ── Página Home ──────────────────────────────────────────────────────────
export const Home: React.FC = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeGenre, setActiveGenre] = useState<AnimeGenre | null>(null);
  const [sectionToggles, setSectionToggles] = useState<SectionToggle>({
    available: true,
    colecoes: true,
    comingSoon: true,
  });

  // Estado da aba "Em Breve" salvo no sessionStorage (recolhida por padrão se nunca aberta)
  const [isComingSoonOpen, setIsComingSoonOpen] = useState<boolean>(() => {
    return sessionStorage.getItem('animedle_coming_soon_open') === 'true';
  });

  const handleToggleComingSoon = (open: boolean) => {
    setIsComingSoonOpen(open);
    sessionStorage.setItem('animedle_coming_soon_open', String(open));
  };

  // Restaura favicon para o site e restaura scroll quando voltando de um card
  useEffect(() => {
    // 1. Redefine o favicon para o logo principal do site AnimeDLE
    const faviconLink: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    if (faviconLink) {
      faviconLink.href = '/favicon.png';
    }

    // 2. Restaura o scroll para a posição exata se o usuário tiver navegado a partir da home
    const savedScroll = sessionStorage.getItem('animedle_home_scroll');
    if (savedScroll !== null) {
      const targetY = parseInt(savedScroll, 10);
      requestAnimationFrame(() => {
        window.scrollTo({ top: targetY, behavior: 'instant' });
      });
      const timer = setTimeout(() => {
        window.scrollTo({ top: targetY, behavior: 'instant' });
        sessionStorage.removeItem('animedle_home_scroll');
      }, 50);
      return () => clearTimeout(timer);
    }
  }, []);

  const toggleSection = (key: keyof SectionToggle) => {
    setSectionToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelect = (slug: string) => {
    try {
      const raw = localStorage.getItem('animedle_recent_animes');
      let recents: string[] = raw ? JSON.parse(raw) : [];
      recents = [slug, ...recents.filter(s => s !== slug)].slice(0, 10);
      localStorage.setItem('animedle_recent_animes', JSON.stringify(recents));
    } catch {}
    // Salva a posição exata do scroll da home antes de navegar
    sessionStorage.setItem('animedle_home_scroll', window.scrollY.toString());
    navigate(`/${slug}`);
  };

  // ── Continue Jogando: Animes recentemente jogados ou com progresso ativo ──
  const continuePlayingList = useMemo(() => {
    try {
      const recentSlugsRaw = localStorage.getItem('animedle_recent_animes');
      let recentSlugs: string[] = recentSlugsRaw ? JSON.parse(recentSlugsRaw) : [];

      const today = new Date().toISOString().split('T')[0];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('animedle_progress_') && key.includes(today)) {
          const match = key.match(/^animedle_progress_([a-z0-9-]+)_/);
          if (match && match[1] && !recentSlugs.includes(match[1])) {
            recentSlugs.unshift(match[1]);
          }
        }
      }

      const allImplemented = [...AVAILABLE_ANIMES, ...COLLECTION_ANIMES];
      return recentSlugs
        .map(slug => allImplemented.find((a: AnimeEntry) => a.slug === slug))
        .filter((a): a is AnimeEntry => Boolean(a))
        .slice(0, 5);
    } catch {
      return [];
    }
  }, []);

  // ── Filtragem ──────────────────────────────────────────────────────────
  const filterAnimes = (list: AnimeEntry[]) => {
    return list.filter(anime => {
      const matchesSearch = searchQuery.trim() === '' ||
        anime.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = activeGenre === null || anime.genre === activeGenre;
      return matchesSearch && matchesGenre;
    });
  };

  const filteredAvailable = useMemo(
    () => sectionToggles.available ? filterAnimes(AVAILABLE_ANIMES) : [],
    [searchQuery, activeGenre, sectionToggles.available]
  );

  const filteredColecoes = useMemo(
    () => sectionToggles.colecoes ? filterAnimes(COLLECTION_ANIMES) : [],
    [searchQuery, activeGenre, sectionToggles.colecoes]
  );

  const filteredComingSoon = useMemo(
    () => sectionToggles.comingSoon ? filterAnimes(COMING_SOON_ANIMES) : [],
    [searchQuery, activeGenre, sectionToggles.comingSoon]
  );

  const hasResults =
    filteredAvailable.length > 0 ||
    filteredColecoes.length > 0 ||
    filteredComingSoon.length > 0;

  return (
    <div className="min-h-screen bg-[#060b18] relative overflow-x-hidden">
      {/* ── Banner atmosférico atrás da Logo Principal ─────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-[480px] sm:h-[580px] pointer-events-none z-0 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-35"
          style={{ backgroundImage: `url(/home-banner.png)` }}
        />
        {/* Gradiente cinematográfico suave fundindo com o azul escuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060b18]/20 via-[#060b18]/50 to-[#060b18]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#060b18_100%)] opacity-70" />
      </div>

      {/* ── Header com Logo em destaque ampliado ──────────────────────── */}
      <header className="relative z-10 flex flex-col items-center pt-10 sm:pt-14 pb-10 px-4">
        <div className="flex flex-col items-center gap-4 mb-8">
          <img
            src="/logo-main.png"
            alt="AnimeDle Logo"
            className="h-32 sm:h-44 md:h-56 w-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.8)] hover:scale-[1.03] transition-transform duration-300"
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Anime<span className="text-amber-400">Dle</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base text-center max-w-lg leading-relaxed">
            Adivinhe o personagem do seu anime favorito. Escolha uma obra e teste seus conhecimentos!
          </p>
        </div>

        {/* ── Barra de pesquisa ampliada ───────────────────────────────── */}
        <div className="w-full max-w-2xl relative mb-5">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Pesquisar anime..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#0d1426] border border-[#202b43] text-slate-100 placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 transition-all shadow-inner"
          />
        </div>

        {/* ── Filtros de gênero ─────────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button
            onClick={() => setActiveGenre(null)}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
              activeGenre === null
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25'
                : 'bg-[#0d1426] text-slate-300 border border-[#202b43] hover:border-amber-500/50 hover:text-amber-300'
            }`}
          >
            Todos
          </button>
          {ALL_GENRES.map(genre => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre === activeGenre ? null : genre)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeGenre === genre
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25'
                  : 'bg-[#0d1426] text-slate-300 border border-[#202b43] hover:border-amber-500/50 hover:text-amber-300'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* ── Toggles de seção ─────────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm text-slate-400">
          <span className="self-center font-bold">Buscar em:</span>
          {(
            [
              { key: 'available' as const, label: '🎮 Disponíveis' },
              { key: 'colecoes' as const, label: '🗂️ Coleções' },
              { key: 'comingSoon' as const, label: '🔜 Em Breve' },
            ] as const
          ).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => toggleSection(key)}
              className={`px-3.5 py-1 rounded-full border text-xs sm:text-sm font-bold transition-all duration-200 ${
                sectionToggles[key]
                  ? 'border-amber-500/60 text-amber-300 bg-amber-500/10 shadow-sm'
                  : 'border-slate-800 text-slate-600 bg-transparent hover:text-slate-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      {/* ── Conteúdo principal ampliado (max-w-[1650px]) ─────────────── */}
      <main className="relative z-10 max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-10 pb-28">
        {!hasResults && (
          <p className="text-slate-500 text-center py-20 text-base">
            Nenhum anime encontrado para "{searchQuery}".
          </p>
        )}

        {/* Continue Jogando: Carrossel com 3 logos oficiais e animação clean */}
        {continuePlayingList.length > 0 && searchQuery.trim() === '' && activeGenre === null && (
          <ContinuePlayingCarousel animes={continuePlayingList} onSelect={handleSelect} />
        )}

        {/* Disponíveis */}
        {sectionToggles.available && (
          <Section
            title="Disponíveis"
            count={filteredAvailable.length}
            icon="🎮"
            defaultOpen={true}
          >
            <AnimeGrid animes={filteredAvailable} onSelect={handleSelect} />
          </Section>
        )}

        {/* Coleções */}
        {sectionToggles.colecoes && (
          <Section
            title="Coleções"
            count={filteredColecoes.length}
            icon="🗂️"
            defaultOpen={true}
          >
            <AnimeGrid animes={filteredColecoes} onSelect={handleSelect} />
          </Section>
        )}

        {/* Em Breve — estado sincronizado com sessionStorage para preservar scroll e abertura */}
        {sectionToggles.comingSoon && (
          <Section
            title="Em Breve"
            count={filteredComingSoon.length}
            icon="🔜"
            isOpen={isComingSoonOpen}
            onToggle={handleToggleComingSoon}
          >
            <AnimeGrid animes={filteredComingSoon} onSelect={handleSelect} />
          </Section>
        )}
      </main>
    </div>
  );
};
