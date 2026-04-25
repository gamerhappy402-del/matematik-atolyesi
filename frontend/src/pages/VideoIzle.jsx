import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function VideoIzle() {
  const { id } = useParams() // Adres çubuğundaki ID'yi aldık
  
  const [video, setVideo] = useState(null) // Artık tek bir video tutacağız
  const [yukleniyor, setYukleniyor] = useState(true)

  useEffect(() => {
    // Sunucumuzdaki o yeni yazdığımız adrese istek atıyoruz (Sonuna ID'yi ekleyerek)
    fetch(`http://localhost:5000/api/videolar/${id}`)
      .then((cevap) => cevap.json())
      .then((veri) => {
        // Eğer sunucu "mesaj" adında bir hata göndermediyse videoyu kaydet
        if (!veri.mesaj) {
          setVideo(veri);
        }
        setYukleniyor(false);
      })
      .catch((hata) => {
        console.log("Hata:", hata);
        setYukleniyor(false);
      });
  }, [id]); // ID değişirse bu işlemi tekrarla

  // Eğer sayfa hala yükleniyorsa bu ekranı göster
  if (yukleniyor) {
    return <div style={{textAlign:'center', padding:'50px'}}><h2>Ders Yükleniyor... ⏳</h2></div>
  }

  // Eğer video veritabanında gerçekten yoksa bu ekranı (senin attığın hata ekranı) göster
  if (!video) {
    return <div style={{textAlign:'center', padding:'50px'}}><h2>Böyle bir ders bulunamadı!</h2><Link to="/dersler">Geri Dön</Link></div>
  }

  // VİDEO BAŞARIYLA GELDİYSE EKRANI ÇİZ
  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
      
      <div style={{ marginBottom: '20px' }}>
        <Link to="/dersler" style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>
          ← Derslere Dön
        </Link>
        {/* secilenVideo yerine artık veritabanından gelen 'video' ismini kullanıyoruz */}
        <h1 style={{ color: '#2c3e50', marginTop: '10px' }}>{video.baslik}</h1>
        <span style={{ backgroundColor: '#ecf0f1', padding: '5px 10px', borderRadius: '5px', fontSize: '0.9rem' }}>
          {video.kategori}
        </span>
      </div>

      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
        <iframe 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          src={video.videoLinki} 
          title={video.baslik}
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen>
        </iframe>
      </div>

      <div style={{ marginTop: '30px', backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
        <h3 style={{ borderBottom: '2px solid #ecf0f1', paddingBottom: '10px' }}>Ders Hakkında</h3>
        <p style={{ color: '#555', lineHeight: '1.6', fontSize: '1.1rem' }}>
          {video.aciklama}
        </p>
      </div>

    </div>
  )
}

export default VideoIzle