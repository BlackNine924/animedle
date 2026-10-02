import fs from 'fs';

const filePath = 'src/data/exclusiveChallenges.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Mapeamento canônico de poderes compartilhados com múltiplos portadores
const SHARED_ABILITIES = {
  // Demon Slayer
  'Respiração da Água': ['tanjiro-kamado', 'giyu-tomioka', 'sakonji-urokodaki', 'sabito', 'makomo', 'murata'],
  'Respiração do Trovão': ['zenitsu-agatsuma', 'kaigaku', 'jigoro-kuwajima'],
  'Respiração do Sol': ['tanjiro-kamado', 'yoriichi-tsugikuni', 'tanjuro-kamado', 'sumiyoshi'],
  'Hinokami Kagura': ['tanjiro-kamado', 'yoriichi-tsugikuni', 'tanjuro-kamado'],
  'Respiração das Chamas': ['kyojuro-rengoku', 'shinjuro-rengoku'],
  
  // Attack on Titan
  'Titã Colossal': ['armin-arlert', 'bertholdt-hoover'],
  'Titã Mandíbula': ['porco-galliard', 'ymir', 'falco-grice', 'marcel-galliard'],
  'Titã de Ataque': ['eren-jaeger', 'grisha-jaeger', 'eren-kruger'],
  'Titã Fundador': ['eren-jaeger', 'frieda-reiss', 'uri-reiss', 'ymir-fritz'],
  'Titã Bestial': ['zeke-jaeger', 'tom-ksaver'],
  'Titã Martelo de Guerra': ['lara-tybur', 'eren-jaeger'],

  // My Hero Academia
  'One For All': ['izuku-midoriya', 'all-might', 'nana-shimura', 'yoichi-shigaraki'],
  'All For One': ['all-for-one', 'tomura-shigaraki'],

  // Naruto
  'Rasengan': ['naruto-uzumaki', 'minato-namikaze', 'jiraiya', 'kakashi-hatake', 'konohamaru-sarutobi', 'boruto-uzumaki'],
  'Chidori': ['sasuke-uchiha', 'kakashi-hatake'],
  'Raikiri': ['kakashi-hatake', 'sasuke-uchiha'],
  'Susanoo': ['sasuke-uchiha', 'itachi-uchiha', 'madara-uchiha', 'kakashi-hatake', 'shisui-uchiha'],
  'Kamui': ['obito-uchiha', 'kakashi-hatake'],

  // One Piece
  'Mera Mera no Mi': ['portgas-d-ace', 'sabo'],
  'Gura Gura no Mi': ['edward-newgate', 'marshall-d-teach']
};

// Regex para encontrar cada bloco de desafio
// Adiciona validCharacterIds se o targetTitle bater com uma das chaves
let updatedCount = 0;

for (const [ability, validIds] of Object.entries(SHARED_ABILITIES)) {
  const escaped = ability.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Procura targetTitle contendo a habilidade
  const regex = new RegExp(`("targetTitle":\\s*"[^"]*${escaped}[^"]*",\\s*"badgeTitle":\\s*"[^"]*",\\s*"targetCharacterId":\\s*"[^"]*",\\s*"targetCharacterName":\\s*"[^"]*")`, 'g');
  
  content = content.replace(regex, (match) => {
    updatedCount++;
    const idsFormatted = JSON.stringify(validIds);
    return `${match},\n    "validCharacterIds": ${idsFormatted}`;
  });
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Sucesso! ${updatedCount} desafios foram atualizados com múltiplas respostas canônicas válidas.`);
