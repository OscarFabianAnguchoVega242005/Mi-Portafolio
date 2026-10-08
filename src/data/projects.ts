export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile';
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Tienda Digital Almacén DD',
    description: 'Sistema de gestión de tienda digital con control de inventario, ventas, clientes y reportes. Desarrollado con tecnologías web modernas para administración completa de un almacén.',
    shortDescription: 'Sistema de gestión de inventario y ventas para almacén',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: '/projects/tienda-digital.jpg',
    githubUrl: 'https://github.com/OscarFabianAnguchoVega242005/Tienda_Digital_Almacen_DD',
    featured: true,
    category: 'fullstack'
  },
  {
    id: '2',
    title: 'Aura Music Player',
    description: 'Reproductor de música local con interfaz moderna, gestión de playlists, ecualizador y soporte para múltiples formatos de audio. Experiencia de usuario fluida y diseño atractivo.',
    shortDescription: 'Reproductor de música local con playlists y ecualizador',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: '/projects/aura-music.jpg',
    githubUrl: 'https://github.com/OscarFabianAnguchoVega242005/Aura-Music-Player',
    featured: true,
    category: 'frontend'
  },
  {
    id: '3',
    title: 'Dulce Pecado Ltda',
    description: 'Aplicación móvil desarrollada en Flutter/Dart para gestión de pedidos, inventario y ventas de una pastelería. Incluye panel de administración y seguimiento de pedidos en tiempo real.',
    shortDescription: 'App móvil Flutter para gestión de pastelería',
    technologies: ['Flutter', 'Dart', 'Firebase'],
    image: '/projects/dulce-pecado.jpg',
    githubUrl: 'https://github.com/OscarFabianAnguchoVega242005/Dulce-Pecado-Ltda',
    featured: true,
    category: 'mobile'
  },
  {
    id: '4',
    title: 'Umbral Gestor de Tareas',
    description: 'Aplicación de productividad para gestión de tareas y proyectos con organización por categorías, prioridades, fechas límite y recordatorios. Interfaz limpia y intuitiva.',
    shortDescription: 'App de tareas con categorías, prioridades y recordatorios',
    technologies: ['Flutter', 'Dart', 'SQLite'],
    image: '/projects/umbral-tareas.jpg',
    githubUrl: 'https://github.com/OscarFabianAnguchoVega242005/Umbral_Gestor_de_Tareas',
    featured: true,
    category: 'mobile'
  },
  {
    id: '5',
    title: 'Menú Restaurante',
    description: 'Menú digital interactivo para restaurantes con categorización de platos, información nutricional, alérgenos y sistema de pedidos. Diseño responsive y fácil de actualizar.',
    shortDescription: 'Menú digital interactivo para restaurantes',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: '/projects/menu-restaurante.jpg',
    githubUrl: 'https://github.com/OscarFabianAnguchoVega242005/Menu-Restaurante',
    featured: false,
    category: 'frontend'
  },
  {
    id: '6',
    title: 'Gestor Dinero Web',
    description: 'Aplicación web para control de finanzas personales con registro de ingresos/gastos, gráficos de análisis, categorías personalizables y exportación de reportes.',
    shortDescription: 'Control de finanzas personales con gráficos y reportes',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Chart.js'],
    image: '/projects/gestor-dinero.jpg',
    githubUrl: 'https://github.com/OscarFabianAnguchoVega242005/Gestor_Dinero_Web',
    featured: false,
    category: 'frontend'
  },
  {
    id: '7',
    title: 'Visor Credenciales de Red',
    description: 'Herramienta para visualizar y gestionar credenciales de red almacenadas en el sistema. Interfaz simple para administradores de red y soporte técnico.',
    shortDescription: 'Visor de credenciales de red para administradores',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: '/projects/visor-credenciales.jpg',
    githubUrl: 'https://github.com/OscarFabianAnguchoVega242005/Visor_credenciales_de_Red',
    featured: false,
    category: 'frontend'
  },
  {
    id: '8',
    title: 'Mis Aplicaciones APK',
    description: 'Repositorio con mini aplicaciones Android empaquetadas como APKs. Incluye utilidades variadas, herramientas de productividad y apps experimentales.',
    shortDescription: 'Colección de mini apps Android como APKs',
    technologies: ['Android', 'Java/Kotlin', 'Flutter'],
    image: '/projects/mis-apks.jpg',
    githubUrl: 'https://github.com/OscarFabianAnguchoVega242005/mis-aplicaciones-apk',
    featured: false,
    category: 'mobile'
  }
];

export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectsByCategory = (category: Project['category']) => projects.filter(p => p.category === category);