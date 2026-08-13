import { useEffect, useRef } from 'react'
import { animate } from 'framer-motion'

type BlobCursorProps = {
  blobType?: 'circle' | 'square'
  fillColor?: string
  trailCount?: number
  sizes?: number[]
  opacities?: number[]
  shadowColor?: string
  zIndex?: number
}

export default function BlobCursor({
  blobType = 'circle',
  fillColor = 'rgba(34, 211, 238, 0.45)',
  trailCount = 3,
  sizes = [60, 120, 90],
  opacities = [0.5, 0.35, 0.25],
  shadowColor = 'rgba(34, 211, 238, 0.25)',
  zIndex = 5,
}: BlobCursorProps) {
  const blobsRef = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      blobsRef.current.forEach((blob, i) => {
        if (!blob) return
        animate(blob, { x: e.clientX, y: e.clientY }, {
          duration: i === 0 ? 0.25 : 0.7,
          ease: 'easeOut',
        })
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 hidden lg:block"
      style={{ zIndex }}
      aria-hidden
    >
      {Array.from({ length: trailCount }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            blobsRef.current[i] = el
          }}
          className="absolute left-0 top-0 will-change-transform"
          style={{
            width: sizes[i],
            height: sizes[i],
            marginLeft: -sizes[i] / 2,
            marginTop: -sizes[i] / 2,
            borderRadius: blobType === 'circle' ? '50%' : 0,
            backgroundColor: fillColor,
            opacity: opacities[i],
            boxShadow: `0 0 ${sizes[i]}px ${shadowColor}`,
          }}
        />
      ))}
    </div>
  )
}