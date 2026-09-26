import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const avatarsDir = path.join(rootDir, 'public', 'avatars', 'dandadan');
const charactersJsonPath = path.join(rootDir, 'src', 'data', 'animes', 'dandadan', 'characters.json');

export const NEW_DANDADAN_CHARACTERS = [
  {
    "id": "music-room-portraits",
    "name": "Retratos da Sala de Música",
    "wikiTitle": "Music Room Portraits",
    "gender": "Sem Gênero",
    "species": "Youkai / Espírito",
    "affiliation": ["Colégio Kami", "Independente"],
    "powerNature": "Sobrenatural (Espírito/Youkai)",
    "styleOrPower": "Ressonância Sonora & Ataque Físico Assombrado",
    "debutArc": "Arco Silky Acrobática",
    "status": "Falecido",
    "quote": "Ouviram a melodia da nossa fúria? A sinfonia do terror não terá pausa!",
    "techniques": ["Sinfonia da Sala de Música", "Bombardeio de Molduras Assombradas", "Ressonância Cacofônica"],
    "avatar": "/avatars/dandadan/music-room-portraits.png"
  },
  {
    "id": "earthbound-spirit-crab",
    "name": "Caranguejo Espírito Terrestre",
    "wikiTitle": "Earthbound Spirit Crab",
    "gender": "Sem Gênero",
    "species": "Youkai / Espírito",
    "affiliation": ["Independente"],
    "powerNature": "Sobrenatural (Espírito/Youkai)",
    "styleOrPower": "Garras Esmagadoras & Fusão Espiritual",
    "debutArc": "Arco Turbo Vovó",
    "status": "Falecido",
    "quote": "*estalido ensurdecedor de pinças gigantes quebrando a barreira da represa*",
    "techniques": ["Pinça Esmagadora Titânica", "Fusão Espiritual de Rancor", "Jato de Lama Represada"],
    "avatar": "/avatars/dandadan/earthbound-spirit-crab.png"
  },
  {
    "id": "gilles-de-rais",
    "name": "Gilles de Rais",
    "wikiTitle": "Gilles de Rais",
    "gender": "Masculino",
    "species": "Youkai / Espírito",
    "affiliation": ["Independente"],
    "powerNature": "Sobrenatural (Espírito/Youkai)",
    "styleOrPower": "Necromancia Histórica & Espadas das Trevas",
    "debutArc": "Arco das Lâminas Kozuka",
    "status": "Vivo",
    "quote": "Sob a batuta do ilustre Conde, o sacrifício e o espetáculo do horror renascem!",
    "techniques": ["Lâminas Espectrais de Sangue", "Invocação de Sombras Medievais", "Névoa Sombria de Agonia"],
    "avatar": "/avatars/dandadan/gilles-de-rais.png"
  },
  {
    "id": "lord-of-the-flies",
    "name": "Senhor das Moscas",
    "wikiTitle": "Lord of the Flies",
    "gender": "Sem Gênero",
    "species": "Youkai / Espírito",
    "affiliation": ["Independente"],
    "powerNature": "Sobrenatural (Espírito/Youkai)",
    "styleOrPower": "Enxame Putrefato & Maldição Ocular",
    "debutArc": "Arco das Seis Maldições",
    "status": "Vivo",
    "quote": "*zumbido ensurdecedor de milhões de asas negras devorando a luz*",
    "techniques": ["Enxame Devorador das Trevas", "Maldição Ocular Putrefata", "Nuvem de Pestilência"],
    "avatar": "/avatars/dandadan/lord-of-the-flies.png"
  },
  {
    "id": "kamikure",
    "name": "Kamikure",
    "wikiTitle": "Kamikure",
    "gender": "Sem Gênero",
    "species": "Youkai / Espírito",
    "affiliation": ["Independente"],
    "powerNature": "Sobrenatural (Espírito/Youkai)",
    "styleOrPower": "Aura Mística Sagrada & Domínio Provincial",
    "debutArc": "Arco de Shimane",
    "status": "Vivo",
    "quote": "Os limites entre o divino e o macabro se dissipam perante a minha presença ancestral.",
    "techniques": ["Domínio Místico Ancestral", "Barreira Sagrada Provincial", "Punição dos Espíritos da Terra"],
    "avatar": "/avatars/dandadan/kamikure.png"
  },
  {
    "id": "black-haircutter",
    "name": "Cortador de Cabelo Preto (Kamikiri)",
    "wikiTitle": "Black Haircutter",
    "gender": "Masculino",
    "species": "Youkai / Espírito",
    "affiliation": ["Independente"],
    "powerNature": "Sobrenatural (Espírito/Youkai)",
    "styleOrPower": "Tesouras Dimensionais & Corte Furtivo",
    "debutArc": "Arco do Danmara",
    "status": "Vivo",
    "quote": "Snip, snap... um corte no seu cabelo e toda a sua força espiritual cairá ao chão!",
    "techniques": ["Corte Dimensional com Tesouras", "Emboscada das Sombras Capilares", "Fios Trançados Cortantes"],
    "avatar": "/avatars/dandadan/black-haircutter.png"
  },
  {
    "id": "black-paladins",
    "name": "Paladinos Negros",
    "wikiTitle": "Black Paladins",
    "gender": "Sem Gênero",
    "species": "Youkai / Espírito",
    "affiliation": ["Independente"],
    "powerNature": "Sobrenatural (Espírito/Youkai)",
    "styleOrPower": "Armadura Pesada Espectral & Espadachim Danmara",
    "debutArc": "Arco do Danmara",
    "status": "Vivo",
    "quote": "Intrusos identificados no tabuleiro de Danmara. A execução é a única regra.",
    "techniques": ["Golpe Pesado de Lâmina Negra", "Muralha de Aço Espectral", "Formação de Cerco Danmara"],
    "avatar": "/avatars/dandadan/black-paladins.png"
  },
  {
    "id": "vakappa",
    "name": "Vakappa",
    "wikiTitle": "Vakappa",
    "gender": "Masculino",
    "species": "Youkai / Espírito",
    "affiliation": ["Independente"],
    "powerNature": "Sobrenatural (Espírito/Youkai)",
    "styleOrPower": "Magia Aquática & Força de Kappa",
    "debutArc": "Arco de Shimane",
    "status": "Vivo",
    "quote": "Kappa! Respeitem as águas ou puxarei suas almas para o fundo do leito!",
    "techniques": ["Jato de Água em Alta Pressão", "Luta Aquática Corporal", "Proteção de Carapaça Mística"],
    "avatar": "/avatars/dandadan/vakappa.png"
  },
  {
    "id": "toramaru-sodenashi",
    "name": "Toramaru Sodenashi",
    "wikiTitle": "Toramaru Sodenashi",
    "gender": "Masculino",
    "species": "Humano (Médium)",
    "affiliation": ["Independente"],
    "powerNature": "Sobrenatural (Espírito/Youkai)",
    "styleOrPower": "Punho do Tigre Espectral & Combate Selvagem",
    "debutArc": "Arco das Lâminas Kozuka",
    "status": "Vivo",
    "quote": "Se você tem força para ficar de pé, tem força para lutar até o último suspiro!",
    "techniques": ["Golpe Feral do Tigre", "Instinto de Caça Aguçado", "Artes Marciais Sobrenaturais"],
    "avatar": "/avatars/dandadan/toramaru-sodenashi.png"
  },
  {
    "id": "baison",
    "name": "Baison",
    "wikiTitle": "Baison",
    "gender": "Masculino",
    "species": "Humano (Médium)",
    "affiliation": ["Independente"],
    "powerNature": "Sobrenatural (Espírito/Youkai)",
    "styleOrPower": "Cartas de Aposta & Projeção Arcana",
    "debutArc": "Arco do Danmara",
    "status": "Vivo",
    "quote": "Neste jogo de vida ou morte, a sorte só favorece quem aposta tudo na mesa.",
    "techniques": ["Disparo de Cartas Cortantes", "Aposta do Tabuleiro Espiritual", "Barreira de Cartas Seladas"],
    "avatar": "/avatars/dandadan/baison.png"
  },
  {
    "id": "beam",
    "name": "Beam",
    "wikiTitle": "Beam",
    "gender": "Masculino",
    "species": "Alienígena",
    "affiliation": ["Independente"],
    "powerNature": "Extraterrestre (Sci-Fi/Armadura)",
    "styleOrPower": "Feixes de Fótons Concentrados",
    "debutArc": "Arco das Seis Maldições",
    "status": "Vivo",
    "quote": "Energia calibrada em cem por cento. Disparar rajada cósmica!",
    "techniques": ["Feixe de Energia Concentrada", "Barreira de Luz Repulsora", "Propulsão de Fótons"],
    "avatar": "/avatars/dandadan/beam.png"
  },
  {
    "id": "sumerian-platoon-leader",
    "name": "Líder do Pelotão Sumeriano",
    "wikiTitle": "Sumerian Platoon Leader",
    "gender": "Masculino",
    "species": "Alienígena",
    "affiliation": ["Grupo de Momo & Okarun"],
    "powerNature": "Extraterrestre (Sci-Fi/Armadura)",
    "styleOrPower": "Lança Sumeriana & Comando de Vanguarda",
    "debutArc": "Arco da Invasão Global dos Alienígenas",
    "status": "Falecido",
    "quote": "Guerreiros sumerianos, protejam a criança Vamola e a honra do nosso povo até o fim!",
    "techniques": ["Disparo de Lança de Energia", "Formação de Escudo Sumeriano", "Investida Heroica de Sacrifício"],
    "avatar": "/avatars/dandadan/sumerian-platoon-leader.png"
  },
  {
    "id": "jet-booster-kur",
    "name": "Jet Booster Exosuit Kur",
    "wikiTitle": "Jet Booster Exosuit Kur",
    "gender": "Masculino",
    "species": "Alienígena",
    "affiliation": ["Frota Espacial Kur"],
    "powerNature": "Extraterrestre (Sci-Fi/Armadura)",
    "styleOrPower": "Propulsão a Jato Cósmica & Bombardeio Aéreo",
    "debutArc": "Arco da Invasão Global dos Alienígenas",
    "status": "Falecido",
    "quote": "Nenhum nativo primitivo consegue acompanhar a aceleração supersônica dos nossos propulsores!",
    "techniques": ["Aceleração Supersônica de Propulsor", "Bombardeio de Fótons Pesado", "Mergulho Aéreo Causal"],
    "avatar": "/avatars/dandadan/jet-booster-kur.png"
  },
  {
    "id": "head-exosuit-kur",
    "name": "Head Exosuit Kur",
    "wikiTitle": "Head Exosuit Kur",
    "gender": "Masculino",
    "species": "Alienígena",
    "affiliation": ["Frota Espacial Kur"],
    "powerNature": "Extraterrestre (Sci-Fi/Armadura)",
    "styleOrPower": "Comando Tático Bélico & Canhões Pesados",
    "debutArc": "Arco da Invasão Global dos Alienígenas",
    "status": "Falecido",
    "quote": "Iniciando protocolo de aniquilação setorial. Queimem este santuário até o chão!",
    "techniques": ["Canhão Frontal de Plasma", "Escudo Bélico de Partículas", "Sinalizador de Fogo de Esquadrão"],
    "avatar": "/avatars/dandadan/head-exosuit-kur.png"
  },
  {
    "id": "mantis-exosuit-kur",
    "name": "Mantis Exosuit Kur",
    "wikiTitle": "Mantis Exosuit Kur",
    "gender": "Masculino",
    "species": "Alienígena",
    "affiliation": ["Frota Espacial Kur"],
    "powerNature": "Extraterrestre (Sci-Fi/Armadura)",
    "styleOrPower": "Lâminas de Plasma Louva-a-Deus",
    "debutArc": "Arco da Invasão Global dos Alienígenas",
    "status": "Falecido",
    "quote": "Cortarei cada um de vocês em pedaços moleculares antes que percebam o golpe!",
    "techniques": ["Garras de Plasma Duplas", "Salto Predatório de Alta Velocidade", "Defesa Cruzada de Lâminas"],
    "avatar": "/avatars/dandadan/mantis-exosuit-kur.png"
  },
  {
    "id": "masked-eyepatch-dragon-knight",
    "name": "Cavaleiro Dragão de Tapa-Olho Mascarado",
    "wikiTitle": "Masked Eyepatch Dragon Knight",
    "gender": "Masculino",
    "species": "Alienígena",
    "affiliation": ["Frota Espacial Kur"],
    "powerNature": "Extraterrestre (Sci-Fi/Armadura)",
    "styleOrPower": "Mira de Fótons & Espada Gravitacional",
    "debutArc": "Arco da Invasão Global dos Alienígenas",
    "status": "Falecido",
    "quote": "Na minha mira óptica calibrada, ninguém escapa com vida.",
    "techniques": ["Disparo Óptico de Precisão", "Espada Gravitacional Pesada", "Blindagem Antibalística"],
    "avatar": "/avatars/dandadan/masked-eyepatch-dragon-knight.png"
  },
  {
    "id": "naki-kito",
    "name": "Naki Kito",
    "wikiTitle": "Naki Kito",
    "gender": "Feminino",
    "species": "Humano (Médium)",
    "affiliation": ["Clã Kito"],
    "powerNature": "Sobrenatural (Espírito/Youkai)",
    "styleOrPower": "Feitiçaria Ritual & Agilidade Sombria",
    "debutArc": "Arco da Casa Maldita & Olho Maligno",
    "status": "Falecido",
    "quote": "Pela senhora Natsu e pelo nosso clã, vocês serão amarrados e jogados no poço sagrado!",
    "techniques": ["Amarras de Seda Amaldiçoada", "Salto Evasivo na Floresta", "Facas Rituais de Sacrifício"],
    "avatar": "/avatars/dandadan/naki-kito.png"
  },
  {
    "id": "juichi-kito",
    "name": "Juichi Kito",
    "wikiTitle": "Juichi Kito",
    "gender": "Masculino",
    "species": "Humano Comum",
    "affiliation": ["Clã Kito"],
    "powerNature": "Físico / Nenhum",
    "styleOrPower": "Lança de Caça Ritual & Força Bruta",
    "debutArc": "Arco da Casa Maldita & Olho Maligno",
    "status": "Falecido",
    "quote": "Cercamos a casa! Não deixem nenhum desses pirralhos fugir pela colina!",
    "techniques": ["Estocada com Lança de Caça", "Armadilha de Espinhos Subterrânea"],
    "avatar": "/avatars/dandadan/juichi-kito.png"
  },
  {
    "id": "anzu",
    "name": "Anzu",
    "wikiTitle": "Anzu",
    "gender": "Feminino",
    "species": "Humano Comum",
    "affiliation": ["Colégio Kami"],
    "powerNature": "Físico / Nenhum",
    "styleOrPower": "Nenhum",
    "debutArc": "Arco Turbo Vovó",
    "status": "Vivo",
    "quote": "Momo-chi! Quem é esse garoto esquisito de óculos que fica te seguindo pra todo lado?!",
    "techniques": ["Fofoca Escolar", "Apoio Moral Gyaru", "Estilo de Moda e Maquiagem"],
    "avatar": "/avatars/dandadan/anzu.png"
  },
  {
    "id": "mika-adachi",
    "name": "Mika Adachi",
    "wikiTitle": "Mika Adachi",
    "gender": "Feminino",
    "species": "Humano Comum",
    "affiliation": ["Colégio Kami"],
    "powerNature": "Físico / Nenhum",
    "styleOrPower": "Nenhum",
    "debutArc": "Arco Turbo Vovó",
    "status": "Vivo",
    "quote": "Ai, Momo, você não cansa de falar de atores velhos? Olha aquele garoto gato ali!",
    "techniques": ["Conversa Empolgada", "Apoio de Amizade", "Conselhos de Romance"],
    "avatar": "/avatars/dandadan/mika-adachi.png"
  }
];

