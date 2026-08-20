import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type ParallaxProps = {
  children: React.ReactNode
  className?: string
  /** 1 = igual que el scroll, 0.8 = 20% más lento, 1.2 = más rápido */
  speed?: number
  ease?: string
}

export function Parallax({ children, className, speed = 0.8, ease = 'power2.out' }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const amount = (1 - speed) * 100

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: amount },
        {
          yPercent: -amount,
          ease,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [speed, ease])

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}

type ParallaxImageProps = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  /** 0.8 = la imagen se mueve un 20% más lento que el scroll */
  speed?: number
  ease?: string
}

export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  speed = 0.8,
  ease = 'power2.out',
}: ParallaxImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img) return
    const amount = (1 - speed) * 50

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease,
          scrollTrigger: {
            trigger: wrap,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      )
    }, wrap)

    return () => ctx.revert()
  }, [speed, ease])

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className ?? ''}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`h-full w-full scale-[1.12] object-cover will-change-transform ${imgClassName ?? ''}`}
      />
    </div>
  )
}