import { useState, type ReactNode, type FormEvent } from 'react'
import {
  ArrowLeft,
  LayoutDashboard,
  ShoppingBag,
  Share2,
  Lock,
  Eye,
  EyeOff,
  MessageCircle,
  Upload,
  RotateCcw,
  Save,
  KeyRound,
  TrendingUp,
  Users,
  Package,
  Tags,
  Plus,
  Trash2,
  AlertTriangle,
} from 'lucide-react'
import { useConfig } from '../lib/config'
import { fileToDataUri } from '../lib/productImages'
import type { Product } from '../data'

function Field({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
        {label}
      </span>
      {children}
    </label>
  )
}

const inputClass =
  'w-full rounded-lg border border-white/10 bg-ink-950/80 px-3.5 py-2.5 text-sm text-white outline-none transition-colors focus:border-aqua-400'

function AdminLogin() {
  const { config } = useConfig()
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (password === config.adminPassword) {
      sessionStorage.setItem('modogym_admin_auth', '1')
      setError(false)
      window.location.reload()
    } else {
      setError(true)
    }
  }

  return (
    <div className="flex min-h-screen min-h-[100svh] items-center justify-center bg-grid px-4">
      <div className="neon-border w-full max-w-sm rounded-2xl bg-ink-900/90 p-8 backdrop-blur">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-aqua-400 to-aqua-600 text-ink-950">
          <Lock size={26} />
        </div>
        <h1 className="mt-5 text-center font-display text-2xl font-bold text-white">
          Panel de Administración
        </h1>
        <p className="mt-1 text-center text-sm text-zinc-400">
          Ingresa la contraseña para continuar.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <Field label="Contraseña">
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={inputClass}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                aria-label="Mostrar contraseña"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </Field>

          {error && (
            <p className="text-sm font-medium text-rose-400">
              Contraseña incorrecta. Intenta de nuevo.
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-aqua-400 to-aqua-600 py-3 font-semibold text-ink-950 transition-transform hover:scale-[1.02]"
          >
            Entrar
          </button>
        </form>

        <a
          href="#"
          className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-aqua-400"
        >
          <ArrowLeft size={15} />
          Volver a la página
        </a>
      </div>
    </div>
  )
}

function DashboardTab() {
  const { config } = useConfig()
  const totalViews = Object.values(config.productViews).reduce((a, b) => a + b, 0)
  const top = [...config.products]
    .map((p) => ({ product: p, views: config.productViews[p.id] ?? 0 }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)
  const maxViews = Math.max(1, ...top.map((t) => t.views))

  const stats = [
    { label: 'Visitas', value: config.visits, icon: Users },
    { label: 'Clics a WhatsApp', value: config.whatsappClicks, icon: MessageCircle },
    { label: 'Productos publicados', value: config.products.length, icon: Package },
    { label: 'Vistas de productos', value: totalViews, icon: TrendingUp },
  ]

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="neon-border rounded-2xl bg-ink-900/80 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-aqua-400 to-aqua-600 text-ink-950">
                  <Icon size={20} />
                </span>
                <div>
                  <div className="font-display text-2xl font-bold text-white tabular-nums">
                    {s.value.toLocaleString()}
                  </div>
                  <div className="text-xs text-zinc-400">{s.label}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="neon-border rounded-2xl bg-ink-900/80 p-6">
        <h3 className="font-display text-lg font-semibold text-white">
          Productos más vistos por los clientes
        </h3>
        <p className="mt-1 text-sm text-zinc-400">
          Se registra automáticamente cuando un visitante ve cada producto.
        </p>
        <div className="mt-6 space-y-4">
          {top.map(({ product, views }) => (
            <div key={product.id}>
              <div className="mb-1 flex items-center justify-between gap-3">
                <span className="truncate text-sm font-medium text-zinc-200">
                  {product.name}
                </span>
                <span className="shrink-0 text-sm font-bold text-aqua-400 tabular-nums">
                  {views} vistas
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-aqua-400 to-aqua-600"
                  style={{ width: `${(views / maxViews) * 100}%` }}
                />
              </div>
            </div>
          ))}
          {top.length === 0 && (
            <p className="text-sm text-zinc-500">Aún no hay vistas registradas.</p>
          )}
        </div>
      </div>

      <p className="rounded-xl border border-white/10 bg-ink-950/60 p-4 text-xs leading-relaxed text-zinc-500">
        Los datos de visitas y vistas se guardan en este navegador (localStorage). Al ser un
        sitio estático sin servidor, no se sincronizan entre dispositivos.
      </p>
    </div>
  )
}

function ImageInput({
  value,
  onChange,
  onReset,
  onResetAvailable,
}: {
  value: string
  onChange: (dataUri: string) => void
  onReset: () => void
  onResetAvailable: boolean
}) {
  const [busy, setBusy] = useState(false)
  return (
    <div className="flex items-center gap-4">
      <img
        src={value}
        alt="Producto"
        className="h-16 w-16 shrink-0 rounded-lg border border-white/10 bg-ink-950/60 object-contain"
      />
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:border-aqua-400/60 hover:text-white">
          <Upload size={14} />
          {busy ? 'Cargando…' : 'Subir imagen'}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (!file) return
              setBusy(true)
              try {
                onChange(await fileToDataUri(file))
              } finally {
                setBusy(false)
                e.target.value = ''
              }
            }}
          />
        </label>
        {onResetAvailable && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-zinc-400 transition-colors hover:border-rose-400/60 hover:text-rose-300"
          >
            <RotateCcw size={14} />
            Restablecer
          </button>
        )}
      </div>
    </div>
  )
}

