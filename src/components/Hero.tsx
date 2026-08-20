import { motion } from 'framer-motion'
import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Cpu,
  Zap,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { useConfig } from '../lib/config'
import HeroBackdrop from './HeroBackdrop'
import BlurText from './reactbits/BlurText'
import CountUp from './reactbits/CountUp'
import { Parallax } from './Parallax'

type Stat = {
  label: string
  icon: LucideIcon
  value?: number
  prefix?: string
  suffix?: string
  duration?: number
}

const stats: Stat[] = [
  {
    label: 'Clientes satisfechos',
    icon: ShieldCheck,
    value: 100,
    suffix: '%',
    duration: 2,
  },
  {
    label: 'Soporte técnico',
    icon: Cpu,
    value: 24,
    suffix: '/7',
    duration: 2.4,
  },
  {
    label: 'Proyectos entregados',
    icon: Zap,
    value: 50,
    prefix: '+',
    duration: 2.2,
  },
  {
    label: 'Calidad garantizada',
    icon: Sparkles,
    value: 5,
    suffix: '.0',
    duration: 1.8,
  },
]

function StatDisplay({ stat }: { stat: Stat }) {
  const Icon = stat.icon
  return (
    <div className="neon-border rounded-xl bg-ink-900/70 px-4 py-5 backdrop-blur">
      <div className="flex items-center justify-center gap-2">
        <Icon size={20} className="shrink-0 text-aqua-400" />
        {stat.value !== undefined && (
          <CountUp
            to={stat.value}
            prefix={stat.prefix ?? ''}
            suffix={stat.suffix ?? ''}
            duration={stat.duration ?? 2}
            className="font-display text-2xl font-bold text-aqua-gradient tabular-nums"
          />
        )}
      </div>
      <div className="mt-1 text-xs font-medium uppercase tracking-wider text-zinc-400">
        {stat.label}
      </div>
    </div>
  )
}

export default function Hero() {
  const { waLink, recordWhatsappClick } = useConfig()

  return (
    <section className="relative overflow-hidden bg-grid">
      <HeroBackdrop />

      <Parallax
        speed={0.85}
        className="relative mx-auto flex min-h-screen min-h-[100svh] max-w-7xl flex-col items-center justify-center px-5 pb-16 pt-28 sm:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-aqua-500/40 bg-aqua-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-aqua-300"
        >
          <Sparkles size={14} />
          NovaSys Digital
        </motion.div>

        <h1 className="mt-8 max-w-4xl text-center font-display font-extrabold leading-tight text-white text-[clamp(2.1rem,6.5vw,4.5rem)]">
          <BlurText
            text="Digitaliza y automatiza tu negocio"
            className="justify-center"
            animateBy="words"
            direction="top"
            delay={28}
            stepDuration={0.32}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl text-center text-lg leading-relaxed text-zinc-400 sm:text-xl"
        >
          Sistemas de <strong className="text-white">facturación</strong>,{' '}
          <strong className="text-white">contabilidad digital</strong>,{' '}
          <strong className="text-white">páginas web profesionales</strong> y{' '}
          <strong className="text-white">aplicaciones móviles</strong>. Llevamos tu negocio al
          siguiente nivel con tecnología de vanguardia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex w-full max-w-md flex-col items-center gap-4 sm:max-w-none sm:flex-row"
        >
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={recordWhatsappClick}
            className="neon-border inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-aqua-400 to-aqua-600 px-8 py-4 font-semibold text-ink-950 sm:w-auto"
          >
            <MessageCircle size={20} />
            Cotizar por WhatsApp
          </a>
          <a
            href="#servicios"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-8 py-4 font-semibold text-white transition-colors hover:border-aqua-400/70 hover:bg-aqua-500/10 sm:w-auto"
          >
            Ver servicios
            <ArrowRight size={20} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-3 sm:gap-4"
        >
          {stats.map((stat) => (
            <StatDisplay key={stat.label} stat={stat} />
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
      </Parallax>
    </section>
  )
}