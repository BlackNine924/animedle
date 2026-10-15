const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { assembleWebp } = require('./candidate_finder.cjs');

// Helper to extract and optionally crop frames from a gif file
async function getFrames(filePath, start, end, crop = null, loopTimes = 1) {
  const buf = fs.readFileSync(filePath);
  const meta = await sharp(buf).metadata();
  const pages = meta.pages || 1;
  const actualEnd = Math.min(end, pages);
  const baseFrames = [];

  for (let p = start; p < actualEnd; p++) {
    let img = sharp(buf, { page: p });
    if (crop) {
      const left = Math.round(meta.width * (crop.left || 0));
      const top = Math.round(meta.height * (crop.top || 0));
      const width = Math.round(meta.width * (crop.width || 1));
      const height = Math.round(meta.height * (crop.height || 1));

      const safeLeft = Math.min(Math.max(0, left), meta.width - 1);
      const safeTop = Math.min(Math.max(0, top), meta.height - 1);
      const safeWidth = Math.min(width, meta.width - safeLeft);
      const safeHeight = Math.min(height, meta.height - safeTop);

      img = img.extract({ left: safeLeft, top: safeTop, width: safeWidth, height: safeHeight });
    }
    baseFrames.push(await img.toBuffer());
  }

  const allFrames = [];
  for (let l = 0; l < loopTimes; l++) {
    allFrames.push(...baseFrames);
  }
  return allFrames;
}

