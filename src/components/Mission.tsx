import { motion } from 'framer-motion'
import { Eye, Rocket, ShieldCheck, Cpu, HeartHandshake, BadgeCheck } from 'lucide-react'
import GradientText from './reactbits/GradientText'

const pillars = [
  {
    icon: Eye,
    title: 'Visión',
    text: 'Ser la empresa de referencia en digitalización de negocios en Ecuador y Latinoamérica, reconocida por la calidad, la innovación y el impacto real de cada proyecto que entregamos.',
  },
  {
    icon: Rocket,
    title: 'Misión',
    text: 'Digitalizar y automatizar los procesos de nuestros clientes mediante sistemas de facturación, contabilidad, páginas web y aplicaciones móviles, con soluciones impecables que ahorran tiempo y generan crecimiento.',
  },
]

const values = [
  { icon: ShieldCheck, label: 'Calidad' },
  { icon: Cpu, label: 'Innovación' },
  { icon: HeartHandshake, label: 'Compromiso' },
  { icon: BadgeCheck, label: 'Transparencia' },
]

export default function Mission() {
  return (
    <section id="vision" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-[360px] w-[360px] rounded-full bg-aqua-500/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-aqua-500/40 bg-aqua-500/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-aqua-400">
            Visión y Misión
          </span>
          <h2 className="mt-6 font-display text-3xl font-bold text-white sm:text-5xl">
            <GradientText>Nuestra razón de ser</GradientText>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            Construimos tecnología con propósito: cada sistema deja una empresa más simple,
            moderna y rentable.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="neon-border relative flex flex-col rounded-3xl bg-ink-900/80 p-8 backdrop-blur sm:p-10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-aqua-400 to-aqua-600 text-ink-950 shadow-[0_0_24px_rgba(250,204,21,0.3)]">
                  <Icon size={26} strokeWidth={2.2} />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-white">{pillar.title}</h3>
                <p className="mt-3 leading-relaxed text-zinc-400">{pillar.text}</p>
              </motion.article>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {values.map((value) => {
            const Icon = value.icon
            return (
              <span
                key={value.label}
                className="inline-flex items-center gap-2 rounded-full border border-aqua-500/25 bg-aqua-500/5 px-5 py-2.5 text-sm font-semibold text-zinc-200"
              >
                <Icon size={16} className="text-aqua-400" />
                {value.label}
              </span>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}