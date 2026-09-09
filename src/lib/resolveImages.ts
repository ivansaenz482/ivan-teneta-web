import { useEffect, useState } from 'react'
import { resolveImage, isImageRef } from './cloud'

export const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='400' height='400' fill='#101a2f'/></svg>"
  )

// Devuelve un src listo para <img>: por defecto data URIs se usan tal cual,
// y las referencias a Firestore se traen (con caché) de forma asíncrona.
export function useResolvedImage(src: string): string {
  const [resolved, setResolved] = useState(
    () => (isImageRef(src) ? PLACEHOLDER_IMAGE : src)
  )

  useEffect(() => {
    let active = true
    if (!isImageRef(src)) {
      setResolved(src)
      return
    }
    resolveImage(src)
      .then((r) => {
        if (active) setResolved(r)
      })
      .catch(() => {
        if (active) setResolved(PLACEHOLDER_IMAGE)
      })
    return () => {
      active = false
    }
  }, [src])

  return resolved
}
