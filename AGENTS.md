<!-- 共通ルール（消さない） -->
> **共通ルール：** 作業の前に、Ksan1333 の全プロジェクト共通のルール（非公開リポジトリ `Ksan1333/AgentRules` の `AGENTS.md`）を読み、それに従うこと。この PC では `%USERPROFILE%\Documents\Claude\AgentRules\AGENTS.md`、ない環境では `gh api repos/Ksan1333/AgentRules/contents/AGENTS.md -H "Accept: application/vnd.github.raw"` で読める。特に、GitHub Actions は使わない（ワークフローを作らない・動かさない。テストとビルドはこの PC で行う）。Release（`gh release create`）はユーザーが実行し、エージェントは実行しない。このファイルには、このプロジェクトだけの決まりを書く。

# KsanHub（Web 版）の決まり

- **公開リポジトリで、GitHub Pages で誰でも見られる**（`main` の `/` を配る。push すれば GitHub が配置する。Release はない）。秘密（サイトの URL・鍵・合言葉・トークン）、実際のデータ（自分の写真・記録・ファイル名・アカウント名）、個人名らしい名前を入れない。画面の例のデータは明らかに架空にする。Exit Interview は、謎・ステージ・`spoiler/` の中身が分かるものを出さない（タイトルと合言葉の画面だけ）。
- **一覧は scoop-bucket が持つ**：`data/catalog.js` と `icons/` は、`Ksan1333/scoop-bucket` の `catalog.json`・`icons/` から `node tools/sync-catalog.mjs` で写す（直接は直さない）。写す項目は `tools/sync-catalog.mjs` の中に書いた分だけで、配置・バックアップ・インストール先などは写さない。写す項目を足すときは、公開してよいかを確かめる。
- **見た目は PC 版の「アプリ」タブに合わせる**（scoop-bucket の `src/KsanHub/MainWindow.xaml` の色・角丸・余白）。インストール・更新などのボタンは置かない（見るだけ）。
- **画面の例**：`data/screens.js` にアプリの id ごとに並べる。再現した画面は `screens/src/*.html`（架空のデータ）を `node tools/shoot.mjs <名前>` で `screens/<名前>.webp` にする。本物の画面は架空のデータで撮った PNG を `node tools/shoot.mjs --png <PNG> <名前>` で画像にし、`real: true` を付ける。アプリの見た目が大きく変わったら、画面の例も直す。
- **確かめ方**：ページは `python -m http.server` などで開き、PC の幅（1280px）とスマホの幅（390px）で、一覧・カードを開いた状態・大きく見る画面を headless で描いて目で確かめてから push する（ウィンドウは出さない）。
