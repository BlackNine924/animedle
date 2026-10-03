import sharp from 'sharp';

async function testAniList() {
  const query = `query {
    frieren: Character(search: "Frieren") { id name { full } image { large } }
    fern: Character(search: "Fern") { id name { full } image { large } }
    stark: Character(search: "Stark") { id name { full } image { large } }
    kaneki: Character(search: "Ken Kaneki") { id name { full } image { large } }
    risa: Character(search: "Risa Koizumi") { id name { full } image { large } }
  }`;
  const res = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  const data = await res.json();
  console.log(data);
  for (const k of Object.keys(data.data || {})) {
    const imgUrl = data.data[k]?.image?.large;
    if (imgUrl) {
      const r = await fetch(imgUrl);
      const buf = Buffer.from(await r.arrayBuffer());
      const s = await sharp(buf).stats();
      const meta = await sharp(buf).metadata();
      console.log(k, data.data[k].name.full, 'opaque:', s.isOpaque, 'size:', meta.width, meta.height, 'url:', imgUrl);
    }
  }
}
testAniList();
