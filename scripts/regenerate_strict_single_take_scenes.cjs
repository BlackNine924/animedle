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
 * Processa um GIF e extrai EXCLUSIVAMENTE uma única tomada contínua (single continuous take),
 * sem nenhum corte brusco (hard cut) no meio do clipe final.
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

  // 2. Detectar cortes bruscos (hard cuts) comparando variação média de pixels entre frames vizinhos
  const cuts = [0];
  const sampleStep = 16; // amostragem refinada
  const cutThreshold = 55; // limiar de detecção de corte de câmera/cena

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

  // 3. Escolher o MAIOR segmento contínuo único (Single Continuous Take)
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

  // Se o maior segmento contínuo for menor que 14 frames, rejeita esse GIF para buscar um melhor
  if (maxLen < 14) {
    throw new Error(`Longest continuous segment has only ${maxLen} frames (minimum is 14)`);
  }

  let selectedFrames = frameBuffers.slice(bestStart, bestEnd);

  // Limita a no máximo 48 frames para garantir leveza e fluidez
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
    delay: Array(N).fill(83), // 12 fps = 83ms
    loop: 0
  })
  .toFile(outPath);

  return N;
}

// Lista completa dos 56 personagens para substituição estrita
const targetScenes = [
  // --- JUJUTSU KAISEN (1) ---
  {
    anime: 'jujutsu-kaisen',
    id: 'reggie-star',
    queries: ['reggie star receipts anime', 'reggie star fight jujutsu kaisen', 'reggie star contract culling game']
  },

  // --- ONE PIECE (26) ---
  { anime: 'one-piece', id: 'page-one', queries: ['page one spino anime', 'page one dinosaur one piece', 'page one tobiroppo anime'] },
  { anime: 'one-piece', id: 'doc-q', queries: ['doc q horse anime', 'doc q blackbeard pirates anime', 'doc q stronger sick'] },
  { anime: 'one-piece', id: 'yasopp', queries: ['yasopp red hair pirates anime', 'yasopp sniper rifle anime', 'yasopp film red anime'] },
  { anime: 'one-piece', id: 'lucky-roux', queries: ['lucky roux gun anime', 'lucky roux red hair pirates anime', 'lucky roux meat anime'] },
  { anime: 'one-piece', id: 'denjiro', queries: ['denjiro sword anime', 'kyoshiro slash anime', 'denjiro wano scabbard anime'] },
  { anime: 'one-piece', id: 'inuarashi', queries: ['inuarashi sword anime', 'inuarashi sulong anime', 'dogstorm one piece anime'] },
  { anime: 'one-piece', id: 'shinobu', queries: ['shinobu ninja anime', 'shinobu wano jutsu anime', 'shinobu kite anime'] },
  { anime: 'one-piece', id: 'kurozumi-orochi', queries: ['orochi snake anime', 'kurozumi orochi heads anime', 'orochi yamata no orochi anime'] },
  { anime: 'one-piece', id: 'shiki', queries: ['shiki golden lion anime', 'shiki floating island anime', 'shiki lion sword anime'] },
  { anime: 'one-piece', id: 'vinsmoke-yonji', queries: ['yonji winchin green anime', 'vinsmoke yonji germa anime', 'yonji arm anime'] },
  { anime: 'one-piece', id: 'baby-5', queries: ['baby 5 missile anime', 'baby 5 weapon weapon anime', 'baby 5 gun dressrosa anime'] },
  { anime: 'one-piece', id: 'sugar', queries: ['sugar dressrosa anime', 'sugar hobby hobby anime', 'sugar toy toy anime'] },
  { anime: 'one-piece', id: 'viola', queries: ['viola giro giro anime', 'violet dressrosa anime', 'viola tear dance anime'] },
  { anime: 'one-piece', id: 'cavendish', queries: ['cavendish durandal anime', 'hakuba speed anime', 'cavendish sword slash anime'] },
  { anime: 'one-piece', id: 'sai', queries: ['sai hasshoken kick anime', 'don sai martial arts anime', 'sai dressrosa fight anime'] },
  { anime: 'one-piece', id: 'elizabello-ii', queries: ['elizabello king punch anime', 'elizabello punch dressrosa anime'] },
  { anime: 'one-piece', id: 'leo', queries: ['leo tontatta needle anime', 'leo stitch dressrosa anime', 'leo dwarf anime'] },
  { anime: 'one-piece', id: 'chaka', queries: ['chaka jackal sword anime', 'chaka alabasta transformation anime', 'chaka guard anime'] },
  { anime: 'one-piece', id: 'wapol', queries: ['wapol munch munch anime', 'wapol cannon mouth anime', 'wapol drum island anime'] },
  { anime: 'one-piece', id: 'dalton', queries: ['dalton bison anime', 'dalton drum island sword anime', 'dalton transformation anime'] },
  { anime: 'one-piece', id: 'krieg-don', queries: ['don krieg spear anime', 'don krieg armor baratie anime', 'don krieg mh5 anime'] },
  { anime: 'one-piece', id: 'hatchan', queries: ['hachi six swords anime', 'hatchan arlong park swords anime', 'hatchan octopus anime'] },
  { anime: 'one-piece', id: 'wiper', queries: ['wiper burn bazooka anime', 'wiper skypiea skates anime', 'wiper reject dial anime'] },
  { anime: 'one-piece', id: 'spandam', queries: ['spandam funkfreed sword anime', 'spandam elephant sword anime', 'spandam cp9 anime'] },
  { anime: 'one-piece', id: 'ryuma', queries: ['ryuma zombie slash anime', 'shimotsuki ryuma sword anime', 'ryuma thriller bark anime'] },
  { anime: 'one-piece', id: 'hody-jones', queries: ['hody jones water shot anime', 'hody jones shark bite anime', 'hody jones steroid anime'] },

  // --- NARUTO (29) ---
  { anime: 'naruto', id: 'might-guy', queries: ['might guy asakujaku anime', 'might guy hirudora anime', 'might guy dynamic entry anime'] },
  { anime: 'naruto', id: 'kimimaro', queries: ['kimimaro bone dance anime', 'kimimaro tsubaki no mai anime', 'kimimaro teshi sendan anime'] },
  { anime: 'naruto', id: 'rasa', queries: ['fourth kazekage gold dust anime', 'rasa gold dust magnet anime', 'rasa sand anime'] },
  { anime: 'naruto', id: 'izuna-uchiha', queries: ['izuna uchiha sword anime', 'izuna uchiha sharingan anime', 'izuna uchiha fireball anime'] },
  { anime: 'naruto', id: 'ginkaku', queries: ['ginkaku silver brother anime', 'ginkaku bashosen anime', 'ginkaku seven tails cloak anime'] },
  { anime: 'naruto', id: 'yugito-nii', queries: ['yugito nii two tails anime', 'yugito nii cat fire anime', 'yugito nii claws anime'] },
  { anime: 'naruto', id: 'jinin-akebino', queries: ['jinin akebino kabutowari anime', 'jinin swordsman mist anime', 'jinin axe hammer anime'] },
  { anime: 'naruto', id: 'fuguki-suikazan', queries: ['fuguki suikazan samehada anime', 'fuguki mist swordsman anime', 'fuguki hair needles anime'] },
  { anime: 'naruto', id: 'juzo-biwa', queries: ['juzo biwa kubikiribocho anime', 'juzo biwa akatsuki anime', 'juzo mist swordsman anime'] },
  { anime: 'naruto', id: 'gari', queries: ['gari explosion release anime', 'gari bakuton punch anime', 'gari iwagakure anime'] },
  { anime: 'naruto', id: 'shikaku-nara', queries: ['shikaku nara shadow anime', 'shikaku shadow neck bind anime', 'shikaku nara intelligence anime'] },
  { anime: 'naruto', id: 'inoichi-yamanaka', queries: ['inoichi yamanaka mind transfer anime', 'inoichi telepathy anime', 'inoichi perception anime'] },
  { anime: 'naruto', id: 'choza-akimichi', queries: ['choza akimichi expansion anime', 'choza bo staff anime', 'choza akimichi giant anime'] },
  { anime: 'naruto', id: 'hizashi-hyuuga', queries: ['hizashi hyuga gentle fist anime', 'hizashi byakugan palm anime', 'hizashi hyuga eight trigrams anime'] },
  { anime: 'naruto', id: 'hanabi-hyuuga', queries: ['hanabi hyuga gentle fist anime', 'hanabi byakugan rotation anime', 'hanabi hyuga palms anime'] },
  { anime: 'naruto', id: 'shizune', queries: ['shizune poison mist anime', 'shizune dokugiri anime', 'shizune senbon anime'] },
  { anime: 'naruto', id: 'hayate-gekko', queries: ['hayate gekko dance of the crescent moon anime', 'hayate sword slash anime', 'hayate gekko mikazuki anime'] },
  { anime: 'naruto', id: 'izumo-kamizuki', queries: ['izumo mizuame nabara anime', 'izumo syrup trap anime', 'izumo sword chain anime'] },
  { anime: 'naruto', id: 'kotetsu-hagane', queries: ['kotetsu conch club anime', 'kotetsu mace attack anime', 'kotetsu summon club anime'] },
  { anime: 'naruto', id: 'ebisu', queries: ['ebisu jutsu anime', 'ebisu fire release anime', 'ebisu special jonin anime'] },
  { anime: 'naruto', id: 'rin-nohara', queries: ['rin nohara medical jutsu anime', 'rin nohara chakra anime', 'rin nohara smile anime'] },
  { anime: 'naruto', id: 'omoi', queries: ['omoi cloud sword slash anime', 'omoi decapitator anime', 'omoi lightning sword anime'] },
  { anime: 'naruto', id: 'samui', queries: ['samui tanto sword anime', 'samui cloud village anime', 'samui fight anime'] },
  { anime: 'naruto', id: 'dodai', queries: ['dodai rubber wall anime', 'dodai rubber ball jutsu anime', 'dodai lava release anime'] },
  { anime: 'naruto', id: 'ao', queries: ['ao byakugan mist anime', 'ao sensor water anime', 'ao seal barrier anime'] },
  { anime: 'naruto', id: 'akatsuchi', queries: ['akatsuchi rock golem anime', 'akatsuchi stone mouth anime', 'akatsuchi iwagakure jutsu anime'] },
  { anime: 'naruto', id: 'shima', queries: ['shima frog tongue anime', 'shima fukasaku toad anime', 'shima genjutsu croak anime'] },
  { anime: 'naruto', id: 'enma', queries: ['monkey king enma staff transformation anime', 'enma adamantine staff anime', 'enma claws staff anime'] },
  { anime: 'naruto', id: 'akamaru', queries: ['akamaru gatsuga anime', 'akamaru fang over fang anime', 'akamaru dynamic marking anime'] }
];

