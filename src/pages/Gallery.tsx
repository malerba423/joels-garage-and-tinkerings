import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { RowsPhotoAlbum } from 'react-photo-album'
import 'react-photo-album/rows.css'
import { allTags, cover, filterByTag } from '../data/pieces'

export default function Gallery() {
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const tag = params.get('tag')
  const shown = filterByTag(tag)

  const photos = shown.map((p) => ({
    key: p.slug,
    src: cover(p).src,
    width: cover(p).width,
    height: cover(p).height,
    alt: p.title,
    title: p.title,
    count: p.images.length,
  }))

  return (
    <>
      <div className="toolbar">
        <div className="tags">
          <button className={!tag ? 'tag active' : 'tag'} onClick={() => setParams({})}>
            all
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              className={tag === t ? 'tag active' : 'tag'}
              onClick={() => setParams({ tag: t })}
            >
              {t}
            </button>
          ))}
        </div>
        <Link to={tag ? `/present?tag=${tag}` : '/present'} className="button ghost">
          Present {tag ?? 'all'} ({shown.length})
        </Link>
      </div>

      <RowsPhotoAlbum
        photos={photos}
        targetRowHeight={280}
        spacing={12}
        onClick={({ photo }) => navigate(`/piece/${photo.key}`)}
        render={{
          extras: (_, { photo }) =>
            photo.count > 1 && <span className="photo-count">{photo.count} photos</span>,
        }}
      />
    </>
  )
}
