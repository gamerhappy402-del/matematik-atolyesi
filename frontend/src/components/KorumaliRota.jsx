import React from 'react';
import { Navigate } from 'react-router-dom';

function KorumaliRota({ children }) {
  const biletVarMi = localStorage.getItem('adminBileti'); // Hafızaya bak

  // Bilet yoksa giriş sayfasına at
  if (!biletVarMi) {
    return <Navigate to="/login" replace />;
  }

  // Bilet varsa içeri al
  return children;
}

export default KorumaliRota;