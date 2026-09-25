import React from 'react';
import { X, BookOpen, ShieldCheck, CheckCircle2, Calendar, Building2 } from 'lucide-react';
import { AnimeConfig } from '../types/anime';

interface MangaCoverageModalProps {
  animeConfig: AnimeConfig;
  onClose: () => void;
}

export const MangaCoverageModal: React.FC<MangaCoverageModalProps> = ({ animeConfig, onClose }) => {
  const coverage = animeConfig.mangaCoverage;
  if (!coverage) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#0d1426] border border-[#202b43] rounded-3xl max-w-lg w-full p-6 shadow-2xl relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header do Modal */}
        <div className="flex items-center justify-between pb-4 border-b border-[#202b43]">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center border shadow-sm"
              style={{
                backgroundColor: `${animeConfig.themeColor}20`,
                borderColor: `${animeConfig.themeColor}40`,
                color: animeConfig.themeColor
              }}
            >
              <BookOpen size={18} />
            </div>
            <div>
              <h2 className="text-lg font-black text-white leading-tight">
                Cobertura do Mangá & Canonicidade
              </h2>
              <span className="text-xs text-slate-400 font-medium">
                {animeConfig.title}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#111a2d] border border-transparent hover:border-[#202b43] transition-colors"
            title="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="my-5 space-y-4">
          
          {/* Status e Capítulo */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-[#111a2d] border border-[#202b43] rounded-2xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Capítulo Canônico
              </span>
              <span className="text-lg font-black text-white flex items-center gap-1.5">
                <span>Cap. {coverage.chapter}</span>
              </span>
            </div>

            <div className="p-3.5 bg-[#111a2d] border border-[#202b43] rounded-2xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Status da Publicação
              </span>
              <span className={`inline-flex items-center gap-1.5 text-xs font-black px-2.5 py-1 rounded-full ${
                coverage.status === 'Finalizado' 
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
              }`}>
                <CheckCircle2 size={12} />
                <span>{coverage.status}</span>
              </span>
            </div>
          </div>

          {/* Fonte Oficial e Editora */}
          <div className="p-3.5 bg-[#111a2d] border border-[#202b43] rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-slate-400 font-medium">
                <Building2 size={14} className="text-amber-400" />
                <span>Veículo / Editora Oficial:</span>
              </span>
              <strong className="text-slate-200 font-bold">{coverage.source}</strong>
            </div>

            <div className="flex items-center justify-between text-xs pt-1.5 border-t border-[#202b43]/60">
              <span className="flex items-center gap-1.5 text-slate-400 font-medium">
                <Calendar size={14} className="text-amber-400" />
                <span>Última Auditoria Canônica:</span>
              </span>
              <strong className="text-slate-200 font-bold">{coverage.lastUpdated}</strong>
            </div>
          </div>

          {/* Notas de Cobertura */}
          <div className="p-3.5 bg-[#111a2d] border border-[#202b43] rounded-2xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Escopo e Conteúdo Incluído
            </span>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {coverage.notes}
            </p>
          </div>

          {/* Garantia de Canonicidade Oficial */}
          <div className="flex items-start gap-3 p-3.5 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl">
            <ShieldCheck size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="text-[11px] text-emerald-200/90 leading-relaxed font-medium">
              <strong className="text-emerald-300 block font-bold mb-0.5">
                Garantia de Canonicidade 100% Oficial
              </strong>
              Todos os dados, armas, poderes, afiliações e desfechos são extraídos estritamente das publicações canônicas originais da editora responsável, sem mistura de universos ou conteúdos de preenchimento (fillers).
            </div>
          </div>
        </div>

        {/* Botão de Fechar */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all shadow-md active:scale-95"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
