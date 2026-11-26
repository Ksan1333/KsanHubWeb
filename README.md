# KsanHub（Web 版）

KsanHub のアプリ一覧を、ブラウザーで見られるようにしたページです。**見るだけ**で、インストール・更新はできません（それは PC 版・Android 版の KsanHub で行います）。

**▶ 公開ページ：https://ksan1333.github.io/KsanHubWeb/**

- 一覧の並び・行・開いたカードは、PC 版（WPF）の「アプリ」タブと同じ作りです。組の見出しを押すと組ごと開閉し、行を押すとその場でカードに開きます。
- カードを開くと、そのアプリの**画面の例**が出ます。画面を押すと大きく見られます（← → で次の画面、Esc で閉じる。スマホは左右にスワイプ）。
- `https://ksan1333.github.io/KsanHubWeb/#kiln` のように `#アプリの id` を付けると、そのアプリを開いた状態で表示します。
- 公開ページなので、画面の例のデータはすべて架空です。秘密（URL・鍵・合言葉）や実際のデータは入れません。

## ファイル

| 場所 | 中身 |
|---|---|
| `index.html`・`assets/` | ページ本体（HTML・CSS・JS。ビルドなし） |
| `data/catalog.js` | 一覧。`Ksan1333/scoop-bucket` の `catalog.json` から、公開してよい項目だけを写したもの（**自動生成。直接は直さない**） |
| `icons/` | アプリのアイコン（scoop-bucket の `icons/` から写したもの） |
| `data/screens.js` | 画面の例の並び（アプリの id ごと。画像・題・枠の種類） |
| `screens/*.webp` | 画面の例の画像 |
| `screens/src/*.html` | 再現した画面の元の HTML（架空のデータ）。`_photo.js` は架空の写真を描く部品 |
| `tools/sync-catalog.mjs` | scoop-bucket の一覧を写す |
| `tools/shoot.mjs` | `screens/src/*.html` を描いて画像にする。ほかで撮った PNG を画像にもする |

## 一覧を直したとき

アプリの説明・アイコンは scoop-bucket（PC 版・Android 版の KsanHub と同じもの）で直し、そのあとこのリポジトリに写します。

```bash
node tools/sync-catalog.mjs            # ../KsanHub（scoop-bucket の clone）から写す。別の場所なら --from <フォルダー>
node tools/sync-catalog.mjs --check    # 写した内容が今の catalog.json と同じか確かめるだけ
```

写すのは、名前・説明・特徴・技術・使うのに必要なもの・補足・アイコン・組・終了したプロジェクトだけです（配置・バックアップ・インストール先などは写しません）。画面の例がまだないアプリは、写したときに名前が出ます。

## 画面の例を足す・直す

1. 再現した画面なら `screens/src/<アプリの id>-<番号>.html` を作る（大きさは先頭の `<meta name="shot" content="width=…,height=…,scale=…">`）。本物の画面を撮ったなら、その PNG を使う。
2. 画像にする（初回だけ `npm install`。描くのは Edge）。

   ```bash
   npm install
   node tools/shoot.mjs kiln-1                    # 再現した画面を描く（名前を省くと全部）
   node tools/shoot.mjs --png 撮った画面.png kiln-3 # 本物の画面の PNG を画像にする
   ```

3. `data/screens.js` に足す。`frame` は枠の種類（`bare`：そのまま・`window`：Windows の窓・`browser`：ブラウザー・`phone`：スマホ・`land`：横持ちのスマホ）、本物の画面には `real: true` を付ける。

本物の画面は、それぞれのアプリをブラウザーや確認用のサーバーで動かし、架空のデータを入れて撮っています（ReviewInsight・Kurashi・Notoha・Kiln・Iori・MediaRelay・カルダシェフ文明マップ）。MediaShelf は、アプリの見本のライブラリ（架空）で描いた画面（MediaShelf の `docs/devlog/img` にあるもの）を使っています。ほかの WPF・Android のアプリ（InstaVault・KsanHub・MediaShelf Pocket・CableCheck・KsanHub Android・MediaRelay Android・Exit Interview）と Basho は、実際の画面の作りをもとに HTML で再現しています。Exit Interview は、タイトルと合言葉の画面だけです（謎やステージは出しません）。

## 公開のしかた

GitHub Pages の「Deploy from a branch」（`main` の `/`）で公開しています。`main` に push すると GitHub が配置します（GitHub Actions のワークフローは作りません）。`.nojekyll` があるので、ファイルはそのまま配られます。
