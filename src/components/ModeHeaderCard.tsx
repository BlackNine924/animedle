import React, { useState } from 'react';
import { Heart, Flame, Trophy, Swords, Check, X, Timer } from 'lucide-react';
import { SurvivalState, FriendChallengeData } from '../utils/featuresManager';

interface ModeHeaderCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  themeColor: string;
  isEndless: boolean;
  onToggleEndless: (val: boolean) => void;
  onNextEndless?: () => void;
  // E2: Modo Sobrevivência
  survivalState?: SurvivalState;
  onToggleSurvival?: (active: boolean) => void;
  healedBanner?: boolean;
  // N5: Sub-modo Speedrun (60s)
  isSpeedrun?: boolean;
  onToggleSpeedrun?: (active: boolean) => void;
  // F2: Desafiar um Amigo
  onChallengeFriend?: () => string | void;
  activeChallenge?: FriendChallengeData | null;
  onClearChallenge?: () => void;
}

export const ModeHeaderCard: React.FC<ModeHeaderCardProps> = ({
  title,
  description,
  icon,
  themeColor,
  isEndless,
  onToggleEndless,
  survivalState,
  onToggleSurvival,
  healedBanner,
  isSpeedrun = false,
  onToggleSpeedrun,
  onChallengeFriend,
  activeChallenge,
  onClearChallenge,
}) => {
  const [copiedChallenge, setCopiedChallenge] = useState(false);
  const isSurvival = Boolean(!isSpeedrun && isEndless && survivalState?.active);

  const handleCopyChallenge = () => {
    if (!onChallengeFriend) return;
    onChallengeFriend();
    setCopiedChallenge(true);
    setTimeout(() => setCopiedChallenge(false), 2500);
  };

  return (
    <div className="max-w-2xl mx-auto mb-5 space-y-2.5">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0d1426] border border-[#202b43] rounded-2xl p-4 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md shrink-0 mx-auto sm:mx-0"
            style={{ backgroundColor: `${themeColor}25`, color: themeColor }}
          >
            {icon}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-white font-extrabold text-base flex items-center justify-center sm:justify-start gap-2">
              {title}
            </h2>
            <p className="text-slate-400 text-xs">{description}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1 bg-[#090f1d] p-1 rounded-xl border border-[#1d2840] shrink-0">
          <button
            onClick={() => {
              onToggleSpeedrun?.(false);
              onToggleSurvival?.(false);
              onToggleEndless(false);
            }}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              !isEndless && !isSpeedrun
                ? 'bg-white/15 text-white border border-white/20 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Diário
          </button>
          <button
            onClick={() => {
              onToggleSpeedrun?.(false);
              onToggleSurvival?.(false);
              if (!isEndless) onToggleEndless(true);
            }}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isEndless && !isSurvival && !isSpeedrun
                ? 'bg-indigo-600 text-white border border-indigo-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Modo Infinito (Treino Livre)"
          >
            Infinito
          </button>
          {onToggleSurvival && (
            <button
              onClick={() => {
                onToggleSpeedrun?.(false);
                if (!isEndless) onToggleEndless(true);
                onToggleSurvival(true);
              }}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                isSurvival
                  ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white border border-amber-400/50 shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                  : 'text-amber-400/80 hover:text-amber-300'
              }`}
              title="Modo Sobrevivência: 3 Corações de Vida + Recorde de Streak!"
            >
              <Flame size={13} className={isSurvival ? 'animate-bounce' : ''} />
              <span>Sobrevivência</span>
            </button>
          )}
          {onToggleSpeedrun && (
            <button
              onClick={() => {
                onToggleSurvival?.(false);
                onToggleSpeedrun(true);
              }}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                isSpeedrun
                  ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white border border-emerald-300/50 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                  : 'text-emerald-400/85 hover:text-emerald-300'
              }`}
              title="Sub-modo Speedrun (Contra o Relógio — 60 Segundos)"
            >
              <Timer size={13} />
              <span>Speedrun</span>
            </button>
          )}
        </div>
      </div>

      {/* E2: Barra de Status do Modo Sobrevivência + Botão F2 Desafiar Amigo */}
      {isEndless && !isSpeedrun && (
        <div className="flex flex-wrap items-center justify-between gap-2 bg-[#0b1222]/95 border border-[#1e2b45] rounded-2xl px-4 py-2.5 shadow-md animate-fadeIn">
          {isSurvival && survivalState ? (
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {/* 3 Corações */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Vidas:</span>
                <div className="flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <Heart
                      key={i}
                      size={16}
                      className={`transition-all duration-300 ${
                        i < survivalState.hearts
                          ? 'text-rose-500 fill-rose-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.6)]'
                          : 'text-slate-700 fill-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Streak Atual */}
              <div className="flex items-center gap-1.5 bg-[#121c33] px-2.5 py-1 rounded-xl border border-[#223254]">
                <Flame size={13} className="text-amber-400" />
                <span className="text-[11px] font-bold text-slate-300">Streak:</span>
                <span className="text-xs font-black text-amber-400">{survivalState.streak}</span>
              </div>

              {/* Contador para Cura (+1 Vida a cada 5 acertos consecutivos, máx 3) */}
              <div
                className="flex items-center gap-1.5 bg-[#121c33] px-2.5 py-1 rounded-xl border border-[#223254]"
                title="A cada 5 acertos consecutivos você recupera +1 coração perdido (máximo de 3 corações)"
              >
                <span className="text-[10px] font-bold text-slate-400">
                  Cura +1❤️: <strong className="text-emerald-400">{survivalState.consecutiveWins % 5}/5</strong>
                </span>
              </div>

              {/* Recorde Pessoal */}
              <div className="flex items-center gap-1.5 bg-[#121c33] px-2.5 py-1 rounded-xl border border-[#223254]">
                <Trophy size={12} className="text-yellow-400" />
                <span className="text-[11px] font-bold text-slate-300">Recorde:</span>
                <span className="text-xs font-black text-yellow-400">{survivalState.bestStreak}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-indigo-400" />
              <span>Modo Infinito Livre ativo — jogue sem limite ou desafie um amigo nesta rodada!</span>
            </div>
          )}

          {/* F2: Botão Desafiar um Amigo nesta rodada */}
          {onChallengeFriend && (
            <button
              type="button"
              onClick={handleCopyChallenge}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-400/50 text-amber-300 text-xs font-extrabold transition-all active:scale-95 shadow-sm ml-auto"
              title="Gerar link com código para um amigo adivinhar exatamente este mesmo desafio"
            >
              {copiedChallenge ? <Check size={14} className="text-emerald-400" /> : <Swords size={14} />}
              <span>{copiedChallenge ? 'Link de Desafio Copiado!' : '⚔️ Desafiar Amigo'}</span>
            </button>
          )}
        </div>
      )}

      {/* Notificação de Vida Recuperada (5 acertos consecutivos) */}
      {healedBanner && (
        <div className="bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 px-4 py-2 rounded-xl text-xs font-black text-center animate-bounce shadow-lg">
          💖 +1 Vida Recuperada por atingir 5 acertos consecutivos!
        </div>
      )}

      {/* F2: Banner de Desafio de Amigo Recebido */}
      {activeChallenge && (
        <div className="flex items-center justify-between gap-2 bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-rose-500/20 border border-amber-400/50 rounded-2xl px-4 py-2.5 text-xs shadow-lg animate-fadeIn">
          <div className="flex items-center gap-2 text-amber-200 font-bold">
            <Swords size={16} className="text-amber-400 shrink-0" />
            <span>
              <strong>Desafio de Amigo Ativo!</strong>{' '}
              {activeChallenge.s
                ? activeChallenge.m === 'grid'
                  ? `Seu amigo fez ${activeChallenge.s.g}/9 acertos${
                      activeChallenge.s.r ? ` (Raridade Média: ${activeChallenge.s.r}%)` : ''
                    }. Tente superar!`
                  : activeChallenge.s.w
                  ? `Seu amigo acertou em ${activeChallenge.s.g} ${
                      activeChallenge.s.g === 1 ? 'tentativa' : 'tentativas'
                    }. Tente acertar em menos!`
                  : `Seu amigo foi derrotado após ${activeChallenge.s.g} tentativas. Você consegue acertar?`
                : 'Vocês estão jogando exatamente o mesmo desafio secreto!'}
            </span>
          </div>
          {onClearChallenge && (
            <button
              onClick={onClearChallenge}
              className="p-1 rounded-lg text-amber-300/70 hover:text-white hover:bg-black/20 transition-colors"
              title="Sair do desafio de amigo"
            >
              <X size={15} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
