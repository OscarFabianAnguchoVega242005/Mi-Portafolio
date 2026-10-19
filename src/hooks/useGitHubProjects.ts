import { useState, useEffect, useCallback, useRef } from 'react';
import type { Project } from '../data/projects';

interface UseGitHubProjectsResult {
  projects: Project[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  isStale: boolean;
}

const API_URL = '/api/github-projects';
const POLL_INTERVAL = 5 * 60 * 1000; // 5 minutos

export function useGitHubProjects(): UseGitHubProjectsResult {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isStale, setIsStale] = useState(false);
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMountedRef = useRef(true);
  const lastFetchRef = useRef<number>(0);

  const fetchProjects = useCallback(async (silent = false) => {
    if (!isMountedRef.current) return;
    
    try {
      if (!silent) setLoading(true);
      setError(null);
      
      const response = await fetch(API_URL, {
        headers: { 'Accept': 'application/json' },
        cache: 'no-store',
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.projects && Array.isArray(data.projects)) {
        if (isMountedRef.current) {
          setProjects(data.projects);
          setLastUpdated(new Date());
          setIsStale(false);
          lastFetchRef.current = Date.now();
        }
      }
    } catch (err) {
      if (isMountedRef.current) {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        setError(message);
        console.error('Error fetching GitHub projects:', err);
      }
    } finally {
      if (isMountedRef.current) setLoading(false);
    }
  }, []);

  // Polling principal
  useEffect(() => {
    fetchProjects();
    
    intervalRef.current = setInterval(() => {
      fetchProjects(true); // silent
    }, POLL_INTERVAL);
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      isMountedRef.current = false;
    };
  }, [fetchProjects]);

  // Refetch cuando la pestaña vuelve a tener foco
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isMountedRef.current) {
        const timeSinceLastFetch = Date.now() - lastFetchRef.current;
        if (timeSinceLastFetch > 30 * 1000) { // 30 seg mínimo
          fetchProjects(true);
        }
      }
    };
    
    const handleFocus = () => {
      if (isMountedRef.current) {
        const timeSinceLastFetch = Date.now() - lastFetchRef.current;
        if (timeSinceLastFetch > 30 * 1000) {
          fetchProjects(true);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchProjects]);

  // Marcar como stale después de 4 min
  useEffect(() => {
    const staleInterval = setInterval(() => {
      if (lastFetchRef.current > 0) {
        const timeSinceLastFetch = Date.now() - lastFetchRef.current;
        if (timeSinceLastFetch > 4 * 60 * 1000) {
          setIsStale(true);
        }
      }
    }, 60 * 1000);
    
    return () => clearInterval(staleInterval);
  }, []);

  return { projects, loading, error, lastUpdated, isStale };
}