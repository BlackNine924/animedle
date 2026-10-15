const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadBuffer(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function searchTenor(query) {
  const html = await fetchJson('https://tenor.com/search/' + encodeURIComponent(query) + '-gifs');
  const regex = /https:\/\/media\.tenor\.com\/([A-Za-z0-9_-]+)AAAAM\/([A-Za-z0-9_-]+)\.gif/g;
  const matches = [];
  let m;
  while ((m = regex.exec(html)) !== null) {
    const slug = m[2].toLowerCase();
    const url = 'https://media1.tenor.com/m/' + m[1] + 'AAAAC/' + m[2] + '.gif';
    if (!matches.some(x => x.url === url)) {
      matches.push({ slug, url });
    }
  }
  return matches;
}

/**
 * Cria uma folha de contato (contact sheet) em grade com os frames do GIF para visualização
 */
async function createContactSheet(frames, outPath, cols = 6) {
  const thumbWidth = 160;
  const thumbHeight = 90;
  const rows = Math.ceil(frames.length / cols);

  const resizedThumbs = [];
  for (let i = 0; i < frames.length; i++) {
    const thumb = await sharp(frames[i])
      .resize(thumbWidth, thumbHeight, { fit: 'cover' })
      .toBuffer();
    resizedThumbs.push({
      input: thumb,
      left: (i % cols) * thumbWidth,
      top: Math.floor(i / cols) * thumbHeight
    });
  }

  await sharp({
    create: {
      width: cols * thumbWidth,
      height: rows * thumbHeight,
      channels: 4,
      background: { r: 15, g: 23, b: 42, alpha: 1 }
    }
  })
  .composite(resizedThumbs)
  .jpeg({ quality: 85 })
  .toFile(outPath);
}

/**
 * Monta o WebP final animado de uma lista de frames selecionada
 */
async function assembleWebp(frameBuffers, outPath, delay = 83) {
  const N = frameBuffers.length;
  const rawBuffers = [];
  for (const f of frameBuffers) {
    const raw = await sharp(f)
      .resize(480, 270, { fit: 'cover' })
      .ensureAlpha()
      .raw()
      .toBuffer();
    rawBuffers.push(raw);
  }

  const combinedRaw = Buffer.concat(rawBuffers);
  await sharp(combinedRaw, {
    raw: {
      width: 480,
      height: 270 * N,
      channels: 4,
      pageHeight: 270
    }
  })
  .webp({
    quality: 82,
    delay: Array(N).fill(delay),
    loop: 0
  })
  .toFile(outPath);
}

module.exports = {
  fetchJson,
  downloadBuffer,
  searchTenor,
  createContactSheet,
  assembleWebp
};
