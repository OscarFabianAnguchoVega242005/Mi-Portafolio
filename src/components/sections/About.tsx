'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { personalInfo } from '../../data/personal';
import { Button } from '../ui/Button';
import { DownloadIcon, CheckIcon } from '../ui/Icons';
import { SectionHeader } from '../ui/SectionHeader';

export function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" aria-labelledby="about-title" className="py-24 md:py-32 bg-neutral-900">
      <div className="container px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Sobre mí
          </h2>
          <p className="text-lg md:text-xl text-neutral-400">
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
            <div className="prose dark:prose-invert max-w-none space-y-6">
              {personalInfo.bio.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-neutral-400 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {['Flutter', 'Dart', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Supabase', 'Git'].map((tech) => (
                <span key={tech} className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20">
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
              <div className="flex items-center gap-3">
                <a
                  href="/Oscar_Angucho_HV.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors gap-2"
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
                  className="text-sm text-primary hover:underline font-medium"
                >
                  Ver repositorios
                </a>
              </div>

              <h3 className="text-xl font-semibold text-white">Cómo trabajo</h3>
              <ul className="space-y-4">
                {personalInfo.workStyle.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-400">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-white pt-4">Aprendiendo ahora</h3>
              <div className="flex flex-wrap gap-2">
                {personalInfo.learning.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 bg-red/10 text-red text-sm font-medium rounded-full border border-red/20">
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