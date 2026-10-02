// Gerador de Card de Compartilhamento em Imagem PNG de alta resolução via HTML5 Canvas

interface ShareCardOptions {
  animeTitle: string;
  themeColor: string;
  characterName: string;
  characterAvatar?: string;
  characterSub?: string;
  modeName: string;
  totalGuesses: number;
  isWon: boolean;
  streak: number;
}

export const generateVictoryCardBlob = async (options: ShareCardOptions): Promise<Blob | null> => {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 920;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // 1. Fundo Gradiente Elegante Escuro
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 920);
  bgGrad.addColorStop(0, '#0a101f');
  bgGrad.addColorStop(0.5, '#0d1527');
  bgGrad.addColorStop(1, '#060a14');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 800, 920);

  // 2. Glow de Fundo na cor tema do Anime
  const glowGrad = ctx.createRadialGradient(400, 320, 30, 400, 320, 380);
  glowGrad.addColorStop(0, `${options.themeColor}35`);
  glowGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, 800, 920);

  // Borda Externa Estilizada
  ctx.strokeStyle = `${options.themeColor}40`;
  ctx.lineWidth = 4;
  ctx.strokeRect(16, 16, 768, 888);

  // 3. Topo: Logo & Marca AnimeDLE
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 28px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('ANIME', 370, 75);
  ctx.fillStyle = options.themeColor;
  ctx.fillText('DLE', 425, 75);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 13px Inter, system-ui, sans-serif';
  ctx.fillText('DESAFIO DIÁRIO DE ANIME', 400, 102);

  // Linha separadora
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(80, 122);
  ctx.lineTo(720, 122);
  ctx.stroke();

  // 4. Nome do Anime & Modo
  ctx.fillStyle = options.themeColor;
  ctx.font = '800 22px Inter, system-ui, sans-serif';
  ctx.fillText(options.animeTitle.toUpperCase(), 400, 160);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '600 15px Inter, system-ui, sans-serif';
  ctx.fillText(`Modo: ${options.modeName}`, 400, 186);

  // 5. Avatar do Personagem (Carregamento assíncrono com clipping arredondado)
  const avatarSize = 220;
  const avatarX = 400 - avatarSize / 2;
  const avatarY = 220;

  // Sombra do Avatar
  ctx.save();
  ctx.shadowColor = options.themeColor;
  ctx.shadowBlur = 35;
  ctx.fillStyle = '#111a2d';
  ctx.beginPath();
  ctx.arc(400, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  if (options.characterAvatar) {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject();
        img.src = options.characterAvatar!;
      });

      ctx.save();
      ctx.beginPath();
      ctx.arc(400, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, avatarX, avatarY, avatarSize, avatarSize);
      ctx.restore();
    } catch (e) {
      // Fallback em caso de erro ao carregar imagem
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
  ctx.fillText(options.characterName, 400, 500);

  if (options.characterSub) {
    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 16px Inter, system-ui, sans-serif';
    ctx.fillText(options.characterSub, 400, 532);
  }

  // 7. Badge de Resultado
  const badgeY = 575;
  const badgeText = options.isWon
    ? `🎉 Acertou em ${options.totalGuesses} ${options.totalGuesses === 1 ? 'tentativa' : 'tentativas'}!`
    : '🚩 Personagem Revelado (Desistência)';
  
  ctx.fillStyle = options.isWon ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)';
  ctx.strokeStyle = options.isWon ? '#10b981' : '#f43f5e';
  ctx.lineWidth = 1.5;

  const badgeWidth = 380;
  const badgeHeight = 44;
  ctx.beginPath();
  ctx.roundRect(400 - badgeWidth / 2, badgeY, badgeWidth, badgeHeight, 22);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = options.isWon ? '#34d399' : '#fb7185';
  ctx.font = '800 16px Inter, system-ui, sans-serif';
  ctx.fillText(badgeText, 400, badgeY + 28);

  // 8. Box com Estatísticas Rápidas
  const statBoxY = 650;
  const statBoxWidth = 520;
  const statBoxHeight = 85;

  ctx.fillStyle = '#111a2d';
  ctx.strokeStyle = '#202b43';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(400 - statBoxWidth / 2, statBoxY, statBoxWidth, statBoxHeight, 18);
  ctx.fill();
  ctx.stroke();

  // Stats columns
  // Tentativas
  ctx.fillStyle = '#94a3b8';
  ctx.font = '700 12px Inter, system-ui, sans-serif';
  ctx.fillText('TENTATIVAS', 220, statBoxY + 32);
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 24px Inter, system-ui, sans-serif';
  ctx.fillText(`${options.totalGuesses}`, 220, statBoxY + 65);

  // Sequência
  ctx.fillStyle = '#94a3b8';
  ctx.font = '700 12px Inter, system-ui, sans-serif';
  ctx.fillText('STREAK DIÁRIO', 400, statBoxY + 32);
  ctx.fillStyle = '#fbbf24';
  ctx.font = '900 24px Inter, system-ui, sans-serif';
  ctx.fillText(`🔥 ${options.streak}`, 400, statBoxY + 65);

  // Data
  const todayFormatted = new Date().toLocaleDateString('pt-BR');
  ctx.fillStyle = '#94a3b8';
  ctx.font = '700 12px Inter, system-ui, sans-serif';
  ctx.fillText('DATA', 580, statBoxY + 32);
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 18px Inter, system-ui, sans-serif';
  ctx.fillText(todayFormatted, 580, statBoxY + 63);

  // 9. Rodapé com Watermark e Chamada
  ctx.fillStyle = '#64748b';
  ctx.font = '600 14px Inter, system-ui, sans-serif';
  ctx.fillText('Jogue todos os dias em animedle.com', 400, 810);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.font = '500 12px Inter, system-ui, sans-serif';
  ctx.fillText('Compartilhe seu resultado com seus amigos!', 400, 835);

  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png');
  });
};

export const downloadOrShareImageCard = async (options: ShareCardOptions, filename = 'animedle-resultado.png'): Promise<boolean> => {
  const blob = await generateVictoryCardBlob(options);
  if (!blob) return false;

  // Tenta compartilhar nativamente em navegadores compatíveis (ex: smartphones)
  if (navigator.share && navigator.canShare) {
    try {
      const file = new File([blob], filename, { type: 'image/png' });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `AnimeDLE - ${options.animeTitle}`,
          text: `Acertei o personagem diário de ${options.animeTitle}! Jogue em animedle.com`,
        });
        return true;
      }
    } catch (e) {
      // Usuário cancelou ou navegador falhou, segue para o download manual
    }
  }

  // Fallback: Download direto do arquivo PNG
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
};
