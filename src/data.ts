export const PROFILE = {
  name: 'NovaSys Digital',
  shortName: 'NovaSys',
  title: 'Ingeniero en Tecnología de la Información',
  slogan: 'Digitalizamos y automatizamos tu negocio con sistemas de vanguardia.',
  whatsapp: '0985136117',
  whatsappIntl: '+593985136117',
  whatsappMessage:
    'Hola, somos Modo Gym, un gusto atenderte. ¿En qué te podemos ayudar?',
  whatsappLink:
    'https://wa.me/593985136117?text=' +
    encodeURIComponent(
      'Hola, somos Modo Gym, un gusto atenderte. ¿En qué te podemos ayudar?'
    ),
  email: 'LEONELTENETA@GMAIL.COM',
  emailLink: 'mailto:leonelteneta@gmail.com',
  location: 'Ecuador · Atención Nacional',
  tiktok: 'https://www.tiktok.com/@novasysdigital',
  instagram: 'https://www.instagram.com/novasysdigital',
}

export type Category = {
  id: string
  name: string
  emoji: string
}

export const CATEGORIES: Category[] = [
  { id: 'soporte', name: 'Soporte Técnico', emoji: '🛠️' },
  { id: 'software', name: 'Software', emoji: '💻' },
]

export type Product = {
  id: string
  name: string
  category: string
  price: number
  emoji: string
  image: string
  description: string
  tag?: 'Nuevo' | 'Popular' | 'Oferta'
}

export const PRODUCTS: Omit<Product, 'image'>[] = [
  {
    id: 'soporte-1',
    name: 'Soporte Técnico Mensual',
    category: 'soporte',
    price: 15,
    emoji: '🛠️',
    description: 'Atención remota y presencial para tus equipos durante todo el mes.',
    tag: 'Popular',
  },
  {
    id: 'soporte-2',
    name: 'Instalación de Sistema de Facturación',
    category: 'soporte',
    price: 40,
    emoji: '🧾',
    description: 'Configuración e implementación completa en tu negocio.',
  },
  {
    id: 'soporte-3',
    name: 'Mantenimiento de Equipos',
    category: 'soporte',
    price: 25,
    emoji: '🔧',
    description: 'Limpieza, actualización y optimización de tu computadora.',
  },
  {
    id: 'soporte-4',
    name: 'Soporte Remoto Rápido',
    category: 'soporte',
    price: 10,
    emoji: '💻',
    description: 'Resolución de problemas en línea sin salir de tu oficina.',
  },
  {
    id: 'software-1',
    name: 'Página Web Profesional',
    category: 'software',
    price: 120,
    emoji: '🌐',
    description: 'Diseño moderno, responsivo y optimizado para tu negocio.',
    tag: 'Popular',
  },
  {
    id: 'software-2',
    name: 'Sistema de Contabilidad Digital',
    category: 'software',
    price: 85,
    emoji: '📊',
    description: 'Gestiona tu contabilidad en línea con reportes automáticos.',
  },
  {
    id: 'software-3',
    name: 'Aplicación Móvil de Gestión',
    category: 'software',
    price: 150,
    emoji: '📱',
    description: 'Tu negocio al alcance de un toque, en iOS y Android.',
    tag: 'Nuevo',
  },
  {
    id: 'software-4',
    name: 'Sistema de Inventario y Ventas',
    category: 'software',
    price: 70,
    emoji: '🗂️',
    description: 'Control de stock, ventas y reportes en tiempo real.',
  },
]

export const PROJECTS = [
  {
    id: 1,
    title: 'Sistema de Facturación Electrónica',
    category: 'Facturación',
    image: 'images/project1.jpg',
    description: 'Comprobantes autorizados, inventarios y reportes fiscales en tiempo real.',
  },
  {
    id: 2,
    title: 'Plataforma Contable Integral',
    category: 'Contabilidad',
    image: 'images/project2.jpg',
    description:
      'Libro diario, mayor, balances, conciliaciones bancarias y cálculo de impuestos automatizados.',
  },
  {
    id: 3,
    title: 'Sitio Web Corporativo',
    category: 'Páginas Web',
    image: 'images/project3.jpg',
    description: 'Diseño premium, tiendas en línea y posicionamiento en buscadores.',
  },
  {
    id: 4,
    title: 'Aplicación Móvil de Gestión',
    category: 'Apps Móviles',
    image: 'images/project4.jpg',
    description: 'Apps Android e iOS con interfaz moderna y experiencia fluida.',
  },
]

export const SERVICES = [
  {
    id: 'facturacion',
    title: 'Sistemas de Facturación',
    description:
      'Software de facturación electrónica completo, con comprobantes autorizados, control de inventario y reportes fiscales en tiempo real.',
    icon: 'receipt',
    features: ['Facturación electrónica', 'Inventarios y bodegas', 'Reportes fiscales'],
  },
  {
    id: 'contabilidad',
    title: 'Sistemas Contables',
    description:
      'Plataformas contables automatizadas: libro diario, mayor, balances, conciliaciones bancarias, impuestos y análisis financiero con precisión de nivel profesional.',
    icon: 'calculator',
    features: ['Libro diario y mayor', 'Conciliaciones bancarias', 'Balances automatizados', 'Cálculo de impuestos'],
  },
  {
    id: 'web',
    title: 'Páginas Web Profesionales',
    description:
      'Sitios web modernos, rápidos y con diseño premium. Posicionamiento en buscadores, tiendas en línea y presencia corporativa.',
    icon: 'globe',
    features: ['Diseño premium', 'Tiendas en línea', 'SEO y rendimiento'],
  },
  {
    id: 'movil',
    title: 'Aplicaciones Móviles',
    description:
      'Apps para Android e iOS nativas o multiplataforma, con interfaces fluidas y experiencia de usuario de alto nivel.',
    icon: 'smartphone',
    features: ['Android e iOS', 'UI/UX profesional', 'Notificaciones y datos'],
  },
]
