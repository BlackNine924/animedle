import React, { useState } from 'react';
import { X, Swords, Copy, Check, Share2, Trophy } from 'lucide-react';
import { createX1Challenge, ChallengeSession } from '../services/firebase';

interface X1ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  animeSlug: string;
  targetCharacterId: string;
  targetCharacterName: string;
  userGuessesCount: number;
  themeColor?: string;
}

export const X1ChallengeModal: React.FC<X1ChallengeModalProps> = ({
  isOpen,
  onClose,
  animeSlug,
  targetCharacterId,
  targetCharacterName,
  userGuessesCount,
  themeColor = '#9333EA'
}) => {
  const [creatorName, setCreatorName] = useState('');
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerateLink = async () => {
    setIsGenerating(true);
    try {
      const challengeId = await createX1Challenge(
        creatorName.trim() || 'Desafiante',
        animeSlug,
        targetCharacterId,
        userGuessesCount
      );
      const fullUrl = `${window.location.origin}${window.location.pathname}?challenge=${challengeId}`;
      setGeneratedLink(fullUrl);
    } catch (e) {
      console.error("Error generating X1 challenge:", e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#0d1426] border border-[#202b43] rounded-3xl shadow-2xl p-6 text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#202b43] pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl" style={{ backgroundColor: `${themeColor}25`, color: themeColor }}>
              <Swords size={22} />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">Desafio X1 entre Amigos</h2>
              <p className="text-xs text-slate-400">Quem adivinha em menos palpites?</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-[#111a2d] hover:bg-[#1b2744] border border-[#202b43] rounded-xl transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Card info */}
        <div className="bg-[#111a2d] border border-[#202b43] rounded-2xl p-4 mb-5 text-center">
          <div className="text-xs text-slate-400 mb-1">Seu Desempenho no Acerto:</div>
          <div className="text-xl font-black text-white mb-2">{targetCharacterName}</div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <Trophy size={14} />
            Acertou em {userGuessesCount} {userGuessesCount === 1 ? 'palpite' : 'palpites'}!
          </div>
        </div>

        {!generatedLink ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Seu Nick (opcional):</label>
              <input
                type="text"
                placeholder="Ex: HunterKing"
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
                maxLength={20}
                className="w-full bg-[#111a2d] border border-[#202b43] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-slate-500"
              />
            </div>

            <button
              onClick={handleGenerateLink}
              disabled={isGenerating}
              style={{ backgroundColor: themeColor }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-extrabold text-white transition-all shadow-lg hover:opacity-90 active:scale-95 disabled:opacity-50"
            >
              <Share2 size={16} />
              {isGenerating ? 'Criando Link...' : 'Gerar Link de Desafio X1'}
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-[#0b101d] border border-[#202b43] rounded-2xl p-3">
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Link do Desafio Gerado:</label>
              <div className="flex items-center gap-2 bg-[#111a2d] rounded-xl p-2 border border-[#202b43]">
                <input
                  type="text"
                  readOnly
                  value={generatedLink}
                  className="bg-transparent text-xs text-slate-200 flex-1 outline-none px-1 select-all"
                />
                <button
                  onClick={handleCopy}
                  style={{ backgroundColor: isCopied ? '#10b981' : themeColor }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all shadow-sm active:scale-95"
                >
                  {isCopied ? (
                    <>
                      <Check size={14} /> Copiado!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copiar
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              Envie este link no WhatsApp ou Discord. O seu amigo jogará para tentar adivinhar o **mesmo personagem** com menos palpites que você!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
