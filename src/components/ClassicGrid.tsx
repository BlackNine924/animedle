import React, { useState, useEffect } from 'react';
import { AttributeColumn, GuessResult, MatchStatus, ArrowDirection } from '../types/anime';
import { Check, X, Minus, ArrowUp, ArrowDown, HelpCircle } from 'lucide-react';
import { getCategoryDescription } from '../utils/categoryDescriptions';

interface ClassicGridProps {
  columns: AttributeColumn[];
  guesses: GuessResult[];
  animeSlug?: string;
}

export const ClassicGrid: React.FC<ClassicGridProps> = ({ columns, guesses, animeSlug }) => {
  const [activeCellExplanation, setActiveCellExplanation] = useState<{ rowIdx: number; colKey: string } | null>(null);

  // Fecha o popover ao clicar fora ou apertar Escape
  useEffect(() => {
    const handleClickOutside = () => setActiveCellExplanation(null);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCellExplanation(null);
    };
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (guesses.length === 0) {
    return (
      <div className="text-center py-14 px-4 border-2 border-dashed border-[#202b43] rounded-3xl max-w-3xl mx-auto my-8 bg-[#0d1426]/40 backdrop-blur-sm">
        <p className="font-extrabold text-[#F5F7FF] text-base">Faça o seu primeiro palpite acima!</p>
        <p className="text-xs mt-1 text-slate-400">Digite o nome de qualquer personagem para comparar seus atributos.</p>
      </div>
    );
  }

  const getStatusCardStyle = (status: MatchStatus) => {
    switch (status) {
      case 'correct':
        return 'bg-[#0d1426] border-emerald-500/80 text-white shadow-md shadow-emerald-950/30 relative overflow-visible before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-emerald-500 before:rounded-t-2xl';
      case 'partial':
        return 'bg-[#0d1426] border-amber-500/80 text-white shadow-md shadow-amber-950/30 relative overflow-visible before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-amber-500 before:rounded-t-2xl';
      case 'incorrect':
        return 'bg-[#0d1426]/90 border-rose-900/40 text-slate-300 relative overflow-visible before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-rose-900/40 before:rounded-t-2xl';
      default:
        return 'bg-[#0d1426] border-[#202b43] text-slate-300 relative overflow-visible';
    }
  };

  const getCellExplanationDetails = (
    col: AttributeColumn,
    status: MatchStatus,
    value: any,
    arrow?: ArrowDirection,
    animeSlug?: string
  ) => {
    const formattedVal = Array.isArray(value) ? value.join(', ') : String(value ?? '');

    if (arrow === 'up') {
      if (col.key === 'grade') {
        return {
          title: 'Grau Superior ⬆️',
          desc: `O personagem secreto possui uma graduação Jujutsu SUPERIOR a "${formattedVal}".`,
          type: 'arrow' as const
        };
      }
      if (col.key === 'bounty' || col.type === 'bounty') {
        const isBL = animeSlug === 'blue-lock' || col.label.includes('Oferta');
        return {
          title: isBL ? 'Oferta Maior ⬆️' : 'Recompensa Maior ⬆️',
          desc: isBL
            ? `O personagem secreto possui uma oferta na Liga Neo Egoísta (NEL) SUPERIOR a ${formattedVal}.`
            : `O personagem secreto possui uma recompensa SUPERIOR a ${formattedVal}.`,
          type: 'arrow' as const
        };
      }
      if (col.type === 'arc') {
        return {
          title: 'Estreou Depois ⬆️',
          desc: `O personagem secreto estreou em um arco MAIS RECENTE / POSTERIOR na cronologia em relação a "${formattedVal}".`,
          type: 'arrow' as const
        };
      }
    }

    if (arrow === 'down') {
      if (col.key === 'grade') {
        return {
          title: 'Grau Inferior ⬇️',
          desc: `O personagem secreto possui uma graduação Jujutsu INFERIOR a "${formattedVal}".`,
          type: 'arrow' as const
        };
      }
      if (col.key === 'bounty' || col.type === 'bounty') {
        const isBL = animeSlug === 'blue-lock' || col.label.includes('Oferta');
        return {
          title: isBL ? 'Oferta Menor ⬇️' : 'Recompensa Menor ⬇️',
          desc: isBL
            ? `O personagem secreto possui uma oferta na Liga Neo Egoísta (NEL) INFERIOR a ${formattedVal}.`
            : `O personagem secreto possui uma recompensa INFERIOR a ${formattedVal}.`,
          type: 'arrow' as const
        };
      }
      if (col.type === 'arc') {
        return {
          title: 'Estreou Antes ⬇️',
          desc: `O personagem secreto estreou em um arco ANTERIOR / MAIS ANTIGO na cronologia em relação a "${formattedVal}".`,
          type: 'arrow' as const
        };
      }
    }

    if (status === 'correct') {
      return {
        title: 'Correspondência Exata ✅',
        desc: `Correto! O personagem secreto possui exatamente "${formattedVal}" nesta categoria (${col.label}).`,
        type: 'correct' as const
      };
    }

    if (status === 'partial') {
      if (col.type === 'array' || col.key === 'affiliation') {
        return {
          title: 'Correspondência Parcial ⚠️',
          desc: `O personagem secreto compartilha ao menos uma equipe ou afiliação em comum com [${formattedVal}], mas a lista completa é diferente.`,
          type: 'partial' as const
        };
      }
      if (col.key === 'species') {
        return {
          title: 'Espécie Parcial ⚠️',
          desc: `O personagem secreto possui parentesco ou linhagem parcial com "${formattedVal}" (ex: mestiço ou mesma espécie base).`,
          type: 'partial' as const
        };
      }
      if (col.key === 'styleOrPower') {
        return {
          title: 'Poder Parcial ⚠️',
          desc: `O estilo de combate ou poder do personagem secreto compartilha raízes, respiração ou vertente semelhante a "${formattedVal}".`,
          type: 'partial' as const
        };
      }
      return {
        title: 'Correspondência Parcial ⚠️',
        desc: `Existe uma correspondência ou elemento em comum com "${formattedVal}".`,
        type: 'partial' as const
      };
    }

    return {
      title: 'Incorreto ❌',
      desc: `O personagem secreto NÃO possui "${formattedVal}" nesta categoria (${col.label}).`,
      type: 'incorrect' as const
    };
  };

  return (
    <div className="w-full my-6 overflow-x-auto custom-scrollbar pb-8">
      <table className="w-full border-separate border-spacing-2.5 min-w-[960px]">
        <thead>
          <tr>
            <th
              className="group relative p-2 text-xs font-black uppercase text-slate-400 tracking-wider text-left min-w-[190px] cursor-help select-none"
              title={getCategoryDescription('Personagem', animeSlug)}
            >
              <span className="inline-flex items-center gap-1.5 border-b border-dotted border-slate-600 group-hover:border-amber-400 group-hover:text-amber-300 transition-colors">
                <span>Personagem</span>
                <HelpCircle size={12} className="text-slate-500 group-hover:text-amber-400 transition-colors flex-shrink-0" />
              </span>
              <div className="pointer-events-none absolute top-full left-0 mt-2 w-64 p-3 bg-[#0a0f1d] border border-amber-500/50 text-slate-200 text-xs font-medium normal-case tracking-normal rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 text-left">
                <p className="font-extrabold text-amber-400 mb-0.5 text-xs">Personagem</p>
                <p className="leading-snug text-slate-300">{getCategoryDescription('Personagem', animeSlug)}</p>
                <div className="absolute bottom-full left-6 border-4 border-transparent border-b-amber-500/50" />
              </div>
            </th>
            {columns.map((col, colIdx) => {
              const explanation = getCategoryDescription(col.label, animeSlug);
              const isLast = colIdx >= columns.length - 2;
              return (
                <th
                  key={col.key}
                  className="group relative p-2 text-xs font-black uppercase text-slate-400 tracking-wider text-center min-w-[145px] cursor-help select-none"
                  title={`${col.label}: ${explanation}`}
                >
                  <span className="inline-flex items-center justify-center gap-1.5 border-b border-dotted border-slate-600 group-hover:border-amber-400 group-hover:text-amber-300 transition-colors">
                    <span>{col.label}</span>
                    <HelpCircle size={12} className="text-slate-500 group-hover:text-amber-400 transition-colors flex-shrink-0" />
                  </span>
                  <div className={`pointer-events-none absolute top-full mt-2 w-64 p-3 bg-[#0a0f1d] border border-amber-500/50 text-slate-200 text-xs font-medium normal-case tracking-normal rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 text-center ${
                    isLast ? 'right-0 left-auto translate-x-0' : 'left-1/2 -translate-x-1/2'
                  }`}>
                    <p className="font-extrabold text-amber-400 mb-0.5 text-xs">{col.label}</p>
                    <p className="leading-snug text-slate-300">{explanation}</p>
                    <div className={`absolute bottom-full border-4 border-transparent border-b-amber-500/50 ${
                      isLast ? 'right-8' : 'left-1/2 -translate-x-1/2'
                    }`} />
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {guesses.map((guess, guessIndex) => (
            <tr key={`${guess.character.id}-${guessIndex}`}>
              
              {/* Célula do Personagem com Avatar Moderno */}
              <td className="p-0">
                <div className="flex items-center gap-3 p-3 bg-[#0d1426] border border-[#202b43] rounded-2xl shadow-lg min-h-[96px] hover:border-slate-600 transition-colors">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#111a2d] overflow-hidden flex-shrink-0 border-2 border-[#202b43] shadow-md flex items-center justify-center">
                    <img
                      src={guess.character.avatar}
                      alt={guess.character.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs sm:text-sm font-extrabold text-[#F5F7FF] leading-snug block truncate">
                      {guess.character.name}
                    </span>
                  </div>
                </div>
              </td>

              {/* Células de Atributos Interativas com Pop-over (Opção A) */}
              {columns.map((col, colIdx) => {
                const cell = guess.matches[col.key];
                const status = cell?.status || 'incorrect';
                const value = cell?.value;
                const arrow = cell?.arrow;
                const displayVal = Array.isArray(value) ? value.join(', ') : value;
                const isLatest = guessIndex === 0;
                const isSelected = activeCellExplanation?.rowIdx === guessIndex && activeCellExplanation?.colKey === col.key;
                const isFirstRow = guessIndex === 0;
                const details = getCellExplanationDetails(col, status, value, arrow, animeSlug);

                return (
                  <td key={col.key} className="p-0 relative">
                    <div
                      style={{ animationDelay: isLatest ? `${colIdx * 120}ms` : '0ms' }}
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCellExplanation(isSelected ? null : { rowIdx: guessIndex, colKey: col.key });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveCellExplanation(isSelected ? null : { rowIdx: guessIndex, colKey: col.key });
                        }
                      }}
                      className={`min-h-[96px] p-3 border rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer select-none hover:ring-2 hover:ring-slate-400/50 hover:brightness-110 active:scale-[0.98] ${
                        isLatest ? 'animate-cardFlip' : ''
                      } ${getStatusCardStyle(status)} ${
                        isSelected ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-[#070b14]' : ''
                      }`}
                    >
                      {/* Seta direcional de arco, grau ou recompensa/oferta (⬆️ / ⬇️) */}
                      {arrow === 'up' && (
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-black mb-1">
                          <ArrowUp size={16} className="stroke-[3]" />
                          <span>
                            {col.key === 'grade'
                              ? 'Grau Maior'
                              : col.key === 'bounty' || col.type === 'bounty'
                              ? animeSlug === 'blue-lock' || col.label.includes('Oferta')
                                ? 'Maior Oferta'
                                : 'Maior Recompensa'
                              : 'Estreou Depois'}
                          </span>
                        </div>
                      )}
                      {arrow === 'down' && (
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-black mb-1">
                          <ArrowDown size={16} className="stroke-[3]" />
                          <span>
                            {col.key === 'grade'
                              ? 'Grau Menor'
                              : col.key === 'bounty' || col.type === 'bounty'
                              ? animeSlug === 'blue-lock' || col.label.includes('Oferta')
                                ? 'Menor Oferta'
                                : 'Menor Recompensa'
                              : 'Estreou Antes'}
                          </span>
                        </div>
                      )}

                      {/* Exibição com texto aumentado para melhor legibilidade */}
                      <span className="text-xs sm:text-[13px] font-extrabold leading-snug break-words max-w-full text-slate-100">
                        {displayVal}
                      </span>

                      {/* Ícones de Status Aumentados (size 17) */}
                      <span className="mt-2 flex items-center justify-center font-bold">
                        {status === 'correct' && (
                          <span className="text-emerald-400">
                            <Check size={17} className="stroke-[3]" />
                          </span>
                        )}
                        {status === 'partial' && (
                          <span className="text-amber-400">
                            <Minus size={17} className="stroke-[3]" />
                          </span>
                        )}
                        {status === 'incorrect' && !arrow && (
                          <span className="text-rose-500/75">
                            <X size={17} className="stroke-[3]" />
                          </span>
                        )}
                      </span>

                      {/* Pop-over Flutuante Contextual (Opção A) ao Clicar na Célula */}
                      {isSelected && (
                        <div
                          role="tooltip"
                          className={`absolute z-50 w-72 p-3.5 bg-[#0a0f1d] border rounded-2xl shadow-2xl shadow-black/90 backdrop-blur-md text-left pointer-events-auto transition-all duration-200 animate-fadeIn cursor-default ${
                            details.type === 'correct' ? 'border-emerald-500/70 shadow-emerald-950/40' :
                            details.type === 'partial' ? 'border-amber-500/70 shadow-amber-950/40' :
                            details.type === 'arrow' ? 'border-sky-500/70 shadow-sky-950/40' : 'border-rose-500/70 shadow-rose-950/40'
                          } ${
                            isFirstRow ? 'top-[calc(100%+8px)]' : 'bottom-[calc(100%+8px)]'
                          } ${
                            colIdx === 0 ? 'left-0' : colIdx >= columns.length - 2 ? 'right-0' : 'left-1/2 -translate-x-1/2'
                          }`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-700/60">
                            <span className={`text-[11px] font-black uppercase tracking-wider ${
                              details.type === 'correct' ? 'text-emerald-400' :
                              details.type === 'partial' ? 'text-amber-400' :
                              details.type === 'arrow' ? 'text-sky-400' : 'text-rose-400'
                            }`}>
                              {details.title}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveCellExplanation(null);
                              }}
                              className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                              title="Fechar"
                            >
                              <X size={12} />
                            </button>
                          </div>
                          <p className="text-xs leading-relaxed text-slate-200 font-medium">
                            {details.desc}
                          </p>
                          <div className="mt-2.5 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                            <span className="truncate">{col.label}: <strong className="text-slate-200">{displayVal}</strong></span>
                          </div>
                          {/* Seta visual do balão flutuante */}
                          <div
                            className={`absolute border-8 border-transparent ${
                              isFirstRow
                                ? 'bottom-full border-b-[#0a0f1d]'
                                : 'top-full border-t-[#0a0f1d]'
                            } ${
                              colIdx === 0 ? 'left-8' : colIdx >= columns.length - 2 ? 'right-8' : 'left-1/2 -translate-x-1/2'
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
