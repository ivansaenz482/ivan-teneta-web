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

export type Product = {
  id: string
  name: string
  category: 'perfume' | 'gym'
  price: number
  emoji: string
  image: string
  description: string
  tag?: 'Nuevo' | 'Popular' | 'Oferta'
}

export const PRODUCTS: Omit<Product, 'image'>[] = [
  {
    id: 'perfume-1',
    name: 'Perfume Eau de Parfum 100ml',
    category: 'perfume',
    price: 45,
    emoji: '🧴',
    description: 'Aroma sofisticado y duradero para todo el día.',
    tag: 'Popular',
  },
  {
    id: 'perfume-2',
    name: 'Colonia Fresca 50ml',
    category: 'perfume',
    price: 28,
    emoji: '🌸',
    description: 'Frescura ligera y elegante, ideal para uso diario.',
  },
  {
    id: 'perfume-3',
    name: 'Ámbar & Vainilla 75ml',
    category: 'perfume',
    price: 52,
    emoji: '🕯️',
    description: 'Notas cálidas y envolventes, edición especial.',
    tag: 'Nuevo',
  },
  {
    id: 'perfume-4',
    name: 'Set de Perfumes Mini (x5)',
    category: 'perfume',
    price: 39,
    emoji: '🎁',
    description: 'Colección de 5 fragancias para regalar o descubrir.',
  },
  {
    id: 'gym-1',
    name: 'Mancuernas Ajustables 20kg',
    category: 'gym',
    price: 79,
    emoji: '🏋️',
    description: 'Par ajustable de 5 a 20 kg, perfecto para entrenar en casa.',
    tag: 'Popular',
  },
  {
    id: 'gym-2',
    name: 'Cuerda para Saltar Pro',
    category: 'gym',
    price: 12,
    emoji: '🪢',
    description: 'Rodamientos de precisión y agarre antideslizante.',
  },
  {
    id: 'gym-3',
    name: 'Guantes de Entrenamiento',
    category: 'gym',
    price: 22,
    emoji: '🥊',
    description: 'Protección y agarre firme para pesas y barras.',
  },
  {
    id: 'gym-4',
    name: 'Kit de Resistencia con Bandas',
    category: 'gym',
    price: 35,
    emoji: '💪',
    description: '5 niveles de resistencia para un entrenamiento completo.',
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
