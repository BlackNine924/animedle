import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Referer': 'https://jujutsu-kaisen.fandom.com/'
};

// Check if an image buffer has a flat background
export async function isFlatBackground(buf) {
  try {
    const img = sharp(buf);
    const meta = await img.metadata();
    const stats = await img.stats();
    if (!stats.isOpaque) return { isFlat: true, reason: 'transparent' };

    const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
    const w = meta.width;
    const h = meta.height;
    const ch = info.channels;

    const getPixel = (x, y) => {
      const idx = (y * w + x) * ch;
      return [data[idx], data[idx + 1], data[idx + 2]];
    };

    const tl = getPixel(5, 5);
    const tr = getPixel(w - 6, 5);
    const bl = getPixel(5, h - 6);
    const br = getPixel(w - 6, h - 6);

    // Check if corners are near identical
    const diffCorners = Math.abs(tl[0] - tr[0]) + Math.abs(tl[1] - tr[1]) + Math.abs(tl[2] - tr[2]) +
                        Math.abs(tl[0] - bl[0]) + Math.abs(tl[1] - bl[1]) + Math.abs(tl[2] - bl[2]);

    const isNavy = (p) => (p[0] >= 15 && p[0] <= 25 && p[1] >= 20 && p[1] <= 32 && p[2] >= 40 && p[2] <= 52);
    const isPureBlack = (p) => (p[0] < 5 && p[1] < 5 && p[2] < 5);
    const isPureWhite = (p) => (p[0] > 245 && p[1] > 245 && p[2] > 245);

    if (isNavy(tl) && isNavy(tr)) return { isFlat: true, reason: 'navy_121a2d' };
    if (isPureBlack(tl) && isPureBlack(tr) && diffCorners < 5) return { isFlat: true, reason: 'flat_black' };
    if (isPureWhite(tl) && isPureWhite(tr) && diffCorners < 5) return { isFlat: true, reason: 'flat_white' };

    // Check variance of top border (first 10 rows)
    let rSum = 0, gSum = 0, bSum = 0, count = 0;
    for (let y = 0; y < Math.min(10, h); y++) {
      for (let x = 0; x < w; x++) {
        const p = getPixel(x, y);
        rSum += p[0]; gSum += p[1]; bSum += p[2]; count++;
      }
    }
    const rAvg = rSum / count, gAvg = gSum / count, bAvg = bSum / count;
    let varSum = 0;
    for (let y = 0; y < Math.min(10, h); y++) {
      for (let x = 0; x < w; x++) {
        const p = getPixel(x, y);
        varSum += Math.abs(p[0] - rAvg) + Math.abs(p[1] - gAvg) + Math.abs(p[2] - bAvg);
      }
    }
    const avgDiff = varSum / count;
    if (avgDiff < 1.5) return { isFlat: true, reason: 'low_top_variance' };

    return { isFlat: false, reason: 'authentic_scene' };
  } catch (e) {
    return { isFlat: false, reason: 'error: ' + e.message };
  }
}

// Smart crop for anime frame (16:9 or similar)
export async function cropAnimeFrame(buf) {
  const img = sharp(buf);
  const meta = await img.metadata();
  const w = meta.width;
  const h = meta.height;

  let pipeline = sharp(buf);

  if (w > h * 1.2) {
    // 16:9 landscape screenshot
    const size = h; // square of height h
    // Try center-left or center crop
    const left = Math.round((w - size) / 2);
    pipeline = pipeline.extract({
      left: Math.max(0, left),
      top: 0,
      width: size,
      height: size
    });
  } else if (h > w * 1.2) {
    // Portrait
    const size = w;
    const top = Math.round((h - size) * 0.1);
    pipeline = pipeline.extract({
      left: 0,
      top: Math.max(0, Math.min(top, h - size)),
      width: size,
      height: size
    });
  } else {
    // Roughly square
    const size = Math.min(w, h);
    pipeline = pipeline.extract({
      left: Math.round((w - size) / 2),
      top: Math.round((h - size) / 2),
      width: size,
      height: size
    });
  }

  return pipeline.resize(240, 240, { fit: 'cover' }).png({ quality: 95 }).toBuffer();
}

console.log('Helper loaded.');
