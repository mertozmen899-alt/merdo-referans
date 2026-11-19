/* Özmen Emlak — ortak betik (sade JavaScript, derleme yok, file:// ile çalışır) */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var fmt = function (n) { return Number(n).toLocaleString('tr-TR'); };
  var kucuk = function (s) { return String(s || '').toLocaleLowerCase('tr'); };
  var buyuk = function (s) { return String(s || '').toLocaleUpperCase('tr'); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var link = function (o) { return 'ilanlar.html?' + new URLSearchParams(o).toString(); };
  var azHareket = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var sayfa = document.body.getAttribute('data-sayfa');
  var params = new URLSearchParams(location.search);

  var TEL = '0364 000 00 00', TEL_LINK = 'tel:+903640000000';
  var WA = 'https://wa.me/905000000000'; // açıkça örnek numara
  var ADRES = 'Örnek Caddesi No: 00, Merkez / Çorum';

  /* ---------- İkonlar ---------- */
  var ik = function (d, extra) { return '<svg class="ik" viewBox="0 0 24 24" aria-hidden="true" focusable="false"' + (extra || '') + '>' + d + '</svg>'; };
  var IK = {
    ara: ik('<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/>'),
    asagi: ik('<path d="M5 9l7 7 7-7"/>'),
    yukari: ik('<path d="M5 15l7-7 7 7"/>'),
    sol: ik('<path d="M15 4l-8 8 8 8"/>'),
    sag: ik('<path d="M9 4l8 8-8 8"/>'),
    kapat: ik('<path d="M5 5l14 14M19 5L5 19"/>'),
    tel: ik('<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/>'),
    posta: ik('<rect x="3" y="5" width="18" height="14"/><path d="M3 6l9 7 9-7"/>'),
    konum: ik('<path d="M12 22s7-7.2 7-12.5A7 7 0 0 0 5 9.5C5 14.8 12 22 12 22z"/><circle cx="12" cy="9.5" r="2.5"/>'),
    sohbet: ik('<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/>'),
    insta: ik('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>'),
    face: ik('<path d="M14 21v-8h3l.5-3.5H14V7.5c0-1 .4-1.7 1.8-1.7h1.8V2.7A24 24 0 0 0 15 2.5c-2.6 0-4.3 1.6-4.3 4.5v2.5H8V13h2.7v8"/>'),
    linked: ik('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7.5 10v7M7.5 7v.01M11.5 17v-7M11.5 13a3 3 0 0 1 6 0v4"/>'),
    alan: ik('<rect x="3" y="3" width="18" height="18"/><path d="M7 11V7h4M17 13v4h-4M7 7l4 4M17 17l-4-4"/>'),
    net: ik('<path d="M3 21V10l9-7 9 7v11z"/><path d="M9 21v-6h6v6"/>'),
    arsa: ik('<path d="M2 19l6-9 4 5 3-4 7 8z"/><circle cx="17" cy="6" r="2"/>'),
    oda: ik('<path d="M3 19v-7h18v7M3 12V6M3 16h18M7 12V9h5v3M13 12V9h5a3 3 0 0 1 3 3"/>'),
    banyo: ik('<path d="M3 12h18v2a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6zM6 12V6a2 2 0 0 1 4 0M7 20l-1 2M17 20l1 2"/>'),
    kat: ik('<path d="M3 21h5v-5h5v-5h5V6h3"/>'),
    yas: ik('<rect x="3" y="5" width="18" height="16"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
    isitma: ik('<path d="M12 3c.5 3.5 6 6 6 11a6 6 0 0 1-12 0c0-3 2-4.5 2.5-7 1.5 1.2 2.5 3 2.5 5 1-2 1.3-5 1-9z"/>'),
    otopark: ik('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9.5 17V7h3.5a3 3 0 0 1 0 6H9.5"/>'),
    paylas: ik('<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.3 10.8l7.4-3.6M8.3 13.2l7.4 3.6"/>'),
    wa: ik('<path d="M3.5 20.5l1.3-4.3A8.6 8.6 0 1 1 7.9 19.3z"/><path d="M9 8.2c-.1 3.6 3.2 6.9 6.8 6.8l1-1.4-2-1.1-.9.8c-1.2-.5-2.2-1.5-2.7-2.7l.8-.9-1.1-2z"/>'),
    imar: ik('<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 12h7M9 16h7"/>'),
    ince_sol: '<svg viewBox="0 0 20 40" aria-hidden="true" focusable="false"><path d="M18 2L2 20l16 18"/></svg>',
    ince_sag: '<svg viewBox="0 0 20 40" aria-hidden="true" focusable="false"><path d="M2 2l16 18L2 38"/></svg>'
  };

  /* ---------- İlan yardımcıları ---------- */
  var ISLEM = { satilik: 'Satılık', kiralik: 'Kiralık' };
  var ILCELER = ['Merkez', 'Sungurlu', 'Osmancık', 'İskilip'];
  var fiyatYaz = function (i) { return fmt(i.fiyat) + ' TL' + (i.islem === 'kiralik' ? ' / ay' : ''); };
  var bolge = function (i) { return i.mahalle + ', ' + i.ilce + ', Çorum'; };
  var rozetler = function (i) {
    var r = i.satildi ? ['Satıldı'] : i.rozet;
    return r.length ? '<ul class="rozetler">' + r.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' : '';
  };
  var galeri = function (i) {
    var set = SETLER[i.tip === 'Arsa' ? 'arsa' : i.tip === 'Dükkân' ? 'dukkan' : i.tip === 'Bağ evi' ? 'bag' :
      i.tip === 'Villa' ? 'villa' : i.tip === 'Müstakil ev' ? 'mustakil' : i.esyasiz ? 'bos' : 'daire'];
    var r = i.id % set.length, sira = set.slice(r).concat(set.slice(0, r));
    if (set.length >= 5 && i.id % 2) sira = sira.slice(0, -1); // her ilanda aynı dizi görünmesin
    return [i.img].concat(sira, i.ekGaleri || []);
  };
  var ozellikler = function (i, tam) {
    var o = [];
    if (i.brut) o.push([IK.alan, fmt(i.brut) + ' m²', i.tip === 'Arsa' ? 'Arsa alanı' : 'Brüt alan']);
    if (i.net) o.push([IK.net, fmt(i.net) + ' m²', 'Net alan']);
    if (i.arsa && i.tip !== 'Arsa') o.push([IK.arsa, fmt(i.arsa) + ' m²', 'Arsa']);
    if (i.oda) o.push([IK.oda, i.oda, 'Oda']);
    if (i.banyo) o.push([IK.banyo, i.banyo + ' banyo', 'Banyo']);
    if (i.wc) o.push([IK.banyo, i.wc + ' WC', 'WC']);
    if (i.imar) o.push([IK.imar, 'İmar: ' + i.imar, 'İmar / emsal']);
    if (tam) {
      if (i.kat) o.push([IK.kat, i.kat, 'Kat']);
      if (i.yas) o.push([IK.yas, i.yas + ' yıllık', 'Bina yaşı']);
      if (i.isitma && i.isitma !== '-') o.push([IK.isitma, i.isitma, 'Isıtma']);
      if (i.otopark && i.otopark !== '-') o.push([IK.otopark, i.otopark, 'Otopark']);
    }
    return tam ? o : o.slice(0, 4);
  };

  /* Kaydırıcı kartı (ana sayfa, ofis sayfası) */
  var kart = function (i) {
    return '<div class="kart"><a class="kart-link" href="ilan.html?id=' + i.id + '" draggable="false">' +
      '<span class="kart-gorsel"><img src="' + i.img + '" alt="' + esc(i.baslik) + '" loading="lazy" draggable="false" width="600" height="400">' + rozetler(i) + '</span>' +
      '<span class="kart-bilgi"><span class="bolge">' + esc(bolge(i)) + '</span>' +
      '<span class="kart-alt"><small>' + '<strong>' + (i.satildi ? 'Satıldı' : fiyatYaz(i)) + '</strong>' + '<br>Ref: ' + i.ref + '</small><span class="btn-kart">İlanı incele</span></span></span>' +
      '</a></div>';
  };

  /* Liste kartı (ilanlar.html) */
  var listeKarti = function (i) {
    return '<article class="lkart"><a class="lkart-link" href="ilan.html?id=' + i.id + '">' +
      '<span class="lkart-gorsel"><img src="' + i.img + '" alt="' + esc(i.baslik) + '" loading="lazy" width="680" height="400">' + rozetler(i) + '</span>' +
      '<span class="lkart-bilgi"><span class="lkart-ust"><strong class="bolge">' + esc(i.mahalle) + '<br>' + esc(i.ilce) + ', Çorum</strong>' +
      '<span class="fiyat">' + (i.satildi ? 'Satıldı' : fiyatYaz(i)) + '</span></span>' +
      '<span class="maddeler"><span>' + i.ref + '</span><span>' + ISLEM[i.islem] + '</span><span>' + i.tip + '</span></span>' +
      '<span class="lkart-ozellik">' + ozellikler(i).map(function (o) { return '<span class="oz">' + o[0] + '<small>' + o[1] + '</small></span>'; }).join('') + '</span></span>' +
      '</a><button class="ozet-ac" type="button" aria-expanded="false" aria-label="Kısa açıklamayı göster">' + IK.asagi + '</button>' +
      '<p class="lkart-ozet" hidden>' + esc(i.baslik) + '. ' + esc(i.ozet) + '</p></article>';
  };

  /* ---------- Üst menü ---------- */
  var MENU = [
    ['Satılık', link({ islem: 'satilik' }), [
      ['Tüm satılık ilanlar', link({ islem: 'satilik' })], ['Villa', link({ islem: 'satilik', tip: 'Villa' })],
      ['Müstakil ev', link({ islem: 'satilik', tip: 'Müstakil ev' })], ['Daire ve rezidans', link({ islem: 'satilik', tip: 'Daire,Rezidans' })],
      ['Arsa', link({ islem: 'arsa' })], ['Bağ evi', link({ islem: 'satilik', tip: 'Bağ evi' })]]],
    ['Kiralık', link({ islem: 'kiralik' }), [
      ['Tüm kiralık ilanlar', link({ islem: 'kiralik' })], ['Daire ve rezidans', link({ islem: 'kiralik', tip: 'Daire,Rezidans' })],
      ['Dükkân ve işyeri', link({ islem: 'isyeri' })]]],
    ['Değerleme', 'iletisim.html?konu=degerleme#iletisim-formu'],
    ['Ofisimiz', 'iletisim.html'],
    ['Hizmetler', 'iletisim.html#hizmetler', [
      ['Alım ve satım danışmanlığı', 'iletisim.html#hizmetler'], ['Kiralama ve mülk yönetimi', 'iletisim.html#hizmetler'],
      ['Değerleme ve ekspertiz', 'iletisim.html?konu=degerleme#iletisim-formu'], ['Kredi ve tapu işlemleri', 'iletisim.html#hizmetler']]],
    ['Hakkımızda', 'iletisim.html#hakkimizda']
  ];

  function ustMenu() {
    var yer = $('#ust'); if (!yer) return;
    var masa = MENU.map(function (m) {
      var alt = m[2] ? '<ul class="alt-menu">' + m[2].map(function (a) { return '<li><a href="' + a[1] + '">' + a[0] + '</a></li>'; }).join('') + '</ul>' : '';
      return '<li' + (alt ? ' class="acilir"' : '') + '><a href="' + m[1] + '">' + m[0] + '</a>' + alt + '</li>';
    }).join('');
    var mobil = MENU.map(function (m) {
      if (!m[2]) return '<li><a href="' + m[1] + '">' + m[0] + '</a></li>';
      return '<li><details><summary>' + m[0] + IK.asagi + '</summary><ul>' + m[2].map(function (a) { return '<li><a href="' + a[1] + '">' + a[0] + '</a></li>'; }).join('') + '</ul></details></li>';
    }).join('');
    yer.innerHTML =
      '<a class="atla" href="#icerik">İçeriğe geç</a>' +
      '<div class="ust-ic">' +
      '<button class="burger" type="button" aria-label="Menüyü aç" aria-expanded="false" aria-controls="mobil-menu"><span></span><span></span><span></span></button>' +
      '<a class="logo" href="index.html"><img src="img/logo.svg?v=202611191407" alt="Özmen Emlak ana sayfa" width="258" height="52"></a>' +
      '<nav class="menu" aria-label="Ana menü"><ul>' + masa + '</ul></nav>' +
      '<span class="dil" title="Site dili: Türkçe">TR</span>' +
      '</div>' +
      '<nav class="mobil-menu" id="mobil-menu" aria-label="Mobil menü" hidden><ul>' + mobil + '</ul>' +
      '<p class="mm-iletisim"><a href="' + TEL_LINK + '">' + IK.tel + TEL + '</a></p></nav>';
    var b = $('.burger', yer), mm = $('#mobil-menu');
    b.addEventListener('click', function () {
      var acik = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!acik));
      b.setAttribute('aria-label', acik ? 'Menüyü aç' : 'Menüyü kapat');
      mm.hidden = acik;
      document.documentElement.classList.toggle('menu-acik', !acik);
    });
  }

  /* ---------- Alt bölüm: hızlı bağlantılar + footer + sabit düğmeler ---------- */
  function altBolum() {
    var yer = $('#alt'); if (!yer) return;
    var mah = YERLER.filter(function (y) { return ILCELER.indexOf(y) < 0; });
    yer.innerHTML =
      '<section class="hizli" aria-label="Hızlı bağlantılar">' +
      '<button class="hizli-ac" type="button" aria-expanded="false" aria-controls="hizli-panel">Hızlı bağlantılar ' + IK.asagi + '</button>' +
      '<div class="hizli-panel" id="hizli-panel" hidden><div class="hizli-ic">' +
      '<div><h2>Çorum\'da emlak</h2><p>Özmen Emlak, Çorum merkez ve ilçelerinde satılık ve kiralık konut, arsa ve işyeri için alım, satım, kiralama ve değerleme danışmanlığı sunar. Portföyümüzdeki her mülk yerinde incelenir, fotoğraflanır ve tapu bilgileri doğrulanarak yayınlanır.</p></div>' +
      '<div><h3>Mahalleler</h3><ul>' + mah.map(function (m) { return '<li><a href="' + link({ yer: m }) + '">' + m + '</a></li>'; }).join('') + '</ul></div>' +
      '<div><h3>İlçeler</h3><ul>' + ILCELER.map(function (m) { return '<li><a href="' + link({ yer: m }) + '">' + (m === 'Merkez' ? 'Çorum Merkez' : m) + '</a></li>'; }).join('') + '</ul></div>' +
      '<div><h3>Mülk tipi</h3><ul><li><a href="' + link({ tip: 'Villa' }) + '">Villa</a></li><li><a href="' + link({ tip: 'Müstakil ev' }) + '">Müstakil ev</a></li><li><a href="' + link({ tip: 'Daire,Rezidans' }) + '">Daire ve rezidans</a></li><li><a href="' + link({ islem: 'arsa' }) + '">Arsa</a></li><li><a href="' + link({ islem: 'isyeri' }) + '">Dükkân</a></li><li><a href="' + link({ tip: 'Bağ evi' }) + '">Bağ evi</a></li></ul></div>' +
      '</div></div></section>' +
      '<footer class="alt">' +
      '<div class="alt-ic">' +
      '<form class="bulten" data-demo-form novalidate><label for="bulten-eposta">Yeni ilanlar ve piyasa notları e-posta kutunuza gelsin</label>' +
      '<span class="bulten-alan"><input id="bulten-eposta" type="email" required placeholder="E-posta adresiniz" autocomplete="email"><button type="submit" aria-label="Bültene kaydol">' + IK.posta + '</button></span>' +
      '<span class="form-mesaj" role="status"></span></form>' +
      '<div class="alt-satir"><span class="sosyal"><a href="#" data-demo aria-label="LinkedIn (demo)">' + IK.linked + '</a><a href="#" data-demo aria-label="Facebook (demo)">' + IK.face + '</a><a href="#" data-demo aria-label="Instagram (demo)">' + IK.insta + '</a></span>' +
      '<details class="alt-ofis"><summary>Çorum\'daki ofislerimiz ' + IK.asagi + '</summary><ul><li><a href="iletisim.html">Çorum Merkez ofisi</a></li><li><a href="iletisim.html#ofisler">Sungurlu irtibat ofisi</a></li></ul></details></div>' +
      '<ul class="alt-linkler"><li><a href="#" data-demo>Kullanım koşulları</a></li><li><a href="#" data-demo>KVKK aydınlatma metni</a></li><li><a href="iletisim.html">İletişim</a></li></ul>' +
      '<div class="alt-logo"><a href="index.html"><img src="img/logo-acik.svg?v=202611191407" alt="Özmen Emlak ana sayfa" width="278" height="56" loading="lazy"></a><p class="telif">© 2026 Özmen Emlak. Tüm hakları saklıdır.</p></div>' +
      '<div class="imza"><p>Bu site örnek amaçlı demo çalışmasıdır, ilanlar gerçek değildir.</p><p>Tasarım ve yazılım: <a href="https://merdomedia.com" target="_blank" rel="noopener">Merdo Media — merdomedia.com</a></p></div>' +
      '</div></footer>' +
      '<a class="balon" href="' + WA + '" target="_blank" rel="noopener" aria-label="WhatsApp ile yazın (örnek numara)">' + IK.wa + '<span>WhatsApp ile yazın</span></a>' +
      '<button class="yukari" type="button" aria-label="Sayfanın başına dön">' + IK.yukari + '</button>' +
      '<div class="kvkk" role="region" aria-label="Çerez bilgisi" hidden><p>Bu demo sitede çerez ve izleme kodu kullanılmaz.</p><button type="button" class="btn">Tamam</button></div>' +
      '<div class="toast" role="status" aria-live="polite"></div>';

    var ha = $('.hizli-ac'), hp = $('#hizli-panel');
    ha.addEventListener('click', function () { var a = ha.getAttribute('aria-expanded') === 'true'; ha.setAttribute('aria-expanded', String(!a)); hp.hidden = a; });
    $('.yukari').addEventListener('click', function () { window.scrollTo({ top: 0, behavior: azHareket ? 'auto' : 'smooth' }); });
    var kv = $('.kvkk'), gor = true;
    try { gor = localStorage.getItem('oe-kvkk') !== '1'; } catch (e) {}
    kv.hidden = !gor;
    $('button', kv).addEventListener('click', function () { kv.hidden = true; try { localStorage.setItem('oe-kvkk', '1'); } catch (e) {} });
  }

  var toastZaman;
  function toast(msg) {
    var t = $('.toast'); if (!t) return;
    t.textContent = msg; t.classList.add('gor');
    clearTimeout(toastZaman); toastZaman = setTimeout(function () { t.classList.remove('gor'); }, 2600);
  }

  /* Demo bağlantıları ve formlar */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-demo]');
    if (a) { e.preventDefault(); toast('Demo: gerçek sitede bu bağlantı ilgili sayfaya gider.'); }
  });
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f.hasAttribute('data-demo-form')) return;
    e.preventDefault();
    if (!f.checkValidity()) { f.reportValidity(); return; }
    var m = $('.form-mesaj', f);
    if (m) m.textContent = 'Teşekkürler. Bu bir demo sitedir; bilgileriniz hiçbir yere gönderilmedi.';
  });

  /* ---------- Çift tutamaçlı kaydırıcı (bütçe, m²) ---------- */
  var KUR = { TL: 1, USD: 42, EUR: 48.5, GBP: 55 }; // shortcut: sabit örnek kur, gerçek sitede günlük kur servisine bağlanır
  // Adımlar seçili para biriminde yuvarlak değerlerdir; URL'de o birimle saklanır, filtrede TL'ye çevrilir.
  var BUTCE = {
    satis: { TL: [0, 1e6, 2e6, 3e6, 4e6, 5e6, 7.5e6, 10e6, 15e6, 20e6, 30e6, 50e6], DOVIZ: [0, 25e3, 50e3, 75e3, 100e3, 150e3, 200e3, 300e3, 500e3, 750e3, 1e6] },
    kira: { TL: [0, 10000, 15000, 20000, 25000, 30000, 40000, 50000, 75000, 100000], DOVIZ: [0, 250, 500, 750, 1000, 1500, 2000, 2500] }
  };
  var ALAN = [0, 50, 75, 100, 125, 150, 200, 250, 300, 400, 500, 1000, 2500, 5000];

  function ciftKaydirici(el, adimlar, yaz, ad) {
    el.innerHTML = '<div class="kd-etiket" aria-hidden="true"></div><div class="cift"><div class="cift-ray"><div class="cift-dolu"></div></div>' +
      '<input type="range" min="0" step="1" aria-label="' + ad + ' en az"><input type="range" min="0" step="1" aria-label="' + ad + ' en çok"></div>';
    var g = $$('input', el), et = $('.kd-etiket', el), dolu = $('.cift-dolu', el);
    var api = {
      adim: function (a, mn, mx) {
        adimlar = a; var son = a.length - 1;
        g.forEach(function (x) { x.max = son; });
        var yakin = function (v) { var en = 0; a.forEach(function (x, k) { if (Math.abs(x - v) < Math.abs(a[en] - v)) en = k; }); return en; };
        g[0].value = mn ? Math.min(yakin(mn), son - 1) : 0;
        g[1].value = mx ? Math.max(yakin(mx), 1) : son;
        if (+g[0].value > +g[1].value) g[0].value = g[1].value;
        ciz();
      },
      deger: function () {
        var a = +g[0].value, b = +g[1].value, son = adimlar.length - 1;
        return [a > 0 ? adimlar[a] : null, b < son ? adimlar[b] : null];
      },
      ciz: function () { ciz(); }
    };
    function metin(i, uc) { return i === uc ? (i === 0 ? 'En az' : 'En çok') : yaz(adimlar[i]); }
    function ciz() {
      var a = +g[0].value, b = +g[1].value, son = adimlar.length - 1;
      dolu.style.left = (a / son * 100) + '%'; dolu.style.right = (100 - b / son * 100) + '%';
      var t0 = metin(a, 0), t1 = metin(b, son);
      et.textContent = t0 + '  –  ' + t1;
      g[0].setAttribute('aria-valuetext', t0); g[1].setAttribute('aria-valuetext', t1);
    }
    g[0].addEventListener('input', function () { if (+g[0].value > +g[1].value) g[0].value = g[1].value; ciz(); });
    g[1].addEventListener('input', function () { if (+g[1].value < +g[0].value) g[1].value = g[0].value; ciz(); });
    return api;
  }

  /* ---------- Arama kutusu (hero ve filtre paneli) ---------- */
  var SEKMELER = [['satilik', 'Satılık'], ['kiralik', 'Kiralık'], ['isyeri', 'İşyeri'], ['arsa', 'Arsa']];
  var TIPLER = ['Daire', 'Rezidans', 'Villa', 'Müstakil ev', 'Bağ evi', 'Arsa', 'Dükkân'];
  var ODALAR = ['1+1', '2+1', '3+1', '4+1', '5+'];
  var sayac = 0;

  function aramaKutusu(yer, p) {
    var n = ++sayac, islem = p.get('islem') || 'satilik';
    var secili = function (ad, v) { return (p.get(ad) || '').split(',').indexOf(v) > -1 ? ' checked' : ''; };
    var cip = function (ad, v, tip) { return '<label class="cip"><input type="' + (tip || 'checkbox') + '" name="' + ad + '" value="' + v + '"' + (tip === 'radio' ? (v === (p.get('para') || 'TL') ? ' checked' : '') : secili(ad, v)) + '><span>' + v + '</span></label>'; };
    yer.innerHTML =
      '<form class="arama" action="ilanlar.html" novalidate role="search" aria-label="İlan arama">' +
      '<div class="sekmeler" role="radiogroup" aria-label="İlan türü">' + SEKMELER.map(function (s) {
        return '<label class="sekme"><input type="radio" name="islem" value="' + s[0] + '"' + (s[0] === islem ? ' checked' : '') + '><span>' + s[1] + '</span></label>';
      }).join('') + '</div>' +
      '<div class="arama-ana"><div class="yer-kutu"><span class="etiketler"></span>' +
      '<input class="yer-girdi" type="text" autocomplete="off" placeholder="Mahalle, ilçe veya ilan no (ÖE-1003)" aria-label="Mahalle, ilçe veya ilan numarası" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="oneri-' + n + '">' +
      '<ul class="oneriler" id="oneri-' + n + '" role="listbox" hidden></ul></div>' +
      '<button class="ara-btn" type="submit" aria-label="Ara">' + IK.ara + '</button></div>' +
      '<div class="arama-alt"><button class="daha-fazla" type="button" aria-expanded="false" aria-controls="panel-' + n + '">Daha fazla seçenek ' + IK.asagi + '</button></div>' +
      '<div class="arama-panel" id="panel-' + n + '" hidden>' +
      '<fieldset class="ap-kolon"><legend>Mülk tipi</legend><div class="cipler">' + TIPLER.map(function (t) { return cip('tip', t); }).join('') + '</div></fieldset>' +
      '<fieldset class="ap-kolon"><legend>Oda sayısı</legend><div class="cipler">' + ODALAR.map(function (t) { return cip('oda', t); }).join('') + '</div></fieldset>' +
      '<fieldset class="ap-tam"><legend>Bütçe</legend><div class="kaydir kd-fiyat"></div><div class="cipler para">' + Object.keys(KUR).map(function (k) { return cip('para', k, 'radio'); }).join('') + '<span class="kur-not">Döviz kurları örnektir.</span></div></fieldset>' +
      '<fieldset class="ap-tam"><legend>Alan (m²)</legend><div class="kaydir kd-alan"></div></fieldset>' +
      '<div class="ap-son"><button class="btn" type="submit">İlanları göster</button></div>' +
      '</div></form>';

    var f = $('form', yer), girdi = $('.yer-girdi', f), liste = $('.oneriler', f), etk = $('.etiketler', f);
    var etiketler = (p.get('yer') || '').split(',').filter(Boolean);
    if (p.get('q')) girdi.value = p.get('q');

    // etiketli yer arama
    function etiketCiz() {
      etk.innerHTML = etiketler.map(function (t, k) { return '<span class="etiket">' + esc(t) + '<button type="button" data-k="' + k + '" aria-label="' + esc(t) + ' etiketini kaldır">' + IK.kapat + '</button></span>'; }).join('');
    }
    etk.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) { etiketler.splice(+b.dataset.k, 1); etiketCiz(); girdi.focus(); } });
    var aktif = -1;
    function oneriCiz() {
      var q = kucuk(girdi.value.trim());
      var s = q ? YERLER.filter(function (y) { return kucuk(y).indexOf(q) > -1 && etiketler.indexOf(y) < 0; }).slice(0, 8) : [];
      aktif = -1;
      liste.innerHTML = s.map(function (y, k) { return '<li role="option" id="op-' + n + '-' + k + '" data-v="' + esc(y) + '">' + esc(y) + (ILCELER.indexOf(y) > -1 ? ' <small>ilçe</small>' : ' <small>mahalle</small>') + '</li>'; }).join('');
      liste.hidden = !s.length; girdi.setAttribute('aria-expanded', String(!!s.length));
    }
    function sec(y) { if (etiketler.indexOf(y) < 0) etiketler.push(y); girdi.value = ''; etiketCiz(); oneriCiz(); girdi.focus(); }
    function vurgula() {
      $$('li', liste).forEach(function (li, k) { li.classList.toggle('aktif', k === aktif); });
      girdi.setAttribute('aria-activedescendant', aktif > -1 ? 'op-' + n + '-' + aktif : '');
    }
    girdi.addEventListener('input', oneriCiz);
    girdi.addEventListener('keydown', function (e) {
      var li = $$('li', liste);
      if (e.key === 'ArrowDown' && li.length) { e.preventDefault(); aktif = (aktif + 1) % li.length; vurgula(); }
      else if (e.key === 'ArrowUp' && li.length) { e.preventDefault(); aktif = (aktif - 1 + li.length) % li.length; vurgula(); }
      else if (e.key === 'Enter' && aktif > -1) { e.preventDefault(); sec(li[aktif].dataset.v); }
      else if (e.key === 'Escape') { liste.hidden = true; girdi.setAttribute('aria-expanded', 'false'); }
      else if (e.key === 'Backspace' && !girdi.value && etiketler.length) { etiketler.pop(); etiketCiz(); }
    });
    liste.addEventListener('mousedown', function (e) { var li = e.target.closest('li'); if (li) { e.preventDefault(); sec(li.dataset.v); } });
    girdi.addEventListener('blur', function () { setTimeout(function () { liste.hidden = true; girdi.setAttribute('aria-expanded', 'false'); }, 150); });
    etiketCiz();

    // kaydırıcılar
    var para = p.get('para') || 'TL';
    var paraYaz = function (v) { return fmt(v) + ' ' + para; };
    var kdF = ciftKaydirici($('.kd-fiyat', f), BUTCE.satis.TL, paraYaz, 'Bütçe');
    var kdA = ciftKaydirici($('.kd-alan', f), ALAN, function (v) { return fmt(v) + ' m²'; }, 'Alan');
    var butce = function (isl) { return BUTCE[isl === 'kiralik' || isl === 'isyeri' ? 'kira' : 'satis'][para === 'TL' ? 'TL' : 'DOVIZ']; };
    var aktifIslem = function () { return $('input[name=islem]:checked', f).value; };
    kdF.adim(butce(islem), +p.get('fmin') || 0, +p.get('fmax') || 0);
    kdA.adim(ALAN, +p.get('m2min') || 0, +p.get('m2max') || 0);
    $$('input[name=islem]', f).forEach(function (r) { r.addEventListener('change', function () { kdF.adim(butce(r.value), 0, 0); }); });
    // para birimi değişince seçim korunur: TL karşılığı yeni birimde en yakın adıma taşınır
    $$('input[name=para]', f).forEach(function (r) { r.addEventListener('change', function () {
      var d = kdF.deger(), oran = KUR[para] / KUR[r.value]; para = r.value;
      kdF.adim(butce(aktifIslem()), d[0] && d[0] * oran, d[1] && d[1] * oran);
    }); });

    // daha fazla seçenek
    var df = $('.daha-fazla', f), panel = $('.arama-panel', f);
    df.addEventListener('click', function () {
      var acik = df.getAttribute('aria-expanded') === 'true';
      df.setAttribute('aria-expanded', String(!acik)); panel.hidden = acik; f.classList.toggle('panel-acik', !acik);
      if (!acik && yer.classList.contains('hero-arama')) {
        // panel ekrana sığsın diye formu menünün altına getir (tıklamayla, kaydırmaya bağlı değil)
        var ust = f.getBoundingClientRect().top + window.pageYOffset - ($('#ust') ? $('#ust').offsetHeight : 0);
        window.scrollTo({ top: ust, behavior: azHareket ? 'auto' : 'smooth' });
      }
    });

    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = girdi.value.trim(), o = {};
      if (q && YERLER.some(function (y) { return kucuk(y) === kucuk(q); })) { sec(YERLER.filter(function (y) { return kucuk(y) === kucuk(q); })[0]); q = ''; }
      o.islem = $('input[name=islem]:checked', f).value;
      if (etiketler.length) o.yer = etiketler.join(',');
      if (q) o.q = q;
      var tip = $$('input[name=tip]:checked', f).map(function (x) { return x.value; }); if (tip.length) o.tip = tip.join(',');
      var oda = $$('input[name=oda]:checked', f).map(function (x) { return x.value; }); if (oda.length) o.oda = oda.join(',');
      var fd = kdF.deger(), ad = kdA.deger();
      if (fd[0]) o.fmin = fd[0]; if (fd[1]) o.fmax = fd[1];
      if (ad[0]) o.m2min = ad[0]; if (ad[1]) o.m2max = ad[1];
      if (para !== 'TL') o.para = para;
      location.href = link(o);
    });
    return f;
  }

  /* ---------- Sonsuz kaydırıcı (ok, sürükleme, klavye) ---------- */
  function kaydirici(kok, liste) {
    kok.innerHTML = '<button class="ok ok-sol" type="button" aria-label="Önceki ilanlar">' + IK.ince_sol + '</button>' +
      '<div class="pencere" tabindex="0" role="group" aria-roledescription="kaydırıcı" aria-label="İlanlar, ok tuşlarıyla kaydırın"><div class="ray">' + liste.map(kart).join('') + '</div></div>' +
      '<button class="ok ok-sag" type="button" aria-label="Sonraki ilanlar">' + IK.ince_sag + '</button>';
    var ray = $('.ray', kok), pen = $('.pencere', kok), sol = $('.ok-sol', kok), sag = $('.ok-sag', kok);
    var mesgul = false, SURE = azHareket ? 0 : 450;
    var genislik = function () { return ray.firstElementChild ? ray.firstElementChild.getBoundingClientRect().width : 0; };
    var fazla = function () { return ray.children.length > Math.round(pen.clientWidth / (genislik() || 1)); };
    function sekme() { // yalnız görünen kartlar Tab ile odaklanır; görünmeyene odak gidip pencere kaymasın
      var n = Math.round(pen.clientWidth / (genislik() || 1));
      Array.prototype.forEach.call(ray.children, function (k, x) { var a = x < n; k.firstElementChild.tabIndex = a ? 0 : -1; k.setAttribute('aria-hidden', a ? 'false' : 'true'); });
      pen.scrollLeft = 0;
    }
    function okGuncel() { var f = fazla(); sol.hidden = sag.hidden = !f; kok.classList.toggle('az', !f); sekme(); }
    function git(x, bitti) {
      ray.style.transition = SURE ? 'transform ' + SURE + 'ms ease' : 'none';
      ray.style.transform = 'translateX(' + x + 'px)';
      setTimeout(function () { ray.style.transition = 'none'; if (bitti) bitti(); mesgul = false; sekme(); }, SURE + 20);
    }
    function ileri() {
      if (mesgul || !fazla()) return; mesgul = true;
      git(-genislik(), function () { ray.appendChild(ray.firstElementChild); ray.style.transform = 'translateX(0)'; });
    }
    function geri(bas) {
      if (mesgul || !fazla()) return; mesgul = true;
      ray.style.transition = 'none';
      ray.insertBefore(ray.lastElementChild, ray.firstElementChild);
      ray.style.transform = 'translateX(' + (-genislik() + (bas || 0)) + 'px)';
      void ray.offsetWidth;
      git(0);
    }
    sag.addEventListener('click', ileri);
    sol.addEventListener('click', function () { geri(0); });
    pen.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') { e.preventDefault(); ileri(); } if (e.key === 'ArrowLeft') { e.preventDefault(); geri(0); } });
    // sürükleme
    var bx = null, dx = 0, surukledi = false;
    pen.addEventListener('pointerdown', function (e) { if (mesgul || !fazla() || e.button !== 0) return; bx = e.clientX; dx = 0; surukledi = false; });
    window.addEventListener('pointermove', function (e) {
      if (bx === null) return; dx = e.clientX - bx;
      if (Math.abs(dx) > 6) { surukledi = true; ray.style.transition = 'none'; ray.style.transform = 'translateX(' + dx + 'px)'; }
    });
    window.addEventListener('pointerup', function () {
      if (bx === null) return; bx = null;
      if (!surukledi) return;
      if (dx < -50) ileri();
      else if (dx > 50) { ray.style.transform = 'translateX(0)'; geri(dx); }
      else { mesgul = true; git(0); }
    });
    pen.addEventListener('click', function (e) { if (surukledi) { e.preventDefault(); e.stopPropagation(); surukledi = false; } }, true);
    pen.addEventListener('scroll', function () { pen.scrollLeft = 0; });
    window.addEventListener('resize', okGuncel);
    okGuncel();
  }

  /* ---------- Sayfalar ---------- */
  function anaSayfa() {
    // hero: zamanlayıcıyla dönen çapraz geçiş (12 sn aralık, 3 sn geçiş)
    var h = $('.hero');
    $('.hero-slaytlar', h).innerHTML = SLAYTLAR.map(function (s, k) {
      return '<div class="slayt' + (k ? '' : ' aktif') + '"><picture><source media="(max-width: 860px)" srcset="' + s.img.replace('.jpg', '-m.jpg') + '">' +
        '<img src="' + s.img + '" alt="' + esc(s.ust) + '"' + (s.mpos ? ' style="--mpos:' + s.mpos + '"' : '') + (k ? ' loading="lazy"' : '') + '></picture></div>';
    }).join('');
    // mobil görsel yoksa masaüstü görseline dön
    $$('.slayt img', h).forEach(function (im) {
      im.addEventListener('error', function () { var so = im.parentNode.querySelector('source'); if (so) { so.remove(); im.classList.remove('yok'); im.src = im.getAttribute('src'); } });
    });
    var yazi = $('.hero-yazi', h), k = 0, sl = $$('.slayt', h);
    function yaziCiz() { var s = SLAYTLAR[k]; yazi.href = s.link; yazi.innerHTML = '<span>' + esc(s.ust) + '</span><br>' + esc(s.alt); }
    yaziCiz();
    setInterval(function () {
      sl[k].classList.remove('aktif'); k = (k + 1) % sl.length; sl[k].classList.add('aktif'); yaziCiz();
    }, 12000);
    aramaKutusu($('.hero-arama'), new URLSearchParams(''));

    var sec = function (ids) { return ids.map(function (n) { return ILANLAR.filter(function (i) { return i.id === n; })[0]; }).filter(Boolean); };
    // Her ilan en çok iki bölümde; bölümlerin ilk kartları birbirinden farklı.
    var gruplar = {
      satilik: sec([3, 12, 4, 2, 1, 5]),
      satildi: sec([7, 8, 10]),
      kiralik: sec([6, 9, 11]),
      merkez: sec([1, 5, 9, 3, 11, 6])
    };
    $$('[data-kaydirici]').forEach(function (el) { kaydirici(el, gruplar[el.getAttribute('data-kaydirici')]); });

    var izgara = $('.insta-izgara');
    if (izgara) {
      var ogeler = [['img/villa-ic-1.jpg', 3, 'Villa salonu'], ['img/ilan-03.jpg', 3, 'Havuzlu villa'], ['img/ic-2.jpg', 5, 'Mutfak'], ['img/ilan-05.jpg', 5, 'Rezidans'],
        ['img/bag-ic-1.jpg', 12, 'Bağ evi'], ['img/ic-3.jpg', 9, 'Yatak odası'], ['img/ilan-12.jpg', 12, 'Bağ evi'], ['img/villa-ic-2.jpg', 1, 'Villa']];
      izgara.innerHTML = ogeler.map(function (o) {
        return '<a href="ilan.html?id=' + o[1] + '" aria-label="' + o[2] + ' paylaşımı: ilanı aç"><img src="' + o[0] + '" alt="" loading="lazy" width="400" height="500"><span class="insta-ust">' + IK.insta + '</span></a>';
      }).join('');
    }
  }

  function filtrele(p) {
    var islem = p.get('islem'), yer = (p.get('yer') || '').split(',').filter(Boolean), q = kucuk(p.get('q') || '');
    var tip = (p.get('tip') || '').split(',').filter(Boolean), oda = (p.get('oda') || '').split(',').filter(Boolean);
    var kur = KUR[p.get('para')] || 1, fmin = +p.get('fmin') || 0, fmax = +p.get('fmax') || Infinity, mmin = +p.get('m2min') || 0, mmax = +p.get('m2max') || Infinity;
    return ILANLAR.filter(function (i) {
      if (islem === 'satilik' && i.islem !== 'satilik') return false;
      if (islem === 'kiralik' && i.islem !== 'kiralik') return false;
      if (islem === 'isyeri' && i.tip !== 'Dükkân') return false;
      if (islem === 'arsa' && i.tip !== 'Arsa') return false;
      if (p.get('durum') === 'satildi' && !i.satildi) return false;
      if ((islem === 'satilik' || islem === 'kiralik') && i.satildi && p.get('durum') !== 'satildi') return false; // arsa/işyeri sekmesinde satılan "Satıldı" rozetiyle görünür
      if (yer.length && !yer.some(function (y) { return ILCELER.indexOf(y) > -1 ? i.ilce === y : i.mahalle === y; })) return false;
      if (q && [i.ref, i.baslik, i.mahalle, i.ilce, i.tip].join(' ').toLocaleLowerCase('tr').replace(/ö/g, 'o').indexOf(q.replace(/ö/g, 'o')) < 0) return false;
      if (tip.length && tip.indexOf(i.tip) < 0) return false;
      if (oda.length && !(i.oda && oda.some(function (o) { return o === '5+' ? parseInt(i.oda, 10) >= 5 : o === i.oda; }))) return false;
      if (i.fiyat < fmin * kur || i.fiyat > fmax * kur) return false;
      if (i.brut < mmin || i.brut > mmax) return false;
      return true;
    });
  }

  function ilanlarSayfa() {
    var p = params, SAYFA = 9;
    var sonuc = filtrele(p);
    var SIRALAR = { onerilen: 'Önerilen', 'fiyat-artan': 'Fiyat (artan)', 'fiyat-azalan': 'Fiyat (azalan)', 'm2-artan': 'Alan (küçükten büyüğe)', 'm2-azalan': 'Alan (büyükten küçüğe)' };
    var sira = SIRALAR[p.get('sira')] ? p.get('sira') : 'onerilen';
    var cmp = {
      onerilen: function (a, b) { return (a.satildi ? 1 : 0) - (b.satildi ? 1 : 0) || a.id - b.id; },
      'fiyat-artan': function (a, b) { return a.fiyat - b.fiyat; }, 'fiyat-azalan': function (a, b) { return b.fiyat - a.fiyat; },
      'm2-artan': function (a, b) { return a.brut - b.brut; }, 'm2-azalan': function (a, b) { return b.brut - a.brut; }
    }[sira];
    sonuc.sort(function (a, b) { return (a.satildi ? 1 : 0) - (b.satildi ? 1 : 0) || cmp(a, b); });
    var toplam = Math.max(1, Math.ceil(sonuc.length / SAYFA)), s = Math.min(toplam, Math.max(1, +p.get('s') || 1));

    var baslik = { satilik: 'Satılık emlak', kiralik: 'Kiralık emlak', isyeri: 'İşyeri ve dükkân', arsa: 'Arsa' }[p.get('islem')] || (p.get('durum') === 'satildi' ? 'Satılan mülkler' : 'Tüm ilanlar');
    var yerler = (p.get('yer') || '').split(',').filter(Boolean);
    var yerYazi = (yerler.length ? yerler.join(', ') + ', ' : '') + 'Çorum';
    $('#liste-baslik').textContent = baslik + ' - ' + yerYazi;
    $('#kirinti-son').textContent = { satilik: 'Satılık', kiralik: 'Kiralık', isyeri: 'İşyeri', arsa: 'Arsa' }[p.get('islem')] || 'İlanlar';
    document.title = baslik + ' - ' + yerYazi + ' | Özmen Emlak';
    $('#ilan-sayisi').innerHTML = '<span>' + sonuc.length + '</span> ilan';

    var sayfaLink = function (n) { var q = new URLSearchParams(p); q.set('s', n); return 'ilanlar.html?' + q.toString(); };
    var sayfalama = '<nav class="sayfalama" aria-label="Sayfalar">Sayfa ' + Array.apply(null, Array(toplam)).map(function (_, k) {
      var n = k + 1; return n === s ? '<span class="su-an" aria-current="page">' + n + '</span>' : '<a href="' + sayfaLink(n) + '">' + n + '</a>';
    }).join(' ') + '</nav>';
    $$('.sayfalama-yer').forEach(function (el) { el.innerHTML = sayfalama; });

    var sy = $('.sirala');
    sy.innerHTML = '<button type="button" class="sirala-ac" aria-expanded="false" aria-controls="sira-liste">Sırala: ' + SIRALAR[sira] + ' ' + IK.asagi + '</button><ul id="sira-liste" hidden>' +
      Object.keys(SIRALAR).map(function (k) { var q = new URLSearchParams(p); q.set('sira', k); q.delete('s'); return '<li><a href="ilanlar.html?' + q.toString() + '"' + (k === sira ? ' aria-current="true"' : '') + '>' + SIRALAR[k] + '</a></li>'; }).join('') + '</ul>';
    var sa = $('.sirala-ac'), sl = $('#sira-liste');
    sa.addEventListener('click', function () { var a = sa.getAttribute('aria-expanded') === 'true'; sa.setAttribute('aria-expanded', String(!a)); sl.hidden = a; });
    document.addEventListener('click', function (e) { if (!sy.contains(e.target)) { sl.hidden = true; sa.setAttribute('aria-expanded', 'false'); } });

    var izg = $('.liste-izgara');
    var parca = sonuc.slice((s - 1) * SAYFA, s * SAYFA);
    izg.innerHTML = parca.length ? parca.map(listeKarti).join('') :
      '<div class="bos"><p>Aramanıza uygun ilan bulunamadı. Filtreleri genişletmeyi deneyin.</p><a class="btn" href="ilanlar.html">Tüm ilanları göster</a></div>';
    izg.addEventListener('click', function (e) {
      var b = e.target.closest('.ozet-ac'); if (!b) return;
      var a = b.getAttribute('aria-expanded') === 'true', oz = b.nextElementSibling;
      b.setAttribute('aria-expanded', String(!a)); oz.hidden = a; b.classList.toggle('acik', !a);
    });

    // filtre paneli
    aramaKutusu($('.filtre-panel'), p);
    var fb = $('.filtre-ac'), fp = $('.filtre-panel');
    fb.addEventListener('click', function () {
      var a = fb.getAttribute('aria-expanded') === 'true';
      fb.setAttribute('aria-expanded', String(!a)); fp.hidden = a;
      var dfz = $('.daha-fazla', fp); if (!a && dfz.getAttribute('aria-expanded') !== 'true') dfz.click();
    });
    $$('.geri').forEach(function (g) { g.addEventListener('click', function (e) { if (history.length > 1 && document.referrer) { e.preventDefault(); history.back(); } }); });
  }

  function ilanSayfa() {
    var i = ILANLAR.filter(function (x) { return x.id === +params.get('id'); })[0];
    var kok = $('#ilan');
    if (!i) {
      kok.innerHTML = '<div class="bos"><p>Aradığınız ilan bulunamadı ya da yayından kaldırıldı.</p><a class="btn" href="ilanlar.html">Tüm ilanlara dön</a></div>';
      return;
    }
    document.title = i.baslik + ' - ' + i.ref + ' | Özmen Emlak';
    var g = galeri(i), oz = ozellikler(i, true);
    var etiketFiyat = i.satildi ? 'Satıldı' : fiyatYaz(i);
    var tipLink = link({ islem: i.islem, tip: i.tip });
    kok.innerHTML =
      '<div class="ust-serit"><div class="serit-ic"><a class="geri" href="ilanlar.html">' + IK.sol + 'Geri</a>' +
      '<nav class="kirinti" aria-label="Sayfa yolu"><a href="index.html">Ana sayfa</a><span>&gt;</span><a href="' + link({ yer: i.ilce }) + '">' + i.ilce + '</a><span>&gt;</span><a href="' + link({ islem: i.islem }) + '">' + ISLEM[i.islem] + '</a><span>&gt;</span><a href="' + tipLink + '">' + i.tip + '</a><span>&gt;</span><span aria-current="page">' + esc(i.mahalle) + '</span></nav></div></div>' +
      '<div class="galeri" tabindex="0" role="group" aria-roledescription="galeri" aria-label="İlan fotoğrafları, ok tuşlarıyla gezinin">' +
      '<div class="galeri-ray">' + g.map(function (src, k) { return '<button type="button" class="galeri-oge' + (!k && i.kadraj === 'tam' ? ' tam' : '') + '" data-k="' + k + '" aria-label="Fotoğraf ' + (k + 1) + ' / ' + g.length + ', büyüt"><img src="' + src + '" alt="' + esc(i.baslik) + ' fotoğraf ' + (k + 1) + '" draggable="false"' + (k ? ' loading="lazy"' : '') + '>' + (!k && i.kadraj === 'tam' ? '<span class="g-arka" style="background-image:url(\'' + src + '\')"></span>' : '') + '</button>'; }).join('') + '</div>' +
      rozetler(i) +
      (g.length > 1 ? '<button class="g-ok g-sol" type="button" aria-label="Önceki fotoğraf">' + IK.ince_sol + '</button><button class="g-ok g-sag" type="button" aria-label="Sonraki fotoğraf">' + IK.ince_sag + '</button>' : '') +
      '</div>' +
      '<div class="baslik-satir"><div><h1>' + ISLEM[i.islem] + ' ' + kucuk(i.tip) + ' – ' + esc(i.mahalle) + ', ' + i.ilce + ', Çorum</h1><p class="d-fiyat">' + etiketFiyat + '</p></div>' +
      '<div class="hizli-ikon"><a href="#bilgi-formu" aria-label="E-posta ile bilgi iste">' + IK.posta + '</a><a href="' + TEL_LINK + '" aria-label="Ofisi ara">' + IK.tel + '</a><a href="' + WA + '" target="_blank" rel="noopener" aria-label="WhatsApp ile yazın (örnek numara)">' + IK.wa + '</a></div></div>' +
      (g.length > 1 ? '<div class="kucukler">' + g.map(function (src, k) { return '<button type="button" data-k="' + k + '" aria-label="Fotoğraf ' + (k + 1) + '"' + (k ? '' : ' class="aktif"') + '><img src="' + src + '" alt="" loading="lazy" draggable="false"></button>'; }).join('') + '</div>' : '') +
      '<ul class="d-ozellik">' + oz.map(function (o) { return '<li title="' + o[2] + '">' + o[0] + '<small>' + esc(o[1]) + '</small></li>'; }).join('') + '</ul>' +
      '<div class="d-icerik"><div class="d-sol">' +
      '<h2>' + esc(i.baslik) + '</h2>' +
      '<p class="maddeler"><span>' + i.ref + '</span><span>' + ISLEM[i.islem] + '</span><span>' + i.tip + '</span></p>' +
      i.aciklama.map(function (a) { return '<p>' + esc(a) + '</p>'; }).join('') +
      '<p class="d-ozet">' + [i.oda && i.oda + ' oda', i.brut && fmt(i.brut) + ' m² ' + (i.tip === 'Arsa' ? 'arsa' : 'brüt'), i.net && fmt(i.net) + ' m² net', i.arsa && i.tip !== 'Arsa' && fmt(i.arsa) + ' m² arsa', i.yas && i.yas + ' yıllık bina'].filter(Boolean).join(' | ') + '</p>' +
      '<h3>Yakındakiler</h3><ul class="yakin">' + i.yakin.map(function (y) { return '<li>' + esc(y) + '</li>'; }).join('') + '</ul>' +
      '<p class="paylas"><a href="#" data-demo aria-label="Facebook\'ta paylaş (demo)">' + IK.face + '</a><a href="#" data-demo aria-label="LinkedIn\'de paylaş (demo)">' + IK.linked + '</a><a href="#" data-demo aria-label="E-posta ile paylaş (demo)">' + IK.posta + '</a></p>' +
      '<section class="d-ofis" aria-labelledby="d-ofis-b"><h2 id="d-ofis-b">Özmen Emlak Çorum</h2><div class="d-ofis-ic"><div>' +
      '<p class="ofis-link"><a href="#bilgi-formu">' + IK.posta + 'Çevrimiçi bilgi talebi</a></p><p class="ofis-link"><a href="' + TEL_LINK + '">' + IK.tel + TEL + '</a></p><p class="ofis-link"><a href="iletisim.html#ofisler">' + IK.konum + 'Haritada gör</a></p>' +
      '<p>Özmen Emlak Çorum<br>' + ADRES + '</p></div>' +
      '<p>Çorum merkez ve ilçelerinde konut, arsa ve işyeri portföyümüzle alıcı ve satıcıya baştan sona eşlik ediyoruz. Mülk gösterimi, değerleme, tapu ve kredi süreçlerinde tek bir danışman sizinle ilgilenir.</p></div></section>' +
      '</div>' +
      '<aside class="d-form" id="bilgi-formu"><div class="d-form-logo"><img src="img/logo.svg?v=202611191407" alt="Özmen Emlak" width="240" height="48"></div><p class="d-form-baslik">Bilgi talebi</p>' +
      '<form data-demo-form novalidate><div class="alanlar">' +
      '<input type="text" name="ad" required placeholder="Adınız*" aria-label="Adınız" autocomplete="given-name"><input type="text" name="soyad" required placeholder="Soyadınız*" aria-label="Soyadınız" autocomplete="family-name">' +
      '<input type="email" name="eposta" required placeholder="E-posta adresiniz*" aria-label="E-posta adresiniz" autocomplete="email"><input type="tel" name="tel" required placeholder="Telefon*" aria-label="Telefon" autocomplete="tel">' +
      '<textarea name="mesaj" rows="4" aria-label="Mesajınız">' + i.ref + ' numaralı ilan hakkında bilgi almak istiyorum. Lütfen benimle iletişime geçin.</textarea></div>' +
      '<div class="form-son"><button class="btn" type="submit">Gönder</button></div><p class="zorunlu">* Zorunlu alanlar</p>' +
      '<p class="kvkk-not">Paylaştığınız bilgiler yalnızca talebinizi yanıtlamak için kullanılır. Dilediğiniz zaman erişme, düzeltme ve silme hakkınız vardır.</p>' +
      '<p class="form-mesaj" role="status"></p></form></aside></div>' +
      '<div class="mobil-cubuk"><a href="' + TEL_LINK + '" aria-label="Ofisi ara">' + IK.tel + '</a><a class="mc-orta" href="#bilgi-formu">Bilgi al</a><a href="' + WA + '" target="_blank" rel="noopener" aria-label="WhatsApp ile yazın (örnek numara)">' + IK.wa + '</a></div>' +
      '<div class="isik" role="dialog" aria-modal="true" aria-label="Fotoğraf görüntüleyici" hidden><button class="isik-kapat" type="button" aria-label="Kapat">' + IK.kapat + '</button>' +
      '<button class="isik-ok isik-sol" type="button" aria-label="Önceki fotoğraf">' + IK.ince_sol + '</button><img alt=""><button class="isik-ok isik-sag" type="button" aria-label="Sonraki fotoğraf">' + IK.ince_sag + '</button><p class="isik-sayac"></p></div>';
    document.body.classList.add('detay-mobil-cubuk');

    // galeri
    var gal = $('.galeri', kok), ray = $('.galeri-ray', gal), k = 0, N = g.length;
    var kucukler = $$('.kucukler button', kok);
    function goster(n, anim) {
      k = (n + N) % N;
      ray.style.transition = anim === false || azHareket ? 'none' : 'transform .45s ease';
      ray.style.transform = 'translateX(' + (-k * 100) + '%)';
      kucukler.forEach(function (b, x) { b.classList.toggle('aktif', x === k); });
    }
    if (N > 1) {
      $('.g-sol', gal).addEventListener('click', function () { goster(k - 1); });
      $('.g-sag', gal).addEventListener('click', function () { goster(k + 1); });
      kucukler.forEach(function (b) { b.addEventListener('click', function () { goster(+b.dataset.k); }); });
      gal.addEventListener('keydown', function (e) { if (e.target !== gal) return; if (e.key === 'ArrowRight') goster(k + 1); if (e.key === 'ArrowLeft') goster(k - 1); });
      var bx = null, dx = 0, cekti = false;
      gal.addEventListener('pointerdown', function (e) { if (e.button === 0 && !e.target.closest('.g-ok')) { bx = e.clientX; dx = 0; cekti = false; } });
      window.addEventListener('pointermove', function (e) {
        if (bx === null) return; dx = e.clientX - bx;
        if (Math.abs(dx) > 6) { cekti = true; ray.style.transition = 'none'; ray.style.transform = 'translateX(calc(' + (-k * 100) + '% + ' + dx + 'px))'; }
      });
      window.addEventListener('pointerup', function () { if (bx === null) return; bx = null; if (!cekti) return; goster(dx < -50 ? k + 1 : dx > 50 ? k - 1 : k); });
      gal.addEventListener('click', function (e) { if (cekti) { e.stopPropagation(); e.preventDefault(); cekti = false; } }, true);
    }
    // ışık kutusu
    var isik = $('.isik', kok), ii = $('img', isik), sayacEl = $('.isik-sayac', isik), donus = null, ik2 = 0;
    function isikGoster(n) { ik2 = (n + N) % N; ii.src = g[ik2]; ii.alt = i.baslik + ' fotoğraf ' + (ik2 + 1); sayacEl.textContent = (ik2 + 1) + ' / ' + N; }
    function isikAc(n) { donus = document.activeElement; isikGoster(n); isik.hidden = false; document.documentElement.classList.add('menu-acik'); $('.isik-kapat', isik).focus(); }
    function isikKapat() { isik.hidden = true; document.documentElement.classList.remove('menu-acik'); goster(ik2, false); if (donus) donus.focus(); }
    $$('.galeri-oge', gal).forEach(function (b) { b.addEventListener('click', function () { isikAc(+b.dataset.k); }); });
    $('.isik-kapat', isik).addEventListener('click', isikKapat);
    $('.isik-sol', isik).addEventListener('click', function () { isikGoster(ik2 - 1); });
    $('.isik-sag', isik).addEventListener('click', function () { isikGoster(ik2 + 1); });
    if (N < 2) $$('.isik-ok', isik).forEach(function (b) { b.hidden = true; });
    isik.addEventListener('click', function (e) { if (e.target === isik) isikKapat(); });
    document.addEventListener('keydown', function (e) {
      if (isik.hidden) return;
      if (e.key === 'Escape') isikKapat();
      if (e.key === 'ArrowRight') isikGoster(ik2 + 1);
      if (e.key === 'ArrowLeft') isikGoster(ik2 - 1);
      if (e.key === 'Tab') { // odağı pencerede tut
        var o = $$('button:not([hidden])', isik), ilk = o[0], son = o[o.length - 1];
        if (e.shiftKey && document.activeElement === ilk) { e.preventDefault(); son.focus(); }
        else if (!e.shiftKey && document.activeElement === son) { e.preventDefault(); ilk.focus(); }
      }
    });
    $('.geri', kok).addEventListener('click', function (e) { if (history.length > 1 && document.referrer) { e.preventDefault(); history.back(); } });
  }

  function iletisimSayfa() {
    if (params.get('konu') === 'degerleme') {
      var t = $('#talep'); if (t) t.value = 'Mülkümün değerlemesini yaptırmak istiyorum. Mülk bilgileri: ';
    }
    $$('[data-kaydirici]').forEach(function (el) {
      var tur = el.getAttribute('data-kaydirici');
      kaydirici(el, ILANLAR.filter(function (i) { return tur === 'satildi' ? i.satildi : i.islem === 'satilik' && !i.satildi; }).slice().reverse());
    });
    $$('.geri').forEach(function (g) { g.addEventListener('click', function (e) { if (history.length > 1 && document.referrer) { e.preventDefault(); history.back(); } }); });
  }

  ustMenu();
  altBolum();
  if (sayfa === 'ana') anaSayfa();
  if (sayfa === 'ilanlar') ilanlarSayfa();
  if (sayfa === 'ilan') ilanSayfa();
  if (sayfa === 'iletisim') iletisimSayfa();
})();
