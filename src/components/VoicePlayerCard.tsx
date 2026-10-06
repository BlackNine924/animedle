import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Play, Pause } from 'lucide-react';
import { VoiceChallenge } from '../types/anime';

interface VoicePlayerCardProps {
  challenge: VoiceChallenge;
  isWon: boolean;
  themeColor: string;
}

export const VoicePlayerCard: React.FC<VoicePlayerCardProps> = ({
  challenge,
  themeColor,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const currentTimeLabelRef = useRef<HTMLSpanElement | null>(null);
  const durationLabelRef = useRef<HTMLSpanElement | null>(null);

  // Volume e velocidade calibrados
  const effectiveVolume = challenge.volumeGain ?? 1.0;
  const effectiveSpeed = challenge.playbackSpeed ?? 1.0;

  useEffect(() => {
    // Reset quando o desafio muda
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (progressBarRef.current) {
      progressBarRef.current.style.width = '0%';
    }
    if (currentTimeLabelRef.current) {
      currentTimeLabelRef.current.textContent = '0:00';
    }
    if (durationLabelRef.current) {
      durationLabelRef.current.textContent = '0:00';
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.volume = Math.max(0.1, Math.min(1.0, effectiveVolume));
      audioRef.current.playbackRate = effectiveSpeed;
    }
  }, [challenge.id, effectiveVolume, effectiveSpeed]);

  // Atualização contínua a cada frame sem re-renderizar o React inteiro
  const updateProgressLoop = () => {
    if (audioRef.current && !audioRef.current.paused) {
      const cur = audioRef.current.currentTime;
      const dur = audioRef.current.duration;
      if (Number.isFinite(dur) && dur > 0) {
        const pct = Math.min(100, Math.max(0, (cur / dur) * 100));
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${pct}%`;
        }
        if (currentTimeLabelRef.current) {
          currentTimeLabelRef.current.textContent = formatTime(cur);
        }
      }
      animFrameRef.current = requestAnimationFrame(updateProgressLoop);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      animFrameRef.current = requestAnimationFrame(updateProgressLoop);
    } else if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = Math.max(0.1, Math.min(1.0, effectiveVolume));
      audioRef.current.playbackRate = effectiveSpeed;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn('Erro ao reproduzir áudio:', e);
      });
    }
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    const dur = audioRef.current.duration;
    if (Number.isFinite(dur) && dur > 0) {
      setDuration(dur);
      if (durationLabelRef.current) {
        durationLabelRef.current.textContent = formatTime(dur);
      }
    }
    audioRef.current.volume = Math.max(0.1, Math.min(1.0, effectiveVolume));
    audioRef.current.playbackRate = effectiveSpeed;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const cur = audioRef.current.currentTime;
      const dur = audioRef.current.duration;
      setCurrentTime(cur);
      if (Number.isFinite(dur) && dur > 0) {
        setDuration(dur);
        const pct = Math.min(100, Math.max(0, (cur / dur) * 100));
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${pct}%`;
        }
        if (durationLabelRef.current) {
          durationLabelRef.current.textContent = formatTime(dur);
        }
        if (currentTimeLabelRef.current) {
          currentTimeLabelRef.current.textContent = formatTime(cur);
        }
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      const dur = audioRef.current.duration || 0;
      setCurrentTime(dur);
      if (progressBarRef.current) {
        progressBarRef.current.style.width = '100%';
      }
      if (currentTimeLabelRef.current) {
        currentTimeLabelRef.current.textContent = formatTime(dur);
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const dur = audioRef.current.duration;
    if (!Number.isFinite(dur) || dur <= 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newRatio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = newRatio * dur;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${newRatio * 100}%`;
    }
    if (currentTimeLabelRef.current) {
      currentTimeLabelRef.current.textContent = formatTime(newTime);
    }
  };

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds <= 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const categoryLabels: Record<string, { label: string; color: string }> = {
    risada: { label: 'Risada Icônica', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
    ataque: { label: 'Grito de Ataque', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
    bordao: { label: 'Bordão Marcante', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' },
    fala: { label: 'Voz / Fala Clássica', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  };

  const badge = categoryLabels[challenge.category] || categoryLabels['fala'];
  const langLabel = challenge.language || 'Japonês (Original)';
  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  return (
    <div className="w-full max-w-xl mx-auto my-6 p-6 bg-[#0a1020]/90 backdrop-blur-md border border-[#202b43] rounded-3xl shadow-2xl relative overflow-hidden">
      {/* Elemento de Áudio invisível */}
      <audio
        ref={audioRef}
        src={challenge.audioUrl}
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      {/* Brilho decorativo no fundo */}
      <div
        className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: themeColor }}
      />

      {/* Cabeçalho do Card Centralizado */}
      <div className="flex flex-col items-center justify-center text-center mb-6 relative">
        <div className="flex items-center justify-center gap-2 mb-1">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-md shrink-0"
            style={{ backgroundColor: themeColor }}
          >
            <Volume2 size={18} />
          </div>
          <span className="text-sm uppercase font-black tracking-wider text-white">
            Modo Som & Voz
          </span>
        </div>
        <p className="text-xs text-slate-400 font-medium max-w-md mx-auto">
          Ouça a atuação vocal e adivinhe o dono da voz
        </p>

        {/* Badges de Categoria e Padrão de Idioma */}
        <div className="flex items-center justify-center gap-2 mt-2.5 flex-wrap">
          <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${badge.color}`}>
            {badge.label}
          </span>
          <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-300">
            {langLabel}
          </span>
        </div>
      </div>

      {/* Player Principal */}
      <div className="flex flex-col items-center justify-center py-2">
        {/* Botão de Play circular grande com efeito pulsante ao tocar */}
        <div className="relative mb-4">
          {isPlaying && (
            <div
              className="absolute inset-0 rounded-full animate-ping opacity-25"
              style={{ backgroundColor: themeColor }}
            />
          )}
          <button
            onClick={togglePlay}
            style={{ backgroundColor: themeColor }}
            className="w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-all relative z-10 hover:shadow-2xl hover:brightness-110"
            title={isPlaying ? 'Pausar áudio' : 'Ouvir a voz'}
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
          </button>
        </div>

        {/* Visualizador de Ondas Sonoras Dinâmicas */}
        <div className="flex items-center gap-1.5 h-8 my-2">
          {[40, 75, 100, 60, 90, 45, 80, 100, 70, 50, 85, 60, 40].map((h, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-150 ${
                isPlaying ? 'bg-amber-400' : 'bg-slate-700'
              }`}
              style={{
                height: isPlaying ? `${Math.max(20, (h * (progressPercent + 25)) % 100)}%` : '20%',
                opacity: isPlaying ? 0.9 : 0.4,
              }}
            />
          ))}
        </div>

        {/* Barra de Progresso Fluida, Interativa e Estilizada */}
        <div className="w-full mt-3 px-2">
          <div
            onClick={handleSeek}
            className="w-full bg-slate-800/90 hover:bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700/60 cursor-pointer relative shadow-inner group transition-all"
            title="Clique para avançar ou voltar"
          >
            <div
              ref={progressBarRef}
              className="h-full rounded-full relative shadow-[0_0_12px_rgba(255,255,255,0.3)] pointer-events-none"
              style={{ width: `${progressPercent}%`, backgroundColor: themeColor, willChange: 'width' }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1.5 font-mono px-0.5 select-none">
            <span ref={currentTimeLabelRef}>{formatTime(currentTime)}</span>
            <span ref={durationLabelRef}>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
