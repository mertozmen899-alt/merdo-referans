/* Özmen Emlak – demo verisi. Tüm ilanlar, kişiler ve rakamlar kurgusaldır.
   fetch yok: file:// ile çift tıklayınca da çalışsın diye global değişken. */
window.OZ = (function () {
  var S = 'assets/img/stok/', A = 'assets/img/ai/';

  var ofis = {
    ad: 'Özmen Emlak',
    adres: 'Yeniyol Mah., Gazi Caddesi No: 42, Kat 2, Merkez / Çorum (kurgusal adres)',
    // Telefonlar bilerek sahte: 0 (555) 000 00 0X (ofis 1, danışmanlar 2–7)
    telefon: '0 (555) 000 00 01',
    whatsapp: '0 (555) 000 00 01',
    eposta: 'merhaba@ozmenemlak.com.tr',
    saatler: ['Hafta içi: 09:00 – 19:00', 'Cumartesi: 10:00 – 17:00', 'Pazar: Kapalı'],
    lat: 40.5501, lng: 34.956, // Yeniyol Mah., Gazi Caddesi (Saat Kulesi yakını)
    belge: 'Demo-1907001'
  };

  var danismanlar = [
    { id: 1, ad: 'Murat Özmen', unvan: 'Kurucu / Broker', telefon: '0 (555) 000 00 02', whatsapp: '0 (555) 000 00 02', belge: 'Demo-1907011', foto: A + 'danisman-1.jpg', uzmanlik: 'Konut ve yatırım' },
    { id: 2, ad: 'Elif Yıldırım', unvan: 'Satış Müdürü', telefon: '0 (555) 000 00 03', whatsapp: '0 (555) 000 00 03', belge: 'Demo-1907012', foto: A + 'danisman-2.jpg', uzmanlik: 'Site içi daireler' },
    { id: 3, ad: 'Kerem Aksoy', unvan: 'Kıdemli Danışman, Ticari Gayrimenkul', telefon: '0 (555) 000 00 04', whatsapp: '0 (555) 000 00 04', belge: 'Demo-1907013', foto: A + 'danisman-3.jpg', uzmanlik: 'Dükkân, ofis, depo' },
    { id: 4, ad: 'Zeynep Arslan', unvan: 'Konut Danışmanı', telefon: '0 (555) 000 00 05', whatsapp: '0 (555) 000 00 05', belge: 'Demo-1907014', foto: A + 'danisman-4.jpg', uzmanlik: 'İlk ev alıcıları' },
    { id: 5, ad: 'Hakan Demirtaş', unvan: 'Arsa ve Yatırım Danışmanı', telefon: '0 (555) 000 00 06', whatsapp: '0 (555) 000 00 06', belge: 'Demo-1907015', foto: A + 'danisman-5.jpg', uzmanlik: 'Arsa, müstakil, villa' },
    { id: 6, ad: 'Selin Korkmaz', unvan: 'Kiralama Uzmanı', telefon: '0 (555) 000 00 07', whatsapp: '0 (555) 000 00 07', belge: 'Demo-1907016', foto: A + 'danisman-6.jpg', uzmanlik: 'Kiralık konut ve işyeri' }
  ];

  // m2Fiyat, satisSuresi, aktifIlan, degisim: "Çorum Piyasa Özeti" için DEMO rakamlar.
  var mahalleler = [
    { ad: 'Buharaevler', gorsel: A + 'mahalle-buharaevler.jpg', aciklama: 'Site yaşamı, geniş caddeler ve okullara yakınlığıyla şehrin en çok tercih edilen yeni yerleşim alanı.',
      okullar: ['Buharaevler İlkokulu – 600 m', 'Buharaevler Ortaokulu – 900 m', 'Anadolu Lisesi – 1,8 km'], ulasim: ['Belediye otobüs durağı – 200 m', 'Çorum Otogarı – 4 km', 'Hitit Üniversitesi Kuzey Kampüsü – 3,5 km'],
      m2Fiyat: 32500, satisSuresi: 41, aktifIlan: 128, degisim: 36 },
    { ad: 'Ulukavak', gorsel: A + 'mahalle-ulukavak.jpg', aciklama: 'Yeni konut projeleri ve üniversiteye yakınlığıyla genç ailelerin gözdesi.',
      okullar: ['Ulukavak İlkokulu – 500 m', 'Ulukavak Ortaokulu – 1 km', 'Fen Lisesi – 2,5 km'], ulasim: ['Otobüs durağı – 150 m', 'Hitit Üniversitesi – 2 km', 'Samsun yolu bağlantısı – 1,5 km'],
      m2Fiyat: 30500, satisSuresi: 44, aktifIlan: 96, degisim: 34 },
    { ad: 'Gülabibey', gorsel: A + 'mahalle-gulabibey.jpg', aciklama: 'Merkeze yürüme mesafesinde, yerleşik ve sakin; çarşıya ve hastanelere yakın.',
      okullar: ['Gülabibey İlkokulu – 400 m', 'Merkez Ortaokulu – 800 m', 'Çorum Lisesi – 1,2 km'], ulasim: ['Otobüs durağı – 100 m', 'Saat Kulesi – 1,3 km', 'Çorum Otogarı – 3 km'],
      m2Fiyat: 28000, satisSuresi: 39, aktifIlan: 74, degisim: 31 },
    { ad: 'Bahçelievler', gorsel: A + 'mahalle-bahcelievler.jpg', aciklama: 'Bahçeli evleri ve yeşil sokaklarıyla aile yaşamına uygun, oturmuş bir semt.',
      okullar: ['Bahçelievler İlkokulu – 350 m', 'Bahçelievler Ortaokulu – 700 m', 'Anadolu Lisesi – 2 km'], ulasim: ['Otobüs durağı – 250 m', 'Şehir merkezi – 2,5 km', 'Hastane – 2 km'],
      m2Fiyat: 27500, satisSuresi: 46, aktifIlan: 81, degisim: 30 },
    { ad: 'Çepni', gorsel: A + 'mahalle-cepni.jpg', aciklama: 'Uygun fiyatlı daireler ve gelişen altyapısıyla ilk ev alıcıları için cazip.',
      okullar: ['Çepni İlkokulu – 450 m', 'Çepni Ortaokulu – 650 m', 'Meslek Lisesi – 1,6 km'], ulasim: ['Otobüs durağı – 150 m', 'Organize Sanayi servisi – 300 m', 'Şehir merkezi – 3 km'],
      m2Fiyat: 23500, satisSuresi: 52, aktifIlan: 112, degisim: 29 },
    { ad: 'Kale', gorsel: A + 'mahalle-kale.jpg', aciklama: 'Çorum Kalesi çevresinde tarihî dokuyu yaşatan, müstakil evleri ve dar sokaklarıyla karakterli bölge.',
      okullar: ['Kale İlkokulu – 300 m', 'Merkez Ortaokulu – 900 m', 'Çorum Lisesi – 1,4 km'], ulasim: ['Otobüs durağı – 200 m', 'Saat Kulesi – 700 m', 'Çorum Otogarı – 3,5 km'],
      m2Fiyat: 25000, satisSuresi: 58, aktifIlan: 43, degisim: 27 },
    { ad: 'Yeniyol', aciklama: 'Saat Kulesi ve Gazi Caddesi çevresinde şehrin ticari kalbi; çarşıya yakın, dükkân ve ofis yatırımı için ideal.',
      okullar: ['Yeniyol İlkokulu – 400 m', 'Merkez Ortaokulu – 600 m'], ulasim: ['Gazi Caddesi – 100 m', 'Saat Kulesi – 300 m', 'Çorum Otogarı – 3 km'],
      m2Fiyat: 34000, satisSuresi: 37, aktifIlan: 65, degisim: 33 },
    { ad: 'Yavruturna', aciklama: 'Merkeze yakın, ulaşımı kolay; kiralık daire talebinin yüksek olduğu bir mahalle.',
      okullar: ['Yavruturna İlkokulu – 350 m', 'Yavruturna Ortaokulu – 750 m'], ulasim: ['Otobüs durağı – 100 m', 'Şehir merkezi – 1,5 km', 'Çorum Otogarı – 2,5 km'],
      m2Fiyat: 26000, satisSuresi: 43, aktifIlan: 88, degisim: 30 },
    { ad: 'Mimar Sinan', aciklama: 'Yeni villalar ve dubleks dairelerle öne çıkan, geniş parselli gelişen bölge.',
      okullar: ['Mimar Sinan İlkokulu – 700 m', 'Özel kolej – 1,5 km'], ulasim: ['Otobüs durağı – 400 m', 'Şehir merkezi – 4 km', 'Ankara yolu bağlantısı – 2 km'],
      m2Fiyat: 36000, satisSuresi: 55, aktifIlan: 39, degisim: 35 }
  ];

  function ilan(o) { o.kapak = S + o.kapak; return o; }

  // Metinler kapak fotoğrafına göre yazıldı (fotoğrafta görünmeyen iddia yok).
  // lat/lng: OSM Nominatim mahalle merkezinden en çok ~300 m sapma (Kasım 2026).
  // galeri: detayGorseller sıra numaraları (1–10); kapak her zaman ilk fotoğraftır.
  var ilanlar = [
    ilan({ id: 1, baslik: "Buharaevler'de site içinde geniş 3+1 daire", tur: 'Daire', durum: 'satilik', fiyat: 4250000, mahalle: 'Buharaevler', oda: '3+1', banyo: 2, m2: 145, kat: '4. kat', binaYasi: 3, isitma: 'Kombi (Doğalgaz)', asansor: true, otopark: true, tapu: 'Kat mülkiyeti', aidat: 950,
      rozetler: ["Özmen'e Özel", 'Krediye Uygun'], onecikan: true, tarih: '2026-11-12', lat: 40.5796, lng: 34.9515, kapak: 'ilan-01.jpg', danisman: 2, galeri: [3, 4, 5, 6, 8, 10],
      ozellikler: ['Site içinde', 'Kapalı otopark', 'Ankastre mutfak', 'Ebeveyn banyosu', 'Çocuk oyun alanı', '7/24 güvenlik'],
      aciklama: ['Buharaevler\'in sakin bir sokağında, 2023 yapımı sitede güney cepheli 3+1 daire. Geniş salon, ayrı mutfak ve ebeveyn banyolu yatak odası ile kalabalık aileler için rahat bir yerleşim sunuyor.', 'Site içinde kapalı otopark, çocuk oyun alanı ve güvenlik bulunuyor. Okullara ve otobüs durağına yürüme mesafesinde. Konut kredisine uygundur, tapu devri hemen yapılabilir.'] }),
    ilan({ id: 2, baslik: 'Ulukavak yeni projede 4+1 geniş aile dairesi', tur: 'Daire', durum: 'satilik', fiyat: 5900000, mahalle: 'Ulukavak', oda: '4+1', banyo: 2, m2: 185, kat: '6. kat', binaYasi: 1, isitma: 'Yerden ısıtma', asansor: true, otopark: true, tapu: 'Kat mülkiyeti', aidat: 1200,
      rozetler: ["Özmen'e Özel", 'Yeni'], onecikan: true, tarih: '2026-11-15', lat: 40.5655, lng: 34.9413, kapak: 'ilan-02.jpg', danisman: 1, galeri: [2, 3, 4, 5, 6, 7, 10],
      ozellikler: ['Yerden ısıtma', 'Boy pencereli salon', 'Giyinme odası', 'İki balkon', 'Kapalı otopark', 'Spor salonu'],
      aciklama: ['Ulukavak\'ın yeni projesinde, boydan boya pencereli aydınlık salonu olan 185 m² 4+1 daire. Yerden ısıtma, giyinme odası ve iki ayrı balkonuyla konforu ön planda tutan bir plan.', 'Projede spor salonu, kapalı otopark ve peyzajlı yürüyüş alanları bulunuyor. Hitit Üniversitesi\'ne ve Samsun yolu bağlantısına dakikalar içinde ulaşılıyor.'] }),
    ilan({ id: 3, baslik: "Bahçelievler'de adalı açık mutfaklı 3+1 daire", tur: 'Daire', durum: 'satilik', fiyat: 3750000, mahalle: 'Bahçelievler', oda: '3+1', banyo: 1, m2: 140, kat: '2. kat', binaYasi: 5, isitma: 'Kombi (Doğalgaz)', asansor: true, otopark: false, tapu: 'Kat mülkiyeti', aidat: 550,
      rozetler: ['Fiyatı Düştü', 'Krediye Uygun'], onecikan: true, tarih: '2026-11-09', lat: 40.5509, lng: 34.9749, kapak: 'ilan-03.jpg', danisman: 4, galeri: [1, 4, 5, 6, 8],
      ozellikler: ['Mutfak adası ve bar sandalyeleri', 'Beyaz lake dolaplar', 'Ankastre set', 'Asansör', 'Okula yakın'],
      aciklama: ['Bahçelievler\'de beş yıllık binada, beyaz dolaplı ve geniş mutfak adalı 3+1 daire. Mutfak, salonla birlikte kullanılabilen açık bir yaşam alanı oluşturuyor.', 'Okullara ve markete yürüme mesafesinde. Fiyatı yeni güncellendi; konut kredisine uygundur.'] }),
    ilan({ id: 4, baslik: 'Gülabibey eşyalı kiralık 3+1 daire', tur: 'Daire', durum: 'kiralik', fiyat: 18000, mahalle: 'Gülabibey', oda: '3+1', banyo: 1, m2: 130, kat: '3. kat', binaYasi: 8, isitma: 'Kombi (Doğalgaz)', asansor: true, otopark: true, tapu: 'Kat mülkiyeti', aidat: 600,
      rozetler: ['Yeni'], tarih: '2026-11-14', lat: 40.5315, lng: 34.9594, kapak: 'ilan-04.jpg', danisman: 6, galeri: [1, 3, 5, 6, 9],
      ozellikler: ['Eşyalı', 'Beyaz eşya dahil', 'Asma tavan ve gizli aydınlatma', 'Açık otopark', 'Hastaneye yakın'],
      aciklama: ['Gülabibey\'de merkeze yürüme mesafesinde, eşyalı ve beyaz eşyalı 3+1 kiralık daire. Yatak odası asma tavanlı ve gizli aydınlatmalı; odalar ferah ve kullanışlı.', 'Aileye kiralanacaktır. Depozito iki kira bedelidir, en az bir yıllık sözleşme yapılır.'] }),
    ilan({ id: 5, baslik: 'Çepni yeni binada uygun fiyatlı 3+1', tur: 'Daire', durum: 'satilik', fiyat: 2950000, mahalle: 'Çepni', oda: '3+1', banyo: 1, m2: 135, kat: '1. kat', binaYasi: 2, isitma: 'Kombi (Doğalgaz)', asansor: true, otopark: true, tapu: 'Kat mülkiyeti', aidat: 400,
      rozetler: ['Krediye Uygun', 'Yeni'], tarih: '2026-11-10', lat: 40.5495, lng: 34.9351, kapak: 'ilan-05.jpg', danisman: 4, galeri: [2, 3, 5, 6, 8],
      ozellikler: ['Yeni bina', 'Gömme dolaplı yatak odası', 'Asansör', 'Isı yalıtımı', 'Ankastre set'],
      aciklama: ['Çepni\'de iki yıllık binada, ısı yalıtımlı ve ankastre setli 3+1 daire. Ebeveyn yatak odasında boydan gömme dolap ve raf sistemi bulunuyor.', 'Organize Sanayi servis güzergâhına ve okullara yakın. Metrekare fiyatıyla bölgenin avantajlı ilanlarından; konut kredisine uygundur.'] }),
    ilan({ id: 6, baslik: 'Yeniyol geniş balkonlu kiralık 2+1', tur: 'Daire', durum: 'kiralik', fiyat: 16500, mahalle: 'Yeniyol', oda: '2+1', banyo: 1, m2: 95, kat: '5. kat', binaYasi: 6, isitma: 'Merkezi sistem', asansor: true, otopark: false, tapu: 'Kat mülkiyeti', aidat: 700,
      rozetler: ['Yeni'], tarih: '2026-11-13', lat: 40.5513, lng: 34.9574, kapak: 'ilan-06.jpg', danisman: 6, galeri: [2, 3, 4, 6],
      ozellikler: ['Ahşap zeminli geniş balkon', 'Cam korkuluk', 'Merkezi ısıtma', 'Asansör', 'Saat Kulesi\'ne yürüme mesafesi'],
      aciklama: ['Saat Kulesi\'ne ve Gazi Caddesi\'ne yürüme mesafesinde, ahşap zeminli ve cam korkuluklu geniş balkonu olan 2+1 kiralık daire. Öğretmen, memur ve küçük aileler için uygun.', 'Isınma giderleri aidata dahildir. Evcil hayvan kabul edilmez.'] }),
    ilan({ id: 7, baslik: 'Yavruturna yeni binada balkonlu 1+1', tur: 'Daire', durum: 'satilik', fiyat: 1950000, mahalle: 'Yavruturna', oda: '1+1', banyo: 1, m2: 65, kat: '3. kat', binaYasi: 4, isitma: 'Kombi (Doğalgaz)', asansor: true, otopark: false, tapu: 'Kat mülkiyeti', aidat: 450,
      rozetler: ['Fiyatı Düştü'], tarih: '2026-10-20', lat: 40.5471, lng: 34.9665, kapak: 'ilan-07.jpg', danisman: 1, galeri: [2, 3, 4, 6],
      ozellikler: ['Kiracılı', 'Balkon', 'Asansör', 'Toplu taşımaya yakın', 'Öğrenciye uygun'],
      aciklama: ['Yavruturna\'da dört yıllık, her dairesi balkonlu modern bir binada kiracılı 1+1 daire. Düzenli kira geliri arayan yatırımcılar için uygun.', 'Mevcut kira 9.500 TL/ay. Fiyatı yeni güncellendi.'] }),
    ilan({ id: 8, baslik: 'Çepni balkonlu kiralık 2+1 daire', tur: 'Daire', durum: 'kiralik', fiyat: 11000, mahalle: 'Çepni', oda: '2+1', banyo: 1, m2: 90, kat: '3. kat', binaYasi: 28, isitma: 'Kombi (Doğalgaz)', asansor: false, otopark: false, tapu: 'Kat mülkiyeti', aidat: 250,
      rozetler: [], tarih: '2026-10-22', lat: 40.5471, lng: 34.9379, kapak: 'ilan-08.jpg', danisman: 6, galeri: [8, 5],
      ozellikler: ['Balkon', 'Renkli PVC doğrama', 'Düşük aidat', 'Toplu taşımaya yakın', 'Pazar yerine yakın'],
      aciklama: ['Çepni\'de yerleşik bir apartmanda, balkonlu ve bol pencereli 2+1 kiralık daire. Bina eski ama bakımlı; aidatı düşük, komşuluk ilişkileri güçlü bir sokakta.', 'İlk evini kuracaklar ve küçük aileler için uygun bütçeli bir seçenek. Depozito bir kira bedelidir.'] }),
    ilan({ id: 9, baslik: 'Kale\'de bahçe içinde taş müstakil ev', tur: 'Müstakil', durum: 'satilik', fiyat: 4350000, mahalle: 'Kale', oda: '4+1', banyo: 1, m2: 240, kat: 'Zemin + 1 kat + çatı arası', binaYasi: 65, isitma: 'Soba', asansor: false, otopark: false, tapu: 'Müstakil tapu', aidat: 0,
      rozetler: ['Fiyatı Düştü'], tarih: '2026-10-25', lat: 40.5445, lng: 34.9632, kapak: 'ilan-09.jpg', danisman: 5, galeri: [],
      ozellikler: ['Kâgir taş yapı', 'Kiremit çatı', 'Bahçe içinde', 'Bahçede ek yapı (depo)', 'Kaleye yürüme mesafesi'],
      aciklama: ['Çorum Kalesi\'ne yürüme mesafesinde, bahçe içinde iki katlı ve çatı aralı eski bir taş ev. Kalın taş duvarları ve kiremit çatısıyla bölgenin tarihî dokusunu taşıyor; bahçede ayrıca küçük bir ek yapı bulunuyor.', 'Ev, iç yenileme yapılarak aile evi ya da butik pansiyon olarak kullanılabilir. İç mekân fotoğrafları randevuda paylaşılır. Fiyatı yeni güncellendi.'] }),
    ilan({ id: 10, baslik: 'Bahçelievler tek katlı, bahçeli 3+1 müstakil', tur: 'Müstakil', durum: 'satilik', fiyat: 4600000, mahalle: 'Bahçelievler', oda: '3+1', banyo: 1, m2: 150, kat: 'Tek kat', binaYasi: 20, isitma: 'Kombi (Doğalgaz)', asansor: false, otopark: true, tapu: 'Müstakil tapu', aidat: 0,
      rozetler: ['Krediye Uygun'], tarih: '2026-11-08', lat: 40.5464, lng: 34.9784, kapak: 'ilan-10.jpg', danisman: 5, galeri: [1, 9, 3, 4, 5, 6],
      ozellikler: ['Çimenli bahçe', 'Çiçekli çit ve sarmaşıklar', 'Tek katlı, merdivensiz', 'Bahçede otopark', 'Sessiz sokak'],
      aciklama: ['Bahçelievler\'in sessiz bir sokağında, çimenli ve çiçekli bahçe içinde tek katlı 3+1 müstakil ev. Merdiveni olmadığı için yaşlılar ve küçük çocuklu aileler için rahat.', 'Okul ve parka yakın. Konut kredisine uygundur.'] }),
    ilan({ id: 11, baslik: 'Mimar Sinan havuzlu 5+1 villa', tur: 'Villa', durum: 'satilik', fiyat: 12500000, mahalle: 'Mimar Sinan', oda: '5+1', banyo: 4, m2: 320, kat: 'Zemin + 1 kat + çatı terası', binaYasi: 2, isitma: 'Yerden ısıtma', asansor: false, otopark: true, tapu: 'Müstakil tapu', aidat: 0,
      rozetler: ["Özmen'e Özel"], onecikan: true, tarih: '2026-11-05', lat: 40.514, lng: 34.940, kapak: 'ilan-11.jpg', danisman: 1, galeri: [1, 9, 3, 4, 6, 7],
      ozellikler: ['Özel havuz', 'Çatı terası', 'Cam korkuluklu balkonlar', '600 m² arsa', 'Yerden ısıtma', 'İki araçlık otopark'],
      aciklama: ['Mimar Sinan\'da 600 m² arsa üzerinde, özel havuzlu ve havuz teraslı modern 5+1 villa. Geniş cam yüzeyler, cam korkuluklu balkonlar ve çatı terası bulunuyor.', 'Yerden ısıtma ve iki araçlık otopark. Özmen Emlak\'a özel, yalnızca randevuyla gösterilir.'] }),
    ilan({ id: 12, baslik: "Kargı'da dağ manzaralı 5.000 m² tarla", tur: 'Arsa', durum: 'satilik', fiyat: 950000, mahalle: 'Kargı', ilce: true, oda: null, banyo: null, m2: 5000, kat: null, binaYasi: null, isitma: null, asansor: false, otopark: false, tapu: 'Müstakil tapu', aidat: 0,
      rozetler: ['Yeni'], tarih: '2026-11-11', lat: 41.1405, lng: 34.505, kapak: 'ilan-12.jpg', danisman: 5,
      ozellikler: ['İmar durumu: Tarla', 'Geniş dağ manzarası', 'Köy yoluna yakın', 'Müstakil tapu'],
      aciklama: ['Kargı ilçesinde, sıradağlara bakan yamaçta 5.000 m² tarla. Arazi engebeli ve taşlık; tarımdan çok manzara ve uzun vadeli yatırım için uygun.', 'Hafta sonu yayla evi ya da hobi amaçlı kullanım düşünenler için. Konut imarı yoktur; kullanım izinleri için ilçe belediyesine danışılmalıdır.'] }),
    ilan({ id: 13, baslik: 'Gülabibey çıkışında 1.200 m² tarla', tur: 'Arsa', durum: 'satilik', fiyat: 2400000, mahalle: 'Gülabibey', oda: null, banyo: null, m2: 1200, kat: null, binaYasi: null, isitma: null, asansor: false, otopark: false, tapu: 'Hisseli tapu', aidat: 0,
      rozetler: ['Fiyatı Düştü'], tarih: '2026-10-18', lat: 40.527, lng: 34.963, kapak: 'ilan-13.jpg', danisman: 5,
      ozellikler: ['İmar durumu: Tarla', 'Tel çitle çevrili', 'Düz arazi', 'Yola yakın'],
      aciklama: ['Gülabibey çıkışında, tel çitle çevrili, düz 1.200 m² tarla. Şu an çayır olarak duruyor; hobi bahçesi için uygun.', 'Uzun vadeli yatırım için değerlendirilebilir. Hisseli tapudur. Fiyatı yeni güncellendi.'] }),
    ilan({ id: 14, baslik: 'Yeniyol ara sokakta ahşap vitrinli dükkân', tur: 'Dükkân', durum: 'satilik', fiyat: 3250000, mahalle: 'Yeniyol', oda: null, banyo: 1, m2: 45, kat: 'Zemin kat', binaYasi: 40, isitma: null, asansor: false, otopark: false, tapu: 'Kat mülkiyeti', aidat: 300,
      rozetler: ["Özmen'e Özel"], tarih: '2026-11-03', lat: 40.5494, lng: 34.9539, kapak: 'ilan-14.jpg', danisman: 3,
      ozellikler: ['Ahşap doğrama vitrin', 'Boş, hemen teslim', 'Sokak cepheli giriş', 'Çarşıya yürüme mesafesi'],
      aciklama: ['Saat Kulesi\'ne yakın bir ara sokakta, ahşap doğramalı vitrini ve ayrı giriş kapısı olan 45 m² dükkân. Şu an boş, hemen teslim edilebilir.', 'Butik mağaza, kafe ya da küçük ofis olarak kullanıma uygun. Yatırımlık ticari gayrimenkul arayanlar için.'] }),
    ilan({ id: 15, baslik: 'Kale\'de dekorasyonlu, kiracılı 120 m² ofis', tur: 'Ofis', durum: 'satilik', fiyat: 4950000, mahalle: 'Kale', oda: null, banyo: 1, m2: 120, kat: '2. kat', binaYasi: 9, isitma: 'Kombi (Doğalgaz)', asansor: true, otopark: false, tapu: 'Kat mülkiyeti', aidat: 650,
      rozetler: [], tarih: '2026-10-30', lat: 40.54, lng: 34.9667, kapak: 'ilan-15.jpg', danisman: 3,
      ozellikler: ['Açık ofis alanı', 'Cam bölmeli toplantı odası', 'Ahşap duvar kaplaması', 'Klima', 'Kiracılı'],
      aciklama: ['Kale\'de, merkeze yakın binanın 2. katında, ahşap kaplamalı açık ofis alanı ve cam bölmeli toplantı odası olan 120 m² ofis.', 'Uzun süreli kiracılı, aylık kira geliri 24.000 TL. Yatırımlık işyeri arayanlar için uygun.'] }),
    ilan({ id: 16, baslik: 'Çepni sanayi yolunda kiralık 1.200 m² depo', tur: 'Depo', durum: 'kiralik', fiyat: 85000, mahalle: 'Çepni', oda: null, banyo: 1, m2: 1200, kat: 'Zemin kat', binaYasi: 7, isitma: null, asansor: false, otopark: true, tapu: 'Müstakil tapu', aidat: 0,
      rozetler: [], tarih: '2026-11-02', lat: 40.5447, lng: 34.9351, kapak: 'ilan-16.jpg', danisman: 3,
      ozellikler: ['Çelik konstrüksiyon', 'Epoksi kaplı zemin', 'Yüksek tavan', 'Geniş kolon aralığı', 'Aydınlatma hazır'],
      aciklama: ['Çepni\'de sanayi yoluna yakın, çelik konstrüksiyon çatılı ve epoksi kaplı zeminli 1.200 m² depo. Geniş kolon aralığı sayesinde raf sistemine kolayca uyarlanır.', 'Aydınlatması hazır, hemen kullanılabilir. Lojistik ve toptan ticaret için uygun.'] })
  ];

  var detayGorseller = ['Salon ve yemek alanı', 'Oturma odası', 'Mutfak', 'Ebeveyn yatak odası', 'Çocuk odası', 'Banyo', 'Teras', 'Antre', 'Yemek odası', 'Site ve dış cephe']
    .map(function (ad, i) { return { src: S + 'detay-' + String(i + 1).padStart(2, '0') + '.jpg', ad: ad }; });

  var blog = [
    { baslik: "2026'da konut kredisi çekerken bilmeniz gerekenler", kategori: 'Kredi', tarih: '12 Kasım 2026', gorsel: S + 'blog-1.jpg', ozet: 'Peşinat oranı, vade seçimi ve aylık taksit hesabı: bankaya gitmeden önce kontrol listesi.' },
    { baslik: 'Tapu devrinde adım adım süreç ve masraflar', kategori: 'Tapu', tarih: '28 Ekim 2026', gorsel: S + 'blog-2.jpg', ozet: 'Randevudan harç ödemesine, alıcı ve satıcının hazırlaması gereken belgeler.' },
    { baslik: "Çorum'da hangi mahalle size göre?", kategori: 'Mahalle Rehberi', tarih: '9 Ekim 2026', gorsel: S + 'blog-3.jpg', ozet: 'Okula yakınlık, ulaşım ve bütçeye göre Buharaevler, Ulukavak ve Gülabibey karşılaştırması.' }
  ];

  // render: görsel bitmiş bina gösteriyor ama proje sürüyor; kartta "Mimari görselleştirme" etiketi çıkar
  var projeler = [
    { ad: 'Hitit Konakları', mahalle: 'Ulukavak', teslim: 'Eylül 2027', blok: 4, daire: 168, kredi: true, durum: 'Ön satışta', render: true, gorsel: A + 'proje-1.jpg', aciklama: '2+1 ile 4+1 arası daireler, sosyal tesis ve kapalı otopark.' },
    { ad: 'Kalepark Evleri', mahalle: 'Kale', teslim: 'Mart 2027', blok: 2, daire: 64, kredi: true, durum: 'Ön satışta', render: true, gorsel: A + 'proje-2.jpg', aciklama: 'Tarihî dokuya uyumlu cephe, kaleye yürüme mesafesinde butik proje.' },
    { ad: 'Buharaevler Bahçe Rezidans', mahalle: 'Buharaevler', teslim: 'Haziran 2027', blok: 3, daire: 120, kredi: true, durum: 'İnşaat sürüyor', gorsel: A + 'proje-3.jpg', aciklama: 'Peyzajlı iç bahçe, çocuk parkı ve yürüyüş parkuru.' },
    { ad: 'Mimar Sinan Bahçe Dubleksleri', mahalle: 'Mimar Sinan', teslim: 'Aralık 2027', blok: 6, daire: 36, kredi: false, durum: 'Temel atıldı', render: true, gorsel: A + 'proje-4.jpg', aciklama: 'Özel bahçeli 4+1 dubleksler, geniş parseller.' }
  ];

  return { ofis: ofis, danismanlar: danismanlar, mahalleler: mahalleler, ilanlar: ilanlar, detayGorseller: detayGorseller, blog: blog, projeler: projeler, katPlani: A + 'kat-plani-3-1.png' };
})();
