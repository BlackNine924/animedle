import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ICONS_DIR = 'C:/Users/User/Downloads/ANIMEDLE/Icons';
const OUT_DIR = 'public/icons';

fs.mkdirSync(OUT_DIR, { recursive: true });

async function saveIcon(sharpInstance, slug) {
  const destPng = path.join(OUT_DIR, `${slug}.png`);
  const destWebp = path.join(OUT_DIR, `${slug}.webp`);
  const buf = await sharpInstance
    .trim()
    .resize(256, 256, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: 'lanczos3'
    })
    .png({ quality: 100 })
    .toBuffer();

  await sharp(buf).toFile(destPng);
  await sharp(buf).webp({ quality: 95, effort: 6 }).toFile(destWebp);
  console.log(`[OK] Saved clean icon for ${slug}`);
}

async function run() {
  // 1. Akame Ga Kill: Kit 5, Col 5, Row 3 -> pure eye + katana (dark bg -> transparent)
  {
    const k5 = await sharp(path.join(ICONS_DIR, 'Kit 5 Icons.png')).metadata();
    const cW5 = Math.floor(k5.width / 5);
    const cH5 = Math.floor(k5.height / 5);
    const { data, info } = await sharp(path.join(ICONS_DIR, 'Kit 5 Icons.png'))
      .extract({ left: 4 * cW5 + 15, top: 2 * cH5 + 15, width: cW5 - 30, height: cH5 - 55 })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const rgba = Buffer.alloc(info.width * info.height * 4);
    for (let i = 0; i < info.width * info.height; i++) {
      const lum = (data[i*info.channels] + data[i*info.channels+1] + data[i*info.channels+2]) / 3;
      rgba[i*4] = 255;
      rgba[i*4+1] = 255;
      rgba[i*4+2] = 255;
      if (lum < 50) rgba[i*4+3] = 0;
      else if (lum < 100) rgba[i*4+3] = Math.round(((lum - 50) / 50) * 255);
      else rgba[i*4+3] = 255;
    }
    await saveIcon(sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } }), 'akame-ga-kill');
  }

  // 2. Shangri-La Frontier: Kit 8, Col 2, Row 5 -> pure bird head (dark bg -> transparent)
  {
    const k8 = await sharp(path.join(ICONS_DIR, 'Kit 8 Icons.png')).metadata();
    const cW8 = Math.floor(k8.width / 5);
    const cH8 = Math.floor(k8.height / 5);
    const { data, info } = await sharp(path.join(ICONS_DIR, 'Kit 8 Icons.png'))
      .extract({ left: 1 * cW8 + 30, top: 4 * cH8 + 10, width: cW8 - 55, height: cH8 - 85 })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const rgba = Buffer.alloc(info.width * info.height * 4);
    for (let i = 0; i < info.width * info.height; i++) {
      const lum = (data[i*info.channels] + data[i*info.channels+1] + data[i*info.channels+2]) / 3;
      rgba[i*4] = 255;
      rgba[i*4+1] = 255;
      rgba[i*4+2] = 255;
      if (lum < 50) rgba[i*4+3] = 0;
      else if (lum < 100) rgba[i*4+3] = Math.round(((lum - 50) / 50) * 255);
      else rgba[i*4+3] = 255;
    }
    await saveIcon(sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } }), 'shangri-la-frontier');
  }

  // 3. Cyberpunk: Edgerunners -> pure David visor head (dark bg -> transparent, no frame/stars)
  {
    const { data, info } = await sharp(path.join(ICONS_DIR, 'Cyberpunk Edgerunners Icons.png'))
      .extract({ left: 65, top: 415, width: 310, height: 325 })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const rgba = Buffer.alloc(info.width * info.height * 4);
    for (let i = 0; i < info.width * info.height; i++) {
      const lum = (data[i*info.channels] + data[i*info.channels+1] + data[i*info.channels+2]) / 3;
      rgba[i*4] = 255;
      rgba[i*4+1] = 255;
      rgba[i*4+2] = 255;
      if (lum < 50) rgba[i*4+3] = 0;
      else if (lum < 100) rgba[i*4+3] = Math.round(((lum - 50) / 50) * 255);
      else rgba[i*4+3] = 255;
    }
    await saveIcon(sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } }), 'cyberpunk-edgerunners');
  }

  // 4. Witch Hat Atelier -> pure Grimoire + quill (transparent source)
  {
    const { data, info } = await sharp(path.join(ICONS_DIR, 'Witch Hat Atelier Icons.png'))
      .extract({ left: 745, top: 380, width: 505, height: 600 })
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        const idx = (y * info.width + x) * 4;
        const origX = x + 745;
        const origY = y + 380;
        if (origX < 765 && origY < 560) {
          data[idx+3] = 0;
        }
      }
    }

    const clean = sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
    await saveIcon(clean, 'witch-hat-atelier');
  }

  // 5. Nanatsu No Taizai -> pure Lostvayne dragon handle sword (transparent source)
  {
    const buf = await sharp(path.join(ICONS_DIR, 'Kit 3 Icons.png'))
      .extract({ left: 220, top: 520, width: 200, height: 210 })
      .png()
      .toBuffer();
    await saveIcon(sharp(buf), 'nanatsu-no-taizai');
  }

  // 6. Boku No Hero Academia -> pure Deku gauntlet punch explosion (transparent source)
  {
    const buf = await sharp(path.join(ICONS_DIR, 'Kit 2 Icons.png'))
      .extract({ left: 220, top: 970, width: 210, height: 230 })
      .png()
      .toBuffer();
    await saveIcon(sharp(buf), 'my-hero-academia');
  }

  console.log('All 6 icons extracted with 100% precision and saved!');
}

run().catch(console.error);