const narutoConfigs = [
  { id: 'might-guy', src: 'scratch/inspect/naruto/might-guy_cand3.gif', start: 1, end: 25 },
  { id: 'kimimaro', src: 'scratch/kimi_tsubaki.gif', start: 50, end: 125 },
  { id: 'rasa', src: 'C:/Users/User/.gemini/antigravity/brain/e7c68800-3001-4bbc-a48f-c757f90dd285/scratch/gif_cache_b4/rasa_0.gif', start: 0, end: 19 },
  { id: 'izuna-uchiha', src: 'scratch/izuna_tobi.gif', start: 13, end: 28 },
  { id: 'ginkaku', isWebp: true, src: 'scratch/test_ginkaku_anim.webp' },
  { id: 'yugito-nii', src: 'C:/Users/User/.gemini/antigravity/brain/e7c68800-3001-4bbc-a48f-c757f90dd285/scratch/gif_cache_b4/yugito-nii_0.gif', start: 0, end: 20, crop: { left: 0, top: 0, width: 0.55, height: 1.0 } },
  { id: 'fuguki-suikazan', src: 'C:/Users/User/.gemini/antigravity/brain/e7c68800-3001-4bbc-a48f-c757f90dd285/scratch/latam_cands/fuguki_fuguki_samehada_0.gif', start: 0, end: 46, crop: { left: 0.48, top: 0, width: 0.52, height: 1.0 } },
  { id: 'juzo-biwa', src: 'scratch/inspect/naruto/juzo-biwa_v2.gif', start: 8, end: 20 },
  { id: 'gari', src: 'C:/Users/User/.gemini/antigravity/brain/e7c68800-3001-4bbc-a48f-c757f90dd285/scratch/gif_cache_b4/ddg_gari_0.gif', start: 0, end: 6, loopTimes: 3 },
  { id: 'shikaku-nara', src: 'C:/Users/User/.gemini/antigravity/brain/e7c68800-3001-4bbc-a48f-c757f90dd285/scratch/gif_cache_b5/shikaku-nara_3.gif', start: 2, end: 11, loopTimes: 2 },
  { id: 'inoichi-yamanaka', src: 'scratch/inspect/naruto/inoichi-solo_view.gif', start: 65, end: 74, loopTimes: 2 },
  { id: 'choza-akimichi', src: 'C:/Users/User/.gemini/antigravity/brain/e7c68800-3001-4bbc-a48f-c757f90dd285/scratch/gif_cache_b5/choza-akimichi_5.gif', start: 12, end: 23, crop: { left: 0, top: 0, width: 0.58, height: 1.0 }, loopTimes: 2 },
  { id: 'hizashi-hyuuga', isWebp: true, src: 'scratch/test_hizashi_anim.webp' },
  { id: 'hanabi-hyuuga', src: 'scratch/inspect/naruto/hanabi-solo_view.gif', start: 0, end: 36 },
  { id: 'hayate-gekko', src: 'C:/Users/User/.gemini/antigravity/brain/e7c68800-3001-4bbc-a48f-c757f90dd285/scratch/latam_cands/hayate_hayate_examen_chunin_0.gif', start: 87, end: 110, crop: { left: 0, top: 0, width: 1.0, height: 0.82 } },
  { id: 'izumo-kamizuki', isWebp: true, src: 'scratch/test_izumo_anim.webp' },
  { id: 'kotetsu-hagane', src: 'C:/Users/User/.gemini/antigravity/brain/e7c68800-3001-4bbc-a48f-c757f90dd285/scratch/latam_cands/izumo_izumo_kotetsu_naruto_1.gif', start: 7, end: 14, crop: { left: 0.50, top: 0, width: 0.50, height: 0.95 }, loopTimes: 2 },
  { id: 'ebisu', src: 'scratch/inspect/naruto/ebisu-solo_view.gif', start: 0, end: 32 },
  { id: 'rin-nohara', src: 'scratch/inspect/naruto/rin-solo_view.gif', start: 0, end: 16, loopTimes: 2 },
  { id: 'omoi', src: 'scratch/inspect/naruto/omoi_cand1.gif', start: 0, end: 31 },
  { id: 'dodai', isWebp: true, src: 'C:/Users/User/.gemini/antigravity/brain/e7c68800-3001-4bbc-a48f-c757f90dd285/scratch/test_dodai_anim.webp' },
  { id: 'ao', src: 'C:/Users/User/.gemini/antigravity/brain/e7c68800-3001-4bbc-a48f-c757f90dd285/scratch/exact_cands/ao_hUOL738vVloAAAAC.gif', start: 0, end: 8, crop: { left: 0, top: 0, width: 0.28, height: 0.58 }, loopTimes: 3 },
  { id: 'akatsuchi', src: 'C:/Users/User/.gemini/antigravity/brain/e7c68800-3001-4bbc-a48f-c757f90dd285/scratch/exact_cands/akatsuchi_dOR0V-IivxcAAAAC.gif', start: 24, end: 40 },
  { id: 'shima', src: 'C:/Users/User/.gemini/antigravity/brain/e7c68800-3001-4bbc-a48f-c757f90dd285/scratch/gif_cache_b5/shima_kw_3.gif', start: 9, end: 33, crop: { left: 0.60, top: 0.15, width: 0.38, height: 0.70 } },
  { id: 'enma', src: 'scratch/inspect/naruto/enma_cand2.gif', start: 22, end: 35 },
  { id: 'akamaru', src: 'scratch/inspect/naruto/akamaru-2128_view.gif', start: 0, end: 12, loopTimes: 2 }
];

async function main() {
  const targetDir = path.join(__dirname, '../public/scenes/naruto');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log(`Starting assembly of ${narutoConfigs.length} Naruto scenes...`);

  for (const c of narutoConfigs) {
    const outPath = path.join(targetDir, `${c.id}.webp`);
    try {
      if (c.isWebp) {
        fs.copyFileSync(c.src, outPath);
        const meta = await sharp(outPath).metadata();
        console.log(`  ✓ Copied WebP ${c.id} -> ${outPath} (${meta.pages} pages, ${meta.width}x${meta.height})`);
      } else {
        const frames = await getFrames(c.src, c.start, c.end, c.crop || null, c.loopTimes || 1);
        await assembleWebp(frames, outPath, 83);
        console.log(`  ✓ Assembled ${c.id} -> ${outPath} (${frames.length} frames)`);
      }
    } catch (err) {
      console.error(`  ✗ Error assembling ${c.id}: ${err.message}`);
    }
  }

  console.log('Finished assembling all Naruto scenes!');
}

main().catch(console.error);
