import React, { useEffect, useState } from 'react';
import { Character, GameStats } from '../types/anime';
import { getTimeUntilNextReset } from '../utils/dailySeed';
import { Trophy, Share2, Clock, CheckCircle2, Flame, Flag, Image as ImageIcon, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { downloadOrShareImageCard } from '../utils/shareImage';
import { logDailyActivity, unlockAchievement, recordVictory, recordDefeat, recordSurrender } from '../data/achievements';

interface VictoryModalProps {
  targetCharacter: Character;
  totalGuesses: number;
  stats?: GameStats;
  isSurrendered?: boolean;
  isLost?: boolean;
  onClose: () => void;
  onNext?: () => void;
  nextButtonLabel?: string;
  themeColor?: string;
  animeTitle?: string;
  animeSlug?: string;
  currentMode?: string;
  customSubtitle?: string;
  contextExplanation?: string;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  targetCharacter,
  totalGuesses,
  stats,
  isSurrendered = false,
  isLost = false,
  onClose,
  onNext,
  nextButtonLabel = 'Próximo Desafio',
  themeColor = '#dc2626',
  animeTitle = 'Demon Slayer',
  animeSlug,
  currentMode = 'classic',
  customSubtitle,
  contextExplanation,
}) => {
  const [timer, setTimer] = useState(getTimeUntilNextReset());
  const [copied, setCopied] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const isLoss = Boolean(isLost && !isSurrendered);
  const isSurrender = Boolean(isSurrendered);
  const isWon = !isSurrender && !isLoss;

  const safeStats = stats || (() => {
    try {
      const saved = localStorage.getItem('animedle_stats');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      wins: 0,
      currentStreak: 0,
      maxStreak: 0,
      played: 0,
    };
  })();

  // Se desistiu ou perdeu, a sequência nesta partida foi encerrada/quebrada (0)
  const displayStreak = isWon ? (safeStats.currentStreak || 0) : 0;

  useEffect(() => {
    // Registra dia ativo no calendário de frequência (Retenção 3)
    logDailyActivity();

    const currentSlug = animeSlug || 'demon-slayer';

    if (isWon) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Avaliação de Conquistas (Retenção 2)
      unlockAchievement('first_win');
      if (currentMode === 'classic' && totalGuesses <= 3) {
        unlockAchievement('analytical_mind');
      }
      if (currentMode === 'zoom' && totalGuesses === 1) {
        unlockAchievement('eagle_eye');
      }
      if (currentMode === 'zoom' && totalGuesses === 8) {
        unlockAchievement('protagonist_comeback');
      }
      if (currentMode === 'wanted' && totalGuesses === 1) {
        unlockAchievement('detective');
      }
      if (currentMode === 'wanted' && totalGuesses === 5) {
        unlockAchievement('protagonist_comeback');
      }
      if (currentMode === 'quote' && totalGuesses <= 2) {
        unlockAchievement('quote_master');
      }
      if (displayStreak >= 3) {
        unlockAchievement('streak_3');
      }
      if (displayStreak >= 7) {
        unlockAchievement('streak_7');
      }

      // Conquistas Secretas
      // 1. Clarividência: Acertar de primeira no Modo Clássico
      if (currentMode === 'classic' && totalGuesses === 1) {
        unlockAchievement('secret_clairvoyant');
      }

      // 2. Diretor de Cinema: Vencer o Modo Cena sem ligar as cores (100% P&B)
      if (currentMode === 'scene') {
        const colorWasUsed = sessionStorage.getItem('animedle_scene_color_used') === 'true';
        if (!colorWasUsed) {
          unlockAchievement('secret_cinema_director');
        }
      }

      // 3. Matando Aula: Vencer partida em horário escolar (seg-sex, 08:00 às 12:00)
      const now = new Date();
      const dayOfWeek = now.getDay(); // 0 = Domingo, 6 = Sábado
      const currentHour = now.getHours();
      if (dayOfWeek >= 1 && dayOfWeek <= 5 && currentHour >= 8 && currentHour < 12) {
        unlockAchievement('secret_skipping_class');
      }

      // Registra vitória e avalia Veterano, Domínio do Universo, Identidade Confirmada, etc.
      recordVictory(currentSlug, currentMode, targetCharacter?.id);
    } else if (isSurrender) {
      recordSurrender(currentSlug, currentMode);
    } else if (isLoss) {
      recordDefeat(currentSlug, currentMode);
    }

    const interval = setInterval(() => {
      setTimer(getTimeUntilNextReset());
    }, 1000);

    return () => clearInterval(interval);
  }, [isSurrender, isLoss, isWon, currentMode, totalGuesses, displayStreak, animeSlug, targetCharacter?.id]);

  const handleShare = () => {
    const text = isLoss
      ? `⚔️ AnimeDLE - ${animeTitle}\nFui derrotado no desafio diário (${targetCharacter.name}) após esgotar as tentativas! 💀\nJogue em https://animedle-9og.pages.dev`
      : isSurrender
      ? `⚔️ AnimeDLE - ${animeTitle}\nDesisti do desafio diário (${targetCharacter.name})! 🏳️\nJogue em https://animedle-9og.pages.dev`
      : `⚔️ AnimeDLE - ${animeTitle}\nAcertei o personagem diário (${targetCharacter.name}) em ${totalGuesses} ${totalGuesses === 1 ? 'tentativa' : 'tentativas'}! 🔥\nSequência atual: ${displayStreak} vitória(s)!\nJogue em https://animedle-9og.pages.dev`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleGenerateImage = async () => {
    setIsGeneratingImage(true);
    const modeNames: Record<string, string> = {
      classic: 'Clássico',
      wanted: 'Procurado',
      quote: 'Citação',
      ability: 'Habilidade',
      zoom: 'Zoom / Olhos',
      voice: 'Voz & Som',
      endless: 'Treino',
      grid: 'Grid 3×3',
      exclusive: 'Modo Exclusivo',
    };

    await downloadOrShareImageCard({
      animeTitle,
      themeColor,
      animeSlug,
      characterName: targetCharacter.name,
      characterAvatar: targetCharacter.avatar,
      characterSub: `${targetCharacter.species || ''} • ${Array.isArray(targetCharacter.affiliation) ? targetCharacter.affiliation[0] : (targetCharacter.affiliation || targetCharacter.origin || '')}`,
      modeName: modeNames[currentMode] || currentMode,
      totalGuesses,
      isWon,
      streak: displayStreak,
    }, `animedle-${targetCharacter.id}.png`);

    setIsGeneratingImage(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0d1426] border border-[#202b43] rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-center">
        
        {/* Banner de Vitória / Derrota / Desistência */}
        <div
          style={
            isSurrender || isLoss
              ? undefined
              : { backgroundColor: `${themeColor}20`, borderColor: `${themeColor}60`, color: themeColor }
          }
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border ${
            isSurrender
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              : isLoss
              ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
              : 'animate-bounce'
          }`}
        >
          {isSurrender ? <Flag size={32} /> : isLoss ? <span className="text-3xl">💀</span> : <Trophy size={32} />}
        </div>

        <h2 className="text-2xl font-black text-[#F5F7FF]">
          {isSurrender ? 'Você Desistiu!' : isLoss ? 'Derrota!' : 'Excelente Trabalho!'}
        </h2>
        
        {/* Destaque de Quantidade de Tentativas Utilizadas ao Acertar */}
        {customSubtitle ? (
          <div
            style={{ backgroundColor: `${themeColor}20`, borderColor: `${themeColor}60`, color: themeColor }}
            className="inline-block mt-2 px-3.5 py-1 rounded-full border text-xs font-black"
          >
            {customSubtitle}
          </div>
        ) : isWon ? (
          <div
            style={{ backgroundColor: `${themeColor}20`, borderColor: `${themeColor}60`, color: themeColor }}
            className="inline-block mt-2 px-3.5 py-1 rounded-full border text-xs font-black"
          >
            🎉 Você acertou em {totalGuesses} {totalGuesses === 1 ? 'tentativa' : 'tentativas'}!
          </div>
        ) : (
          <p className="text-xs text-slate-400 mt-1">
            {isSurrender ? 'Você desistiu da rodada. Aqui está o personagem secreto:' : 'Você esgotou todas as chances no desafio!'}
          </p>
        )}

        {/* Card do Personagem Revelado (Oculto no Grid Mode pois a grade possui 9 personagens) */}
        {currentMode !== 'grid' && (
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
              <p className="text-xs text-slate-300 font-medium truncate">
                {targetCharacter.species || ''} {targetCharacter.affiliation ? `• ${Array.isArray(targetCharacter.affiliation) ? targetCharacter.affiliation[0] : targetCharacter.affiliation}` : targetCharacter.origin ? `• ${targetCharacter.origin}` : ''}
              </p>
              <p className="text-[11px] text-slate-400 italic mt-0.5 truncate">
                "{targetCharacter.quote || targetCharacter.styleOrPower || ''}"
              </p>
            </div>
          </div>
        )}

        {/* Explicação contextual lore se fornecida (oculta no modo exclusivo) */}
        {contextExplanation && currentMode !== 'exclusive' && (
          <p className="text-xs text-slate-300 leading-relaxed text-left bg-[#101729] p-3 rounded-xl border border-[#1d273f] my-3">
            {contextExplanation}
          </p>
        )}

        {/* Resumo de Estatísticas */}
        <div className="grid grid-cols-3 gap-2 my-4">
          <div className="bg-[#111a2d]/80 border border-[#202b43] rounded-xl p-2.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Tentativas</span>
            <p className="text-lg font-extrabold text-white">{totalGuesses}</p>
          </div>
          <div className="bg-[#111a2d]/80 border border-[#202b43] rounded-xl p-2.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center justify-center gap-1">
              <Flame size={12} className={isWon ? "text-amber-500" : "text-slate-500"} /> Sequência
            </span>
            <p className={`text-lg font-extrabold ${isWon ? "text-amber-400" : "text-slate-400"}`}>{displayStreak}</p>
          </div>
          <div className="bg-[#111a2d]/80 border border-[#202b43] rounded-xl p-2.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Vitórias</span>
            <p className="text-lg font-extrabold text-emerald-400">{safeStats.wins || 0}</p>
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
        <div className="space-y-2.5">
          {onNext && (
            <button
              onClick={onNext}
              style={{ backgroundColor: themeColor }}
              className="w-full flex items-center justify-center gap-2 text-white font-extrabold py-3 px-4 rounded-xl text-xs shadow-lg transition-all hover:brightness-110 active:scale-95"
            >
              <span>{nextButtonLabel}</span>
            </button>
          )}

          <div className="flex gap-2.5">
            <button
              onClick={handleShare}
              style={onNext ? { backgroundColor: '#1e293b' } : { backgroundColor: themeColor }}
              className="flex-1 flex items-center justify-center gap-2 text-white font-bold py-3 px-3 rounded-xl text-xs shadow-lg transition-all hover:opacity-90 active:scale-95"
            >
              {copied ? <CheckCircle2 size={16} /> : <Share2 size={16} />}
              <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
            </button>

            <button
              onClick={handleGenerateImage}
              disabled={isGeneratingImage}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 px-3 rounded-xl text-xs shadow-lg transition-all active:scale-95 disabled:opacity-50"
            >
              {isGeneratingImage ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
              <span>{isGeneratingImage ? 'Gerando...' : 'Baixar Imagem'}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-[#111a2d] hover:bg-[#16223b] border border-[#202b43] text-slate-300 font-semibold py-2.5 rounded-xl text-xs transition-colors"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
