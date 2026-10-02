import React, { useMemo } from 'react';
import { getActivityDays } from '../data/achievements';
import { Calendar, Flame, CheckCircle } from 'lucide-react';

interface ActivityCalendarProps {
  themeColor?: string;
}

export const ActivityCalendar: React.FC<ActivityCalendarProps> = ({ themeColor = '#ef4444' }) => {
  const activeDays = useMemo(() => new Set(getActivityDays()), []);

  // Gera os últimos 28 dias (4 semanas completas) até hoje
  const daysList = useMemo(() => {
    const list: { dateStr: string; dayNum: number; isToday: boolean; isActive: boolean; dayOfWeek: string }[] = [];
    const now = new Date();
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    for (let i = 27; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      list.push({
        dateStr,
        dayNum: d.getDate(),
        isToday: i === 0,
        isActive: activeDays.has(dateStr),
        dayOfWeek: dayNames[d.getDay()],
      });
    }
    return list;
  }, [activeDays]);

  const totalPlayedDays = activeDays.size;

  return (
    <div className="bg-[#111a2d] border border-[#202b43] rounded-2xl p-4 my-4 text-left">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <Calendar size={14} style={{ color: themeColor }} /> Frequência de Jogos (Últimos 28 Dias)
        </span>
        <span className="text-[11px] font-extrabold text-slate-400 bg-[#0d1426] px-2 py-0.5 rounded-full border border-[#202b43]">
          {totalPlayedDays} {totalPlayedDays === 1 ? 'dia ativo' : 'dias ativos'}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {daysList.map((day) => (
          <div
            key={day.dateStr}
            title={`${day.dateStr}: ${day.isActive ? 'Jogado ✓' : 'Não jogado'}`}
            style={
              day.isActive
                ? {
                    backgroundColor: `${themeColor}33`,
                    borderColor: `${themeColor}99`,
                    boxShadow: `0 0 10px ${themeColor}33`,
                  }
                : undefined
            }
            className={`aspect-square rounded-lg flex flex-col items-center justify-center p-1 border transition-all text-center relative ${
              day.isActive
                ? 'text-white font-black'
                : 'bg-[#0d1426] border-[#1e293b]/70 text-slate-500'
            } ${day.isToday ? 'ring-2 ring-white/60' : ''}`}
          >
            <span className="text-[9px] font-medium opacity-70 leading-none">{day.dayOfWeek}</span>
            <span className="text-xs font-bold mt-0.5 leading-none">{day.dayNum}</span>
            {day.isActive && (
              <span className="w-1.5 h-1.5 rounded-full mt-1" style={{ backgroundColor: themeColor }} />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#202b43]/60 text-[10px] text-slate-400">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-[#0d1426] border border-[#1e293b] inline-block" /> Não jogado
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded border inline-block" style={{ backgroundColor: `${themeColor}60`, borderColor: themeColor }} /> Jogado
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded border-2 border-white/70 inline-block" /> Hoje
        </span>
      </div>
    </div>
  );
};
