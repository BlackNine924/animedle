import React, { useState, useEffect, useMemo } from 'react';
import { Character } from '../types/anime';
import { ExclusiveChallenge, getChallengesForAnime } from '../data/exclusiveChallenges';
import { Heart, Flame, Trophy, CheckCircle2, XCircle, ArrowRight, RotateCcw, Eye, Flag, Search, Sparkles, Shield, AlertTriangle } from 'lucide-react';
import { unlockAchievement, logDailyActivity } from '../data/achievements';
import confetti from 'canvas-confetti';

interface ExclusiveAnimeModeProps {
  animeSlug: string;
  characters: Character[];
  themeColor: string;
}

export const ExclusiveAnimeMode: React.FC<ExclusiveAnimeModeProps> = ({
  animeSlug,
  characters,
  themeColor,
}) => {
  // 1. Alternador Diário vs Infinito
  const [isEndless, setIsEndless] = useState<boolean>(false);

  // Desafios disponíveis para este anime
  const challenges = useMemo(() => getChallengesForAnime(animeSlug), [animeSlug]);

  // Índice diário baseado na data (YYYY-MM-DD)
  const dailyIndex = useMemo(() => {
    if (challenges.length === 0) return 0;
    const today = new Date().toISOString().split('T')[0];
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
      hash = (hash << 5) - hash + today.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % challenges.length;
  }, [challenges]);

  // Índice ativo do desafio
  const [currentIndex, setCurrentIndex] = useState<number>(dailyIndex);

  // Vidas da Sessão (3 Vidas) e Palpites da Rodada (3 Tentativas)
  const [lives, setLives] = useState<number>(3);
  const [roundAttemptsLeft, setRoundAttemptsLeft] = useState<number>(3);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [roundCompleted, setRoundCompleted] = useState<boolean>(false);
  const [isWonRound, setIsWonRound] = useState<boolean>(false);
  const [revealedClues, setRevealedClues] = useState<Record<number, boolean>>({});
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [roundGuesses, setRoundGuesses] = useState<{ charId: string; charName: string; isCorrect: boolean }[]>([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);

  // Recorde Pessoal salvo no localStorage
  const bestKey = `animedle_${animeSlug}_exclusive_best`;
  const [bestRecord, setBestRecord] = useState<{ score: number; combo: number }>(() => {
    try {
      const saved = localStorage.getItem(bestKey);
      return saved ? JSON.parse(saved) : { score: 0, combo: 0 };
    } catch {
      return { score: 0, combo: 0 };
    }
  });

  const currentChallenge: ExclusiveChallenge | undefined = challenges[currentIndex % Math.max(1, challenges.length)];

  // Personagem correspondente ao desafio
  const targetCharacter = useMemo(() => {
    if (!currentChallenge) return null;
    return characters.find(c => c.id === currentChallenge.targetCharacterId) || null;
  }, [currentChallenge, characters]);

  // Alternativas rápidas de escolha (resposta correta + 3 opções plausíveis)
  const quickOptions = useMemo(() => {
    if (!currentChallenge || !targetCharacter) return [];
    const pool = characters.filter(c => c.id !== targetCharacter.id);
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 3);
    const combined = [targetCharacter, ...shuffled].sort(() => 0.5 - Math.random());
    return combined;
  }, [currentChallenge, targetCharacter, characters]);

  // Autocomplete search suggestions
  const searchSuggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    const guessedIds = new Set(roundGuesses.map(g => g.charId));
    return characters
      .filter(c => !guessedIds.has(c.id) && c.name.toLowerCase().includes(term))
      .slice(0, 5);
  }, [searchTerm, characters, roundGuesses]);

  // Toggle Clue
  const handleRevealClue = (idx: number) => {
    setRevealedClues(prev => ({ ...prev, [idx]: true }));
  };

  // Processa Palpite
  const handleMakeGuess = (guessedChar: Character) => {
    if (roundCompleted || isGameOver || !currentChallenge || !targetCharacter) return;
    if (roundGuesses.some(g => g.charId === guessedChar.id)) return;

    const isCorrect = guessedChar.id === targetCharacter.id || guessedChar.name.toLowerCase() === targetCharacter.name.toLowerCase();
    const newGuesses = [...roundGuesses, { charId: guessedChar.id, charName: guessedChar.name, isCorrect }];
    setRoundGuesses(newGuesses);
    setSearchTerm('');

    if (isCorrect) {
      // Acertou!
      setIsWonRound(true);
      setRoundCompleted(true);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
      logDailyActivity();

      // Cálculo de Pontuação e Combo
      const cluesCost = Object.keys(revealedClues).length * 15;
      const basePoints = Math.max(25, 100 - cluesCost);
      const currentMult = Math.max(1, combo + 1);
      const earned = basePoints * currentMult;

      const newScore = score + earned;
      const newCombo = combo + 1;
      const newMaxCombo = Math.max(maxCombo, newCombo);

      setScore(newScore);
      setCombo(newCombo);
      setMaxCombo(newMaxCombo);

      if (newScore > bestRecord.score || newCombo > bestRecord.combo) {
        const updated = {
          score: Math.max(newScore, bestRecord.score),
          combo: Math.max(newCombo, bestRecord.combo),
        };
        setBestRecord(updated);
        try {
          localStorage.setItem(bestKey, JSON.stringify(updated));
        } catch {}
      }
    } else {
      // Errou uma tentativa da rodada
      const newAttempts = roundAttemptsLeft - 1;
      setRoundAttemptsLeft(newAttempts);

      if (newAttempts <= 0) {
        // Esgotou os 3 palpites da rodada: consome 1 Vida da Sessão!
        const newLives = lives - 1;
        setLives(newLives);
        setCombo(0);
        setIsWonRound(false);
        setRoundCompleted(true);

        if (newLives <= 0) {
          setIsGameOver(true);
        }
      }
    }
  };

  // Avançar para o Próximo Desafio
  const handleNextChallenge = () => {
    if (isGameOver) return;
    setRevealedClues({});
    setRoundGuesses([]);
    setSearchTerm('');
    setRoundAttemptsLeft(3);
    setRoundCompleted(false);
    setIsWonRound(false);
    setFeedbackSent(false);
    setCurrentIndex(prev => (prev + 1) % Math.max(1, challenges.length));
  };

  // Reiniciar Sessão
  const handleRestart = () => {
    setLives(3);
    setRoundAttemptsLeft(3);
    setScore(0);
    setCombo(0);
    setIsGameOver(false);
    setRoundCompleted(false);
    setIsWonRound(false);
    setRevealedClues({});
    setRoundGuesses([]);
    setSearchTerm('');
    setFeedbackSent(false);
    if (isEndless) {
      setCurrentIndex(Math.floor(Math.random() * Math.max(1, challenges.length)));
    } else {
      setCurrentIndex(dailyIndex);
    }
  };

  if (challenges.length === 0) {
    return (
      <div className="max-w-xl mx-auto my-8 p-6 bg-[#0d1426] border border-[#202b43] rounded-3xl text-center shadow-xl">
        <p className="text-slate-400 text-sm">Nenhum desafio exclusivo disponível para este anime ainda.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-6 px-3">
      {/* Header com Modo (Diário / Infinito) e Status (Vidas & Palpites) */}
      <div className="bg-[#0d1426] border border-[#202b43] rounded-2xl p-4 mb-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Toggle Diário / Infinito */}
        <div className="flex items-center gap-1.5 p-1 bg-[#111a2d] rounded-xl border border-[#202b43]">
          <button
            onClick={() => {
              setIsEndless(false);
              setCurrentIndex(dailyIndex);
              handleRestart();
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              !isEndless
                ? 'bg-rose-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🗓️ Desafio Diário
          </button>
          <button
            onClick={() => {
              setIsEndless(true);
              handleRestart();
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              isEndless
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ⚡ Modo Infinito
          </button>
        </div>

        {/* Vidas da Sessão (3) e Palpites da Rodada (3) */}
        <div className="flex items-center gap-4">
          {/* Vidas da Sessão */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 mr-1">Vidas:</span>
            {[0, 1, 2].map(i => (
              <Heart
                key={i}
                size={18}
                className={i < lives ? 'text-rose-500 fill-rose-500 animate-pulse' : 'text-slate-600 fill-slate-700/50'}
              />
            ))}
          </div>

          {/* Palpites da Rodada */}
          <div className="flex items-center gap-1 bg-[#111a2d] px-2.5 py-1 rounded-lg border border-[#202b43]">
            <Shield size={13} className="text-amber-400" />
            <span className="text-xs font-black text-white">{roundAttemptsLeft}/3</span>
            <span className="text-[10px] text-slate-400 font-medium">tentativas</span>
          </div>

          {/* Pontuação & Combo */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-amber-400">{score} pts</span>
            {combo > 1 && (
              <span className="flex items-center gap-0.5 text-[10px] font-black bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/40">
                <Flame size={11} /> x{combo}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Principal da Pergunta */}
      {currentChallenge && (
        <div className="bg-[#0d1426] border border-[#202b43] rounded-3xl p-5 sm:p-7 shadow-2xl relative text-center mb-6">
          {/* Badge da Categoria */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111a2d] border border-[#202b43] text-xs font-black mb-3">
            <Sparkles size={13} style={{ color: themeColor }} />
            <span style={{ color: themeColor }}>{currentChallenge.badgeTitle}</span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-white mb-2">
            {currentChallenge.questionTitle}
          </h3>

          {/* Destaque do Nome / Alvo */}
          <div
            style={{ borderColor: `${themeColor}60` }}
            className="p-5 sm:p-6 bg-gradient-to-b from-[#111a2d] to-[#0d1527] border-2 rounded-2xl my-4 shadow-inner"
          >
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              "{currentChallenge.targetTitle}"
            </h2>
          </div>

          {/* 3 Dicas Progressivas */}
          <div className="space-y-2.5 my-5 text-left">
            {currentChallenge.clues.map((clue, idx) => {
              const isRevealed = revealedClues[idx] || roundCompleted;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border transition-all ${
                    isRevealed
                      ? 'bg-[#111a2d] border-[#202b43] text-slate-200 shadow-sm'
                      : 'bg-[#0b1120] border-[#18233a] text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                      💡 Dica {idx + 1}: {clue.label}
                    </span>
                    {!isRevealed && !roundCompleted && (
                      <button
                        onClick={() => handleRevealClue(idx)}
                        className="flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 transition-colors bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30"
                      >
                        <Eye size={12} /> Revelar (-15 pts)
                      </button>
                    )}
                  </div>
                  {isRevealed && (
                    <p className="text-xs sm:text-sm font-semibold text-white mt-1">
                      {clue.value}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Área de Resposta: Botões Rápidos e Campo de Busca */}
          {!roundCompleted && !isGameOver && (
            <div className="mt-6">
              <span className="text-[11px] uppercase font-bold text-slate-400 block mb-2">
                Selecione uma opção ou digite o nome do personagem:
              </span>

              {/* Botões Rápidos (4 alternativas) */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mb-4">
                {quickOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleMakeGuess(opt)}
                    className="p-3 bg-[#111a2d] hover:bg-[#16223b] border border-[#202b43] hover:border-slate-500 rounded-xl text-left flex items-center gap-2.5 transition-all group"
                  >
                    <img
                      src={opt.avatar}
                      alt={opt.name}
                      className="w-9 h-9 rounded-full object-cover border border-[#202b43] group-hover:border-white/50 flex-shrink-0"
                    />
                    <span className="text-xs font-bold text-slate-200 group-hover:text-white truncate">
                      {opt.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Campo de Busca Autocomplete */}
              <div className="relative max-w-md mx-auto">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Ou pesquise qualquer outro personagem..."
                  className="w-full bg-[#111a2d] border border-[#202b43] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />

                {/* Sugestões do Autocomplete */}
                {searchSuggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-[#0e1628] border border-[#202b43] rounded-xl overflow-hidden shadow-2xl z-20">
                    {searchSuggestions.map((char) => (
                      <button
                        key={char.id}
                        onClick={() => handleMakeGuess(char)}
                        className="w-full p-2.5 flex items-center gap-3 hover:bg-[#152038] text-left transition-colors border-b border-[#18233a] last:border-0"
                      >
                        <img src={char.avatar} alt={char.name} className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-xs font-bold text-white truncate">{char.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Histórico de Tentativas da Rodada */}
          {roundGuesses.length > 0 && !roundCompleted && (
            <div className="flex items-center justify-center gap-2 mt-4">
              {roundGuesses.map((g, i) => (
                <span
                  key={i}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
                    g.isCorrect
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                  }`}
                >
                  {g.isCorrect ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                  {g.charName}
                </span>
              ))}
            </div>
          )}

          {/* Banner de Resultado da Rodada (Acertou ou Esgotou) */}
          {roundCompleted && (
            <div className="mt-6 p-4 sm:p-5 bg-[#111a2d] border border-[#202b43] rounded-2xl animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-left">
                {targetCharacter && (
                  <img
                    src={targetCharacter.avatar}
                    alt={targetCharacter.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 shadow-md flex-shrink-0"
                    style={{ borderColor: isWonRound ? '#10b981' : '#f43f5e' }}
                  />
                )}
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-1 ${
                      isWonRound
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    }`}
                  >
                    {isWonRound ? '✓ Resposta Correta!' : '🚩 Tentativas Esgotadas! (-1 Vida)'}
                  </span>
                  <h4 className="text-lg font-black text-white truncate">
                    {targetCharacter?.name || currentChallenge.targetCharacterName}
                  </h4>
                  {currentChallenge.contextExplanation && (
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {currentChallenge.contextExplanation}
                    </p>
                  )}
                </div>
              </div>

              {/* Ações após a Rodada */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-[#202b43]">
                <button
                  onClick={() => setShowFeedbackModal(true)}
                  className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <AlertTriangle size={13} /> Reportar inconsistência
                </button>

                {!isGameOver && (
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

          {/* Fim de Jogo (Game Over - 0 vidas) */}
          {isGameOver && (
            <div className="mt-6 p-6 bg-gradient-to-b from-rose-950/40 to-[#0d1426] border-2 border-rose-500/40 rounded-2xl text-center animate-scale-in">
              <Trophy size={40} className="text-amber-400 mx-auto mb-2" />
              <h3 className="text-xl font-black text-white">Sessão Encerrada!</h3>
              <p className="text-xs text-slate-400 mt-1 mb-4">
                Suas 3 vidas se esgotaram. Veja o seu desempenho nesta partida:
              </p>

              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto mb-5">
                <div className="p-3 bg-[#111a2d] rounded-xl border border-[#202b43]">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Pontuação</span>
                  <p className="text-xl font-black text-white">{score} pts</p>
                </div>
                <div className="p-3 bg-[#111a2d] rounded-xl border border-[#202b43]">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Maior Combo</span>
                  <p className="text-xl font-black text-amber-400">🔥 x{maxCombo}</p>
                </div>
              </div>

              <button
                onClick={handleRestart}
                className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold rounded-xl text-xs shadow-xl active:scale-95 transition-all"
              >
                <RotateCcw size={15} />
                <span>Jogar Novamente</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal de Reportar Inconsistência */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0d1426] border border-[#202b43] rounded-3xl max-w-sm w-full p-5 text-center shadow-2xl">
            <h4 className="text-sm font-black text-white mb-2 flex items-center justify-center gap-2">
              <AlertTriangle size={16} className="text-amber-400" /> Reportar Problema
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Identificador da questão: <code className="text-slate-300 font-mono text-[10px] bg-[#111a2d] px-1.5 py-0.5 rounded">{currentChallenge?.id}</code>
            </p>
            {feedbackSent ? (
              <p className="text-xs text-emerald-400 font-bold my-4">
                ✓ Relato registrado com sucesso! Obrigado pelo feedback.
              </p>
            ) : (
              <div className="space-y-3">
                <textarea
                  placeholder="Descreva o erro de canonicidade ou digitação..."
                  className="w-full h-24 bg-[#111a2d] border border-[#202b43] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                />
                <button
                  onClick={() => {
                    setFeedbackSent(true);
                    setTimeout(() => setShowFeedbackModal(false), 1500);
                  }}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-xl text-xs transition-colors"
                >
                  Enviar Relato
                </button>
              </div>
            )}
            <button
              onClick={() => setShowFeedbackModal(false)}
              className="mt-3 text-xs text-slate-500 hover:text-slate-300"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