async function fetchWikiThumbnail(title) {
  const url = `https://dandadan.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=800&format=json`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'AnimedleBot/1.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://dandadan.fandom.com/'
      }
    });
    const data = await res.json();
    const page = Object.values(data.query?.pages || {})[0];
    return page?.thumbnail?.source || null;
  } catch (err) {
    console.error(`Erro ao buscar wiki para "${title}":`, err.message);
    return null;
  }
}

async function processAvatar(buffer, outputPath) {
  const meta = await sharp(buffer).metadata();
  const width = meta.width;
  const height = meta.height;

  if (height > width * 1.15) {
    const size = Math.round(width * 0.90);
    const top = Math.round(height * 0.04);
    const left = Math.round((width - size) / 2);

    await sharp(buffer)
      .extract({
        left: Math.max(0, left),
        top: Math.max(0, top),
        width: Math.min(size, width),
        height: Math.min(size, height - top)
      })
      .resize(240, 240, { fit: 'cover' })
      .png({ quality: 90 })
      .toFile(outputPath);
  } else if (width > height * 1.25) {
    const size = Math.min(height, Math.round(width * 0.65));
    const left = Math.round((width - size) / 2);
    const top = Math.round((height - size) / 2);

    await sharp(buffer)
      .extract({
        left: Math.max(0, left),
        top: Math.max(0, top),
        width: size,
        height: size
      })
      .resize(240, 240, { fit: 'cover' })
      .png({ quality: 90 })
      .toFile(outputPath);
  } else {
    await sharp(buffer)
      .resize(240, 240, { fit: 'cover', position: 'center' })
      .png({ quality: 90 })
      .toFile(outputPath);
  }
}

