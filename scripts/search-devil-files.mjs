const defaultHeaders = { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://chainsaw-man.fandom.com/' };
const devils = ['Mold Devil', 'Skin Devil', 'Claw Devil', 'Needle Devil', 'Car Devil', 'House Devil', 'Gravity Devil', 'Loneliness Fiend'];

async function searchDevilFiles() {
  for (const d of devils) {
    const sUrl = `https://chainsaw-man.fandom.com/api.php?action=query&list=search&srsearch=${encodeURIComponent(d)}&srnamespace=6&format=json`;
    const res = await fetch(sUrl, { headers: defaultHeaders });
    const data = await res.json();
    console.log(d, 'hits:', data.query?.search?.slice(0, 5).map(s => s.title));
  }
}
searchDevilFiles();
