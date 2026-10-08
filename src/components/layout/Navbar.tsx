'use client';

import { useState, useEffect } from 'react';
import { Navbar as BsNavbar, Nav, NavDropdown, Container, Navbar } from 'react-bootstrap';
import { useScrollPosition } from '../../hooks';
import { cn } from '../../utils/helpers';
import { navItems } from '../../data/personal';

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
      const headerHeight = 72;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight - 16;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <BsNavbar
      id="top"
      fixed="top"
      expand="lg"
      className={cn(
        'transition-all duration-300 h-16',
        isScrolled
          ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50'
          : 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md'
      )}
    >
      <Container fluid className="px-4 h-full">
        {/* Logo - siempre visible */}
        <BsNavbar.Brand
          href="#home"
          className="text-xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent flex-shrink-0"
          aria-label="Ir al inicio"
        >
          Oscar Angucho
        </BsNavbar.Brand>

        {/* Mobile toggler */}
        <BsNavbar.Toggle
          aria-controls="navbar-nav"
          className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 touch-manipulation"
        />

        {/* Collapsible nav */}
        <BsNavbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="gap-6 md:gap-6" activeKey={activeSection}>
            {navItems.map((item) => (
              <Nav.Link
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={cn(
                  'text-sm font-medium transition-colors relative pb-1 touch-manipulation',
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
              </Nav.Link>
            ))}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}