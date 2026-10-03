import fs from 'fs';
import path from 'path';

async function searchAnilist(name) {
  const query = `query ($search: String) {
    Character(search: $search) {
      id
      name { full }
      image { large }
    }
  }`;
  const res = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { search: name } })
  });
  const data = await res.json();
  console.log(name, data.data?.Character);
  return data.data?.Character;
}

const shu = await searchAnilist('Shuu');
const sukiyaki = await searchAnilist('Sukiyaki Kozuki');

console.log({ shu, sukiyaki });
