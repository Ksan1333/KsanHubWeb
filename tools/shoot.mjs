// 画面の例の画像を作る。
//   node tools/shoot.mjs                 … screens/src/*.html（_ で始まるものを除く）を描いて screens/<名前>.webp にする
//   node tools/shoot.mjs kiln-1 iori-2   … 名前を指定したものだけ
//   node tools/shoot.mjs --png <PNG> <名前> … ほかで撮った PNG（本物の画面）を screens/<名前>.webp にする
// HTML の大きさは <meta name="shot" content="width=1280,height=800,scale=1.5"> で決める。
// 描くのは Edge（Windows）か、環境変数 CHROME のブラウザー。npm install で playwright-core と sharp を入れておく。
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'screens', 'src');
const outDir = join(root, 'screens');
const MAX_W = 1600;   // これより大きい画像は縮める（PC の画面は 1600px で十分読める）

async function save(png, name) {
  const img = sharp(png);
  const { width } = await img.metadata();
  const out = join(outDir, `${name}.webp`);
  await (width > MAX_W ? img.resize({ width: MAX_W }) : img).webp({ quality: 82, effort: 5 }).toFile(out);
  const meta = await sharp(out).metadata();
  console.log(`${name}.webp  ${meta.width}×${meta.height}`);
}

const args = process.argv.slice(2);
if (args[0] === '--png') {
  if (!args[1] || !args[2]) throw new Error('使い方: node tools/shoot.mjs --png <PNG> <名前>');
  await save(readFileSync(args[1]), args[2]);
  process.exit(0);
}

const names = args.length ? args : readdirSync(srcDir).filter((f) => f.endsWith('.html') && !f.startsWith('_')).map((f) => f.slice(0, -5));
const launch = process.env.CHROME ? { executablePath: process.env.CHROME } : { channel: process.platform === 'win32' ? 'msedge' : 'chrome' };
const browser = await chromium.launch({ ...launch, args: ['--lang=ja-JP'] });
try {
  for (const name of names) {
    const file = join(srcDir, `${name}.html`);
    if (!existsSync(file)) { console.error(`ありません: ${file}`); continue; }
    const m = /<meta name="shot" content="([^"]+)"/.exec(readFileSync(file, 'utf8'));
    const o = Object.fromEntries((m ? m[1] : '').split(',').map((kv) => kv.split('=').map((s) => s.trim())).filter((kv) => kv.length === 2));
    const width = +o.width || 1280, height = +o.height || 800, scale = +o.scale || 1.5;
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: scale, locale: 'ja-JP' });
    await page.goto(pathToFileURL(file).href);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    await save(await page.screenshot(), name);
    await page.close();
  }
} finally {
  await browser.close();
}
