import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { filterByTag } from '../data/pieces'

// Full-screen slideshow for showing work to people. Every image of every piece is a slide.
// Keys: ← → / space to move, ↑ ↓ to jump between pieces, F for fullscreen, P to auto-play,
// I to toggle captions, Esc to leave.
export default function Present() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const pieces = filterByTag(params.get('tag'))
  const slides = pieces.flatMap((piece, pieceIndex) =>
    piece.images.map((image, imageIndex) => ({ piece, pieceIndex, image, imageIndex })),
  )
  const startIndex = Math.max(0, slides.findIndex((s) => s.piece.slug === params.get('start')))

  const [index, setIndex] = useState(startIndex)
  const [showCaption, setShowCaption] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [idle, setIdle] = useState(false)
  const idleTimer = useRef<number | undefined>(undefined)

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + slides.length) % slides.length),
    [slides.length],
  )

  // Jump to the first image of the next/previous piece
  const jumpPiece = useCallback(
    (delta: number) =>
      setIndex((i) => {
        const target = (slides[i].pieceIndex + delta + pieces.length) % pieces.length
        return slides.findIndex((s) => s.pieceIndex === target)
      }),
    [slides, pieces.length],
  )

  const exit = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen()
    // Go back if we came from inside the site, otherwise land on the gallery
    if (location.key === 'default') navigate('/')
    else navigate(-1)
  }, [navigate, location.key])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'ArrowDown') jumpPiece(1)
      else if (e.key === 'ArrowUp') jumpPiece(-1)
      else if (e.key === 'Escape' && !document.fullscreenElement) exit()
      else if (e.key === 'f') {
        if (document.fullscreenElement) document.exitFullscreen()
        else document.documentElement.requestFullscreen()
      } else if (e.key === 'p') setPlaying((p) => !p)
      else if (e.key === 'i') setShowCaption((s) => !s)
      else return
      e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, jumpPiece, exit])

  useEffect(() => {
    if (!playing) return
    const t = window.setInterval(() => go(1), 6000)
    return () => window.clearInterval(t)
  }, [playing, go])

  // Hide the controls and cursor after a couple seconds of no mouse movement.
  const wake = () => {
    setIdle(false)
    window.clearTimeout(idleTimer.current)
    idleTimer.current = window.setTimeout(() => setIdle(true), 2500)
  }
  useEffect(() => {
    wake()
    return () => window.clearTimeout(idleTimer.current)
  }, [])

  if (slides.length === 0) return null
  const { piece, pieceIndex, image, imageIndex } = slides[index]
  const caption = [piece.year, piece.medium].filter(Boolean).join(' · ')

  return (
    <div className={idle ? 'present idle' : 'present'} onMouseMove={wake}>
      <img key={image.src} src={image.src} alt={image.caption ?? piece.title} className="present-image" />

      {/* Click left/right halves of the screen to move */}
      <button className="present-hit left" aria-label="Previous" onClick={() => go(-1)} />
      <button className="present-hit right" aria-label="Next" onClick={() => go(1)} />

      {showCaption && (
        <div className="present-caption">
          <strong>{piece.title}</strong>
          {caption && <span>{caption}</span>}
          {image.caption && <em>{image.caption}</em>}
          {piece.images.length > 1 && (
            <div className="present-dots" aria-label={`Image ${imageIndex + 1} of ${piece.images.length}`}>
              {piece.images.map((img, i) => (
                <i key={img.src} className={i === imageIndex ? 'on' : undefined} />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="present-controls">
        <span>
          {pieceIndex + 1} / {pieces.length}
        </span>
        <button onClick={() => setPlaying((p) => !p)}>{playing ? '❚❚ Pause' : '▶ Play'}</button>
        <button onClick={() => document.documentElement.requestFullscreen()}>⛶ Fullscreen</button>
        <button onClick={exit}>✕ Exit</button>
      </div>
    </div>
  )
}
