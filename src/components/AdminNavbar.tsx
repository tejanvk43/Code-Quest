import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, clear auth tokens here
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-900 border-b border-slate-800 text-white">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo / Admin Branding */}
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/admin')}>
            <div className="flex flex-col">
               <span className="font-black text-xl tracking-tight text-white">ADMIN PORTAL</span>
               <span className="text-xs text-slate-400 font-bold tracking-widest uppercase">Usha Rama College</span>
            </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden md:block text-sm text-slate-400 font-medium">
             Welcome, Administrator
          </div>
          <button 
            onClick={handleLogout}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-all shadow-lg hover:shadow-red-900/20 cursor-pointer flex items-center gap-2"
          >
            <span>Logout</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
              <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
