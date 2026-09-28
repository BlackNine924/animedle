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
    <div className="relative min-h-screen w-full bg-[#060b18]">
      {/* Wallpaper fixo de fundo */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0"
        style={{ backgroundImage: `url(/wallpapers/${animeSlug}.png)` }}
      />
      {/* Overlay escuro uniforme para garantir contraste e legibilidade das tabelas e cards */}
      <div className="fixed inset-0 bg-[#060b18]/78 pointer-events-none z-0 backdrop-blur-[1px]" />

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
