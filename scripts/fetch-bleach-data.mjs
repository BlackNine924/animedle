import fs from 'fs';
import path from 'path';

async function fetchCharacterImage(name) {
  const query = `query ($search: String) { Character(search: $search) { id name { full } image { large } } }`;
  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { search: name } }),
      signal: AbortSignal.timeout(6000)
    });
    const data = await res.json();
    return data?.data?.Character?.image?.large || null;
  } catch (err) {
    return null;
  }
}

async function run() {
  const testNames = ['Ichigo Kurosaki', 'Rukia Kuchiki', 'Sosuke Aizen', 'Kenpachi Zaraki', 'Yhwach', 'Ulquiorra Cifer'];
  for (const n of testNames) {
    const img = await fetchCharacterImage(n);
    console.log(`${n} => ${img}`);
  }
}

run();
