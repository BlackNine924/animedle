import React from 'react';
import { GameMode } from '../types/anime';
import { Grid, Eye, MessageSquare, Zap, ZoomIn, Infinity as InfinityIcon, LayoutGrid } from 'lucide-react';

interface GameModeTabsProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  themeColor?: string;
  currentAnimeSlug?: string;
}

const EXCLUSIVE_LABELS: Record<string, string> = {
  'one-piece': 'Akuma no Mi',
  'dragon-ball': 'Fusões & Formas',
  'bleach': 'BankaiDLE',
  'jujutsu-kaisen': 'Técnicas & Domínios',
  'naruto': 'Pergaminho Ninja',
  'demon-slayer': 'Respirações',
  'attack-on-titan': 'Memórias Titãs',
  'hunter-x-hunter': 'Regras do Nen',
  'chainsaw-man': 'MedoDLE',
  'solo-leveling': 'Sombras',
  'my-hero-academia': 'Individualidades',
  'black-clover': 'Grimório',
  'blue-lock': 'Fórmula do Gol',
  'dandadan': 'Arquivo Oculto',
  'fairy-tail': 'GuildaDLE',
  'frieren': 'Grimório',
  'fullmetal-alchemist': 'Troca Equivalente',
  'haikyuu': 'RallyDLE',
  'jojos-bizarre-adventure': 'StandLab',
  'kaiju-no-8': 'Alarme Kaiju',
  'nanatsu-no-taizai': 'Pecados',
  'one-punch-man': 'Heróis & Ameaças',
  'record-of-ragnarok': 'VölundrDLE',
  'romance': 'Confissões',
  'shangri-la-frontier': 'Diário de Raid',
  'sword-art-online': 'Sword Skills',
  'tensei-shitara-slime-datta-ken': 'Evolução',
  'tokyo-ghoul': 'Dossiê Ghoul',
  'witch-hat-atelier': 'Glifos',
  'berserk': 'Brasões',
  'cyberpunk-edgerunners': 'Edgerunners',
  'akame-ga-kill': 'TeiguDLE',
};

const ANIMES_WITH_QUOTE = [
  'one-piece',
  'naruto',
  'demon-slayer',
  'jujutsu-kaisen',
  'bleach',
  'dragon-ball',
  'attack-on-titan',
  'hunter-x-hunter',
  'chainsaw-man',
  'frieren',
  'fullmetal-alchemist',
  'romance',
  'solo-leveling',
  'my-hero-academia',
  'tokyo-ghoul',
  'berserk',
];

export const GameModeTabs: React.FC<GameModeTabsProps> = ({
  currentMode,
  onSelectMode,
  themeColor = '#dc2626',
  currentAnimeSlug = '',
}) => {
  const hasQuote = ANIMES_WITH_QUOTE.includes(currentAnimeSlug);
  const exclusiveLabel = EXCLUSIVE_LABELS[currentAnimeSlug] || 'Exclusivo';

  const modes: { id: GameMode; label: string; icon: React.ReactNode; isExclusive?: boolean }[] = [
    { id: 'classic', label: 'Clássico', icon: <Grid size={15} /> },
    { id: 'wanted', label: 'Procurado', icon: <Eye size={15} /> },
    ...(hasQuote ? [{ id: 'quote' as GameMode, label: 'Citação', icon: <MessageSquare size={15} /> }] : []),
    { id: 'ability' as GameMode, label: exclusiveLabel, icon: <Zap size={15} />, isExclusive: true },
    { id: 'zoom', label: 'Zoom', icon: <ZoomIn size={15} /> },
    { id: 'grid', label: 'Grid', icon: <LayoutGrid size={15} /> },
    { id: 'endless', label: 'Infinito', icon: <InfinityIcon size={15} /> },
  ];

  const gridColsClass = modes.length === 6 ? 'grid-cols-6 max-w-3xl' : 'grid-cols-7 max-w-4xl';

  return (
    <div className={`flex items-center justify-center p-1.5 bg-[#0d1426] border border-[#202b43] rounded-2xl mx-auto my-6 shadow-lg shadow-black/20 ${modes.length === 6 ? 'max-w-3xl' : 'max-w-4xl'}`}>
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
