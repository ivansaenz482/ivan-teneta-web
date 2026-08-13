import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { PROFILE, PRODUCTS, type Product } from '../data'
import { placeholderImage } from './productImages'

export type SiteConfig = {
  brandName: string
  storeName: string
  whatsapp: string
  whatsappIntl: string
  whatsappMessage: string
  email: string
  location: string
  tiktok: string
  instagram: string
  adminPassword: string
  logoImage: string
  visits: number
  whatsappClicks: number
  products: Product[]
  productViews: Record<string, number>
}

const STORAGE_KEY = 'modogym_site_config_v1'

function buildDefaults(): SiteConfig {
  return {
    brandName: PROFILE.name,
    storeName: 'Modo Gym',
    whatsapp: PROFILE.whatsapp,
    whatsappIntl: PROFILE.whatsappIntl,
    whatsappMessage: PROFILE.whatsappMessage,
    email: PROFILE.email,
    location: PROFILE.location,
    tiktok: PROFILE.tiktok,
    instagram: PROFILE.instagram,
    adminPassword: 'admin123',
    logoImage: '',
    visits: 0,
    whatsappClicks: 0,
    products: PRODUCTS.map((p) => ({ ...p, image: placeholderImage(p.emoji) })),
    productViews: {},
  }
}

function loadConfig(): SiteConfig {
  const defaults = buildDefaults()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaults
    const stored = JSON.parse(raw) as Partial<SiteConfig>

    const defaultProducts = defaults.products
    const storedProducts = Array.isArray(stored.products) ? stored.products : []
    const products = defaultProducts.map(
      (dp) => storedProducts.find((p) => p.id === dp.id) ?? dp
    )

    return {
      ...defaults,
      ...stored,
      products,
      productViews: stored.productViews ?? defaults.productViews,
    }
  } catch {
    return defaults
  }
}

type ConfigContextValue = {
  config: SiteConfig
  updateConfig: (patch: Partial<SiteConfig>) => void
  updateProduct: (id: string, patch: Partial<Product>) => void
  resetConfig: () => void
  waLink: (message?: string) => string
  orderLink: (product: Product) => string
  recordProductView: (id: string) => void
  recordWhatsappClick: () => void
}

const ConfigContext = createContext<ConfigContextValue | null>(null)

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(loadConfig)
  const visitRecorded = useRef(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
    } catch {
      // localStorage lleno (imágenes grandes) — se ignora silenciosamente
    }
  }, [config])

  useEffect(() => {
    if (visitRecorded.current) return
    visitRecorded.current = true
    if (sessionStorage.getItem('modogym_visited')) return
    sessionStorage.setItem('modogym_visited', '1')
    setConfig((c) => ({ ...c, visits: (c.visits ?? 0) + 1 }))
  }, [])

  const updateConfig = (patch: Partial<SiteConfig>) => {
    setConfig((c) => ({ ...c, ...patch }))
  }

  const updateProduct = (id: string, patch: Partial<Product>) => {
    setConfig((c) => ({
      ...c,
      products: c.products.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }))
  }

  const resetConfig = () => setConfig(buildDefaults())

  const waLink = (message?: string) =>
    `https://wa.me/${config.whatsappIntl.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
      message ?? config.whatsappMessage
    )}`

  const orderLink = (product: Product) =>
    waLink(
      `${config.whatsappMessage}\n\nQuiero pedir: ${product.name} ($${product.price}). ¿Está disponible?`
    )

  const recordProductView = (id: string) => {
    setConfig((c) => ({
      ...c,
      productViews: { ...c.productViews, [id]: (c.productViews[id] ?? 0) + 1 },
    }))
  }

  const recordWhatsappClick = () => {
    setConfig((c) => ({ ...c, whatsappClicks: (c.whatsappClicks ?? 0) + 1 }))
  }

  return (
    <ConfigContext.Provider
      value={{
        config,
        updateConfig,
        updateProduct,
        resetConfig,
        waLink,
        orderLink,
        recordProductView,
        recordWhatsappClick,
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig(): ConfigContextValue {
  const ctx = useContext(ConfigContext)
  if (!ctx) throw new Error('useConfig debe usarse dentro de <ConfigProvider>')
  return ctx
}