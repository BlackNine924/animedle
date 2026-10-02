import React from 'react';
import { GameMode } from '../types/anime';
import { Grid, Eye, MessageSquare, Zap, ZoomIn, Infinity as InfinityIcon, LayoutGrid } from 'lucide-react';

interface GameModeTabsProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  themeColor?: string;
  currentAnimeSlug?: string;
}

const ALLOWED_QUOTE_ABILITY_ANIMES = ['one-piece', 'naruto', 'demon-slayer', 'jujutsu-kaisen', 'bleach'];

export const GameModeTabs: React.FC<GameModeTabsProps> = ({
  currentMode,
  onSelectMode,
  themeColor = '#dc2626',
  currentAnimeSlug = '',
}) => {
  const hasQuoteAndAbility = ALLOWED_QUOTE_ABILITY_ANIMES.includes(currentAnimeSlug);

  const isExclusiveAbility = currentAnimeSlug === 'jujutsu-kaisen' || currentAnimeSlug === 'bleach';

  const abilityLabel =
    currentAnimeSlug === 'naruto'
      ? 'Jutsus'
      : currentAnimeSlug === 'one-piece'
      ? 'Akuma no Mi'
      : currentAnimeSlug === 'demon-slayer'
      ? 'Respirações'
      : currentAnimeSlug === 'jujutsu-kaisen'
      ? 'Técnicas & Domínios'
      : currentAnimeSlug === 'bleach'
      ? 'BankaiDLE'
      : 'Habilidade';

  const modes: { id: GameMode; label: string; icon: React.ReactNode; isExclusive?: boolean }[] = [
    { id: 'classic', label: 'Clássico', icon: <Grid size={15} /> },
    { id: 'wanted', label: 'Procurado', icon: <Eye size={15} /> },
    ...(hasQuoteAndAbility
      ? [
          { id: 'quote' as GameMode, label: 'Citação', icon: <MessageSquare size={15} /> },
          { id: 'ability' as GameMode, label: abilityLabel, icon: <Zap size={15} />, isExclusive: isExclusiveAbility },
        ]
      : []),
    { id: 'zoom', label: 'Zoom', icon: <ZoomIn size={15} /> },
    { id: 'grid', label: 'Grid 3×3', icon: <LayoutGrid size={15} /> },
    { id: 'endless', label: 'Infinito', icon: <InfinityIcon size={15} /> },
  ];

  const gridColsClass = modes.length === 5 ? 'grid-cols-5 max-w-2xl' : modes.length === 7 ? 'grid-cols-7 max-w-4xl' : 'grid-cols-6 max-w-3xl';

  return (
    <div className={`flex items-center justify-center p-1.5 bg-[#0d1426] border border-[#202b43] rounded-2xl mx-auto my-6 shadow-lg shadow-black/20 ${modes.length === 4 ? 'max-w-xl' : 'max-w-3xl'}`}>
      <div className={`grid ${gridColsClass} gap-1 w-full`}>
        {modes.map((mode) => {
          const isActive = currentMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => onSelectMode(mode.id)}
              style={
                isActive
                  ? {
                      backgroundColor: `${themeColor}25`,
                      borderColor: `${themeColor}80`,
                      color: '#ffffff',
                      boxShadow: `0 4px 12px ${themeColor}20`,
                    }
                  : undefined
              }
              className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all duration-200 relative select-none ${
                isActive
                  ? 'border'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#111a2d]/80 border border-transparent'
              }`}
            >
              <span style={isActive ? { color: themeColor } : undefined} className={isActive ? '' : 'text-slate-400'}>
                {mode.icon}
              </span>
              <span className="hidden md:inline tracking-tight">{mode.label}</span>
              {mode.isExclusive && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full tracking-wider shadow-md pointer-events-none whitespace-nowrap">
                  Exclusivo
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
