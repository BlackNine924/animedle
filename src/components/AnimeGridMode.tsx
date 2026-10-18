import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Character } from '../types/anime';
import { Search, X, Check, AlertCircle, RefreshCw, Share2, Trophy, Sparkles, LayoutGrid, Flag, HelpCircle, Info } from 'lucide-react';
import { unlockAchievement, logDailyActivity, recordVictory, recordDefeat, recordSurrender, updateGlobalStatsOnOutcome } from '../data/achievements';
import { getDailyDateString } from '../utils/dailySeed';
import { VictoryModal } from './VictoryModal';
import { ModeHeaderCard } from './ModeHeaderCard';
import { SpeedrunArena } from './SpeedrunArena';
import { filterAndRankCharacters } from '../utils/characterSearch';
import {
  calculateGridCellRarity,
  summarizeGridRarity,
  CellRarityInfo,
  SurvivalState,
  getSurvivalState,
  toggleSurvivalMode,
  recordSurvivalWin,
  recordSurvivalLoss,
  resetSurvivalRun,
  FriendChallengeData,
  encodeFriendChallengeUrl,
  awardAnimeXp,
} from '../utils/featuresManager';

interface GridCriterion {
  id: string;
  label: string;
  category: string;
  test: (c: Character) => boolean;
}

interface AnimeGridModeProps {
  characters: Character[];
  themeColor: string;
  animeTitle: string;
  animeSlug: string;
  initialFriendChallenge?: FriendChallengeData | null;
  onClearFriendChallenge?: () => void;
}

interface GridBoardProps {
  gridSeed: string;
  legacyGridSeed?: string;
  isEndless: boolean;
  gridDefinition: { rows: GridCriterion[]; cols: GridCriterion[] };
  characters: Character[];
  animeTitle: string;
  animeSlug: string;
  themeColor: string;
  onResetForInfinite?: () => void;
  survivalState?: SurvivalState;
  survivalHealed?: boolean;
  onSurvivalOutcome?: (won: boolean) => void;
  onRestartSurvival?: () => void;
  friendChallenge?: FriendChallengeData | null;
  onSendRevenge?: () => void;
}

