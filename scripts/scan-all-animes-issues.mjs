import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const animesDir = path.resolve('src/data/animes');
const animeFolders = fs.readdirSync(animesDir);

const results = [];

for (const anime of animeFolders) {
  const jsonPath = path.join(animesDir, anime, 'characters.json');
  if (!fs.existsSync(jsonPath)) continue;

  const chars = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  for (const c of chars) {
    if (!c.avatar) continue;
    const avatarPath = path.resolve('public', c.avatar.replace(/^\//, ''));
    if (!fs.existsSync(avatarPath)) {
      results.push({ anime, id: c.id, name: c.name, issue: 'FILE_NOT_FOUND', path: avatarPath });
      continue;
    }

    try {
      const img = sharp(avatarPath);
      const meta = await img.metadata();
      const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

      // Heuristic 1: Is it monochrome (black and white manga)?
      // Check R, G, B standard deviation per pixel
      let grayPixels = 0;
      let totalSamples = 0;
      for (let i = 0; i < data.length; i += info.channels * 4) { // sample every 4th pixel
        totalSamples++;
        const r = data[i], g = data[i+1], b = data[i+2];
        if (Math.abs(r - g) < 8 && Math.abs(g - b) < 8 && Math.abs(r - b) < 8) {
          grayPixels++;
        }
      }
      const grayRatio = grayPixels / totalSamples;
      const isMonochrome = grayRatio > 0.85;

      // Heuristic 2: Flat dark background
      // Check corners: (0,0), (w-1, 0), (0, h-1), (w-1, h-1)
      const corners = [
        0,
        (info.width - 1) * info.channels,
        info.width * (info.height - 1) * info.channels,
        (info.width * info.height - 1) * info.channels
      ];
      let darkCorners = 0;
      let transparentCorners = 0;
      for (const idx of corners) {
        if (info.channels === 4 && data[idx + 3] < 30) {
          transparentCorners++;
        } else {
          const lum = 0.299 * data[idx] + 0.587 * data[idx+1] + 0.114 * data[idx+2];
          if (lum < 30) darkCorners++;
        }
      }

      // Heuristic 3: Skin distribution for chin-cutoff / eye-focus / full-body
      // Let's divide vertically into 4 quarters: Q1 (top 25%), Q2 (25-50%), Q3 (50-75%), Q4 (bottom 25%)
      let skinQ1 = 0, skinQ2 = 0, skinQ3 = 0, skinQ4 = 0;
      let skinBottomRow = 0;

      const q1Boundary = Math.round(info.height * 0.25);
      const q2Boundary = Math.round(info.height * 0.50);
      const q3Boundary = Math.round(info.height * 0.75);

      for (let y = 0; y < info.height; y++) {
        for (let x = 0; x < info.width; x++) {
          const idx = (y * info.width + x) * info.channels;
          if (info.channels === 4 && data[idx + 3] < 50) continue;
          const r = data[idx], g = data[idx+1], b = data[idx+2];
          // Anime skin tone range
          if (r > 190 && g > 130 && b > 100 && r > g && g >= b - 15) {
            if (y < q1Boundary) skinQ1++;
            else if (y < q2Boundary) skinQ2++;
            else if (y < q3Boundary) skinQ3++;
            else skinQ4++;

            if (y === info.height - 1 && x >= info.width * 0.3 && x <= info.width * 0.7) {
              skinBottomRow++;
            }
          }
        }
      }

      const totalSkin = skinQ1 + skinQ2 + skinQ3 + skinQ4;

      // Eye-focus / chin-cutoff:
      // Lots of skin in Q2 or Q1, but skin cuts off abruptly at bottom of Q2/Q3, or chin is at bottom edge:
      // When face is cropped high (like Anna Yamada, Chitoge before, etc.):
      // Eyes are around Q2/Q3, mouth is at bottom edge of Q3/Q4
      // Let's check skinBottomRow:
      const chinCutoff = skinBottomRow > 30 && skinQ4 < skinQ2 * 0.4;

      // Full body:
      // Total skin is tiny (< 1000 pixels in 240x240 which is 57600 px, so < 1.7% skin)
      const isFullBody = totalSkin > 0 && totalSkin < 800;

      if (isMonochrome) {
        results.push({ anime, id: c.id, name: c.name, issue: 'MONOCHROME_MANGA', grayRatio: grayRatio.toFixed(2) });
      } else if (chinCutoff) {
        results.push({ anime, id: c.id, name: c.name, issue: 'CHIN_CUTOFF', skinBottomRow, totalSkin });
      } else if (isFullBody) {
        results.push({ anime, id: c.id, name: c.name, issue: 'TINY_FACE_FULL_BODY', totalSkin });
      } else if (transparentCorners > 0) {
        results.push({ anime, id: c.id, name: c.name, issue: 'TRANSPARENT_BG' });
      } else if (darkCorners >= 3) {
        results.push({ anime, id: c.id, name: c.name, issue: 'FLAT_DARK_BG' });
      }
    } catch (e) {
      results.push({ anime, id: c.id, name: c.name, issue: 'ERROR: ' + e.message });
    }
  }
}

console.log(`Scanned all characters. Issues found: ${results.length}`);
const byIssue = {};
for (const r of results) {
  if (!byIssue[r.issue]) byIssue[r.issue] = [];
  byIssue[r.issue].push(`${r.anime}/${r.id} (${r.name})`);
}
for (const [iss, list] of Object.entries(byIssue)) {
  console.log(`\n=== ${iss} (${list.length}) ===`);
  console.log(list.slice(0, 20).join('\n'));
  if (list.length > 20) console.log(`... and ${list.length - 20} more`);
}

fs.writeFileSync('scripts/scan-results.json', JSON.stringify(results, null, 2));
