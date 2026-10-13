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

async function searchTenorFiltered(query, allowedKeywords) {
  const html = await fetchJson('https://tenor.com/search/' + encodeURIComponent(query) + '-gifs');
  const regex = /https:\/\/media\.tenor\.com\/([A-Za-z0-9_-]+)AAAAM\/([A-Za-z0-9_-]+)\.gif/g;
  const matches = [];
  let m;
  while ((m = regex.exec(html)) !== null) {
    const slug = m[2].toLowerCase();
    const matchesKeyword = allowedKeywords.some(kw => slug.includes(kw.toLowerCase()));
    if (matchesKeyword) {
      matches.push({
        slug,
        url: 'https://media1.tenor.com/m/' + m[1] + 'AAAAC/' + m[2] + '.gif'
      });
    }
  }
  return matches;
}

/**
 * Processa um buffer e garante estritamente que a saída é UMA ÚNICA TOMADA CONTÍNUA,
 * sem nenhum corte brusco no meio do clipe.
 */
async function processGifStrictSingleTake(gifBuf, outPath) {
  const metadata = await sharp(gifBuf).metadata();
  const pages = metadata.pages || 1;

  if (pages < 12) {
    throw new Error('Too few frames: ' + pages);
  }

  // 1. Extrair todos os frames redimensionados para 480x270
  const frameBuffers = [];
  for (let i = 0; i < pages; i++) {
    const frame = await sharp(gifBuf, { page: i })
      .resize(480, 270, { fit: 'cover' })
      .ensureAlpha()
      .raw()
      .toBuffer();
    frameBuffers.push(frame);
  }

  // 2. Detectar cortes bruscos (hard cuts)
  const cuts = [0];
  const sampleStep = 16;
  const cutThreshold = 52;

  for (let i = 0; i < frameBuffers.length - 1; i++) {
    const f1 = frameBuffers[i];
    const f2 = frameBuffers[i + 1];
    let diff = 0;
    let samples = 0;

    for (let p = 0; p < f1.length; p += sampleStep * 4) {
      diff += Math.abs(f1[p] - f2[p]) + Math.abs(f1[p + 1] - f2[p + 1]) + Math.abs(f1[p + 2] - f2[p + 2]);
      samples++;
    }
    const avgDiff = diff / (samples * 3);
    if (avgDiff > cutThreshold) {
      cuts.push(i + 1);
    }
  }
  cuts.push(frameBuffers.length);

  // 3. Escolher o MAIOR segmento contínuo único
  let bestStart = 0;
  let bestEnd = frameBuffers.length;
  let maxLen = 0;

  for (let c = 0; c < cuts.length - 1; c++) {
    const len = cuts[c + 1] - cuts[c];
    if (len > maxLen) {
      maxLen = len;
      bestStart = cuts[c];
      bestEnd = cuts[c + 1];
    }
  }

  if (maxLen < 14) {
    throw new Error(`Longest continuous segment has only ${maxLen} frames (minimum is 14)`);
  }

  let selectedFrames = frameBuffers.slice(bestStart, bestEnd);

  if (selectedFrames.length > 48) {
    selectedFrames = selectedFrames.slice(0, 48);
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
    quality: 80,
    delay: Array(N).fill(83),
    loop: 0
  })
  .toFile(outPath);

  return N;
}

