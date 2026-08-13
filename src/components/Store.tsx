import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, MessageCircle, Tag, Flame } from 'lucide-react'
import { useConfig } from '../lib/config'
import SpotlightCard from './reactbits/SpotlightCard'
import ShinyText from './reactbits/ShinyText'
import { TikTokIcon, InstagramIcon } from './icons'
import type { Product } from '../data'

type Filter = 'todos' | 'perfume' | 'gym'

const filters: { key: Filter; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'perfume', label: 'Perfumes' },
  { key: 'gym', label: 'Gym' },
]

function tagBadge(tag?: string) {
  if (tag === 'Popular')
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink-950">
        <Flame size={11} /> {tag}
      </span>
    )
  if (tag === 'Nuevo')
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-aqua-400 to-aqua-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink-950">
        {tag}
      </span>
    )
  if (tag === 'Oferta')
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-rose-400 to-rose-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink-950">
        <Tag size={11} /> {tag}
      </span>
    )
  return null
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { orderLink, recordProductView } = useConfig()
  const ref = useRef<HTMLDivElement>(null)
  const tracked = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !tracked.current) {
          tracked.current = true
          recordProductView(product.id)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [product.id, recordProductView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="h-full"
    >
      <SpotlightCard className="flex h-full flex-col">
        <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-ink-950/60">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute left-2 top-2">{tagBadge(product.tag)}</div>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
          <div className="text-[10px] font-bold uppercase tracking-widest text-aqua-400">
            {product.category === 'perfume' ? 'Perfume' : 'Gym'}
          </div>
          <h3 className="font-display text-sm font-semibold leading-snug text-white sm:text-base">
            {product.name}
          </h3>
          <p className="line-clamp-2 text-xs text-zinc-400 sm:text-sm">
            {product.description}
          </p>
          <div className="mt-auto flex items-end justify-between gap-2 pt-2">
            <div className="font-display text-lg font-bold text-aqua-gradient">
              ${product.price}
            </div>
            <a
              href={orderLink(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-aqua-400 to-aqua-600 px-3 py-2 text-xs font-semibold text-ink-950 transition-transform hover:scale-105 sm:text-sm"
            >
              <MessageCircle size={14} />
              Pedir
            </a>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

export default function Store() {
  const { config, waLink } = useConfig()
  const [filter, setFilter] = useState<Filter>('todos')

  const products = config.products.filter(
    (p) => filter === 'todos' || p.category === filter
  )

  return (
    <section id="tienda" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/4 h-[360px] w-[360px] rounded-full bg-aqua-500/10 blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-fuchsia-500/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-aqua-500/40 bg-aqua-500/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-aqua-400">
            <ShoppingCart size={14} />
            Tienda Virtual
          </span>
          <h2 className="mt-6 font-display text-3xl font-bold text-white sm:text-5xl">
            <ShinyText text={config.storeName} className="text-[1em]" /> ·{' '}
            <span className="text-aqua-gradient">Perfumes & Gym</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400 sm:text-lg">
            Productos seleccionados al mejor precio. Haz tu pedido directo por WhatsApp y
            coordina la entrega.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                filter === f.key
                  ? 'bg-gradient-to-r from-aqua-400 to-aqua-600 text-ink-950 shadow-[0_0_20px_rgba(34,211,238,0.35)]'
                  : 'neon-border text-zinc-300 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-14 flex flex-col items-center gap-3 text-center"
        >
          <p className="text-sm text-zinc-400">
            ¿Buscas otro producto o venta por mayor? Escríbenos y te ayudamos.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-border inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-aqua-400 to-aqua-600 px-8 py-3.5 font-semibold text-ink-950"
            >
              <MessageCircle size={18} />
              Hablar con Modo Gym
            </a>
            {config.tiktok && (
              <a
                href={config.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="neon-border flex h-12 w-12 items-center justify-center rounded-xl text-aqua-400 transition-colors hover:text-white"
              >
                <TikTokIcon size={20} />
              </a>
            )}
            {config.instagram && (
              <a
                href={config.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="neon-border flex h-12 w-12 items-center justify-center rounded-xl text-aqua-400 transition-colors hover:text-white"
              >
                <InstagramIcon size={20} />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}