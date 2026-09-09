export type ChartPoint = { label: string; value: number }
export type TrendPoint = { label: string; visits: number; orders: number }

// Barras verticales (una serie) — ideal para "visitas por día".
export function BarsChart({
  data,
  color = '#22d3ee',
  height = 170,
}: {
  data: ChartPoint[]
  color?: string
  height?: number
}) {
  const max = Math.max(1, ...data.map((d) => d.value))
  return (
    <div className="flex items-end gap-1.5" style={{ height }}>
      {data.map((d, i) => (
        <div
          key={i}
          className="flex h-full flex-1 flex-col items-center justify-end gap-1"
          title={`${d.label}: ${d.value}`}
        >
          <span className="text-[9px] font-semibold text-zinc-400 tabular-nums">
            {d.value}
          </span>
          <div
            className="w-full rounded-t-md"
            style={{
              height: `${(d.value / max) * 100}%`,
              minHeight: d.value > 0 ? 3 : 0,
              background: color,
              opacity: d.value === 0 ? 0.25 : 0.9,
            }}
          />
        </div>
      ))}
    </div>
  )
}

// Línea de tendencia de dos series (visitas y pedidos) para día/mes/año.
export function TrendChart({
  data,
  height = 180,
}: {
  data: TrendPoint[]
  height?: number
}) {
  const W = 720
  const H = height
  const padL = 12
  const padR = 12
  const padB = 22
  const padT = 14
  const innerW = W - padL - padR
  const innerH = H - padT - padB
  const max = Math.max(1, ...data.flatMap((d) => [d.visits, d.orders]))
  const n = data.length

  const x = (i: number) =>
    padL + (n <= 1 ? innerW / 2 : (innerW * i) / (n - 1))
  const y = (v: number) => padT + innerH - (innerH * v) / max

  const visits = data.map((d, i) => `${x(i)},${y(d.visits)}`).join(' ')
  const orders = data.map((d, i) => `${x(i)},${y(d.orders)}`).join(' ')

  const labels = data
    .map((d, i) => ({ ...d, i }))
    .filter((_, i) => i % Math.max(1, Math.ceil(n / 8)) === 0 || i === n - 1)

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      style={{ height }}
      preserveAspectRatio="none"
      role="img"
    >
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line
          key={f}
          x1={padL}
          x2={W - padR}
          y1={padT + innerH - innerH * f}
          y2={padT + innerH - innerH * f}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={1}
        />
      ))}
      <line
        x1={padL}
        x2={W - padR}
        y1={padT + innerH}
        y2={padT + innerH}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={1}
      />
      {data.length > 0 && (
        <>
          <polyline
            points={visits}
            fill="none"
            stroke="#22d3ee"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points={orders}
            fill="none"
            stroke="#e879f9"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {data.map((d, i) => (
            <circle key={i} cx={x(i)} cy={y(d.visits)} r={2.5} fill="#22d3ee" />
          ))}
          {data.map((d, i) => (
            <circle key={i} cx={x(i)} cy={y(d.orders)} r={2.5} fill="#e879f9" />
          ))}
        </>
      )}
      {labels.map((d) => (
        <text
          key={d.i}
          x={x(d.i)}
          y={H - 6}
          textAnchor="middle"
          fontSize={10}
          fill="#71717a"
        >
          {d.label}
        </text>
      ))}
    </svg>
  )
}

// Barras horizontales para rankings (más vistos / más pedidos).
export function RankBars({
  items,
  color = '#22d3ee',
}: {
  items: ChartPoint[]
  color?: string
}) {
  const max = Math.max(1, ...items.map((i) => i.value))
  return (
    <div className="space-y-3">
      {items.map((it, idx) => (
        <div key={idx}>
          <div className="mb-1 flex items-center justify-between gap-3">
            <span className="truncate text-sm font-medium text-zinc-200">{it.label}</span>
            <span className="shrink-0 text-sm font-bold tabular-nums" style={{ color }}>
              {it.value}
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full"
              style={{ width: `${(it.value / max) * 100}%`, background: color }}
            />
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-sm text-zinc-500">Aún no hay datos registrados.</p>
      )}
    </div>
  )
}

// Leyenda simple para las gráficas de dos series.
export function TrendLegend() {
  return (
    <div className="flex items-center gap-4 text-xs text-zinc-400">
      <span className="inline-flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-aqua-400" />
        Visitas
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
        Pedidos
      </span>
    </div>
  )
}
