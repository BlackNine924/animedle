import sharp from 'sharp';
import { readdirSync } from 'fs';
import { join } from 'path';

const CARDS_DIR = 'public/cards';

async function makeAllCardsTransparent() {
  const files = readdirSync(CARDS_DIR).filter(f => f.endsWith('.png'));
  console.log(`Making corners transparent for ${files.length} cards...`);

  let processed = 0;
  for (const file of files) {
    const filePath = join(CARDS_DIR, file);
    const { data, info } = await sharp(filePath).raw().toBuffer({ resolveWithObject: true });
    
    const rgba = Buffer.alloc(info.width * info.height * 4);
    const visited = new Uint8Array(info.width * info.height);
    const queue = [];

    function add(x, y) {
      const idx = y * info.width + x;
      if (!visited[idx]) {
        visited[idx] = 1;
        queue.push(x, y);
      }
    }

    // Seed outer boundary pixels only in the 4 corner zones
    const cornerW = Math.floor(info.width * 0.12);
    const cornerH = Math.floor(info.height * 0.08);

    for (let x = 0; x < cornerW; x++) {
      add(x, 0);
      add(info.width - 1 - x, 0);
      add(x, info.height - 1);
      add(info.width - 1 - x, info.height - 1);
    }
    for (let y = 0; y < cornerH; y++) {
      add(0, y);
      add(0, info.height - 1 - y);
      add(info.width - 1, y);
      add(info.width - 1, info.height - 1 - y);
    }

    let head = 0;
    while (head < queue.length) {
      const cx = queue[head++];
      const cy = queue[head++];
      
      const inCornerZone = (cx < cornerW && (cy < cornerH || cy > info.height - 1 - cornerH)) ||
                           (cx > info.width - 1 - cornerW && (cy < cornerH || cy > info.height - 1 - cornerH));
      
      if (!inCornerZone) continue;

      const ci = (cy * info.width + cx) * info.channels;
      const r = data[ci], g = data[ci+1], b = data[ci+2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      // Dark background pixels in the corner
      if (lum < 38) {
        if (cx > 0) add(cx - 1, cy);
        if (cx < info.width - 1) add(cx + 1, cy);
        if (cy > 0) add(cx, cy - 1);
        if (cy < info.height - 1) add(cx, cy + 1);
      }
    }

    // Construct RGBA buffer
    for (let i = 0; i < info.width * info.height; i++) {
      const srcIdx = i * info.channels;
      const destIdx = i * 4;
      rgba[destIdx] = data[srcIdx];
      rgba[destIdx + 1] = data[srcIdx + 1];
      rgba[destIdx + 2] = data[srcIdx + 2];

      if (visited[i]) {
        const r = data[srcIdx], g = data[srcIdx+1], b = data[srcIdx+2];
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        if (lum < 24) {
          rgba[destIdx + 3] = 0; // 100% transparent
        } else {
          // Smooth edge feathering
          rgba[destIdx + 3] = Math.min(255, Math.round(((lum - 24) / 14) * 255));
        }
      } else {
        // If image already had alpha channel, keep it; otherwise full opacity
        rgba[destIdx + 3] = info.channels === 4 ? data[srcIdx + 3] : 255;
      }
    }

    await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
      .png({ quality: 95, compressionLevel: 8 })
      .toFile(filePath);

    processed++;
  }

  console.log(`Successfully made corner areas transparent for all ${processed} cards!`);
}

makeAllCardsTransparent().catch(console.error);
