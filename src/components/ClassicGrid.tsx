import React from 'react';
import { AttributeColumn, GuessResult, MatchStatus } from '../types/anime';
import { Check, X, Minus, ArrowUp, ArrowDown } from 'lucide-react';

interface ClassicGridProps {
  columns: AttributeColumn[];
  guesses: GuessResult[];
}

export const ClassicGrid: React.FC<ClassicGridProps> = ({ columns, guesses }) => {
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

  return (
    <div className="w-full my-6 overflow-x-auto custom-scrollbar pb-4">
      <table className="w-full border-separate border-spacing-2.5 min-w-[960px]">
        <thead>
          <tr>
            <th className="p-2 text-xs font-black uppercase text-slate-400 tracking-wider text-left min-w-[190px]">
              Personagem
            </th>
            {columns.map((col) => (
              <th
                key={col.key}
                className="p-2 text-xs font-black uppercase text-slate-400 tracking-wider text-center min-w-[145px]"
              >
                {col.label}
              </th>
            ))}
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

              {/* Células de Atributos com Texto e Ícones Aumentados */}
              {columns.map((col, colIdx) => {
                const cell = guess.matches[col.key];
                const status = cell?.status || 'incorrect';
                const value = cell?.value;
                const arrow = cell?.arrow;
                const displayVal = Array.isArray(value) ? value.join(', ') : value;
                const isLatest = guessIndex === 0;

                return (
                  <td key={col.key} className="p-0">
                    <div
                      style={{ animationDelay: isLatest ? `${colIdx * 120}ms` : '0ms' }}
                      className={`min-h-[96px] p-3 border rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 ${
                        isLatest ? 'animate-cardFlip' : ''
                      } ${getStatusCardStyle(status)}`}
                    >
                      {/* Seta direcional de arco, grau ou recompensa (⬆️ / ⬇️) */}
                      {arrow === 'up' && (
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-black mb-1">
                          <ArrowUp size={16} className="stroke-[3]" />
                          <span>{col.key === 'grade' ? 'Grau Maior' : col.key === 'bounty' ? 'Maior Recompensa' : 'Estreou Depois'}</span>
                        </div>
                      )}
                      {arrow === 'down' && (
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-black mb-1">
                          <ArrowDown size={16} className="stroke-[3]" />
                          <span>{col.key === 'grade' ? 'Grau Menor' : col.key === 'bounty' ? 'Menor Recompensa' : 'Estreou Antes'}</span>
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
    </div>
  );
};
