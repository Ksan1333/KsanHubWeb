// 自動生成（node tools/sync-catalog.mjs）。直接は直さない。元は Ksan1333/scoop-bucket の catalog.json
window.KSANHUB_CATALOG = {
 "groups": [
  {
   "id": "web",
   "title": "Web（AWS）"
  },
  {
   "id": "pages",
   "title": "Web（GitHub Pages）"
  },
  {
   "id": "net",
   "title": ".NET（C#）"
  },
  {
   "id": "tauri",
   "title": "Tauri（Rust）"
  },
  {
   "id": "android",
   "title": "Android"
  },
  {
   "id": "tool",
   "title": "ツール"
  }
 ],
 "apps": [
  {
   "id": "mediashelf",
   "name": "MediaShelf",
   "tagline": "作品単位のローカルメディア棚。サイトからの収集も（MediaPick を統合）",
   "kind": "velopack",
   "group": "net",
   "color": "#6A48F5",
   "features": [
    "音声作品・動画・マンガ・ゲーム・画像を「作品＋関連ファイル」で管理",
    "フォルダ走査で作品を自動判定、内蔵の再生・閲覧",
    "集める：登録したサイトで選んでまとめて保存。保存した作品は再走査なしでライブラリと新着の整理へ。YouTube の再生リストから未保存の動画だけを yt-dlp で保存",
    "作者別：サイトのアカウントと手元の作品を同じ作者としてまとめ、全部保存・サイトの新着まで 1 画面で",
    "整理計画とジャーナル。元のファイルは変更しない"
   ],
   "stack": [
    ".NET 10",
    "WPF",
    "SQLite",
    "libmpv",
    "WebView2",
    "yt-dlp",
    "Velopack"
   ],
   "details": [
    "インストーラーは Velopack（%LOCALAPPDATA%\\MediaShelf に入る）。MediaPick は 2026-11-12 に「集める」「作者別」として取り込んだ。",
    "リポジトリ：Ksan1333/MediaShelf（非公開）"
   ],
   "icon": "icons/mediashelf.png",
   "spec": {
    "env": "Windows 11（64 ビット）",
    "need": ".NET 10 デスクトップランタイム（インストーラーが入れる）。WebView2 Runtime（Windows 11 は標準）",
    "optional": "yt-dlp・ffmpeg（集める・YouTube の保存。設定のボタンで入れる）",
    "guide": "メモリ 8 GB 以上。作品を置くドライブに、作品の分の空き。動画の再生は GPU の動画支援があると軽い"
   }
  },
  {
   "id": "instavault",
   "name": "InstaVault",
   "tagline": "許可を得た Instagram アカウントの投稿をローカルに保存・閲覧",
   "kind": "nsis",
   "group": "net",
   "color": "#111419",
   "features": [
    "ウィンドウ内で Instagram にログインし、投稿・コメント（返信つき）・画像・動画・プロフィールを保存",
    "本文検索、ユーザー・種別・期間で絞り込み、並べ替え、ブックマーク。投稿は同じ窓のモーダルで開く",
    "Windows ログイン時に保存済みユーザーの新着だけを、画面に出ない内蔵ブラウザーで自動確認・保存"
   ],
   "stack": [
    ".NET 10",
    "WPF",
    "WebView2",
    "SQLite"
   ],
   "details": [
    "インストーラー（InstaVault-版-Setup.exe）で %LOCALAPPDATA%\\Programs\\InstaVault に入る。",
    "リポジトリ：Ksan1333/InstaVault（非公開）"
   ],
   "icon": "icons/instavault.png",
   "spec": {
    "env": "Windows 11（64 ビット）",
    "need": "WebView2 Runtime（Windows 11 は標準）。Instagram のアカウント（保存してよいアカウントだけを扱う）。.NET は exe に同梱",
    "optional": "Windows の N／KN エディションでは、動画の再生にメディア機能パック",
    "guide": "メモリ 8 GB 以上。保存した画像・動画の分の空き（%USERPROFILE%\\.ksanhub\\InstaVault）"
   }
  },
  {
   "id": "mediashelf-pocket",
   "name": "MediaShelf Pocket",
   "tagline": "MediaShelf の Android 版（旧 PixVault）",
   "kind": "android",
   "group": "android",
   "color": "#9A5CF2",
   "features": [
    "画像・GIF・動画を2〜28列で一覧、検索・フィルタ・範囲選択",
    "AIでタグ・年齢区分・特徴ベクトルを分析、類似メディア表示",
    "フォルダ・ゴミ箱・一括編集、Xからのメディア保存、ZIP/PDFの本"
   ],
   "stack": [
    "Kotlin",
    "Jetpack Compose",
    "Room",
    "Media3",
    "ONNX Runtime"
   ],
   "details": [
    "APK は公開の Ksan1333/MediaShelfPocket-releases。アプリ内の更新を確かめるのはボタンを押したときだけ。",
    "リポジトリ：Ksan1333/MediaShelfPocket（非公開）"
   ],
   "icon": "icons/mediashelf-pocket.png",
   "spec": {
    "env": "Android 7.0 以上、64 ビットの ARM（arm64-v8a）の端末",
    "need": "写真・動画へのアクセスの許可",
    "guide": "メモリ 4 GB 以上（AI 分析を裏で回すとき）"
   }
  },
  {
   "id": "cablecheck",
   "name": "CableCheck",
   "tagline": "ケーブル・充電器の性能チェックと断捨離の記録",
   "kind": "android",
   "group": "android",
   "color": "#1E3A5F",
   "features": [
    "充電テスト：電流の中央値・ばらつき・合意電圧を測り、基準ケーブル比で残す／処分を自動判定",
    "データ転送テスト：OTG の USB ストレージや PC（adb）への転送速度で USB 3.x かを判定",
    "ケーブル・充電器・モバブに番号を付けて一覧、判定別のサマリーと CSV 出力"
   ],
   "stack": [
    "Kotlin",
    "Jetpack Compose",
    "Room"
   ],
   "details": [
    "APK は公開の Ksan1333/CableCheck-releases（ソースは非公開）。",
    "リポジトリ：Ksan1333/CableCheck（非公開）"
   ],
   "icon": "icons/cablecheck.png",
   "spec": {
    "env": "Android 10 以上（USB-C の端末）",
    "optional": "基準にするケーブル・充電器。データ転送テストには OTG の USB ストレージか、adb でつないだ PC",
    "guide": "充電の電流をどこまで細かく読めるかは端末による"
   }
  },
  {
   "id": "ksanhub-android",
   "name": "KsanHub（Android 版）",
   "tagline": "スマホから自作アプリの APK を入れる・更新する、Web アプリを AWS に配置する、Basho をバックアップする",
   "kind": "android",
   "group": "android",
   "color": "#253049",
   "features": [
    "アプリ一覧・プロジェクト一覧・バックアップ・設定の 4 画面。一覧は PC 版と同じ catalog.json を GitHub から読む",
    "Android アプリの APK を GitHub の Release から取り、SHA-256 を照合してインストール・更新（KsanHub 自身も）",
    "Web アプリを AWS に配置（AWS の CodeBuild が PC・CloudShell と同じ配置スクリプトを動かす）。配置が最新かも確かめる",
    "Basho（Web版）の AWS のデータをスマホのフォルダーに写す・AWS に戻す"
   ],
   "stack": [
    "Kotlin",
    "Jetpack Compose",
    "AWS CodeBuild",
    "AWS Lambda"
   ],
   "details": [
    "APK は公開の Ksan1333/KsanHubAndroid-releases。自身の更新を確かめるのはボタンを押したときだけ。トークンと鍵は端末の Keystore で暗号化して保存する。",
    "リポジトリ：Ksan1333/KsanHubAndroid（非公開）"
   ],
   "icon": "icons/ksanhub-android.png",
   "spec": {
    "env": "Android 8.0 以上",
    "need": "GitHub のトークン（classic・repo）。KsanHub に「この提供元のアプリを許可」",
    "optional": "AWS に配置するとき：CloudShell で aws/setup-android-deploy.sh を 1 回動かして作るスマホ用の鍵",
    "guide": "軽いアプリで、ふつうのスマホで足りる"
   }
  },
  {
   "id": "mediarelay-android",
   "name": "MediaRelay（Android 版）",
   "tagline": "自宅の PC の MediaRelay とスマホの間で、写真・動画を撮影日時を変えずにやり取り",
   "kind": "android",
   "group": "android",
   "color": "#111111",
   "features": [
    "PC の公開フォルダーを見て、写真・動画をスマホに保存（撮影日時は DATE_TAKEN に入れる）",
    "撮った写真・動画を、Wi-Fi のときに PC へ自動で送る（1 時間ごと・開いたとき・「今すぐ送る」）。ほかのアプリの「共有」からも送れる",
    "PC は mDNS で見つけ、PC に出る 6 桁のコードでつなぐ。自宅の LAN の中だけで、クラウドは使わない"
   ],
   "stack": [
    "Kotlin",
    "Jetpack Compose",
    "WorkManager",
    "Media3"
   ],
   "details": [
    "APK は PC 版と同じ Ksan1333/MediaRelay-releases。KsanHub の Android 版で入れる・更新する。実機ではまだ試していない。",
    "リポジトリ：Ksan1333/MediaRelay（非公開）"
   ],
   "icon": "icons/mediarelay.png",
   "spec": {
    "env": "Android 11 以上",
    "need": "自宅の PC で動く MediaRelay（PC 版）と、同じ Wi-Fi（LAN）",
    "guide": "受け取る写真・動画の分の空き"
   }
  },
  {
   "id": "exitinterview",
   "name": "Exit Interview",
   "tagline": "通話しながら遊ぶ、2人専用の脱出ゲーム",
   "kind": "android",
   "group": "android",
   "color": "#2E4A49",
   "features": [
    "2人専用。別々のスマホから同じ部屋に入り、通話しながら手分けして探して解く（横画面、3ステージ、目安は 90〜120 分）",
    "見えるものと持ち物は2人で共通。相手が見ている場所へ1タップで移動できる",
    "段階ヒントと救済スキップつき。途中でやめても、同じ合言葉で続きから再開できる"
   ],
   "stack": [
    "Kotlin",
    "Jetpack Compose"
   ],
   "details": [
    "APK は Ksan1333/ExitInterview の Release に置き、KsanHub の Android 版で入れる・更新する。2 人は「遊ぶ」で同じ合言葉を入れてつながる。部屋サーバーは ap-southeast-2 に配置し、KsanHub の「AWS に配置」で更新する（初めての配置だけ CloudShell）。",
    "リポジトリ：Ksan1333/ExitInterview（公開）"
   ],
   "icon": "icons/exitinterview.png",
   "spec": {
    "env": "Android 8.0 以上（横画面）",
    "need": "一緒に遊ぶ相手（Android のスマホがもう 1 台）と通話（LINE など）。AWS に配置した部屋サーバー（アドレスは APK に入っているので設定は要らない）",
    "guide": "1 回の通しで 90〜120 分。通信は 1 秒ごとの小さなやり取りだけ"
   }
  },
  {
   "id": "kardashev-map",
   "name": "カルダシェフ文明マップ",
   "tagline": "宇宙誕生から Type III 文明まで、時代スライダーで世界を描くインタラクティブ・ガイドブック",
   "kind": "pages",
   "group": "pages",
   "color": "#0A0F1F",
   "features": [
    "上部のカルダシェフ・スライダーで、すべてのタブがその時代の姿に切り替わる",
    "全体マップ・年表・宇宙／地球／ミクロ・系統樹・宇宙の法則・地球大全の6タブと 3D の場面",
    "全体検索（/ か Ctrl+K）で出来事・国・元素・生き物・天体を横断して移動"
   ],
   "stack": [
    "HTML",
    "JavaScript",
    "three.js",
    "GitHub Pages"
   ],
   "details": [
    "公開リポジトリ。https://ksan1333.github.io/kardashev-map/ で公開し、KsanHub の「サイトを開く」で開く。",
    "リポジトリ：Ksan1333/kardashev-map（公開）"
   ],
   "icon": "icons/kardashev-map.png",
   "url": "https://ksan1333.github.io/kardashev-map/",
   "spec": {
    "env": "PC・スマホのブラウザー（WebGL が使えるもの）",
    "need": "なし（公開ページ）",
    "guide": "3D の場面は PC か新しめのスマホが快適"
   }
  },
  {
   "id": "reviewinsight",
   "name": "ReviewInsight",
   "tagline": "作業実績とレビュー指摘の記録・分析（Web版 v2）",
   "kind": "web",
   "group": "web",
   "color": "#2F75E8",
   "features": [
    "年度・案件・工程ごとの作業時間とステップ数、人日・人月換算",
    "レビュー指摘を記録し、次回の確認観点・チェックシートに活かす",
    "PC・スマホのブラウザで同じデータ。オフラインでも記録できる"
   ],
   "stack": [
    "CloudFront",
    "S3",
    "Cognito",
    "Lambda",
    "DynamoDB",
    "SAM"
   ],
   "details": [
    "native-v2 ブランチ。ap-southeast-2 に配置し、KsanHub の「AWS に配置」で更新する。",
    "リポジトリ：Ksan1333/ReviewInsight（非公開）"
   ],
   "icon": "icons/reviewinsight.png",
   "spec": {
    "env": "PC・スマホの新しめのブラウザー（Chrome・Edge・Safari）",
    "need": "招待されたアカウント（ログインして使う）",
    "guide": "インストールは要らない"
   }
  },
  {
   "id": "kurashi",
   "name": "Kurashi",
   "tagline": "食事と運動の習慣を毎日記録（旧 習慣ログ）",
   "kind": "web",
   "group": "web",
   "color": "#2F7D5B",
   "features": [
    "時間帯ごとの習慣チェック（連続日数・数値の記録）、運動日の自動配置、チートデイ、体重グラフ、食事写真",
    "5週間カレンダー・達成率・AI の週まとめ、Claude との相談と編集できるガイド",
    "Web Push の通知、週1回のバックアップ、オフラインでも記録。スマホ・PC で同じ記録。記録と食事の写真は KsanHub（PC 版）で必要なときに PC にもバックアップ（自動では取らない）"
   ],
   "stack": [
    "Lambda (Node.js 22)",
    "関数URL",
    "DynamoDB",
    "S3",
    "EventBridge",
    "PWA"
   ],
   "details": [
    "ap-southeast-2 に配置し、KsanHub の「AWS に配置」で更新する（データ・URL・合言葉は変わらない）。バックアップ（記録と食事の写真）は KsanHub（PC 版）が API から取る。",
    "リポジトリ：Ksan1333/Kurashi（非公開）"
   ],
   "icon": "icons/kurashi.png",
   "spec": {
    "env": "スマホ・PC のブラウザー（ホーム画面に追加して使う）",
    "need": "合言葉",
    "optional": "通知を受けるならブラウザーの通知の許可（iPhone はホーム画面に追加したときだけ）",
    "guide": "インストールは要らない"
   }
  },
  {
   "id": "notoha",
   "name": "Notoha",
   "tagline": "ローカルファーストのノート・Webクリップ",
   "kind": "nsis",
   "group": "tauri",
   "color": "#4E7A50",
   "features": [
    "本文はMarkdown／テキストで保存し、SQLiteは再構築できる索引",
    "内部リンク・バックリンク、Notion風のノートDB表",
    "Webクリップ（画像ローカル保存）、X投稿保存、Ollamaで要約"
   ],
   "stack": [
    "Tauri 2",
    "React",
    "Rust",
    "SQLite FTS5"
   ],
   "details": [
    "インストーラー（Notoha_版_x64-setup.exe）で入る。",
    "リポジトリ：Ksan1333/Notoha（非公開）"
   ],
   "icon": "icons/notoha.png",
   "spec": {
    "env": "Windows 11（64 ビット）",
    "need": "WebView2 Runtime（Windows 11 は標準）",
    "optional": "Ollama（AI 要約・AI タグ。設定の「Ollama を入れる」で入れられる）",
    "guide": "メモリ 8 GB 以上。データは %USERPROFILE%\\.ksanhub-local\\Notoha に置くので、そこが SSD だと速い。AI を使うならモデルの分の空き（数 GB）と GPU があると速い"
   }
  },
  {
   "id": "kiln",
   "name": "Kiln",
   "tagline": "ローカル ComfyUI 向け画像生成の出力支援",
   "kind": "nsis",
   "group": "tauri",
   "color": "#B8673F",
   "features": [
    "依頼文からプロンプトを作り、品質タグとネガティブをベースモデル別に補う",
    "目標枚数そろうまで自動で焼成し、破綻した画像は除外。GPU が熱いときやメモリが足りないときは待つ（Basho と GPU を分け合う）",
    "Civitai・Hugging Face からモデルを探して ComfyUI の正しいフォルダへ自動配置。Kiln を開くと ComfyUI も自動で起動"
   ],
   "stack": [
    "Tauri 2",
    "React",
    "Rust",
    "SQLite",
    "ComfyUI",
    "Civitai",
    "Hugging Face"
   ],
   "details": [
    "Kiln 自体は推論せず、生成は ComfyUI に任せる。Kiln を開くと ComfyUI も起動し、閉じるときは Kiln が起動した分を止める。外への通信は Civitai・Hugging Face と、ComfyUI・Ollama を入れるときの公式の GitHub Releases だけ。",
    "リポジトリ：Ksan1333/Kiln（非公開）"
   ],
   "icon": "icons/kiln.png",
   "spec": {
    "env": "Windows 11（64 ビット）",
    "need": "ComfyUI（127.0.0.1:8188 で動かす。設定の「ComfyUI を入れる」で公式のポータブル版を入れられる）",
    "optional": "Ollama か LM Studio（本文づくり・言葉で直して焼き直す）、ComfyUI-WD14-Tagger（タグ判定。ComfyUI に自分で入れる）",
    "guide": "NVIDIA の GPU で VRAM 8 GB 以上（SDXL 系のモデルのとき）。GPU の温度・負荷の見張りは NVIDIA だけ。GPU がなくても CPU で動くが、とても遅い。メモリ 16 GB 以上、モデルを置く SSD に数十 GB の空き"
   }
  },
  {
   "id": "iori",
   "name": "Iori",
   "tagline": "ローカル LLM を選ぶ・比べる・残すデスクトップチャット",
   "kind": "nsis",
   "group": "tauri",
   "color": "#E8A44A",
   "features": [
    "Hugging Face の GGUF を検索し、自分の GPU で動くかを判定してから導入。会話は手元の SQLite にだけ保存（検索・タグ・分岐・書き出し）",
    "同じ入力を 2 つのモデルへ送って並べて比べ、評価を記録。日本語の問題を自動で解かせて点数と速度を記録",
    "応答の一部を Kiln へプロンプトとして渡す（共有フォルダ）"
   ],
   "stack": [
    "Tauri 2",
    "React",
    "Rust",
    "SQLite",
    "Ollama",
    "llama.cpp",
    "Hugging Face"
   ],
   "details": [
    "Iori 自体は推論せず、手元の Ollama か llama.cpp server に任せる。Ollama が止まっていれば起動し、閉じるときは Iori が起動した分を止める。外への通信は Hugging Face の検索だけ。",
    "リポジトリ：Ksan1333/Iori（非公開）"
   ],
   "icon": "icons/iori.png",
   "spec": {
    "env": "Windows 11（64 ビット）",
    "need": "Ollama 0.6 以降（上の帯の「Ollama を入れる」で入れられる）か、llama.cpp server",
    "guide": "GPU の VRAM が多いほど大きいモデルが動く（Iori が「モデルのファイル＋会話の分＋1 GB」で判定する）。7〜8B の 4 ビット量子化なら VRAM 8 GB、14B なら 12〜16 GB くらい。VRAM の自動検出は NVIDIA（ほかは手入力）。足りないと CPU 併用で遅くなる。メモリ 16 GB 以上"
   }
  },
  {
   "id": "mediarelay",
   "name": "MediaRelay（PC 版）",
   "tagline": "自宅の PC に入れて、スマホ・別の PC・iPhone と写真・動画をやり取り（撮影日時・作成日時・更新日時を変えずに転送）",
   "kind": "nsis",
   "group": "tauri",
   "color": "#111111",
   "features": [
    "窓とタスクトレイを持ち、中で HTTP サーバーを動かす（窓を閉じてもトレイに残る）。スマホは MediaRelay（Android 版）、iPhone や別の PC はブラウザーで同じ画面",
    "転送しても撮影日時・作成日時・更新日時が変わらない（中身はバイト列のまま送り、受け取った側で日時を書き戻す）",
    "PC に出る 6 桁のコードで端末をつなぐ。通信は自宅の LAN の中だけで、クラウドは使わない"
   ],
   "stack": [
    "Tauri 2",
    "Rust",
    "axum",
    "SQLite",
    "ffmpeg"
   ],
   "details": [
    "Release は公開の Ksan1333/MediaRelay-releases（Android 版と同じ）。窓・トレイ・アプリ内の更新は実機ではまだ試していない。",
    "リポジトリ：Ksan1333/MediaRelay（非公開）"
   ],
   "icon": "icons/mediarelay.png",
   "spec": {
    "env": "Windows 10／11（64 ビット）。つなぐ端末と同じ自宅の LAN",
    "need": "WebView2 Runtime（Windows 11 は標準）",
    "optional": "ffmpeg（HEIC の表示と動画のサムネイル。なくても転送はできる）",
    "guide": "やり取りする間は動かしておく PC。受け取る写真・動画の分の空き"
   }
  },
  {
   "id": "basho-web",
   "name": "Basho（Web版）",
   "tagline": "旅行の計画・写真・支出をブラウザで記録し、仲間と共有",
   "kind": "web",
   "group": "web",
   "color": "#F2C230",
   "features": [
    "旅行に招待で参加して、計画・タイムライン・支出と割り勘・旅メモ・実際の地図と制覇マップを記録・閲覧。年ごとの統計と書き出し",
    "写真は端末で縮小版を作って追加（原本は送らない）。電波なしでも閲覧・記録でき、ホーム画面に追加するとアプリのように開く",
    "PC のブラウザの「ブログ作成」で、その PC の Ollama（ローカル AI）が下書きを書き、はてなブログに投稿（API が中継）",
    "オーナーの鍵かオーナーの端末の QR コードで端末を登録すると、オーナーとして使える。AWS のデータは KsanHub（PC 版・スマホ版）で必要なときにバックアップ（自動では取らない）"
   ],
   "stack": [
    "Svelte 5",
    "SvelteKit（静的出力）",
    "Service Worker",
    "AWS CDK",
    "Lambda",
    "DynamoDB",
    "S3",
    "CloudFront",
    "Ollama"
   ],
   "details": [
    "ap-southeast-2 に配置し、KsanHub の「AWS に配置」で更新する。バックアップは KsanHub が API から取る。",
    "リポジトリ：Ksan1333/Basho（非公開）"
   ],
   "icon": "icons/basho.png",
   "spec": {
    "env": "スマホ・PC のブラウザー（Mac・iPhone・Android もこれで使う）",
    "need": "旅行への招待（オーナーは鍵で端末を登録する）",
    "optional": "ブログ作成：PC に Ollama と、ユーザー環境変数 OLLAMA_ORIGINS にサイトの URL を入れて Ollama を起動し直す",
    "guide": "ブログ作成で Ollama を使うなら、GPU があると速い"
   }
  },
  {
   "id": "exitinterview-server",
   "name": "Exit Interview（部屋サーバー）",
   "tagline": "2人用脱出ゲーム Exit Interview の部屋サーバー",
   "kind": "web",
   "group": "web",
   "color": "#2E4A49",
   "features": [
    "2人用脱出ゲーム Exit Interview（Android）の部屋サーバー。2人が同じ合言葉を入れると同じ部屋に入れ、2台の進み具合をそろえる",
    "部屋の状態を預かるだけで、謎の中身は持たない。30日操作のない部屋は自動で消える",
    "ゲーム（0.1.3 から）はアプリに入っているアドレスでつなぐので、URL を貼り付けなくてよい"
   ],
   "stack": [
    "Lambda (Python 3.12)",
    "関数URL",
    "DynamoDB"
   ],
   "icon": "icons/exitinterview.png"
  },
  {
   "id": "ksanhub",
   "name": "KsanHub（PC 版）",
   "tagline": "自作アプリの親ソフト（導入・更新・削除・AWS 配置）",
   "kind": "self",
   "group": "tool",
   "color": "#253049",
   "features": [
    "KsanHub-<版>-Setup.exe で入れる（管理者権限なし）。新しい PC では GitHub CLI の用意とログインまで画面の案内で進む",
    "非公開リポジトリの Release のインストーラーで Windows アプリを入れる・更新する・消す・起動する。KsanHub 自身も同じ方法で更新",
    "ReviewInsight・Kurashi・Basho（Web版）をこの PC の裏で AWS に配置し、配置が最新か確認。各アプリのデータを、アプリごとに必要なときだけバックアップ（自動では取らない）。プロジェクト一覧も内蔵"
   ],
   "stack": [
    ".NET 10",
    "WPF",
    "WebView2",
    "GitHub CLI",
    "NSIS"
   ],
   "details": [
    "Release のインストーラー（KsanHub-版-Setup.exe）で %LOCALAPPDATA%\\Programs\\KsanHub に入る（管理者権限は不要）。知り合いに配る「配布版」では、Web（AWS）のアプリとこの一覧を出さない。",
    "リポジトリ：Ksan1333/scoop-bucket（非公開）"
   ],
   "icon": "icons/hub.png",
   "spec": {
    "env": "Windows 11（64 ビット）",
    "need": "GitHub のアカウントと、使うアプリの非公開リポジトリを読める権限（GitHub CLI は「準備する」で KsanHub が入れる）。WebView2 Runtime（Windows 11 は標準）",
    "optional": "AWS に配置するとき：AWS CLI・Git for Windows・Node.js 22 以上と、「AWS の鍵を設定」で作る配置専用の鍵",
    "guide": "軽いアプリで、ふつうの PC で足りる。.NET は exe に同梱（別に入れなくてよい）"
   }
  }
 ],
 "ended": [
  {
   "id": "utsushi",
   "name": "Utsushi",
   "tagline": "写真や台本から動画を作るデスクトップアプリ",
   "status": "終了",
   "version": "v0.4.0",
   "endedOn": "2026-11-18",
   "color": "#C2542D",
   "features": [
    "写真・動画・音・文字・キャラの声を 1 本のタイムラインに並べて動画を作る Windows のアプリ",
    "作り方は 3 つ：AI が写真を選んでテロップとセリフを書く「構成」、手で並べる「タイムライン編集」、配役と台本から声・字幕・立ち絵（口パク）を並べる「台本（掛け合い）」",
    "声は VOICEVOX・VOICEPEAK・AquesTalkPlayer・CoeFont・録音した声。書き出しは MP4（H.264／H.265）・WebM・GIF・MP3・WAV・字幕（SRT）で、GPU で速く作れる"
   ],
   "stack": [
    "Tauri 2"
   ],
   "repo": "Ksan1333/Utsushi",
   "icon": "icons/utsushi.png"
  },
  {
   "id": "basho-desktop",
   "name": "Basho（ソフト版）",
   "tagline": "旅行の記録をローカル AI でブログに（Windows アプリ）",
   "status": "Web版に統合",
   "version": "v0.1.61",
   "endedOn": "2026-11-10",
   "color": "#2F7D6B",
   "features": [
    "旅行の写真と記録をまとめ、この PC のローカル AI（Ollama）でブログの下書きを作る Windows のアプリ",
    "2026-11-10 に Basho（Web版）へ統合した。今はブラウザーから同じことができる（ブログ作成は、開いた PC の Ollama を使う）"
   ],
   "stack": [
    "Tauri 2",
    "Svelte"
   ],
   "repo": "Ksan1333/Basho",
   "icon": "icons/basho.png"
  },
  {
   "id": "mediapick",
   "name": "MediaPick",
   "tagline": "毎日のメディア収集・選別（旧 Hiroi・Glean・MediaDesk）",
   "status": "MediaShelf に統合",
   "version": "v2.6.0",
   "endedOn": "2026-11-12",
   "color": "#C8442F",
   "features": [
    "毎日の確認を「候補を開く → 欲しいものにチェック → 確定」の 3 操作にまとめた Windows のアプリ",
    "登録したサイトのサムネイルに保存・選択のボタンを出し、確認済み・保存済みには印を付ける。ダウンロードは常設のパネルで見守る",
    "2026-11-12 に MediaShelf の「集める」「作者別」として取り込んだ（MediaShelf で前のデータを引き継げる）"
   ],
   "stack": [
    ".NET 10",
    "WPF"
   ],
   "repo": "Ksan1333/MediaPick",
   "icon": "icons/mediapick.png"
  },
  {
   "id": "galleryweb",
   "name": "GalleryWeb",
   "tagline": "PixVault（今の MediaShelf Pocket）の Windows 版",
   "status": "終了",
   "version": "v0.8.0",
   "color": "#3B6FD8",
   "features": [
    "Android の PixVault（今の MediaShelf Pocket）の Windows 10／11 版。手元の写真・動画を一覧・整理し、AI 分析・ascii2d 検索・X のメディア保存もできた",
    "Android 版とはソースを分け、版の付いた移行用のアーカイブでデータを受け渡す"
   ],
   "stack": [
    "Tauri 2",
    "React",
    "Rust",
    "SQLite"
   ],
   "repo": "Ksan1333/GalleryWeb"
  },
  {
   "id": "mitsukebell",
   "name": "MitsukeBell",
   "tagline": "商品の在庫・再入荷の監視（対応店舗と実機での確認の途中で止めた）",
   "status": "終了",
   "version": "v0.8.6",
   "color": "#275AD4",
   "features": [
    "欲しい商品の在庫・再入荷を見張る。PC の Tauri アプリが監視のサーバーを動かし、スマホはブラウザーで同じ商品リストを使う",
    "登録した URL を 1 日 3 回（8・14・20 時）確認し、初めての発見・再入荷を知らせる（メール・LINE。実際の送信は未確認）。Brave Search API で販売先の候補を探し、Ollama で画像から検索語を作る",
    "アニメイト・BOOTH・メロンブックス以外の店舗への対応と、実機・実サービスでの確認の途中で止めた"
   ],
   "stack": [
    "Tauri 2",
    "Python"
   ],
   "repo": "Ksan1333/MitsukeBell",
   "icon": "icons/mitsukebell.png"
  },
  {
   "id": "tsukishirube",
   "name": "TsukiShirube",
   "tagline": "月末残高の見通し",
   "status": "終了",
   "version": "v0.10.0",
   "color": "#24483B",
   "features": [
    "買い物を一件ずつ付けなくても、予定の収入・固定費・サブスク・カードの請求・ローン・分割払い・積立から、月末に残る見込みを出すローカル完結のアプリ（画面名は「月しるべ」）",
    "土日に当たる予定日を前後の平日にずらす、カード請求を毎月に広げる、目的別の積立を取り分ける。近い月の見通しをグラフで見る（説明に Ollama を使える。任意）"
   ],
   "stack": [
    "Tauri 2",
    "React",
    "Rust",
    "SQLite"
   ],
   "repo": "Ksan1333/TsukiShirube",
   "icon": "icons/tsukishirube.png"
  },
  {
   "id": "googlemapex",
   "name": "GoogleMapEx",
   "tagline": "訪問履歴の地図管理",
   "status": "終了",
   "version": "v0.2.0",
   "color": "#D8692F",
   "features": [
    "行った場所・お気に入り・行きたい場所・移動の履歴を PC で管理する地図のアプリ（Google Maps か、キーの要らない MapLibre＋OpenFreeMap）",
    "日付ごとのタイムラインと、その取り込み（取り込む前に確かめられる）。統計は同梱の境界データで国・都道府県を判定し、Google の API を呼ばない"
   ],
   "stack": [
    "Tauri 2"
   ],
   "repo": "Ksan1333/GoogleMapEX",
   "icon": "icons/googlemapex.png"
  },
  {
   "id": "driftmap",
   "name": "DriftMap",
   "tagline": "Terraform の JSON から AWS の構成図を作る",
   "status": "終了",
   "version": "v0.1.0",
   "color": "#6A4FC8",
   "features": [
    "Terraform の JSON 出力から AWS のリソースと依存関係を取り出し、構成図にするローカル完結のアプリ",
    "図の元は「意味のあるリソースのつながり」として持ち、自動で並べた図を手直しして DriftMap JSON と draw.io の XML に書き出す"
   ],
   "stack": [
    "Tauri 2"
   ],
   "repo": "Ksan1333/DriftMap",
   "icon": "icons/driftmap.png"
  },
  {
   "id": "cloudcyberdojo",
   "name": "CloudCyber Dojo",
   "tagline": "合成データで学ぶ AWS とセキュリティ",
   "status": "終了",
   "version": "v0.1.0",
   "color": "#1F6F8B",
   "features": [
    "AWS の代表的な仕組みと、マルウェアに見られる典型的な動き・痕跡・対応を、作り物のデータだけで学ぶローカルの学習アプリ",
    "本物のマルウェア・AWS・コマンドは扱わず、演習はアプリの中の仮想の状態だけで進む。AWS 編 4 本（イベントの連携・IAM の Deny・SQS の再試行と DLQ・API の原因調べ）とセキュリティ編 4 本"
   ],
   "stack": [
    "Tauri 2"
   ],
   "repo": "Ksan1333/CloudCyberDojo",
   "icon": "icons/cloudcyberdojo.png"
  }
 ]
};
