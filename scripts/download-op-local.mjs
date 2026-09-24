import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const opCharactersPath = path.join(rootDir, 'src', 'data', 'animes', 'one-piece', 'characters.json');
const avatarsDir = path.join(rootDir, 'public', 'avatars', 'one-piece');

if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

async function downloadAvatars() {
  const characters = JSON.parse(fs.readFileSync(opCharactersPath, 'utf-8'));
  const wikiaList = characters.filter(c => c.avatar && (c.avatar.includes('wikia') || c.avatar.includes('weserv')));
  console.log(`Downloading ${wikiaList.length} avatars locally...`);

  for (const char of wikiaList) {
    const filename = `${char.id}.png`;
    const localPath = path.join(avatarsDir, filename);
    const webUrl = char.avatar;

    try {
      const res = await fetch(webUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }
      });
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        if (buffer.byteLength > 1000) {
          fs.writeFileSync(localPath, Buffer.from(buffer));
          char.avatar = `/avatars/one-piece/${filename}`;
          console.log(`✅ Salvo localmente: ${char.id} (${buffer.byteLength} bytes)`);
        } else {
          console.log(`⚠️ Arquivo muito pequeno para ${char.id}: ${buffer.byteLength} bytes`);
        }
      } else {
        console.log(`❌ Falha HTTP ${res.status} para ${char.id}`);
      }
    } catch (e) {
      console.log(`❌ Erro de download para ${char.id}:`, e.message);
    }
    await new Promise(r => setTimeout(r, 200));
  }

  fs.writeFileSync(opCharactersPath, JSON.stringify(characters, null, 2));
  console.log(`Atualização concluída com sucesso!`);
}

downloadAvatars();
