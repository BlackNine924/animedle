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
    const hd = 'https://media1.tenor.com/m/' + m[1] + 'AAAAC/' + m[2] + '.gif';
    if (!matches.includes(hd)) matches.push(hd);
  }
  return matches;
}

/**
 * Converte um buffer de GIF em frames individuais e extrai o maior bloco de tomada única contínua (sem cortes bruscos).
 */
async function processGifToSingleTakeWebp(gifBuf, outPath) {
  const metadata = await sharp(gifBuf).metadata();
  const pages = metadata.pages || 1;
  const pageHeight = metadata.pageHeight || metadata.height;
  const width = metadata.width;

  if (pages < 10) {
    throw new Error('GIF has too few frames: ' + pages);
  }

  // Extrair frames
  const frameBuffers = [];
  for (let i = 0; i < pages; i++) {
    const frame = await sharp(gifBuf, { page: i })
      .resize(480, 270, { fit: 'cover' })
      .ensureAlpha()
      .raw()
      .toBuffer();
    frameBuffers.push(frame);
  }

  // Detectar cortes bruscos (hard cuts) comparando pixels entre frames consecutivos
  const cuts = [0];
  const threshold = 65; // limiar de diferença média por canal

  for (let i = 0; i < frameBuffers.length - 1; i++) {
    const f1 = frameBuffers[i];
    const f2 = frameBuffers[i + 1];
    let diffSum = 0;
    const sampleStep = 32; // amostragem rápida
    let samples = 0;

    for (let p = 0; p < f1.length; p += sampleStep * 4) {
      diffSum += Math.abs(f1[p] - f2[p]) + Math.abs(f1[p+1] - f2[p+1]) + Math.abs(f1[p+2] - f2[p+2]);
      samples++;
    }
    const avgDiff = diffSum / (samples * 3);
    if (avgDiff > threshold) {
      cuts.push(i + 1);
    }
  }
  cuts.push(frameBuffers.length);

  // Encontrar o maior segmento contínuo
  let bestStart = 0;
  let bestEnd = frameBuffers.length;
  let maxLen = 0;

  for (let c = 0; c < cuts.length - 1; c++) {
    const len = cuts[c+1] - cuts[c];
    if (len > maxLen) {
      maxLen = len;
      bestStart = cuts[c];
      bestEnd = cuts[c+1];
    }
  }

  let selectedFrames = frameBuffers.slice(bestStart, bestEnd);
  // Se o segmento contínuo tiver menos de 16 frames e o GIF total tinha mais, ajusta
  if (selectedFrames.length < 16 && frameBuffers.length >= 16) {
    selectedFrames = frameBuffers.slice(0, Math.min(frameBuffers.length, 45));
  }

  // Limitar a no máximo 50 frames para manter tamanho leve (< 2MB)
  if (selectedFrames.length > 50) {
    selectedFrames = selectedFrames.slice(0, 50);
  }

  const N = selectedFrames.length;
  const combinedRaw = Buffer.concat(selectedFrames);

  await sharp(combinedRaw, {
    raw: {
      width: 480,
      height: 270 * N,
      channels: 4,
      pageHeight: 270
    }
  })
  .webp({
    quality: 78,
    delay: Array(N).fill(83), // 12 fps
    loop: 0
  })
  .toFile(outPath);

  console.log('Saved single-take scene:', outPath, 'Frames:', N);
  return N;
}

module.exports = {
  searchTenor,
  downloadBuffer,
  processGifToSingleTakeWebp
};
