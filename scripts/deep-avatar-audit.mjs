import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';

async function runAudit() {
  const animesDir = path.resolve('src/data/animes');
  const animes = fs.readdirSync(animesDir).filter(f => fs.statSync(path.join(animesDir, f)).isDirectory());

  const fileMap = new Map();
  const allCharacters = [];

  for (const a of animes) {
    const jsonPath = path.join(animesDir, a, 'characters.json');
    if (!fs.existsSync(jsonPath)) continue;
    const chars = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    for (const c of chars) {
      allCharacters.push({ anime: a, char: c });
      const avatarRel = c.avatar.startsWith('/') ? c.avatar.slice(1) : c.avatar;
      const fullPath = path.resolve('public', avatarRel);

      if (!fs.existsSync(fullPath)) {
        console.log(`[MISSING_FILE] ${a} -> ${c.name}: ${fullPath}`);
        continue;
      }

      const fileBuffer = fs.readFileSync(fullPath);
      const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');

      if (!fileMap.has(hash)) {
        fileMap.set(hash, []);
      }
      fileMap.get(hash).push({
        anime: a,
        id: c.id,
        name: c.name,
        avatar: c.avatar,
        fullPath,
        size: fileBuffer.length
      });
    }
  }

  console.log(`Audited ${allCharacters.length} total character entries across ${animes.length} animes.\n`);

  // 1. DUPLICATE IMAGES
  console.log('====================================================');
  console.log('1. EXACT DUPLICATE IMAGES (Identical image content)');
  console.log('====================================================');
  const duplicateGroups = [];
  for (const [hash, group] of fileMap.entries()) {
    if (group.length > 1) {
      duplicateGroups.push(group);
      console.log(`Group (${group.length} characters) [Hash: ${hash.slice(0, 8)}...]:`);
      for (const item of group) {
        console.log(`   - ${item.name} (${item.anime}) -> ${item.avatar}`);
      }
    }
  }
  console.log(`Total duplicate image groups found: ${duplicateGroups.length}\n`);

  // 2. NAME MISMATCH / SUSPICIOUS FILENAMES (e.g. Ochako in Chaka, Niko in Sakura)
  console.log('====================================================');
  console.log('2. SUSPICIOUS AVATAR PATHS & MISMATCHES');
  console.log('====================================================');
  const suspiciousList = [];
  for (const { anime, char } of allCharacters) {
    const fileName = path.basename(char.avatar, path.extname(char.avatar)).toLowerCase();
    const charName = char.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanFile = fileName.replace(/[^a-z0-9]/g, '');

    // Check if filename belongs to another known anime or character
    if (anime === 'one-piece' && cleanFile.includes('ochako')) {
      suspiciousList.push({ name: char.name, anime, avatar: char.avatar, reason: 'Contains Ochako (MHA)' });
    }
    if (char.name.includes('Sakura') && cleanFile.includes('niko')) {
      suspiciousList.push({ name: char.name, anime, avatar: char.avatar, reason: 'Contains Niko' });
    }
    if (char.name.includes('Subaru') && cleanFile.includes('niko')) {
      suspiciousList.push({ name: char.name, anime, avatar: char.avatar, reason: 'Contains Niko' });
    }
  }
  for (const s of suspiciousList) {
    console.log(`   - ${s.name} (${s.anime}): ${s.avatar} [${s.reason}]`);
  }

  // 3. FLAT / ARTIFICIAL COLOR BACKGROUND DETECTION
  console.log('\n====================================================');
  console.log('3. FLAT / ARTIFICIAL BACKGROUND AUDIT (Pure black or white borders)');
  console.log('====================================================');
  const flatBgCandidates = [];
  for (const { anime, char } of allCharacters) {
    const avatarRel = char.avatar.startsWith('/') ? char.avatar.slice(1) : char.avatar;
    const fullPath = path.resolve('public', avatarRel);
    if (!fs.existsSync(fullPath)) continue;

    try {
      const { data, info } = await sharp(fullPath).raw().toBuffer({ resolveWithObject: true });
      const width = info.width;
      const height = info.height;
      const channels = info.channels;

      // Check corner pixels (top-left, top-right, bottom-left, bottom-right)
      const corners = [
        0, // top-left
        (width - 1) * channels, // top-right
        ((height - 1) * width) * channels, // bottom-left
        ((height - 1) * width + (width - 1)) * channels // bottom-right
      ];

      let blackCorners = 0;
      let whiteCorners = 0;

      for (const idx of corners) {
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        if (r < 15 && g < 15 && b < 15) blackCorners++;
        if (r > 240 && g > 240 && b > 240) whiteCorners++;
      }

      if (blackCorners >= 3) {
        flatBgCandidates.push({ name: char.name, anime, avatar: char.avatar, issue: 'Fundo preto artificial / chapado nos 4 cantos' });
      } else if (whiteCorners >= 3) {
        flatBgCandidates.push({ name: char.name, anime, avatar: char.avatar, issue: 'Fundo branco puro / estúdio recortado nos 4 cantos' });
      }
    } catch (e) {
      // ignore
    }
  }

  console.log(`Total avatars with flat/artificial border detected: ${flatBgCandidates.length}`);
  fs.writeFileSync('audit-flat-bgs.json', JSON.stringify(flatBgCandidates, null, 2));

  // 4. SAVE COMPLETE AUDIT REPORT
  const report = {
    totalChecked: allCharacters.length,
    duplicateGroups,
    suspiciousList,
    flatBgCount: flatBgCandidates.length,
    flatBgCandidates: flatBgCandidates.slice(0, 100) // sample
  };
  fs.writeFileSync('audit-summary.json', JSON.stringify(report, null, 2));
  console.log('\nAudit complete! Wrote audit-summary.json and audit-flat-bgs.json.');
}

runAudit();
