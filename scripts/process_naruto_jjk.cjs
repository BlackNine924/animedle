const fs = require('fs');
const path = require('path');
const { searchTenor, downloadBuffer, processGifToSingleTakeWebp } = require('./scene_utils.cjs');

async function run() {
  const targets = [
    // Naruto (substituições pedidas com tomadas únicas contínuas)
    {
      anime: 'naruto',
      id: 'might-guy',
      queries: ['might guy asakujaku anime', 'might guy eight gates anime', 'guy sensei punch anime']
    },
    {
      anime: 'naruto',
      id: 'chouji-akimichi',
      queries: ['choji butterfly mode anime', 'choji akimichi butterfly wings', 'choji nikudan sensha']
    },
    {
      anime: 'naruto',
      id: 'yahiko',
      queries: ['yahiko rain village anime', 'yahiko naruto gif', 'yahiko nagato konan anime']
    },
    // JJK (novos adicionados da nova temporada)
    {
      anime: 'jujutsu-kaisen',
      id: 'reggie-star',
      queries: ['reggie star jujutsu kaisen', 'reggie star contract jjk', 'reggie jjk']
    },
    {
      anime: 'jujutsu-kaisen',
      id: 'remi',
      queries: ['remi jujutsu kaisen', 'remi scorpion hair jjk', 'remi culling game']
    }
  ];

  for (const t of targets) {
    console.log(`\n=== Processing ${t.anime} / ${t.id} ===`);
    const outPath = path.join('public/scenes', t.anime, `${t.id}.webp`);
    let success = false;

    for (const q of t.queries) {
      try {
        console.log(`Searching query: "${q}"...`);
        const urls = await searchTenor(q);
        console.log(`Found ${urls.length} GIFs.`);

        for (const url of urls.slice(0, 4)) {
          try {
            console.log(`Downloading ${url}...`);
            const buf = await downloadBuffer(url);
            const frames = await processGifToSingleTakeWebp(buf, outPath);
            if (frames >= 12) {
              console.log(`Successfully generated ${t.id} with ${frames} continuous frames.`);
              success = true;
              break;
            }
          } catch (err) {
            console.log(`Frame error: ${err.message}`);
          }
        }
        if (success) break;
      } catch (err) {
        console.log(`Query error: ${err.message}`);
      }
    }

    if (!success) {
      console.warn(`WARNING: Could not fetch fresh clip for ${t.id}. Keeping existing if present.`);
    }
  }

  console.log('\nFinished Naruto and JJK batch.');
}

run();
