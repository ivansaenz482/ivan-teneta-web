import { initializeApp, type FirebaseOptions, type FirebaseApp } from 'firebase/app'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  increment,
} from 'firebase/firestore'
import type { SiteConfig } from './config'
import { FIREBASE_CONFIG } from './firebaseConfig'
import { fileToDataUri } from './productImages'

let db: ReturnType<typeof getFirestore> | null = null
let app: FirebaseApp | null = null

function getApp() {
  if (!app) app = initializeApp(FIREBASE_CONFIG as FirebaseOptions)
  return app
}

function getDb() {
  if (!db) db = getFirestore(getApp())
  return db
}

export type FieldStats = {
  visits: number
  whatsappClicks: number
  productViews: Record<string, number>
  orders: Record<string, number>
  visitsByDay: Record<string, number>
  ordersByDay: Record<string, number>
}

const CONFIG_DOC = 'site_config/global'
const STATS_DOC = 'site_stats/global'
const IMAGES_COLLECTION = 'product_images'

// Clave local del día (YYYY-MM-DD) para las series de tiempo.
export function todayKey(): string {
  const d = new Date()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

// Referencia de una imagen guardada en Firestore: firestore:image:<docId>
export function isImageRef(value: string): boolean {
  return value.startsWith('firestore:image:')
}

export async function fetchCloudConfig(): Promise<Partial<SiteConfig> | null> {
  try {
    const snap = await getDoc(doc(getDb(), CONFIG_DOC))
    const raw = snap.data()?.data as string | undefined
    if (!raw) return null
    return JSON.parse(raw) as Partial<SiteConfig>
  } catch {
    return null
  }
}

export async function pushCloudConfig(config: SiteConfig): Promise<boolean> {
  try {
    const {
      adminPassword: _admin,
      visits: _v,
      whatsappClicks: _w,
      productViews: _p,
      orders: _o,
      ...safe
    } = config
    await setDoc(doc(getDb(), CONFIG_DOC), {
      data: JSON.stringify(safe),
      updatedAt: Date.now(),
    })
    return true
  } catch {
    return false
  }
}

export async function fetchCloudStats(): Promise<FieldStats | null> {
  try {
    const snap = await getDoc(doc(getDb(), STATS_DOC))
    if (!snap.exists()) return null
    const d = snap.data()
    return {
      visits: Number(d.visits) || 0,
      whatsappClicks: Number(d.whatsappClicks) || 0,
      productViews: (d.productViews as Record<string, number>) ?? {},
      orders: (d.orders as Record<string, number>) ?? {},
      visitsByDay: (d.visitsByDay as Record<string, number>) ?? {},
      ordersByDay: (d.ordersByDay as Record<string, number>) ?? {},
    }
  } catch {
    return null
  }
}

export async function incrementStat(field: string, by = 1): Promise<boolean> {
  try {
    await setDoc(
      doc(getDb(), STATS_DOC),
      { [field]: increment(by), updatedAt: Date.now() },
      { merge: true }
    )
    return true
  } catch {
    return false
  }
}

function timeout<T>(promise: Promise<T>, ms: number, msg: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(
      () => reject(Object.assign(new Error(msg), { code: 'timeout' })),
      ms
    )
    promise.then(
      (val) => {
        window.clearTimeout(timer)
        resolve(val)
      },
      (err) => {
        window.clearTimeout(timer)
        reject(err)
      }
    )
  })
}

// Sube una imagen guardándola como documento de Firestore (plan Spark gratis).
// Devuelve una referencia corta que ocupa poquísimo en el config.
export async function uploadImage(
  file: File,
  maxSize = 640,
  quality = 0.75
): Promise<string> {
  const dataUri = await fileToDataUri(file, maxSize, quality)
  const docId = `img-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  await timeout(
    setDoc(doc(getDb(), IMAGES_COLLECTION, docId), {
      data: dataUri,
      updatedAt: Date.now(),
    }),
    20000,
    'La carga tardó demasiado. Revisa tu conexión.'
  )
  return `firestore:image:${docId}`
}

const IMG_CACHE_KEY = 'novasys_img_cache'

function loadCache(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(IMG_CACHE_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveCache(cache: Record<string, string>) {
  try {
    localStorage.setItem(IMG_CACHE_KEY, JSON.stringify(cache))
  } catch {
    // el navegador está lleno; se ignora
  }
}

// Resuelve una referencia firestore:image:<id> a su data URI real, con caché en localStorage
// para no gastar lecturas del plan gratuito.
export async function resolveImage(src: string): Promise<string> {
  if (!isImageRef(src)) return src
  const cache = loadCache()
  if (cache[src]) return cache[src]
  const docId = src.split(':').pop() as string
  const snap = await getDoc(doc(getDb(), IMAGES_COLLECTION, docId))
  const data = snap.data()?.data as string | undefined
  if (!data) return src
  cache[src] = data
  saveCache(cache)
  return data
}

export async function deleteStoredImage(image: string): Promise<void> {
  if (!isImageRef(image)) return
  const docId = image.split(':').pop() as string
  const cache = loadCache()
  delete cache[image]
  saveCache(cache)
  try {
    await deleteDoc(doc(getDb(), IMAGES_COLLECTION, docId))
  } catch {
    // ya fue borrada
  }
}

export function friendlyUploadError(err: unknown): string {
  const { code } = (err as { code?: string }) ?? {}
  const message = (err as Error)?.message?.replace(/^.*?(Firebase:)/, '$1') ?? ''
  switch (code) {
    case 'permission-denied':
      return 'Firebase no permite guardar aquí. Revisa las reglas de Firestore (allow read, write).'
    case 'timeout':
      return 'La subida tardó demasiado. Revisa tu conexión e inténtalo de nuevo.'
    case 'unavailable':
      return 'No se pudo conectar con Firebase. Revisa tu red.'
    default:
      return `No se pudo subir. ${code ? `Error (${code})` : 'Error sin código'}${message ? `: ${message}` : ': revisa tu conexión a internet.'}`
  }
}
