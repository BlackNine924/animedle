import React, { useState, useEffect, useMemo } from 'react';
import { Character } from '../types/anime';
import { ExclusiveChallenge, getChallengesForAnime } from '../data/exclusiveChallenges';
import {
  Heart,
  Flame,
  Trophy,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Eye,
  Search,
  Sparkles,
  AlertTriangle,
  Share2,
  HelpCircle,
  Check
} from 'lucide-react';
import { unlockAchievement, logDailyActivity } from '../data/achievements';
import { reportChallengeInconsistency } from '../services/firebase';
import confetti from 'canvas-confetti';

interface ExclusiveAnimeModeProps {
  animeSlug: string;
  characters: Character[];
  themeColor: string;
}

interface SavedDailyExclusiveState {
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

  // Índice diário pseudo-aleatório baseado na data
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

  // Vidas estritas: 3 vidas (1 erro = -1 vida)
  const [lives, setLives] = useState<number>(3);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);

  const [roundCompleted, setRoundCompleted] = useState<boolean>(false);
  const [isWonRound, setIsWonRound] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const [revealedClues, setRevealedClues] = useState<Record<number, boolean>>({});
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [roundGuesses, setRoundGuesses] = useState<
    { charId: string; charName: string; isCorrect: boolean }[]
  >([]);

  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [feedbackDetails, setFeedbackDetails] = useState<string>('');
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [showCopied, setShowCopied] = useState<boolean>(false);

  // Carrega estado diário se existir
  useEffect(() => {
    if (!isEndless) {
      const saved = localStorage.getItem(dailyStorageKey);
      if (saved) {
        try {
          const parsed: SavedDailyExclusiveState = JSON.parse(saved);
          setRoundCompleted(parsed.completed);
          setIsWonRound(parsed.won);
          setLives(parsed.lives);
          setScore(parsed.score);
          setRoundGuesses(parsed.guesses || []);
          setRevealedClues(parsed.revealedClues || {});
          setIsGameOver(!parsed.won && parsed.lives <= 0);
          setCurrentIndex(dailyIndex);
          return;
        } catch (e) {}
      }
      // Se não havia estado salvo no diário, inicializa limpo
      setLives(3);
      setRoundCompleted(false);
      setIsWonRound(false);
      setIsGameOver(false);
      setRoundGuesses([]);
      setRevealedClues({});
      setCurrentIndex(dailyIndex);
    } else {
      // Modo Infinito: limpa e sorteia
      setLives(3);
      setRoundCompleted(false);
      setIsWonRound(false);
      setIsGameOver(false);
      setRoundGuesses([]);
      setRevealedClues({});
      setScore(0);
      setCombo(0);
      setCurrentIndex(Math.floor(Math.random() * Math.max(1, challenges.length)));
    }
  }, [isEndless, dailyStorageKey, dailyIndex, challenges.length]);

  // Salva no localStorage quando o diário for finalizado
  useEffect(() => {
    if (!isEndless && roundCompleted) {
      const stateToSave: SavedDailyExclusiveState = {
        completed: roundCompleted,
        won: isWonRound,
        score,
        lives,
        guesses: roundGuesses,
        revealedClues,
      };
      localStorage.setItem(dailyStorageKey, JSON.stringify(stateToSave));
    }
  }, [isEndless, roundCompleted, isWonRound, score, lives, roundGuesses, revealedClues, dailyStorageKey]);

  const currentChallenge: ExclusiveChallenge | undefined =
    challenges[currentIndex % Math.max(1, challenges.length)];

  const targetCharacter = useMemo(() => {
    if (!currentChallenge) return null;
    return characters.find((c) => c.id === currentChallenge.targetCharacterId) || null;
  }, [currentChallenge, characters]);

  // Autocomplete search suggestions
  const searchSuggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    const guessedIds = new Set(roundGuesses.map((g) => g.charId));
    return characters
      .filter((c) => !guessedIds.has(c.id) && c.name.toLowerCase().includes(term))
      .slice(0, 6);
  }, [searchTerm, characters, roundGuesses]);

  // Revelar Dica (-15 pontos reais)
  const handleRevealClue = (idx: number) => {
    if (revealedClues[idx] || roundCompleted || isGameOver) return;
    setRevealedClues((prev) => ({ ...prev, [idx]: true }));
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
    setSearchTerm('');

    if (isCorrect) {
      // Acerto!
      setIsWonRound(true);
      setRoundCompleted(true);
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.7 } });
      logDailyActivity();
      unlockAchievement('exclusive_master');

      // Cálculo de pontuação com desconto real de dicas (-15 pts cada)
      const cluesPenalty = Object.keys(revealedClues).length * 15;
      const basePoints = Math.max(25, 100 - cluesPenalty);
      const currentMult = Math.max(1, combo + 1);
      const earned = basePoints * currentMult;

      setScore((s) => s + earned);
      setCombo((c) => c + 1);
      setMaxCombo((m) => Math.max(m, combo + 1));
    } else {
      // Errou: Perde exatamente 1 vida!
      const newLives = lives - 1;
      setLives(newLives);
      setCombo(0);

      if (newLives <= 0) {
        // Esgotou as 3 vidas: Derrota!
        setIsWonRound(false);
        setRoundCompleted(true);
        setIsGameOver(true);
      }
    }
  };

  // Avançar para o Próximo Desafio (apenas no Modo Infinito)
  const handleNextChallenge = () => {
    if (!isEndless || lives <= 0) return;
    setRevealedClues({});
    setRoundGuesses([]);
    setSearchTerm('');
    setRoundCompleted(false);
    setIsWonRound(false);
    setFeedbackStatus('idle');
    setFeedbackDetails('');
    // Escolhe aleatoriamente outro desafio diferente do atual
    let nextIdx = Math.floor(Math.random() * challenges.length);
    if (challenges.length > 1 && nextIdx === currentIndex) {
      nextIdx = (nextIdx + 1) % challenges.length;
    }
    setCurrentIndex(nextIdx);
  };

  // Reiniciar Modo Infinito após derrota
  const handleRestartEndless = () => {
    setLives(3);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setIsGameOver(false);
    setRoundCompleted(false);
    setIsWonRound(false);
    setRevealedClues({});
    setRoundGuesses([]);
    setSearchTerm('');
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

  // Compartilhar Resultado Diário
  const handleShareDaily = () => {
    let text = `AnimeDLE Exclusivo (${currentChallenge?.category || 'Desafio'}) - ${todayStr}\n`;
    text += isWonRound
      ? `👑 Vitória com ${lives}/3 vidas restantes! (+${score} pts)\n`
      : `💀 Derrota após 3 tentativas.\n`;
    const hearts = Array(3)
      .fill(0)
      .map((_, i) => (i < lives ? '❤️' : '🖤'))
      .join('');
    text += `Vidas: ${hearts}\n\n`;
    text += `Jogue em: https://animedle.online`;
    navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2500);
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
      {/* 1. Header com Alternador Diário / Infinito & Indicador de Vidas Estritas */}
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

        {/* Status: 3 Vidas (1 erro = -1 vida) & Pontuação */}
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

          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-amber-400">{score} pts</span>
            {combo > 1 && (
              <span className="flex items-center gap-0.5 text-[10px] font-black bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-md border border-amber-500/40">
                <Flame size={12} /> x{combo}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Bloco de DICAS SEPARADO ACIMA do Bloco Principal (Padrão HintBox) */}
      {currentChallenge && (
        <div className="bg-[#0b101e] border border-[#1d273d] rounded-2xl p-4 sm:p-5 mb-5 shadow-lg">
          <div className="flex items-center justify-between mb-3 border-b border-[#1b253b] pb-2.5">
            <div className="flex items-center gap-2 text-slate-300 text-xs font-extrabold uppercase tracking-wider">
              <HelpCircle size={15} className="text-amber-400" />
              <span>Dicas Disponíveis</span>
            </div>
            <span className="text-[11px] text-slate-500 font-bold">
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
                      ? 'bg-[#121c32] border-[#22304d] text-slate-200'
                      : 'bg-[#0d1426] border-[#18233a] text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Dica {idx + 1}: {clue.label}
                    </span>
                    {!isRevealed && !roundCompleted && (
                      <button
                        onClick={() => handleRevealClue(idx)}
                        className="flex items-center gap-1 text-[10px] font-extrabold text-amber-400 hover:text-amber-300 transition-colors bg-amber-500/10 hover:bg-amber-500/20 px-2 py-0.5 rounded-lg border border-amber-500/30"
                      >
                        <Eye size={11} /> Revelar (-15)
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
          {/* Badge da Categoria Sanitizado (sem spoilers) */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#111a2d] border border-[#202b43] text-xs font-black mb-3 shadow-sm">
            <Sparkles size={13} style={{ color: themeColor }} />
            <span style={{ color: themeColor }}>{currentChallenge.badgeTitle}</span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-white mb-2">
            {currentChallenge.questionTitle}
          </h3>

          {/* Destaque do Alvo (Nome da Técnica / Fruta / Titã / etc.) */}
          <div
            style={{ borderColor: `${themeColor}70` }}
            className="p-5 sm:p-6 bg-gradient-to-b from-[#111a2d] to-[#0c1324] border-2 rounded-2xl my-4 shadow-inner"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
              "{currentChallenge.targetTitle}"
            </h2>
          </div>

          {/* 4. Campo de Busca Autocomplete Exclusivo (SEM ALTERNATIVAS RÁPIDAS) */}
          {!roundCompleted && !isGameOver && (
            <div className="mt-6 max-w-md mx-auto">
              <span className="text-[11px] uppercase font-bold text-slate-400 block mb-2">
                Digite o nome do personagem correspondente:
              </span>

              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Pesquise o personagem..."
                  className="w-full bg-[#111a2d] border border-[#202b43] rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 shadow-inner"
                />

                {/* Dropdown do Autocomplete */}
                {searchSuggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#0e1628] border border-[#202b43] rounded-2xl overflow-hidden shadow-2xl z-30 max-h-60 overflow-y-auto">
                    {searchSuggestions.map((char) => (
                      <button
                        key={char.id}
                        onClick={() => handleMakeGuess(char)}
                        className="w-full p-2.5 sm:p-3 flex items-center gap-3 hover:bg-[#152038] text-left transition-colors border-b border-[#18233a] last:border-0"
                      >
                        <img
                          src={char.avatar}
                          alt={char.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-600 shadow-sm"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <span className="text-xs sm:text-sm font-bold text-white truncate">
                          {char.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
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

          {/* 5. Banner de Vitória da Rodada */}
          {roundCompleted && isWonRound && (
            <div className="mt-6 p-5 sm:p-6 bg-[#111a2d] border border-emerald-500/40 rounded-2xl animate-fade-in shadow-xl text-left">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {targetCharacter && (
                  <img
                    src={targetCharacter.avatar}
                    alt={targetCharacter.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-emerald-500 shadow-lg flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    ✓ Resposta Correta!
                  </span>
                  <h4 className="text-xl font-black text-white truncate">
                    {targetCharacter?.name || currentChallenge.targetCharacterName}
                  </h4>
                  {currentChallenge.contextExplanation && (
                    <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                      {currentChallenge.contextExplanation}
                    </p>
                  )}
                </div>
              </div>

              {/* Botões de Ação na Vitória */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-3 border-t border-[#202b43]">
                <button
                  onClick={() => setShowFeedbackModal(true)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <AlertTriangle size={13} /> Reportar inconsistência
                </button>

                {!isEndless ? (
                  <button
                    onClick={handleShareDaily}
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs shadow-lg transition-all ml-auto"
                  >
                    <Share2 size={14} />
                    <span>{showCopied ? 'Resultado Copiado!' : 'Compartilhar Diário'}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    style={{ backgroundColor: themeColor }}
                    className="flex items-center gap-2 px-5 py-2.5 text-white font-extrabold rounded-xl text-xs shadow-lg hover:opacity-90 active:scale-95 transition-all ml-auto"
                  >
                    <span>Próximo Desafio</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* 6. Modal / Banner de Derrota Dedicado (0 Vidas) */}
          {roundCompleted && !isWonRound && (
            <div className="mt-6 p-6 bg-gradient-to-b from-rose-950/40 to-[#0d1426] border-2 border-rose-500/40 rounded-2xl text-center animate-scale-in shadow-2xl">
              <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <XCircle size={32} />
              </div>
              <h3 className="text-xl font-black text-white">Derrota! As 3 vidas acabaram.</h3>
              <p className="text-xs text-slate-400 mt-1 mb-4">
                A resposta correta para este desafio era:
              </p>

              {/* Revelação do Personagem Correto */}
              {targetCharacter && (
                <div className="inline-flex items-center gap-3 p-3 bg-[#111a2d] border border-[#202b43] rounded-2xl max-w-sm mb-4">
                  <img
                    src={targetCharacter.avatar}
                    alt={targetCharacter.name}
                    className="w-12 h-12 rounded-xl object-cover border border-rose-500/50"
                  />
                  <div className="text-left">
                    <span className="text-sm font-black text-white block">
                      {targetCharacter.name}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {currentChallenge.targetTitle}
                    </span>
                  </div>
                </div>
              )}

              {currentChallenge.contextExplanation && (
                <p className="text-xs text-slate-300 max-w-md mx-auto mb-5 leading-relaxed">
                  {currentChallenge.contextExplanation}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setShowFeedbackModal(true)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors mr-2"
                >
                  <AlertTriangle size={13} /> Reportar inconsistência
                </button>

                {!isEndless ? (
                  <button
                    onClick={handleShareDaily}
                    className="flex items-center gap-2 px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-extrabold rounded-xl text-xs shadow-lg transition-all"
                  >
                    <Share2 size={14} />
                    <span>{showCopied ? 'Resultado Copiado!' : 'Compartilhar Desafio'}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleRestartEndless}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold rounded-xl text-xs shadow-xl active:scale-95 transition-all"
                  >
                    <RotateCcw size={14} />
                    <span>Tentar Novamente</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 7. Modal de Reportar Inconsistência conectado ao Firebase RTDB */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
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
