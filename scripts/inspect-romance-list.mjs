import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const chars = JSON.parse(fs.readFileSync('src/data/animes/romance/characters.json'));

async function inspectRomanceFraming() {
  console.log(`Inspecting ${chars.length} romance characters...`);
  // Let's check which characters from the same series as Chitoge (Nisekoi) or others might have high crops:
  const nisekoi = chars.filter(c => c.origin?.toLowerCase().includes('nisekoi'));
  console.log('Nisekoi chars:', nisekoi.map(c => c.id));

  // Let's also check all characters in Romance to see their current images:
  const list = [];
  for (const c of chars) {
    list.push({ id: c.id, name: c.name, origin: c.origin });
  }
  console.log('Total romance characters:', list.length);
}

inspectRomanceFraming();
