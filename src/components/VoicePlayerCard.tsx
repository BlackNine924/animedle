import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import { Character, VoiceChallenge } from '../types/anime';

interface VoicePlayerCardProps {
  challenge: VoiceChallenge;
  isWon: boolean;
  themeColor: string;
}

export const VoicePlayerCard: React.FC<VoicePlayerCardProps> = ({
  challenge,
  isWon,
  themeColor,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Reset quando o desafio muda
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [challenge.id]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn('Erro ao reproduzir áudio:', e);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 1;
    setCurrentTime(cur);
    setProgress((cur / dur) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration || 0);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(100);
  };

  const handleReplay = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
    });
  };

  const formatTime = (seconds: number) => {
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

  return (
    <div className="w-full max-w-xl mx-auto my-6 p-6 bg-[#0a1020]/90 backdrop-blur-md border border-[#202b43] rounded-3xl shadow-2xl relative overflow-hidden">
      {/* Audio Element invisível */}
      <audio
        ref={audioRef}
        src={challenge.audioUrl}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Brilho decorativo no fundo */}
      <div
        className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: themeColor }}
      />

      {/* Cabeçalho do Card */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-md"
            style={{ backgroundColor: themeColor }}
          >
            <Volume2 size={18} />
          </div>
          <div>
            <span className="text-xs uppercase font-black tracking-wider text-slate-300 block">
              Modo Som & Voz
            </span>
            <span className="text-[11px] text-slate-400">
              Ouça a atuação vocal e adivinhe o dono da voz
            </span>
          </div>
        </div>

        <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${badge.color}`}>
          {badge.label}
        </span>
      </div>

      {/* Player Principal */}
      <div className="flex flex-col items-center justify-center py-4">
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

        {/* Visualizador de Ondas Sonoras Dinâmicas (CSS bars) */}
        <div className="flex items-center gap-1.5 h-8 my-2">
          {[40, 75, 100, 60, 90, 45, 80, 100, 70, 50, 85, 60, 40].map((h, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-200 ${
                isPlaying ? 'bg-amber-400' : 'bg-slate-700'
              }`}
              style={{
                height: isPlaying ? `${Math.max(15, (h * (progress + 20)) % 100)}%` : '20%',
                opacity: isPlaying ? 0.9 : 0.4,
              }}
            />
          ))}
        </div>

        {/* Barra de Progresso do Áudio */}
        <div className="w-full mt-3">
          <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden border border-slate-700/50">
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{ width: `${progress}%`, backgroundColor: themeColor }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1.5 px-0.5">
            <span>{formatTime(currentTime)}</span>
            <button
              onClick={handleReplay}
              className="hover:text-white flex items-center gap-1 transition-colors"
              title="Reiniciar áudio"
            >
              <RotateCcw size={11} /> Reiniciar
            </button>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Transcrição revelada ao vencer */}
      {isWon && challenge.subtitle && (
        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-center animate-fadeIn">
          <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block mb-0.5">
            Transcrição da Fala
          </span>
          <p className="text-sm font-black text-amber-200 italic">
            "{challenge.subtitle}"
          </p>
        </div>
      )}
    </div>
  );
};
