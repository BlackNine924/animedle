const fs = require('fs');
const path = 'src/data/animes/one-piece/characters.json';
const chars = JSON.parse(fs.readFileSync(path, 'utf8'));

// Characters with truly iconic, canonical One Piece quotes
const ICONIC_QUOTES = {
  'monkey-d-luffy': 'Eu vou ser o Rei dos Piratas!',
  'nico-robin': 'Eu quero viver!',
  'roronoa-zoro': 'Nada aconteceu...',
  'franky': 'SUUUUPER!',
  'sanji': 'A cozinha é sagrada!',
  'tony-tony-chopper': 'Elogios não me deixam feliz, seu idiota!',
  'nami': 'Eu vou desenhar um mapa de todo o mundo!',
  'usopp': 'Eu sou o Capitão Usopp!',
  'brook': 'Poderia me mostrar sua calcinha?',
  'jinbe': 'Eu sou um homem que deseja servir o futuro Rei dos Piratas!',
  'buggy': 'Eu sou o lendário Capitão Buggy, Gyahahaha!',
  'nefertari-vivi': 'Se nos reencontrarmos um dia, vocês ainda me chamarão de companheira?',
  'shanks': 'Não perdoo ninguém que machuque meus amigos!',
  'enel': 'Eu sou o Deus!',
  'dracule-mihawk': 'Descubra seu verdadeiro eu, torne-se forte!',
  'portgas-d-ace': 'Obrigado por me amarem!',
  'crocodile': 'Confiança é a palavra mais inútil deste mundo.',
  'edward-newgate-barba-branca': 'O One Piece é real!',
  'kuzan': 'Justiça Preguiçosa.',
  'donquixote-doflamingo': 'Os vencedores ditarão o que é a justiça!',
  'rob-lucci': 'Minha única motivação é a matança em nome da Justiça.',
  'bartholomew-kuma': 'Se você fosse fazer uma viagem... para onde gostaria de ir?',
  'garp': 'Punho do Amor!',
  'eustass-kid': 'Nós vamos virar o mundo de cabeça para baixo!',
  'boa-hancock': 'Eu serei perdoada porque sou linda!',
  'silvers-rayleigh': 'Existir neste mundo significa viver sem se arrepender de nada.',
  'jewelry-bonney': 'Distorção do Futuro!',
  'borsalino': 'Você já levou um chute na velocidade da luz?',
  'charlotte-katakuri': 'Eu não acho que você seja inferior a mim.',
  'charlotte-linlin': 'Ma-ma-ma-ma! Vida ou Licença?!',
  'charlotte-perospero': 'Perorin~♪',
  'charlotte-pudding': 'Obrigado por me dizer que meu terceiro olho é lindo...',
  'kaidou': 'A força das armas é tudo o que importa no mundo!',
  'yamato': 'Eu sou Kozuki Oden! E eu vou proteger este país!',
  'king': 'Kaidou-san é o homem que se tornará o Rei dos Piratas!',
  'queen': 'Se eu ficasse mais magro, ficaria popular demais!',
  'kozuki-oden': 'Eu sou Oden! E eu nasci para ferver!',
  'kozuki-momonosuke': 'Meu nome é Kozuki Momonosuke! O homem que se tornará o Xogum de Wano!',
  'sabo': 'Se o Luffy precisar de mim, estarei lá em qualquer lugar do mundo!',
  'emporio-ivankov': 'Milagres só acontecem para aqueles que nunca desistem!',
  'rocks-d-xebec': 'Eu serei o Rei do Mundo!',
  'loki': 'Eu sou o Sol que trará o fim do mundo!',
  'vegapunk': 'A truth sobre este mundo precisa ser ouvida por todos!',
  'corazon': 'Eu te amo, Law!',
  'kozuki-toki': 'Vinte anos no futuro, a lua brilhará sobre nove sombras...',
  'kuina': 'Zoro, prometemos! Um de nós se tornará o maior espadachim do mundo!',
  'sakazuki': 'A justiça absoluta não tolera o mal!',
  'emet': 'Joy Boy... Desculpe por não poder te coroar Rei...',
  'figarland-garling': 'Aqueles que protegem os insetos são piores que os próprios insetos.',
  'charlotte-brulee': 'Katakuri-onii-chan é o orgulho da família!',
  'shiki': 'O oceano pertence àqueles que conquistam os céus!'
};

let cleanedCount = 0;
chars.forEach(c => {
  if (ICONIC_QUOTES[c.id]) {
    c.quote = ICONIC_QUOTES[c.id];
  } else {
    // Clear generic or non-canonical quote
    if (c.quote) {
      c.quote = '';
      cleanedCount++;
    }
  }
});

fs.writeFileSync(path, JSON.stringify(chars, null, 2));
console.log(`Successfully cleaned quotes! ${Object.keys(ICONIC_QUOTES).length} iconic quotes retained, ${cleanedCount} generic quotes cleared.`);
