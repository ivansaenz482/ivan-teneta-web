import { useRef } from 'react'
import { motion } from 'framer-motion'
import { QRCodeCanvas } from 'qrcode.react'
import { Download, Printer, Sparkles, QrCode } from 'lucide-react'
import { PROFILE } from '../data'

export default function QRCode() {
  const qrRef = useRef<HTMLCanvasElement>(null)
  const url = typeof window !== 'undefined' ? window.location.href : PROFILE.whatsappLink

  const downloadPng = () => {
    const canvas = qrRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'novasys-digital-qr.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <section id="qr" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[380px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aqua-500/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-aqua-500/40 bg-aqua-500/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-aqua-400">
            <QrCode size={14} />
            Código QR
          </span>
          <h2 className="mt-6 font-display text-3xl font-bold text-white sm:text-5xl">
            Comparte <span className="text-aqua-gradient">nuestra página</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            Escanea el código QR y visita nuestro sitio al instante. Imprímelo en tu tarjeta de
            presentación, volantes o vitrina para que tus clientes te encuentren fácilmente.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12 flex justify-center"
        >
          <div
            id="qr-print-card"
            className="qr-print w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center justify-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-aqua-400 to-aqua-600 text-ink-950">
                <Sparkles size={22} strokeWidth={2.4} />
              </span>
              <span className="font-display text-xl font-bold text-ink-950">
                NovaSys <span className="text-aqua-600">Digital</span>
              </span>
            </div>

            <div className="mt-6 flex justify-center">
              <QRCodeCanvas
                ref={qrRef}
                value={url}
                size={224}
                level="M"
                bgColor="#ffffff"
                fgColor="#05070d"
                title="NovaSys Digital"
              />
            </div>

            <div className="mt-5 break-all font-mono text-xs font-medium text-zinc-500">{url}</div>

            <div className="mt-5 border-t border-zinc-200 pt-4 text-sm font-semibold text-zinc-700">
              Escanea y conoce nuestros servicios
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={downloadPng}
            className="neon-border inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-aqua-400 to-aqua-600 px-8 py-4 font-semibold text-ink-950 sm:w-auto"
          >
            <Download size={20} />
            Descargar QR (PNG)
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-8 py-4 font-semibold text-white transition-colors hover:border-aqua-400/70 hover:bg-aqua-500/10 sm:w-auto"
          >
            <Printer size={20} />
            Imprimir QR
          </button>
        </motion.div>
      </div>
    </section>
  )
}