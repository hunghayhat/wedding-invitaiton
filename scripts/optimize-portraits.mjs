import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const portraitsDir = path.join(process.cwd(), "public", "portraits");
const originalsDir = path.join(process.cwd(), "assets", "originals", "portraits");
const portraits = ["bride", "groom"];

await fs.mkdir(originalsDir, { recursive: true });

for (const name of portraits) {
  const publicSource = path.join(portraitsDir, `${name}.jpg`);
  const output = path.join(portraitsDir, `${name}.webp`);
  const backup = path.join(originalsDir, `${name}.jpg`);
  let source = publicSource;

  try {
    await fs.access(publicSource);
  } catch {
    try {
      await fs.access(backup);
      source = backup;
    } catch {
      console.log(`Skipped ${name}.jpg: source file not found`);
      continue;
    }
  }

  await sharp(source)
    .rotate()
    .resize({
      width: 1200,
      height: 1200,
      fit: "cover",
      position: "top",
    })
    .webp({
      quality: 82,
      effort: 6,
    })
    .toFile(output);

  const before = (await fs.stat(source)).size;
  const after = (await fs.stat(output)).size;

  if (source === publicSource) {
    await fs.rename(source, backup);
  }

  console.log(
    `${name}.jpg -> ${name}.webp: ${(before / 1024 / 1024).toFixed(1)}MB -> ${(
      after /
      1024 /
      1024
    ).toFixed(1)}MB`,
  );
}
