import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { PROFILE, PRODUCTS, CATEGORIES, type Product, type Category } from '../data'
import { placeholderImage, recompressDataUri, isImageDataUri } from './productImages'
import { fetchCloudConfig, pushCloudConfig } from './cloud'

export type SiteConfig = {
  brandName: string
  storeName: string
  storeTagline: string
  storeSubtitle: string
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
  categories: Category[]
  products: Product[]
  productViews: Record<string, number>
}

const STORAGE_KEY = 'modogym_site_config_v5'
const LEGACY_KEY = 'modogym_site_config_v4'

function buildDefaults(): SiteConfig {
  return {
    brandName: PROFILE.name,
    storeName: 'Tienda Virtual',
    storeTagline: 'de Sistemas y Soporte',
    storeSubtitle:
      'Servicios y productos de soporte técnico y software al mejor precio. Solicita tu cotización directo por WhatsApp y coordina la entrega o instalación.',
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
    categories: CATEGORIES,
    products: PRODUCTS.map((p) => ({ ...p, image: placeholderImage(p.emoji) })),
    productViews: {},
  }
}

function readStored(key: string): Partial<SiteConfig> | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as Partial<SiteConfig>
  } catch {
    return null
  }
}

function normalizeConfig(stored: Partial<SiteConfig>, defaults: SiteConfig): SiteConfig {
  const defaultProducts = defaults.products
  let products: Product[]
  if (stored.products !== undefined) {
    products = (Array.isArray(stored.products) ? stored.products : []).map((p) => {
      const def = defaultProducts.find((d) => d.id === p.id)
      return def ? { ...def, ...p } : p
    })
  } else {
    products = defaultProducts
  }

  return {
    ...defaults,
    ...stored,
    categories:
      Array.isArray(stored.categories) && stored.categories.length > 0
        ? stored.categories
        : defaults.categories,
    products,
    productViews: stored.productViews ?? defaults.productViews,
  }
}

async function compressImagesInConfig(
  config: SiteConfig,
  maxSize: number,
  quality = 0.8
): Promise<SiteConfig> {
  let changed = false
  const products = await Promise.all(
    config.products.map(async (p) => {
      if (!isImageDataUri(p.image)) return p
      const image = await recompressDataUri(p.image, maxSize, quality)
      if (image === p.image) return p
      changed = true
      return { ...p, image }
    })
  )
  let logoImage = config.logoImage
  if (isImageDataUri(config.logoImage)) {
    const next = await recompressDataUri(config.logoImage, maxSize, quality)
    if (next !== config.logoImage) {
      logoImage = next
      changed = true
    }
  }
  return changed ? { ...config, products, logoImage } : config
}

type SyncStatus = 'pending' | 'ok' | 'offline'

type ConfigContextValue = {
  config: SiteConfig
  updateConfig: (patch: Partial<SiteConfig>) => void
  updateProduct: (id: string, patch: Partial<Product>) => void
  addProduct: (base?: Partial<Product>) => string
  removeProduct: (id: string) => void
  resetConfig: () => void
  waLink: (message?: string) => string
  orderLink: (product: Product) => string
  categoryName: (id: string) => string
  recordProductView: (id: string) => void
  recordWhatsappClick: () => void
  persist: () => Promise<boolean>
  storageFull: boolean
  syncStatus: SyncStatus
}

