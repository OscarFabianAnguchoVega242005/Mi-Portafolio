export function scrollToSection(href: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const element = document.querySelector(href);
  if (!element) return;

  const headerHeight = 56; // h-14 = 56px
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - headerHeight - 16;

  window.scrollTo({
    top: offsetPosition,
    behavior: reduce ? 'auto' : 'smooth',
  });
}