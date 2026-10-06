import React from 'react';

interface ModeHeaderCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  themeColor: string;
  isEndless: boolean;
  onToggleEndless: (val: boolean) => void;
}

export const ModeHeaderCard: React.FC<ModeHeaderCardProps> = ({
  title,
  description,
  icon,
  themeColor,
  isEndless,
  onToggleEndless,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0d1426] border border-[#202b43] rounded-2xl p-4 mb-5 shadow-lg max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md shrink-0"
          style={{ backgroundColor: `${themeColor}25`, color: themeColor }}
        >
          {icon}
        </div>
        <div className="text-left">
          <h2 className="text-white font-extrabold text-base flex items-center gap-2">
            {title}
          </h2>
          <p className="text-slate-400 text-xs">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggleEndless(false)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            !isEndless
              ? 'bg-white/10 text-white border border-white/20 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Diário
        </button>
        <button
          onClick={() => onToggleEndless(true)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            isEndless
              ? 'bg-white/10 text-white border border-white/20 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Infinito
        </button>
      </div>
    </div>
  );
};