function ProductsTab() {
  const { config, updateProduct, categoryName } = useConfig()
  const [savedId, setSavedId] = useState<string | null>(null)

  const save = (id: string) => {
    setSavedId(id)
    setTimeout(() => setSavedId(null), 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-display text-lg font-semibold text-white">
            Gestionar productos
          </h3>
          <p className="text-sm text-zinc-400">
            Cambia precios, nombres, descripciones e imágenes de la tienda.
          </p>
        </div>
        {savedId && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-aqua-500/15 px-3 py-1.5 text-xs font-semibold text-aqua-300">
            <Save size={13} /> Guardado
          </span>
        )}
      </div>

      {config.products.map((product) => (
        <div
          key={product.id}
          className="neon-border rounded-2xl bg-ink-900/80 p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={product.image}
                alt={product.name}
                className="h-12 w-12 rounded-lg border border-white/10 bg-ink-950/60 object-contain"
              />
              <div>
                <div className="font-display text-base font-semibold text-white">
                  {product.name}
                </div>
                <div className="text-xs text-zinc-500">
                  {categoryName(product.category)} · ${product.price}
                </div>
              </div>
            </div>
            <span className="text-xs text-zinc-500 tabular-nums">
              {(config.productViews[product.id] ?? 0)} vistas
            </span>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Nombre">
              <input
                className={inputClass}
                value={product.name}
                onChange={(e) => updateProduct(product.id, { name: e.target.value })}
              />
            </Field>
            <Field label="Precio (USD)">
              <input
                type="number"
                min="0"
                step="0.01"
                className={inputClass}
                value={product.price}
                onChange={(e) =>
                  updateProduct(product.id, { price: Number(e.target.value) || 0 })
                }
              />
            </Field>
            <Field label="Categoría">
              <select
                className={inputClass}
                value={product.category}
                onChange={(e) =>
                  updateProduct(product.id, { category: e.target.value })
                }
              >
                {config.categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.emoji} {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Etiqueta">
              <select
                className={inputClass}
                value={product.tag ?? ''}
                onChange={(e) =>
                  updateProduct(product.id, {
                    tag: (e.target.value || undefined) as Product['tag'],
                  })
                }
              >
                <option value="">Sin etiqueta</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Popular">Popular</option>
                <option value="Oferta">Oferta</option>
              </select>
            </Field>
            <div className="sm:col-span-2 lg:col-span-1">
              <Field label="Imagen">
                <ImageInput
                  value={product.image}
                  onChange={(dataUri) => updateProduct(product.id, { image: dataUri })}
                  onReset={() =>
                    updateProduct(product.id, {
                      image: `data:image/svg+xml;utf8,${encodeURIComponent(
                        `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='400' height='400' fill='#101a2f'/><text x='200' y='250' font-size='170' text-anchor='middle'>${product.emoji}</text></svg>`
                      )}`,
                    })
                  }
                  onResetAvailable={!product.image.includes('emoji')}
                />
              </Field>
            </div>
          </div>

          <div className="mt-4">
            <Field label="Descripción">
              <textarea
                rows={2}
                className={inputClass}
                value={product.description}
                onChange={(e) =>
                  updateProduct(product.id, { description: e.target.value })
                }
              />
            </Field>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => save(product.id)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-aqua-400 to-aqua-600 px-5 py-2.5 text-sm font-semibold text-ink-950"
            >
              <Save size={16} />
              Guardar cambios
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

function SocialTab() {
  const { config, updateConfig } = useConfig()

  const set = (patch: Partial<typeof config>) => updateConfig(patch)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-lg font-semibold text-white">
          Redes sociales y contacto
        </h3>
        <p className="text-sm text-zinc-400">
          Estos datos se muestran en toda la página y en los mensajes de WhatsApp.
        </p>
      </div>

      <div className="neon-border grid gap-5 rounded-2xl bg-ink-900/80 p-6 sm:grid-cols-2">
        <Field label="Nombre de la marca">
          <input
            className={inputClass}
            value={config.brandName}
            onChange={(e) => set({ brandName: e.target.value })}
          />
        </Field>
        <Field label="Nombre de la tienda">
          <input
            className={inputClass}
            value={config.storeName}
            onChange={(e) => set({ storeName: e.target.value })}
          />
        </Field>
        <Field label="Número WhatsApp (ej. 0985136117)">
          <input
            className={inputClass}
            value={config.whatsapp}
            onChange={(e) => set({ whatsapp: e.target.value })}
          />
        </Field>
        <Field label="WhatsApp internacional (ej. +593985136117)">
          <input
            className={inputClass}
            value={config.whatsappIntl}
            onChange={(e) => set({ whatsappIntl: e.target.value })}
          />
        </Field>
        <Field label="Correo electrónico">
          <input
            className={inputClass}
            value={config.email}
            onChange={(e) => set({ email: e.target.value })}
          />
        </Field>
        <Field label="Ubicación">
          <input
            className={inputClass}
            value={config.location}
            onChange={(e) => set({ location: e.target.value })}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Saludo de WhatsApp">
            <textarea
              rows={2}
              className={inputClass}
              value={config.whatsappMessage}
              onChange={(e) => set({ whatsappMessage: e.target.value })}
            />
          </Field>
        </div>
      </div>

      <div className="neon-border grid gap-5 rounded-2xl bg-ink-900/80 p-6 sm:grid-cols-2">
        <Field label="TikTok (URL completa)">
          <input
            className={inputClass}
            value={config.tiktok}
            onChange={(e) => set({ tiktok: e.target.value })}
          />
        </Field>
        <Field label="Instagram (URL completa)">
          <input
            className={inputClass}
            value={config.instagram}
            onChange={(e) => set({ instagram: e.target.value })}
          />
        </Field>
      </div>

      <div className="neon-border rounded-2xl bg-ink-900/80 p-6">
        <Field label="Logo de la marca (aparece en el menú y pie de página)">
          <div className="mt-1">
            <ImageInput
              value={config.logoImage || `data:image/svg+xml;utf8,${encodeURIComponent(
                `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><rect width='80' height='80' rx='16' fill='#22d3ee'/><text x='40' y='52' font-size='40' text-anchor='middle'>✦</text></svg>`
              )}`}
              onChange={(dataUri) => set({ logoImage: dataUri })}
              onReset={() => set({ logoImage: '' })}
              onResetAvailable={Boolean(config.logoImage)}
            />
          </div>
        </Field>
      </div>
    </div>
  )
}

function SecurityTab() {
  const { config, updateConfig } = useConfig()
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (current !== config.adminPassword) {
      setStatus('error')
      return
    }
    if (next.length < 4) {
      setStatus('error')
      return
    }
    updateConfig({ adminPassword: next })
    setCurrent('')
    setNext('')
    setStatus('ok')
  }

  return (
    <div className="neon-border max-w-md rounded-2xl bg-ink-900/80 p-6">
      <h3 className="font-display text-lg font-semibold text-white">Cambiar contraseña</h3>
      <p className="mt-1 text-sm text-zinc-400">
        Usa mínimo 4 caracteres. La contraseña se guarda solo en este navegador.
      </p>

      <form onSubmit={submit} className="mt-5 space-y-4">
        <Field label="Contraseña actual">
          <input
            type="password"
            className={inputClass}
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </Field>
        <Field label="Nueva contraseña">
          <input
            type="password"
            className={inputClass}
            value={next}
            onChange={(e) => setNext(e.target.value)}
          />
        </Field>

        {status === 'ok' && (
          <p className="text-sm font-medium text-aqua-300">
            Contraseña actualizada correctamente.
          </p>
        )}
        {status === 'error' && (
          <p className="text-sm font-medium text-rose-400">
            La contraseña actual no es correcta o la nueva es muy corta.
          </p>
        )}

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-aqua-400 to-aqua-600 px-6 py-3 text-sm font-semibold text-ink-950"
        >
          <KeyRound size={16} />
          Actualizar contraseña
        </button>
      </form>
    </div>
  )
}

function CategoriesTab() {
  const { config, updateConfig } = useConfig()
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('')
  const [warnId, setWarnId] = useState<string | null>(null)

  const add = () => {
    const trimmed = name.trim()
    if (!trimmed) return
    const id = trimmed
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
    if (!id || config.categories.some((c) => c.id === id)) return
    updateConfig({
      categories: [...config.categories, { id, name: trimmed, emoji: emoji.trim() || '🏷️' }],
    })
    setName('')
    setEmoji('')
  }

  const update = (id: string, patch: { name?: string; emoji?: string }) => {
    updateConfig({
      categories: config.categories.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    })
  }

  const remove = (id: string) => {
    const used = config.products.filter((p) => p.category === id).length
    if (used > 0 || config.categories.length <= 1) {
      setWarnId(id)
      return
    }
    updateConfig({ categories: config.categories.filter((c) => c.id !== id) })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-lg font-semibold text-white">
          Categorías de la tienda
        </h3>
        <p className="text-sm text-zinc-400">
          Crea, renombra o elimina categorías. Los filtros de la tienda se actualizan
          automáticamente.
        </p>
      </div>

      <div className="neon-border rounded-2xl bg-ink-900/80 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Field label="Nombre de la nueva categoría">
              <input
                className={inputClass}
                placeholder="Ej. Accesorios, Ropa, Ofertas…"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
          </div>
          <div className="sm:w-28">
            <Field label="Emoji">
              <input
                className={inputClass}
                placeholder="🧴"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
              />
            </Field>
          </div>
          <button
            onClick={add}
            disabled={!name.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-aqua-400 to-aqua-600 px-5 py-2.5 text-sm font-semibold text-ink-950 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus size={16} />
            Agregar categoría
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {config.categories.map((c) => {
          const used = config.products.filter((p) => p.category === c.id).length
          const locked = used > 0 || config.categories.length <= 1
          return (
            <div
              key={c.id}
              className="neon-border flex flex-col gap-3 rounded-2xl bg-ink-900/80 p-4 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-3 sm:w-64">
                <span className="text-2xl">{c.emoji}</span>
                <input
                  className={inputClass}
                  value={c.name}
                  onChange={(e) => update(c.id, { name: e.target.value })}
                />
              </div>
              <div className="flex flex-1 items-center gap-3">
                <input
                  className={`${inputClass} max-w-24`}
                  value={c.emoji}
                  onChange={(e) => update(c.id, { emoji: e.target.value })}
                />
                <span className="whitespace-nowrap text-xs text-zinc-500">
                  {used} producto{used === 1 ? '' : 's'}
                </span>
              </div>
              <button
                onClick={() => remove(c.id)}
                disabled={locked}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-rose-300 transition-colors hover:border-rose-400/60 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Trash2 size={14} />
                Eliminar
              </button>
              {warnId === c.id && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-300">
                  <AlertTriangle size={13} />
                  {used > 0
                    ? `Mueve primero sus ${used} productos a otra categoría.`
                    : 'Debe quedar al menos una categoría.'}
                </span>
              )}
            </div>
          )
        })}
      </div>

      <p className="rounded-xl border border-white/10 bg-ink-950/60 p-4 text-xs leading-relaxed text-zinc-500">
        Las categorías y productos se guardan en este navegador (localStorage). Al ser un
        sitio estático sin servidor, no se sincronizan entre dispositivos.
      </p>
    </div>
  )
}

type Tab = 'dashboard' | 'productos' | 'categorias' | 'redes' | 'seguridad'

const tabs: { key: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'productos', label: 'Productos', icon: ShoppingBag },
  { key: 'categorias', label: 'Categorías', icon: Tags },
  { key: 'redes', label: 'Redes y Contacto', icon: Share2 },
  { key: 'seguridad', label: 'Seguridad', icon: Lock },
]

export default function Admin() {
  const { config } = useConfig()
  const [tab, setTab] = useState<Tab>('dashboard')

  if (sessionStorage.getItem('modogym_admin_auth') !== '1') {
    return <AdminLogin />
  }

  return (
    <div className="min-h-screen min-h-[100svh] bg-grid">
      <header className="sticky top-0 z-40 border-b border-aqua-500/20 bg-ink-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-aqua-400 to-aqua-600 text-ink-950">
              <LayoutDashboard size={20} />
            </span>
            <div>
              <div className="font-display text-base font-bold text-white">
                Panel de Administración
              </div>
              <div className="text-xs text-zinc-400">
                {config.visits} visitas registradas
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-zinc-200 transition-colors hover:border-aqua-400/60 hover:text-white"
            >
              <ArrowLeft size={15} />
              Ver página
            </a>
            <button
              onClick={() => {
                sessionStorage.removeItem('modogym_admin_auth')
                window.location.reload()
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-rose-300 transition-colors hover:border-rose-400/60"
            >
              <Lock size={15} />
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map((t) => {
            const Icon = t.icon
            const active = tab === t.key
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                  active
                    ? 'bg-gradient-to-r from-aqua-400 to-aqua-600 text-ink-950 shadow-[0_0_18px_rgba(34,211,238,0.3)]'
                    : 'border border-white/15 text-zinc-300 hover:border-aqua-400/50 hover:text-white'
                }`}
              >
                <Icon size={16} />
                {t.label}
              </button>
            )
          })}
        </div>

        {tab === 'dashboard' && <DashboardTab />}
        {tab === 'productos' && <ProductsTab />}
        {tab === 'categorias' && <CategoriesTab />}
        {tab === 'redes' && <SocialTab />}
        {tab === 'seguridad' && <SecurityTab />}
      </div>
    </div>
  )
}