import React, { useEffect, useState, useMemo } from 'react';
import { Character, GameMode, GameStats } from '../types/anime';
import { getTimeUntilNextReset, getDailyDateString } from '../utils/dailySeed';
import {
  Trophy,
  Share2,
  Clock,
  CheckCircle2,
  Flame,
  Flag,
  Image as ImageIcon,
  Loader2,
  Heart,
  Swords,
  ArrowRight,
  Check,
  X,
  Grid,
  Eye,
  Film,
  Zap,
  ZoomIn,
  LayoutGrid,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { downloadOrShareImageCard } from '../utils/shareImage';
import { logDailyActivity, unlockAchievement, recordVictory, recordDefeat, recordSurrender } from '../data/achievements';
import {
  ORDERED_SIX_MODES,
  getNextPendingDestination,
  SurvivalState,
  FriendChallengeData,
  encodeFriendChallengeUrl,
} from '../utils/featuresManager';

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
  // Novos recursos (A4, C1, E2, F2)
  isEndless?: boolean;
  survivalState?: SurvivalState;
  survivalHealed?: boolean;
  onRestartSurvival?: () => void;
  friendChallenge?: FriendChallengeData | null;
  challengeTargetPayload?: Omit<FriendChallengeData, 's'>;
  onSendRevenge?: () => void;
  gridScore?: number;
  gridRarityAvg?: number;
}

