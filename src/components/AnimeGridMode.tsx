import React, { useState, useMemo, useEffect } from 'react';
import { Character } from '../types/anime';
import { Search, X, Check, AlertCircle, RefreshCw, Share2, Trophy, HelpCircle, Sparkles } from 'lucide-react';

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

export const AnimeGridMode: React.FC<AnimeGridModeProps> = ({
  characters,
  themeColor,
  animeTitle,
  animeSlug,
}) => {
  // Gera todos os critérios possíveis dinamicamente a partir dos personagens do anime
  const availableCriteria = useMemo(() => {
    const list: GridCriterion[] = [];

    // Gênero
    const genders = Array.from(new Set(characters.map((c) => c.gender).filter(Boolean)));
    genders.forEach((g) => {
      const count = characters.filter((c) => c.gender === g).length;
      if (count >= 3) {
        list.push({
          id: `gender_${g}`,
          label: `${g}`,
          category: 'Gênero',
          test: (c) => c.gender === g,
        });
      }
    });

    // Status
    const statuses = Array.from(new Set(characters.map((c) => c.status).filter(Boolean)));
    statuses.forEach((s) => {
      const count = characters.filter((c) => c.status === s).length;
      if (count >= 3) {
        list.push({
          id: `status_${s}`,
          label: `Status: ${s}`,
          category: 'Status',
          test: (c) => c.status === s,
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
      if (count >= 3) {
        list.push({
          id: `aff_${aff}`,
          label: aff,
          category: 'Afiliação',
          test: (c) => Array.isArray(c.affiliation) && c.affiliation.includes(aff),
        });
      }
    });

    // Ranks / Posições
    const rankMap: Record<string, number> = {};
    characters.forEach((c) => {
      const r = c.rank || c.role || c.archetype || c.origin;
      if (r && r.length > 2) rankMap[r] = (rankMap[r] || 0) + 1;
    });
    Object.entries(rankMap).forEach(([rank, count]) => {
      if (count >= 3) {
        list.push({
          id: `rank_${rank}`,
          label: rank,
          category: 'Posição / Categoria',
          test: (c) => (c.rank === rank || c.role === rank || c.archetype === rank || c.origin === rank),
        });
      }
    });

    // Estilos de Combate / Poder / Espécie
    const styleMap: Record<string, number> = {};
    characters.forEach((c) => {
      const s = c.styleOrPower || c.species || c.rcTypeOrQuinque;
      if (s && s.length > 2) styleMap[s] = (styleMap[s] || 0) + 1;
    });
    Object.entries(styleMap).forEach(([st, count]) => {
      if (count >= 3) {
        list.push({
          id: `style_${st}`,
          label: st,
          category: 'Estilo / Poder',
          test: (c) => (c.styleOrPower === st || c.species === st || c.rcTypeOrQuinque === st),
        });
      }
    });

    return list;
  }, [characters]);

  // Função para gerar uma grade 3x3 válida (onde todas as 9 células têm ao menos 1 candidato)
  const generateValidGrid = (seedStr: string): { rows: GridCriterion[]; cols: GridCriterion[] } | null => {
    if (availableCriteria.length < 6) return null;

    // Pseudo-random simples baseado na seed
    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
      hash = (hash << 5) - hash + seedStr.charCodeAt(i);
      hash |= 0;
    }
    const pseudoRandom = () => {
      hash = Math.sin(hash++) * 10000;
      return hash - Math.floor(hash);
    };

    // Tenta encontrar uma combinação de 3 linhas e 3 colunas válidas
    for (let attempt = 0; attempt < 200; attempt++) {
      const shuffled = [...availableCriteria].sort(() => pseudoRandom() - 0.5);
      const rows = shuffled.slice(0, 3);
      const cols = shuffled.slice(3, 6);

      // Garante que nenhuma linha tenha o mesmo id de uma coluna
      const rowIds = new Set(rows.map((r) => r.id));
      if (cols.some((c) => rowIds.has(c.id))) continue;

      // Verifica se cada uma das 9 células tem pelo menos 1 candidato
      let allValid = true;
      for (const r of rows) {
        for (const col of cols) {
          const matchCount = characters.filter((ch) => r.test(ch) && col.test(ch)).length;
          if (matchCount === 0) {
            allValid = false;
            break;
          }
        }
        if (!allValid) break;
      }

      if (allValid) {
        return { rows, cols };
      }
    }

    // Fallback: se não achar com critérios mistos, relaxa e pega os primeiros 3x3
    return {
      rows: availableCriteria.slice(0, 3),
      cols: availableCriteria.slice(3, 6),
    };
  };

  const [isEndless, setIsEndless] = useState<boolean>(false);
  const [endlessSeed, setEndlessSeed] = useState<number>(1);
  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const gridSeed = isEndless ? `endless_${animeSlug}_${endlessSeed}` : `daily_${animeSlug}_${todayStr}`;
  const gridDefinition = useMemo(() => generateValidGrid(gridSeed), [availableCriteria, gridSeed]);

  // Estado do jogo: 9 células preenchidas ou null
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

  // Célula atualmente selecionada para dar palpite: índice 0..8
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showCopied, setShowCopied] = useState(false);

  // Salva estado
  useEffect(() => {
    localStorage.setItem(`animedle_grid_${gridSeed}`, JSON.stringify(cells));
    localStorage.setItem(`animedle_grid_guesses_${gridSeed}`, guessesLeft.toString());
  }, [cells, guessesLeft, gridSeed]);

  // Personagens já usados na grade
  const usedCharacterIds = useMemo(() => {
    return new Set(cells.filter(Boolean).map((c) => c!.id));
  }, [cells]);

  // Personagens filtrados na busca do modal
  const filteredCandidates = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return characters
      .filter((c) => c.name.toLowerCase().includes(q))
      .slice(0, 8);
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
      // Acerto!
      const newCells = [...cells];
      newCells[selectedCell] = char;
      setCells(newCells);
      setGuessesLeft((g) => Math.max(0, g - 1));
      setSelectedCell(null);
      setErrorMessage(null);
    } else {
      // Erro!
      setGuessesLeft((g) => Math.max(0, g - 1));
      const failReason = !matchRow && !matchCol
        ? `Não cumpre nem "${rowCrit.label}" nem "${colCrit.label}"!`
        : !matchRow
        ? `Não cumpre "${rowCrit.label}"!`
        : `Não cumpre "${colCrit.label}"!`;
      setErrorMessage(`Incorreto! ${char.name} ${failReason}`);
    }
  };

  const handleCopyGrid = () => {
    let text = `AnimeDLE Grid (${animeTitle}) - ${isEndless ? 'Modo Infinito' : 'Diário'}\n`;
    text += `Acertos: ${cells.filter(Boolean).length}/9 | Palpites usados: ${9 - guessesLeft}/9\n\n`;
    for (let r = 0; r < 3; r++) {
      let rowStr = '';
      for (let c = 0; c < 3; c++) {
        rowStr += cells[r * 3 + c] ? '🟩' : '⬛';
      }
      text += rowStr + '\n';
    }
    text += '\nJogue em: animedle.vercel.app';
    navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2500);
  };

  const handleResetForInfinite = () => {
    setEndlessSeed((s) => s + 1);
    setCells(Array(9).fill(null));
    setGuessesLeft(9);
    setSelectedCell(null);
    setErrorMessage(null);
  };

  const isGameOver = guessesLeft === 0 || cells.filter(Boolean).length === 9;
  const score = cells.filter(Boolean).length;

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
            className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg shadow-md"
            style={{ backgroundColor: `${themeColor}25`, color: themeColor }}
          >
            3×3
          </div>
          <div>
            <h2 className="text-white font-extrabold text-base flex items-center gap-2">
              Modo Grid <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">Pokédoku</span>
            </h2>
            <p className="text-slate-400 text-xs">
              Cruze os atributos e acerte os 9 personagens com apenas 9 palpites!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsEndless(false);
              setSelectedCell(null);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              !isEndless
                ? 'bg-white/10 text-white border border-white/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Diário
          </button>
          <button
            onClick={() => {
              setIsEndless(true);
              setSelectedCell(null);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isEndless
                ? 'bg-white/10 text-white border border-white/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Infinito
          </button>
        </div>
      </div>

      {/* Painel de Palpites Restantes */}
      <div className="flex items-center justify-between px-2 mb-3 text-xs">
        <span className="text-slate-400">
          Acertos: <strong className="text-white font-black">{score}/9</strong>
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">Tentativas Restantes:</span>
          <span
            className={`font-black px-2 py-0.5 rounded-full text-xs ${
              guessesLeft > 3
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse'
            }`}
          >
            {guessesLeft} / 9
          </span>
        </div>
      </div>

      {/* A Matriz 3x3 Principal */}
      <div className="bg-[#0b101d] border border-[#1e293b] rounded-3xl p-3 sm:p-5 shadow-2xl">
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {/* Canto superior esquerdo vazio */}
          <div className="flex items-center justify-center rounded-2xl bg-[#070b14]/50 border border-transparent p-2">
            <Sparkles size={20} className="text-slate-600" />
          </div>

          {/* Cabeçalhos das 3 Colunas */}
          {gridDefinition.cols.map((col, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center text-center p-2 rounded-2xl bg-[#111a2d] border border-[#202b43] shadow-sm min-h-[64px]"
            >
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                {col.category}
              </span>
              <span className="text-xs sm:text-sm font-black text-slate-200 mt-0.5 line-clamp-2">
                {col.label}
              </span>
            </div>
          ))}

          {/* 3 Linhas com seus cabeçalhos e células */}
          {[0, 1, 2].map((rowIdx) => (
            <React.Fragment key={rowIdx}>
              {/* Cabeçalho da Linha */}
              <div className="flex flex-col items-center justify-center text-center p-2 rounded-2xl bg-[#111a2d] border border-[#202b43] shadow-sm min-h-[85px] sm:min-h-[110px]">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  {gridDefinition.rows[rowIdx].category}
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-200 mt-0.5 line-clamp-2">
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
                    className={`relative rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center p-2 min-h-[85px] sm:min-h-[110px] group overflow-hidden ${
                      char
                        ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                        : isSelected
                        ? 'ring-2 ring-amber-400'
                        : guessesLeft > 0
                        ? 'bg-[#101728] border-[#222f49] hover:border-slate-500 hover:bg-[#151f35] cursor-pointer'
                        : 'bg-[#0d1424] border-[#1a2337] opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {char ? (
                      <>
                        <img
                          src={char.avatar}
                          alt={char.name}
                          className="w-11 h-11 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-emerald-400 shadow-md mb-1.5"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <span className="text-[10px] sm:text-xs font-bold text-white text-center line-clamp-1">
                          {char.name}
                        </span>
                        <div className="absolute top-1 right-1 bg-emerald-500 text-black rounded-full p-0.5 shadow">
                          <Check size={10} strokeWidth={4} />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-500 group-hover:text-slate-300">
                        <span className="text-xl sm:text-2xl font-light mb-0.5">+</span>
                        <span className="text-[9px] uppercase font-bold tracking-tight">
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

      {/* Card de Fim de Jogo / Resultado */}
      {isGameOver && (
        <div className="mt-5 p-5 bg-[#0d1426] border border-[#202b43] rounded-3xl text-center shadow-xl animate-fade-in">
          <Trophy size={36} className="text-amber-400 mx-auto mb-2" />
          <h3 className="text-white font-extrabold text-lg mb-1">
            {score === 9 ? 'Incrível! Grade Perfeita 9/9! 👑' : `Desafio Concluído: ${score}/9 Acertos!`}
          </h3>
          <p className="text-slate-400 text-xs mb-4">
            {score === 9
              ? 'Você dominou completamente os critérios de hoje do AnimeDLE!'
              : 'Bom jogo! Compartilhe o seu resultado ou tente uma nova grade no Modo Infinito.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleCopyGrid}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              <Share2 size={15} />
              {showCopied ? 'Resultado Copiado!' : 'Copiar Grade'}
            </button>

            {isEndless && (
              <button
                onClick={handleResetForInfinite}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all"
              >
                <RefreshCw size={15} />
                Nova Grade Infinita
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modal / Overlay de Seleção de Personagem para a Célula */}
      {selectedCell !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e1628] border border-[#22304d] rounded-3xl w-full max-w-md p-5 shadow-2xl animate-scale-in">
            {/* Cabeçalho do Modal com os dois critérios */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Palpite para a Célula ({Math.floor(selectedCell / 3) + 1}, {(selectedCell % 3) + 1})
                </span>
                <h3 className="text-white font-black text-sm sm:text-base mt-0.5">
                  Quem se encaixa em ambos?
                </h3>
              </div>
              <button
                onClick={() => setSelectedCell(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            {/* Destaque dos Dois Critérios Cruzados */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="p-2.5 rounded-xl bg-[#131c31] border border-[#202b43] text-center">
                <span className="text-[9px] uppercase font-bold text-slate-500 block">
                  Linha
                </span>
                <span className="text-xs font-black text-amber-400">
                  {gridDefinition.rows[Math.floor(selectedCell / 3)].label}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#131c31] border border-[#202b43] text-center">
                <span className="text-[9px] uppercase font-bold text-slate-500 block">
                  Coluna
                </span>
                <span className="text-xs font-black text-sky-400">
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

            {/* Campo de Busca Autocomplete */}
            <div className="relative mb-3">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Buscar personagem em ${animeTitle}...`}
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141e34] border border-[#22304d] text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Lista de Resultados */}
            <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((c) => {
                  const isUsed = usedCharacterIds.has(c.id);
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleSelectCharacter(c)}
                      disabled={isUsed}
                      className={`w-full flex items-center justify-between p-2 rounded-xl transition-all ${
                        isUsed
                          ? 'opacity-40 bg-black/20 cursor-not-allowed'
                          : 'bg-[#121b30] hover:bg-[#1a2644] text-white hover:border-slate-500 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-600"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <span className="text-xs font-bold text-left">{c.name}</span>
                      </div>
                      {isUsed && (
                        <span className="text-[9px] uppercase font-bold text-slate-500">
                          Já Usado
                        </span>
                      )}
                    </button>
                  );
                })
              ) : searchQuery.trim() ? (
                <div className="py-6 text-center text-slate-500 text-xs">
                  Nenhum personagem encontrado.
                </div>
              ) : (
                <div className="py-6 text-center text-slate-500 text-xs">
                  Digite o nome do personagem para selecionar...
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
