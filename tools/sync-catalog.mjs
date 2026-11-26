// KsanHub（PC 版・Android 版）の一覧（scoop-bucket の catalog.json と icons/）から、Web 版で見せる分だけを写す。
// 使い方: node tools/sync-catalog.mjs [--from <scoop-bucket の clone>] [--check]
//   --from を省くと ../KsanHub、../scoop-bucket の順に探す（この PC では Documents\Claude\KsanHub が scoop-bucket の clone）。
//   --check は書き換えず、写した結果が今のファイルと違えば終了コード 1 で知らせる。
// 公開ページなので、配置・バックアップ・インストール先などの項目は写さない（下の PICK にあるものだけ）。
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync, copyFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const check = args.includes('--check');
const fromIdx = args.indexOf('--from');
const candidates = fromIdx >= 0 ? [args[fromIdx + 1]] : [process.env.KSANHUB_REPO, '../KsanHub', '../scoop-bucket'];
const src = candidates.filter(Boolean).map((p) => resolve(root, p)).find((p) => existsSync(join(p, 'catalog.json')));
if (!src) {
  console.error('scoop-bucket の clone が見つかりません。--from <フォルダー> で指定してください。');
  process.exit(2);
}

const catalog = JSON.parse(readFileSync(join(src, 'catalog.json'), 'utf8'));
const pick = (o, keys) => Object.fromEntries(keys.filter((k) => o[k] !== undefined && o[k] !== '' && !(Array.isArray(o[k]) && o[k].length === 0)).map((k) => [k, o[k]]));
const SPEC = ['env', 'need', 'optional', 'guide'];
const icons = new Set(['hub.png']);
const iconPath = (p) => {
  if (!p) return undefined;
  const name = p.split('/').pop();
  icons.add(name);
  return `icons/${name}`;
};

const apps = (catalog.apps ?? []).map((a) => {
  const o = pick(a, ['id', 'name', 'tagline', 'kind', 'group', 'color', 'features', 'stack', 'details']);
  o.icon = iconPath(a.icon);
  if (a.kind === 'pages' && a.url) o.url = a.url;   // 公開ページの URL だけ（AWS のサイトの URL は catalog にもない）
  if (a.spec) o.spec = pick(a.spec, SPEC);
  return o;
});
const ended = (catalog.ended ?? []).map((e) => {
  const o = pick(e, ['id', 'name', 'tagline', 'status', 'version', 'endedOn', 'color', 'features', 'stack', 'repo']);
  o.icon = iconPath(e.icon);
  return o;
});
const groups = (catalog.groups ?? []).map((g) => pick(g, ['id', 'title']));

const body = JSON.stringify({ groups, apps, ended }, null, 1);
const text = `// 自動生成（node tools/sync-catalog.mjs）。直接は直さない。元は Ksan1333/scoop-bucket の catalog.json\nwindow.KSANHUB_CATALOG = ${body};\n`;
const out = join(root, 'data', 'catalog.js');
const iconDir = join(root, 'icons');

const problems = [];
if (!existsSync(out) || readFileSync(out, 'utf8') !== text) problems.push('data/catalog.js');
const want = [...icons].filter((n) => existsSync(join(src, 'icons', n))).sort();
for (const n of want) {
  const dst = join(iconDir, n);
  if (!existsSync(dst) || !readFileSync(dst).equals(readFileSync(join(src, 'icons', n)))) problems.push(`icons/${n}`);
}
const extra = existsSync(iconDir) ? readdirSync(iconDir).filter((n) => !want.includes(n)) : [];
problems.push(...extra.map((n) => `icons/${n}（不要）`));

if (check) {
  if (problems.length) {
    console.error(`Web 版の一覧が catalog.json と違います: ${problems.join(', ')}\nnode tools/sync-catalog.mjs で写してください。`);
    process.exit(1);
  }
  console.log('Web 版の一覧は catalog.json と同じです。');
  process.exit(0);
}

mkdirSync(dirname(out), { recursive: true });
mkdirSync(iconDir, { recursive: true });
writeFileSync(out, text);
for (const n of want) copyFileSync(join(src, 'icons', n), join(iconDir, n));
for (const n of extra) rmSync(join(iconDir, n));
const missing = [...icons].filter((n) => !want.includes(n));
console.log(`写しました: アプリ ${apps.length} 件・終了したプロジェクト ${ended.length} 件・アイコン ${want.length} 個（元: ${src}）`);
if (missing.length) console.log(`アイコンのファイルがないもの: ${missing.join(', ')}（頭文字と色で出します）`);
if (problems.length) console.log(`変わったもの: ${problems.join(', ')}`);

// 画面の例（data/screens.js）がないアプリを知らせる（なくても一覧には出る）
const screensFile = join(root, 'data', 'screens.js');
if (existsSync(screensFile)) {
  const s = readFileSync(screensFile, 'utf8');
  const noShots = apps.filter((a) => !new RegExp(`["']?${a.id.replace(/[-]/g, '\\-')}["']?\\s*:`).test(s)).map((a) => a.id);
  if (noShots.length) console.log(`画面の例がまだないアプリ: ${noShots.join(', ')}（data/screens.js に足す）`);
}
