import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, FolderOpen, ArrowUpRight, Layers } from 'lucide-react'
import { PROJECTS } from '../data'
import { useConfig } from '../lib/config'

export default function Gallery() {
  const { waLink, recordWhatsappClick } = useConfig()
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = (dir: number) => {
    setDirection(dir)
    setIndex((i) => (i + dir + PROJECTS.length) % PROJECTS.length)
  }

  useEffect(() => {
    const id = setInterval(() => go(1), 6000)
    return () => clearInterval(id)
  }, [])

  const project = PROJECTS[index]

  return (
    <section id="portafolio" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-aqua-500/40 bg-aqua-500/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-aqua-400">
            <FolderOpen size={14} />
            Portafolio
          </span>
          <h2 className="mt-6 font-display text-3xl font-bold text-white sm:text-5xl">
            Proyectos <span className="text-aqua-gradient">recientes</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Soluciones reales que transforman negocios. Desliza para ver más.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="neon-border relative mt-16 overflow-hidden rounded-3xl bg-ink-900"
        >
          <div className="relative h-[420px] sm:h-[520px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={project.id}
                custom={direction}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 0.7 }, scale: { duration: 7, ease: 'linear' } }}
                className="absolute inset-0"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />

            <button
              onClick={() => go(-1)}
              aria-label="Anterior"
              className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl border border-white/20 bg-ink-950/60 text-white backdrop-blur transition-colors hover:border-aqua-400/70 hover:text-aqua-400"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Siguiente"
              className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl border border-white/20 bg-ink-950/60 text-white backdrop-blur transition-colors hover:border-aqua-400/70 hover:text-aqua-400"
            >
              <ChevronRight size={24} />
            </button>

            <div className="absolute inset-x-0 bottom-0 z-10 p-8 sm:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-aqua-400/50 bg-ink-950/80 px-4 py-1.5 text-xs font-semibold text-aqua-300 backdrop-blur">
                    <Layers size={12} />
                    {project.category}
                  </span>
                  <h3 className="mt-4 max-w-2xl font-display text-2xl font-bold text-white sm:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm text-zinc-300 sm:text-base">
                    {project.description}
                  </p>
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={recordWhatsappClick}
                    className="neon-border mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-aqua-400 to-aqua-600 px-6 py-3 font-semibold text-ink-950"
                  >
                    Cotizar este proyecto
                    <ArrowUpRight size={18} />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="absolute left-1/2 top-6 z-10 flex -translate-x-1/2 gap-2">
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => {
                  setDirection(i > index ? 1 : -1)
                  setIndex(i)
                }}
                aria-label={`Ver ${p.title}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? 'w-8 bg-aqua-400' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
