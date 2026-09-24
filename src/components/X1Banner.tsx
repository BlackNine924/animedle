import React from 'react';
import { Swords, X, Trophy } from 'lucide-react';
import { ChallengeSession } from '../services/firebase';

interface X1BannerProps {
  challenge: ChallengeSession;
  onClearChallenge: () => void;
  themeColor?: string;
}

export const X1Banner: React.FC<X1BannerProps> = ({ challenge, onClearChallenge, themeColor = '#9333EA' }) => {
  return (
    <div className="bg-[#111a2d] border-b border-[#202b43] px-4 py-2.5 shadow-md select-none animate-fadeIn">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3 text-xs">
        
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg text-white" style={{ backgroundColor: themeColor }}>
            <Swords size={16} />
          </div>
          <div>
            <span className="font-extrabold text-white">Desafio X1 Ativo: </span>
            <span className="text-slate-300">
              Você foi desafiado por <strong className="text-white">{challenge.creatorName}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
            <Trophy size={13} />
            Meta a vencer: {challenge.creatorGuessesCount} {challenge.creatorGuessesCount === 1 ? 'palpite' : 'palpites'}
          </span>

          <button
            onClick={onClearChallenge}
            className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white bg-[#0d1426] border border-[#202b43] px-2 py-1 rounded-lg transition-all"
            title="Sair do modo desafio X1"
          >
            <X size={14} />
            <span>Sair do X1</span>
          </button>
        </div>
      </div>
    </div>
  );
};
