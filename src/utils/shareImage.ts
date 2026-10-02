// Gerador de Card de Compartilhamento em Imagem PNG de alta resolução via HTML5 Canvas

export interface ShareCardOptions {
  animeTitle: string;
  themeColor: string;
  animeSlug?: string;
  characterName: string;
  characterAvatar?: string;
  characterSub?: string;
  modeName: string;
  totalGuesses: number;
  isWon: boolean;
  streak: number;
}

const loadCanvasImage = (src: string): Promise<HTMLImageElement | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    // Apenas aplica crossOrigin para URLs remotas para evitar problemas de CORS em assets locais
    if (src.startsWith('http://') || src.startsWith('https://')) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
};

export const generateVictoryCardBlob = async (options: ShareCardOptions): Promise<Blob | null> => {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 960;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // 1. Fundo Gradiente Elegante Escuro
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 960);
  bgGrad.addColorStop(0, '#0a101f');
  bgGrad.addColorStop(0.4, '#0d1527');
  bgGrad.addColorStop(1, '#050913');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 800, 960);

  // 2. Glow de Fundo na cor tema do Anime
  const glowGrad = ctx.createRadialGradient(400, 360, 40, 400, 360, 420);
  glowGrad.addColorStop(0, `${options.themeColor}38`);
  glowGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, 800, 960);

  // Borda Externa Estilizada
  ctx.strokeStyle = `${options.themeColor}45`;
  ctx.lineWidth = 4;
  ctx.strokeRect(16, 16, 768, 928);

  // Borda sutil interna
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  ctx.strokeRect(24, 24, 752, 912);

  // 3. Topo: Logo Oficial do Anime ou Nome AnimeDLE
  let logoDrawn = false;
  if (options.animeSlug) {
    const logoImg = await loadCanvasImage(`/logos/${options.animeSlug}.png`);
    if (logoImg && logoImg.width > 0) {
      const maxW = 200;
      const maxH = 65;
      const scale = Math.min(maxW / logoImg.width, maxH / logoImg.height);
      const w = logoImg.width * scale;
      const h = logoImg.height * scale;
      ctx.drawImage(logoImg, 400 - w / 2, 42 - h / 2 + 15, w, h);
      logoDrawn = true;
    }
  }

  if (!logoDrawn) {
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 28px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ANIME', 370, 65);
    ctx.fillStyle = options.themeColor;
    ctx.fillText('DLE', 425, 65);
  }

  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 13px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('DESAFIO DIÁRIO DE ANIME', 400, 95);

  // Linha separadora
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(80, 114);
  ctx.lineTo(720, 114);
  ctx.stroke();

  // 4. Nome do Anime & Modo
  ctx.fillStyle = options.themeColor;
  ctx.font = '800 23px Inter, system-ui, sans-serif';
  ctx.fillText(options.animeTitle.toUpperCase(), 400, 150);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '600 15px Inter, system-ui, sans-serif';
  ctx.fillText(`Modo: ${options.modeName}`, 400, 176);

  // 5. Avatar do Personagem (Carregamento com clipping arredondado)
  const avatarSize = 220;
  const avatarX = 400 - avatarSize / 2;
  const avatarY = 210;

  // Sombra e fundo do Avatar
  ctx.save();
  ctx.shadowColor = options.themeColor;
  ctx.shadowBlur = 35;
  ctx.fillStyle = '#111a2d';
  ctx.beginPath();
  ctx.arc(400, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  if (options.characterAvatar) {
    const img = await loadCanvasImage(options.characterAvatar);
    if (img) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(400, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, avatarX, avatarY, avatarSize, avatarSize);
      ctx.restore();
    } else {
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(400, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 64px Inter, sans-serif';
      ctx.fillText(options.characterName[0] || '?', 400, avatarY + 135);
    }
  }

  // Anel decorativo em volta do avatar
  ctx.strokeStyle = options.themeColor;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(400, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
  ctx.stroke();

  // 6. Nome do Personagem Secreto
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 32px Inter, system-ui, sans-serif';
  ctx.fillText(options.characterName, 400, 490);

  if (options.characterSub) {
    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 15px Inter, system-ui, sans-serif';
    ctx.fillText(options.characterSub, 400, 522);
  }

  // 7. Badge de Resultado
  const badgeY = 560;
  const badgeText = options.isWon
    ? `🎉 Acertou em ${options.totalGuesses} ${options.totalGuesses === 1 ? 'tentativa' : 'tentativas'}!`
    : '🚩 Personagem Revelado (Desistência)';

  ctx.fillStyle = options.isWon ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)';
  ctx.strokeStyle = options.isWon ? '#10b981' : '#f43f5e';
  ctx.lineWidth = 1.5;

  const badgeWidth = 400;
  const badgeHeight = 44;
  ctx.beginPath();
  ctx.roundRect(400 - badgeWidth / 2, badgeY, badgeWidth, badgeHeight, 22);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = options.isWon ? '#34d399' : '#fb7185';
  ctx.font = '800 16px Inter, system-ui, sans-serif';
  ctx.fillText(badgeText, 400, badgeY + 28);

  // 8. Box com Estatísticas Rápidas
  const statBoxY = 635;
  const statBoxWidth = 540;
  const statBoxHeight = 88;

  ctx.fillStyle = '#111a2d';
  ctx.strokeStyle = '#202b43';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(400 - statBoxWidth / 2, statBoxY, statBoxWidth, statBoxHeight, 20);
  ctx.fill();
  ctx.stroke();

  // Tentativas
  ctx.fillStyle = '#94a3b8';
  ctx.font = '700 12px Inter, system-ui, sans-serif';
  ctx.fillText('TENTATIVAS', 220, statBoxY + 34);
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 24px Inter, system-ui, sans-serif';
  ctx.fillText(`${options.totalGuesses}`, 220, statBoxY + 67);

  // Sequência
  ctx.fillStyle = '#94a3b8';
  ctx.font = '700 12px Inter, system-ui, sans-serif';
  ctx.fillText('STREAK DIÁRIO', 400, statBoxY + 34);
  ctx.fillStyle = '#fbbf24';
  ctx.font = '900 24px Inter, system-ui, sans-serif';
  ctx.fillText(`🔥 ${options.streak}`, 400, statBoxY + 67);

  // Data
  const todayFormatted = new Date().toLocaleDateString('pt-BR');
  ctx.fillStyle = '#94a3b8';
  ctx.font = '700 12px Inter, system-ui, sans-serif';
  ctx.fillText('DATA', 580, statBoxY + 34);
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 18px Inter, system-ui, sans-serif';
  ctx.fillText(todayFormatted, 580, statBoxY + 65);

  // 9. Rodapé com Watermark e Chamada
  ctx.fillStyle = '#64748b';
  ctx.font = '600 14px Inter, system-ui, sans-serif';
  ctx.fillText('Jogue todos os dias em https://animedle-9og.pages.dev', 400, 810);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.font = '500 12px Inter, system-ui, sans-serif';
  ctx.fillText('Compartilhe seu resultado com seus amigos!', 400, 835);

  return new Promise<Blob | null>((resolve) => {
    try {
      canvas.toBlob((blob) => resolve(blob), 'image/png');
    } catch (err) {
      console.warn('Canvas toBlob failed:', err);
      resolve(null);
    }
  });
};

export const downloadOrShareImageCard = async (
  options: ShareCardOptions,
  filename = 'animedle-resultado.png'
): Promise<boolean> => {
  const blob = await generateVictoryCardBlob(options);
  if (!blob) return false;

  // Download direto do arquivo PNG (nunca abre o painel nativo do Windows)
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return true;
};