async function runDandadanExpansion() {
  console.log(`\n=== INICIANDO EXPANSÃO DE DAN DA DAN (+${NEW_DANDADAN_CHARACTERS.length} PERSONAGENS) ===\n`);

  let successCount = 0;

  for (let i = 0; i < NEW_DANDADAN_CHARACTERS.length; i++) {
    const char = NEW_DANDADAN_CHARACTERS[i];
    const outputPath = path.join(avatarsDir, `${char.id}.png`);
    const wikiTitle = char.wikiTitle || char.name;

    console.log(`[${i + 1}/${NEW_DANDADAN_CHARACTERS.length}] Processando ${char.name} (${char.id}) [Wiki: ${wikiTitle}]...`);

    const imageUrl = await fetchWikiThumbnail(wikiTitle);

    if (!imageUrl) {
      console.warn(`   ⚠️ URL de imagem não encontrada para ${char.name} (${wikiTitle})`);
      continue;
    }

    try {
      const res = await fetch(imageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://dandadan.fandom.com/'
        }
      });

      if (!res.ok) {
        console.warn(`   ⚠️ Erro HTTP ${res.status} ao baixar imagem de ${char.name}`);
        continue;
      }

      const buffer = Buffer.from(await res.arrayBuffer());
      await processAvatar(buffer, outputPath);
      console.log(`   ✓ Avatar salvo em: ${char.id}.png`);
      successCount++;
    } catch (err) {
      console.error(`   ❌ Falha ao processar avatar de ${char.name}:`, err.message);
    }

    await new Promise(r => setTimeout(r, 200));
  }

  // Mesclar com a base existente de 46 personagens
  const existingChars = JSON.parse(fs.readFileSync(charactersJsonPath, 'utf-8'));
  const existingIds = new Set(existingChars.map(c => c.id));

  const charsToAdd = [];
  for (const item of NEW_DANDADAN_CHARACTERS) {
    if (existingIds.has(item.id)) {
      console.warn(`ID duplicado ignorado: ${item.id}`);
      continue;
    }
    const { wikiTitle, ...cleanChar } = item;
    charsToAdd.push(cleanChar);
  }

  const merged = [...existingChars, ...charsToAdd];
  fs.writeFileSync(charactersJsonPath, JSON.stringify(merged, null, 2), 'utf-8');

  console.log(`\n=== SUCESSO: ${charsToAdd.length} novos personagens adicionados! Total agora: ${merged.length} personagens em ${charactersJsonPath} ===\n`);
}

runDandadanExpansion().catch(console.error);
