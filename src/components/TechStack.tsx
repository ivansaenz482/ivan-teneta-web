import { motion } from 'framer-motion'
import { Server, Database, Code2, Wrench } from 'lucide-react'

const MARQUEE = [
  { name: 'Node.js', color: '#8cc84b' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'React', color: '#61dafb' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'Python', color: '#3776ab' },
  { name: 'SQL', color: '#e38c00' },
  { name: 'Git', color: '#f05032' },
  { name: 'GitHub', color: '#e6edf7' },
  { name: 'Docker', color: '#2496ed' },
  { name: 'Tailwind CSS', color: '#38bdf8' },
  { name: 'Express', color: '#9f9f9f' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'MySQL', color: '#00758f' },
  { name: 'MongoDB', color: '#47a248' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'Linux', color: '#fcc624' },
]

const CATEGORIES = [
  {
    icon: Server,
    title: 'Backend',
    items: ['Node.js', 'Python', 'Express', 'APIs REST'],
  },
  {
    icon: Database,
    title: 'Bases de Datos',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQL'],
  },
  {
    icon: Code2,
    title: 'Frontend',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
  },
  {
    icon: Wrench,
    title: 'Herramientas',
    items: ['Git', 'GitHub', 'Docker', 'Linux'],
  },
]

function MarqueeRow() {
  return (
    <div className="flex items-center gap-4 pr-4">
      {MARQUEE.map((tech) => (
        <span
          key={tech.name}
          className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-ink-900/70 px-6 py-3 font-mono text-sm font-semibold text-zinc-200 backdrop-blur"
        >
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: tech.color, boxShadow: `0 0 10px ${tech.color}` }}
          />
          {tech.name}
        </span>
      ))}
    </div>
  )
}

export default function TechStack() {
  return (
    <section id="tecnologias" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-aqua-500/10 blur-[120px]" />
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
            Stack tecnológico
          </span>
          <h2 className="mt-6 font-display text-3xl font-bold text-white sm:text-5xl">
            Tecnologías <span className="text-aqua-gradient">de vanguardia</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Construimos con herramientas modernas, probadas y de alto rendimiento.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8 }}
        className="relative mt-14 overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div className="flex w-max animate-marquee">
          <MarqueeRow />
          <MarqueeRow />
        </div>
      </motion.div>

      <div className="relative mx-auto mt-16 grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((category, i) => {
          const Icon = category.icon
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="neon-border rounded-2xl bg-ink-900/80 p-6 backdrop-blur"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-aqua-400 to-aqua-600 text-ink-950">
                <Icon size={24} strokeWidth={2.2} />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">
                {category.title}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
