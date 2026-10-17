import React from 'react';
import { Award, CheckCircle2, Lock, Sparkles, Trophy, X, Zap } from 'lucide-react';
import { AnimeMasteryInfo, getAnimeMasteryTitles } from '../utils/featuresManager';

interface MasteryModalProps {
  isOpen: boolean;
  onClose: () => void;
  animeTitle: string;
  themeColor: string;
  masteryInfo: AnimeMasteryInfo;
}

const RANK_THRESHOLDS = [
  { rankIndex: 0, requiredLevel: 1, requiredXp: 0, badge: 'Iniciante', color: 'from-slate-500 to-slate-400' },
  { rankIndex: 1, requiredLevel: 3, requiredXp: 200, badge: 'Intermediário', color: 'from-emerald-500 to-green-400' },
  { rankIndex: 2, requiredLevel: 6, requiredXp: 500, badge: 'Veterano', color: 'from-sky-500 to-cyan-400' },
  { rankIndex: 3, requiredLevel: 10, requiredXp: 900, badge: 'Elite', color: 'from-purple-500 to-fuchsia-400' },
  { rankIndex: 4, requiredLevel: 15, requiredXp: 1400, badge: 'Lenda Canônica', color: 'from-amber-500 to-yellow-300' },
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
        {/* Barra superior de brilho */}
        <div
          className="h-1.5 w-full"
          style={{
            background: `linear-gradient(90deg, ${themeColor}, #f59e0b, ${themeColor})`,
          }}
        />

        <div className="p-5 sm:p-6">
          {/* Cabeçalho */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center border border-amber-500/40 bg-amber-500/10 text-amber-400 shrink-0 shadow-lg"
              >
                <Award size={24} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
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

          {/* Card de Status Atual */}
          <div className="p-4 rounded-2xl bg-[#111a2e] border border-amber-500/25 mb-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black">
                  Nível {masteryInfo.level}
                </span>
                <span className="text-sm font-black text-white">
                  {masteryInfo.title}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-400">
                Total: <strong className="text-amber-300">{masteryInfo.xp} XP</strong>
              </span>
            </div>

            <div className="w-full h-2.5 bg-[#090e1a] rounded-full overflow-hidden border border-white/10 mb-1.5">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 transition-all duration-500"
                style={{ width: `${masteryInfo.progressPct}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
              <span>Progresso para o Nível {masteryInfo.level + 1}</span>
              <span className="text-amber-300 font-bold">
                {masteryInfo.currentLevelXp} / {masteryInfo.nextLevelXp} XP ({masteryInfo.progressPct}%)
              </span>
            </div>
          </div>

          {/* Lista dos 5 Títulos Canônicos */}
          <div className="mb-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Trophy size={13} className="text-amber-400" />
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
                        ? 'bg-amber-500/15 border-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                        : isUnlocked
                        ? 'bg-[#111a2e]/90 border-emerald-500/30'
                        : 'bg-[#0d1424]/60 border-white/5 opacity-75'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-black text-xs ${
                          isCurrent
                            ? 'bg-amber-400 text-slate-950'
                            : isUnlocked
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-slate-800/80 text-slate-500 border border-white/5'
                        }`}
                      >
                        {isUnlocked ? <CheckCircle2 size={16} /> : <Lock size={14} />}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-sm font-black truncate ${
                              isCurrent
                                ? 'text-amber-300'
                                : isUnlocked
                                ? 'text-white'
                                : 'text-slate-400'
                            }`}
                          >
                            {titleName}
                          </span>
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/50 text-[10px] font-black uppercase text-amber-300">
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
            <div className="font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-1">
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
