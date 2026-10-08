import { personalInfo } from '../../data/personal';
import { navItems } from '../../data/personal';
import { GithubIcon } from '../ui/Icons';
import { scrollToSection } from '../../utils/scroll';

export function Footer() {
  const handleNavClick = (href: string) => {
    scrollToSection(href);
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-10 bg-white dark:bg-slate-950">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <strong className="text-slate-900 dark:text-white">Oscar Angucho</strong>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} Oscar Fabián Angucho Vega.
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:inline">
              Hecho con React, TypeScript y Tailwind CSS.
            </span>
          </div>

          <ul className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-slate-500 dark:text-slate-400">
            {navItems.slice(0, -1).map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary hover:border-primary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}