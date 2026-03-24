import React, { useState, useRef, useEffect } from 'react';

interface NavbarProps {
  onReset: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onReset }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);

    if (targetId === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <nav className="phantom-glass shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <a href="#" onClick={(e) => handleNavClick(e, '#')} className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-primary">
            Authentic Food Recipes
          </a>
          
          <div className="flex items-center space-x-4">
            {/* Desktop Links & New Controls */}
            <div className="hidden md:flex items-center space-x-8">
               <a href="mailto:ma3034756@gmail.com" className="text-slate-600 hover:text-brand-teal font-medium transition-colors">Contact</a>
            </div>

            <div className="relative hidden md:block" ref={dropdownRef}>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="p-2 rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-teal transition-colors" aria-label="More options">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                </button>
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 phantom-panel rounded-xl shadow-lg py-2 z-50 border border-slate-200 bg-white">
                        <a href="#" onClick={(e) => handleNavClick(e, '#')} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors">Home</a>
                        <a href="#generator" onClick={(e) => handleNavClick(e, '#generator')} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors">Generator</a>
                    </div>
                )}
            </div>

            <button onClick={onReset} className="p-2 rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-teal transition-colors" aria-label="Refresh page">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 11a8.1 8.1 0 00-15.5-2m-.5-4v4h4M4 13a8.1 8.1 0 0015.5 2m.5 4v-4h-4" />
                </svg>
            </button>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu" className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden pb-4 px-4 space-y-2 phantom-panel border-t border-slate-200 bg-white">
          <a href="#" onClick={(e) => handleNavClick(e, '#')} className="block text-slate-700 hover:text-brand-teal font-medium py-2 transition-colors">Home</a>
          <a href="#generator" onClick={(e) => handleNavClick(e, '#generator')} className="block text-slate-700 hover:text-brand-teal font-medium py-2 transition-colors">Generator</a>
          <a href="mailto:ma3034756@gmail.com" className="block text-slate-700 hover:text-brand-teal font-medium py-2 transition-colors">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
