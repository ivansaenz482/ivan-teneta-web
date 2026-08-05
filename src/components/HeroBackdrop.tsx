import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ReceiptText,
  FileText,
  Wallet,
  TrendingUp,
  Home,
  Bell,
  Search,
  Settings,
  ChevronRight,
  Calculator,
  Globe,
  Smartphone,
  BarChart3,
} from 'lucide-react'

function InvoiceDashboard() {
  const rows = [
    { client: 'Distribuidora Andina S.A.', total: '$12,480.50', status: 'Pagada' },
    { client: 'Comercial Pacífico Cía.', total: '$8,920.00', status: 'Pendiente' },
    { client: 'Lab. Novalab E.U.', total: '$15,312.75', status: 'Pagada' },
  ]
  return (
    <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/15 bg-ink-900/90 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-5 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <span className="ml-3 text-xs font-medium text-zinc-400">SistemaFacturacion · v3.2</span>
      </div>
      <div className="grid gap-6 p-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Facturado hoy', value: '$36,713.25', icon: ReceiptText, up: '+12%' },
            { label: 'Comprobantes', value: '1,284', icon: FileText, up: '+8%' },
            { label: 'Cobros', value: '$28,400.00', icon: Wallet, up: '+5%' },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <kpi.icon size={16} className="text-aqua-400" />
                <span className="text-[10px] font-semibold text-emerald-400">{kpi.up}</span>
              </div>
              <div className="mt-2 text-lg font-bold text-white">{kpi.value}</div>
              <div className="text-[11px] text-zinc-400">{kpi.label}</div>
            </div>
          ))}
        </div>
        <div className="flex items-end gap-2 border-b border-white/10 pb-4" style={{ height: 90 }}>
          {[42, 68, 55, 88, 61, 96, 74].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-aqua-600 to-aqua-400" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Últimas facturas
          </div>
          {rows.map((row) => (
            <div
              key={row.client}
              className="flex items-center justify-between border-b border-white/5 py-2.5 last:border-0"
            >
              <span className="text-xs font-medium text-zinc-300">{row.client}</span>
              <span className="flex items-center gap-3">
                <span className="text-xs font-bold text-white">{row.total}</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                    row.status === 'Pagada'
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-amber-500/15 text-amber-400'
                  }`}
                >
                  {row.status}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AccountingPanel() {
  return (
    <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/15 bg-ink-900/90 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-5 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <span className="ml-3 text-xs font-medium text-zinc-400">ContabilidadPro · Estado de Resultados</span>
      </div>
      <div className="grid grid-cols-2 gap-6 p-6">
        <div className="space-y-4">
          <div className="rounded-xl bg-white/5 p-4">
            <div className="text-[11px] text-zinc-400">Ingresos del mes</div>
            <div className="mt-1 text-xl font-bold text-emerald-400">$54,210.00</div>
            <div className="text-[10px] text-emerald-400">▲ 14% vs mes anterior</div>
          </div>
          <div className="rounded-xl bg-white/5 p-4">
            <div className="text-[11px] text-zinc-400">Egresos del mes</div>
            <div className="mt-1 text-xl font-bold text-rose-400">$31,875.40</div>
            <div className="text-[10px] text-rose-400">▼ 6% vs mes anterior</div>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-aqua-600/30 to-aqua-500/10 p-4">
            <div className="text-[11px] text-aqua-300">Utilidad neta</div>
            <div className="mt-1 text-xl font-bold text-aqua-400">$22,334.60</div>
            <div className="text-[10px] text-aqua-300">Margen del 41.2%</div>
          </div>
        </div>
        <div className="flex items-center justify-center rounded-xl bg-white/5 p-4">
          <svg viewBox="0 0 160 160" className="h-44 w-44 -rotate-90">
            <circle cx="80" cy="80" r="62" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="16" />
            <circle
              cx="80"
              cy="80"
              r="62"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray="389"
              strokeDashoffset="170"
            />
            <text x="80" y="76" textAnchor="middle" className="fill-white" fontSize="22" fontWeight="700" transform="rotate(90 80 80)">
              58%
            </text>
            <text x="80" y="98" textAnchor="middle" className="fill-zinc-400" fontSize="9" transform="rotate(90 80 80)">
              Rentabilidad
            </text>
          </svg>
        </div>
      </div>
    </div>
  )
}

function MobileApp() {
  return (
    <div className="relative w-60 rounded-[2.2rem] border-[6px] border-ink-700 bg-ink-800 shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
      <div className="absolute left-1/2 top-2 h-4 w-24 -translate-x-1/2 rounded-full bg-ink-950" />
      <div className="space-y-3 p-5 pt-8">
        <div className="flex items-center justify-between">
          <Home size={16} className="text-aqua-400" />
          <Bell size={15} className="text-zinc-500" />
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
          <Search size={12} className="text-zinc-500" />
          <span className="text-[10px] text-zinc-500">Buscar transacciones</span>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-aqua-500 to-aqua-700 p-4">
          <div className="text-[9px] uppercase tracking-wider text-white/70">Saldo total</div>
          <div className="mt-1 text-xl font-bold text-white">$48,230.00</div>
          <div className="mt-3 flex items-center gap-2 text-[9px] text-white/80">
            <TrendingUp size={12} />
            +18% este mes
          </div>
        </div>
        {[
          { icon: ReceiptText, label: 'Nueva factura' },
          { icon: FileText, label: 'Comprobantes' },
          { icon: Wallet, label: 'Cobros y pagos' },
          { icon: Settings, label: 'Ajustes' },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2.5"
          >
            <span className="flex items-center gap-2.5">
              <item.icon size={14} className="text-aqua-400" />
              <span className="text-[11px] font-medium text-zinc-200">{item.label}</span>
            </span>
            <ChevronRight size={14} className="text-zinc-500" />
          </div>
        ))}
      </div>
    </div>
  )
}

const SLIDES = [
  {
    id: 'facturacion',
    element: <InvoiceDashboard />,
    position: '-left-32 top-[15%] rotate-[-6deg]',
    mobileScale: 0.5,
  },
  {
    id: 'contabilidad',
    element: <AccountingPanel />,
    position: '-right-24 top-[13%] rotate-[4deg]',
    mobileScale: 0.5,
  },
  {
    id: 'movil',
    element: <MobileApp />,
    position: 'left-[40%] top-[20%]',
    mobileScale: 0.8,
  },
]

const FLOATING = [
  { icon: ReceiptText, className: 'left-[8%] top-[22%]', delay: 0 },
  { icon: Calculator, className: 'right-[10%] top-[26%]', delay: 0.8 },
  { icon: Globe, className: 'left-[14%] bottom-[18%]', delay: 1.6 },
  { icon: Smartphone, className: 'right-[14%] bottom-[22%]', delay: 2.4 },
  { icon: BarChart3, className: 'left-[28%] bottom-[8%]', delay: 3.2 },
  { icon: Wallet, className: 'right-[26%] top-[12%]', delay: 4 },
]

export default function HeroBackdrop() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-aqua-500/15 blur-[130px]" />
      <div className="absolute bottom-0 right-1/4 h-[380px] w-[380px] rounded-full bg-aqua-600/15 blur-[120px]" />

      {FLOATING.map((chip) => (
        <motion.div
          key={chip.className}
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: chip.delay }}
          className={`absolute hidden h-14 w-14 items-center justify-center rounded-2xl border border-aqua-400/30 bg-ink-900/60 text-aqua-400 shadow-[0_0_24px_rgba(34,211,238,0.2)] backdrop-blur lg:flex ${chip.className}`}
        >
          <chip.icon size={22} strokeWidth={2} />
        </motion.div>
      ))}

      <AnimatePresence mode="sync">
        <motion.div
          key={SLIDES[index].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.4 } }}
          className={`absolute hidden lg:block ${SLIDES[index].position}`}
        >
          <motion.div
            animate={{ scale: [1, 1.14, 1.05] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            className="opacity-90"
          >
            {SLIDES[index].element}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="sync">
        <motion.div
          key={`${SLIDES[index].id}-mobile`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.4 } }}
          className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center opacity-40 lg:hidden"
        >
          <div style={{ transform: `scale(${SLIDES[index].mobileScale})` }}>
            {SLIDES[index].element}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/70 to-ink-950" />
    </div>
  )
}
