import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, MessageCircle, Sparkles } from 'lucide-react'
import { PROFILE } from '../data'

const links = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#portafolio', label: 'Portafolio' },
  { href: '#acerca', label: 'Acerca de' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-aqua-500/20 bg-ink-950/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4">
        <a href="#inicio" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-aqua-400 to-aqua-600 text-ink-950 shadow-[0_0_20px_rgba(34,211,238,0.35)]">
            <Sparkles size={22} strokeWidth={2.4} />
          </span>
          <span className="font-display text-lg font-bold text-white">
            NovaSys <span className="text-aqua-gradient">Digital</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-300 transition-colors hover:text-aqua-400"
            >
              {link.label}
            </a>
          ))}
          <a
            href={PROFILE.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="neon-border inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
          >
            <MessageCircle size={16} className="text-aqua-400" />
            Contactar
          </a>
        </div>

        <button
          className="rounded-lg border border-white/15 p-2 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-white/10 bg-ink-950/95 px-6 py-6 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-zinc-200 transition-colors hover:text-aqua-400"
              >
                {link.label}
              </a>
            ))}
            <a
              href={PROFILE.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-aqua-400 to-aqua-600 px-5 py-3 font-semibold text-ink-950"
            >
              <MessageCircle size={18} />
              Cotizar ahora
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
