import { statusLabel, type SaleStatus } from '../data/pieces'
import { shop } from '../data/shop'

/** green ● available · red ● sold · ◐ on hold · ◌ can build another */
export function StatusMark({ status, label = false }: { status: SaleStatus; label?: boolean }) {
  return (
    <span className="status" title={statusLabel[status]}>
      <span className={`dot dot-${status}`} aria-hidden="true" />
      {label ? statusLabel[status] : <span className="visually-hidden">{statusLabel[status]}</span>}
    </span>
  )
}

export function StatusLegend() {
  return (
    <span className="legend">
      {(['available', 'sold', 'commission'] as const).map((s) => (
        <StatusMark key={s} status={s} label />
      ))}
    </span>
  )
}

export function PartsTag({ no, sub = 'INSP. JM' }: { no: string; sub?: string }) {
  return (
    <div className="parts-tag" aria-hidden="true">
      <span className="parts-tag-hole" />
      <span className="parts-tag-label">PART NO.</span>
      <span className="parts-tag-no">{no}</span>
      <span className="parts-tag-label">{sub}</span>
    </div>
  )
}

export function DeliveryStrip() {
  return (
    <section className="delivery" aria-label="Delivery options">
      {shop.delivery.map((d, i) => (
        <div key={d.title} className="delivery-opt">
          <span className="mono-label">DELIVERY OPT. {i + 1}</span>
          <span className="delivery-title">{d.title}</span>
          <span>{d.detail}</span>
        </div>
      ))}
    </section>
  )
}
