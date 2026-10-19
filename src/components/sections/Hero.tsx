'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { personalInfo } from '../../data/personal';
import { Button } from '../ui/Button';
import { SocialIcon } from '../ui/Icons';
import { SnakeTitle } from '../ui/SnakeTitle';
import { scrollToSection } from '../../utils/scroll';

export function Hero() {
  const reduceMotion = useReducedMotion();

  const socials = Object.entries(personalInfo.socialLinks).filter(([, url]) => url);

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Velo suave a la izquierda para leer el texto; el fondo 3D vive en ThreeBackground */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-[#07010F]/55 via-[#07010F]/20 to-transparent"
      />

      <div className="container relative z-10 px-4 sm:px-6 pt-24 pb-28">
        {/* Único momento de animación de la página: entrada del Hero */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <p className="inline-flex items-center gap-2 mb-12 px-5 py-2.5 rounded-full bg-neon-cyan/10 text-neon-cyan text-sm font-semibold border border-neon-cyan/30 backdrop-blur-sm shadow-[0_0_18px_rgba(0,240,255,0.25)]">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan" />
            </span>
            Disponible para nuevos proyectos
          </p>

          <h1 id="hero-title" className="mb-8">
            <span className="sr-only">{personalInfo.name}</span>
            <SnakeTitle text={personalInfo.name} className="w-[17rem] sm:w-[20rem] md:w-[27rem] lg:w-[35rem] max-w-full" />
          </h1>

          <div className="border-l-[3px] border-neon-pink pl-5 mb-10">
            <p className="text-2xl md:text-3xl font-bold text-neon-cyan mb-3 [text-shadow:0_0_14px_rgba(25,227,255,0.4)]">
              {personalInfo.title}
            </p>

            <p className="text-lg md:text-xl text-neutral-200 max-w-xl leading-relaxed [text-shadow:0_1px_4px_rgba(7,1,15,0.9)]">
              {personalInfo.subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button
              type="button"
              onClick={() => scrollToSection('#projects')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-lg font-bold text-[#07010F] bg-neon-cyan shadow-[0_0_24px_rgba(25,227,255,0.45)] hover:bg-white hover:shadow-[0_0_36px_rgba(25,227,255,0.8)] transition-all touch-manipulation"
            >
              Ver proyectos
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('#contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-lg font-bold text-neon-cyan bg-[#0A0314]/60 backdrop-blur-sm border-2 border-neon-cyan shadow-[0_0_18px_rgba(25,227,255,0.3)] hover:bg-neon-cyan hover:text-[#07010F] hover:shadow-[0_0_30px_rgba(25,227,255,0.6)] transition-all touch-manipulation"
            >
              Contactar
            </button>
          </div>

          <div className="flex items-center gap-3">
            {socials.map(([key, url]) => (
              <button
                key={key}
                onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
                aria-label={key}
                className="w-11 h-11 rounded-xl border border-white/15 bg-[#0A0314]/70 backdrop-blur-sm flex items-center justify-center text-neutral-300 hover:text-neon-cyan hover:border-neon-cyan hover:shadow-[0_0_18px_rgba(0,240,255,0.45)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan touch-manipulation"
              >
                <SocialIcon name={key} />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Datos reales en lugar de cifras de relleno */}
        <dl className="mt-16 grid sm:grid-cols-3 gap-6 max-w-3xl">
          {personalInfo.facts.map((fact) => (
            <div key={fact.label} className="border-l-2 border-neon-cyan/40 pl-4">
              <dt className="text-sm text-neutral-400 mb-1">{fact.label}</dt>
              <dd className="text-lg font-semibold text-white">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <button
        type="button"
        onClick={() => scrollToSection('#about')}
        aria-label="Ir a la siguiente sección"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex w-11 h-11 items-center justify-center rounded-full border border-white/15 bg-[#0A0314]/70 backdrop-blur-sm text-neutral-300 hover:text-neon-cyan hover:border-neon-cyan hover:shadow-[0_0_18px_rgba(0,240,255,0.45)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan touch-manipulation"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </section>
  );
}

export default Hero;