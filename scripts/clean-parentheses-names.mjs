import fs from 'fs';
import path from 'path';

const dir = './src/data/animes';

// Specific clean replacements map
const explicitReplacements = {
  // SAO
  'Kirito (Kazuto Kirigaya / O Espadachim Negro)': 'Kirito',
  'Asuna (Asuna Yuuki / O Relâmpago / Deusa Stacia)': 'Asuna Yuuki',
  'Yui (MHCP-0001 / Filha Adotiva)': 'Yui',
  'Klein (Ryoutarou Tsuboi)': 'Klein',
  'Agil (Andrew Gilbert Mills)': 'Agil',
  'Silica (Keiko Ayano)': 'Silica',
  'Lisbeth (Rika Shinozaki)': 'Lisbeth',
  'Diabel (O Cavaleiro Nobre)': 'Diabel',
  'PoH (Prince of Hell / Vassago Casals)': 'PoH',
  'Red-Eyed XaXa (Shoichi Shinkawa / Death Gun)': 'Red-Eyed XaXa',
  'Johnny Black (Atsushi Kanamoto)': 'Johnny Black',
  'Leafa (Suguha Kirigaya / Deusa Terraria)': 'Leafa',
  'Recon (Shinichi Nagata)': 'Recon',
  'Oberon (Sugou Nobuyuki / O Rei das Fadas)': 'Sugou Nobuyuki (Oberon)',
  'Sinon (Shino Asada / Deusa Solus)': 'Sinon',
  'Death Gun (Sterben / O Atirador Fantasma)': 'Death Gun',
  'Spiegel (Kyouji Shinkawa)': 'Spiegel',
  'Yuuki (Yuuki Konno / Zekken / Espada Absoluta)': 'Yuuki Konno',
  'Siune (An Si-eun)': 'Siune',
  'Eiji (Eiji Nochizawa / Nautilus)': 'Eiji',
  'Yuna (Shigemura Yuuna)': 'Yuna',
  'Eugeo (Cavaleiro da Rosa Azul)': 'Eugeo',
  'Alice Zuberg (Alice Synthesis Thirty)': 'Alice Zuberg',
  'Sheyta Synthesis Twelve (A Cavaleira Silenciosa)': 'Sheyta Synthesis Twelve',
  'Quinella (Administrator / Pontífice Suprema)': 'Quinella (Administrator)',
  'Cardinal (Lyceris / Sub-Processo do Sistema)': 'Cardinal',
  'Sortiliena Serlut (Liena-senpai)': 'Sortiliena Serlut',
  'Gabriel Miller (Subtilizer / Imperador Vecta)': 'Gabriel Miller',
  'Seijirou Kikuoka (Chrysheight)': 'Seijirou Kikuoka',

  // Tokyo Ghoul
  'Ken Kaneki (Haise Sasaki / O Rei Caolho)': 'Ken Kaneki',
  'Touka Kirishima (Rabbit)': 'Touka Kirishima',
  'Yoshimura (Kuzen / A Coruja Não-Mata)': 'Kuzen Yoshimura',
  'Renji Yomo (Raven / Corvo)': 'Renji Yomo',
  'Nishiki Nishio (Serpente)': 'Nishiki Nishio',
  'Enji Koma (O Macaco Diabo)': 'Enji Koma',
  'Kaya Irimi (O Cão Negro)': 'Kaya Irimi',
  'Hinami Fueguchi (Yotsume)': 'Hinami Fueguchi',
  'Koutarou Amon (Floppy)': 'Koutarou Amon',
  'Kishou Arima (O Ceifador Branco do CCG)': 'Kishou Arima',
  'Juuzou Suzuya (Rei Suzuya)': 'Juuzou Suzuya',
  'Shuu Tsukiyama (O Gourmet)': 'Shuu Tsukiyama',
  'Kanae von Rosewald (Karren)': 'Kanae von Rosewald',
  'Chie Hori (A Pequena Fotógrafa)': 'Chie Hori',
  'Eto Yoshimura (Sen Takatsuki / Coruja de Um Olho Só)': 'Eto Yoshimura',
  'Noro (Noroi)': 'Noro',
  'Ayato Kirishima (Black Rabbit)': 'Ayato Kirishima',
  'Yakumo Oomori (Yamori / Jason do 13º Distrito)': 'Yakumo Oomori (Yamori)',
  'Miza Kusakari (Três Lâminas)': 'Miza Kusakari',
  'Uta (Sem Rosto / Criador de Máscaras)': 'Uta',
  'Roma Hoito (Dodgy Mother / Palhaço Cigano)': 'Roma Hoito',
  'Nimura Furuta (Souta Washuu-Furuta / Kichimura)': 'Nimura Furuta',
  'Donato Porpora (O Padre / Crown)': 'Donato Porpora',
  'Rize Kamishiro (A Comilona / Binge Eater)': 'Rize Kamishiro',
  'Kurona Yasuhisa (Kuro)': 'Kurona Yasuhisa',
  'Nashiro Yasuhisa (Shiro)': 'Nashiro Yasuhisa',
  'Seidou Takizawa (Owl / Coruja)': 'Seidou Takizawa',
  'Hideyoshi Nagachika (Hide / Scarecrow)': 'Hideyoshi Nagachika',
  'Shikorae (Rio)': 'Shikorae',
  'Nutcracker (Quebra-Nozes)': 'Nutcracker',
  'Tsuneyoshi Washuu (O Presidente do CCG)': 'Tsuneyoshi Washuu',

  // One Punch Man
  'Tatsumaki (Tornado do Terror)': 'Tatsumaki',
  'Atomic Samurai (Kamikaze)': 'Atomic Samurai',
  'Child Emperor (Isamu)': 'Child Emperor',
  'King (O Homem Mais Forte da Terra)': 'King',
  'Drive Knight (Cavaleiro Mecânico)': 'Drive Knight',
  'Pig God (Deus Porco)': 'Pig God',
  'Watchdog Man (Homem Cão de Guarda)': 'Watchdog Man',
  'Flashy Flash (Flash Veloz)': 'Flashy Flash',
  'Genos (Cyborg Demoníaco)': 'Genos',
  'Metal Bat (Bad / Bastão de Metal)': 'Metal Bat',
  'Tanktop Master (Mestre de Regata)': 'Tanktop Master',
  'Amai Mask (Sweet Mask)': 'Amai Mask',
  'Sneck (Punho Mordida de Serpente)': 'Sneck',
  'Fubuki (Blizzard do Inferno)': 'Fubuki',
  'Mumen Rider (Satoru)': 'Mumen Rider',
  'Garou (O Caçador de Heróis)': 'Garou',
  'Garou Cósmico (Cosmic Fear Garou)': 'Garou Cósmico',
  'Lorde Boros (Dominador do Universo)': 'Lorde Boros',
  'Black Sperm (Golden Sperm / Platinum Sperm)': 'Black Sperm',
  'Homeless Emperor (Imperador Mendigo)': 'Homeless Emperor',
  'Fuhrer Ugly (Presidente Feio / Vomited)': 'Fuhrer Ugly',
  'Gums (Gengivas)': 'Gums',
  'Overgrown Rover (Rover)': 'Overgrown Rover',
  'Elder Centipede (Centopéia Anciã)': 'Elder Centipede',
  'Phoenix Man (Homem Fênix)': 'Phoenix Man',
  'Carnage Kabuto (Escaravelho Carniceiro)': 'Carnage Kabuto',
  'Mosquito Girl (Garota Mosquito)': 'Mosquito Girl',
  'Beast King (Rei das Feras)': 'Beast King',
  'Armored Gorilla (Gorila Blindado)': 'Armored Gorilla',
  'Deep Sea King (Rei dos Mares Profundos)': 'Deep Sea King',
  'Vaccine Man (Homem Vacina)': 'Vaccine Man',
  'Crablante (Homem Caranguejo)': 'Crablante',
  'Beefcake (Marugori)': 'Beefcake',
  "Speed-o'-Sound Sonic (Sonic)": "Speed-o'-Sound Sonic",
  'Royal Ripper (Estripador Real)': 'Royal Ripper',
  'Bug God (Deus Inseto)': 'Bug God',
  'Awakened Cockroach (Barata Despertada)': 'Awakened Cockroach',
  'Pure Blood (Vampiro Puro-Sangue)': 'Pure Blood',
  'Deus (God)': 'Deus',

  // Romance
  'Taiga Aisaka (Tigresa de Bolso)': 'Taiga Aisaka',
  'Sajuna Inui (Juju)': 'Sajuna Inui',
  'Chizuru Mizuhara (Ichinose)': 'Chizuru Mizuhara',
  'Mahiru Shiina (O Anjo)': 'Mahiru Shiina',
  'Naoto Hachioji (Senpai)': 'Naoto Hachioji',
  'Rentarou Aijou (O Monstro do Amor)': 'Rentarou Aijou',
  'Tsukasa Yuzaki (Tsukuyomi)': 'Tsukasa Yuzaki',
  'Junichirou Kubota (Jun)': 'Junichirou Kubota',
  'Duke (Bocchan)': 'Duque de Morte',
  'Aki Adagaki (A Princesa Brutal)': 'Aki Adagaki',
  'Sawako Kuronuma (Sadako)': 'Sawako Kuronuma',
  'Nagisa Furukawa (Okazaki)': 'Nagisa Furukawa',
  'Kyo Sohma (O Gato Amaldiçoado)': 'Kyo Sohma',

  // Shangri-La Frontier
  'Sunraku (Rakuro Hizutome)': 'Sunraku',
  'Psyger-0 (Rei Saiga)': 'Psyger-0',
  'Arthur Pencilgon (Towa Amane)': 'Arthur Pencilgon',
  'Oikatzo (Kei Uomi)': 'Oikatzo',
  'Vysache (Rei dos Coelhos Vorpais)': 'Vysache',
  'Kutanid of the Abyss (Ctarnidd)': 'Kutanid do Abismo',
  'Psyger-100 (Momo Saiga)': 'Psyger-100',
  'Tsukuyo Tsukuri (Tsutomu)': 'Tsukuyo Tsukuri',
  'Akitsu Akane (Akane Oki)': 'Akitsu Akane',
  'Orchestra (O Eco)': 'Orchestra'
};

const animes = fs.readdirSync(dir).filter(d => fs.existsSync(path.join(dir, d, 'characters.json')));

let count = 0;
for (const a of animes) {
  const file = path.join(dir, a, 'characters.json');
  const chars = JSON.parse(fs.readFileSync(file, 'utf8'));
  let changed = false;

  for (const c of chars) {
    if (explicitReplacements[c.name]) {
      c.name = explicitReplacements[c.name];
      changed = true;
      count++;
    }
  }

  if (changed) {
    fs.writeFileSync(file, JSON.stringify(chars, null, 2), 'utf8');
    console.log(`Updated ${a} characters.json`);
  }
}

console.log(`Successfully cleaned ${count} character names!`);
