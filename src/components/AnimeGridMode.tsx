import React, { useState, useMemo, useEffect } from 'react';
import { Character } from '../types/anime';
import { Search, X, Check, AlertCircle, RefreshCw, Share2, Trophy, Sparkles, LayoutGrid } from 'lucide-react';
import { unlockAchievement, logDailyActivity } from '../data/achievements';

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
}

interface GridBoardProps {
  gridSeed: string;
  isEndless: boolean;
  gridDefinition: { rows: GridCriterion[]; cols: GridCriterion[] };
  characters: Character[];
  animeTitle: string;
  themeColor: string;
  onResetForInfinite?: () => void;
}

const GridBoard: React.FC<GridBoardProps> = ({
  gridSeed,
  isEndless,
  gridDefinition,
  characters,
  animeTitle,
  themeColor,
  onResetForInfinite,
}) => {
  // Estado isolado da grade por seed
  const [cells, setCells] = useState<(Character | null)[]>(() => {
    const saved = localStorage.getItem(`animedle_grid_${gridSeed}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return Array(9).fill(null);
  });

  const [guessesLeft, setGuessesLeft] = useState<number>(() => {
    const saved = localStorage.getItem(`animedle_grid_guesses_${gridSeed}`);
    return saved !== null ? parseInt(saved, 10) : 9;
  });

  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showCopied, setShowCopied] = useState(false);

  // Salva no localStorage sempre que células ou tentativas mudam
  useEffect(() => {
    localStorage.setItem(`animedle_grid_${gridSeed}`, JSON.stringify(cells));
    localStorage.setItem(`animedle_grid_guesses_${gridSeed}`, guessesLeft.toString());
  }, [cells, guessesLeft, gridSeed]);

  const usedCharacterIds = useMemo(() => {
    return new Set(cells.filter(Boolean).map((c) => c!.id));
  }, [cells]);

  // Lista de personagens filtrada pelo input de busca (mostra todos ordenados quando vazio)
  const filteredCandidates = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      return [...characters].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
    }
    return characters
      .filter((c) => c.name.toLowerCase().includes(q))
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  }, [characters, searchQuery]);

  const handleCellClick = (index: number) => {
    if (cells[index] !== null || guessesLeft <= 0) return;
    setSelectedCell(index);
    setSearchQuery('');
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
      // Acerto
      const newCells = [...cells];
      newCells[selectedCell] = char;
      setCells(newCells);
      setGuessesLeft((g) => Math.max(0, g - 1));
      setSelectedCell(null);
      setErrorMessage(null);
    } else {
      // Erro
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

  const isGameOver = guessesLeft === 0 || cells.filter(Boolean).length === 9;
  const score = cells.filter(Boolean).length;

  useEffect(() => {
    if (isGameOver) {
      logDailyActivity();
      if (score === 9) {
        unlockAchievement('grid_master');
      }
    }
  }, [isGameOver, score]);

  const handleCopyGrid = () => {
    let text = `AnimeDLE Grid - ${animeTitle} (${isEndless ? 'Modo Infinito' : 'Diário'})\n`;
    text += `Acertos: ${score}/9 | Palpites usados: ${9 - guessesLeft}/9\n\n`;
    for (let r = 0; r < 3; r++) {
      let rowStr = '';
      for (let c = 0; c < 3; c++) {
        rowStr += cells[r * 3 + c] ? '🟩' : '⬛';
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
      {/* Painel de Palpites e Placar */}
      <div className="flex items-center justify-between px-2 mb-3 text-xs">
        <span className="text-slate-400">
          Acertos: <strong className="text-white font-black text-sm">{score}/9</strong>
        </span>
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Palpites Restantes:</span>
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

      {/* A Matriz 3x3 Principal com Espaçamento Aumentado */}
      <div className="bg-[#0b101d] border border-[#1e293b] rounded-3xl p-3 sm:p-5 shadow-2xl">
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
          {/* Canto superior esquerdo decorativo */}
          <div className="flex items-center justify-center rounded-2xl bg-[#070b14]/60 border border-[#162035] p-2">
            <Sparkles size={20} className="text-slate-500" />
          </div>

          {/* Cabeçalhos das 3 Colunas */}
          {gridDefinition.cols.map((col, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center text-center p-2.5 sm:p-3 rounded-2xl bg-[#111a2d] border border-[#202b43] shadow-sm min-h-[70px] sm:min-h-[80px]"
            >
              <span className="text-[9px] sm:text-[10px] uppercase font-black text-slate-400 tracking-wider">
                {col.category}
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-white mt-1 line-clamp-2">
                {col.label}
              </span>
            </div>
          ))}

          {/* 3 Linhas com seus cabeçalhos e células */}
          {[0, 1, 2].map((rowIdx) => (
            <React.Fragment key={rowIdx}>
              {/* Cabeçalho da Linha */}
              <div className="flex flex-col items-center justify-center text-center p-2.5 sm:p-3 rounded-2xl bg-[#111a2d] border border-[#202b43] shadow-sm min-h-[95px] sm:min-h-[120px] md:min-h-[135px]">
                <span className="text-[9px] sm:text-[10px] uppercase font-black text-slate-400 tracking-wider">
                  {gridDefinition.rows[rowIdx].category}
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-white mt-1 line-clamp-2">
                  {gridDefinition.rows[rowIdx].label}
                </span>
              </div>

              {/* 3 Células da Linha */}
              {[0, 1, 2].map((colIdx) => {
                const cellIndex = rowIdx * 3 + colIdx;
                const char = cells[cellIndex];
                const isSelected = selectedCell === cellIndex;

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
                        <img
                          src={char.avatar}
                          alt={char.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-emerald-400 shadow-md mb-1.5"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <span className="text-[10px] sm:text-xs font-black text-white text-center line-clamp-1 px-1">
                          {char.name}
                        </span>
                        <div className="absolute top-1.5 right-1.5 bg-emerald-500 text-black rounded-full p-1 shadow-md">
                          <Check size={11} strokeWidth={4} />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-500 group-hover:text-slate-300">
                        <span className="text-2xl sm:text-3xl font-light mb-1">+</span>
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
              : 'Bom jogo! Compartilhe o seu resultado ou treine no Modo Infinito.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
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

            {/* Destaque dos Dois Critérios Cruzados */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              <div className="p-3 rounded-2xl bg-[#131c31] border border-[#202b43] text-center">
                <span className="text-[9px] uppercase font-black text-slate-400 block mb-0.5">
                  {gridDefinition.rows[Math.floor(selectedCell / 3)].category} (Linha)
                </span>
                <span className="text-xs sm:text-sm font-black text-amber-400">
                  {gridDefinition.rows[Math.floor(selectedCell / 3)].label}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-[#131c31] border border-[#202b43] text-center">
                <span className="text-[9px] uppercase font-black text-slate-400 block mb-0.5">
                  {gridDefinition.cols[selectedCell % 3].category} (Coluna)
                </span>
                <span className="text-xs sm:text-sm font-black text-sky-400">
                  {gridDefinition.cols[selectedCell % 3].label}
                </span>
              </div>
            </div>

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
                placeholder={`Buscar personagem em ${animeTitle}...`}
                autoFocus
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#141e34] border border-[#22304d] text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-amber-400 shadow-inner"
              />
            </div>

            {/* Lista Scrollável Completa de Personagens */}
            <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((c) => {
                  const isUsed = usedCharacterIds.has(c.id);
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleSelectCharacter(c)}
                      disabled={isUsed}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all ${
                        isUsed
                          ? 'opacity-40 bg-black/20 cursor-not-allowed'
                          : 'bg-[#121b30] hover:bg-[#1a2644] text-white hover:border-slate-500 border border-[#1e2a42]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-600 shadow-sm"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <span className="text-xs sm:text-sm font-bold text-left">{c.name}</span>
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
    </>
  );
};

export const AnimeGridMode: React.FC<AnimeGridModeProps> = ({
  characters,
  themeColor,
  animeTitle,
  animeSlug,
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

    // Status (sem duplicação de 'Status: ')
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

    // Afiliações
    const affMap: Record<string, number> = {};
    characters.forEach((c) => {
      if (Array.isArray(c.affiliation)) {
        c.affiliation.forEach((a) => {
          if (a && a.length > 2) affMap[a] = (affMap[a] || 0) + 1;
        });
      }
    });
    Object.entries(affMap).forEach(([aff, count]) => {
      if (count >= 2) {
        list.push({
          id: `aff_${aff}`,
          label: aff,
          category: 'Afiliação',
          test: (c) => Array.isArray(c.affiliation) && c.affiliation.includes(aff),
        });
      }
    });

    // Tipo de Combate / Atuação
    const combatMap: Record<string, number> = {};
    characters.forEach((c) => {
      if (c.combatType) combatMap[c.combatType] = (combatMap[c.combatType] || 0) + 1;
    });
    Object.entries(combatMap).forEach(([ct, count]) => {
      if (count >= 2) {
        list.push({
          id: `combat_${ct}`,
          label: ct,
          category: 'Tipo de Combate',
          test: (c) => c.combatType === ct,
        });
      }
    });

    // Cor de Cabelo
    const hairMap: Record<string, number> = {};
    characters.forEach((c) => {
      if (c.hairColor) hairMap[c.hairColor] = (hairMap[c.hairColor] || 0) + 1;
    });
    Object.entries(hairMap).forEach(([hc, count]) => {
      if (count >= 2) {
        list.push({
          id: `hair_${hc}`,
          label: hc,
          category: 'Cor de Cabelo',
          test: (c) => c.hairColor === hc,
        });
      }
    });

    // Papel na Trama / Arquétipo
    const roleMap: Record<string, number> = {};
    characters.forEach((c) => {
      const r = c.roleOrArchetype || c.role || c.archetype;
      if (r) roleMap[r] = (roleMap[r] || 0) + 1;
    });
    Object.entries(roleMap).forEach(([r, count]) => {
      if (count >= 2) {
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
      if (count >= 2) {
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

    // Estilos de Combate / Poder
    const styleMap: Record<string, number> = {};
    characters.forEach((c) => {
      const s = c.styleOrPower || c.rcTypeOrQuinque;
      if (s && s.length > 2) styleMap[s] = (styleMap[s] || 0) + 1;
    });
    Object.entries(styleMap).forEach(([st, count]) => {
      if (count >= 2) {
        list.push({
          id: `style_${st}`,
          label: st,
          category: 'Estilo / Poder',
          test: (c) => c.styleOrPower === st || c.rcTypeOrQuinque === st,
        });
      }
    });

    // Arco de Estreia
    const arcMap: Record<string, number> = {};
    characters.forEach((c) => {
      if (c.debutArc && c.debutArc.trim().length > 2) {
        const arc = c.debutArc.trim();
        arcMap[arc] = (arcMap[arc] || 0) + 1;
      }
    });
    Object.entries(arcMap).forEach(([arc, count]) => {
      if (count >= 2) {
        list.push({
          id: `arc_${arc}`,
          label: arc,
          category: 'Arco de Estreia',
          test: (c) => (c.debutArc || '').trim() === arc,
        });
      }
    });

    return list;
  }, [characters]);

  // Função para gerar uma grade 3x3 válida garantindo 100% de interseção e categorias sem repetição
  const generateValidGrid = (seedStr: string): { rows: GridCriterion[]; cols: GridCriterion[] } | null => {
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

    // Embaralha critérios determinísticamente
    const shuffled = [...availableCriteria].sort(() => pseudoRandom() - 0.5);

    // Algoritmo construtivo com filtragem ativa de colunas
    for (let i = 0; i < shuffled.length; i++) {
      const r1 = shuffled[i];
      for (let j = i + 1; j < shuffled.length; j++) {
        const r2 = shuffled[j];
        if (r2.category === r1.category) continue;
        for (let k = j + 1; k < Math.min(shuffled.length, j + 35); k++) {
          const r3 = shuffled[k];
          if (r3.category === r1.category || r3.category === r2.category) continue;
          const rows = [r1, r2, r3];
          const rowCats = new Set([r1.category, r2.category, r3.category]);
          const rowIds = new Set([r1.id, r2.id, r3.id]);

          // Filtra somente colunas que possuem ao menos 1 candidato com as 3 linhas
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
                return { rows, cols: [c1, c2, c3] };
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
                return { rows, cols: [c1, c2, c3] };
              }
            }
          }
        }
      }
    }

    return null;
  };

  const [isEndless, setIsEndless] = useState<boolean>(false);
  const [endlessSeed, setEndlessSeed] = useState<number>(1);
  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const gridSeed = isEndless ? `endless_${animeSlug}_${endlessSeed}` : `daily_${animeSlug}_${todayStr}`;
  const gridDefinition = useMemo(() => generateValidGrid(gridSeed), [availableCriteria, gridSeed]);

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
      {/* Header com Status e Alternador Diário / Infinito */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0d1426] border border-[#202b43] rounded-2xl p-4 mb-5 shadow-lg">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
            style={{ backgroundColor: `${themeColor}25`, color: themeColor }}
          >
            <LayoutGrid size={22} />
          </div>
          <div>
            <h2 className="text-white font-extrabold text-base flex items-center gap-2">
              Modo Grid
            </h2>
            <p className="text-slate-400 text-xs">
              Cruze os atributos e acerte os 9 personagens com apenas 9 palpites!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEndless(false)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              !isEndless
                ? 'bg-white/10 text-white border border-white/20 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Diário
          </button>
          <button
            onClick={() => setIsEndless(true)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isEndless
                ? 'bg-white/10 text-white border border-white/20 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Infinito
          </button>
        </div>
      </div>

      {/* Grade isolada por gridSeed */}
      <GridBoard
        key={gridSeed}
        gridSeed={gridSeed}
        isEndless={isEndless}
        gridDefinition={gridDefinition}
        characters={characters}
        animeTitle={animeTitle}
        themeColor={themeColor}
        onResetForInfinite={() => setEndlessSeed((s) => s + 1)}
      />
    </div>
  );
};
