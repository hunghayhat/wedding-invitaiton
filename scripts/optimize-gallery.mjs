import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const galleryDir = path.join(process.cwd(), "public", "images", "gallery");
const originalsDir = path.join(process.cwd(), "assets", "originals", "gallery");
const supportedExtensions = new Set([".jpg", ".jpeg", ".png"]);

await fs.mkdir(originalsDir, { recursive: true });

const entries = await fs.readdir(galleryDir, { withFileTypes: true });
const images = entries
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name)
  .filter((fileName) => supportedExtensions.has(path.extname(fileName).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

if (!images.length) {
  console.log("No gallery source images found");
}

for (const fileName of images) {
  const parsed = path.parse(fileName);
  const source = path.join(galleryDir, fileName);
  const output = path.join(galleryDir, `${parsed.name}.webp`);
  const backup = path.join(originalsDir, fileName);

  await sharp(source)
    .rotate()
    .resize({
      width: 1600,
      withoutEnlargement: true,
    })
    .webp({
      quality: 82,
      effort: 6,
    })
    .toFile(output);

  const before = (await fs.stat(source)).size;
  const after = (await fs.stat(output)).size;

  await fs.rename(source, backup);

  console.log(
    `${fileName} -> ${parsed.name}.webp: ${(before / 1024 / 1024).toFixed(
      1,
    )}MB -> ${(after / 1024).toFixed(1)}KB`,
  );
}
