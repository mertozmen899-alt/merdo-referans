/* Özmen Emlak — örnek ilan verisi (demo). Tüm ilanlar kurgusaldır. */
/* Galeri setleri: ilan tipine göre seçilir, sıra ilan başına değişir (js/main.js > galeri) */
var SETLER = {
  villa: ['img/villa-ic-1.jpg', 'img/villa-ic-2.jpg', 'img/villa-ic-3.jpg', 'img/villa-ic-4.jpg'], // yalnız lüks villalar (ÖE-1001, ÖE-1003); villa-ic-5 (havuz) yalnız ÖE-1003
  mustakil: ['img/mustakil-ic-1.jpg', 'img/mustakil-ic-2.jpg', 'img/mustakil-ic-3.jpg', 'img/mustakil-ic-4.jpg'],
  daire: ['img/ic-1.jpg', 'img/ic-2.jpg', 'img/ic-3.jpg', 'img/ic-4.jpg', 'img/ic-5.jpg'],
  bos: ['img/bos-ic-1.jpg', 'img/bos-ic-2.jpg', 'img/bos-ic-3.jpg'],
  bag: ['img/bag-ic-1.jpg', 'img/bag-ic-2.jpg', 'img/bag-ic-3.jpg', 'img/bag-ic-4.jpg'],
  arsa: ['img/arsa-2.jpg', 'img/arsa-3.jpg'],
  dukkan: ['img/dukkan-ic-1.jpg', 'img/dukkan-ic-2.jpg']
};

