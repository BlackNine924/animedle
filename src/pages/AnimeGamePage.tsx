import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { getAnimeBySlug } from '../data/animes/animeRegistry';
import { ComingSoon } from './ComingSoon';
import { App } from '../App';

export const AnimeGamePage: React.FC = () => {
  const { animeSlug } = useParams<{ animeSlug: string }>();
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [animeSlug]);

  if (!animeSlug) {
    return <Navigate to="/" replace />;
  }

  const anime = getAnimeBySlug(animeSlug);

  // Slug desconhecido → volta para home
  if (!anime) {
    return <Navigate to="/" replace />;
  }

  // Não implementado → tela "Em Breve"
  if (!anime.implemented) {
    return <ComingSoon anime={anime} />;
  }

  // Jogo disponível → wrapper com wallpaper + game
  return (
    <div className="relative min-h-screen w-full bg-[#060b18]">
      {/* Wallpaper fixo de fundo com WebP otimizado e carregamento prioritário — sem escurecimento artificial */}
      <picture className="fixed inset-0 pointer-events-none z-0">
        <source srcSet={`/wallpapers/${animeSlug}.webp`} type="image/webp" />
        <img
          src={`/wallpapers/${animeSlug}.png`}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center"
        />
      </picture>

      {/* Jogo */}
      <div className="relative z-10 w-full min-h-screen">
        <App
          animeSlug={animeSlug}
          onNavigateHome={() => navigate('/')}
          onNavigateToAnime={(slug: string) => navigate(`/${slug}`)}
        />
      </div>
    </div>
  );
};
