import { motion } from 'framer-motion'
import { FolderOpen, ArrowUpRight } from 'lucide-react'
import { PROJECTS, PROFILE } from '../data'

export default function Gallery() {
  return (
    <section id="portafolio" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
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
            Muestra de soluciones reales que transforman negocios.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="neon-border group relative overflow-hidden rounded-2xl bg-ink-900"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-aqua-400/50 bg-ink-950/80 px-3 py-1 text-xs font-semibold text-aqua-300 backdrop-blur">
                  {project.category}
                </span>
              </div>

              <div className="relative -mt-10 p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <a
                    href={PROFILE.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Consultar por ${project.title}`}
                    className="neon-border flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-aqua-400"
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {project.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
