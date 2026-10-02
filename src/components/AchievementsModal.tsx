import React, { useMemo } from 'react';
import { ACHIEVEMENTS_LIST, getUnlockedAchievements } from '../data/achievements';
import { X, Trophy, Lock, CheckCircle2, Sparkles } from 'lucide-react';

interface AchievementsModalProps {
  onClose: () => void;
  themeColor?: string;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  onClose,
  themeColor = '#f59e0b',
}) => {
  const unlockedMap = useMemo(() => getUnlockedAchievements(), []);
  const unlockedCount = Object.keys(unlockedMap).length;
  const totalCount = ACHIEVEMENTS_LIST.length;
  const percent = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0d1426] border border-[#202b43] rounded-3xl max-w-lg w-full p-6 shadow-2xl relative text-center max-h-[90vh] flex flex-col">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-4 border-b border-[#202b43] flex-shrink-0">
          <div className="flex items-center gap-2 text-left">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Trophy size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">Galeria de Selos & Troféus</h2>
              <p className="text-xs text-slate-400">Conquistas e proezas do AnimeDLE</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#111a2d] border border-transparent hover:border-[#202b43] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Barra de Progresso Global */}
        <div className="my-4 p-3.5 bg-[#111a2d] border border-[#202b43] rounded-2xl flex-shrink-0">
          <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
            <span className="text-slate-300 flex items-center gap-1">
              <Sparkles size={13} className="text-amber-400" /> Progresso Total
            </span>
            <span className="text-amber-400 font-black">
              {unlockedCount} / {totalCount} ({percent}%)
            </span>
          </div>
          <div className="w-full h-2.5 bg-[#0d1426] rounded-full overflow-hidden border border-[#202b43]">
            <div
              className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-amber-500 to-yellow-400"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Lista de Conquistas Rolável */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 my-1 custom-scrollbar">
          {ACHIEVEMENTS_LIST.map((ach) => {
            const isUnlocked = Boolean(unlockedMap[ach.id]);
            const unlockedDate = unlockedMap[ach.id]
              ? new Date(unlockedMap[ach.id]).toLocaleDateString('pt-BR')
              : null;

            return (
              <div
                key={ach.id}
                style={
                  isUnlocked
                    ? {
                        borderColor: `${themeColor}40`,
                        background: 'linear-gradient(135deg, rgba(17, 26, 45, 0.95), rgba(13, 20, 38, 0.95))',
                      }
                    : undefined
                }
                className={`p-3.5 rounded-2xl border flex items-center gap-3.5 text-left transition-all ${
                  isUnlocked
                    ? 'shadow-md border-[#202b43]'
                    : 'bg-[#0d1426]/60 border-[#1a233a] opacity-50 grayscale'
                }`}
              >
                {/* Ícone */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border ${
                    isUnlocked
                      ? 'bg-[#16223b] border-amber-500/40 shadow-inner'
                      : 'bg-[#111a2d] border-[#1e293b]'
                  }`}
                >
                  {isUnlocked ? ach.icon : <Lock size={18} className="text-slate-500" />}
                </div>

                {/* Conteúdo */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-sm font-extrabold truncate ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                      {ach.title}
                    </h3>
                    {isUnlocked && (
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/30 flex-shrink-0">
                        <CheckCircle2 size={10} /> Conquistado
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{ach.description}</p>
                  {unlockedDate && (
                    <p className="text-[10px] text-slate-500 mt-1">Desbloqueado em {unlockedDate}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Rodapé com Fechar */}
        <div className="pt-4 border-t border-[#202b43] mt-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full bg-[#111a2d] hover:bg-[#16223b] border border-[#202b43] text-slate-200 font-bold py-2.5 rounded-xl text-xs transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
