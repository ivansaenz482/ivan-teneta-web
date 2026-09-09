import { initializeApp, type FirebaseOptions, type FirebaseApp } from 'firebase/app'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from 'firebase/firestore'
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import type { SiteConfig } from './config'
import { FIREBASE_CONFIG } from './firebaseConfig'
import { fileToDataUri, dataUriToBlob } from './productImages'

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
}

const CONFIG_DOC = 'site_config/global'
const STATS_DOC = 'site_stats/global'

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
    const { adminPassword: _admin, visits: _v, whatsappClicks: _w, productViews: _p, ...safe } =
      config
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
    }
  } catch {
    return null
  }
}

export async function incrementStat(field: string, by = 1): Promise<boolean> {
  const ref = doc(getDb(), STATS_DOC)
  try {
    await updateDoc(ref, { [field]: increment(by) })
    return true
  } catch {
    try {
      await setDoc(ref, { [field]: increment(by), updatedAt: Date.now() }, { merge: true })
      return true
    } catch {
      return false
    }
  }
}

function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(
      () => reject(new Error('timeout')),
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

export async function uploadImage(
  file: File,
  folder = 'products',
  maxSize = 800,
  quality = 0.8
): Promise<string> {
  const dataUri = await fileToDataUri(file, maxSize, quality)
  const blob = dataUriToBlob(dataUri)
  const storage = getStorage(getApp())
  const safeExt = (file.type.split('/')[1] || 'jpg').replace(/[^a-z0-9]/gi, '')
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`
  await timeout(uploadBytes(storageRef(storage, path), blob), 30000)
  return getDownloadURL(storageRef(storage, path))
}

export function friendlyUploadError(err: unknown): string {
  const code = (err as { code?: string })?.code ?? ''
  switch (code) {
    case 'storage/unauthorized':
      return 'Permiso denegado. Revisa las reglas de Storage (storage.rules) y que permitan escritura.'
    case 'storage/bucket-not-found':
      return 'El bucket de Storage no existe. Habilita Firebase Storage en la consola.'
    case 'storage/quota-exceeded':
      return 'Se alcanzó la cuota de almacenamiento de Firebase.'
    case 'storage/retry-limit-exceeded':
    case 'timeout':
      return 'La carga tardó demasiado. Verifica tu conexión y que Storage esté habilitado.'
    case 'storage/object-not-found':
      return 'No se encontró el archivo. Reintenta la subida.'
    default:
      return 'No se pudo subir la imagen. Revisa que Firebase Storage esté habilitado y las reglas permitan escritura.'
  }
}

export function isStorageUrl(value: string): boolean {
  return /^https?:\/\//.test(value) && !value.startsWith('data:')
}

export async function deleteStorageImage(url: string): Promise<void> {
  if (!isStorageUrl(url)) return
  try {
    const storage = getStorage(getApp())
    await deleteObject(storageRef(storage, url))
  } catch {
    // la imagen quizá ya fue borrada o el enlace no es decodificable
  }
}
