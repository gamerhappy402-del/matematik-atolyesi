import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dersler from './pages/Dersler' // YENİ: Dersler sayfasını import ettik
import VideoIzle from './pages/VideoIzle'
import Admin from './pages/Admin'
import Login from './pages/Login';
import KorumaliRota from './components/KorumaliRota';
function App() {
  return (
    <BrowserRouter> 
      <Navbar /> 
      
      {/* Sayfaların ortalanması ve düzgün durması için min-height verdik */}
      <div style={{ minHeight: 'calc(100vh - 80px)', backgroundColor: '#f8f9fa' }}>
        <Routes>
         <Route path="/video/:id" element={ <VideoIzle /> } />
          <Route path="/" element={ <div style={{padding: '40px', textAlign:'center'}}><h1>Matematik Atölyesine Hoş Geldiniz</h1><p>Videolara ulaşmak için yukarıdan "Dersler" sekmesine tıklayın.</p></div> } />
          
          {/* YENİ: /dersler yoluna bizim hazırladığımız sayfayı koyduk */}
          <Route path="/dersler" element={ <Dersler /> } />
          
        <Route path="/login" element={ <Login /> } />

<Route path="/admin" element={ 
  <KorumaliRota>
    <Admin /> 
  </KorumaliRota> 
} />

        </Routes>
      </div>

    </BrowserRouter>
  )
}

export default App