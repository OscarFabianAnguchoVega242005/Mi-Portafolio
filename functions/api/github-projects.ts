import { GitHubRepo, Project } from '../../src/data/projects';

interface Env {
  GITHUB_TOKEN?: string;
}

function mapRepoToProject(repo: GitHubRepo): Project {
  const language = repo.language || 'Unknown';
  const topics = repo.topics || [];
  
  const techSet = new Set<string>();
  if (language) techSet.add(language);
  topics.forEach(t => techSet.add(t));
  
  const technologies = Array.from(techSet).slice(0, 8);
  
  let category: Project['category'] = 'frontend';
  const nameLower = repo.name.toLowerCase();
  const descLower = (repo.description || '').toLowerCase();
  
  if (topics.includes('flutter') || topics.includes('dart') || language === 'Dart' || 
      nameLower.includes('flutter') || nameLower.includes('mobile') || nameLower.includes('app')) {
    category = 'mobile';
  } else if (topics.includes('backend') || topics.includes('api') || topics.includes('server') ||
             topics.includes('node') || topics.includes('express') || topics.includes('nestjs') ||
             descLower.includes('backend') || descLower.includes('api') || descLower.includes('servidor')) {
    category = 'backend';
  } else if (topics.includes('fullstack') || topics.includes('full-stack') ||
             (technologies.some(t => ['node', 'express', 'python', 'django', 'php', 'laravel', 'java', 'spring'].includes(t.toLowerCase())) &&
              technologies.some(t => ['react', 'vue', 'angular', 'html', 'css', 'javascript', 'typescript'].includes(t.toLowerCase())))) {
    category = 'fullstack';
  }
  
  const featured = repo.stargazers_count > 0 || 
                   topics.includes('featured') || 
                   ['tienda', 'aura', 'dulce', 'umbral'].some(kw => nameLower.includes(kw));
  
  const shortDescription = repo.description 
    ? (repo.description.length > 100 ? repo.description.slice(0, 100) + '...' : repo.description)
    : `Proyecto ${repo.name} - ${language}`;
  
  const description = repo.description 
    ? `${repo.description}. Desarrollado con ${technologies.join(', ')}.`
    : `Proyecto ${repo.name} desarrollado con ${technologies.join(', ')}.`;
  
  return {
    id: repo.id.toString(),
    title: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description,
    shortDescription,
    technologies,
    image: `/projects/${repo.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`,
    githubUrl: repo.html_url,
    liveUrl: repo.homepage || undefined,
    featured,
    category,
  };
}

export async function onRequestGet(context: { request: Request; env: Env }) {
  const GITHUB_USERNAME = 'OscarFabianAnguchoVega242005';
  const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
  
  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-App',
    };
    
    if (context.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${context.env.GITHUB_TOKEN}`;
    }
    
    const response = await fetch(`${GITHUB_API}?sort=updated&per_page=100&type=public`, {
      headers,
      cf: { cacheTtl: 300, cacheEverything: true },
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('GitHub API error:', response.status, error);
      
      if (response.status === 403) {
        return new Response(JSON.stringify({ 
          error: 'GitHub API rate limit exceeded. Add GITHUB_TOKEN to increase limit.' 
        }), { 
          status: 429,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      return new Response(JSON.stringify({ error: 'Failed to fetch repos' }), { 
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const repos: GitHubRepo[] = await response.json();
    
    const projects = repos
      .filter(repo => !repo.fork && !repo.private)
      .map(mapRepoToProject)
      .sort((a, b) => {
        if (a.featured !== b.featured) return b.featured ? 1 : -1;
        return 0;
      });
    
    return new Response(JSON.stringify({ projects, total: projects.length, source: 'github-api' }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
        'Access-Control-Allow-Origin': '*',
      },
    });
    
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}