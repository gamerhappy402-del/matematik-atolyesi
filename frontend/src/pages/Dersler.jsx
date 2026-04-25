import React, { useState, useEffect } from 'react'
import VideoKart from '../components/VideoKart'

function Dersler() {
  const [videolar, setVideolar] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [aramaTerimi, setAramaTerimi] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/videolar')
      .then((res) => res.json())
      .then((veri) => {
        setVideolar(veri);
        setYukleniyor(false);
      });
  }, []);

  const filtrelenmişVideolar = videolar.filter((video) =>
    video.baslik.toLowerCase().includes(aramaTerimi.toLowerCase()) ||
    video.kategori.toLowerCase().includes(aramaTerimi.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Başlık ve Arama Bölümü */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Ders Kütüphanesi</h1>
          <p className="text-lg text-gray-600 mb-8">Aradığınız matematik konusunu hemen bulun.</p>
          
          <input 
            type="text"
            placeholder="Konu veya kategori ara..."
            className="w-full max-w-lg p-4 rounded-2xl border border-gray-200 shadow-sm focus:ring-4 focus:ring-blue-100 outline-none transition"
            onChange={(e) => setAramaTerimi(e.target.value)}
          />
        </div>

        {/* Video Grid Yapısı */}
        {yukleniyor ? (
          <div className="text-center text-gray-500 text-xl font-medium">Videolar yükleniyor...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtrelenmişVideolar.map((video) => (
              <VideoKart 
                key={video._id}
                id={video._id}
                baslik={video.baslik}
                kategori={video.kategori}
                sure={video.sure}
                resimUrl={video.resimUrl}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dersler