import React, { useState } from 'react';
import { getTitleIconPaths } from '../utils/featuresManager';

export interface TitleCrestIconProps {
  titleName: string;
  rankIndex: number;
  themeColor: string;
  isUnlocked: boolean;
  isCurrent?: boolean;
  sizeClass?: string;
}

export const TitleCrestIcon: React.FC<TitleCrestIconProps> = ({
  titleName,
  rankIndex,
  themeColor,
  isUnlocked,
  sizeClass = 'w-14 h-14 sm:w-16 sm:h-16',
}) => {
  const [hasFailed, setHasFailed] = useState(false);
  const paths = getTitleIconPaths(titleName);

  React.useEffect(() => {
    setHasFailed(false);
  }, [titleName]);

  if (!hasFailed) {
    return (
      <picture className={`${sizeClass} inline-flex items-center justify-center shrink-0`}>
        <source srcSet={paths.webp} type="image/webp" />
        <img
          src={paths.png}
          alt={titleName}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onError={() => setHasFailed(true)}
          className={`${sizeClass} object-contain select-none transition-all duration-300 ${
            isUnlocked
              ? 'drop-shadow-[0_6px_14px_rgba(0,0,0,0.85)] group-hover:scale-105'
              : 'grayscale-[55%] opacity-55 contrast-95'
          }`}
        />
      </picture>
    );
  }

  // Fallback vetorial estilizado como Brasão/Escudo em 5 níveis para animes cujos ícones ainda serão adicionados
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeClass} select-none transition-transform duration-300 ${
        isUnlocked ? 'drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]' : 'grayscale-[60%] opacity-50'
      }`}
    >
      {/* Escudo Base */}
      <path
        d="M32 5L53 13.5V30.5C53 44.5 43.8 54.4 32 59C20.2 54.4 11 44.5 11 30.5V13.5L32 5Z"
        fill="#0b1326"
        stroke={themeColor}
        strokeWidth="3.2"
      />
      <path
        d="M32 9.5L48.5 16.2V30.2C48.5 41.5 41.2 49.7 32 53.8C22.8 49.7 15.5 41.5 15.5 30.2V16.2L32 9.5Z"
        fill={`${themeColor}28`}
        stroke={themeColor}
        strokeOpacity="0.45"
        strokeWidth="1.2"
      />
      {/* Detalhe central progressivo conforme o Rank (0 a 4) */}
      {rankIndex === 0 && (
        <path
          d="M32 21L35.2 28.2L43 29.1L37.1 34.4L38.8 42L32 38L25.2 42L26.9 34.4L21 29.1L28.8 28.2L32 21Z"
          fill={themeColor}
        />
      )}
      {rankIndex === 1 && (
        <g fill={themeColor}>
          <circle cx="32" cy="30" r="8" stroke={themeColor} strokeWidth="2.5" fill="none" />
          <path d="M32 18V42M20 30H44" stroke={themeColor} strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {rankIndex === 2 && (
        <g stroke={themeColor} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 25L32 17L42 25L42 37L32 45L22 37Z" />
          <circle cx="32" cy="31" r="4" fill={themeColor} />
        </g>
      )}
      {rankIndex === 3 && (
        <g fill={themeColor}>
          <polygon points="32,16 36,26 47,27 38,35 41,45 32,39 23,45 26,35 17,27 28,26" />
          <circle cx="32" cy="31" r="3" fill="#0b1326" />
        </g>
      )}
      {rankIndex === 4 && (
        <g fill={themeColor}>
          {/* Coroa Mística Imperial */}
          <path d="M20 38L23 23L28 30L32 19L36 30L41 23L44 38H20Z" />
          <circle cx="23" cy="21" r="2.2" />
          <circle cx="32" cy="17" r="2.6" />
          <circle cx="41" cy="21" r="2.2" />
          <rect x="22" y="40" width="20" height="3" rx="1.5" />
        </g>
      )}
    </svg>
  );
};
