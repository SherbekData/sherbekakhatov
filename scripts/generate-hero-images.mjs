import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = process.cwd();
const inputPath = path.join(rootDir, 'public', 'miraki-hero.jpg');
const outputDir = path.join(rootDir, 'public', 'images', 'hero');
const blurModulePath = path.join(rootDir, 'lib', 'hero-blur-data.ts');
const widths = [640, 1024, 1440, 1920];
const maxDesktopBytes = 500 * 1024;

async function encodeVariant(width) {
  let quality = 85;
  let buffer;

  do {
    buffer = await sharp(inputPath)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .avif({ quality, effort: 6 })
      .toBuffer();

    if (width !== 1920 || buffer.length <= maxDesktopBytes || quality <= 55) {
      break;
    }

    quality -= 5;
  } while (true);

  const filename = `hero-${width}.avif`;
  fs.writeFileSync(path.join(outputDir, filename), buffer);
  console.log(`${filename}: ${(buffer.length / 1024).toFixed(1)}KB, quality=${quality}`);
}

async function main() {
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Hero source image not found: ${inputPath}`);
  }

  fs.mkdirSync(outputDir, { recursive: true });
  fs.mkdirSync(path.dirname(blurModulePath), { recursive: true });

  await Promise.all(widths.map(encodeVariant));

  const blurBuffer = await sharp(inputPath)
    .rotate()
    .resize({ width: 16, withoutEnlargement: true })
    .avif({ quality: 35, effort: 4 })
    .toBuffer();

  const blurDataURL = `data:image/avif;base64,${blurBuffer.toString('base64')}`;

  fs.writeFileSync(
    path.join(outputDir, 'hero-blur.json'),
    JSON.stringify({ blurDataURL }, null, 2)
  );

  fs.writeFileSync(
    blurModulePath,
    `export const heroBlurDataURL = ${JSON.stringify(blurDataURL)};\n`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
