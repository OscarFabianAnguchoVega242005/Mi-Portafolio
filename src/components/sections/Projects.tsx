import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { projects, type Project } from '../../data/projects';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { cn } from '../../utils/helpers';
import { useGitHubProjects } from '../../hooks';
import { GithubIcon, ExternalLinkIcon } from '../ui/Icons';

const categoryLabels: Record<string, string> = {
  all: 'Todos',
  fullstack: 'Full Stack',
  frontend: 'Frontend',
  backend: 'Backend',
  mobile: 'Móvil',
};

const categories = ['all', 'fullstack', 'frontend', 'backend', 'mobile'] as const;

export function Projects() {
  const reduceMotion = useReducedMotion();
  const { projects: githubProjects, loading, error } = useGitHubProjects();
  const [activeCategory, setActiveCategory] = useState<'all' | Project['category']>('all');

  // Usar proyectos de GitHub si están cargados, sino los de ejemplo
  const allProjects = loading || error ? projects : githubProjects.length > 0 ? githubProjects : projects;
  const filteredProjects = activeCategory === 'all'
    ? allProjects
    : allProjects.filter(p => p.category === activeCategory);

  if (loading) {
    return (
      <section id="projects" className="py-24 md:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Proyectos
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Cargando proyectos desde GitHub...
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <ProjectCardSkeleton key={i} />)}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-24 md:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="container px-6">
          <div className="max-w-md mx-auto text-center p-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <svg className="w-12 h-12 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">Error al cargar proyectos</h3>
            <p className="text-red-600 dark:text-red-400 text-sm mb-4">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Reintentar
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 md:py-32 bg-slate-50 dark:bg-slate-900">
      <div className="container px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            Proyectos
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {allProjects.length} proyectos públicos de mi GitHub, actualizados automáticamente.
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="flex flex-wrap justify-center gap-3 mb-12"
          role="tablist"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat as any)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200',
                'border border-slate-200 dark:border-slate-700',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                activeCategory === cat
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-primary hover:border-primary/50'
              )}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </motion.div>

        {/* Grid de proyectos */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-600 dark:text-slate-400">No hay proyectos en esta categoría.</p>
            </div>
          ) : (
            filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          )}
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/OscarFabianAnguchoVega242005?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Ver todos en GitHub
            <ExternalLinkIcon className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduceMotion = useReducedMotion();
  const initial = project.title.charAt(0).toUpperCase();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
    >
      <Card
        className={cn(
          'flex flex-col h-full',
          'bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800',
          'hover:border-primary/50 dark:hover:border-primary/50',
          'hover:-translate-y-1 transition-all duration-200'
        )}
      >
        <CardHeader className="p-0 relative">
          <div className="aspect-[16/10] flex items-center justify-center bg-primary/5 dark:bg-primary/10 text-primary text-4xl font-bold select-none">
            {initial}
          </div>
        </CardHeader>

        <CardContent className="p-5 flex-1 flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{project.title}</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-1">{project.shortDescription}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies.slice(0, 6).map((tech) => (
              <span key={tech} className="px-2.5 py-1 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {tech}
              </span>
            ))}
            {project.technologies.length > 6 && (
              <span className="px-2.5 py-1 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-500">
                +{project.technologies.length - 6}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 flex gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="outline" size="sm" className="w-full justify-center gap-1.5">
              <GithubIcon className="w-4 h-4" />
              <span>Código</span>
            </Button>
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="primary" size="sm" className="w-full justify-center gap-1.5">
                <ExternalLinkIcon className="w-4 h-4" />
                <span>Demo</span>
              </Button>
            </a>
          )}
        </CardFooter>
      </Card>
    </motion.article>
  );
}

function ProjectCardSkeleton() {
  return (
    <Card className="flex flex-col h-full bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 animate-pulse">
      <CardHeader className="p-0">
        <div className="aspect-[16/10] bg-slate-200 dark:bg-slate-800" />
      </CardHeader>
      <CardContent className="p-5 space-y-3">
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-6 bg-slate-200 dark:bg-slate-800 rounded px-3" />
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 flex gap-3">
        <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded flex-1" />
        <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded flex-1" />
      </CardFooter>
    </Card>
  );
}