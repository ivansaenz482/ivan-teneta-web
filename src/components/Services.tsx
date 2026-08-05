import { motion } from 'framer-motion'
import {
  ReceiptText,
  Calculator,
  Globe,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'
import { SERVICES } from '../data'

const ICONS: Record<string, LucideIcon> = {
  receipt: ReceiptText,
  calculator: Calculator,
  globe: Globe,
  smartphone: Smartphone,
}

export default function Services() {
  return (
    <section id="servicios" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-aqua-500/40 bg-aqua-500/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-aqua-400">
            Servicios
          </span>
          <h2 className="mt-6 font-display text-3xl font-bold sm:text-5xl">
            Soluciones <span className="text-aqua-gradient">tecnológicas</span> de alto nivel
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Todo lo que tu negocio necesita para crecer, automatizado y con calidad profesional.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon]
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="neon-border group relative flex flex-col rounded-2xl bg-ink-900/80 p-7 backdrop-blur"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-aqua-400 to-aqua-600 text-ink-950 shadow-[0_0_24px_rgba(250,204,21,0.35)]">
                  <Icon size={26} strokeWidth={2.2} />
                </div>

                <h3 className="mt-6 font-display text-xl font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-2 border-t border-white/10 pt-5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-zinc-300">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-aqua-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aqua-400/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
