import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

export const LOGO_SPECS = {
  canvasSize: 384,
  contentTarget: 360, // 12px margin each side (~3.1%), ensures exact visual scale match
  compressionLevel: 9,
  quality: 95
};

/**
 * Standardize any logo image to the project's canonical 384x384 canvas
 * with exact trimmed bounding box and centered placement.
 * @param {string|Buffer} input - Input image path or Buffer
 * @param {string} outputPath - Destination file path
 */
export async function standardizeLogo(input, outputPath) {
  const { canvasSize, contentTarget, compressionLevel, quality } = LOGO_SPECS;

  // 1. Trim transparency to isolate pure artwork
  const trimmed = await sharp(input).trim().toBuffer({ resolveWithObject: true });

  // 2. Scale artwork inside contentTarget box preserving aspect ratio
  const resized = await sharp(trimmed.data)
    .resize(contentTarget, contentTarget, { fit: 'inside' })
    .toBuffer({ resolveWithObject: true });

  // 3. Composite into centered square canvas
  const left = Math.round((canvasSize - resized.info.width) / 2);
  const top = Math.round((canvasSize - resized.info.height) / 2);

  const standardized = await sharp({
    create: {
      width: canvasSize,
      height: canvasSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: resized.data, left, top }])
    .png({ compressionLevel, quality })
    .toBuffer();

  fs.writeFileSync(outputPath, standardized);
  console.log(`✓ Logo padronizada com sucesso em: ${outputPath} (${(standardized.length / 1024).toFixed(1)} KB)`);
  return standardized;
}

// CLI Execution:
// Usage 1: node scripts/standardize-logos.mjs (processes all logos in public/)
// Usage 2: node scripts/standardize-logos.mjs <inputImage> <outputLogoNameOrPath>
async function main() {
  const args = process.argv.slice(2);

  if (args.length >= 1) {
    const inputPath = args[0];
    let outputPath = args[1] || inputPath;
    if (!outputPath.includes('/') && !outputPath.includes('\\')) {
      outputPath = path.join(rootDir, 'public', outputPath);
    }
    await standardizeLogo(inputPath, outputPath);
    return;
  }

  const allLogos = [
    'logo-bleach.png',
    'logo-blue-lock.png',
    'logo-demon-slayer.png',
    'logo-dragon-ball.png',
    'logo-jujutsu-kaisen.png',
    'logo-naruto.png',
    'logo-one-piece.png',
    'logo-record-of-ragnarok.png',
    'logo-solo-leveling.png',
    'logo.png'
  ];

  for (const filename of allLogos) {
    const filePath = path.join(rootDir, 'public', filename);
    if (fs.existsSync(filePath)) {
      await standardizeLogo(filePath, filePath);
    }
  }
}

if (process.argv[1] === __filename) {
  main();
}
