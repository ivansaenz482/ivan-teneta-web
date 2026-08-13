import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion'

interface ShinyTextProps {
  text: string
  disabled?: boolean
  speed?: number
  className?: string
  color?: string
  shineColor?: string
  spread?: number
  direction?: 'left' | 'right'
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 2,
  className = '',
  color = '#22d3ee',
  shineColor = '#ffffff',
  spread = 120,
  direction = 'left',
}: ShinyTextProps) {
  const progress = useMotionValue(0)
  const elapsedRef = useRef(0)
  const lastTimeRef = useRef<number | null>(null)
  const directionRef = useRef(direction === 'left' ? 1 : -1)

  const animationDuration = speed * 1000

  useAnimationFrame((time) => {
    if (disabled) {
      lastTimeRef.current = null
      return
    }
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time
      return
    }

    const deltaTime = time - lastTimeRef.current
    lastTimeRef.current = time
    elapsedRef.current += deltaTime

    const cycleTime = elapsedRef.current % animationDuration
    progress.set((cycleTime / animationDuration) * 100)
  })

  useEffect(() => {
    directionRef.current = direction === 'left' ? 1 : -1
    elapsedRef.current = 0
    progress.set(0)
  }, [direction, progress])

  const backgroundPosition = useTransform(progress, (p) => `${150 - p * 2}% center`)

  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{ ...gradientStyle, backgroundPosition }}
    >
      {text}
    </motion.span>
  )
}