'use client';

import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Project } from '../../data/projects';
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

/* Colores de neón que se alternan entre tarjetas */
const cardAccents = ['#FF2BD6', '#19E3FF', '#FFC83D'];

const sectionClass = 'py-24 md:py-32 bg-transparent';
const titleClass = 'nx-title [--t:#6CF3FF] [--g:#19E3FF] text-5xl md:text-7xl font-extrabold leading-none tracking-[-0.03em] mb-5';

export function Projects() {
  const reduceMotion = useReducedMotion();
  const { projects: githubProjects, loading, error } = useGitHubProjects();

  // Solo usa datos de la API; si falla muestra error (no fallback hardcodeado)
  const allProjects = githubProjects;

  if (loading) {
    return (
      <section id="projects" className={sectionClass}>
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className={titleClass}>
              Proyectos
            </h2>
            <p className="text-lg text-neutral-300">
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
      <section id="projects" className={sectionClass}>
        <div className="container px-6">
          <div className="max-w-md mx-auto text-center p-8 bg-neon-red/10 border border-neon-red/30 rounded-2xl shadow-[0_0_28px_rgba(255,77,109,0.18)] backdrop-blur-sm">
            <svg className="w-12 h-12 mx-auto text-neon-red mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-semibold text-neon-red mb-2">Error al cargar proyectos</h3>
            <p className="text-neon-red/80 text-sm mb-4">{error}</p>
            <button className="btn btn-outline mt-4" onClick={() => window.location.reload()}>
              Reintentar
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className={sectionClass}>
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className={titleClass}>
            Proyectos
          </h2>
          <p className="text-lg text-neutral-300">
            {allProjects.length} proyectos públicos de mi GitHub, actualizados automáticamente.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {allProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="mt-14 text-center"
        >
          <a
            href="https://github.com/OscarFabianAnguchoVega242005?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neon-cyan/60 bg-[#0A0314]/70 backdrop-blur-sm text-neon-cyan font-bold shadow-[0_0_16px_rgba(0,240,255,0.25)] hover:bg-neon-cyan hover:text-[#07010F] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all"
          >
            Ver todos en GitHub
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduceMotion = useReducedMotion();
  const initial = project.title.charAt(0).toUpperCase();
  const accent = cardAccents[index % cardAccents.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
    >
      <div className="nx-card group flex flex-col h-full" style={{ '--c': accent } as CSSProperties}>
        <div
          className="relative aspect-[16/10] flex items-center justify-center font-display text-7xl font-extrabold select-none text-[var(--c)] [text-shadow:0_0_28px_var(--c)] bg-[radial-gradient(circle_at_50%_40%,color-mix(in_srgb,var(--c)_22%,transparent),transparent_70%)] border-b border-[color-mix(in_srgb,var(--c)_30%,transparent)]"
        >
          {initial}
        </div>

        <div className="p-5 flex-1 flex flex-col gap-3">
          <h3 className="text-xl font-bold leading-tight text-[var(--c)] [text-shadow:0_0_16px_color-mix(in_srgb,var(--c)_40%,transparent)]">{project.title}</h3>
          <p className="text-neutral-300 text-sm leading-relaxed flex-1">{project.shortDescription}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies.slice(0, 6).map((tech) => (
              <span key={tech} className="px-2.5 py-1 text-xs font-semibold rounded-full border border-white/10 bg-white/5 text-neutral-200">
                {tech}
              </span>
            ))}
            {project.technologies.length > 6 && (
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full border border-white/10 bg-white/5 text-neutral-400">
                +{project.technologies.length - 6}
              </span>
            )}
          </div>
        </div>

        <div className="p-5 pt-0 flex gap-3">
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
              <span className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold text-[#07010F] bg-neon-cyan shadow-[0_0_16px_rgba(25,227,255,0.4)] hover:bg-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Demo
              </span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectCardSkeleton() {
  return (
    <div className="nx-card group flex flex-col h-full animate-pulse">
      <div className="aspect-[16/10] bg-white/5" />
      <div className="p-5 space-y-3">
        <div className="h-6 bg-white/10 rounded w-3/4" />
        <div className="h-4 bg-white/10 rounded w-full" />
        <div className="h-4 bg-white/10 rounded w-5/6" />
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-6 bg-white/10 rounded-full px-3" />
          ))}
        </div>
      </div>
      <div className="p-5 pt-0 flex gap-3">
        <div className="h-9 bg-white/10 rounded flex-1" />
        <div className="h-9 bg-white/10 rounded flex-1" />
      </div>
    </div>
  );
}