import { motion, useReducedMotion } from 'framer-motion';
import { personalInfo } from '../../data/personal';
import { DownloadIcon, CheckIcon } from '../ui/Icons';
import { SectionHeader } from '../ui/SectionHeader';

export function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="py-24 md:py-32 bg-slate-50 dark:bg-slate-900"
    >
      <div className="container px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <SectionHeader
            title="Sobre mí"
            subtitle="Estudiante de Ingeniería Informática, fundador de Dev Pro Solutions y desarrollador Full Stack Junior."
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Texto */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="prose dark:prose-invert max-w-none space-y-6">
              {personalInfo.bio.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {[
                'Flutter',
                'Dart',
                'JavaScript',
                'TypeScript',
                'React',
                'Node.js',
                'PostgreSQL',
                'Supabase',
                'Git',
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Acciones y stack */}
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
                  download="Oscar_Angucho_CV.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  <DownloadIcon className="w-5 h-5" />
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

              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Cómo trabajo</h3>
              <ul className="space-y-4">
                {personalInfo.workStyle.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                    <CheckIcon className="flex-shrink-0 w-5 h-5 text-primary mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-white pt-4">Aprendiendo ahora</h3>
              <div className="flex flex-wrap gap-2">
                {personalInfo.learning.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-sm font-medium rounded-full border border-amber-200 dark:border-amber-800"
                  >
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