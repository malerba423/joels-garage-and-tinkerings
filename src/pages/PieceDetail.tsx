import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import { pieces, type Piece } from '../data/pieces'
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

  const details = [
    ['Year', piece.year],
    ['Medium', piece.medium],
    ['Size', piece.size],
  ].filter(([, v]) => v)

  return (
    <article className="detail">
      <div className="detail-media">
        <button className="detail-image" onClick={() => setZoomOpen(true)} title="Click to zoom">
          <img src={image.src} alt={image.caption ?? piece.title} width={image.width} height={image.height} />
        </button>
        {image.caption && <p className="image-caption">{image.caption}</p>}

        {multiple && (
          <div className="thumbs">
            {piece.images.map((img, i) => (
              <button
                key={img.src}
                className={i === selected ? 'thumb active' : 'thumb'}
                onClick={() => setSelected(i)}
                aria-label={img.caption ?? `Image ${i + 1}`}
              >
                <img src={img.src} alt="" />
              </button>
            ))}
          </div>
        )}
      </div>

      <aside className="detail-info">
        <h1>{piece.title}</h1>
        <dl>
          {details.map(([label, value]) => (
            <div key={label as string}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        {piece.notes && <p className="notes">{piece.notes}</p>}
        <div className="tags">
          {piece.tags.map((t) => (
            <Link key={t} to={`/?tag=${t}`} className="tag">
              {t}
            </Link>
          ))}
        </div>
        <nav className="prev-next">
          <Link to={`/piece/${prev.slug}`}>← {prev.title}</Link>
          <Link to={`/piece/${next.slug}`}>{next.title} →</Link>
        </nav>
        <Link to={`/present?start=${piece.slug}`} className="button ghost">
          ▶ Present from here
        </Link>
      </aside>

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
    </article>
  )
}
