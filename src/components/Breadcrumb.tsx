import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  animeTitle: string;
  onGoHome: () => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ animeTitle, onGoHome }) => {
  return (
    <div className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto pt-3.5 pb-1">
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 select-none">
        <button
          onClick={onGoHome}
          className="flex items-center gap-1.5 hover:text-white transition-colors py-1 px-1.5 rounded-md hover:bg-[#111a2d]"
        >
          <Home size={13} className="text-slate-400" />
          <span>Início</span>
        </button>

        <span className="text-slate-600">/</span>

        <span className="text-slate-200 font-semibold">{animeTitle}</span>
      </nav>
    </div>
  );
};
