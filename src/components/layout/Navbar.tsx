'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '../../data/personal';

export function NavbarComponent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
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
      <nav className="max-w-7xl mx-auto px-6" aria-label="Navegación principal">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="font-display text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#00F0FF] to-[#FF2BD6] bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(255,43,214,0.35)]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Oscar Angucho
          </motion.button>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-semibold text-neutral-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-full transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item.label}
                <span className="absolute bottom-0.5 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#FF2BD6] shadow-[0_0_8px_rgba(0,240,255,0.8)] scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300" />
              </motion.button>
            ))}
          </div>

          <button
            className="md:hidden p-2.5 rounded-xl border border-white/10 bg-white/5 text-neutral-200 hover:text-neon-cyan hover:border-neon-cyan/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-[#07010F]/95 backdrop-blur-xl border-t border-neon-pink/20 rounded-b-2xl"
            >
              <div className="py-4 space-y-1 px-2">
                {navItems.map((item) => (
                  <motion.button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className="w-full text-left px-4 py-3 font-semibold text-neutral-200 border-l-2 border-transparent hover:border-neon-cyan hover:text-neon-cyan hover:bg-white/5 rounded-r-lg transition-colors"
                    layout
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}