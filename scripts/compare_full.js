import sharp from 'sharp';

async function createComparison() {
  const refPath = 'C:/Users/User/.gemini/antigravity/brain/0c29a8d4-9fc0-442f-bc4d-5de365cd99c6/.user_uploaded/media_1790377208501.png';
  const capPath = 'C:/Users/User/.gemini/antigravity/brain/0c29a8d4-9fc0-442f-bc4d-5de365cd99c6/capture_1672x941.png';
  const outPath = 'C:/Users/User/.gemini/antigravity/brain/0c29a8d4-9fc0-442f-bc4d-5de365cd99c6/full_page_comparison.png';

  const W = 1600;
  const H = 900;
  const bannerH = 40;

  const refBuffer = await sharp(refPath).resize(W, H, { fit: 'fill' }).toBuffer();
  const capBuffer = await sharp(capPath).resize(W, H, { fit: 'fill' }).toBuffer();

  const totalH = (H + bannerH) * 2;

  const labelRef = Buffer.from(
    `<svg width="${W}" height="${bannerH}">
      <rect width="${W}" height="${bannerH}" fill="#0a0f1d"/>
      <text x="24" y="26" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#60a5fa">REFERÊNCIA (Mockup Conceitual Original)</text>
    </svg>`
  );

  const labelCap = Buffer.from(
    `<svg width="${W}" height="${bannerH}">
      <rect width="${W}" height="${bannerH}" fill="#0a0f1d"/>
      <text x="24" y="26" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#34d399">IMPLEMENTAÇÃO REAL (AnimeDLE Live - 1672x941)</text>
    </svg>`
  );

  await sharp({
    create: {
      width: W,
      height: totalH,
      channels: 4,
      background: { r: 10, g: 15, b: 29, alpha: 1 }
    }
  })
  .composite([
    { input: labelRef, top: 0, left: 0 },
    { input: refBuffer, top: bannerH, left: 0 },
    { input: labelCap, top: bannerH + H, left: 0 },
    { input: capBuffer, top: bannerH * 2 + H, left: 0 },
  ])
  .png()
  .toFile(outPath);

  console.log('Saved full_page_comparison.png successfully!');
}

createComparison().catch(console.error);
