import React, { useState, useMemo } from 'react';
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

// ── Card individual ─────────────────────────────────────────────────────
interface AnimeCardProps {
  anime: AnimeEntry;
  onClick: () => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onClick }) => {
  const cardSrc = `/cards/${anime.slug}.png`;
  const isComingSoon = !anime.implemented;

  return (
    <div
      className="flex flex-col items-center gap-2 cursor-pointer group"
      onClick={onClick}
    >
      {/* Imagem do card */}
      <div className="relative w-full overflow-hidden rounded-xl shadow-xl transition-transform duration-300 ease-out group-hover:scale-[1.04] group-hover:shadow-2xl">
        <img
          src={cardSrc}
          alt={anime.name}
          className="w-full h-auto object-cover block"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.opacity = '0.3';
          }}
        />

        {/* Badge "Em Breve" */}
        {isComingSoon && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 rounded-xl">
            <span className="bg-amber-500 text-black text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg">
              Em Breve
            </span>
          </div>
        )}

        {/* Badge "Coleção" */}
        {anime.type === 'colecao' && anime.implemented && (
          <div className="absolute top-2 right-2">
            <span className="bg-purple-600/90 text-white text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full">
              Coleção
            </span>
          </div>
        )}
      </div>

      {/* Nome do anime */}
      <span className="text-center text-xs sm:text-sm font-semibold text-slate-200 leading-tight px-1 group-hover:text-amber-300 transition-colors duration-200">
        {anime.name}
      </span>
    </div>
  );
};

// ── Grid de cards ────────────────────────────────────────────────────────
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
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-5 gap-4 sm:gap-5">
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
  icon?: string;
}

const Section: React.FC<SectionProps> = ({ title, count, children, defaultOpen = true, icon }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-10">
      <button
        className="flex items-center gap-3 mb-5 w-full text-left group"
        onClick={() => setOpen(o => !o)}
      >
        {icon && <span className="text-xl">{icon}</span>}
        <h2 className="text-lg sm:text-xl font-black text-slate-100 group-hover:text-amber-300 transition-colors">
          {title}
        </h2>
        <span className="text-sm font-semibold text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">
          {count}
        </span>
        <span className="ml-auto text-slate-500 group-hover:text-amber-400 transition-colors">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
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

  const toggleSection = (key: keyof SectionToggle) => {
    setSectionToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelect = (slug: string) => {
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
    <div className="min-h-screen bg-[#060b18]">
      {/* ── Header ────────────────────────────────────────────────────── */}
      <header className="flex flex-col items-center pt-12 pb-8 px-4">
        <div className="flex flex-col items-center gap-3 mb-6">
          <img
            src="/logo-main.png"
            alt="AnimeDle"
            className="h-16 sm:h-20 w-auto object-contain"
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Anime<span className="text-amber-400">Dle</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base text-center max-w-md leading-relaxed">
            Adivinhe o personagem do seu anime favorito. Escolha uma obra e teste seus conhecimentos!
          </p>
        </div>

        {/* ── Barra de pesquisa ────────────────────────────────────────── */}
        <div className="w-full max-w-xl relative mb-4">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Pesquisar anime..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#0d1426] border border-[#202b43] text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all"
          />
        </div>

        {/* ── Filtros de gênero ─────────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-2 mb-3">
          <button
            onClick={() => setActiveGenre(null)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
              activeGenre === null
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'bg-[#0d1426] text-slate-300 border border-[#202b43] hover:border-amber-500/50 hover:text-amber-300'
            }`}
          >
            Todos
          </button>
          {ALL_GENRES.map(genre => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre === activeGenre ? null : genre)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                activeGenre === genre
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'bg-[#0d1426] text-slate-300 border border-[#202b43] hover:border-amber-500/50 hover:text-amber-300'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* ── Toggles de seção ─────────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-400">
          <span className="self-center font-semibold">Buscar em:</span>
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
              className={`px-3 py-1 rounded-full border text-xs font-semibold transition-all duration-200 ${
                sectionToggles[key]
                  ? 'border-amber-500/60 text-amber-300 bg-amber-500/10'
                  : 'border-slate-700 text-slate-600 bg-transparent'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      {/* ── Conteúdo principal ────────────────────────────────────────── */}
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 pb-20">
        {!hasResults && (
          <p className="text-slate-500 text-center py-16 text-sm">
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

        {/* Em Breve — recolhido por padrão */}
        {sectionToggles.comingSoon && (
          <Section
            title="Em Breve"
            count={filteredComingSoon.length}
            icon="🔜"
            defaultOpen={false}
          >
            <AnimeGrid animes={filteredComingSoon} onSelect={handleSelect} />
          </Section>
        )}
      </main>
    </div>
  );
};
