import React, { useState, useEffect, useMemo } from 'react';
import { Character } from '../types/anime';
import { Heart, Flame, Star, Trophy, Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, Lock, Eye, Zap, Shield, BookOpen } from 'lucide-react';

interface ExclusiveAbilityModeProps {
  animeSlug: 'jujutsu-kaisen' | 'bleach';
  characters: Character[];
  themeColor: string;
}

type JJKFilter = 'all' | 'technique' | 'domain' | 'description';
type BleachFilter = 'all' | 'bankai' | 'zanpakuto' | 'division';

interface ChallengeItem {
  id: string;
  character: Character;
  type: 'technique' | 'domain' | 'bankai' | 'zanpakuto' | 'division' | 'description';
  questionTitle: string;
  badge1: string;
  badge2?: string;
  targetName: string;
  clues: {
    label: string;
    value: string;
  }[];
}

export const ExclusiveAbilityMode: React.FC<ExclusiveAbilityModeProps> = ({
  animeSlug,
  characters,
  themeColor,
}) => {
  // Filters
  const [jjkFilter, setJjkFilter] = useState<JJKFilter>('all');
  const [bleachFilter, setBleachFilter] = useState<BleachFilter>('all');

  // Game state (3 Lives / Combo / Score)
  const [lives, setLives] = useState<number>(3);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  const [totalWins, setTotalWins] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [roundCompleted, setRoundCompleted] = useState<boolean>(false);

  // Clues state: record of opened clue indices for current round
  const [revealedClues, setRevealedClues] = useState<Record<number, boolean>>({});

  // Input & attempts for current round
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [roundGuesses, setRoundGuesses] = useState<{ character: Character; isCorrect: boolean }[]>([]);

  // Personal Best stored in localStorage
  const bestRecordKey = `animedle_${animeSlug}_best_record`;
  const [bestRecord, setBestRecord] = useState<{ score: number; combo: number }>(() => {
    try {
      const saved = localStorage.getItem(bestRecordKey);
      return saved ? JSON.parse(saved) : { score: 0, combo: 0 };
    } catch {
      return { score: 0, combo: 0 };
    }
  });

  // Build the complete challenge pool based on anime dataset
  const challenges = useMemo(() => {
    const list: ChallengeItem[] = [];

    if (animeSlug === 'jujutsu-kaisen') {
      characters.forEach((c) => {
        // 1. Inate Technique Challenge
        if (c.styleOrPower && c.styleOrPower !== 'Nenhum' && c.styleOrPower !== 'Nenhuma' && !c.styleOrPower.includes('Sem Técnica')) {
          list.push({
            id: `${c.id}-technique`,
            character: c,
            type: 'technique',
            questionTitle: 'A quem pertence esta técnica?',
            badge1: '★ TÉCNICA INATA',
            badge2: c.grade || 'Feiticeiro',
            targetName: c.styleOrPower,
            clues: [
              { label: 'Arco de estreia', value: c.debutArc || 'Arco Inicial' },
              { label: 'Grau / Classificação', value: c.grade || 'Especial' },
              { label: 'Frase Marcante', value: c.quote ? `"${c.quote}"` : 'Feitiço de alto nível' },
              { label: 'Afiliação / Clã', value: c.affiliation?.join(', ') || 'Feiticeiro' },
            ],
          });
        }

        // 2. Domain Expansion Challenge
        if (c.domainExpansion && c.domainExpansion.trim() !== '' && c.domainExpansion !== 'Nenhum') {
          list.push({
            id: `${c.id}-domain`,
            character: c,
            type: 'domain',
            questionTitle: 'De quem é esta Expansão de Domínio?',
            badge1: '⛩ EXPANSÃO DE DOMÍNIO',
            badge2: 'Técnica de Barreira Suprema',
            targetName: c.domainExpansion,
            clues: [
              { label: 'Arco de estreia', value: c.debutArc || 'Incidente de Shibuya' },
              { label: 'Técnica Base', value: c.styleOrPower || 'Energia Amaldiçoada' },
              { label: 'Frase de Ativação', value: c.quote ? `"${c.quote}"` : 'Ryoiki Tenkai' },
              { label: 'Afiliação / Clã', value: c.affiliation?.join(', ') || 'Xamã Jujutsu' },
            ],
          });
        }

        // 3. Description Challenge
        if (c.styleOrPower && c.styleOrPower.length > 5) {
          list.push({
            id: `${c.id}-desc`,
            character: c,
            type: 'description',
            questionTitle: 'Qual feiticeiro utiliza esta habilidade?',
            badge1: '📖 DESCRIÇÃO DE PODER',
            badge2: c.grade || 'Feiticeiro',
            targetName: `Usuário da habilidade: "${c.styleOrPower}"`,
            clues: [
              { label: 'Arco de estreia', value: c.debutArc || 'Jujutsu Kaisen' },
              { label: 'Status atual', value: c.status || 'Ativo' },
              { label: 'Citação do personagem', value: c.quote ? `"${c.quote}"` : 'Energia concentrada' },
              { label: 'Afiliação / Clã', value: c.affiliation?.join(', ') || 'Escola de Jujutsu' },
            ],
          });
        }
      });
    } else if (animeSlug === 'bleach') {
      characters.forEach((c) => {
        const isBankai = c.maxRelease === 'Bankai';
        const hasZanpakuto = c.styleOrPower && c.styleOrPower !== 'Nenhum' && c.styleOrPower !== 'Nenhuma';

        // 1. Bankai Challenge
        if (isBankai && hasZanpakuto) {
          list.push({
            id: `${c.id}-bankai`,
            character: c,
            type: 'bankai',
            questionTitle: 'De quem é esta Bankai?',
            badge1: '🌸 BANKAI',
            badge2: c.rank || 'Gotei 13',
            targetName: c.styleOrPower,
            clues: [
              { label: 'Divisão / Esquadrão', value: c.affiliation?.find(a => a.includes('Divisão')) || c.affiliation?.[0] || 'Gotei 13' },
              { label: 'Posto / Cargo', value: c.rank || 'Capitão' },
              { label: 'Arco de estreia', value: c.debutArc || 'Soul Society' },
              { label: 'Frase Marcante', value: c.quote ? `"${c.quote}"` : 'Liberação da lâmina' },
            ],
          });
        }

        // 2. Zanpakutō Challenge
        if (hasZanpakuto) {
          list.push({
            id: `${c.id}-zanpakuto`,
            character: c,
            type: 'zanpakuto',
            questionTitle: 'Qual é o portador desta Zanpakutō / Arma?',
            badge1: '⚔ ZANPAKUTŌ',
            badge2: c.maxRelease || 'Espadachim',
            targetName: c.styleOrPower,
            clues: [
              { label: 'Divisão / Afiliação', value: c.affiliation?.join(', ') || 'Soul Society' },
              { label: 'Liberação Máxima', value: c.maxRelease || 'Shikai' },
              { label: 'Arco de estreia', value: c.debutArc || 'Soul Society' },
              { label: 'Frase Marcante', value: c.quote ? `"${c.quote}"` : 'Bankai!' },
            ],
          });
        }

        // 3. Division / Squad Challenge
        const divisionAff = c.affiliation?.find(a => a.includes('Divisão'));
        if (divisionAff) {
          list.push({
            id: `${c.id}-division`,
            character: c,
            type: 'division',
            questionTitle: 'Identifique o Shinigami desta Divisão:',
            badge1: '🛡 DIVISÃO DO GOTEI 13',
            badge2: c.rank || 'Membro Oficial',
            targetName: `${divisionAff} — ${c.rank || 'Oficial'}`,
            clues: [
              { label: 'Nome da Zanpakutō', value: c.styleOrPower || 'Katana Padrão' },
              { label: 'Liberação Máxima', value: c.maxRelease || 'Shikai' },
              { label: 'Arco de estreia', value: c.debutArc || 'Soul Society' },
              { label: 'Frase do Personagem', value: c.quote ? `"${c.quote}"` : 'Pela Soul Society' },
            ],
          });
        }
      });
    }

    return list;
  }, [animeSlug, characters]);

  // Filtered challenges based on user selection
  const filteredChallenges = useMemo(() => {
    if (animeSlug === 'jujutsu-kaisen') {
      if (jjkFilter === 'technique') return challenges.filter(c => c.type === 'technique');
      if (jjkFilter === 'domain') return challenges.filter(c => c.type === 'domain');
      if (jjkFilter === 'description') return challenges.filter(c => c.type === 'description');
      return challenges;
    } else {
      if (bleachFilter === 'bankai') return challenges.filter(c => c.type === 'bankai');
      if (bleachFilter === 'zanpakuto') return challenges.filter(c => c.type === 'zanpakuto');
      if (bleachFilter === 'division') return challenges.filter(c => c.type === 'division');
      return challenges;
    }
  }, [animeSlug, challenges, jjkFilter, bleachFilter]);

  // Current challenge index
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentChallenge = filteredChallenges[currentIndex % Math.max(1, filteredChallenges.length)];

  // Next round
  const handleNextChallenge = () => {
    setRevealedClues({});
    setRoundGuesses([]);
    setSelectedChar(null);
    setSearchTerm('');
    setRoundCompleted(false);
    setCurrentIndex(prev => (prev + 1) % Math.max(1, filteredChallenges.length));
  };

  // Restart game
  const handleRestart = () => {
    setLives(3);
    setScore(0);
    setCombo(0);
    setTotalWins(0);
    setIsGameOver(false);
    setRoundCompleted(false);
    setRevealedClues({});
    setRoundGuesses([]);
    setSelectedChar(null);
    setSearchTerm('');
    setCurrentIndex(Math.floor(Math.random() * Math.max(1, filteredChallenges.length)));
  };

  // Toggle reveal clue
  const handleRevealClue = (idx: number) => {
    if (revealedClues[idx]) return;
    setRevealedClues(prev => ({ ...prev, [idx]: true }));
  };

  // Handle Guess
  const handleGuess = () => {
    if (!selectedChar || roundCompleted || isGameOver || !currentChallenge) return;

    const isCorrect = selectedChar.id === currentChallenge.character.id || selectedChar.name === currentChallenge.character.name;

    const newGuesses = [...roundGuesses, { character: selectedChar, isCorrect }];
    setRoundGuesses(newGuesses);
    setSelectedChar(null);
    setSearchTerm('');

    if (isCorrect) {
      // Calculate points
      const cluesOpenedCount = Object.keys(revealedClues).length;
      const basePoints = 100;
      const cluePenalty = cluesOpenedCount * 15;
      const currentMultiplier = Math.max(1, combo + 1);
      const pointsEarned = Math.max(25, (basePoints - cluePenalty)) * currentMultiplier;

      const newScore = score + pointsEarned;
      const newCombo = combo + 1;
      const newMaxCombo = Math.max(maxCombo, newCombo);
      const newWins = totalWins + 1;

      setScore(newScore);
      setCombo(newCombo);
      setMaxCombo(newMaxCombo);
      setTotalWins(newWins);
      setRoundCompleted(true);

      // Update personal best
      if (newScore > bestRecord.score || newCombo > bestRecord.combo) {
        const updated = {
          score: Math.max(newScore, bestRecord.score),
          combo: Math.max(newCombo, bestRecord.combo),
        };
        setBestRecord(updated);
        try {
          localStorage.setItem(bestRecordKey, JSON.stringify(updated));
        } catch {}
      }
    } else {
      // Wrong guess
      const remainingLives = lives - 1;
      setLives(remainingLives);
      setCombo(0); // Reset combo

      if (remainingLives <= 0 || newGuesses.length >= 3) {
        // Game Over or 3 attempts exhausted
        if (remainingLives <= 0) {
          setIsGameOver(true);
        } else {
          // 3 attempts reached without correct answer: round failed, reveal and pass
          setRoundCompleted(true);
        }
      }
    }
  };

  // Autocomplete suggestions
  const suggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    const alreadyGuessed = new Set(roundGuesses.map(g => g.character.id));
    return characters
      .filter(c => !alreadyGuessed.has(c.id) && c.name.toLowerCase().includes(term))
      .slice(0, 5);
  }, [searchTerm, characters, roundGuesses]);

  if (!currentChallenge) {
    return (
      <div className="text-center py-12 text-slate-400">
        Nenhum desafio encontrado para este filtro.
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-4 animate-in fade-in duration-300">
      {/* Top Status Bar: Lives, Combo, Score, Best Record */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0d1426]/90 backdrop-blur-md border border-[#202b43] rounded-2xl p-3 sm:p-4 mb-4 shadow-xl">
        {/* Lives */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-xs font-bold text-slate-400 mr-1 hidden sm:inline">Vidas:</span>
          {[1, 2, 3].map((heart) => (
            <Heart
              key={heart}
              size={22}
              className={`transition-all duration-300 ${
                heart <= lives
                  ? 'fill-red-500 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] scale-100'
                  : 'fill-slate-800 text-slate-700 scale-90'
              }`}
            />
          ))}
        </div>

        {/* Combo */}
        <div className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 px-3 py-1.5 rounded-xl">
          <Flame size={18} className="text-amber-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-extrabold text-amber-300 tracking-wide">
            Combo x{combo}
          </span>
        </div>

        {/* Score */}
        <div className="flex items-center gap-1.5 bg-purple-500/15 border border-purple-500/30 px-3 py-1.5 rounded-xl">
          <Star size={18} className="text-purple-400" />
          <span className="text-xs sm:text-sm font-black text-purple-200">
            {score} <span className="text-[10px] text-purple-300/70 font-semibold">pts</span>
          </span>
        </div>

        {/* Best Record */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/50 px-2.5 py-1.5 rounded-xl border border-white/5">
          <Trophy size={14} className="text-amber-400" />
          <span className="hidden sm:inline">Recorde:</span>
          <span className="font-bold text-white">{bestRecord.score} pts</span>
          <span className="text-amber-400 font-extrabold">(x{bestRecord.combo})</span>
        </div>
      </div>

      {/* Sub-mode Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
        {animeSlug === 'jujutsu-kaisen' ? (
          <>
            {[
              { id: 'all', label: '🎲 Aleatório' },
              { id: 'technique', label: '★ Técnicas' },
              { id: 'domain', label: '⛩ Domínios' },
              { id: 'description', label: '📖 Descrições' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setJjkFilter(tab.id as JJKFilter);
                  handleNextChallenge();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  jjkFilter === tab.id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400/50'
                    : 'bg-[#0f172a] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </>
        ) : (
          <>
            {[
              { id: 'all', label: '🎲 Aleatório' },
              { id: 'bankai', label: '🌸 Bankai' },
              { id: 'zanpakuto', label: '⚔ Zanpakutō' },
              { id: 'division', label: '🛡 Divisões' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setBleachFilter(tab.id as BleachFilter);
                  handleNextChallenge();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  bleachFilter === tab.id
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 border border-cyan-400/50'
                    : 'bg-[#0f172a] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </>
        )}
      </div>

      {/* Central Question Card */}
      <div className="bg-[#0b1222]/95 border border-purple-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden mb-6">
        {/* Glowing Background Accent */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Question Header */}
        <div className="text-center relative z-10 mb-5">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] sm:text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider">
              {currentChallenge.badge1}
            </span>
            {currentChallenge.badge2 && (
              <span className="bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] sm:text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                {currentChallenge.badge2}
              </span>
            )}
          </div>

          <h2 className="text-base sm:text-xl font-bold text-slate-300 mb-2">
            {currentChallenge.questionTitle}
          </h2>

          {/* Focal Ability Name */}
          <div className="my-4 py-3 px-4 bg-[#070b16]/90 rounded-2xl border border-white/10 shadow-inner">
            <span className="text-xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-amber-200 to-purple-300 tracking-tight drop-shadow-[0_2px_10px_rgba(168,85,247,0.4)]">
              "{currentChallenge.targetName}"
            </span>
          </div>
        </div>

        {/* 4 Clue Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 my-5 relative z-10">
          {currentChallenge.clues.map((clue, idx) => {
            const isRevealed = revealedClues[idx] || roundCompleted;
            return (
              <div
                key={idx}
                onClick={() => handleRevealClue(idx)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer select-none flex flex-col justify-between min-h-[85px] ${
                  isRevealed
                    ? 'bg-[#101b33]/90 border-purple-500/40 shadow-md'
                    : 'bg-[#080d1a]/80 border-slate-800 hover:border-purple-500/50 hover:bg-[#0e1628]'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1">
                  <span>Dica {idx + 1} — {clue.label}</span>
                  {!isRevealed ? (
                    <Eye size={13} className="text-amber-400" />
                  ) : (
                    <CheckCircle2 size={13} className="text-emerald-400" />
                  )}
                </div>

                {isRevealed ? (
                  <p className="text-xs sm:text-sm font-extrabold text-white leading-snug animate-in fade-in duration-200">
                    {clue.value}
                  </p>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-amber-400/90 font-medium">
                    <Lock size={12} />
                    <span>Clique para revelar</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Search Input & Action */}
        {!roundCompleted && !isGameOver && (
          <div className="relative z-20 max-w-xl mx-auto mt-6">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setSelectedChar(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleGuess();
                  }}
                  placeholder="Digite o nome do personagem..."
                  className="w-full bg-[#0a101f] border border-slate-700 focus:border-purple-500 rounded-2xl py-3 px-4 text-sm text-white placeholder-slate-500 outline-none transition-all shadow-inner"
                />

                {/* Suggestions Dropdown */}
                {suggestions.length > 0 && !selectedChar && (
                  <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#0a101f] border border-purple-500/40 rounded-2xl overflow-hidden shadow-2xl z-50 divide-y divide-white/5">
                    {suggestions.map((char) => (
                      <div
                        key={char.id}
                        onClick={() => {
                          setSelectedChar(char);
                          setSearchTerm(char.name);
                        }}
                        className="flex items-center gap-3 p-2.5 hover:bg-purple-600/20 cursor-pointer transition-colors"
                      >
                        <img
                          src={char.avatar}
                          alt={char.name}
                          className="w-8 h-8 rounded-full object-cover border border-white/20"
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white">{char.name}</span>
                          <span className="text-[10px] text-slate-400">
                            {char.affiliation?.join(' • ') || 'Personagem'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleGuess}
                disabled={!selectedChar && !searchTerm}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white font-extrabold text-sm py-3 px-5 rounded-2xl shadow-lg shadow-purple-600/30 transition-all flex items-center gap-1.5"
              >
                <span>Responder</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 text-center mt-2">
              Tentativas restantes nesta pergunta: <span className="font-bold text-white">{3 - roundGuesses.length}/3</span>
            </p>
          </div>
        )}

        {/* Round Success Banner */}
        {roundCompleted && !isGameOver && (
          <div className="mt-6 text-center animate-in zoom-in-95 duration-200">
            <div className="inline-flex flex-col items-center gap-2 p-4 bg-emerald-950/40 border border-emerald-500/50 rounded-2xl shadow-xl max-w-md w-full">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-lg">
                <CheckCircle2 size={24} />
                <span>
                  {roundGuesses[roundGuesses.length - 1]?.isCorrect ? 'Resposta Correta!' : 'Tentativas Esgotadas!'}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                O personagem era: <span className="font-black text-amber-300">{currentChallenge.character.name}</span>
              </p>
              <button
                onClick={handleNextChallenge}
                className="mt-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm py-2 px-6 rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
              >
                <span>Próxima Pergunta</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Round Guesses List */}
        {roundGuesses.length > 0 && (
          <div className="mt-6 border-t border-slate-800 pt-4">
            <h4 className="text-xs font-bold text-slate-400 mb-2">Suas tentativas nesta rodada:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {roundGuesses.map((guess, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 p-2 rounded-xl border ${
                    guess.isCorrect
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                      : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                  }`}
                >
                  <img
                    src={guess.character.avatar}
                    alt={guess.character.name}
                    className="w-8 h-8 rounded-full object-cover border border-white/20"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">{guess.character.name}</p>
                    <p className="text-[10px] opacity-75">
                      {guess.isCorrect ? '✔ Correto!' : '❌ Incorreto'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Game Over Modal */}
      {isGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0b1222] border border-purple-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center relative overflow-hidden">
            <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-500/40 shadow-lg">
              <Heart size={32} className="fill-rose-500" />
            </div>

            <h3 className="text-2xl font-black text-white mb-1">Fim de Jogo!</h3>
            <p className="text-xs text-slate-400 mb-6">
              Você gastou suas 3 vidas no modo {animeSlug === 'jujutsu-kaisen' ? 'Técnicas & Domínios' : 'BankaiDLE'}.
            </p>

            <div className="grid grid-cols-3 gap-2 bg-[#060b18] p-3 rounded-2xl border border-white/10 mb-6">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Pontuação</span>
                <span className="text-lg font-black text-purple-300">{score}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Maior Combo</span>
                <span className="text-lg font-black text-amber-400">x{maxCombo}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Acertos</span>
                <span className="text-lg font-black text-emerald-400">{totalWins}</span>
              </div>
            </div>

            <button
              onClick={handleRestart}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm py-3 px-6 rounded-2xl shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} />
              <span>Jogar Novamente</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
