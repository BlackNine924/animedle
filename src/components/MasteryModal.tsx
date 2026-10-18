import React, { useState } from 'react';
import { CheckCircle2, Lock, Sparkles, Trophy, X, Zap } from 'lucide-react';
import {
  AnimeMasteryInfo,
  getAnimeMasteryTitles,
  getTitleIconPaths,
} from '../utils/featuresManager';

interface MasteryModalProps {
  isOpen: boolean;
  onClose: () => void;
  animeTitle: string;
  themeColor: string;
  masteryInfo: AnimeMasteryInfo;
}

const RANK_THRESHOLDS = [
  { rankIndex: 0, requiredLevel: 1, requiredXp: 0, badge: 'Grau I • Iniciante' },
  { rankIndex: 1, requiredLevel: 3, requiredXp: 200, badge: 'Grau II • Intermediário' },
  { rankIndex: 2, requiredLevel: 6, requiredXp: 500, badge: 'Grau III • Veterano' },
  { rankIndex: 3, requiredLevel: 10, requiredXp: 900, badge: 'Grau IV • Elite' },
  { rankIndex: 4, requiredLevel: 15, requiredXp: 1400, badge: 'Grau V • Lenda Canônica' },
];

interface TitleCrestIconProps {
  titleName: string;
  rankIndex: number;
  themeColor: string;
  isUnlocked: boolean;
  isCurrent?: boolean;
  sizeClass?: string;
}

