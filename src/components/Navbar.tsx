import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, BarChart2, ChevronDown, RotateCcw, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ANIMES_CONFIG } from '../data/animes/config';

interface NavbarProps {
  currentAnimeSlug: string;
  onSelectAnime: (slug: string) => void;
  onOpenHowToPlay: () => void;
  onOpenStats: () => void;
  onResetDaily?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentAnimeSlug,
  onSelectAnime,
  onOpenHowToPlay,
  onOpenStats,
  onResetDaily,
}) => {
  const currentAnime = ANIMES_CONFIG[currentAnimeSlug] || ANIMES_CONFIG['demon-slayer'];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o menu suspenso com segurança ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Pré-carrega todas as logos dos animes em memória para troca 100% instantânea sem delay
  useEffect(() => {
    Object.values(ANIMES_CONFIG).forEach((anime) => {
      if (anime.logo) {
        const img = new Image();
        img.src = anime.logo;
      }
    });
  }, []);

  // Atualiza o favicon dinamicamente com base no anime selecionado
  useEffect(() => {
    const logoUrl = currentAnime.logo || '/logo-demon-slayer.png';
    const faviconLink: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    if (faviconLink) {
      faviconLink.href = logoUrl;
    }
  }, [currentAnime]);

  return (
    <header className="sticky top-0 z-40 bg-[#0d1426]/90 backdrop-blur-xl border-b border-[#202b43]">
      <div className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto h-16 flex items-center justify-between">
        
        {/* Lado Esquerdo: Logo & Anime Selector */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 cursor-pointer select-none">
            <div className="relative w-9 h-9 flex items-center justify-center flex-shrink-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentAnime.slug}
                  src={currentAnime.logo || '/logo-demon-slayer.png'}
                  alt={`${currentAnime.title} Logo`}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="w-9 h-9 object-contain drop-shadow-md absolute inset-0"
                />
              </AnimatePresence>
            </div>
            <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-0.5">
              Anime
              <motion.span
                key={currentAnime.slug}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{ color: currentAnime.themeColor }}
              >
                DLE
              </motion.span>
            </h1>
          </div>

          <div className="h-5 w-[1px] bg-[#202b43] hidden sm:block" />

          {/* Selector de Anime Robusto (Clique em vez de Hover Frágil) */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 bg-[#111a2d] hover:bg-[#16223b] border border-[#202b43] hover:border-slate-600 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all shadow-sm active:scale-95"
            >
              <span className="flex items-center gap-1.5">
                <span className="text-sm">{currentAnime.banner}</span>
                <span className="font-bold text-slate-100">{currentAnime.title}</span>
              </span>
              <ChevronDown
                size={14}
                className={`text-slate-400 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180 text-white' : ''
                }`}
              />
            </button>

            {/* Menu Suspenso Estável */}
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-[#0d1426] border border-[#202b43] rounded-2xl shadow-2xl overflow-hidden z-50 animate-fadeIn flex flex-col max-h-[75vh]">
                {/* Cabeçalho fixo no topo do dropdown - nunca rola */}
                <div className="px-3.5 py-2.5 text-[10px] font-extrabold tracking-wider text-slate-400 uppercase border-b border-[#202b43]/60 bg-[#0d1426] flex-shrink-0 select-none">
                  Selecione o Anime
                </div>
                {/* Lista de animes com rolagem isolada */}
                <div className="overflow-y-auto custom-scrollbar py-1 flex-1">
                  {Object.values(ANIMES_CONFIG).map((anime) => {
                    const isAvailable = anime.slug === 'demon-slayer' || anime.slug === 'jujutsu-kaisen' || anime.slug === 'one-piece' || anime.slug === 'naruto' || anime.slug === 'solo-leveling' || anime.slug === 'record-of-ragnarok' || anime.slug === 'blue-lock' || anime.slug === 'bleach' || anime.slug === 'dragon-ball' || anime.slug === 'jojos-bizarre-adventure' || anime.slug === 'dandadan' || anime.slug === 'tensei-shitara-slime-datta-ken' || anime.slug === 'attack-on-titan';
                    const isSelected = anime.slug === currentAnimeSlug;

                    return (
                      <button
                        key={anime.slug}
                        onClick={() => {
                          if (isAvailable) {
                            onSelectAnime(anime.slug);
                            setIsDropdownOpen(false);
                          }
                        }}
                        style={
                          isSelected
                            ? {
                                backgroundColor: `${anime.themeColor}20`,
                                color: anime.themeColor,
                                borderLeft: `3px solid ${anime.themeColor}`,
                              }
                            : undefined
                        }
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-all ${
                          isSelected
                            ? 'font-bold'
                            : isAvailable
                            ? 'text-slate-300 hover:bg-[#111a2d]'
                            : 'text-slate-500 cursor-not-allowed opacity-60'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-base">{anime.banner}</span>
                          <span className="font-semibold">{anime.title}</span>
                        </span>
                        {!isAvailable && (
                          <span className="text-[9px] bg-[#111a2d] text-slate-400 border border-[#202b43] px-2 py-0.5 rounded-full font-medium">
                            Em breve
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lado Direito: Ações */}
        <div className="flex items-center gap-2">
          {onResetDaily && (
            <button
              onClick={onResetDaily}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold transition-all shadow-sm active:scale-95"
              title="Resetar progresso do dia atual e sortear novo personagem (Modo Dev)"
            >
              <RotateCcw size={14} />
              <span className="hidden sm:inline">Resetar (Dev)</span>
            </button>
          )}

          <button
            onClick={onOpenHowToPlay}
            className="p-2 rounded-xl bg-[#111a2d] hover:bg-[#16223b] border border-[#202b43] hover:border-slate-600 text-slate-300 hover:text-white transition-all shadow-sm"
            title="Como Jogar"
          >
            <HelpCircle size={18} />
          </button>
          <button
            onClick={onOpenStats}
            className="p-2 rounded-xl bg-[#111a2d] hover:bg-[#16223b] border border-[#202b43] hover:border-slate-600 text-slate-300 hover:text-white transition-all shadow-sm"
            title="Estatísticas"
          >
            <BarChart2 size={18} />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
