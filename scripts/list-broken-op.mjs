import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const opJsonPath = path.resolve(__dirname, '../src/data/animes/one-piece/characters.json');

const characters = JSON.parse(fs.readFileSync(opJsonPath, 'utf-8'));
const broken = characters.filter(c => !c.avatar || c.avatar.includes('wikia') || c.avatar.includes('weserv'));

console.log(`Found ${broken.length} characters with wikia/broken avatars in One Piece:`);
broken.forEach(b => console.log(`- ${b.id} (${b.name})`));
