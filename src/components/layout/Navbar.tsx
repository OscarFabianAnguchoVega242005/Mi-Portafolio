'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navItems } from '../../data/personal';
import { scrollToSection } from '../../utils/scroll';

export function NavbarComponent() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    scrollToSection(href);
  };

  return (
    <motion.header
      id="top"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07010F]/85 backdrop-blur-xl border-b border-neon-pink/25 shadow-[0_10px_30px_-14px_rgba(255,43,214,0.45)]'
          : 'bg-gradient-to-b from-[#07010F]/80 to-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4" aria-label="Navegación principal">
        <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:justify-between h-14 md:h-auto py-3 md:py-0">
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="font-display text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#00F0FF] to-[#FF2BD6] bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(255,43,214,0.35)]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Inicio"
          >
            Oscar Angucho
          </motion.button>

          <div className="flex items-center justify-center gap-2 md:gap-1 overflow-x-auto pb-2 scrollbar-hide w-full -mx-4 px-4 md:mx-0 md:pb-0 flex-nowrap">
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="flex-shrink-0 text-sm font-semibold text-neutral-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-full transition-colors relative group whitespace-nowrap"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {item.label}
                <span className="absolute bottom-0.5 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#FF2BD6] shadow-[0_0_8px_rgba(0,240,255,0.8)] scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300" />
              </motion.button>
            ))}
          </div>
        </div>
      </nav>
    </motion.header>
  );
}