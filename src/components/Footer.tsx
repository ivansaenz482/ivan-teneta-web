import { Sparkles, MessageCircle, Mail, ArrowUp } from 'lucide-react'
import { useConfig } from '../lib/config'
import { TikTokIcon, InstagramIcon } from './icons'

export default function Footer() {
  const { config, waLink, recordWhatsappClick } = useConfig()

  const logo = config.logoImage ? (
    <img
      src={config.logoImage}
      alt={config.brandName}
      className="h-10 w-10 rounded-xl object-cover"
    />
  ) : (
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-aqua-400 to-aqua-600 text-ink-950">
      <Sparkles size={22} strokeWidth={2.4} />
    </span>
  )

  return (
    <footer className="border-t border-aqua-500/15 bg-ink-950 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <a href="#inicio" className="flex items-center gap-2">
            {logo}
            <span className="font-display text-lg font-bold text-white">
              {config.brandName.split(' ')[0]}{' '}
              <span className="text-aqua-gradient">
                {config.brandName.split(' ').slice(1).join(' ')}
              </span>
            </span>
          </a>

          <p className="text-center text-sm text-zinc-400">
            © {new Date().getFullYear()} {config.brandName}. Todos los derechos reservados.
          </p>

          <a
            href="#admin"
            className="text-xs font-medium text-zinc-600 transition-colors hover:text-aqua-400"
          >
            Acceso administrador
          </a>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={recordWhatsappClick}
              aria-label="WhatsApp"
              className="neon-border flex h-11 w-11 items-center justify-center rounded-xl text-aqua-400"
            >
              <MessageCircle size={20} />
            </a>
            {config.tiktok && (
              <a
                href={config.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="neon-border flex h-11 w-11 items-center justify-center rounded-xl text-aqua-400"
              >
                <TikTokIcon size={20} />
              </a>
            )}
            {config.instagram && (
              <a
                href={config.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="neon-border flex h-11 w-11 items-center justify-center rounded-xl text-aqua-400"
              >
                <InstagramIcon size={20} />
              </a>
            )}
            <a
              href={`mailto:${config.email}`}
              aria-label="Correo"
              className="neon-border flex h-11 w-11 items-center justify-center rounded-xl text-aqua-400"
            >
              <Mail size={20} />
            </a>
            <a
              href="#inicio"
              aria-label="Volver arriba"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-aqua-400 to-aqua-600 text-ink-950"
            >
              <ArrowUp size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}