const list = [
  // --- JJK (1) ---
  {
    anime: 'jujutsu-kaisen',
    id: 'reggie-star',
    directUrl: 'https://static.wikia.nocookie.net/jujutsu-kaisen/images/1/14/Reggie_attacks_Megumi_%28Anime%29.gif/revision/latest?cb=20260314195626'
  },

  // --- NARUTO (29) ---
  { anime: 'naruto', id: 'might-guy', queries: [{ q: 'might guy asakujaku naruto', kw: ['guy', 'asakujaku', 'hirudora'] }, { q: 'guy sensei naruto punch', kw: ['guy'] }] },
  { anime: 'naruto', id: 'kimimaro', queries: [{ q: 'tsubaki no mai kimimaro', kw: ['kimimaro'] }, { q: 'kimimaro naruto bone', kw: ['kimimaro'] }] },
  { anime: 'naruto', id: 'rasa', queries: [{ q: 'gold dust naruto', kw: ['gold-dust', 'kazekage', 'rasa'] }, { q: 'fourth kazekage naruto', kw: ['kazekage', 'rasa'] }] },
  { anime: 'naruto', id: 'izuna-uchiha', queries: [{ q: 'izuna uchiha naruto', kw: ['izuna'] }, { q: 'izuna madara uchiha', kw: ['izuna'] }] },
  { anime: 'naruto', id: 'ginkaku', queries: [{ q: 'ginkaku kinkaku naruto', kw: ['ginkaku', 'kinkaku'] }] },
  { anime: 'naruto', id: 'yugito-nii', queries: [{ q: 'yugito nii matatabi naruto', kw: ['yugito', 'matatabi'] }, { q: 'yugito naruto', kw: ['yugito'] }] },
  { anime: 'naruto', id: 'jinin-akebino', queries: [{ q: 'kabutowari naruto', kw: ['swordsmen', 'kabutowari', 'jinin'] }, { q: 'seven swordsmen naruto', kw: ['swordsmen', 'mist'] }] },
  { anime: 'naruto', id: 'fuguki-suikazan', queries: [{ q: 'fuguki suikazan naruto', kw: ['fuguki', 'samehada'] }] },
  { anime: 'naruto', id: 'juzo-biwa', queries: [{ q: 'juzo biwa kubikiribocho naruto', kw: ['juzo'] }, { q: 'juzo naruto', kw: ['juzo'] }] },
  { anime: 'naruto', id: 'gari', queries: [{ q: 'gari bakuton naruto', kw: ['gari', 'bakuton'] }, { q: 'gari explosion release naruto', kw: ['gari'] }] },
  { anime: 'naruto', id: 'shikaku-nara', queries: [{ q: 'shikaku nara naruto', kw: ['shikaku'] }, { q: 'shikaku shadow naruto', kw: ['shikaku'] }] },
  { anime: 'naruto', id: 'inoichi-yamanaka', queries: [{ q: 'inoichi yamanaka naruto', kw: ['inoichi', 'shinranshin'] }] },
  { anime: 'naruto', id: 'choza-akimichi', queries: [{ q: 'choza akimichi naruto', kw: ['choza'] }, { q: 'choza naruto', kw: ['choza'] }] },
  { anime: 'naruto', id: 'hizashi-hyuuga', queries: [{ q: 'hizashi hyuga naruto', kw: ['hizashi'] }] },
  { anime: 'naruto', id: 'hanabi-hyuuga', queries: [{ q: 'hanabi hyuga naruto', kw: ['hanabi'] }] },
  { anime: 'naruto', id: 'shizune', queries: [{ q: 'shizune naruto', kw: ['shizune'] }] },
  { anime: 'naruto', id: 'hayate-gekko', queries: [{ q: 'hayate gekko naruto', kw: ['hayate'] }] },
  { anime: 'naruto', id: 'izumo-kamizuki', queries: [{ q: 'izumo kamizuki naruto', kw: ['izumo'] }] },
  { anime: 'naruto', id: 'kotetsu-hagane', queries: [{ q: 'kotetsu hagane naruto', kw: ['kotetsu'] }] },
  { anime: 'naruto', id: 'ebisu', queries: [{ q: 'ebisu sensei naruto', kw: ['ebisu'] }] },
  { anime: 'naruto', id: 'rin-nohara', queries: [{ q: 'rin nohara naruto', kw: ['rin'] }] },
  { anime: 'naruto', id: 'omoi', queries: [{ q: 'omoi naruto sword', kw: ['omoi'] }] },
  { anime: 'naruto', id: 'samui', queries: [{ q: 'samui naruto', kw: ['samui'] }] },
  { anime: 'naruto', id: 'dodai', queries: [{ q: 'dodai naruto rubber', kw: ['dodai'] }] },
  { anime: 'naruto', id: 'ao', queries: [{ q: 'ao byakugan naruto', kw: ['ao-byakugan', 'ao-naruto'] }] },
  { anime: 'naruto', id: 'akatsuchi', queries: [{ q: 'akatsuchi naruto', kw: ['akatsuchi'] }] },
  { anime: 'naruto', id: 'shima', queries: [{ q: 'fukasaku shima naruto sage', kw: ['fukasaku', 'shima', 'toad'] }] },
  { anime: 'naruto', id: 'enma', queries: [{ q: 'monkey king enma naruto', kw: ['enma', 'hiruzen', 'staff'] }] },
  { anime: 'naruto', id: 'akamaru', queries: [{ q: 'akamaru naruto', kw: ['akamaru'] }] },

  // --- ONE PIECE (26) ---
  { anime: 'one-piece', id: 'page-one', queries: [{ q: 'page one one piece dinosaur', kw: ['page-one', 'spino'] }] },
  { anime: 'one-piece', id: 'doc-q', queries: [{ q: 'doc q one piece', kw: ['doc-q', 'stronger'] }] },
  { anime: 'one-piece', id: 'yasopp', queries: [{ q: 'yasopp one piece red hair', kw: ['yasopp'] }] },
  { anime: 'one-piece', id: 'lucky-roux', queries: [{ q: 'lucky roux one piece', kw: ['lucky-roux'] }] },
  { anime: 'one-piece', id: 'denjiro', queries: [{ q: 'denjiro one piece scabbard', kw: ['denjiro', 'kyoshiro'] }] },
  { anime: 'one-piece', id: 'inuarashi', queries: [{ q: 'inuarashi one piece sulong', kw: ['inuarashi', 'dogstorm'] }] },
  { anime: 'one-piece', id: 'shinobu', queries: [{ q: 'shinobu one piece ninja', kw: ['shinobu'] }] },
  { anime: 'one-piece', id: 'kurozumi-orochi', queries: [{ q: 'kurozumi orochi one piece', kw: ['orochi'] }] },
  { anime: 'one-piece', id: 'shiki', queries: [{ q: 'shiki golden lion one piece', kw: ['shiki', 'strong-world'] }] },
  { anime: 'one-piece', id: 'vinsmoke-yonji', queries: [{ q: 'yonji germa 66 one piece', kw: ['yonji', 'germa'] }] },
  { anime: 'one-piece', id: 'baby-5', queries: [{ q: 'baby 5 one piece dressrosa', kw: ['baby-5', 'baby5'] }] },
  { anime: 'one-piece', id: 'sugar', queries: [{ q: 'sugar dressrosa one piece', kw: ['sugar'] }] },
  { anime: 'one-piece', id: 'viola', queries: [{ q: 'viola dressrosa one piece', kw: ['viola', 'violet'] }] },
  { anime: 'one-piece', id: 'cavendish', queries: [{ q: 'cavendish durandal one piece', kw: ['cavendish', 'hakuba'] }] },
  { anime: 'one-piece', id: 'sai', queries: [{ q: 'sai hasshoken one piece', kw: ['sai', 'hasshoken'] }] },
  { anime: 'one-piece', id: 'elizabello-ii', queries: [{ q: 'elizabello king punch one piece', kw: ['elizabello', 'king-punch'] }] },
  { anime: 'one-piece', id: 'leo', queries: [{ q: 'leo tontatta dressrosa one piece', kw: ['leo', 'tontatta'] }] },
  { anime: 'one-piece', id: 'chaka', queries: [{ q: 'chaka alabasta one piece', kw: ['chaka'] }] },
  { anime: 'one-piece', id: 'wapol', queries: [{ q: 'wapol drum island one piece', kw: ['wapol'] }] },
  { anime: 'one-piece', id: 'dalton', queries: [{ q: 'dalton drum island one piece', kw: ['dalton'] }] },
  { anime: 'one-piece', id: 'krieg-don', queries: [{ q: 'don krieg baratie one piece', kw: ['krieg'] }] },
  { anime: 'one-piece', id: 'hatchan', queries: [{ q: 'hatchan arlong park one piece', kw: ['hatchan', 'hachi'] }] },
  { anime: 'one-piece', id: 'wiper', queries: [{ q: 'wyper wiper skypiea one piece', kw: ['wiper', 'wyper'] }] },
  { anime: 'one-piece', id: 'spandam', queries: [{ q: 'spandam enies lobby cp9 one piece', kw: ['spandam'] }] },
  { anime: 'one-piece', id: 'ryuma', queries: [{ q: 'ryuma thriller bark one piece', kw: ['ryuma'] }] },
  { anime: 'one-piece', id: 'hody-jones', queries: [{ q: 'hody jones fishman island one piece', kw: ['hody', 'jones'] }] }
];