const MODE_ICONS: Record<string, React.ReactNode> = {
  classic: <Grid size={13} />,
  wanted: <Eye size={13} />,
  scene: <Film size={13} />,
  ability: <Zap size={13} />,
  zoom: <ZoomIn size={13} />,
  grid: <LayoutGrid size={13} />,
};

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
  isEndless = false,
  survivalState,
  survivalHealed = false,
  onRestartSurvival,
  friendChallenge,
  challengeTargetPayload,
  onSendRevenge,
  gridScore,
  gridRarityAvg,
}) => {
  const [timer, setTimer] = useState(getTimeUntilNextReset());
  const [copied, setCopied] = useState(false);
  const [copiedChallenge, setCopiedChallenge] = useState(false);
  const [copiedRevenge, setCopiedRevenge] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const isLoss = Boolean(isLost && !isSurrendered);
  const isSurrender = Boolean(isSurrendered);
  const isWon = !isSurrender && !isLoss;
  const currentSlug = animeSlug || 'demon-slayer';
  const normalizedMode: GameMode = currentMode === 'exclusive' ? 'ability' : (currentMode as GameMode);

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

  const displayStreak = isWon ? (safeStats.currentStreak || 0) : 0;

  // A4: Calcula os status dos 6 modos de hoje e o próximo destino inteligente
  const nextDestination = useMemo(() => {
    const todayStr = getDailyDateString();
    return getNextPendingDestination(currentSlug, normalizedMode, todayStr);
  }, [currentSlug, normalizedMode, isWon, isLoss, isSurrender]);

  useEffect(() => {
    logDailyActivity();

    if (isWon) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

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

      if (currentMode === 'classic' && totalGuesses === 1) {
        unlockAchievement('secret_clairvoyant');
      }

      if (currentMode === 'scene') {
        const charId = targetCharacter?.id || '';
        const challengeKey = `animedle_scene_color_used_scene-${currentSlug}-${charId}`;
        const colorWasUsed = sessionStorage.getItem(challengeKey) === 'true';
        if (!colorWasUsed) {
          unlockAchievement('secret_cinema_director');
        }
      }

      const now = new Date();
      const dayOfWeek = now.getDay();
      const currentHour = now.getHours();
      if (dayOfWeek >= 1 && dayOfWeek <= 5 && currentHour >= 8 && currentHour < 12) {
        unlockAchievement('secret_skipping_class');
      }

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
  }, [isSurrender, isLoss, isWon, currentMode, totalGuesses, displayStreak, currentSlug, targetCharacter?.id]);

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

  // F2: Gerar link de desafio com o resultado embutido para comparar 1v1 com o amigo
  const handleChallengeFriendWithScore = () => {
    const basePayload: FriendChallengeData = challengeTargetPayload
      ? { ...challengeTargetPayload }
      : {
          a: currentSlug,
          m: normalizedMode,
          cid: targetCharacter?.id,
        };

    basePayload.s = {
      w: isWon ? 1 : 0,
      g: normalizedMode === 'grid' && typeof gridScore === 'number' ? gridScore : totalGuesses,
      r: normalizedMode === 'grid' ? gridRarityAvg : undefined,
    };

    const url = encodeFriendChallengeUrl(basePayload);
    const shareMsg =
      normalizedMode === 'grid'
        ? `⚔️ Desafio 1v1 no AnimeDLE (${animeTitle} - Grade 3×3)!\nFiz ${gridScore ?? 0}/9 acertos${
            gridRarityAvg ? ` com Raridade Média de ${gridRarityAvg}%` : ''
          }. Duvido você bater meu resultado:\n${url}`
        : isWon
        ? `⚔️ Desafio 1v1 no AnimeDLE (${animeTitle})!\nAcertei este personagem em ${totalGuesses} ${
            totalGuesses === 1 ? 'tentativa' : 'tentativas'
          }. Duvido você acertar em menos:\n${url}`
        : `⚔️ Desafio 1v1 no AnimeDLE (${animeTitle})!\nEsse desafio me derrotou. Duvido você acertar:\n${url}`;

    navigator.clipboard.writeText(shareMsg);
    setCopiedChallenge(true);
    setTimeout(() => setCopiedChallenge(false), 2500);
  };

  // F2: Avaliação de Confronto 1v1 quando o jogador abriu um link de desafio com placar do amigo
  const challengeComparison = useMemo(() => {
    if (!friendChallenge?.s) return null;
    const friend = friendChallenge.s;

    if (normalizedMode === 'grid') {
      const myHits = typeof gridScore === 'number' ? gridScore : isWon ? 9 : 0;
      const friendHits = friend.g;
      let outcome: 'win' | 'tie' | 'loss' = 'tie';
      if (myHits > friendHits) outcome = 'win';
      else if (myHits < friendHits) outcome = 'loss';
      else if (typeof gridRarityAvg === 'number' && typeof friend.r === 'number') {
        if (gridRarityAvg < friend.r) outcome = 'win';
        else if (gridRarityAvg > friend.r) outcome = 'loss';
      }
      return {
        outcome,
        myText: `${myHits}/9 acertos${gridRarityAvg ? ` (${gridRarityAvg}% raridade)` : ''}`,
        friendText: `${friendHits}/9 acertos${friend.r ? ` (${friend.r}% raridade)` : ''}`,
      };
    }

    const friendWon = friend.w === 1;
    let outcome: 'win' | 'tie' | 'loss' = 'tie';
    if (isWon && !friendWon) outcome = 'win';
    else if (!isWon && friendWon) outcome = 'loss';
    else if (isWon && friendWon) {
      if (totalGuesses < friend.g) outcome = 'win';
      else if (totalGuesses > friend.g) outcome = 'loss';
      else outcome = 'tie';
    } else {
      outcome = 'tie';
    }

    return {
      outcome,
      myText: isWon ? `Venceu em ${totalGuesses} tent.` : 'Derrotado',
      friendText: friendWon ? `Venceu em ${friend.g} tent.` : 'Derrotado',
    };
  }, [friendChallenge, normalizedMode, gridScore, gridRarityAvg, isWon, totalGuesses]);

  const handleTriggerRevenge = () => {
    if (onSendRevenge) {
      onSendRevenge();
      setCopiedRevenge(true);
      setTimeout(() => setCopiedRevenge(false), 2500);
    }
  };

  // A4: Navegar para um modo específico ou próximo destino diário
  const handleNavigateMode = (modeId: GameMode) => {
    onClose();
    window.dispatchEvent(
      new CustomEvent('animedle_navigate_destination', {
        detail: { type: 'mode', mode: modeId },
      })
    );
  };

  const handleNavigateNextDaily = () => {
    onClose();
    if (nextDestination.type === 'mode' && nextDestination.nextMode) {
      window.dispatchEvent(
        new CustomEvent('animedle_navigate_destination', {
          detail: { type: 'mode', mode: nextDestination.nextMode },
        })
      );
    } else if (nextDestination.type === 'anime' && nextDestination.nextAnimeSlug) {
      window.dispatchEvent(
        new CustomEvent('animedle_navigate_destination', {
          detail: {
            type: 'anime',
            animeSlug: nextDestination.nextAnimeSlug,
            mode: nextDestination.nextMode || 'classic',
          },
        })
      );
    } else {
      window.dispatchEvent(
        new CustomEvent('animedle_navigate_destination', {
          detail: { type: 'home' },
        })
      );
    }
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

    await downloadOrShareImageCard(
      {
        animeTitle,
        themeColor,
        animeSlug,
        characterName: targetCharacter.name,
        characterAvatar: targetCharacter.avatar,
        characterSub: `${targetCharacter.species || ''} • ${
          Array.isArray(targetCharacter.affiliation)
            ? targetCharacter.affiliation[0]
            : targetCharacter.affiliation || targetCharacter.origin || ''
        }`,
        modeName: modeNames[currentMode] || currentMode,
        totalGuesses,
        isWon,
        streak: displayStreak,
      },
      `animedle-${targetCharacter.id}.png`
    );

    setIsGeneratingImage(false);
  };

  const isSurvivalActive = Boolean(isEndless && survivalState?.active);
  const isSurvivalGameOver = Boolean(isSurvivalActive && survivalState?.isGameOver);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-[#0d1426] border border-[#202b43] rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative text-center my-auto max-h-[92vh] overflow-y-auto custom-scrollbar">
        {/* Banner de Vitória / Derrota / Desistência */}
        <div
          style={
            isSurrender || isLoss
              ? undefined
              : { backgroundColor: `${themeColor}20`, borderColor: `${themeColor}60`, color: themeColor }
          }
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 border ${
            isSurrender
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              : isLoss
              ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
              : 'animate-bounce'
          }`}
        >
          {isSurrender ? <Flag size={30} /> : isLoss ? <span className="text-3xl">💀</span> : <Trophy size={30} />}
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-[#F5F7FF]">
          {isSurvivalGameOver
            ? 'Fim da Sobrevivência!'
            : isSurrender
            ? 'Você Desistiu!'
            : isLoss
            ? 'Derrota!'
            : 'Excelente Trabalho!'}
        </h2>

        {/* Subtítulo */}
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
            {isSurrender
              ? 'Você desistiu da rodada. Aqui está o personagem secreto:'
              : 'Você esgotou todas as chances no desafio!'}
          </p>
        )}

        {/* E2: Painel de Status da Sobrevivência (3 Corações + Streak + Cura) */}
        {isSurvivalActive && survivalState && (
          <div className="mt-3 p-3 rounded-2xl bg-[#111a2d] border border-amber-500/30 text-left">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <Flame size={13} /> Modo Sobrevivência
              </span>
              <div className="flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <Heart
                    key={i}
                    size={15}
                    className={
                      i < survivalState.hearts
                        ? 'text-rose-500 fill-rose-500'
                        : 'text-slate-700 fill-slate-800'
                    }
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300 font-bold">
              <span>
                Sequência na Run: <strong className="text-white">{survivalState.streak}</strong>
              </span>
              <span>
                Recorde Pessoal: <strong className="text-yellow-400">{survivalState.bestStreak} 🏆</strong>
              </span>
            </div>
            {survivalHealed && (
              <div className="mt-2 px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-black text-center">
                💖 +1 Vida Recuperada (5 acertos seguidos)!
              </div>
            )}
            {!isWon && !isSurvivalGameOver && (
              <div className="mt-2 px-2.5 py-1 rounded-lg bg-rose-500/20 border border-rose-400/40 text-rose-300 text-[11px] font-bold text-center">
                💔 Você perdeu 1 coração! Ainda restam {survivalState.hearts} {survivalState.hearts === 1 ? 'vida' : 'vidas'}.
              </div>
            )}
          </div>
        )}

        {/* F2: Card de Confronto 1v1 quando veio de um Link de Desafio de Amigo */}
        {challengeComparison && (
          <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/15 via-[#131d35] to-indigo-500/15 border border-amber-400/50 text-left shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Swords size={14} /> Resultado do Desafio 1v1
              </span>
              <span
                className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  challengeComparison.outcome === 'win'
                    ? 'bg-emerald-500 text-slate-950'
                    : challengeComparison.outcome === 'tie'
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-rose-500 text-white'
                }`}
              >
                {challengeComparison.outcome === 'win'
                  ? '🏆 Você Venceu!'
                  : challengeComparison.outcome === 'tie'
                  ? '🤝 Empate!'
                  : '💀 Amigo Venceu!'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-[#0b1222] border border-[#223152] rounded-xl p-2">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Você</span>
                <strong className="text-white font-extrabold">{challengeComparison.myText}</strong>
              </div>
              <div className="bg-[#0b1222] border border-[#223152] rounded-xl p-2">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Seu Amigo</span>
                <strong className="text-amber-300 font-extrabold">{challengeComparison.friendText}</strong>
              </div>
            </div>
            {onSendRevenge && (
              <button
                type="button"
                onClick={handleTriggerRevenge}
                className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-md transition-all active:scale-95"
              >
                <Flame size={14} />
                <span>{copiedRevenge ? 'Novo Desafio Copiado! Envie ao Amigo!' : '🔥 Mandar Revanche (Novo Desafio)'}</span>
              </button>
            )}
          </div>
        )}

        {/* Card do Personagem Revelado (Oculto no Grid Mode pois a grade possui 9 personagens) */}
        {currentMode !== 'grid' && (
          <div className="my-4 p-3.5 bg-[#111a2d] border border-[#202b43] rounded-2xl flex items-center gap-3.5 text-left">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#0d1426] overflow-hidden border border-[#202b43] flex-shrink-0">
              {targetCharacter.avatar ? (
                <img src={targetCharacter.avatar} alt={targetCharacter.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-white text-xl">
                  {targetCharacter.name[0]}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 style={{ color: themeColor }} className="font-extrabold text-base sm:text-lg truncate">
                {targetCharacter.name}
              </h3>
              <p className="text-xs text-slate-300 font-medium truncate">
                {targetCharacter.species || ''}{' '}
                {targetCharacter.affiliation
                  ? `• ${
                      Array.isArray(targetCharacter.affiliation)
                        ? targetCharacter.affiliation[0]
                        : targetCharacter.affiliation
                    }`
                  : targetCharacter.origin
                  ? `• ${targetCharacter.origin}`
                  : ''}
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
        <div className="grid grid-cols-3 gap-2 my-3.5">
          <div className="bg-[#111a2d]/80 border border-[#202b43] rounded-xl p-2">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Tentativas</span>
            <p className="text-base sm:text-lg font-extrabold text-white">{totalGuesses}</p>
          </div>
          <div className="bg-[#111a2d]/80 border border-[#202b43] rounded-xl p-2">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center justify-center gap-1">
              <Flame size={12} className={isWon ? 'text-amber-500' : 'text-slate-500'} /> Sequência
            </span>
            <p className={`text-base sm:text-lg font-extrabold ${isWon ? 'text-amber-400' : 'text-slate-400'}`}>
              {isSurvivalActive && survivalState ? survivalState.streak : displayStreak}
            </p>
          </div>
          <div className="bg-[#111a2d]/80 border border-[#202b43] rounded-xl p-2">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Vitórias</span>
            <p className="text-base sm:text-lg font-extrabold text-emerald-400">{safeStats.wins || 0}</p>
          </div>
        </div>

        {/* A4: Mini-Barra dos 6 Modos Diários deste Anime (Apenas no Modo Diário) */}
        {!isEndless && (
          <div className="my-3.5 p-3 rounded-2xl bg-[#10182b] border border-[#202b43]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">
                Progresso de Hoje em {animeTitle}
              </span>
              <span className="text-[10px] font-black text-amber-400">
                {6 - nextDestination.remainingInCurrentAnime}/6 Modos
              </span>
            </div>
            <div className="grid grid-cols-6 gap-1.5">
              {ORDERED_SIX_MODES.map((m) => {
                const st = nextDestination.statuses[m.id];
                const isCurrent = m.id === normalizedMode;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleNavigateMode(m.id)}
                    title={`${m.label} (${st === 'won' ? 'Vencido' : st === 'lost' ? 'Concluído' : 'Pendente - Clique para jogar'})`}
                    className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-xl border text-[9px] font-extrabold transition-all hover:scale-105 ${
                      st === 'won'
                        ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300'
                        : st === 'lost'
                        ? 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                        : isCurrent
                        ? 'bg-amber-500/20 border-amber-400 text-white'
                        : 'bg-[#152039] border-[#263759] text-slate-300 hover:border-amber-400/60 hover:text-white'
                    }`}
                  >
                    <div className="mb-1">{MODE_ICONS[m.id]}</div>
                    <span className="truncate w-full text-center">{m.shortLabel}</span>
                    {st === 'won' && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow">
                        <Check size={9} strokeWidth={4} />
                      </span>
                    )}
                    {st === 'lost' && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white flex items-center justify-center shadow">
                        <X size={9} strokeWidth={4} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Cronômetro para próximo reset (Apenas no Modo Diário) */}
        {!isEndless && (
          <div className="bg-[#111a2d] border border-[#202b43] rounded-2xl p-2.5 my-3 flex items-center justify-between">
            <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
              <Clock size={15} style={{ color: themeColor }} /> Próximo Reset Diário:
            </span>
            <span className="font-mono text-sm font-bold text-white tracking-widest">{timer}</span>
          </div>
        )}

        {/* Botões de Ação */}
        <div className="space-y-2 mt-3">
          {/* A4: Botão Inteligente "Próximo Modo Pendente" ou "Ir para Próximo Anime" no Modo Diário */}
          {!isEndless && (
            <button
              type="button"
              onClick={handleNavigateNextDaily}
              style={{ backgroundColor: themeColor }}
              className="w-full flex items-center justify-center gap-2 text-white font-extrabold py-3 px-4 rounded-xl text-xs shadow-lg transition-all hover:brightness-110 active:scale-95"
            >
              {nextDestination.type === 'mode' ? (
                <>
                  <span>
                    Próximo Modo: {nextDestination.nextModeLabel} (Faltam {nextDestination.remainingInCurrentAnime}/6)
                  </span>
                  <ArrowRight size={15} />
                </>
              ) : nextDestination.type === 'anime' ? (
                <>
                  <span>
                    Anime 6/6 Concluído! Ir para {nextDestination.nextAnimeName}
                  </span>
                  <ArrowRight size={15} />
                </>
              ) : (
                <span>🏆 Todos os Animes do Dia Concluídos! Voltar à Home</span>
              )}
            </button>
          )}

          {/* E2 / Modo Infinito: Botão de Avançar ou Reiniciar Sobrevivência */}
          {isEndless && isSurvivalGameOver && onRestartSurvival ? (
            <button
              type="button"
              onClick={onRestartSurvival}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold py-3 px-4 rounded-xl text-xs shadow-lg transition-all active:scale-95"
            >
              <RotateCcw size={15} />
              <span>Nova Run de Sobrevivência (3 ❤️)</span>
            </button>
          ) : (
            onNext && (
              <button
                type="button"
                onClick={onNext}
                style={{ backgroundColor: themeColor }}
                className="w-full flex items-center justify-center gap-2 text-white font-extrabold py-3 px-4 rounded-xl text-xs shadow-lg transition-all hover:brightness-110 active:scale-95"
              >
                <span>
                  {isSurvivalActive && survivalState
                    ? `Continuar Sobrevivência (Streak: ${survivalState.streak}) →`
                    : nextButtonLabel}
                </span>
              </button>
            )
          )}

          {/* F2: Botão Desafiar um Amigo a bater este resultado */}
          <button
            type="button"
            onClick={handleChallengeFriendWithScore}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-400/50 text-amber-300 font-extrabold py-2.5 px-4 rounded-xl text-xs shadow-md transition-all active:scale-95"
          >
            {copiedChallenge ? <CheckCircle2 size={15} className="text-emerald-400" /> : <Swords size={15} />}
            <span>
              {copiedChallenge
                ? 'Link de Desafio Copiado! Envie para seu Amigo!'
                : '⚔️ Desafiar um Amigo a Bater Meu Resultado'}
            </span>
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#1e293b] hover:bg-[#283548] text-white font-bold py-2.5 px-3 rounded-xl text-xs shadow-md transition-all active:scale-95"
            >
              {copied ? <CheckCircle2 size={15} /> : <Share2 size={15} />}
              <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
            </button>

            <button
              type="button"
              onClick={handleGenerateImage}
              disabled={isGeneratingImage}
              className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-2.5 px-3 rounded-xl text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              {isGeneratingImage ? <Loader2 size={15} className="animate-spin" /> : <ImageIcon size={15} />}
              <span>{isGeneratingImage ? 'Gerando...' : 'Baixar Card'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full bg-[#111a2d] hover:bg-[#16223b] border border-[#202b43] text-slate-300 font-semibold py-2 rounded-xl text-xs transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
