import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [sifre, setSifre] = useState('');
  const [hata, setHata] = useState('');
  const navigate = useNavigate();

  const handleGiris = (e) => {
    e.preventDefault();
    
    // Şifre kontrolü (Basit bir güvenlik katmanı)
    if (sifre === '123456') { 
      // Giriş başarılıysa tarayıcı hafızasına 'admin' bileti bırak
      localStorage.setItem('adminBileti', 'gecerli'); 
      navigate('/admin'); // Admin sayfasına gönder
    } else {
      setHata('Hatalı şifre! Lütfen tekrar deneyin.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Admin Girişi</h2>
      
      <form onSubmit={handleGiris} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="password" 
          placeholder="Şifrenizi Girin" 
          value={sifre} 
          onChange={(e) => setSifre(e.target.value)} 
          style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '6px' }}
          required
        />
        {hata && <p style={{ color: '#e74c3c', margin: 0 }}>{hata}</p>}
        <button type="submit" style={{ backgroundColor: '#3498db', color: 'white', padding: '12px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Giriş Yap
        </button>
      </form>
    </div>
  );
}

export default Login;