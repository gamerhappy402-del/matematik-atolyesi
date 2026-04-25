const mongoose = require('mongoose');

// Videolarımızın veritabanında hangi kurallarla tutulacağını belirliyoruz
const videoSemasi = new mongoose.Schema({
  baslik: { 
    type: String, 
    required: true // required: true demek "bu alan boş bırakılamaz" demektir
  },
  kategori: { 
    type: String, 
    required: true 
  },
  sure: { 
    type: String, 
    required: true 
  },
  videoLinki: { 
    type: String, 
    required: true 
  },
  aciklama: { 
    type: String, 
    required: true 
  },
  resimUrl: { 
    type: String, 
    default: "https://via.placeholder.com/400x225/2c3e50/FFFFFF?text=Ders+Videosu" // Eğer kapak resmi yüklenmezse bu standart resmi kullan
  }
}, { timestamps: true }); // timestamps: true -> Videonun ne zaman eklendiğini otomatik kaydeder

// Bu şablonu dışarıya "Video" adıyla gönderiyoruz ki diğer dosyalarda kullanabilelim
module.exports = mongoose.model('Video', videoSemasi);