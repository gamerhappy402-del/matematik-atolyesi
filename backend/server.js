const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // 1. Çevirmenimizi çağırdık (YENİ)
const Video = require('./models/Video');

// Express uygulamasını başlatıyoruz
const app = express();
app.use(cors());
app.use(express.json());

// 2. VERİTABANI BAĞLANTISI (YENİ)
// 'matematik_atolyesi' adında bir veritabanı arar, yoksa kendisi otomatik oluşturur.
// Not: localhost yerine 127.0.0.1 yazmak, yeni nesil Node.js sürümlerinde hata almanı engeller.
// Doğrusu bu şekilde olmalı:
mongoose.connect('mongodb+srv://gamerhappy402_db_user:E9QIQ17NDM5WeACk@cluster0.4fuzrjm.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Harika! Veritabanına (MongoDB) başarıyla bağlandı. 🟢'))
  .catch((hata) => console.log('Eyvah, veritabanı bağlantı hatası: 🔴', hata)); 



// Güvenlik ve veri okuma ayarları
app.use(cors()); // React ile Node.js'in konuşmasına izin ver
app.use(express.json()); // Gelen verileri JSON formatında okuyabilmek için

// İlk API Uç Noktamız (Test amaçlı)
app.get('/', (req, res) => {
  res.send('Matematik Atölyesi Backend Sunucusu Tıkır Tıkır Çalışıyor! 🚀');
});
app.post('/api/videolar', async (req, res) => {
  try {
    // req.body: Dışarıdan (Postman'den veya React'tan) gönderilen bilgilerdir.
    const yeniVideo = new Video(req.body); 
    
    // Veritabanına kaydetmesini bekle (await)
    const kaydedilenVideo = await yeniVideo.save(); 
    
    // İşlem başarılıysa kaydedilen videoyu geri gönder (Durum kodu 201: Oluşturuldu)
    res.status(201).json(kaydedilenVideo); 
  } catch (hata) {
    // Bir sorun çıkarsa (örneğin başlık boş gönderilmişse) hata mesajı ver
    res.status(400).json({ mesaj: "Video kaydedilirken hata oluştu!", hata });
  }
});

// VİDEOLARI GETİRME YOLU (GET İSTEĞİ)
app.get('/api/videolar', async (req, res) => {
  try {
    // Video.find() -> Veritabanındaki "Video" şablonuna uyan tüm kayıtları bulup getirir
    const videolar = await Video.find(); 
    
    // Bulunan videoları React'a (veya kim istiyorsa ona) 200 (Başarılı) koduyla gönder
    res.status(200).json(videolar); 
  } catch (hata) {
    res.status(500).json({ mesaj: "Videolar getirilirken hata oluştu" });
  }
});

// TEK BİR VİDEOYU GETİRME YOLU
app.get('/api/videolar/:id', async (req, res) => {
  try {
    // req.params.id -> Adres çubuğundaki o karmaşık MongoDB ID'sini alır
    // findById -> Veritabanında o ID'ye sahip spesifik videoyu bulur
    const video = await Video.findById(req.params.id);
    
    // Eğer o ID'de bir video yoksa 404 (Bulunamadı) hatası dön
    if (!video) {
      return res.status(404).json({ mesaj: "Böyle bir video bulunamadı" });
    }
    
    // Video bulunduysa React'a gönder
    res.status(200).json(video);
  } catch (hata) {
    res.status(500).json({ mesaj: "Video getirilirken hata oluştu" });
  }
});

// VİDEO SİLME YOLU (DELETE İSTEĞİ)
app.delete('/api/videolar/:id', async (req, res) => {
  try {
    // findByIdAndDelete: Gönderilen ID'ye sahip dökümanı bulur ve tek hamlede siler
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json({ mesaj: "Video başarıyla veritabanından silindi. 🗑️" });
  } catch (hata) {
    res.status(500).json({ mesaj: "Silme işlemi sırasında bir hata oluştu!" });
  }
});


// Sunucunun dinleyeceği kapı numarası (Port)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Sunucu ayağa kalktı! Şu adreste çalışıyor: http://localhost:${PORT}`);
});