const ConfigContext = createContext<ConfigContextValue | null>(null)

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(() => {
    const defaults = buildDefaults()
    const current = readStored(STORAGE_KEY)
    return current ? normalizeConfig(current, defaults) : defaults
  })
  const [storageFull, setStorageFull] = useState(false)
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('pending')
  const visitedRef = useRef(false)
  const hydratedRef = useRef(false)

  useEffect(() => {
    hydratedRef.current = true
    if (visitedRef.current) return
    visitedRef.current = true

    const current = readStored(STORAGE_KEY)
    if (!current) {
      const legacy = readStored(LEGACY_KEY)
      if (legacy) {
        setConfig((c) => normalizeConfig(legacy, c))
        // no return: también contar visita y cargar desde la nube
      }
    }

    if (!sessionStorage.getItem('modogym_visited')) {
      sessionStorage.setItem('modogym_visited', '1')
      setConfig((c) => ({ ...c, visits: (c.visits ?? 0) + 1 }))
    }

    // Sincronización con Firestore (la nube es la fuente de verdad para multi-dispositivo)
    let cancelled = false
    ;(async () => {
      try {
        const cloud = await fetchCloudConfig()
        if (cancelled) return
        if (cloud) {
          setConfig((c) => ({ ...normalizeConfig(cloud, c), adminPassword: c.adminPassword }))
          setSyncStatus('ok')
        } else {
          setSyncStatus('ok')
        }
      } catch {
        if (!cancelled) setSyncStatus('offline')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const persist = useCallback(async (c: SiteConfig): Promise<boolean> => {
    let payload: SiteConfig = c
    let localOk = false
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(c))
      localStorage.removeItem(LEGACY_KEY)
      localOk = true
      setStorageFull(false)
    } catch {
      for (const size of [400, 300, 200, 140]) {
        const slim = await compressImagesInConfig(c, size)
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(slim))
          localStorage.removeItem(LEGACY_KEY)
          payload = slim
          localOk = true
          setStorageFull(false)
          break
        } catch {
          // sigue reduciendo el tamaño
        }
      }
      if (!localOk) setStorageFull(true)
    }

    // Firestore tiene límite de 1MB por documento: comprimir para la nube si hace falta
    let cloudPayload = payload
    if (JSON.stringify(cloudPayload).length > 900_000) {
      for (const size of [400, 300, 200, 140]) {
        const slim = await compressImagesInConfig(cloudPayload, size)
        if (JSON.stringify(slim).length < 900_000) {
          cloudPayload = slim
          break
        }
      }
    }
    const cloudOk = await pushCloudConfig(cloudPayload)
    setSyncStatus(cloudOk ? 'ok' : 'offline')
    return localOk && cloudOk
  }, [])

  useEffect(() => {
    if (!hydratedRef.current) return
    const id = window.setTimeout(() => void persist(config), 650)
    return () => window.clearTimeout(id)
  }, [config, persist])

  const persistNow = useCallback(() => persist(config), [persist, config])

  const updateConfig = (patch: Partial<SiteConfig>) => {
    setConfig((c) => ({ ...c, ...patch }))
  }

  const updateProduct = (id: string, patch: Partial<Product>) => {
    setConfig((c) => ({
      ...c,
      products: c.products.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }))
  }

  const addProduct = (base?: Partial<Product>) => {
    const id = `prod-${Date.now()}`
    const emoji = base?.emoji ?? '🛍️'
    setConfig((c) => ({
      ...c,
      products: [
        {
          id,
          name: base?.name ?? 'Nuevo producto',
          category: base?.category ?? c.categories[0]?.id ?? '',
          price: base?.price ?? 0,
          emoji,
          image: base?.image ?? placeholderImage(emoji),
          description: base?.description ?? '',
          tag: base?.tag,
        },
        ...c.products,
      ],
    }))
    return id
  }

  const removeProduct = (id: string) => {
    setConfig((c) => {
      const views = { ...c.productViews }
      delete views[id]
      return {
        ...c,
        products: c.products.filter((p) => p.id !== id),
        productViews: views,
      }
    })
  }

  const resetConfig = () => {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(LEGACY_KEY)
    setStorageFull(false)
    setConfig(buildDefaults())
  }

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

  const categoryName = (id: string) =>
    config.categories.find((c) => c.id === id)?.name ?? id

  return (
    <ConfigContext.Provider
      value={{
        config,
        updateConfig,
        updateProduct,
        addProduct,
        removeProduct,
        resetConfig,
        waLink,
        orderLink,
        categoryName,
        recordProductView,
        recordWhatsappClick,
        persist: persistNow,
        storageFull,
        syncStatus,
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