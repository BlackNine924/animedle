import React from 'react';
import { Award, CheckCircle2, Lock, Trophy, X, Zap } from 'lucide-react';
import { AnimeMasteryInfo, getAnimeMasteryTitles } from '../utils/featuresManager';

interface MasteryModalProps {
  isOpen: boolean;
  onClose: () => void;
  animeTitle: string;
  themeColor: string;
  masteryInfo: AnimeMasteryInfo;
}

const RANK_THRESHOLDS = [
  { rankIndex: 0, requiredLevel: 1, requiredXp: 0, badge: 'Iniciante' },
  { rankIndex: 1, requiredLevel: 3, requiredXp: 200, badge: 'Intermediário' },
  { rankIndex: 2, requiredLevel: 6, requiredXp: 500, badge: 'Veterano' },
  { rankIndex: 3, requiredLevel: 10, requiredXp: 900, badge: 'Elite' },
  { rankIndex: 4, requiredLevel: 15, requiredXp: 1400, badge: 'Lenda Canônica' },
];

export const MasteryModal: React.FC<MasteryModalProps> = ({
  isOpen,
  onClose,
  animeTitle,
  themeColor,
  masteryInfo,
}) => {
  if (!isOpen) return null;

  const titles = getAnimeMasteryTitles(masteryInfo.slug);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#0a1020] border border-[#23304c] rounded-3xl shadow-2xl overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra superior com a cor oficial do anime em hex */}
        <div
          className="h-2 w-full"
          style={{
            backgroundColor: themeColor,
          }}
        />

        <div className="p-5 sm:p-6">
          {/* Cabeçalho */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center border shrink-0 shadow-lg"
                style={{
                  backgroundColor: `${themeColor}22`,
                  borderColor: `${themeColor}66`,
                  color: themeColor,
                }}
              >
                <Award size={24} />
              </div>
              <div>
                <span
                  className="text-[10px] font-black uppercase tracking-widest block"
                  style={{ color: themeColor }}
                >
                  Progressão de Maestria
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

          {/* Card de Status Atual e Barra de XP com a cor oficial do anime */}
          <div
            className="p-4 rounded-2xl bg-[#111a2e] border mb-5"
            style={{ borderColor: `${themeColor}45` }}
          >
            <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="px-2.5 py-0.5 rounded-lg border text-xs font-black text-white"
                  style={{
                    backgroundColor: `${themeColor}30`,
                    borderColor: `${themeColor}70`,
                  }}
                >
                  Nível {masteryInfo.level}
                </span>
                <span className="text-sm font-black text-white">
                  {masteryInfo.title}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-400">
                Total: <strong style={{ color: themeColor }}>{masteryInfo.xp} XP</strong>
              </span>
            </div>

            <div className="w-full h-2.5 bg-[#090e1a] rounded-full overflow-hidden border border-white/10 mb-1.5">
              <div
                className="h-full transition-all duration-500 rounded-full"
                style={{
                  width: `${masteryInfo.progressPct}%`,
                  backgroundColor: themeColor,
                }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
              <span>Progresso para o Nível {masteryInfo.level + 1}</span>
              <span className="font-bold text-white">
                {masteryInfo.currentLevelXp} / {masteryInfo.nextLevelXp} XP ({masteryInfo.progressPct}%)
              </span>
            </div>
          </div>

          {/* Lista dos 5 Títulos Canônicos */}
          <div className="mb-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Trophy size={13} style={{ color: themeColor }} />
              Todos os Títulos Canônicos ({titles.length})
            </h4>

            <div className="space-y-2">
              {RANK_THRESHOLDS.map((tier) => {
                const titleName = titles[tier.rankIndex];
                const isUnlocked = masteryInfo.level >= tier.requiredLevel;
                const isCurrent = masteryInfo.rankIndex === tier.rankIndex;
                const xpRemaining = Math.max(0, tier.requiredXp - masteryInfo.xp);

                return (
                  <div
                    key={tier.rankIndex}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-[#15203b] shadow-lg'
                        : isUnlocked
                        ? 'bg-[#111a2e]/90 border-emerald-500/30'
                        : 'bg-[#0d1424]/60 border-white/5 opacity-75'
                    }`}
                    style={
                      isCurrent
                        ? {
                            borderColor: themeColor,
                            boxShadow: `0 0 16px ${themeColor}28`,
                          }
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-black text-xs ${
                          isCurrent
                            ? 'text-white'
                            : isUnlocked
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-slate-800/80 text-slate-500 border border-white/5'
                        }`}
                        style={isCurrent ? { backgroundColor: themeColor } : undefined}
                      >
                        {isUnlocked ? <CheckCircle2 size={16} /> : <Lock size={14} />}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-sm font-black break-words ${
                              isCurrent || isUnlocked ? 'text-white' : 'text-slate-400'
                            }`}
                          >
                            {titleName}
                          </span>
                          {isCurrent && (
                            <span
                              className="px-2 py-0.5 rounded-full border text-[10px] font-black uppercase text-white"
                              style={{
                                backgroundColor: `${themeColor}35`,
                                borderColor: themeColor,
                              }}
                            >
                              Título Atual
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 block">
                          Requer <strong className="text-slate-300">Nível {tier.requiredLevel}</strong> ({tier.requiredXp} XP)
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0 ml-2">
                      {isUnlocked ? (
                        <span className="text-[11px] font-bold text-emerald-400">
                          Desbloqueado
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-slate-400">
                          Faltam {xpRemaining} XP
                        </span>
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
              <span>• Speedrun / Maior-Menor: <strong className="text-white">+12~15 XP</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
