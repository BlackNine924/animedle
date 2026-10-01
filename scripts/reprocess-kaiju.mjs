import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const avatarsDir = path.resolve('public/avatars/kaiju-no-8');
const charactersJsonPath = path.resolve('src/data/animes/kaiju-no-8/characters.json');

const KAIJU_IMAGE_MAP = {
  'kafka-hibino': 'File:Kafka Hibino anime render.png',
  'mina-ashiro': 'File:Mina Ashiro anime render.png',
  'reno-ichikawa': 'File:Leno Ichikawa anime render.png',
  'kikoru-shinomiya': 'File:Kikoru Shinomiya anime render.png',
  'soshiro-hoshina': 'File:Soshiro Hoshina anime render.png',
  'iharu-furuhashi': 'File:Iharu Furuhashi anime render.png',
  'haruichi-izumo': 'File:Haruichi Izumo anime render.png',
  'gen-narumi': 'File:Gen Narumi anime render.png',
  'isao-shinomiya': 'File:Isao Shinomiya anime render.png',
  'aoi-kaguragi': 'File:Aoi Kaguragi anime render.png',
  'konomi-okonogi': 'File:Konomi Okonogi.jpg',
  'keiji-itami': 'File:Keiji Itami.PNG',
  'juzo-ogata': 'File:Kaiju No. 9 anime.png',
  'kaiju-numero-10': 'File:Kaiju No. 10 anime.png',
  'kaiju-numero-11': 'File:Shark Kaiju.png',
  'akari-minase': 'File:Akari Minase.jpeg',
  'hikari-shinomiya': 'File:Hikari Shinomiya.png',
  'rin-shinonome': 'File:Rin Shinonome.PNG'
};

