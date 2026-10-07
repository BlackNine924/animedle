import React from 'react';
import { Character, GameMode } from '../types/anime';
import { Lightbulb, Lock, Unlock, Flag, Sparkles } from 'lucide-react';

interface HintBoxProps {
  targetCharacter: Character;
  guessCount: number;
  isWon: boolean;
  onSurrender: () => void;
  disabled?: boolean;
  currentMode?: GameMode;
  currentAnimeSlug?: string;
}

export const HintBox: React.FC<HintBoxProps> = ({
  targetCharacter,
  guessCount,
  isWon,
  onSurrender,
  disabled = false,
  currentMode = 'classic',
  currentAnimeSlug = 'demon-slayer',
}) => {
  const isOnePiece = currentAnimeSlug === 'one-piece';

  if (isOnePiece) {
    const hint1Needed = 3;
    const hint2Needed = 6;
    const hint3Needed = 9;

    const hint1Unlocked = guessCount >= hint1Needed || isWon;
    const hint2Unlocked = guessCount >= hint2Needed || isWon;
    const hint3Unlocked = guessCount >= hint3Needed || isWon;

    const hint1Remaining = Math.max(0, hint1Needed - guessCount);
    const hint2Remaining = Math.max(0, hint2Needed - guessCount);
    const hint3Remaining = Math.max(0, hint3Needed - guessCount);

    const fruitHintText =
      targetCharacter.styleOrPower &&
      targetCharacter.styleOrPower !== 'Nenhum' &&
      targetCharacter.styleOrPower !== 'Nenhuma'
        ? targetCharacter.styleOrPower
        : 'Sem Akuma no Mi';

    const affiliationHintText = Array.isArray(targetCharacter.affiliation)
      ? targetCharacter.affiliation.join(', ')
      : targetCharacter.affiliation || 'Nenhuma';

    return (
      <div className="max-w-3xl mx-auto my-6 p-4 bg-[#0d1426] border border-[#202b43] rounded-2xl shadow-xl shadow-black/20">
        <div className="flex items-center justify-between border-b border-[#202b43] pb-3 mb-3.5">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider">
            <Lightbulb size={16} className="text-amber-400 animate-pulse" />
            <span>Pistas da rodada</span>
          </div>
          {!isWon && !disabled && (
            <button
              onClick={onSurrender}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 text-xs font-bold rounded-xl transition-all shadow-sm active:scale-95"
              title="Revelar a resposta e desistir do desafio atual"
            >
              <Flag size={13} />
              <span>Desistir</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* Dica 1: Saga de Estreia */}
          <div
            className={`p-3 rounded-xl border transition-all duration-500 relative overflow-hidden ${
              hint1Unlocked
                ? 'bg-amber-500/15 border-amber-500/60 text-amber-200 shadow-lg shadow-amber-500/10 animate-fadeIn'
                : 'bg-[#111a2d]/60 border-[#202b43] text-slate-400'
            }`}
          >
            {hint1Unlocked && (
              <div className="absolute top-2 right-2 text-amber-400/60 animate-spin" style={{ animationDuration: '6s' }}>
                <Sparkles size={14} />
              </div>
            )}
            <div className="flex items-center justify-between font-bold text-slate-300 mb-1 text-[11px]">
              <span className="flex items-center gap-1.5">
                {hint1Unlocked ? (
                  <span className="flex items-center gap-1 text-amber-400 animate-bounce">
                    <Unlock size={14} />
                  </span>
                ) : (
                  <Lock size={14} className="text-slate-500" />
                )}
                {hint1Unlocked ? 'Dica 1 — Saga de Estreia' : 'Dica 1'}
              </span>
            </div>
            {hint1Unlocked ? (
              <p className="font-extrabold text-xs text-white mt-1 animate-fadeIn">
                {targetCharacter.debutArc}
              </p>
            ) : (
              <p className="text-[11px] text-slate-500 italic mt-1">
                Libera em <strong className="text-slate-400">{hint1Remaining}</strong> {hint1Remaining === 1 ? 'erro' : 'erros'}
              </p>
            )}
          </div>

          {/* Dica 2: Akuma no Mi / Fruta */}
          <div
            className={`p-3 rounded-xl border transition-all duration-500 relative overflow-hidden ${
              hint2Unlocked
                ? 'bg-amber-500/15 border-amber-500/60 text-amber-200 shadow-lg shadow-amber-500/10 animate-fadeIn'
                : 'bg-[#111a2d]/60 border-[#202b43] text-slate-400'
            }`}
          >
            {hint2Unlocked && (
              <div className="absolute top-2 right-2 text-amber-400/60 animate-spin" style={{ animationDuration: '6s' }}>
                <Sparkles size={14} />
              </div>
            )}
            <div className="flex items-center justify-between font-bold text-slate-300 mb-1 text-[11px]">
              <span className="flex items-center gap-1.5">
                {hint2Unlocked ? (
                  <span className="flex items-center gap-1 text-amber-400 animate-bounce">
                    <Unlock size={14} />
                  </span>
                ) : (
                  <Lock size={14} className="text-slate-500" />
                )}
                {hint2Unlocked ? 'Dica 2 — Akuma no Mi' : 'Dica 2'}
              </span>
            </div>
            {hint2Unlocked ? (
              <p className="font-extrabold text-xs text-white mt-1 animate-fadeIn">
                {fruitHintText}
              </p>
            ) : (
              <p className="text-[11px] text-slate-500 italic mt-1">
                Libera em <strong className="text-slate-400">{hint2Remaining}</strong> {hint2Remaining === 1 ? 'erro' : 'erros'}
              </p>
            )}
          </div>

          {/* Dica 3: Afiliação */}
          <div
            className={`p-3 rounded-xl border transition-all duration-500 relative overflow-hidden ${
              hint3Unlocked
                ? 'bg-amber-500/15 border-amber-500/60 text-amber-200 shadow-lg shadow-amber-500/10 animate-fadeIn'
                : 'bg-[#111a2d]/60 border-[#202b43] text-slate-400'
            }`}
          >
            {hint3Unlocked && (
              <div className="absolute top-2 right-2 text-amber-400/60 animate-spin" style={{ animationDuration: '6s' }}>
                <Sparkles size={14} />
              </div>
            )}
            <div className="flex items-center justify-between font-bold text-slate-300 mb-1 text-[11px]">
              <span className="flex items-center gap-1.5">
                {hint3Unlocked ? (
                  <span className="flex items-center gap-1 text-amber-400 animate-bounce">
                    <Unlock size={14} />
                  </span>
                ) : (
                  <Lock size={14} className="text-slate-500" />
                )}
                {hint3Unlocked ? 'Dica 3 — Afiliação' : 'Dica 3'}
              </span>
            </div>
            {hint3Unlocked ? (
              <p className="font-extrabold text-xs text-white mt-1 animate-fadeIn line-clamp-2">
                {affiliationHintText}
              </p>
            ) : (
              <p className="text-[11px] text-slate-500 italic mt-1">
                Libera em <strong className="text-slate-400">{hint3Remaining}</strong> {hint3Remaining === 1 ? 'erro' : 'erros'}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Comportamento Padrão para os outros Animes (Demon Slayer, Jujutsu Kaisen, Romance, etc.)
  const hint1Needed = 4;
  const hint2Needed = 7;

  const hint1Unlocked = guessCount >= hint1Needed || isWon;
  const hint2Unlocked = guessCount >= hint2Needed || isWon;

  const hint1Remaining = Math.max(0, hint1Needed - guessCount);
  const hint2Remaining = Math.max(0, hint2Needed - guessCount);

  const isNaruto = currentAnimeSlug === 'naruto';
  const isRomance = currentAnimeSlug === 'romance';

  // Configuração Dinâmica e Contextual das Dicas
  let hint1Label = 'Dica 1 — Arco de Estreia';
  let hint1Content = targetCharacter.debutArc || targetCharacter.origin || 'Arco Inicial';

  let hint2Label = 'Dica 2 — Frase Marcante';
  let hint2Content = targetCharacter.quote || targetCharacter.ability || targetCharacter.styleOrPower || 'Personagem Secreto';

  if (isRomance) {
    // Para Romance, a melhor pista disparada é a Obra de Origem + Papel/Arquétipo Amoroso
    hint1Label = 'Dica 1 — Obra de Origem';
    hint1Content = targetCharacter.origin || (Array.isArray(targetCharacter.affiliation) ? targetCharacter.affiliation[0] : targetCharacter.affiliation) || 'Comédia Romântica';

    hint2Label = 'Dica 2 — Papel & Arquétipo';
    const roleParts = [targetCharacter.role, targetCharacter.archetype].filter(Boolean);
    hint2Content = roleParts.length > 0 ? roleParts.join(' · ') : (targetCharacter.status || 'Protagonista');
  } else if (isNaruto) {
    hint2Label = 'Dica 2 — Jutsu & Atributo';
    const jutsu = targetCharacter.styleOrPower && targetCharacter.styleOrPower !== 'Nenhuma' ? targetCharacter.styleOrPower : null;
    const attrs = Array.isArray(targetCharacter.attributes)
      ? targetCharacter.attributes.filter(a => a !== 'Nenhum' && a !== 'Nenhuma')
      : [];
    const attr = attrs[0] || null;
    if (jutsu && attr) hint2Content = `${jutsu} · ${attr}`;
    else if (jutsu) hint2Content = jutsu;
    else if (attr) hint2Content = attr;
    else hint2Content = Array.isArray(targetCharacter.affiliation) ? targetCharacter.affiliation.join(', ') : targetCharacter.affiliation || 'Shinobi';
  } else {
    hint2Label = 'Dica 2 — Frase Marcante';
    hint2Content = targetCharacter.quote || targetCharacter.ability || targetCharacter.styleOrPower || 'Uma figura inesquecível';
  }

  // Sanitização final para garantir que nunca apareça '—', '-' ou vazio
  if (!hint1Content || hint1Content === '—' || hint1Content === '-') {
    hint1Content = targetCharacter.origin || 'História Principal';
  }
  if (!hint2Content || hint2Content === '—' || hint2Content === '-') {
    hint2Content = targetCharacter.styleOrPower || targetCharacter.role || 'Personagem Marcante';
  }

  return (
    <div className="max-w-2xl mx-auto my-6 p-4 bg-[#0d1426] border border-[#202b43] rounded-2xl shadow-xl shadow-black/20">
      <div className="flex items-center justify-between border-b border-[#202b43] pb-3 mb-3.5">
        <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider">
          <Lightbulb size={16} className="text-amber-400 animate-pulse" />
          <span>Pistas da rodada</span>
        </div>
        {!isWon && !disabled && (
          <button
            onClick={onSurrender}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 text-xs font-bold rounded-xl transition-all shadow-sm active:scale-95"
            title="Revelar a resposta e desistir do desafio atual"
          >
            <Flag size={13} />
            <span>Desistir</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {/* Dica 1 */}
        <div
          className={`p-3.5 rounded-xl border transition-all duration-500 relative overflow-hidden ${
            hint1Unlocked
              ? 'bg-amber-500/15 border-amber-500/60 text-amber-200 shadow-lg shadow-amber-500/10 animate-fadeIn'
              : 'bg-[#111a2d]/60 border-[#202b43] text-slate-400'
          }`}
        >
          {hint1Unlocked && (
            <div className="absolute top-2 right-2 text-amber-400/60 animate-spin" style={{ animationDuration: '6s' }}>
              <Sparkles size={14} />
            </div>
          )}
          <div className="flex items-center justify-between font-bold text-slate-300 mb-1 text-[11px]">
            <span className="flex items-center gap-1.5">
              {hint1Unlocked ? (
                <span className="flex items-center gap-1 text-amber-400 animate-bounce">
                  <Unlock size={14} />
                </span>
              ) : (
                <Lock size={14} className="text-slate-500" />
              )}
              {hint1Unlocked ? hint1Label : 'Dica 1'}
            </span>
          </div>
          {hint1Unlocked ? (
            <p className="font-extrabold text-sm text-white mt-1 animate-fadeIn">
              {hint1Content}
            </p>
          ) : (
            <p className="text-[11px] text-slate-500 italic mt-1">
              Libera em <strong className="text-slate-400">{hint1Remaining}</strong> {hint1Remaining === 1 ? 'erro' : 'erros'}
            </p>
          )}
        </div>

        {/* Dica 2 */}
        <div
          className={`p-3.5 rounded-xl border transition-all duration-500 relative overflow-hidden ${
            hint2Unlocked
              ? 'bg-amber-500/15 border-amber-500/60 text-amber-200 shadow-lg shadow-amber-500/10 animate-fadeIn'
              : 'bg-[#111a2d]/60 border-[#202b43] text-slate-400'
          }`}
        >
          {hint2Unlocked && (
            <div className="absolute top-2 right-2 text-amber-400/60 animate-spin" style={{ animationDuration: '6s' }}>
              <Sparkles size={14} />
            </div>
          )}
          <div className="flex items-center justify-between font-bold text-slate-300 mb-1 text-[11px]">
            <span className="flex items-center gap-1.5">
              {hint2Unlocked ? (
                <span className="flex items-center gap-1 text-amber-400 animate-bounce">
                  <Unlock size={14} />
                </span>
              ) : (
                <Lock size={14} className="text-slate-500" />
              )}
              {hint2Unlocked ? hint2Label : 'Dica 2'}
            </span>
          </div>
          {hint2Unlocked ? (
            <p className="font-extrabold text-xs text-white mt-1 italic line-clamp-2 animate-fadeIn">
              "{hint2Content}"
            </p>
          ) : (
            <p className="text-[11px] text-slate-500 italic mt-1">
              Libera em <strong className="text-slate-400">{hint2Remaining}</strong> {hint2Remaining === 1 ? 'erro' : 'erros'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