async function run() {
  console.log(`Starting Canon Scene Replacement (${list.length} scenes)...`);
  let successes = 0;

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const outPath = path.join('public/scenes', item.anime, `${item.id}.webp`);
    console.log(`\n[${i + 1}/${list.length}] Processing ${item.anime} / ${item.id}...`);

    let done = false;

    if (item.directUrl) {
      try {
        console.log(`  Downloading direct URL: ${item.directUrl}`);
        const buf = await downloadBuffer(item.directUrl);
        const frames = await processGifStrictSingleTake(buf, outPath);
        console.log(`  --> SUCCESS! Generated with ${frames} frames.`);
        done = true;
        successes++;
      } catch (err) {
        console.log(`  Direct download error: ${err.message}`);
      }
    }

    if (!done && item.queries) {
      for (const qObj of item.queries) {
        try {
          console.log(`  Searching: "${qObj.q}" with keywords: [${qObj.kw.join(', ')}]...`);
          const results = await searchTenorFiltered(qObj.q, qObj.kw);
          console.log(`  Found ${results.length} keyword-verified GIFs.`);

          for (const cand of results.slice(0, 4)) {
            try {
              console.log(`    Fetching ${cand.slug} (${cand.url})...`);
              const buf = await downloadBuffer(cand.url);
              const frames = await processGifStrictSingleTake(buf, outPath);
              console.log(`    --> SUCCESS! Saved strictly single continuous take with ${frames} frames.`);
              done = true;
              successes++;
              break;
            } catch (err) {
              console.log(`    --> Skip (${err.message})`);
            }
          }

          if (done) break;
        } catch (err) {
          console.log(`  Search error: ${err.message}`);
        }
      }
    }

    if (!done) {
      console.warn(`  --> [PRESERVED] Could not find fresh keyword-matched continuous cut for ${item.id}. Retaining existing file.`);
    }
  }

  console.log(`\n=== Finished Canon Scene Replacement! Generated ${successes}/${list.length} scenes. ===`);
}

run();
