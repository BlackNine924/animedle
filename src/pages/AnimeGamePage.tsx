import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { getAnimeBySlug } from '../data/animes/animeRegistry';
import { ComingSoon } from './ComingSoon';
import { App } from '../App';

export const AnimeGamePage: React.FC = () => {
  const { animeSlug } = useParams<{ animeSlug: string }>();
  const navigate = useNavigate();

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
    <div className="relative min-h-screen">
      {/* Wallpaper fixo de fundo */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(/wallpapers/${animeSlug}.png)` }}
      />
      {/* Overlay escuro uniforme */}
      <div className="fixed inset-0 bg-black/72 -z-10" />

      {/* Jogo */}
      <App
        animeSlug={animeSlug}
        onNavigateHome={() => navigate('/')}
        onNavigateToAnime={(slug: string) => navigate(`/${slug}`)}
      />
    </div>
  );
};
