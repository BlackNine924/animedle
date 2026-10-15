const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');
const { assembleWebp, downloadBuffer } = require('./candidate_finder.cjs');

async function getGifFromView(viewPath) {
  const url = 'https://tenor.com' + viewPath;
  const html = await new Promise(res => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, r => {
      let d = ''; r.on('data', c => d += c); r.on('end', () => res(d));
    });
  });
  const m = html.match(/content="(https:\/\/media[0-9]?\.tenor\.com\/[^"]+\.gif)"/);
  return m ? m[1] : null;
}

// Crops bottom fraction if cropBottomFraction > 0
async function getFrames(filePath, start, end, cropBottomPercent = 0) {
  const buf = fs.readFileSync(filePath);
  const meta = await sharp(buf).metadata();
  const pages = meta.pages || 1;
  const actualEnd = Math.min(end, pages);
  const frames = [];
  for (let p = start; p < actualEnd; p++) {
    let img = sharp(buf, { page: p });
    if (cropBottomPercent > 0) {
      const w = meta.width;
      const h = Math.round(meta.height * (1 - cropBottomPercent));
      img = img.extract({ left: 0, top: 0, width: w, height: h });
    }
    frames.push(await img.toBuffer());
  }
  return frames;
}

const onePieceConfigs = [
  { id: 'page-one', src: 'scratch/inspect/one-piece/page-one_view.gif', start: 0, end: 92 },
  { id: 'doc-q', src: 'scratch/inspect/one-piece/doc-q_cand1.gif', start: 0, end: 6 },
  { id: 'yasopp', src: 'scratch/inspect/one-piece/yasopp_v1.gif', start: 0, end: 24 },
  { id: 'lucky-roux', src: 'scratch/inspect/one-piece/luck-roo-21631281.gif', start: 0, end: 20 },
  { id: 'denjiro', src: 'scratch/inspect/one-piece/denjiro_cand1.gif', start: 0, end: 45 },
  { id: 'inuarashi', src: 'scratch/inspect/one-piece/inuarashi_cand1.gif', start: 19, end: 35 },
  { id: 'shinobu', src: 'scratch/inspect/one-piece/shinobu_cand1.gif', start: 0, end: 80 },
  { id: 'kurozumi-orochi', src: 'scratch/inspect/one-piece/kurozumi-orochi_v1.gif', start: 0, end: 31, cropBottom: 0.15 },
  { id: 'shiki', src: 'scratch/inspect/one-piece/shiki_v1.gif', start: 0, end: 18 },
  { id: 'vinsmoke-niji', src: 'scratch/inspect/one-piece/niji_real.gif', start: 0, end: 43 },
  { id: 'vinsmoke-yonji', src: 'scratch/inspect/one-piece/vinsmoke-yonji_cand1.gif', start: 165, end: 209 },
  { id: 'cavendish', src: 'scratch/inspect/one-piece/cavendish_cand1.gif', start: 0, end: 39 },
  { id: 'sai', src: 'scratch/inspect/one-piece/sai_cand1.gif', start: 155, end: 191 },
  { id: 'elizabello-ii', src: 'scratch/inspect/one-piece/elizabello-ii_cand3.gif', start: 0, end: 61 },
  { id: 'chaka', src: 'scratch/inspect/one-piece/chaka_cand1.gif', start: 53, end: 107 },
  { id: 'dalton', src: 'scratch/inspect/one-piece/dalton_cand1.gif', start: 92, end: 160 },
  { id: 'krieg-don', src: 'scratch/inspect/one-piece/krieg-don_cand2.gif', start: 0, end: 35 },
  { id: 'hatchan', src: 'scratch/inspect/one-piece/hatchan_cand1.gif', start: 0, end: 54 },
  { id: 'hody-jones', src: 'scratch/inspect/one-piece/hody-jones-solo_view.gif', start: 0, end: 28 },
];

async function main() {
  // Ensure niji_real.gif is downloaded
  const nijiPath = 'scratch/inspect/one-piece/niji_real.gif';
  if (!fs.existsSync(nijiPath)) {
    console.log('Downloading Niji real gif...');
    const nijiUrl = await getGifFromView('/view/niji-vinsmoke-gif-21378532');
    if (nijiUrl) {
      const buf = await downloadBuffer(nijiUrl);
      fs.writeFileSync(nijiPath, buf);
      console.log('Saved niji_real.gif');
    }
  }

  for (const c of onePieceConfigs) {
    console.log(`Assembling ${c.id}...`);
    try {
      const frames = await getFrames(c.src, c.start, c.end, c.cropBottom || 0);
      const outPath = path.join('public/scenes/one-piece', `${c.id}.webp`);
      await assembleWebp(frames, outPath, 83);
      console.log(`  ✓ Successfully wrote ${outPath} (${frames.length} frames)`);
    } catch (err) {
      console.error(`  ✗ Error on ${c.id}: ${err.message}`);
    }
  }
}

main();
