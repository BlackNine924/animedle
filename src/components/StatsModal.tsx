import React from 'react';
import { GameStats } from '../types/anime';
import { X, Trophy, Flame } from 'lucide-react';

interface StatsModalProps {
  stats: GameStats;
  onClose: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({ stats, onClose }) => {
  const winRate = stats.played > 0 ? Math.round((stats.wins / stats.played) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0d1426] border border-[#202b43] rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-center">
        <div className="flex items-center justify-between pb-4 border-b border-[#202b43]">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Trophy size={20} className="text-amber-400" /> Estatísticas do Jogador
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#111a2d] border border-transparent hover:border-[#202b43] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2.5 my-6">
          <div className="bg-[#111a2d] border border-[#202b43] rounded-2xl p-3">
            <p className="text-2xl font-black text-white">{stats.played}</p>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Jogos</span>
          </div>
          <div className="bg-[#111a2d] border border-[#202b43] rounded-2xl p-3">
            <p className="text-2xl font-black text-emerald-400">{winRate}%</p>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Vitórias</span>
          </div>
          <div className="bg-[#111a2d] border border-[#202b43] rounded-2xl p-3">
            <p className="text-2xl font-black text-amber-400">{stats.currentStreak}</p>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight flex items-center justify-center gap-0.5">
              <Flame size={10} className="text-amber-400" /> Streak
            </span>
          </div>
          <div className="bg-[#111a2d] border border-[#202b43] rounded-2xl p-3">
            <p className="text-2xl font-black text-rose-400">{stats.maxStreak}</p>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Recorde</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#111a2d] hover:bg-[#16223b] border border-[#202b43] text-slate-200 font-bold py-3 rounded-xl text-xs transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};
