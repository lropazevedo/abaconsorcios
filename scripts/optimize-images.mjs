/**
 * Otimiza as fotografias e logos do site.
 *
 * Entrada:  assets-src/fotos/*.jpg|png   (fotos originais, sem compressão)
 *           assets-src/logos/*.png       (logos oficiais das marcas parceiras)
 * Saída:    public/images/<nome>-<largura>.webp
 *           public/logos/<nome>.png      (mesmo arquivo, apenas redimensionado)
 *           public/og.jpg                (imagem de compartilhamento 1200x630)
 *           src/data/images.generated.json (dimensões usadas pelo componente <Photo />)
 *
 * Rode com: npm run images  (também roda automaticamente antes do build)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fotosDir = path.join(root, "assets-src/fotos");
const logosDir = path.join(root, "assets-src/logos");
const outImages = path.join(root, "public/images");
const outLogos = path.join(root, "public/logos");
const manifestPath = path.join(root, "src/data/images.generated.json");

const WIDTHS = [480, 960, 1440];
const QUALITY = 72;

fs.mkdirSync(outImages, { recursive: true });
fs.mkdirSync(outLogos, { recursive: true });

const manifest = {};

for (const file of fs.readdirSync(fotosDir)) {
  if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
  const name = file.replace(/\.[^.]+$/, "");
  const input = sharp(path.join(fotosDir, file)).rotate();
  const meta = await input.metadata();
  const portrait = (meta.orientation ?? 1) >= 5;
  const width = portrait ? meta.height : meta.width;
  const height = portrait ? meta.width : meta.height;

  const widths = WIDTHS.filter((w) => w < width);
  if (!widths.length || widths[widths.length - 1] < width) widths.push(Math.min(width, 1920));

  for (const w of widths) {
    const out = path.join(outImages, `${name}-${w}.webp`);
    if (fs.existsSync(out)) continue;
    await sharp(path.join(fotosDir, file)).rotate().resize({ width: w }).webp({ quality: QUALITY }).toFile(out);
  }
  manifest[name] = { width, height, widths };
  console.log(`foto  ${name}  ${width}x${height}  -> ${widths.join(", ")}`);
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

// Logos: apenas recorte de margens transparentes/brancas e redimensionamento.
// Nunca alteramos cores ou desenho (regra de co-branding do Brand Manual).
for (const file of fs.readdirSync(logosDir)) {
  if (!/\.png$/i.test(file)) continue;
  const out = path.join(outLogos, file);
  let img = sharp(path.join(logosDir, file));
  // Recorta só a margem vazia ao redor (sem alterar o desenho). Stellantis mantém o fundo oficial.
  if (file !== "stellantis.png") img = img.trim({ threshold: 10 });
  await img.resize({ width: 640, height: 640, fit: "inside", withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(out);
  console.log(`logo  ${file}`);
}

// Imagem de compartilhamento (Open Graph): foto real + marca oficial.
const ogOut = path.join(root, "public/og.jpg");
if (!fs.existsSync(ogOut)) {
  const photo = await sharp(path.join(fotosDir, "stand-jeep-lideranca.jpg"))
    .rotate()
    .resize({ width: 560, height: 630, fit: "cover", position: "centre" })
    .toBuffer();
  const logo = await sharp(path.join(root, "public/brand/aba-horizontal-negativo.svg"), { density: 300 })
    .resize({ width: 480 })
    .png()
    .toBuffer();
  const text = Buffer.from(`<svg width="640" height="630" xmlns="http://www.w3.org/2000/svg">
    <style>.t{font-family:Inter,Segoe UI,Arial,sans-serif;fill:#fff;font-weight:800;font-size:54px;letter-spacing:-1px}
    .s{font-family:Inter,Segoe UI,Arial,sans-serif;fill:#E6EBF1;font-weight:400;font-size:24px}</style>
    <text x="80" y="330" class="t">Conquistas que</text>
    <text x="80" y="394" class="t">te movem.</text>
    <rect x="80" y="440" width="56" height="4" fill="#00A79D"/>
    <text x="80" y="500" class="s">Consórcio automotivo em Pernambuco</text>
  </svg>`);
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#0B122B" } })
    .composite([
      { input: photo, left: 640, top: 0 },
      { input: logo, left: 80, top: 120 },
      { input: text, left: 0, top: 0 },
    ])
    .jpeg({ quality: 82 })
    .toFile(ogOut);
  console.log("og    public/og.jpg");
}
