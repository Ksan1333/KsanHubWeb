// 画面の例に使う架空の写真（SVG で描く風景・料理など）。番号（seed）が同じなら同じ絵になる。
// ブラウザでは window.fakePhoto、Node では globalThis.fakePhoto として使う。
(function (g) {
  function rng(seed) {
    let a = (seed * 2654435761) >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const SKIES = [
    ['#7EC8F2', '#D8F0FF'], ['#F7A26B', '#FFE2B8'], ['#5A6FD6', '#F2A3C4'], ['#9AD0EC', '#F5F9FF'],
    ['#F28C6B', '#FBD7A1'], ['#6FB7E9', '#CDEBFA'], ['#B79BE8', '#FFD6E6'], ['#4D8FD6', '#BFE3FA'],
  ];
  const hsl = (h, s, l) => `hsl(${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%)`;

  function scene(r, kind, W, H) {
    const p = [];
    const sky = SKIES[Math.floor(r() * SKIES.length)];
    const id = 'g' + Math.floor(r() * 1e9);
    const grad = (a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
    const ridge = (y, amp, color, n = 6) => {
      let d = `M0 ${H} L0 ${y}`;
      for (let i = 1; i <= n; i++) d += ` L${(W * i) / n} ${y - amp * (0.3 + r() * 0.9)}`;
      return `<path d="${d} L${W} ${H} Z" fill="${color}"/>`;
    };
    if (kind === 'mountain' || kind === 'snow') {
      p.push(grad(kind === 'snow' ? '#A9CBEA' : sky[0], kind === 'snow' ? '#EEF6FF' : sky[1]));
      p.push(`<circle cx="${W * (0.2 + r() * 0.6)}" cy="${H * (0.18 + r() * 0.15)}" r="${W * 0.07}" fill="#FFF6D8" opacity=".9"/>`);
      const h0 = 190 + r() * 60;
      p.push(ridge(H * 0.55, H * 0.28, kind === 'snow' ? '#E9F1F8' : hsl(h0, 25, 62), 4));
      p.push(ridge(H * 0.68, H * 0.22, kind === 'snow' ? '#C9D8E6' : hsl(h0 - 40, 30, 42), 5));
      p.push(ridge(H * 0.82, H * 0.12, kind === 'snow' ? '#8FA8BD' : hsl(110 + r() * 30, 30, 30), 7));
    } else if (kind === 'sea') {
      p.push(grad(sky[0], sky[1]));
      const hz = H * (0.5 + r() * 0.1);
      p.push(`<circle cx="${W * (0.3 + r() * 0.4)}" cy="${hz - H * 0.08}" r="${W * 0.09}" fill="#FFF1C7"/>`);
      p.push(`<rect y="${hz}" width="${W}" height="${H - hz}" fill="${hsl(200 + r() * 20, 55, 45)}"/>`);
      for (let i = 0; i < 6; i++) p.push(`<rect x="${W * (0.25 + r() * 0.4)}" y="${hz + 6 + i * (H - hz) / 7}" width="${W * (0.1 + r() * 0.25)}" height="2.5" fill="#FFF4D6" opacity="${0.6 - i * 0.07}"/>`);
      if (r() > 0.5) p.push(`<path d="M${W * 0.68} ${hz} q ${W * 0.08} -${H * 0.09} ${W * 0.18} 0 z" fill="${hsl(140, 25, 30)}"/>`);
    } else if (kind === 'city') {
      p.push(grad('#2B3A67', '#F2A272'));
      let x = 0;
      while (x < W) {
        const bw = W * (0.07 + r() * 0.08), bh = H * (0.25 + r() * 0.45);
        p.push(`<rect x="${x}" y="${H - bh}" width="${bw - 2}" height="${bh}" fill="${hsl(230, 25, 14 + r() * 10)}"/>`);
        for (let wy = H - bh + 8; wy < H - 6; wy += 12) for (let wx = x + 5; wx < x + bw - 8; wx += 9) if (r() > 0.55) p.push(`<rect x="${wx}" y="${wy}" width="4" height="5" fill="#FFD98A" opacity=".85"/>`);
        x += bw;
      }
    } else if (kind === 'forest') {
      p.push(grad(sky[0], sky[1]));
      p.push(ridge(H * 0.62, H * 0.1, hsl(120, 28, 55), 4));
      for (let i = 0; i < 14; i++) {
        const tx = r() * W, ty = H * (0.55 + r() * 0.4), s = H * (0.1 + r() * 0.12);
        p.push(`<path d="M${tx} ${ty - s} L${tx - s * 0.45} ${ty} L${tx + s * 0.45} ${ty} Z" fill="${hsl(130 + r() * 30, 35, 22 + r() * 14)}"/>`);
      }
    } else if (kind === 'field') {
      p.push(grad(sky[0], sky[1]));
      p.push(`<rect y="${H * 0.55}" width="${W}" height="${H * 0.45}" fill="${hsl(95, 45, 48)}"/>`);
      const hue = [350, 45, 290, 20, 330][Math.floor(r() * 5)];
      for (let i = 0; i < 60; i++) p.push(`<circle cx="${r() * W}" cy="${H * (0.58 + r() * 0.42)}" r="${2 + r() * 4}" fill="${hsl(hue + r() * 20, 80, 65)}"/>`);
    } else if (kind === 'night') {
      p.push(grad('#0B1330', '#2C3D73'));
      for (let i = 0; i < 70; i++) p.push(`<circle cx="${r() * W}" cy="${r() * H * 0.75}" r="${0.6 + r() * 1.4}" fill="#FFFFFF" opacity="${0.4 + r() * 0.6}"/>`);
      p.push(`<circle cx="${W * 0.72}" cy="${H * 0.24}" r="${W * 0.08}" fill="#F6F1D8"/>`);
      p.push(ridge(H * 0.86, H * 0.08, '#0A0F1F', 6));
    } else if (kind === 'food') {
      p.push(`<rect width="${W}" height="${H}" fill="${['#C99B6D', '#E9DCC8', '#8B6A4F', '#DCE3E8'][Math.floor(r() * 4)]}"/>`);
      const cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.38;
      p.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="#FFFFFF"/><circle cx="${cx}" cy="${cy}" r="${R * 0.82}" fill="#F4F1EC"/>`);
      for (let i = 0; i < 7; i++) {
        const a = r() * Math.PI * 2, d = r() * R * 0.5;
        p.push(`<ellipse cx="${cx + Math.cos(a) * d}" cy="${cy + Math.sin(a) * d}" rx="${R * (0.12 + r() * 0.16)}" ry="${R * (0.1 + r() * 0.12)}" fill="${hsl([20, 40, 100, 0, 30, 130][Math.floor(r() * 6)], 60, 45 + r() * 20)}"/>`);
      }
    } else {
      // 部屋・小物
      p.push(`<rect width="${W}" height="${H}" fill="${hsl(30 + r() * 20, 30, 80)}"/>`);
      p.push(`<rect y="${H * 0.7}" width="${W}" height="${H * 0.3}" fill="${hsl(25, 35, 45)}"/>`);
      p.push(`<rect x="${W * 0.15}" y="${H * 0.2}" width="${W * 0.3}" height="${H * 0.35}" fill="${hsl(r() * 360, 35, 60)}" rx="4"/>`);
      p.push(`<circle cx="${W * 0.7}" cy="${H * 0.6}" r="${H * 0.12}" fill="${hsl(r() * 360, 45, 55)}"/>`);
    }
    return p.join('');
  }

  const KINDS = ['mountain', 'sea', 'city', 'forest', 'field', 'night', 'food', 'snow', 'room'];
  g.fakePhoto = function (seed, w = 300, h = 300, kind) {
    const r = rng(seed + 7);
    const k = kind || KINDS[seed % KINDS.length];
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">${scene(r, k, w, h)}</svg>`;
  };
  // <div data-photo="12" data-kind="sea"> に絵を入れる
  g.fillPhotos = function (root) {
    (root || document).querySelectorAll('[data-photo]').forEach((el) => {
      const b = el.getBoundingClientRect();
      el.innerHTML = g.fakePhoto(Number(el.dataset.photo), Math.max(40, Math.round(b.width)) || 300, Math.max(40, Math.round(b.height)) || 300, el.dataset.kind) + el.innerHTML;
    });
  };
})(typeof window !== 'undefined' ? window : globalThis);
