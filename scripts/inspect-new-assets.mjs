import sharp from "sharp";

async function run() {
  const sakamotoSrc = "C:/Users/User/Downloads/cards_anime_10_1024x1536/Sakamoto Days Card.png";
  const sakamotoOut = "C:/Users/User/.gemini/antigravity/brain/b9db9576-73d9-4de0-9dff-68fb4c09787d/new_sakamoto_days_inspect.jpg";
  await sharp(sakamotoSrc).resize({ width: 600 }).jpeg({ quality: 85 }).toFile(sakamotoOut);
  console.log("New Sakamoto Days preview saved!");
}
run();
