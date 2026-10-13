const fs = require('fs');
const path = require('path');
const { searchTenor, downloadBuffer, processGifToSingleTakeWebp } = require('./scene_utils.cjs');

const opTargets = [
  { id: 'page-one', queries: ['page one one piece dino', 'page one one piece anime', 'page one tobi roppo'] },
  { id: 'doc-q', queries: ['doc q one piece horse', 'doc q blackbeard pirates', 'doc q stronger'] },
  { id: 'yasopp', queries: ['yasopp red hair pirates anime', 'yasopp one piece sniper', 'yasopp film red'] },
  { id: 'lucky-roux', queries: ['lucky roux one piece anime', 'lucky roux meat', 'lucky roux red hair'] },
  { id: 'denjiro', queries: ['denjiro one piece scabbards', 'kyoshiro wano anime', 'denjiro sword'] },
  { id: 'ashura-doji', queries: ['ashura doji one piece', 'shutenmaru wano anime', 'ashura doji sword'] },
  { id: 'inuarashi', queries: ['inuarashi sulong anime', 'inuarashi one piece wano', 'dogstorm one piece'] },
  { id: 'shinobu', queries: ['shinobu wano anime', 'shinobu ninja one piece', 'shinobu jutsu'] },
  { id: 'kurozumi-orochi', queries: ['kurozumi orochi anime', 'orochi yamata no orochi', 'orochi wano'] },
  { id: 'pedro', queries: ['pedro mink electro anime', 'pedro one piece whole cake', 'pedro mink'] },
  { id: 'moria-gecko', queries: ['gecko moria shadow asgard', 'gecko moria thriller bark', 'gecko moria one piece'] },
  { id: 'shiki', queries: ['shiki golden lion anime', 'shiki strong world', 'shiki floating'] },
  { id: 'vinsmoke-niji', queries: ['vinsmoke niji stealth black', 'niji germa 66 anime', 'niji electro'] },
  { id: 'vinsmoke-yonji', queries: ['vinsmoke yonji winchin green', 'yonji germa 66 anime', 'yonji arm'] },
  { id: 'baby-5', queries: ['baby 5 weapon weapon fruit', 'baby 5 dressrosa anime', 'baby 5 buki buki'] },
  { id: 'sugar', queries: ['sugar hobi hobi no mi', 'sugar dressrosa anime', 'sugar toy toy'] },
  { id: 'viola', queries: ['viola gyro gyro anime', 'viola dressrosa one piece', 'violet one piece'] },
  { id: 'cavendish', queries: ['cavendish hakuba durandal anime', 'cavendish dressrosa', 'hakuba one piece'] },
  { id: 'kyros', queries: ['kyros one piece dressrosa', 'kyros thunder bagua', 'kyros sword'] },
  { id: 'rebecca', queries: ['rebecca gladiator dressrosa anime', 'rebecca sword one piece', 'rebecca dressrosa'] },
  { id: 'sai', queries: ['sai hasshoken one piece', 'sai dressrosa anime', 'don sai hasshoken'] },
  { id: 'elizabello-ii', queries: ['elizabello king punch', 'elizabello ii dressrosa', 'king punch one piece'] },
  { id: 'leo', queries: ['leo tontatta nui nui anime', 'leo dwarf dressrosa', 'leo tontatta'] },
  { id: 'chaka', queries: ['chaka jackal alabasta', 'chaka alabasta anime', 'chaka inu inu'] },
  { id: 'wapol', queries: ['wapol baku baku no mi anime', 'wapol drum island', 'wapol mouth'] },
  { id: 'dalton', queries: ['dalton ushi ushi drum island anime', 'dalton drum island', 'dalton bisao'] },
  { id: 'brogy', queries: ['brogy giant elbaf anime', 'brogy little garden', 'brogy elbaf'] },
  { id: 'krieg-don', queries: ['don krieg baratie anime', 'don krieg mhs', 'don krieg armor'] },
  { id: 'hatchan', queries: ['hatchan arlong park anime', 'hatchan takoyaki', 'hachi octopus'] },
  { id: 'wiper', queries: ['wiper reject dial skypiea anime', 'wiper shandia', 'wiper bazooka'] },
  { id: 'spandam', queries: ['spandam cp9 enies lobby anime', 'spandam funkfreed', 'spandam buster call'] },
  { id: 'foxy', queries: ['foxy noro noro beam anime', 'foxy split head', 'foxy pirates'] },
  { id: 'ryuma', queries: ['ryuma zombie shusui anime', 'ryuma thriller bark', 'shimotsuki ryuma'] },
  { id: 'oars', queries: ['oars thriller bark anime', 'oars oars jr', 'oars giant'] },
  { id: 'hody-jones', queries: ['hody jones energy steroid anime', 'hody jones fishman island', 'hody jones shark'] }
];

async function run() {
  console.log(`Starting One Piece single-take scenes processing (${opTargets.length} characters)...`);
  let successCount = 0;

  for (let idx = 0; idx < opTargets.length; idx++) {
    const t = opTargets[idx];
    console.log(`\n[${idx + 1}/${opTargets.length}] === Processing One Piece / ${t.id} ===`);
    const outPath = path.join('public/scenes/one-piece', `${t.id}.webp`);
    let success = false;

    for (const q of t.queries) {
      try {
        console.log(`Searching: "${q}"...`);
        const urls = await searchTenor(q);
        console.log(`Found ${urls.length} candidate URLs.`);

        for (const url of urls.slice(0, 3)) {
          try {
            console.log(`Downloading ${url}...`);
            const buf = await downloadBuffer(url);
            const frames = await processGifToSingleTakeWebp(buf, outPath);
            if (frames >= 12) {
              console.log(`[SUCCESS] ${t.id} generated with ${frames} continuous frames.`);
              success = true;
              successCount++;
              break;
            }
          } catch (err) {
            console.log(`Frame processing error: ${err.message}`);
          }
        }
        if (success) break;
      } catch (err) {
        console.log(`Search error: ${err.message}`);
      }
    }

    if (!success) {
      console.warn(`[RETAINED] No suitable fresh continuous clip found for ${t.id}. Keeping current asset.`);
    }
  }

  console.log(`\n=== One Piece processing complete. ${successCount}/${opTargets.length} updated. ===`);
}

run();
