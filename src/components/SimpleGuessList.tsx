import React from 'react';
import { Character, GuessResult } from '../types/anime';
import { Check, X } from 'lucide-react';

interface SimpleGuessListProps {
  guesses: GuessResult[];
  targetCharacter: Character;
}

export const SimpleGuessList: React.FC<SimpleGuessListProps> = ({ guesses, targetCharacter }) => {
  if (guesses.length === 0) {
    return (
      <div className="text-center py-10 text-slate-400 text-xs border border-dashed border-[#202b43] rounded-2xl max-w-lg mx-auto my-6 bg-[#0d1426]/40">
        Seus palpites neste modo aparecerão aqui!
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto my-6 space-y-2.5">
      {guesses.map((guess, index) => {
        const isCorrect = guess.character.id === targetCharacter.id;

        return (
          <div
            key={`${guess.character.id}-${index}`}
            className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-300 shadow-md animate-fadeIn ${
              isCorrect
                ? 'bg-[#0d1426] border-emerald-500/80 text-white shadow-emerald-950/20'
                : 'bg-[#0d1426] border-rose-900/40 text-slate-200'
            }`}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#111a2d] border-2 border-[#202b43] flex-shrink-0 shadow-sm">
                <img
                  src={guess.character.avatar}
                  alt={guess.character.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-extrabold text-sm text-left truncate text-[#F5F7FF]">
                {guess.character.name}
              </span>
            </div>

            <div className="flex-shrink-0 ml-3">
              {isCorrect ? (
                <div className="w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/50 flex items-center justify-center">
                  <Check size={16} className="stroke-[3]" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center justify-center">
                  <X size={16} className="stroke-[3]" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
