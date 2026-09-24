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
  "Sekido",
  "Karaku",
  "Aizetsu",
  "Urogi",
  "Zohakuten",
  "Chachamaru",
  "Daki",
  "Gyuutarou",
  "Tanjuurou Kamado",
  "Kie Kamado",
  "Takeo Kamado",
  "Hanako Kamado",
  "Shigeru Kamado",
  "Rokuta Kamado",
  "Ruka Rengoku",
  "Senjurou Rengoku",
  "Shinjurou Rengoku",
  "Hinatsuru",
  "Makio",
  "Suma",
  "Keizou",
  "Koyuki",
  "Sumiyoshi",
  "Kanae Kochou",
  "Kiriya Ubuyashiki",
  "Kanata Ubuyashiki",
  "Amane Ubuyashiki",
  "Mother Spider Demon",
  "Father Spider Demon",
  "Mukago",
  "Wakuraba",
  "Rokuro",
  "Kamanue"
];

async function run() {
  for (const name of targetNames) {
    await searchCharacter(name);
    await new Promise(r => setTimeout(r, 150));
  }
}

run();
