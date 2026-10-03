const defaultHeaders = { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://chainsaw-man.fandom.com/' };
const titles = ['Mold Devil', 'Skin Devil', 'Claw Devil', 'Teeth Devil', 'Needle Devil', 'Car Devil', 'House Devil', 'Gravity Devil', 'Loneliness Fiend'];

async function inspectImages() {
  for (const t of titles) {
    const url = `https://chainsaw-man.fandom.com/api.php?action=query&prop=images|pageimages&titles=${encodeURIComponent(t)}&pithumbsize=600&format=json&redirects=1`;
    const res = await fetch(url, { headers: defaultHeaders });
    const d = await res.json();
    const p = Object.values(d.query?.pages || {})[0];
    console.log(t, 'thumbnail:', p?.thumbnail?.source?.slice(0, 80));
    console.log(t, 'images:', p?.images?.map(i => i.title));
  }
}
inspectImages();