var ILANLAR = [
  {
    id: 1, ref: 'ÖE-1001', islem: 'satilik', tip: 'Villa', ilce: 'Merkez', mahalle: 'Akkent',
    baslik: 'Akkent\'te modern mimarili villa', fiyat: 21500000, brut: 380, net: 320, arsa: 950,
    oda: '5+1', banyo: 4, kat: 'Bodrum + 2 kat', yas: 2, isitma: 'Yerden ısıtma', otopark: 'Kapalı, 2 araç',
    rozet: ['Özel'], img: 'img/ilan-01.jpg',
    ozet: 'Taş ve antrasit cephe, geniş bahçe, şehir ve vadi manzarası.',
    aciklama: [
      'Akkent\'in sakin bir sokağında, 950 m² arsa üzerine 2024 yılında inşa edilen villa; doğal taş ve antrasit cephesi, geniş cam yüzeyleriyle çağdaş bir yaşam sunuyor.',
      'Giriş katta 75 m² salon, şömine, ada mutfak ve bahçeye açılan teras bulunuyor. Üst katta ebeveyn banyolu ve giyinme odalı yatak odası dahil dört yatak odası yer alıyor. Bodrum katta hobi odası, kiler ve teknik hacimler mevcut.',
      'Peyzajı tamamlanmış bahçe, otomatik sulama sistemi ve iki araçlık kapalı otopark ile villa taşınmaya hazır durumda.'
    ],
    yakin: ['Özel okul', 'Market', 'Spor salonu', 'Şehir merkezi 10 dk']
  },
  {
    id: 2, ref: 'ÖE-1002', islem: 'satilik', tip: 'Müstakil ev', ilce: 'Merkez', mahalle: 'Bahçelievler',
    baslik: 'Bahçelievler\'de kiremit çatılı müstakil ev', fiyat: 11900000, brut: 260, net: 215, arsa: 540,
    oda: '4+1', banyo: 3, kat: '2 kat', yas: 9, isitma: 'Doğalgaz kombi', otopark: 'Açık, 2 araç',
    rozet: [], img: 'img/ilan-02.jpg',
    ozet: 'Meyve ağaçlı bahçe, ahşap pencereler, sessiz sokak.',
    aciklama: [
      'Bahçelievler\'in en sevilen sokaklarından birinde, 540 m² arsa içinde iki katlı müstakil ev. Ahşap doğramaları ve kiremit çatısıyla sıcak bir mimariye sahip.',
      'Zemin katta salon, mutfak ve misafir odası; üst katta üç yatak odası ve balkon bulunuyor. Bahçede meyve ağaçları ve kamelya mevcut.',
      'Çatı 2022 yılında yenilenmiş, cephe yalıtımı yapılmıştır. Bahçe kapısından araçla giriş mümkündür.'
    ],
    yakin: ['İlkokul', 'Park', 'Eczane', 'Toplu taşıma']
  },
  {
    id: 3, ref: 'ÖE-1003', islem: 'satilik', tip: 'Villa', ilce: 'Merkez', mahalle: 'Üçtutlar',
    baslik: 'Üçtutlar\'da havuzlu villa', fiyat: 27750000, brut: 450, net: 390, arsa: 1250,
    oda: '6+1', banyo: 4, kat: '2 kat + çatı', yas: 4, isitma: 'Yerden ısıtma + şömine', otopark: 'Kapalı, 3 araç',
    rozet: ['Özel'], img: 'img/ilan-03.jpg', kadraj: 'tam', ekGaleri: ['img/villa-ic-5.jpg'],
    ozet: 'Yüzme havuzu, kemerli taş cephe, 1.250 m² bahçe.',
    aciklama: [
      'Üçtutlar\'da 1.250 m² arsa üzerinde konumlanan villa, kemerli taş cephesi ve bahçe içindeki yüzme havuzuyla Çorum\'da benzeri az bulunan bir yaşam alanı sunuyor.',
      'Giriş katta çift yükseklikli salon, şömine, ayrı yemek salonu ve kapalı mutfak bulunuyor. Üst katta ebeveyn süiti dahil dört yatak odası, çatı katında çalışma odası ve teras yer alıyor.',
      'Havuz başında dinlenme terası, dış mutfak ve üç araçlık kapalı garaj mevcut. Akıllı ev sistemi ve güvenlik kameraları kuruludur.'
    ],
    yakin: ['Hastane 8 dk', 'AVM', 'Kolej', 'Yürüyüş parkuru']
  },
  {
    id: 4, ref: 'ÖE-1004', islem: 'satilik', tip: 'Müstakil ev', ilce: 'İskilip', mahalle: 'Merkez',
    baslik: 'İskilip\'te yeni yapım modern müstakil ev', fiyat: 6450000, brut: 210, net: 175, arsa: 480,
    oda: '3+1', banyo: 2, kat: '2 kat', yas: 1, isitma: 'Doğalgaz kombi', otopark: 'Açık, 2 araç',
    rozet: ['Özel'], img: 'img/ilan-04.jpg',
    ozet: 'Sade modern cephe, çim bahçe, kale manzarası.',
    aciklama: [
      'İskilip merkezde, ilçe kalesine bakan yeni yapım müstakil ev. Beyaz ve antrasit cephe, geniş pencereler ve düz çatı ile sade, modern bir tasarıma sahip.',
      'Zemin katta salon ve açık mutfak bahçeye açılıyor. Üst katta ebeveyn banyolu yatak odası dahil üç yatak odası bulunuyor.',
      'Çim bahçe, ahşap çit ve iki araçlık açık otopark alanı mevcuttur. İskân alınmıştır.'
    ],
    yakin: ['Okul', 'Belediye', 'Çarşı', 'Sağlık ocağı']
  },
  {
    id: 5, ref: 'ÖE-1005', islem: 'satilik', tip: 'Rezidans', ilce: 'Merkez', mahalle: 'Mimarsinan',
    baslik: 'Mimarsinan\'da manzaralı rezidans dairesi', fiyat: 9850000, brut: 205, net: 175, arsa: 0,
    oda: '4+1', banyo: 2, kat: '11. kat / 14', yas: 2, isitma: 'Merkezi sistem, pay ölçer', otopark: 'Kapalı otopark',
    rozet: ['Özel'], img: 'img/ilan-05.jpg',
    ozet: '7/24 güvenlik, kapalı otopark, şehir manzarası.',
    aciklama: [
      'Mimarsinan\'da, 7/24 güvenlikli rezidans projesinin 11. katında yer alan daire; salon ve yatak odalarından kesintisiz şehir manzarası sunuyor.',
      'Geniş salon, ankastre mutfak, ebeveyn banyolu yatak odası dahil dört oda ve iki balkon bulunuyor. Zeminler laminat parke, ıslak hacimler doğal taş kaplamadır.',
      'Projede kapalı otopark, fitness salonu, çocuk oyun alanı ve jeneratör mevcuttur.'
    ],
    yakin: ['Hastane', 'Üniversite', 'AVM', 'Otogar 5 dk']
  },
  {
    id: 6, ref: 'ÖE-1006', islem: 'kiralik', tip: 'Daire', ilce: 'Merkez', mahalle: 'Buharaevler',
    baslik: 'Buharaevler\'de site içinde kiralık daire', fiyat: 27500, brut: 150, net: 125, arsa: 0,
    oda: '3+1', banyo: 2, kat: '4. kat / 8', yas: 5, isitma: 'Doğalgaz kombi', otopark: 'Açık otopark',
    rozet: [], img: 'img/ilan-06.jpg', esyasiz: true,
    ozet: 'Site içinde, peyzajlı bahçe, eşyasız.',
    aciklama: [
      'Buharaevler\'de bakımlı bir sitenin 4. katında, güney cepheli 3+1 daire. Peyzajlı ortak bahçe, oyun parkı ve kamelyalar site sakinlerinin kullanımındadır.',
      'Daire eşyasız olup ankastre mutfak, ebeveyn banyosu ve iki balkona sahiptir. Aidat 1.200 TL\'dir.',
      'Kira sözleşmesi en az bir yıllık yapılır; iki kira tutarında depozito istenir.'
    ],
    yakin: ['Ortaokul', 'Market', 'Cami', 'Dolmuş durağı']
  },
  {
    id: 7, ref: 'ÖE-1007', islem: 'satilik', satildi: true, tip: 'Rezidans', ilce: 'Merkez', mahalle: 'Ulukavak',
    baslik: 'Ulukavak\'ta cam cepheli rezidans dairesi', fiyat: 7950000, brut: 165, net: 140, arsa: 0,
    oda: '3+1', banyo: 2, kat: '9. kat / 15', yas: 3, isitma: 'Merkezi sistem, pay ölçer', otopark: 'Kapalı otopark',
    rozet: [], img: 'img/ilan-07.jpg',
    ozet: '15 katlı cam cepheli kule, 9. kat, şehir manzarası.',
    aciklama: [
      'Ulukavak\'ta 15 katlı cam cepheli rezidans kulesinin 9. katında, şehir manzaralı 3+1 daire.',
      'Salon, açık mutfak, üç yatak odası ve iki banyo bulunuyor. Binada 7/24 güvenlik, kapalı otopark ve fitness salonu mevcut.',
      'Bu ilan portföyümüzden satılmıştır.'
    ],
    yakin: ['Lise', 'Pazar yeri', 'Eczane', 'Park']
  },
  {
    id: 8, ref: 'ÖE-1008', islem: 'satilik', satildi: true, tip: 'Daire', ilce: 'Merkez', mahalle: 'Yavruturna',
    baslik: 'Yavruturna\'da yeni binada 3+1 daire', fiyat: 4150000, brut: 140, net: 118, arsa: 0,
    oda: '3+1', banyo: 1, kat: '3. kat / 5', yas: 1, isitma: 'Doğalgaz kombi', otopark: 'Açık otopark',
    rozet: [], img: 'img/ilan-08.jpg',
    ozet: 'Yeni bina, köşe cephe, geniş balkonlar.',
    aciklama: [
      'Yavruturna\'da yeni tamamlanan beş katlı binanın 3. katında, köşe cepheli 3+1 daire.',
      'Geniş balkonlar, ankastre mutfak ve ısı yalıtımlı cephe ile düşük enerji tüketimi sağlar.',
      'Bu ilan portföyümüzden satılmıştır.'
    ],
    yakin: ['İlkokul', 'Market', 'Spor sahası', 'Toplu taşıma']
  },
  {
    id: 9, ref: 'ÖE-1009', islem: 'kiralik', tip: 'Daire', ilce: 'Merkez', mahalle: 'Gülabibey',
    baslik: 'Gülabibey\'de eşyalı kiralık daire', fiyat: 32500, brut: 120, net: 100, arsa: 0,
    oda: '2+1', banyo: 1, kat: '5. kat / 7', yas: 3, isitma: 'Doğalgaz kombi', otopark: 'Kapalı otopark',
    rozet: ['Özel'], img: 'img/ilan-09.jpg',
    ozet: 'Tam eşyalı, merkeze yürüme mesafesinde.',
    aciklama: [
      'Gülabibey\'de, şehir merkezine yürüme mesafesinde tam eşyalı 2+1 daire. Yeni mobilyalar, beyaz eşya ve perdeler kiraya dahildir.',
      'Salon ile yemek alanı birlikte kullanılabilir; yatak odasında gömme dolap bulunur. Bina girişi kartlıdır ve kapalı otoparkı vardır.',
      'Kurumsal kiralama ve kısa süreli görev için uygundur.'
    ],
    yakin: ['Çarşı', 'Hastane', 'Kafe ve restoranlar', 'Valilik']
  },
  {
    id: 10, ref: 'ÖE-1010', islem: 'satilik', satildi: true, tip: 'Arsa', ilce: 'Sungurlu', mahalle: 'Merkez',
    baslik: 'Sungurlu\'da konut imarlı köşe arsa', fiyat: 4900000, brut: 2450, net: 0, arsa: 2450,
    oda: '', banyo: 0, kat: '', imar: 'Konut, emsal 0,30', yas: 0, isitma: '-', otopark: '-',
    rozet: [], img: 'img/ilan-10.jpg',
    ozet: '2.450 m², konut imarlı, iki yola cephe.',
    aciklama: [
      'Sungurlu merkeze 3 km mesafede, konut imarlı 2.450 m² köşe parsel. Arsa iki yola cepheli olup elektrik ve su hattı parsel sınırındadır.',
      'İmar durumu: konut alanı, emsal 0,30, en fazla iki kat. Villa veya küçük ölçekli site projesi için elverişlidir.',
      'Tapu müstakil ve hisse bulunmamaktadır. Bu ilan portföyümüzden satılmıştır.'
    ],
    yakin: ['Karayolu 1 km', 'İlçe merkezi 3 km', 'Okul', 'Sağlık merkezi']
  },
  {
    id: 11, ref: 'ÖE-1011', islem: 'kiralik', tip: 'Dükkân', ilce: 'Merkez', mahalle: 'Ulukavak',
    baslik: 'Ulukavak\'ta cadde üzeri kiralık dükkân', fiyat: 65000, brut: 185, net: 170, arsa: 0,
    oda: '', banyo: 0, wc: 1, kat: 'Zemin + asma kat', yas: 6, isitma: 'Klima', otopark: 'Cadde',
    rozet: [], img: 'img/ilan-11.jpg',
    ozet: '9 m vitrin cephesi, yoğun yaya trafiği.',
    aciklama: [
      'Ulukavak\'ta yaya trafiği yüksek cadde üzerinde, 9 metre vitrin cepheli dükkân. 120 m² zemin kat ve 65 m² asma kattan oluşur.',
      'Mağaza, ofis, kafe veya showroom olarak kullanıma uygundur. Klima, WC ve depo alanı mevcuttur.',
      'Kira artışı yıllık TÜFE oranında yapılır.'
    ],
    yakin: ['Banka şubeleri', 'Otopark', 'Dolmuş durağı', 'Çarşı']
  },
  {
    id: 12, ref: 'ÖE-1012', islem: 'satilik', tip: 'Bağ evi', ilce: 'Osmancık', mahalle: 'Merkez',
    baslik: 'Osmancık\'ta bağ içinde taş bağ evi', fiyat: 7400000, brut: 170, net: 145, arsa: 4200,
    oda: '3+1', banyo: 2, kat: '2 kat', yas: 12, isitma: 'Soba + güneş paneli', otopark: 'Bahçe içi',
    rozet: [], img: 'img/ilan-12.jpg',
    ozet: '4.200 m² bağ ve meyve bahçesi, Kızılırmak vadisi manzarası.',
    aciklama: [
      'Osmancık\'ta Kızılırmak vadisine bakan 4.200 m² bağ içinde, taş ve ahşaptan inşa edilmiş iki katlı bağ evi.',
      'Zemin katta taş duvarlı salon, ocaklı mutfak ve kiler; üst katta üç oda ve vadiye bakan ahşap balkon bulunuyor. Elektriğin bir kısmı güneş panelinden karşılanır.',
      'Bahçede üzüm bağı, ceviz ve meyve ağaçları, kuyu ve çardak mevcuttur. Hafta sonu evi veya butik konaklama için uygundur.'
    ],
    yakin: ['Osmancık merkez 6 km', 'Kızılırmak', 'Köy yolu asfalt', 'Market']
  }
];

