import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// AniList GraphQL query
const ANILIST_QUERY = `query ($search: String) {
  Character(search: $search) {
    id
    name { full native alternative }
    image { large medium }
  }
}`;

export async function fetchAniListImage(name) {
  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: ANILIST_QUERY, variables: { search: name } })
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data?.Character?.image?.large || null;
  } catch {
    return null;
  }
}

export async function fetchWikiThumbnail(domain, title) {
  const url = `https://${domain}.fandom.com/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=800&format=json&redirects=1`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': `https://${domain}.fandom.com/`
      }
    });
    if (!res.ok) return null;
    const data = await res.json();
    const page = Object.values(data.query?.pages || {})[0];
    return page?.thumbnail?.source || null;
  } catch {
    return null;
  }
}

export async function processAvatarTightFace(buffer, outputPath, isAniList = false) {
  const meta = await sharp(buffer).metadata();
  const w = meta.width;
  const h = meta.height;

  let pipeline = sharp(buffer);

  if (isAniList) {
    // AniList is already a bust portrait (e.g. 230x345).
    // Focus tightly on head/face (top 70% of the image)
    const side = Math.min(w, h);
    const top = Math.round((h - side) * 0.12);
    const left = Math.round((w - side) / 2);
    pipeline = pipeline.extract({
      left: Math.max(0, left),
      top: Math.max(0, top),
      width: Math.min(side, w - Math.max(0, left)),
      height: Math.min(side, h - Math.max(0, top))
    });
  } else {
    // Wiki full body or vertical art
    if (h > w * 1.8) {
      // Tall full body: head is in the top 20%, centered horizontally
      const size = Math.round(w * 0.65);
      const top = Math.round(h * 0.02);
      const left = Math.round((w - size) / 2);
      pipeline = pipeline.extract({
        left: Math.max(0, left),
        top: Math.max(0, top),
        width: Math.min(size, w - Math.max(0, left)),
        height: Math.min(size, h - Math.max(0, top))
      });
    } else if (h > w * 1.2) {
      // 3/4 or half-body portrait
      const size = Math.round(w * 0.75);
      const top = Math.round(h * 0.03);
      const left = Math.round((w - size) / 2);
      pipeline = pipeline.extract({
        left: Math.max(0, left),
        top: Math.max(0, top),
        width: Math.min(size, w - Math.max(0, left)),
        height: Math.min(size, h - Math.max(0, top))
      });
    } else {
      // Square or wide illustration: crop around upper-middle
      const size = Math.round(Math.min(w, h) * 0.75);
      const top = Math.round((h - size) * 0.15);
      const left = Math.round((w - size) / 2);
      pipeline = pipeline.extract({
        left: Math.max(0, left),
        top: Math.max(0, top),
        width: Math.min(size, w - Math.max(0, left)),
        height: Math.min(size, h - Math.max(0, top))
      });
    }
  }

  await pipeline
    .resize(240, 240, { fit: 'cover', position: 'top' })
    .png({ quality: 95 })
    .toFile(outputPath);
}

export async function fetchAndBuildAvatar(char, wikiDomain, outAvatarsDir) {
  const outputPath = path.join(outAvatarsDir, `${char.id}.png`);
  
  // Try AniList first for official anime face closeups
  let imgUrl = null;
  let isAniList = false;

  const searchName = char.searchName || char.name.split('(')[0].trim();
  imgUrl = await fetchAniListImage(searchName);
  if (imgUrl) {
    isAniList = true;
  }

  // If AniList didn't find it, fallback to Wiki
  if (!imgUrl && wikiDomain) {
    const wikiTitle = char.wikiTitle || searchName;
    imgUrl = await fetchWikiThumbnail(wikiDomain, wikiTitle);
    if (!imgUrl && char.wikiTitle !== char.name) {
      imgUrl = await fetchWikiThumbnail(wikiDomain, char.name);
    }
  }

  if (imgUrl) {
    try {
      const res = await fetch(imgUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        await processAvatarTightFace(buf, outputPath, isAniList);
        return true;
      }
    } catch (e) {
      console.warn(`Failed image fetch for ${char.name}:`, e.message);
    }
  }
  return false;
}
