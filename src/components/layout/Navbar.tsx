'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '../../data/personal';
import { useScrollPosition } from '../../hooks';
import { scrollToSection } from '../../utils/scroll';
import { cn } from '../../utils/helpers';
import { MenuIcon, CloseIcon } from '../ui/Icons';
import { Button } from '../ui/Button';

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

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      id="top"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-6" aria-label="Navegación principal">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between h-18 md:h-auto md:py-4 gap-4">
          {/* Logo + Nav móvil fijo */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="text-xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent"
              aria-label="Ir al inicio"
            >
              Oscar Angucho
            </a>

            {/* Nav visible en móvil y desktop */}
            <div className="flex flex-wrap items-center gap-2 md:gap-4 w-full md:w-auto justify-center md:justify-end">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={cn(
                    'text-sm font-medium transition-colors relative pb-1 px-3 py-2 rounded-lg touch-manipulation',
                    activeSection === item.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800'
                  )}
                  whileHover={{ y: -1 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contactar button */}
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleNavClick('#contact')}
            className="md:hidden w-full md:w-auto touch-manipulation"
          >
            Contactar
          </Button>
        </div>
      </nav>
    </motion.header>
  );
}