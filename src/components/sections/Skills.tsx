'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { CheckIcon } from '../ui/Icons';

const skillCategories = [
  {
    name: 'Frontend y móvil',
    skills: [
      { name: 'Flutter', level: 'Intermedio' },
      { name: 'Dart', level: 'Intermedio' },
      { name: 'HTML5', level: 'Avanzado' },
      { name: 'CSS3', level: 'Avanzado' },
      { name: 'JavaScript', level: 'Intermedio' },
      { name: 'React', level: 'Básico' },
      { name: 'TypeScript', level: 'Básico' },
    ],
  },
  {
    name: 'Bases de datos',
    skills: [
      { name: 'Supabase', level: 'Intermedio' },
      { name: 'PostgreSQL', level: 'Intermedio' },
      { name: 'MySQL', level: 'Intermedio' },
    ],
  },
  {
    name: 'Herramientas',
    skills: [
      { name: 'Git', level: 'Intermedio' },
      { name: 'GitHub', level: 'Intermedio' },
      { name: 'Cloudflare Pages', level: 'Intermedio' },
      { name: 'Render', level: 'Intermedio' },
    ],
  },
  {
    name: 'Aprendiendo',
    skills: [
      { name: 'Node.js', level: 'Aprendiendo' },
      { name: 'Express', level: 'Aprendiendo' },
      { name: 'Docker', level: 'Aprendiendo' },
      { name: 'Linux', level: 'Aprendiendo' },
    ],
  },
] as const;

function getLevelColor(level: string) {
  switch (level) {
    case 'Avanzado':
      return 'bg-primary/20 text-primary border-primary/30';
    case 'Intermedio':
      return 'bg-primary/10 text-primary border-primary/20';
    case 'Básico':
      return 'bg-neutral-800 text-neutral-400 border-neutral-700';
    case 'Aprendiendo':
      return 'bg-red/10 text-red border-red/20';
    default:
      return 'bg-neutral-800 text-neutral-400 border-neutral-700';
  }
}

export function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="skills" aria-labelledby="skills-title" className="py-24 md:py-32 bg-neutral-950">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Habilidades
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
            Las tecnologías que uso a diario y las que estoy aprendiendo.
          </p>
        </motion.div>

        <div className="space-y-0">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: catIndex * 0.08, ease: 'easeOut' }}
              className="border-t border-neutral-800 first:border-0 pt-8 first:pt-0"
            >
              <div className="grid md:grid-cols-[12rem_1fr] gap-6 items-start">
                <h3 className="text-lg font-semibold text-white md:pr-4">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border font-medium text-sm ${getLevelColor(skill.level)}`}
                    >
                      {skill.name}
                      <span className="text-xs font-normal opacity-75">{skill.level}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left"
        >
          <p className="text-neutral-500 max-w-md">
            ¿Buscas algo específico? Estoy en constante aprendizaje. Si necesitas una tecnología que no ves aquí, ¡probablemente pueda aprenderla rápido!
          </p>
          <Button variant="outline" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Hablemos de tu proyecto
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}