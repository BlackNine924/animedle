import fs from 'fs';
import path from 'path';

const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
};

const chars = JSON.parse(fs.readFileSync('src/data/animes/tokyo-ghoul/characters.json'));

async function testFetch() {
  const results = [];
  for (const c of chars) {
    // try exact name, or name without parentheses
    const cleanName = c.name.replace(/\s*\([^)]*\)/g, '').trim();
    // try fandom pageimage
    let imgUrl = null;
    
    // Attempt 1: pageimages on tokyoghoul wiki
    try {
      const url = `https://tokyoghoul.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(cleanName)}&pithumbsize=600&format=json&redirects=1`;
      const res = await fetch(url, { headers: defaultHeaders });
      const data = await res.json();
      const page = Object.values(data.query?.pages || {})[0];
      if (page?.thumbnail?.source) {
        imgUrl = page.thumbnail.source;
      }
    } catch (e) {}

    // Attempt 2: search files with anime
    if (!imgUrl || imgUrl.includes('manga') || imgUrl.includes('Cover_Vol')) {
      try {
        const sUrl = `https://tokyoghoul.fandom.com/api.php?action=query&list=search&srsearch=${encodeURIComponent(cleanName + ' anime')}&srnamespace=6&format=json`;
        const sRes = await fetch(sUrl, { headers: defaultHeaders });
        const sData = await sRes.json();
        const firstHit = sData.query?.search?.[0]?.title;
        if (firstHit) {
          const imgInfoUrl = `https://tokyoghoul.fandom.com/api.php?action=query&prop=imageinfo&iiprop=url&titles=${encodeURIComponent(firstHit)}&format=json`;
          const iiRes = await fetch(imgInfoUrl, { headers: defaultHeaders });
          const iiData = await iiRes.json();
          const p = Object.values(iiData.query?.pages || {})[0];
          const found = p?.imageinfo?.[0]?.url;
          if (found) imgUrl = found;
        }
      } catch (e) {}
    }

    console.log(`${c.id}: ${cleanName} -> ${imgUrl ? imgUrl.slice(0, 90) : 'NOT FOUND'}`);
    results.push({ id: c.id, name: cleanName, imgUrl });
  }
}

testFetch();
