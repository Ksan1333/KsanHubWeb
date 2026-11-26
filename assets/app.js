// KsanHub（Web 版）: PC 版の「アプリ」タブと同じ一覧。行を押すとその場でカードに開き、アプリの画面の例を出す。
// 一覧は data/catalog.js（scoop-bucket の catalog.json から tools/sync-catalog.mjs で写したもの）、
// 画面の例は data/screens.js（アプリの id ごとの画面の並び）。インストールなどの操作はない（見るだけ）。
(() => {
  'use strict';

  const catalog = window.KSANHUB_CATALOG;
  const screens = window.KSANHUB_SCREENS || {};
  const list = document.getElementById('list');
  if (!catalog) {
    list.innerHTML = '<p class="note">一覧を読み込めませんでした（data/catalog.js がありません）。</p>';
    return;
  }

  // 状態の色（PC 版の Items.Colors と同じ）
  const TONES = {
    none: ['#5d6676', '#eceef2'],
    web: ['#2f5fc4', '#e5ecfb'],
    android: ['#6b45c9', '#efe9fb'],
    ended: ['#5D6472', '#E7E9EE'],
  };
  const STATUS = {
    android: ['Android', 'android'],
    web: ['Web（AWS）', 'web'],
    pages: ['Web（GitHub Pages）', 'web'],
    nsis: ['Windows', 'none'],
    velopack: ['Windows', 'none'],
    self: ['Windows', 'none'],
  };
  const SVG = {
    chev: '<svg class="chev" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 6l4.5 4.5L12.5 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    rowChev: '<svg class="row-chev" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 6l4.5 4.5L12.5 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    screen: '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="1.5" y="2.5" width="13" height="9" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M5.5 14h5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>',
    min: '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M0 5h10" stroke="currentColor" stroke-width="1"/></svg>',
    max: '<svg viewBox="0 0 10 10" aria-hidden="true"><rect x=".5" y=".5" width="9" height="9" fill="none" stroke="currentColor" stroke-width="1"/></svg>',
    close: '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M0 0l10 10M10 0L0 10" stroke="currentColor" stroke-width="1"/></svg>',
  };

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const el = (html) => {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  };
  const pill = (text, tone) => {
    const [fg, bg] = TONES[tone] || TONES.none;
    return `<span class="pill" style="color:${fg};background:${bg}">${esc(text)}</span>`;
  };
  // アイコンの画像がなければ、PC 版と同じく頭文字と色で出す
  const fallbackIcon = (name, color) => `<span class="app-icon fallback" style="background:${esc(color || '#5D6BD6')}">${esc((name || '?')[0])}</span>`;
  const icon = (item) => item.icon
    ? `<img class="app-icon" src="${esc(item.icon)}" alt="" width="32" height="32" data-name="${esc(item.name)}" data-color="${esc(item.color || '')}">`
    : fallbackIcon(item.name, item.color);
  document.addEventListener('error', (e) => {
    const t = e.target;
    if (t instanceof HTMLImageElement && t.classList.contains('app-icon')) t.replaceWith(el(fallbackIcon(t.dataset.name, t.dataset.color)));
  }, true);

  // ---------- 組と行 ----------
  const apps = catalog.apps || [];
  const ended = catalog.ended || [];
  const count = apps.filter((a) => a.kind !== 'self' && a.kind !== 'concept').length;
  document.getElementById('sub').textContent = `アプリ ${count} 本 ・ 行を開くと、そのアプリの画面の例が出ます`;

  const groups = (catalog.groups || []).map((g) => ({ ...g, items: apps.filter((a) => a.group === g.id) }));
  const rest = apps.filter((a) => !(catalog.groups || []).some((g) => g.id === a.group));
  if (rest.length) groups.push({ id: 'other', title: 'そのほか', items: rest });
  if (ended.length) groups.push({ id: 'ended', title: '終了したプロジェクト', items: ended, ended: true });

  const rows = new Map();   // id → { item, li, open, ended }
  list.textContent = '';
  for (const g of groups) {
    if (!g.items.length) continue;
    const sec = el(`<section class="group" data-group="${esc(g.id)}">
      <button type="button" class="group-head" aria-expanded="true" title="クリックで開閉">${SVG.chev}<span class="group-title">${esc(g.title)}</span><span class="group-count">${g.items.length} 件</span></button>
      <div class="group-items"></div></section>`);
    const head = sec.querySelector('.group-head');
    const box = sec.querySelector('.group-items');
    head.addEventListener('click', () => {
      const open = head.getAttribute('aria-expanded') !== 'true';
      head.setAttribute('aria-expanded', String(open));
      box.hidden = !open;
    });
    for (const item of g.items) {
      const holder = document.createElement('div');
      holder.className = 'item';
      holder.id = item.id;
      box.appendChild(holder);
      const r = { item, holder, open: false, ended: !!g.ended };
      rows.set(item.id, r);
      renderRow(r);
    }
    list.appendChild(sec);
  }

  function statusOf(r) {
    if (r.ended) return [r.item.status || '終了', 'ended'];
    return STATUS[r.item.kind] || ['', 'none'];
  }

  function renderRow(r) {
    const a = r.item;
    const [st, tone] = statusOf(r);
    const n = r.ended ? 0 : (screens[a.id] || []).length;
    const version = r.ended ? [a.version, a.endedOn ? `${a.endedOn} に終了` : ''].filter(Boolean).join(' ・ ') : '';
    const row = el(`<button type="button" class="row${r.ended ? ' ended' : ''}" aria-expanded="false" title="${r.ended ? 'クリックで説明を表示' : 'クリックで画面の例と詳しい説明を表示'}">
      ${icon(a)}
      <span class="row-main">
        <span class="row-name">${esc(a.name)}</span>
        <span class="row-tagline">${esc(a.tagline)}</span>
      </span>
      ${n ? `<span class="row-shots" title="画面の例 ${n} 枚">${SVG.screen}画面 ${n}</span>` : ''}
      ${version ? `<span class="row-version">${esc(version)}</span>` : ''}
      ${st ? pill(st, tone) : ''}
      ${a.url ? `<a class="btn small" href="${esc(a.url)}" target="_blank" rel="noopener" title="サイトを開く">開く</a>` : ''}
      ${SVG.rowChev}
    </button>`);
    row.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;   // 「開く」はリンクだけ
      toggle(r, true);
    });
    r.holder.replaceChildren(row);
  }

  function toggle(r, fromUser) {
    r.open = !r.open;
    if (r.open) renderCard(r); else renderRow(r);
    if (fromUser) {
      if (r.open) history.replaceState(null, '', `#${r.item.id}`);
      else if (location.hash === `#${r.item.id}`) history.replaceState(null, '', location.pathname + location.search);
      const target = r.holder.firstElementChild;
      target?.focus({ preventScroll: true });
      if (r.open) {
        const rect = r.holder.getBoundingClientRect();
        if (rect.top < 0 || rect.top > window.innerHeight * 0.6) r.holder.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  // ---------- カード ----------
  function renderCard(r) {
    const a = r.item;
    const [st, tone] = statusOf(r);
    const shots = r.ended ? [] : (screens[a.id] || []);
    const first = shots[0];
    const tall = first && first.frame === 'phone';
    const spec = a.spec ? [['動く環境', a.spec.env], ['必須', a.spec.need], ['任意', a.spec.optional], ['目安', a.spec.guide]].filter(([, t]) => t) : [];
    const details = r.ended ? (a.repo ? [`リポジトリ：${a.repo}`] : []) : (a.details || []);
    const card = el(`<article class="card${r.ended ? ' ended-card' : ''}" aria-label="${esc(a.name)}">
      <button type="button" class="card-head" aria-expanded="true" title="クリックで閉じる">
        ${icon(a)}
        <span class="card-title">
          <span class="card-name">${esc(a.name)}</span>
          <span class="card-tagline">${esc(a.tagline)}</span>
        </span>
        <span class="card-side">${st ? pill(st, tone) : ''}${SVG.rowChev}</span>
      </button>
      <div class="card-body${shots.length ? (tall ? ' tall' : '') : ' noshots'}">
        ${shots.length ? '<div class="shots"></div>' : ''}
        <div class="info">
          ${a.features?.length ? `<ul class="features">${a.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}
          ${a.stack?.length ? `<ul class="stack">${a.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>` : ''}
          ${spec.length ? `<div class="spec"><div class="spec-title">使うのに必要なもの</div>${spec.map(([l, t]) => `<div class="spec-row"><span class="spec-label">${l}</span><span class="spec-text">${esc(t)}</span></div>`).join('')}</div>` : ''}
          ${details.length ? `<ul class="details">${details.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>` : ''}
          ${!shots.length && !r.ended ? '<p class="note">このアプリの画面の例はまだありません。</p>' : ''}
        </div>
      </div>
      ${a.url ? `<div class="card-actions"><a class="btn primary" href="${esc(a.url)}" target="_blank" rel="noopener">サイトを開く</a></div>` : ''}
    </article>`);
    card.querySelector('.card-head').addEventListener('click', () => toggle(r, true));
    if (shots.length) mountShots(card.querySelector('.shots'), a, shots);
    r.holder.replaceChildren(card);
  }

  function frameHtml(a, s) {
    const img = `<img src="${esc(s.src)}" alt="${esc(`${a.name} の画面の例：${s.title}`)}" width="${s.w}" height="${s.h}" decoding="async">`;
    switch (s.frame) {
      case 'window':
        return `<span class="frame-window${s.theme === 'dark' ? ' dark' : ''}"><span class="win-bar">${a.icon ? `<img src="${esc(a.icon)}" alt="">` : ''}<span class="win-title">${esc(s.windowTitle || a.name)}</span><span class="win-ctl"><span>${SVG.min}</span><span>${SVG.max}</span><span>${SVG.close}</span></span></span>${img}</span>`;
      case 'browser':
        return `<span class="frame-browser"><span class="browser-bar"><span class="browser-dots"><i></i><i></i><i></i></span><span class="browser-url">${esc(s.url || '')}</span></span>${img}</span>`;
      case 'phone':
        return `<span class="frame-phone">${img}</span>`;
      case 'land':
        return `<span class="frame-land">${img}</span>`;
      default:
        return `<span class="frame-bare">${img}</span>`;
    }
  }

  function mountShots(box, a, shots) {
    let index = 0;
    const draw = () => {
      const s = shots[index];
      box.innerHTML = `
        <div class="shots-head">
          <span class="shots-label">画面の例</span>
          ${shots.length > 1 ? `<span class="shot-tabs" role="tablist" aria-label="画面の例">${shots.map((x, i) => `<button type="button" class="shot-tab" role="tab" aria-selected="${i === index}" data-i="${i}">${esc(x.title)}</button>`).join('')}</span>` : ''}
        </div>
        <div class="stage"><button type="button" class="frame" title="クリックで大きく表示" style="${s.frame === 'phone' ? 'width:min(100%,300px)' : 'width:100%'}">${frameHtml(a, s)}</button></div>
        <div class="shot-caption">${captionHtml(s)}</div>`;
      box.querySelectorAll('.shot-tab').forEach((b) => b.addEventListener('click', () => { index = Number(b.dataset.i); draw(); box.querySelector(`.shot-tab[data-i="${index}"]`)?.focus(); }));
      box.querySelector('.frame').addEventListener('click', () => openViewer(a, shots, index, (i) => { index = i; draw(); }));
    };
    draw();
  }

  function captionHtml(s) {
    const kind = s.real ? '<span class="kind real">実際の画面</span>' : '<span class="kind">再現した画面</span>';
    return `${kind}${esc(s.note || (s.real ? '見本のデータで撮った画面です' : '実際の画面の作りをもとに、架空のデータで描いた画面です'))}`;
  }

  // ---------- 大きく見る ----------
  const viewer = document.getElementById('viewer');
  const vImg = document.getElementById('viewerImg');
  const vTitle = document.getElementById('viewerTitle');
  const vCap = document.getElementById('viewerCaption');
  const vPrev = document.getElementById('viewerPrev');
  const vNext = document.getElementById('viewerNext');
  let vState = null;
  let lastFocus = null;

  function openViewer(a, shots, index, onChange) {
    vState = { a, shots, index, onChange };
    lastFocus = document.activeElement;
    viewer.hidden = false;
    document.body.style.overflow = 'hidden';
    showViewer();
    document.getElementById('viewerClose').focus();
  }
  function showViewer() {
    const { a, shots, index } = vState;
    const s = shots[index];
    vImg.src = s.src;
    vImg.alt = `${a.name} の画面の例：${s.title}`;
    vTitle.textContent = `${a.name} ・ ${s.title}`;
    vCap.innerHTML = `${captionHtml(s)}${shots.length > 1 ? `　${index + 1} / ${shots.length}` : ''}`;
    vPrev.hidden = vNext.hidden = shots.length < 2;
  }
  function step(d) {
    if (!vState || vState.shots.length < 2) return;
    vState.index = (vState.index + d + vState.shots.length) % vState.shots.length;
    vState.onChange?.(vState.index);
    showViewer();
  }
  function closeViewer() {
    if (!vState) return;
    viewer.hidden = true;
    document.body.style.overflow = '';
    vImg.removeAttribute('src');
    vState = null;
    lastFocus?.focus?.({ preventScroll: true });
  }
  document.getElementById('viewerClose').addEventListener('click', closeViewer);
  vPrev.addEventListener('click', () => step(-1));
  vNext.addEventListener('click', () => step(1));
  viewer.addEventListener('click', (e) => { if (e.target === viewer || e.target.id === 'viewerStage') closeViewer(); });
  document.addEventListener('keydown', (e) => {
    if (!vState) return;
    if (e.key === 'Escape') closeViewer();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
  });
  let touchX = null;
  viewer.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  viewer.addEventListener('touchend', (e) => {
    if (touchX == null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  });

  // ---------- URL の #id で開く ----------
  function openFromHash() {
    const id = decodeURIComponent(location.hash.slice(1));
    const r = rows.get(id);
    if (!r) return;
    const sec = r.holder.closest('.group');
    const head = sec?.querySelector('.group-head');
    if (head?.getAttribute('aria-expanded') === 'false') head.click();
    if (!r.open) toggle(r, false);
    r.holder.scrollIntoView({ block: 'start' });
  }
  window.addEventListener('hashchange', openFromHash);
  openFromHash();
})();
