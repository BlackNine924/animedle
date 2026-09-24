const fs = require('fs');

async function searchCharacter(name) {
  const q = `
  query ($search: String) {
    Character(search: $search) {
      id
      name { full }
      image { large }
    }
  }
  `;
  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: q, variables: { search: name } })
    });
    const data = await res.json();
    if (data.data && data.data.Character) {
      console.log(`"${name}" => "${data.data.Character.image.large}"`);
    } else {
      console.log(`NO MATCH FOR ${name}`);
    }
  } catch(e) {
    console.error(e);
  }
}

const targetNames = [
  "Tanjirou Kamado",
  "Giyuu Tomioka",
  "Kyoujurou Rengoku",
  "Muichirou Tokitou",
  "Gyoumei Himejima",
  "Jigorou Kuwajima",
  "Gyokko",
  "Daki",
  "Gyuutarou",
  "Kaigaku",
  "Enmu",
  "Rui",
  "Yoriichi Tsugikuni"
];

async function run() {
  for (const name of targetNames) {
    await searchCharacter(name);
    await new Promise(r => setTimeout(r, 200));
  }
}

run();
