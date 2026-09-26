import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

async function buildPreview() {
  const refDir = 'C:/Users/User/.gemini/antigravity/brain/0c29a8d4-9fc0-442f-bc4d-5de365cd99c6/ref_crops';
  const outPath = 'C:/Users/User/.gemini/antigravity/brain/0c29a8d4-9fc0-442f-bc4d-5de365cd99c6/card_comparison_preview.png';

  const cards = [
    { slug: 'demon-slayer', name: 'Demon Slayer', color: '#EF4444', modes: '6 modos' },
    { slug: 'jujutsu-kaisen', name: 'Jujutsu Kaisen', color: '#6366F1', modes: '6 modos' },
    { slug: 'one-piece', name: 'One Piece', color: '#F59E0B', modes: '6 modos' },
    { slug: 'naruto', name: 'Naruto', color: '#F97316', modes: '6 modos' },
    { slug: 'solo-leveling', name: 'Solo Leveling', color: '#3B82F6', modes: '4 modos' },
    { slug: 'blue-lock', name: 'Blue Lock', color: '#06B6D4', modes: '4 modos' },
    { slug: 'record-of-ragnarok', name: 'Record of Ragnarok', color: '#E11D48', modes: '6 modos' },
    { slug: 'bleach', name: 'Bleach (TYBW)', color: '#FF4D8D', modes: '6 modos' },
    { slug: 'dragon-ball', name: 'Dragon Ball', color: '#F59E0B', modes: '6 modos' },
    { slug: 'romance', name: 'Romance (Coleção)', color: '#EC4899', modes: '4 modos' },
  ];

  const CARD_W = 284;
  const CARD_H = 114;
  const GAP_X = 30;
  const ROW_H = 135;
  const TOTAL_W = (CARD_W * 2) + GAP_X + 60;
  const TOTAL_H = (cards.length * ROW_H) + 60;

  const composites = [];

  for (let i = 0; i < cards.length; i++) {
    const c = cards[i];
    const y = 50 + (i * ROW_H);

    // 1. Ref card (se existir)
    const refFile = path.join(refDir, c.slug + '.png');
    if (fs.existsSync(refFile)) {
      const refResized = await sharp(refFile)
        .resize(CARD_W, CARD_H, { fit: 'fill' })
        .toBuffer();
      composites.push({ input: refResized, left: 30, top: y });
    } else {
      // Placeholder escuro caso não haja ref direta (ex: Bleach, Dragon Ball)
      const placeholder = await sharp({
        create: {
          width: CARD_W,
          height: CARD_H,
          channels: 4,
          background: { r: 15, g: 23, b: 42, alpha: 1 }
        }
      })
        .composite([{
          input: Buffer.from(`
            <svg width="${CARD_W}" height="${CARD_H}">
              <text x="142" y="60" text-anchor="middle" fill="#64748b" font-size="12" font-family="sans-serif">Não presente no Anexo 2 (Adição Canônica)</text>
            </svg>
          `),
          left: 0,
          top: 0
        }])
        .png()
        .toBuffer();
      composites.push({ input: placeholder, left: 30, top: y });
    }

    // 2. Proposed Card Mock isolado
    const artFile = path.resolve('public/card-covers', c.slug + '.png');
    let artBuffer;
    if (fs.existsSync(artFile)) {
      artBuffer = await sharp(artFile)
        .resize(110, CARD_H, { fit: 'cover', position: 'center' })
        .toBuffer();
    } else {
      artBuffer = await sharp({
        create: { width: 110, height: CARD_H, channels: 4, background: { r: 20, g: 30, b: 50, alpha: 1 } }
      }).png().toBuffer();
    }

    const cardBg = await sharp({
      create: {
        width: CARD_W,
        height: CARD_H,
        channels: 4,
        background: { r: 12, g: 18, b: 34, alpha: 1 }
      }
    })
      .composite([
        { input: artBuffer, left: 0, top: 0 },
        {
          input: Buffer.from(`
            <svg width="${CARD_W}" height="${CARD_H}">
              <defs>
                <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#0c1222" stop-opacity="0" />
                  <stop offset="100%" stop-color="#0c1222" stop-opacity="0.9" />
                </linearGradient>
              </defs>
              <rect x="70" y="0" width="40" height="${CARD_H}" fill="url(#fade)" />
              <rect x="1" y="1" width="${CARD_W - 2}" height="${CARD_H - 2}" rx="14" ry="14" fill="none" stroke="${c.color}" stroke-width="2" />
              <text x="122" y="32" fill="#ffffff" font-size="13" font-weight="900" font-family="sans-serif">${c.name}</text>
              <text x="122" y="52" fill="#94a3b8" font-size="11" font-family="sans-serif">🎮 ${c.modes}</text>
              <rect x="122" y="68" width="${CARD_W - 138}" height="30" rx="8" ry="8" fill="${c.color}25" stroke="${c.color}" stroke-width="1.5" />
              <text x="${122 + (CARD_W - 138) / 2}" y="87" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold" font-family="sans-serif">Jogar →</text>
            </svg>
          `),
          left: 0,
          top: 0
        }
      ])
      .png()
      .toBuffer();

    composites.push({ input: cardBg, left: 30 + CARD_W + GAP_X, top: y });
  }

  // Header SVG
  composites.push({
    input: Buffer.from(`
      <svg width="${TOTAL_W}" height="45">
        <text x="30" y="28" fill="#38bdf8" font-size="14" font-weight="bold" font-family="sans-serif">REFERÊNCIA DO MOCKUP (ANEXO 2)</text>
        <text x="${30 + CARD_W + GAP_X}" y="28" fill="#4ade80" font-size="14" font-weight="bold" font-family="sans-serif">PROPOSTA DE ANIME CARD (ARTE, COR &amp; ENQUADRAMENTO)</text>
      </svg>
    `),
    left: 0,
    top: 0
  });

  await sharp({
    create: {
      width: TOTAL_W,
      height: TOTAL_H,
      channels: 4,
      background: { r: 5, g: 8, b: 20, alpha: 1 }
    }
  })
    .composite(composites)
    .png()
    .toFile(outPath);

  console.log('Sucesso! Preview gerado em:', outPath);
}

buildPreview().catch(console.error);
