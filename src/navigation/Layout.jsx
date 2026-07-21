// src/components/Layout.jsx
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const activeTab = location.pathname

  return (
    <div className="relative w-full h-screen flex flex-col">
      {/* Page content */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>

      {/* Bottom Nav — shared across all pages */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100/50 px-6 py-2 flex justify-between items-center shadow-lg z-30">
        <button onClick={() => navigate('/')} className={`flex flex-col items-center gap-0.5 transition ${activeTab === '/' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <span className="text-xl">🏠</span>
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button onClick={() => navigate('/stats')} className={`flex flex-col items-center gap-0.5 transition ${activeTab === '/stats' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <span className="text-xl">📊</span>
          <span className="text-[10px] font-medium">Stats</span>
        </button>
        <div className="relative -top-5">
          <button className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg flex items-center justify-center text-white text-2xl active:scale-95 transition">
            +
          </button>
        </div>
        <button onClick={() => navigate('/friends')} className={`flex flex-col items-center gap-0.5 transition ${activeTab === '/friends' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <span className="text-xl">👥</span>
          <span className="text-[10px] font-medium">Friends</span>
        </button>
        <button onClick={() => navigate('/profile')} className={`flex flex-col items-center gap-0.5 transition ${activeTab === '/profile' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <span className="text-xl">👤</span>
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </div>
    </div>
  )
}

export default Layout