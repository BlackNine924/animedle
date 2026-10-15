import React from 'react';
import { Heart, Skull, AlertCircle, CheckCircle2 } from 'lucide-react';

interface WantedAttemptsCounterProps {
  guessesCount: number;
  maxAttempts?: number;
  isWon?: boolean;
  isLost?: boolean;
  themeColor?: string;
}

export const WantedAttemptsCounter: React.FC<WantedAttemptsCounterProps> = ({
  guessesCount,
  maxAttempts = 5,
  isWon = false,
  isLost = false,
  themeColor = '#f59e0b',
}) => {
  const remaining = isWon
    ? maxAttempts - guessesCount
    : Math.max(0, maxAttempts - guessesCount);

  const getStatusColor = () => {
    if (isWon) return 'text-emerald-400 border-emerald-500/50 bg-emerald-950/20 shadow-emerald-950/30';
    if (isLost || remaining === 0) return 'text-rose-400 border-rose-500/50 bg-rose-950/20 shadow-rose-950/30';
    if (remaining === 1) return 'text-rose-400 border-rose-500/60 bg-rose-950/30 shadow-[0_0_15px_rgba(244,63,94,0.25)] animate-pulse';
    if (remaining === 2) return 'text-amber-400 border-amber-500/50 bg-amber-950/20 shadow-amber-950/20';
    return 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20 shadow-emerald-950/20';
  };

  return (
    <div className={`my-4 p-3.5 rounded-2xl border transition-all duration-300 ${getStatusColor()}`}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Informação textual de status */}
        <div className="flex items-center gap-2">
          {isWon ? (
            <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
          ) : isLost || remaining === 0 ? (
            <Skull size={18} className="text-rose-400 flex-shrink-0" />
          ) : remaining === 1 ? (
            <AlertCircle size={18} className="text-rose-400 flex-shrink-0 animate-bounce" />
          ) : (
            <Heart size={18} className="text-amber-400 flex-shrink-0 fill-amber-400/20" />
          )}

          <div className="text-left">
            <p className="text-xs font-black uppercase tracking-wider text-slate-200">
              {isWon ? (
                <span className="text-emerald-400">Capturado com sucesso!</span>
              ) : isLost || remaining === 0 ? (
                <span className="text-rose-400 font-extrabold">Tentativas Esgotadas!</span>
              ) : (
                <>
                  Tentativas restantes:{' '}
                  <span className={remaining === 1 ? 'text-rose-400 font-black' : remaining === 2 ? 'text-amber-300 font-black' : 'text-emerald-400 font-black'}>
                    {remaining} de {maxAttempts}
                  </span>
                  {remaining === 1 && (
                    <span className="ml-1.5 text-[10px] font-black uppercase text-rose-300 bg-rose-500/20 px-1.5 py-0.5 rounded-md border border-rose-500/40">
                      Última Chance!
                    </span>
                  )}
                </>
              )}
            </p>
            <p className="text-[11px] text-slate-400 font-medium">
              {isWon
                ? `Você desvendou o procurado em ${guessesCount} ${guessesCount === 1 ? 'palpite' : 'palpites'}!`
                : isLost || remaining === 0
                ? 'O procurado escapou das autoridades hoje.'
                : 'A cada erro a imagem ganha mais nitidez.'}
            </p>
          </div>
        </div>

        {/* Marcadores Visuais de Vidas (Cartazes / Corações) */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: maxAttempts }).map((_, index) => {
            const isUsed = index < guessesCount;
            const isCurrentActive = index === guessesCount && !isWon && !isLost;
            const isHeartAlive = !isUsed || (isWon && index === guessesCount - 1);

            return (
              <div
                key={index}
                className={`w-7 h-8 sm:w-8 sm:h-9 rounded-lg flex flex-col items-center justify-center border transition-all duration-300 ${
                  isWon && index === guessesCount - 1
                    ? 'bg-emerald-500/20 border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.5)] scale-110'
                    : isCurrentActive
                    ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.4)] scale-105'
                    : isHeartAlive
                    ? 'bg-[#131d35] border-[#223356] text-slate-300'
                    : 'bg-[#0a0f1d]/80 border-slate-800 text-slate-600 opacity-40 line-through'
                }`}
                title={`Tentativa ${index + 1} de ${maxAttempts}`}
              >
                {isUsed && !isWon ? (
                  <span className="text-[11px] font-black text-rose-500/70">✕</span>
                ) : isWon && index === guessesCount - 1 ? (
                  <CheckCircle2 size={13} className="text-emerald-400" />
                ) : (
                  <Heart
                    size={13}
                    className={
                      isCurrentActive
                        ? 'text-amber-400 fill-amber-400'
                        : isHeartAlive
                        ? 'text-slate-300 fill-slate-300/40'
                        : 'text-slate-600'
                    }
                  />
                )}
                <span className="text-[8px] font-black text-slate-400/80 mt-0.5">
                  #{index + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
