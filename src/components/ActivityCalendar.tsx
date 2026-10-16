import React, { useState, useMemo } from 'react';
import { getActivityDays } from '../data/achievements';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface ActivityCalendarProps {
  themeColor?: string;
}

export const ActivityCalendar: React.FC<ActivityCalendarProps> = ({ themeColor = '#ef4444' }) => {
  const activeDays = useMemo(() => new Set(getActivityDays()), []);
  const today = useMemo(() => new Date(), []);

  // Mês atualmente visualizado (ano e mês 0-indexado)
  const [viewDate, setViewDate] = useState<Date>(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  // Nome do mês formatado em português (ex: "Outubro 2026")
  const monthLabel = useMemo(() => {
    const raw = viewDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  }, [viewDate]);

  // Checa se está no mês atual para desabilitar o botão de avançar para o futuro
  const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const handlePrevMonth = () => {
    setViewDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const handleNextMonth = () => {
    if (!isCurrentMonth) {
      setViewDate(new Date(viewYear, viewMonth + 1, 1));
    }
  };

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  // Dias do mês selecionado com padding para o dia da semana correto
  const { monthDays, daysPlayedInMonth } = useMemo(() => {
    const firstDayWeekday = new Date(viewYear, viewMonth, 1).getDay(); // 0 = Dom, 6 = Sáb
    const totalDays = new Date(viewYear, viewMonth + 1, 0).getDate();

    const days: ({
      empty?: boolean;
      dayNum?: number;
      dateStr?: string;
      isToday?: boolean;
      isActive?: boolean;
      isFuture?: boolean;
    })[] = [];

    // Células vazias antes do dia 1
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push({ empty: true });
    }

    let playedCount = 0;
    const todayStr = today.toISOString().split('T')[0];

    for (let d = 1; d <= totalDays; d++) {
      const monthStr = String(viewMonth + 1).padStart(2, '0');
      const dayStr = String(d).padStart(2, '0');
      const dateStr = `${viewYear}-${monthStr}-${dayStr}`;

      const dateObj = new Date(viewYear, viewMonth, d);
      const isTodayDate = dateStr === todayStr;
      const isFutureDate = dateObj > today;
      const isActiveDate = activeDays.has(dateStr);

      if (isActiveDate) playedCount++;

      days.push({
        empty: false,
        dayNum: d,
        dateStr,
        isToday: isTodayDate,
        isActive: isActiveDate,
        isFuture: isFutureDate,
      });
    }

    return { monthDays: days, daysPlayedInMonth: playedCount };
  }, [viewYear, viewMonth, activeDays, today]);

  return (
    <div className="bg-[#111a2d] border border-[#202b43] rounded-2xl p-4 my-4 text-left shadow-lg">
      {/* Cabeçalho com navegação mês a mês */}
      <div className="flex items-center justify-between mb-3 border-b border-[#202b43]/70 pb-2.5">
        <div className="flex items-center gap-2">
          <Calendar size={15} style={{ color: themeColor }} />
          <span className="text-xs font-black text-white">{monthLabel}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-extrabold text-slate-400 bg-[#0d1426] px-2 py-0.5 rounded-full border border-[#202b43]">
            {daysPlayedInMonth} {daysPlayedInMonth === 1 ? 'dia ativo' : 'dias ativos'}
          </span>
          <div className="flex items-center gap-1 ml-1">
            <button
              onClick={handlePrevMonth}
              type="button"
              className="p-1 rounded-lg bg-[#0d1426] hover:bg-[#16223d] text-slate-400 hover:text-white border border-[#202b43] transition-all cursor-pointer active:scale-95"
              title="Mês anterior"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={handleNextMonth}
              disabled={isCurrentMonth}
              type="button"
              className={`p-1 rounded-lg border transition-all ${
                isCurrentMonth
                  ? 'bg-transparent border-transparent text-slate-700 cursor-not-allowed opacity-40'
                  : 'bg-[#0d1426] hover:bg-[#16223d] text-slate-400 hover:text-white border-[#202b43] cursor-pointer active:scale-95'
              }`}
              title={isCurrentMonth ? 'Mês atual' : 'Próximo mês'}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Dias da Semana (Dom, Seg, ...) */}
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {dayNames.map((d) => (
          <span key={d} className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
            {d}
          </span>
        ))}
      </div>

      {/* Grade de Dias do Mês */}
      <div className="grid grid-cols-7 gap-1">
        {monthDays.map((cell, idx) => {
          if (cell.empty) {
            return <div key={`empty-${idx}`} className="aspect-square opacity-0 pointer-events-none" />;
          }

          return (
            <div
              key={cell.dateStr}
              title={`${cell.dateStr}: ${cell.isActive ? 'Jogado ✓' : cell.isFuture ? 'Dia futuro' : 'Não jogado'}`}
              style={
                cell.isActive
                  ? {
                      backgroundColor: `${themeColor}33`,
                      borderColor: `${themeColor}99`,
                      boxShadow: `0 0 8px ${themeColor}33`,
                    }
                  : undefined
              }
              className={`aspect-square rounded-lg flex flex-col items-center justify-center p-1 border transition-all text-center relative ${
                cell.isActive
                  ? 'text-white font-black'
                  : cell.isFuture
                  ? 'bg-[#0b101e]/40 border-transparent text-slate-700'
                  : 'bg-[#0d1426] border-[#1e293b]/70 text-slate-500'
              } ${cell.isToday ? 'ring-2 ring-white/80' : ''}`}
            >
              <span className="text-xs font-bold leading-none">{cell.dayNum}</span>
              {cell.isActive && (
                <span className="w-1.5 h-1.5 rounded-full mt-1" style={{ backgroundColor: themeColor }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Legenda */}
      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#202b43]/60 text-[10px] text-slate-400">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded bg-[#0d1426] border border-[#1e293b] inline-block" /> Não jogado
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded border inline-block" style={{ backgroundColor: `${themeColor}60`, borderColor: themeColor }} /> Jogado
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded border-2 border-white/80 inline-block" /> Hoje
        </span>
      </div>
    </div>
  );
};