/* Arama kutusundaki yer önerileri */
/* Merkez mahalle adları Çorum Merkez mahalle listesinden doğrulandı (Akkent resmi listede "Ak Kent"). */
var YERLER = ['Merkez', 'Akkent', 'Bahçelievler', 'Buharaevler', 'Gülabibey', 'Mimarsinan', 'Ulukavak', 'Üçtutlar', 'Yavruturna', 'Sungurlu', 'Osmancık', 'İskilip'];

/* Ana sayfa hero slaytları */
var SLAYTLAR = [
  { img: 'img/hero-1.jpg', ust: 'Modern villa - Akkent', alt: 'Özmen Emlak Çorum - ÖE-1001', link: 'ilan.html?id=1' },
  { img: 'img/hero-2.jpg', ust: 'Havuzlu villa - Üçtutlar', alt: 'Özmen Emlak Çorum - ÖE-1003', link: 'ilan.html?id=3' },
  { img: 'img/hero-3.jpg', ust: 'Modern müstakil ev - İskilip', alt: 'Özmen Emlak Çorum - ÖE-1004', link: 'ilan.html?id=4' },
  { img: 'img/hero-4.jpg', ust: 'Müstakil ev - Bahçelievler', alt: 'Özmen Emlak Çorum - ÖE-1002', link: 'ilan.html?id=2' },
  { img: 'img/hero-5.jpg', mpos: '62% center', ust: 'Bağ evi - Osmancık', alt: 'Özmen Emlak Çorum - ÖE-1012', link: 'ilan.html?id=12' }
];