async function getImageUrl(fileTitle) {
  const url = `https://kaijuu-8-gou.fandom.com/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const j = await res.json();
  const page = Object.values(j.query?.pages || {})[0];
  return page?.imageinfo ? page.imageinfo[0].url : null;
}

async function processKaijuAvatar(buffer, outputPath) {
  const img = sharp(buffer);
  const meta = await img.metadata();
  const w = meta.width;
  const h = meta.height;
  const { data } = await img.raw().toBuffer({ resolveWithObject: true });

  let charMinY = h, charMaxY = 0, charMinX = w, charMaxX = 0;
  let transparentCount = 0;
  const channels = meta.channels;

  if (channels === 4) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const a = data[(y * w + x) * 4 + 3];
        if (a < 50) {
          transparentCount++;
        } else {
          if (y < charMinY) charMinY = y;
          if (y > charMaxY) charMaxY = y;
          if (x < charMinX) charMinX = x;
          if (x > charMaxX) charMaxX = x;
        }
      }
    }
  }

  const isFullBodyTransparent = (channels === 4 && transparentCount > (w * h * 0.10) && (charMaxY - charMinY) > 250);
  let left, top, cropW, cropH;

  if (isFullBodyTransparent) {
    const charH = charMaxY - charMinY;
    const charW = charMaxX - charMinX;

    // Scan skin tones in top 45% of character
    let firstFaceY = null;
    let faceMinX = w, faceMaxX = 0;
    for (let y = charMinY; y < Math.min(h, charMinY + Math.round(charH * 0.45)); y++) {
      let rowSkin = 0;
      let rMin = w, rMax = 0;
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        if (data[idx + 3] < 50) continue;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        if (r > 175 && g > 115 && g < 225 && b > 80 && b < 210 && r >= g && g >= b) {
          rowSkin++;
          if (x < rMin) rMin = x;
          if (x > rMax) rMax = x;
        }
      }
      if (rowSkin >= 6 && firstFaceY === null) {
        firstFaceY = y;
      }
      if (firstFaceY !== null && y < firstFaceY + 120 && rowSkin >= 4) {
        if (faceMaxX > faceMinX) {
          const curCenter = (faceMinX + faceMaxX) / 2;
          if (Math.abs(rMin - curCenter) < 140 && Math.abs(rMax - curCenter) < 140) {
            if (rMin < faceMinX) faceMinX = rMin;
            if (rMax > faceMaxX) faceMaxX = rMax;
          }
        } else {
          if (rMin < faceMinX) faceMinX = rMin;
          if (rMax > faceMaxX) faceMaxX = rMax;
        }
      }
    }

    if (firstFaceY !== null && faceMaxX > faceMinX) {
      const faceCenterX = Math.round((faceMinX + faceMaxX) / 2);
      const faceCenterY = firstFaceY + 25;
      let boxSize = Math.round(charH * 0.22);
      const faceWidth = faceMaxX - faceMinX;
      boxSize = Math.max(boxSize, Math.round(faceWidth * 1.45));
      boxSize = Math.min(boxSize, w, h, Math.round(charH * 0.35));

      cropW = boxSize;
      cropH = boxSize;
      top = Math.max(charMinY, Math.min(h - boxSize, faceCenterY - Math.round(boxSize * 0.44)));
      left = Math.max(0, Math.min(w - boxSize, faceCenterX - Math.round(boxSize / 2)));
    } else {
      // Kaiju form without human skin (Kaiju No. 9, 10, 11)
      const boxSize = Math.min(w, h, Math.round(charH * 0.30));
      cropW = boxSize;
      cropH = boxSize;
      top = charMinY;
      const charCenterX = Math.round((charMinX + charMaxX) / 2);
      left = Math.max(0, Math.min(w - boxSize, charCenterX - Math.round(boxSize / 2)));
    }
  } else {
    // 3-channel manga scan or screenshot
    if (h >= w) {
      cropW = w;
      cropH = w;
      top = Math.round((h - w) * 0.08);
      left = 0;
    } else {
      cropW = h;
      cropH = h;
      top = 0;
      left = Math.round((w - h) / 2);
    }
  }

  cropW = Math.max(1, Math.min(cropW, w - left));
  cropH = Math.max(1, Math.min(cropH, h - top));

  await sharp(buffer)
    .extract({ left, top, width: cropW, height: cropH })
    .resize(240, 240, { fit: 'cover', position: 'top' })
    .png({ quality: 95 })
    .toFile(outputPath);
}

async function run() {
  const chars = JSON.parse(fs.readFileSync(charactersJsonPath, 'utf8'));
  console.log(`Reprocessing ${chars.length} Kaiju No. 8 characters...`);

  let success = 0;
  for (const c of chars) {
    const fileTitle = KAIJU_IMAGE_MAP[c.id];
    const outPath = path.join(avatarsDir, `${c.id}.png`);
    console.log(`Processing ${c.name} (${c.id}) -> ${fileTitle}...`);

    let imgUrl = null;
    if (fileTitle) {
      imgUrl = await getImageUrl(fileTitle);
    }

    if (!imgUrl) {
      console.warn(`   ⚠️ Image URL not found for ${c.name}, falling back to wiki query`);
      const fallbackUrl = `https://kaijuu-8-gou.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(c.name)}&pithumbsize=1000&format=json&redirects=1`;
      const res = await fetch(fallbackUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const j = await res.json();
      const p = Object.values(j.query?.pages || {})[0];
      imgUrl = p?.thumbnail?.source || null;
    }

    if (!imgUrl) {
      console.warn(`   ⚠️ Fallback not found, keeping existing avatar.`);
      continue;
    }

    try {
      const res = await fetch(imgUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Referer': 'https://kaijuu-8-gou.fandom.com/'
        }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await processKaijuAvatar(buf, outPath);
      console.log(`   ✓ Saved ${c.id}.png`);
      success++;
    } catch (err) {
      console.error(`   ❌ Failed: ${c.name}`, err.message);
    }

    await new Promise(r => setTimeout(r, 60));
  }

  // Clean test files
  const testFiles = fs.readdirSync(avatarsDir).filter(f => f.startsWith('test-'));
  for (const tf of testFiles) {
    fs.unlinkSync(path.join(avatarsDir, tf));
  }

  console.log(`\n=== COMPLETED KAIJU NO. 8: ${success}/${chars.length} SUCCESSFUL ===`);
}

run();
