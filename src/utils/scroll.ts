export function scrollToSection(href: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelector(href)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
}