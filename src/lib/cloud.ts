import { initializeApp, type FirebaseOptions } from 'firebase/app'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import type { SiteConfig } from './config'
import { FIREBASE_CONFIG } from './firebaseConfig'

let db: ReturnType<typeof getFirestore> | null = null

function getDb() {
  if (!db) {
    const app = initializeApp(FIREBASE_CONFIG as FirebaseOptions)
    db = getFirestore(app)
  }
  return db
}



export async function fetchCloudConfig(): Promise<Partial<SiteConfig> | null> {
  const snap = await getDoc(doc(getDb(), 'site_config', 'global'))
  const raw = snap.data()?.data as string | undefined
  if (!raw) return null
  try {
    return JSON.parse(raw) as Partial<SiteConfig>
  } catch {
    return null
  }
}

export async function pushCloudConfig(config: SiteConfig): Promise<boolean> {
  try {
    const { adminPassword: _admin, ...safe } = config
    await setDoc(doc(getDb(), 'site_config', 'global'), {
      data: JSON.stringify(safe),
      updatedAt: Date.now(),
    })
    return true
  } catch {
    return false
  }
}
