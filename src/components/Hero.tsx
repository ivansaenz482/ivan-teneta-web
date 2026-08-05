import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Cpu,
  Zap,
  BadgeCheck,
} from 'lucide-react'
import { PROFILE } from '../data'
import HeroBackdrop from './HeroBackdrop'

const stats = [
  { value: '100%', label: 'Clientes satisfechos' },
  { value: '24/7', label: 'Soporte técnico' },
  { value: '+50', label: 'Proyectos entregados' },
  { value: '5.0', label: 'Calidad garantizada' },
]

export default function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 120])

  return (
    <section className="relative overflow-hidden bg-grid">
      <HeroBackdrop />

      <motion.div
        style={{ y }}
        className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-28 pb-16 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-aqua-500/40 bg-aqua-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-aqua-300"
        >
          <BadgeCheck size={14} />
          Ingeniero en Tecnología de la Información
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 font-display text-4xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl"
        >
          Ivan Leonel
          <br />
          <span className="text-aqua-gradient">Teneta Saenz</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl"
        >
          Especialista en <strong className="text-white">sistemas de facturación</strong>,{' '}
          <strong className="text-white">contabilidad digital</strong>,{' '}
          <strong className="text-white">páginas web profesionales</strong> y{' '}
          <strong className="text-white">aplicaciones móviles</strong>. Llevo tu negocio al
          siguiente nivel con tecnología de vanguardia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href={PROFILE.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="neon-border inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-aqua-400 to-aqua-600 px-8 py-4 font-semibold text-ink-950"
          >
            <MessageCircle size={20} />
            Cotizar por WhatsApp
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-4 font-semibold text-white transition-colors hover:border-aqua-400/70 hover:bg-aqua-500/10"
          >
            Ver servicios
            <ArrowRight size={20} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="neon-border rounded-xl bg-ink-900/70 px-4 py-5 backdrop-blur"
            >
              <div className="font-display text-2xl font-bold text-aqua-gradient">{stat.value}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-zinc-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold uppercase tracking-widest text-zinc-500"
        >
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-aqua-400" /> Seguridad
          </span>
          <span className="h-1 w-1 rounded-full bg-aqua-500/50" />
          <span className="inline-flex items-center gap-1.5">
            <Cpu size={14} className="text-aqua-400" /> Tecnología moderna
          </span>
          <span className="h-1 w-1 rounded-full bg-aqua-500/50" />
          <span className="inline-flex items-center gap-1.5">
            <Zap size={14} className="text-aqua-400" /> Resultados rápidos
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