const GridBoard: React.FC<GridBoardProps> = ({
  gridSeed,
  legacyGridSeed,
  isEndless,
  gridDefinition,
  characters,
  animeTitle,
  animeSlug,
  themeColor,
  onResetForInfinite,
  survivalState,
  survivalHealed,
  onSurvivalOutcome,
  onRestartSurvival,
  friendChallenge,
  onSendRevenge,
}) => {
  // Estado isolado da grade por seed (com fallback para seed UTC legado se necessário)
  const [cells, setCells] = useState<(Character | null)[]>(() => {
    const saved = localStorage.getItem(`animedle_grid_${gridSeed}`) || (legacyGridSeed ? localStorage.getItem(`animedle_grid_${legacyGridSeed}`) : null);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return Array(9).fill(null);
  });

  const [guessesLeft, setGuessesLeft] = useState<number>(() => {
    const saved = localStorage.getItem(`animedle_grid_guesses_${gridSeed}`) ?? (legacyGridSeed ? localStorage.getItem(`animedle_grid_guesses_${legacyGridSeed}`) : null);
    return saved !== null ? parseInt(saved, 10) : 9;
  });

  const [isSurrendered, setIsSurrendered] = useState<boolean>(() => {
    return (
      localStorage.getItem(`animedle_grid_surrendered_${gridSeed}`) === 'true' ||
      (legacyGridSeed ? localStorage.getItem(`animedle_grid_surrendered_${legacyGridSeed}`) === 'true' : false)
    );
  });

  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [inspectedCriterion, setInspectedCriterion] = useState<{
    criterion: GridCriterion;
    axis: 'Linha' | 'Coluna';
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showCopied, setShowCopied] = useState(false);
  const [showAnswersModal, setShowAnswersModal] = useState(false);
  const [showSurrenderConfirm, setShowSurrenderConfirm] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Salva no localStorage sempre que células ou tentativas mudam
  useEffect(() => {
    localStorage.setItem(`animedle_grid_${gridSeed}`, JSON.stringify(cells));
    localStorage.setItem(`animedle_grid_guesses_${gridSeed}`, guessesLeft.toString());
    localStorage.setItem(`animedle_grid_surrendered_${gridSeed}`, isSurrendered.toString());
  }, [cells, guessesLeft, isSurrendered, gridSeed]);

  // Trava scroll da página do navegador quando modais/overlays estiverem abertos
  useEffect(() => {
    if (showAnswersModal || selectedCell !== null || showSurrenderConfirm || showVictoryModal || inspectedCriterion !== null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [showAnswersModal, selectedCell, showSurrenderConfirm, showVictoryModal, inspectedCriterion]);

  const usedCharacterIds = useMemo(() => {
    return new Set(cells.filter(Boolean).map((c) => c!.id));
  }, [cells]);

  // Lista de personagens filtrada com suporte a apelidos e tolerância a erros de digitação
  const filteredCandidates = useMemo<Character[]>(() => {
    const q = searchQuery.trim();
    if (!q) {
      return [...characters].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
    }
    return filterAndRankCharacters(characters, q);
  }, [characters, searchQuery]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery, selectedCell]);

  useEffect(() => {
    if (listRef.current && selectedCell !== null) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement | undefined;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex, selectedCell]);

  const handleCellClick = (index: number) => {
    if (cells[index] !== null || guessesLeft <= 0) return;
    setSelectedCell(index);
    setSearchQuery('');
    setSelectedIndex(0);
    setErrorMessage(null);
  };

  const handleSelectCharacter = (char: Character) => {
    if (selectedCell === null || !gridDefinition) return;

    if (usedCharacterIds.has(char.id)) {
      setErrorMessage('Este personagem já foi usado em outra casa da grade!');
      return;
    }

    const rowIdx = Math.floor(selectedCell / 3);
    const colIdx = selectedCell % 3;
    const rowCrit = gridDefinition.rows[rowIdx];
    const colCrit = gridDefinition.cols[colIdx];

    const matchRow = rowCrit.test(char);
    const matchCol = colCrit.test(char);

    if (matchRow && matchCol) {
      // Acerto - Não gasta palpites, apenas registra a célula acertada
      const newCells = [...cells];
      newCells[selectedCell] = char;
      setCells(newCells);
      setSelectedCell(null);
      setErrorMessage(null);
    } else {
      // Erro - Consome 1 palpite
      setGuessesLeft((g) => Math.max(0, g - 1));
      const failReason =
        !matchRow && !matchCol
          ? `não cumpre nem "${rowCrit.label}" nem "${colCrit.label}"!`
          : !matchRow
          ? `não cumpre "${rowCrit.label}"!`
          : `não cumpre "${colCrit.label}"!`;
      setErrorMessage(`Incorreto! ${char.name} ${failReason}`);
    }
  };

  const isGameOver = guessesLeft === 0 || cells.filter(Boolean).length === 9 || isSurrendered;
  const score = cells.filter(Boolean).length;
  const survivalRecordedRef = useRef<boolean>(false);

  const cellAnswers = useMemo(() => {
    const list: { row: GridCriterion; col: GridCriterion; matches: Character[] }[] = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const row = gridDefinition.rows[r];
        const col = gridDefinition.cols[c];
        const matches = characters.filter((ch) => row.test(ch) && col.test(ch));
        list.push({ row, col, matches });
      }
    }
    return list;
  }, [gridDefinition, characters]);

  // C1: Cálculo de Raridade por célula preenchida
  const cellRarities = useMemo<(CellRarityInfo | null)[]>(() => {
    return cells.map((char, idx) => {
      if (!char) return null;
      const validPool = cellAnswers[idx]?.matches || [char];
      return calculateGridCellRarity(char, validPool, characters);
    });
  }, [cells, cellAnswers, characters]);

  // C1: Resumo Geral de Raridade da Grade
  const raritySummary = useMemo(() => {
    return summarizeGridRarity(cells, cellRarities);
  }, [cells, cellRarities]);

  useEffect(() => {
    if (isGameOver) {
      logDailyActivity();
      if (score === 9) {
        unlockAchievement('grid_master');
        if (guessesLeft === 0) {
          unlockAchievement('protagonist_comeback');
        }
        recordVictory(animeSlug, 'grid');
        awardAnimeXp(animeSlug, isEndless ? 30 : 45, !isEndless ? `grid_${gridSeed}` : undefined);
        if (!isEndless) {
          updateGlobalStatsOnOutcome('win');
        }
      } else if (isSurrendered) {
        // Desistência já registrada em handleConfirmSurrender
      } else {
        recordDefeat(animeSlug, 'grid');
        if (!isEndless) {
          updateGlobalStatsOnOutcome('defeat');
        }
      }
      if (isEndless && onSurvivalOutcome && !survivalRecordedRef.current) {
        survivalRecordedRef.current = true;
        onSurvivalOutcome(score === 9);
      }
      setShowVictoryModal(true);
    }
  }, [isGameOver, score, guessesLeft, animeSlug, isSurrendered, isEndless]);

  const handleSurrender = () => {
    if (isGameOver) {
      setShowAnswersModal(true);
      return;
    }
    setShowSurrenderConfirm(true);
  };

  const handleConfirmSurrender = () => {
    setIsSurrendered(true);
    setGuessesLeft(0);
    recordSurrender(animeSlug, 'grid');
    if (!isEndless) {
      updateGlobalStatsOnOutcome('surrender');
    }
    localStorage.setItem(`animedle_grid_surrendered_${gridSeed}`, 'true');
    setShowSurrenderConfirm(false);
    setShowAnswersModal(true);
  };

  const handleCopyGrid = () => {
    let text = `AnimeDLE Grid - ${animeTitle} (${isEndless ? 'Modo Infinito' : 'Diário'})\n`;
    text += `Acertos: ${score}/9 | Erros: ${9 - guessesLeft}/9`;
    if (raritySummary) {
      text += ` | Raridade Média: ${raritySummary.averageRarity}% (${raritySummary.rankTitle})`;
    }
    text += `\n\n`;
    for (let r = 0; r < 3; r++) {
      let rowStr = '';
      for (let c = 0; c < 3; c++) {
        const idx = r * 3 + c;
        const rInfo = cellRarities[idx];
        rowStr += cells[idx] ? (rInfo?.tier === 'ultra_rare' ? '💎' : rInfo?.tier === 'epic' ? '🟪' : '🟩') : '⬛';
      }
      text += rowStr + '\n';
    }
    text += '\nJogue em: https://animedle-9og.pages.dev';
    navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2500);
  };

  return (
    <>
      {/* Painel de Palpites, Raridade (C1) e Placar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-2 mb-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="text-slate-400">
            Acertos: <strong className="text-white font-black text-sm">{score}/9</strong>
          </span>
          {raritySummary && (
            <span
              className={`px-2.5 py-0.5 rounded-full border text-[11px] font-extrabold ${raritySummary.rankBadgeColor}`}
              title="Quanto menor a porcentagem média, mais raros foram os personagens que você escolheu!"
            >
              💎 Raridade Média: {raritySummary.averageRarity}%
            </span>
          )}
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSurrender}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-bold text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-all shadow-sm"
          >
            <Flag size={12} />
            {isGameOver ? 'Ver Respostas' : 'Desistir'}
          </button>
          <span className="text-slate-400">Palpites:</span>
          <span
            className={`font-black px-2.5 py-0.5 rounded-full text-xs shadow-sm ${
              guessesLeft > 3
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse'
            }`}
          >
            {guessesLeft} / 9
          </span>
        </div>
      </div>

      {/* Dica rápida de clique nos títulos */}
      <div className="flex items-center justify-center gap-1.5 mb-2.5 text-[11px] text-slate-400 font-medium">
        <HelpCircle size={13} className="text-amber-400 shrink-0" />
        <span>
          Toque em qualquer cabeçalho de <strong className="text-amber-300">Linha</strong> ou <strong className="text-sky-300">Coluna</strong> para ver o que significa aquela classificação.
        </span>
      </div>

      {/* A Matriz 3x3 Principal com Espaçamento Aumentado */}
      <div className="bg-[#0b101d] border border-[#1e293b] rounded-3xl p-3 sm:p-5 shadow-2xl">
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
          {/* Canto superior esquerdo decorativo */}
          <div className="flex flex-col items-center justify-center rounded-2xl bg-[#070b14]/60 border border-[#162035] p-2 text-center">
            <Sparkles size={18} className="text-amber-400/80 mb-0.5" />
            <span className="text-[8px] uppercase font-black tracking-wider text-slate-500">Toque p/ Info</span>
          </div>

          {/* Cabeçalhos das 3 Colunas (Clicáveis para explicação) */}
          {gridDefinition.cols.map((col, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => setInspectedCriterion({ criterion: col, axis: 'Coluna' })}
              title={`Clique para entender o que significa "${col.label}"`}
              className="group relative flex flex-col items-center justify-center text-center p-2 sm:p-2.5 rounded-2xl bg-[#111a2d] hover:bg-[#16223b] border border-[#202b43] hover:border-sky-400/60 shadow-sm min-h-[76px] sm:min-h-[85px] w-full transition-all cursor-pointer active:scale-[0.98]"
            >
              <span className="absolute top-1.5 right-1.5 text-slate-500 group-hover:text-sky-300 transition-colors">
                <HelpCircle size={12} />
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase font-black text-sky-400/90 tracking-wider mb-0.5 pr-2">
                {col.category}
              </span>
              <span className="text-[10px] sm:text-xs md:text-sm font-extrabold text-white group-hover:text-sky-100 leading-tight break-words hyphens-auto w-full text-center px-1">
                {col.label}
              </span>
            </button>
          ))}

          {/* 3 Linhas com seus cabeçalhos e células */}
          {[0, 1, 2].map((rowIdx) => (
            <React.Fragment key={rowIdx}>
              {/* Cabeçalho da Linha (Clicável para explicação) */}
              <button
                type="button"
                onClick={() => setInspectedCriterion({ criterion: gridDefinition.rows[rowIdx], axis: 'Linha' })}
                title={`Clique para entender o que significa "${gridDefinition.rows[rowIdx].label}"`}
                className="group relative flex flex-col items-center justify-center text-center p-2 sm:p-2.5 rounded-2xl bg-[#111a2d] hover:bg-[#16223b] border border-[#202b43] hover:border-amber-400/60 shadow-sm min-h-[95px] sm:min-h-[120px] md:min-h-[135px] w-full transition-all cursor-pointer active:scale-[0.98]"
              >
                <span className="absolute top-1.5 right-1.5 text-slate-500 group-hover:text-amber-300 transition-colors">
                  <HelpCircle size={12} />
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase font-black text-amber-400/90 tracking-wider mb-0.5 pr-2">
                  {gridDefinition.rows[rowIdx].category}
                </span>
                <span className="text-[10px] sm:text-xs md:text-sm font-extrabold text-white group-hover:text-amber-100 leading-tight break-words hyphens-auto w-full text-center px-1">
                  {gridDefinition.rows[rowIdx].label}
                </span>
              </button>

              {/* 3 Células da Linha */}
              {[0, 1, 2].map((colIdx) => {
                const cellIndex = rowIdx * 3 + colIdx;
                const char = cells[cellIndex];
                const rarity = cellRarities[cellIndex];
                const isSelected = selectedCell === cellIndex;
                const validPoolCount = cellAnswers[cellIndex]?.matches.length || 0;

                // G1: Classificação visual da Dificuldade / Escassez do Cruzamento na célula vazia
                const difficultyBadge =
                  validPoolCount <= 1
                    ? {
                        text: '💎 1 único!',
                        classes: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_8px_rgba(34,211,238,0.25)]',
                        tip: 'Célula Ultra-Rara: Apenas 1 personagem em todo o anime cumpre este cruzamento!',
                      }
                    : validPoolCount === 2
                    ? {
                        text: '💎 2 possíveis',
                        classes: 'bg-cyan-500/15 text-cyan-300 border-cyan-400/40',
                        tip: 'Célula Muito Rara: Apenas 2 personagens cumprem este cruzamento!',
                      }
                    : validPoolCount <= 4
                    ? {
                        text: `🔥 ${validPoolCount} possíveis`,
                        classes: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
                        tip: `Cruzamento Difícil (Épico): Existem ${validPoolCount} personagens possíveis.`,
                      }
                    : validPoolCount <= 9
                    ? {
                        text: `⚡ ${validPoolCount} opções`,
                        classes: 'bg-sky-500/15 text-sky-300 border-sky-400/35',
                        tip: `Cruzamento Médio: Existem ${validPoolCount} personagens possíveis.`,
                      }
                    : {
                        text: `🟢 ${validPoolCount} opções`,
                        classes: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
                        tip: `Cruzamento Amplo: Existem ${validPoolCount} personagens possíveis.`,
                      };

                return (
                  <button
                    key={colIdx}
                    onClick={() => handleCellClick(cellIndex)}
                    disabled={char !== null || guessesLeft <= 0}
                    style={
                      char
                        ? { borderColor: `${themeColor}80`, backgroundColor: `${themeColor}15` }
                        : isSelected
                        ? { borderColor: themeColor, backgroundColor: `${themeColor}20` }
                        : undefined
                    }
                    className={`relative rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center p-2.5 sm:p-3 min-h-[95px] sm:min-h-[120px] md:min-h-[135px] group overflow-hidden ${
                      char
                        ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                        : isSelected
                        ? 'ring-2 ring-amber-400 shadow-lg shadow-amber-400/20'
                        : guessesLeft > 0
                        ? 'bg-[#101728] border-[#222f49] hover:border-slate-400 hover:bg-[#151f35] cursor-pointer'
                        : 'bg-[#0d1424] border-[#1a2337] opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {char ? (
                      <>
                        {/* C1: Selo de Porcentagem de Raridade na Célula */}
                        {rarity && (
                          <div
                            title={`Escolha ${rarity.label} (${rarity.formatted}) • ${rarity.validPoolSize} ${
                              rarity.validPoolSize === 1 ? 'único personagem possível!' : 'personagens cabem nesta célula'
                            }`}
                            className={`absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded-md border text-[8px] sm:text-[9px] font-black leading-none tracking-tight flex items-center gap-0.5 ${rarity.pillClasses}`}
                          >
                            {rarity.tier === 'ultra_rare' && <span>💎</span>}
                            <span>{rarity.formatted}</span>
                          </div>
                        )}
                        <img
                          src={char.avatar}
                          alt={char.name}
                          className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover border-2 shadow-md mb-1.5 mt-2 ${
                            rarity ? rarity.ringClasses : 'border-emerald-400'
                          }`}
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <span className="text-[9px] sm:text-[11px] font-black text-white text-center leading-tight break-words hyphens-auto px-1 w-full max-h-8 overflow-hidden">
                          {char.name}
                        </span>
                        {rarity && (
                          <span className="text-[8px] font-extrabold uppercase tracking-wider text-slate-300/90 mt-0.5">
                            {rarity.label}
                          </span>
                        )}
                        <div className="absolute top-1.5 right-1.5 bg-emerald-500 text-black rounded-full p-1 shadow-md">
                          <Check size={10} strokeWidth={4} />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-500 group-hover:text-slate-300 w-full">
                        {/* G1: Indicador de Dificuldade do Cruzamento na Célula Vazia */}
                        <span
                          title={difficultyBadge.tip}
                          className={`absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-md border text-[8px] sm:text-[9px] font-black leading-none tracking-tight ${difficultyBadge.classes}`}
                        >
                          {difficultyBadge.text}
                        </span>
                        <span className="text-2xl sm:text-3xl font-light mb-0.5 mt-2">+</span>
                        <span className="text-[10px] uppercase font-black tracking-tight">
                          {guessesLeft > 0 ? 'Palpitar' : 'Bloqueado'}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* C1: Resumo de Raridade da Partida */}
      {raritySummary && (
        <div className="mt-4 p-3.5 bg-[#0d1426] border border-[#202b43] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2.5">
            <span className={`px-3 py-1 rounded-xl border text-xs font-black ${raritySummary.rankBadgeColor}`}>
              {raritySummary.rankTitle}
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              Média de Raridade: <strong className="text-white">{raritySummary.averageRarity}%</strong>
            </span>
          </div>
          {raritySummary.rarestPick && (
            <div className="flex items-center gap-2 bg-[#111a2d] px-3 py-1.5 rounded-xl border border-[#22304d]">
              <span className="text-[10px] uppercase font-black text-slate-400">Palpite Mais Raro:</span>
              <img
                src={raritySummary.rarestPick.char.avatar}
                alt={raritySummary.rarestPick.char.name}
                className="w-6 h-6 rounded-full object-cover border border-cyan-400"
              />
              <strong className="text-xs text-white font-extrabold">{raritySummary.rarestPick.char.name}</strong>
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-black border ${raritySummary.rarestPick.info.pillClasses}`}>
                {raritySummary.rarestPick.info.formatted} ({raritySummary.rarestPick.info.label})
              </span>
            </div>
          )}
        </div>
      )}

      {/* Card de Fim de Jogo */}
      {isGameOver && (
        <div className="mt-5 p-5 bg-[#0d1426] border border-[#202b43] rounded-3xl text-center shadow-xl animate-fade-in">
          <Trophy size={36} className="text-amber-400 mx-auto mb-2" />
          <h3 className="text-white font-black text-lg mb-1">
            {score === 9 ? 'Incrível! Grade Perfeita 9/9! 👑' : `Desafio Concluído: ${score}/9 Acertos!`}
          </h3>
          <p className="text-slate-400 text-xs mb-4">
            {score === 9
              ? 'Você dominou completamente os critérios de hoje do AnimeDLE!'
              : 'Bom jogo! Compartilhe o seu resultado ou consulte todas as respostas.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setShowAnswersModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              <LayoutGrid size={15} />
              Gabarito Completo
            </button>

            <button
              onClick={() => setShowVictoryModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              <Trophy size={15} />
              Ver Modal de Fim de Jogo
            </button>

            <button
              onClick={handleCopyGrid}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              <Share2 size={15} />
              {showCopied ? 'Resultado Copiado!' : 'Copiar Grade'}
            </button>

            {isEndless && onResetForInfinite && (
              <button
                onClick={onResetForInfinite}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all"
              >
                <RefreshCw size={15} />
                Nova Grade Infinita
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modal Universal de Fim de Jogo / Derrota / Vitória */}
      {showVictoryModal && isGameOver && (
        <VictoryModal
          targetCharacter={cells.find(Boolean) || characters[0]}
          totalGuesses={9 - guessesLeft}
          isLost={score < 9 && !isSurrendered}
          isSurrendered={isSurrendered}
          stats={(() => {
            try {
              const s = localStorage.getItem('animedle_stats');
              return s ? JSON.parse(s) : undefined;
            } catch {
              return undefined;
            }
          })()}
          onClose={() => setShowVictoryModal(false)}
          onNext={isEndless && onResetForInfinite ? onResetForInfinite : undefined}
          nextButtonLabel="Nova Grade"
          themeColor={themeColor}
          animeTitle={animeTitle}
          animeSlug={animeSlug}
          currentMode="grid"
          isEndless={isEndless}
          survivalState={survivalState}
          survivalHealed={survivalHealed}
          onRestartSurvival={onRestartSurvival}
          friendChallenge={friendChallenge}
          challengeTargetPayload={{
            a: animeSlug,
            m: 'grid',
            g: gridSeed,
          }}
          onSendRevenge={onSendRevenge}
          gridScore={score}
          gridRarityAvg={raritySummary?.averageRarity}
          customSubtitle={
            score === 9
              ? `👑 Grade Perfeita 9/9!${raritySummary ? ` • Raridade Média: ${raritySummary.averageRarity}%` : ''}`
              : isSurrendered
              ? `🚩 Desistência registrada: ${score}/9 células preenchidas.`
              : `Esgotou os 9 palpites! Total: ${score}/9 acertos.`
          }
        />
      )}

      {/* Modal de Confirmação de Desistência da Grade */}
      {showSurrenderConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0d1426] border border-[#202b43] rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 text-amber-400">
              <Flag size={28} />
            </div>
            <h3 className="text-lg font-black text-white mb-2">Desistir da Grade?</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Tem certeza de que deseja desistir? Todas as respostas válidas de cada uma das 9 células serão reveladas no Gabarito.
            </p>
            <div className="flex gap-2.5">
              <button
                onClick={() => setShowSurrenderConfirm(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={handleConfirmSurrender}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors shadow-lg shadow-rose-900/30"
              >
                Sim, Desistir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Gabarito com Todas as Respostas Possíveis por Célula e Suas Raridades */}
      {showAnswersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0d1426] border border-[#202b43] rounded-3xl max-w-2xl w-full p-4 sm:p-6 text-left shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[#202b43]">
              <div>
                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <LayoutGrid size={18} className="text-amber-400" />
                  Gabarito da Grade & Porcentagens de Raridade
                </h3>
                <p className="text-xs text-slate-400">
                  Veja todos os personagens válidos para cada uma das 9 células e o quão raro é cada um.
                </p>
              </div>
              <button
                onClick={() => setShowAnswersModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto space-y-3.5 py-4 pr-2 custom-scrollbar overscroll-contain">
              {cellAnswers.map((item, idx) => {
                const r = Math.floor(idx / 3);
                const c = idx % 3;
                const userPick = cells[idx];
                return (
                  <div key={idx} className="bg-[#111a2d] border border-[#202b43] rounded-2xl p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2.5">
                      <span className="text-xs font-bold text-slate-300">
                        Célula ({r + 1}, {c + 1}): <strong className="text-amber-300">{item.row.label}</strong> × <strong className="text-sky-300">{item.col.label}</strong>
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full border w-fit ${
                          item.matches.length === 1
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50'
                            : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        }`}
                      >
                        {item.matches.length === 1
                          ? '💎 1 único personagem possível (Ultra-Raro!)'
                          : `${item.matches.length} personagens válidos`}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {item.matches.map((char) => {
                        const wasChosen = userPick?.id === char.id;
                        const charRarity = calculateGridCellRarity(char, item.matches, characters);
                        return (
                          <div
                            key={char.id}
                            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border text-xs font-semibold ${
                              wasChosen
                                ? 'bg-emerald-500/25 border-emerald-400 text-emerald-300'
                                : 'bg-[#162035] border-[#25334d] text-slate-200'
                            }`}
                          >
                            <img
                              src={char.avatar}
                              alt={char.name}
                              className="w-6 h-6 rounded-full object-cover border border-slate-600"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                            <span>{char.name}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-black border ${charRarity.pillClasses}`}>
                              {charRarity.formatted}
                            </span>
                            {wasChosen && <Check size={12} className="text-emerald-400 stroke-[3]" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#202b43] flex justify-end">
              <button
                onClick={() => setShowAnswersModal(false)}
                className="px-5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal / Overlay com Busca e Lista Completa Scrollável */}
      {selectedCell !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e1628] border border-[#22304d] rounded-3xl w-full max-w-lg p-5 sm:p-6 shadow-2xl animate-scale-in">
            {/* Cabeçalho do Modal */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-left">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
                  Palpite para a Célula ({Math.floor(selectedCell / 3) + 1}, {(selectedCell % 3) + 1})
                </span>
                <h3 className="text-white font-black text-base sm:text-lg mt-0.5">
                  Quem se encaixa em ambos?
                </h3>
              </div>
              <button
                onClick={() => setSelectedCell(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Destaque dos Dois Critérios Cruzados (Clicáveis para ver a explicação) */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              <button
                type="button"
                onClick={() =>
                  setInspectedCriterion({
                    criterion: gridDefinition.rows[Math.floor(selectedCell / 3)],
                    axis: 'Linha',
                  })
                }
                title="Clique para ler a explicação desta classificação"
                className="group relative p-3 rounded-2xl bg-[#131c31] hover:bg-[#18243f] border border-[#202b43] hover:border-amber-400/60 text-center transition-all cursor-pointer"
              >
                <span className="absolute top-2 right-2 text-slate-500 group-hover:text-amber-300">
                  <HelpCircle size={12} />
                </span>
                <span className="text-[9px] uppercase font-black text-slate-400 block mb-0.5">
                  {gridDefinition.rows[Math.floor(selectedCell / 3)].category} (Linha)
                </span>
                <span className="text-xs sm:text-sm font-black text-amber-400">
                  {gridDefinition.rows[Math.floor(selectedCell / 3)].label}
                </span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setInspectedCriterion({
                    criterion: gridDefinition.cols[selectedCell % 3],
                    axis: 'Coluna',
                  })
                }
                title="Clique para ler a explicação desta classificação"
                className="group relative p-3 rounded-2xl bg-[#131c31] hover:bg-[#18243f] border border-[#202b43] hover:border-sky-400/60 text-center transition-all cursor-pointer"
              >
                <span className="absolute top-2 right-2 text-slate-500 group-hover:text-sky-300">
                  <HelpCircle size={12} />
                </span>
                <span className="text-[9px] uppercase font-black text-slate-400 block mb-0.5">
                  {gridDefinition.cols[selectedCell % 3].category} (Coluna)
                </span>
                <span className="text-xs sm:text-sm font-black text-sky-400">
                  {gridDefinition.cols[selectedCell % 3].label}
                </span>
              </button>
            </div>

            {/* G1: Indicador de Escassez / Dificuldade do Cruzamento no Modal */}
            {(() => {
              const poolCount = cellAnswers[selectedCell]?.matches.length || 0;
              const isUltra = poolCount <= 2;
              const isEpic = poolCount > 2 && poolCount <= 4;
              return (
                <div
                  className={`mb-3 px-3 py-1.5 rounded-xl border text-[11px] font-bold flex items-center justify-between ${
                    isUltra
                      ? 'bg-cyan-500/15 border-cyan-400/40 text-cyan-200'
                      : isEpic
                      ? 'bg-purple-500/15 border-purple-400/40 text-purple-200'
                      : 'bg-slate-800/70 border-slate-700 text-slate-300'
                  }`}
                >
                  <span>
                    {poolCount === 1
                      ? '💎 Cruzamento Ultra-Raro: Apenas 1 personagem possível!'
                      : poolCount === 2
                      ? '💎 Cruzamento Muito Raro: Apenas 2 personagens possíveis!'
                      : `🎯 Dificuldade do Cruzamento: ${poolCount} personagens possíveis`}
                  </span>
                  <span className="text-[10px] opacity-80">Toque nos títulos acima p/ ajuda</span>
                </div>
              );
            })()}

            {/* Mensagem de Erro se houver */}
            {errorMessage && (
              <div className="p-3 mb-3 bg-rose-500/20 border border-rose-500/30 rounded-xl flex items-center gap-2 text-rose-300 text-xs animate-shake">
                <AlertCircle size={16} className="shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Campo de Busca */}
            <div className="relative mb-3">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (filteredCandidates.length === 0) return;
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setSelectedIndex((prev) => (prev + 1) % filteredCandidates.length);
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setSelectedIndex((prev) => (prev - 1 + filteredCandidates.length) % filteredCandidates.length);
                  } else if (e.key === 'Enter') {
                    e.preventDefault();
                    const picked = filteredCandidates[selectedIndex] || filteredCandidates[0];
                    if (picked && !usedCharacterIds.has(picked.id)) {
                      handleSelectCharacter(picked);
                    }
                  } else if (e.key === 'Escape') {
                    setSelectedCell(null);
                  }
                }}
                placeholder={`Buscar personagem em ${animeTitle}...`}
                autoFocus
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#141e34] border border-[#22304d] text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-amber-400 shadow-inner"
              />
              {searchQuery.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
                  title="Limpar campo"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Lista Scrollável Completa de Personagens */}
            <div ref={listRef} className="max-h-72 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((c, idx) => {
                  const isUsed = usedCharacterIds.has(c.id);
                  const isSelected = idx === selectedIndex && !isUsed;
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleSelectCharacter(c)}
                      onMouseEnter={() => {
                        if (!isUsed) setSelectedIndex(idx);
                      }}
                      onMouseMove={() => {
                        if (!isUsed && selectedIndex !== idx) setSelectedIndex(idx);
                      }}
                      disabled={isUsed}
                      className={`relative overflow-hidden group w-full flex items-center justify-between p-2.5 pl-4 rounded-xl transition-all border ${
                        isUsed
                          ? 'opacity-40 bg-black/20 border-transparent cursor-not-allowed'
                          : isSelected
                          ? 'bg-[#16233d] border-[#25375a] text-white shadow-[inset_0_0_12px_rgba(245,158,11,0.15)]'
                          : 'bg-[#121b30] hover:bg-[#16233d] hover:shadow-[inset_0_0_12px_rgba(245,158,11,0.15)] text-white border-[#1e2a42]'
                      }`}
                    >
                      {!isUsed && (
                        <span
                          aria-hidden="true"
                          className={`absolute left-0 top-0 bottom-0 w-1.5 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)] transition-opacity duration-150 ${
                            isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}
                        />
                      )}
                      <div className="flex items-center gap-3">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className={`w-9 h-9 rounded-full object-cover border transition-colors shadow-sm ${
                            isSelected ? 'border-amber-400' : 'border-slate-600 group-hover:border-amber-400'
                          }`}
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <span
                          className={`text-xs sm:text-sm font-bold text-left transition-colors ${
                            isSelected ? 'text-amber-300' : 'text-white group-hover:text-amber-300'
                          }`}
                        >
                          {c.name}
                        </span>
                      </div>
                      {isUsed && (
                        <span className="text-[9px] uppercase font-bold text-slate-500 bg-black/30 px-2 py-0.5 rounded-md">
                          Já Usado
                        </span>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="py-8 text-center text-slate-500 text-xs">
                  Nenhum personagem encontrado com "{searchQuery}".
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Explicação da Classificação / Critério da Grade */}
      {inspectedCriterion && (() => {
        const { criterion, axis } = inspectedCriterion;
        const matchingChars = characters.filter((c) => criterion.test(c));
        const info = getCriterionExplanation(criterion, animeSlug, animeTitle);
        const isRow = axis === 'Linha';

        return (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
            onClick={() => setInspectedCriterion(null)}
          >
            <div
              className="bg-[#0d1426] border border-[#22304d] rounded-3xl max-w-md w-full p-5 sm:p-6 text-left shadow-2xl animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-[#1e2b45]">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center border shrink-0 ${
                      isRow
                        ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                        : 'bg-sky-500/15 border-sky-500/40 text-sky-400'
                    }`}
                  >
                    <Info size={22} />
                  </div>
                  <div>
                    <span
                      className={`text-[10px] uppercase font-black tracking-wider block ${
                        isRow ? 'text-amber-400' : 'text-sky-400'
                      }`}
                    >
                      {criterion.category} • Cabeçalho de {axis}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white leading-tight mt-0.5">
                      {criterion.label}
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setInspectedCriterion(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Explicação principal clara */}
              <div className="p-3.5 rounded-2xl bg-[#111a2e] border border-[#202d47] mb-3.5">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider block mb-1">
                  📖 O que significa esta classificação?
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {info.description}
                </p>
              </div>

              {/* Como é validado / Exemplos práticos */}
              <div className="p-3.5 rounded-2xl bg-[#0a101f] border border-[#1a253b] mb-3.5 space-y-2">
                <span className="text-[10px] uppercase font-black text-amber-400/90 tracking-wider block">
                  🎯 Quem é aceito nesta {axis.toLowerCase()}?
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {info.ruleTip}
                </p>
                {info.equivalentItems && info.equivalentItems.length > 1 && (
                  <div className="pt-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                      Arcos / Sub-divisões aceitos em conjunto:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {info.equivalentItems.map((item) => (
                        <span
                          key={item}
                          className="px-2 py-0.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Contador de personagens que cumprem o critério no anime */}
              <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs mb-4">
                <span className="text-slate-300 font-semibold">
                  Personagens de <strong className="text-white">{animeTitle}</strong> nesta categoria:
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-black">
                  {matchingChars.length} {matchingChars.length === 1 ? 'personagem' : 'personagens'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setInspectedCriterion(null)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-black font-black text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                Entendi!
              </button>
            </div>
          </div>
        );
      })()}
    </>
  );
};

// Gera explicação detalhada e didática para qualquer critério/classificação da Grade 3x3
function getCriterionExplanation(
  criterion: GridCriterion,
  animeSlug: string,
  animeTitle: string
): {
  description: string;
  ruleTip: string;
  equivalentItems?: string[];
} {
  const cat = criterion.category;
  const label = criterion.label;
  const lower = label.toLowerCase();

  if (cat === 'Tipo de Combate') {
    if (lower.includes('distância') || lower.includes('longo alcance') || lower.includes('atirador') || lower.includes('arqueiro')) {
      return {
        description:
          'Refere-se a personagens cujo estilo principal de combate é atacar o inimigo de longe, sem precisar se aproximar para dar socos ou golpes físicos diretos.',
        ruleTip:
          'Inclui arqueiros, atiradores (armas de fogo), lançadores de projéteis, usuários de magias/jutsus/feitiços disparados à distância, ataques de energia de longo alcance ou manipulação remota.',
      };
    }
    if (lower.includes('corpo a corpo') || lower.includes('curto alcance') || lower.includes('artes marciais') || lower.includes('taijutsu') || lower.includes('lutador')) {
      return {
        description:
          'Refere-se a personagens que lutam diretamente no confronto físico aproximado (curta distância), encarando o oponente de frente.',
        ruleTip:
          'Inclui especialistas em artes marciais, socos, chutes, força bruta física, garras ou combate corporal direto sem depender de tiros à distância.',
      };
    }
    if (lower.includes('espada') || lower.includes('lâmina') || lower.includes('arma') || lower.includes('kenjutsu')) {
      return {
        description:
          'Refere-se a personagens que utilizam espadas, katanas, adagas, foices, lanças ou outras armas brancas/cortantes como sua principal ferramenta de batalha.',
        ruleTip:
          'Qualquer personagem classificado como espadachim ou usuário primário de armas laminadas/armamento físico entra nesta categoria.',
      };
    }
    if (lower.includes('médio alcance') || lower.includes('híbrido') || lower.includes('versátil')) {
      return {
        description:
          'Refere-se a combatentes versáteis que combinam luta corporal próxima com técnicas, extensões ou ataques de média/longa distância.',
        ruleTip:
          'Inclui personagens que não ficam restritos apenas ao soco de perto nem apenas ao tiro de longe, alternando ambos os estilos em combate.',
      };
    }
    if (lower.includes('suporte') || lower.includes('cura') || lower.includes('médic') || lower.includes('defensivo')) {
      return {
        description:
          'Refere-se a personagens cujo papel em batalha é proteger, curar, fortalecer (buffar) aliados ou fornecer assistência tática e barreiras.',
        ruleTip:
          'Inclui médicos, curandeiros, criadores de escudos/barreiras, sensores e suportes de equipe.',
      };
    }
    if (lower.includes('estrateg') || lower.includes('tátic') || lower.includes('controle') || lower.includes('manipula') || lower.includes('ilusão') || lower.includes('genjutsu')) {
      return {
        description:
          'Refere-se a personagens que dominam a luta através de inteligência tática, armadilhas, controle de área, paralisação do inimigo ou ilusões.',
        ruleTip:
          'Inclui mentes estrategistas, usuários de técnicas de controle mental/sombras/fios e especialistas em neutralizar o adversário estrategicamente.',
      };
    }
    if (lower.includes('invoca') || lower.includes('marionet') || lower.includes('familiar') || lower.includes('domador')) {
      return {
        description:
          'Refere-se a personagens que invocam criaturas, shikigamis, sombras, marionetes ou bestas para lutar ao seu lado.',
        ruleTip:
          'Inclui invocadores, mestres de marionetes e controladores de criaturas conjuradas.',
      };
    }
    if (lower.includes('não combatente') || lower.includes('civil')) {
      return {
        description:
          'Refere-se a personagens que não participam de batalhas físicas ou mágicas, atuando na história como civis, estudantes comuns, políticos ou figuras do cotidiano.',
        ruleTip:
          'Pense em personagens importantes para a história ou para a vida dos protagonistas, mas que não entram em lutas.',
      };
    }
    return {
      description: `Classificação do estilo de atuação em batalha ("${label}") registrada na ficha oficial do personagem em ${animeTitle}.`,
      ruleTip: `Qualquer personagem cujo modo principal de luta seja classificado como "${label}" no Modo Clássico também é aceito aqui.`,
    };
  }

  if (cat === 'Arco de Estreia') {
    const groups = PAIRED_ARC_GROUPS[animeSlug];
    const matchedGroup = groups?.find((g) => g.includes(label));
    return {
      description: `Indica que o personagem fez sua primeira aparição oficial na história durante o arco/saga "${label}".`,
      ruleTip: matchedGroup
        ? `Para tornar a grade mais justa, todos os personagens que estrearam em qualquer um dos arcos equivalentes/vizinhos listados abaixo são aceitos!`
        : `Pense em quem apareceu pela primeira vez (estreou) durante os eventos de "${label}".`,
      equivalentItems: matchedGroup,
    };
  }

  if (cat === 'Afiliação / Grupo') {
    return {
      description: `Personagens que pertencem ou já pertenceram à organização, facção, vila, escola, clã ou equipe "${label}".`,
      ruleTip:
        'Tanto membros atuais quanto ex-membros ("Ex-...") ou integrantes de subdivisões diretas desse grupo são aceitos automaticamente!',
    };
  }

  if (cat === 'Papel na Trama') {
    if (lower.includes('protagonista') || lower.includes('principal') || lower.includes('deuteragonista')) {
      return {
        description:
          'Personagens centrais da obra, em torno dos quais a história principal se desenvolve.',
        ruleTip: 'Inclui o protagonista e as figuras principais do núcleo central do anime.',
      };
    }
    if (lower.includes('antagonista') || lower.includes('vilão') || lower.includes('vilã')) {
      return {
        description:
          'Personagens que atuam como inimigos, chefes de arco ou forças opositoras aos protagonistas.',
        ruleTip: 'Inclui tanto grandes vilões finais quanto antagonistas de arcos específicos.',
      };
    }
    if (lower.includes('mentor') || lower.includes('mestre') || lower.includes('professor')) {
      return {
        description:
          'Personagens experientes responsáveis por treinar, ensinar ou guiar os protagonistas e a nova geração.',
        ruleTip: 'Pense nos senseis, mestres e instrutores veteranos da obra.',
      };
    }
    return {
      description: `Define a função narrativa que o personagem exerce na história de ${animeTitle} ("${label}").`,
      ruleTip: `Qualquer personagem classificado com o papel "${label}" na obra cumpre este requisito.`,
    };
  }

  if (cat === 'Estilo / Poder') {
    return {
      description: `Personagens que utilizam especificamente o poder, arma, técnica base ou estilo "${label}".`,
      ruleTip: `Corresponde à coluna de Poder / Estilo / Respiração / Habilidade do Modo Clássico de ${animeTitle}.`,
    };
  }

  if (cat === 'Akuma no Mi') {
    return {
      description: `Personagens de One Piece que comeram uma Akuma no Mi da classe "${label.replace('Akuma no Mi: ', '')}".`,
      ruleTip:
        'Paramecia concede habilidades sobre-humanas diversas; Zoan permite transformar-se em animais/criaturas; Logia transforma o corpo em um elemento da natureza.',
    };
  }

  if (cat === 'Haki') {
    return {
      description: `Personagens de One Piece confirmados como usuários de "${label}".`,
      ruleTip:
        'Basta que o personagem domine esse tipo de Haki (mesmo que também possua os outros dois tipos).',
    };
  }

  if (cat === 'Elemento / Natureza') {
    return {
      description: `Personagens de Naruto que dominam a Transformação da Natureza ou Kekkei Genkai "${label}".`,
      ruleTip:
        'Se o ninja possui esse elemento entre suas naturezas de chakra conhecidas, ele é válido!',
    };
  }

  if (cat === 'Tipo de Nen') {
    return {
      description: `Personagens de Hunter x Hunter cuja aura pertence à categoria de Nen "${label.replace('Nen: ', '')}".`,
      ruleTip:
        'As 6 categorias do hexágono de Nen são: Intensificação (Reforço), Transmutação, Emissão, Conjuração (Materialização), Manipulação e Especialização.',
    };
  }

  if (cat === 'Espécie / Natureza') {
    return {
      description: `Filtra os personagens pela sua raça biológica ou natureza espiritual: "${label}".`,
      ruleTip: `Qualquer personagem cuja espécie em ${animeTitle} seja "${label}" é aceito.`,
    };
  }

  if (cat === 'Status') {
    return {
      description: `Refere-se ao estado de vida canônico do personagem ("${label}") ao final da obra (ou no ponto atual do mangá).`,
      ruleTip:
        label === 'Vivo(a)'
          ? 'Personagens que permanecem vivos canonicamente.'
          : label === 'Morto(a)'
          ? 'Personagens que faleceram canonicamente durante a história.'
          : `Personagens com status "${label}".`,
    };
  }

  if (cat === 'Cor de Cabelo') {
    return {
      description: `Personagens que possuem visualmente "${label}".`,
      ruleTip: 'Variações próximas de tonalidade (ex: loiro/dourado, branco/prateado/grisalho, ruivo/vermelho) já são agrupadas automaticamente.',
    };
  }

  if (cat === 'Gênero') {
    return {
      description: `Personagens do gênero "${label}".`,
      ruleTip: `Qualquer personagem registrado como "${label}" no catálogo de ${animeTitle}.`,
    };
  }

  if (cat === 'Obra de Origem') {
    return {
      description: `Personagens que pertencem ao anime/mangá "${label}".`,
      ruleTip: `Qualquer personagem originário da obra "${label}" cumpre esta condição.`,
    };
  }

  return {
    description: `Classificação "${label}" pertencente à categoria ${cat} em ${animeTitle}.`,
    ruleTip: `O personagem escolhido precisa cumprir a condição "${label}".`,
  };
}

// Mapeamento de grupos/arcos equivalentes ou pareados para que nenhum personagem legítimo seja rejeitado na Grade 3x3
const PAIRED_ARC_GROUPS: Record<string, string[][]> = {
  naruto: [
    ['Introdução', 'País das Ondas'],
    ['Exame Chūnin', 'Esmagamento de Konoha'],
    ['Busca por Tsunade', 'Missão de Resgate de Sasuke'],
    ['Missão de Reconhecimento da Ponte Tenchi', 'Missão de Supressão da Akatsuki'],
    ['Missão de Perseguição a Itachi', 'Conto de Jiraiya, o Destemido', 'Batalha Fatídica Entre Irmãos', 'Ataque de Pain'],
    [
      'Quarta Guerra Mundial Ninja: Contagem Regressiva',
      'Quarta Guerra Mundial Ninja: Confronto',
      'Quarta Guerra Mundial Ninja: Clímax',
      'Nascimento do Jinchūriki do Dez-Caudas',
      'Ataque de Kaguya Ōtsutsuki',
    ],
  ],
  'one-piece': [
    ['Romance Dawn', 'Orange Town'],
    ['Reverse Mountain', 'Whiskey Peak', 'Little Garden', 'Ilha de Drum', 'Alabasta'],
    ['Jaya', 'Skypiea'],
    ['Long Ring Long Land', 'Water 7', 'Enies Lobby', 'Pós-Enies Lobby'],
    ['Arquipélago de Sabaody', 'Amazon Lily', 'Impel Down', 'Marineford'],
    ['Ilha dos Tritões', 'Punk Hazard', 'Dressrosa'],
    ['Zou', 'Whole Cake Island', 'Levely'],
  ],
  'demon-slayer': [
    ['Seleção Final', 'Primeira Missão', 'Asakusa', 'Casa do Tambor', 'Montanha Natagumo', 'Treinamento de Reabilitação'],
    ['Trem Infinito', 'Distrito do Entretenimento'],
    ['Vila dos Ferreiros', 'Treinamento dos Hashiras', 'Castelo Infinito'],
  ],
  'jujutsu-kaisen': [
    ['Jujutsu Kaisen 0 (Filme)', 'Introdução / Útero Amaldiçoado', 'Treinamento de Yuji', 'Vs. Mahito', 'Intercâmbio com Kyoto', 'Inventário Oculto / Morte Prematura'],
    ['Incidente de Shibuya', 'Extermínio de Itadori', 'Preparação Perfeita', 'Jogo do Abate (Culling Game)'],
  ],
  'attack-on-titan': [
    ['Queda de Shiganshina', '104º Corpo de Cadetes', 'Batalha de Trost'],
    ['Titã Fêmea', 'Fúria dos Titãs (Castelo Utgard)'],
    ['Governo Real (Uprising)', 'Retorno a Shiganshina'],
    ['Marley', 'Guerra por Paradis', 'O Estrondo (Final)'],
  ],
  'my-hero-academia': [
    ['Arco do Exame de Admissão', 'Arco do Teste de Apreensão de Individualidades', 'Arco do Ataque à U.S.J.', 'Arco do Festival Esportivo da U.A.'],
    ['Arco Vs. Assassino de Heróis (Stain)', 'Arco dos Exames Finais & Acampamento na Floresta', 'Arco do Incidente de Kamino'],
    ['Arco do Exame de Licença Provisória', 'Arco do Shie Hassaikai (Overhaul)'],
    ['Arco da Guerra de Libertação Paranormal', 'Arco do Herói Negro (Dark Deku)', 'Arco da Guerra Final'],
  ],
  bleach: [
    ['Substituto de Shinigami', 'Soul Society'],
    ['Arrancar', 'Hueco Mundo', 'Batalha de Karakura'],
  ],
  'dragon-ball': [
    ['Saga Pilaf (DB Clássico)', '21º ao 23º Torneio (DB Clássico)'],
    ['Saga Saiyajins', 'Saga Freeza (Namekusei)'],
    ['Saga Androides e Cell', 'Saga Majin Boo'],
  ],
};

// Extrai todas as afiliações/organizações normalizadas de um personagem (incluindo grupos-pai sem parênteses ou prefixo Ex-)
function extractCharacterAffiliations(c: Character): string[] {
  const rawList: string[] = [];
  const rawAff = (c as unknown as Record<string, unknown>).affiliation;
  if (Array.isArray(rawAff)) {
    rawAff.forEach((v) => {
      if (typeof v === 'string') rawList.push(v);
    });
  } else if (typeof rawAff === 'string' && rawAff.trim()) {
    rawList.push(rawAff.trim());
  }
  if (c.clan && typeof c.clan === 'string' && !/^(nenhum|desconhecido|sem clã)$/i.test(c.clan.trim())) {
    rawList.push(c.clan.trim().startsWith('Clã ') ? c.clan.trim() : `Clã ${c.clan.trim()}`);
    rawList.push(c.clan.trim());
  }
  if (c.village && typeof c.village === 'string' && !/^(nenhum|nenhuma|desconhecid[oa])$/i.test(c.village.trim())) {
    rawList.push(c.village.trim());
  }
  if (c.school && typeof c.school === 'string' && !/^(nenhum|nenhuma|desconhecid[oa])$/i.test(c.school.trim())) {
    rawList.push(c.school.trim());
  }
  if (c.faction && typeof c.faction === 'string' && !/^(nenhum|nenhuma|desconhecid[oa])$/i.test(c.faction.trim())) {
    rawList.push(c.faction.trim());
  }
  const rawSquad = (c as unknown as Record<string, unknown>).squad;
  if (typeof rawSquad === 'string' && rawSquad.trim() && !/^(nenhum|nenhuma|desconhecid[oa])$/i.test(rawSquad.trim())) {
    rawList.push(rawSquad.trim());
  }

  const expanded = new Set<string>();
  for (const item of rawList) {
    if (!item || typeof item !== 'string') continue;
    const trimmed = item.trim();
    if (!trimmed || /^(nenhum|nenhuma|desconhecid[oa]|independente|sem afiliação)$/i.test(trimmed)) continue;
    expanded.add(trimmed);

    // Sem prefixo "Ex-" ou "Antigo "
    const noEx = trimmed.replace(/^(Ex-|Antig[oa]\s+)/i, '').trim();
    if (noEx.length > 2) expanded.add(noEx);

    // Se tiver barra " / ", adiciona as partes separadas
    if (noEx.includes(' / ')) {
      noEx.split(' / ').forEach((part) => {
        const p = part.trim();
        if (p.length > 2) expanded.add(p);
      });
    }

    // Se tiver sub-rótulo entre parênteses, ex: "Doze Kizuki (Lua Superior 1)", "Hashira (Água)", "Genei Ryodan (Nº 4)"
    const parenMatch = noEx.match(/^([^(]+)\(([^)]+)\)/);
    if (parenMatch) {
      const baseGroup = parenMatch[1].trim();
      const innerGroup = parenMatch[2].trim();
      if (baseGroup.length > 2) expanded.add(baseGroup);
      if (/^Lua Superior/i.test(innerGroup)) expanded.add('Lua Superior (Doze Kizuki)');
      if (/^Lua Inferior/i.test(innerGroup)) expanded.add('Lua Inferior (Doze Kizuki)');
      if (/^Hashira$/i.test(baseGroup)) expanded.add('Esquadrão de Caçadores');
    }

    // Sinônimos conhecidos entre fichas
    if (noEx === 'Colégio U.A.' || noEx === 'U.A. High School') {
      expanded.add('U.A. High School');
      expanded.add('Colégio U.A.');
    }
    if (noEx === 'Pró-Heróis' || noEx === 'Heróis Profissionais') {
      expanded.add('Heróis Profissionais');
    }
  }
  return Array.from(expanded);
}

function getCanonicalGroupCriteria(characters: Character[]): string[] {
  const counts: Record<string, number> = {};
  for (const c of characters) {
    const groups = extractCharacterAffiliations(c);
    for (const g of groups) {
      // Evita criar critérios ultra-específicos numerados como "Doze Kizuki (Lua Superior 1)" ou "Genei Ryodan (Nº 4)"
      if (/\((Lua (Superior|Inferior)\s*\d+|N[º°]\s*\d+|\d+ª Divisão)\)/i.test(g)) continue;
      counts[g] = (counts[g] || 0) + 1;
    }
  }
  return Object.entries(counts)
    .filter(([, cnt]) => cnt >= 3)
    .map(([g]) => g);
}

function matchesArcCriterion(c: Character, targetArc: string, animeSlug: string): boolean {
  const charArc = (c.debutArc || '').trim();
  if (!charArc) return false;
  if (charArc === targetArc) return true;

  const groups = PAIRED_ARC_GROUPS[animeSlug];
  if (groups) {
    for (const group of groups) {
      if (group.includes(targetArc) && group.includes(charArc)) {
        return true;
      }
    }
  }
  return false;
}

export const AnimeGridMode: React.FC<AnimeGridModeProps> = ({
  characters,
  themeColor,
  animeTitle,
  animeSlug,
  initialFriendChallenge,
  onClearFriendChallenge,
}) => {
  // Limpeza de prefixos como 'Status: '
  const cleanStatus = (s: string) => s.replace(/^Status:\s*/i, '').trim();

  // Gera todos os critérios possíveis dinamicamente a partir dos personagens do anime
  const availableCriteria = useMemo(() => {
    const list: GridCriterion[] = [];

    // Gênero
    const genders = Array.from(new Set(characters.map((c) => (c.gender || '').trim()).filter(Boolean)));
    genders.forEach((g) => {
      const count = characters.filter((c) => (c.gender || '').trim() === g).length;
      if (count >= 3) {
        list.push({
          id: `gender_${g}`,
          label: g,
          category: 'Gênero',
          test: (c) => (c.gender || '').trim() === g,
        });
      }
    });

    // Status (sem duplicação de 'Status: ' e com unificação flexível de gênero Vivo(a) / Morto(a))
    const hasVitalStatus = characters.some((c) => {
      const s = cleanStatus(c.status || '').toLowerCase();
      return s === 'vivo' || s === 'viva' || s === 'morto' || s === 'morta';
    });

    if (hasVitalStatus) {
      const aliveCount = characters.filter((c) => {
        const s = cleanStatus(c.status || '').toLowerCase();
        return s === 'vivo' || s === 'viva';
      }).length;
      if (aliveCount >= 3) {
        list.push({
          id: 'status_vivo',
          label: 'Vivo(a)',
          category: 'Status',
          test: (c) => {
            const s = cleanStatus(c.status || '').toLowerCase();
            return s === 'vivo' || s === 'viva';
          },
        });
      }

      const deadCount = characters.filter((c) => {
        const s = cleanStatus(c.status || '').toLowerCase();
        return s === 'morto' || s === 'morta';
      }).length;
      if (deadCount >= 3) {
        list.push({
          id: 'status_morto',
          label: 'Morto(a)',
          category: 'Status',
          test: (c) => {
            const s = cleanStatus(c.status || '').toLowerCase();
            return s === 'morto' || s === 'morta';
          },
        });
      }
    } else {
      const statuses = Array.from(
        new Set(characters.map((c) => cleanStatus(c.status || '')).filter(Boolean))
      );
      statuses.forEach((s) => {
        const count = characters.filter((c) => cleanStatus(c.status || '') === s).length;
        if (count >= 3) {
          list.push({
            id: `status_${s}`,
            label: s,
            category: 'Status',
            test: (c) => cleanStatus(c.status || '') === s,
          });
        }
      });
    }

    // Afiliações / Organizações / Clãs / Vilas unificados com suporte a sub-grupos
    const canonicalGroups = getCanonicalGroupCriteria(characters);
    canonicalGroups.forEach((groupLabel) => {
      list.push({
        id: `aff_${groupLabel}`,
        label: groupLabel,
        category: 'Afiliação / Grupo',
        test: (c) => extractCharacterAffiliations(c).includes(groupLabel),
      });
    });

    // Tipo de Combate / Atuação (com suporte multi-classe canônico para híbridos como Espadachim + Akuma no Mi)
    const normalizeCombatLabel = (raw?: string): string | null => {
      if (!raw) return null;
      const s = raw.trim();
      if (/^(nenhum|nenhuma|desconhecid[oa])$/i.test(s)) return null;
      if (s === 'Usuário de Espada / Lâmina' || s === 'Armas Brancas / Espadachim') return 'Armas Brancas / Espadachim';
      if (s === 'Corpo a Corpo' || s === 'Combate Corpo a Corpo') return 'Combate Corpo a Corpo';
      if (s === 'Longo Alcance / Projéteis' || s === 'Ataque à Distância / Projéteis') return 'Ataque à Distância / Projéteis';
      return s;
    };

    const matchesCombatCriterion = (c: Character, targetLabel: string): boolean => {
      const primary = normalizeCombatLabel(c.combatType);
      if (primary === targetLabel) return true;
      const rawAny = c as unknown as Record<string, string | undefined>;
      const powerText = [c.styleOrPower, rawAny.zanpakuto, rawAny.breathing, rawAny.weapon, c.teigu].filter(Boolean).join(' ').toLowerCase();
      if (targetLabel === 'Armas Brancas / Espadachim') {
        return /(espadachim|espada|katana|lâmina|kenjutsu|foice|lança|adaga|machado|clava|kanabo|bisento|tridente|respiração|zanpakut)/i.test(powerText);
      }
      if (targetLabel === 'Magia / Poder Sobrenatural') {
        const hasFruit = Boolean(c.fruitType && !/^(nenhum|nenhuma|desconhecid[oa]|sem fruta)$/i.test(c.fruitType.trim()));
        return hasFruit || /(paramecia|zoan|logia|magia|maldiç|individualidade|nen|alquimia|stand|grimório)/i.test(powerText);
      }
      if (targetLabel === 'Combate Corpo a Corpo') {
        return /(corpo a corpo|artes marciais|rokushiki|karatê|taijutsu|hakuda|lutador|força bruta|punho|chute)/i.test(powerText);
      }
      if (targetLabel === 'Ataque à Distância / Projéteis') {
        return /(atirador|franco-atirador|arco|arma de fogo|pistola|rifle|estilingue|projéteis|canhão|artilharia)/i.test(powerText);
      }
      return false;
    };

    const combatLabels = new Set<string>();
    characters.forEach((c) => {
      const nl = normalizeCombatLabel(c.combatType);
      if (nl) combatLabels.add(nl);
    });
    combatLabels.forEach((ct) => {
      const count = characters.filter((c) => matchesCombatCriterion(c, ct)).length;
      if (count >= 3) {
        list.push({
          id: `combat_${ct}`,
          label: ct,
          category: 'Tipo de Combate',
          test: (c) => matchesCombatCriterion(c, ct),
        });
      }
    });

    // Cor de Cabelo (sincronizado com os rótulos canônicos revisados)
    const normalizeHair = (raw: string | undefined): string | null => {
      if (!raw) return null;
      const s = raw.toLowerCase().trim();
      if (s.includes('careca') || s.includes('sem cabelo')) return 'Careca / Sem Cabelo';
      if (s.includes('loiro') || s.includes('dourad') || s.includes('blond')) return 'Cabelo Loiro';
      if (s.includes('preto') || s.includes('negro') || s.includes('black')) return 'Cabelo Preto';
      if (s.includes('castanho') || s.includes('marrom') || s.includes('brown')) return 'Cabelo Castanho';
      if (s.includes('branco') || s.includes('pratead') || s.includes('grisalh') || s.includes('cinza') || s.includes('white') || s.includes('silver')) return 'Cabelo Branco / Grisalho';
      if (s.includes('ruivo') || s.includes('vermelh') || s.includes('laranja') || s.includes('red') || s.includes('orange')) return 'Cabelo Ruivo / Laranja';
      if (s.includes('azul') || s.includes('verde') || s.includes('blue') || s.includes('green') || s.includes('ciano')) return 'Cabelo Azul / Verde';
      if (s.includes('rosa') || s.includes('pink')) return 'Cabelo Rosa';
      if (s.includes('roxo') || s.includes('lilás') || s.includes('violet') || s.includes('purple')) return 'Cabelo Roxo / Lilás';
      return raw;
    };

    const hairMap: Record<string, number> = {};
    characters.forEach((c) => {
      const nh = normalizeHair(c.hairColor);
      if (nh) hairMap[nh] = (hairMap[nh] || 0) + 1;
    });
    Object.entries(hairMap).forEach(([hc, count]) => {
      if (count >= 3) {
        list.push({
          id: `hair_${hc}`,
          label: hc,
          category: 'Cor de Cabelo',
          test: (c) => normalizeHair(c.hairColor) === hc,
        });
      }
    });

    // Papel na Trama / Arquétipo (ignora fallback genérico se excessivo)
    const roleMap: Record<string, number> = {};
    characters.forEach((c) => {
      const r = c.roleOrArchetype || c.role || c.archetype;
      if (r) roleMap[r] = (roleMap[r] || 0) + 1;
    });
    Object.entries(roleMap).forEach(([r, count]) => {
      if (count >= 3 && !(r === 'Aliado / Membro de Equipe' && count > characters.length * 0.45)) {
        list.push({
          id: `role_${r}`,
          label: r,
          category: 'Papel na Trama',
          test: (c) => c.roleOrArchetype === r || c.role === r || c.archetype === r,
        });
      }
    });

    // Espécie / Natureza
    const specMap: Record<string, number> = {};
    characters.forEach((c) => {
      if (c.species) specMap[c.species] = (specMap[c.species] || 0) + 1;
    });
    Object.entries(specMap).forEach(([sp, count]) => {
      if (count >= 3) {
        list.push({
          id: `spec_${sp}`,
          label: sp,
          category: 'Espécie / Natureza',
          test: (c) => c.species === sp,
        });
      }
    });

    // Obra de Origem (Essencial para Romance)
    const originMap: Record<string, number> = {};
    characters.forEach((c) => {
      if (c.origin) originMap[c.origin] = (originMap[c.origin] || 0) + 1;
    });
    Object.entries(originMap).forEach(([orig, count]) => {
      if (count >= 2) {
        list.push({
          id: `orig_${orig}`,
          label: orig,
          category: 'Obra de Origem',
          test: (c) => c.origin === orig,
        });
      }
    });

    // Estilos de Combate / Poder (excluindo 'Nenhum' / 'Desconhecido')
    const styleMap: Record<string, number> = {};
    characters.forEach((c) => {
      const s = (c.styleOrPower || c.rcTypeOrQuinque || '').trim();
      if (s && s.length > 2 && !/^(nenhum|nenhuma|desconhecid[oa]|não possui|sem poder)$/i.test(s)) {
        styleMap[s] = (styleMap[s] || 0) + 1;
      }
    });
    Object.entries(styleMap).forEach(([st, count]) => {
      if (count >= 3) {
        list.push({
          id: `style_${st}`,
          label: st,
          category: 'Estilo / Poder',
          test: (c) => c.styleOrPower === st || c.rcTypeOrQuinque === st,
        });
      }
    });

    // Critérios específicos ricos de One Piece (Akuma no Mi e Haki)
    if (animeSlug === 'one-piece') {
      ['Paramecia', 'Zoan', 'Logia'].forEach((ft) => {
        const count = characters.filter((c) => (c.fruitType || '').toLowerCase().includes(ft.toLowerCase())).length;
        if (count >= 3) {
          list.push({
            id: `fruit_${ft}`,
            label: `Akuma no Mi: ${ft}`,
            category: 'Akuma no Mi',
            test: (c) => (c.fruitType || '').toLowerCase().includes(ft.toLowerCase()),
          });
        }
      });
      ['Armamento', 'Observação', 'Rei'].forEach((hk) => {
        const count = characters.filter((c) => Array.isArray(c.haki) && c.haki.includes(hk)).length;
        if (count >= 3) {
          list.push({
            id: `haki_${hk}`,
            label: `Haki: ${hk}`,
            category: 'Haki',
            test: (c) => Array.isArray(c.haki) && c.haki.includes(hk),
          });
        }
      });
    }

    // Critérios específicos ricos de Naruto (Transformação da Natureza e Kekkei Genkai)
    if (animeSlug === 'naruto') {
      const natureMap: Record<string, number> = {};
      characters.forEach((c) => {
        if (Array.isArray(c.natureTypes)) {
          c.natureTypes.forEach((nt) => {
            if (nt && !/^(nenhum|desconhecido)$/i.test(nt)) natureMap[nt] = (natureMap[nt] || 0) + 1;
          });
        }
      });
      Object.entries(natureMap).forEach(([nt, count]) => {
        if (count >= 4) {
          list.push({
            id: `nature_${nt}`,
            label: nt,
            category: 'Elemento / Natureza',
            test: (c) => Array.isArray(c.natureTypes) && c.natureTypes.includes(nt),
          });
        }
      });
    }

    // Critérios específicos de Hunter x Hunter (Tipo de Nen)
    if (animeSlug === 'hunter-x-hunter') {
      const nenMap: Record<string, number> = {};
      characters.forEach((c) => {
        if (c.nenType && !/^(nenhum|desconhecido)$/i.test(c.nenType)) {
          nenMap[c.nenType] = (nenMap[c.nenType] || 0) + 1;
        }
      });
      Object.entries(nenMap).forEach(([nt, count]) => {
        if (count >= 3) {
          list.push({
            id: `nen_${nt}`,
            label: `Nen: ${nt}`,
            category: 'Tipo de Nen',
            test: (c) => c.nenType === nt,
          });
        }
      });
    }

    // Arco de Estreia (com aceitação inteligente de arcos pareados/sub-arcos equivalentes)
    const arcMap: Record<string, number> = {};
    characters.forEach((c) => {
      if (c.debutArc && c.debutArc.trim().length > 2) {
        const arc = c.debutArc.trim();
        arcMap[arc] = (arcMap[arc] || 0) + 1;
      }
    });
    Object.entries(arcMap).forEach(([arc, count]) => {
      if (count >= 3) {
        list.push({
          id: `arc_${arc}`,
          label: arc,
          category: 'Arco de Estreia',
          test: (c) => matchesArcCriterion(c, arc, animeSlug),
        });
      }
    });

    return list;
  }, [characters, animeSlug]);

  // 7.2 - Validador rigoroso de solvabilidade: garante que existam 9 personagens DISTINTOS para preencher as 9 casas
  const isGrid100PercentSolvable = (
    rows: GridCriterion[],
    cols: GridCriterion[]
  ): boolean => {
    if (rows.length !== 3 || cols.length !== 3) return false;
    const cellCandidates: string[][] = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const matches = characters.filter((char) => rows[r].test(char) && cols[c].test(char));
        if (matches.length < 1) {
          return false;
        }
        cellCandidates.push(matches.map((m) => m.id));
      }
    }

    // Ordena as células das mais restritas para as menos restritas para backtracking instantâneo
    const order = [0, 1, 2, 3, 4, 5, 6, 7, 8].sort(
      (a, b) => cellCandidates[a].length - cellCandidates[b].length
    );
    const used = new Set<string>();

    const canAssignAll9 = (idx: number): boolean => {
      if (idx === 9) return true;
      const cellIdx = order[idx];
      for (const charId of cellCandidates[cellIdx]) {
        if (!used.has(charId)) {
          used.add(charId);
          if (canAssignAll9(idx + 1)) return true;
          used.delete(charId);
        }
      }
      return false;
    };

    return canAssignAll9(0);
  };

  // Função interna para sortear uma combinação candidata de linhas e colunas
  const generateValidGridCandidate = (seedStr: string): { rows: GridCriterion[]; cols: GridCriterion[] } | null => {
    if (availableCriteria.length < 6) return null;

    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
      hash = (hash << 5) - hash + seedStr.charCodeAt(i);
      hash |= 0;
    }
    const pseudoRandom = () => {
      hash = Math.sin(hash++) * 10000;
      return hash - Math.floor(hash);
    };

    // Embaralha critérios determinísticamente a partir da seed
    const shuffled = [...availableCriteria].sort(() => pseudoRandom() - 0.5);

    // Algoritmo construtivo com teste ativo de solvabilidade
    for (let i = 0; i < shuffled.length; i++) {
      const r1 = shuffled[i];
      for (let j = i + 1; j < shuffled.length; j++) {
        const r2 = shuffled[j];
        if (r2.category === r1.category) continue;
        for (let k = j + 1; k < Math.min(shuffled.length, j + 40); k++) {
          const r3 = shuffled[k];
          if (r3.category === r1.category || r3.category === r2.category) continue;
          const rows = [r1, r2, r3];
          const rowCats = new Set([r1.category, r2.category, r3.category]);
          const rowIds = new Set([r1.id, r2.id, r3.id]);

          // Filtra somente colunas que comprovadamente possuem candidatos com cada uma das 3 linhas
          const validCols = availableCriteria.filter((col) => {
            if (rowIds.has(col.id)) return false;
            return (
              characters.some((c) => r1.test(c) && col.test(c)) &&
              characters.some((c) => r2.test(c) && col.test(c)) &&
              characters.some((c) => r3.test(c) && col.test(c))
            );
          });

          // 1. Tenta achar 3 colunas com 3 categorias distintas entre si e das 3 linhas (6 categorias 100% distintas)
          const distinctCols = validCols.filter((col) => !rowCats.has(col.category));
          for (let c1Idx = 0; c1Idx < distinctCols.length; c1Idx++) {
            const c1 = distinctCols[c1Idx];
            for (let c2Idx = c1Idx + 1; c2Idx < distinctCols.length; c2Idx++) {
              const c2 = distinctCols[c2Idx];
              if (c2.category === c1.category) continue;
              for (let c3Idx = c2Idx + 1; c3Idx < distinctCols.length; c3Idx++) {
                const c3 = distinctCols[c3Idx];
                if (c3.category === c1.category || c3.category === c2.category) continue;
                const candidate = { rows, cols: [c1, c2, c3] };
                if (isGrid100PercentSolvable(candidate.rows, candidate.cols)) {
                  return candidate;
                }
              }
            }
          }

          // 2. Se não encontrou 6 categorias distintas, busca com 3 colunas distintas entre si
          for (let c1Idx = 0; c1Idx < validCols.length; c1Idx++) {
            const c1 = validCols[c1Idx];
            for (let c2Idx = c1Idx + 1; c2Idx < validCols.length; c2Idx++) {
              const c2 = validCols[c2Idx];
              if (c2.category === c1.category) continue;
              for (let c3Idx = c2Idx + 1; c3Idx < validCols.length; c3Idx++) {
                const c3 = validCols[c3Idx];
                if (c3.category === c1.category || c3.category === c2.category) continue;
                const candidate = { rows, cols: [c1, c2, c3] };
                if (isGrid100PercentSolvable(candidate.rows, candidate.cols)) {
                  return candidate;
                }
              }
            }
          }
        }
      }
    }

    return null;
  };

  // Função para gerar uma grade 3x3 garantida: se o sorteio inicial for impossível, re-sorteia até 40 vezes
  const generateValidGrid = (baseSeed: string): { rows: GridCriterion[]; cols: GridCriterion[] } | null => {
    for (let attempt = 0; attempt < 40; attempt++) {
      const currentSeed = attempt === 0 ? baseSeed : `${baseSeed}_attempt_${attempt}`;
      const grid = generateValidGridCandidate(currentSeed);
      if (grid && isGrid100PercentSolvable(grid.rows, grid.cols)) {
        return grid;
      }
    }
    return null;
  };

  const [isEndless, setIsEndless] = useState<boolean>(() => Boolean(initialFriendChallenge?.m === 'grid'));
  const [isSpeedrun, setIsSpeedrun] = useState<boolean>(false);
  const [endlessSeed, setEndlessSeed] = useState<number>(() => Math.floor(Math.random() * 100000) + 1);
  const [forcedChallengeSeed, setForcedChallengeSeed] = useState<string | null>(() =>
    initialFriendChallenge?.m === 'grid' && initialFriendChallenge.g ? initialFriendChallenge.g : null
  );
  const [survivalState, setSurvivalState] = useState<SurvivalState>(() => getSurvivalState(animeSlug, 'grid'));
  const [survivalHealed, setSurvivalHealed] = useState<boolean>(false);

  useEffect(() => {
    setSurvivalState(getSurvivalState(animeSlug, 'grid'));
    if (initialFriendChallenge?.m === 'grid' && initialFriendChallenge.g) {
      setIsEndless(true);
      setIsSpeedrun(false);
      setForcedChallengeSeed(initialFriendChallenge.g);
    }
  }, [animeSlug, initialFriendChallenge]);

  const todayStr = useMemo(() => getDailyDateString(), []);
  const legacyUtcTodayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const gridSeed = isEndless
    ? forcedChallengeSeed || `endless_${animeSlug}_${endlessSeed}`
    : `daily_${animeSlug}_${todayStr}`;
  const legacyGridSeed = !isEndless && legacyUtcTodayStr !== todayStr ? `daily_${animeSlug}_${legacyUtcTodayStr}` : undefined;
  const gridDefinition = useMemo(() => generateValidGrid(gridSeed), [availableCriteria, gridSeed]);

  const handleToggleSurvival = (active: boolean) => {
    setIsSpeedrun(false);
    const next = toggleSurvivalMode(animeSlug, 'grid', active);
    setSurvivalState(next);
    setSurvivalHealed(false);
    if (active) {
      setForcedChallengeSeed(null);
      setEndlessSeed((s) => s + 1);
    }
  };

  const handleSurvivalOutcome = (won: boolean) => {
    if (!survivalState.active) return;
    if (won) {
      const { state, healedHeart } = recordSurvivalWin(animeSlug, 'grid');
      setSurvivalState(state);
      setSurvivalHealed(healedHeart);
    } else {
      const { state } = recordSurvivalLoss(animeSlug, 'grid');
      setSurvivalState(state);
      setSurvivalHealed(false);
    }
  };

  const handleRestartSurvival = () => {
    const next = resetSurvivalRun(animeSlug, 'grid');
    setSurvivalState(next);
    setSurvivalHealed(false);
    setForcedChallengeSeed(null);
    setEndlessSeed((s) => s + 1);
  };

  const handleChallengeFriend = () => {
    const url = encodeFriendChallengeUrl({
      a: animeSlug,
      m: 'grid',
      g: gridSeed,
    });
    const text = `⚔️ Desafio 1v1 no AnimeDLE (${animeTitle} - Grade 3×3)!\nJogue exatamente a mesma Grade 3×3 que eu:\n${url}`;
    navigator.clipboard.writeText(text);
  };

  const handleSendRevenge = () => {
    const newSeedNum = Math.floor(Math.random() * 900000) + 100000;
    const newGridSeed = `endless_${animeSlug}_${newSeedNum}`;
    setForcedChallengeSeed(null);
    onClearFriendChallenge?.();
    setEndlessSeed(newSeedNum);
    const url = encodeFriendChallengeUrl({
      a: animeSlug,
      m: 'grid',
      g: newGridSeed,
    });
    const text = `🔥 Revanche no AnimeDLE (${animeTitle} - Grade 3×3)!\nQuero ver você resolver esta nova Grade:\n${url}`;
    navigator.clipboard.writeText(text);
  };

  if (!gridDefinition) {
    return (
      <div className="max-w-md mx-auto text-center p-8 bg-[#0d1426] border border-[#202b43] rounded-3xl my-8">
        <AlertCircle size={36} className="text-amber-400 mx-auto mb-3" />
        <h3 className="text-white font-bold text-lg mb-2">Grade Indisponível</h3>
        <p className="text-slate-400 text-xs">
          Não há atributos suficientes cadastrados para gerar uma matriz 3x3 balanceada neste anime.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-6 px-3">
      {/* Header Padronizado com Diário / Infinito / Sobrevivência (E2) / Speedrun (N5) */}
      <ModeHeaderCard
        title="Modo Grid 3×3"
        description="Cruze os atributos e acerte os 9 personagens com apenas 9 palpites! Ganhe pontos extras de Raridade!"
        icon={<LayoutGrid size={22} />}
        themeColor={themeColor}
        isEndless={isEndless}
        onToggleEndless={(val) => {
          setIsSpeedrun(false);
          setIsEndless(val);
          if (!val) setForcedChallengeSeed(null);
        }}
        survivalState={survivalState}
        onToggleSurvival={handleToggleSurvival}
        isSpeedrun={isSpeedrun}
        onToggleSpeedrun={(act) => setIsSpeedrun(act)}
        healedBanner={survivalHealed}
      />

      {isSpeedrun ? (
        <SpeedrunArena
          characters={characters}
          animeSlug={animeSlug}
          animeTitle={animeTitle}
          themeColor={themeColor}
          mode="grid"
          onExitSpeedrun={() => setIsSpeedrun(false)}
        />
      ) : (
        /* Grade isolada por gridSeed */
        <GridBoard
          key={gridSeed}
          gridSeed={gridSeed}
          legacyGridSeed={legacyGridSeed}
          isEndless={isEndless}
          gridDefinition={gridDefinition}
          characters={characters}
          animeTitle={animeTitle}
          animeSlug={animeSlug}
          themeColor={themeColor}
          onResetForInfinite={() => {
            setForcedChallengeSeed(null);
            setSurvivalHealed(false);
            setEndlessSeed((s) => s + 1);
          }}
          survivalState={survivalState}
          survivalHealed={survivalHealed}
          onSurvivalOutcome={handleSurvivalOutcome}
          onRestartSurvival={handleRestartSurvival}
          friendChallenge={initialFriendChallenge?.m === 'grid' ? initialFriendChallenge : null}
          onSendRevenge={handleSendRevenge}
        />
      )}
    </div>
  );
};
