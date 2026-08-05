import { Code2, MessageCircle, Mail, ArrowUp } from 'lucide-react'
import { PROFILE } from '../data'

export default function Footer() {
  return (
    <footer className="border-t border-gold-500/15 bg-ink-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <a href="#inicio" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-ink-950">
              <Code2 size={22} strokeWidth={2.4} />
            </span>
            <span className="font-display text-lg font-bold text-white">
              Ivan <span className="text-gold-gradient">Teneta</span>
            </span>
          </a>

          <p className="text-center text-sm text-zinc-400">
            © {new Date().getFullYear()} {PROFILE.name}. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-3">
            <a
              href={PROFILE.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="neon-border flex h-11 w-11 items-center justify-center rounded-xl text-gold-400"
            >
              <MessageCircle size={20} />
            </a>
            <a
              href={PROFILE.emailLink}
              aria-label="Correo"
              className="neon-border flex h-11 w-11 items-center justify-center rounded-xl text-gold-400"
            >
              <Mail size={20} />
            </a>
            <a
              href="#inicio"
              aria-label="Volver arriba"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-ink-950"
            >
              <ArrowUp size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
