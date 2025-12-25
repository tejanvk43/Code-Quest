import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ProfessionalNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Events', path: '/events' },
    { label: 'Register', path: 'https://app-8gixcp0ztqtd.appmedo.com/register', external: true },
    { label: 'Timings', path: '/timings' },
    { label: 'About', path: '/about' },
    { label: 'Login', path: '/login' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  };

  // Close menu when route changes (backup)
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/')}>
            <img 
              src="/assets/college_logo.png" 
              alt="Usha Rama College Logo" 
              className="h-14 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate('/')} className="text-sm font-medium text-slate-600 hover:text-blue-900 transition-colors cursor-pointer">
              HOME
            </button>
            <button onClick={() => navigate('/events')} className="text-sm font-medium text-slate-600 hover:text-blue-900 transition-colors cursor-pointer">
              EVENTS
            </button>
            <button onClick={() => navigate('/timings')} className="text-sm font-medium text-slate-600 hover:text-blue-900 transition-colors cursor-pointer">
              TIMINGS
            </button>
            <button onClick={() => navigate('/about')} className="text-sm font-medium text-slate-600 hover:text-blue-900 transition-colors cursor-pointer">
              ABOUT
            </button>
            <button onClick={() => navigate('/login')} className="text-sm font-medium text-slate-600 hover:text-blue-900 transition-colors cursor-pointer">
              LOGIN
            </button>
            <a 
              href="https://app-8gixcp0ztqtd.appmedo.com/register"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-blue-900 text-white text-sm font-semibold rounded hover:bg-blue-800 transition-colors shadow-sm cursor-pointer inline-block"
            >
              REGISTER
            </a>
          </div>

          {/* Mobile Menu Toggle (Black Circle) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-12 h-12 bg-slate-900 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-slate-800 transition-all cursor-pointer active:scale-95"
            >
               <div className="relative w-6 h-6 flex items-center justify-center">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="6" x2="20" y2="6" className={`transition-all duration-300 origin-center ${isMobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
                    <line x1="4" y1="12" x2="20" y2="12" className={`transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                    <line x1="4" y1="18" x2="20" y2="18" className={`transition-all duration-300 origin-center ${isMobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
                 </svg>
               </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div 
          className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl transition-all duration-300 origin-top overflow-hidden ${
            isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col p-4 gap-2">
            {navItems.map((item) => {
               const isActive = location.pathname === item.path;
               return (
                <button
                  key={item.label}
                   onClick={() => {
                     if ((item as any).external) {
                        window.location.href = item.path;
                     } else {
                        handleNavigation(item.path);
                     }
                   }}
                   className={`w-full text-left px-6 py-4 rounded-xl transition-all cursor-pointer font-bold text-lg flex items-center justify-between ${
                     isActive 
                       ? 'bg-blue-50 text-blue-600' 
                       : 'text-slate-600 hover:bg-slate-50'
                   }`}
                >
                  {item.label}
                  {isActive && <span className="text-blue-500">●</span>}
                </button>
               );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default ProfessionalNavbar;
