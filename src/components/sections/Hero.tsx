'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { personalInfo } from '../../data/personal';
import { Button } from '../ui/Button';
import { SocialIcon } from '../ui/Icons';
import { scrollToSection } from '../../utils/scroll';

export function Hero() {
  const reduceMotion = useReducedMotion();

  const socials = Object.entries(personalInfo.socialLinks).filter(([, url]) => url);

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative min-h-screen flex items-center overflow-hidden bg-neutral-950"
    >
      <div className="absolute -top-32 right-0 w-[520px] h-[520px] rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />

      <div className="container relative z-10 px-6 pt-20 pb-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <p className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Disponible para nuevos proyectos
          </p>

          <h1 id="hero-title" className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4">
            {personalInfo.name}
          </h1>

          <p className="text-2xl md:text-3xl font-medium text-primary mb-5">{personalInfo.title}</p>

          <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mb-10">
            {personalInfo.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button size="lg" className="w-full sm:w-auto" onClick={() => scrollToSection('#projects')}>
              Ver proyectos
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => scrollToSection('#contact')}>
              Contactar
            </Button>
          </div>

          <div className="flex items-center gap-3">
            {Object.entries(personalInfo.socialLinks).filter(([, url]) => url).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={key}
                className="w-11 h-11 rounded-lg border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-primary hover:border-primary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <SocialIcon name={key} />
              </a>
            ))}
          </div>
        </motion.div>

        <dl className="mt-16 grid sm:grid-cols-3 gap-6 max-w-3xl border-t border-neutral-800 pt-8">
          {personalInfo.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-sm text-neutral-500 mb-1">{fact.label}</dt>
              <dd className="font-medium text-white">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <button
        type="button"
        onClick={() => scrollToSection('#about')}
        aria-label="Ir a la siguiente sección"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex w-11 h-11 items-center justify-center rounded-full border border-neutral-800 text-neutral-500 hover:text-primary hover:border-primary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </section>
  );
}