// Datos personales: única fuente de verdad para Hero, About, Contact y Footer.
export const personalInfo = {
  name: 'Oscar Angucho',
  fullName: 'Oscar Fabián Angucho Vega',
  title: 'Desarrollador Full Stack Junior',
  subtitle:
    'Construyo apps móviles y sitios web para emprendedores y microempresas con Flutter, JavaScript y Supabase.',

  // About separa los párrafos con una línea en blanco (\n\n)
  bio: [
    'Soy estudiante de 7.° semestre de Ingeniería Informática en AUNAR (Villavicencio). Me muevo entre el frontend, el desarrollo móvil con Flutter y las bases de datos relacionales en la nube con Supabase y PostgreSQL.',
    'Creé Dev Pro Solutions, una empresa 100 % virtual donde diseño, desarrollo y publico sitios web, apps y software a la medida para clientes reales.',
    'Aprendo de forma autónoma y uso herramientas de IA (Claude, Gemini, ChatGPT) para acelerar el desarrollo y optimizar código.',
  ].join('\n\n'),

  email: 'oscarfabianangucho@gmail.com',
  phone: '+57 313 300 3370',
  location: 'Villavicencio, Colombia',

  // Copia tu CV a /public/Oscar_Angucho_HV.pdf para que el botón de descarga funcione
  cvUrl: '/Oscar_Angucho_HV.pdf',

  // Datos breves que se muestran en el Hero (texto real, sin cifras inventadas)
  facts: [
    { label: 'Ubicación', value: 'Villavicencio, Colombia' },
    { label: 'Estudios', value: 'Ing. Informática, 7.° semestre (AUNAR)' },
    { label: 'Empresa', value: 'Dev Pro Solutions' },
  ],

  // Lo que estás aprendiendo (honesto y actualizable)
  learning: ['Node.js', 'Express', 'APIs REST', 'Docker', 'Linux'],

  // Cómo trabajo (checklist)
  workStyle: [
    'Apps y sitios reales para emprendedores y microempresas',
    'Código limpio, comentado y fácil de mantener',
    'Soluciones simples antes que complejas',
    'IA para acelerar el desarrollo y optimizar código',
  ],

  // Los enlaces vacíos ('') no se muestran. Agrega LinkedIn/Twitter cuando los tengas.
  socialLinks: {
    github: 'https://github.com/OscarFabianAnguchoVega242005',
    linkedin: '',
    twitter: '',
    email: 'mailto:oscarfabianangucho@gmail.com',
  },
};

export const navItems = [
  { label: 'Inicio', href: '#home' },
  { label: 'Sobre mí', href: '#about' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Contacto', href: '#contact' },
];