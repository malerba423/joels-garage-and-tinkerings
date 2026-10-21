import { useEffect, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import { partNo, pieces, type Piece } from '../data/pieces'
import { mailto } from '../data/shop'
import { DeliveryStrip, PartsTag, StatusMark } from '../components/Shop'
import NotFound from './NotFound'

export default function PieceDetail() {
  const { slug } = useParams()
  const index = pieces.findIndex((p) => p.slug === slug)
  if (index === -1) return <NotFound />

  // key resets the selected image when moving between pieces
  return <PieceView key={slug} index={index} />
}

function PieceView({ index }: { index: number }) {
  const piece: Piece = pieces[index]
  const prev = pieces[(index - 1 + pieces.length) % pieces.length]
  const next = pieces[(index + 1) % pieces.length]
  const [selected, setSelected] = useState(0)
  const [zoomOpen, setZoomOpen] = useState(false)
  const image = piece.images[selected]
  const multiple = piece.images.length > 1
  const no = partNo(piece)
  const sale = piece.sale

  // Arrow keys flip through the sheets until something else on the page takes focus.
  useEffect(() => {
    if (!multiple || zoomOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
      if (document.activeElement && document.activeElement !== document.body) return
      const step = e.key === 'ArrowRight' || e.key === ' ' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
      if (!step) return
      e.preventDefault()
      setSelected((s) => (s + step + piece.images.length) % piece.images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [multiple, zoomOpen, piece.images.length])

  const rows: [string, ReactNode][] = [
    ['Year', piece.year],
    ['Material', piece.medium],
    ['Size', piece.size],
    ['Qty', sale && sale.status !== 'commission' ? '1 of 1' : undefined],
    ['Status', sale && <StatusMark status={sale.status} label />],
    [
      'Price',
      sale?.status === 'available' ? (sale.price ?? 'On request') : sale?.status === 'hold' ? `Held until ${sale.holdUntil ?? 'soon'}` : undefined,
    ],
    ['Went to', sale?.status === 'sold' ? sale.soldTo : undefined],
  ]
  const specs = rows.filter(([, value]) => Boolean(value))

  const claimHref =
    sale?.buyLink ?? mailto(`Claiming part no. ${no}: ${piece.title}`, `Hi Joel, I'd like to claim ${piece.title} (no. ${no}).\n\nDelivery: pickup / hand delivered / shipped\n`)

  return (
    <>
      <article className="detail">
        <div className="detail-media">
          <figure className="sheet">
            <button className="detail-image" onClick={() => setZoomOpen(true)} title="Click to zoom">
              <img src={image.src} alt={image.caption ?? piece.title} width={image.width} height={image.height} />
            </button>
            <figcaption>
              <span>FIG. {no}{image.caption ? ` · ${image.caption.toUpperCase()}` : ''}</span>
              <span>
                SHEET {selected + 1} OF {piece.images.length}
              </span>
            </figcaption>
          </figure>

          {multiple && (
            <div className="thumbs">
              {piece.images.map((img, i) => (
                <button
                  key={img.src}
                  className={i === selected ? 'thumb active' : 'thumb'}
                  onClick={() => setSelected(i)}
                  aria-label={img.caption ?? `Sheet ${i + 1}`}
                >
                  <img src={img.src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <aside className="detail-info">
          <div className="detail-heading plate">
            <span className="mono-label">PART NO. {no}{piece.tags[0] ? ` — ${piece.tags[0].toUpperCase()}` : ''}</span>
            <h1>{piece.title}</h1>
          </div>

          {specs.length > 0 && (
            <table className="spec">
              <tbody>
                {specs.map(([label, value]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {piece.notes && <p className="notes">{piece.notes}</p>}

          {sale?.status === 'available' && (
            <div className="actions">
              <a href={claimHref} className="button block">
                Claim part no. {no} →
              </a>
              <a href={mailto(`Question about no. ${no}: ${piece.title}`)} className="button ghost block">
                Send a question
              </a>
            </div>
          )}
          {sale?.status === 'hold' && (
            <a href={mailto(`Tell me if no. ${no} frees up`)} className="button ghost block">
              Tell me if it frees up
            </a>
          )}
          {(sale?.status === 'sold' || sale?.status === 'commission') && (
            <Link to={`/work-orders?from=${piece.slug}`} className="button block">
              Make me one like this →
            </Link>
          )}

          <div className="tags">
            {piece.tags.map((t) => (
              <Link key={t} to={`/?tag=${t}`} className="tag">
                {t}
              </Link>
            ))}
          </div>
          <nav className="prev-next">
            <Link to={`/piece/${prev.slug}`}>← {partNo(prev)} {prev.title}</Link>
            <Link to={`/piece/${next.slug}`}>{partNo(next)} {next.title} →</Link>
          </nav>
          <Link to={`/present?start=${piece.slug}`} className="button ghost">
            ▶ Present from here
          </Link>
        </aside>
      </article>

      {sale && sale.status !== 'commission' && (
        <>
          <DeliveryStrip />
          <section className="tag-and-order">
            <div className="tag-callout">
              <PartsTag no={no} />
              <div>
                <h2>Ships with its parts tag</h2>
                <p>Hand-numbered and signed: {piece.parts ?? piece.medium ?? 'what it’s made of'}, where the scrap came from, and who it went to.</p>
              </div>
            </div>
            <div className="work-order-callout">
              <span className="mono-label">WORK ORDER</span>
              <h2>Make me one like this</h2>
              <p>Give rough specs, bring your own wood if you've got it. Joel sends back a drawing and a quote.</p>
              <Link to={`/work-orders?from=${piece.slug}`} className="button inverse">
                Open a work order →
              </Link>
            </div>
          </section>
        </>
      )}

      <Lightbox
        open={zoomOpen}
        close={() => setZoomOpen(false)}
        index={selected}
        on={{ view: ({ index: i }) => setSelected(i) }}
        slides={piece.images.map((img) => ({ ...img, alt: img.caption ?? piece.title }))}
        plugins={[Zoom]}
        carousel={{ finite: !multiple }}
        render={multiple ? undefined : { buttonPrev: () => null, buttonNext: () => null }}
        zoom={{ maxZoomPixelRatio: 4 }}
      />
    </>
  )
}
