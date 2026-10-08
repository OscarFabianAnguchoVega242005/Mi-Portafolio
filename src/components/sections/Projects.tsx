'use client';

import { motion, useReducedMotion } from 'framer-motion';
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

  const allProjects = loading || error ? projects : githubProjects.length > 0 ? githubProjects : projects;
  const filteredProjects = allProjects;

  if (loading) {
    return (
      <section id="projects" className="py-24 md:py-32 bg-neutral-950">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Proyectos
            </h2>
            <p className="text-lg text-neutral-400">
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
      <section id="projects" className="py-24 md:py-32 bg-neutral-950">
        <div className="container px-6">
          <div className="max-w-md mx-auto text-center p-8 bg-red/10 border border-red/20 rounded-xl">
            <svg className="w-12 h-12 mx-auto text-red mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-semibold text-red mb-2">Error al cargar proyectos</h3>
            <p className="text-red/80 text-sm mb-4">{error}</p>
            <button className="btn btn-outline mt-4" onClick={() => window.location.reload()}>
              Reintentar
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 md:py-32 bg-neutral-950">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Proyectos
          </h2>
          <p className="text-lg text-neutral-400">
            {projects.length} proyectos públicos de mi GitHub, actualizados automáticamente.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
    >
      <Card className="flex flex-col h-full">
        <CardHeader className="p-0 relative">
          <div className="aspect-[16/10] flex items-center justify-center bg-primary/5 text-primary text-4xl font-bold select-none">
            {initial}
          </div>
        </CardHeader>

        <CardContent className="p-5 flex-1 flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          <p className="text-neutral-400 text-sm leading-relaxed flex-1">{project.shortDescription}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies.slice(0, 6).map((tech) => (
              <span key={tech} className="px-2.5 py-1 text-xs font-medium rounded-md border border-neutral-700 bg-neutral-800 text-neutral-400">
                {tech}
              </span>
            ))}
            {project.technologies.length > 6 && (
              <span className="px-2.5 py-1 text-xs font-medium rounded-md border border-neutral-700 bg-neutral-800 text-neutral-500">
                +{project.technologies.length - 6}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 flex gap-3">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="outline" size="sm" className="w-full justify-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              Código
            </Button>
          </a>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="primary" size="sm" className="w-full justify-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Demo
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
    <Card className="flex flex-col h-full bg-neutral-900 border border-neutral-800 animate-pulse">
      <CardHeader className="p-0">
        <div className="aspect-[16/10] bg-neutral-800" />
      </CardHeader>
      <CardContent className="p-5 space-y-3">
        <div className="h-6 bg-neutral-800 rounded w-3/4" />
        <div className="h-4 bg-neutral-800 rounded w-full" />
        <div className="h-4 bg-neutral-800 rounded w-5/6" />
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-6 bg-neutral-800 rounded px-3" />
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 flex gap-3">
        <div className="h-9 bg-neutral-800 rounded flex-1" />
        <div className="h-9 bg-neutral-800 rounded flex-1" />
      </CardFooter>
    </Card>
  );
}