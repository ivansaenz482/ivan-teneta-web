import { motion } from 'framer-motion'
import { GraduationCap, Award, Target, HeartHandshake } from 'lucide-react'

const highlights = [
  {
    icon: GraduationCap,
    title: 'Formación de Ingeniería',
    text: 'Base técnica sólida en ingeniería de software y arquitectura de sistemas modernos.',
  },
  {
    icon: Award,
    title: 'Enfoque en calidad',
    text: 'Cada proyecto se entrega pulido, probado y con estándares de nivel profesional.',
  },
  {
    icon: Target,
    title: 'Orientado a resultados',
    text: 'Soluciones que optimizan procesos y generan ahorro real de tiempo y dinero.',
  },
  {
    icon: HeartHandshake,
    title: 'Acompañamiento real',
    text: 'Soporte cercano antes, durante y después de cada implementación.',
  },
]

export default function About() {
  return (
    <section id="acerca" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-400">
              Sobre mí
            </span>
            <h2 className="mt-6 font-display text-3xl font-bold text-white sm:text-5xl">
              Tecnología con <span className="text-gold-gradient">criterio profesional</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-zinc-400">
              Soy el Ing. Ivan Leonel Teneta Saenz, ingeniero de software dedicado a transformar
              negocios a través de soluciones digitales hechas a la medida. Diseño sistemas de
              facturación y contabilidad que eliminan el trabajo manual, y desarrollo páginas web y
              aplicaciones móviles que posicionan a las empresas en el mundo digital.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-zinc-400">
              Mi compromiso: entregar productos impecables, con bordes claros, funcionalidad
              precisa y una experiencia de usuario que hable por sí sola.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="neon-border inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 px-7 py-3.5 font-semibold text-ink-950"
              >
                Hablemos de tu proyecto
              </a>
            </div>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {highlights.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="neon-border rounded-2xl bg-ink-900/80 p-6 backdrop-blur"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 text-ink-950">
                    <Icon size={24} strokeWidth={2.2} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.text}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
