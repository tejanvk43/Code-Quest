import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';

interface BubbleMenuProps {
  items: { label: string; path: string }[];
}

const BubbleMenu: React.FC<BubbleMenuProps> = ({ items }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(itemsRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'back.out(1.7)',
        pointerEvents: 'auto'
      });
      gsap.to(menuRef.current, { rotation: 45, duration: 0.3 });
    } else {
      gsap.to(itemsRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        pointerEvents: 'none'
      });
      gsap.to(menuRef.current, { rotation: 0, duration: 0.3 });
    }
  }, [isOpen]);

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0); // Ensure top of page
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] md:hidden flex flex-col items-end gap-4 font-sans">
      {/* Menu Items (Popup) */}
      <div 
        ref={itemsRef} 
        className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col gap-1 min-w-[180px] origin-bottom-right opacity-0 scale-50 pointer-events-none mb-2 border border-slate-100"
      >
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => handleNavigation(item.path)}
              className={`w-full text-center px-4 py-3 rounded-xl transition-all cursor-pointer font-medium text-sm ${
                isActive 
                  ? 'bg-blue-50 text-blue-600 font-bold' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Floating Buttons Container */}
      <div className="flex flex-col gap-4 items-center">
        {/* Logo/Secondary Action Circle */}
        <div 
           ref={logoRef}
           className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer border border-slate-100 hover:scale-110 transition-transform active:scale-95"
           onClick={() => handleNavigation('/')}
        >
           <img src="/assets/college_logo.png" alt="Logo" className="w-8 h-8 object-contain" />
        </div>

        {/* Hamburger/Close Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-slate-900 rounded-full shadow-2xl flex items-center justify-center text-white hover:bg-slate-800 transition-colors cursor-pointer active:scale-95"
        >
           <div ref={menuRef} className="flex items-center justify-center">
             {/* Simple Plus / X Icon */}
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
             </svg>
           </div>
        </button>
      </div>
    </div>
  );
};

export default BubbleMenu;
