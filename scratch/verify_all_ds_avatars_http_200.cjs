const fs = require('fs');

async function verifyDSAvatarsHTTP() {
  const dsPath = 'src/data/animes/demon-slayer/characters.json';
  const chars = JSON.parse(fs.readFileSync(dsPath, 'utf8'));

  console.log(`=== HTTP 200 CHECK FOR ALL ${chars.length} DEMON SLAYER AVATARS ===`);

  let brokenCount = 0;
  for (let c of chars) {
    if (!c.avatar || !c.avatar.startsWith('http')) {
      console.error(`❌ [INVALID URL FORMAT] ${c.id} (${c.name}): ${c.avatar}`);
      brokenCount++;
      continue;
    }

    try {
      const res = await fetch(c.avatar, { method: 'HEAD' });
      if (res.status !== 200) {
        console.error(`❌ [HTTP ${res.status}] ${c.id} (${c.name}): ${c.avatar}`);
        brokenCount++;
      } else {
        console.log(`✓ [200 OK] ${c.id} (${c.name})`);
      }
    } catch (err) {
      console.error(`❌ [FETCH ERROR] ${c.id} (${c.name}): ${err.message}`);
      brokenCount++;
    }
  }

  if (brokenCount === 0) {
    console.log('\n🎉 ALL 76 DEMON SLAYER AVATARS ARE 100% VALID HTTP 200 OK!');
  } else {
    console.error(`\n❌ Found ${brokenCount} broken avatar URLs.`);
  }
}

verifyDSAvatarsHTTP().catch(console.error);
