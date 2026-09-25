import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AttributeColumn, GuessResult, MatchStatus, ArrowDirection } from '../types/anime';
import { Check, X, Minus, ArrowUp, ArrowDown, HelpCircle } from 'lucide-react';
import { getCategoryDescription } from '../utils/categoryDescriptions';

interface ClassicGridProps {
  columns: AttributeColumn[];
  guesses: GuessResult[];
  animeSlug?: string;
}

interface ActiveCellExplanationState {
  rowIdx: number;
  colKey: string;
  rect: DOMRect;
  col: AttributeColumn;
  status: MatchStatus;
  value: any;
  arrow?: ArrowDirection;
}

export const ClassicGrid: React.FC<ClassicGridProps> = ({ columns, guesses, animeSlug }) => {
  const [activeCellExplanation, setActiveCellExplanation] = useState<ActiveCellExplanationState | null>(null);

  // Fecha o popover ao clicar fora, ao rolar a página ou tabela, ou ao apertar Escape
  useEffect(() => {
    if (!activeCellExplanation) return;

    const handleClickOutside = () => setActiveCellExplanation(null);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCellExplanation(null);
    };
    const handleScrollOrResize = () => {
      setActiveCellExplanation(null);
    };

    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [activeCellExplanation]);

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
        return 'bg-[#0d1426] border-emerald-500/80 text-white shadow-md shadow-emerald-950/30 relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-emerald-500';
      case 'partial':
        return 'bg-[#0d1426] border-amber-500/80 text-white shadow-md shadow-amber-950/30 relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-amber-500';
      case 'incorrect':
        return 'bg-[#0d1426]/90 border-rose-900/40 text-slate-300 relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-rose-900/40';
      default:
        return 'bg-[#0d1426] border-[#202b43] text-slate-300';
    }
  };

  const getCellExplanationDetails = (
    col: AttributeColumn,
    status: MatchStatus,
    value: any,
    arrow?: ArrowDirection,
    animeSlugParam?: string
  ) => {
    const formattedVal = Array.isArray(value) ? value.join(', ') : String(value ?? '');

    // 1. Setas direcionais (Arco, Grau ou Oferta/Recompensa)
    if (arrow === 'up') {
      if (col.key === 'grade') {
        return {
          title: 'Grau Superior ⬆️',
          desc: `O personagem secreto possui uma graduação Jujutsu superior a "${formattedVal}".`,
          type: 'arrow' as const
        };
      }
      if (col.key === 'bounty' || col.type === 'bounty') {
        const isBL = animeSlugParam === 'blue-lock' || col.label.includes('Oferta');
        return {
          title: isBL ? 'Oferta Maior ⬆️' : 'Recompensa Maior ⬆️',
          desc: isBL
            ? `O personagem secreto tem uma oferta na Liga Neo Egoísta (NEL) maior do que ${formattedVal}.`
            : `O personagem secreto possui uma recompensa maior do que ${formattedVal}.`,
          type: 'arrow' as const
        };
      }
      if (col.type === 'arc') {
        return {
          title: 'Estreou Depois ⬆️',
          desc: `O personagem secreto estreou mais tarde na história (em um arco posterior a "${formattedVal}").`,
          type: 'arrow' as const
        };
      }
    }

    if (arrow === 'down') {
      if (col.key === 'grade') {
        return {
          title: 'Grau Inferior ⬇️',
          desc: `O personagem secreto possui uma graduação Jujutsu inferior a "${formattedVal}".`,
          type: 'arrow' as const
        };
      }
      if (col.key === 'bounty' || col.type === 'bounty') {
        const isBL = animeSlugParam === 'blue-lock' || col.label.includes('Oferta');
        return {
          title: isBL ? 'Oferta Menor ⬇️' : 'Recompensa Menor ⬇️',
          desc: isBL
            ? `O personagem secreto tem uma oferta na Liga Neo Egoísta (NEL) menor do que ${formattedVal}.`
            : `O personagem secreto possui uma recompensa menor do que ${formattedVal}.`,
          type: 'arrow' as const
        };
      }
      if (col.type === 'arc') {
        return {
          title: 'Estreou Antes ⬇️',
          desc: `O personagem secreto estreou mais cedo na história (em um arco anterior a "${formattedVal}").`,
          type: 'arrow' as const
        };
      }
    }

    // 2. Correspondência Exata
    if (status === 'correct') {
      let desc = `Correto! O personagem secreto tem exatamente "${formattedVal}" em ${col.label}.`;

      if (col.key === 'gender') {
        desc = `Correto! O personagem secreto é do gênero ${formattedVal}.`;
      } else if (col.key === 'species') {
        desc = `Correto! O personagem secreto pertence à espécie ${formattedVal}.`;
      } else if (col.key === 'country') {
        desc = `Correto! O personagem secreto tem nacionalidade ${formattedVal}.`;
      } else if (col.key === 'position') {
        desc = `Correto! O personagem secreto joga/atua na função de ${formattedVal}.`;
      } else if (col.key === 'affiliation' || col.type === 'array') {
        desc = `Correto! O personagem secreto faz parte exatamente de: ${formattedVal}.`;
      } else if (col.key === 'styleOrPower') {
        if (animeSlugParam === 'demon-slayer') {
          desc = `Correto! O personagem secreto domina e utiliza: ${formattedVal}.`;
        } else if (animeSlugParam === 'blue-lock') {
          desc = `Correto! A arma principal do personagem secreto é: ${formattedVal}.`;
        } else if (animeSlugParam === 'jujutsu-kaisen') {
          desc = `Correto! A técnica do personagem secreto é: ${formattedVal}.`;
        } else {
          desc = `Correto! O estilo ou poder do personagem secreto é: ${formattedVal}.`;
        }
      } else if (col.type === 'arc') {
        desc = `Correto! O personagem secreto estreou exatamente no arco "${formattedVal}".`;
      } else if (col.key === 'status') {
        desc = `Correto! O status atual do personagem secreto é: ${formattedVal}.`;
      }

      return {
        title: 'Correto ✅',
        desc,
        type: 'correct' as const
      };
    }

    // 3. Correspondência Parcial
    if (status === 'partial') {
      let desc = `Existe uma semelhança ou correspondência parcial com "${formattedVal}".`;

      if (col.type === 'array' || col.key === 'affiliation') {
        desc = `O personagem secreto compartilha ao menos uma afiliação ou equipe com "${formattedVal}", mas o conjunto completo é diferente.`;
      } else if (col.key === 'species') {
        desc = `O personagem secreto tem ligação genética ou espécie parcial em comum com "${formattedVal}" (ex: mestiço ou linhagem mista).`;
      } else if (col.key === 'styleOrPower') {
        if (animeSlugParam === 'demon-slayer') {
          desc = `O estilo de combate ou respiração compartilha a mesma origem ou vertente de "${formattedVal}".`;
        } else if (animeSlugParam === 'blue-lock') {
          desc = `O personagem secreto possui fundamentos táticos ou características similares a "${formattedVal}".`;
        } else {
          desc = `O poder ou estilo compartilha a mesma linhagem ou categoria de "${formattedVal}".`;
        }
      }

      return {
        title: 'Parcial ⚠️',
        desc,
        type: 'partial' as const
      };
    }

    // 4. Incorreto
    let incorrectDesc = `O personagem secreto não possui "${formattedVal}" em ${col.label}.`;

    if (col.key === 'gender') {
      incorrectDesc = `O personagem secreto não é do gênero ${formattedVal}.`;
    } else if (col.key === 'species') {
      incorrectDesc = `O personagem secreto não é da espécie "${formattedVal}".`;
    } else if (col.key === 'country') {
      incorrectDesc = `O personagem secreto não tem nacionalidade "${formattedVal}".`;
    } else if (col.key === 'position') {
      incorrectDesc = `O personagem secreto não joga como "${formattedVal}".`;
    } else if (col.key === 'affiliation' || col.type === 'array') {
      incorrectDesc = `O personagem secreto não faz parte de "${formattedVal}" nem possui ligação com essa organização.`;
    } else if (col.key === 'styleOrPower') {
      if (animeSlugParam === 'demon-slayer') {
        incorrectDesc = `O personagem secreto não utiliza a arte ou respiração "${formattedVal}".`;
      } else if (animeSlugParam === 'blue-lock') {
        incorrectDesc = `A arma principal do personagem secreto não é "${formattedVal}".`;
      } else if (animeSlugParam === 'jujutsu-kaisen') {
        incorrectDesc = `O personagem secreto não domina a técnica "${formattedVal}".`;
      } else {
        incorrectDesc = `O personagem secreto não utiliza nem domina "${formattedVal}".`;
      }
    } else if (col.type === 'arc') {
      incorrectDesc = `O personagem secreto não estreou no arco "${formattedVal}".`;
    } else if (col.key === 'status') {
      incorrectDesc = `O status do personagem secreto não é "${formattedVal}".`;
    }

    return {
      title: 'Incorreto ❌',
      desc: incorrectDesc,
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

              {/* Células de Atributos Interativas com Pop-over via Portal */}
              {columns.map((col, colIdx) => {
                const cell = guess.matches[col.key];
                const status = cell?.status || 'incorrect';
                const value = cell?.value;
                const arrow = cell?.arrow;
                const displayVal = Array.isArray(value) ? value.join(', ') : value;
                const isLatest = guessIndex === 0;
                const isSelected = activeCellExplanation?.rowIdx === guessIndex && activeCellExplanation?.colKey === col.key;

                return (
                  <td key={col.key} className="p-0">
                    <div
                      style={{ animationDelay: isLatest ? `${colIdx * 120}ms` : '0ms' }}
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isSelected) {
                          setActiveCellExplanation(null);
                        } else {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setActiveCellExplanation({
                            rowIdx: guessIndex,
                            colKey: col.key,
                            rect,
                            col,
                            status,
                            value,
                            arrow,
                          });
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          e.stopPropagation();
                          if (isSelected) {
                            setActiveCellExplanation(null);
                          } else {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setActiveCellExplanation({
                              rowIdx: guessIndex,
                              colKey: col.key,
                              rect,
                              col,
                              status,
                              value,
                              arrow,
                            });
                          }
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
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Portal para o Balão Flutuante no document.body:
          - Passa por cima de qualquer barra de overflow / scroll da tabela
          - Fica sempre no topo absoluto do z-index (à frente de todas as células)
          - Fica sempre ACIMA da célula sem precisar ir para baixo na tabela
          - Fecha ao clicar nele próprio, clicar fora dele ou clicar na célula novamente
      */}
      {typeof document !== 'undefined' && activeCellExplanation && createPortal(
        (() => {
          const { rect, col, status, value, arrow } = activeCellExplanation;
          const displayVal = Array.isArray(value) ? value.join(', ') : value;
          const details = getCellExplanationDetails(col, status, value, arrow, animeSlug);
          const popoverWidth = 288;
          const centerX = rect.left + rect.width / 2;
          let left = centerX - popoverWidth / 2;
          left = Math.max(12, Math.min(window.innerWidth - popoverWidth - 12, left));

          // Posicionamento: sempre acima da célula (transform translateY -100%)
          // Caso a célula esteja muito colada no topo do navegador (rect.top < 130), posiciona abaixo
          const fitsAbove = rect.top >= 130;
          const top = fitsAbove ? rect.top - 12 : rect.bottom + 12;
          const arrowLeft = Math.max(20, Math.min(popoverWidth - 20, centerX - left));

          return (
            <div
              role="tooltip"
              style={{
                top: `${top}px`,
                left: `${left}px`,
                transform: fitsAbove ? 'translateY(-100%)' : 'none',
              }}
              className={`fixed z-[99999] w-72 p-4 bg-[#0a0f1d] border rounded-2xl shadow-2xl shadow-black/95 backdrop-blur-xl text-left transition-all duration-150 animate-fadeIn cursor-pointer select-none ${
                details.type === 'correct' ? 'border-emerald-500/80 shadow-emerald-950/60' :
                details.type === 'partial' ? 'border-amber-500/80 shadow-amber-950/60' :
                details.type === 'arrow' ? 'border-sky-500/80 shadow-sky-950/60' : 'border-rose-500/80 shadow-rose-950/60'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveCellExplanation(null);
              }}
            >
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-700/60">
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`text-xs font-black uppercase tracking-wider ${
                    details.type === 'correct' ? 'text-emerald-400' :
                    details.type === 'partial' ? 'text-amber-400' :
                    details.type === 'arrow' ? 'text-sky-400' : 'text-rose-400'
                  }`}>
                    {details.title}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md truncate max-w-[120px]">
                    {col.label}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCellExplanation(null);
                  }}
                  className="w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Fechar"
                >
                  <X size={12} />
                </button>
              </div>
              <p className="text-xs leading-relaxed text-slate-200 font-medium">
                {details.desc}
              </p>
              <div className="mt-2.5 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate mr-2">Palpite: <strong className="text-slate-200">{displayVal}</strong></span>
                <span className="text-[10px] text-slate-500 whitespace-nowrap">Clique p/ fechar</span>
              </div>
              {/* Seta visual indicadora apontando diretamente para o centro da célula */}
              <div
                style={{ left: `${arrowLeft}px` }}
                className={`absolute -translate-x-1/2 border-8 border-transparent pointer-events-none ${
                  fitsAbove
                    ? 'top-full border-t-[#0a0f1d]'
                    : 'bottom-full border-b-[#0a0f1d]'
                }`}
              />
            </div>
          );
        })(),
        document.body
      )}
    </div>
  );
};
