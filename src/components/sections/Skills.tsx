import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { CheckIcon } from '../ui/Icons';
import { scrollToSection } from '../../utils/scroll';

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
      return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
    case 'Intermedio':
      return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
    case 'Básico':
      return 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    case 'Aprendiendo':
      return 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800';
    default:
      return 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
  }
}

export function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="py-24 md:py-32 bg-white dark:bg-slate-950"
    >
      <div className="container px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <SectionHeader
            title="Habilidades"
            subtitle="Las tecnologías que uso a diario y las que estoy aprendiendo."
          />
        </motion.div>

        <div className="space-y-0">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: catIndex * 0.08, ease: 'easeOut' }}
              className="border-t border-slate-200 dark:border-slate-800 first:border-0 pt-8 first:pt-0"
            >
              <div className="grid md:grid-cols-[12rem_1fr] gap-6 items-start">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white md:pr-4">
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
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left"
        >
          <p className="text-slate-600 dark:text-slate-400 max-w-md">
            ¿Necesitas algo que no ves aquí? Aprendo rápido.
          </p>
          <Button variant="outline" onClick={() => scrollToSection('#contact')}>
            Hablemos de tu proyecto
            <CheckIcon className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}