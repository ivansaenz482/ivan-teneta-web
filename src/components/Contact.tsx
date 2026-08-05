import { motion } from 'framer-motion'
import { MessageCircle, Mail, MapPin, Clock } from 'lucide-react'
import { PROFILE } from '../data'

const channels = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: PROFILE.whatsapp,
    href: PROFILE.whatsappLink,
    note: 'Respuesta rápida',
  },
  {
    icon: Mail,
    label: 'Correo electrónico',
    value: PROFILE.email,
    href: PROFILE.emailLink,
    note: 'Cotizaciones y proyectos',
  },
  {
    icon: MapPin,
    label: 'Ubicación',
    value: PROFILE.location,
    href: null,
    note: 'Servicio en todo el país',
  },
  {
    icon: Clock,
    label: 'Horario',
    value: 'Lun a Sáb · 08:00 - 20:00',
    href: null,
    note: 'Atención personalizada',
  },
]

export default function Contact() {
  return (
    <section id="contacto" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gold-500/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-400">
            Contacto
          </span>
          <h2 className="mt-6 font-display text-3xl font-bold text-white sm:text-5xl">
            ¿Listo para <span className="text-gold-gradient">digitalizar</span> tu negocio?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            Escríbeme hoy y recibe una cotización sin compromiso. Tu proyecto merece calidad
            profesional desde el primer mensaje.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {channels.map((channel, i) => {
            const Icon = channel.icon
            const inner = (
              <div className="neon-border group flex h-full items-center gap-5 rounded-2xl bg-ink-900/80 p-6 backdrop-blur">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-ink-950 shadow-[0_0_20px_rgba(250,204,21,0.3)]">
                  <Icon size={26} strokeWidth={2.2} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-widest text-gold-400">
                    {channel.label}
                  </div>
                  <div className="mt-1 break-words font-display text-lg font-semibold text-white">
                    {channel.value}
                  </div>
                  <div className="mt-0.5 text-sm text-zinc-500">{channel.note}</div>
                </div>
              </div>
            )
            return (
              <motion.div
                key={channel.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {channel.href ? (
                  <a href={channel.href} target={channel.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="block h-full">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <a
            href={PROFILE.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="neon-border inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-gold-400 to-gold-600 px-10 py-5 font-display text-lg font-bold text-ink-950"
          >
            <MessageCircle size={24} />
            Empezar ahora por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}