async function run() {
  console.log(`=== Starting Strict Single-Take Generation (${targetScenes.length} scenes) ===`);
  let successes = 0;

  for (let idx = 0; idx < targetScenes.length; idx++) {
    const item = targetScenes[idx];
    const outPath = path.join('public/scenes', item.anime, `${item.id}.webp`);
    console.log(`\n[${idx + 1}/${targetScenes.length}] Target: ${item.anime} / ${item.id}`);

    let generated = false;

    for (const q of item.queries) {
      try {
        console.log(`  Query: "${q}"...`);
        const urls = await searchTenor(q);
        console.log(`  Found ${urls.length} GIFs.`);

        for (const url of urls.slice(0, 4)) {
          try {
            console.log(`    Fetching ${url}...`);
            const buf = await downloadBuffer(url);
            const frames = await processGifStrictSingleTake(buf, outPath);
            console.log(`    --> SUCCESS! Saved strictly single continuous take with ${frames} frames.`);
            generated = true;
            successes++;
            break;
          } catch (err) {
            console.log(`    --> Skip (${err.message})`);
          }
        }

        if (generated) break;
      } catch (err) {
        console.log(`  Query error: ${err.message}`);
      }
    }

    if (!generated) {
      console.warn(`  --> [WARNING] No suitable single-take found for ${item.id}. Retaining existing file.`);
    }
  }

  console.log(`\n=== Finished batch! Successfully generated ${successes}/${targetScenes.length} strict single-take scenes. ===`);
}

run();
