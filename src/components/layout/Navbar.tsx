'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '../../data/personal';
import { useScrollPosition } from '../../hooks';
import { cn } from '../../utils/helpers';
import { MenuIcon, CloseIcon } from '../ui/Icons';

export function NavbarComponent() {
  const [isScrolled, setIsScrolled] = useState(false);
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
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = 64;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight - 16;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.header
      id="top"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-14',
        isScrolled
          ? 'bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/50'
          : 'bg-neutral-950/80 backdrop-blur-md'
      )}
    >
      <nav className="container mx-auto px-4 h-full" aria-label="Navegación principal">
        <div className="flex items-center justify-between h-full gap-4">
          {/* Logo + Nav en una sola fila que se ajusta */}
          <div className="flex items-center justify-between w-full gap-4 flex-wrap">
            {/* Logo - siempre visible */}
            <a
              href="#home"
              className="text-xl font-bold bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent flex-shrink-0"
              aria-label="Ir al inicio"
            >
              Oscar Angucho
            </a>

            {/* Nav links - SIEMPRE visibles, se ajustan con flex-wrap */}
            <div className="flex flex-wrap items-center gap-2 md:gap-4 w-full md:w-auto justify-center md:justify-end">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className={cn(
                    'text-sm font-medium transition-colors relative pb-1 px-3 py-2 rounded-lg touch-manipulation whitespace-nowrap',
                    activeSection === item.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-neutral-400 hover:text-primary hover:bg-neutral-800/50'
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}