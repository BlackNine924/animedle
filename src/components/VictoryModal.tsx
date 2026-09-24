import React, { useEffect, useState } from 'react';
import { Character, GameStats } from '../types/anime';
import { getTimeUntilNextReset } from '../utils/dailySeed';
import { Trophy, Share2, Clock, CheckCircle2, Flame, Flag } from 'lucide-react';
import confetti from 'canvas-confetti';

interface VictoryModalProps {
  targetCharacter: Character;
  totalGuesses: number;
  stats: GameStats;
  isSurrendered?: boolean;
  onClose: () => void;
  themeColor?: string;
  animeTitle?: string;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  targetCharacter,
  totalGuesses,
  stats,
  isSurrendered = false,
  onClose,
  themeColor = '#dc2626',
  animeTitle = 'Demon Slayer',
}) => {
  const [timer, setTimer] = useState(getTimeUntilNextReset());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isSurrendered) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    const interval = setInterval(() => {
      setTimer(getTimeUntilNextReset());
    }, 1000);

    return () => clearInterval(interval);
  }, [isSurrendered]);

  const handleShare = () => {
    const text = isSurrendered
      ? `⚔️ AnimeDLE - ${animeTitle}\nDesisti do desafio diário, mas descobri o personagem (${targetCharacter.name})! 🔥`
      : `⚔️ AnimeDLE - ${animeTitle}\nAcertei o personagem diário (${targetCharacter.name}) em ${totalGuesses} ${totalGuesses === 1 ? 'tentativa' : 'tentativas'}! 🔥\nSequência atual: ${stats.currentStreak} vitória(s)!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0d1426] border border-[#202b43] rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-center">
        
        {/* Banner de Vitória / Desistência */}
        <div
          style={
            isSurrendered
              ? undefined
              : { backgroundColor: `${themeColor}20`, borderColor: `${themeColor}60`, color: themeColor }
          }
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border ${
            isSurrendered
              ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
              : 'animate-bounce'
          }`}
        >
          {isSurrendered ? <Flag size={32} /> : <Trophy size={32} />}
        </div>

        <h2 className="text-2xl font-black text-[#F5F7FF]">
          {isSurrendered ? 'Você Desistiu!' : 'Excelente Trabalho!'}
        </h2>
        
        {/* Destaque de Quantidade de Tentativas Utilizadas ao Acertar */}
        {!isSurrendered ? (
          <div
            style={{ backgroundColor: `${themeColor}20`, borderColor: `${themeColor}60`, color: themeColor }}
            className="inline-block mt-2 px-3.5 py-1 rounded-full border text-xs font-black"
          >
            🎉 Você acertou em {totalGuesses} {totalGuesses === 1 ? 'tentativa' : 'tentativas'}!
          </div>
        ) : (
          <p className="text-xs text-slate-400 mt-1">
            Aqui está o personagem secreto de hoje:
          </p>
        )}

        {/* Card do Personagem Revelado */}
        <div className="my-5 p-4 bg-[#111a2d] border border-[#202b43] rounded-2xl flex items-center gap-4 text-left">
          <div className="w-16 h-16 rounded-xl bg-[#0d1426] overflow-hidden border border-[#202b43] flex-shrink-0">
            {targetCharacter.avatar ? (
              <img src={targetCharacter.avatar} alt={targetCharacter.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-white text-xl">
                {targetCharacter.name[0]}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 style={{ color: themeColor }} className="font-extrabold text-lg truncate">{targetCharacter.name}</h3>
            <p className="text-xs text-slate-300 font-medium">
              {targetCharacter.species} • {Array.isArray(targetCharacter.affiliation) ? targetCharacter.affiliation[0] : targetCharacter.affiliation}
            </p>
            <p className="text-[11px] text-slate-400 italic mt-0.5 truncate">
              "{targetCharacter.quote || targetCharacter.styleOrPower}"
            </p>
          </div>
        </div>

        {/* Resumo de Estatísticas */}
        <div className="grid grid-cols-3 gap-2 my-4">
          <div className="bg-[#111a2d]/80 border border-[#202b43] rounded-xl p-2.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Tentativas</span>
            <p className="text-lg font-extrabold text-white">{totalGuesses}</p>
          </div>
          <div className="bg-[#111a2d]/80 border border-[#202b43] rounded-xl p-2.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center justify-center gap-1">
              <Flame size={12} className="text-amber-500" /> Sequência
            </span>
            <p className="text-lg font-extrabold text-amber-400">{stats.currentStreak}</p>
          </div>
          <div className="bg-[#111a2d]/80 border border-[#202b43] rounded-xl p-2.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Vitórias</span>
            <p className="text-lg font-extrabold text-emerald-400">{stats.wins}</p>
          </div>
        </div>

        {/* Cronômetro para próximo reset */}
        <div className="bg-[#111a2d] border border-[#202b43] rounded-2xl p-3 my-4 flex items-center justify-between">
          <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
            <Clock size={16} style={{ color: themeColor }} /> Próximo Personagem:
          </span>
          <span className="font-mono text-sm font-bold text-white tracking-widest">{timer}</span>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-3">
          <button
            onClick={handleShare}
            style={{ backgroundColor: themeColor }}
            className="flex-1 flex items-center justify-center gap-2 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-lg transition-all hover:opacity-90 active:scale-95"
          >
            {copied ? <CheckCircle2 size={16} /> : <Share2 size={16} />}
            <span>{copied ? 'Copiado!' : 'Compartilhar Resultado'}</span>
          </button>
          <button
            onClick={onClose}
            className="bg-[#111a2d] hover:bg-[#16223b] border border-[#202b43] text-slate-300 font-semibold py-3 px-4 rounded-xl text-xs transition-colors"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
