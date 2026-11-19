/* Özmen Emlak – ortak davranışlar (vanilla JS, file:// ile çalışır).
   KURAL: kaydırmaya bağlı hiçbir şey yok (IntersectionObserver, scroll dinleyicisi, parallax yok).
   Hareket yalnızca sayfa açılışı, zamanlayıcı, hover ve tıklama ile. */
(function () {
  'use strict';
  var D = window.OZ;
  var L = D.ilanlar;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var lc = function (s) { return String(s || '').toLocaleLowerCase('tr'); };

  /* ---------- Biçimlendirme ---------- */
  var tl = function (n) { return Math.round(n).toLocaleString('tr-TR') + ' TL'; };
  var price = function (l) { return tl(l.fiyat) + (l.durum === 'kiralik' ? '/ay' : ''); };
  var shortPrice = function (l) {
    return l.durum === 'kiralik' ? (l.fiyat / 1000).toLocaleString('tr-TR') + ' Bin TL'
      : (l.fiyat / 1e6).toLocaleString('tr-TR', { maximumFractionDigits: 2 }) + ' Mn TL';
  };
  var durumAd = function (l) { return l.durum === 'kiralik' ? 'Kiralık' : 'Satılık'; };
  var meta = function (l) { return [l.oda, l.m2.toLocaleString('tr-TR') + ' m²', l.kat].filter(Boolean).join(' · '); };
  var agentById = function (id) { return D.danismanlar.filter(function (a) { return a.id === id; })[0]; };
  var intl = function (n) { return '90' + n.replace(/\D/g, '').replace(/^0/, ''); }; // '0 (555) 000 00 01' -> 905550000001
  var telHref = function (n) { return 'tel:+' + intl(n); };
  var waHref = function (n, text) { return 'https://wa.me/' + intl(n) + (text ? '?text=' + encodeURIComponent(text) : ''); };
  console.assert(telHref('0 (555) 000 00 01') === 'tel:+905550000001', 'telHref hatalı');
  var img = function (src, alt) { return '<img src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy">'; };
  var badges = function (l) {
    return l.rozetler.map(function (r) { return '<span class="badge' + (r === 'Fiyatı Düştü' ? ' badge-accent' : '') + '">' + esc(r) + '</span>'; }).join('');
  };

  // Konut kredisi aylık taksiti (anüite). r: aylık faiz oranı (0,0249 gibi), n: ay.
  function payment(P, r, n) { return r ? P * r / (1 - Math.pow(1 + r, -n)) : P / n; }
  console.assert(Math.round(payment(1e6, 0.02, 120)) === 22048 && payment(1200, 0, 12) === 100, 'payment() hatalı');

  /* ---------- Kart şablonları (diğer sayfalar da kullanır) ---------- */
  function listingCard(l) {
    return '<a class="listing-card" href="ilan.html?id=' + l.id + '">' +
      '<div class="card-media">' + img(l.kapak, l.baslik) + '<div class="badges">' + badges(l) + '</div></div>' +
      '<div class="card-body"><p class="eyebrow">' + durumAd(l) + ' · ' + esc(l.tur) + '</p>' +
      '<p class="card-price">' + price(l) + '</p>' +
      '<h3 class="card-title">' + esc(l.baslik) + '</h3>' +
      '<p class="card-meta">' + esc(l.mahalle) + ', Çorum · ' + esc(meta(l)) + '</p></div></a>';
  }
  function agentCard(a) {
    return '<article class="agent-card"><div class="card-media">' + img(a.foto, a.ad + ', ' + a.unvan) + '</div>' +
      '<div class="card-body"><h3 class="card-title">' + esc(a.ad) + '</h3><p class="eyebrow">' + esc(a.unvan) + '</p>' +
      '<p class="card-meta">Yetki belgesi no: ' + esc(a.belge) + '</p>' +
      '<div class="btn-row"><a class="btn btn-outline btn-sm" href="' + telHref(a.telefon) + '">Ara</a>' +
      '<a class="btn btn-primary btn-sm" href="' + waHref(a.whatsapp) + '" target="_blank" rel="noopener">WhatsApp</a></div></div></article>';
  }
  function projectCard(p) {
    return '<article class="project-card"><div class="card-media">' + img(p.gorsel, p.ad + ' proje görseli') +
      '<div class="badges"><span class="badge">' + esc(p.durum) + '</span>' + (p.render ? '<span class="badge badge-light">Mimari görselleştirme</span>' : '') + '</div></div>' +
      '<div class="card-body"><p class="eyebrow">' + esc(p.mahalle) + ', Çorum</p><h3 class="card-title">' + esc(p.ad) + '</h3>' +
      '<p class="card-meta">' + esc(p.aciklama) + '</p><dl>' +
      '<div><dt>Teslim</dt><dd>' + esc(p.teslim) + '</dd></div>' +
      '<div><dt>Blok / Daire</dt><dd>' + p.blok + ' blok · ' + p.daire + ' daire</dd></div>' +
      '<div><dt>Kredi</dt><dd>' + (p.kredi ? 'Konut kredisine uygun' : 'Kredi uygunluğu sorunuz') + '</dd></div></dl></div></article>';
  }
  function blogCard(b) {
    return '<article class="blog-card"><div class="card-media">' + img(b.gorsel, b.baslik) + '</div>' +
      '<div class="card-body"><p class="eyebrow">' + esc(b.kategori) + ' · ' + esc(b.tarih) + '</p>' +
      '<h3 class="card-title">' + esc(b.baslik) + '</h3><p class="card-meta">' + esc(b.ozet) + '</p></div></article>';
  }
  function areaCard(m) {
    return '<a class="area-card" href="ilanlar.html?mahalle=' + encodeURIComponent(m.ad) + '">' + img(m.gorsel, m.ad + ' mahallesi') +
      '<div class="area-info"><h3>' + esc(m.ad) + '</h3><p>' + esc(m.aciklama) + '</p></div></a>';
  }
  function featureSlide(l) {
    var a = agentById(l.danisman);
    return '<article class="slide feature-slide"><div class="feature-media">' + img(l.kapak, l.baslik) + '</div>' +
      '<div class="feature-info"><div class="badges">' + badges(l) + '</div>' +
      '<h3>' + esc(l.baslik) + '</h3><p class="card-meta">' + esc(l.mahalle) + ', Çorum · ' + esc(meta(l)) + '</p>' +
      '<p class="card-price">' + price(l) + '</p>' +
      '<div class="btn-row"><a class="btn btn-primary" href="ilan.html?id=' + l.id + '">İlanı İncele</a>' +
      '<a class="btn btn-outline" href="' + telHref(a.telefon) + '">Danışmanı Ara</a></div></div></article>';
  }

  var byDate = function (a, b) { return b.tarih.localeCompare(a.tarih); };
  var presets = {
    yeni: function () { return L.slice().sort(byDate); },
    dusen: function () { return L.filter(function (l) { return l.rozetler.indexOf('Fiyatı Düştü') > -1; }); },
    alti3m: function () { return L.filter(function (l) { return l.durum === 'satilik' && l.fiyat < 3e6; }); },
    mustakil: function () { return L.filter(function (l) { return l.tur === 'Müstakil' || l.tur === 'Villa'; }); },
    ticari: function () { return L.filter(function (l) { return l.durum === 'satilik' && ['Dükkân', 'Ofis', 'Depo'].indexOf(l.tur) > -1; }); },
    onecikan: function () { return L.filter(function (l) { return l.onecikan; }); }
  };
  var renderers = {
    listings: function (el) { return (presets[el.dataset.preset] || presets.yeni)().map(listingCard); },
    featured: function () { return presets.onecikan().map(featureSlide); },
    agents: function () { return D.danismanlar.map(agentCard); },
    projects: function () { return D.projeler.map(projectCard); },
    blog: function () { return D.blog.map(blogCard); },
    areas: function () { return D.mahalleler.filter(function (m) { return m.gorsel; }).map(areaCard); }
  };
  function renderAll(root) {
    $$('[data-render]', root).forEach(function (el) {
      var r = renderers[el.dataset.render];
      if (r) el.innerHTML = r(el).slice(0, +el.dataset.limit || 99).join('');
    });
  }

  /* ---------- Harita (Leaflet, yalnızca sayfada yüklüyse) ---------- */
  function makeMap(el, center, zoom) {
    var m = L_.map(el, { scrollWheelZoom: false }).setView(center, zoom);
    L_.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap katkıda bulunanlar' }).addTo(m);
    return m;
  }
  var L_ = window.L; // Leaflet global'i; veri dizisi L ile karışmasın diye
  function pin(l) {
    return L_.marker([l.lat, l.lng], { icon: L_.divIcon({ className: 'map-pin', html: '<span>' + shortPrice(l) + '</span>', iconSize: [0, 0] }), title: l.baslik })
      .bindPopup('<a class="map-pop" href="ilan.html?id=' + l.id + '">' + img(l.kapak, l.baslik) + '<strong>' + price(l) + '</strong><span>' + esc(l.baslik) + '</span></a>');
  }

  /* ---------- Lightbox ---------- */
  var lb;
  function openLightbox(list, start) {
    if (!lb) {
      lb = document.createElement('dialog');
      lb.className = 'lightbox';
      lb.setAttribute('aria-label', 'Fotoğraf görüntüleyici');
      lb.innerHTML = '<img alt=""><p class="lightbox-count" aria-live="polite"></p>' +
        '<button type="button" class="lightbox-close" aria-label="Kapat">×</button>' +
        '<button type="button" class="lightbox-prev" aria-label="Önceki fotoğraf">‹</button>' +
        '<button type="button" class="lightbox-next" aria-label="Sonraki fotoğraf">›</button>';
      document.body.appendChild(lb);
      var step = function (d) { show(lb.i + d); };
      $('.lightbox-close', lb).onclick = function () { lb.close(); };
      $('.lightbox-prev', lb).onclick = function () { step(-1); };
      $('.lightbox-next', lb).onclick = function () { step(1); };
      lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
      lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); });
    }
    function show(i) {
      lb.i = (i + lb.list.length) % lb.list.length;
      var it = lb.list[lb.i], im = $('img', lb);
      im.classList.remove('is-missing');
      im.src = it.src; im.alt = it.alt || '';
      $('.lightbox-count', lb).textContent = (lb.i + 1) + ' / ' + lb.list.length;
    }
    lb.list = list;
    show(start || 0);
    if (!lb.open) lb.showModal();
  }

  /* ---------- Üst menü ---------- */
  function initHeader() {
    var page = location.pathname.split('/').pop() || 'index.html';
    $$('.main-nav a').forEach(function (a) { if (a.getAttribute('href').split('?')[0] === page) a.setAttribute('aria-current', 'page'); });
    var tog = $('.nav-toggle');
    if (!tog) return;
    var set = function (open) { document.body.classList.toggle('nav-open', open); tog.setAttribute('aria-expanded', open); };
    tog.addEventListener('click', function () { set(!document.body.classList.contains('nav-open')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
    $$('.main-nav a').forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
  }

  /* ---------- Sekmeler: [data-tabs] içinde button[role=tab][aria-controls] ---------- */
  function initTabs() {
    $$('[data-tabs]').forEach(function (root) {
      var btns = $$('[role="tab"]', root).filter(function (b) { return b.closest('[data-tabs]') === root; });
      function show(btn) {
        btns.forEach(function (b) {
          var on = b === btn, p = document.getElementById(b.getAttribute('aria-controls'));
          b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1;
          if (p) p.hidden = !on;
        });
        root.dispatchEvent(new CustomEvent('tabchange', { detail: btn.getAttribute('aria-controls') }));
      }
      btns.forEach(function (b, i) {
        b.addEventListener('click', function () { show(b); });
        b.addEventListener('keydown', function (e) {
          var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
          if (d) { var n = btns[(i + d + btns.length) % btns.length]; n.focus(); show(n); }
        });
      });
      if (btns.length) show(btns.filter(function (b) { return b.getAttribute('aria-selected') === 'true'; })[0] || btns[0]);
    });
  }

  /* ---------- Slayt: ok + zamanlayıcı, üzerine gelince durur ---------- */
  function initSliders() {
    $$('[data-slider]').forEach(function (root) {
      var slides = $$('.slide', root), i = 0, timer, count = $('[data-count]', root), ms = +root.dataset.interval;
      if (!slides.length) return;
      function go(n) {
        i = (n + slides.length) % slides.length;
        slides.forEach(function (s, k) { s.classList.toggle('is-active', k === i); s.setAttribute('aria-hidden', k !== i); s.inert = k !== i; });
        if (count) count.textContent = (i + 1) + ' / ' + slides.length;
      }
      function stop() { clearInterval(timer); }
      function start() { stop(); if (ms && !reduceMotion) timer = setInterval(function () { go(i + 1); }, ms); }
      var prev = $('[data-prev]', root), next = $('[data-next]', root);
      if (prev) prev.addEventListener('click', function () { go(i - 1); start(); });
      if (next) next.addEventListener('click', function () { go(i + 1); start(); });
      root.addEventListener('mouseenter', stop); root.addEventListener('mouseleave', start);
      root.addEventListener('focusin', stop); root.addEventListener('focusout', start);
      go(0); start();
    });
  }

  /* ---------- Dönen kelime (zamanlayıcı) ---------- */
  function initRotate() {
    $$('[data-rotate]').forEach(function (el) {
      var words = el.dataset.rotate.split('|'), i = 0;
      el.setAttribute('aria-live', 'off');
      el.textContent = words[0];
      if (reduceMotion || words.length < 2) return;
      setInterval(function () {
        i = (i + 1) % words.length;
        el.textContent = words[i];
        el.classList.remove('rotate-in'); void el.offsetWidth; el.classList.add('rotate-in');
      }, +el.dataset.interval || 2600);
    });
  }

  /* ---------- Lightbox kapları: [data-lightbox] içinde [data-full] ---------- */
  function initLightboxes() {
    $$('[data-lightbox]').forEach(function (root) {
      var items = $$('[data-full]', root);
      var list = items.map(function (b) { var im = $('img', b); return { src: b.dataset.full, alt: im && im.alt }; });
      items.forEach(function (b, i) { b.addEventListener('click', function () { openLightbox(list, i); }); });
      $$('[data-open-index]', root).forEach(function (b) { b.addEventListener('click', function () { openLightbox(list, +b.dataset.openIndex); }); });
    });
  }

  /* ---------- Konut kredisi hesaplayıcı ---------- */
  function initMortgage() {
    $$('[data-mortgage]').forEach(function (f) {
      var el = f.elements, out = function (k, v) { $('[data-out="' + k + '"]', f).textContent = v; };
      function calc() {
        var fiyat = Math.max(0, +el.fiyat.value || 0), pes = Math.min(Math.max(0, +el.pesinat.value || 0), fiyat);
        var n = Math.max(1, Math.round(+el.vade.value || 1)), r = Math.max(0, +el.faiz.value || 0) / 100;
        var P = fiyat - pes, m = payment(P, r, n), total = m * n;
        out('fiyat-fmt', tl(fiyat)); out('pesinat-fmt', tl(pes));
        out('taksit', tl(m)); out('kredi', tl(P)); out('faiz', tl(total - P)); out('toplam', tl(total));
        $('.donut', f).style.setProperty('--p', total ? (P / total * 100).toFixed(1) : 100);
      }
      f.addEventListener('input', calc);
      f.addEventListener('submit', function (e) { e.preventDefault(); });
      calc();
    });
  }

  /* ---------- Demo formlar: gönderim yok, başarı mesajı ---------- */
  function initForms() {
    $$('form[data-demo-form]').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        var msg = f.nextElementSibling;
        if (!msg || !msg.classList.contains('form-success')) {
          msg = document.createElement('p'); msg.className = 'form-success'; msg.setAttribute('role', 'status');
          f.parentNode.insertBefore(msg, f.nextSibling);
        }
        msg.textContent = f.dataset.success || 'Teşekkürler! Talebiniz alındı; danışmanımız en kısa sürede sizinle iletişime geçecek. (Demo: hiçbir bilgi gönderilmedi.)';
        f.reset();
      });
    });
  }

  /* ---------- Ana sayfa: video ve arama kutusu ---------- */
  function initHero() {
    var v = $('.hero-video');
    if (v) {
      var btn = $('.video-toggle');
      if (reduceMotion) { // hareket azaltma: video yüklenmez, poster görünür
        v.removeAttribute('autoplay');
        if (btn) btn.hidden = true;
      } else {
        // data-video="proje" gibi önek verilirse assets/video/<önek>-720|1080.mp4 seçilir (varsayılan: hero)
        v.src = 'assets/video/' + (v.dataset.video || 'hero') + (innerWidth < 768 ? '-720' : '-1080') + '.mp4';
        var p = v.play(); if (p) p.catch(function () {});
        if (btn) btn.addEventListener('click', function () {
          if (v.paused) { v.play(); btn.textContent = 'Videoyu durdur'; } else { v.pause(); btn.textContent = 'Videoyu oynat'; }
        });
      }
    }
    var box = $('.search-box');
    if (!box) return;
    var dl = $('#mahalle-listesi');
    if (dl) dl.innerHTML = D.mahalleler.map(function (m) { return '<option value="' + esc(m.ad) + '">'; }).join('');
    var araForm = $('#ara-form'), degForm = $('#degerleme-form');
    $$('.search-tabs [role="tab"]', box).forEach(function (b, _, all) {
      b.addEventListener('click', function () {
        all.forEach(function (x) { x.setAttribute('aria-selected', x === b); });
        $$('.form-success', box).forEach(function (msg) { msg.parentNode.removeChild(msg); });
        var mode = b.dataset.mode;
        araForm.hidden = mode === 'degerleme'; degForm.hidden = mode !== 'degerleme';
        if (mode !== 'degerleme') araForm.elements.durum.value = mode;
      });
    });
  }

  /* ---------- İletişim: ofis haritası ([data-office-map]) ---------- */
  function initOfficeMap() {
    var el = $('[data-office-map]');
    if (!el) return;
    if (!L_) { el.innerHTML = '<p class="empty" style="padding:24px">Harita yüklenemedi (internet bağlantısı gerekli).</p>'; return; }
    var o = D.ofis, m = makeMap(el, [o.lat, o.lng], 16);
    L_.marker([o.lat, o.lng], { icon: L_.divIcon({ className: 'map-pin', html: '<span>' + esc(o.ad) + '</span>', iconSize: [0, 0] }), title: o.ad }).addTo(m);
    setTimeout(function () { m.invalidateSize(); });
  }

  /* ---------- İlan listesi: filtre, sıralama, liste/harita ---------- */
  var PRICES = { satilik: [1e6, 2e6, 3e6, 4e6, 5e6, 7.5e6, 1e7, 1.5e7], kiralik: [1e4, 15e3, 2e4, 3e4, 4e4] };
  var SORTS = {
    oneri: function (a, b) { return (b.onecikan ? 1 : 0) - (a.onecikan ? 1 : 0) || byDate(a, b); },
    'fiyat-artan': function (a, b) { return a.fiyat - b.fiyat; },
    'fiyat-azalan': function (a, b) { return b.fiyat - a.fiyat; },
    yeni: byDate,
    m2: function (a, b) { return b.m2 - a.m2; }
  };
  function ensureOption(sel, v, label) {
    var hit = Array.prototype.filter.call(sel.options, function (o) { return lc(o.value) === lc(v); })[0];
    if (!hit) { hit = new Option(label || v.split(',').join(' + '), v); sel.add(hit); }
    sel.value = hit.value;
  }
  function matches(l, q) {
    return (!q.durum || l.durum === q.durum) &&
      (!q.tur || q.tur.split(',').indexOf(l.tur) > -1) &&
      (!q.oda || (/\+$/.test(q.oda) ? parseInt(l.oda, 10) >= parseInt(q.oda, 10) : l.oda === q.oda)) &&
      (!q.mahalle || lc(l.mahalle) === lc(q.mahalle)) &&
      (!q.min || l.fiyat >= +q.min) && (!q.max || l.fiyat <= +q.max) &&
      (!q.isitma || l.isitma === q.isitma) &&
      (!q.asansor || l.asansor) && (!q.otopark || l.otopark) &&
      (!q.kredi || l.rozetler.indexOf('Krediye Uygun') > -1) &&
      (!q.rozet || l.rozetler.indexOf(q.rozet) > -1);
  }
  function initListingSearch() {
    var f = $('#filters');
    if (!f) return;
    var el = f.elements, grid = $('#results'), mapEl = $('#results-map'), map, layer;
    var uniq = function (arr) { return arr.filter(function (v, i) { return v && arr.indexOf(v) === i; }).sort(function (a, b) { return a.localeCompare(b, 'tr'); }); };
    var fill = function (sel, vals) { vals.forEach(function (v) { sel.add(new Option(v, v)); }); };
    fill(el.mahalle, uniq(L.map(function (l) { return l.mahalle; })));
    fill(el.tur, uniq(L.map(function (l) { return l.tur; })));
    fill(el.isitma, uniq(L.map(function (l) { return l.isitma; })));

    function priceOptions() {
      var d = el.durum.value, list = PRICES[d] || PRICES.kiralik.concat(PRICES.satilik);
      ['min', 'max'].forEach(function (k) {
        var s = el[k], v = s.value;
        s.innerHTML = '<option value="">' + (k === 'min' ? 'En az' : 'En çok') + '</option>' +
          list.map(function (n) { return '<option value="' + n + '">' + tl(n) + '</option>'; }).join('');
        if (v) ensureOption(s, v, tl(+v));
      });
    }

    // URL'deki parametreleri forma uygula (ana sayfa araması ve sekme bağlantıları buraya gelir)
    var params = new URLSearchParams(location.search);
    if (params.get('durum')) el.durum.value = params.get('durum');
    priceOptions();
    params.forEach(function (v, k) {
      var c = el[k];
      if (!c || !v || k === 'durum') return;
      if (c.type === 'checkbox') c.checked = v === '1';
      else if (c.tagName === 'SELECT') ensureOption(c, v, (k === 'min' || k === 'max') ? tl(+v) : null);
    });

    function read() {
      var q = {};
      new FormData(f).forEach(function (v, k) { if (v !== '') q[k] = v; });
      return q;
    }
    function update() {
      var q = read();
      var res = L.filter(function (l) { return matches(l, q); }).sort(SORTS[q.sirala] || SORTS.oneri);
      grid.innerHTML = res.length ? res.map(listingCard).join('')
        : '<p class="empty">Bu ölçütlere uygun ilan bulunamadı. <button type="button" class="link-btn" data-reset>Filtreleri temizleyin</button> ya da danışmanımıza yazın.</p>';
      $('#result-count').textContent = res.length + ' ilan bulundu';
      $('#list-title').textContent = 'Çorum\'da ' + (q.durum === 'satilik' ? 'satılık' : q.durum === 'kiralik' ? 'kiralık' : 'satılık ve kiralık') + ' ilanlar';
      var extra = ['isitma', 'asansor', 'otopark', 'kredi', 'rozet'].filter(function (k) { return q[k]; }).length;
      $('#more-count').textContent = extra ? ' (' + extra + ')' : '';
      if (q.sirala === 'oneri') delete q.sirala;
      try { history.replaceState(null, '', location.pathname + (Object.keys(q).length ? '?' + new URLSearchParams(q) : '')); } catch (e) { /* file:// bazı tarayıcılarda izin vermez */ }
      if (map) drawPins(res);
    }
    function drawPins(res) {
      layer.clearLayers();
      res.forEach(function (l) { layer.addLayer(pin(l)); });
      var near = res.filter(function (l) { return !l.ilce; }); // ilçedeki ilan pinde kalır, kadrajı şehir dışına taşımaz
      if (res.length) map.fitBounds(L_.latLngBounds((near.length ? near : res).map(function (l) { return [l.lat, l.lng]; })), { padding: [40, 40], maxZoom: 15 });
    }

    f.addEventListener('change', function (e) { if (e.target === el.durum) priceOptions(); update(); });
    f.addEventListener('submit', function (e) { e.preventDefault(); update(); });
    // sıralama menüsü formun DOM'u dışında (form="filters"): change olayı forma ulaşmaz
    if (el.sirala && !f.contains(el.sirala)) el.sirala.addEventListener('change', update);
    f.addEventListener('reset', function () { setTimeout(function () { priceOptions(); update(); }); });
    grid.addEventListener('click', function (e) { if (e.target.hasAttribute('data-reset')) f.reset(); });

    var moreBtn = $('#more-toggle'), more = $('#more-filters');
    moreBtn.addEventListener('click', function () {
      more.hidden = !more.hidden; moreBtn.setAttribute('aria-expanded', !more.hidden);
    });

    $$('.view-toggle button').forEach(function (b, _, all) {
      b.addEventListener('click', function () {
        var isMap = b.dataset.view === 'harita';
        all.forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        grid.hidden = isMap; mapEl.hidden = !isMap;
        if (isMap && L_) {
          if (!map) { map = makeMap(mapEl, [40.549, 34.953], 13); layer = L_.layerGroup().addTo(map); }
          map.invalidateSize();
          drawPins(L.filter(function (l) { return matches(l, read()); }));
        }
        if (isMap && !L_) mapEl.innerHTML = '<p class="empty">Harita yüklenemedi (internet bağlantısı gerekli).</p>';
      });
    });
    update();
  }

  /* ---------- İlan detay: ?id= ile data.js'den çizer ---------- */
  function initDetail() {
    var root = $('#ilan-detay');
    if (!root) return;
    var id = new URLSearchParams(location.search).get('id');
    var l = id ? L.filter(function (x) { return x.id === +id; })[0] : presets.onecikan()[0];
    if (!l) {
      root.innerHTML = '<section class="section container"><p class="eyebrow">İlan</p><h1>İlan bulunamadı</h1>' +
        '<p class="lead">Aradığınız ilan yayından kaldırılmış olabilir.</p><a class="btn btn-primary" href="ilanlar.html">Tüm ilanlara dön</a></section>';
      return;
    }
    document.title = l.baslik + ' | Özmen Emlak';
    var a = agentById(l.danisman);
    var m = D.mahalleler.filter(function (x) { return x.ad === l.mahalle; })[0];
    var konut = ['Daire', 'Müstakil', 'Villa'].indexOf(l.tur) > -1;
    // Arsa ve ticari ilanlarda daire detay fotoğrafları gösterilmez; yalnızca ilanın kendi kapağı
    var photos = [{ src: l.kapak, ad: 'Kapak' }].concat(konut ? (l.galeri || []).map(function (n) { return D.detayGorseller[n - 1]; }) : []);
    var plan = konut && l.oda === '3+1'; // örnek plan bir 3+1 çizimi; diğer ilanlarda gösterilmez
    var satilik = l.durum === 'satilik';
    var kredi = satilik && konut; // konut kredisi arsa, tarla ve işyerinde kullanılmaz
    var arsa = l.tur === 'Arsa';
    var waText = 'Merhaba, "' + l.baslik + '" ilanı (İlan No: ' + (1000 + l.id) + ') hakkında bilgi almak istiyorum.';
    var yesNo = function (b) { return b ? 'Var' : 'Yok'; };
    var rows = [
      ['İlan No', 1000 + l.id], ['Durum', durumAd(l)], ['Tür', l.tur], [arsa ? 'Arsa alanı' : 'Alan (brüt)', l.m2.toLocaleString('tr-TR') + ' m²'],
      ['Oda', l.oda], ['Banyo', l.banyo], ['Kat', l.kat], ['Bina yaşı', l.binaYasi == null ? null : (l.binaYasi === 0 ? 'Sıfır' : l.binaYasi)],
      ['Isıtma', l.isitma], ['Asansör', konut || l.asansor ? yesNo(l.asansor) : null], ['Otopark', arsa ? null : yesNo(l.otopark)],
      ['Krediye uygun', l.rozetler.indexOf('Krediye Uygun') > -1 ? 'Evet' : 'Sorunuz'], ['Aidat', l.aidat ? tl(l.aidat) + '/ay' : null],
      ['Tapu durumu', l.tapu], ['İlan tarihi', new Date(l.tarih).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })]
    ].filter(function (r) { return r[1] != null && r[1] !== ''; });
    var similar = L.filter(function (x) { return x.id !== l.id; }).map(function (x) {
      return { x: x, s: (x.tur === l.tur ? 3 : 0) + (x.durum === l.durum ? 2 : 0) + (x.mahalle === l.mahalle ? 1 : 0) };
    }).sort(function (p, q) { return q.s - p.s; }).slice(0, 4).map(function (p) { return listingCard(p.x); }).join('');
    var list = function (arr) { return '<ul class="feature-list">' + arr.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>'; };

    root.innerHTML =
      '<section class="container" aria-label="İlan medyası" style="padding-top:24px">' +
      '<div data-tabs id="media-tabs"><div role="tablist" class="tab-list" aria-label="Medya">' +
      '<button type="button" role="tab" class="tab-btn" aria-controls="p-foto" aria-selected="true">Fotoğraflar (' + photos.length + ')</button>' +
      (plan ? '<button type="button" role="tab" class="tab-btn" aria-controls="p-plan">Kat Planı</button>' : '') +
      '<button type="button" role="tab" class="tab-btn" aria-controls="p-harita">Harita</button></div>' +
      '<div id="p-foto" role="tabpanel" class="tab-panel"><div class="gallery-wrap" data-lightbox><div class="gallery' + (photos.length < 2 ? ' is-single' : '') + '">' +
      photos.map(function (p, i) {
        return '<button type="button" class="gallery-item" data-full="' + p.src + '" aria-label="Fotoğrafı büyüt (' + (i + 1) + '/' + photos.length + ')">' + img(p.src, l.baslik + ' – ' + p.ad) + '</button>';
      }).join('') +
      '</div>' + (photos.length > 1 ? '<button type="button" class="btn btn-light btn-sm gallery-all" data-open-index="0">Tüm fotoğraflar (' + photos.length + ')</button>' : '') + '</div></div>' +
      (plan ? '<div id="p-plan" role="tabpanel" class="tab-panel" hidden><div class="plan-box">' +
        img(D.katPlani, 'Örnek 3+1 kat planı çizimi') + '<p class="note">Örnek kat planıdır; ilanın gerçek planı için danışmanınıza sorun.</p></div></div>' : '') +
      '<div id="p-harita" role="tabpanel" class="tab-panel" hidden><div class="map" id="detail-map" aria-label="İlan konumu haritası"></div>' +
      '<p class="note">Konum yaklaşıktır; tam adres randevu sırasında paylaşılır.</p></div></div></section>' +

      '<div class="container"><nav class="breadcrumb" aria-label="Sayfa yolu"><a href="index.html">Ana Sayfa</a> / ' +
      '<a href="ilanlar.html?durum=' + l.durum + '">' + durumAd(l) + ' İlanlar</a> / <a href="ilanlar.html?mahalle=' + encodeURIComponent(l.mahalle) + '">' + esc(l.mahalle) + '</a> / <span aria-current="page">' + esc(l.baslik) + '</span></nav>' +
      '<header class="detail-head"><div><div class="badges">' + badges(l) + '</div><h1>' + esc(l.baslik) + '</h1>' +
      '<p class="card-meta">' + esc(l.mahalle) + (l.ilce ? ' ilçesi, Çorum' : ' Mahallesi, Merkez / Çorum') + ' · İlan No: ' + (1000 + l.id) + '</p>' +
      '<ul class="facts">' + [l.oda && '<strong>' + l.oda + '</strong> oda', l.banyo && '<strong>' + l.banyo + '</strong> banyo', '<strong>' + l.m2.toLocaleString('tr-TR') + ' m²</strong>', l.kat && esc(l.kat)]
        .filter(Boolean).map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul></div>' +
      '<div><p class="price-lg">' + price(l) + '</p>' + (satilik ? '<p class="card-meta">≈ ' + tl(l.fiyat / l.m2) + ' / m²</p>' : '') +
      '<div class="btn-row" style="margin-top:12px">' + (kredi ? '<a class="btn btn-outline btn-sm" href="#kredi">Kredi hesapla</a>' : '') +
      '<button type="button" class="btn btn-outline btn-sm" data-share>Paylaş</button><button type="button" class="btn btn-outline btn-sm" onclick="window.print()">Yazdır</button></div></div></header>' +

      '<div class="detail-layout"><aside class="detail-aside" aria-label="Danışman"><div class="contact-card"><p class="eyebrow" style="margin:0">Bu ilanın danışmanı</p>' +
      '<div class="agent-row"><div class="agent-photo">' + img(a.foto, a.ad) + '</div><div><h3>' + esc(a.ad) + '</h3><p class="card-meta">' + esc(a.unvan) + '</p>' +
      '<p class="card-meta">Yetki belgesi no: ' + esc(a.belge) + '</p></div></div><p style="margin:0"><a href="' + telHref(a.telefon) + '">' + esc(a.telefon) + '</a></p>' +
      '<div class="btn-row"><a class="btn btn-outline" href="' + telHref(a.telefon) + '">Ara</a><a class="btn btn-primary" href="' + waHref(a.whatsapp, waText) + '" target="_blank" rel="noopener">WhatsApp</a></div>' +
      '<a class="link-arrow" href="#ilgi-formu">Bilgi talep formu</a></div>' +
      '<div class="contact-card"><p class="eyebrow" style="margin:0">İlan özeti</p><dl class="spec-table">' +
      [['Fiyat', price(l)], ['Alan', l.m2.toLocaleString('tr-TR') + ' m²'], ['Oda', l.oda], ['Konum', l.mahalle + (l.ilce ? ', Çorum' : ', Merkez')], ['İlan No', 1000 + l.id]]
        .filter(function (r) { return r[1]; }).map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd></div>'; }).join('') +
      '</dl><p class="note" style="margin:0">Evinizi satmayı ya da kiraya vermeyi mi düşünüyorsunuz?</p><a class="btn btn-outline btn-sm" href="iletisim.html">Ücretsiz değerleme isteyin</a></div></aside>' +

      '<div class="detail-main">' +
      '<section class="detail-sec"><h2>Açıklama</h2>' + l.aciklama.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</section>' +
      '<section class="detail-sec"><h2>İlan Detayları</h2><dl class="spec-table">' + rows.map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd></div>'; }).join('') + '</dl></section>' +
      '<section class="detail-sec"><h2>Özellikler</h2>' + list(l.ozellikler) + '</section>' +
      (kredi ? '<section class="detail-sec" id="kredi"><h2>Konut Kredisi Hesaplayıcı</h2>' +
        '<form class="mortgage" data-mortgage><div class="mortgage-fields">' +
        '<label class="field"><span>Gayrimenkul fiyatı (TL)</span><input name="fiyat" type="number" min="0" step="1000" inputmode="numeric" value="' + l.fiyat + '"><small class="field-hint" data-out="fiyat-fmt"></small></label>' +
        '<label class="field"><span>Peşinat (TL)</span><input name="pesinat" type="number" min="0" step="1000" inputmode="numeric" value="' + Math.round(l.fiyat * 0.3) + '"><small class="field-hint" data-out="pesinat-fmt"></small></label>' +
        '<label class="field"><span>Vade (ay)</span><input name="vade" type="number" min="12" max="240" step="12" inputmode="numeric" value="120"></label>' +
        '<label class="field"><span>Aylık faiz oranı (%)</span><input name="faiz" type="number" min="0" max="10" step="0.01" inputmode="decimal" value="2.49"></label></div>' +
        '<div class="mortgage-result" aria-live="polite"><div class="donut" aria-hidden="true"><div><span>Aylık taksit</span><strong data-out="taksit"></strong></div></div>' +
        '<dl><div><dt>Kredi tutarı</dt><dd data-out="kredi"></dd></div><div><dt>Toplam faiz</dt><dd data-out="faiz"></dd></div><div><dt>Toplam geri ödeme</dt><dd data-out="toplam"></dd></div></dl>' +
        '<p class="legend"><span><i style="background:var(--ink)"></i>Anapara</span><span><i style="background:var(--accent)"></i>Faiz</span></p></div></form>' +
        '<p class="note" style="margin-top:12px">Hesaplama bilgi amaçlıdır; masraflar dahil değildir. Kesin teklif için bankanıza danışın.</p></section>' : '') +
      (m ? '<section class="detail-sec"><div class="sec-title-row"><h2>Çorum Piyasa Özeti</h2><span class="badge badge-outline">Demo veri</span></div>' +
        '<div class="stats" style="--cols:4">' +
        '<div class="stat"><span class="stat-num">' + tl(m.m2Fiyat) + '</span><span class="stat-label">Ortalama m² satış fiyatı · ' + esc(m.ad) + '</span></div>' +
        '<div class="stat"><span class="stat-num">' + m.satisSuresi + ' gün</span><span class="stat-label">Ortalama satış süresi</span></div>' +
        '<div class="stat"><span class="stat-num">' + m.aktifIlan + '</span><span class="stat-label">Mahallede aktif ilan</span></div>' +
        '<div class="stat"><span class="stat-num">+%' + m.degisim + '</span><span class="stat-label">Yıllık m² fiyat değişimi</span></div></div>' +
        '<p class="note" style="margin-top:16px">Bu rakamlar prototip için uydurulmuş örnek verilerdir; gerçek piyasa verisi değildir.</p></section>' +

        '<section class="detail-sec"><p class="eyebrow">Mahalle</p><h2>' + esc(m.ad) + '</h2><p>' + esc(m.aciklama) + '</p>' +
        '<div data-tabs><div role="tablist" class="tab-list" aria-label="Mahalle bilgisi">' +
        '<button type="button" role="tab" class="tab-btn" aria-controls="p-okul" aria-selected="true">Okullar</button>' +
        '<button type="button" role="tab" class="tab-btn" aria-controls="p-ulasim">Ulaşım</button></div>' +
        '<div id="p-okul" role="tabpanel" class="tab-panel">' + list(m.okullar) + '</div>' +
        '<div id="p-ulasim" role="tabpanel" class="tab-panel" hidden>' + list(m.ulasim) + '</div></div>' +
        '<p style="margin-top:24px"><a class="link-arrow" href="ilanlar.html?mahalle=' + encodeURIComponent(m.ad) + '">' + esc(m.ad) + ' ilanlarını gör</a></p></section>' : '') +

      '<section class="detail-sec" id="ilgi-formu"><h2>Bu ilanla ilgileniyor musunuz?</h2><p class="muted">Formu doldurun, ' + esc(a.ad) + ' sizi arasın.</p>' +
      '<form class="form-grid" data-demo-form>' +
      '<label class="field"><span>Ad soyad</span><input name="ad" required autocomplete="name"></label>' +
      '<label class="field"><span>Telefon</span><input name="telefon" type="tel" required autocomplete="tel" placeholder="05xx xxx xx xx"></label>' +
      '<label class="field full"><span>E-posta</span><input name="eposta" type="email" autocomplete="email"></label>' +
      '<label class="field full"><span>Mesajınız</span><textarea name="mesaj">' + esc(waText) + '</textarea></label>' +
      '<label class="check full"><input type="checkbox" required> KVKK aydınlatma metnini okudum, benimle iletişime geçilmesini kabul ediyorum.</label>' +
      '<div class="full"><button type="submit" class="btn btn-primary">Bilgi İste</button></div></form></section>' +
      '</div></div></div>' +

      '<section class="section"><div class="container"><div class="section-head"><div><p class="eyebrow">Benzer ilanlar</p><h2>Bunlar da ilginizi çekebilir</h2></div>' +
      '<a class="link-arrow" href="ilanlar.html?tur=' + encodeURIComponent(l.tur) + '">Tüm ' + esc(l.tur.toLocaleLowerCase('tr')) + ' ilanları</a></div>' +
      '<div class="grid grid-4">' + similar + '</div></div></section>';

    var mapDone = false;
    $('#media-tabs').addEventListener('tabchange', function (e) {
      if (e.detail !== 'p-harita') return;
      var me = $('#detail-map');
      if (!L_) { me.innerHTML = '<p class="empty" style="padding:24px">Harita yüklenemedi (internet bağlantısı gerekli).</p>'; return; }
      if (!mapDone) { mapDone = true; var mp = makeMap(me, [l.lat, l.lng], 15); pin(l).addTo(mp); setTimeout(function () { mp.invalidateSize(); }); }
    });
    var share = $('[data-share]', root);
    share.addEventListener('click', function () {
      if (navigator.share) { navigator.share({ title: l.baslik, url: location.href }).catch(function () {}); return; }
      (navigator.clipboard ? navigator.clipboard.writeText(location.href) : Promise.reject())
        .then(function () { share.textContent = 'Bağlantı kopyalandı'; }, function () { share.textContent = 'Kopyalanamadı'; });
    });
  }

  /* ---------- Başlat ---------- */
  // Eksik görsel: kırık simge yerine kabın nötr zemini görünsün
  document.addEventListener('error', function (e) { if (e.target.tagName === 'IMG') e.target.classList.add('is-missing'); }, true);
  renderAll(document);
  initHeader();
  initHero();
  initOfficeMap();
  initListingSearch();
  initDetail();
  initTabs();
  initSliders();
  initRotate();
  initLightboxes();
  initMortgage();
  initForms();

  window.OzUI = { tl: tl, price: price, listingCard: listingCard, agentCard: agentCard, projectCard: projectCard, blogCard: blogCard, areaCard: areaCard, makeMap: makeMap, pin: pin, openLightbox: openLightbox, waHref: waHref, telHref: telHref, renderAll: renderAll };
})();
