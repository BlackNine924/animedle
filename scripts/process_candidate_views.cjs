const fs = require('fs');
const https = require('https');
const path = require('path');
const sharp = require('sharp');
const { downloadBuffer, createContactSheet } = require('./candidate_finder.cjs');

async function getGifFromView(viewPath) {
  const url = 'https://tenor.com' + viewPath;
  try {
    const html = await new Promise((res, rej) => {
      https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, r => {
        let d = ''; r.on('data', c => d += c); r.on('end', () => res(d));
      }).on('error', rej);
    });
    const m = html.match(/content="(https:\/\/media[0-9]?\.tenor\.com\/[^"]+\.gif)"/);
    return m ? m[1] : null;
  } catch (e) {
    return null;
  }
}

async function run() {
  const data = JSON.parse(fs.readFileSync('scratch/search_9_targets.json', 'utf8'));
  const outDir = 'scratch/inspect_9';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const summary = {};

  for (const [key, views] of Object.entries(data)) {
    console.log(`Processing ${key} (${views.length} views)...`);
    summary[key] = [];
    for (let i = 0; i < Math.min(views.length, 6); i++) {
      const v = views[i];
      const slug = v.replace('/view/', '');
      const gifUrl = await getGifFromView(v);
      if (!gifUrl) continue;

      const gifFile = path.join(outDir, `${slug}.gif`);
      if (!fs.existsSync(gifFile)) {
        try {
          const buf = await downloadBuffer(gifUrl);
          fs.writeFileSync(gifFile, buf);
        } catch (e) {
          console.error(`Failed to download ${gifUrl}: ${e.message}`);
          continue;
        }
      }

      try {
        const meta = await sharp(gifFile).metadata();
        const sheetPath = path.join(outDir, `sheet_${slug}.jpg`);
        if (!fs.existsSync(sheetPath)) {
          const frames = [];
          for (let f = 0; f < meta.pages; f++) {
            frames.push(await sharp(gifFile, { page: f }).toBuffer());
          }
          await createContactSheet(frames, sheetPath, 6);
        }
        summary[key].push({ slug, pages: meta.pages, w: meta.width, h: meta.height, sheet: sheetPath, gifFile });
        console.log(`  ✓ ${slug}: ${meta.pages} pages`);
      } catch (err) {
        console.error(`  ✗ Error processing ${slug}: ${err.message}`);
      }
    }
  }

  fs.writeFileSync('scratch/inspect_9_summary.json', JSON.stringify(summary, null, 2));
  console.log('Saved scratch/inspect_9_summary.json');
}

run().catch(console.error);
