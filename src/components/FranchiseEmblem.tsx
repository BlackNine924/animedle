import React from 'react';

interface FranchiseEmblemProps {
  slug: string;
  size?: number;
  className?: string;
}

export const FranchiseEmblem: React.FC<FranchiseEmblemProps> = ({
  slug,
  size = 18,
  className = '',
}) => {
  switch (slug) {
    case 'naruto':
      // Símbolo Oficial da Aldeia da Folha (Konohagakure)
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <circle cx="12" cy="12" r="11" fill="#f97316" fillOpacity="0.18" stroke="#f97316" strokeWidth="1.5" />
          {/* Espiral com bico característico da Folha de Konoha */}
          <path
            d="M12 6.5C8.96 6.5 6.5 8.96 6.5 12C6.5 15.04 8.96 17.5 12 17.5C15.04 17.5 17.5 15.04 17.5 12C17.5 9.8 16 8.2 14.5 8.2C13 8.2 11.8 9.4 11.8 11C11.8 12.3 12.8 13.2 13.8 13.2"
            stroke="#fb923c"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Ponta/triângulo da folha */}
          <path d="M12 6.5L14 3.5" stroke="#f97316" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    case 'solo-leveling':
      // Adaga do Caçador Sung Jin-woo (Lâmina curva com brilho azul espectral)
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <circle cx="12" cy="12" r="11" fill="#3b82f6" fillOpacity="0.18" stroke="#3b82f6" strokeWidth="1.5" />
          {/* Lâmina da adaga */}
          <path
            d="M6 18L10 14M10 14L17.5 6.5C18.2 5.8 19 6.2 19 7C19 8.5 17.5 10.5 15.5 12.5L12 16L10 14Z"
            fill="#60a5fa"
            stroke="#93c5fd"
            strokeWidth="1.2"
          />
          {/* Guarda e punho da adaga */}
          <line x1="8.5" y1="12.5" x2="11.5" y2="15.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <line x1="6" y1="18" x2="4.5" y2="19.5" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'one-piece':
      // Jolly Roger Oficial dos Chapéus de Palha
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <circle cx="12" cy="12" r="11" fill="#f59e0b" fillOpacity="0.18" stroke="#f59e0b" strokeWidth="1.5" />
          {/* Ossos cruzados */}
          <line x1="5.5" y1="5.5" x2="18.5" y2="18.5" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round" />
          <line x1="18.5" y1="5.5" x2="5.5" y2="18.5" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round" />
          {/* Crânio */}
          <circle cx="12" cy="12.5" r="4.3" fill="#ffffff" stroke="#1e293b" strokeWidth="0.8" />
          <circle cx="10.5" cy="12.2" r="1" fill="#0f172a" />
          <circle cx="13.5" cy="12.2" r="1" fill="#0f172a" />
          {/* Chapéu de Palha com fita vermelha */}
          <path d="M6.5 10C7.5 7.5 16.5 7.5 17.5 10Z" fill="#fbbf24" stroke="#d97706" strokeWidth="0.7" />
          <path d="M6 10H18" stroke="#ef4444" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );

    case 'demon-slayer':
      // Chamas da Respiração do Sol / Hinokami Kagura
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <circle cx="12" cy="12" r="11" fill="#ef4444" fillOpacity="0.18" stroke="#ef4444" strokeWidth="1.5" />
          <path
            d="M12 3C12 3 14.5 7 13 9.5C14.8 9.2 16.5 10.5 17 12.2C17.8 15 15.6 18 12.5 18C8.5 18 6.5 14.5 9 10C9 10 9.8 11.5 11 11.5C11 9 10 7.5 12 3Z"
            fill="#f87171"
          />
          <path
            d="M12 7C12 7 13.5 9.5 12.5 11C13.8 11 14.5 12 14.5 13.2C14.5 15 13.2 16.2 12 16.2C10 16.2 9.2 14.8 10.5 12.5C10.5 12.5 11 13 11.8 13C11.8 11.2 11 10.2 12 7Z"
            fill="#fef08a"
          />
        </svg>
      );

    case 'jujutsu-kaisen':
      // Selo Espiral do Colégio Técnico de Jujutsu de Tóquio
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <circle cx="12" cy="12" r="11" fill="#6366f1" fillOpacity="0.18" stroke="#6366f1" strokeWidth="1.5" />
          <path
            d="M12 5.5C8.41 5.5 5.5 8.41 5.5 12C5.5 15.59 8.41 18.5 12 18.5C15.59 18.5 18.5 15.59 18.5 12"
            stroke="#a5b4fc"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M12 8.5C10.07 8.5 8.5 10.07 8.5 12C8.5 13.93 10.07 15.5 12 15.5C13.93 15.5 15.5 13.93 15.5 12"
            stroke="#c084fc"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="1.8" fill="#e0e7ff" />
        </svg>
      );

    case 'blue-lock':
      // Pentágono Oficial de Blue Lock
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <circle cx="12" cy="12" r="11" fill="#06b6d4" fillOpacity="0.18" stroke="#06b6d4" strokeWidth="1.5" />
          <polygon
            points="12,5 19,10 16.3,18 7.7,18 5,10"
            fill="#0891b2"
            stroke="#22d3ee"
            strokeWidth="1.6"
          />
          <circle cx="12" cy="12" r="2.2" fill="#ffffff" />
        </svg>
      );

    case 'record-of-ragnarok':
      // Asas de Valquíria e Lança Imperial (Shuumatsu no Valkyrie)
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <circle cx="12" cy="12" r="11" fill="#e11d48" fillOpacity="0.18" stroke="#e11d48" strokeWidth="1.5" />
          <path
            d="M12 4V20M8 7L12 11L16 7M6 10L12 16L18 10"
            stroke="#fda4af"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polygon points="12,3 14.5,7 9.5,7" fill="#ffe4e6" />
        </svg>
      );

    case 'bleach':
      // Crânio do Shinigami Substituto (Gokon Tekkō)
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <circle cx="12" cy="12" r="11" fill="#ff4d8d" fillOpacity="0.18" stroke="#ff4d8d" strokeWidth="1.5" />
          <path
            d="M8 8.5C8 6.5 9.8 5 12 5C14.2 5 16 6.5 16 8.5C16 11 15 12.5 14.5 13.5H9.5C9 12.5 8 11 8 8.5Z"
            fill="#fce7f3"
            stroke="#db2777"
            strokeWidth="1.2"
          />
          <rect x="10" y="13.5" width="4" height="2.5" rx="0.5" fill="#fce7f3" stroke="#db2777" strokeWidth="1" />
          <circle cx="10.2" cy="9" r="1" fill="#831843" />
          <circle cx="13.8" cy="9" r="1" fill="#831843" />
          <line x1="12" y1="13.5" x2="12" y2="16" stroke="#831843" strokeWidth="0.8" />
        </svg>
      );

    case 'dragon-ball':
      // Kanji "悟" (Go) de Son Goku
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <circle cx="12" cy="12" r="11" fill="#f59e0b" fillOpacity="0.22" stroke="#f59e0b" strokeWidth="1.5" />
          <text
            x="12"
            y="16.5"
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fontFamily="'Noto Sans JP', 'Hiragino Kaku Gothic Pro', sans-serif"
            fill="#ffffff"
          >
            悟
          </text>
        </svg>
      );

    case 'pokemon':
      // Pokébola Clássica Oficial
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <circle cx="12" cy="12" r="11" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.2" />
          <path d="M2.5 12C2.5 6.75 6.75 2.5 12 2.5C17.25 2.5 21.5 6.75 21.5 12H2.5Z" fill="#ef4444" />
          <path d="M2.5 12C2.5 17.25 6.75 2.5 12 21.5C17.25 21.5 21.5 17.25 21.5 12H2.5Z" fill="#ffffff" />
          <rect x="2" y="11" width="20" height="2" fill="#0f172a" />
          <circle cx="12" cy="12" r="3.2" fill="#ffffff" stroke="#0f172a" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="1.3" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.8" />
        </svg>
      );

    case 'attack-on-titan':
      // Asas da Liberdade (Tropa de Exploração)
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <path
            d="M12 2.5L19 6V13C19 17.5 15.5 20.8 12 22C8.5 20.8 5 17.5 5 13V6L12 2.5Z"
            fill="#1e293b"
            stroke="#94a3b8"
            strokeWidth="1.3"
          />
          <path d="M8.5 7L13 10L10 13L14.5 14L9 17.5" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M15.5 7L11 10L14 13L9.5 14L15 17.5" stroke="#f8fafc" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'haikyuu':
      // Bola de Vôlei Clássica
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <circle cx="12" cy="12" r="10.5" fill="#f8fafc" stroke="#64748b" strokeWidth="1.3" />
          <path d="M12 1.5C12 7.5 16.5 12 22.5 12" stroke="#2563eb" strokeWidth="1.5" />
          <path d="M12 22.5C12 16.5 7.5 12 1.5 12" stroke="#f59e0b" strokeWidth="1.5" />
          <path d="M20 4.5C15 9.5 9.5 15 4.5 20" stroke="#64748b" strokeWidth="1.2" />
        </svg>
      );

    case 'hunter-x-hunter':
      // Espadas Cruzadas de Hunter
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <circle cx="12" cy="12" r="11" fill="#1e293b" stroke="#64748b" strokeWidth="1.2" />
          <line x1="5" y1="5" x2="19" y2="19" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="19" y1="5" x2="5" y2="19" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="2.5" fill="#ffffff" />
        </svg>
      );

    case 'black-clover':
      // Trevo de Quatro Folhas
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <circle cx="12" cy="12" r="11" fill="#064e3b" fillOpacity="0.4" stroke="#10b981" strokeWidth="1.2" />
          <circle cx="9" cy="9" r="3.2" fill="#10b981" />
          <circle cx="15" cy="9" r="3.2" fill="#10b981" />
          <circle cx="9" cy="15" r="3.2" fill="#10b981" />
          <circle cx="15" cy="15" r="3.2" fill="#10b981" />
          <line x1="12" y1="12" x2="12" y2="20" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'berserk':
      // Marca do Sacrifício
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <circle cx="12" cy="12" r="11" fill="#450a0a" stroke="#dc2626" strokeWidth="1.2" />
          <path
            d="M12 4V20M12 7L7 12L12 17M12 7L17 12L12 17M8 9.5H16M8 14.5H16"
            stroke="#f87171"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'dan-da-dan':
      // Turbobaba / Olho Alienígena
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <circle cx="12" cy="12" r="11" fill="#701a75" fillOpacity="0.3" stroke="#d946ef" strokeWidth="1.2" />
          <ellipse cx="12" cy="12" rx="7" ry="4" stroke="#f472b6" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="2.5" fill="#f43f5e" />
        </svg>
      );

    case 'romance':
      // Coração Rosa Radiante
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <rect width="24" height="24" rx="7" fill="#ec4899" fillOpacity="0.2" />
          <path
            d="M12 20.5C12 20.5 4.5 15.5 4.5 9.5C4.5 6.74 6.74 4.5 9.5 4.5C11.08 4.5 12.5 5.25 13.5 6.4C14.5 5.25 15.92 4.5 17.5 4.5C20.26 4.5 22.5 6.74 22.5 9.5C22.5 15.5 15 20.5 15 20.5L12 22.5L12 20.5Z"
            fill="#ec4899"
          />
        </svg>
      );

    default:
      return (
        <span className="text-base select-none" style={{ fontSize: size }}>
          ✨
        </span>
      );
  }
};
