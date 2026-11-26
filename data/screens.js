// 画面の例（アプリの id ごと）。src は screens/ の画像、frame は枠（bare：そのまま・window：Windows の窓・browser：ブラウザー・phone：スマホ・land：横持ちのスマホ）
// real: true は本物のアプリを見本のデータで撮ったもの、ないものは screens/src/ の HTML で再現したもの（node tools/shoot.mjs で画像にする）
window.KSANHUB_SCREENS = {
 "reviewinsight": [
  {
   "title": "ホーム",
   "src": "screens/reviewinsight-1.webp",
   "w": 1600,
   "h": 1000,
   "frame": "browser",
   "real": true,
   "url": "https://reviewinsight.example/",
   "note": "確認用のサーバーと見本データで撮った本物の画面です"
  },
  {
   "title": "指摘",
   "src": "screens/reviewinsight-2.webp",
   "w": 1600,
   "h": 1000,
   "frame": "browser",
   "real": true,
   "url": "https://reviewinsight.example/#/issues",
   "note": "確認用のサーバーと見本データで撮った本物の画面です"
  },
  {
   "title": "スマホ",
   "src": "screens/reviewinsight-3.webp",
   "w": 780,
   "h": 1688,
   "frame": "phone",
   "real": true,
   "note": "同じ画面をスマホの幅で見たところです"
  }
 ],
 "kurashi": [
  {
   "title": "今日",
   "src": "screens/kurashi-1.webp",
   "w": 780,
   "h": 1688,
   "frame": "phone",
   "real": true,
   "note": "本物の画面に、架空の記録と習慣を入れて撮りました"
  },
  {
   "title": "記録",
   "src": "screens/kurashi-2.webp",
   "w": 780,
   "h": 1688,
   "frame": "phone",
   "real": true,
   "note": "本物の画面に、架空の記録と習慣を入れて撮りました"
  }
 ],
 "basho-web": [
  {
   "title": "旅の記録",
   "src": "screens/basho-web-1.webp",
   "w": 780,
   "h": 1688,
   "frame": "phone"
  },
  {
   "title": "旅行の記録",
   "src": "screens/basho-web-2.webp",
   "w": 780,
   "h": 1688,
   "frame": "phone"
  }
 ],
 "exitinterview-server": [
  {
   "title": "しくみ",
   "src": "screens/exitinterview-server-1.webp",
   "w": 1600,
   "h": 900,
   "frame": "bare",
   "note": "画面のないサーバーなので、しくみを図にしました"
  }
 ],
 "kardashev-map": [
  {
   "title": "全体マップ",
   "src": "screens/kardashev-map-1.webp",
   "w": 1600,
   "h": 1000,
   "frame": "browser",
   "real": true,
   "url": "https://ksan1333.github.io/kardashev-map/",
   "note": "公開しているページそのものです"
  },
  {
   "title": "年表",
   "src": "screens/kardashev-map-2.webp",
   "w": 1600,
   "h": 1000,
   "frame": "browser",
   "real": true,
   "url": "https://ksan1333.github.io/kardashev-map/",
   "note": "公開しているページそのものです"
  },
  {
   "title": "スマホ",
   "src": "screens/kardashev-map-3.webp",
   "w": 780,
   "h": 1688,
   "frame": "phone",
   "real": true,
   "note": "公開しているページをスマホの幅で見たところです"
  }
 ],
 "mediashelf": [
  {
   "title": "メディア別",
   "src": "screens/mediashelf-1.webp",
   "w": 1600,
   "h": 1000,
   "frame": "bare"
  },
  {
   "title": "作者別",
   "src": "screens/mediashelf-2.webp",
   "w": 1600,
   "h": 1000,
   "frame": "bare"
  }
 ],
 "instavault": [
  {
   "title": "投稿の一覧",
   "src": "screens/instavault-1.webp",
   "w": 1600,
   "h": 1000,
   "frame": "window",
   "theme": "dark"
  }
 ],
 "notoha": [
  {
   "title": "メモ",
   "src": "screens/notoha-1.webp",
   "w": 1600,
   "h": 1000,
   "frame": "window",
   "real": true,
   "note": "ブラウザデモに架空のメモを入れて撮った本物の画面です"
  },
  {
   "title": "データベース",
   "src": "screens/notoha-2.webp",
   "w": 1600,
   "h": 1000,
   "frame": "window",
   "real": true,
   "note": "ブラウザデモに架空のメモを入れて撮った本物の画面です"
  }
 ],
 "kiln": [
  {
   "title": "焼成",
   "src": "screens/kiln-1.webp",
   "w": 1600,
   "h": 1000,
   "frame": "bare",
   "real": true,
   "note": "本物の画面（ComfyUI につなぐ前）に、架空の依頼文を入れて撮りました"
  },
  {
   "title": "ガイド",
   "src": "screens/kiln-2.webp",
   "w": 1600,
   "h": 1000,
   "frame": "bare",
   "real": true,
   "note": "アプリの中のガイドの画面です"
  }
 ],
 "iori": [
  {
   "title": "チャット",
   "src": "screens/iori-1.webp",
   "w": 1600,
   "h": 1000,
   "frame": "window",
   "real": true,
   "note": "本物の画面に、架空の会話とモデルを入れて撮りました（アイコンは似た形で代用）"
  },
  {
   "title": "比較",
   "src": "screens/iori-2.webp",
   "w": 1600,
   "h": 1000,
   "frame": "window",
   "real": true,
   "note": "本物の画面に、架空の会話とモデルを入れて撮りました（アイコンは似た形で代用）"
  },
  {
   "title": "モデル",
   "src": "screens/iori-3.webp",
   "w": 1600,
   "h": 1000,
   "frame": "window",
   "real": true,
   "note": "本物の画面に、架空のモデルと GPU を入れて撮りました（アイコンは似た形で代用）"
  }
 ],
 "mediarelay": [
  {
   "title": "PC の窓",
   "src": "screens/mediarelay-1.webp",
   "windowTitle": "MediaRelay",
   "w": 1600,
   "h": 1013,
   "frame": "window",
   "real": true,
   "theme": "dark",
   "note": "本物の画面に、架空の写真とフォルダーを入れて撮りました"
  },
  {
   "title": "iPhone",
   "src": "screens/mediarelay-2.webp",
   "w": 780,
   "h": 1688,
   "frame": "phone",
   "real": true,
   "note": "同じ PC に iPhone のブラウザーからつないだところです（架空の写真）"
  }
 ],
 "mediashelf-pocket": [
  {
   "title": "ホーム",
   "src": "screens/mediashelf-pocket-1.webp",
   "w": 780,
   "h": 1688,
   "frame": "phone"
  }
 ],
 "cablecheck": [
  {
   "title": "一覧",
   "src": "screens/cablecheck-1.webp",
   "w": 780,
   "h": 1688,
   "frame": "phone"
  }
 ],
 "ksanhub-android": [
  {
   "title": "アプリ一覧",
   "src": "screens/ksanhub-android-1.webp",
   "w": 780,
   "h": 1688,
   "frame": "phone"
  }
 ],
 "mediarelay-android": [
  {
   "title": "PC のフォルダー",
   "src": "screens/mediarelay-android-1.webp",
   "w": 780,
   "h": 1688,
   "frame": "phone"
  }
 ],
 "exitinterview": [
  {
   "title": "タイトル",
   "src": "screens/exitinterview-1.webp",
   "w": 1600,
   "h": 739,
   "frame": "land"
  },
  {
   "title": "合言葉",
   "src": "screens/exitinterview-2.webp",
   "w": 1600,
   "h": 739,
   "frame": "land",
   "note": "実際の画面の作りをもとに描いた画面です（謎やステージは出していません）"
  }
 ],
 "ksanhub": [
  {
   "title": "アプリ",
   "src": "screens/ksanhub-1.webp",
   "w": 1600,
   "h": 1143,
   "frame": "window",
   "windowTitle": "KsanHub"
  }
 ]
};
