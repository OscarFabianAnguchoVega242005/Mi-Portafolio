export function scrollToSection(href: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const element = document.querySelector(href);
  if (!element) return;

  const headerHeight = 72; // h-18 = 72px
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - headerHeight - 16; // 16px extra padding

  window.scrollTo({
    top: offsetPosition,
    behavior: reduce ? 'auto' : 'smooth',
  });
}