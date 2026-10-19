export interface Skill {
  name: string;
  icon: string;
  level: number;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'other';
  color: string;
}

export const skills: Skill[] = [
  { name: 'React', icon: '⚛️', level: 95, category: 'frontend', color: '#61DAFB' },
  { name: 'TypeScript', icon: '📘', level: 90, category: 'frontend', color: '#3178C6' },
  { name: 'Next.js', icon: '▲', level: 85, category: 'frontend', color: '#000000' },
  { name: 'Vue.js', icon: '💚', level: 75, category: 'frontend', color: '#42B883' },
  { name: 'Tailwind CSS', icon: '🎨', level: 90, category: 'frontend', color: '#38B2AC' },
  { name: 'Framer Motion', icon: '✨', level: 80, category: 'frontend', color: '#0055FF' },
  
  { name: 'Node.js', icon: '🟢', level: 90, category: 'backend', color: '#339933' },
  { name: 'Express', icon: '🚂', level: 85, category: 'backend', color: '#000000' },
  { name: 'NestJS', icon: '🏗️', level: 75, category: 'backend', color: '#E0234E' },
  { name: 'Python', icon: '🐍', level: 80, category: 'backend', color: '#3776AB' },
  { name: 'FastAPI', icon: '⚡', level: 75, category: 'backend', color: '#009688' },
  
  { name: 'PostgreSQL', icon: '🐘', level: 85, category: 'database', color: '#336791' },
  { name: 'MongoDB', icon: '🍃', level: 80, category: 'database', color: '#47A248' },
  { name: 'Redis', icon: '🔴', level: 70, category: 'database', color: '#DC382D' },
  { name: 'Prisma', icon: '📋', level: 80, category: 'database', color: '#2D3748' },
  { name: 'Supabase', icon: '🔥', level: 75, category: 'database', color: '#3ECF8E' },
  
  { name: 'Git', icon: '📝', level: 90, category: 'tools', color: '#F05032' },
  { name: 'Docker', icon: '🐳', level: 80, category: 'tools', color: '#2496ED' },
  { name: 'AWS', icon: '☁️', level: 70, category: 'tools', color: '#FF9900' },
  { name: 'Vercel', icon: '▲', level: 85, category: 'tools', color: '#000000' },
  { name: 'CI/CD', icon: '🔄', level: 75, category: 'tools', color: '#2088FF' },
  { name: 'Testing', icon: '✅', level: 80, category: 'tools', color: '#C21325' },
  
  { name: 'GraphQL', icon: '📊', level: 70, category: 'other', color: '#E10098' },
  { name: 'REST APIs', icon: '🔗', level: 95, category: 'other', color: '#FF6C37' },
  { name: 'WebSockets', icon: '🔌', level: 80, category: 'other', color: '#010101' },
  { name: 'JWT/Auth', icon: '🔐', level: 85, category: 'other', color: '#000000' },
  { name: 'PWA', icon: '📱', level: 75, category: 'other', color: '#5A0FC8' },
];

export const getSkillsByCategory = (category: Skill['category']) => skills.filter(s => s.category === category);
export const getTopSkills = (count: number = 6) => [...skills].sort((a, b) => b.level - a.level).slice(0, count);