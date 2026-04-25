import React from 'react'
import { Link } from 'react-router-dom'

function VideoKart({ id, baslik, kategori, sure, resimUrl }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Resim Alanı */}
      <img src={resimUrl} alt={baslik} className="w-full h-48 object-cover" />
      
      {/* İçerik Alanı */}
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {kategori}
          </span>
          <span className="text-gray-400 text-sm font-medium">{sure}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-4 line-clamp-2 min-h-[3.5rem]">
          {baslik}
        </h3>
        
        <Link 
          to={`/video/${id}`} 
          className="block w-full text-center bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition duration-300"
        >
          Dersi İncele
        </Link>
      </div>
    </div>
  )
}

export default VideoKart