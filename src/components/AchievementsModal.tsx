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
  const unlockedCount = ACHIEVEMENTS_LIST.filter(a => Boolean(unlockedMap[a.id])).length;
  const totalCount = ACHIEVEMENTS_LIST.length;
  const percent = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0d1426] border border-[#202b43] rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl relative text-center max-h-[92vh] flex flex-col">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-4 border-b border-[#202b43] flex-shrink-0">
          <div className="flex items-center gap-2 text-left">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Trophy size={22} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Galeria de Selos & Troféus</h2>
              <p className="text-xs text-slate-400">Conquistas e proezas do AnimeDLE</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#111a2d] border border-transparent hover:border-[#202b43] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Barra de Progresso Global */}
        <div className="my-4 p-4 bg-[#111a2d] border border-[#202b43] rounded-2xl flex-shrink-0">
          <div className="flex items-center justify-between text-xs mb-2 font-bold">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-400" /> Progresso Total
            </span>
            <span className="text-amber-400 font-black text-sm">
              {unlockedCount} / {totalCount} ({percent}%)
            </span>
          </div>
          <div className="w-full h-3 bg-[#0d1426] rounded-full overflow-hidden border border-[#202b43]">
            <div
              className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-amber-500 to-yellow-400"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Lista de Conquistas Rolável */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3 my-1 custom-scrollbar">
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
                className={`p-4 rounded-2xl border flex items-center gap-4 text-left transition-all ${
                  isUnlocked
                    ? 'shadow-lg border-[#202b43]'
                    : 'bg-[#0d1426]/60 border-[#1a233a] opacity-60'
                }`}
              >
                {/* Ícone com tamanho ampliado */}
                <div
                  className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center p-1.5 flex-shrink-0 border relative overflow-hidden ${
                    isUnlocked
                      ? 'bg-[#16223b] border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                      : 'bg-[#111a2d] border-[#1e293b]'
                  }`}
                >
                  <img
                    src={ach.icon}
                    alt={ach.title}
                    className={`w-full h-full object-contain drop-shadow transition-all ${
                      isUnlocked ? 'scale-105' : 'grayscale opacity-30'
                    }`}
                  />
                  {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                      <Lock size={20} className="text-slate-400" />
                    </div>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className={`text-base font-extrabold truncate ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                      {ach.title}
                    </h3>
                    {isUnlocked && (
                      <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex-shrink-0">
                        <CheckCircle2 size={12} /> Conquistado
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    {ach.isSecret && !isUnlocked ? 'Conquista secreta oculta. Jogue e descubra o mistério!' : ach.description}
                  </p>
                  {unlockedDate && (
                    <p className="text-[10px] text-amber-400/80 font-bold mt-1.5">★ Desbloqueado em {unlockedDate}</p>
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
