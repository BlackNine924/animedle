import React from 'react';
import { X, Check, Minus } from 'lucide-react';

interface HowToPlayModalProps {
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0d1426] border border-[#202b43] rounded-3xl max-w-lg w-full p-6 shadow-2xl relative text-left">
        <div className="flex items-center justify-between pb-4 border-b border-[#202b43]">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span>⚔️</span> Como Jogar o AnimeDLE
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#111a2d] border border-transparent hover:border-[#202b43] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="my-4 space-y-4 text-xs text-slate-300 leading-relaxed">
          <p>
            Adivinhe o <strong className="text-rose-400">Personagem Misterioso</strong> a cada dia. Cada palpite revelará pistas comparando os atributos do personagem palpitado com a resposta correta.
          </p>

          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-200 uppercase tracking-wider text-[10px]">Cores e Indicadores de Feedback</h4>
            
            <div className="flex items-center gap-3 p-3 bg-[#111a2d] border border-emerald-500/40 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 flex items-center justify-center flex-shrink-0 font-extrabold">
                <Check size={16} />
              </div>
              <div>
                <strong className="text-emerald-400 block text-xs font-bold">Verde (Correspondência Exata)</strong>
                <span className="text-[11px] text-slate-400">O atributo do palpite é exatamente igual ao do personagem secreto.</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[#111a2d] border border-amber-500/40 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/50 flex items-center justify-center flex-shrink-0 font-extrabold">
                <Minus size={16} />
              </div>
              <div>
                <strong className="text-amber-400 block text-xs font-bold">Amarelo (Correspondência Parcial / Setas)</strong>
                <span className="text-[11px] text-slate-400">Existe sobreposição parcial de afiliações ou uma indicação direcional de arco (Estreou Antes / Depois).</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[#111a2d] border border-rose-900/40 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center justify-center flex-shrink-0 font-extrabold">
                <X size={16} />
              </div>
              <div>
                <strong className="text-rose-400 block text-xs font-bold">Vermelho (Sem Correspondência)</strong>
                <span className="text-[11px] text-slate-400">O atributo é completamente diferente.</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#111a2d] rounded-xl border border-[#202b43] text-[11px] text-slate-300">
            💡 <strong>Dica:</strong> Cada modo de jogo (Clássico, Procurado, Citação, Habilidade) tem um personagem secreto único por dia!
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-xl text-xs transition-colors mt-2 shadow-lg shadow-rose-950/30"
        >
          Entendi, Vamos Jogar!
        </button>
      </div>
    </div>
  );
};
