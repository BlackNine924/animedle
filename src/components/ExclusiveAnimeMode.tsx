import React, { useState, useEffect, useMemo } from 'react';
import { Character } from '../types/anime';
import { ExclusiveChallenge, getChallengesForAnime } from '../data/exclusiveChallenges';
import { CharacterSearchInput } from './CharacterSearchInput';
import {
  Heart,
  Flame,
  Trophy,
  XCircle,
  ArrowRight,
  RotateCcw,
  Eye,
  Sparkles,
  AlertTriangle,
  Share2,
  Lightbulb,
  Check,
  Image as ImageIcon,
  Loader2,
  X
} from 'lucide-react';
import { unlockAchievement, logDailyActivity } from '../data/achievements';
import { reportChallengeInconsistency } from '../services/firebase';
import { downloadOrShareImageCard } from '../utils/shareImage';
import confetti from 'canvas-confetti';

interface ExclusiveAnimeModeProps {
  animeSlug: string;
  characters: Character[];
  themeColor: string;
}

interface SavedDailyExclusiveState {
  challengeId: string;
  completed: boolean;
  won: boolean;
  score: number;
  lives: number;
  guesses: { charId: string; charName: string; isCorrect: boolean }[];
  revealedClues: Record<number, boolean>;
}

export const ExclusiveAnimeMode: React.FC<ExclusiveAnimeModeProps> = ({
  animeSlug,
  characters,
  themeColor,
}) => {
  const [isEndless, setIsEndless] = useState<boolean>(false);
  const challenges = useMemo(() => getChallengesForAnime(animeSlug), [animeSlug]);

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const dailyStorageKey = `animedle_${animeSlug}_exclusive_daily_${todayStr}`;

  // Índice diário baseado na data
  const dailyIndex = useMemo(() => {
    if (challenges.length === 0) return 0;
    let hash = 0;
    for (let i = 0; i < todayStr.length; i++) {
      hash = (hash << 5) - hash + todayStr.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % challenges.length;
  }, [challenges, todayStr]);

  const [currentIndex, setCurrentIndex] = useState<number>(dailyIndex);
  const currentChallenge: ExclusiveChallenge | undefined =
    challenges[currentIndex % Math.max(1, challenges.length)];

  const targetCharacter = useMemo(() => {
    if (!currentChallenge) return null;
    return characters.find((c) => c.id === currentChallenge.targetCharacterId) || null;
  }, [currentChallenge, characters]);

  // Vidas estritas: 3 vidas (1 erro = -1 vida)
  const [lives, setLives] = useState<number>(3);
  // Pontos base da rodada inicial: 100 pts. Revelar pistas desconta 15 pts imediatamente em tempo real!
  const [roundBaseScore, setRoundBaseScore] = useState<number>(100);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);

  const [roundCompleted, setRoundCompleted] = useState<boolean>(false);
  const [isWonRound, setIsWonRound] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // Modais de Vitória e Derrota
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [revealedClues, setRevealedClues] = useState<Record<number, boolean>>({});
  const [roundGuesses, setRoundGuesses] = useState<
    { charId: string; charName: string; isCorrect: boolean }[]
  >([]);

  // Reportar inconsistência e compartilhamento
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [feedbackDetails, setFeedbackDetails] = useState<string>('');
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [showCopied, setShowCopied] = useState<boolean>(false);
  const [isDownloadingImage, setIsDownloadingImage] = useState<boolean>(false);

  // Carrega estado diário estritamente correspondente ao desafio de hoje
  useEffect(() => {
    if (!isEndless && currentChallenge) {
      const saved = localStorage.getItem(dailyStorageKey);
      if (saved) {
        try {
          const parsed: SavedDailyExclusiveState = JSON.parse(saved);
          if (parsed.challengeId === currentChallenge.id) {
            setRoundCompleted(parsed.completed);
            setIsWonRound(parsed.won);
            setLives(parsed.lives);
            setTotalScore(parsed.score);
            setRoundGuesses(parsed.guesses || []);
            setRevealedClues(parsed.revealedClues || {});
            setIsGameOver(!parsed.won && parsed.lives <= 0);
            setShowResultModal(parsed.completed);
            return;
          }
        } catch (e) {}
      }
      // Se não havia estado salvo ou o desafio diário é novo, inicializa limpo
      setLives(3);
      setRoundBaseScore(100);
      setRoundCompleted(false);
      setIsWonRound(false);
      setIsGameOver(false);
      setShowResultModal(false);
      setRoundGuesses([]);
      setRevealedClues({});
      setCurrentIndex(dailyIndex);
    } else {
      // Modo Infinito: limpa e sorteia novo desafio
      setLives(3);
      setRoundBaseScore(100);
      setRoundCompleted(false);
      setIsWonRound(false);
      setIsGameOver(false);
      setShowResultModal(false);
      setRoundGuesses([]);
      setRevealedClues({});
      setTotalScore(0);
      setCombo(0);
      setCurrentIndex(Math.floor(Math.random() * Math.max(1, challenges.length)));
    }
  }, [isEndless, dailyStorageKey, dailyIndex, currentChallenge?.id, challenges.length]);

  // Salva no localStorage quando o diário for finalizado
  useEffect(() => {
    if (!isEndless && roundCompleted && currentChallenge) {
      const stateToSave: SavedDailyExclusiveState = {
        challengeId: currentChallenge.id,
        completed: roundCompleted,
        won: isWonRound,
        score: totalScore,
        lives,
        guesses: roundGuesses,
        revealedClues,
      };
      localStorage.setItem(dailyStorageKey, JSON.stringify(stateToSave));
    }
  }, [isEndless, roundCompleted, isWonRound, totalScore, lives, roundGuesses, revealedClues, dailyStorageKey, currentChallenge?.id]);

  // Revelar Dica com desconto imediato de 15 pontos em tempo real
  const handleRevealClue = (idx: number) => {
    if (revealedClues[idx] || roundCompleted || isGameOver) return;
    setRevealedClues((prev) => ({ ...prev, [idx]: true }));
    // Desconta imediatamente 15 pontos do valor potencial da rodada
    setRoundBaseScore((prev) => Math.max(25, prev - 15));
  };

  // Processa o Palpite (Regra estrita: 1 erro = -1 vida)
  const handleMakeGuess = (guessedChar: Character) => {
    if (roundCompleted || isGameOver || !currentChallenge || !targetCharacter) return;
    if (roundGuesses.some((g) => g.charId === guessedChar.id)) return;

    const isCorrect =
      guessedChar.id === targetCharacter.id ||
      guessedChar.name.toLowerCase().trim() === targetCharacter.name.toLowerCase().trim();

    const newGuesses = [
      ...roundGuesses,
      { charId: guessedChar.id, charName: guessedChar.name, isCorrect },
    ];
    setRoundGuesses(newGuesses);

    if (isCorrect) {
      // Acerto!
      setIsWonRound(true);
      setRoundCompleted(true);
      setShowResultModal(true);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      logDailyActivity();
      unlockAchievement('exclusive_master');

      const currentMult = Math.max(1, combo + 1);
      const earned = roundBaseScore * currentMult;

      setTotalScore((s) => s + earned);
      setCombo((c) => c + 1);
    } else {
      // Errou: Perde exatamente 1 vida!
      const newLives = lives - 1;
      setLives(newLives);
      setCombo(0);

      if (newLives <= 0) {
        // Esgotou as 3 vidas: Derrota! Abre modal de derrota imediatamente
        setIsWonRound(false);
        setRoundCompleted(true);
        setIsGameOver(true);
        setShowResultModal(true);
      }
    }
  };

  // Avançar para o Próximo Desafio (apenas no Modo Infinito)
  const handleNextChallenge = () => {
    if (!isEndless || lives <= 0) return;
    setRevealedClues({});
    setRoundGuesses([]);
    setRoundBaseScore(100);
    setRoundCompleted(false);
    setIsWonRound(false);
    setShowResultModal(false);
    setFeedbackStatus('idle');
    setFeedbackDetails('');
    let nextIdx = Math.floor(Math.random() * challenges.length);
    if (challenges.length > 1 && nextIdx === currentIndex) {
      nextIdx = (nextIdx + 1) % challenges.length;
    }
    setCurrentIndex(nextIdx);
  };

  // Reiniciar Modo Infinito após derrota
  const handleRestartEndless = () => {
    setLives(3);
    setRoundBaseScore(100);
    setTotalScore(0);
    setCombo(0);
    setIsGameOver(false);
    setRoundCompleted(false);
    setIsWonRound(false);
    setShowResultModal(false);
    setRevealedClues({});
    setRoundGuesses([]);
    setFeedbackStatus('idle');
    setFeedbackDetails('');
    setCurrentIndex(Math.floor(Math.random() * challenges.length));
  };

  // Enviar relato para Firebase Realtime Database
  const handleSendFeedback = async () => {
    if (!feedbackDetails.trim() || !currentChallenge) return;
    setFeedbackStatus('sending');
    const success = await reportChallengeInconsistency(
      animeSlug,
      currentChallenge.id,
      feedbackDetails,
      currentChallenge.targetTitle
    );
    if (success) {
      setFeedbackStatus('sent');
      setTimeout(() => {
        setShowFeedbackModal(false);
        setFeedbackStatus('idle');
        setFeedbackDetails('');
      }, 1800);
    } else {
      setFeedbackStatus('error');
    }
  };

  // Compartilhar Resultado Diário em Texto
  const handleShareDaily = () => {
    let text = `⚔️ AnimeDLE Exclusivo (${currentChallenge?.category || 'Desafio'}) - ${todayStr}\n`;
    text += isWonRound
      ? `👑 Vitória com ${lives}/3 vidas restantes! (+${roundBaseScore} pts)\n`
      : `💀 Derrota após 3 tentativas.\n`;
    const hearts = Array(3)
      .fill(0)
      .map((_, i) => (i < lives ? '❤️' : '🖤'))
      .join('');
    text += `Vidas: ${hearts}\n\n`;
    text += `Jogue em: https://animedle-9og.pages.dev`;
    navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2500);
  };

  // Baixar Imagem do Card de Vitória / Desafio diretamente
  const handleDownloadImage = async () => {
    if (!targetCharacter || !currentChallenge) return;
    setIsDownloadingImage(true);
    await downloadOrShareImageCard(
      {
        animeTitle: animeSlug.toUpperCase(),
        themeColor,
        animeSlug,
        characterName: targetCharacter.name,
        characterAvatar: targetCharacter.avatar,
        characterSub: currentChallenge.targetTitle,
        modeName: currentChallenge.category,
        totalGuesses: roundGuesses.length,
        isWon: isWonRound,
        streak: combo,
      },
      `animedle-exclusivo-${targetCharacter.id}.png`
    );
    setIsDownloadingImage(false);
  };

  if (challenges.length === 0) {
    return (
      <div className="max-w-xl mx-auto my-8 p-6 bg-[#0d1426] border border-[#202b43] rounded-3xl text-center shadow-xl">
        <p className="text-slate-400 text-sm">
          Nenhum desafio exclusivo disponível para este anime ainda.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-6 px-3">
      {/* 1. Header com Alternador Diário / Infinito & Indicador de Vidas e Pontos */}
      <div className="bg-[#0d1426] border border-[#202b43] rounded-2xl p-4 mb-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Toggle Diário / Infinito */}
        <div className="flex items-center gap-1.5 p-1 bg-[#111a2d] rounded-xl border border-[#202b43]">
          <button
            onClick={() => setIsEndless(false)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              !isEndless
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🗓️ Desafio Diário
          </button>
          <button
            onClick={() => setIsEndless(true)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isEndless
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ⚡ Modo Infinito
          </button>
        </div>

        {/* Status: 3 Vidas (1 erro = -1 vida) & Pontos da Rodada em Tempo Real */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-[#111a2d] px-3 py-1.5 rounded-xl border border-[#202b43]">
            <span className="text-[10px] uppercase font-black text-slate-400 mr-1">Vidas:</span>
            {[0, 1, 2].map((i) => (
              <Heart
                key={i}
                size={18}
                className={
                  i < lives
                    ? 'text-rose-500 fill-rose-500 animate-pulse'
                    : 'text-slate-700 fill-slate-800'
                }
              />
            ))}
          </div>

          <div className="flex items-center gap-2 bg-[#111a2d] px-3 py-1.5 rounded-xl border border-[#202b43]">
            <span className="text-[10px] uppercase font-bold text-slate-400">Valendo:</span>
            <span className="text-xs font-black text-amber-400 transition-all">{roundBaseScore} pts</span>
            {combo > 1 && (
              <span className="flex items-center gap-0.5 text-[10px] font-black bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/40">
                <Flame size={11} /> x{combo}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Bloco Universal de Pistas da Rodada (Lâmpada piscando + Pistas da rodada) */}
      {currentChallenge && (
        <div className="max-w-3xl mx-auto my-6 p-4 bg-[#0d1426] border border-[#202b43] rounded-2xl shadow-xl shadow-black/20">
          <div className="flex items-center justify-between border-b border-[#202b43] pb-3 mb-3.5">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider">
              <Lightbulb size={16} className="text-amber-400 animate-pulse" />
              <span>Pistas da rodada</span>
            </div>
            <span className="text-[11px] text-slate-400 font-bold">
              Custo: <strong className="text-amber-400">-15 pts cada</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {currentChallenge.clues.map((clue, idx) => {
              const isRevealed = revealedClues[idx] || roundCompleted;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border transition-all ${
                    isRevealed
                      ? 'bg-[#111a2d] border-[#202b43] text-slate-200 shadow-sm'
                      : 'bg-[#090e1a] border-[#18233a] text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Pista {idx + 1}: {clue.label}
                    </span>
                    {!isRevealed && !roundCompleted && (
                      <button
                        onClick={() => handleRevealClue(idx)}
                        className="flex items-center gap-1 text-[10px] font-extrabold text-amber-400 hover:text-amber-300 transition-colors bg-amber-500/10 hover:bg-amber-500/20 px-2 py-0.5 rounded-lg border border-amber-500/30"
                      >
                        <Eye size={11} /> Revelar (-15 pts)
                      </button>
                    )}
                  </div>
                  {isRevealed ? (
                    <p className="text-xs font-semibold text-white mt-1 leading-snug">
                      {clue.value}
                    </p>
                  ) : (
                    <p className="text-[11px] text-slate-600 italic">Clique para desbloquear</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Card Principal do Desafio Exclusivo */}
      {currentChallenge && (
        <div className="bg-[#0d1426] border border-[#202b43] rounded-3xl p-5 sm:p-7 shadow-2xl relative text-center mb-6">
          {/* Badge da Categoria Sanitizado */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#111a2d] border border-[#202b43] text-xs font-black mb-3 shadow-sm">
            <Sparkles size={13} style={{ color: themeColor }} />
            <span style={{ color: themeColor }}>{currentChallenge.badgeTitle}</span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-white mb-2">
            {currentChallenge.questionTitle}
          </h3>

          {/* Destaque do Alvo */}
          <div
            style={{ borderColor: `${themeColor}70` }}
            className="p-5 sm:p-6 bg-gradient-to-b from-[#111a2d] to-[#0c1324] border-2 rounded-2xl my-4 shadow-inner"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
              "{currentChallenge.targetTitle}"
            </h2>
          </div>

          {/* 4. Campo de Busca Autocomplete Exatamente Igual ao Modo Clássico */}
          {!roundCompleted && !isGameOver && (
            <div className="mt-4">
              <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                Selecione ou pesquise o personagem correspondente:
              </span>

              <CharacterSearchInput
                characters={characters}
                guessedCharacterIds={roundGuesses.map((g) => g.charId)}
                onSelectCharacter={handleMakeGuess}
                disabled={roundCompleted || isGameOver}
                themeColor={themeColor}
              />
            </div>
          )}

          {/* Histórico de Palpites Incorretos desta Rodada */}
          {roundGuesses.length > 0 && !roundCompleted && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              {roundGuesses.map((g, i) => (
                <span
                  key={i}
                  className="text-xs font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 bg-rose-500/20 text-rose-400 border-rose-500/40 animate-shake"
                >
                  <XCircle size={14} />
                  <span>{g.charName} (-1 Vida)</span>
                </span>
              ))}
            </div>
          )}

          {/* Botão para Reabrir Resultado caso já tenha concluído */}
          {roundCompleted && (
            <div className="mt-5">
              <button
                onClick={() => setShowResultModal(true)}
                style={{ backgroundColor: isWonRound ? '#10b981' : '#f43f5e' }}
                className="px-6 py-2.5 text-white font-extrabold text-xs rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all"
              >
                Ver Resultado Completo & Compartilhar
              </button>
            </div>
          )}
        </div>
      )}

      {/* 5. MODAL DE DERROTA REAL (Full-screen Overlay Popup) */}
      {showResultModal && !isWonRound && isGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0d1426] border-2 border-rose-500/50 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative text-center">
            {/* Botão fechar modal */}
            <button
              onClick={() => setShowResultModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Ícone de Derrota */}
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 border bg-rose-500/10 text-rose-400 border-rose-500/40 shadow-lg shadow-rose-500/20 animate-shake">
              <XCircle size={36} />
            </div>

            <h2 className="text-2xl font-black text-white">Derrota!</h2>
            <p className="text-xs text-rose-400 font-bold mt-1 mb-4">
              Suas 3 vidas se esgotaram nesta rodada.
            </p>

            {/* Revelação do Personagem Secreto com Avatar e Lore */}
            {targetCharacter && (
              <div className="my-4 p-4 bg-[#111a2d] border border-[#202b43] rounded-2xl flex items-center gap-4 text-left shadow-inner">
                <img
                  src={targetCharacter.avatar}
                  alt={targetCharacter.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-rose-500 shadow-md flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Personagem Correto:
                  </span>
                  <h3 className="font-black text-lg text-white truncate">
                    {targetCharacter.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 truncate">
                    {currentChallenge?.targetTitle}
                  </p>
                </div>
              </div>
            )}

            {currentChallenge?.contextExplanation && (
              <p className="text-xs text-slate-300 leading-relaxed text-left bg-[#101729] p-3 rounded-xl border border-[#1d273f] mb-4">
                {currentChallenge.contextExplanation}
              </p>
            )}

            {/* Ações da Derrota */}
            <div className="space-y-2.5 mt-5">
              {!isEndless ? (
                <button
                  onClick={handleShareDaily}
                  className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-lg transition-all"
                >
                  <Share2 size={15} />
                  <span>{showCopied ? 'Resultado Copiado!' : 'Compartilhar Desafio'}</span>
                </button>
              ) : (
                <button
                  onClick={handleRestartEndless}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold py-3 px-4 rounded-xl text-xs shadow-lg transition-all active:scale-95"
                >
                  <RotateCcw size={15} />
                  <span>Tentar Novamente</span>
                </button>
              )}

              <button
                onClick={() => setShowFeedbackModal(true)}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
              >
                <AlertTriangle size={13} /> Reportar inconsistência neste desafio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. MODAL DE VITÓRIA REAL (Full-screen Overlay Popup) */}
      {showResultModal && isWonRound && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0d1426] border-2 border-emerald-500/50 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative text-center">
            {/* Botão fechar modal */}
            <button
              onClick={() => setShowResultModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Ícone de Vitória */}
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 border bg-emerald-500/10 text-emerald-400 border-emerald-500/40 shadow-lg shadow-emerald-500/20 animate-bounce">
              <Trophy size={36} />
            </div>

            <h2 className="text-2xl font-black text-white">Excelente Trabalho!</h2>
            <div className="inline-block mt-1 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-black">
              ✓ Acertou com {lives}/3 vidas restantes! (+{roundBaseScore} pts)
            </div>

            {/* Card do Personagem Revelado */}
            {targetCharacter && (
              <div className="my-4 p-4 bg-[#111a2d] border border-[#202b43] rounded-2xl flex items-center gap-4 text-left shadow-inner">
                <img
                  src={targetCharacter.avatar}
                  alt={targetCharacter.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-md flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="min-w-0 flex-1">
                  <h3 style={{ color: themeColor }} className="font-black text-lg truncate">
                    {targetCharacter.name}
                  </h3>
                  <p className="text-[11px] text-slate-300 truncate">
                    {currentChallenge?.targetTitle}
                  </p>
                </div>
              </div>
            )}

            {currentChallenge?.contextExplanation && (
              <p className="text-xs text-slate-300 leading-relaxed text-left bg-[#101729] p-3 rounded-xl border border-[#1d273f] mb-4">
                {currentChallenge.contextExplanation}
              </p>
            )}

            {/* Ações da Vitória */}
            <div className="space-y-2.5 mt-5">
              <div className="flex gap-2.5">
                <button
                  onClick={handleShareDaily}
                  style={{ backgroundColor: themeColor }}
                  className="flex-1 flex items-center justify-center gap-2 text-white font-bold py-3 px-3 rounded-xl text-xs shadow-lg transition-all hover:opacity-90 active:scale-95"
                >
                  <Share2 size={15} />
                  <span>{showCopied ? 'Copiado!' : 'Copiar Texto'}</span>
                </button>

                <button
                  onClick={handleDownloadImage}
                  disabled={isDownloadingImage}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 px-3 rounded-xl text-xs shadow-lg transition-all active:scale-95 disabled:opacity-50"
                >
                  {isDownloadingImage ? <Loader2 size={15} className="animate-spin" /> : <ImageIcon size={15} />}
                  <span>{isDownloadingImage ? 'Gerando...' : 'Baixar Imagem'}</span>
                </button>
              </div>

              {isEndless && (
                <button
                  onClick={handleNextChallenge}
                  style={{ backgroundColor: themeColor }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-white font-black rounded-xl text-xs shadow-lg hover:opacity-90 active:scale-95 transition-all"
                >
                  <span>Próximo Desafio</span>
                  <ArrowRight size={15} />
                </button>
              )}

              <button
                onClick={() => setShowFeedbackModal(true)}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
              >
                <AlertTriangle size={13} /> Reportar inconsistência neste desafio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Modal de Reportar Inconsistência conectado ao Firebase RTDB */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0d1426] border border-[#202b43] rounded-3xl max-w-md w-full p-5 sm:p-6 text-center shadow-2xl">
            <h4 className="text-base font-black text-white mb-2 flex items-center justify-center gap-2">
              <AlertTriangle size={18} className="text-amber-400" /> Reportar Inconsistência
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Desafio: <code className="text-slate-300 font-mono text-[10px] bg-[#111a2d] px-2 py-0.5 rounded border border-[#202b43]">{currentChallenge?.id}</code>
            </p>

            {feedbackStatus === 'sent' ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-bold my-4 flex items-center justify-center gap-2">
                <Check size={16} /> Relato gravado no banco de dados com sucesso!
              </div>
            ) : (
              <div className="space-y-3">
                <textarea
                  value={feedbackDetails}
                  onChange={(e) => setFeedbackDetails(e.target.value)}
                  placeholder="Descreva o erro de canonicidade, grafia ou inconsistência de poder..."
                  className="w-full h-28 bg-[#111a2d] border border-[#202b43] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none shadow-inner"
                />
                {feedbackStatus === 'error' && (
                  <p className="text-xs text-rose-400 font-bold">
                    Ocorreu um erro ao enviar. Tente novamente mais tarde.
                  </p>
                )}
                <button
                  onClick={handleSendFeedback}
                  disabled={!feedbackDetails.trim() || feedbackStatus === 'sending'}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-black rounded-xl text-xs transition-colors shadow-lg"
                >
                  {feedbackStatus === 'sending' ? 'Enviando...' : 'Enviar Relato ao Firebase'}
                </button>
              </div>
            )}

            <button
              onClick={() => {
                setShowFeedbackModal(false);
                setFeedbackStatus('idle');
              }}
              className="mt-4 text-xs text-slate-500 hover:text-slate-300 font-semibold"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
