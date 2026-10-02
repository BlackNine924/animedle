import https from 'https';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const OUT_DIR = 'public/avatars/romance';
fs.mkdirSync(OUT_DIR, { recursive: true });

async function getWikiThumbnail(subdomain, title) {
  const url = `https://${subdomain}.fandom.com/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=600`;
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query?.pages;
          if (pages) {
            const page = Object.values(pages)[0];
            if (page?.thumbnail?.source) {
              resolve(page.thumbnail.source);
              return;
            }
          }
        } catch (e) {}
        resolve(null);
      });
    }).on('error', () => resolve(null));
  });
}

async function downloadAndCrop(imgUrl, slug, focusY = 0.35, wiki = '') {
  return new Promise((resolve) => {
    const cleanUrl = imgUrl.split('/revision')[0];
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Referer': wiki ? `https://${wiki}.fandom.com/` : 'https://www.fandom.com/'
    };
    https.get(cleanUrl, { headers }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, { headers }, (res2) => {
          const chunks = [];
          res2.on('data', c => chunks.push(c));
          res2.on('end', async () => {
            const buf = Buffer.concat(chunks);
            try {
              await processBuffer(buf, slug, focusY);
              resolve(true);
            } catch (err) {
              console.error(`Error processing ${slug}:`, err.message);
              resolve(false);
            }
          });
        });
        return;
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', async () => {
        const buf = Buffer.concat(chunks);
        try {
          await processBuffer(buf, slug, focusY);
          resolve(true);
        } catch (err) {
          console.error(`Error processing ${slug}:`, err.message);
          resolve(false);
        }
      });
    }).on('error', () => resolve(false));
  });
}

async function processBuffer(buf, slug, focusY = 0.35) {
  const meta = await sharp(buf).metadata();
  const size = Math.min(meta.width, meta.height);
  const left = Math.max(0, Math.floor((meta.width - size) / 2));
  let top = Math.max(0, Math.floor((meta.height * focusY) - (size / 2)));
  if (top + size > meta.height) top = meta.height - size;
  if (top < 0) top = 0;

  const cropped = await sharp(buf)
    .extract({ left, top, width: size, height: size })
    .resize(256, 256, { fit: 'cover' })
    .png({ quality: 90 })
    .toBuffer();

  const destPng = path.join(OUT_DIR, `${slug}.png`);
  const destWebp = path.join(OUT_DIR, `${slug}.webp`);
  await sharp(cropped).toFile(destPng);
  await sharp(cropped).webp({ quality: 90 }).toFile(destWebp);
  console.log(`[OK] Saved avatar for ${slug}`);
}

const charactersToFetch = [
  // Darling in the Franxx
  { wiki: 'darling-in-the-franxx', title: 'Zero Two', slug: 'zero-two', focusY: 0.35 },
  { wiki: 'darling-in-the-franxx', title: 'Hiro', slug: 'hiro', focusY: 0.32 },
  { wiki: 'darling-in-the-franxx', title: 'Ichigo', slug: 'ichigo', focusY: 0.35 },
  { wiki: 'darling-in-the-franxx', title: 'Goro', slug: 'goro', focusY: 0.33 },
  { wiki: 'darling-in-the-franxx', title: 'Kokoro', slug: 'kokoro', focusY: 0.35 },
  { wiki: 'darling-in-the-franxx', title: 'Mitsuru', slug: 'mitsuru', focusY: 0.33 },
  { wiki: 'darling-in-the-franxx', title: 'Zorome', slug: 'zorome', focusY: 0.33 },
  { wiki: 'darling-in-the-franxx', title: 'Miku', slug: 'miku', focusY: 0.35 },
  { wiki: 'darling-in-the-franxx', title: 'Ikuno', slug: 'ikuno', focusY: 0.35 },
  { wiki: 'darling-in-the-franxx', title: 'Futoshi', slug: 'futoshi', focusY: 0.35 },

  // Blue Box
  { wiki: 'blue-box', title: 'Taiki Inomata', slug: 'taiki-inomata', focusY: 0.32 },
  { wiki: 'blue-box', title: 'Chinatsu Kano', slug: 'chinatsu-kano', focusY: 0.33 },
  { wiki: 'blue-box', title: 'Hina Chono', slug: 'hina-chono', focusY: 0.35 },
  { wiki: 'blue-box', title: 'Kyo Kasahara', slug: 'kyo-kasahara', focusY: 0.33 },
  { wiki: 'blue-box', title: 'Karen Matsuoka', slug: 'karen-matsuoka', focusY: 0.35 }
];

async function main() {
  for (const item of charactersToFetch) {
    const thumb = await getWikiThumbnail(item.wiki, item.title);
    if (thumb) {
      await downloadAndCrop(thumb, item.slug, item.focusY, item.wiki);
    } else {
      console.warn(`[WARN] Thumbnail not found for ${item.title}`);
    }
  }
}

main().catch(console.error);
