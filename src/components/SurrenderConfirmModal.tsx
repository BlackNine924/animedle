import React from 'react';
import { Flag } from 'lucide-react';

interface SurrenderConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  modeName: string;
}

export const SurrenderConfirmModal: React.FC<SurrenderConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  modeName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0d1426] border border-[#202b43] rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl animate-scale-in">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 text-amber-400">
          <Flag size={28} />
        </div>
        <h3 className="text-lg font-black text-white mb-2">Desistir do {modeName}?</h3>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          Tem certeza de que deseja desistir? A resposta correta será revelada e a partida será encerrada.
        </p>
        <div className="flex gap-2.5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
          >
            Voltar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors shadow-lg shadow-rose-900/30"
          >
            Sim, Desistir
          </button>
        </div>
      </div>
    </div>
  );
};