export const TitleCrestIcon: React.FC<TitleCrestIconProps> = ({
  titleName,
  rankIndex,
  themeColor,
  isUnlocked,
  sizeClass = 'w-14 h-14 sm:w-16 sm:h-16',
}) => {
  const [imgState, setImgState] = useState<'webp' | 'png' | 'fallback'>('webp');
  const paths = getTitleIconPaths(titleName);

  // Reset state if titleName changes
  React.useEffect(() => {
    setImgState('webp');
  }, [titleName]);

  if (imgState !== 'fallback') {
    const src = imgState === 'webp' ? paths.webp : paths.png;
    return (
      <img
        src={src}
        alt={titleName}
        loading="lazy"
        decoding="async"
        onError={() => {
          if (imgState === 'webp') setImgState('png');
          else setImgState('fallback');
        }}
        className={`${sizeClass} object-contain select-none transition-all duration-300 ${
          isUnlocked
            ? 'drop-shadow-[0_6px_14px_rgba(0,0,0,0.85)] group-hover:scale-105'
            : 'grayscale-[55%] opacity-55 contrast-95'
        }`}
      />
    );
  }

  // Fallback vetorial estilizado como Brasão/Escudo em 5 níveis para animes cujos ícones ainda serão adicionados
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeClass} select-none transition-transform duration-300 ${
        isUnlocked ? 'drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]' : 'grayscale-[60%] opacity-50'
      }`}
    >
      {/* Escudo Base */}
      <path
        d="M32 5L53 13.5V30.5C53 44.5 43.8 54.4 32 59C20.2 54.4 11 44.5 11 30.5V13.5L32 5Z"
        fill="#0b1326"
        stroke={themeColor}
        strokeWidth="3.2"
      />
      <path
        d="M32 9.5L48.5 16.2V30.2C48.5 41.5 41.2 49.7 32 53.8C22.8 49.7 15.5 41.5 15.5 30.2V16.2L32 9.5Z"
        fill={`${themeColor}28`}
        stroke={themeColor}
        strokeOpacity="0.45"
        strokeWidth="1.2"
      />
      {/* Detalhe central progressivo conforme o Rank (0 a 4) */}
      {rankIndex === 0 && (
        <path
          d="M32 21L35.2 28.2L43 29.1L37.1 34.4L38.8 42L32 38L25.2 42L26.9 34.4L21 29.1L28.8 28.2L32 21Z"
          fill={themeColor}
        />
      )}
      {rankIndex === 1 && (
        <>
          <path d="M32 17L42 32L32 45L22 32L32 17Z" fill={themeColor} />
          <circle cx="32" cy="31" r="4" fill="#0b1326" />
        </>
      )}
      {rankIndex === 2 && (
        <>
          <path d="M20 38L24 23L32 30L40 23L44 38H20Z" fill={themeColor} />
          <circle cx="24" cy="20" r="2.2" fill={themeColor} />
          <circle cx="32" cy="17.5" r="2.6" fill={themeColor} />
          <circle cx="40" cy="20" r="2.2" fill={themeColor} />
        </>
      )}
      {rankIndex === 3 && (
        <>
          <path d="M18 39L22 22L32 29L42 22L46 39H18Z" fill={themeColor} />
          <path d="M22 43H42V46H22V43Z" fill={themeColor} />
          <circle cx="32" cy="17" r="3" fill="#ffffff" />
        </>
      )}
      {rankIndex >= 4 && (
        <>
          <path d="M17 38L21 20L32 28L43 20L47 38H17Z" fill={themeColor} />
          <path d="M20 42H44V45.5H20V42Z" fill="#ffffff" />
          <circle cx="21" cy="17" r="2.5" fill="#ffffff" />
          <circle cx="32" cy="14.5" r="3.2" fill="#ffffff" />
          <circle cx="43" cy="17" r="2.5" fill="#ffffff" />
        </>
      )}
    </svg>
  );
};

export const MasteryModal: React.FC<MasteryModalProps> = ({
  isOpen,
  onClose,
  animeTitle,
  themeColor,
  masteryInfo,
}) => {
  if (!isOpen) return null;

  const titles = getAnimeMasteryTitles(masteryInfo.slug);
  const unlockedCount = RANK_THRESHOLDS.filter((t) => masteryInfo.level >= t.requiredLevel).length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#090f1e] border border-[#233150] rounded-3xl shadow-2xl overflow-hidden text-left max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra superior com a cor oficial do anime em hex */}
        <div
          className="h-2.5 w-full shrink-0"
          style={{
            backgroundColor: themeColor,
            boxShadow: `0 0 20px ${themeColor}`,
          }}
        />

        {/* Glow de fundo sutil */}
        <div
          className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ backgroundColor: themeColor }}
        />

        <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar space-y-5">
          {/* Cabeçalho */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center border shrink-0 shadow-lg"
                style={{
                  backgroundColor: `${themeColor}22`,
                  borderColor: `${themeColor}66`,
                  color: themeColor,
                }}
              >
                <Trophy size={22} />
              </div>
              <div>
                <span
                  className="text-[10px] font-black uppercase tracking-widest block"
                  style={{ color: themeColor }}
                >
                  Galeria & Progressão de Títulos
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                  {animeTitle}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/70 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              aria-label="Fechar modal de maestria"
            >
              <X size={18} />
            </button>
          </div>

          {/* Card Principal do Título Atual em Destaque com Brasão Grande */}
          <div
            className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#121c33] via-[#0e1629] to-[#0a1020] border relative overflow-hidden shadow-xl"
            style={{
              borderColor: `${themeColor}65`,
              boxShadow: `0 8px 30px -10px ${themeColor}35`,
            }}
          >
            <div className="flex items-center gap-4">
              {/* Brasão do Título Atual */}
              <div
                className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl flex items-center justify-center p-1.5 border shrink-0 bg-[#090f1d]/90 shadow-inner"
                style={{
                  borderColor: `${themeColor}80`,
                  boxShadow: `0 0 22px ${themeColor}30`,
                }}
              >
                <TitleCrestIcon
                  titleName={masteryInfo.title}
                  rankIndex={masteryInfo.rankIndex}
                  themeColor={themeColor}
                  isUnlocked={true}
                  isCurrent={true}
                  sizeClass="w-16 h-16 sm:w-18 sm:h-18"
                />
              </div>

              {/* Dados do Título Atual e Barra de XP */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg border text-[11px] font-black uppercase tracking-wider text-white"
                    style={{
                      backgroundColor: `${themeColor}35`,
                      borderColor: `${themeColor}80`,
                    }}
                  >
                    <Sparkles size={11} />
                    Nível {masteryInfo.level}
                  </span>
                  <span className="text-xs font-extrabold text-slate-300">
                    Total: <strong style={{ color: themeColor }}>{masteryInfo.xp} XP</strong>
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-black text-white leading-snug break-words mb-2">
                  {masteryInfo.title}
                </h4>

                {/* Barra de XP na cor oficial do anime */}
                <div className="w-full h-2.5 bg-[#070b14] rounded-full overflow-hidden border border-white/10 mb-1.5">
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{
                      width: `${masteryInfo.progressPct}%`,
                      backgroundColor: themeColor,
                      boxShadow: `0 0 10px ${themeColor}`,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span>Próx. Nível ({masteryInfo.level + 1})</span>
                  <span className="font-bold text-slate-200">
                    {masteryInfo.currentLevelXp} / {masteryInfo.nextLevelXp} XP ({masteryInfo.progressPct}%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Lista dos 5 Brasões e Títulos Canônicos */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Trophy size={14} style={{ color: themeColor }} />
                Insígnias & Títulos do Anime
              </h4>
              <span
                className="text-[11px] font-black px-2.5 py-0.5 rounded-full border"
                style={{
                  backgroundColor: `${themeColor}20`,
                  borderColor: `${themeColor}50`,
                  color: themeColor,
                }}
              >
                {unlockedCount} / {titles.length} Desbloqueados
              </span>
            </div>

            <div className="space-y-2.5">
              {RANK_THRESHOLDS.map((tier) => {
                const titleName = titles[tier.rankIndex];
                const isUnlocked = masteryInfo.level >= tier.requiredLevel;
                const isCurrent = masteryInfo.rankIndex === tier.rankIndex;
                const xpRemaining = Math.max(0, tier.requiredXp - masteryInfo.xp);
                const tierProgressPct = isUnlocked
                  ? 100
                  : tier.requiredXp > 0
                  ? Math.min(99, Math.round((masteryInfo.xp / tier.requiredXp) * 100))
                  : 100;

                return (
                  <div
                    key={tier.rankIndex}
                    className={`group relative flex items-center justify-between gap-3.5 p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-[#162342] to-[#101a30] shadow-lg'
                        : isUnlocked
                        ? 'bg-[#10192d]/95 border-emerald-500/35 hover:border-emerald-400/60'
                        : 'bg-[#0c1323]/80 border-[#1c2842] opacity-85'
                    }`}
                    style={
                      isCurrent
                        ? {
                            borderColor: themeColor,
                            boxShadow: `0 0 20px ${themeColor}28`,
                          }
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      {/* Moldura do Ícone do Título (1 para cada um dos 5 títulos) */}
                      <div
                        className={`relative w-15 h-15 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center p-1.5 shrink-0 border transition-all ${
                          isCurrent
                            ? 'bg-[#091020]'
                            : isUnlocked
                            ? 'bg-[#0b1324] border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                            : 'bg-[#080d19] border-white/10'
                        }`}
                        style={
                          isCurrent
                            ? {
                                borderColor: themeColor,
                                boxShadow: `0 0 14px ${themeColor}40`,
                              }
                            : undefined
                        }
                      >
                        <TitleCrestIcon
                          titleName={titleName}
                          rankIndex={tier.rankIndex}
                          themeColor={themeColor}
                          isUnlocked={isUnlocked}
                          isCurrent={isCurrent}
                          sizeClass="w-12 h-12 sm:w-13 sm:h-13"
                        />

                        {/* Selo de Status no canto do ícone */}
                        <span
                          className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border shadow-md ${
                            isCurrent
                              ? 'text-white border-white/40'
                              : isUnlocked
                              ? 'bg-emerald-500 text-slate-950 border-emerald-200'
                              : 'bg-slate-800 text-slate-400 border-slate-600'
                          }`}
                          style={isCurrent ? { backgroundColor: themeColor } : undefined}
                        >
                          {isUnlocked ? (
                            <CheckCircle2 size={12} className="stroke-[2.5]" />
                          ) : (
                            <Lock size={10} />
                          )}
                        </span>
                      </div>

                      {/* Nome do Título, Grau e Requisito */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span
                            className="text-[10px] font-black uppercase tracking-wider"
                            style={{ color: isUnlocked ? themeColor : '#64748b' }}
                          >
                            {tier.badge}
                          </span>
                          {isCurrent && (
                            <span
                              className="px-2 py-0.5 rounded-full border text-[9px] font-black uppercase text-white"
                              style={{
                                backgroundColor: `${themeColor}40`,
                                borderColor: themeColor,
                              }}
                            >
                              Em Uso
                            </span>
                          )}
                        </div>

                        <div
                          className={`text-sm sm:text-base font-black leading-snug break-words ${
                            isCurrent || isUnlocked ? 'text-white' : 'text-slate-300'
                          }`}
                        >
                          {titleName}
                        </div>

                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-[11px] text-slate-400">
                            Requer <strong className="text-slate-200">Nível {tier.requiredLevel}</strong> ({tier.requiredXp} XP)
                          </span>
                        </div>

                        {/* Mini barra de progresso para títulos ainda bloqueados */}
                        {!isUnlocked && (
                          <div className="mt-1.5 w-full max-w-[180px] h-1.5 bg-[#070b14] rounded-full overflow-hidden border border-white/5">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${tierProgressPct}%`,
                                backgroundColor: themeColor,
                                opacity: 0.7,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status à direita */}
                    <div className="text-right shrink-0 ml-1">
                      {isUnlocked ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-black text-emerald-400">
                          Desbloqueado
                        </span>
                      ) : (
                        <div className="flex flex-col items-end">
                          <span className="text-[11px] font-extrabold text-slate-300">
                            Faltam {xpRemaining} XP
                          </span>
                          <span className="text-[10px] font-bold text-slate-500">
                            {tierProgressPct}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Como ganhar XP */}
          <div className="p-3.5 rounded-2xl bg-[#0d1426] border border-[#1e2a45] text-[11px] text-slate-300 space-y-1">
            <div
              className="font-black uppercase tracking-wider flex items-center gap-1.5 mb-1"
              style={{ color: themeColor }}
            >
              <Zap size={13} />
              Como ganhar XP neste anime:
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-slate-400">
              <span>• Desafio Diário: <strong className="text-white">+50 XP</strong></span>
              <span>• Grade / Conexões: <strong className="text-white">+80 XP</strong></span>
              <span>• Modo Infinito: <strong className="text-white">+20 XP</strong></span>
              <span>• Maior ou Menor: <strong className="text-white">+10 XP</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
