import React from 'react';
import { GameMode } from '../types/anime';
import { Grid, Eye, MessageSquare, Zap, ZoomIn, Infinity as InfinityIcon } from 'lucide-react';

interface GameModeTabsProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  themeColor?: string;
  currentAnimeSlug?: string;
}

export const GameModeTabs: React.FC<GameModeTabsProps> = ({ currentMode, onSelectMode, themeColor = '#dc2626', currentAnimeSlug }) => {
  const abilityLabel = currentAnimeSlug === 'naruto' ? 'Jutsus' : currentAnimeSlug === 'jojos-bizarre-adventure' ? 'Stands' : currentAnimeSlug === 'dandadan' ? 'Poderes' : currentAnimeSlug === 'tensei-shitara-slime-datta-ken' ? 'Skills' : currentAnimeSlug === 'attack-on-titan' ? 'Titãs' : (currentAnimeSlug === 'black-clover' || currentAnimeSlug === 'fairy-tail') ? 'Magias' : currentAnimeSlug === 'berserk' ? 'Armas & Poderes' : currentAnimeSlug === 'chainsaw-man' ? 'Contratos & Demônios' : 'Habilidade';

  let modes: { id: GameMode; label: string; icon: React.ReactNode }[] = [
    { id: 'classic', label: 'Clássico', icon: <Grid size={15} /> },
    { id: 'wanted', label: 'Procurado', icon: <Eye size={15} /> },
    { id: 'quote', label: 'Citação', icon: <MessageSquare size={15} /> },
    { id: 'ability', label: abilityLabel, icon: <Zap size={15} /> },
    { id: 'zoom', label: 'Zoom', icon: <ZoomIn size={15} /> },
    { id: 'endless', label: 'Treino', icon: <InfinityIcon size={15} /> },
  ];

  if (currentAnimeSlug === 'solo-leveling' || currentAnimeSlug === 'blue-lock') {
    modes = modes.filter((m) => m.id !== 'quote' && m.id !== 'ability');
  }

  const gridColsClass = modes.length === 4 ? 'grid-cols-4 max-w-xl' : 'grid-cols-6 max-w-3xl';

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
            </button>
          );
        })}
      </div>
    </div>
  );
};
