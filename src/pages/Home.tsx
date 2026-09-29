import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import {
  AVAILABLE_ANIMES,
  COLLECTION_ANIMES,
  COMING_SOON_ANIMES,
  ALL_GENRES,
  AnimeGenre,
  AnimeEntry,
} from '../data/animes/animeRegistry';

// ── Filtros de seção ────────────────────────────────────────────────────
type SectionToggle = { available: boolean; colecoes: boolean; comingSoon: boolean };

// ── Card individual padronizado ─────────────────────────────────────────
interface AnimeCardProps {
  anime: AnimeEntry;
  onClick: () => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onClick }) => {
  const cardSrc = `/cards/${anime.slug}.png`;
  const isComingSoon = !anime.implemented;

  return (
    <div
      className="flex flex-col items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
      onClick={onClick}
    >
      {/* Moldura do card: proporção 2:3 padrão (1024x1536), moldura 100% visível sem cortes */}
      <div className="relative w-full aspect-[2/3] overflow-hidden rounded-2xl shadow-xl transition-all duration-300 ease-out group-hover:scale-[1.05] group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.8)] group-hover:ring-2 group-hover:ring-amber-400/60">
        <img
          src={cardSrc}
          alt={anime.name}
          className="w-full h-full object-contain object-center block"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.opacity = '0.3';
          }}
        />

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

      {/* Nome do anime com ícone oficial quando disponível */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 px-1 text-center">
        {anime.implemented && (
          <img
            src={`/icons/${anime.slug}.png`}
            alt=""
            className="w-4 h-4 sm:w-5 sm:h-5 object-contain flex-shrink-0 drop-shadow"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
        )}
        <span className="font-['Outfit',sans-serif] text-sm sm:text-base md:text-[17px] font-bold text-slate-100 leading-snug group-hover:text-amber-300 transition-colors duration-200 tracking-wide drop-shadow-sm">
          {anime.name}
        </span>
      </div>
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
    // Salva a posição exata do scroll da home antes de navegar
    sessionStorage.setItem('animedle_home_scroll', window.scrollY.toString());
    navigate(`/${slug}`);
  };

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
