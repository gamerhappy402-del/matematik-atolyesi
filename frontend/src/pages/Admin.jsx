import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate(); // Bunu ekle
  const cikisYap = () => {
    localStorage.removeItem('adminBileti'); // Bileti sil
    navigate('/login'); // Giriş sayfasına geri gönder
  };
  const [videolar, setVideolar] = useState([]); // Videoları listelemek için
  const [videoBilgileri, setVideoBilgileri] = useState({
    baslik: '', kategori: '', sure: '', videoLinki: '', aciklama: ''
  });

  // SAYFA AÇILDIĞINDA VİDEOLARI GETİR
  useEffect(() => {
    videolariGetir();
  }, []);

  const videolariGetir = () => { // 't' harfini 'l' yaptık
    fetch('https://matematik-backend.onrender.com/api/videolar')
      .then(res => res.json())
      .then(veri => setVideolar(veri));
  };

  const handleChange = (e) => {
    setVideoBilgileri({ ...videoBilgileri, [e.target.name]: e.target.value });
  };

  // VİDEO EKLEME
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cevap = await fetch('https://matematik-backend.onrender.com/api/videolar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(videoBilgileri)
    });

    if (cevap.ok) {
      alert('Video başarıyla eklendi! 🎉');
      setVideoBilgileri({ baslik: '', kategori: '', sure: '', videoLinki: '', aciklama: '' });
      videolariGetir(); // Listeyi anında güncelle
    }
  };

  // VİDEO SİLME FONKSİYONU
  const handleSil = async (id) => {
    // Kullanıcıya son bir kez soralım (Öğretmen onayı gibi)
    if (window.confirm("Bu videoyu silmek istediğinize emin misiniz?")) {
      try {
        const cevap = await fetch(`https://matematik-backend.onrender.com/api/videolar/${id}`, {
          method: 'DELETE' // Silme isteği gönderiyoruz
        });

        if (cevap.ok) {
          // Silme başarılıysa listeyi tekrar çekerek ekranı güncelle
          videolariGetir();
        }
      } catch (hata) {
        console.log("Silme hatası:", hata);
      }
    }
  };

return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-gray-50 rounded-xl shadow-md">
      {/* YENİ: Panel Başlığı ve Çıkış Butonu */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">Admin Paneli</h1>
        <button 
          onClick={cikisYap} 
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition shadow-md"
        >
          Çıkış Yap
        </button>
      </div>
      {/* 1. BÖLÜM: VİDEO EKLEME FORMU */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Yeni Video Ekle</h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="baslik" placeholder="Video Başlığı" value={videoBilgileri.baslik} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
          <input type="text" name="kategori" placeholder="Kategori" value={videoBilgileri.kategori} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
          <input type="text" name="sure" placeholder="Süre (Örn: 15:00)" value={videoBilgileri.sure} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
          <input type="text" name="videoLinki" placeholder="YouTube Embed Linki" value={videoBilgileri.videoLinki} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
          <textarea name="aciklama" placeholder="Video Açıklaması" value={videoBilgileri.aciklama} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2 h-24" required />
          
          <button type="submit" className="md:col-span-2 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md">
            Veritabanına Kaydet
          </button>
        </form>
      </div>

      {/* 2. BÖLÜM: VİDEO YÖNETİM LİSTESİ */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Mevcut Videolar</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="pb-3">Başlık</th>
                <th className="pb-3">Kategori</th>
                <th className="pb-3 text-center">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {videolar.map((video) => (
                <tr key={video._id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-4 font-medium text-gray-700">{video.baslik}</td>
                  <td className="py-4 text-gray-600">{video.kategori}</td>
                  <td className="py-4 text-center">
                    <button 
                      onClick={() => handleSil(video._id)} 
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition text-sm"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Admin.jsx içinde bir yere şu fonksiyonu koy
const cikisYap = () => {
  localStorage.removeItem('adminBileti'); // Bileti sil
  window.location.href = '/login'; // Giriş sayfasına yolla
};

// Ve JSX kısmına bir buton ekle:
<button onClick={cikisYap} className="bg-red-500 text-white p-2 rounded">Çıkış Yap</button>


const inputStili = { padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '1rem' };

export default Admin;