'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { personalInfo } from '../../data/personal';
import { Button } from '../ui/Button';
import { DownloadIcon, CheckIcon } from '../ui/Icons';
import { SectionHeader } from '../ui/SectionHeader';

export function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" aria-labelledby="about-title" className="py-24 md:py-32 bg-transparent">
      <div className="container px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2
            id="about-title"
            className="nx-title [--t:#FFD166] [--g:#FFC83D] text-5xl md:text-7xl font-extrabold leading-none tracking-[-0.03em] mb-5"
          >
            Sobre mí
          </h2>
          <p className="text-lg md:text-xl font-semibold text-neutral-300">
            Desarrollador Full Stack Junior
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="nx-glass p-6 md:p-8 border-l-[3px] border-l-neon-gold/70">
              <div className="prose dark:prose-invert max-w-none space-y-6">
                {personalInfo.bio.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-neutral-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {['Flutter', 'Dart', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Supabase', 'Git'].map((tech) => (
                <span key={tech} className="px-3.5 py-1.5 bg-neon-cyan/10 text-neon-cyan text-sm font-semibold rounded-full border border-neon-cyan/30 shadow-[0_0_12px_rgba(0,240,255,0.12)]">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="/Oscar_Angucho_HV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-neon-cyan text-neon-cyan font-bold rounded-xl shadow-[0_0_18px_rgba(0,240,255,0.25)] hover:bg-neon-cyan hover:text-[#07010F] hover:shadow-[0_0_28px_rgba(0,240,255,0.6)] transition-all touch-manipulation"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Descargar CV
                </a>
                <a
                  href="https://github.com/OscarFabianAnguchoVega242005?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neon-cyan hover:text-white underline underline-offset-4 decoration-neon-cyan/40 hover:decoration-white font-semibold transition-colors"
                >
                  Ver repositorios
                </a>
              </div>

              <h3 className="text-xl font-bold text-white">Cómo trabajo</h3>
              <ul className="space-y-3">
                {personalInfo.workStyle.map((item, i) => (
                  <li key={i} className="nx-glass flex items-start gap-3 p-4 text-neutral-300 !rounded-xl">
                    <span className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-neon-cyan/15 border border-neon-cyan/40 flex items-center justify-center text-neon-cyan">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-white pt-4">Aprendiendo ahora</h3>
              <div className="flex flex-wrap gap-2">
                {personalInfo.learning.map((tech) => (
                  <span key={tech} className="px-3.5 py-1.5 bg-neon-gold/10 text-neon-gold text-sm font-semibold rounded-full border border-neon-gold/30 shadow-[0_0_12px_rgba(255,215,0,0.12)]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}