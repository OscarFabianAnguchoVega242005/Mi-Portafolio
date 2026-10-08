'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '../../data/personal';
import { useScrollPosition } from '../../hooks';
import { cn } from '../../utils/helpers';
import { MenuIcon, CloseIcon } from '../ui/Icons';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const scrollY = useScrollPosition();

  useEffect(() => {
    setIsScrolled(scrollY > 20);
  }, [scrollY]);

  // Scroll spy para enlace activo
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: '-45% 0px -50% 0px',
        threshold: 0.1,
      }
    );

    navItems.forEach((item) => {
      if (item.href !== '#home') {
        const element = document.getElementById(item.href.slice(1));
        if (element) observer.observe(element);
      }
    });

    const home = document.getElementById('home');
    if (home) observer.observe(home);

    return () => observer.disconnect();
  }, []);

  // Cerrar menú móvil al hacer click en un enlace (sin interferir con el href nativo)
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      id="top"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16',
        isScrolled
          ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50'
          : 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md'
      )}
    >
      <nav className="container mx-auto px-4 h-full" aria-label="Navegación principal">
        <div className="flex items-center justify-between h-full gap-4">
          {/* Logo - siempre visible */}
          <a
            href="#home"
            className="text-xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent flex-shrink-0"
            aria-label="Ir al inicio"
          >
            Oscar Angucho
          </a>

          {/* Desktop Nav - enlaces nativos */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors relative pb-1',
                  activeSection === item.href
                    ? 'text-primary'
                    : 'text-slate-600 dark:text-slate-400 hover:text-primary'
                )}
              >
                {item.label}
                <span
                  className={cn(
                    'absolute bottom-0 left-0 right-0 h-0.5 transition-transform duration-200',
                    activeSection === item.href
                      ? 'bg-primary scale-x-100 origin-center'
                      : 'bg-primary scale-x-0 origin-center'
                  )}
                />
              </a>
            ))}
          </div>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 touch-manipulation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir menú"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-4 shadow-lg"
            >
              <div className="container mx-auto px-4 space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={handleMobileLinkClick}
                    className={cn(
                      'block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors touch-manipulation',
                      activeSection === item.href
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800'
                    )}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}