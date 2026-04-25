import React, { useState } from 'react' // useState'i React'tan çağırıyoruz
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation()
  
  // ÖĞRETMEN NOTU: useState bir şalter (aç/kapa) gibidir. 
  // 1. isMobileMenuOpen: Şalterin şu anki durumu (Başlangıçta false, yani kapalı)
  // 2. setIsMobileMenuOpen: Şalteri indirip kaldırmaya yarayan elimiz (fonksiyonumuz)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Hamburger ikona tıklanınca çalışacak fonksiyon
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen) // Kapalıysa aç, açıksa kapat
  }

  // Telefondan bir linke tıklandığında menünün otomatik kapanması için
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        
        <div className="nav-logo">
          <Link to="/" onClick={closeMobileMenu}>
            <span className="logo-icon">♾️</span> 
            <span className="logo-text">Matematik Atölyesi</span>
          </Link>
        </div>
        
        {/* MOBİL İÇİN HAMBURGER İKONU (Sadece telefonda görünecek) */}
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {/* Menü açıksa 'X' çarpı işareti, kapalıysa '☰' hamburger işareti göster */}
          {isMobileMenuOpen ? '✖' : '☰'}
        </div>

        {/* Linkler - Eğer isMobileMenuOpen 'true' ise className'e 'active' kelimesini ekle */}
        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          
          {/* active-link YERİNE active YAZDIK */}
          <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMobileMenu}>
            Ana Sayfa
          </Link>
          
          {/* active-link YERİNE active YAZDIK */}
          <Link to="/dersler" className={location.pathname === '/dersler' ? 'active' : ''} onClick={closeMobileMenu}>
            Dersler
          </Link>
          
          <Link to="/login" className="btn-admin mobile-only" onClick={closeMobileMenu}>
            Admin Girişi
          </Link>
        </div>

        {/* Masaüstü için aksiyon butonu */}
        <div className="nav-actions desktop-only">
          <Link to="/admin" className="btn-admin">Admin Girişi</Link>
        </div>

      </div>
    </nav>
  )
}

export default Navbar